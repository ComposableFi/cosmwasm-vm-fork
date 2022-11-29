#![feature(assert_matches)]

#[cfg(test)]
mod tests {
    use cosmwasm_orchestrate::{
        fetcher::*,
        ibc::{ibc_relay, ibc_relay_required, IbcNetwork},
        vm::{Account, IbcState, State},
        Api, Direct, StateBuilder,
    };
    use cosmwasm_std::{to_binary, Addr, ContractInfo, Env, IbcChannel, IbcOrder, Timestamp};
    use cosmwasm_std::{BlockInfo, ContractResult, MessageInfo, TransactionInfo};
    use cosmwasm_vm::executor::{CosmwasmQueryResult, QueryResult};
    use cw20::{Cw20Coin, Cw20ExecuteMsg, Cw20QueryMsg, MinterResponse};
    use cw20_base::msg::InstantiateMsg;

    async fn setup_xcvm(
        network_id: u32,
        block: BlockInfo,
        transaction: Option<TransactionInfo>,
        info: MessageInfo,
    ) -> (Account, Account, Account, Account, State) {
        let code_cw20 = FileFetcher::from_url(
            "https://github.com/CosmWasm/cw-plus/releases/download/v0.16.0/cw20_base.wasm",
        )
        .await
        .unwrap();
        let code_asset_registry = std::fs::read("examples/cw_xcvm_asset_registry.wasm").unwrap();
        let code_interpreter = std::fs::read("examples/cw_xcvm_interpreter.wasm").unwrap();
        let code_router = std::fs::read("examples/cw_xcvm_router.wasm").unwrap();
        let code_gateway = std::fs::read("examples/cw_xcvm_gateway.wasm").unwrap();
        let code_pingpong = std::fs::read("examples/cw_xcvm_pingpong.wasm").unwrap();

        let mut state = StateBuilder::new()
            .add_codes(vec![
                &code_asset_registry,
                &code_interpreter,
                &code_router,
                &code_gateway,
                &code_cw20,
                &code_pingpong,
            ])
            .build();

        log::debug!("{:?}", state);

        // XCVM registry deployment
        let (registry_address, _) = <Api>::instantiate_raw(
            &mut state,
            1,
            None,
            block.clone(),
            transaction.clone(),
            info.clone(),
            100_000_000_000,
            r#"{}"#.as_bytes(),
        )
        .unwrap();

        // XCVM gateway deployment
        let (gateway_address, (_, gateway_events)) = <Api>::instantiate_raw(
            &mut state,
            4,
            None,
            block.clone(),
            transaction.clone(),
            info.clone(),
            100_000_000_000,
            format!(
                r#"{{
                  "config": {{
	                  "registry_address": "{}",
	                  "router_code_id": 3,
	                  "interpreter_code_id": 2,
	                  "network_id": {},
	                  "admin": "{}"
                  }}
                }}"#,
                registry_address.clone(),
                network_id,
                info.sender.clone()
            )
            .as_bytes(),
        )
        .unwrap();

        let router_address = gateway_events
            .iter()
            .find_map(|e| {
                if e.ty == "wasm-xcvm.router" {
                    e.attributes.iter().find(|a| a.key == "_contract_address")
                } else {
                    None
                }
            })
            .expect("impossible")
            .value
            .clone()
            .try_into()
            .expect("impossible");

        // CW20 Pica address
        let (pica_address, _) = <Api>::instantiate(
            &mut state,
            5,
            None,
            block.clone(),
            transaction.clone(),
            info.clone(),
            100_000_000_000,
            InstantiateMsg {
                name: "Picasso".into(),
                symbol: "PICA".into(),
                decimals: 12,
                initial_balances: vec![Cw20Coin {
                    amount: 1_000_000_000_000_000_000u128.into(),
                    address: info.sender.clone().into_string(),
                }],
                mint: Some(MinterResponse {
                    minter: Addr::from(gateway_address.clone()).into_string(),
                    cap: None,
                }),
                marketing: None,
            },
        )
        .unwrap();

        log::info!("{}", router_address);

        // Pingpong contract address
        let (pingpong_address, _) = <Api>::instantiate_raw(
            &mut state,
            6,
            None,
            block.clone(),
            transaction.clone(),
            info.clone(),
            100_000_000_000,
            format!(
                r#"{{
                  "router_address": "{}",
                  "network_id": {}
                }}"#,
                router_address, network_id
            )
            .as_bytes(),
        )
        .unwrap();

        <Api>::execute_raw(
            &mut state,
            Env {
                block: block.clone(),
                transaction: transaction.clone(),
                contract: ContractInfo {
                    address: registry_address.into(),
                },
            },
            MessageInfo {
                sender: info.sender.clone(),
                funds: Default::default(),
            },
            1_000_000_000,
            format!(
                r#"{{
                  "register_asset": {{
                    "asset_id": "1",
                    "reference": {{
                      "Virtual": {{
                        "cw20_address": "{}"
                      }}
                    }}
                  }}
                }}"#,
                Addr::from(pica_address.clone()).into_string()
            )
            .as_bytes(),
        )
        .unwrap();

        (
            gateway_address,
            router_address,
            pica_address,
            pingpong_address,
            state,
        )
    }

    #[tokio::test]
    async fn go() {
        env_logger::init();

        let sender = Account::unchecked("sender");
        let network = 1;
        let network_counterparty = 2;

        let block_info = BlockInfo {
            height: 1000,
            time: Timestamp::from_seconds(0),
            chain_id: "ibc:in-memory".into(),
        };
        let transaction_info = Option::<TransactionInfo>::None;
        let message_info = MessageInfo {
            sender: sender.clone().into(),
            funds: Default::default(),
        };

        let (gateway, router, pica, pingpong, mut state) = setup_xcvm(
            network,
            block_info.clone(),
            transaction_info.clone(),
            message_info.clone(),
        )
        .await;
        let (
            gateway_counterparty,
            router_counterparty,
            pica_counterparty,
            pingpong_counterparty,
            mut state_counterparty,
        ) = setup_xcvm(
            network_counterparty,
            block_info.clone(),
            transaction_info.clone(),
            message_info.clone(),
        )
        .await;

        log::info!("Gateway: {}", gateway);
        log::info!("Gateway Counterparty: {}", gateway_counterparty);

        let env = Env {
            block: block_info.clone(),
            transaction: transaction_info.clone(),
            contract: ContractInfo {
                address: gateway.clone().into(),
            },
        };
        let env_counterparty = Env {
            block: block_info.clone(),
            transaction: transaction_info.clone(),
            contract: ContractInfo {
                address: gateway_counterparty.clone().into(),
            },
        };

        let relayer = Account::unchecked("RELAYER_1");
        let relayer_counterpary = Account::unchecked("RELAYER_2");

        let info = MessageInfo {
            sender: relayer.into(),
            funds: Default::default(),
        };
        let info_counterparty = MessageInfo {
            sender: relayer_counterpary.into(),
            funds: Default::default(),
        };

        let channel_id = "ibc:in-memory-0".to_string();
        let mut ibc_network = IbcNetwork::new(&mut state, &mut state_counterparty);
        let channel = ibc_network
            .handshake(
                channel_id.clone(),
                "xcvm".into(),
                IbcOrder::Unordered,
                "ibc:connection:memory".into(),
                env.clone(),
                env_counterparty.clone(),
                info.clone(),
                info_counterparty.clone(),
                1_000_000_000,
            )
            .unwrap();

        let res = <Api>::execute_raw(
            ibc_network.state,
            Env {
                block: block_info.clone(),
                transaction: transaction_info.clone(),
                contract: ContractInfo {
                    address: gateway.clone().into(),
                },
            },
            MessageInfo {
                sender: sender.clone().into(),
                funds: Default::default(),
            },
            1_000_000_000,
            format!(
                r#"{{
                  "ibc_set_network_channel": {{
                    "network_id": {},
                    "channel_id": "{}"
                  }}
                }}"#,
                network_counterparty,
                channel_id.clone()
            )
            .as_bytes(),
        )
        .unwrap();

        let res = <Api>::execute_raw(
            ibc_network.state_counterparty,
            Env {
                block: block_info.clone(),
                transaction: transaction_info.clone(),
                contract: ContractInfo {
                    address: gateway_counterparty.clone().into(),
                },
            },
            MessageInfo {
                sender: sender.clone().into(),
                funds: Default::default(),
            },
            1_000_000_000,
            format!(
                r#"{{
                  "ibc_set_network_channel": {{
                    "network_id": {},
                    "channel_id": "{}"
                  }}
                }}"#,
                network,
                channel_id.clone()
            )
            .as_bytes(),
        )
        .unwrap();

        let transfer_amount = 1_000_000_000_000u128;

        let res = <Api>::execute(
            ibc_network.state,
            Env {
                block: block_info.clone(),
                transaction: transaction_info.clone(),
                contract: ContractInfo {
                    address: pica.clone().into(),
                },
            },
            MessageInfo {
                sender: sender.clone().into(),
                funds: Default::default(),
            },
            1_000_000_000,
            &Cw20ExecuteMsg::IncreaseAllowance {
                spender: Addr::from(router.clone()).into_string(),
                amount: transfer_amount.into(),
                expires: None,
            },
        )
        .unwrap();

        log::info!("{:?}", res);

        log::info!(
            "{}",
            serde_json::to_string::<Vec<u8>>(&pingpong_counterparty.0.as_bytes().to_vec()).unwrap()
        );

        let res = <Api>::execute_raw(
            ibc_network.state,
            Env {
                block: block_info.clone(),
                transaction: transaction_info.clone(),
                contract: ContractInfo {
                    address: pingpong.clone().into(),
                },
            },
            MessageInfo {
                sender: sender.clone().into(),
                funds: Default::default(),
            },
            1_000_000_000,
            format!(
                r#"{{
                  "ping": {{
                    "user_origin": {{
                      "user_id": {},
                      "network_id": {}
                    }},
                    "counter": 0
                  }}
                }}"#,
                serde_json::to_string::<Vec<u8>>(&pingpong_counterparty.0.as_bytes().to_vec())
                    .unwrap(),
                network_counterparty
            )
            .as_bytes(),
        )
        .unwrap();

        let res = <Api>::execute_raw(
            ibc_network.state,
            Env {
                block: block_info.clone(),
                transaction: transaction_info.clone(),
                contract: ContractInfo {
                    address: router.clone().into(),
                },
            },
            MessageInfo {
                sender: sender.into(),
                funds: Default::default(),
            },
            1_000_000_000,
            format!(
                r#"{{
                  "execute_program": {{
                    "salt": [1, 2, 3],
                    "program": {{
                      "tag": [1, 2, 3],
                      "instructions": [{{
                        "spawn": {{
                          "network": {},
                          "bridge_security": "deterministic",
                          "salt": [1, 2, 3],
                          "assets": [ [
                            "1", {{
                              "intercept": "1000000000000",
                              "slope": "0"
                            }}
                          ] ],
                          "program": {{
                            "tag": [3, 2, 1],
                            "instructions": [{{
                              "spawn": {{
                                "network": {},
                                "bridge_security": "deterministic",
                                "salt": [1, 2, 3],
                                "assets": [ [
                                  "1", {{
                                    "intercept": "1000000000000",
                                    "slope": "0"
                                  }}
                                ] ],
                                "program": {{
                                  "tag": [1, 2, 1],
                                  "instructions": [{{
                                    "transfer": {{
                                      "to": "relayer",
                                      "assets": [ [
                                        "1", {{
                                          "intercept": "1000000000000",
                                          "slope": "0"
                                        }}
                                      ] ]
                                    }}
                                  }}]
                                }}
                              }}
                            }}]
                          }}
                        }}
                      }}]
                    }},
                    "assets": [ [
                      "1", "1000000000000"
                    ] ]
                  }}
                }}"#,
                network_counterparty, network
            )
            .as_bytes(),
        )
        .unwrap();

        log::info!("{:?}", res);

        log::info!("{:?}", ibc_network.state);

        ibc_network
            .relay(
                channel,
                env,
                env_counterparty,
                info,
                info_counterparty,
                1_000_000_000,
                &(gateway, pica),
                &(gateway_counterparty, pica_counterparty),
                |_, _, _, _| {
                    log::info!("");
                    log::info!("=====================");
                    log::info!("      RELAYING      ");
                    log::info!("=====================");
                    log::info!("");
                },
                |state,
                 state_counterparty,
                 (gateway, pica),
                 (gateway_counterparty, pica_counterparty)| {
                    log::info!("");
                    log::info!("State: {:?}", state);
                    log::info!("State counterparty: {:?}", state_counterparty);
                    log::info!("");
                    let result = Api::<Direct>::query::<_, cw20::TokenInfoResponse>(
                        state,
                        Env {
                            block: block_info.clone(),
                            transaction: transaction_info.clone(),
                            contract: ContractInfo {
                                address: pica.clone().into(),
                            },
                        },
                        &Cw20QueryMsg::TokenInfo {},
                    )
                    .unwrap();

                    log::info!("Supply: {:?}", result);

                    let result = Api::<Direct>::query::<_, cw20::TokenInfoResponse>(
                        state_counterparty,
                        Env {
                            block: block_info.clone(),
                            transaction: transaction_info.clone(),
                            contract: ContractInfo {
                                address: pica_counterparty.clone().into(),
                            },
                        },
                        &Cw20QueryMsg::TokenInfo {},
                    )
                    .unwrap();

                    log::info!("Supply Counterparty: {:?}", result);
                },
            )
            .unwrap();
    }
}
