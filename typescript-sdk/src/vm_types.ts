import {
	Binary,
	Coin,
	ContractInfoResponse,
	ContractMeta,
	CosmWasmEvent,
	Env,
	MessageInfo,
	Option,
	Order,
	Result,
	Unit
} from "./common";

export type VMStep = {
	data: Option<Binary>,
	events: Array<CosmWasmEvent>
};

export type StorageKey = Array<number>;
export type StorageValue = Array<number>;
export type StorageIterator = number;

export type VMHost = {
	// Environment
	info: () => MessageInfo,
	env: () => Env,

	// Running contract state
	running_contract_meta: () => Result<ContractMeta, Error>,
	set_contract_meta: (address: string, metadata: ContractMeta) => Result<Unit, Error>,

	// Transactional
	transaction_begin: () => Result<Unit, Error>,
	transaction_commit: () => Result<Unit, Error>,
	transaction_rollback: () => Result<Unit, Error>,

	// Gas
	// TODO: add strongly typed VmGas
	charge: (value: any) => Result<Unit, Error>,
	gas_checkpoint_push: () => Result<Unit, Error>,
	gas_checkpoint_pop: () => Result<Unit, Error>,
	gas_ensure_available: () => Result<Unit, Error>,

	// Address validation
	addr_validate: (addr: string) => Result<Result<Unit, Error>, Error>,
	addr_canonicalize: (addr: string) => Result<Result<Array<number>, Error>, Error>,
	addr_humanize: (addr: Array<number>) => Result<Result<string, Error>, Error>,

	// Database
	db_write: (key: StorageKey, value: StorageValue) => Result<Unit, Error>,
	db_read: (key: StorageKey) => Result<Option<StorageValue>, Error>,
	db_remove: (key: StorageKey) => Result<Unit, Error>,
	db_scan: (start: Option<StorageKey>, end: Option<StorageKey>, order: Order) => Result<StorageIterator, Error>,
	db_next: (iterator_id: StorageIterator) => Result<[StorageKey, StorageValue], Error>,

	// Execution
	query_continuation: (address: string, message: Array<number>) => Result<Result<Binary, Error>, Error>,
	continue_instantiate: (metadata: ContractMeta, funds: Array<Coin>, message: Array<number>, event_handler: any) => Result<[string, Option<Binary>], Error>,
	continue_execute: (address: string, funds: Array<Coin>, message: Array<number>, event_handler: any) => Result<Option<Binary>, Error>,
	continue_migrate: (address: string, funds: Array<Coin>, message: Array<number>, event_handler: any) => Result<Option<Binary>, Error>,
	query_raw: (address: string, key: StorageKey) => Result<Option<Array<number>>, Error>,
	query_info: (address: string) => Result<ContractInfoResponse, Error>,

	// Bank
	transfer: (to: string, funds: Array<Coin>) => Result<Unit, Error>,
	burn: (funds: Array<Coin>) => Result<Unit, Error>,
	balance: (address: string, denom: string) => Result<Coin, Error>,
	all_balance: (address: string) => Result<Array<Coin>, Error>,

	// Debug
	abort: (message: string) => Result<Unit, Error>,
	debug: (message: Array<number>) => Result<Unit, Error>,

	// TODO: crypto functions
}