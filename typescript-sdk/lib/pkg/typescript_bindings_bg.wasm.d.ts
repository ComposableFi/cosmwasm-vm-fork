/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function vm_instantiate(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
): number;
export function vm_execute(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
): number;
export function vm_migrate(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
): number;
export function vm_continue_instantiate(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number
): number;
export function vm_continue_execute(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number
): number;
export function vm_continue_migrate(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number
): number;
export function vm_query(a: number, b: number, c: number, d: number): number;
export function __wbindgen_malloc(a: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number): number;
export function __wbindgen_free(a: number, b: number): void;
export function __wbindgen_exn_store(a: number): void;
