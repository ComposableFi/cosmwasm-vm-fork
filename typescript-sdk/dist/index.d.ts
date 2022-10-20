import { InitOutput, InitInput } from "./typescript_bindings";
type CosmWasmAttribute = {
    key: string;
    value: string;
};
type CosmWasmEvent = {
    "type": string;
    attributes: Array<CosmWasmAttribute>;
};
type Binary = string;
type Unit = null;
type Addr = string;
type Order = {
    ascending: null;
} | {
    descending: null;
};
type ContractInfoResponse = {
    code_id: number;
    creator: string;
    admin: Option<string>;
    pinned: boolean;
    ibc_port: Option<string>;
};
type ContractMeta = {
    code_id: number;
    admin: Option<string>;
    label: string;
};
type Coin = {
    denom: String;
    amount: String;
};
type MessageInfo = {
    sender: Addr;
    funds: Array<Coin>;
};
type BlockInfo = {
    height: number;
    time: string;
    chain_id: string;
};
type TransactionInfo = {
    index: number;
};
type ContractInfo = {
    address: Addr;
};
type Env = {
    block: BlockInfo;
    transaction: Option<TransactionInfo>;
    contract: ContractInfo;
};
type Option<T> = null | undefined | T;
type Result<T, U> = {
    Ok: T;
} | {
    Err: U;
};
declare const Ok: <T, U>(value: T) => Result<T, U>;
declare const Err: <T, U>(value: U) => Result<T, U>;
export type VMStep = {
    data: Option<Binary>;
    events: Array<CosmWasmEvent>;
};
export type StorageKey = Array<number>;
export type StorageValue = Array<number>;
export type StorageIterator = number;
export type VMHost = {
    info: () => MessageInfo;
    env: () => Env;
    running_contract_meta: () => Result<ContractMeta, Error>;
    set_contract_meta: (address: string, metadata: ContractMeta) => Result<Unit, Error>;
    transaction_begin: () => Result<Unit, Error>;
    transaction_commit: () => Result<Unit, Error>;
    transaction_rollback: () => Result<Unit, Error>;
    charge: (value: any) => Result<Unit, Error>;
    gas_checkpoint_push: () => Result<Unit, Error>;
    gas_checkpoint_pop: () => Result<Unit, Error>;
    gas_ensure_available: () => Result<Unit, Error>;
    addr_validate: (addr: string) => Result<Result<Unit, Error>, Error>;
    addr_canonicalize: (addr: string) => Result<Result<Array<number>, Error>, Error>;
    addr_humanize: (addr: Array<number>) => Result<Result<string, Error>, Error>;
    db_write: (key: StorageKey, value: StorageValue) => Result<Unit, Error>;
    db_read: (key: StorageKey) => Result<Option<StorageValue>, Error>;
    db_remove: (key: StorageKey) => Result<Unit, Error>;
    db_scan: (start: Option<StorageKey>, end: Option<StorageKey>, order: Order) => Result<StorageIterator, Error>;
    db_next: (iterator_id: StorageIterator) => Result<[StorageKey, StorageValue], Error>;
    query_continuation: (address: string, message: Array<number>) => Result<Result<Binary, Error>, Error>;
    continue_instantiate: (metadata: ContractMeta, funds: Array<Coin>, message: Array<number>, event_handler: any) => Result<[string, Option<Binary>], Error>;
    continue_execute: (address: string, funds: Array<Coin>, message: Array<number>, event_handler: any) => Result<Option<Binary>, Error>;
    continue_migrate: (address: string, funds: Array<Coin>, message: Array<number>, event_handler: any) => Result<Option<Binary>, Error>;
    query_raw: (address: string, key: StorageKey) => Result<Option<Array<number>>, Error>;
    query_info: (address: string) => Result<ContractInfoResponse, Error>;
    transfer: (to: string, funds: Array<Coin>) => Result<Unit, Error>;
    burn: (funds: Array<Coin>) => Result<Unit, Error>;
    balance: (address: string, denom: string) => Result<Coin, Error>;
    all_balance: (address: string) => Result<Array<Coin>, Error>;
    abort: (message: string) => Result<Unit, Error>;
    debug: (message: Array<number>) => Result<Unit, Error>;
};
export const vmSetup: (module_or_path?: InitInput | Promise<InitInput>) => Promise<InitOutput>;
export const vmInstantiate: <T>(host: VMHost, code: Uint8Array, message: T) => Result<VMStep, Error>;
export const vmExecute: <T>(host: VMHost, code: Uint8Array, message: T) => Result<VMStep, Error>;
export const vmMigrate: <T>(host: VMHost, code: Uint8Array, message: T) => Result<VMStep, Error>;
export const vmContinueInstantiate: <T>(host: VMHost, code: Uint8Array, message: T, event_handler: any) => Result<Option<Binary>, Error>;
export const vmContinueExecute: <T>(host: VMHost, code: Uint8Array, message: T, event_handler: any) => Result<Option<Binary>, Error>;
export const vmContinueMigrate: <T>(host: VMHost, code: Uint8Array, message: T, event_handler: any) => Result<Option<Binary>, Error>;
export const vmQuery: <T>(host: VMHost, code: Uint8Array, query: T) => Result<Result<Result<Binary, Error>, Error>, Error>;
export * from './typescript_bindings';

//# sourceMappingURL=index.d.ts.map
