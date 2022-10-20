/* tslint:disable */
/* eslint-disable */
/**
* @param {any} typescript_vm
* @param {Uint8Array} code
* @param {string} message
* @returns {any}
*/
export function vm_instantiate(typescript_vm: any, code: Uint8Array, message: string): any;
/**
* @param {any} typescript_vm
* @param {Uint8Array} code
* @param {string} message
* @returns {any}
*/
export function vm_execute(typescript_vm: any, code: Uint8Array, message: string): any;
/**
* @param {any} typescript_vm
* @param {Uint8Array} code
* @param {string} message
* @returns {any}
*/
export function vm_migrate(typescript_vm: any, code: Uint8Array, message: string): any;
/**
* @param {any} typescript_vm
* @param {Uint8Array} code
* @param {string} message
* @param {bigint} event_handler
* @returns {any}
*/
export function vm_continue_instantiate(typescript_vm: any, code: Uint8Array, message: string, event_handler: bigint): any;
/**
* @param {any} typescript_vm
* @param {Uint8Array} code
* @param {string} message
* @param {bigint} event_handler
* @returns {any}
*/
export function vm_continue_execute(typescript_vm: any, code: Uint8Array, message: string, event_handler: bigint): any;
/**
* @param {any} typescript_vm
* @param {Uint8Array} code
* @param {string} message
* @param {bigint} event_handler
* @returns {any}
*/
export function vm_continue_migrate(typescript_vm: any, code: Uint8Array, message: string, event_handler: bigint): any;
/**
* @param {any} typescript_vm
* @param {Uint8Array} code
* @param {any} arg2
* @returns {any}
*/
export function vm_query(typescript_vm: any, code: Uint8Array, arg2: any): any;
