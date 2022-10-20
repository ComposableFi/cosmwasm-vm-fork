import $hgUW1$bufferindex from "buffer/index";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
var $0be2f2a11bcce2c0$exports = {};

$parcel$export($0be2f2a11bcce2c0$exports, "vmSetup", () => $0be2f2a11bcce2c0$export$75de4951c04567a6);
$parcel$export($0be2f2a11bcce2c0$exports, "vmInstantiate", () => $0be2f2a11bcce2c0$export$cfb7a04f4bc7b9fb);
$parcel$export($0be2f2a11bcce2c0$exports, "vmExecute", () => $0be2f2a11bcce2c0$export$8ad1ca901921ae38);
$parcel$export($0be2f2a11bcce2c0$exports, "vmMigrate", () => $0be2f2a11bcce2c0$export$61bd1515aa5b8ebc);
$parcel$export($0be2f2a11bcce2c0$exports, "vmContinueInstantiate", () => $0be2f2a11bcce2c0$export$6f25983a79c1573f);
$parcel$export($0be2f2a11bcce2c0$exports, "vmContinueExecute", () => $0be2f2a11bcce2c0$export$717645e2104c9250);
$parcel$export($0be2f2a11bcce2c0$exports, "vmContinueMigrate", () => $0be2f2a11bcce2c0$export$699106420ce4b976);
$parcel$export($0be2f2a11bcce2c0$exports, "vmQuery", () => $0be2f2a11bcce2c0$export$6617c1e71955a2e1);
var $851cfc7b9145f23b$exports = {};

$parcel$defineInteropFlag($851cfc7b9145f23b$exports);

$parcel$export($851cfc7b9145f23b$exports, "vm_instantiate", () => $851cfc7b9145f23b$export$143dee580f10c36a);
$parcel$export($851cfc7b9145f23b$exports, "vm_execute", () => $851cfc7b9145f23b$export$24468e70075100c3);
$parcel$export($851cfc7b9145f23b$exports, "vm_migrate", () => $851cfc7b9145f23b$export$7050f2a4bc5068c4);
$parcel$export($851cfc7b9145f23b$exports, "vm_continue_instantiate", () => $851cfc7b9145f23b$export$792daa7c52424572);
$parcel$export($851cfc7b9145f23b$exports, "vm_continue_execute", () => $851cfc7b9145f23b$export$b247350223035db8);
$parcel$export($851cfc7b9145f23b$exports, "vm_continue_migrate", () => $851cfc7b9145f23b$export$5dc1f617a095fb2d);
$parcel$export($851cfc7b9145f23b$exports, "vm_query", () => $851cfc7b9145f23b$export$e6ce27f0a3a0f8fa);
$parcel$export($851cfc7b9145f23b$exports, "initSync", () => $851cfc7b9145f23b$export$2ec80ee76a9348bf);
$parcel$export($851cfc7b9145f23b$exports, "default", () => $851cfc7b9145f23b$export$2e2bcd8739ae039);
let $851cfc7b9145f23b$var$wasm;
const $851cfc7b9145f23b$var$heap = new Array(32).fill(undefined);
$851cfc7b9145f23b$var$heap.push(undefined, null, true, false);
function $851cfc7b9145f23b$var$getObject(idx) {
    return $851cfc7b9145f23b$var$heap[idx];
}
let $851cfc7b9145f23b$var$heap_next = $851cfc7b9145f23b$var$heap.length;
function $851cfc7b9145f23b$var$dropObject(idx) {
    if (idx < 36) return;
    $851cfc7b9145f23b$var$heap[idx] = $851cfc7b9145f23b$var$heap_next;
    $851cfc7b9145f23b$var$heap_next = idx;
}
function $851cfc7b9145f23b$var$takeObject(idx) {
    const ret = $851cfc7b9145f23b$var$getObject(idx);
    $851cfc7b9145f23b$var$dropObject(idx);
    return ret;
}
let $851cfc7b9145f23b$var$WASM_VECTOR_LEN = 0;
let $851cfc7b9145f23b$var$cachedUint8Memory0 = new Uint8Array();
function $851cfc7b9145f23b$var$getUint8Memory0() {
    if ($851cfc7b9145f23b$var$cachedUint8Memory0.byteLength === 0) $851cfc7b9145f23b$var$cachedUint8Memory0 = new Uint8Array($851cfc7b9145f23b$var$wasm.memory.buffer);
    return $851cfc7b9145f23b$var$cachedUint8Memory0;
}
const $851cfc7b9145f23b$var$cachedTextEncoder = new TextEncoder("utf-8");
const $851cfc7b9145f23b$var$encodeString = typeof $851cfc7b9145f23b$var$cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
    return $851cfc7b9145f23b$var$cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
    const buf = $851cfc7b9145f23b$var$cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
};
function $851cfc7b9145f23b$var$passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = $851cfc7b9145f23b$var$cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        $851cfc7b9145f23b$var$getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        $851cfc7b9145f23b$var$WASM_VECTOR_LEN = buf.length;
        return ptr;
    }
    let len = arg.length;
    let ptr1 = malloc(len);
    const mem = $851cfc7b9145f23b$var$getUint8Memory0();
    let offset = 0;
    for(; offset < len; offset++){
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr1 + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) arg = arg.slice(offset);
        ptr1 = realloc(ptr1, len, len = offset + arg.length * 3);
        const view = $851cfc7b9145f23b$var$getUint8Memory0().subarray(ptr1 + offset, ptr1 + len);
        const ret = $851cfc7b9145f23b$var$encodeString(arg, view);
        offset += ret.written;
    }
    $851cfc7b9145f23b$var$WASM_VECTOR_LEN = offset;
    return ptr1;
}
function $851cfc7b9145f23b$var$isLikeNone(x) {
    return x === undefined || x === null;
}
let $851cfc7b9145f23b$var$cachedInt32Memory0 = new Int32Array();
function $851cfc7b9145f23b$var$getInt32Memory0() {
    if ($851cfc7b9145f23b$var$cachedInt32Memory0.byteLength === 0) $851cfc7b9145f23b$var$cachedInt32Memory0 = new Int32Array($851cfc7b9145f23b$var$wasm.memory.buffer);
    return $851cfc7b9145f23b$var$cachedInt32Memory0;
}
const $851cfc7b9145f23b$var$cachedTextDecoder = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
});
$851cfc7b9145f23b$var$cachedTextDecoder.decode();
function $851cfc7b9145f23b$var$getStringFromWasm0(ptr, len) {
    return $851cfc7b9145f23b$var$cachedTextDecoder.decode($851cfc7b9145f23b$var$getUint8Memory0().subarray(ptr, ptr + len));
}
function $851cfc7b9145f23b$var$addHeapObject(obj) {
    if ($851cfc7b9145f23b$var$heap_next === $851cfc7b9145f23b$var$heap.length) $851cfc7b9145f23b$var$heap.push($851cfc7b9145f23b$var$heap.length + 1);
    const idx = $851cfc7b9145f23b$var$heap_next;
    $851cfc7b9145f23b$var$heap_next = $851cfc7b9145f23b$var$heap[idx];
    $851cfc7b9145f23b$var$heap[idx] = obj;
    return idx;
}
let $851cfc7b9145f23b$var$cachedFloat64Memory0 = new Float64Array();
function $851cfc7b9145f23b$var$getFloat64Memory0() {
    if ($851cfc7b9145f23b$var$cachedFloat64Memory0.byteLength === 0) $851cfc7b9145f23b$var$cachedFloat64Memory0 = new Float64Array($851cfc7b9145f23b$var$wasm.memory.buffer);
    return $851cfc7b9145f23b$var$cachedFloat64Memory0;
}
let $851cfc7b9145f23b$var$cachedBigInt64Memory0 = new BigInt64Array();
function $851cfc7b9145f23b$var$getBigInt64Memory0() {
    if ($851cfc7b9145f23b$var$cachedBigInt64Memory0.byteLength === 0) $851cfc7b9145f23b$var$cachedBigInt64Memory0 = new BigInt64Array($851cfc7b9145f23b$var$wasm.memory.buffer);
    return $851cfc7b9145f23b$var$cachedBigInt64Memory0;
}
function $851cfc7b9145f23b$var$debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == "number" || type == "boolean" || val == null) return `${val}`;
    if (type == "string") return `"${val}"`;
    if (type == "symbol") {
        const description = val.description;
        if (description == null) return "Symbol";
        else return `Symbol(${description})`;
    }
    if (type == "function") {
        const name = val.name;
        if (typeof name == "string" && name.length > 0) return `Function(${name})`;
        else return "Function";
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = "[";
        if (length > 0) debug += $851cfc7b9145f23b$var$debugString(val[0]);
        for(let i = 1; i < length; i++)debug += ", " + $851cfc7b9145f23b$var$debugString(val[i]);
        debug += "]";
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) className = builtInMatches[1];
    else // Failed to match the standard '[object ClassName]'
    return toString.call(val);
    if (className == "Object") // we're a user defined class or Object
    // JSON.stringify avoids problems with cycles, and is generally much
    // easier than looping through ownProperties of `val`.
    try {
        return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
        return "Object";
    }
    // errors
    if (val instanceof Error) return `${val.name}: ${val.message}\n${val.stack}`;
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
function $851cfc7b9145f23b$var$getArrayU8FromWasm0(ptr, len) {
    return $851cfc7b9145f23b$var$getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
let $851cfc7b9145f23b$var$stack_pointer = 32;
function $851cfc7b9145f23b$var$addBorrowedObject(obj) {
    if ($851cfc7b9145f23b$var$stack_pointer == 1) throw new Error("out of js stack");
    $851cfc7b9145f23b$var$heap[--$851cfc7b9145f23b$var$stack_pointer] = obj;
    return $851cfc7b9145f23b$var$stack_pointer;
}
function $851cfc7b9145f23b$var$passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    $851cfc7b9145f23b$var$getUint8Memory0().set(arg, ptr / 1);
    $851cfc7b9145f23b$var$WASM_VECTOR_LEN = arg.length;
    return ptr;
}
function $851cfc7b9145f23b$export$143dee580f10c36a(typescript_vm, code, message) {
    try {
        const ptr0 = $851cfc7b9145f23b$var$passArray8ToWasm0(code, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc);
        const len0 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        const ptr1 = $851cfc7b9145f23b$var$passStringToWasm0(message, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc, $851cfc7b9145f23b$var$wasm.__wbindgen_realloc);
        const len1 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        const ret = $851cfc7b9145f23b$var$wasm.vm_instantiate($851cfc7b9145f23b$var$addBorrowedObject(typescript_vm), ptr0, len0, ptr1, len1);
        return $851cfc7b9145f23b$var$takeObject(ret);
    } finally{
        $851cfc7b9145f23b$var$heap[$851cfc7b9145f23b$var$stack_pointer++] = undefined;
    }
}
function $851cfc7b9145f23b$export$24468e70075100c3(typescript_vm, code, message) {
    try {
        const ptr0 = $851cfc7b9145f23b$var$passArray8ToWasm0(code, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc);
        const len0 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        const ptr1 = $851cfc7b9145f23b$var$passStringToWasm0(message, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc, $851cfc7b9145f23b$var$wasm.__wbindgen_realloc);
        const len1 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        const ret = $851cfc7b9145f23b$var$wasm.vm_execute($851cfc7b9145f23b$var$addBorrowedObject(typescript_vm), ptr0, len0, ptr1, len1);
        return $851cfc7b9145f23b$var$takeObject(ret);
    } finally{
        $851cfc7b9145f23b$var$heap[$851cfc7b9145f23b$var$stack_pointer++] = undefined;
    }
}
function $851cfc7b9145f23b$export$7050f2a4bc5068c4(typescript_vm, code, message) {
    try {
        const ptr0 = $851cfc7b9145f23b$var$passArray8ToWasm0(code, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc);
        const len0 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        const ptr1 = $851cfc7b9145f23b$var$passStringToWasm0(message, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc, $851cfc7b9145f23b$var$wasm.__wbindgen_realloc);
        const len1 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        const ret = $851cfc7b9145f23b$var$wasm.vm_migrate($851cfc7b9145f23b$var$addBorrowedObject(typescript_vm), ptr0, len0, ptr1, len1);
        return $851cfc7b9145f23b$var$takeObject(ret);
    } finally{
        $851cfc7b9145f23b$var$heap[$851cfc7b9145f23b$var$stack_pointer++] = undefined;
    }
}
function $851cfc7b9145f23b$export$792daa7c52424572(typescript_vm, code, message, event_handler) {
    try {
        const ptr0 = $851cfc7b9145f23b$var$passArray8ToWasm0(code, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc);
        const len0 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        const ptr1 = $851cfc7b9145f23b$var$passStringToWasm0(message, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc, $851cfc7b9145f23b$var$wasm.__wbindgen_realloc);
        const len1 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        const ret = $851cfc7b9145f23b$var$wasm.vm_continue_instantiate($851cfc7b9145f23b$var$addBorrowedObject(typescript_vm), ptr0, len0, ptr1, len1, event_handler);
        return $851cfc7b9145f23b$var$takeObject(ret);
    } finally{
        $851cfc7b9145f23b$var$heap[$851cfc7b9145f23b$var$stack_pointer++] = undefined;
    }
}
function $851cfc7b9145f23b$export$b247350223035db8(typescript_vm, code, message, event_handler) {
    try {
        const ptr0 = $851cfc7b9145f23b$var$passArray8ToWasm0(code, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc);
        const len0 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        const ptr1 = $851cfc7b9145f23b$var$passStringToWasm0(message, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc, $851cfc7b9145f23b$var$wasm.__wbindgen_realloc);
        const len1 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        const ret = $851cfc7b9145f23b$var$wasm.vm_continue_execute($851cfc7b9145f23b$var$addBorrowedObject(typescript_vm), ptr0, len0, ptr1, len1, event_handler);
        return $851cfc7b9145f23b$var$takeObject(ret);
    } finally{
        $851cfc7b9145f23b$var$heap[$851cfc7b9145f23b$var$stack_pointer++] = undefined;
    }
}
function $851cfc7b9145f23b$export$5dc1f617a095fb2d(typescript_vm, code, message, event_handler) {
    try {
        const ptr0 = $851cfc7b9145f23b$var$passArray8ToWasm0(code, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc);
        const len0 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        const ptr1 = $851cfc7b9145f23b$var$passStringToWasm0(message, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc, $851cfc7b9145f23b$var$wasm.__wbindgen_realloc);
        const len1 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        const ret = $851cfc7b9145f23b$var$wasm.vm_continue_migrate($851cfc7b9145f23b$var$addBorrowedObject(typescript_vm), ptr0, len0, ptr1, len1, event_handler);
        return $851cfc7b9145f23b$var$takeObject(ret);
    } finally{
        $851cfc7b9145f23b$var$heap[$851cfc7b9145f23b$var$stack_pointer++] = undefined;
    }
}
function $851cfc7b9145f23b$export$e6ce27f0a3a0f8fa(typescript_vm, code, arg2) {
    try {
        const ptr0 = $851cfc7b9145f23b$var$passArray8ToWasm0(code, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc);
        const len0 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        const ret = $851cfc7b9145f23b$var$wasm.vm_query($851cfc7b9145f23b$var$addBorrowedObject(typescript_vm), ptr0, len0, $851cfc7b9145f23b$var$addHeapObject(arg2));
        return $851cfc7b9145f23b$var$takeObject(ret);
    } finally{
        $851cfc7b9145f23b$var$heap[$851cfc7b9145f23b$var$stack_pointer++] = undefined;
    }
}
function $851cfc7b9145f23b$var$handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        $851cfc7b9145f23b$var$wasm.__wbindgen_exn_store($851cfc7b9145f23b$var$addHeapObject(e));
    }
}
async function $851cfc7b9145f23b$var$load(module, imports) {
    if (typeof Response === "function" && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === "function") try {
            return await WebAssembly.instantiateStreaming(module, imports);
        } catch (e) {
            if (module.headers.get("Content-Type") != "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
            else throw e;
        }
        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);
        if (instance instanceof WebAssembly.Instance) return {
            instance: instance,
            module: module
        };
        else return instance;
    }
}
function $851cfc7b9145f23b$var$getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        $851cfc7b9145f23b$var$takeObject(arg0);
    };
    imports.wbg.__wbg_env_9e26883a7bc78edd = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).env();
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_info_9293fdf0cba695c2 = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).info();
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_runningcontractmeta_8dd5ae06ce2e95e6 = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).running_contract_meta();
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_setcontractmeta_fdd6befff9153a86 = function(arg0, arg1, arg2) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).set_contract_meta($851cfc7b9145f23b$var$takeObject(arg1), $851cfc7b9145f23b$var$takeObject(arg2));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_contractmeta_6d8fd763446b7ac8 = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).contract_meta($851cfc7b9145f23b$var$takeObject(arg1));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_querycontinuation_8176f0394ee133da = function(arg0, arg1, arg2, arg3) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).query_continuation($851cfc7b9145f23b$var$takeObject(arg1), $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg2, arg3));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_continueexecute_0f8d9bd6acc983b3 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).continue_execute($851cfc7b9145f23b$var$takeObject(arg1), $851cfc7b9145f23b$var$takeObject(arg2), $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg3, arg4), BigInt.asUintN(64, arg5));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_continueinstantiate_ae49dcbeca412a89 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).continue_instantiate($851cfc7b9145f23b$var$takeObject(arg1), $851cfc7b9145f23b$var$takeObject(arg2), $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg3, arg4), BigInt.asUintN(64, arg5));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_continuemigrate_5b6f19d4d4f4296c = function(arg0, arg1, arg2, arg3, arg4) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).continue_migrate($851cfc7b9145f23b$var$takeObject(arg1), $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg2, arg3), BigInt.asUintN(64, arg4));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_queryraw_b870f9f818225cc7 = function(arg0, arg1, arg2, arg3) {
        var v0 = $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg2, arg3).slice();
        $851cfc7b9145f23b$var$wasm.__wbindgen_free(arg2, arg3 * 1);
        const ret = $851cfc7b9145f23b$var$getObject(arg0).query_raw($851cfc7b9145f23b$var$takeObject(arg1), v0);
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_transfer_236212844afdaebe = function(arg0, arg1, arg2) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).transfer($851cfc7b9145f23b$var$takeObject(arg1), $851cfc7b9145f23b$var$takeObject(arg2));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_burn_390f1e53343beadc = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).burn($851cfc7b9145f23b$var$takeObject(arg1));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_balance_473eb0d62ebeee31 = function(arg0, arg1, arg2, arg3) {
        try {
            const ret = $851cfc7b9145f23b$var$getObject(arg0).balance($851cfc7b9145f23b$var$takeObject(arg1), $851cfc7b9145f23b$var$getStringFromWasm0(arg2, arg3));
            return $851cfc7b9145f23b$var$addHeapObject(ret);
        } finally{
            $851cfc7b9145f23b$var$wasm.__wbindgen_free(arg2, arg3);
        }
    };
    imports.wbg.__wbg_allbalance_47be6a71a779d4c8 = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).all_balance($851cfc7b9145f23b$var$takeObject(arg1));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_queryinfo_824c681ea2edc1da = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).query_info($851cfc7b9145f23b$var$takeObject(arg1));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_debug_cca143378fe4d9ac = function(arg0, arg1, arg2) {
        var v0 = $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg1, arg2).slice();
        $851cfc7b9145f23b$var$wasm.__wbindgen_free(arg1, arg2 * 1);
        const ret = $851cfc7b9145f23b$var$getObject(arg0).debug(v0);
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_dbscan_28408cce9f0ffde5 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        let v0;
        if (arg1 !== 0) {
            v0 = $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg1, arg2).slice();
            $851cfc7b9145f23b$var$wasm.__wbindgen_free(arg1, arg2 * 1);
        }
        let v1;
        if (arg3 !== 0) {
            v1 = $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg3, arg4).slice();
            $851cfc7b9145f23b$var$wasm.__wbindgen_free(arg3, arg4 * 1);
        }
        const ret = $851cfc7b9145f23b$var$getObject(arg0).db_scan(v0, v1, $851cfc7b9145f23b$var$takeObject(arg5));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_dbnext_9c731b72b18cbb2b = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).db_next(arg1 >>> 0);
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_secp256k1verify_a7281d1db37882ec = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).secp256k1_verify($851cfc7b9145f23b$var$getArrayU8FromWasm0(arg1, arg2), $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg3, arg4), $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg5, arg6));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_secp256k1recoverpubkey_e68b9de7306fa5e3 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).secp256k1_recover_pubkey($851cfc7b9145f23b$var$getArrayU8FromWasm0(arg1, arg2), $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg3, arg4), arg5);
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_ed25519verify_2eee621134dbf28a = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).ed25519_verify($851cfc7b9145f23b$var$getArrayU8FromWasm0(arg1, arg2), $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg3, arg4), $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg5, arg6));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_ed25519batchverify_b9a9e9fbb322f55a = function(arg0, arg1, arg2, arg3) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).ed25519_batch_verify($851cfc7b9145f23b$var$takeObject(arg1), $851cfc7b9145f23b$var$takeObject(arg2), $851cfc7b9145f23b$var$takeObject(arg3));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_addrvalidate_f61b76a233b1e86e = function(arg0, arg1, arg2) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).addr_validate($851cfc7b9145f23b$var$getStringFromWasm0(arg1, arg2));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_addrcanonicalize_5a16e412707a1764 = function(arg0, arg1, arg2) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).addr_canonicalize($851cfc7b9145f23b$var$getStringFromWasm0(arg1, arg2));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_addrhumanize_782cef8045c3b63c = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).addr_humanize($851cfc7b9145f23b$var$takeObject(arg1));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_dbread_0038b11a402adfd1 = function(arg0, arg1, arg2) {
        var v0 = $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg1, arg2).slice();
        $851cfc7b9145f23b$var$wasm.__wbindgen_free(arg1, arg2 * 1);
        const ret = $851cfc7b9145f23b$var$getObject(arg0).db_read(v0);
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_dbwrite_154ea60a39a2099d = function(arg0, arg1, arg2, arg3, arg4) {
        var v0 = $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg1, arg2).slice();
        $851cfc7b9145f23b$var$wasm.__wbindgen_free(arg1, arg2 * 1);
        var v1 = $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg3, arg4).slice();
        $851cfc7b9145f23b$var$wasm.__wbindgen_free(arg3, arg4 * 1);
        const ret = $851cfc7b9145f23b$var$getObject(arg0).db_write(v0, v1);
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_dbremove_f66297dba7b07f81 = function(arg0, arg1, arg2) {
        var v0 = $851cfc7b9145f23b$var$getArrayU8FromWasm0(arg1, arg2).slice();
        $851cfc7b9145f23b$var$wasm.__wbindgen_free(arg1, arg2 * 1);
        const ret = $851cfc7b9145f23b$var$getObject(arg0).db_remove(v0);
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_abort_06a945d6f3534d6d = function(arg0, arg1, arg2) {
        try {
            const ret = $851cfc7b9145f23b$var$getObject(arg0).abort($851cfc7b9145f23b$var$getStringFromWasm0(arg1, arg2));
            return $851cfc7b9145f23b$var$addHeapObject(ret);
        } finally{
            $851cfc7b9145f23b$var$wasm.__wbindgen_free(arg1, arg2);
        }
    };
    imports.wbg.__wbg_charge_cd0ea37d103c781c = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).charge($851cfc7b9145f23b$var$takeObject(arg1));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_gascheckpointpush_d0c9db169f1d70f9 = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).gas_checkpoint_push($851cfc7b9145f23b$var$takeObject(arg1));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_gascheckpointpop_5766fd5dbee45c3e = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).gas_checkpoint_pop();
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_transactionbegin_9fb4a94c99080cc7 = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).transaction_begin();
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_transactioncommit_e180d5ccaaa44461 = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).transaction_commit();
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_transactionrollback_5ef6a3e9e1aef308 = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).transaction_rollback();
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = $851cfc7b9145f23b$var$getObject(arg1);
        const ret = typeof obj === "string" ? obj : undefined;
        var ptr0 = $851cfc7b9145f23b$var$isLikeNone(ret) ? 0 : $851cfc7b9145f23b$var$passStringToWasm0(ret, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc, $851cfc7b9145f23b$var$wasm.__wbindgen_realloc);
        var len0 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        $851cfc7b9145f23b$var$getInt32Memory0()[arg0 / 4 + 1] = len0;
        $851cfc7b9145f23b$var$getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error($851cfc7b9145f23b$var$getStringFromWasm0(arg0, arg1));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_log_be884951cedf1e35 = function(arg0, arg1) {
        console.log($851cfc7b9145f23b$var$getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_is_bigint = function(arg0) {
        const ret = typeof $851cfc7b9145f23b$var$getObject(arg0) === "bigint";
        return ret;
    };
    imports.wbg.__wbindgen_bigint_from_u64 = function(arg0) {
        const ret = BigInt.asUintN(64, arg0);
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0) === $851cfc7b9145f23b$var$getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = $851cfc7b9145f23b$var$getObject(arg0);
        const ret = typeof v === "boolean" ? v ? 1 : 0 : 2;
        return ret;
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof $851cfc7b9145f23b$var$getObject(arg0) === "string";
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = $851cfc7b9145f23b$var$getObject(arg0);
        const ret = typeof val === "object" && val !== null;
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0) in $851cfc7b9145f23b$var$getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0);
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0) == $851cfc7b9145f23b$var$getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getStringFromWasm0(arg0, arg1);
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = $851cfc7b9145f23b$var$getObject(arg1);
        const ret = typeof obj === "number" ? obj : undefined;
        $851cfc7b9145f23b$var$getFloat64Memory0()[arg0 / 8 + 1] = $851cfc7b9145f23b$var$isLikeNone(ret) ? 0 : ret;
        $851cfc7b9145f23b$var$getInt32Memory0()[arg0 / 4 + 0] = !$851cfc7b9145f23b$var$isLikeNone(ret);
    };
    imports.wbg.__wbg_getwithrefkey_15c62c2b8546208d = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0)[$851cfc7b9145f23b$var$getObject(arg1)];
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_set_20cbc34131e76824 = function(arg0, arg1, arg2) {
        $851cfc7b9145f23b$var$getObject(arg0)[$851cfc7b9145f23b$var$takeObject(arg1)] = $851cfc7b9145f23b$var$takeObject(arg2);
    };
    imports.wbg.__wbg_get_57245cc7d7c7619d = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0)[arg1 >>> 0];
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_length_6e3bbe7c8bd4dbd8 = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_new_1d9a920c6bfc44a8 = function() {
        const ret = new Array();
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof $851cfc7b9145f23b$var$getObject(arg0) === "function";
        return ret;
    };
    imports.wbg.__wbg_next_579e583d33566a86 = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).next;
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_next_aaef7c8aa5e212ac = function() {
        return $851cfc7b9145f23b$var$handleError(function(arg0) {
            const ret = $851cfc7b9145f23b$var$getObject(arg0).next();
            return $851cfc7b9145f23b$var$addHeapObject(ret);
        }, arguments);
    };
    imports.wbg.__wbg_done_1b73b0672e15f234 = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_1ccc36bc03462d71 = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).value;
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_6f9d4f28845f426c = function() {
        const ret = Symbol.iterator;
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_get_765201544a2b6869 = function() {
        return $851cfc7b9145f23b$var$handleError(function(arg0, arg1) {
            const ret = Reflect.get($851cfc7b9145f23b$var$getObject(arg0), $851cfc7b9145f23b$var$getObject(arg1));
            return $851cfc7b9145f23b$var$addHeapObject(ret);
        }, arguments);
    };
    imports.wbg.__wbg_call_97ae9d8645dc388b = function() {
        return $851cfc7b9145f23b$var$handleError(function(arg0, arg1) {
            const ret = $851cfc7b9145f23b$var$getObject(arg0).call($851cfc7b9145f23b$var$getObject(arg1));
            return $851cfc7b9145f23b$var$addHeapObject(ret);
        }, arguments);
    };
    imports.wbg.__wbg_new_0b9bfdd97583284e = function() {
        const ret = new Object();
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_set_a68214f35c417fa9 = function(arg0, arg1, arg2) {
        $851cfc7b9145f23b$var$getObject(arg0)[arg1 >>> 0] = $851cfc7b9145f23b$var$takeObject(arg2);
    };
    imports.wbg.__wbg_isArray_27c46c67f498e15d = function(arg0) {
        const ret = Array.isArray($851cfc7b9145f23b$var$getObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_e5e48f4762c5610b = function(arg0) {
        let result;
        try {
            result = $851cfc7b9145f23b$var$getObject(arg0) instanceof ArrayBuffer;
        } catch  {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_isSafeInteger_dfa0593e8d7ac35a = function(arg0) {
        const ret = Number.isSafeInteger($851cfc7b9145f23b$var$getObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_entries_65a76a413fc91037 = function(arg0) {
        const ret = Object.entries($851cfc7b9145f23b$var$getObject(arg0));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_3f3d764d4747d564 = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).buffer;
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_new_8c3f0052272a457a = function(arg0) {
        const ret = new Uint8Array($851cfc7b9145f23b$var$getObject(arg0));
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    imports.wbg.__wbg_set_83db9690f9353e79 = function(arg0, arg1, arg2) {
        $851cfc7b9145f23b$var$getObject(arg0).set($851cfc7b9145f23b$var$getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_9e1ae1900cb0fbd5 = function(arg0) {
        const ret = $851cfc7b9145f23b$var$getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_971eeda69eb75003 = function(arg0) {
        let result;
        try {
            result = $851cfc7b9145f23b$var$getObject(arg0) instanceof Uint8Array;
        } catch  {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
        const v = $851cfc7b9145f23b$var$getObject(arg1);
        const ret = typeof v === "bigint" ? v : undefined;
        $851cfc7b9145f23b$var$getBigInt64Memory0()[arg0 / 8 + 1] = $851cfc7b9145f23b$var$isLikeNone(ret) ? 0n : ret;
        $851cfc7b9145f23b$var$getInt32Memory0()[arg0 / 4 + 0] = !$851cfc7b9145f23b$var$isLikeNone(ret);
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = $851cfc7b9145f23b$var$debugString($851cfc7b9145f23b$var$getObject(arg1));
        const ptr0 = $851cfc7b9145f23b$var$passStringToWasm0(ret, $851cfc7b9145f23b$var$wasm.__wbindgen_malloc, $851cfc7b9145f23b$var$wasm.__wbindgen_realloc);
        const len0 = $851cfc7b9145f23b$var$WASM_VECTOR_LEN;
        $851cfc7b9145f23b$var$getInt32Memory0()[arg0 / 4 + 1] = len0;
        $851cfc7b9145f23b$var$getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error($851cfc7b9145f23b$var$getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = $851cfc7b9145f23b$var$wasm.memory;
        return $851cfc7b9145f23b$var$addHeapObject(ret);
    };
    return imports;
}
function $851cfc7b9145f23b$var$initMemory(imports, maybe_memory) {}
function $851cfc7b9145f23b$var$finalizeInit(instance, module) {
    $851cfc7b9145f23b$var$wasm = instance.exports;
    $851cfc7b9145f23b$var$init.__wbindgen_wasm_module = module;
    $851cfc7b9145f23b$var$cachedBigInt64Memory0 = new BigInt64Array();
    $851cfc7b9145f23b$var$cachedFloat64Memory0 = new Float64Array();
    $851cfc7b9145f23b$var$cachedInt32Memory0 = new Int32Array();
    $851cfc7b9145f23b$var$cachedUint8Memory0 = new Uint8Array();
    return $851cfc7b9145f23b$var$wasm;
}
function $851cfc7b9145f23b$export$2ec80ee76a9348bf(module) {
    const imports = $851cfc7b9145f23b$var$getImports();
    $851cfc7b9145f23b$var$initMemory(imports);
    if (!(module instanceof WebAssembly.Module)) module = new WebAssembly.Module(module);
    const instance = new WebAssembly.Instance(module, imports);
    return $851cfc7b9145f23b$var$finalizeInit(instance, module);
}
async function $851cfc7b9145f23b$var$init(input) {
    if (typeof input === "undefined") input = new URL("typescript_bindings_bg.5cfb94f8.wasm", import.meta.url);
    const imports = $851cfc7b9145f23b$var$getImports();
    if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) input = fetch(input);
    $851cfc7b9145f23b$var$initMemory(imports);
    const { instance: instance , module: module  } = await $851cfc7b9145f23b$var$load(await input, imports);
    return $851cfc7b9145f23b$var$finalizeInit(instance, module);
}
var $851cfc7b9145f23b$export$2e2bcd8739ae039 = $851cfc7b9145f23b$var$init;


const $0be2f2a11bcce2c0$export$75de4951c04567a6 = (module_or_path)=>(0, $851cfc7b9145f23b$export$2e2bcd8739ae039)(module_or_path);
const $0be2f2a11bcce2c0$export$cfb7a04f4bc7b9fb = (host, code, message)=>(0, $851cfc7b9145f23b$export$143dee580f10c36a)(host, code, JSON.stringify(message));
const $0be2f2a11bcce2c0$export$8ad1ca901921ae38 = (host, code, message)=>(0, $851cfc7b9145f23b$export$24468e70075100c3)(host, code, JSON.stringify(message));
const $0be2f2a11bcce2c0$export$61bd1515aa5b8ebc = (host, code, message)=>(0, $851cfc7b9145f23b$export$7050f2a4bc5068c4)(host, code, JSON.stringify(message));
const $0be2f2a11bcce2c0$export$6f25983a79c1573f = (host, code, message, event_handler)=>(0, $851cfc7b9145f23b$export$792daa7c52424572)(host, code, JSON.stringify(message), event_handler);
const $0be2f2a11bcce2c0$export$717645e2104c9250 = (host, code, message, event_handler)=>(0, $851cfc7b9145f23b$export$b247350223035db8)(host, code, JSON.stringify(message), event_handler);
const $0be2f2a11bcce2c0$export$699106420ce4b976 = (host, code, message, event_handler)=>(0, $851cfc7b9145f23b$export$5dc1f617a095fb2d)(host, code, JSON.stringify(message), event_handler);
const $0be2f2a11bcce2c0$export$6617c1e71955a2e1 = (host, code, query)=>(0, $851cfc7b9145f23b$export$e6ce27f0a3a0f8fa)(host, code, JSON.stringify(query));


var $ee723407fc634988$exports = {};

$parcel$export($ee723407fc634988$exports, "toBinary", () => $ee723407fc634988$export$ee892b06e1166e2f);
$parcel$export($ee723407fc634988$exports, "fromBinary", () => $ee723407fc634988$export$a178423dcbaef037);
$parcel$export($ee723407fc634988$exports, "Some", () => $ee723407fc634988$export$9f9d0139d032da4f);
$parcel$export($ee723407fc634988$exports, "None", () => $ee723407fc634988$export$57ca7e07b341709d);
$parcel$export($ee723407fc634988$exports, "Ok", () => $ee723407fc634988$export$8146e38189b4f4dc);
$parcel$export($ee723407fc634988$exports, "Err", () => $ee723407fc634988$export$3659d3f2d3dfceb8);
$parcel$export($ee723407fc634988$exports, "unit", () => $ee723407fc634988$export$523c0b569236b342);
$parcel$export($ee723407fc634988$exports, "decode", () => $ee723407fc634988$export$2f872c0f2117be69);
$parcel$export($ee723407fc634988$exports, "encode", () => $ee723407fc634988$export$c564cdbbe6da493);
$parcel$export($ee723407fc634988$exports, "toHex", () => $ee723407fc634988$export$7ea66e3774a60b67);

const $ee723407fc634988$var$Buffer = (0, $hgUW1$bufferindex).Buffer;
const $ee723407fc634988$export$ee892b06e1166e2f = (value)=>$ee723407fc634988$var$Buffer.from(value).toString("base64");
const $ee723407fc634988$export$a178423dcbaef037 = (value)=>$ee723407fc634988$var$Buffer.from(value, "base64").toString();
const $ee723407fc634988$export$9f9d0139d032da4f = (value)=>value;
const $ee723407fc634988$export$57ca7e07b341709d = ()=>null;
const $ee723407fc634988$export$8146e38189b4f4dc = (value)=>({
        Ok: value
    });
const $ee723407fc634988$export$3659d3f2d3dfceb8 = (value)=>({
        Err: value
    });
const $ee723407fc634988$export$523c0b569236b342 = null;
const $ee723407fc634988$export$2f872c0f2117be69 = (value)=>String.fromCharCode(...value);
const $ee723407fc634988$export$c564cdbbe6da493 = (value)=>JSON.stringify(value).split("").map((c)=>c.charCodeAt(0));
const $ee723407fc634988$export$7ea66e3774a60b67 = (byteArray)=>Array.from(byteArray, function(byte) {
        return ("0" + (byte & 0xFF).toString(16)).slice(-2);
    }).join("");





export {$0be2f2a11bcce2c0$export$75de4951c04567a6 as vmSetup, $0be2f2a11bcce2c0$export$cfb7a04f4bc7b9fb as vmInstantiate, $0be2f2a11bcce2c0$export$8ad1ca901921ae38 as vmExecute, $0be2f2a11bcce2c0$export$61bd1515aa5b8ebc as vmMigrate, $0be2f2a11bcce2c0$export$6f25983a79c1573f as vmContinueInstantiate, $0be2f2a11bcce2c0$export$717645e2104c9250 as vmContinueExecute, $0be2f2a11bcce2c0$export$699106420ce4b976 as vmContinueMigrate, $0be2f2a11bcce2c0$export$6617c1e71955a2e1 as vmQuery, $ee723407fc634988$export$ee892b06e1166e2f as toBinary, $ee723407fc634988$export$a178423dcbaef037 as fromBinary, $ee723407fc634988$export$9f9d0139d032da4f as Some, $ee723407fc634988$export$57ca7e07b341709d as None, $ee723407fc634988$export$8146e38189b4f4dc as Ok, $ee723407fc634988$export$3659d3f2d3dfceb8 as Err, $ee723407fc634988$export$523c0b569236b342 as unit, $ee723407fc634988$export$2f872c0f2117be69 as decode, $ee723407fc634988$export$c564cdbbe6da493 as encode, $ee723407fc634988$export$7ea66e3774a60b67 as toHex, $851cfc7b9145f23b$export$143dee580f10c36a as vm_instantiate, $851cfc7b9145f23b$export$24468e70075100c3 as vm_execute, $851cfc7b9145f23b$export$7050f2a4bc5068c4 as vm_migrate, $851cfc7b9145f23b$export$792daa7c52424572 as vm_continue_instantiate, $851cfc7b9145f23b$export$b247350223035db8 as vm_continue_execute, $851cfc7b9145f23b$export$5dc1f617a095fb2d as vm_continue_migrate, $851cfc7b9145f23b$export$e6ce27f0a3a0f8fa as vm_query, $851cfc7b9145f23b$export$2ec80ee76a9348bf as initSync};
//# sourceMappingURL=index.js.map
