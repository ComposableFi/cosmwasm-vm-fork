"use strict";
exports.__esModule = true;
exports.toHex = exports.encode = exports.decode = exports.unit = exports.Err = exports.Ok = exports.None = exports.Some = exports.fromBinary = exports.toBinary = void 0;
var Buffer = require('buffer/');
var toBinary = function (value) { return Buffer.from(value).toString("base64"); };
exports.toBinary = toBinary;
var fromBinary = function (value) { return Buffer.from(value, "base64").toString(); };
exports.fromBinary = fromBinary;
var Some = function (value) { return value; };
exports.Some = Some;
var None = function () { return null; };
exports.None = None;
var Ok = function (value) { return ({
    Ok: value
}); };
exports.Ok = Ok;
var Err = function (value) { return ({
    Err: value
}); };
exports.Err = Err;
exports.unit = null;
var decode = function (value) {
    return String.fromCharCode.apply(String, value);
};
exports.decode = decode;
var encode = function (value) {
    return JSON.stringify(value).split("").map(function (c) { return c.charCodeAt(0); });
};
exports.encode = encode;
var toHex = function (byteArray) {
    return Array.from(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join("");
};
exports.toHex = toHex;
