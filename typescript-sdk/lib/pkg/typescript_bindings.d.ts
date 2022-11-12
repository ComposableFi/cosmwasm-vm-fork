/* tslint:disable */
/* eslint-disable */
/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {string} message
 * @returns {any}
 */
export function vm_instantiate(
  typescript_vm: any,
  code: Uint8Array,
  message: string
): any;
/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {string} message
 * @returns {any}
 */
export function vm_execute(
  typescript_vm: any,
  code: Uint8Array,
  message: string
): any;
/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {string} message
 * @returns {any}
 */
export function vm_migrate(
  typescript_vm: any,
  code: Uint8Array,
  message: string
): any;
/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {string} message
 * @param {bigint} event_handler
 * @returns {any}
 */
export function vm_continue_instantiate(
  typescript_vm: any,
  code: Uint8Array,
  message: string,
  event_handler: bigint
): any;
/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {string} message
 * @param {bigint} event_handler
 * @returns {any}
 */
export function vm_continue_execute(
  typescript_vm: any,
  code: Uint8Array,
  message: string,
  event_handler: bigint
): any;
/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {string} message
 * @param {bigint} event_handler
 * @returns {any}
 */
export function vm_continue_migrate(
  typescript_vm: any,
  code: Uint8Array,
  message: string,
  event_handler: bigint
): any;
/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {any} arg2
 * @returns {any}
 */
export function vm_query(typescript_vm: any, code: Uint8Array, arg2: any): any;

export type InitInput =
  | RequestInfo
  | URL
  | Response
  | BufferSource
  | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly vm_instantiate: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number
  ) => number;
  readonly vm_execute: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number
  ) => number;
  readonly vm_migrate: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number
  ) => number;
  readonly vm_continue_instantiate: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ) => number;
  readonly vm_continue_execute: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ) => number;
  readonly vm_continue_migrate: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ) => number;
  readonly vm_query: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {SyncInitInput} module
 *
 * @returns {InitOutput}
 */
export function initSync(module: SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {InitInput | Promise<InitInput>} module_or_path
 *
 * @returns {Promise<InitOutput>}
 */
export default function init(
  module_or_path?: InitInput | Promise<InitInput>
): Promise<InitOutput>;
