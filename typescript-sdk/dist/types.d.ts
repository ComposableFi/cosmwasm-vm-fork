import { InitOutput, InitInput } from "./typescript_bindings";
export type CosmWasmAttribute = {
    key: string;
    value: string;
};
export type CosmWasmEvent = {
    "type": string;
    attributes: Array<CosmWasmAttribute>;
};
export type CodeId = number;
export type Binary = string;
export const toBinary: (value: string) => Binary;
export const fromBinary: (value: Binary) => string;
export type Error = string;
export type Unit = null;
export type Addr = string;
export type Order = {
    ascending: null;
} | {
    descending: null;
};
export type ContractInfoResponse = {
    code_id: number;
    creator: string;
    admin: Option<string>;
    pinned: boolean;
    ibc_port: Option<string>;
};
export type ContractMeta = {
    code_id: number;
    admin: Option<string>;
    label: string;
};
export type Coin = {
    denom: String;
    amount: String;
};
export type MessageInfo = {
    sender: Addr;
    funds: Array<Coin>;
};
export type BlockInfo = {
    height: number;
    time: string;
    chain_id: string;
};
export type TransactionInfo = {
    index: number;
};
export type ContractInfo = {
    address: Addr;
};
export type Env = {
    block: BlockInfo;
    transaction: Option<TransactionInfo>;
    contract: ContractInfo;
};
export type Option<T> = null | undefined | T;
export const Some: <T>(value: T) => Option<T>;
export const None: <T>() => Option<T>;
export type Result<T, U> = {
    Ok: T;
} | {
    Err: U;
};
export const Ok: <T, U>(value: T) => Result<T, U>;
export const Err: <T, U>(value: U) => Result<T, U>;
export const unit: Unit;
export const decode: (value: number[]) => string;
export const encode: (value: object) => number[];
export const toHex: (byteArray: number[]) => string;
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

//# sourceMappingURL=types.d.ts.map
