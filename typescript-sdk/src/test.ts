import * as fs from "fs";
import { ContractMeta, Coin, Ok, Err, None, encode, decode, toHex, toBinary, MessageInfo, Env, Addr, CodeId, Some, Unit, unit } from "./common";
import { vmInstantiate, vmExecute, vmContinueInstantiate, VMHost, StorageValue, vmSetup } from "./vm";

type VMHostShared = {
  storage: Map<Addr, Map<String, Object>>,
  codes: Map<CodeId, Uint8Array>,
  contracts: Map<Addr, ContractMeta>,
  nextAccountId: number,
};

const createVM = (info: MessageInfo, env: Env, metadata: ContractMeta, shared: VMHostShared): Partial<VMHost> => {
  const getStore = (address: string): Map<String, Object> => {
    if (shared.storage.has(address)) {
      return shared.storage.get(address)!;
    }
    else {
      return new Map<String, Object>();
    }
  };
  const newContractAddress = (): number => ++shared.nextAccountId;
  const setMetadata = (address: string, metadata: ContractMeta) => {
    shared.contracts.set(address, metadata);
  };
  return {
    info: () => info,
    env: () => env,
    transaction_begin: () => {
      return Ok(unit);
    },
    transaction_rollback: () => {
      return Ok(unit);
    },
    transaction_commit: () => {
      return Ok(unit);
    },
    charge: (_value: object) => {
      return Ok(unit);
    },
    gas_checkpoint_push: () => Ok(unit),
    gas_checkpoint_pop: () => Ok(unit),
    addr_validate: (_input: string) => {
      return Ok(Ok(unit));
    },
    db_write: (key: Array<number>, value: Array<number>) => {
      const store = getStore(env.contract.address);
      store.set(toHex(key), JSON.parse(decode(value)));
      shared.storage.set(env.contract.address, store);
      return Ok(unit);
    },
    db_read: (key: Array<number>) => {
      const store = getStore(env.contract.address);
      const entryKey = toHex(key);
      if (store.has(entryKey)) {
        return Ok(Some<StorageValue>(encode(store.get(entryKey)!)));
      }
      else {
        return Ok(None<StorageValue>());
      }
    },
    running_contract_meta: () => Ok(metadata),
    continue_instantiate: (newContractMeta: ContractMeta, funds: Array<Coin>, message: Array<number>, event_handler: any) => {
      const newAccountId = newContractAddress();
      setMetadata(newAccountId.toString(), newContractMeta);
      const newInfo: MessageInfo = {
        sender: env.contract.address,
        funds
      };
      const newEnv: Env = {
        block: env.block,
        transaction: env.transaction,
        contract: {
          address: newAccountId.toString()
        },
      };
      const subVM = createVM(newInfo, newEnv, newContractMeta, shared);
      // TODO: check existence of code
      const code = shared.codes.get(newContractMeta.code_id)!;
      // TODO: normally we reload a new host with the new meta for the newly running contract, we update the env to reflect sender/funds
      const result = vmContinueInstantiate(<VMHost>subVM, code, JSON.parse(decode(message)), event_handler);
      if ("Ok" in result) {
        // new contract address and result of instantiate call
        return Ok([newAccountId.toString(), result.Ok!]);
      }
      else {
        return Err(result.Err);
      }
    }
  };
};

const main = async () => {
  await vmSetup();

  const code = new Uint8Array(fs.readFileSync("./reflect.wasm"));
  const senderAddress = 0;
  const senderFunds: Array<Coin> = [];
  const initialCodeId = 0;
  const initialAddress = 100000;
  const initialMessageInfo: MessageInfo = {
    sender: senderAddress.toString(),
    funds: senderFunds,
  };
  const initialEnv: Env = {
    block: {
      height: 0,
      time: "0",
      chain_id: "html-chain",
    },
    transaction: Some({
      index: 0
    }),
    contract: {
      address: initialAddress.toString(),
    },
  };
  const initialMetadata: ContractMeta = {
    code_id: initialCodeId,
    admin: None<string>(),
    label: "entry",
  };
  const vmShared: VMHostShared = {
    storage: new Map<Addr, Map<string, Object>>(),
    codes: new Map<CodeId, Uint8Array>([[initialCodeId, code]]),
    contracts: new Map<Addr, ContractMeta>([[initialAddress.toString(), initialMetadata]]),
    nextAccountId: initialAddress,
  };
  const vm = createVM(initialMessageInfo, initialEnv, initialMetadata, vmShared);
  const result = vmInstantiate(<VMHost>vm, code, {});
  console.log(JSON.stringify(result));
  console.log(vmShared);
  const result1 = vmExecute(<VMHost>vm, code, {
    reflect_msg: {
      msgs: [{
        wasm: {
          instantiate: {
            admin: None<Addr>(),
            code_id: 0,
            msg: toBinary(JSON.stringify({})),
            funds: [],
            label: "hello"
          }
        }
      }]
    }
  });
  console.log(JSON.stringify(result1));
  console.log(vmShared);
};

main();
