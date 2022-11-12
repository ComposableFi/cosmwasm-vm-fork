// TODO: probably worth using schemars with original cosmwasm std to export all this types
import type { Binary, Option, Result, Unit } from './types.js';

export const toBinary = (value: string): Binary =>
  Buffer.from(value).toString('base64');
export const fromBinary = (value: Binary): string =>
  Buffer.from(value, 'base64').toString();
export const Some = <T>(value: T): Option<T> => value;
export const None = <T>(): Option<T> => null;

export const Ok = <T, U>(value: T): Result<T, U> => ({
  Ok: value,
});

export const Err = <T, U>(value: U): Result<T, U> => ({
  Err: value,
});

export const unit: Unit = null;

export const decode = (value: number[]): string =>
  String.fromCharCode(...value);

export const encode = (value: object): number[] =>
  JSON.stringify(value)
    .split('')
    .map(c => c.charCodeAt(0));

export const toHex = (byteArray: number[]): string =>
  Array.from(byteArray, function (byte) {
    return `0${(byte & 0xff).toString(16)}`.slice(-2);
  }).join('');
