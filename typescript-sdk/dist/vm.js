"use strict";
exports.__esModule = true;
exports.vmQuery = exports.vmContinueMigrate = exports.vmContinueExecute = exports.vmContinueInstantiate = exports.vmMigrate = exports.vmExecute = exports.vmInstantiate = exports.vmSetup = void 0;
var typescript_bindings_1 = require("./typescript_bindings");
var vmSetup = function (module_or_path) {
    return (0, typescript_bindings_1["default"])(module_or_path);
};
exports.vmSetup = vmSetup;
var vmInstantiate = function (host, code, message) {
    return (0, typescript_bindings_1.vm_instantiate)(host, code, JSON.stringify(message));
};
exports.vmInstantiate = vmInstantiate;
var vmExecute = function (host, code, message) {
    return (0, typescript_bindings_1.vm_execute)(host, code, JSON.stringify(message));
};
exports.vmExecute = vmExecute;
var vmMigrate = function (host, code, message) {
    return (0, typescript_bindings_1.vm_migrate)(host, code, JSON.stringify(message));
};
exports.vmMigrate = vmMigrate;
var vmContinueInstantiate = function (host, code, message, event_handler) {
    return (0, typescript_bindings_1.vm_continue_instantiate)(host, code, JSON.stringify(message), event_handler);
};
exports.vmContinueInstantiate = vmContinueInstantiate;
var vmContinueExecute = function (host, code, message, event_handler) {
    return (0, typescript_bindings_1.vm_continue_execute)(host, code, JSON.stringify(message), event_handler);
};
exports.vmContinueExecute = vmContinueExecute;
var vmContinueMigrate = function (host, code, message, event_handler) {
    return (0, typescript_bindings_1.vm_continue_migrate)(host, code, JSON.stringify(message), event_handler);
};
exports.vmContinueMigrate = vmContinueMigrate;
var vmQuery = function (host, code, query) {
    return (0, typescript_bindings_1.vm_query)(host, code, JSON.stringify(query));
};
exports.vmQuery = vmQuery;
