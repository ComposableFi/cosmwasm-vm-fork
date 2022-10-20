// TODO: probably worth using schemars with original cosmwasm std to export all this types

export type CosmWasmAttribute = {
  key: string,
  value: string,
};

export type CosmWasmEvent = {
  "type": string,
  attributes: Array<CosmWasmAttribute>,
};

export type CodeId = number;

export type Binary = string;

export type Error = string;

export type Unit = null;

export type Addr = string;
export type Result<T, U> = { Ok: T } | { Err: U };
export type Order = { ascending: null } | { descending: null };

export type ContractInfoResponse = {
  code_id: number,
  creator: string,
  admin: Option<string>,
  pinned: boolean,
  ibc_port: Option<string>,
};

export type ContractMeta = {
  code_id: number,
  admin: Option<string>,
  label: string
};

export type Coin = {
  denom: String,
  amount: String
};

export type MessageInfo = {
  sender: Addr,
  funds: Array<Coin>
};

export type BlockInfo = {
  height: number,
  time: string, // timestamp u128
  chain_id: string,
};

export type TransactionInfo = {
  index: number
};

export type ContractInfo = {
  address: Addr
};

export type Env = {
  block: BlockInfo,
  transaction: Option<TransactionInfo>,
  contract: ContractInfo,
}

export type Option<T> = null | undefined | T;