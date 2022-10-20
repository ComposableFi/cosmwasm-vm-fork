import {InitInput, InitOutput} from "./typescript_bindings";
import {VMHost, VMStep} from "../src/vm_types";
import {Result} from "../src/common";

export function vmSetup(module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>
export function vmInstantiate<T>(host: VMHost, code: Uint8Array, message: T): Result<VMStep, Error>