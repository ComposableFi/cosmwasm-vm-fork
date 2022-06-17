// actor_system.rs ---

// Copyright (C) 2022 Hussein Ait-Lahcen

// Author: Hussein Ait-Lahcen <hussein.aitlahcen@gmail.com>

// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// Except as contained in this notice, the name(s) of the above copyright
// holders shall not be used in advertising or otherwise to promote the sale,
// use or other dealings in this Software without prior written authorization.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

use crate::{
    executor::{
        cosmwasm_call, cosmwasm_query, AllocateInput, CosmwasmCallInput, CosmwasmQueryInput,
        DeallocateInput, ExecuteInput, ExecutorError, InstantiateInput, ReplyInput,
    },
    has::Has,
    host::{Host, HostErrorOf},
    input::Input,
    loader::{Loader, LoaderErrorOf},
    memory::{PointerOf, ReadWriteMemory, ReadableMemoryErrorOf, WritableMemoryErrorOf},
    transaction::{Transactional, TransactionalErrorOf},
    vm::{VmErrorOf, VmInputOf, VmOutputOf, VM},
};
use alloc::{format, string::String, vec, vec::Vec};
use core::fmt::Debug;
use cosmwasm_minimal_std::{
    Addr, BankMsg, BankQuery, Binary, Coin, ContractResult, CosmosMsg, CosmwasmQueryResult,
    DeserializeLimit, Env, Event, MessageInfo, QueryRequest, QueryResult, ReadLimit, Reply,
    ReplyOn, Response, SubMsg, SubMsgResponse, SubMsgResult, SystemResult, WasmMsg, WasmQuery,
};
use serde::de::DeserializeOwned;

#[derive(Clone, PartialEq, Eq, Debug)]
pub enum SystemError {
    UnsupportedMessage,
    FailedToSerialize,
    ContractExecutionFailure(String),
}

#[derive(Debug)]
enum SubCallContinuation<E> {
    Continue(Option<Binary>),
    Reply(SubMsgResult),
    Abort(E),
}

pub type BankErrorOf<T> = <T as Bank>::Error;
pub type BankAccountIdOf<T> = <T as Bank>::AccountId;
pub trait Bank {
    type AccountId;
    type Error;
    fn transfer(&mut self, to: &Self::AccountId, funds: &[Coin]) -> Result<(), Self::Error>;
    fn burn(&mut self, funds: &[Coin]) -> Result<(), Self::Error>;
    fn query(&mut self, query: BankQuery)
        -> Result<SystemResult<CosmwasmQueryResult>, Self::Error>;
}

pub type CosmwasmCodeId = u64;

pub struct CosmwasmNewContract {
    pub code_id: CosmwasmCodeId,
    pub admin: Option<String>,
    pub label: String,
}

pub trait CosmwasmVM = VM
    + ReadWriteMemory
    + Transactional
    + Loader<
        CodeId = CosmwasmNewContract,
        Address = BankAccountIdOf<Self>,
        Input = Vec<Coin>,
        Output = Self,
    > + Bank
    + Host<Value = Vec<u8>>
    + Has<Env>
    + Has<MessageInfo>
where
    BankAccountIdOf<Self>:
        TryFrom<Addr, Error = VmErrorOf<Self>> + TryFrom<String, Error = VmErrorOf<Self>>,
    VmErrorOf<Self>: From<ReadableMemoryErrorOf<Self>>
        + From<WritableMemoryErrorOf<Self>>
        + From<ExecutorError>
        + From<SystemError>
        + From<TransactionalErrorOf<Self>>
        + From<LoaderErrorOf<Self>>
        + From<BankErrorOf<Self>>
        + From<HostErrorOf<Self>>
        + Debug,
    for<'x> VmInputOf<'x, Self>: TryFrom<AllocateInput<PointerOf<Self>>, Error = VmErrorOf<Self>>
        + TryFrom<DeallocateInput<PointerOf<Self>>, Error = VmErrorOf<Self>>
        + TryFrom<CosmwasmCallInput<'x, PointerOf<Self>, InstantiateInput>, Error = VmErrorOf<Self>>
        + TryFrom<CosmwasmCallInput<'x, PointerOf<Self>, ExecuteInput>, Error = VmErrorOf<Self>>
        + TryFrom<CosmwasmCallInput<'x, PointerOf<Self>, ReplyInput>, Error = VmErrorOf<Self>>,
    PointerOf<Self>: for<'x> TryFrom<VmOutputOf<'x, Self>, Error = VmErrorOf<Self>>;

pub fn cosmwasm_system_entrypoint<I, V>(
    vm: &mut V,
    message: &[u8],
) -> Result<(Option<Binary>, Vec<Event>), VmErrorOf<V>>
where
    V: CosmwasmVM,
    I: Input,
    I::Output: DeserializeOwned + ReadLimit + DeserializeLimit + Into<ContractResult<Response>>,
    for<'x> VmInputOf<'x, V>: TryFrom<CosmwasmCallInput<'x, PointerOf<V>, I>, Error = VmErrorOf<V>>,
{
    log::debug!("SystemEntrypoint");
    let mut events = Vec::<Event>::new();
    let mut event_handler = |event: Event| {
        events.push(event);
    };
    vm.transaction_begin()?;
    match cosmwasm_system_run::<I, V>(vm, message, &mut event_handler) {
        Ok(data) => {
            vm.transaction_commit()?;
            Ok((data, events))
        }
        Err(e) => {
            vm.transaction_rollback()?;
            Err(e)
        }
    }
}

fn cosmwasm_system_run<I, V>(
    vm: &mut V,
    message: &[u8],
    mut event_handler: &mut dyn FnMut(Event),
) -> Result<Option<Binary>, VmErrorOf<V>>
where
    V: CosmwasmVM,
    I: Input,
    I::Output: DeserializeOwned + ReadLimit + DeserializeLimit + Into<ContractResult<Response>>,
    for<'x> VmInputOf<'x, V>: TryFrom<CosmwasmCallInput<'x, PointerOf<V>, I>, Error = VmErrorOf<V>>,
{
    log::debug!("SystemRun");
    let output = cosmwasm_call::<I, V>(vm, message).map(Into::into);
    log::debug!("Output: {:?}", output);
    match output {
        Ok(ContractResult::Ok(Response {
            messages,
            attributes,
            events,
            data,
            ..
        })) => {
            // https://github.com/CosmWasm/wasmd/blob/ac92fdcf37388cc8dc24535f301f64395f8fb3da/x/wasm/keeper/events.go#L16
            if attributes.len() > 0 {
                event_handler(Event::new("wasm".into(), attributes));
            }
            // https://github.com/CosmWasm/wasmd/blob/ac92fdcf37388cc8dc24535f301f64395f8fb3da/x/wasm/keeper/events.go#L29
            events.into_iter().for_each(|Event { ty, attributes, .. }| {
                event_handler(Event::new(format!("wasm-{}", ty), attributes))
            });
            messages.into_iter().try_fold(
                data,
                move |current,
                      SubMsg {
                          id,
                          msg,
                          gas_limit,
                          reply_on,
                      }|
                      -> Result<Option<Binary>, VmErrorOf<V>> {
                    log::debug!("Executing submessages");
                    let mut sub_events = Vec::<Event>::new();
                    let mut sub_event_handler = |event: Event| {
                        event_handler(event.clone());
                        sub_events.push(event);
                    };
                    vm.transaction_begin()?;
                    let sub_res = match msg {
                        CosmosMsg::Wasm(WasmMsg::Execute {
                            contract_addr,
                            msg: Binary(msg),
                            funds,
                        }) => {
                            let vm_contract_addr = Addr::unchecked(contract_addr).try_into()?;
                            vm.transfer(&vm_contract_addr, &funds)?;
                            let mut sub_vm = vm.load(vm_contract_addr, funds)?;
                            cosmwasm_system_run::<ExecuteInput, V>(
                                &mut sub_vm,
                                &msg,
                                &mut sub_event_handler,
                            )
                        }
                        CosmosMsg::Wasm(WasmMsg::Instantiate {
                            admin,
                            code_id,
                            msg,
                            funds,
                            label,
                        }) => {
                            let address = vm.new(CosmwasmNewContract {
                                code_id,
                                admin,
                                label,
                            })?;
                            vm.transfer(&address, &funds)?;
                            let mut sub_vm = vm.load(address, funds)?;
                            cosmwasm_system_run::<InstantiateInput, V>(
                                &mut sub_vm,
                                &msg,
                                &mut sub_event_handler,
                            )
                        }
                        CosmosMsg::Bank(BankMsg::Send { to_address, amount }) => {
                            vm.transfer(&to_address.try_into()?, &amount)?;
                            Ok(None)
                        }
                        _ => Err(SystemError::UnsupportedMessage.into()),
                    };

                    log::debug!("Submessage result: {:?}", sub_res);

                    let sub_cont = match (sub_res, reply_on.clone()) {
                        (Ok(v), ReplyOn::Never | ReplyOn::Error) => {
                            log::debug!("Commit & Continue");
                            vm.transaction_commit()?;
                            SubCallContinuation::Continue(v)
                        }
                        (Ok(v), ReplyOn::Always | ReplyOn::Success) => {
                            log::debug!("Commit & Reply");
                            vm.transaction_commit()?;
                            let events = sub_events.clone();
                            SubCallContinuation::Reply(SubMsgResult::Ok(SubMsgResponse {
                                events,
                                data: v,
                            }))
                        }
                        (Err(e), ReplyOn::Always | ReplyOn::Error) => {
                            log::debug!("Rollback & Reply");
                            vm.transaction_rollback()?;
                            SubCallContinuation::Reply(SubMsgResult::Err(format!("{:?}", e)))
                        }
                        (Err(e), ReplyOn::Never | ReplyOn::Success) => {
                            log::debug!("Rollback & Abort");
                            vm.transaction_rollback()?;
                            SubCallContinuation::Abort(e)
                        }
                    };

                    log::debug!("Submessage cont: {:?}", sub_cont);

                    match sub_cont {
                        // Current value might be overwritten.
                        SubCallContinuation::Continue(v) => Ok(v.or_else(|| current)),
                        // Abort result in no value indeed.
                        SubCallContinuation::Abort(e) => Err(e),
                        // Might be overwritten again.
                        SubCallContinuation::Reply(response) => {
                            let raw_response = serde_json::to_vec(&Reply {
                                id,
                                result: response,
                            })
                            .map_err(|_| SystemError::FailedToSerialize)?;
                            cosmwasm_system_run::<ReplyInput, V>(
                                vm,
                                &raw_response,
                                &mut event_handler,
                            )
                            .map(|v| v.or_else(|| current))
                        }
                    }
                },
            )
        }
        Ok(ContractResult::Err(e)) => Err(SystemError::ContractExecutionFailure(e).into()),
        Err(e) => Err(e),
    }
}

pub fn cosmwasm_system_query<V, C>(
    vm: &mut V,
    request: QueryRequest<C>,
) -> Result<SystemResult<CosmwasmQueryResult>, VmErrorOf<V>>
where
    V: CosmwasmVM + Host<QueryCustom = C>,
    for<'x> VmInputOf<'x, V>: TryFrom<CosmwasmQueryInput<'x, PointerOf<V>>, Error = VmErrorOf<V>>,
{
    log::debug!("SystemQuery");
    match request {
        QueryRequest::Custom(query) => Ok(vm.query_custom(query)?),
        QueryRequest::Bank(query) => Ok(vm.query(query)?),
        QueryRequest::Wasm(wasm_query) => match wasm_query {
            WasmQuery::Smart {
                contract_addr,
                msg: Binary(message),
            } => {
                let vm_addr = contract_addr.try_into()?;
                let mut sub_vm = vm.load(vm_addr, vec![])?;
                let QueryResult(output) = cosmwasm_query(&mut sub_vm, &message)?;
                Ok(SystemResult::Ok(output))
            }
            WasmQuery::Raw { contract_addr, key } => todo!(),
            WasmQuery::ContractInfo { contract_addr } => todo!(),
        },
    }
}

pub fn cosmwasm_system_query_raw<V, C>(
    vm: &mut V,
    request: QueryRequest<C>,
) -> Result<Vec<u8>, VmErrorOf<V>>
where
    V: CosmwasmVM + Host<QueryCustom = C>,
    for<'x> VmInputOf<'x, V>: TryFrom<CosmwasmQueryInput<'x, PointerOf<V>>, Error = VmErrorOf<V>>,
{
    log::debug!("SystemQueryRaw");
    let output = cosmwasm_system_query(vm, request)?;
    Ok(serde_json::to_vec(&output).map_err(|_| SystemError::FailedToSerialize)?)
}
