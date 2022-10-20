import { Binary, Option, Result } from "./common";
import { VMHost, VMStep } from "./vm_types";
import init, { vm_query, vm_instantiate, vm_execute, vm_migrate, vm_continue_instantiate, vm_continue_execute, vm_continue_migrate, InitOutput, InitInput } from './typescript_bindings';



export const vmSetup = (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput> =>
  init(module_or_path);

export const vmInstantiate = <T>(host: VMHost, code: Uint8Array, message: T): Result<VMStep, Error> =>
  vm_instantiate(host, code, JSON.stringify(message));

export const vmExecute = <T>(host: VMHost, code: Uint8Array, message: T): Result<VMStep, Error> =>
  vm_execute(host, code, JSON.stringify(message));

export const vmMigrate = <T>(host: VMHost, code: Uint8Array, message: T): Result<VMStep, Error> =>
  vm_migrate(host, code, JSON.stringify(message));

export const vmContinueInstantiate = <T>(host: VMHost, code: Uint8Array, message: T, event_handler: any): Result<Option<Binary>, Error> =>
  vm_continue_instantiate(host, code, JSON.stringify(message), event_handler);

export const vmContinueExecute = <T>(host: VMHost, code: Uint8Array, message: T, event_handler: any): Result<Option<Binary>, Error> =>
  vm_continue_execute(host, code, JSON.stringify(message), event_handler);

export const vmContinueMigrate = <T>(host: VMHost, code: Uint8Array, message: T, event_handler: any): Result<Option<Binary>, Error> =>
  vm_continue_migrate(host, code, JSON.stringify(message), event_handler);

export const vmQuery = <T>(host: VMHost, code: Uint8Array, query: T): Result<Result<Result<Binary, Error>, Error>, Error> =>
  vm_query(host, code, JSON.stringify(query));
