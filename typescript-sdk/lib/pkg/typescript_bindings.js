//@ts-nocheck
let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) {
  return heap[idx];
}

let heap_next = heap.length;

function dropObject(idx) {
  if (idx < 36) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = new Uint8Array();

function getUint8Memory0() {
  if (cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString =
  typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
      }
    : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
          read: arg.length,
          written: buf.length,
        };
      };

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length);
    getUint8Memory0()
      .subarray(ptr, ptr + buf.length)
      .set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7f) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, (len = offset + arg.length * 3));
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

function isLikeNone(x) {
  return x === undefined || x === null;
}

let cachedInt32Memory0 = new Int32Array();

function getInt32Memory0() {
  if (cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachedInt32Memory0;
}

const cachedTextDecoder = new TextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

let cachedFloat64Memory0 = new Float64Array();

function getFloat64Memory0() {
  if (cachedFloat64Memory0.byteLength === 0) {
    cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
  }
  return cachedFloat64Memory0;
}

let cachedBigInt64Memory0 = new BigInt64Array();

function getBigInt64Memory0() {
  if (cachedBigInt64Memory0.byteLength === 0) {
    cachedBigInt64Memory0 = new BigInt64Array(wasm.memory.buffer);
  }
  return cachedBigInt64Memory0;
}

function debugString(val) {
  // primitive types
  const type = typeof val;
  if (type == 'number' || type == 'boolean' || val == null) {
    return `${val}`;
  }
  if (type == 'string') {
    return `"${val}"`;
  }
  if (type == 'symbol') {
    const description = val.description;
    if (description == null) {
      return 'Symbol';
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == 'function') {
    const name = val.name;
    if (typeof name == 'string' && name.length > 0) {
      return `Function(${name})`;
    } else {
      return 'Function';
    }
  }
  // objects
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = '[';
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ', ' + debugString(val[i]);
    }
    debug += ']';
    return debug;
  }
  // Test for built-in
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    // Failed to match the standard '[object ClassName]'
    return toString.call(val);
  }
  if (className == 'Object') {
    // we're a user defined class or Object
    // JSON.stringify avoids problems with cycles, and is generally much
    // easier than looping through ownProperties of `val`.
    try {
      return 'Object(' + JSON.stringify(val) + ')';
    } catch (_) {
      return 'Object';
    }
  }
  // errors
  if (val instanceof Error) {
    return `${val.name}: ${val.message}\n${val.stack}`;
  }
  // TODO we could test for more things here, like `Set`s and `Map`s.
  return className;
}

function getArrayU8FromWasm0(ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
  if (stack_pointer == 1) throw new Error('out of js stack');
  heap[--stack_pointer] = obj;
  return stack_pointer;
}

function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {string} message
 * @returns {any}
 */
export function vm_instantiate(typescript_vm, code, message) {
  try {
    const ptr0 = passArray8ToWasm0(code, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(
      message,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.vm_instantiate(
      addBorrowedObject(typescript_vm),
      ptr0,
      len0,
      ptr1,
      len1
    );
    return takeObject(ret);
  } finally {
    heap[stack_pointer++] = undefined;
  }
}

/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {string} message
 * @returns {any}
 */
export function vm_execute(typescript_vm, code, message) {
  try {
    const ptr0 = passArray8ToWasm0(code, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(
      message,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.vm_execute(
      addBorrowedObject(typescript_vm),
      ptr0,
      len0,
      ptr1,
      len1
    );
    return takeObject(ret);
  } finally {
    heap[stack_pointer++] = undefined;
  }
}

/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {string} message
 * @returns {any}
 */
export function vm_migrate(typescript_vm, code, message) {
  try {
    const ptr0 = passArray8ToWasm0(code, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(
      message,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.vm_migrate(
      addBorrowedObject(typescript_vm),
      ptr0,
      len0,
      ptr1,
      len1
    );
    return takeObject(ret);
  } finally {
    heap[stack_pointer++] = undefined;
  }
}

/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {string} message
 * @param {bigint} event_handler
 * @returns {any}
 */
export function vm_continue_instantiate(
  typescript_vm,
  code,
  message,
  event_handler
) {
  try {
    const ptr0 = passArray8ToWasm0(code, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(
      message,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.vm_continue_instantiate(
      addBorrowedObject(typescript_vm),
      ptr0,
      len0,
      ptr1,
      len1,
      event_handler
    );
    return takeObject(ret);
  } finally {
    heap[stack_pointer++] = undefined;
  }
}

/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {string} message
 * @param {bigint} event_handler
 * @returns {any}
 */
export function vm_continue_execute(
  typescript_vm,
  code,
  message,
  event_handler
) {
  try {
    const ptr0 = passArray8ToWasm0(code, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(
      message,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.vm_continue_execute(
      addBorrowedObject(typescript_vm),
      ptr0,
      len0,
      ptr1,
      len1,
      event_handler
    );
    return takeObject(ret);
  } finally {
    heap[stack_pointer++] = undefined;
  }
}

/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {string} message
 * @param {bigint} event_handler
 * @returns {any}
 */
export function vm_continue_migrate(
  typescript_vm,
  code,
  message,
  event_handler
) {
  try {
    const ptr0 = passArray8ToWasm0(code, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(
      message,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.vm_continue_migrate(
      addBorrowedObject(typescript_vm),
      ptr0,
      len0,
      ptr1,
      len1,
      event_handler
    );
    return takeObject(ret);
  } finally {
    heap[stack_pointer++] = undefined;
  }
}

/**
 * @param {any} typescript_vm
 * @param {Uint8Array} code
 * @param {any} arg2
 * @returns {any}
 */
export function vm_query(typescript_vm, code, arg2) {
  try {
    const ptr0 = passArray8ToWasm0(code, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.vm_query(
      addBorrowedObject(typescript_vm),
      ptr0,
      len0,
      addHeapObject(arg2)
    );
    return takeObject(ret);
  } finally {
    heap[stack_pointer++] = undefined;
  }
}

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}

async function load(module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get('Content-Type') != 'application/wasm') {
          console.warn(
            '`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n',
            e
          );
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}

function getImports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbindgen_object_drop_ref = function (arg0) {
    takeObject(arg0);
  };
  imports.wbg.__wbg_env_9e26883a7bc78edd = function (arg0) {
    const ret = getObject(arg0).env();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_info_9293fdf0cba695c2 = function (arg0) {
    const ret = getObject(arg0).info();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_runningcontractmeta_8dd5ae06ce2e95e6 = function (arg0) {
    const ret = getObject(arg0).running_contract_meta();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_setcontractmeta_fdd6befff9153a86 = function (
    arg0,
    arg1,
    arg2
  ) {
    const ret = getObject(arg0).set_contract_meta(
      takeObject(arg1),
      takeObject(arg2)
    );
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_contractmeta_6d8fd763446b7ac8 = function (arg0, arg1) {
    const ret = getObject(arg0).contract_meta(takeObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_querycontinuation_8176f0394ee133da = function (
    arg0,
    arg1,
    arg2,
    arg3
  ) {
    const ret = getObject(arg0).query_continuation(
      takeObject(arg1),
      getArrayU8FromWasm0(arg2, arg3)
    );
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_continueexecute_0f8d9bd6acc983b3 = function (
    arg0,
    arg1,
    arg2,
    arg3,
    arg4,
    arg5
  ) {
    const ret = getObject(arg0).continue_execute(
      takeObject(arg1),
      takeObject(arg2),
      getArrayU8FromWasm0(arg3, arg4),
      BigInt.asUintN(64, arg5)
    );
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_continueinstantiate_ae49dcbeca412a89 = function (
    arg0,
    arg1,
    arg2,
    arg3,
    arg4,
    arg5
  ) {
    const ret = getObject(arg0).continue_instantiate(
      takeObject(arg1),
      takeObject(arg2),
      getArrayU8FromWasm0(arg3, arg4),
      BigInt.asUintN(64, arg5)
    );
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_continuemigrate_5b6f19d4d4f4296c = function (
    arg0,
    arg1,
    arg2,
    arg3,
    arg4
  ) {
    const ret = getObject(arg0).continue_migrate(
      takeObject(arg1),
      getArrayU8FromWasm0(arg2, arg3),
      BigInt.asUintN(64, arg4)
    );
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_queryraw_b870f9f818225cc7 = function (
    arg0,
    arg1,
    arg2,
    arg3
  ) {
    var v0 = getArrayU8FromWasm0(arg2, arg3).slice();
    wasm.__wbindgen_free(arg2, arg3 * 1);
    const ret = getObject(arg0).query_raw(takeObject(arg1), v0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_transfer_236212844afdaebe = function (arg0, arg1, arg2) {
    const ret = getObject(arg0).transfer(takeObject(arg1), takeObject(arg2));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_burn_390f1e53343beadc = function (arg0, arg1) {
    const ret = getObject(arg0).burn(takeObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_balance_473eb0d62ebeee31 = function (
    arg0,
    arg1,
    arg2,
    arg3
  ) {
    try {
      const ret = getObject(arg0).balance(
        takeObject(arg1),
        getStringFromWasm0(arg2, arg3)
      );
      return addHeapObject(ret);
    } finally {
      wasm.__wbindgen_free(arg2, arg3);
    }
  };
  imports.wbg.__wbg_allbalance_47be6a71a779d4c8 = function (arg0, arg1) {
    const ret = getObject(arg0).all_balance(takeObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_queryinfo_824c681ea2edc1da = function (arg0, arg1) {
    const ret = getObject(arg0).query_info(takeObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_debug_cca143378fe4d9ac = function (arg0, arg1, arg2) {
    var v0 = getArrayU8FromWasm0(arg1, arg2).slice();
    wasm.__wbindgen_free(arg1, arg2 * 1);
    const ret = getObject(arg0).debug(v0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_dbscan_28408cce9f0ffde5 = function (
    arg0,
    arg1,
    arg2,
    arg3,
    arg4,
    arg5
  ) {
    let v0;
    if (arg1 !== 0) {
      v0 = getArrayU8FromWasm0(arg1, arg2).slice();
      wasm.__wbindgen_free(arg1, arg2 * 1);
    }
    let v1;
    if (arg3 !== 0) {
      v1 = getArrayU8FromWasm0(arg3, arg4).slice();
      wasm.__wbindgen_free(arg3, arg4 * 1);
    }
    const ret = getObject(arg0).db_scan(v0, v1, takeObject(arg5));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_dbnext_9c731b72b18cbb2b = function (arg0, arg1) {
    const ret = getObject(arg0).db_next(arg1 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_secp256k1verify_a7281d1db37882ec = function (
    arg0,
    arg1,
    arg2,
    arg3,
    arg4,
    arg5,
    arg6
  ) {
    const ret = getObject(arg0).secp256k1_verify(
      getArrayU8FromWasm0(arg1, arg2),
      getArrayU8FromWasm0(arg3, arg4),
      getArrayU8FromWasm0(arg5, arg6)
    );
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_secp256k1recoverpubkey_e68b9de7306fa5e3 = function (
    arg0,
    arg1,
    arg2,
    arg3,
    arg4,
    arg5
  ) {
    const ret = getObject(arg0).secp256k1_recover_pubkey(
      getArrayU8FromWasm0(arg1, arg2),
      getArrayU8FromWasm0(arg3, arg4),
      arg5
    );
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_ed25519verify_2eee621134dbf28a = function (
    arg0,
    arg1,
    arg2,
    arg3,
    arg4,
    arg5,
    arg6
  ) {
    const ret = getObject(arg0).ed25519_verify(
      getArrayU8FromWasm0(arg1, arg2),
      getArrayU8FromWasm0(arg3, arg4),
      getArrayU8FromWasm0(arg5, arg6)
    );
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_ed25519batchverify_b9a9e9fbb322f55a = function (
    arg0,
    arg1,
    arg2,
    arg3
  ) {
    const ret = getObject(arg0).ed25519_batch_verify(
      takeObject(arg1),
      takeObject(arg2),
      takeObject(arg3)
    );
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_addrvalidate_f61b76a233b1e86e = function (
    arg0,
    arg1,
    arg2
  ) {
    const ret = getObject(arg0).addr_validate(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_addrcanonicalize_5a16e412707a1764 = function (
    arg0,
    arg1,
    arg2
  ) {
    const ret = getObject(arg0).addr_canonicalize(
      getStringFromWasm0(arg1, arg2)
    );
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_addrhumanize_782cef8045c3b63c = function (arg0, arg1) {
    const ret = getObject(arg0).addr_humanize(takeObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_dbread_0038b11a402adfd1 = function (arg0, arg1, arg2) {
    var v0 = getArrayU8FromWasm0(arg1, arg2).slice();
    wasm.__wbindgen_free(arg1, arg2 * 1);
    const ret = getObject(arg0).db_read(v0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_dbwrite_154ea60a39a2099d = function (
    arg0,
    arg1,
    arg2,
    arg3,
    arg4
  ) {
    var v0 = getArrayU8FromWasm0(arg1, arg2).slice();
    wasm.__wbindgen_free(arg1, arg2 * 1);
    var v1 = getArrayU8FromWasm0(arg3, arg4).slice();
    wasm.__wbindgen_free(arg3, arg4 * 1);
    const ret = getObject(arg0).db_write(v0, v1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_dbremove_f66297dba7b07f81 = function (arg0, arg1, arg2) {
    var v0 = getArrayU8FromWasm0(arg1, arg2).slice();
    wasm.__wbindgen_free(arg1, arg2 * 1);
    const ret = getObject(arg0).db_remove(v0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_abort_06a945d6f3534d6d = function (arg0, arg1, arg2) {
    try {
      const ret = getObject(arg0).abort(getStringFromWasm0(arg1, arg2));
      return addHeapObject(ret);
    } finally {
      wasm.__wbindgen_free(arg1, arg2);
    }
  };
  imports.wbg.__wbg_charge_cd0ea37d103c781c = function (arg0, arg1) {
    const ret = getObject(arg0).charge(takeObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_gascheckpointpush_d0c9db169f1d70f9 = function (arg0, arg1) {
    const ret = getObject(arg0).gas_checkpoint_push(takeObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_gascheckpointpop_5766fd5dbee45c3e = function (arg0) {
    const ret = getObject(arg0).gas_checkpoint_pop();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_transactionbegin_9fb4a94c99080cc7 = function (arg0) {
    const ret = getObject(arg0).transaction_begin();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_transactioncommit_e180d5ccaaa44461 = function (arg0) {
    const ret = getObject(arg0).transaction_commit();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_transactionrollback_5ef6a3e9e1aef308 = function (arg0) {
    const ret = getObject(arg0).transaction_rollback();
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_string_get = function (arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === 'string' ? obj : undefined;
    var ptr0 = isLikeNone(ret)
      ? 0
      : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbindgen_error_new = function (arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_log_be884951cedf1e35 = function (arg0, arg1) {
    console.log(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbindgen_is_bigint = function (arg0) {
    const ret = typeof getObject(arg0) === 'bigint';
    return ret;
  };
  imports.wbg.__wbindgen_bigint_from_u64 = function (arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_jsval_eq = function (arg0, arg1) {
    const ret = getObject(arg0) === getObject(arg1);
    return ret;
  };
  imports.wbg.__wbindgen_boolean_get = function (arg0) {
    const v = getObject(arg0);
    const ret = typeof v === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
  };
  imports.wbg.__wbindgen_is_string = function (arg0) {
    const ret = typeof getObject(arg0) === 'string';
    return ret;
  };
  imports.wbg.__wbindgen_is_object = function (arg0) {
    const val = getObject(arg0);
    const ret = typeof val === 'object' && val !== null;
    return ret;
  };
  imports.wbg.__wbindgen_is_undefined = function (arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
  };
  imports.wbg.__wbindgen_in = function (arg0, arg1) {
    const ret = getObject(arg0) in getObject(arg1);
    return ret;
  };
  imports.wbg.__wbindgen_number_new = function (arg0) {
    const ret = arg0;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_object_clone_ref = function (arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_jsval_loose_eq = function (arg0, arg1) {
    const ret = getObject(arg0) == getObject(arg1);
    return ret;
  };
  imports.wbg.__wbindgen_string_new = function (arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_number_get = function (arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === 'number' ? obj : undefined;
    getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
  };
  imports.wbg.__wbg_getwithrefkey_15c62c2b8546208d = function (arg0, arg1) {
    const ret = getObject(arg0)[getObject(arg1)];
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_set_20cbc34131e76824 = function (arg0, arg1, arg2) {
    getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
  };
  imports.wbg.__wbg_get_57245cc7d7c7619d = function (arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_length_6e3bbe7c8bd4dbd8 = function (arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_new_1d9a920c6bfc44a8 = function () {
    const ret = new Array();
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_is_function = function (arg0) {
    const ret = typeof getObject(arg0) === 'function';
    return ret;
  };
  imports.wbg.__wbg_next_579e583d33566a86 = function (arg0) {
    const ret = getObject(arg0).next;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_next_aaef7c8aa5e212ac = function () {
    return handleError(function (arg0) {
      const ret = getObject(arg0).next();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_done_1b73b0672e15f234 = function (arg0) {
    const ret = getObject(arg0).done;
    return ret;
  };
  imports.wbg.__wbg_value_1ccc36bc03462d71 = function (arg0) {
    const ret = getObject(arg0).value;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_iterator_6f9d4f28845f426c = function () {
    const ret = Symbol.iterator;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_get_765201544a2b6869 = function () {
    return handleError(function (arg0, arg1) {
      const ret = Reflect.get(getObject(arg0), getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_call_97ae9d8645dc388b = function () {
    return handleError(function (arg0, arg1) {
      const ret = getObject(arg0).call(getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_new_0b9bfdd97583284e = function () {
    const ret = new Object();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_set_a68214f35c417fa9 = function (arg0, arg1, arg2) {
    getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
  };
  imports.wbg.__wbg_isArray_27c46c67f498e15d = function (arg0) {
    const ret = Array.isArray(getObject(arg0));
    return ret;
  };
  imports.wbg.__wbg_instanceof_ArrayBuffer_e5e48f4762c5610b = function (arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof ArrayBuffer;
    } catch {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_isSafeInteger_dfa0593e8d7ac35a = function (arg0) {
    const ret = Number.isSafeInteger(getObject(arg0));
    return ret;
  };
  imports.wbg.__wbg_entries_65a76a413fc91037 = function (arg0) {
    const ret = Object.entries(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_buffer_3f3d764d4747d564 = function (arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_8c3f0052272a457a = function (arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_set_83db9690f9353e79 = function (arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
  };
  imports.wbg.__wbg_length_9e1ae1900cb0fbd5 = function (arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Uint8Array_971eeda69eb75003 = function (arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Uint8Array;
    } catch {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbindgen_bigint_get_as_i64 = function (arg0, arg1) {
    const v = getObject(arg1);
    const ret = typeof v === 'bigint' ? v : undefined;
    getBigInt64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0n : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
  };
  imports.wbg.__wbindgen_debug_string = function (arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr0 = passStringToWasm0(
      ret,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc
    );
    const len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbindgen_memory = function () {
    const ret = wasm.memory;
    return addHeapObject(ret);
  };

  return imports;
}

function initMemory(imports, maybe_memory) {}

function finalizeInit(instance, module) {
  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;
  cachedBigInt64Memory0 = new BigInt64Array();
  cachedFloat64Memory0 = new Float64Array();
  cachedInt32Memory0 = new Int32Array();
  cachedUint8Memory0 = new Uint8Array();

  return wasm;
}

function initSync(module) {
  const imports = getImports();

  initMemory(imports);

  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }

  const instance = new WebAssembly.Instance(module, imports);

  return finalizeInit(instance, module);
}

async function init(input) {
  if (typeof input === 'undefined') {
    input = new URL('typescript_bindings_bg.wasm', import.meta.url);
  }
  const imports = getImports();

  if (
    typeof input === 'string' ||
    (typeof Request === 'function' && input instanceof Request) ||
    (typeof URL === 'function' && input instanceof URL)
  ) {
    input = fetch(input);
  }

  initMemory(imports);

  const { instance, module } = await load(await input, imports);

  return finalizeInit(instance, module);
}

export { initSync };
export default init;
