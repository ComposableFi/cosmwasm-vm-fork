export declare type CosmWasmAttribute = {
    key: string;
    value: string;
};
export declare type CosmWasmEvent = {
    "type": string;
    attributes: Array<CosmWasmAttribute>;
};
export declare type CodeId = number;
export declare type Binary = string;
export declare type Error = string;
export declare type Unit = null;
export declare type Addr = string;
export declare type Result<T, U> = {
    Ok: T;
} | {
    Err: U;
};
export declare type Order = {
    ascending: null;
} | {
    descending: null;
};
export declare type ContractInfoResponse = {
    code_id: number;
    creator: string;
    admin: Option<string>;
    pinned: boolean;
    ibc_port: Option<string>;
};
export declare type ContractMeta = {
    code_id: number;
    admin: Option<string>;
    label: string;
};
export declare type Coin = {
    denom: String;
    amount: String;
};
export declare type MessageInfo = {
    sender: Addr;
    funds: Array<Coin>;
};
export declare type BlockInfo = {
    height: number;
    time: string;
    chain_id: string;
};
export declare type TransactionInfo = {
    index: number;
};
export declare type ContractInfo = {
    address: Addr;
};
export declare type Env = {
    block: BlockInfo;
    transaction: Option<TransactionInfo>;
    contract: ContractInfo;
};
export declare type Option<T> = null | undefined | T;
