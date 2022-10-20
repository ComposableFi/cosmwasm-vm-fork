export declare const vm: {
    vmSetup: (module_or_path?: import("./typescript_bindings").InitInput | Promise<import("./typescript_bindings").InitInput>) => Promise<import("./typescript_bindings").InitOutput>;
    vmInstantiate: <T>(host: import("./vm_types").VMHost, code: Uint8Array, message: T) => import("./common").Result<import("./vm_types").VMStep, Error>;
    vmExecute: <T_1>(host: import("./vm_types").VMHost, code: Uint8Array, message: T_1) => import("./common").Result<import("./vm_types").VMStep, Error>;
    vmMigrate: <T_2>(host: import("./vm_types").VMHost, code: Uint8Array, message: T_2) => import("./common").Result<import("./vm_types").VMStep, Error>;
    vmContinueInstantiate: <T_3>(host: import("./vm_types").VMHost, code: Uint8Array, message: T_3, event_handler: any) => import("./common").Result<string, Error>;
    vmContinueExecute: <T_4>(host: import("./vm_types").VMHost, code: Uint8Array, message: T_4, event_handler: any) => import("./common").Result<string, Error>;
    vmContinueMigrate: <T_5>(host: import("./vm_types").VMHost, code: Uint8Array, message: T_5, event_handler: any) => import("./common").Result<string, Error>;
    vmQuery: <T_6>(host: import("./vm_types").VMHost, code: Uint8Array, query: T_6) => import("./common").Result<import("./common").Result<import("./common").Result<string, Error>, Error>, Error>;
};
