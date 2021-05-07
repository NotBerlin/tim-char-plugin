/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(10), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(3);
var core = __webpack_require__(4);
var hide = __webpack_require__(5);
var redefine = __webpack_require__(15);
var ctx = __webpack_require__(21);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 3 */
/***/ ((module) => {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ ((module) => {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(14);
module.exports = __webpack_require__(10) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var anObject = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(9);
var toPrimitive = __webpack_require__(13);
var dP = Object.defineProperty;

exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = !__webpack_require__(10) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(12)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 10 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(8);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 13 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 15 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(3);
var hide = __webpack_require__(5);
var has = __webpack_require__(16);
var SRC = __webpack_require__(17)('src');
var $toString = __webpack_require__(18);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(4).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 16 */
/***/ ((module) => {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 17 */
/***/ ((module) => {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 18 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(19)('native-function-to-string', Function.toString);


/***/ }),
/* 19 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var core = __webpack_require__(4);
var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(20) ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = false;


/***/ }),
/* 21 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// optional / simple context binding
var aFunction = __webpack_require__(22);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(24);
var test = {};
test[__webpack_require__(26)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(15)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 24 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(25);
var TAG = __webpack_require__(26)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 25 */
/***/ ((module) => {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 26 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var store = __webpack_require__(19)('wks');
var uid = __webpack_require__(17);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var LIBRARY = __webpack_require__(20);
var global = __webpack_require__(3);
var ctx = __webpack_require__(21);
var classof = __webpack_require__(24);
var $export = __webpack_require__(2);
var isObject = __webpack_require__(8);
var aFunction = __webpack_require__(22);
var anInstance = __webpack_require__(28);
var forOf = __webpack_require__(29);
var speciesConstructor = __webpack_require__(36);
var task = __webpack_require__(37).set;
var microtask = __webpack_require__(40)();
var newPromiseCapabilityModule = __webpack_require__(41);
var perform = __webpack_require__(42);
var userAgent = __webpack_require__(43);
var promiseResolve = __webpack_require__(44);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(26)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(45)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(46)($Promise, PROMISE);
__webpack_require__(47)(PROMISE);
Wrapper = __webpack_require__(4)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(48)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 29 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ctx = __webpack_require__(21);
var call = __webpack_require__(30);
var isArrayIter = __webpack_require__(31);
var anObject = __webpack_require__(7);
var toLength = __webpack_require__(33);
var getIterFn = __webpack_require__(35);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 30 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 31 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// check on default Array iterator
var Iterators = __webpack_require__(32);
var ITERATOR = __webpack_require__(26)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = {};


/***/ }),
/* 33 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.15 ToLength
var toInteger = __webpack_require__(34);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 34 */
/***/ ((module) => {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 35 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(24);
var ITERATOR = __webpack_require__(26)('iterator');
var Iterators = __webpack_require__(32);
module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 36 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(7);
var aFunction = __webpack_require__(22);
var SPECIES = __webpack_require__(26)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 37 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ctx = __webpack_require__(21);
var invoke = __webpack_require__(38);
var html = __webpack_require__(39);
var cel = __webpack_require__(12);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(25)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 38 */
/***/ ((module) => {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 39 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 40 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(37).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(25)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 41 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(22);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 43 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(3);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 44 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(7);
var isObject = __webpack_require__(8);
var newPromiseCapability = __webpack_require__(41);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 45 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var redefine = __webpack_require__(15);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 46 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var def = __webpack_require__(6).f;
var has = __webpack_require__(16);
var TAG = __webpack_require__(26)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 47 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(3);
var dP = __webpack_require__(6);
var DESCRIPTORS = __webpack_require__(10);
var SPECIES = __webpack_require__(26)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 48 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ITERATOR = __webpack_require__(26)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 49 */
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),
/* 50 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():0}(this,(function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:{};function t(e,t){return e(t={exports:{}},t.exports),t.exports}var n=function(e){return e&&e.Math==Math&&e},r=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||Function("return this")(),o=function(e){try{return!!e()}catch(t){return!0}},i=!o((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),a={}.propertyIsEnumerable,s=Object.getOwnPropertyDescriptor,u={f:s&&!a.call({1:2},1)?function(e){var t=s(this,e);return!!t&&t.enumerable}:a},c=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}},l={}.toString,p=function(e){return l.call(e).slice(8,-1)},f="".split,h=o((function(){return!Object("z").propertyIsEnumerable(0)}))?function(e){return"String"==p(e)?f.call(e,""):Object(e)}:Object,d=function(e){if(null==e)throw TypeError("Can't call method on "+e);return e},g=function(e){return h(d(e))},m=function(e){return"object"==typeof e?null!==e:"function"==typeof e},v=function(e,t){if(!m(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!m(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!m(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!m(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")},y={}.hasOwnProperty,_=function(e,t){return y.call(e,t)},M=r.document,I=m(M)&&m(M.createElement),C=function(e){return I?M.createElement(e):{}},E=!i&&!o((function(){return 7!=Object.defineProperty(C("div"),"a",{get:function(){return 7}}).a})),S=Object.getOwnPropertyDescriptor,T={f:i?S:function(e,t){if(e=g(e),t=v(t,!0),E)try{return S(e,t)}catch(n){}if(_(e,t))return c(!u.f.call(e,t),e[t])}},D=function(e){if(!m(e))throw TypeError(String(e)+" is not an object");return e},k=Object.defineProperty,A={f:i?k:function(e,t,n){if(D(e),t=v(t,!0),D(n),E)try{return k(e,t,n)}catch(r){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},O=i?function(e,t,n){return A.f(e,t,c(1,n))}:function(e,t,n){return e[t]=n,e},R=function(e,t){try{O(r,e,t)}catch(n){r[e]=t}return t},N=r["__core-js_shared__"]||R("__core-js_shared__",{}),L=Function.toString;"function"!=typeof N.inspectSource&&(N.inspectSource=function(e){return L.call(e)});var w,b,P,G=N.inspectSource,U=r.WeakMap,q="function"==typeof U&&/native code/.test(G(U)),x=t((function(e){(e.exports=function(e,t){return N[e]||(N[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.6.5",mode:"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})})),F=0,V=Math.random(),B=function(e){return"Symbol("+String(void 0===e?"":e)+")_"+(++F+V).toString(36)},j=x("keys"),K=function(e){return j[e]||(j[e]=B(e))},H={},$=r.WeakMap;if(q){var z=new $,W=z.get,Y=z.has,J=z.set;w=function(e,t){return J.call(z,e,t),t},b=function(e){return W.call(z,e)||{}},P=function(e){return Y.call(z,e)}}else{var X=K("state");H[X]=!0,w=function(e,t){return O(e,X,t),t},b=function(e){return _(e,X)?e[X]:{}},P=function(e){return _(e,X)}}var Q,Z,ee={set:w,get:b,has:P,enforce:function(e){return P(e)?b(e):w(e,{})},getterFor:function(e){return function(t){var n;if(!m(t)||(n=b(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return n}}},te=t((function(e){var t=ee.get,n=ee.enforce,o=String(String).split("String");(e.exports=function(e,t,i,a){var s=!!a&&!!a.unsafe,u=!!a&&!!a.enumerable,c=!!a&&!!a.noTargetGet;"function"==typeof i&&("string"!=typeof t||_(i,"name")||O(i,"name",t),n(i).source=o.join("string"==typeof t?t:"")),e!==r?(s?!c&&e[t]&&(u=!0):delete e[t],u?e[t]=i:O(e,t,i)):u?e[t]=i:R(t,i)})(Function.prototype,"toString",(function(){return"function"==typeof this&&t(this).source||G(this)}))})),ne=r,re=function(e){return"function"==typeof e?e:void 0},oe=function(e,t){return arguments.length<2?re(ne[e])||re(r[e]):ne[e]&&ne[e][t]||r[e]&&r[e][t]},ie=Math.ceil,ae=Math.floor,se=function(e){return isNaN(e=+e)?0:(e>0?ae:ie)(e)},ue=Math.min,ce=function(e){return e>0?ue(se(e),9007199254740991):0},le=Math.max,pe=Math.min,fe=function(e,t){var n=se(e);return n<0?le(n+t,0):pe(n,t)},he=function(e){return function(t,n,r){var o,i=g(t),a=ce(i.length),s=fe(r,a);if(e&&n!=n){for(;a>s;)if((o=i[s++])!=o)return!0}else for(;a>s;s++)if((e||s in i)&&i[s]===n)return e||s||0;return!e&&-1}},de={includes:he(!0),indexOf:he(!1)},ge=de.indexOf,me=function(e,t){var n,r=g(e),o=0,i=[];for(n in r)!_(H,n)&&_(r,n)&&i.push(n);for(;t.length>o;)_(r,n=t[o++])&&(~ge(i,n)||i.push(n));return i},ve=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],ye=ve.concat("length","prototype"),_e={f:Object.getOwnPropertyNames||function(e){return me(e,ye)}},Me={f:Object.getOwnPropertySymbols},Ie=oe("Reflect","ownKeys")||function(e){var t=_e.f(D(e)),n=Me.f;return n?t.concat(n(e)):t},Ce=function(e,t){for(var n=Ie(t),r=A.f,o=T.f,i=0;i<n.length;i++){var a=n[i];_(e,a)||r(e,a,o(t,a))}},Ee=/#|\.prototype\./,Se=function(e,t){var n=De[Te(e)];return n==Ae||n!=ke&&("function"==typeof t?o(t):!!t)},Te=Se.normalize=function(e){return String(e).replace(Ee,".").toLowerCase()},De=Se.data={},ke=Se.NATIVE="N",Ae=Se.POLYFILL="P",Oe=Se,Re=T.f,Ne=function(e,t){var n,o,i,a,s,u=e.target,c=e.global,l=e.stat;if(n=c?r:l?r[u]||R(u,{}):(r[u]||{}).prototype)for(o in t){if(a=t[o],i=e.noTargetGet?(s=Re(n,o))&&s.value:n[o],!Oe(c?o:u+(l?".":"#")+o,e.forced)&&void 0!==i){if(typeof a==typeof i)continue;Ce(a,i)}(e.sham||i&&i.sham)&&O(a,"sham",!0),te(n,o,a,e)}},Le=Array.isArray||function(e){return"Array"==p(e)},we=function(e){return Object(d(e))},be=function(e,t,n){var r=v(t);r in e?A.f(e,r,c(0,n)):e[r]=n},Pe=!!Object.getOwnPropertySymbols&&!o((function(){return!String(Symbol())})),Ge=Pe&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,Ue=x("wks"),qe=r.Symbol,xe=Ge?qe:qe&&qe.withoutSetter||B,Fe=function(e){return _(Ue,e)||(Pe&&_(qe,e)?Ue[e]=qe[e]:Ue[e]=xe("Symbol."+e)),Ue[e]},Ve=Fe("species"),Be=function(e,t){var n;return Le(e)&&("function"!=typeof(n=e.constructor)||n!==Array&&!Le(n.prototype)?m(n)&&null===(n=n[Ve])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===t?0:t)},je=oe("navigator","userAgent")||"",Ke=r.process,He=Ke&&Ke.versions,$e=He&&He.v8;$e?Z=(Q=$e.split("."))[0]+Q[1]:je&&(!(Q=je.match(/Edge\/(\d+)/))||Q[1]>=74)&&(Q=je.match(/Chrome\/(\d+)/))&&(Z=Q[1]);var ze=Z&&+Z,We=Fe("species"),Ye=function(e){return ze>=51||!o((function(){var t=[];return(t.constructor={})[We]=function(){return{foo:1}},1!==t[e](Boolean).foo}))},Je=Fe("isConcatSpreadable"),Xe=ze>=51||!o((function(){var e=[];return e[Je]=!1,e.concat()[0]!==e})),Qe=Ye("concat"),Ze=function(e){if(!m(e))return!1;var t=e[Je];return void 0!==t?!!t:Le(e)};Ne({target:"Array",proto:!0,forced:!Xe||!Qe},{concat:function(e){var t,n,r,o,i,a=we(this),s=Be(a,0),u=0;for(t=-1,r=arguments.length;t<r;t++)if(Ze(i=-1===t?a:arguments[t])){if(u+(o=ce(i.length))>9007199254740991)throw TypeError("Maximum allowed index exceeded");for(n=0;n<o;n++,u++)n in i&&be(s,u,i[n])}else{if(u>=9007199254740991)throw TypeError("Maximum allowed index exceeded");be(s,u++,i)}return s.length=u,s}});var et=function(e){if("function"!=typeof e)throw TypeError(String(e)+" is not a function");return e},nt=function(e,t,n){if(et(e),void 0===t)return e;switch(n){case 0:return function(){return e.call(t)};case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}},rt=[].push,ot=function(e){var t=1==e,n=2==e,r=3==e,o=4==e,i=6==e,a=5==e||i;return function(s,u,c,l){for(var p,f,d=we(s),g=h(d),m=nt(u,c,3),v=ce(g.length),y=0,_=l||Be,M=t?_(s,v):n?_(s,0):void 0;v>y;y++)if((a||y in g)&&(f=m(p=g[y],y,d),e))if(t)M[y]=f;else if(f)switch(e){case 3:return!0;case 5:return p;case 6:return y;case 2:rt.call(M,p)}else if(o)return!1;return i?-1:r||o?o:M}},it={forEach:ot(0),map:ot(1),filter:ot(2),some:ot(3),every:ot(4),find:ot(5),findIndex:ot(6)},at=function(e,t){var n=[][e];return!!n&&o((function(){n.call(null,t||function(){throw 1},1)}))},st=Object.defineProperty,ut={},ct=function(e){throw e},lt=function(e,t){if(_(ut,e))return ut[e];t||(t={});var n=[][e],r=!!_(t,"ACCESSORS")&&t.ACCESSORS,a=_(t,0)?t[0]:ct,s=_(t,1)?t[1]:void 0;return ut[e]=!!n&&!o((function(){if(r&&!i)return!0;var e={length:-1};r?st(e,1,{enumerable:!0,get:ct}):e[1]=1,n.call(e,a,s)}))},pt=it.forEach,ft=at("forEach"),ht=lt("forEach"),dt=ft&&ht?[].forEach:function(e){return pt(this,e,arguments.length>1?arguments[1]:void 0)};Ne({target:"Array",proto:!0,forced:[].forEach!=dt},{forEach:dt});var gt=function(e,t,n,r){try{return r?t(D(n)[0],n[1]):t(n)}catch(i){var o=e.return;throw void 0!==o&&D(o.call(e)),i}},mt={},vt=Fe("iterator"),yt=Array.prototype,_t=function(e){return void 0!==e&&(mt.Array===e||yt[vt]===e)},Mt={};Mt[Fe("toStringTag")]="z";var It="[object z]"===String(Mt),Ct=Fe("toStringTag"),Et="Arguments"==p(function(){return arguments}()),St=It?p:function(e){var t,n,r;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=function(e,t){try{return e[t]}catch(n){}}(t=Object(e),Ct))?n:Et?p(t):"Object"==(r=p(t))&&"function"==typeof t.callee?"Arguments":r},Tt=Fe("iterator"),Dt=function(e){if(null!=e)return e[Tt]||e["@@iterator"]||mt[St(e)]},kt=function(e){var t,n,r,o,i,a,s=we(e),u="function"==typeof this?this:Array,c=arguments.length,l=c>1?arguments[1]:void 0,p=void 0!==l,f=Dt(s),h=0;if(p&&(l=nt(l,c>2?arguments[2]:void 0,2)),null==f||u==Array&&_t(f))for(n=new u(t=ce(s.length));t>h;h++)a=p?l(s[h],h):s[h],be(n,h,a);else for(i=(o=f.call(s)).next,n=new u;!(r=i.call(o)).done;h++)a=p?gt(o,l,[r.value,h],!0):r.value,be(n,h,a);return n.length=h,n},At=Fe("iterator"),Ot=!1;try{var Rt=0,Nt={next:function(){return{done:!!Rt++}},return:function(){Ot=!0}};Nt[At]=function(){return this},Array.from(Nt,(function(){throw 2}))}catch(E_){}var Lt=function(e,t){if(!t&&!Ot)return!1;var n=!1;try{var r={};r[At]=function(){return{next:function(){return{done:n=!0}}}},e(r)}catch(E_){}return n},wt=!Lt((function(e){Array.from(e)}));Ne({target:"Array",stat:!0,forced:wt},{from:kt});var bt,Pt=Object.keys||function(e){return me(e,ve)},Gt=i?Object.defineProperties:function(e,t){D(e);for(var n,r=Pt(t),o=r.length,i=0;o>i;)A.f(e,n=r[i++],t[n]);return e},Ut=oe("document","documentElement"),qt=K("IE_PROTO"),xt=function(){},Ft=function(e){return"<script>"+e+"<\/script>"},Vt=function(){try{bt=document.domain&&new ActiveXObject("htmlfile")}catch(E_){}var e,t;Vt=bt?function(e){e.write(Ft("")),e.close();var t=e.parentWindow.Object;return e=null,t}(bt):((t=C("iframe")).style.display="none",Ut.appendChild(t),t.src=String("javascript:"),(e=t.contentWindow.document).open(),e.write(Ft("document.F=Object")),e.close(),e.F);for(var n=ve.length;n--;)delete Vt.prototype[ve[n]];return Vt()};H[qt]=!0;var Bt=Object.create||function(e,t){var n;return null!==e?(xt.prototype=D(e),n=new xt,xt.prototype=null,n[qt]=e):n=Vt(),void 0===t?n:Gt(n,t)};Ne({target:"Object",stat:!0,sham:!i},{create:Bt});var jt=o((function(){Pt(1)}));Ne({target:"Object",stat:!0,forced:jt},{keys:function(e){return Pt(we(e))}});var Kt,Ht,$t,zt=function(e){return function(t,n){var r,o,i=String(d(t)),a=se(n),s=i.length;return a<0||a>=s?e?"":void 0:(r=i.charCodeAt(a))<55296||r>56319||a+1===s||(o=i.charCodeAt(a+1))<56320||o>57343?e?i.charAt(a):r:e?i.slice(a,a+2):o-56320+(r-55296<<10)+65536}},Wt={codeAt:zt(!1),charAt:zt(!0)},Yt=!o((function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype})),Jt=K("IE_PROTO"),Xt=Object.prototype,Qt=Yt?Object.getPrototypeOf:function(e){return e=we(e),_(e,Jt)?e[Jt]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?Xt:null},Zt=Fe("iterator"),en=!1;[].keys&&("next"in($t=[].keys())?(Ht=Qt(Qt($t)))!==Object.prototype&&(Kt=Ht):en=!0),null==Kt&&(Kt={}),_(Kt,Zt)||O(Kt,Zt,(function(){return this}));var tn={IteratorPrototype:Kt,BUGGY_SAFARI_ITERATORS:en},nn=A.f,rn=Fe("toStringTag"),on=function(e,t,n){e&&!_(e=n?e:e.prototype,rn)&&nn(e,rn,{configurable:!0,value:t})},an=tn.IteratorPrototype,sn=function(){return this},un=function(e,t,n){var r=t+" Iterator";return e.prototype=Bt(an,{next:c(1,n)}),on(e,r,!1),mt[r]=sn,e},cn=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,n={};try{(e=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),t=n instanceof Array}catch(E_){}return function(n,r){return D(n),function(e){if(!m(e)&&null!==e)throw TypeError("Can't set "+String(e)+" as a prototype")}(r),t?e.call(n,r):n.__proto__=r,n}}():void 0),ln=tn.IteratorPrototype,pn=tn.BUGGY_SAFARI_ITERATORS,fn=Fe("iterator"),hn=function(){return this},dn=function(e,t,n,r,o,i,a){un(n,t,r);var s,u,c,l=function(e){if(e===o&&g)return g;if(!pn&&e in h)return h[e];switch(e){case"keys":case"values":case"entries":return function(){return new n(this,e)}}return function(){return new n(this)}},p=t+" Iterator",f=!1,h=e.prototype,d=h[fn]||h["@@iterator"]||o&&h[o],g=!pn&&d||l(o),m="Array"==t&&h.entries||d;if(m&&(s=Qt(m.call(new e)),ln!==Object.prototype&&s.next&&(Qt(s)!==ln&&(cn?cn(s,ln):"function"!=typeof s[fn]&&O(s,fn,hn)),on(s,p,!0))),"values"==o&&d&&"values"!==d.name&&(f=!0,g=function(){return d.call(this)}),h[fn]!==g&&O(h,fn,g),mt[t]=g,o)if(u={values:l("values"),keys:i?g:l("keys"),entries:l("entries")},a)for(c in u)(pn||f||!(c in h))&&te(h,c,u[c]);else Ne({target:t,proto:!0,forced:pn||f},u);return u},gn=Wt.charAt,mn=ee.set,vn=ee.getterFor("String Iterator");dn(String,"String",(function(e){mn(this,{type:"String Iterator",string:String(e),index:0})}),(function(){var e,t=vn(this),n=t.string,r=t.index;return r>=n.length?{value:void 0,done:!0}:(e=gn(n,r),t.index+=e.length,{value:e,done:!1})}));var yn={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0};for(var _n in yn){var Mn=r[_n],In=Mn&&Mn.prototype;if(In&&In.forEach!==dt)try{O(In,"forEach",dt)}catch(E_){In.forEach=dt}}var Cn={SDK_READY:"sdkStateReady",SDK_NOT_READY:"sdkStateNotReady",SDK_DESTROY:"sdkDestroy",MESSAGE_RECEIVED:"onMessageReceived",MESSAGE_REVOKED:"onMessageRevoked",MESSAGE_READ_BY_PEER:"onMessageReadByPeer",CONVERSATION_LIST_UPDATED:"onConversationListUpdated",GROUP_LIST_UPDATED:"onGroupListUpdated",GROUP_SYSTEM_NOTICE_RECEIVED:"receiveGroupSystemNotice",PROFILE_UPDATED:"onProfileUpdated",BLACKLIST_UPDATED:"blacklistUpdated",KICKED_OUT:"kickedOut",ERROR:"error",NET_STATE_CHANGE:"netStateChange",SDK_RELOAD:"sdkReload"},En={MSG_TEXT:"TIMTextElem",MSG_IMAGE:"TIMImageElem",MSG_SOUND:"TIMSoundElem",MSG_AUDIO:"TIMSoundElem",MSG_FILE:"TIMFileElem",MSG_FACE:"TIMFaceElem",MSG_VIDEO:"TIMVideoFileElem",MSG_GEO:"TIMLocationElem",MSG_GRP_TIP:"TIMGroupTipElem",MSG_GRP_SYS_NOTICE:"TIMGroupSystemNoticeElem",MSG_CUSTOM:"TIMCustomElem",MSG_MERGER:"TIMRelayElem",MSG_PRIORITY_HIGH:"High",MSG_PRIORITY_NORMAL:"Normal",MSG_PRIORITY_LOW:"Low",MSG_PRIORITY_LOWEST:"Lowest",CONV_C2C:"C2C",CONV_GROUP:"GROUP",CONV_SYSTEM:"@TIM#SYSTEM",CONV_AT_ME:1,CONV_AT_ALL:2,CONV_AT_ALL_AT_ME:3,GRP_PRIVATE:"Private",GRP_WORK:"Private",GRP_PUBLIC:"Public",GRP_CHATROOM:"ChatRoom",GRP_MEETING:"ChatRoom",GRP_AVCHATROOM:"AVChatRoom",GRP_MBR_ROLE_OWNER:"Owner",GRP_MBR_ROLE_ADMIN:"Admin",GRP_MBR_ROLE_MEMBER:"Member",GRP_TIP_MBR_JOIN:1,GRP_TIP_MBR_QUIT:2,GRP_TIP_MBR_KICKED_OUT:3,GRP_TIP_MBR_SET_ADMIN:4,GRP_TIP_MBR_CANCELED_ADMIN:5,GRP_TIP_GRP_PROFILE_UPDATED:6,GRP_TIP_MBR_PROFILE_UPDATED:7,MSG_REMIND_ACPT_AND_NOTE:"AcceptAndNotify",MSG_REMIND_ACPT_NOT_NOTE:"AcceptNotNotify",MSG_REMIND_DISCARD:"Discard",GENDER_UNKNOWN:"Gender_Type_Unknown",GENDER_FEMALE:"Gender_Type_Female",GENDER_MALE:"Gender_Type_Male",KICKED_OUT_MULT_ACCOUNT:"multipleAccount",KICKED_OUT_MULT_DEVICE:"multipleDevice",KICKED_OUT_USERSIG_EXPIRED:"userSigExpired",ALLOW_TYPE_ALLOW_ANY:"AllowType_Type_AllowAny",ALLOW_TYPE_NEED_CONFIRM:"AllowType_Type_NeedConfirm",ALLOW_TYPE_DENY_ANY:"AllowType_Type_DenyAny",FORBID_TYPE_NONE:"AdminForbid_Type_None",FORBID_TYPE_SEND_OUT:"AdminForbid_Type_SendOut",JOIN_OPTIONS_FREE_ACCESS:"FreeAccess",JOIN_OPTIONS_NEED_PERMISSION:"NeedPermission",JOIN_OPTIONS_DISABLE_APPLY:"DisableApply",JOIN_STATUS_SUCCESS:"JoinedSuccess",JOIN_STATUS_ALREADY_IN_GROUP:"AlreadyInGroup",JOIN_STATUS_WAIT_APPROVAL:"WaitAdminApproval",GRP_PROFILE_OWNER_ID:"ownerID",GRP_PROFILE_CREATE_TIME:"createTime",GRP_PROFILE_LAST_INFO_TIME:"lastInfoTime",GRP_PROFILE_MEMBER_NUM:"memberNum",GRP_PROFILE_MAX_MEMBER_NUM:"maxMemberNum",GRP_PROFILE_JOIN_OPTION:"joinOption",GRP_PROFILE_INTRODUCTION:"introduction",GRP_PROFILE_NOTIFICATION:"notification",GRP_PROFILE_MUTE_ALL_MBRS:"muteAllMembers",NET_STATE_CONNECTED:"connected",NET_STATE_CONNECTING:"connecting",NET_STATE_DISCONNECTED:"disconnected",MSG_AT_ALL:"__kImSDK_MesssageAtALL__"},Sn=it.map,Tn=Ye("map"),Dn=lt("map");Ne({target:"Array",proto:!0,forced:!Tn||!Dn},{map:function(e){return Sn(this,e,arguments.length>1?arguments[1]:void 0)}});var kn=[].slice,An={},On=function(e,t,n){if(!(t in An)){for(var r=[],o=0;o<t;o++)r[o]="a["+o+"]";An[t]=Function("C,a","return new C("+r.join(",")+")")}return An[t](e,n)},Rn=Function.bind||function(e){var t=et(this),n=kn.call(arguments,1),r=function(){var o=n.concat(kn.call(arguments));return this instanceof r?On(t,o.length,o):t.apply(e,o)};return m(t.prototype)&&(r.prototype=t.prototype),r};function Nn(e){return(Nn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Ln(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function wn(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function bn(e,t,n){return t&&wn(e.prototype,t),n&&wn(e,n),e}function Pn(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Gn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Un(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Gn(Object(n),!0).forEach((function(t){Pn(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Gn(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function qn(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Fn(e,t)}function xn(e){return(xn=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Fn(e,t){return(Fn=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Vn(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function Bn(e,t,n){return(Bn=Vn()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&Fn(o,n.prototype),o}).apply(null,arguments)}function jn(e){var t="function"==typeof Map?new Map:void 0;return(jn=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return Bn(e,arguments,xn(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),Fn(r,e)})(e)}function Kn(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function Hn(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function $n(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?Hn(e):t}function zn(e){var t=Vn();return function(){var n,r=xn(e);if(t){var o=xn(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return $n(this,n)}}function Wn(e,t){return Jn(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(u){o=!0,i=u}finally{try{r||null==s.return||s.return()}finally{if(o)throw i}}return n}(e,t)||Qn(e,t)||er()}function Yn(e){return function(e){if(Array.isArray(e))return Zn(e)}(e)||Xn(e)||Qn(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Jn(e){if(Array.isArray(e))return e}function Xn(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function Qn(e,t){if(e){if("string"==typeof e)return Zn(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Zn(e,t):void 0}}function Zn(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function er(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function tr(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=Qn(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return a=e.done,e},e:function(e){s=!0,i=e},f:function(){try{a||null==n.return||n.return()}finally{if(s)throw i}}}}Ne({target:"Function",proto:!0},{bind:Rn});var nr=function(){function e(){Ln(this,e),this.cache=[],this.options=null}return bn(e,[{key:"use",value:function(e){if("function"!=typeof e)throw"middleware must be a function";return this.cache.push(e),this}},{key:"next",value:function(e){if(this.middlewares&&this.middlewares.length>0)return this.middlewares.shift().call(this,this.options,this.next.bind(this))}},{key:"run",value:function(e){return this.middlewares=this.cache.map((function(e){return e})),this.options=e,this.next()}}]),e}(),rr=A.f,or=Function.prototype,ir=or.toString,ar=/^\s*function ([^ (]*)/;i&&!("name"in or)&&rr(or,"name",{configurable:!0,get:function(){try{return ir.call(this).match(ar)[1]}catch(E_){return""}}});var sr=t((function(t,n){var r,o,i,a,s,u,c,l,p,f,h,d,g,m,v,y,_,M;t.exports=(r="function"==typeof Promise,o="object"==typeof self?self:e,i="undefined"!=typeof Symbol,a="undefined"!=typeof Map,s="undefined"!=typeof Set,u="undefined"!=typeof WeakMap,c="undefined"!=typeof WeakSet,l="undefined"!=typeof DataView,p=i&&void 0!==Symbol.iterator,f=i&&void 0!==Symbol.toStringTag,h=s&&"function"==typeof Set.prototype.entries,d=a&&"function"==typeof Map.prototype.entries,g=h&&Object.getPrototypeOf((new Set).entries()),m=d&&Object.getPrototypeOf((new Map).entries()),v=p&&"function"==typeof Array.prototype[Symbol.iterator],y=v&&Object.getPrototypeOf([][Symbol.iterator]()),_=p&&"function"==typeof String.prototype[Symbol.iterator],M=_&&Object.getPrototypeOf(""[Symbol.iterator]()),function(e){var t=typeof e;if("object"!==t)return t;if(null===e)return"null";if(e===o)return"global";if(Array.isArray(e)&&(!1===f||!(Symbol.toStringTag in e)))return"Array";if("object"==typeof window&&null!==window){if("object"==typeof window.location&&e===window.location)return"Location";if("object"==typeof window.document&&e===window.document)return"Document";if("object"==typeof window.navigator){if("object"==typeof window.navigator.mimeTypes&&e===window.navigator.mimeTypes)return"MimeTypeArray";if("object"==typeof window.navigator.plugins&&e===window.navigator.plugins)return"PluginArray"}if(("function"==typeof window.HTMLElement||"object"==typeof window.HTMLElement)&&e instanceof window.HTMLElement){if("BLOCKQUOTE"===e.tagName)return"HTMLQuoteElement";if("TD"===e.tagName)return"HTMLTableDataCellElement";if("TH"===e.tagName)return"HTMLTableHeaderCellElement"}}var n=f&&e[Symbol.toStringTag];if("string"==typeof n)return n;var i=Object.getPrototypeOf(e);return i===RegExp.prototype?"RegExp":i===Date.prototype?"Date":r&&i===Promise.prototype?"Promise":s&&i===Set.prototype?"Set":a&&i===Map.prototype?"Map":c&&i===WeakSet.prototype?"WeakSet":u&&i===WeakMap.prototype?"WeakMap":l&&i===DataView.prototype?"DataView":a&&i===m?"Map Iterator":s&&i===g?"Set Iterator":v&&i===y?"Array Iterator":_&&i===M?"String Iterator":null===i?"Object":Object.prototype.toString.call(e).slice(8,-1)})}));Ne({target:"Array",stat:!0},{isArray:Le});var ur=Fe("unscopables"),cr=Array.prototype;null==cr[ur]&&A.f(cr,ur,{configurable:!0,value:Bt(null)});var lr=function(e){cr[ur][e]=!0},pr=it.find,fr=!0,hr=lt("find");"find"in[]&&Array(1).find((function(){fr=!1})),Ne({target:"Array",proto:!0,forced:fr||!hr},{find:function(e){return pr(this,e,arguments.length>1?arguments[1]:void 0)}}),lr("find");var dr=de.includes,gr=lt("indexOf",{ACCESSORS:!0,1:0});Ne({target:"Array",proto:!0,forced:!gr},{includes:function(e){return dr(this,e,arguments.length>1?arguments[1]:void 0)}}),lr("includes");var mr=de.indexOf,vr=[].indexOf,yr=!!vr&&1/[1].indexOf(1,-0)<0,_r=at("indexOf"),Mr=lt("indexOf",{ACCESSORS:!0,1:0});Ne({target:"Array",proto:!0,forced:yr||!_r||!Mr},{indexOf:function(e){return yr?vr.apply(this,arguments)||0:mr(this,e,arguments.length>1?arguments[1]:void 0)}});var Ir=ee.set,Cr=ee.getterFor("Array Iterator"),Er=dn(Array,"Array",(function(e,t){Ir(this,{type:"Array Iterator",target:g(e),index:0,kind:t})}),(function(){var e=Cr(this),t=e.target,n=e.kind,r=e.index++;return!t||r>=t.length?(e.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:r,done:!1}:"values"==n?{value:t[r],done:!1}:{value:[r,t[r]],done:!1}}),"values");mt.Arguments=mt.Array,lr("keys"),lr("values"),lr("entries");var Sr=[].join,Tr=h!=Object,Dr=at("join",",");Ne({target:"Array",proto:!0,forced:Tr||!Dr},{join:function(e){return Sr.call(g(this),void 0===e?",":e)}});var kr=Ye("slice"),Ar=lt("slice",{ACCESSORS:!0,0:0,1:2}),Or=Fe("species"),Rr=[].slice,Nr=Math.max;Ne({target:"Array",proto:!0,forced:!kr||!Ar},{slice:function(e,t){var n,r,o,i=g(this),a=ce(i.length),s=fe(e,a),u=fe(void 0===t?a:t,a);if(Le(i)&&("function"!=typeof(n=i.constructor)||n!==Array&&!Le(n.prototype)?m(n)&&null===(n=n[Or])&&(n=void 0):n=void 0,n===Array||void 0===n))return Rr.call(i,s,u);for(r=new(void 0===n?Array:n)(Nr(u-s,0)),o=0;s<u;s++,o++)s in i&&be(r,o,i[s]);return r.length=o,r}}),Ne({target:"Date",stat:!0},{now:function(){return(new Date).getTime()}});var Lr="".repeat||function(e){var t=String(d(this)),n="",r=se(e);if(r<0||Infinity==r)throw RangeError("Wrong number of repetitions");for(;r>0;(r>>>=1)&&(t+=t))1&r&&(n+=t);return n},wr=Math.ceil,br=function(e){return function(t,n,r){var o,i,a=String(d(t)),s=a.length,u=void 0===r?" ":String(r),c=ce(n);return c<=s||""==u?a:(o=c-s,(i=Lr.call(u,wr(o/u.length))).length>o&&(i=i.slice(0,o)),e?a+i:i+a)}},Pr={start:br(!1),end:br(!0)}.start,Gr=Math.abs,Ur=Date.prototype,qr=Ur.getTime,xr=Ur.toISOString,Fr=o((function(){return"0385-07-25T07:06:39.999Z"!=xr.call(new Date(-50000000000001))}))||!o((function(){xr.call(new Date(NaN))}))?function(){if(!isFinite(qr.call(this)))throw RangeError("Invalid time value");var e=this.getUTCFullYear(),t=this.getUTCMilliseconds(),n=e<0?"-":e>9999?"+":"";return n+Pr(Gr(e),n?6:4,0)+"-"+Pr(this.getUTCMonth()+1,2,0)+"-"+Pr(this.getUTCDate(),2,0)+"T"+Pr(this.getUTCHours(),2,0)+":"+Pr(this.getUTCMinutes(),2,0)+":"+Pr(this.getUTCSeconds(),2,0)+"."+Pr(t,3,0)+"Z"}:xr;Ne({target:"Date",proto:!0,forced:Date.prototype.toISOString!==Fr},{toISOString:Fr});var Vr=Date.prototype,Br=Vr.toString,jr=Vr.getTime;new Date(NaN)+""!="Invalid Date"&&te(Vr,"toString",(function(){var e=jr.call(this);return e==e?Br.call(this):"Invalid Date"}));var Kr=function(e,t,n){var r,o;return cn&&"function"==typeof(r=t.constructor)&&r!==n&&m(o=r.prototype)&&o!==n.prototype&&cn(e,o),e},Hr="\t\n\v\f\r                　\u2028\u2029\ufeff",$r="["+Hr+"]",zr=RegExp("^"+$r+$r+"*"),Wr=RegExp($r+$r+"*$"),Yr=function(e){return function(t){var n=String(d(t));return 1&e&&(n=n.replace(zr,"")),2&e&&(n=n.replace(Wr,"")),n}},Jr={start:Yr(1),end:Yr(2),trim:Yr(3)},Xr=_e.f,Qr=T.f,Zr=A.f,eo=Jr.trim,to=r.Number,no=to.prototype,ro="Number"==p(Bt(no)),oo=function(e){var t,n,r,o,i,a,s,u,c=v(e,!1);if("string"==typeof c&&c.length>2)if(43===(t=(c=eo(c)).charCodeAt(0))||45===t){if(88===(n=c.charCodeAt(2))||120===n)return NaN}else if(48===t){switch(c.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+c}for(a=(i=c.slice(2)).length,s=0;s<a;s++)if((u=i.charCodeAt(s))<48||u>o)return NaN;return parseInt(i,r)}return+c};if(Oe("Number",!to(" 0o1")||!to("0b1")||to("+0x1"))){for(var io,ao=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof ao&&(ro?o((function(){no.valueOf.call(n)})):"Number"!=p(n))?Kr(new to(oo(t)),n,ao):oo(t)},so=i?Xr(to):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),uo=0;so.length>uo;uo++)_(to,io=so[uo])&&!_(ao,io)&&Zr(ao,io,Qr(to,io));ao.prototype=no,no.constructor=ao,te(r,"Number",ao)}var co=_e.f,lo={}.toString,po="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],fo={f:function(e){return po&&"[object Window]"==lo.call(e)?function(e){try{return co(e)}catch(E_){return po.slice()}}(e):co(g(e))}},ho=fo.f,go=o((function(){return!Object.getOwnPropertyNames(1)}));Ne({target:"Object",stat:!0,forced:go},{getOwnPropertyNames:ho});var mo=o((function(){Qt(1)}));Ne({target:"Object",stat:!0,forced:mo,sham:!Yt},{getPrototypeOf:function(e){return Qt(we(e))}});var vo=It?{}.toString:function(){return"[object "+St(this)+"]"};It||te(Object.prototype,"toString",vo,{unsafe:!0});var yo=Jr.trim,_o=r.parseInt,Mo=/^[+-]?0[Xx]/,Io=8!==_o(Hr+"08")||22!==_o(Hr+"0x16")?function(e,t){var n=yo(String(e));return _o(n,t>>>0||(Mo.test(n)?16:10))}:_o;Ne({global:!0,forced:parseInt!=Io},{parseInt:Io});var Co,Eo,So,To=r.Promise,Do=function(e,t,n){for(var r in t)te(e,r,t[r],n);return e},ko=Fe("species"),Ao=function(e){var t=oe(e),n=A.f;i&&t&&!t[ko]&&n(t,ko,{configurable:!0,get:function(){return this}})},Oo=function(e,t,n){if(!(e instanceof t))throw TypeError("Incorrect "+(n?n+" ":"")+"invocation");return e},Ro=t((function(e){var t=function(e,t){this.stopped=e,this.result=t};(e.exports=function(e,n,r,o,i){var a,s,u,c,l,p,f,h=nt(n,r,o?2:1);if(i)a=e;else{if("function"!=typeof(s=Dt(e)))throw TypeError("Target is not iterable");if(_t(s)){for(u=0,c=ce(e.length);c>u;u++)if((l=o?h(D(f=e[u])[0],f[1]):h(e[u]))&&l instanceof t)return l;return new t(!1)}a=s.call(e)}for(p=a.next;!(f=p.call(a)).done;)if("object"==typeof(l=gt(a,h,f.value,o))&&l&&l instanceof t)return l;return new t(!1)}).stop=function(e){return new t(!0,e)}})),No=Fe("species"),Lo=function(e,t){var n,r=D(e).constructor;return void 0===r||null==(n=D(r)[No])?t:et(n)},wo=/(iphone|ipod|ipad).*applewebkit/i.test(je),bo=r.location,Po=r.setImmediate,Go=r.clearImmediate,Uo=r.process,qo=r.MessageChannel,xo=r.Dispatch,Fo=0,Vo={},Bo=function(e){if(Vo.hasOwnProperty(e)){var t=Vo[e];delete Vo[e],t()}},jo=function(e){return function(){Bo(e)}},Ko=function(e){Bo(e.data)},Ho=function(e){r.postMessage(e+"",bo.protocol+"//"+bo.host)};Po&&Go||(Po=function(e){for(var t=[],n=1;arguments.length>n;)t.push(arguments[n++]);return Vo[++Fo]=function(){("function"==typeof e?e:Function(e)).apply(void 0,t)},Co(Fo),Fo},Go=function(e){delete Vo[e]},"process"==p(Uo)?Co=function(e){Uo.nextTick(jo(e))}:xo&&xo.now?Co=function(e){xo.now(jo(e))}:qo&&!wo?(So=(Eo=new qo).port2,Eo.port1.onmessage=Ko,Co=nt(So.postMessage,So,1)):!r.addEventListener||"function"!=typeof postMessage||r.importScripts||o(Ho)||"file:"===bo.protocol?Co="onreadystatechange"in C("script")?function(e){Ut.appendChild(C("script")).onreadystatechange=function(){Ut.removeChild(this),Bo(e)}}:function(e){setTimeout(jo(e),0)}:(Co=Ho,r.addEventListener("message",Ko,!1)));var $o,zo,Wo,Yo,Jo,Xo,Qo,Zo,ei={set:Po,clear:Go},ti=T.f,ni=ei.set,ri=r.MutationObserver||r.WebKitMutationObserver,oi=r.process,ii=r.Promise,ai="process"==p(oi),si=ti(r,"queueMicrotask"),ui=si&&si.value;ui||($o=function(){var e,t;for(ai&&(e=oi.domain)&&e.exit();zo;){t=zo.fn,zo=zo.next;try{t()}catch(E_){throw zo?Yo():Wo=void 0,E_}}Wo=void 0,e&&e.enter()},ai?Yo=function(){oi.nextTick($o)}:ri&&!wo?(Jo=!0,Xo=document.createTextNode(""),new ri($o).observe(Xo,{characterData:!0}),Yo=function(){Xo.data=Jo=!Jo}):ii&&ii.resolve?(Qo=ii.resolve(void 0),Zo=Qo.then,Yo=function(){Zo.call(Qo,$o)}):Yo=function(){ni.call(r,$o)});var ci,li,pi,fi,hi=ui||function(e){var t={fn:e,next:void 0};Wo&&(Wo.next=t),zo||(zo=t,Yo()),Wo=t},di=function(e){var t,n;this.promise=new e((function(e,r){if(void 0!==t||void 0!==n)throw TypeError("Bad Promise constructor");t=e,n=r})),this.resolve=et(t),this.reject=et(n)},gi={f:function(e){return new di(e)}},mi=function(e,t){if(D(e),m(t)&&t.constructor===e)return t;var n=gi.f(e);return(0,n.resolve)(t),n.promise},vi=function(e){try{return{error:!1,value:e()}}catch(E_){return{error:!0,value:E_}}},yi=ei.set,_i=Fe("species"),Mi="Promise",Ii=ee.get,Ci=ee.set,Ei=ee.getterFor(Mi),Si=To,Ti=r.TypeError,Di=r.document,ki=r.process,Ai=oe("fetch"),Oi=gi.f,Ri=Oi,Ni="process"==p(ki),Li=!!(Di&&Di.createEvent&&r.dispatchEvent),wi=Oe(Mi,(function(){if(!(G(Si)!==String(Si))){if(66===ze)return!0;if(!Ni&&"function"!=typeof PromiseRejectionEvent)return!0}if(ze>=51&&/native code/.test(Si))return!1;var e=Si.resolve(1),t=function(e){e((function(){}),(function(){}))};return(e.constructor={})[_i]=t,!(e.then((function(){}))instanceof t)})),bi=wi||!Lt((function(e){Si.all(e).catch((function(){}))})),Pi=function(e){var t;return!(!m(e)||"function"!=typeof(t=e.then))&&t},Gi=function(e,t,n){if(!t.notified){t.notified=!0;var r=t.reactions;hi((function(){for(var o=t.value,i=1==t.state,a=0;r.length>a;){var s,u,c,l=r[a++],p=i?l.ok:l.fail,f=l.resolve,h=l.reject,d=l.domain;try{p?(i||(2===t.rejection&&Fi(e,t),t.rejection=1),!0===p?s=o:(d&&d.enter(),s=p(o),d&&(d.exit(),c=!0)),s===l.promise?h(Ti("Promise-chain cycle")):(u=Pi(s))?u.call(s,f,h):f(s)):h(o)}catch(E_){d&&!c&&d.exit(),h(E_)}}t.reactions=[],t.notified=!1,n&&!t.rejection&&qi(e,t)}))}},Ui=function(e,t,n){var o,i;Li?((o=Di.createEvent("Event")).promise=t,o.reason=n,o.initEvent(e,!1,!0),r.dispatchEvent(o)):o={promise:t,reason:n},(i=r["on"+e])?i(o):"unhandledrejection"===e&&function(e,t){var n=r.console;n&&n.error&&(1===arguments.length?n.error(e):n.error(e,t))}("Unhandled promise rejection",n)},qi=function(e,t){yi.call(r,(function(){var n,r=t.value;if(xi(t)&&(n=vi((function(){Ni?ki.emit("unhandledRejection",r,e):Ui("unhandledrejection",e,r)})),t.rejection=Ni||xi(t)?2:1,n.error))throw n.value}))},xi=function(e){return 1!==e.rejection&&!e.parent},Fi=function(e,t){yi.call(r,(function(){Ni?ki.emit("rejectionHandled",e):Ui("rejectionhandled",e,t.value)}))},Vi=function(e,t,n,r){return function(o){e(t,n,o,r)}},Bi=function(e,t,n,r){t.done||(t.done=!0,r&&(t=r),t.value=n,t.state=2,Gi(e,t,!0))},ji=function(e,t,n,r){if(!t.done){t.done=!0,r&&(t=r);try{if(e===n)throw Ti("Promise can't be resolved itself");var o=Pi(n);o?hi((function(){var r={done:!1};try{o.call(n,Vi(ji,e,r,t),Vi(Bi,e,r,t))}catch(E_){Bi(e,r,E_,t)}})):(t.value=n,t.state=1,Gi(e,t,!1))}catch(E_){Bi(e,{done:!1},E_,t)}}};wi&&(Si=function(e){Oo(this,Si,Mi),et(e),ci.call(this);var t=Ii(this);try{e(Vi(ji,this,t),Vi(Bi,this,t))}catch(E_){Bi(this,t,E_)}},(ci=function(e){Ci(this,{type:Mi,done:!1,notified:!1,parent:!1,reactions:[],rejection:!1,state:0,value:void 0})}).prototype=Do(Si.prototype,{then:function(e,t){var n=Ei(this),r=Oi(Lo(this,Si));return r.ok="function"!=typeof e||e,r.fail="function"==typeof t&&t,r.domain=Ni?ki.domain:void 0,n.parent=!0,n.reactions.push(r),0!=n.state&&Gi(this,n,!1),r.promise},catch:function(e){return this.then(void 0,e)}}),li=function(){var e=new ci,t=Ii(e);this.promise=e,this.resolve=Vi(ji,e,t),this.reject=Vi(Bi,e,t)},gi.f=Oi=function(e){return e===Si||e===pi?new li(e):Ri(e)},"function"==typeof To&&(fi=To.prototype.then,te(To.prototype,"then",(function(e,t){var n=this;return new Si((function(e,t){fi.call(n,e,t)})).then(e,t)}),{unsafe:!0}),"function"==typeof Ai&&Ne({global:!0,enumerable:!0,forced:!0},{fetch:function(e){return mi(Si,Ai.apply(r,arguments))}}))),Ne({global:!0,wrap:!0,forced:wi},{Promise:Si}),on(Si,Mi,!1),Ao(Mi),pi=oe(Mi),Ne({target:Mi,stat:!0,forced:wi},{reject:function(e){var t=Oi(this);return t.reject.call(void 0,e),t.promise}}),Ne({target:Mi,stat:!0,forced:wi},{resolve:function(e){return mi(this,e)}}),Ne({target:Mi,stat:!0,forced:bi},{all:function(e){var t=this,n=Oi(t),r=n.resolve,o=n.reject,i=vi((function(){var n=et(t.resolve),i=[],a=0,s=1;Ro(e,(function(e){var u=a++,c=!1;i.push(void 0),s++,n.call(t,e).then((function(e){c||(c=!0,i[u]=e,--s||r(i))}),o)})),--s||r(i)}));return i.error&&o(i.value),n.promise},race:function(e){var t=this,n=Oi(t),r=n.reject,o=vi((function(){var o=et(t.resolve);Ro(e,(function(e){o.call(t,e).then(n.resolve,r)}))}));return o.error&&r(o.value),n.promise}});var Ki=function(){var e=D(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t};function Hi(e,t){return RegExp(e,t)}var $i,zi,Wi={UNSUPPORTED_Y:o((function(){var e=Hi("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),BROKEN_CARET:o((function(){var e=Hi("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},Yi=RegExp.prototype.exec,Ji=String.prototype.replace,Xi=Yi,Qi=($i=/a/,zi=/b*/g,Yi.call($i,"a"),Yi.call(zi,"a"),0!==$i.lastIndex||0!==zi.lastIndex),Zi=Wi.UNSUPPORTED_Y||Wi.BROKEN_CARET,ea=void 0!==/()??/.exec("")[1];(Qi||ea||Zi)&&(Xi=function(e){var t,n,r,o,i=this,a=Zi&&i.sticky,s=Ki.call(i),u=i.source,c=0,l=e;return a&&(-1===(s=s.replace("y","")).indexOf("g")&&(s+="g"),l=String(e).slice(i.lastIndex),i.lastIndex>0&&(!i.multiline||i.multiline&&"\n"!==e[i.lastIndex-1])&&(u="(?: "+u+")",l=" "+l,c++),n=new RegExp("^(?:"+u+")",s)),ea&&(n=new RegExp("^"+u+"$(?!\\s)",s)),Qi&&(t=i.lastIndex),r=Yi.call(a?n:i,l),a?r?(r.input=r.input.slice(c),r[0]=r[0].slice(c),r.index=i.lastIndex,i.lastIndex+=r[0].length):i.lastIndex=0:Qi&&r&&(i.lastIndex=i.global?r.index+r[0].length:t),ea&&r&&r.length>1&&Ji.call(r[0],n,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(r[o]=void 0)})),r});var ta=Xi;Ne({target:"RegExp",proto:!0,forced:/./.exec!==ta},{exec:ta});var na=RegExp.prototype,ra=na.toString,oa=o((function(){return"/a/b"!=ra.call({source:"a",flags:"b"})})),ia="toString"!=ra.name;(oa||ia)&&te(RegExp.prototype,"toString",(function(){var e=D(this),t=String(e.source),n=e.flags;return"/"+t+"/"+String(void 0===n&&e instanceof RegExp&&!("flags"in na)?Ki.call(e):n)}),{unsafe:!0});var aa=Wt.codeAt;Ne({target:"String",proto:!0},{codePointAt:function(e){return aa(this,e)}});var sa=Fe("match"),ua=function(e){var t;return m(e)&&(void 0!==(t=e[sa])?!!t:"RegExp"==p(e))},ca=function(e){if(ua(e))throw TypeError("The method doesn't accept regular expressions");return e},la=Fe("match"),pa=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[la]=!1,"/./"[e](t)}catch(r){}}return!1};Ne({target:"String",proto:!0,forced:!pa("includes")},{includes:function(e){return!!~String(d(this)).indexOf(ca(e),arguments.length>1?arguments[1]:void 0)}});var fa=Fe("species"),ha=!o((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),da="$0"==="a".replace(/./,"$0"),ga=Fe("replace"),ma=!!/./[ga]&&""===/./[ga]("a","$0"),va=!o((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]})),ya=function(e,t,n,r){var i=Fe(e),a=!o((function(){var t={};return t[i]=function(){return 7},7!=""[e](t)})),s=a&&!o((function(){var t=!1,n=/a/;return"split"===e&&((n={}).constructor={},n.constructor[fa]=function(){return n},n.flags="",n[i]=/./[i]),n.exec=function(){return t=!0,null},n[i](""),!t}));if(!a||!s||"replace"===e&&(!ha||!da||ma)||"split"===e&&!va){var u=/./[i],c=n(i,""[e],(function(e,t,n,r,o){return t.exec===ta?a&&!o?{done:!0,value:u.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:da,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:ma}),l=c[0],p=c[1];te(String.prototype,e,l),te(RegExp.prototype,i,2==t?function(e,t){return p.call(e,this,t)}:function(e){return p.call(e,this)})}r&&O(RegExp.prototype[i],"sham",!0)},_a=Wt.charAt,Ma=function(e,t,n){return t+(n?_a(e,t).length:1)},Ia=function(e,t){var n=e.exec;if("function"==typeof n){var r=n.call(e,t);if("object"!=typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==p(e))throw TypeError("RegExp#exec called on incompatible receiver");return ta.call(e,t)};ya("match",1,(function(e,t,n){return[function(t){var n=d(this),r=null==t?void 0:t[e];return void 0!==r?r.call(t,n):new RegExp(t)[e](String(n))},function(e){var r=n(t,e,this);if(r.done)return r.value;var o=D(e),i=String(this);if(!o.global)return Ia(o,i);var a=o.unicode;o.lastIndex=0;for(var s,u=[],c=0;null!==(s=Ia(o,i));){var l=String(s[0]);u[c]=l,""===l&&(o.lastIndex=Ma(i,ce(o.lastIndex),a)),c++}return 0===c?null:u}]}));var Ca=Math.max,Ea=Math.min,Sa=Math.floor,Ta=/\$([$&'`]|\d\d?|<[^>]*>)/g,Da=/\$([$&'`]|\d\d?)/g;ya("replace",2,(function(e,t,n,r){var o=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,i=r.REPLACE_KEEPS_$0,a=o?"$":"$0";return[function(n,r){var o=d(this),i=null==n?void 0:n[e];return void 0!==i?i.call(n,o,r):t.call(String(o),n,r)},function(e,r){if(!o&&i||"string"==typeof r&&-1===r.indexOf(a)){var u=n(t,e,this,r);if(u.done)return u.value}var c=D(e),l=String(this),p="function"==typeof r;p||(r=String(r));var f=c.global;if(f){var h=c.unicode;c.lastIndex=0}for(var d=[];;){var g=Ia(c,l);if(null===g)break;if(d.push(g),!f)break;""===String(g[0])&&(c.lastIndex=Ma(l,ce(c.lastIndex),h))}for(var m,v="",y=0,_=0;_<d.length;_++){g=d[_];for(var M=String(g[0]),I=Ca(Ea(se(g.index),l.length),0),C=[],E=1;E<g.length;E++)C.push(void 0===(m=g[E])?m:String(m));var S=g.groups;if(p){var T=[M].concat(C,I,l);void 0!==S&&T.push(S);var k=String(r.apply(void 0,T))}else k=s(M,l,I,C,S,r);I>=y&&(v+=l.slice(y,I)+k,y=I+M.length)}return v+l.slice(y)}];function s(e,n,r,o,i,a){var s=r+e.length,u=o.length,c=Da;return void 0!==i&&(i=we(i),c=Ta),t.call(a,c,(function(t,a){var c;switch(a.charAt(0)){case"$":return"$";case"&":return e;case"`":return n.slice(0,r);case"'":return n.slice(s);case"<":c=i[a.slice(1,-1)];break;default:var l=+a;if(0===l)return t;if(l>u){var p=Sa(l/10);return 0===p?t:p<=u?void 0===o[p-1]?a.charAt(1):o[p-1]+a.charAt(1):t}c=o[l-1]}return void 0===c?"":c}))}}));var ka=Fe("iterator"),Aa=Fe("toStringTag"),Oa=Er.values;for(var Ra in yn){var Na=r[Ra],La=Na&&Na.prototype;if(La){if(La[ka]!==Oa)try{O(La,ka,Oa)}catch(E_){La[ka]=Oa}if(La[Aa]||O(La,Aa,Ra),yn[Ra])for(var wa in Er)if(La[wa]!==Er[wa])try{O(La,wa,Er[wa])}catch(E_){La[wa]=Er[wa]}}}var ba=Jr.trim,Pa=r.parseFloat,Ga=1/Pa(Hr+"-0")!=-Infinity?function(e){var t=ba(String(e)),n=Pa(t);return 0===n&&"-"==t.charAt(0)?-0:n}:Pa;Ne({global:!0,forced:parseFloat!=Ga},{parseFloat:Ga});var Ua,qa,xa,Fa="undefined"!=typeof wx&&"function"==typeof wx.getSystemInfoSync,Va="undefined"!=typeof qq&&"function"==typeof qq.getSystemInfoSync,Ba="undefined"!=typeof tt&&"function"==typeof tt.getSystemInfoSync,ja="undefined"!=typeof swan&&"function"==typeof swan.getSystemInfoSync,Ka="undefined"!=typeof my&&"function"==typeof my.getSystemInfoSync,Ha=Fa||Va||Ba||ja||Ka,$a="undefined"!=typeof window&&!Ha,za=Va?qq:Ba?tt:ja?swan:Ka?my:Fa?wx:{},Wa=(Ua="web",us?Ua="wechat":Va?Ua="qqmp":Ba?Ua="ttmp":ja?Ua="baidump":Ka?Ua="alipaymp":Fa&&(Ua="wxmp"),Ua),Ya=$a&&window.navigator&&window.navigator.userAgent||"",Ja=/AppleWebKit\/([\d.]+)/i.exec(Ya),Xa=(Ja&&parseFloat(Ja.pop()),/iPad/i.test(Ya)),Qa=/iPhone/i.test(Ya)&&!Xa,Za=/iPod/i.test(Ya),es=Qa||Xa||Za,ts=(function(){var e=Ya.match(/OS (\d+)_/i);e&&e[1]&&e[1]}(),/Android/i.test(Ya)),ns=function(){var e=Ya.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if(!e)return null;var t=e[1]&&parseFloat(e[1]),n=e[2]&&parseFloat(e[2]);return t&&n?parseFloat(e[1]+"."+e[2]):t||null}(),rs=(ts&&/webkit/i.test(Ya),/Firefox/i.test(Ya),/Edge/i.test(Ya)),os=!rs&&/Chrome/i.test(Ya),is=(function(){var e=Ya.match(/Chrome\/(\d+)/);e&&e[1]&&parseFloat(e[1])}(),/MSIE/.test(Ya)),as=(/MSIE\s8\.0/.test(Ya),function(){var e=/MSIE\s(\d+)\.\d/.exec(Ya),t=e&&parseFloat(e[1]);return!t&&/Trident\/7.0/i.test(Ya)&&/rv:11.0/.test(Ya)&&(t=11),t}()),ss=(/Safari/i.test(Ya),/TBS\/\d+/i.test(Ya)),us=(function(){var e=Ya.match(/TBS\/(\d+)/i);if(e&&e[1])e[1]}(),!ss&&/MQQBrowser\/\d+/i.test(Ya),!ss&&/ QQBrowser\/\d+/i.test(Ya),/(micromessenger|webbrowser)/i.test(Ya)),cs=/Windows/i.test(Ya),ls=/MAC OS X/i.test(Ya),ps=(/MicroMessenger/i.test(Ya),!o((function(){return Object.isExtensible(Object.preventExtensions({}))}))),fs=t((function(e){var t=A.f,n=B("meta"),r=0,o=Object.isExtensible||function(){return!0},i=function(e){t(e,n,{value:{objectID:"O"+ ++r,weakData:{}}})},a=e.exports={REQUIRED:!1,fastKey:function(e,t){if(!m(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!_(e,n)){if(!o(e))return"F";if(!t)return"E";i(e)}return e[n].objectID},getWeakData:function(e,t){if(!_(e,n)){if(!o(e))return!0;if(!t)return!1;i(e)}return e[n].weakData},onFreeze:function(e){return ps&&a.REQUIRED&&o(e)&&!_(e,n)&&i(e),e}};H[n]=!0})),hs=(fs.REQUIRED,fs.fastKey,fs.getWeakData,fs.onFreeze,A.f),ds=fs.fastKey,gs=ee.set,ms=ee.getterFor,vs=(function(e,t,n){var i=-1!==e.indexOf("Map"),a=-1!==e.indexOf("Weak"),s=i?"set":"add",u=r[e],c=u&&u.prototype,l=u,p={},f=function(e){var t=c[e];te(c,e,"add"==e?function(e){return t.call(this,0===e?0:e),this}:"delete"==e?function(e){return!(a&&!m(e))&&t.call(this,0===e?0:e)}:"get"==e?function(e){return a&&!m(e)?void 0:t.call(this,0===e?0:e)}:"has"==e?function(e){return!(a&&!m(e))&&t.call(this,0===e?0:e)}:function(e,n){return t.call(this,0===e?0:e,n),this})};if(Oe(e,"function"!=typeof u||!(a||c.forEach&&!o((function(){(new u).entries().next()})))))l=n.getConstructor(t,e,i,s),fs.REQUIRED=!0;else if(Oe(e,!0)){var h=new l,d=h[s](a?{}:-0,1)!=h,g=o((function(){h.has(1)})),v=Lt((function(e){new u(e)})),y=!a&&o((function(){for(var e=new u,t=5;t--;)e[s](t,t);return!e.has(-0)}));v||((l=t((function(t,n){Oo(t,l,e);var r=Kr(new u,t,l);return null!=n&&Ro(n,r[s],r,i),r}))).prototype=c,c.constructor=l),(g||y)&&(f("delete"),f("has"),i&&f("get")),(y||d)&&f(s),a&&c.clear&&delete c.clear}p[e]=l,Ne({global:!0,forced:l!=u},p),on(l,e),a||n.setStrong(l,e,i)}("Map",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),{getConstructor:function(e,t,n,r){var o=e((function(e,a){Oo(e,o,t),gs(e,{type:t,index:Bt(null),first:void 0,last:void 0,size:0}),i||(e.size=0),null!=a&&Ro(a,e[r],e,n)})),a=ms(t),s=function(e,t,n){var r,o,s=a(e),c=u(e,t);return c?c.value=n:(s.last=c={index:o=ds(t,!0),key:t,value:n,previous:r=s.last,next:void 0,removed:!1},s.first||(s.first=c),r&&(r.next=c),i?s.size++:e.size++,"F"!==o&&(s.index[o]=c)),e},u=function(e,t){var n,r=a(e),o=ds(t);if("F"!==o)return r.index[o];for(n=r.first;n;n=n.next)if(n.key==t)return n};return Do(o.prototype,{clear:function(){for(var e=a(this),t=e.index,n=e.first;n;)n.removed=!0,n.previous&&(n.previous=n.previous.next=void 0),delete t[n.index],n=n.next;e.first=e.last=void 0,i?e.size=0:this.size=0},delete:function(e){var t=a(this),n=u(this,e);if(n){var r=n.next,o=n.previous;delete t.index[n.index],n.removed=!0,o&&(o.next=r),r&&(r.previous=o),t.first==n&&(t.first=r),t.last==n&&(t.last=o),i?t.size--:this.size--}return!!n},forEach:function(e){for(var t,n=a(this),r=nt(e,arguments.length>1?arguments[1]:void 0,3);t=t?t.next:n.first;)for(r(t.value,t.key,this);t&&t.removed;)t=t.previous},has:function(e){return!!u(this,e)}}),Do(o.prototype,n?{get:function(e){var t=u(this,e);return t&&t.value},set:function(e,t){return s(this,0===e?0:e,t)}}:{add:function(e){return s(this,e=0===e?0:e,e)}}),i&&hs(o.prototype,"size",{get:function(){return a(this).size}}),o},setStrong:function(e,t,n){var r=t+" Iterator",o=ms(t),i=ms(r);dn(e,t,(function(e,t){gs(this,{type:r,target:e,state:o(e),kind:t,last:void 0})}),(function(){for(var e=i(this),t=e.kind,n=e.last;n&&n.removed;)n=n.previous;return e.target&&(e.last=n=n?n.next:e.state.first)?"keys"==t?{value:n.key,done:!1}:"values"==t?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(e.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),Ao(t)}}),"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});qa="undefined"!=typeof console?console:void 0!==vs&&vs.console?vs.console:"undefined"!=typeof window&&window.console?window.console:{};for(var ys=function(){},_s=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],Ms=_s.length;Ms--;)xa=_s[Ms],console[xa]||(qa[xa]=ys);qa.methods=_s;var Is=qa,Cs=0,Es=new Map;function Ss(){var e=new Date;return"TIM "+e.toLocaleTimeString("en-US",{hour12:!1})+"."+function(e){var t;switch(e.toString().length){case 1:t="00"+e;break;case 2:t="0"+e;break;default:t=e}return t}(e.getMilliseconds())+":"}var Ts={arguments2String:function(e){var t;if(1===e.length)t=Ss()+e[0];else{t=Ss();for(var n=0,r=e.length;n<r;n++)ws(e[n])?Ps(e[n])?t+=Vs(e[n]):t+=JSON.stringify(e[n]):t+=e[n],t+=" "}return t},debug:function(){if(Cs<=-1){var e=this.arguments2String(arguments);Is.debug(e)}},log:function(){if(Cs<=0){var e=this.arguments2String(arguments);Is.log(e)}},info:function(){if(Cs<=1){var e=this.arguments2String(arguments);Is.info(e)}},warn:function(){if(Cs<=2){var e=this.arguments2String(arguments);Is.warn(e)}},error:function(){if(Cs<=3){var e=this.arguments2String(arguments);Is.error(e)}},time:function(e){Es.set(e,xs.now())},timeEnd:function(e){if(Es.has(e)){var t=xs.now()-Es.get(e);return Es.delete(e),t}return Is.warn("未找到对应label: ".concat(e,", 请在调用 logger.timeEnd 前，调用 logger.time")),0},setLevel:function(e){e<4&&Is.log(Ss()+"set level from "+Cs+" to "+e),Cs=e}},Ds=function(e){return"file"===Gs(e)},ks=function(e){return null!==e&&("number"==typeof e&&!isNaN(e-0)||"object"===Nn(e)&&e.constructor===Number)},As=function(e){return"string"==typeof e},Os=function(e){return null!==e&&"object"===Nn(e)},Rs=function(e){if("object"!==Nn(e)||null===e)return!1;var t=Object.getPrototypeOf(e);if(null===t)return!0;for(var n=t;null!==Object.getPrototypeOf(n);)n=Object.getPrototypeOf(n);return t===n},Ns=function(e){return"function"==typeof Array.isArray?Array.isArray(e):"array"===Gs(e)},Ls=function(e){return void 0===e},ws=function(e){return Ns(e)||Os(e)},bs=function(e){return"function"==typeof e},Ps=function(e){return e instanceof Error},Gs=function(e){return Object.prototype.toString.call(e).match(/^\[object (.*)\]$/)[1].toLowerCase()},Us=function(e){if("string"!=typeof e)return!1;var t=e[0];return!/[^a-zA-Z0-9]/.test(t)},qs=0;Date.now||(Date.now=function(){return(new Date).getTime()});var xs={now:function(){0===qs&&(qs=Date.now()-1);var e=Date.now()-qs;return e>4294967295?(qs+=4294967295,Date.now()-qs):e},utc:function(){return Math.round(Date.now()/1e3)}},Fs=function e(t,n,r,o){if(!ws(t)||!ws(n))return 0;for(var i,a=0,s=Object.keys(n),u=0,c=s.length;u<c;u++)if(i=s[u],!(Ls(n[i])||r&&r.includes(i)))if(ws(t[i])&&ws(n[i]))a+=e(t[i],n[i],r,o);else{if(o&&o.includes(n[i]))continue;t[i]!==n[i]&&(t[i]=n[i],a+=1)}return a},Vs=function(e){return JSON.stringify(e,["message","code"])},Bs=function(){var e=new Date,t=e.toISOString(),n=e.getTimezoneOffset()/60,r="";return r=n<0?n>-10?"+0"+Math.abs(100*n):"+"+Math.abs(100*n):n>=10?"-"+100*n:"-0"+100*n,t.replace("Z",r)},js=function(e){if(0===e.length)return 0;for(var t=0,n=0,r="undefined"!=typeof document&&void 0!==document.characterSet?document.characterSet:"UTF-8";void 0!==e[t];)n+=e[t++].charCodeAt[t]<=255?1:!1===r?3:2;return n},Ks=function(e){var t=e||99999999;return Math.round(Math.random()*t)},Hs="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",$s=Hs.length,zs=function(e,t){for(var n in e)if(e[n]===t)return!0;return!1},Ws={},Ys=function(){if(Ha)return"https:";var e=window.location.protocol;return["http:","https:"].indexOf(e)<0&&(e="http:"),e},Js=function(e){return-1===e.indexOf("http://")||-1===e.indexOf("https://")?"https://"+e:e.replace(/https|http/,"https")};function Xs(e,t){Ns(e)&&Ns(t)?t.forEach((function(t){var n=t.key,r=t.value,o=e.find((function(e){return e.key===n}));o?o.value=r:e.push({key:n,value:r})})):Ts.warn("updateCustomField target 或 source 不是数组，忽略此次更新。")}var Qs=function(e){return e===En.GRP_WORK},Zs=function(e){return e===En.GRP_PUBLIC},eu=function(e){return e===En.GRP_MEETING},tu=function(e){return e===En.GRP_AVCHATROOM},nu=function(e){return As(e)&&e===En.CONV_SYSTEM};function ru(e,t){var n={};return Object.keys(e).forEach((function(r){n[r]=t(e[r],r)})),n}function ou(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function iu(){return"".concat(ou()+ou()).concat(ou()).concat(ou()).concat(ou()).concat(ou()).concat(ou()).concat(ou())}function au(e){var t=e.originUrl,n=void 0===t?void 0:t,r=e.originWidth,o=e.originHeight,i=e.min,a=void 0===i?198:i,s=parseInt(r),u=parseInt(o),c={url:void 0,width:0,height:0};return(s<=u?s:u)<=a?(c.url=n,c.width=s,c.height=u):(u<=s?(c.width=Math.ceil(s*a/u),c.height=a):(c.width=a,c.height=Math.ceil(u*a/s)),n&&n.indexOf("?")>=0?c.url="".concat(n,198===a?"&imageView2/3/w/198/h/198":"&imageView2/3/w/720/h/720"):c.url="".concat(n,198===a?"?imageView2/3/w/198/h/198":"?imageView2/3/w/720/h/720")),Ls(n)?Kn(c,["url"]):c}function su(e){var t=e[2];e[2]=e[1],e[1]=t;for(var n=0;n<e.length;n++)e[n].setType(n)}var uu=Object.prototype.hasOwnProperty;function cu(e){if(null==e)return!0;if("boolean"==typeof e)return!1;if("number"==typeof e)return 0===e;if("string"==typeof e)return 0===e.length;if("function"==typeof e)return 0===e.length;if(Array.isArray(e))return 0===e.length;if(e instanceof Error)return""===e.message;if(Rs(e)){for(var t in e)if(uu.call(e,t))return!1;return!0}return!("map"!==Gs(e)&&!function(e){return"set"===Gs(e)}(e)&&!Ds(e))&&0===e.size}function lu(e,t,n){if(void 0===t)return!0;var r=!0;if("object"===sr(t).toLowerCase())Object.keys(t).forEach((function(o){var i=1===e.length?e[0][o]:void 0;r=!!pu(i,t[o],n,o)&&r}));else if("array"===sr(t).toLowerCase())for(var o=0;o<t.length;o++)r=!!pu(e[o],t[o],n,t[o].name)&&r;if(r)return r;throw new Error("Params validate failed.")}function pu(e,t,n,r){if(void 0===t)return!0;var o=!0;return t.required&&cu(e)&&(Is.error("TIM [".concat(n,'] Missing required params: "').concat(r,'".')),o=!1),cu(e)||sr(e).toLowerCase()===t.type.toLowerCase()||(Is.error("TIM [".concat(n,'] Invalid params: type check failed for "').concat(r,'".Expected ').concat(t.type,".")),o=!1),t.validator&&!t.validator(e)&&(Is.error("TIM [".concat(n,"] Invalid params: custom validator check failed for params.")),o=!1),o}var fu={f:Fe},hu=A.f,du=it.forEach,gu=K("hidden"),mu=Fe("toPrimitive"),vu=ee.set,yu=ee.getterFor("Symbol"),_u=Object.prototype,Mu=r.Symbol,Iu=oe("JSON","stringify"),Cu=T.f,Eu=A.f,Su=fo.f,Tu=u.f,Du=x("symbols"),ku=x("op-symbols"),Au=x("string-to-symbol-registry"),Ou=x("symbol-to-string-registry"),Ru=x("wks"),Nu=r.QObject,Lu=!Nu||!Nu.prototype||!Nu.prototype.findChild,wu=i&&o((function(){return 7!=Bt(Eu({},"a",{get:function(){return Eu(this,"a",{value:7}).a}})).a}))?function(e,t,n){var r=Cu(_u,t);r&&delete _u[t],Eu(e,t,n),r&&e!==_u&&Eu(_u,t,r)}:Eu,bu=function(e,t){var n=Du[e]=Bt(Mu.prototype);return vu(n,{type:"Symbol",tag:e,description:t}),i||(n.description=t),n},Pu=Ge?function(e){return"symbol"==typeof e}:function(e){return Object(e)instanceof Mu},Gu=function(e,t,n){e===_u&&Gu(ku,t,n),D(e);var r=v(t,!0);return D(n),_(Du,r)?(n.enumerable?(_(e,gu)&&e[gu][r]&&(e[gu][r]=!1),n=Bt(n,{enumerable:c(0,!1)})):(_(e,gu)||Eu(e,gu,c(1,{})),e[gu][r]=!0),wu(e,r,n)):Eu(e,r,n)},Uu=function(e,t){D(e);var n=g(t),r=Pt(n).concat(Vu(n));return du(r,(function(t){i&&!qu.call(n,t)||Gu(e,t,n[t])})),e},qu=function(e){var t=v(e,!0),n=Tu.call(this,t);return!(this===_u&&_(Du,t)&&!_(ku,t))&&(!(n||!_(this,t)||!_(Du,t)||_(this,gu)&&this[gu][t])||n)},xu=function(e,t){var n=g(e),r=v(t,!0);if(n!==_u||!_(Du,r)||_(ku,r)){var o=Cu(n,r);return!o||!_(Du,r)||_(n,gu)&&n[gu][r]||(o.enumerable=!0),o}},Fu=function(e){var t=Su(g(e)),n=[];return du(t,(function(e){_(Du,e)||_(H,e)||n.push(e)})),n},Vu=function(e){var t=e===_u,n=Su(t?ku:g(e)),r=[];return du(n,(function(e){!_(Du,e)||t&&!_(_u,e)||r.push(Du[e])})),r};if(Pe||(te((Mu=function(){if(this instanceof Mu)throw TypeError("Symbol is not a constructor");var e=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,t=B(e),n=function(e){this===_u&&n.call(ku,e),_(this,gu)&&_(this[gu],t)&&(this[gu][t]=!1),wu(this,t,c(1,e))};return i&&Lu&&wu(_u,t,{configurable:!0,set:n}),bu(t,e)}).prototype,"toString",(function(){return yu(this).tag})),te(Mu,"withoutSetter",(function(e){return bu(B(e),e)})),u.f=qu,A.f=Gu,T.f=xu,_e.f=fo.f=Fu,Me.f=Vu,fu.f=function(e){return bu(Fe(e),e)},i&&(Eu(Mu.prototype,"description",{configurable:!0,get:function(){return yu(this).description}}),te(_u,"propertyIsEnumerable",qu,{unsafe:!0}))),Ne({global:!0,wrap:!0,forced:!Pe,sham:!Pe},{Symbol:Mu}),du(Pt(Ru),(function(e){!function(e){var t=ne.Symbol||(ne.Symbol={});_(t,e)||hu(t,e,{value:fu.f(e)})}(e)})),Ne({target:"Symbol",stat:!0,forced:!Pe},{for:function(e){var t=String(e);if(_(Au,t))return Au[t];var n=Mu(t);return Au[t]=n,Ou[n]=t,n},keyFor:function(e){if(!Pu(e))throw TypeError(e+" is not a symbol");if(_(Ou,e))return Ou[e]},useSetter:function(){Lu=!0},useSimple:function(){Lu=!1}}),Ne({target:"Object",stat:!0,forced:!Pe,sham:!i},{create:function(e,t){return void 0===t?Bt(e):Uu(Bt(e),t)},defineProperty:Gu,defineProperties:Uu,getOwnPropertyDescriptor:xu}),Ne({target:"Object",stat:!0,forced:!Pe},{getOwnPropertyNames:Fu,getOwnPropertySymbols:Vu}),Ne({target:"Object",stat:!0,forced:o((function(){Me.f(1)}))},{getOwnPropertySymbols:function(e){return Me.f(we(e))}}),Iu){var Bu=!Pe||o((function(){var e=Mu();return"[null]"!=Iu([e])||"{}"!=Iu({a:e})||"{}"!=Iu(Object(e))}));Ne({target:"JSON",stat:!0,forced:Bu},{stringify:function(e,t,n){for(var r,o=[e],i=1;arguments.length>i;)o.push(arguments[i++]);if(r=t,(m(t)||void 0!==e)&&!Pu(e))return Le(t)||(t=function(e,t){if("function"==typeof r&&(t=r.call(this,e,t)),!Pu(t))return t}),o[1]=t,Iu.apply(null,o)}})}Mu.prototype[mu]||O(Mu.prototype,mu,Mu.prototype.valueOf),on(Mu,"Symbol"),H[gu]=!0;var ju=A.f,Ku=r.Symbol;if(i&&"function"==typeof Ku&&(!("description"in Ku.prototype)||void 0!==Ku().description)){var Hu={},$u=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof $u?new Ku(e):void 0===e?Ku():Ku(e);return""===e&&(Hu[t]=!0),t};Ce($u,Ku);var zu=$u.prototype=Ku.prototype;zu.constructor=$u;var Wu=zu.toString,Yu="Symbol(test)"==String(Ku("test")),Ju=/^Symbol\((.*)\)[^)]+$/;ju(zu,"description",{configurable:!0,get:function(){var e=m(this)?this.valueOf():this,t=Wu.call(e);if(_(Hu,e))return"";var n=Yu?t.slice(7,-1):t.replace(Ju,"$1");return""===n?void 0:n}}),Ne({global:!0,forced:!0},{Symbol:$u})}var Xu=u.f,Qu=function(e){return function(t){for(var n,r=g(t),o=Pt(r),a=o.length,s=0,u=[];a>s;)n=o[s++],i&&!Xu.call(r,n)||u.push(e?[n,r[n]]:r[n]);return u}},Zu={entries:Qu(!0),values:Qu(!1)}.values;Ne({target:"Object",stat:!0},{values:function(e){return Zu(e)}});var ec={SUCCESS:"JoinedSuccess",WAIT_APPROVAL:"WaitAdminApproval"},tc={SUCCESS:0},nc={IS_LOGIN:1,IS_NOT_LOGIN:0},rc={UNSEND:"unSend",SUCCESS:"success",FAIL:"fail"},oc={NOT_START:"notStart",PENDING:"pengding",RESOLVED:"resolved",REJECTED:"rejected"},ic=function(){function e(t){Ln(this,e),this.type=En.MSG_TEXT,this.content={text:t.text||""}}return bn(e,[{key:"setText",value:function(e){this.content.text=e}},{key:"sendable",value:function(){return 0!==this.content.text.length}}]),e}(),ac=Object.assign,sc=Object.defineProperty,uc=!ac||o((function(){if(i&&1!==ac({b:1},ac(sc({},"a",{enumerable:!0,get:function(){sc(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var e={},t={},n=Symbol();return e[n]=7,"abcdefghijklmnopqrst".split("").forEach((function(e){t[e]=e})),7!=ac({},e)[n]||"abcdefghijklmnopqrst"!=Pt(ac({},t)).join("")}))?function(e,t){for(var n=we(e),r=arguments.length,o=1,a=Me.f,s=u.f;r>o;)for(var c,l=h(arguments[o++]),p=a?Pt(l).concat(a(l)):Pt(l),f=p.length,d=0;f>d;)c=p[d++],i&&!s.call(l,c)||(n[c]=l[c]);return n}:ac;Ne({target:"Object",stat:!0,forced:Object.assign!==uc},{assign:uc});var cc=Fe("iterator"),lc=!o((function(){var e=new URL("b?a=1&b=2&c=3","http://a"),t=e.searchParams,n="";return e.pathname="c%20d",t.forEach((function(e,r){t.delete("b"),n+=r+e})),!t.sort||"http://a/c%20d?a=1&c=3"!==e.href||"3"!==t.get("c")||"a=1"!==String(new URLSearchParams("?a=1"))||!t[cc]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash||"a1c3"!==n||"x"!==new URL("http://x",void 0).host})),pc=/[^\0-\u007E]/,fc=/[.\u3002\uFF0E\uFF61]/g,hc="Overflow: input needs wider integers to process",dc=Math.floor,gc=String.fromCharCode,mc=function(e){return e+22+75*(e<26)},vc=function(e,t,n){var r=0;for(e=n?dc(e/700):e>>1,e+=dc(e/t);e>455;r+=36)e=dc(e/35);return dc(r+36*e/(e+38))},yc=function(e){var t,n,r=[],o=(e=function(e){for(var t=[],n=0,r=e.length;n<r;){var o=e.charCodeAt(n++);if(o>=55296&&o<=56319&&n<r){var i=e.charCodeAt(n++);56320==(64512&i)?t.push(((1023&o)<<10)+(1023&i)+65536):(t.push(o),n--)}else t.push(o)}return t}(e)).length,i=128,a=0,s=72;for(t=0;t<e.length;t++)(n=e[t])<128&&r.push(gc(n));var u=r.length,c=u;for(u&&r.push("-");c<o;){var l=2147483647;for(t=0;t<e.length;t++)(n=e[t])>=i&&n<l&&(l=n);var p=c+1;if(l-i>dc((2147483647-a)/p))throw RangeError(hc);for(a+=(l-i)*p,i=l,t=0;t<e.length;t++){if((n=e[t])<i&&++a>2147483647)throw RangeError(hc);if(n==i){for(var f=a,h=36;;h+=36){var d=h<=s?1:h>=s+26?26:h-s;if(f<d)break;var g=f-d,m=36-d;r.push(gc(mc(d+g%m))),f=dc(g/m)}r.push(gc(mc(f))),s=vc(a,p,c==u),a=0,++c}}++a,++i}return r.join("")},_c=function(e){var t=Dt(e);if("function"!=typeof t)throw TypeError(String(e)+" is not iterable");return D(t.call(e))},Mc=oe("fetch"),Ic=oe("Headers"),Cc=Fe("iterator"),Ec=ee.set,Sc=ee.getterFor("URLSearchParams"),Tc=ee.getterFor("URLSearchParamsIterator"),Dc=/\+/g,kc=Array(4),Ac=function(e){return kc[e-1]||(kc[e-1]=RegExp("((?:%[\\da-f]{2}){"+e+"})","gi"))},Oc=function(e){try{return decodeURIComponent(e)}catch(E_){return e}},Rc=function(e){var t=e.replace(Dc," "),n=4;try{return decodeURIComponent(t)}catch(E_){for(;n;)t=t.replace(Ac(n--),Oc);return t}},Nc=/[!'()~]|%20/g,Lc={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"},wc=function(e){return Lc[e]},bc=function(e){return encodeURIComponent(e).replace(Nc,wc)},Pc=function(e,t){if(t)for(var n,r,o=t.split("&"),i=0;i<o.length;)(n=o[i++]).length&&(r=n.split("="),e.push({key:Rc(r.shift()),value:Rc(r.join("="))}))},Gc=function(e){this.entries.length=0,Pc(this.entries,e)},Uc=function(e,t){if(e<t)throw TypeError("Not enough arguments")},qc=un((function(e,t){Ec(this,{type:"URLSearchParamsIterator",iterator:_c(Sc(e).entries),kind:t})}),"Iterator",(function(){var e=Tc(this),t=e.kind,n=e.iterator.next(),r=n.value;return n.done||(n.value="keys"===t?r.key:"values"===t?r.value:[r.key,r.value]),n})),xc=function(){Oo(this,xc,"URLSearchParams");var e,t,n,r,o,i,a,s,u,c=arguments.length>0?arguments[0]:void 0,l=this,p=[];if(Ec(l,{type:"URLSearchParams",entries:p,updateURL:function(){},updateSearchParams:Gc}),void 0!==c)if(m(c))if("function"==typeof(e=Dt(c)))for(n=(t=e.call(c)).next;!(r=n.call(t)).done;){if((a=(i=(o=_c(D(r.value))).next).call(o)).done||(s=i.call(o)).done||!i.call(o).done)throw TypeError("Expected sequence with length 2");p.push({key:a.value+"",value:s.value+""})}else for(u in c)_(c,u)&&p.push({key:u,value:c[u]+""});else Pc(p,"string"==typeof c?"?"===c.charAt(0)?c.slice(1):c:c+"")},Fc=xc.prototype;Do(Fc,{append:function(e,t){Uc(arguments.length,2);var n=Sc(this);n.entries.push({key:e+"",value:t+""}),n.updateURL()},delete:function(e){Uc(arguments.length,1);for(var t=Sc(this),n=t.entries,r=e+"",o=0;o<n.length;)n[o].key===r?n.splice(o,1):o++;t.updateURL()},get:function(e){Uc(arguments.length,1);for(var t=Sc(this).entries,n=e+"",r=0;r<t.length;r++)if(t[r].key===n)return t[r].value;return null},getAll:function(e){Uc(arguments.length,1);for(var t=Sc(this).entries,n=e+"",r=[],o=0;o<t.length;o++)t[o].key===n&&r.push(t[o].value);return r},has:function(e){Uc(arguments.length,1);for(var t=Sc(this).entries,n=e+"",r=0;r<t.length;)if(t[r++].key===n)return!0;return!1},set:function(e,t){Uc(arguments.length,1);for(var n,r=Sc(this),o=r.entries,i=!1,a=e+"",s=t+"",u=0;u<o.length;u++)(n=o[u]).key===a&&(i?o.splice(u--,1):(i=!0,n.value=s));i||o.push({key:a,value:s}),r.updateURL()},sort:function(){var e,t,n,r=Sc(this),o=r.entries,i=o.slice();for(o.length=0,n=0;n<i.length;n++){for(e=i[n],t=0;t<n;t++)if(o[t].key>e.key){o.splice(t,0,e);break}t===n&&o.push(e)}r.updateURL()},forEach:function(e){for(var t,n=Sc(this).entries,r=nt(e,arguments.length>1?arguments[1]:void 0,3),o=0;o<n.length;)r((t=n[o++]).value,t.key,this)},keys:function(){return new qc(this,"keys")},values:function(){return new qc(this,"values")},entries:function(){return new qc(this,"entries")}},{enumerable:!0}),te(Fc,Cc,Fc.entries),te(Fc,"toString",(function(){for(var e,t=Sc(this).entries,n=[],r=0;r<t.length;)e=t[r++],n.push(bc(e.key)+"="+bc(e.value));return n.join("&")}),{enumerable:!0}),on(xc,"URLSearchParams"),Ne({global:!0,forced:!lc},{URLSearchParams:xc}),lc||"function"!=typeof Mc||"function"!=typeof Ic||Ne({global:!0,enumerable:!0,forced:!0},{fetch:function(e){var t,n,r,o=[e];return arguments.length>1&&(m(t=arguments[1])&&(n=t.body,"URLSearchParams"===St(n)&&((r=t.headers?new Ic(t.headers):new Ic).has("content-type")||r.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"),t=Bt(t,{body:c(0,String(n)),headers:c(0,r)}))),o.push(t)),Mc.apply(this,o)}});var Vc,Bc={URLSearchParams:xc,getState:Sc},jc=Wt.codeAt,Kc=r.URL,Hc=Bc.URLSearchParams,$c=Bc.getState,zc=ee.set,Wc=ee.getterFor("URL"),Yc=Math.floor,Jc=Math.pow,Xc=/[A-Za-z]/,Qc=/[\d+-.A-Za-z]/,Zc=/\d/,el=/^(0x|0X)/,tl=/^[0-7]+$/,nl=/^\d+$/,rl=/^[\dA-Fa-f]+$/,ol=/[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,il=/[\u0000\u0009\u000A\u000D #/:?@[\\]]/,al=/^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,sl=/[\u0009\u000A\u000D]/g,ul=function(e,t){var n,r,o;if("["==t.charAt(0)){if("]"!=t.charAt(t.length-1))return"Invalid host";if(!(n=ll(t.slice(1,-1))))return"Invalid host";e.host=n}else if(yl(e)){if(t=function(e){var t,n,r=[],o=e.toLowerCase().replace(fc,".").split(".");for(t=0;t<o.length;t++)n=o[t],r.push(pc.test(n)?"xn--"+yc(n):n);return r.join(".")}(t),ol.test(t))return"Invalid host";if(null===(n=cl(t)))return"Invalid host";e.host=n}else{if(il.test(t))return"Invalid host";for(n="",r=kt(t),o=0;o<r.length;o++)n+=ml(r[o],fl);e.host=n}},cl=function(e){var t,n,r,o,i,a,s,u=e.split(".");if(u.length&&""==u[u.length-1]&&u.pop(),(t=u.length)>4)return e;for(n=[],r=0;r<t;r++){if(""==(o=u[r]))return e;if(i=10,o.length>1&&"0"==o.charAt(0)&&(i=el.test(o)?16:8,o=o.slice(8==i?1:2)),""===o)a=0;else{if(!(10==i?nl:8==i?tl:rl).test(o))return e;a=parseInt(o,i)}n.push(a)}for(r=0;r<t;r++)if(a=n[r],r==t-1){if(a>=Jc(256,5-t))return null}else if(a>255)return null;for(s=n.pop(),r=0;r<n.length;r++)s+=n[r]*Jc(256,3-r);return s},ll=function(e){var t,n,r,o,i,a,s,u=[0,0,0,0,0,0,0,0],c=0,l=null,p=0,f=function(){return e.charAt(p)};if(":"==f()){if(":"!=e.charAt(1))return;p+=2,l=++c}for(;f();){if(8==c)return;if(":"!=f()){for(t=n=0;n<4&&rl.test(f());)t=16*t+parseInt(f(),16),p++,n++;if("."==f()){if(0==n)return;if(p-=n,c>6)return;for(r=0;f();){if(o=null,r>0){if(!("."==f()&&r<4))return;p++}if(!Zc.test(f()))return;for(;Zc.test(f());){if(i=parseInt(f(),10),null===o)o=i;else{if(0==o)return;o=10*o+i}if(o>255)return;p++}u[c]=256*u[c]+o,2!=++r&&4!=r||c++}if(4!=r)return;break}if(":"==f()){if(p++,!f())return}else if(f())return;u[c++]=t}else{if(null!==l)return;p++,l=++c}}if(null!==l)for(a=c-l,c=7;0!=c&&a>0;)s=u[c],u[c--]=u[l+a-1],u[l+--a]=s;else if(8!=c)return;return u},pl=function(e){var t,n,r,o;if("number"==typeof e){for(t=[],n=0;n<4;n++)t.unshift(e%256),e=Yc(e/256);return t.join(".")}if("object"==typeof e){for(t="",r=function(e){for(var t=null,n=1,r=null,o=0,i=0;i<8;i++)0!==e[i]?(o>n&&(t=r,n=o),r=null,o=0):(null===r&&(r=i),++o);return o>n&&(t=r,n=o),t}(e),n=0;n<8;n++)o&&0===e[n]||(o&&(o=!1),r===n?(t+=n?":":"::",o=!0):(t+=e[n].toString(16),n<7&&(t+=":")));return"["+t+"]"}return e},fl={},hl=uc({},fl,{" ":1,'"':1,"<":1,">":1,"`":1}),dl=uc({},hl,{"#":1,"?":1,"{":1,"}":1}),gl=uc({},dl,{"/":1,":":1,";":1,"=":1,"@":1,"[":1,"\\":1,"]":1,"^":1,"|":1}),ml=function(e,t){var n=jc(e,0);return n>32&&n<127&&!_(t,e)?e:encodeURIComponent(e)},vl={ftp:21,file:null,http:80,https:443,ws:80,wss:443},yl=function(e){return _(vl,e.scheme)},_l=function(e){return""!=e.username||""!=e.password},Ml=function(e){return!e.host||e.cannotBeABaseURL||"file"==e.scheme},Il=function(e,t){var n;return 2==e.length&&Xc.test(e.charAt(0))&&(":"==(n=e.charAt(1))||!t&&"|"==n)},Cl=function(e){var t;return e.length>1&&Il(e.slice(0,2))&&(2==e.length||"/"===(t=e.charAt(2))||"\\"===t||"?"===t||"#"===t)},El=function(e){var t=e.path,n=t.length;!n||"file"==e.scheme&&1==n&&Il(t[0],!0)||t.pop()},Sl=function(e){return"."===e||"%2e"===e.toLowerCase()},Tl={},Dl={},kl={},Al={},Ol={},Rl={},Nl={},Ll={},wl={},bl={},Pl={},Gl={},Ul={},ql={},xl={},Fl={},Vl={},Bl={},jl={},Kl={},Hl={},$l=function(e,t,n,r){var o,i,a,s,u,c=n||Tl,l=0,p="",f=!1,h=!1,d=!1;for(n||(e.scheme="",e.username="",e.password="",e.host=null,e.port=null,e.path=[],e.query=null,e.fragment=null,e.cannotBeABaseURL=!1,t=t.replace(al,"")),t=t.replace(sl,""),o=kt(t);l<=o.length;){switch(i=o[l],c){case Tl:if(!i||!Xc.test(i)){if(n)return"Invalid scheme";c=kl;continue}p+=i.toLowerCase(),c=Dl;break;case Dl:if(i&&(Qc.test(i)||"+"==i||"-"==i||"."==i))p+=i.toLowerCase();else{if(":"!=i){if(n)return"Invalid scheme";p="",c=kl,l=0;continue}if(n&&(yl(e)!=_(vl,p)||"file"==p&&(_l(e)||null!==e.port)||"file"==e.scheme&&!e.host))return;if(e.scheme=p,n)return void(yl(e)&&vl[e.scheme]==e.port&&(e.port=null));p="","file"==e.scheme?c=ql:yl(e)&&r&&r.scheme==e.scheme?c=Al:yl(e)?c=Ll:"/"==o[l+1]?(c=Ol,l++):(e.cannotBeABaseURL=!0,e.path.push(""),c=jl)}break;case kl:if(!r||r.cannotBeABaseURL&&"#"!=i)return"Invalid scheme";if(r.cannotBeABaseURL&&"#"==i){e.scheme=r.scheme,e.path=r.path.slice(),e.query=r.query,e.fragment="",e.cannotBeABaseURL=!0,c=Hl;break}c="file"==r.scheme?ql:Rl;continue;case Al:if("/"!=i||"/"!=o[l+1]){c=Rl;continue}c=wl,l++;break;case Ol:if("/"==i){c=bl;break}c=Bl;continue;case Rl:if(e.scheme=r.scheme,i==Vc)e.username=r.username,e.password=r.password,e.host=r.host,e.port=r.port,e.path=r.path.slice(),e.query=r.query;else if("/"==i||"\\"==i&&yl(e))c=Nl;else if("?"==i)e.username=r.username,e.password=r.password,e.host=r.host,e.port=r.port,e.path=r.path.slice(),e.query="",c=Kl;else{if("#"!=i){e.username=r.username,e.password=r.password,e.host=r.host,e.port=r.port,e.path=r.path.slice(),e.path.pop(),c=Bl;continue}e.username=r.username,e.password=r.password,e.host=r.host,e.port=r.port,e.path=r.path.slice(),e.query=r.query,e.fragment="",c=Hl}break;case Nl:if(!yl(e)||"/"!=i&&"\\"!=i){if("/"!=i){e.username=r.username,e.password=r.password,e.host=r.host,e.port=r.port,c=Bl;continue}c=bl}else c=wl;break;case Ll:if(c=wl,"/"!=i||"/"!=p.charAt(l+1))continue;l++;break;case wl:if("/"!=i&&"\\"!=i){c=bl;continue}break;case bl:if("@"==i){f&&(p="%40"+p),f=!0,a=kt(p);for(var g=0;g<a.length;g++){var m=a[g];if(":"!=m||d){var v=ml(m,gl);d?e.password+=v:e.username+=v}else d=!0}p=""}else if(i==Vc||"/"==i||"?"==i||"#"==i||"\\"==i&&yl(e)){if(f&&""==p)return"Invalid authority";l-=kt(p).length+1,p="",c=Pl}else p+=i;break;case Pl:case Gl:if(n&&"file"==e.scheme){c=Fl;continue}if(":"!=i||h){if(i==Vc||"/"==i||"?"==i||"#"==i||"\\"==i&&yl(e)){if(yl(e)&&""==p)return"Invalid host";if(n&&""==p&&(_l(e)||null!==e.port))return;if(s=ul(e,p))return s;if(p="",c=Vl,n)return;continue}"["==i?h=!0:"]"==i&&(h=!1),p+=i}else{if(""==p)return"Invalid host";if(s=ul(e,p))return s;if(p="",c=Ul,n==Gl)return}break;case Ul:if(!Zc.test(i)){if(i==Vc||"/"==i||"?"==i||"#"==i||"\\"==i&&yl(e)||n){if(""!=p){var y=parseInt(p,10);if(y>65535)return"Invalid port";e.port=yl(e)&&y===vl[e.scheme]?null:y,p=""}if(n)return;c=Vl;continue}return"Invalid port"}p+=i;break;case ql:if(e.scheme="file","/"==i||"\\"==i)c=xl;else{if(!r||"file"!=r.scheme){c=Bl;continue}if(i==Vc)e.host=r.host,e.path=r.path.slice(),e.query=r.query;else if("?"==i)e.host=r.host,e.path=r.path.slice(),e.query="",c=Kl;else{if("#"!=i){Cl(o.slice(l).join(""))||(e.host=r.host,e.path=r.path.slice(),El(e)),c=Bl;continue}e.host=r.host,e.path=r.path.slice(),e.query=r.query,e.fragment="",c=Hl}}break;case xl:if("/"==i||"\\"==i){c=Fl;break}r&&"file"==r.scheme&&!Cl(o.slice(l).join(""))&&(Il(r.path[0],!0)?e.path.push(r.path[0]):e.host=r.host),c=Bl;continue;case Fl:if(i==Vc||"/"==i||"\\"==i||"?"==i||"#"==i){if(!n&&Il(p))c=Bl;else if(""==p){if(e.host="",n)return;c=Vl}else{if(s=ul(e,p))return s;if("localhost"==e.host&&(e.host=""),n)return;p="",c=Vl}continue}p+=i;break;case Vl:if(yl(e)){if(c=Bl,"/"!=i&&"\\"!=i)continue}else if(n||"?"!=i)if(n||"#"!=i){if(i!=Vc&&(c=Bl,"/"!=i))continue}else e.fragment="",c=Hl;else e.query="",c=Kl;break;case Bl:if(i==Vc||"/"==i||"\\"==i&&yl(e)||!n&&("?"==i||"#"==i)){if(".."===(u=(u=p).toLowerCase())||"%2e."===u||".%2e"===u||"%2e%2e"===u?(El(e),"/"==i||"\\"==i&&yl(e)||e.path.push("")):Sl(p)?"/"==i||"\\"==i&&yl(e)||e.path.push(""):("file"==e.scheme&&!e.path.length&&Il(p)&&(e.host&&(e.host=""),p=p.charAt(0)+":"),e.path.push(p)),p="","file"==e.scheme&&(i==Vc||"?"==i||"#"==i))for(;e.path.length>1&&""===e.path[0];)e.path.shift();"?"==i?(e.query="",c=Kl):"#"==i&&(e.fragment="",c=Hl)}else p+=ml(i,dl);break;case jl:"?"==i?(e.query="",c=Kl):"#"==i?(e.fragment="",c=Hl):i!=Vc&&(e.path[0]+=ml(i,fl));break;case Kl:n||"#"!=i?i!=Vc&&("'"==i&&yl(e)?e.query+="%27":e.query+="#"==i?"%23":ml(i,fl)):(e.fragment="",c=Hl);break;case Hl:i!=Vc&&(e.fragment+=ml(i,hl))}l++}},zl=function(e){var t,n,r=Oo(this,zl,"URL"),o=arguments.length>1?arguments[1]:void 0,a=String(e),s=zc(r,{type:"URL"});if(void 0!==o)if(o instanceof zl)t=Wc(o);else if(n=$l(t={},String(o)))throw TypeError(n);if(n=$l(s,a,null,t))throw TypeError(n);var u=s.searchParams=new Hc,c=$c(u);c.updateSearchParams(s.query),c.updateURL=function(){s.query=String(u)||null},i||(r.href=Yl.call(r),r.origin=Jl.call(r),r.protocol=Xl.call(r),r.username=Ql.call(r),r.password=Zl.call(r),r.host=ep.call(r),r.hostname=tp.call(r),r.port=np.call(r),r.pathname=rp.call(r),r.search=op.call(r),r.searchParams=ip.call(r),r.hash=ap.call(r))},Wl=zl.prototype,Yl=function(){var e=Wc(this),t=e.scheme,n=e.username,r=e.password,o=e.host,i=e.port,a=e.path,s=e.query,u=e.fragment,c=t+":";return null!==o?(c+="//",_l(e)&&(c+=n+(r?":"+r:"")+"@"),c+=pl(o),null!==i&&(c+=":"+i)):"file"==t&&(c+="//"),c+=e.cannotBeABaseURL?a[0]:a.length?"/"+a.join("/"):"",null!==s&&(c+="?"+s),null!==u&&(c+="#"+u),c},Jl=function(){var e=Wc(this),t=e.scheme,n=e.port;if("blob"==t)try{return new URL(t.path[0]).origin}catch(E_){return"null"}return"file"!=t&&yl(e)?t+"://"+pl(e.host)+(null!==n?":"+n:""):"null"},Xl=function(){return Wc(this).scheme+":"},Ql=function(){return Wc(this).username},Zl=function(){return Wc(this).password},ep=function(){var e=Wc(this),t=e.host,n=e.port;return null===t?"":null===n?pl(t):pl(t)+":"+n},tp=function(){var e=Wc(this).host;return null===e?"":pl(e)},np=function(){var e=Wc(this).port;return null===e?"":String(e)},rp=function(){var e=Wc(this),t=e.path;return e.cannotBeABaseURL?t[0]:t.length?"/"+t.join("/"):""},op=function(){var e=Wc(this).query;return e?"?"+e:""},ip=function(){return Wc(this).searchParams},ap=function(){var e=Wc(this).fragment;return e?"#"+e:""},sp=function(e,t){return{get:e,set:t,configurable:!0,enumerable:!0}};if(i&&Gt(Wl,{href:sp(Yl,(function(e){var t=Wc(this),n=String(e),r=$l(t,n);if(r)throw TypeError(r);$c(t.searchParams).updateSearchParams(t.query)})),origin:sp(Jl),protocol:sp(Xl,(function(e){var t=Wc(this);$l(t,String(e)+":",Tl)})),username:sp(Ql,(function(e){var t=Wc(this),n=kt(String(e));if(!Ml(t)){t.username="";for(var r=0;r<n.length;r++)t.username+=ml(n[r],gl)}})),password:sp(Zl,(function(e){var t=Wc(this),n=kt(String(e));if(!Ml(t)){t.password="";for(var r=0;r<n.length;r++)t.password+=ml(n[r],gl)}})),host:sp(ep,(function(e){var t=Wc(this);t.cannotBeABaseURL||$l(t,String(e),Pl)})),hostname:sp(tp,(function(e){var t=Wc(this);t.cannotBeABaseURL||$l(t,String(e),Gl)})),port:sp(np,(function(e){var t=Wc(this);Ml(t)||(""==(e=String(e))?t.port=null:$l(t,e,Ul))})),pathname:sp(rp,(function(e){var t=Wc(this);t.cannotBeABaseURL||(t.path=[],$l(t,e+"",Vl))})),search:sp(op,(function(e){var t=Wc(this);""==(e=String(e))?t.query=null:("?"==e.charAt(0)&&(e=e.slice(1)),t.query="",$l(t,e,Kl)),$c(t.searchParams).updateSearchParams(t.query)})),searchParams:sp(ip),hash:sp(ap,(function(e){var t=Wc(this);""!=(e=String(e))?("#"==e.charAt(0)&&(e=e.slice(1)),t.fragment="",$l(t,e,Hl)):t.fragment=null}))}),te(Wl,"toJSON",(function(){return Yl.call(this)}),{enumerable:!0}),te(Wl,"toString",(function(){return Yl.call(this)}),{enumerable:!0}),Kc){var up=Kc.createObjectURL,cp=Kc.revokeObjectURL;up&&te(zl,"createObjectURL",(function(e){return up.apply(Kc,arguments)})),cp&&te(zl,"revokeObjectURL",(function(e){return cp.apply(Kc,arguments)}))}on(zl,"URL"),Ne({global:!0,forced:!lc,sham:!i},{URL:zl});var lp={JSON:{TYPE:{C2C:{NOTICE:1,COMMON:9,EVENT:10},GROUP:{COMMON:3,TIP:4,SYSTEM:5,TIP2:6},FRIEND:{NOTICE:7},PROFILE:{NOTICE:8}},SUBTYPE:{C2C:{COMMON:0,READED:92,KICKEDOUT:96},GROUP:{COMMON:0,LOVEMESSAGE:1,TIP:2,REDPACKET:3}},OPTIONS:{GROUP:{JOIN:1,QUIT:2,KICK:3,SET_ADMIN:4,CANCEL_ADMIN:5,MODIFY_GROUP_INFO:6,MODIFY_MEMBER_INFO:7}}},PROTOBUF:{},IMAGE_TYPES:{ORIGIN:1,LARGE:2,SMALL:3},IMAGE_FORMAT:{JPG:1,JPEG:1,GIF:2,PNG:3,BMP:4,UNKNOWN:255}},pp=1,fp=2,hp=3,dp=4,gp=5,mp=7,vp=8,yp=9,_p=10,Mp=15,Ip=255,Cp=2,Ep=0,Sp=1,Tp={NICK:"Tag_Profile_IM_Nick",GENDER:"Tag_Profile_IM_Gender",BIRTHDAY:"Tag_Profile_IM_BirthDay",LOCATION:"Tag_Profile_IM_Location",SELFSIGNATURE:"Tag_Profile_IM_SelfSignature",ALLOWTYPE:"Tag_Profile_IM_AllowType",LANGUAGE:"Tag_Profile_IM_Language",AVATAR:"Tag_Profile_IM_Image",MESSAGESETTINGS:"Tag_Profile_IM_MsgSettings",ADMINFORBIDTYPE:"Tag_Profile_IM_AdminForbidType",LEVEL:"Tag_Profile_IM_Level",ROLE:"Tag_Profile_IM_Role"},Dp={UNKNOWN:"Gender_Type_Unknown",FEMALE:"Gender_Type_Female",MALE:"Gender_Type_Male"},kp={NONE:"AdminForbid_Type_None",SEND_OUT:"AdminForbid_Type_SendOut"},Ap={NEED_CONFIRM:"AllowType_Type_NeedConfirm",ALLOW_ANY:"AllowType_Type_AllowAny",DENY_ANY:"AllowType_Type_DenyAny"},Op=function(){function e(t){Ln(this,e),this._imageMemoryURL="",this._file=t.file,Ha?this.createImageDataASURLInWXMiniApp(t.file):this.createImageDataASURLInWeb(t.file),this._initImageInfoModel(),this.type=En.MSG_IMAGE,this._percent=0,this.content={imageFormat:t.imageFormat||lp.IMAGE_FORMAT.UNKNOWN,uuid:t.uuid,imageInfoArray:[]},this.initImageInfoArray(t.imageInfoArray),this._defaultImage="http://imgcache.qq.com/open/qcloud/video/act/webim-images/default.jpg",this._autoFixUrl()}return bn(e,[{key:"_initImageInfoModel",value:function(){var e=this;this._ImageInfoModel=function(t){this.instanceID=Ks(9999999),this.sizeType=t.type||0,this.type=0,this.size=t.size||0,this.width=t.width||0,this.height=t.height||0,this.imageUrl=t.url||"",this.url=t.url||e._imageMemoryURL||e._defaultImage},this._ImageInfoModel.prototype={setSizeType:function(e){this.sizeType=e},setType:function(e){this.type=e},setImageUrl:function(e){e&&(this.imageUrl=e)},getImageUrl:function(){return this.imageUrl}}}},{key:"initImageInfoArray",value:function(e){for(var t=0,n=null,r=null;t<=2;)r=Ls(e)||Ls(e[t])?{type:0,size:0,width:0,height:0,url:""}:e[t],(n=new this._ImageInfoModel(r)).setSizeType(t+1),n.setType(t),this.addImageInfo(n),t++;this.updateAccessSideImageInfoArray()}},{key:"updateImageInfoArray",value:function(e){for(var t,n=this.content.imageInfoArray.length,r=0;r<n;r++)t=this.content.imageInfoArray[r],e[r].size&&(t.size=e[r].size),e[r].url&&t.setImageUrl(e[r].url),e[r].width&&(t.width=e[r].width),e[r].height&&(t.height=e[r].height)}},{key:"_autoFixUrl",value:function(){for(var e=this.content.imageInfoArray.length,t="",n="",r=["http","https"],o=null,i=0;i<e;i++)this.content.imageInfoArray[i].url&&""!==(o=this.content.imageInfoArray[i]).imageUrl&&(n=o.imageUrl.slice(0,o.imageUrl.indexOf("://")+1),t=o.imageUrl.slice(o.imageUrl.indexOf("://")+1),r.indexOf(n)<0&&(n="https:"),this.content.imageInfoArray[i].setImageUrl([n,t].join("")))}},{key:"updatePercent",value:function(e){this._percent=e,this._percent>1&&(this._percent=1)}},{key:"updateImageFormat",value:function(e){this.content.imageFormat=lp.IMAGE_FORMAT[e.toUpperCase()]||lp.IMAGE_FORMAT.UNKNOWN}},{key:"createImageDataASURLInWeb",value:function(e){void 0!==e&&e.files.length>0&&(this._imageMemoryURL=window.URL.createObjectURL(e.files[0]))}},{key:"createImageDataASURLInWXMiniApp",value:function(e){e&&e.url&&(this._imageMemoryURL=e.url)}},{key:"replaceImageInfo",value:function(e,t){this.content.imageInfoArray[t]instanceof this._ImageInfoModel||(this.content.imageInfoArray[t]=e)}},{key:"addImageInfo",value:function(e){this.content.imageInfoArray.length>=3||this.content.imageInfoArray.push(e)}},{key:"updateAccessSideImageInfoArray",value:function(){var e=this.content.imageInfoArray,t=e[0],n=t.width,r=void 0===n?0:n,o=t.height,i=void 0===o?0:o;0!==r&&0!==i&&(su(e),Object.assign(e[2],au({originWidth:r,originHeight:i,min:720})))}},{key:"sendable",value:function(){return 0!==this.content.imageInfoArray.length&&(""!==this.content.imageInfoArray[0].imageUrl&&0!==this.content.imageInfoArray[0].size)}}]),e}(),Rp=function(){function e(t){Ln(this,e),this.type=En.MSG_FACE,this.content=t||null}return bn(e,[{key:"sendable",value:function(){return null!==this.content}}]),e}(),Np=function(){function e(t){Ln(this,e),this.type=En.MSG_AUDIO,this._percent=0,this.content={downloadFlag:2,second:t.second,size:t.size,url:t.url,remoteAudioUrl:t.url||"",uuid:t.uuid}}return bn(e,[{key:"updatePercent",value:function(e){this._percent=e,this._percent>1&&(this._percent=1)}},{key:"updateAudioUrl",value:function(e){this.content.remoteAudioUrl=e}},{key:"sendable",value:function(){return""!==this.content.remoteAudioUrl}}]),e}();Ne({target:"Object",stat:!0,forced:!i,sham:!i},{defineProperty:A.f});var Lp={from:!0,groupID:!0,groupName:!0,to:!0},wp=function(){function e(t){Ln(this,e),this.type=En.MSG_GRP_TIP,this.content={},this._initContent(t)}return bn(e,[{key:"_initContent",value:function(e){var t=this;Object.keys(e).forEach((function(n){switch(n){case"remarkInfo":break;case"groupProfile":t.content.groupProfile={},t._initGroupProfile(e[n]);break;case"operatorInfo":case"memberInfoList":break;case"msgMemberInfo":t.content.memberList=e[n],Object.defineProperty(t.content,"msgMemberInfo",{get:function(){return Ts.warn("!!! 禁言的群提示消息中的 payload.msgMemberInfo 属性即将废弃，请使用 payload.memberList 属性替代。 \n","msgMemberInfo 中的 shutupTime 属性对应更改为 memberList 中的 muteTime 属性，表示禁言时长。 \n","参考：群提示消息 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/Message.html#.GroupTipPayload"),t.content.memberList.map((function(e){return{userID:e.userID,shutupTime:e.muteTime}}))}});break;case"onlineMemberInfo":break;case"memberNum":t.content[n]=e[n],t.content.memberCount=e[n];break;default:t.content[n]=e[n]}})),this.content.userIDList||(this.content.userIDList=[this.content.operatorID])}},{key:"_initGroupProfile",value:function(e){for(var t=Object.keys(e),n=0;n<t.length;n++){var r=t[n];Lp[r]&&(this.content.groupProfile[r]=e[r])}}}]),e}(),bp={from:!0,groupID:!0,name:!0,to:!0},Pp=function(){function e(t){Ln(this,e),this.type=En.MSG_GRP_SYS_NOTICE,this.content={},this._initContent(t)}return bn(e,[{key:"_initContent",value:function(e){var t=this;Object.keys(e).forEach((function(n){switch(n){case"memberInfoList":break;case"remarkInfo":t.content.handleMessage=e[n];break;case"groupProfile":t.content.groupProfile={},t._initGroupProfile(e[n]);break;default:t.content[n]=e[n]}}))}},{key:"_initGroupProfile",value:function(e){for(var t=Object.keys(e),n=0;n<t.length;n++){var r=t[n];bp[r]&&(this.content.groupProfile[r]=e[r])}}}]),e}(),Gp=Math.min,Up=[].lastIndexOf,qp=!!Up&&1/[1].lastIndexOf(1,-0)<0,xp=at("lastIndexOf"),Fp=lt("indexOf",{ACCESSORS:!0,1:0}),Vp=qp||!xp||!Fp?function(e){if(qp)return Up.apply(this,arguments)||0;var t=g(this),n=ce(t.length),r=n-1;for(arguments.length>1&&(r=Gp(r,se(arguments[1]))),r<0&&(r=n+r);r>=0;r--)if(r in t&&t[r]===e)return r||0;return-1}:Up;Ne({target:"Array",proto:!0,forced:Vp!==[].lastIndexOf},{lastIndexOf:Vp});var Bp,jp="https://cloud.tencent.com/document/product/",Kp="您可以在即时通信 IM 控制台的【开发辅助工具(https://console.cloud.tencent.com/im-detail/tool-usersig)】页面校验 UserSig。",Hp="UserSig 非法，请使用官网提供的 API 重新生成 UserSig(".concat(jp,"269/32688)。"),$p={70001:"UserSig 已过期，请重新生成。建议 UserSig 有效期设置不小于24小时。",70002:"UserSig 长度为0，请检查传入的 UserSig 是否正确。",70003:Hp,70005:Hp,70009:"UserSig 验证失败，可能因为生成 UserSig 时混用了其他 SDKAppID 的私钥或密钥导致，请使用对应 SDKAppID 下的私钥或密钥重新生成 UserSig(".concat(jp,"269/32688)。"),70013:"请求中的 UserID 与生成 UserSig 时使用的 UserID 不匹配。".concat(Kp),70014:"请求中的 SDKAppID 与生成 UserSig 时使用的 SDKAppID 不匹配。".concat(Kp),70016:"密钥不存在，UserSig 验证失败，请在即时通信 IM 控制台获取密钥(".concat(jp,"269/32578#.E8.8E.B7.E5.8F.96.E5.AF.86.E9.92.A5)。"),70020:"SDKAppID 未找到，请在即时通信 IM 控制台确认应用信息。",70050:"UserSig 验证次数过于频繁。请检查 UserSig 是否正确，并于1分钟后重新验证。".concat(Kp),70051:"帐号被拉入黑名单。",70052:"UserSig 已经失效，请重新生成，再次尝试。",70107:"因安全原因被限制登录，请不要频繁登录。",70169:"请求的用户帐号不存在。",70114:"".concat("服务端内部超时，请稍后重试。"),70202:"".concat("服务端内部超时，请稍后重试。"),70206:"请求中批量数量不合法。",70402:"参数非法，请检查必填字段是否填充，或者字段的填充是否满足协议要求。",70403:"请求失败，需要 App 管理员权限。",70398:"帐号数超限。如需创建多于100个帐号，请将应用升级为专业版，具体操作指引请参见购买指引(".concat(jp,"269/32458)。"),70500:"".concat("服务端内部错误，请重试。"),71e3:"删除帐号失败。仅支持删除体验版帐号，您当前应用为专业版，暂不支持帐号删除。",20001:"请求包非法。",20002:"UserSig 或 A2 失效。",20003:"消息发送方或接收方 UserID 无效或不存在，请检查 UserID 是否已导入即时通信 IM。",20004:"网络异常，请重试。",20005:"".concat("服务端内部错误，请重试。"),20006:"触发发送".concat("单聊消息","之前回调，App 后台返回禁止下发该消息。"),20007:"发送".concat("单聊消息","，被对方拉黑，禁止发送。消息发送状态默认展示为失败，您可以登录控制台修改该场景下的消息发送状态展示结果，具体操作请参见消息保留设置(").concat(jp,"269/38656)。"),20009:"消息发送双方互相不是好友，禁止发送（配置".concat("单聊消息","校验好友关系才会出现）。"),20010:"发送".concat("单聊消息","，自己不是对方的好友（单向关系），禁止发送。"),20011:"发送".concat("单聊消息","，对方不是自己的好友（单向关系），禁止发送。"),20012:"发送方被禁言，该条消息被禁止发送。",20016:"消息撤回超过了时间限制（默认2分钟）。",20018:"删除漫游内部错误。",90001:"JSON 格式解析失败，请检查请求包是否符合 JSON 规范。",90002:"".concat("JSON 格式请求包体","中 MsgBody 不符合消息格式描述，或者 MsgBody 不是 Array 类型，请参考 TIMMsgElement 对象的定义(").concat(jp,"269/2720#.E6.B6.88.E6.81.AF.E5.85.83.E7.B4.A0-timmsgelement)。"),90003:"".concat("JSON 格式请求包体","中缺少 To_Account 字段或者 To_Account 帐号不存在。"),90005:"".concat("JSON 格式请求包体","中缺少 MsgRandom 字段或者 MsgRandom 字段不是 Integer 类型。"),90006:"".concat("JSON 格式请求包体","中缺少 MsgTimeStamp 字段或者 MsgTimeStamp 字段不是 Integer 类型。"),90007:"".concat("JSON 格式请求包体","中 MsgBody 类型不是 Array 类型，请将其修改为 Array 类型。"),90008:"".concat("JSON 格式请求包体","中缺少 From_Account 字段或者 From_Account 帐号不存在。"),90009:"请求需要 App 管理员权限。",90010:"".concat("JSON 格式请求包体","不符合消息格式描述，请参考 TIMMsgElement 对象的定义(").concat(jp,"269/2720#.E6.B6.88.E6.81.AF.E5.85.83.E7.B4.A0-timmsgelement)。"),90011:"批量发消息目标帐号超过500，请减少 To_Account 中目标帐号数量。",90012:"To_Account 没有注册或不存在，请确认 To_Account 是否导入即时通信 IM 或者是否拼写错误。",90026:"消息离线存储时间错误（最多不能超过7天）。",90031:"".concat("JSON 格式请求包体","中 SyncOtherMachine 字段不是 Integer 类型。"),90044:"".concat("JSON 格式请求包体","中 MsgLifeTime 字段不是 Integer 类型。"),90048:"请求的用户帐号不存在。",90054:"撤回请求中的 MsgKey 不合法。",90994:"".concat("服务端内部错误，请重试。"),90995:"".concat("服务端内部错误，请重试。"),91e3:"".concat("服务端内部错误，请重试。"),90992:"".concat("服务端内部错误，请重试。","如果所有请求都返回该错误码，且 App 配置了第三方回调，请检查 App 服务端是否正常向即时通信 IM 后台服务端返回回调结果。"),93e3:"JSON 数据包超长，消息包体请不要超过8k。",91101:"Web 端长轮询被踢（Web 端同时在线实例个数超出限制）。",10002:"".concat("服务端内部错误，请重试。"),10003:"请求中的接口名称错误，请核对接口名称并重试。",10004:"参数非法，请根据错误描述检查请求是否正确。",10005:"请求包体中携带的帐号数量过多。",10006:"操作频率限制，请尝试降低调用的频率。",10007:"操作权限不足，例如 Work ".concat("群组","中普通成员尝试执行踢人操作，但只有 App 管理员才有权限。"),10008:"请求非法，可能是请求中携带的签名信息验证不正确，请再次尝试。",10009:"该群不允许群主主动退出。",10010:"".concat("群组","不存在，或者曾经存在过，但是目前已经被解散。"),10011:"解析 JSON 包体失败，请检查包体的格式是否符合 JSON 格式。",10012:"发起操作的 UserID 非法，请检查发起操作的用户 UserID 是否填写正确。",10013:"被邀请加入的用户已经是群成员。",10014:"群已满员，无法将请求中的用户加入".concat("群组","，如果是批量加人，可以尝试减少加入用户的数量。"),10015:"找不到指定 ID 的".concat("群组","。"),10016:"App 后台通过第三方回调拒绝本次操作。",10017:"因被禁言而不能发送消息，请检查发送者是否被设置禁言。",10018:"应答包长度超过最大包长（1MB），请求的内容过多，请尝试减少单次请求的数据量。",10019:"请求的用户帐号不存在。",10021:"".concat("群组"," ID 已被使用，请选择其他的").concat("群组"," ID。"),10023:"发消息的频率超限，请延长两次发消息时间的间隔。",10024:"此邀请或者申请请求已经被处理。",10025:"".concat("群组"," ID 已被使用，并且操作者为群主，可以直接使用。"),10026:"该 SDKAppID 请求的命令字已被禁用。",10030:"请求撤回的消息不存在。",10031:"消息撤回超过了时间限制（默认2分钟）。",10032:"请求撤回的消息不支持撤回操作。",10033:"".concat("群组","类型不支持消息撤回操作。"),10034:"该消息类型不支持删除操作。",10035:"直播群和在线成员广播大群不支持删除消息。",10036:"直播群创建数量超过了限制，请参考价格说明(".concat(jp,"269/11673)购买预付费套餐“IM直播群”。"),10037:"单个用户可创建和加入的".concat("群组","数量超过了限制，请参考价格说明(").concat(jp,"269/11673)购买或升级预付费套餐“单人可创建与加入").concat("群组","数”。"),10038:"群成员数量超过限制，请参考价格说明(".concat(jp,"269/11673)购买或升级预付费套餐“扩展群人数上限”。"),10041:"该应用（SDKAppID）已配置不支持群消息撤回。"},zp=function(e){qn(n,e);var t=zn(n);function n(e){var r;return Ln(this,n),(r=t.call(this)).code=e.code,r.message=$p[e.code]||e.message,r.data=e.data||{},r}return n}(jn(Error)),Wp={NO_SDKAPPID:2e3,NO_ACCOUNT_TYPE:2001,NO_IDENTIFIER:2002,NO_USERSIG:2003,NO_TINYID:2022,NO_A2KEY:2023,USER_NOT_LOGGED_IN:2024,COS_UNDETECTED:2040,COS_GET_SIG_FAIL:2041,MESSAGE_SEND_FAIL:2100,MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS:2103,MESSAGE_SEND_NEED_MESSAGE_INSTANCE:2105,MESSAGE_SEND_INVALID_CONVERSATION_TYPE:2106,MESSAGE_FILE_IS_EMPTY:2108,MESSAGE_ONPROGRESS_FUNCTION_ERROR:2109,MESSAGE_REVOKE_FAIL:2110,MESSAGE_IMAGE_SELECT_FILE_FIRST:2251,MESSAGE_IMAGE_TYPES_LIMIT:2252,MESSAGE_IMAGE_SIZE_LIMIT:2253,MESSAGE_AUDIO_UPLOAD_FAIL:2300,MESSAGE_AUDIO_SIZE_LIMIT:2301,MESSAGE_VIDEO_UPLOAD_FAIL:2350,MESSAGE_VIDEO_SIZE_LIMIT:2351,MESSAGE_VIDEO_TYPES_LIMIT:2352,MESSAGE_FILE_UPLOAD_FAIL:2400,MESSAGE_FILE_SELECT_FILE_FIRST:2401,MESSAGE_FILE_SIZE_LIMIT:2402,MESSAGE_FILE_URL_IS_EMPTY:2403,MESSAGE_MERGER_TYPE_INVALID:2450,MESSAGE_MERGER_KEY_INVALID:2451,MESSAGE_MERGER_DOWNLOAD_FAIL:2452,MESSAGE_FORWARD_TYPE_INVALID:2453,CONVERSATION_NOT_FOUND:2500,USER_OR_GROUP_NOT_FOUND:2501,CONVERSATION_UN_RECORDED_TYPE:2502,ILLEGAL_GROUP_TYPE:2600,CANNOT_JOIN_WORK:2601,CANNOT_CHANGE_OWNER_IN_AVCHATROOM:2620,CANNOT_CHANGE_OWNER_TO_SELF:2621,CANNOT_DISMISS_Work:2622,MEMBER_NOT_IN_GROUP:2623,JOIN_GROUP_FAIL:2660,CANNOT_ADD_MEMBER_IN_AVCHATROOM:2661,CANNOT_JOIN_NON_AVCHATROOM_WITHOUT_LOGIN:2662,CANNOT_KICK_MEMBER_IN_AVCHATROOM:2680,NOT_OWNER:2681,CANNOT_SET_MEMBER_ROLE_IN_WORK_AND_AVCHATROOM:2682,INVALID_MEMBER_ROLE:2683,CANNOT_SET_SELF_MEMBER_ROLE:2684,CANNOT_MUTE_SELF:2685,DEL_FRIEND_INVALID_PARAM:2700,UPDATE_PROFILE_INVALID_PARAM:2721,UPDATE_PROFILE_NO_KEY:2722,ADD_BLACKLIST_INVALID_PARAM:2740,DEL_BLACKLIST_INVALID_PARAM:2741,CANNOT_ADD_SELF_TO_BLACKLIST:2742,NETWORK_ERROR:2800,NETWORK_TIMEOUT:2801,NETWORK_BASE_OPTIONS_NO_URL:2802,NETWORK_UNDEFINED_SERVER_NAME:2803,NETWORK_PACKAGE_UNDEFINED:2804,NO_NETWORK:2805,CONVERTOR_IRREGULAR_PARAMS:2900,NOTICE_RUNLOOP_UNEXPECTED_CONDITION:2901,NOTICE_RUNLOOP_OFFSET_LOST:2902,UNCAUGHT_ERROR:2903,GET_LONGPOLL_ID_FAILED:2904,INVALID_OPERATION:2905,SDK_IS_NOT_READY:2999,LONG_POLL_KICK_OUT:91101,MESSAGE_A2KEY_EXPIRED:20002,ACCOUNT_A2KEY_EXPIRED:70001,LONG_POLL_API_PARAM_ERROR:90001},Yp="无 SDKAppID",Jp="无 accountType",Xp="无 userID",Qp="无 userSig",Zp="无 tinyID",ef="无 a2key",tf="用户未登录",nf="未检测到 COS 上传插件",rf="获取 COS 预签名 URL 失败",of="消息发送失败",af="MessageController.constructor() 需要参数 options",sf="需要 Message 的实例",uf='Message.conversationType 只能为 "C2C" 或 "GROUP"',cf="无法发送空文件",lf="回调函数运行时遇到错误，请检查接入侧代码",pf="消息撤回失败",ff="请先选择一个图片",hf="只允许上传 jpg png jpeg gif bmp格式的图片",df="图片大小超过20M，无法发送",gf="语音上传失败",mf="语音大小大于20M，无法发送",vf="视频上传失败",yf="视频大小超过100M，无法发送",_f="只允许上传 mp4 格式的视频",Mf="文件上传失败",If="请先选择一个文件",Cf="文件大小超过100M，无法发送 ",Ef="缺少必要的参数文件 URL",Sf="非合并消息",Tf="合并消息的 messageKey 无效",Df="下载合并消息失败",kf="选择的消息类型（如群提示消息）不可以转发",Af="没有找到相应的会话，请检查传入参数",Of="没有找到相应的用户或群组，请检查传入参数",Rf="未记录的会话类型",Nf="非法的群类型，请检查传入参数",Lf="不能加入 Work 类型的群组",wf="AVChatRoom 类型的群组不能转让群主",bf="不能把群主转让给自己",Pf="不能解散 Work 类型的群组",Gf="用户不在该群组内",Uf="加群失败，请检查传入参数或重试",qf="AVChatRoom 类型的群不支持邀请群成员",xf="非 AVChatRoom 类型的群组不允许匿名加群，请先登录后再加群",Ff="不能在 AVChatRoom 类型的群组踢人",Vf="你不是群主，只有群主才有权限操作",Bf="不能在 Work / AVChatRoom 类型的群中设置群成员身份",jf="不合法的群成员身份，请检查传入参数",Kf="不能设置自己的群成员身份，请检查传入参数",Hf="不能将自己禁言，请检查传入参数",$f="传入 deleteFriend 接口的参数无效",zf="传入 updateMyProfile 接口的参数无效",Wf="updateMyProfile 无标配资料字段或自定义资料字段",Yf="传入 addToBlacklist 接口的参数无效",Jf="传入 removeFromBlacklist 接口的参数无效",Xf="不能拉黑自己",Qf="网络层初始化错误，缺少 URL 参数",Zf="打包错误，未定义的 serverName",eh="未定义的 packageConfig",th="未连接到网络",nh="不规范的参数名称",rh="_syncOffset 丢失",oh="获取 longpolling id 失败",ih="无效操作，如调用了未定义或者未实现的方法等",ah="接口需要 SDK 处于 ready 状态后才能调用",sh=["jpg","jpeg","gif","png","bmp"],uh=["mp4"],ch=1,lh=2,ph=3,fh=255,hh=function(){function e(t){Ln(this,e);var n=this._check(t);if(n instanceof zp)throw n;this.type=En.MSG_FILE,this._percent=0;var r=this._getFileInfo(t);this.content={downloadFlag:2,fileUrl:t.url||"",uuid:t.uuid,fileName:r.name||"",fileSize:r.size||0}}return bn(e,[{key:"_getFileInfo",value:function(e){if(e.fileName&&e.fileSize)return{size:e.fileSize,name:e.fileName};if(Ha)return{};var t=e.file.files[0];return{size:t.size,name:t.name,type:t.type.slice(t.type.lastIndexOf("/")+1).toLowerCase()}}},{key:"updatePercent",value:function(e){this._percent=e,this._percent>1&&(this._percent=1)}},{key:"updateFileUrl",value:function(e){this.content.fileUrl=e}},{key:"_check",value:function(e){if(e.size>104857600)return new zp({code:Wp.MESSAGE_FILE_SIZE_LIMIT,message:"".concat(Cf,": ").concat(104857600," bytes")})}},{key:"sendable",value:function(){return""!==this.content.fileUrl&&(""!==this.content.fileName&&0!==this.content.fileSize)}}]),e}(),dh=function(){function e(t){Ln(this,e),this.type=En.MSG_CUSTOM,this.content={data:t.data||"",description:t.description||"",extension:t.extension||""}}return bn(e,[{key:"setData",value:function(e){return this.content.data=e,this}},{key:"setDescription",value:function(e){return this.content.description=e,this}},{key:"setExtension",value:function(e){return this.content.extension=e,this}},{key:"sendable",value:function(){return 0!==this.content.data.length||0!==this.content.description.length||0!==this.content.extension.length}}]),e}(),gh=function(){function e(t){Ln(this,e),this.type=En.MSG_VIDEO,this._percent=0,this.content={remoteVideoUrl:t.remoteVideoUrl||t.videoUrl||"",videoFormat:t.videoFormat,videoSecond:parseInt(t.videoSecond,10),videoSize:t.videoSize,videoUrl:t.videoUrl,videoDownloadFlag:2,videoUUID:t.videoUUID,thumbUUID:t.thumbUUID,thumbFormat:t.thumbFormat,thumbWidth:t.thumbWidth,thumbHeight:t.thumbHeight,thumbSize:t.thumbSize,thumbDownloadFlag:2,thumbUrl:t.thumbUrl}}return bn(e,[{key:"updatePercent",value:function(e){this._percent=e,this._percent>1&&(this._percent=1)}},{key:"updateVideoUrl",value:function(e){e&&(this.content.remoteVideoUrl=e)}},{key:"sendable",value:function(){return""!==this.content.remoteVideoUrl}}]),e}(),mh=function e(t){Ln(this,e),this.type=En.MSG_GEO,this.content=t},vh=T.f,yh="".startsWith,_h=Math.min,Mh=pa("startsWith"),Ih=!(Mh||(Bp=vh(String.prototype,"startsWith"),!Bp||Bp.writable));Ne({target:"String",proto:!0,forced:!Ih&&!Mh},{startsWith:function(e){var t=String(d(this));ca(e);var n=ce(_h(arguments.length>1?arguments[1]:void 0,t.length)),r=String(e);return yh?yh.call(t,r,n):t.slice(n,n+r.length)===r}});var Ch=function(){function e(t){if(Ln(this,e),this.from=t.from,this.messageSender=t.from,this.time=t.time,this.messageSequence=t.sequence,this.clientSequence=t.clientSequence||t.sequence,this.messageRandom=t.random,this.cloudCustomData=t.cloudCustomData||"",t.ID)this.nick=t.nick||"",this.avatar=t.avatar||"",this.messageBody=[{type:t.type,payload:t.payload}],t.conversationType.startsWith(En.CONV_C2C)?this.receiverUserID=t.to:t.conversationType.startsWith(En.CONV_GROUP)&&(this.receiverGroupID=t.to),this.messageReceiver=t.to;else{this.nick=t.nick||"",this.avatar=t.avatar||"",this.messageBody=[];var n=t.elements[0].type,r=t.elements[0].content;this._patchRichMediaPayload(n,r),n===En.MSG_MERGER?this.messageBody.push({type:n,payload:new Eh(r).content}):this.messageBody.push({type:n,payload:r}),t.groupID&&(this.receiverGroupID=t.groupID,this.messageReceiver=t.groupID),t.to&&(this.receiverUserID=t.to,this.messageReceiver=t.to)}}return bn(e,[{key:"_patchRichMediaPayload",value:function(e,t){e===En.MSG_IMAGE?t.imageInfoArray.forEach((function(e){!e.imageUrl&&e.url&&(e.imageUrl=e.url,e.sizeType=e.type,1===e.type?e.type=0:3===e.type&&(e.type=1))})):e===En.MSG_VIDEO?!t.remoteVideoUrl&&t.videoUrl&&(t.remoteVideoUrl=t.videoUrl):e===En.MSG_AUDIO?!t.remoteAudioUrl&&t.url&&(t.remoteAudioUrl=t.url):e===En.MSG_FILE&&!t.fileUrl&&t.url&&(t.fileUrl=t.url,t.url=void 0)}}]),e}(),Eh=function(){function e(t){if(Ln(this,e),this.type=En.MSG_MERGER,this.content={downloadKey:"",pbDownloadKey:"",messageList:[],title:"",abstractList:[],compatibleText:"",version:0,layersOverLimit:!1},t.downloadKey){var n=t.downloadKey,r=t.pbDownloadKey,o=t.title,i=t.abstractList,a=t.compatibleText,s=t.version;this.content.downloadKey=n,this.content.pbDownloadKey=r,this.content.title=o,this.content.abstractList=i,this.content.compatibleText=a,this.content.version=s||0}else if(cu(t.messageList))1===t.layersOverLimit&&(this.content.layersOverLimit=!0);else{var u=t.messageList,c=t.title,l=t.abstractList,p=t.compatibleText,f=t.version,h=[];u.forEach((function(e){if(!cu(e)){var t=new Ch(e);h.push(t)}})),this.content.messageList=h,this.content.title=c,this.content.abstractList=l,this.content.compatibleText=p,this.content.version=f||0}Ts.debug("MergerElement.content:",this.content)}return bn(e,[{key:"sendable",value:function(){return!cu(this.content.messageList)||!cu(this.content.downloadKey)}}]),e}(),Sh={1:En.MSG_PRIORITY_HIGH,2:En.MSG_PRIORITY_NORMAL,3:En.MSG_PRIORITY_LOW,4:En.MSG_PRIORITY_LOWEST},Th=function(){function e(t){Ln(this,e),this.ID="",this.conversationID=t.conversationID||null,this.conversationType=t.conversationType||En.CONV_C2C,this.conversationSubType=t.conversationSubType,this.time=t.time||Math.ceil(Date.now()/1e3),this.sequence=t.sequence||0,this.clientSequence=t.clientSequence||t.sequence||0,this.random=t.random||Ks(),this.priority=this._computePriority(t.priority),this.nick=t.nick||"",this.avatar=t.avatar||"",this.isPeerRead=!1,this.nameCard="",this._elements=[],this.isPlaceMessage=t.isPlaceMessage||0,this.isRevoked=2===t.isPlaceMessage||8===t.msgFlagBits,this.geo={},this.from=t.from||null,this.to=t.to||null,this.flow="",this.isSystemMessage=t.isSystemMessage||!1,this.protocol=t.protocol||"JSON",this.isResend=!1,this.isRead=!1,this.status=t.status||rc.SUCCESS,this._onlineOnlyFlag=!1,this._groupAtInfoList=[],this._relayFlag=!1,this.atUserList=[],this.cloudCustomData=t.cloudCustomData||"",this.reInitialize(t.currentUser),this.extractGroupInfo(t.groupProfile||null),this.handleGroupAtInfo(t)}return bn(e,[{key:"getElements",value:function(){return this._elements}},{key:"extractGroupInfo",value:function(e){if(null!==e){As(e.nick)&&(this.nick=e.nick),As(e.avatar)&&(this.avatar=e.avatar);var t=e.messageFromAccountExtraInformation;Rs(t)&&As(t.nameCard)&&(this.nameCard=t.nameCard)}}},{key:"handleGroupAtInfo",value:function(e){var t=this;e.payload&&e.payload.atUserList&&e.payload.atUserList.forEach((function(e){e!==En.MSG_AT_ALL?(t._groupAtInfoList.push({groupAtAllFlag:0,groupAtUserID:e}),t.atUserList.push(e)):(t._groupAtInfoList.push({groupAtAllFlag:1}),t.atUserList.push(En.MSG_AT_ALL))})),Ns(e.groupAtInfo)&&e.groupAtInfo.forEach((function(e){1===e.groupAtAllFlag?t.atUserList.push(e.groupAtUserID):2===e.groupAtAllFlag&&t.atUserList.push(En.MSG_AT_ALL)}))}},{key:"getGroupAtInfoList",value:function(){return this._groupAtInfoList}},{key:"_initProxy",value:function(){this.payload=this._elements[0].content,this.type=this._elements[0].type}},{key:"reInitialize",value:function(e){e&&(this.status=this.from?rc.SUCCESS:rc.UNSEND,!this.from&&(this.from=e)),this._initFlow(e),this._initielizeSequence(e),this._concactConversationID(e),this.generateMessageID(e)}},{key:"isSendable",value:function(){return 0!==this._elements.length&&("function"!=typeof this._elements[0].sendable?(Ts.warn("".concat(this._elements[0].type,' need "boolean : sendable()" method')),!1):this._elements[0].sendable())}},{key:"_initTo",value:function(e){this.conversationType===En.CONV_GROUP&&(this.to=e.groupID)}},{key:"_initielizeSequence",value:function(e){0===this.clientSequence&&e&&(this.clientSequence=function(e){if(!e)return Ts.error("autoincrementIndex(string: key) need key parameter"),!1;if(void 0===Ws[e]){var t=new Date,n="3".concat(t.getHours()).slice(-2),r="0".concat(t.getMinutes()).slice(-2),o="0".concat(t.getSeconds()).slice(-2);Ws[e]=parseInt([n,r,o,"0001"].join("")),n=null,r=null,o=null,Ts.warn("utils.autoincrementIndex() create new sequence : ".concat(e," = ").concat(Ws[e]))}return Ws[e]++}(e)),0===this.sequence&&this.conversationType===En.CONV_C2C&&(this.sequence=this.clientSequence)}},{key:"generateMessageID",value:function(e){var t=e===this.from?1:0,n=this.sequence>0?this.sequence:this.clientSequence;this.ID="".concat(this.conversationID,"-").concat(n,"-").concat(this.random,"-").concat(t)}},{key:"_initFlow",value:function(e){""!==e&&(e===this.from?(this.flow="out",this.isRead=!0):this.flow="in")}},{key:"_concactConversationID",value:function(e){var t=this.to,n="",r=this.conversationType;r!==En.CONV_SYSTEM?(n=r===En.CONV_C2C?e===this.from?t:this.from:this.to,this.conversationID="".concat(r).concat(n)):this.conversationID=En.CONV_SYSTEM}},{key:"isElement",value:function(e){return e instanceof ic||e instanceof Op||e instanceof Rp||e instanceof Np||e instanceof hh||e instanceof gh||e instanceof wp||e instanceof Pp||e instanceof dh||e instanceof mh||e instanceof Eh}},{key:"setElement",value:function(e){var t=this;if(this.isElement(e))return this._elements=[e],void this._initProxy();var n=function(e){if(e.type&&e.content)switch(e.type){case En.MSG_TEXT:t.setTextElement(e.content);break;case En.MSG_IMAGE:t.setImageElement(e.content);break;case En.MSG_AUDIO:t.setAudioElement(e.content);break;case En.MSG_FILE:t.setFileElement(e.content);break;case En.MSG_VIDEO:t.setVideoElement(e.content);break;case En.MSG_CUSTOM:t.setCustomElement(e.content);break;case En.MSG_GEO:t.setGEOElement(e.content);break;case En.MSG_GRP_TIP:t.setGroupTipElement(e.content);break;case En.MSG_GRP_SYS_NOTICE:t.setGroupSystemNoticeElement(e.content);break;case En.MSG_FACE:t.setFaceElement(e.content);break;case En.MSG_MERGER:t.setMergerElement(e.content);break;default:Ts.warn(e.type,e.content,"no operation......")}};if(Ns(e))for(var r=0;r<e.length;r++)n(e[r]);else n(e);this._initProxy()}},{key:"clearElement",value:function(){this._elements.length=0}},{key:"setTextElement",value:function(e){var t="string"==typeof e?e:e.text,n=new ic({text:t});this._elements.push(n)}},{key:"setImageElement",value:function(e){var t=new Op(e);this._elements.push(t)}},{key:"setAudioElement",value:function(e){var t=new Np(e);this._elements.push(t)}},{key:"setFileElement",value:function(e){var t=new hh(e);this._elements.push(t)}},{key:"setVideoElement",value:function(e){var t=new gh(e);this._elements.push(t)}},{key:"setGEOElement",value:function(e){var t=new mh(e);this._elements.push(t)}},{key:"setCustomElement",value:function(e){var t=new dh(e);this._elements.push(t)}},{key:"setGroupTipElement",value:function(e){var t={},n=e.operationType;cu(e.memberInfoList)||n!==En.GRP_TIP_MBR_JOIN&&n!==En.GRP_TIP_MBR_KICKED_OUT?e.operatorInfo&&(t=e.operatorInfo):t=e.memberInfoList[0];var r=t,o=r.nick,i=r.avatar;As(o)&&(this.nick=o),As(i)&&(this.avatar=i);var a=new wp(e);this._elements.push(a)}},{key:"setGroupSystemNoticeElement",value:function(e){var t=new Pp(e);this._elements.push(t)}},{key:"setFaceElement",value:function(e){var t=new Rp(e);this._elements.push(t)}},{key:"setMergerElement",value:function(e){var t=new Eh(e);this._elements.push(t)}},{key:"setIsRead",value:function(e){this.isRead=e}},{key:"setRelayFlag",value:function(e){this._relayFlag=e}},{key:"getRelayFlag",value:function(){return this._relayFlag}},{key:"setOnlineOnlyFlag",value:function(e){this._onlineOnlyFlag=e}},{key:"getOnlineOnlyFlag",value:function(){return this._onlineOnlyFlag}},{key:"_computePriority",value:function(e){if(Ls(e))return En.MSG_PRIORITY_NORMAL;if(As(e)&&-1!==Object.values(Sh).indexOf(e))return e;if(ks(e)){var t=""+e;if(-1!==Object.keys(Sh).indexOf(t))return Sh[t]}return En.MSG_PRIORITY_NORMAL}},{key:"setNickAndAvatar",value:function(e){var t=e.nick,n=e.avatar;As(t)&&(this.nick=t),As(n)&&(this.avatar=n)}},{key:"elements",get:function(){return Ts.warn("！！！Message 实例的 elements 属性即将废弃，请尽快修改。使用 type 和 payload 属性处理单条消息，兼容组合消息使用 _elements 属性！！！"),this._elements}}]),e}(),Dh=function(e){return!!e&&(!!(function(e){return As(e)&&e.slice(0,3)===En.CONV_C2C}(e)||function(e){return As(e)&&e.slice(0,5)===En.CONV_GROUP}(e)||nu(e))||(console.warn("非法的会话 ID:".concat(e,"。会话 ID 组成方式：C2C + userID（单聊）GROUP + groupID（群聊）@TIM#SYSTEM（系统通知会话）")),!1))},kh="请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#",Ah=function(e){return e.param?"".concat(e.api," ").concat(e.param," ").concat(e.desc,"。").concat(kh).concat(e.api):"".concat(e.api," ").concat(e.desc,"。").concat(kh).concat(e.api)},Oh={type:"String",required:!0},Rh={type:"Array",required:!0},Nh={type:"Object",required:!0},Lh={login:{userID:Oh,userSig:Oh},addToBlacklist:{userIDList:Rh},on:[{name:"eventName",type:"String",validator:function(e){return"string"==typeof e&&0!==e.length||(console.warn(Ah({api:"on",param:"eventName",desc:"类型必须为 String，且不能为空"})),!1)}},{name:"handler",type:"Function",validator:function(e){return"function"!=typeof e?(console.warn(Ah({api:"on",param:"handler",desc:"参数必须为 Function"})),!1):(""===e.name&&console.warn("on 接口的 handler 参数推荐使用具名函数。具名函数可以使用 off 接口取消订阅，匿名函数无法取消订阅。"),!0)}}],once:[{name:"eventName",type:"String",validator:function(e){return"string"==typeof e&&0!==e.length||(console.warn(Ah({api:"once",param:"eventName",desc:"类型必须为 String，且不能为空"})),!1)}},{name:"handler",type:"Function",validator:function(e){return"function"!=typeof e?(console.warn(Ah({api:"once",param:"handler",desc:"参数必须为 Function"})),!1):(""===e.name&&console.warn("once 接口的 handler 参数推荐使用具名函数。"),!0)}}],off:[{name:"eventName",type:"String",validator:function(e){return"string"==typeof e&&0!==e.length||(console.warn(Ah({api:"off",param:"eventName",desc:"类型必须为 String，且不能为空"})),!1)}},{name:"handler",type:"Function",validator:function(e){return"function"!=typeof e?(console.warn(Ah({api:"off",param:"handler",desc:"参数必须为 Function"})),!1):(""===e.name&&console.warn("off 接口无法为匿名函数取消监听事件。"),!0)}}],sendMessage:[Un({name:"message"},Nh)],getMessageList:{conversationID:Un(Un({},Oh),{},{validator:function(e){return Dh(e)}}),nextReqMessageID:{type:"String"},count:{type:"Number",validator:function(e){return!(!Ls(e)&&!/^[1-9][0-9]*$/.test(e))||(console.warn(Ah({api:"getMessageList",param:"count",desc:"必须为正整数"})),!1)}}},setMessageRead:{conversationID:Un(Un({},Oh),{},{validator:function(e){return Dh(e)}})},getConversationProfile:[Un(Un({name:"conversationID"},Oh),{},{validator:function(e){return Dh(e)}})],deleteConversation:[Un(Un({name:"conversationID"},Oh),{},{validator:function(e){return Dh(e)}})],getGroupList:{groupProfileFilter:{type:"Array"}},getGroupProfile:{groupID:Oh,groupCustomFieldFilter:{type:"Array"},memberCustomFieldFilter:{type:"Array"}},getGroupProfileAdvance:{groupIDList:Rh},createGroup:{name:Oh},joinGroup:{groupID:Oh,type:{type:"String"},applyMessage:{type:"String"}},quitGroup:[Un({name:"groupID"},Oh)],handleApplication:{message:Nh,handleAction:Oh,handleMessage:{type:"String"}},changeGroupOwner:{groupID:Oh,newOwnerID:Oh},updateGroupProfile:{groupID:Oh,muteAllMembers:{type:"Boolean"}},dismissGroup:[Un({name:"groupID"},Oh)],searchGroupByID:[Un({name:"groupID"},Oh)],getGroupMemberList:{groupID:Oh,offset:{type:"Number"},count:{type:"Number"}},getGroupMemberProfile:{groupID:Oh,userIDList:Rh,memberCustomFieldFilter:{type:"Array"}},addGroupMember:{groupID:Oh,userIDList:Rh},setGroupMemberRole:{groupID:Oh,userID:Oh,role:Oh},setGroupMemberMuteTime:{groupID:Oh,userID:Oh,muteTime:{type:"Number",validator:function(e){return e>=0}}},setGroupMemberNameCard:{groupID:Oh,userID:{type:"String"},nameCard:Un(Un({},Oh),{},{validator:function(e){return!0!==/^\s+$/.test(e)}})},setMessageRemindType:{groupID:Oh,messageRemindType:Oh},setGroupMemberCustomField:{groupID:Oh,userID:{type:"String"},memberCustomField:Rh},deleteGroupMember:{groupID:Oh},createTextMessage:{to:Oh,conversationType:Oh,payload:Un(Un({},Nh),{},{validator:function(e){return Rs(e)?As(e.text)?0!==e.text.length||(console.warn(Ah({api:"createTextMessage",desc:"消息内容不能为空"})),!1):(console.warn(Ah({api:"createTextMessage",param:"payload.text",desc:"类型必须为 String"})),!1):(console.warn(Ah({api:"createTextMessage",param:"payload",desc:"类型必须为 plain object"})),!1)}})},createTextAtMessage:{to:Oh,conversationType:Oh,payload:Un(Un({},Nh),{},{validator:function(e){return Rs(e)?As(e.text)?0===e.text.length?(console.warn(Ah({api:"createTextAtMessage",desc:"消息内容不能为空"})),!1):!(e.atUserList&&!Ns(e.atUserList))||(console.warn(Ah({api:"createTextAtMessage",desc:"payload.atUserList 类型必须为数组"})),!1):(console.warn(Ah({api:"createTextAtMessage",param:"payload.text",desc:"类型必须为 String"})),!1):(console.warn(Ah({api:"createTextAtMessage",param:"payload",desc:"类型必须为 plain object"})),!1)}})},createCustomMessage:{to:Oh,conversationType:Oh,payload:Un(Un({},Nh),{},{validator:function(e){return Rs(e)?e.data&&!As(e.data)?(console.warn(Ah({api:"createCustomMessage",param:"payload.data",desc:"类型必须为 String"})),!1):e.description&&!As(e.description)?(console.warn(Ah({api:"createCustomMessage",param:"payload.description",desc:"类型必须为 String"})),!1):!(e.extension&&!As(e.extension))||(console.warn(Ah({api:"createCustomMessage",param:"payload.extension",desc:"类型必须为 String"})),!1):(console.warn(Ah({api:"createCustomMessage",param:"payload",desc:"类型必须为 plain object"})),!1)}})},createImageMessage:{to:Oh,conversationType:Oh,payload:Un(Un({},Nh),{},{validator:function(e){if(!Rs(e))return console.warn(Ah({api:"createImageMessage",param:"payload",desc:"类型必须为 plain object"})),!1;if(Ls(e.file))return console.warn(Ah({api:"createImageMessage",param:"payload.file",desc:"不能为 undefined"})),!1;if($a){if(!(e.file instanceof HTMLInputElement||Ds(e.file)))return console.warn(Ah({api:"createImageMessage",param:"payload.file",desc:"类型必须是 HTMLInputElement 或 File"})),!1;if(e.file instanceof HTMLInputElement&&0===e.file.files.length)return console.warn(Ah({api:"createImageMessage",param:"payload.file",desc:"您没有选择文件，无法发送"})),!1}return!0},onProgress:{type:"Function",required:!1,validator:function(e){return Ls(e)&&console.warn(Ah({api:"createImageMessage",desc:"没有 onProgress 回调，您将无法获取上传进度"})),!0}}})},createAudioMessage:{to:Oh,conversationType:Oh,payload:Un(Un({},Nh),{},{validator:function(e){return!!Rs(e)||(console.warn(Ah({api:"createAudioMessage",param:"payload",desc:"类型必须为 plain object"})),!1)}}),onProgress:{type:"Function",required:!1,validator:function(e){return Ls(e)&&console.warn(Ah({api:"createAudioMessage",desc:"没有 onProgress 回调，您将无法获取上传进度"})),!0}}},createVideoMessage:{to:Oh,conversationType:Oh,payload:Un(Un({},Nh),{},{validator:function(e){if(!Rs(e))return console.warn(Ah({api:"createVideoMessage",param:"payload",desc:"类型必须为 plain object"})),!1;if(Ls(e.file))return console.warn(Ah({api:"createVideoMessage",param:"payload.file",desc:"不能为 undefined"})),!1;if($a){if(!(e.file instanceof HTMLInputElement||Ds(e.file)))return console.warn(Ah({api:"createVideoMessage",param:"payload.file",desc:"类型必须是 HTMLInputElement 或 File"})),!1;if(e.file instanceof HTMLInputElement&&0===e.file.files.length)return console.warn(Ah({api:"createVideoMessage",param:"payload.file",desc:"您没有选择文件，无法发送"})),!1}return!0}}),onProgress:{type:"Function",required:!1,validator:function(e){return Ls(e)&&console.warn(Ah({api:"createVideoMessage",desc:"没有 onProgress 回调，您将无法获取上传进度"})),!0}}},createFaceMessage:{to:Oh,conversationType:Oh,payload:Un(Un({},Nh),{},{validator:function(e){return Rs(e)?ks(e.index)?!!As(e.data)||(console.warn(Ah({api:"createFaceMessage",param:"payload.data",desc:"类型必须为 String"})),!1):(console.warn(Ah({api:"createFaceMessage",param:"payload.index",desc:"类型必须为 Number"})),!1):(console.warn(Ah({api:"createFaceMessage",param:"payload",desc:"类型必须为 plain object"})),!1)}})},createFileMessage:{to:Oh,conversationType:Oh,payload:Un(Un({},Nh),{},{validator:function(e){if(!Rs(e))return console.warn(Ah({api:"createFileMessage",param:"payload",desc:"类型必须为 plain object"})),!1;if(Ls(e.file))return console.warn(Ah({api:"createFileMessage",param:"payload.file",desc:"不能为 undefined"})),!1;if($a){if(!(e.file instanceof HTMLInputElement||Ds(e.file)))return console.warn(Ah({api:"createFileMessage",param:"payload.file",desc:"类型必须是 HTMLInputElement 或 File"})),!1;if(e.file instanceof HTMLInputElement&&0===e.file.files.length)return console.warn(Ah({api:"createFileMessage",desc:"您没有选择文件，无法发送"})),!1}return!0}}),onProgress:{type:"Function",required:!1,validator:function(e){return Ls(e)&&console.warn(Ah({api:"createFileMessage",desc:"没有 onProgress 回调，您将无法获取上传进度"})),!0}}},createMergerMessage:{to:Oh,conversationType:Oh,payload:Un(Un({},Nh),{},{validator:function(e){if(cu(e.messageList))return console.warn(Ah({api:"createMergerMessage",desc:"不能为空数组"})),!1;if(cu(e.compatibleText))return console.warn(Ah({api:"createMergerMessage",desc:"类型必须为 String，且不能为空"})),!1;var t=!1;return e.messageList.forEach((function(e){e.status===rc.FAIL&&(t=!0)})),!t||(console.warn(Ah({api:"createMergerMessage",desc:"不支持合并已发送失败的消息"})),!1)}})},forwardMessage:{to:Oh,conversationType:Oh,payload:Un(Un({},Nh),{},{validator:function(e){return e instanceof Th?e.conversationType===En.CONV_SYSTEM?(console.warn("forwardMessage 不能转发系统会话消息，只能转发单聊消息或群消息"),!1):!0!==e.isRevoked||(console.warn("forwardMessage 不能转发已被撤回的消息"),!1):(console.warn("forwardMessage 参数 message 必须为 Message(".concat(kh,"Message.html) 实例。")),!1)}})},revokeMessage:[Un(Un({name:"message"},Nh),{},{validator:function(e){return e instanceof Th?e.conversationType===En.CONV_SYSTEM?(console.warn("revokeMessage 不能撤回系统会话消息，只能撤回单聊消息或群消息"),!1):!0!==e.isRevoked||(console.warn("revokeMessage 消息已经被撤回，请勿重复操作"),!1):(console.warn("revokeMessage 参数 message 必须为 Message(".concat(kh,"Message.html) 实例。")),!1)}})],getUserProfile:{userIDList:{type:"Array",validator:function(e){return Ns(e)?(0===e.length&&console.warn(Ah({api:"getUserProfile",param:"userIDList",desc:"不能为空数组"})),!0):(console.warn(Ah({api:"getUserProfile",param:"userIDList",desc:"必须为数组"})),!1)}}},updateMyProfile:{profileCustomField:{type:"Array",validator:function(e){return!!Ls(e)||(!!Ns(e)||(console.warn(Ah({api:"updateMyProfile",param:"profileCustomField",desc:"必须为数组"})),!1))}}}},wh={login:"login",logout:"logout",on:"on",once:"once",off:"off",setLogLevel:"setLogLevel",registerPlugin:"registerPlugin",destroy:"destroy",createTextMessage:"createTextMessage",createTextAtMessage:"createTextAtMessage",createImageMessage:"createImageMessage",createAudioMessage:"createAudioMessage",createVideoMessage:"createVideoMessage",createCustomMessage:"createCustomMessage",createFaceMessage:"createFaceMessage",createFileMessage:"createFileMessage",createMergerMessage:"createMergerMessage",downloadMergerMessage:"downloadMergerMessage",createForwardMessage:"createForwardMessage",sendMessage:"sendMessage",resendMessage:"resendMessage",getMessageList:"getMessageList",setMessageRead:"setMessageRead",revokeMessage:"revokeMessage",getConversationList:"getConversationList",getConversationProfile:"getConversationProfile",deleteConversation:"deleteConversation",getGroupList:"getGroupList",getGroupProfile:"getGroupProfile",createGroup:"createGroup",joinGroup:"joinGroup",updateGroupProfile:"updateGroupProfile",quitGroup:"quitGroup",dismissGroup:"dismissGroup",changeGroupOwner:"changeGroupOwner",searchGroupByID:"searchGroupByID",setMessageRemindType:"setMessageRemindType",handleGroupApplication:"handleGroupApplication",getGroupMemberProfile:"getGroupMemberProfile",getGroupMemberList:"getGroupMemberList",addGroupMember:"addGroupMember",deleteGroupMember:"deleteGroupMember",setGroupMemberNameCard:"setGroupMemberNameCard",setGroupMemberMuteTime:"setGroupMemberMuteTime",setGroupMemberRole:"setGroupMemberRole",setGroupMemberCustomField:"setGroupMemberCustomField",getGroupOnlineMemberCount:"getGroupOnlineMemberCount",getMyProfile:"getMyProfile",getUserProfile:"getUserProfile",updateMyProfile:"updateMyProfile",getBlacklist:"getBlacklist",addToBlacklist:"addToBlacklist",removeFromBlacklist:"removeFromBlacklist",getFriendList:"getFriendList",callExperimentalAPI:"callExperimentalAPI"},bh=!!To&&o((function(){To.prototype.finally.call({then:function(){}},(function(){}))}));Ne({target:"Promise",proto:!0,real:!0,forced:bh},{finally:function(e){var t=Lo(this,oe("Promise")),n="function"==typeof e;return this.then(n?function(n){return mi(t,e()).then((function(){return n}))}:e,n?function(n){return mi(t,e()).then((function(){throw n}))}:e)}}),"function"!=typeof To||To.prototype.finally||te(To.prototype,"finally",oe("Promise").prototype.finally);var Ph="1.7.3",Gh="537048168",Uh="10",qh="protobuf",xh="json",Fh=1,Vh=2,Bh=3,jh=4,Kh={HOST:{CURRENT:{COMMON:"https://webim.tim.qq.com",PIC:"https://pic.tim.qq.com",COS:"https://yun.tim.qq.com"},PRODUCTION:{COMMON:"https://webim.tim.qq.com",PIC:"https://pic.tim.qq.com",COS:"https://yun.tim.qq.com"},OVERSEA_PRODUCTION:{COMMON:"https://api.im.qcloud.com",PIC:"https://api.im.qcloud.com",COS:"https://api.im.qcloud.com"},SANDBOX:{COMMON:"https://events.tim.qq.com",PIC:"https://pic.tim.qq.com",COS:"https://yun.tim.qq.com"},TEST:{COMMON:"https://test.tim.qq.com",PIC:"https://pic.tim.qq.com",COS:"https://test.tim.qq.com"},setCurrent:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3;e===Fh?this.CURRENT=this.SANDBOX:e===Vh?this.CURRENT=this.TEST:e===Bh?this.CURRENT=this.PRODUCTION:e===jh&&(this.CURRENT=this.OVERSEA_PRODUCTION)}},NAME:{OPEN_IM:"openim",GROUP:"group_open_http_svc",FRIEND:"sns",PROFILE:"profile",RECENT_CONTACT:"recentcontact",PIC:"openpic",BIG_GROUP_NO_AUTH:"group_open_http_noauth_svc",BIG_GROUP_LONG_POLLING:"group_open_long_polling_http_svc",BIG_GROUP_LONG_POLLING_NO_AUTH:"group_open_long_polling_http_noauth_svc",IM_OPEN_STAT:"imopenstat",WEB_IM:"webim",IM_COS_SIGN:"im_cos_sign_svr",IM_LONG_MESSAGE:"im_long_msg",IM_COS_MESSAGE:"im_cos_msg"},CMD:{ACCESS_LAYER:"accesslayer",LOGIN:"login",LOGOUT_LONG_POLL:"longpollinglogout",LOGOUT_ALL:"logout",PORTRAIT_GET:"portrait_get_all",PORTRAIT_SET:"portrait_set",GET_LONG_POLL_ID:"getlongpollingid",LONG_POLL:"longpolling",AVCHATROOM_LONG_POLL:"get_msg",FRIEND_ADD:"friend_add",FRIEND_GET_ALL:"friend_get_all",FRIEND_DELETE:"friend_delete",RESPONSE_PENDENCY:"friend_response",GET_PENDENCY:"pendency_get",DELETE_PENDENCY:"pendency_delete",GET_GROUP_PENDENCY:"get_pendency",GET_BLACKLIST:"black_list_get",ADD_BLACKLIST:"black_list_add",DELETE_BLACKLIST:"black_list_delete",CREATE_GROUP:"create_group",GET_JOINED_GROUPS:"get_joined_group_list",SEND_MESSAGE:"sendmsg",REVOKE_C2C_MESSAGE:"msgwithdraw",SEND_GROUP_MESSAGE:"send_group_msg",REVOKE_GROUP_MESSAGE:"group_msg_recall",GET_GROUP_INFO:"get_group_info",GET_GROUP_MEMBER_INFO:"get_specified_group_member_info",GET_GROUP_MEMBER_LIST:"get_group_member_info",QUIT_GROUP:"quit_group",CHANGE_GROUP_OWNER:"change_group_owner",DESTROY_GROUP:"destroy_group",ADD_GROUP_MEMBER:"add_group_member",DELETE_GROUP_MEMBER:"delete_group_member",SEARCH_GROUP_BY_ID:"get_group_public_info",APPLY_JOIN_GROUP:"apply_join_group",HANDLE_APPLY_JOIN_GROUP:"handle_apply_join_group",MODIFY_GROUP_INFO:"modify_group_base_info",MODIFY_GROUP_MEMBER_INFO:"modify_group_member_info",DELETE_GROUP_SYSTEM_MESSAGE:"deletemsg",DELETE_GROUP_AT_TIPS:"deletemsg",GET_CONVERSATION_LIST:"get",PAGING_GET_CONVERSATION_LIST:"page_get",DELETE_CONVERSATION:"delete",GET_MESSAGES:"getmsg",GET_C2C_ROAM_MESSAGES:"getroammsg",GET_GROUP_ROAM_MESSAGES:"group_msg_get",SET_C2C_MESSAGE_READ:"msgreaded",GET_PEER_READ_TIME:"get_peer_read_time",SET_GROUP_MESSAGE_READ:"msg_read_report",FILE_READ_AND_WRITE_AUTHKEY:"authkey",FILE_UPLOAD:"pic_up",COS_SIGN:"cos",COS_PRE_SIG:"pre_sig",TIM_WEB_REPORT:"tim_web_report",BIG_DATA_HALLWAY_AUTH_KEY:"authkey",GET_ONLINE_MEMBER_NUM:"get_online_member_num",DOWNLOAD_MERGER_MESSAGE:"get_relay_json_msg",UPLOAD_MERGER_MESSAGE:"save_relay_json_msg"},CHANNEL:{SOCKET:1,XHR:2,AUTO:0},NAME_VERSION:{openim:"v4",group_open_http_svc:"v4",sns:"v4",profile:"v4",recentcontact:"v4",openpic:"v4",group_open_http_noauth_svc:"v4",group_open_long_polling_http_svc:"v4",group_open_long_polling_http_noauth_svc:"v4",imopenstat:"v4",im_cos_sign_svr:"v4",im_cos_msg:"v4",webim:"v4",im_long_msg:"v4"}};Kh.HOST.setCurrent(Bh);var Hh={request:{toAccount:"To_Account",fromAccount:"From_Account",to:"To_Account",from:"From_Account",groupID:"GroupId",groupAtUserID:"GroupAt_Account",receiverUserID:"To_Account",receiverGroupID:"GroupId",messageSender:"SenderId",messageReceiver:"ReceiverId",nick:"From_AccountNick",avatar:"From_AccountHeadurl",messageNumber:"MsgNum",pbDownloadKey:"PbMsgKey",downloadKey:"JsonMsgKey"},response:{GroupId:"groupID",Member_Account:"userID",MsgList:"messageList",SyncFlag:"syncFlag",To_Account:"to",From_Account:"from",MsgSeq:"sequence",MsgRandom:"random",MsgTimeStamp:"time",MsgContent:"content",MsgBody:"elements",From_AccountNick:"nick",From_AccountHeadurl:"avatar",GroupWithdrawInfoArray:"revokedInfos",GroupReadInfoArray:"groupMessageReadNotice",LastReadMsgSeq:"lastMessageSeq",WithdrawC2cMsgNotify:"c2cMessageRevokedNotify",C2cWithdrawInfoArray:"revokedInfos",C2cReadedReceipt:"c2cMessageReadReceipt",ReadC2cMsgNotify:"c2cMessageReadNotice",LastReadTime:"peerReadTime",MsgRand:"random",MsgType:"type",MsgShow:"messageShow",NextMsgSeq:"nextMessageSeq",FaceUrl:"avatar",ProfileDataMod:"profileModify",Profile_Account:"userID",ValueBytes:"value",ValueNum:"value",NoticeSeq:"noticeSequence",NotifySeq:"notifySequence",MsgFrom_AccountExtraInfo:"messageFromAccountExtraInformation",Operator_Account:"operatorID",OpType:"operationType",ReportType:"operationType",UserId:"userID",User_Account:"userID",List_Account:"userIDList",MsgOperatorMemberExtraInfo:"operatorInfo",MsgMemberExtraInfo:"memberInfoList",ImageUrl:"avatar",NickName:"nick",MsgGroupNewInfo:"newGroupProfile",MsgAppDefinedData:"groupCustomField",Owner_Account:"ownerID",GroupName:"name",GroupFaceUrl:"avatar",GroupIntroduction:"introduction",GroupNotification:"notification",GroupApplyJoinOption:"joinOption",MsgKey:"messageKey",GroupInfo:"groupProfile",ShutupTime:"muteTime",Desc:"description",Ext:"extension",GroupAt_Account:"groupAtUserID",MsgNum:"messageNumber",PbMsgKey:"pbDownloadKey",JsonMsgKey:"downloadKey"},ignoreKeyWord:["C2C","ID","USP"]},$h="_contextWasUpdated",zh="_contextWasReset",Wh="_a2KeyAndTinyIDUpdated",Yh="_specifiedConfigUpdated",Jh="_noticeIsSynchronizing",Xh="_noticeIsSynchronized",Qh="_messageSent",Zh="_syncMessageProcessing",ed="_syncMessageFinished",td="_receiveInstantMessage",nd="_receiveGroupInstantMessage",rd="_receveGroupSystemNotice",od="_messageRevoked",id="_longPollGetIDFailed",ad="_longPollRequestFailed",sd="_longPollResponseOK",ud="_longPollKickedOut",cd="_longPollMitipuleDeviceKickedOut",ld="_longPollGetNewC2CNotice",pd="_longPollGetNewGroupMessages",fd="_longPollGetNewGroupTips",hd="_longPollGetNewGroupAtTips",dd="_longPollGetNewGroupNotice",gd="_longPollGetNewFriendMessages",md="_longPollProfileModified",vd=" _longpollGroupMessageRevoked",yd=" _longpollGroupMessageReadNotice",_d="_longpollC2CMessageRevoked",Md="_longpollC2CMessageReadReceipt",Id="_longpollC2CMessageReadNotice",Cd="_avlongPollRequestFailed",Ed="_avlongPollResponseOK",Sd="_onGroupListUpdated",Td="_loginSuccess",Dd="_signLogoutExcuting",kd="_logoutSuccess",Ad="_a2keyExpired",Od="_errorHasBeenDetected",Rd="_onConversationListUpdated",Nd="_onConversationListProfileUpdated",Ld="_conversationDeleted",wd="onProfileUpdated",bd="joinAVChatRoomSuccess",Pd="joinAVChatRoomSuccessNoAuth",Gd="_sdkStateReady",Ud="_sdkReload",qd=it.filter,xd=Ye("filter"),Fd=lt("filter");Ne({target:"Array",proto:!0,forced:!xd||!Fd},{filter:function(e){return qd(this,e,arguments.length>1?arguments[1]:void 0)}});var Vd=Jr.trim;function Bd(e,t){if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");t=Object.assign({pascalCase:!1},t);var n;return 0===(e=Array.isArray(e)?e.map((function(e){return e.trim()})).filter((function(e){return e.length})).join("-"):e.trim()).length?"":1===e.length?t.pascalCase?e.toUpperCase():e.toLowerCase():(e!==e.toLowerCase()&&(e=jd(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,(function(e,t){return t.toUpperCase()})).replace(/\d+(\w|$)/g,(function(e){return e.toUpperCase()})),n=e,t.pascalCase?n.charAt(0).toUpperCase()+n.slice(1):n)}Ne({target:"String",proto:!0,forced:function(e){return o((function(){return!!Hr[e]()||"​᠎"!="​᠎"[e]()||Hr[e].name!==e}))}("trim")},{trim:function(){return Vd(this)}});var jd=function(e){for(var t=!1,n=!1,r=!1,o=0;o<e.length;o++){var i=e[o];t&&/[a-zA-Z]/.test(i)&&i.toUpperCase()===i?(e=e.slice(0,o)+"-"+e.slice(o),t=!1,r=n,n=!0,o++):n&&r&&/[a-zA-Z]/.test(i)&&i.toLowerCase()===i?(e=e.slice(0,o-1)+"-"+e.slice(o-1),r=n,n=!1,t=!0):(t=i.toLowerCase()===i&&i.toUpperCase()!==i,r=n,n=i.toUpperCase()===i&&i.toLowerCase()!==i)}return e};function Kd(e,t,n){var r=[],o=0,i=function e(t,n){if(++o>100)return o--,t;if(Ns(t)){var i=t.map((function(t){return Os(t)?e(t,n):t}));return o--,i}if(Os(t)){var a=(s=t,u=function(e,t){if(!Us(t))return!1;if((a=t)!==Bd(a)){for(var o=!0,i=0;i<Hh.ignoreKeyWord.length;i++)if(t.includes(Hh.ignoreKeyWord[i])){o=!1;break}o&&r.push(t)}var a;return Ls(n[t])?function(e){return"OPPOChannelID"===e?e:e[0].toUpperCase()+Bd(e).slice(1)}(t):n[t]},c=Object.create(null),Object.keys(s).forEach((function(e){var t=u(s[e],e);t&&(c[t]=s[e])})),c);return a=ru(a,(function(t,r){return Ns(t)||Os(t)?e(t,n):t})),o--,a}var s,u,c}(e,t=Un(Un({},Hh.request),t));return r.length>0&&n.innerEmitter.emit(Od,{code:Wp.CONVERTOR_IRREGULAR_PARAMS,message:nh}),i}function Hd(e,t){if(t=Un(Un({},Hh.response),t),Ns(e))return e.map((function(e){return Os(e)?Hd(e,t):e}));if(Os(e)){var n=(r=e,o=function(e,n){return Ls(t[n])?Bd(n):t[n]},i={},Object.keys(r).forEach((function(e){i[o(r[e],e)]=r[e]})),i);return n=ru(n,(function(e){return Ns(e)||Os(e)?Hd(e,t):e}))}var r,o,i}var $d=function(){function e(t){var n=this;Ln(this,e),this.url="",this.requestData=null,this.method=t.method||"POST",this.callback=function(e){return Hd(e=t.decode(e),n._getResponseMap(t))},this._initializeServerMap(),this._initializeURL(t),this._initializeRequestData(t)}return bn(e,[{key:"_initializeServerMap",value:function(){this._serverMap=Object.create(null);var e="";for(var t in Kh.NAME)if(Object.prototype.hasOwnProperty.call(Kh.NAME,t))switch(e=Kh.NAME[t]){case Kh.NAME.PIC:this._serverMap[e]=Kh.HOST.CURRENT.PIC;break;case Kh.NAME.IM_COS_SIGN:this._serverMap[e]=Kh.HOST.CURRENT.COS;break;default:this._serverMap[e]=Kh.HOST.CURRENT.COMMON}}},{key:"_getHost",value:function(e){if(void 0!==this._serverMap[e])return this._serverMap[e];throw new zp({code:Wp.NETWORK_UNDEFINED_SERVER_NAME,message:Zf})}},{key:"_initializeURL",value:function(e){var t=e.serverName,n=e.cmd,r=this._getHost(t),o="".concat(r,"/").concat(Kh.NAME_VERSION[t],"/").concat(t,"/").concat(n);o+="?".concat(this._getQueryString(e.queryString)),this.url=o}},{key:"getUrl",value:function(){return this.url.replace(/&reqtime=(\d+)/,"&reqtime=".concat(Math.ceil(+new Date/1e3)))}},{key:"_initializeRequestData",value:function(e){var t,n=e.requestData;t=this._requestDataCleaner(n),this.requestData=e.encode(t)}},{key:"_requestDataCleaner",value:function(e){var t=Array.isArray(e)?[]:Object.create(null);for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&Us(n)&&null!==e[n]&&("object"!==Nn(e[n])?t[n]=e[n]:t[n]=this._requestDataCleaner.bind(this)(e[n]));return t}},{key:"_getQueryString",value:function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&("function"!=typeof e[n]?t.push("".concat(n,"=").concat(e[n])):t.push("".concat(n,"=").concat(e[n]())));return t.join("&")}},{key:"_getResponseMap",value:function(e){if(e.keyMaps&&e.keyMaps.response&&Object.keys(e.keyMaps.response).length>0)return e.keyMaps.response}}]),e}(),zd=[].slice,Wd=/MSIE .\./.test(je),Yd=function(e){return function(t,n){var r=arguments.length>2,o=r?zd.call(arguments,2):void 0;return e(r?function(){("function"==typeof t?t:Function(t)).apply(this,o)}:t,n)}};function Jd(e){this.mixin(e)}Ne({global:!0,bind:!0,forced:Wd},{setTimeout:Yd(r.setTimeout),setInterval:Yd(r.setInterval)}),Jd.mixin=function(e){var t=e.prototype||e;t._isReady=!1,t.ready=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(e)return this._isReady?void(t?e.call(this):setTimeout(e,1)):(this._readyQueue=this._readyQueue||[],void this._readyQueue.push(e))},t.triggerReady=function(){var e=this;this._isReady=!0,setTimeout((function(){var t=e._readyQueue;e._readyQueue=[],t&&t.length>0&&t.forEach((function(e){e.call(this)}),e)}),1)},t.resetReady=function(){this._isReady=!1,this._readyQueue=[]},t.isReady=function(){return this._isReady}};var Xd=function(){function e(t){Ln(this,e),Jd.mixin(this),this.tim=t}return bn(e,[{key:"isLoggedIn",value:function(){return this.tim.context.login===nc.IS_LOGIN||!!this.tim.context.a2Key}},{key:"createTransportCapsule",value:function(e){var t=this.tim.packageConfig.get(e);return t?new $d(t):null}},{key:"request",value:function(e){var t=this.createTransportCapsule(e);return t||Ts.error("unknown transport capsule, please check!",e),this.tim.connectionController.request(t)}},{key:"emitInnerEvent",value:function(e,t){this.tim.innerEmitter.emit(e,t)}},{key:"emitOuterEvent",value:function(e,t){this.tim.outerEmitter.emit(e,t)}},{key:"reset",value:function(){Ts.warn(["method: IMController.reset() method must be implemented"].join())}},{key:"probeNetwork",value:function(){return this.tim.netMonitor.probe()}},{key:"getNetworkType",value:function(){return this.tim.netMonitor.getNetworkType()}},{key:"getPlatform",value:function(){return Wa}}]),e}(),Qd=function(){function e(t,n){Ln(this,e),this.data=t,this._innerEmitter=n,this.defaultData={},Object.assign(this.defaultData,t),this.initGetterAndSetter()}return bn(e,[{key:"initGetterAndSetter",value:function(){var e=this,t=function(t){Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){return e.data[t]},set:function(n){e.data[t]!==n&&(e.data[t]=n,e.onChange.bind(e)(t,n))}})};for(var n in e.data)Object.prototype.hasOwnProperty.call(e.data,n)&&t(n)}},{key:"onChange",value:function(e,t){this._innerEmitter.emit($h,{key:e,value:t})}},{key:"reset",value:function(){for(var e in Ts.log("Context.reset"),this.data)Object.prototype.hasOwnProperty.call(this.data,e)&&(this.data[e]=this.defaultData.hasOwnProperty(e)?this.defaultData[e]:null)}}]),e}(),Zd=function(e){qn(n,e);var t=zn(n);function n(e){var r;Ln(this,n);var o=(r=t.call(this,e)).tim.loginInfo;return r._context=new Qd({login:nc.IS_NOT_LOGIN,SDKAppID:o.SDKAppID,appIDAt3rd:null,accountType:o.accountType,identifier:o.identifier,tinyID:null,identifierNick:o.identifierNick,userSig:o.userSig,a2Key:null,contentType:"json",apn:1,unlimitedAVChatRoom:o.unlimitedAVChatRoom,scene:o.scene,oversea:o.oversea,instanceID:o.instanceID},r.tim.innerEmitter),r._initListener(),r}return bn(n,[{key:"reset",value:function(){this._context.reset(),this.emitInnerEvent(zh)}},{key:"_initListener",value:function(){this.tim.innerEmitter.on($h,this._onContextMemberChange,this),this.tim.innerEmitter.on(Td,this._updateA2KeyAndTinyID,this)}},{key:"_updateA2KeyAndTinyID",value:function(e){var t=e.data,n=t.a2Key,r=t.tinyID;this._context.a2Key=n,this._context.tinyID=r,this.emitInnerEvent(Wh),this.triggerReady()}},{key:"getContext",value:function(){return this._context}},{key:"_onContextMemberChange",value:function(e){var t=e.data,n=t.key,r=t.value;("tinyID"===n||"a2Key"===n)&&(r.length<=0?this._context.login=nc.IS_NOT_LOGIN:this._context.login=null!==this._context.a2Key?nc.IS_LOGIN:nc.IS_NOT_LOGIN)}}]),n}(Xd),eg=function e(t){Ln(this,e),this.code=0,this.data=t||{}},tg=null,ng=function(e){tg=e},rg=function(e){return e instanceof eg?(Ts.warn("IMPromise.resolve 此函数会自动用options创建IMResponse实例，调用侧不需创建，建议修改！"),Promise.resolve(e)):Promise.resolve(new eg(e))},og=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(e instanceof zp)return t&&null!==tg&&tg.emit(Cn.ERROR,e),Promise.reject(e);if(e instanceof Error){var n=new zp({code:Wp.UNCAUGHT_ERROR,message:e.message});return t&&null!==tg&&tg.emit(Cn.ERROR,n),Promise.reject(n)}if(Ls(e)||Ls(e.code)||Ls(e.message))Ts.error("IMPromise.reject 必须指定code(错误码)和message(错误信息)!!!");else{if(ks(e.code)&&As(e.message)){var r=new zp(e);return t&&null!==tg&&tg.emit(Cn.ERROR,r),Promise.reject(r)}Ts.error("IMPromise.reject code(错误码)必须为数字，message(错误信息)必须为字符串!!!")}},ig="sdkReady",ag="login",sg="longpolling",ug="longpollingAV",cg="sendMessage",lg="sendMessageC2C",pg="sendMessageGroupWork",fg="sendMessageGroupPublic",hg="sendMessageGroupMeeting",dg="sendMessageGroupAV",gg="messageReceived",mg="messageReceivedAV",vg="initConversationList",yg="initGroupList",_g="upload",Mg=function(){function e(t){Ln(this,e),this.SDKAppID="",this.version="",this.tinyID="",this.userID="",this.platform="",this.method=t,this.time="",this.startts=Date.now(),this.endts=0,this.timespan=0,this.codeint=0,this.message="",this.text="",this.msgType="",this.networkType="",this.platform="",this.scene="",this._sentFlag=!1,this.instanceID="",this.host=function(){var e="unknown";if(ls&&(e="mac"),cs&&(e="windows"),es&&(e="ios"),ts&&(e="android"),Ha)try{var t=za.getSystemInfoSync().platform;void 0!==t&&(e=t)}catch(E_){}return e}(),this.mpLibVersion=function(){if(Ha)try{var e;return void 0===(e=Ka?my.getSystemInfoSync().version:za.getSystemInfoSync().SDKVersion)?"-":e}catch(E_){return"-"}return"-"}()}return bn(e,[{key:"setCommonInfo",value:function(e){var t=e.SDKAppID,n=e.version,r=e.tinyID,o=e.userID,i=e.platform,a=e.scene,s=e.instanceID;this.SDKAppID="".concat(t),this.version="".concat(n),this.tinyID=r,this.userID=o,this.platform=i,this.scene=a,this.time=Bs(),this.instanceID=s,this.startts&&this.endts&&!this.timespan&&(this.timespan=Math.abs(this.endts-this.startts))}},{key:"setEnd",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this._sentFlag||(this.endts=Date.now(),t?(this._sentFlag=!0,this._eventStatController.pushIn(this)):setTimeout((function(){e._sentFlag=!0,e._eventStatController.pushIn(e)}),0))}},{key:"setError",value:function(e,t,n){return e instanceof Error?(this._sentFlag||(this.setNetworkType(n),t?(e.code&&this.setCode(e.code),e.message&&this.setMessage(e.message)):(this.setCode(Wp.NO_NETWORK),this.setMessage(th))),this):(Ts.warn("SSOLogData.setError value not instanceof Error, please check!"),this)}},{key:"setCode",value:function(e){return Ls(e)||this._sentFlag||("ECONNABORTED"===e&&(this.codeint=103),ks(e)?this.codeint=e:Ts.warn("SSOLogData.setCode value not a number, please check!",e,Nn(e))),this}},{key:"setMessage",value:function(e){return Ls(e)||this._sentFlag?this:As(e)?(this.message=e,this):this}},{key:"setText",value:function(e){return ks(e)?this.text=e.toString():As(e)&&(this.text=e),this}},{key:"setMessageType",value:function(e){return this.msgType=e,this}},{key:"setNetworkType",value:function(e){return Ls(e)?Ts.warn("SSOLogData.setNetworkType value is undefined, please check!"):this.networkType=e,this}}],[{key:"bindController",value:function(t){e.prototype._eventStatController=t}}]),e}(),Ig="sdkConstruct",Cg="sdkReady",Eg="accessLayer",Sg="login",Tg="logout",Dg="kickedOut",kg="registerPlugin",Ag="getCosAuthKey",Og="getCosPreSigUrl",Rg="upload",Ng="sendMessage",Lg="sendComboMessage",wg="getC2CRoamingMessages",bg="getGroupRoamingMessages",Pg="revokeMessage",Gg="setC2CMessageRead",Ug="setGroupMessageRead",qg="emptyMessageBody",xg="getPeerReadTime",Fg="uploadMergerMessage",Vg="downloadMergerMessage",Bg="getConversationList",jg="getConversationProfile",Kg="deleteConversation",Hg="getConversationListInStorage",$g="syncConversationList",zg="createGroup",Wg="applyJoinGroup",Yg="joinAVChatRoomSilently",Jg="quitGroup",Xg="searchGroupByID",Qg="changeGroupOwner",Zg="handleGroupApplication",em="setMessageRemindType",tm="dismissGroup",nm="updateGroupProfile",rm="getGroupList",om="getGroupProfile",im="getGroupListInStorage",am="getGroupLastSequence",sm="getGroupMemberList",um="getGroupMemberProfile",cm="addGroupMember",lm="deleteGroupMember",pm="setGroupMemberMuteTime",fm="setGroupMemberNameCard",hm="setGroupMemberRole",dm="setGroupMemberCustomField",gm="getGroupOnlineMemberCount",mm="getLongPollID",vm="longPollingError",ym="networkJitter",_m="sdkReload",Mm="messageLoss",Im="messageStacked",Cm="getUserProfile",Em="updateMyProfile",Sm="getBlacklist",Tm="addToBlacklist",Dm="removeFromBlacklist",km="mpHideToShow",Am="callbackFunctionError",Om="exceptionError",Rm=function(e){qn(n,e);var t=zn(n);function n(e){var r;return Ln(this,n),!0===(r=t.call(this,e)).tim.context.oversea&&Kh.HOST.setCurrent(jh),r._initializeListener(),r}return bn(n,[{key:"login",value:function(e){if(this.isLoggedIn()){var t="您已经登录账号".concat(e.identifier,"！如需切换账号登录，请先调用 logout 接口登出，再调用 login 接口登录。");return Ts.warn(t),rg({actionStatus:"OK",errorCode:0,errorInfo:t,repeatLogin:!0})}Ts.log("SignController.login userID=".concat(e.identifier)),Ts.time(ag);var n=this._checkLoginInfo(e);return cu(n)?(this.tim.context.identifier=e.identifier,this.tim.context.userSig=e.userSig,this.tim.context.identifier&&this.tim.context.userSig?this._accessLayer():void 0):og(n)}},{key:"_isLoginCurrentUser",value:function(e){return this.tim.context.identifier===e}},{key:"_initializeListener",value:function(){var e=this.tim.innerEmitter;e.on(ud,this._onMultipleAccountKickedOut,this),e.on(cd,this._onMultipleDeviceKickedOut,this),e.on(Ad,this._onUserSigExpired,this)}},{key:"_accessLayer",value:function(){var e=this,t=new Mg(Eg);return Ts.log("SignController._accessLayer."),this.request({name:"accessLayer",action:"query"}).then((function(n){return t.setNetworkType(e.getNetworkType()).setText(n.data.webImAccessLayer).setEnd(),Ts.log("SignController._accessLayer ok. webImAccessLayer=".concat(n.data.webImAccessLayer)),e.tim.context.oversea||n.data.webImAccessLayer!==Fh||Kh.HOST.setCurrent(n.data.webImAccessLayer),e._login()})).catch((function(n){return e.probeNetwork().then((function(r){var o=Wn(r,2),i=o[0],a=o[1];t.setError(n,i,a).setEnd(!0),e.tim.eventStatController.reportAtOnce()})),Ts.error("SignController._accessLayer failed. error:",n),og(n)}))}},{key:"_login",value:function(){var e=this,t=new Mg(Sg);return this.request({name:"login",action:"query"}).then((function(n){var r=null;if(!n.data.tinyID)throw r=new zp({code:Wp.NO_TINYID,message:Zp}),t.setError(r,!0,e.getNetworkType()).setEnd(),r;if(!n.data.a2Key)throw r=new zp({code:Wp.NO_A2KEY,message:ef}),t.setError(r,!0,e.getNetworkType()).setEnd(),r;return t.setNetworkType(e.getNetworkType()).setText("".concat(e.tim.loginInfo.identifier)).setEnd(),Ts.log("SignController.login ok. userID=".concat(e.tim.loginInfo.identifier," loginCost=").concat(Ts.timeEnd(ag),"ms")),e.emitInnerEvent(Td,{a2Key:n.data.a2Key,tinyID:n.data.tinyID}),rg(n.data)})).catch((function(n){return e.probeNetwork().then((function(e){var r=Wn(e,2),o=r[0],i=r[1];t.setError(n,o,i).setEnd(!0)})),Ts.error("SignController.login failed. error:",n),og(n)}))}},{key:"logout",value:function(){return this.isLoggedIn()?(new Mg(Tg).setNetworkType(this.getNetworkType()).setText("userID=".concat(this.tim.loginInfo.identifier," type=").concat("longPollLogout")).setEnd(!0),Ts.info("SignController.logout"),this.emitInnerEvent(Dd),this._logout(Sp).then(this._emitLogoutSuccess.bind(this)).catch(this._emitLogoutSuccess.bind(this))):og({code:Wp.USER_NOT_LOGGED_IN,message:tf})}},{key:"_logout",value:function(e){var t=this.tim.notificationController,n=e===Ep?"logout":"longPollLogout",r=e===Ep?{name:n,action:"query"}:{name:n,action:"query",param:{longPollID:t.getLongPollID()}};return this.request(r).catch((function(e){return Ts.error("SignController._logout error:",e),og(e)}))}},{key:"_checkLoginInfo",value:function(e){var t=0,n="";return null===e.SDKAppID?(t=Wp.NO_SDKAPPID,n=Yp):null===e.accountType?(t=Wp.NO_ACCOUNT_TYPE,n=Jp):null===e.identifier?(t=Wp.NO_IDENTIFIER,n=Xp):null===e.userSig&&(t=Wp.NO_USERSIG,n=Qp),cu(t)||cu(n)?{}:{code:t,message:n}}},{key:"_emitLogoutSuccess",value:function(){return this.emitInnerEvent(kd),rg({})}},{key:"_onMultipleAccountKickedOut",value:function(){var e=this;new Mg(Dg).setNetworkType(this.getNetworkType()).setText(En.KICKED_OUT_MULT_ACCOUNT).setEnd(!0),Ts.warn("SignController._onMultipleAccountKickedOut kicked out. userID=".concat(this.tim.loginInfo.identifier)),this.tim.logout().then((function(){e.emitOuterEvent(Cn.KICKED_OUT,{type:En.KICKED_OUT_MULT_ACCOUNT})}))}},{key:"_onMultipleDeviceKickedOut",value:function(){var e=this;new Mg(Dg).setNetworkType(this.getNetworkType()).setText(En.KICKED_OUT_MULT_DEVICE).setEnd(!0),Ts.warn("SignController._onMultipleDeviceKickedOut kicked out. userID=".concat(this.tim.loginInfo.identifier)),this.tim.logout().then((function(){e.emitOuterEvent(Cn.KICKED_OUT,{type:En.KICKED_OUT_MULT_DEVICE})}))}},{key:"_onUserSigExpired",value:function(){new Mg(Dg).setNetworkType(this.getNetworkType()).setText(En.KICKED_OUT_USERSIG_EXPIRED).setEnd(!0),Ts.warn("SignController._onUserSigExpired: userSig 签名过期被踢下线"),this.emitOuterEvent(Cn.KICKED_OUT,{type:En.KICKED_OUT_USERSIG_EXPIRED}),this.tim.resetSDK()}},{key:"reset",value:function(){Ts.info("SignController.reset")}}]),n}(Xd),Nm=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}},Lm=Object.prototype.toString;function wm(e){return"[object Array]"===Lm.call(e)}function bm(e){return void 0===e}function Pm(e){return null!==e&&"object"==typeof e}function Gm(e){return"[object Function]"===Lm.call(e)}function Um(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),wm(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}var qm={isArray:wm,isArrayBuffer:function(e){return"[object ArrayBuffer]"===Lm.call(e)},isBuffer:function(e){return null!==e&&!bm(e)&&null!==e.constructor&&!bm(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:Pm,isUndefined:bm,isDate:function(e){return"[object Date]"===Lm.call(e)},isFile:function(e){return"[object File]"===Lm.call(e)},isBlob:function(e){return"[object Blob]"===Lm.call(e)},isFunction:Gm,isStream:function(e){return Pm(e)&&Gm(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:Um,merge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,o=arguments.length;r<o;r++)Um(arguments[r],n);return t},deepMerge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]="object"==typeof n?e({},n):n}for(var r=0,o=arguments.length;r<o;r++)Um(arguments[r],n);return t},extend:function(e,t,n){return Um(t,(function(t,r){e[r]=n&&"function"==typeof t?Nm(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}};function xm(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var Fm=function(e,t,n){if(!t)return e;var r;if(n)r=n(t);else if(qm.isURLSearchParams(t))r=t.toString();else{var o=[];qm.forEach(t,(function(e,t){null!=e&&(qm.isArray(e)?t+="[]":e=[e],qm.forEach(e,(function(e){qm.isDate(e)?e=e.toISOString():qm.isObject(e)&&(e=JSON.stringify(e)),o.push(xm(t)+"="+xm(e))})))})),r=o.join("&")}if(r){var i=e.indexOf("#");-1!==i&&(e=e.slice(0,i)),e+=(-1===e.indexOf("?")?"?":"&")+r}return e};function Vm(){this.handlers=[]}Vm.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},Vm.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},Vm.prototype.forEach=function(e){qm.forEach(this.handlers,(function(t){null!==t&&e(t)}))};var Bm=Vm,jm=function(e,t,n){return qm.forEach(n,(function(n){e=n(e,t)})),e},Km=function(e){return!(!e||!e.__CANCEL__)};function Hm(){throw new Error("setTimeout has not been defined")}function $m(){throw new Error("clearTimeout has not been defined")}var zm=Hm,Wm=$m;function Ym(e){if(zm===setTimeout)return setTimeout(e,0);if((zm===Hm||!zm)&&setTimeout)return zm=setTimeout,setTimeout(e,0);try{return zm(e,0)}catch(t){try{return zm.call(null,e,0)}catch(t){return zm.call(this,e,0)}}}"function"==typeof vs.setTimeout&&(zm=setTimeout),"function"==typeof vs.clearTimeout&&(Wm=clearTimeout);var Jm,Xm=[],Qm=!1,Zm=-1;function ev(){Qm&&Jm&&(Qm=!1,Jm.length?Xm=Jm.concat(Xm):Zm=-1,Xm.length&&tv())}function tv(){if(!Qm){var e=Ym(ev);Qm=!0;for(var t=Xm.length;t;){for(Jm=Xm,Xm=[];++Zm<t;)Jm&&Jm[Zm].run();Zm=-1,t=Xm.length}Jm=null,Qm=!1,function(e){if(Wm===clearTimeout)return clearTimeout(e);if((Wm===$m||!Wm)&&clearTimeout)return Wm=clearTimeout,clearTimeout(e);try{Wm(e)}catch(t){try{return Wm.call(null,e)}catch(t){return Wm.call(this,e)}}}(e)}}function nv(e,t){this.fun=e,this.array=t}nv.prototype.run=function(){this.fun.apply(null,this.array)};function rv(){}var ov=rv,iv=rv,av=rv,sv=rv,uv=rv,cv=rv,lv=rv;var pv=vs.performance||{},fv=pv.now||pv.mozNow||pv.msNow||pv.oNow||pv.webkitNow||function(){return(new Date).getTime()};var hv=new Date;var dv={nextTick:function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];Xm.push(new nv(e,t)),1!==Xm.length||Qm||Ym(tv)},title:"browser",browser:!0,env:{},argv:[],version:"",versions:{},on:ov,addListener:iv,once:av,off:sv,removeListener:uv,removeAllListeners:cv,emit:lv,binding:function(e){throw new Error("process.binding is not supported")},cwd:function(){return"/"},chdir:function(e){throw new Error("process.chdir is not supported")},umask:function(){return 0},hrtime:function(e){var t=.001*fv.call(pv),n=Math.floor(t),r=Math.floor(t%1*1e9);return e&&(n-=e[0],(r-=e[1])<0&&(n--,r+=1e9)),[n,r]},platform:"browser",release:{},config:{},uptime:function(){return(new Date-hv)/1e3}},gv=function(e,t){qm.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))},mv=function(e,t,n,r,o){return function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}(new Error(e),t,n,r,o)},vv=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],yv=qm.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function r(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=r(window.location.href),function(t){var n=qm.isString(t)?r(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0},_v=qm.isStandardBrowserEnv()?{write:function(e,t,n,r,o,i){var a=[];a.push(e+"="+encodeURIComponent(t)),qm.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),qm.isString(r)&&a.push("path="+r),qm.isString(o)&&a.push("domain="+o),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}},Mv=function(e){return new Promise((function(t,n){var r=e.data,o=e.headers;qm.isFormData(r)&&delete o["Content-Type"];var i=new XMLHttpRequest;if(e.auth){var a=e.auth.username||"",s=e.auth.password||"";o.Authorization="Basic "+btoa(a+":"+s)}var u,c,l=(u=e.baseURL,c=e.url,u&&!/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(c)?function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}(u,c):c);if(i.open(e.method.toUpperCase(),Fm(l,e.params,e.paramsSerializer),!0),i.timeout=e.timeout,i.onreadystatechange=function(){if(i&&4===i.readyState&&(0!==i.status||i.responseURL&&0===i.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in i?function(e){var t,n,r,o={};return e?(qm.forEach(e.split("\n"),(function(e){if(r=e.indexOf(":"),t=qm.trim(e.substr(0,r)).toLowerCase(),n=qm.trim(e.substr(r+1)),t){if(o[t]&&vv.indexOf(t)>=0)return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([n]):o[t]?o[t]+", "+n:n}})),o):o}(i.getAllResponseHeaders()):null,o={data:e.responseType&&"text"!==e.responseType?i.response:i.responseText,status:i.status,statusText:i.statusText,headers:r,config:e,request:i};!function(e,t,n){var r=n.config.validateStatus;!r||r(n.status)?e(n):t(mv("Request failed with status code "+n.status,n.config,null,n.request,n))}(t,n,o),i=null}},i.onabort=function(){i&&(n(mv("Request aborted",e,"ECONNABORTED",i)),i=null)},i.onerror=function(){n(mv("Network Error",e,null,i)),i=null},i.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(mv(t,e,"ECONNABORTED",i)),i=null},qm.isStandardBrowserEnv()){var p=_v,f=(e.withCredentials||yv(l))&&e.xsrfCookieName?p.read(e.xsrfCookieName):void 0;f&&(o[e.xsrfHeaderName]=f)}if("setRequestHeader"in i&&qm.forEach(o,(function(e,t){void 0===r&&"content-type"===t.toLowerCase()?delete o[t]:i.setRequestHeader(t,e)})),qm.isUndefined(e.withCredentials)||(i.withCredentials=!!e.withCredentials),e.responseType)try{i.responseType=e.responseType}catch(h){if("json"!==e.responseType)throw h}"function"==typeof e.onDownloadProgress&&i.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&i.upload&&i.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){i&&(i.abort(),n(e),i=null)})),void 0===r&&(r=null),i.send(r)}))},Iv={"Content-Type":"application/x-www-form-urlencoded"};function Cv(e,t){!qm.isUndefined(e)&&qm.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var Ev,Sv={adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==dv&&"[object process]"===Object.prototype.toString.call(dv))&&(Ev=Mv),Ev),transformRequest:[function(e,t){return gv(t,"Accept"),gv(t,"Content-Type"),qm.isFormData(e)||qm.isArrayBuffer(e)||qm.isBuffer(e)||qm.isStream(e)||qm.isFile(e)||qm.isBlob(e)?e:qm.isArrayBufferView(e)?e.buffer:qm.isURLSearchParams(e)?(Cv(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):qm.isObject(e)?(Cv(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(t){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};Sv.headers={common:{Accept:"application/json, text/plain, */*"}},qm.forEach(["delete","get","head"],(function(e){Sv.headers[e]={}})),qm.forEach(["post","put","patch"],(function(e){Sv.headers[e]=qm.merge(Iv)}));var Tv=Sv;function Dv(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var kv=function(e){return Dv(e),e.headers=e.headers||{},e.data=jm(e.data,e.headers,e.transformRequest),e.headers=qm.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),qm.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||Tv.adapter)(e).then((function(t){return Dv(e),t.data=jm(t.data,t.headers,e.transformResponse),t}),(function(t){return Km(t)||(Dv(e),t&&t.response&&(t.response.data=jm(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))},Av=function(e,t){t=t||{};var n={},r=["url","method","params","data"],o=["headers","auth","proxy"],i=["baseURL","url","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"];qm.forEach(r,(function(e){void 0!==t[e]&&(n[e]=t[e])})),qm.forEach(o,(function(r){qm.isObject(t[r])?n[r]=qm.deepMerge(e[r],t[r]):void 0!==t[r]?n[r]=t[r]:qm.isObject(e[r])?n[r]=qm.deepMerge(e[r]):void 0!==e[r]&&(n[r]=e[r])})),qm.forEach(i,(function(r){void 0!==t[r]?n[r]=t[r]:void 0!==e[r]&&(n[r]=e[r])}));var a=r.concat(o).concat(i),s=Object.keys(t).filter((function(e){return-1===a.indexOf(e)}));return qm.forEach(s,(function(r){void 0!==t[r]?n[r]=t[r]:void 0!==e[r]&&(n[r]=e[r])})),n};function Ov(e){this.defaults=e,this.interceptors={request:new Bm,response:new Bm}}Ov.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=Av(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[kv,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},Ov.prototype.getUri=function(e){return e=Av(this.defaults,e),Fm(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},qm.forEach(["delete","get","head","options"],(function(e){Ov.prototype[e]=function(t,n){return this.request(qm.merge(n||{},{method:e,url:t}))}})),qm.forEach(["post","put","patch"],(function(e){Ov.prototype[e]=function(t,n,r){return this.request(qm.merge(r||{},{method:e,url:t,data:n}))}}));var Rv=Ov;function Nv(e){this.message=e}Nv.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},Nv.prototype.__CANCEL__=!0;var Lv=Nv;function wv(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new Lv(e),t(n.reason))}))}wv.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},wv.source=function(){var e;return{token:new wv((function(t){e=t})),cancel:e}};var bv=wv;function Pv(e){var t=new Rv(e),n=Nm(Rv.prototype.request,t);return qm.extend(n,Rv.prototype,t),qm.extend(n,t),n}var Gv=Pv(Tv);Gv.Axios=Rv,Gv.create=function(e){return Pv(Av(Gv.defaults,e))},Gv.Cancel=Lv,Gv.CancelToken=bv,Gv.isCancel=Km,Gv.all=function(e){return Promise.all(e)},Gv.spread=function(e){return function(t){return e.apply(null,t)}};var Uv=Gv,qv=Gv;Uv.default=qv;var xv=Uv,Fv=xv.create({timeout:3e4,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}});Fv.interceptors.response.use((function(e){var t=e.data,n=t.error_code,r=t.ErrorCode;return ks(n)&&(r=n),r!==tc.SUCCESS&&(e.data.ErrorCode=Number(r)),e}),(function(e){return"Network Error"===e.message&&(!0===Fv.defaults.withCredentials&&Ts.warn("Network Error, try to close `IMAxios.defaults.withCredentials` to false. (IMAxios.js)"),Fv.defaults.withCredentials=!1),Promise.reject(e)}));var Vv=function(){function e(){Ln(this,e)}return bn(e,[{key:"request",value:function(e){console.warn("请注意： ConnectionBase.request() 方法必须被派生类重写:")}},{key:"_checkOptions",value:function(e){if(!1==!!e.url)throw new zp({code:Wp.NETWORK_BASE_OPTIONS_NO_URL,message:Qf})}},{key:"_initOptions",value:function(e){e.method=["POST","GET","PUT","DELETE","OPTION"].indexOf(e.method)>=0?e.method:"POST",e.dataType=e.dataType||"json",e.responseType=e.responseType||"json"}}]),e}(),Bv=function(e){qn(n,e);var t=zn(n);function n(){var e;return Ln(this,n),(e=t.call(this)).retry=2,e}return bn(n,[{key:"request",value:function(e){return this._checkOptions(e),this._initOptions(e),this._requestWithRetry({url:e.url,data:e.data,method:e.method})}},{key:"_requestWithRetry",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Fv(e).catch((function(r){return t.retry&&n<t.retry?t._requestWithRetry(e,++n):og(new zp({code:r.code||"",message:r.message||""}))}))}}]),n}(Vv),jv=function(e){qn(n,e);var t=zn(n);function n(){var e;return Ln(this,n),(e=t.call(this)).retry=2,e._request=e.promisify(za.request),e}return bn(n,[{key:"request",value:function(e){return this._checkOptions(e),this._initOptions(e),e=Un(Un({},e),{},{responseType:"text"}),this._requestWithRetry(e)}},{key:"_requestWithRetry",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this._request(e).then(this._handleResolve).catch((function(r){if(As(r.errMsg)){if(r.errMsg.includes("abort"))return rg({});if(r.errMsg.includes("timeout"))return t.retry>0&&n<t.retry?t._requestWithRetry(e,++n):og(new zp({code:Wp.NETWORK_TIMEOUT,message:r.errMsg}));if(r.errMsg.includes("fail"))return t.retry>0&&n<t.retry?t._requestWithRetry(e,++n):og(new zp({code:Wp.NETWORK_ERROR,message:r.errMsg}))}return og(new zp(Un({code:Wp.UNCAUGHT_ERROR,message:r.message},r)))}))}},{key:"_handleResolve",value:function(e){var t=e.data,n=t.error_code,r=t.ErrorCode;return ks(n)&&(r=n),r!==tc.SUCCESS&&(e.data.ErrorCode=Number("".concat(r))),e}},{key:"promisify",value:function(e){return function(t){return new Promise((function(n,r){var o=e(Object.assign({},t,{success:n,fail:r}));t.updateAbort&&t.updateAbort((function(){o&&bs(o.abort)&&o.abort()}))}))}}}]),n}(Vv),Kv=function(){function e(){Ln(this,e),this.request=0,this.success=0,this.fail=0,this.reportRate=10,this.requestTimeCost=[]}return bn(e,[{key:"report",value:function(){if(1!==this.request){if(this.request%this.reportRate!=0)return null;var e=this.avgRequestTime(),t="runLoop reports: success=".concat(this.success,",fail=").concat(this.fail,",total=").concat(this.request,",avg=").concat(e,",cur=").concat(this.requestTimeCost[this.requestTimeCost.length-1],",max=").concat(Math.max.apply(null,this.requestTimeCost),",min=").concat(Math.min.apply(null,this.requestTimeCost));Ts.log(t)}}},{key:"setRequestTime",value:function(e,t){var n=Math.abs(t-e);100===this.requestTimeCost.length&&this.requestTimeCost.shift(),this.requestTimeCost.push(n)}},{key:"avgRequestTime",value:function(){for(var e,t=this.requestTimeCost.length,n=0,r=0;r<t;r++)n+=this.requestTimeCost[r];return e=n/t,Math.round(100*e)/100}}]),e}(),Hv=xv.create({timeout:6e3,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}});Hv.interceptors.response.use((function(e){var t=e.data,n=t.error_code,r=t.ErrorCode;return ks(n)&&(r=n),r!==tc.SUCCESS&&(e.data.ErrorCode=Number(r)),e}),(function(e){return"Network Error"===e.message&&(!0===Hv.defaults.withCredentials&&Ts.warn("Network Error, try to close `IMAxiosAVChatroom.defaults.withCredentials` to false. (IMAxiosAVChatroom.js)"),Hv.defaults.withCredentials=!1),Promise.reject(e)}));var $v=xv.CancelToken,zv=function(){function e(t){Ln(this,e),this._initializeOptions(t),this._initializeMembers(),this.status=new Kv}return bn(e,[{key:"destructor",value:function(){clearTimeout(this._seedID);var e=this._index();for(var t in this)Object.prototype.hasOwnProperty.call(this,t)&&(this[t]=null);return e}},{key:"setIndex",value:function(e){this._index=e}},{key:"getIndex",value:function(){return this._index}},{key:"isRunning",value:function(){return!this._stoped}},{key:"_initializeOptions",value:function(e){this.options=e}},{key:"_initializeMembers",value:function(){this._index=-1,this._seedID=0,this._requestStatus=!1,this._stoped=!1,this._intervalTime=0,this._intervalIncreaseStep=1e3,this._intervalDecreaseStep=1e3,this._intervalTimeMax=5e3,this._protectTimeout=3e3,this._getNoticeSeq=this.options.getNoticeSeq,this._retryCount=0,this._responseTime=Date.now(),this._responseTimeThreshold=2e3,this.options.isAVChatRoomLoop?this.requestor=Hv:this.requestor=Fv,Ts.log("XHRRunLoop._initializeMembers isAVChatRoomLoop=".concat(!!this.options.isAVChatRoomLoop)),this.abort=null}},{key:"start",value:function(){0===this._seedID?(this._stoped=!1,this._send()):Ts.log('XHRRunLoop.start(), XHRRunLoop is running now, if you want to restart runLoop , please run "stop()" first.')}},{key:"_reset",value:function(){Ts.log("XHRRunLoop._reset(), reset long poll _intervalTime",this._intervalTime),this.stop(),this.start()}},{key:"_intervalTimeIncrease",value:function(){this._intervalTime!==this._responseTimeThreshold&&(this._intervalTime<this._responseTimeThreshold&&(this._intervalTime+=this._intervalIncreaseStep),this._intervalTime>this._responseTimeThreshold&&(this._intervalTime=this._responseTimeThreshold))}},{key:"_intervalTimeDecrease",value:function(){0!==this._intervalTime&&(this._intervalTime>0&&(this._intervalTime-=this._intervalDecreaseStep),this._intervalTime<0&&(this._intervalTime=0))}},{key:"_intervalTimeAdjustment",value:function(){var e=Date.now();100*Math.floor((e-this._responseTime)/100)<=this._responseTimeThreshold?this._intervalTimeIncrease():this._intervalTimeDecrease(),this._responseTime=e}},{key:"_intervalTimeAdjustmentBaseOnResponseData",value:function(e){e.ErrorCode===tc.SUCCESS?this._intervalTimeDecrease():this._intervalTimeIncrease()}},{key:"_send",value:function(){var e=this;if(!0!==this._requestStatus){this._requestStatus=!0,this.status.request++,"function"==typeof this.options.before&&this.options.before(this.options.pack.requestData);var t=Date.now(),n=0;this.requestor.request({url:this.options.pack.getUrl(),data:this.options.pack.requestData,method:this.options.pack.method,cancelToken:new $v((function(t){e.abort=t}))}).then((function(r){if(e._intervalTimeAdjustmentBaseOnResponseData.bind(e)(r.data),e._retryCount>0&&(e._retryCount=0),e.status.success++,n=Date.now(),e.status.setRequestTime(t,n),r.data.timecost=n-t,"function"==typeof e.options.success)try{e.options.success({pack:e.options.pack,error:!1,data:e.options.pack.callback(r.data)})}catch(o){Ts.warn("XHRRunLoop._send(), error:",o)}e._requestStatus=!1,!1===e._stoped&&(e._seedID=setTimeout(e._send.bind(e),e._intervalTime)),e.status.report()})).catch((function(r){if(e.status.fail++,e._retryCount++,e._intervalTimeAdjustment.bind(e)(),!1===e._stoped&&(e._seedID=setTimeout(e._send.bind(e),e._intervalTime)),e._requestStatus=!1,"function"==typeof e.options.fail&&void 0!==r.request)try{e.options.fail({pack:e.options.pack,error:r,data:!1})}catch(o){Ts.warn("XHRRunLoop._send(), fail callback error:",o),Ts.error(o)}n=Date.now(),e.status.setRequestTime(t,n),e.status.report()}))}}},{key:"stop",value:function(){this._clearAllTimeOut(),this._stoped=!0}},{key:"_clearAllTimeOut",value:function(){clearTimeout(this._seedID),this._seedID=0}}]),e}(),Wv=function(){function e(t){Ln(this,e),this._initializeOptions(t),this._initializeMembers(),this.status=new Kv}return bn(e,[{key:"destructor",value:function(){clearTimeout(this._seedID);var e=this._index();for(var t in this)Object.prototype.hasOwnProperty.call(this,t)&&(this[t]=null);return e}},{key:"setIndex",value:function(e){this._index=e}},{key:"isRunning",value:function(){return!this._stoped}},{key:"getIndex",value:function(){return this._index}},{key:"_initializeOptions",value:function(e){this.options=e}},{key:"_initializeMembers",value:function(){this._index=-1,this._seedID=0,this._requestStatus=!1,this._stoped=!1,this._intervalTime=0,this._intervalIncreaseStep=1e3,this._intervalDecreaseStep=1e3,this._intervalTimeMax=5e3,this._protectTimeout=3e3,this._getNoticeSeq=this.options.getNoticeSeq,this._retryCount=0,this._responseTime=Date.now(),this._responseTimeThreshold=2e3,this.requestor=new jv,this.abort=null}},{key:"start",value:function(){0===this._seedID?(this._stoped=!1,this._send()):Ts.log('WXRunLoop.start(): WXRunLoop is running now, if you want to restart runLoop , please run "stop()" first.')}},{key:"_reset",value:function(){Ts.log("WXRunLoop.reset(), long poll _intervalMaxRate",this._intervalMaxRate),this.stop(),this.start()}},{key:"_intervalTimeIncrease",value:function(){this._intervalTime!==this._responseTimeThreshold&&(this._intervalTime<this._responseTimeThreshold&&(this._intervalTime+=this._intervalIncreaseStep),this._intervalTime>this._responseTimeThreshold&&(this._intervalTime=this._responseTimeThreshold))}},{key:"_intervalTimeDecrease",value:function(){0!==this._intervalTime&&(this._intervalTime>0&&(this._intervalTime-=this._intervalDecreaseStep),this._intervalTime<0&&(this._intervalTime=0))}},{key:"_intervalTimeAdjustment",value:function(){var e=Date.now();100*Math.floor((e-this._responseTime)/100)<=this._responseTimeThreshold?this._intervalTimeIncrease():this._intervalTimeDecrease(),this._responseTime=e}},{key:"_intervalTimeAdjustmentBaseOnResponseData",value:function(e){e.ErrorCode===tc.SUCCESS?this._intervalTimeDecrease():this._intervalTimeIncrease()}},{key:"_send",value:function(){var e=this;if(!0!==this._requestStatus){var t=this;this._requestStatus=!0,this.status.request++,"function"==typeof this.options.before&&this.options.before(t.options.pack.requestData);var n=Date.now(),r=0;this.requestor.request({url:t.options.pack.getUrl(),data:t.options.pack.requestData,method:t.options.pack.method,updateAbort:function(t){e.abort=t}}).then((function(o){if(t._intervalTimeAdjustmentBaseOnResponseData.bind(e)(o.data),t._retryCount>0&&(t._retryCount=0),e.status.success++,r=Date.now(),e.status.setRequestTime(n,r),o.data.timecost=r-n,"function"==typeof t.options.success)try{e.options.success({pack:e.options.pack,error:!1,data:e.options.pack.callback(o.data)})}catch(i){Ts.warn("WXRunLoop._send(), error:",i)}t._requestStatus=!1,!1===t._stoped&&(t._seedID=setTimeout(t._send.bind(t),t._intervalTime)),e.status.report()})).catch((function(o){if(e.status.fail++,t._retryCount++,t._intervalTimeAdjustment.bind(e)(),!1===t._stoped&&(t._seedID=setTimeout(t._send.bind(t),t._intervalTime)),t._requestStatus=!1,"function"==typeof t.options.fail)try{e.options.fail({pack:e.options.pack,error:o,data:!1})}catch(i){Ts.warn("WXRunLoop._send(), fail callback error:",i),Ts.error(i)}r=Date.now(),e.status.setRequestTime(n,r),e.status.report()}))}}},{key:"stop",value:function(){this._clearAllTimeOut(),this._stoped=!0}},{key:"_clearAllTimeOut",value:function(){clearTimeout(this._seedID),this._seedID=0}}]),e}(),Yv=function(){function e(t){Ln(this,e),this.tim=t,this.httpConnection=Ha?new jv:new Bv,this.keepAliveConnections=[]}return bn(e,[{key:"initializeListener",value:function(){this.tim.innerEmitter.on(Dd,this._stopAllRunLoop,this)}},{key:"request",value:function(e){var t={url:e.url,data:e.requestData,method:e.method,callback:e.callback};return this.httpConnection.request(t).then((function(t){return t.data=e.callback(t.data),t.data.errorCode!==tc.SUCCESS?og(new zp({code:t.data.errorCode,message:t.data.errorInfo||t.data.errorMsg})):t}))}},{key:"createRunLoop",value:function(e){var t=this.createKeepAliveConnection(e);return t.setIndex(this.keepAliveConnections.push(t)-1),t}},{key:"stopRunLoop",value:function(e){e.stop()}},{key:"_stopAllRunLoop",value:function(){for(var e=this.keepAliveConnections.length,t=0;t<e;t++)this.keepAliveConnections[t].stop()}},{key:"destroyRunLoop",value:function(e){e.stop();var t=e.destructor();this.keepAliveConnections.slice(t,1)}},{key:"startRunLoopExclusive",value:function(e){for(var t=e.getIndex(),n=0;n<this.keepAliveConnections.length;n++)n!==t&&this.keepAliveConnections[n].stop();e.start()}},{key:"createKeepAliveConnection",value:function(e){return Ha?new Wv(e):(this.tim.options.runLoopNetType===Cp||this.tim.options.runLoopNetType,new zv(e))}},{key:"clearAll",value:function(){this.conn.cancelAll()}},{key:"reset",value:function(){this.keepAliveConnections=[]}}]),e}(),Jv=function(){function e(t){Ln(this,e),this.tim=t,this.tim.innerEmitter.on(Od,this._onErrorDetected,this)}return bn(e,[{key:"_onErrorDetected",value:function(e){var t=e.data;new Mg(Om).setText("code=".concat(t.code," message=").concat(t.message)).setNetworkType(this.tim.netMonitor.getNetworkType()).setEnd(),t.code?Ts.warn("Oops! code:".concat(t.code," message:").concat(t.message)):Ts.warn("Oops! message:".concat(t.message," stack:").concat(t.stack)),this.tim.outerEmitter.emit(Cn.ERROR,t)}}]),e}(),Xv=function(){function e(t){var n=this;Ln(this,e),cu(t)||(this.userID=t.userID||"",this.nick=t.nick||"",this.gender=t.gender||"",this.birthday=t.birthday||0,this.location=t.location||"",this.selfSignature=t.selfSignature||"",this.allowType=t.allowType||En.ALLOW_TYPE_ALLOW_ANY,this.language=t.language||0,this.avatar=t.avatar||"",this.messageSettings=t.messageSettings||0,this.adminForbidType=t.adminForbidType||En.FORBID_TYPE_NONE,this.level=t.level||0,this.role=t.role||0,this.lastUpdatedTime=0,this.profileCustomField=[],cu(t.profileCustomField)||t.profileCustomField.forEach((function(e){n.profileCustomField.push({key:e.key,value:e.value})})))}return bn(e,[{key:"validate",value:function(e){var t=!0,n="";if(cu(e))return{valid:!1,tips:"empty options"};if(e.profileCustomField)for(var r=e.profileCustomField.length,o=null,i=0;i<r;i++){if(o=e.profileCustomField[i],!As(o.key)||-1===o.key.indexOf("Tag_Profile_Custom"))return{valid:!1,tips:"自定义资料字段的前缀必须是 Tag_Profile_Custom"};if(!As(o.value))return{valid:!1,tips:"自定义资料字段的 value 必须是字符串"}}for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){if("profileCustomField"===a)continue;if(cu(e[a])&&!As(e[a])&&!ks(e[a])){n="key:"+a+", invalid value:"+e[a],t=!1;continue}switch(a){case"nick":As(e[a])||(n="nick should be a string",t=!1),js(e[a])>500&&(n="nick name limited: must less than or equal to ".concat(500," bytes, current size: ").concat(js(e[a])," bytes"),t=!1);break;case"gender":zs(Dp,e.gender)||(n="key:gender, invalid value:"+e.gender,t=!1);break;case"birthday":ks(e.birthday)||(n="birthday should be a number",t=!1);break;case"location":As(e.location)||(n="location should be a string",t=!1);break;case"selfSignature":As(e.selfSignature)||(n="selfSignature should be a string",t=!1);break;case"allowType":zs(Ap,e.allowType)||(n="key:allowType, invalid value:"+e.allowType,t=!1);break;case"language":ks(e.language)||(n="language should be a number",t=!1);break;case"avatar":As(e.avatar)||(n="avatar should be a string",t=!1);break;case"messageSettings":0!==e.messageSettings&&1!==e.messageSettings&&(n="messageSettings should be 0 or 1",t=!1);break;case"adminForbidType":zs(kp,e.adminForbidType)||(n="key:adminForbidType, invalid value:"+e.adminForbidType,t=!1);break;case"level":ks(e.level)||(n="level should be a number",t=!1);break;case"role":ks(e.role)||(n="role should be a number",t=!1);break;default:n="unknown key:"+a+"  "+e[a],t=!1}}return{valid:t,tips:n}}}]),e}(),Qv=function(){function e(t){Ln(this,e),this.userController=t,this.TAG="profile",this.Actions={Q:"query",U:"update"},this.accountProfileMap=new Map,this.expirationTime=864e5}return bn(e,[{key:"setExpirationTime",value:function(e){this.expirationTime=e}},{key:"getUserProfile",value:function(e){var t=this,n=e.userIDList;e.fromAccount=this.userController.getMyAccount(),n.length>100&&(Ts.warn("ProfileHandler.getUserProfile 获取用户资料人数不能超过100人"),n.length=100);for(var r,o=[],i=[],a=0,s=n.length;a<s;a++)r=n[a],this.userController.isMyFriend(r)&&this._containsAccount(r)?i.push(this._getProfileFromMap(r)):o.push(r);if(0===o.length)return rg(i);e.toAccount=o;var u=e.bFromGetMyProfile||!1,c=[];e.toAccount.forEach((function(e){c.push({toAccount:e,standardSequence:0,customSequence:0})})),e.userItem=c;var l=new Mg(Cm);l.setText(n.length>5?"userIDList.length=".concat(n.length):"userIDList=".concat(n));var p=this.userController.generateConfig(this.TAG,this.Actions.Q,e);return this.userController.request(p).then((function(e){l.setNetworkType(t.userController.getNetworkType()).setEnd(),Ts.info("ProfileHandler.getUserProfile ok");var n=t._handleResponse(e).concat(i);return u?(t.userController.onGotMyProfile(),new eg(n[0])):new eg(n)})).catch((function(e){return t.userController.probeNetwork().then((function(t){var n=Wn(t,2),r=n[0],o=n[1];l.setError(e,r,o).setEnd()})),Ts.error("ProfileHandler.getUserProfile error:",e),og(e)}))}},{key:"getMyProfile",value:function(){var e=this.userController.getMyAccount();if(Ts.log("ProfileHandler.getMyProfile myAccount="+e),this._fillMap(),this._containsAccount(e)){var t=this._getProfileFromMap(e);return Ts.debug("ProfileHandler.getMyProfile from cache, myProfile:"+JSON.stringify(t)),this.userController.onGotMyProfile(),rg(t)}return this.getUserProfile({fromAccount:e,userIDList:[e],bFromGetMyProfile:!0})}},{key:"_handleResponse",value:function(e){for(var t,n,r=xs.now(),o=e.data.userProfileItem,i=[],a=0,s=o.length;a<s;a++)"@TLS#NOT_FOUND"!==o[a].to&&""!==o[a].to&&(t=o[a].to,n=this._updateMap(t,this._getLatestProfileFromResponse(t,o[a].profileItem)),i.push(n));return Ts.log("ProfileHandler._handleResponse cost "+(xs.now()-r)+" ms"),i}},{key:"_getLatestProfileFromResponse",value:function(e,t){var n={};if(n.userID=e,n.profileCustomField=[],!cu(t))for(var r=0,o=t.length;r<o;r++)if(t[r].tag.indexOf("Tag_Profile_Custom")>-1)n.profileCustomField.push({key:t[r].tag,value:t[r].value});else switch(t[r].tag){case Tp.NICK:n.nick=t[r].value;break;case Tp.GENDER:n.gender=t[r].value;break;case Tp.BIRTHDAY:n.birthday=t[r].value;break;case Tp.LOCATION:n.location=t[r].value;break;case Tp.SELFSIGNATURE:n.selfSignature=t[r].value;break;case Tp.ALLOWTYPE:n.allowType=t[r].value;break;case Tp.LANGUAGE:n.language=t[r].value;break;case Tp.AVATAR:n.avatar=t[r].value;break;case Tp.MESSAGESETTINGS:n.messageSettings=t[r].value;break;case Tp.ADMINFORBIDTYPE:n.adminForbidType=t[r].value;break;case Tp.LEVEL:n.level=t[r].value;break;case Tp.ROLE:n.role=t[r].value;break;default:Ts.warn("ProfileHandler._handleResponse unkown tag->",t[r].tag,t[r].value)}return n}},{key:"updateMyProfile",value:function(e){var t=this,n=new Mg(Em);n.setText(JSON.stringify(e));var r=(new Xv).validate(e);if(!r.valid)return n.setCode(Wp.UPDATE_PROFILE_INVALID_PARAM).setMessage("ProfileHandler.updateMyProfile info:".concat(r.tips)).setNetworkType(this.userController.getNetworkType()).setEnd(),Ts.error("ProfileHandler.updateMyProfile info:".concat(r.tips,"，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#updateMyProfile")),og({code:Wp.UPDATE_PROFILE_INVALID_PARAM,message:zf});var o=[];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&("profileCustomField"===i?e.profileCustomField.forEach((function(e){o.push({tag:e.key,value:e.value})})):o.push({tag:Tp[i.toUpperCase()],value:e[i]}));if(0===o.length)return n.setCode(Wp.UPDATE_PROFILE_NO_KEY).setMessage(Wf).setNetworkType(this.userController.getNetworkType()).setEnd(),Ts.error("ProfileHandler.updateMyProfile info:".concat(Wf,"，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#updateMyProfile")),og({code:Wp.UPDATE_PROFILE_NO_KEY,message:Wf});var a=this.userController.generateConfig(this.TAG,this.Actions.U,{fromAccount:this.userController.getMyAccount(),profileItem:o});return this.userController.request(a).then((function(r){n.setNetworkType(t.userController.getNetworkType()).setEnd(),Ts.info("ProfileHandler.updateMyProfile ok");var o=t._updateMap(t.userController.getMyAccount(),e);return t.userController.emitOuterEvent(Cn.PROFILE_UPDATED,[o]),rg(o)})).catch((function(e){return t.userController.probeNetwork().then((function(t){var r=Wn(t,2),o=r[0],i=r[1];n.setError(e,o,i).setEnd()})),Ts.error("ProfileHandler.updateMyProfile error:",e),og(e)}))}},{key:"onProfileModified",value:function(e){var t=e.data;if(!cu(t)){var n,r,o=t.length;Ts.info("ProfileHandler.onProfileModified length="+o);for(var i=[],a=0;a<o;a++)n=t[a].userID,r=this._updateMap(n,this._getLatestProfileFromResponse(n,t[a].profileList)),i.push(r);this.userController.emitInnerEvent(wd,i),this.userController.emitOuterEvent(Cn.PROFILE_UPDATED,i)}}},{key:"_fillMap",value:function(){if(0===this.accountProfileMap.size){for(var e=this._getCachedProfiles(),t=Date.now(),n=0,r=e.length;n<r;n++)t-e[n].lastUpdatedTime<this.expirationTime&&this.accountProfileMap.set(e[n].userID,e[n]);Ts.log("ProfileHandler._fillMap from cache, map.size="+this.accountProfileMap.size)}}},{key:"_updateMap",value:function(e,t){var n,r=Date.now();return this._containsAccount(e)?(n=this._getProfileFromMap(e),t.profileCustomField&&Xs(n.profileCustomField,t.profileCustomField),Fs(n,t,["profileCustomField"]),n.lastUpdatedTime=r):(n=new Xv(t),(this.userController.isMyFriend(e)||e===this.userController.getMyAccount())&&(n.lastUpdatedTime=r,this.accountProfileMap.set(e,n))),this._flushMap(e===this.userController.getMyAccount()),n}},{key:"_flushMap",value:function(e){var t=Yn(this.accountProfileMap.values()),n=this.userController.tim.storage;Ts.debug("ProfileHandler._flushMap length=".concat(t.length," flushAtOnce=").concat(e)),n.setItem(this.TAG,t,e)}},{key:"_containsAccount",value:function(e){return this.accountProfileMap.has(e)}},{key:"_getProfileFromMap",value:function(e){return this.accountProfileMap.get(e)}},{key:"_getCachedProfiles",value:function(){var e=this.userController.tim.storage.getItem(this.TAG);return cu(e)?[]:e}},{key:"onConversationsProfileUpdated",value:function(e){for(var t,n,r,o=[],i=0,a=e.length;i<a;i++)n=(t=e[i]).userID,this.userController.isMyFriend(n)&&(this._containsAccount(n)?(r=this._getProfileFromMap(n),Fs(r,t)>0&&o.push(n)):o.push(t.userID));0!==o.length&&(Ts.info("ProfileHandler.onConversationsProfileUpdated toAccount:",o),this.getUserProfile({userIDList:o}))}},{key:"getNickAndAvatarByUserID",value:function(e){if(this._containsAccount(e)){var t=this._getProfileFromMap(e);return{nick:t.nick,avatar:t.avatar}}return{nick:"",avatar:""}}},{key:"reset",value:function(){this._flushMap(!0),this.accountProfileMap.clear()}}]),e}();Ne({target:"String",proto:!0},{repeat:Lr});var Zv=function(){function e(t){Ln(this,e),this.options=t?t.options:{enablePointer:!0},this.pointsList={},this.reportText={},this.maxNameLen=0,this.gapChar="-",this.log=console.log,this.currentTask=""}return bn(e,[{key:"newTask",value:function(e){!1!==this.options.enablePointer&&(e||(e=["task",this._timeFormat()].join("-")),this.pointsList[e]=[],this.currentTask=e,console.log("Pointer new Task : ".concat(this.currentTask)))}},{key:"deleteTask",value:function(e){!1!==this.options.enablePointer&&(e||(e=this.currentTask),this.pointsList[e].length=0,delete this.pointsList[e])}},{key:"dot",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;if(!1!==this.options.enablePointer){t=t||this.currentTask;var n=+new Date;this.maxNameLen=this.maxNameLen<e.length?e.length:this.maxNameLen,this.flen=this.maxNameLen+10,this.pointsList[t].push({pointerName:e,time:n})}}},{key:"_analisys",value:function(e){if(!1!==this.options.enablePointer){e=e||this.currentTask;for(var t=this.pointsList[e],n=t.length,r=[],o=[],i=0;i<n;i++)0!==i&&(o=this._analisysTowPoints(t[i-1],t[i]),r.push(o.join("")));return o=this._analisysTowPoints(t[0],t[n-1],!0),r.push(o.join("")),r.join("")}}},{key:"_analisysTowPoints",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!1!==this.options.enablePointer){var r=this.flen,o=t.time-e.time,i=o.toString(),a=e.pointerName+this.gapChar.repeat(r-e.pointerName.length),s=t.pointerName+this.gapChar.repeat(r-t.pointerName.length),u=this.gapChar.repeat(4-i.length)+i,c=n?["%c",a,s,u,"ms\n%c"]:[a,s,u,"ms\n"];return c}}},{key:"report",value:function(e){if(!1!==this.options.enablePointer){e=e||this.currentTask;var t=this._analisys(e);this.pointsList=[];var n=this._timeFormat(),r="Pointer[".concat(e,"(").concat(n,")]"),o=4*this.maxNameLen,i=(o-r.length)/2;console.log(["-".repeat(i),r,"-".repeat(i)].join("")),console.log("%c"+t,"color:#66a","color:red","color:#66a"),console.log("-".repeat(o))}}},{key:"_timeFormat",value:function(){var e=new Date,t=this.zeroFix(e.getMonth()+1,2),n=this.zeroFix(e.getDate(),2);return"".concat(t,"-").concat(n," ").concat(e.getHours(),":").concat(e.getSeconds(),":").concat(e.getMinutes(),"~").concat(e.getMilliseconds())}},{key:"zeroFix",value:function(e,t){return("000000000"+e).slice(-t)}},{key:"reportAll",value:function(){if(!1!==this.options.enablePointer)for(var e in this.pointsList)Object.prototype.hasOwnProperty.call(this.pointsList,e)&&this.eport(e)}}]),e}(),ey=function e(t,n){Ln(this,e),this.userID=t;var r={};if(r.userID=t,!cu(n))for(var o=0,i=n.length;o<i;o++)switch(n[o].tag){case Tp.NICK:r.nick=n[o].value;break;case Tp.GENDER:r.gender=n[o].value;break;case Tp.BIRTHDAY:r.birthday=n[o].value;break;case Tp.LOCATION:r.location=n[o].value;break;case Tp.SELFSIGNATURE:r.selfSignature=n[o].value;break;case Tp.ALLOWTYPE:r.allowType=n[o].value;break;case Tp.LANGUAGE:r.language=n[o].value;break;case Tp.AVATAR:r.avatar=n[o].value;break;case Tp.MESSAGESETTINGS:r.messageSettings=n[o].value;break;case Tp.ADMINFORBIDTYPE:r.adminForbidType=n[o].value;break;case Tp.LEVEL:r.level=n[o].value;break;case Tp.ROLE:r.role=n[o].value;break;default:Ts.debug("snsProfileItem unkown tag->",n[o].tag)}this.profile=new Xv(r)},ty=function(){function e(t){Ln(this,e),this.userController=t,this.TAG="friend",this.Actions={G:"get",D:"delete"},this.friends=new Map,this.pointer=new Zv}return bn(e,[{key:"isMyFriend",value:function(e){var t=this.friends.has(e);return t||Ts.debug("FriendHandler.isMyFriend "+e+" is not my friend"),t}},{key:"_transformFriendList",value:function(e){if(!cu(e)&&!cu(e.infoItem)){Ts.info("FriendHandler._transformFriendList friendNum="+e.friendNum);for(var t,n,r=e.infoItem,o=0,i=r.length;o<i;o++)n=r[o].infoAccount,t=new ey(n,r[o].snsProfileItem),this.friends.set(n,t)}}},{key:"_friends2map",value:function(e){var t=new Map;for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.set(n,e[n]);return t}},{key:"getFriendList",value:function(){var e=this,t={};t.fromAccount=this.userController.getMyAccount(),Ts.info("FriendHandler.getFriendList myAccount="+t.fromAccount);var n=this.userController.generateConfig(this.TAG,this.Actions.G,t);return this.userController.request(n).then((function(t){Ts.info("FriendHandler.getFriendList ok"),e._transformFriendList(t.data);var n=Yn(e.friends.values());return rg(n)})).catch((function(e){return Ts.error("FriendHandler.getFriendList error:",e),og(e)}))}},{key:"deleteFriend",value:function(e){if(!Array.isArray(e.toAccount))return Ts.error("FriendHandler.deleteFriend options.toAccount 必需是数组"),og({code:Wp.DEL_FRIEND_INVALID_PARAM,message:$f});e.toAccount.length>1e3&&(Ts.warn("FriendHandler.deleteFriend 删除好友人数不能超过1000人"),e.toAccount.length=1e3);var t=this.userController.generateConfig(this.TAG,this.Actions.D,e);return this.userController.request(t).then((function(e){return Ts.info("FriendHandler.deleteFriend ok"),rg()})).catch((function(e){return Ts.error("FriendHandler.deleteFriend error:",e),og(e)}))}}]),e}(),ny=function e(t){Ln(this,e),cu||(this.userID=t.userID||"",this.timeStamp=t.timeStamp||0)},ry=function(){function e(t){Ln(this,e),this.userController=t,this.TAG="blacklist",this.Actions={G:"get",C:"create",D:"delete"},this.blacklistMap=new Map,this.startIndex=0,this.maxLimited=100,this.curruentSequence=0}return bn(e,[{key:"getBlacklist",value:function(){var e=this,t={};t.fromAccount=this.userController.getMyAccount(),t.maxLimited=this.maxLimited,t.startIndex=0,t.lastSequence=this.curruentSequence;var n=new Mg(Sm),r=this.userController.generateConfig(this.TAG,this.Actions.G,t);return this.userController.request(r).then((function(t){var r=cu(t.data.blackListItem)?0:t.data.blackListItem.length;return n.setNetworkType(e.userController.getNetworkType()).setText(r).setEnd(),Ts.info("BlacklistHandler.getBlacklist ok"),e.curruentSequence=t.data.curruentSequence,e._handleResponse(t.data.blackListItem,!0),e._onBlacklistUpdated()})).catch((function(t){return e.userController.probeNetwork().then((function(e){var r=Wn(e,2),o=r[0],i=r[1];n.setError(t,o,i).setEnd()})),Ts.error("BlacklistHandler.getBlacklist error:",t),og(t)}))}},{key:"addBlacklist",value:function(e){var t=this,n=new Mg(Tm);if(!Ns(e.userIDList))return n.setCode(Wp.ADD_BLACKLIST_INVALID_PARAM).setMessage("BlacklistHandler.addBlacklist options.userIDList 必需是数组").setNetworkType(this.userController.getNetworkType()).setEnd(),Ts.error("BlacklistHandler.addBlacklist options.userIDList 必需是数组"),og({code:Wp.ADD_BLACKLIST_INVALID_PARAM,message:Yf});var r=this.userController.tim.loginInfo.identifier;if(1===e.userIDList.length&&e.userIDList[0]===r)return n.setCode(Wp.CANNOT_ADD_SELF_TO_BLACKLIST).setMessage(Xf).setNetworkType(this.userController.getNetworkType()).setEnd(),Ts.error("BlacklistHandler.addBlacklist 不能把自己拉黑"),og({code:Wp.CANNOT_ADD_SELF_TO_BLACKLIST,message:Xf});e.userIDList.includes(r)&&(e.userIDList=e.userIDList.filter((function(e){return e!==r})),Ts.warn("BlacklistHandler.addBlacklist 不能把自己拉黑，已过滤")),e.fromAccount=this.userController.getMyAccount(),e.toAccount=e.userIDList;var o=this.userController.generateConfig(this.TAG,this.Actions.C,e);return this.userController.request(o).then((function(r){return n.setNetworkType(t.userController.getNetworkType()).setText(e.userIDList.length>5?"userIDList.length=".concat(e.userIDList.length):"userIDList=".concat(e.userIDList)).setEnd(),Ts.info("BlacklistHandler.addBlacklist ok"),t._handleResponse(r.data.resultItem,!0),t._onBlacklistUpdated()})).catch((function(e){return t.userController.probeNetwork().then((function(t){var r=Wn(t,2),o=r[0],i=r[1];n.setError(e,o,i).setEnd()})),Ts.error("BlacklistHandler.addBlacklist error:",e),og(e)}))}},{key:"_handleResponse",value:function(e,t){if(!cu(e))for(var n,r,o,i=0,a=e.length;i<a;i++)r=e[i].to,o=e[i].resultCode,(Ls(o)||0===o)&&(t?((n=this.blacklistMap.has(r)?this.blacklistMap.get(r):new ny).userID=r,!cu(e[i].addBlackTimeStamp)&&(n.timeStamp=e[i].addBlackTimeStamp),this.blacklistMap.set(r,n)):this.blacklistMap.has(r)&&(n=this.blacklistMap.get(r),this.blacklistMap.delete(r)));Ts.log("BlacklistHandler._handleResponse total="+this.blacklistMap.size+" bAdd="+t)}},{key:"deleteBlacklist",value:function(e){var t=this,n=new Mg(Dm);if(!Ns(e.userIDList))return n.setCode(Wp.DEL_BLACKLIST_INVALID_PARAM).setMessage("BlacklistHandler.deleteBlacklist options.userIDList 必需是数组").setNetworkType(this.userController.getNetworkType()).setEnd(),Ts.error("BlacklistHandler.deleteBlacklist options.userIDList 必需是数组"),og({code:Wp.DEL_BLACKLIST_INVALID_PARAM,message:Jf});e.fromAccount=this.userController.getMyAccount(),e.toAccount=e.userIDList;var r=this.userController.generateConfig(this.TAG,this.Actions.D,e);return this.userController.request(r).then((function(r){return n.setNetworkType(t.userController.getNetworkType()).setText(e.userIDList.length>5?"userIDList.length=".concat(e.userIDList.length):"userIDList=".concat(e.userIDList)).setEnd(),Ts.info("BlacklistHandler.deleteBlacklist ok"),t._handleResponse(r.data.resultItem,!1),t._onBlacklistUpdated()})).catch((function(e){return t.userController.probeNetwork().then((function(t){var r=Wn(t,2),o=r[0],i=r[1];n.setError(e,o,i).setEnd()})),Ts.error("BlacklistHandler.deleteBlacklist error:",e),og(e)}))}},{key:"_onBlacklistUpdated",value:function(){var e=Yn(this.blacklistMap.keys());return this.userController.emitOuterEvent(Cn.BLACKLIST_UPDATED,e),rg(e)}},{key:"handleBlackListDelAccount",value:function(e){for(var t,n=[],r=0,o=e.length;r<o;r++)t=e[r],this.blacklistMap.has(t)&&(this.blacklistMap.delete(t),n.push(t));n.length>0&&(Ts.log("BlacklistHandler.handleBlackListDelAccount delCount="+n.length+" : "+n.join(",")),this.userController.emitOuterEvent(Cn.BLACKLIST_UPDATED,Yn(this.blacklistMap.keys())))}},{key:"handleBlackListAddAccount",value:function(e){for(var t,n=[],r=0,o=e.length;r<o;r++)t=e[r],this.blacklistMap.has(t)||(this.blacklistMap.set(t,new ny({userID:t})),n.push(t));n.length>0&&(Ts.log("BlacklistHandler.handleBlackListAddAccount addCount="+n.length+" : "+n.join(",")),this.userController.emitOuterEvent(Cn.BLACKLIST_UPDATED,Yn(this.blacklistMap.keys())))}},{key:"reset",value:function(){this.blacklistMap.clear(),this.startIndex=0,this.maxLimited=100,this.curruentSequence=0}}]),e}(),oy=function(){function e(t){Ln(this,e),this.userController=t,this.TAG="applyC2C",this.Actions={C:"create",G:"get",D:"delete",U:"update"}}return bn(e,[{key:"applyAddFriend",value:function(e){var t=this,n=this.userController.generateConfig(this.TAG,this.Actions.C,e),r=this.userController.request(n);return r.then((function(e){t.userController.isActionSuccessful("applyAddFriend",t.Actions.C,e)})).catch((function(e){})),r}},{key:"getPendency",value:function(e){var t=this,n=this.userController.generateConfig(this.TAG,this.Actions.G,e),r=this.userController.request(n);return r.then((function(e){t.userController.isActionSuccessful("getPendency",t.Actions.G,e)})).catch((function(e){})),r}},{key:"deletePendency",value:function(e){var t=this,n=this.userController.generateConfig(this.TAG,this.Actions.D,e),r=this.userController.request(n);return r.then((function(e){t.userController.isActionSuccessful("deletePendency",t.Actions.D,e)})).catch((function(e){})),r}},{key:"replyPendency",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=this.userController.generateConfig(this.TAG,this.Actions.U,t),r=this.userController.request(n);return r.then((function(t){e.userController.isActionSuccessful("replyPendency",e.Actions.U,t)})).catch((function(e){})),r}}]),e}(),iy=function(e){qn(n,e);var t=zn(n);function n(e){var r;return Ln(this,n),(r=t.call(this,e)).profileHandler=new Qv(Hn(r)),r.friendHandler=new ty(Hn(r)),r.blacklistHandler=new ry(Hn(r)),r.applyC2CHandler=new oy(Hn(r)),r._initializeListener(),r}return bn(n,[{key:"_initializeListener",value:function(e){var t=this.tim.innerEmitter;t.on(Wh,this.onContextUpdated,this),t.on(md,this.onProfileModified,this),t.on(gd,this.onNewFriendMessages,this),t.on(Nd,this.onConversationsProfileUpdated,this)}},{key:"onContextUpdated",value:function(e){var t=this.tim.context;!1!=!!t.a2Key&&!1!=!!t.tinyID&&(this.profileHandler.getMyProfile(),this.friendHandler.getFriendList(),this.blacklistHandler.getBlacklist())}},{key:"onGotMyProfile",value:function(){this.triggerReady()}},{key:"onProfileModified",value:function(e){this.profileHandler.onProfileModified(e)}},{key:"onNewFriendMessages",value:function(e){Ts.debug("onNewFriendMessages",JSON.stringify(e.data)),cu(e.data.blackListDelAccount)||this.blacklistHandler.handleBlackListDelAccount(e.data.blackListDelAccount),cu(e.data.blackListAddAccount)||this.blacklistHandler.handleBlackListAddAccount(e.data.blackListAddAccount)}},{key:"onConversationsProfileUpdated",value:function(e){this.profileHandler.onConversationsProfileUpdated(e.data)}},{key:"getMyAccount",value:function(){return this.tim.context.identifier}},{key:"isMyFriend",value:function(e){return this.friendHandler.isMyFriend(e)}},{key:"generateConfig",value:function(e,t,n){return{name:e,action:t,param:n}}},{key:"getMyProfile",value:function(){return this.profileHandler.getMyProfile()}},{key:"getUserProfile",value:function(e){return this.profileHandler.getUserProfile(e)}},{key:"updateMyProfile",value:function(e){return this.profileHandler.updateMyProfile(e)}},{key:"getFriendList",value:function(){return this.friendHandler.getFriendList()}},{key:"deleteFriend",value:function(e){return this.friendHandler.deleteFriend(e)}},{key:"getNickAndAvatarByUserID",value:function(e){return this.profileHandler.getNickAndAvatarByUserID(e)}},{key:"getBlacklist",value:function(){return this.blacklistHandler.getBlacklist()}},{key:"addBlacklist",value:function(e){return this.blacklistHandler.addBlacklist(e)}},{key:"deleteBlacklist",value:function(e){return this.blacklistHandler.deleteBlacklist(e)}},{key:"applyAddFriend",value:function(e){return this.applyC2CHandler.applyAddFriend(e)}},{key:"getPendency",value:function(e){return this.applyC2CHandler.getPendency(e)}},{key:"deletePendency",value:function(e){return this.applyC2CHandler.deletePendency(e)}},{key:"replyPendency",value:function(e){return this.applyC2CHandler.replyPendency(e)}},{key:"reset",value:function(){Ts.info("UserController.reset"),this.resetReady(),this.profileHandler.reset(),this.blacklistHandler.reset(),this.checkTimes=0}}]),n}(Xd),ay=[],sy=ay.sort,uy=o((function(){ay.sort(void 0)})),cy=o((function(){ay.sort(null)})),ly=at("sort");Ne({target:"Array",proto:!0,forced:uy||!cy||!ly},{sort:function(e){return void 0===e?sy.call(we(this)):sy.call(we(this),et(e))}});var py=["groupID","name","avatar","type","introduction","notification","ownerID","selfInfo","createTime","infoSequence","lastInfoTime","lastMessage","nextMessageSeq","memberNum","maxMemberNum","memberList","joinOption","groupCustomField","muteAllMembers"],fy=function(){function e(t){Ln(this,e),this.groupID="",this.name="",this.avatar="",this.type="",this.introduction="",this.notification="",this.ownerID="",this.createTime="",this.infoSequence="",this.lastInfoTime="",this.selfInfo={messageRemindType:"",joinTime:"",nameCard:"",role:""},this.lastMessage={lastTime:"",lastSequence:"",fromAccount:"",messageForShow:""},this.nextMessageSeq="",this.memberNum="",this.memberCount="",this.maxMemberNum="",this.maxMemberCount="",this.joinOption="",this.groupCustomField=[],this.muteAllMembers=void 0,this._initGroup(t)}return bn(e,[{key:"_initGroup",value:function(e){for(var t in e)py.indexOf(t)<0||("selfInfo"!==t?("memberNum"===t&&(this.memberCount=e[t]),"maxMemberNum"===t&&(this.maxMemberCount=e[t]),this[t]=e[t]):this.updateSelfInfo(e[t]))}},{key:"updateGroup",value:function(e){var t=JSON.parse(JSON.stringify(e));t.lastMsgTime&&(this.lastMessage.lastTime=t.lastMsgTime),Ls(t.muteAllMembers)||("On"===t.muteAllMembers?t.muteAllMembers=!0:t.muteAllMembers=!1),t.groupCustomField&&Xs(this.groupCustomField,t.groupCustomField),Ls(t.memberNum)||(this.memberCount=t.memberNum),Ls(t.maxMemberNum)||(this.maxMemberCount=t.maxMemberNum),Fs(this,t,["members","errorCode","lastMsgTime","groupCustomField","memberNum","maxMemberNum"])}},{key:"updateSelfInfo",value:function(e){var t=e.nameCard,n=e.joinTime,r=e.role,o=e.messageRemindType;Fs(this.selfInfo,{nameCard:t,joinTime:n,role:r,messageRemindType:o},[],["",null,void 0,0,NaN])}},{key:"setSelfNameCard",value:function(e){this.selfInfo.nameCard=e}},{key:"memberNum",set:function(e){},get:function(){return Ts.warn("！！！v2.8.0起弃用memberNum，请使用 memberCount"),this.memberCount}},{key:"maxMemberNum",set:function(e){},get:function(){return Ts.warn("！！！v2.8.0起弃用maxMemberNum，请使用 maxMemberCount"),this.maxMemberCount}}]),e}(),hy=function(e,t){if(Ls(t))return"";switch(e){case En.MSG_TEXT:return t.text;case En.MSG_IMAGE:return"[图片]";case En.MSG_GEO:return"[位置]";case En.MSG_AUDIO:return"[语音]";case En.MSG_VIDEO:return"[视频]";case En.MSG_FILE:return"[文件]";case En.MSG_CUSTOM:return"[自定义消息]";case En.MSG_GRP_TIP:return"[群提示消息]";case En.MSG_GRP_SYS_NOTICE:return"[群系统通知]";case En.MSG_FACE:return"[动画表情]";case En.MSG_MERGER:return"[聊天记录]";default:return""}},dy=function(e){return Ls(e)?{lastTime:0,lastSequence:0,fromAccount:0,messageForShow:"",payload:null,type:"",isRevoked:!1}:e instanceof Th?{lastTime:e.time||0,lastSequence:e.sequence||0,fromAccount:e.from||"",messageForShow:hy(e.type,e.payload),payload:e.payload||null,type:e.type||null,isRevoked:!1}:Un(Un({},e),{},{isRevoked:!1,messageForShow:hy(e.type,e.payload)})},gy=function(){function e(t){Ln(this,e),this.conversationID=t.conversationID||"",this.unreadCount=t.unreadCount||0,this.type=t.type||"",this.lastMessage=dy(t.lastMessage),t.lastMsgTime&&(this.lastMessage.lastTime=t.lastMsgTime),this._isInfoCompleted=!1,this.peerReadTime=t.peerReadTime||0,this.groupAtInfoList=[],this._initProfile(t)}return bn(e,[{key:"_initProfile",value:function(e){var t=this;Object.keys(e).forEach((function(n){switch(n){case"userProfile":t.userProfile=e.userProfile;break;case"groupProfile":t.groupProfile=e.groupProfile}})),Ls(this.userProfile)&&this.type===En.CONV_C2C?this.userProfile=new Xv({userID:e.conversationID.replace("C2C","")}):Ls(this.groupProfile)&&this.type===En.CONV_GROUP&&(this.groupProfile=new fy({groupID:e.conversationID.replace("GROUP","")}))}},{key:"updateUnreadCount",value:function(e,t){Ls(e)||(eu(this.subType)||tu(this.subType)?this.unreadCount=0:t&&this.type===En.CONV_GROUP?this.unreadCount=e:this.unreadCount=this.unreadCount+e)}},{key:"updateLastMessage",value:function(e){this.lastMessage=dy(e)}},{key:"updateGroupAtInfoList",value:function(e){var t,n=(Jn(t=e.groupAtType)||Xn(t)||Qn(t)||er()).slice(0);-1!==n.indexOf(En.CONV_AT_ME)&&-1!==n.indexOf(En.CONV_AT_ALL)&&(n=[En.CONV_AT_ALL_AT_ME]);var r={from:e.from,groupID:e.groupID,messageSequence:e.sequence,atTypeArray:n,__random:e.__random,__sequence:e.__sequence};this.groupAtInfoList.push(r),Ts.debug("Conversation.updateGroupAtInfoList conversationID=".concat(this.conversationID),this.groupAtInfoList)}},{key:"clearGroupAtInfoList",value:function(){this.groupAtInfoList.length=0}},{key:"reduceUnreadCount",value:function(){this.unreadCount>=1&&(this.unreadCount-=1)}},{key:"isLastMessageRevoked",value:function(e){var t=e.sequence,n=e.time;return this.type===En.CONV_C2C&&t===this.lastMessage.lastSequence&&n===this.lastMessage.lastTime||this.type===En.CONV_GROUP&&t===this.lastMessage.lastSequence}},{key:"setLastMessageRevoked",value:function(e){this.lastMessage.isRevoked=e}},{key:"toAccount",get:function(){return this.conversationID.replace("C2C","").replace("GROUP","")}},{key:"subType",get:function(){return this.groupProfile?this.groupProfile.type:""}}]),e}(),vy=function(e){qn(n,e);var t=zn(n);function n(e){var r;return Ln(this,n),(r=t.call(this,e)).pagingStatus=oc.NOT_START,r.pagingTimeStamp=0,r.conversationMap=new Map,r.tempGroupList=[],r.tempGroupAtTipsList=[],r._initListeners(),r}return bn(n,[{key:"hasLocalConversationMap",value:function(){return this.conversationMap.size>0}},{key:"_createLocalConversation",value:function(e){return this.conversationMap.has(e)?this.conversationMap.get(e):(Ts.log("ConversationController._createLocalConversation conversationID:".concat(e)),new gy({conversationID:e,type:e.slice(0,3)===En.CONV_C2C?En.CONV_C2C:En.CONV_GROUP}))}},{key:"hasLocalConversation",value:function(e){return this.conversationMap.has(e)}},{key:"getConversationList",value:function(){var e=this;Ts.log("ConversationController.getConversationList."),this.pagingStatus===oc.REJECTED&&(Ts.log("ConversationController.getConversationList. continue to sync conversationList"),this._syncConversationList());var t=new Mg(Bg);return this.request({name:"conversation",action:"query"}).then((function(n){var r=n.data.conversations,o=void 0===r?[]:r,i=e._getConversationOptions(o);return e._updateLocalConversationList(i,!0),e._setStorageConversationList(),e._handleC2CPeerReadTime(),t.setText(o.length).setNetworkType(e.getNetworkType()).setEnd(),Ts.log("ConversationController.getConversationList ok."),rg({conversationList:e.getLocalConversationList()})})).catch((function(n){return e.probeNetwork().then((function(e){var r=Wn(e,2),o=r[0],i=r[1];t.setError(n,o,i).setEnd()})),Ts.error("ConversationController.getConversationList error:",n),og(n)}))}},{key:"_syncConversationList",value:function(){var e=this,t=new Mg($g);return this.pagingStatus===oc.NOT_START&&this.conversationMap.clear(),this._autoPagingSyncConversationList().then((function(n){return e.pagingStatus=oc.RESOLVED,e._setStorageConversationList(),e._handleC2CPeerReadTime(),t.setText("".concat(e.conversationMap.size)).setNetworkType(e.getNetworkType()).setEnd(),n})).catch((function(n){return e.pagingStatus=oc.REJECTED,t.setText(e.pagingTimeStamp),e.probeNetwork().then((function(e){var r=Wn(e,2),o=r[0],i=r[1];t.setError(n,o,i).setEnd()})),og(n)}))}},{key:"_autoPagingSyncConversationList",value:function(){var e=this;return this.pagingStatus=oc.PENDING,this.request({name:"conversation",action:"pagingQuery",param:{fromAccount:this.tim.context.identifier,timeStamp:this.pagingTimeStamp,orderType:1}}).then((function(t){var n=t.data,r=n.completeFlag,o=n.conversations,i=void 0===o?[]:o,a=n.timeStamp;if(Ts.log("ConversationController._autoPagingSyncConversationList completeFlag=".concat(r," nums=").concat(i.length)),i.length>0){var s=e._getConversationOptions(i);e._updateLocalConversationList(s,!0)}if(e._isReady)e._emitConversationUpdate();else{if(!e.isLoggedIn())return rg();e.triggerReady()}return e.pagingTimeStamp=a,1!==r?e._autoPagingSyncConversationList():(e._handleGroupAtTipsList(),rg())})).catch((function(t){throw e.isLoggedIn()&&(e._isReady||(Ts.warn("ConversationController._autoPagingSyncConversationList failed. error:".concat(Vs(t))),e.triggerReady())),t}))}},{key:"_handleC2CPeerReadTime",value:function(){var e,t=this.tim.messageController,n=tr(this.conversationMap);try{for(n.s();!(e=n.n()).done;){var r=Wn(e.value,2),o=r[0],i=r[1];i.type===En.CONV_C2C&&(Ts.debug("ConversationController._handleC2CPeerReadTime",o,i.peerReadTime),t.recordPeerReadTime(o,i.peerReadTime))}}catch(a){n.e(a)}finally{n.f()}}},{key:"getConversationProfile",value:function(e){var t=this,n=this.conversationMap.has(e)?this.conversationMap.get(e):this._createLocalConversation(e);if(n._isInfoCompleted||n.type===En.CONV_SYSTEM)return rg({conversation:n});var r=new Mg(jg);return Ts.log("ConversationController.getConversationProfile. conversationID:".concat(e," lastMessage:"),n.lastMessage),this._updateUserOrGroupProfileCompletely(n).then((function(n){return r.setNetworkType(t.getNetworkType()).setText("conversationID=".concat(e," unreadCount=").concat(n.data.conversation.unreadCount)).setEnd(),Ts.log("ConversationController.getConversationProfile ok. conversationID:",e),n})).catch((function(n){return t.probeNetwork().then((function(t){var o=Wn(t,2),i=o[0],a=o[1];r.setError(n,i,a).setText("conversationID=".concat(e)).setEnd()})),Ts.error("ConversationController.getConversationProfile error:",n),og(n)}))}},{key:"deleteConversation",value:function(e){var t=this,n={};if(!this.conversationMap.has(e)){var r=new zp({code:Wp.CONVERSATION_NOT_FOUND,message:Af});return og(r)}switch(this.conversationMap.get(e).type){case En.CONV_C2C:n.type=1,n.toAccount=e.replace(En.CONV_C2C,"");break;case En.CONV_GROUP:n.type=2,n.toGroupID=e.replace(En.CONV_GROUP,"");break;case En.CONV_SYSTEM:return this.tim.groupController.deleteGroupSystemNotice({messageList:this.tim.messageController.getLocalMessageList(e)}),this.deleteLocalConversation(e),rg({conversationID:e});default:var o=new zp({code:Wp.CONVERSATION_UN_RECORDED_TYPE,message:Rf});return og(o)}var i=new Mg(Kg);return i.setText("conversationID=".concat(e)),Ts.log("ConversationController.deleteConversation. conversationID=".concat(e)),this.tim.setMessageRead({conversationID:e}).then((function(){return t.request({name:"conversation",action:"delete",param:n})})).then((function(){return i.setNetworkType(t.getNetworkType()).setEnd(),Ts.log("ConversationController.deleteConversation ok."),t.deleteLocalConversation(e),rg({conversationID:e})})).catch((function(e){return t.probeNetwork().then((function(t){var n=Wn(t,2),r=n[0],o=n[1];i.setError(e,r,o).setEnd()})),Ts.error("ConversationController.deleteConversation error:",e),og(e)}))}},{key:"getLocalConversationList",value:function(){return Yn(this.conversationMap.values())}},{key:"getLocalConversation",value:function(e){return this.conversationMap.get(e)}},{key:"_initLocalConversationList",value:function(){var e=new Mg(Hg);Ts.time(vg),Ts.log("ConversationController._initLocalConversationList.");var t=this._getStorageConversationList();if(t){for(var n=t.length,r=0;r<n;r++)this.conversationMap.set(t[r].conversationID,new gy(t[r]));this._emitConversationUpdate(!0,!1),e.setNetworkType(this.getNetworkType()).setText(n).setEnd()}else e.setNetworkType(this.getNetworkType()).setText(0).setEnd();this._syncConversationList()}},{key:"_getStorageConversationList",value:function(){return this.tim.storage.getItem("conversationMap")}},{key:"_setStorageConversationList",value:function(){var e=this.getLocalConversationList().slice(0,20).map((function(e){return{conversationID:e.conversationID,type:e.type,subType:e.subType,lastMessage:e.lastMessage,groupProfile:e.groupProfile,userProfile:e.userProfile}}));this.tim.storage.setItem("conversationMap",e)}},{key:"_initListeners",value:function(){var e=this;this.tim.innerEmitter.once(Wh,this._initLocalConversationList,this),this.tim.innerEmitter.on(Qh,this._onSendOrReceiveMessage,this),this.tim.innerEmitter.on(Zh,this._handleSyncMessages,this),this.tim.innerEmitter.on(ed,this._handleSyncMessages,this),this.tim.innerEmitter.on(td,this._onSendOrReceiveMessage,this),this.tim.innerEmitter.on(nd,this._onSendOrReceiveMessage,this),this.tim.innerEmitter.on(rd,this._onSendOrReceiveMessage,this),this.tim.innerEmitter.on(Sd,this._onGroupListUpdated,this),this.tim.innerEmitter.on(wd,this._updateConversationUserProfile,this),this.tim.innerEmitter.on(od,this._onMessageRevoked,this),this.tim.innerEmitter.on(hd,this._onReceiveGroupAtTips,this),this.ready((function(){e.tempGroupList.length>0&&(e._updateConversationGroupProfile(e.tempGroupList),e.tempGroupList.length=0)}))}},{key:"_onGroupListUpdated",value:function(e){this._updateConversationGroupProfile(e.data)}},{key:"_updateConversationGroupProfile",value:function(e){var t=this;Ns(e)&&0===e.length||(this.hasLocalConversationMap()?(e.forEach((function(e){var n="GROUP".concat(e.groupID);if(t.conversationMap.has(n)){var r=t.conversationMap.get(n);r.groupProfile=e,r.lastMessage.lastSequence<e.nextMessageSeq&&(r.lastMessage.lastSequence=e.nextMessageSeq-1),r.subType||(r.subType=e.type)}})),this._emitConversationUpdate(!0,!1)):this.tempGroupList=e)}},{key:"_updateConversationUserProfile",value:function(e){var t=this;e.data.forEach((function(e){var n="C2C".concat(e.userID);t.conversationMap.has(n)&&(t.conversationMap.get(n).userProfile=e)})),this._emitConversationUpdate(!0,!1)}},{key:"updateUserProfileSpecifiedKey",value:function(e){Ts.log("ConversationController.updateUserProfileSpecifiedKey options:",e);var t=e.conversationID,n=e.nick,r=e.avatar;if(this.conversationMap.has(t)){var o=this.conversationMap.get(t).userProfile;As(n)&&o.nick!==n&&(o.nick=n),As(r)&&o.avatar!==r&&(o.avatar=r),this._emitConversationUpdate(!0,!1)}}},{key:"_onMessageRevoked",value:function(e){var t=this,n=e.data;if(0!==n.length){var r=null,o=!1;n.forEach((function(e){(r=t.conversationMap.get(e.conversationID))&&r.isLastMessageRevoked(e)&&(o=!0,r.setLastMessageRevoked(!0))})),o&&this._emitConversationUpdate(!0,!1)}}},{key:"_onReceiveGroupAtTips",value:function(e){var t=this,n=e.data,r=null;n.forEach((function(e){e.groupAtTips?r=e.groupAtTips:e.elements&&(r=e.elements),r.__random=e.random,r.__sequence=e.clientSequence,t.tempGroupAtTipsList.push(r)})),Ts.debug("ConversationController._onReceiveGroupAtTips isReady=".concat(this._isReady),this.tempGroupAtTipsList),this._isReady&&this._handleGroupAtTipsList()}},{key:"_handleGroupAtTipsList",value:function(){var e=this;if(0!==this.tempGroupAtTipsList.length){var t=!1;this.tempGroupAtTipsList.forEach((function(n){var r=n.groupID;if(n.from!==e.tim.context.identifier){var o=e.conversationMap.get("".concat(En.CONV_GROUP).concat(r));o&&(o.updateGroupAtInfoList(n),t=!0)}})),t&&this._emitConversationUpdate(!0,!1),this.tempGroupAtTipsList.length=0}}},{key:"deleteGroupAtTips",value:function(e){Ts.log("ConversationController.deleteGroupAtTips");var t=this.conversationMap.get(e);if(!t)return Promise.resolve();var n=t.groupAtInfoList;if(0===n.length)return Promise.resolve();var r=this.tim.context.identifier;return this.request({name:"conversation",action:"deleteGroupAtTips",param:{messageListToDelete:n.map((function(e){return{from:e.from,to:r,messageSeq:e.__sequence,messageRandom:e.__random,groupID:e.groupID}}))}}).then((function(){return Ts.log("ConversationController.deleteGroupAtTips ok. nums=".concat(n.length)),t.clearGroupAtInfoList(),Promise.resolve()})).catch((function(e){return Ts.error("ConversationController.deleteGroupAtTips error:",e),og(e)}))}},{key:"_handleSyncMessages",value:function(e){this._onSendOrReceiveMessage(e,!0)}},{key:"_onSendOrReceiveMessage",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e.data.eventDataList;this._isReady?0!==r.length&&(this._getPeerReadTime(r),this._updateLocalConversationList(r,!1,n),this._setStorageConversationList(),this._emitConversationUpdate()):this.ready((function(){t._onSendOrReceiveMessage(e,n)}))}},{key:"_getPeerReadTime",value:function(e){var t=this,n=[];e.forEach((function(e){t.conversationMap.has(e.conversationID)||e.type!==En.CONV_C2C||n.push(e.conversationID.replace(En.CONV_C2C,""))})),n.length>0&&(Ts.debug("ConversationController._getPeerReadTime userIDList:".concat(n)),this.tim.messageController.getPeerReadTime(n))}},{key:"_updateLocalConversationList",value:function(e,t,n){var r;r=this._updateTempConversations(e,t,n),this.conversationMap=new Map(this._sortConversations([].concat(Yn(r.conversations),Yn(this.conversationMap)))),t||this._updateUserOrGroupProfile(r.newerConversations)}},{key:"_updateTempConversations",value:function(e,t,n){for(var r=[],o=[],i=0,a=e.length;i<a;i++){var s=new gy(e[i]),u=this.conversationMap.get(s.conversationID);if(this.conversationMap.has(s.conversationID)){var c=["unreadCount","allowType","adminForbidType","payload"];n&&c.push("lastMessage"),Fs(u,s,c,[null,void 0,"",0,NaN]),u.updateUnreadCount(s.unreadCount,t),n||(u.lastMessage.payload=e[i].lastMessage.payload),this.conversationMap.delete(u.conversationID),r.push([u.conversationID,u])}else{if(s.type===En.CONV_GROUP){var l=s.groupProfile.groupID,p=this.tim.groupController.getLocalGroupProfile(l);p&&(s.groupProfile=p,s.updateUnreadCount(0))}o.push(s),r.push([s.conversationID,s])}}return{conversations:r,newerConversations:o}}},{key:"_sortConversations",value:function(e){return e.sort((function(e,t){return t[1].lastMessage.lastTime-e[1].lastMessage.lastTime}))}},{key:"_updateUserOrGroupProfile",value:function(e){var t=this;if(0!==e.length){var n=[],r=[];e.forEach((function(e){if(e.type===En.CONV_C2C)n.push(e.toAccount);else if(e.type===En.CONV_GROUP){var o=e.toAccount;t.tim.groupController.hasLocalGroup(o)?e.groupProfile=t.tim.groupController.getLocalGroupProfile(o):r.push(o)}})),n.length>0&&this.tim.getUserProfile({userIDList:n}).then((function(e){var n=e.data;Ns(n)?n.forEach((function(e){t.conversationMap.get("C2C".concat(e.userID)).userProfile=e})):t.conversationMap.get("C2C".concat(n.userID)).userProfile=n})),r.length>0&&this.tim.groupController.getGroupProfileAdvance({groupIDList:r,responseFilter:{groupBaseInfoFilter:["Type","Name","FaceUrl"]}}).then((function(e){e.data.successGroupList.forEach((function(e){var n="GROUP".concat(e.groupID);if(t.conversationMap.has(n)){var r=t.conversationMap.get(n);Fs(r.groupProfile,e,[],[null,void 0,"",0,NaN]),!r.subType&&e.type&&(r.subType=e.type)}}))}))}}},{key:"_updateUserOrGroupProfileCompletely",value:function(e){var t=this;return e.type===En.CONV_C2C?this.tim.getUserProfile({userIDList:[e.toAccount]}).then((function(n){var r=n.data;return 0===r.length?og(new zp({code:Wp.USER_OR_GROUP_NOT_FOUND,message:Of})):(e.userProfile=r[0],e._isInfoCompleted=!0,t._unshiftConversation(e),rg({conversation:e}))})):this.tim.getGroupProfile({groupID:e.toAccount}).then((function(n){return e.groupProfile=n.data.group,e._isInfoCompleted=!0,t._unshiftConversation(e),rg({conversation:e})}))}},{key:"_unshiftConversation",value:function(e){e instanceof gy&&!this.conversationMap.has(e.conversationID)&&(this.conversationMap=new Map([[e.conversationID,e]].concat(Yn(this.conversationMap))),this._setStorageConversationList(),this._emitConversationUpdate(!0,!1))}},{key:"deleteLocalConversation",value:function(e){this.conversationMap.delete(e),this._setStorageConversationList(),this.emitInnerEvent(Ld,e),this._emitConversationUpdate(!0,!1)}},{key:"_getConversationOptions",value:function(e){var t=[],n=e.filter((function(e){var t=e.lastMsg;return Rs(t)})).map((function(e){if(1===e.type){var n={userID:e.userID,nick:e.c2CNick,avatar:e.c2CImage};return t.push(n),{conversationID:"C2C".concat(e.userID),type:"C2C",lastMessage:{lastTime:e.time,lastSequence:e.sequence,fromAccount:e.lastC2CMsgFromAccount,messageForShow:e.messageShow,type:e.lastMsg.elements[0]?e.lastMsg.elements[0].type:null,payload:e.lastMsg.elements[0]?e.lastMsg.elements[0].content:null},userProfile:new Xv(n),peerReadTime:e.c2cPeerReadTime}}return{conversationID:"GROUP".concat(e.groupID),type:"GROUP",lastMessage:{lastTime:e.time,lastSequence:e.messageReadSeq+e.unreadCount,fromAccount:e.msgGroupFromAccount,messageForShow:e.messageShow,type:e.lastMsg.elements[0]?e.lastMsg.elements[0].type:null,payload:e.lastMsg.elements[0]?e.lastMsg.elements[0].content:null},groupProfile:new fy({groupID:e.groupID,name:e.groupNick,avatar:e.groupImage}),unreadCount:e.unreadCount,peerReadTime:0}}));return t.length>0&&this.emitInnerEvent(Nd,t),n}},{key:"_emitConversationUpdate",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=Yn(this.conversationMap.values());t&&this.emitInnerEvent(Rd,n),e&&this.emitOuterEvent(Cn.CONVERSATION_LIST_UPDATED,n)}},{key:"_conversationMapTreeShaking",value:function(e){var t=this,n=new Map(Yn(this.conversationMap));e.forEach((function(e){return n.delete(e.conversationID)})),n.has(En.CONV_SYSTEM)&&n.delete(En.CONV_SYSTEM);var r=this.tim.groupController.getJoinedAVChatRoom();r&&r.forEach((function(e){n.delete("".concat(En.CONV_GROUP).concat(e))})),Yn(n.keys()).forEach((function(e){return t.conversationMap.delete(e)}))}},{key:"reset",value:function(){this.pagingStatus=oc.NOT_START,this.pagingTimeStamp=0,this.conversationMap.clear(),this.tempGroupAtTipsList.length=0,this.resetReady(),this.tim.innerEmitter.once(Wh,this._initLocalConversationList,this)}}]),n}(Xd),yy=1..toFixed,_y=Math.floor,My=function(e,t,n){return 0===t?n:t%2==1?My(e,t-1,n*e):My(e*e,t/2,n)},Iy=yy&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!o((function(){yy.call({})}));Ne({target:"Number",proto:!0,forced:Iy},{toFixed:function(e){var t,n,r,o,i=function(e){if("number"!=typeof e&&"Number"!=p(e))throw TypeError("Incorrect invocation");return+e}(this),a=se(e),s=[0,0,0,0,0,0],u="",c="0",l=function(e,t){for(var n=-1,r=t;++n<6;)r+=e*s[n],s[n]=r%1e7,r=_y(r/1e7)},f=function(e){for(var t=6,n=0;--t>=0;)n+=s[t],s[t]=_y(n/e),n=n%e*1e7},h=function(){for(var e=6,t="";--e>=0;)if(""!==t||0===e||0!==s[e]){var n=String(s[e]);t=""===t?n:t+Lr.call("0",7-n.length)+n}return t};if(a<0||a>20)throw RangeError("Incorrect fraction digits");if(i!=i)return"NaN";if(i<=-1e21||i>=1e21)return String(i);if(i<0&&(u="-",i=-i),i>1e-21)if(n=(t=function(e){for(var t=0,n=e;n>=4096;)t+=12,n/=4096;for(;n>=2;)t+=1,n/=2;return t}(i*My(2,69,1))-69)<0?i*My(2,-t,1):i/My(2,t,1),n*=4503599627370496,(t=52-t)>0){for(l(0,n),r=a;r>=7;)l(1e7,0),r-=7;for(l(My(10,r,1),0),r=t-1;r>=23;)f(1<<23),r-=23;f(1<<r),l(1,1),f(2),c=h()}else l(0,n),l(1<<-t,0),c=h()+Lr.call("0",a);return c=a>0?u+((o=c.length)<=a?"0."+Lr.call("0",a-o)+c:c.slice(0,o-a)+"."+c.slice(o-a)):u+c}});var Cy=[].push,Ey=Math.min,Sy=!o((function(){return!RegExp(4294967295,"y")}));ya("split",2,(function(e,t,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var r=String(d(this)),o=void 0===n?4294967295:n>>>0;if(0===o)return[];if(void 0===e)return[r];if(!ua(e))return t.call(r,e,o);for(var i,a,s,u=[],c=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),l=0,p=new RegExp(e.source,c+"g");(i=ta.call(p,r))&&!((a=p.lastIndex)>l&&(u.push(r.slice(l,i.index)),i.length>1&&i.index<r.length&&Cy.apply(u,i.slice(1)),s=i[0].length,l=a,u.length>=o));)p.lastIndex===i.index&&p.lastIndex++;return l===r.length?!s&&p.test("")||u.push(""):u.push(r.slice(l)),u.length>o?u.slice(0,o):u}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:t.call(this,e,n)}:t,[function(t,n){var o=d(this),i=null==t?void 0:t[e];return void 0!==i?i.call(t,o,n):r.call(String(o),t,n)},function(e,o){var i=n(r,e,this,o,r!==t);if(i.done)return i.value;var a=D(e),s=String(this),u=Lo(a,RegExp),c=a.unicode,l=(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.unicode?"u":"")+(Sy?"y":"g"),p=new u(Sy?a:"^(?:"+a.source+")",l),f=void 0===o?4294967295:o>>>0;if(0===f)return[];if(0===s.length)return null===Ia(p,s)?[s]:[];for(var h=0,d=0,g=[];d<s.length;){p.lastIndex=Sy?d:0;var m,v=Ia(p,Sy?s:s.slice(d));if(null===v||(m=Ey(ce(p.lastIndex+(Sy?0:d)),s.length))===h)d=Ma(s,d,c);else{if(g.push(s.slice(h,d)),g.length===f)return g;for(var y=1;y<=v.length-1;y++)if(g.push(v[y]),g.length===f)return g;d=h=m}}return g.push(s.slice(h)),g}]}),!Sy);var Ty=function(){function e(t){if(Ln(this,e),void 0===t)throw new zp({code:Wp.MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS,message:af});if(void 0===t.tim)throw new zp({code:Wp.MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS,message:"".concat(af,".tim")});this.list=new Map,this._latestMessageSentByPeerMap=new Map,this._latestMessageSentByMeMap=new Map,this.tim=t.tim,this._initializeOptions(t)}return bn(e,[{key:"getLocalOldestMessageByConversationID",value:function(e){if(!e)return null;if(!this.list.has(e))return null;var t=this.list.get(e).values();return t?t.next().value:null}},{key:"_initializeOptions",value:function(e){this.options={};var t={memory:{maxDatasPerKey:100,maxBytesPerData:256,maxKeys:0},cache:{maxDatasPerKey:10,maxBytesPerData:256,maxKeys:0}};for(var n in t)if(Object.prototype.hasOwnProperty.call(t,n)){if(void 0===e[n]){this.options[n]=t[n];continue}var r=t[n];for(var o in r)if(Object.prototype.hasOwnProperty.call(r,o)){if(void 0===e[n][o]){this.options[n][o]=r[o];continue}this.options[n][o]=e[n][o]}}}},{key:"pushIn",value:function(e){var t=e.conversationID,n=e.ID,r=!0;return this.list.has(t)||this.list.set(t,new Map),this.list.has(t)&&this.list.get(t).has(n)?r=!1:(this.list.get(t).set(n,e),this._setLatestMessageSentByPeer(t,e),this._setLatestMessageSentByMe(t,e)),r}},{key:"unshift",value:function(e){var t;if(Ns(e)?e.length>0&&(t=e[0].conversationID,this._unshiftMultipleMessages(e)):(t=e.conversationID,this._unshiftSingleMessage(e)),t&&t.startsWith(En.CONV_C2C)){var n=Array.from(this.list.get(t).values()),r=n.length;if(0===r)return;for(var o=r-1;o>=0;o--)if("out"===n[o].flow){this._setLatestMessageSentByMe(t,n[o]);break}for(var i=r-1;i>=0;i--)if("in"===n[i].flow){this._setLatestMessageSentByPeer(t,n[i]);break}}}},{key:"_unshiftSingleMessage",value:function(e){var t=e.conversationID,n=e.ID;if(!this.list.has(t))return this.list.set(t,new Map),void this.list.get(t).set(n,e);var r=Array.from(this.list.get(t));r.unshift([n,e]),this.list.set(t,new Map(r))}},{key:"_unshiftMultipleMessages",value:function(e){for(var t=e.length,n=[],r=e[0].conversationID,o=this.list.has(r)?Array.from(this.list.get(r)):[],i=0;i<t;i++)n.push([e[i].ID,e[i]]);this.list.set(r,new Map(n.concat(o)))}},{key:"remove",value:function(e){var t=e.conversationID,n=e.ID;this.list.has(t)&&this.list.get(t).delete(n)}},{key:"revoke",value:function(e,t,n){if(Ts.debug("revoke message",e,t,n),this.list.has(e)){var r,o=tr(this.list.get(e));try{for(o.s();!(r=o.n()).done;){var i=Wn(r.value,2)[1];if(i.sequence===t&&!i.isRevoked&&(Ls(n)||i.random===n))return i.isRevoked=!0,i}}catch(a){o.e(a)}finally{o.f()}}return null}},{key:"removeByConversationID",value:function(e){this.list.has(e)&&(this.list.delete(e),this._latestMessageSentByPeerMap.delete(e),this._latestMessageSentByMeMap.delete(e))}},{key:"updateMessageIsPeerReadProperty",value:function(e,t){var n=[];if(this.list.has(e)){var r,o=tr(this.list.get(e));try{for(o.s();!(r=o.n()).done;){var i=Wn(r.value,2)[1];i.time<=t&&!i.isPeerRead&&"out"===i.flow&&(i.isPeerRead=!0,n.push(i))}}catch(a){o.e(a)}finally{o.f()}Ts.log("MessagesList.updateMessageIsPeerReadProperty conversationID=".concat(e," peerReadTime=").concat(t," count=").concat(n.length))}return n}},{key:"hasLocalMessageList",value:function(e){return this.list.has(e)}},{key:"getLocalMessageList",value:function(e){return this.hasLocalMessageList(e)?Yn(this.list.get(e).values()):[]}},{key:"hasLocalMessage",value:function(e,t){return!!this.hasLocalMessageList(e)&&this.list.get(e).has(t)}},{key:"getLocalMessage",value:function(e,t){return this.hasLocalMessage(e,t)?this.list.get(e).get(t):null}},{key:"_setLatestMessageSentByPeer",value:function(e,t){e.startsWith(En.CONV_C2C)&&"in"===t.flow&&this._latestMessageSentByPeerMap.set(e,t)}},{key:"_setLatestMessageSentByMe",value:function(e,t){e.startsWith(En.CONV_C2C)&&"out"===t.flow&&this._latestMessageSentByMeMap.set(e,t)}},{key:"getLatestMessageSentByPeer",value:function(e){return this._latestMessageSentByPeerMap.get(e)}},{key:"getLatestMessageSentByMe",value:function(e){return this._latestMessageSentByMeMap.get(e)}},{key:"modifyMessageSentByPeer",value:function(e){var t=this.list.get(e);if(!cu(t)){var n=Array.from(t.values()),r=n.length;if(0!==r){for(var o=null,i=null,a=0,s=!1,u=r-1;u>=0;u--)"in"===n[u].flow&&(null===i?i=n[u]:((o=n[u]).nick!==i.nick&&(o.setNickAndAvatar({nick:i.nick}),s=!0),o.avatar!==i.avatar&&(o.setNickAndAvatar({avatar:i.avatar}),s=!0),s&&(a+=1)));Ts.log("MessagesList.modifyMessageSentByPeer conversationID=".concat(e," count=").concat(a))}}}},{key:"modifyMessageSentByMe",value:function(e){var t=e.conversationID,n=e.latestNick,r=e.latestAvatar,o=this.list.get(t);if(!cu(o)){var i=Array.from(o.values()),a=i.length;if(0!==a){for(var s=null,u=0,c=!1,l=a-1;l>=0;l--)"out"===i[l].flow&&((s=i[l]).nick!==n&&(s.setNickAndAvatar({nick:n}),c=!0),s.avatar!==r&&(s.setNickAndAvatar({avatar:r}),c=!0),c&&(u+=1));Ts.log("MessagesList.modifyMessageSentByMe conversationID=".concat(t," count=").concat(u))}}}},{key:"reset",value:function(){this.list.clear(),this._latestMessageSentByPeerMap.clear(),this._latestMessageSentByMeMap.clear()}}]),e}(),Dy=function(){function e(t){Ln(this,e),this.tim=t}return bn(e,[{key:"setMessageRead",value:function(e){var t=e.conversationID,n=e.messageID,r=this.tim.conversationController,o=r.getLocalConversation(t);if(Ts.log("ReadReportHandler.setMessageRead conversationID=".concat(t," unreadCount=").concat(o?o.unreadCount:0)),!o)return rg();if(o.type!==En.CONV_GROUP||cu(o.groupAtInfoList)||r.deleteGroupAtTips(t),0===o.unreadCount)return rg();var i=n?this.tim.messageController.getLocalMessage(t,n):null;switch(o.type){case En.CONV_C2C:return this._setC2CMessageRead({conversationID:t,lastMessageTime:i?i.time:o.lastMessage.lastTime});case En.CONV_GROUP:return this._setGroupMessageRead({conversationID:t,lastMessageSeq:i?i.sequence:o.lastMessage.lastSequence});case En.CONV_SYSTEM:return o.unreadCount=0,rg();default:return rg()}}},{key:"_setC2CMessageRead",value:function(e){var t=this,n=e.conversationID,r=e.lastMessageTime;Ts.log("ReadReportHandler._setC2CMessageRead conversationID=".concat(n," lastMessageTime=").concat(r)),ks(r)||Ts.warn("ReadReportHandler._setC2CMessageRead 请勿修改 Conversation.lastMessage.lastTime，否则可能会导致已读上报结果不准确");var o=new Mg(Gg);return o.setText("".concat(n,"-").concat(r)),this.tim.messageController.request({name:"conversation",action:"setC2CMessageRead",param:{C2CMsgReaded:{cookie:"",C2CMsgReadedItem:[{toAccount:n.replace("C2C",""),lastMessageTime:r,receipt:1}]}}}).then((function(){return o.setNetworkType(t.tim.netMonitor.getNetworkType()).setEnd(),Ts.log("ReadReportHandler._setC2CMessageRead ok."),t.updateIsReadAfterReadReport({conversationID:n,lastMessageTime:r}),t.updateUnreadCount(n),new eg})).catch((function(e){return t.tim.netMonitor.probe().then((function(t){var n=Wn(t,2),r=n[0],i=n[1];o.setError(e,r,i).setEnd()})),Ts.log("ReadReportHandler._setC2CMessageRead failed. ".concat(Vs(e))),og(e)}))}},{key:"_setGroupMessageRead",value:function(e){var t=this,n=e.conversationID,r=e.lastMessageSeq;Ts.log("ReadReportHandler._setGroupMessageRead conversationID=".concat(n," lastMessageSeq=").concat(r)),ks(r)||Ts.warn("ReadReportHandler._setGroupMessageRead 请勿修改 Conversation.lastMessage.lastSequence，否则可能会导致已读上报结果不准确");var o=new Mg(Ug);return o.setText("".concat(n,"-").concat(r)),this.tim.messageController.request({name:"conversation",action:"setGroupMessageRead",param:{groupID:n.replace("GROUP",""),messageReadSeq:r}}).then((function(){return o.setNetworkType(t.tim.netMonitor.getNetworkType()).setEnd(),Ts.log("ReadReportHandler._setGroupMessageRead ok."),t.updateIsReadAfterReadReport({conversationID:n,lastMessageSeq:r}),t.updateUnreadCount(n),new eg})).catch((function(e){return t.tim.netMonitor.probe().then((function(t){var n=Wn(t,2),r=n[0],i=n[1];o.setError(e,r,i).setEnd()})),Ts.log("ReadReportHandler._setGroupMessageRead failed. ".concat(Vs(e))),og(e)}))}},{key:"updateUnreadCount",value:function(e){var t=this.tim,n=t.conversationController,r=t.messageController,o=n.getLocalConversation(e),i=r.getLocalMessageList(e);o&&(o.unreadCount=i.filter((function(e){return!e.isRead&&!e.getOnlineOnlyFlag()})).length,Ts.log("ReadReportHandler.updateUnreadCount conversationID=".concat(o.conversationID," unreadCount=").concat(o.unreadCount)))}},{key:"updateIsReadAfterReadReport",value:function(e){var t=e.conversationID,n=e.lastMessageSeq,r=e.lastMessageTime,o=this.tim.messageController.getLocalMessageList(t);if(0!==o.length)for(var i,a=o.length-1;a>=0;a--)if(i=o[a],!(r&&i.time>r||n&&i.sequence>n)){if("in"===i.flow&&i.isRead)break;i.setIsRead(!0)}}},{key:"updateIsRead",value:function(e){var t=this.tim,n=t.conversationController,r=t.messageController,o=n.getLocalConversation(e),i=r.getLocalMessageList(e);if(o&&0!==i.length&&!nu(o.type)){for(var a=[],s=0;s<i.length;s++)"in"!==i[s].flow?"out"!==i[s].flow||i[s].isRead||i[s].setIsRead(!0):a.push(i[s]);var u=0;if(o.type===En.CONV_C2C){var c=a.slice(-o.unreadCount).filter((function(e){return e.isRevoked})).length;u=a.length-o.unreadCount-c}else u=a.length-o.unreadCount;for(var l=0;l<u&&!a[l].isRead;l++)a[l].setIsRead(!0)}}}]),e}(),ky=it.findIndex,Ay=!0,Oy=lt("findIndex");"findIndex"in[]&&Array(1).findIndex((function(){Ay=!1})),Ne({target:"Array",proto:!0,forced:Ay||!Oy},{findIndex:function(e){return ky(this,e,arguments.length>1?arguments[1]:void 0)}}),lr("findIndex");var Ry=function(){function e(t){var n=t.tim,r=t.messageController;Ln(this,e),this.tim=n,this.messageController=r,this.completedMap=new Map,this._initListener()}return bn(e,[{key:"getMessageList",value:function(e){var t=this,n=e.conversationID,r=e.nextReqMessageID,o=e.count;if(this.tim.groupController.checkJoinedAVChatRoomByID(n.replace("GROUP","")))return Ts.log("GetMessageHandler.getMessageList not available in avchatroom. conversationID=".concat(n)),rg({messageList:[],nextReqMessageID:"",isCompleted:!0});(Ls(o)||o>15)&&(o=15);var i=this._computeLeftCount({conversationID:n,nextReqMessageID:r});return Ts.log("GetMessageHandler.getMessageList. conversationID=".concat(n," leftCount=").concat(i," count=").concat(o," nextReqMessageID=").concat(r)),this._needGetHistory({conversationID:n,leftCount:i,count:o})?this.messageController.getHistoryMessages({conversationID:n,count:20}).then((function(){return i=t._computeLeftCount({conversationID:n,nextReqMessageID:r}),new eg(t._computeResult({conversationID:n,nextReqMessageID:r,count:o,leftCount:i}))})):(Ts.log("GetMessageHandler.getMessageList. get messagelist from memory"),this.messageController.modifyMessageList(n),rg(this._computeResult({conversationID:n,nextReqMessageID:r,count:o,leftCount:i})))}},{key:"setCompleted",value:function(e){Ts.log("GetMessageHandler.setCompleted. conversationID=".concat(e)),this.completedMap.set(e,!0)}},{key:"deleteCompletedItem",value:function(e){Ts.log("GetMessageHandler.deleteCompletedItem. conversationID=".concat(e)),this.completedMap.delete(e)}},{key:"_initListener",value:function(){var e=this;this.tim.innerEmitter.on(Gd,(function(){e.setCompleted(En.CONV_SYSTEM)})),this.tim.innerEmitter.on(bd,(function(t){var n=t.data;e.setCompleted("".concat(En.CONV_GROUP).concat(n))}))}},{key:"_getMessageListSize",value:function(e){return this.messageController.getLocalMessageList(e).length}},{key:"_needGetHistory",value:function(e){var t=e.conversationID,n=e.leftCount,r=e.count,o=this.tim.conversationController.getLocalConversation(t),i=!!o&&o.type===En.CONV_SYSTEM,a=!!o&&o.subType===En.GRP_AVCHATROOM;return!i&&!a&&(n<r&&!this.completedMap.has(t))}},{key:"_computeResult",value:function(e){var t=e.conversationID,n=e.nextReqMessageID,r=e.count,o=e.leftCount,i=this._computeMessageList({conversationID:t,nextReqMessageID:n,count:r}),a=this._computeIsCompleted({conversationID:t,leftCount:o,count:r}),s=this._computeNextReqMessageID({messageList:i,isCompleted:a,conversationID:t});return Ts.log("GetMessageHandler._computeResult. conversationID=".concat(t," leftCount=").concat(o," count=").concat(r," nextReqMessageID=").concat(s," nums=").concat(i.length," isCompleted=").concat(a)),{messageList:i,nextReqMessageID:s,isCompleted:a}}},{key:"_computeNextReqMessageID",value:function(e){var t=e.messageList,n=e.isCompleted,r=e.conversationID;if(!n)return 0===t.length?"":t[0].ID;var o=this.messageController.getLocalMessageList(r);return 0===o.length?"":o[0].ID}},{key:"_computeMessageList",value:function(e){var t=e.conversationID,n=e.nextReqMessageID,r=e.count,o=this.messageController.getLocalMessageList(t),i=this._computeIndexEnd({nextReqMessageID:n,messageList:o}),a=this._computeIndexStart({indexEnd:i,count:r});return o.slice(a,i)}},{key:"_computeIndexEnd",value:function(e){var t=e.messageList,n=void 0===t?[]:t,r=e.nextReqMessageID;return r?n.findIndex((function(e){return e.ID===r})):n.length}},{key:"_computeIndexStart",value:function(e){var t=e.indexEnd,n=e.count;return t>n?t-n:0}},{key:"_computeLeftCount",value:function(e){var t=e.conversationID,n=e.nextReqMessageID;return n?this.messageController.getLocalMessageList(t).findIndex((function(e){return e.ID===n})):this._getMessageListSize(t)}},{key:"_computeIsCompleted",value:function(e){var t=e.conversationID;return!!(e.leftCount<=e.count&&this.completedMap.has(t))}},{key:"reset",value:function(){Ts.log("GetMessageHandler.reset"),this.completedMap.clear()}}]),e}(),Ny=function e(t){Ln(this,e),this.value=t,this.next=null},Ly=function(){function e(t){Ln(this,e),this.MAX_LENGTH=t,this.pTail=null,this.pNodeToDel=null,this.map=new Map,Ts.log("SinglyLinkedList init MAX_LENGTH=".concat(this.MAX_LENGTH))}return bn(e,[{key:"pushIn",value:function(e){var t=new Ny(e);if(this.map.size<this.MAX_LENGTH)null===this.pTail?(this.pTail=t,this.pNodeToDel=t):(this.pTail.next=t,this.pTail=t),this.map.set(e,1);else{var n=this.pNodeToDel;this.pNodeToDel=this.pNodeToDel.next,this.map.delete(n.value),n.next=null,n=null,this.pTail.next=t,this.pTail=t,this.map.set(e,1)}}},{key:"has",value:function(e){return this.map.has(e)}},{key:"tail",value:function(){return this.pTail}},{key:"size",value:function(){return this.map.size}},{key:"data",value:function(){return Array.from(this.map.keys())}},{key:"reset",value:function(){for(var e;null!==this.pNodeToDel;)e=this.pNodeToDel,this.pNodeToDel=this.pNodeToDel.next,e.next=null,e=null;this.pTail=null,this.map.clear()}}]),e}(),wy=function(){function e(t){Ln(this,e),this.tim=t}return bn(e,[{key:"upload",value:function(e){if(!0===e.getRelayFlag())return Promise.resolve();switch(e.type){case En.MSG_IMAGE:return this._uploadImage(e);case En.MSG_FILE:return this._uploadFile(e);case En.MSG_AUDIO:return this._uploadAudio(e);case En.MSG_VIDEO:return this._uploadVideo(e);default:return Promise.resolve()}}},{key:"_uploadImage",value:function(e){var t=this.tim,n=t.uploadController,r=t.messageController,o=e.getElements()[0],i=r.getMessageOptionByID(e.messageID);return n.uploadImage({file:i.payload.file,to:i.to,onProgress:function(e){if(o.updatePercent(e),bs(i.onProgress))try{i.onProgress(e)}catch(t){return og(new zp({code:Wp.MESSAGE_ONPROGRESS_FUNCTION_ERROR,message:"".concat(lf)}))}}}).then((function(t){var n=t.location,r=t.fileType,i=t.fileSize,a=t.width,s=t.height,u=Js(n);o.updateImageFormat(r);var c=au({originUrl:u,originWidth:a,originHeight:s,min:198}),l=au({originUrl:u,originWidth:a,originHeight:s,min:720});return o.updateImageInfoArray([{size:i,url:u,width:a,height:s},Un({},l),Un({},c)]),e}))}},{key:"_uploadFile",value:function(e){var t=this.tim,n=t.uploadController,r=t.messageController,o=e.getElements()[0],i=r.getMessageOptionByID(e.messageID);return n.uploadFile({file:i.payload.file,to:i.to,onProgress:function(e){if(o.updatePercent(e),bs(i.onProgress))try{i.onProgress(e)}catch(t){return og(new zp({code:Wp.MESSAGE_ONPROGRESS_FUNCTION_ERROR,message:"".concat(lf)}))}}}).then((function(t){var n=t.location,r=Js(n);return o.updateFileUrl(r),e}))}},{key:"_uploadAudio",value:function(e){var t=this.tim,n=t.uploadController,r=t.messageController,o=e.getElements()[0],i=r.getMessageOptionByID(e.messageID);return n.uploadAudio({file:i.payload.file,to:i.to,onProgress:function(e){if(o.updatePercent(e),bs(i.onProgress))try{i.onProgress(e)}catch(t){return og(new zp({code:Wp.MESSAGE_ONPROGRESS_FUNCTION_ERROR,message:"".concat(lf)}))}}}).then((function(t){var n=t.location,r=Js(n);return o.updateAudioUrl(r),e}))}},{key:"_uploadVideo",value:function(e){var t=this.tim,n=t.uploadController,r=t.messageController,o=e.getElements()[0],i=r.getMessageOptionByID(e.messageID);return n.uploadVideo({file:i.payload.file,to:i.to,onProgress:function(e){if(o.updatePercent(e),bs(i.onProgress))try{i.onProgress(e)}catch(t){return og(new zp({code:Wp.MESSAGE_ONPROGRESS_FUNCTION_ERROR,message:"".concat(lf)}))}}}).then((function(t){var n=Js(t.location);return o.updateVideoUrl(n),e}))}}]),e}(),by="MergerMessageHandler",Py=function(){function e(t){Ln(this,e),this.messageController=t}return bn(e,[{key:"uploadMergerMessage",value:function(e,t){var n=this;Ts.debug("".concat(by,".uploadMergerMessage message:"),e,"messageBytes=".concat(t));var r=e.payload.messageList,o=r.length,i=new Mg(Fg);return this.messageController.request({name:"mergerMessage",action:"create",param:{messageList:r}}).then((function(e){Ts.debug("".concat(by,".uploadMergerMessage ok. response:"),e.data);var r=e.data,a=r.pbDownloadKey,s=r.downloadKey,u={pbDownloadKey:a,downloadKey:s,messageNumber:o};return i.setNetworkType(n.messageController.getNetworkType()).setText("".concat(o,"-").concat(t,"-").concat(s)).setEnd(),u})).catch((function(e){throw Ts.warn("".concat(by,".uploadMergerMessage failed. error:"),e),n.messageController.probeNetwork().then((function(t){var n=Wn(t,2),r=n[0],o=n[1];i.setError(e,r,o).setEnd()})),e}))}},{key:"downloadMergerMessage",value:function(e){var t=this;Ts.debug("".concat(by,".downloadMergerMessage message:"),e);var n=e.payload.downloadKey,r=new Mg(Vg);return r.setText(n),this.messageController.request({name:"mergerMessage",action:"query",param:{downloadKey:n}}).then((function(n){if(Ts.debug("".concat(by,".downloadMergerMessage ok. response:"),n.data),bs(e.clearElement)){var o=e.payload,i=(o.downloadKey,o.pbDownloadKey,o.messageList,Kn(o,["downloadKey","pbDownloadKey","messageList"]));e.clearElement(),e.setElement({type:e.type,content:Un({messageList:n.data.messageList},i)})}else{var a=[];n.data.messageList.forEach((function(e){if(!cu(e)){var t=new Ch(e);a.push(t)}})),e.payload.messageList=a,e.payload.downloadKey="",e.payload.pbDownloadKey=""}return r.setNetworkType(t.messageController.getNetworkType()).setEnd(),e})).catch((function(e){throw Ts.warn("".concat(by,".downloadMergerMessage failed. key:").concat(n," error:"),e),t.messageController.probeNetwork().then((function(t){var n=Wn(t,2),o=n[0],i=n[1];r.setError(e,o,i).setEnd()})),e}))}},{key:"createMergerMessagePack",value:function(e,t,n){return e.conversationType===En.CONV_C2C?this._createC2CMergerMessagePack(e,t,n):this._createGroupMergerMessagePack(e,t,n)}},{key:"_createC2CMergerMessagePack",value:function(e,t,n){var r=null;t&&(t.offlinePushInfo&&(r=t.offlinePushInfo),!0===t.onlineUserOnly&&(r?r.disablePush=!0:r={disablePush:!0}));var o="";As(e.cloudCustomData)&&e.cloudCustomData.length>0&&(o=e.cloudCustomData);var i=n.pbDownloadKey,a=n.downloadKey,s=n.messageNumber,u=e.payload,c=u.title,l=u.abstractList,p=u.compatibleText;return{name:"c2cMessage",action:"create",tjgID:this.messageController.generateTjgID(e),param:{toAccount:e.to,msgBody:[{msgType:e.type,msgContent:{pbDownloadKey:i,downloadKey:a,title:c,abstractList:l,compatibleText:p,messageNumber:s}}],cloudCustomData:o,msgSeq:e.sequence,msgRandom:e.random,msgLifeTime:this.messageController.isOnlineMessage(e,t)?0:void 0,offlinePushInfo:r?{pushFlag:!0===r.disablePush?1:0,title:r.title||"",desc:r.description||"",ext:r.extension||"",apnsInfo:{badgeMode:!0===r.ignoreIOSBadge?1:0},androidInfo:{OPPOChannelID:r.androidOPPOChannelID||""}}:void 0}}}},{key:"_createGroupMergerMessagePack",value:function(e,t,n){var r=null;t&&t.offlinePushInfo&&(r=t.offlinePushInfo);var o="";As(e.cloudCustomData)&&e.cloudCustomData.length>0&&(o=e.cloudCustomData);var i=n.pbDownloadKey,a=n.downloadKey,s=n.messageNumber,u=e.payload,c=u.title,l=u.abstractList,p=u.compatibleText;return{name:"groupMessage",action:"create",tjgID:this.messageController.generateTjgID(e),param:{groupID:e.to,msgBody:[{msgType:e.type,msgContent:{pbDownloadKey:i,downloadKey:a,title:c,abstractList:l,compatibleText:p,messageNumber:s}}],random:e.random,priority:e.priority,clientSequence:e.clientSequence,groupAtInfo:void 0,cloudCustomData:o,onlineOnlyFlag:this.messageController.isOnlineMessage(e,t)?1:0,offlinePushInfo:r?{pushFlag:!0===r.disablePush?1:0,title:r.title||"",desc:r.description||"",ext:r.extension||"",apnsInfo:{badgeMode:!0===r.ignoreIOSBadge?1:0},androidInfo:{OPPOChannelID:r.androidOPPOChannelID||""}}:void 0}}}}]),e}(),Gy=function(e){qn(n,e);var t=zn(n);function n(e){var r;return Ln(this,n),(r=t.call(this,e))._initializeMembers(),r._initializeListener(),r._initializeHandlers(),r.messageOptionMap=new Map,r}return bn(n,[{key:"_initializeMembers",value:function(){this.messagesList=new Ty({tim:this.tim}),this.currentMessageKey={},this.singlyLinkedList=new Ly(100),this._peerReadTimeMap=new Map}},{key:"_initializeHandlers",value:function(){this.readReportHandler=new Dy(this.tim,this),this.getMessageHandler=new Ry({messageController:this,tim:this.tim}),this.uploadFileHandler=new wy(this.tim),this.mergerMessageHandler=new Py(this)}},{key:"reset",value:function(){this.messagesList.reset(),this.currentMessageKey={},this.getMessageHandler.reset(),this.singlyLinkedList.reset(),this._peerReadTimeMap.clear(),this.messageOptionMap.clear()}},{key:"_initializeListener",value:function(){var e=this.tim.innerEmitter;e.on(ld,this._onReceiveC2CMessage,this),e.on(Jh,this._onSyncMessagesProcessing,this),e.on(Xh,this._onSyncMessagesFinished,this),e.on(pd,this._onReceiveGroupMessage,this),e.on(fd,this._onReceiveGroupTips,this),e.on(dd,this._onReceiveSystemNotice,this),e.on(vd,this._onReceiveGroupMessageRevokedNotice,this),e.on(yd,this._onReceiveGroupMessageReadNotice,this),e.on(_d,this._onReceiveC2CMessageRevokedNotice,this),e.on(Md,this._onC2CMessageReadReceipt,this),e.on(Id,this._onC2CMessageReadNotice,this),e.on(Ld,this._clearConversationMessages,this)}},{key:"_guardForAVChatRoom",value:function(e){if(e.conversationType===En.CONV_GROUP){var t=this.tim.groupController,n=e.to;return t.hasLocalGroup(n)?Promise.resolve():t.getGroupProfile({groupID:n}).then((function(t){var r=t.data.group.type;if(Ts.log("MessageController._guardForAVChatRoom. groupID=".concat(n," type=").concat(r)),r===En.GRP_AVCHATROOM){var o="userId=".concat(e.from," 未加入群 groupID=").concat(n,"。发消息前先使用 joinGroup 接口申请加群，详细请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#joinGroup");return Ts.warn("MessageController._guardForAVChatRoom sendMessage not allowed. ".concat(o)),og(new zp({code:Wp.MESSAGE_SEND_FAIL,message:o,data:{message:e}}))}return Promise.resolve()}))}return Promise.resolve()}},{key:"sendMessageInstance",value:function(e,t){var n,r=this,o=null;switch(e.conversationType){case En.CONV_C2C:o=this._handleOnSendC2CMessageSuccess.bind(this);break;case En.CONV_GROUP:o=this._handleOnSendGroupMessageSuccess.bind(this);break;default:return og(new zp({code:Wp.MESSAGE_SEND_INVALID_CONVERSATION_TYPE,message:uf}))}return this.singlyLinkedList.pushIn(e.random),this.uploadFileHandler.upload(e).then((function(){return r._guardForAVChatRoom(e).then((function(){var o=null;if(!e.isSendable())return og({code:Wp.MESSAGE_FILE_URL_IS_EMPTY,message:Ef});r._addSendMessageTotalCount(e),n=Date.now();var i=function(e){var t="utf-8";$a&&document&&(t=document.charset.toLowerCase());var n,r,o=0;if(r=e.length,"utf-8"===t||"utf8"===t)for(var i=0;i<r;i++)(n=e.codePointAt(i))<=127?o+=1:n<=2047?o+=2:n<=65535?o+=3:(o+=4,i++);else if("utf-16"===t||"utf16"===t)for(var a=0;a<r;a++)(n=e.codePointAt(a))<=65535?o+=2:(o+=4,a++);else o=e.replace(/[^\x00-\xff]/g,"aa").length;return o}(JSON.stringify(e));return e.type===En.MSG_MERGER&&i>7e3?r.mergerMessageHandler.uploadMergerMessage(e,i).then((function(n){return o=r.mergerMessageHandler.createMergerMessagePack(e,t,n),r.request(o)})):(e.conversationType===En.CONV_C2C?o=r._createC2CMessagePack(e,t):e.conversationType===En.CONV_GROUP&&(o=r._createGroupMessagePack(e,t)),r.request(o))})).then((function(i){r._addSendMessageSuccessCount(e,n);var a=!1;if(e.conversationType===En.CONV_GROUP)e.sequence=i.data.sequence,e.time=i.data.time,e.generateMessageID(r.tim.context.identifier);else if(e.conversationType===En.CONV_C2C){var s=r.messagesList.getLatestMessageSentByMe(e.conversationID);if(s){var u=s.nick,c=s.avatar;u===e.nick&&c===e.avatar||(a=!0)}}return r.messagesList.pushIn(e),o(e,i.data),a&&r.messagesList.modifyMessageSentByMe({conversationID:e.conversationID,latestNick:e.nick,latestAvatar:e.avatar}),r.messageOptionMap.delete(e.messageID),r.isOnlineMessage(e,t)?e.setOnlineOnlyFlag(!0):r.emitInnerEvent(Qh,{eventDataList:[{conversationID:e.conversationID,unreadCount:0,type:e.conversationType,subType:e.conversationSubType,lastMessage:e}]}),e.getRelayFlag()||"TIMImageElem"!==e.type||su(e.payload.imageInfoArray),new eg({message:e})})).catch((function(t){e.status=rc.FAIL;var n=new Mg(Ng);return n.setMessageType(e.type).setText("".concat(r.generateTjgID(e),"-").concat(e.type,"-").concat(e.from,"-").concat(e.to)),r.probeNetwork().then((function(e){var r=Wn(e,2),o=r[0],i=r[1];n.setError(t,o,i).setEnd()})),Ts.error("MessageController.sendMessageInstance error:",t),og(new zp({code:t&&t.code?t.code:Wp.MESSAGE_SEND_FAIL,message:t&&t.message?t.message:of,data:{message:e}}))}))}))}},{key:"_getSendMessageSpecifiedKey",value:function(e){if(e.conversationType===En.CONV_C2C)return lg;if(e.conversationType===En.CONV_GROUP){var t=this.tim.groupController.getLocalGroupProfile(e.to);if(!t)return;var n=t.type;if(Qs(n))return pg;if(Zs(n))return fg;if(eu(n))return hg;if(tu(n))return dg}}},{key:"_addSendMessageTotalCount",value:function(e){var t=this.tim.sumStatController;t.addTotalCount(cg);var n=this._getSendMessageSpecifiedKey(e);n&&t.addTotalCount(n)}},{key:"_addSendMessageSuccessCount",value:function(e,t){var n=this.tim.sumStatController,r=Math.abs(Date.now()-t);n.addSuccessCount(cg),n.addCost(cg,r);var o=this._getSendMessageSpecifiedKey(e);o&&(n.addSuccessCount(o),n.addCost(o,r))}},{key:"resendMessage",value:function(e){return e.isResend=!0,e.status=rc.UNSEND,this.sendMessageInstance(e)}},{key:"_isFileLikeMessage",value:function(e){return[En.MSG_IMAGE,En.MSG_FILE,En.MSG_AUDIO,En.MSG_VIDEO].indexOf(e.type)>=0}},{key:"_resendBinaryTypeMessage",value:function(){}},{key:"_canIUseOnlineOnlyFlag",value:function(e){var t=this.tim.groupController.getJoinedAVChatRoom();return!t||!t.includes(e.to)||e.conversationType!==En.CONV_GROUP}},{key:"isOnlineMessage",value:function(e,t){return!(!this._canIUseOnlineOnlyFlag(e)||!t||!0!==t.onlineUserOnly)}},{key:"_createC2CMessagePack",value:function(e,t){var n=null;t&&(t.offlinePushInfo&&(n=t.offlinePushInfo),!0===t.onlineUserOnly&&(n?n.disablePush=!0:n={disablePush:!0}));var r="";return As(e.cloudCustomData)&&e.cloudCustomData.length>0&&(r=e.cloudCustomData),{name:"c2cMessage",action:"create",tjgID:this.generateTjgID(e),param:{toAccount:e.to,msgBody:e.getElements(),cloudCustomData:r,msgSeq:e.sequence,msgRandom:e.random,msgLifeTime:this.isOnlineMessage(e,t)?0:void 0,nick:e.nick,avatar:e.avatar,offlinePushInfo:n?{pushFlag:!0===n.disablePush?1:0,title:n.title||"",desc:n.description||"",ext:n.extension||"",apnsInfo:{badgeMode:!0===n.ignoreIOSBadge?1:0},androidInfo:{OPPOChannelID:n.androidOPPOChannelID||""}}:void 0}}}},{key:"_handleOnSendC2CMessageSuccess",value:function(e,t){e.status=rc.SUCCESS,e.time=t.time}},{key:"_createGroupMessagePack",value:function(e,t){var n=null;t&&t.offlinePushInfo&&(n=t.offlinePushInfo);var r="";As(e.cloudCustomData)&&e.cloudCustomData.length>0&&(r=e.cloudCustomData);var o=e.getGroupAtInfoList();return{name:"groupMessage",action:"create",tjgID:this.generateTjgID(e),param:{groupID:e.to,msgBody:e.getElements(),cloudCustomData:r,random:e.random,priority:e.priority,clientSequence:e.clientSequence,groupAtInfo:e.type!==En.MSG_TEXT||cu(o)?void 0:o,onlineOnlyFlag:this.isOnlineMessage(e,t)?1:0,offlinePushInfo:n?{pushFlag:!0===n.disablePush?1:0,title:n.title||"",desc:n.description||"",ext:n.extension||"",apnsInfo:{badgeMode:!0===n.ignoreIOSBadge?1:0},androidInfo:{OPPOChannelID:n.androidOPPOChannelID||""}}:void 0}}}},{key:"_handleOnSendGroupMessageSuccess",value:function(e,t){e.sequence=t.sequence,e.time=t.time,e.status=rc.SUCCESS}},{key:"_onReceiveC2CMessage",value:function(e){Ts.debug("MessageController._onReceiveC2CMessage nums=".concat(e.data.length));var t=Date.now(),n=this._newC2CMessageStoredAndSummary({notifiesList:e.data,type:En.CONV_C2C,C2CRemainingUnreadList:e.C2CRemainingUnreadList}),r=n.eventDataList,o=n.result;if(r.length>0&&this.emitInnerEvent(td,{eventDataList:r,result:o}),o.length>0){var i=this.tim.sumStatController;i.addTotalCount(gg),i.addSuccessCount(gg),i.addCost(gg,Date.now()-t),this.emitOuterEvent(Cn.MESSAGE_RECEIVED,o)}}},{key:"_onReceiveGroupMessage",value:function(e){Ts.debug("MessageController._onReceiveGroupMessage nums=".concat(e.data.length));var t=Date.now(),n=this.newGroupMessageStoredAndSummary(e.data),r=n.eventDataList,o=n.result;if(r.length>0&&this.emitInnerEvent(nd,{eventDataList:r,result:o,isGroupTip:!1}),o.length>0){var i=this.tim.sumStatController;i.addTotalCount(gg),i.addSuccessCount(gg),i.addCost(gg,Date.now()-t),this.emitOuterEvent(Cn.MESSAGE_RECEIVED,o)}}},{key:"_onReceiveGroupTips",value:function(e){var t=Date.now(),n=e.data;Ts.debug("MessageController._onReceiveGroupTips nums=".concat(n.length));var r=this.newGroupTipsStoredAndSummary(n),o=r.eventDataList,i=r.result;if(o.length>0&&this.emitInnerEvent(nd,{eventDataList:o,result:i,isGroupTip:!0}),i.length>0){var a=this.tim.sumStatController;a.addTotalCount(gg),a.addSuccessCount(gg),a.addCost(gg,Date.now()-t),this.emitOuterEvent(Cn.MESSAGE_RECEIVED,i)}}},{key:"_onReceiveSystemNotice",value:function(e){var t=Date.now(),n=e.data,r=n.groupSystemNotices,o=n.type;Ts.debug("MessageController._onReceiveSystemNotice nums=".concat(r.length));var i=this.newSystemNoticeStoredAndSummary({notifiesList:r,type:o}),a=i.eventDataList,s=i.result;if(a.length>0&&this.emitInnerEvent(rd,{eventDataList:a,result:s,type:o}),s.length>0&&"poll"===o){var u=this.tim.sumStatController;u.addTotalCount(gg),u.addSuccessCount(gg),u.addCost(gg,Date.now()-t),this.emitOuterEvent(Cn.MESSAGE_RECEIVED,s)}}},{key:"_onReceiveGroupMessageRevokedNotice",value:function(e){var t=this;Ts.debug("MessageController._onReceiveGroupMessageRevokedNotice nums=".concat(e.data.length));var n=[],r=null;e.data.forEach((function(e){var o=e.elements.revokedInfos;Ls(o)||o.forEach((function(e){(r=t.messagesList.revoke("GROUP".concat(e.groupID),e.sequence))&&n.push(r)}))})),0!==n.length&&(this.emitInnerEvent(od,n),this.emitOuterEvent(Cn.MESSAGE_REVOKED,n))}},{key:"_onReceiveGroupMessageReadNotice",value:function(e){var t=this;e.data.forEach((function(e){var n=e.elements.groupMessageReadNotice;Ls(n)||n.forEach((function(e){var n=e.groupID,r=e.lastMessageSeq;Ts.debug("MessageController._onReceiveGroupMessageReadNotice groupID=".concat(n," lastMessageSeq=").concat(r));var o="".concat(En.CONV_GROUP).concat(n);t.readReportHandler.updateIsReadAfterReadReport({conversationID:o,lastMessageSeq:r}),t.readReportHandler.updateUnreadCount(o)}))}))}},{key:"_onReceiveC2CMessageRevokedNotice",value:function(e){var t=this;Ts.debug("MessageController._onReceiveC2CMessageRevokedNotice nums=".concat(e.data.length));var n=[],r=null;e.data.forEach((function(e){if(e.c2cMessageRevokedNotify){var o=e.c2cMessageRevokedNotify.revokedInfos;Ls(o)||o.forEach((function(e){var o=t.tim.context.identifier===e.from?"".concat(En.CONV_C2C).concat(e.to):"".concat(En.CONV_C2C).concat(e.from);(r=t.messagesList.revoke(o,e.sequence,e.random))&&n.push(r)}))}})),0!==n.length&&(this.emitInnerEvent(od,n),this.emitOuterEvent(Cn.MESSAGE_REVOKED,n))}},{key:"_onC2CMessageReadReceipt",value:function(e){var t=this;e.data.forEach((function(e){if(!cu(e.c2cMessageReadReceipt)){var n=e.c2cMessageReadReceipt.to;e.c2cMessageReadReceipt.uinPairReadArray.forEach((function(e){var r=e.peerReadTime;Ts.debug("MessageController._onC2CMessageReadReceipt to=".concat(n," peerReadTime=").concat(r));var o="".concat(En.CONV_C2C).concat(n);t.recordPeerReadTime(o,r),t._updateMessageIsPeerReadProperty(o,r)}))}}))}},{key:"_onC2CMessageReadNotice",value:function(e){var t=this;e.data.forEach((function(e){cu(e.c2cMessageReadNotice)||e.c2cMessageReadNotice.uinPairReadArray.forEach((function(e){var n=e.from,r=e.peerReadTime;Ts.debug("MessageController._onC2CMessageReadNotice from=".concat(n," lastReadTime=").concat(r));var o="".concat(En.CONV_C2C).concat(n);t.readReportHandler.updateIsReadAfterReadReport({conversationID:o,lastMessageTime:r}),t.readReportHandler.updateUnreadCount(o)}))}))}},{key:"_updateMessageIsPeerReadProperty",value:function(e,t){if(e.startsWith(En.CONV_C2C)&&t>0){var n=this.messagesList.updateMessageIsPeerReadProperty(e,t);n.length>0&&this.emitOuterEvent(Cn.MESSAGE_READ_BY_PEER,n)}}},{key:"getPeerReadTime",value:function(e){var t=this;if(!cu(e)){var n=new Mg(xg);return Ts.log("MessageController.getPeerReadTime userIDList:".concat(e)),this.request({name:"c2cPeerReadTime",action:"get",param:{userIDList:e}}).then((function(r){var o=r.data.peerReadTimeList;Ts.log("MessageController.getPeerReadTime ok. peerReadTimeList:".concat(o));for(var i="",a=0;a<e.length;a++)i+="".concat(e[a],"-").concat(o[a]," "),o[a]>0&&t.recordPeerReadTime("C2C".concat(e[a]),o[a]);n.setNetworkType(t.getNetworkType()).setText(i).setEnd()})).catch((function(e){t.probeNetwork().then((function(t){var r=Wn(t,2),o=r[0],i=r[1];n.setError(e,o,i).setEnd()})),Ts.warn("MessageController.getPeerReadTime failed. error:",e)}))}}},{key:"recordPeerReadTime",value:function(e,t){this._peerReadTimeMap.has(e)?this._peerReadTimeMap.get(e)<t&&this._peerReadTimeMap.set(e,t):this._peerReadTimeMap.set(e,t)}},{key:"_clearConversationMessages",value:function(e){var t=e.data;this.messagesList.removeByConversationID(t),this.getMessageHandler.deleteCompletedItem(t)}},{key:"_pushIntoNoticeResult",value:function(e,t){return!(!this.messagesList.pushIn(t)||this.singlyLinkedList.has(t.random))&&(e.push(t),!0)}},{key:"_getNickAndAvatarByUserID",value:function(e){return this.tim.userController.getNickAndAvatarByUserID(e)}},{key:"_newC2CMessageStoredAndSummary",value:function(e){for(var t=e.notifiesList,n=e.type,r=e.C2CRemainingUnreadList,o=e.isFromSync,i=null,a=[],s=[],u={},c=this.tim.bigDataHallwayController,l=0,p=t.length;l<p;l++){var f=t[l];if(f.currentUser=this.tim.context.identifier,f.conversationType=n,f.isSystemMessage=!!f.isSystemMessage,i=new Th(f),f.elements=c.parseElements(f.elements,f.from),i.setElement(f.elements),i.setNickAndAvatar({nick:f.nick,avatar:f.avatar}),!o){var h=i.conversationID,d=!1;if(i.from!==this.tim.context.identifier){var g=this.messagesList.getLatestMessageSentByPeer(h);if(g){var m=g.nick,v=g.avatar;m===i.nick&&v===i.avatar||(d=!0)}}else{var y=this.messagesList.getLatestMessageSentByMe(h);if(y){var _=y.nick,M=y.avatar;_===i.nick&&M===i.avatar||this.messagesList.modifyMessageSentByMe({conversationID:h,latestNick:i.nick,latestAvatar:i.avatar})}}if(!this._pushIntoNoticeResult(s,i))continue;d&&(this.messagesList.modifyMessageSentByPeer(h),this.tim.conversationController.updateUserProfileSpecifiedKey({conversationID:h,nick:i.nick,avatar:i.avatar}))}0!==f.msgLifeTime?void 0===u[i.conversationID]?u[i.conversationID]=a.push({conversationID:i.conversationID,unreadCount:"out"===i.flow?0:1,type:i.conversationType,subType:i.conversationSubType,lastMessage:i})-1:(a[u[i.conversationID]].type=i.conversationType,a[u[i.conversationID]].subType=i.conversationSubType,a[u[i.conversationID]].lastMessage=i,"in"===i.flow&&a[u[i.conversationID]].unreadCount++):i.setOnlineOnlyFlag(!0)}if(Ns(r))for(var I=function(e,t){var n=a.find((function(t){return t.conversationID==="C2C".concat(r[e].from)}));n?n.unreadCount+=r[e].count:a.push({conversationID:"C2C".concat(r[e].from),unreadCount:r[e].count,type:En.CONV_C2C,lastMsgTime:r[e].lastMsgTime})},C=0,E=r.length;C<E;C++)I(C);return{eventDataList:a,result:s}}},{key:"newGroupMessageStoredAndSummary",value:function(e){var t=null,n=[],r={},o=[],i=En.CONV_GROUP,a=this.tim.bigDataHallwayController,s=e.length;s>1&&e.sort((function(e,t){return e.sequence-t.sequence}));for(var u=0;u<s;u++){var c=e[u];if(c.currentUser=this.tim.context.identifier,c.conversationType=i,c.isSystemMessage=!!c.isSystemMessage,t=new Th(c),c.elements=a.parseElements(c.elements,c.from),t.setElement(c.elements),!this._isMessageFromAVChatroom(t))this._pushIntoNoticeResult(o,t)&&(1!==c.onlineOnlyFlag?void 0===r[t.conversationID]?r[t.conversationID]=n.push({conversationID:t.conversationID,unreadCount:"out"===t.flow?0:1,type:t.conversationType,subType:t.conversationSubType,lastMessage:t})-1:(n[r[t.conversationID]].type=t.conversationType,n[r[t.conversationID]].subType=t.conversationSubType,n[r[t.conversationID]].lastMessage=t,"in"===t.flow&&n[r[t.conversationID]].unreadCount++):t.setOnlineOnlyFlag(!0))}return{eventDataList:n,result:o}}},{key:"_isMessageFromAVChatroom",value:function(e){var t=e.conversationID.slice(5);return this.tim.groupController.checkJoinedAVChatRoomByID(t)}},{key:"newGroupTipsStoredAndSummary",value:function(e){for(var t=null,n=[],r=[],o={},i=0,a=e.length;i<a;i++){var s=e[i];if(s.currentUser=this.tim.context.identifier,s.conversationType=En.CONV_GROUP,(t=new Th(s)).setElement({type:En.MSG_GRP_TIP,content:Un(Un({},s.elements),{},{groupProfile:s.groupProfile})}),t.isSystemMessage=!1,!this._isMessageFromAVChatroom(t))this._pushIntoNoticeResult(r,t)&&(void 0===o[t.conversationID]?o[t.conversationID]=n.push({conversationID:t.conversationID,unreadCount:"out"===t.flow?0:1,type:t.conversationType,subType:t.conversationSubType,lastMessage:t})-1:(n[o[t.conversationID]].type=t.conversationType,n[o[t.conversationID]].subType=t.conversationSubType,n[o[t.conversationID]].lastMessage=t,"in"===t.flow&&n[o[t.conversationID]].unreadCount++))}return{eventDataList:n,result:r}}},{key:"newSystemNoticeStoredAndSummary",value:function(e){var t=e.notifiesList,n=e.type,r=null,o=t.length,i=0,a=[],s={conversationID:En.CONV_SYSTEM,unreadCount:0,type:En.CONV_SYSTEM,subType:null,lastMessage:null};for(i=0;i<o;i++){var u=t[i];if(u.elements.operationType!==Mp){u.currentUser=this.tim.context.identifier,u.conversationType=En.CONV_SYSTEM,u.conversationID=En.CONV_SYSTEM,(r=new Th(u)).setElement({type:En.MSG_GRP_SYS_NOTICE,content:Un(Un({},u.elements),{},{groupProfile:u.groupProfile})}),r.isSystemMessage=!0;var c="";if(r.payload.groupProfile&&(c=r.payload.groupProfile.groupID),!this.tim.groupController.checkJoinedAVChatRoomByID(c)||r.payload.operationType!==Ip)(1===r.sequence&&1===r.random||2===r.sequence&&2===r.random)&&(r.sequence=Ks(),r.random=Ks(),r.generateMessageID(u.currentUser),Ts.log("MessageController.newSystemNoticeStoredAndSummary sequence and random maybe duplicated, regenerate. ID=".concat(r.ID))),this._pushIntoNoticeResult(a,r)&&("poll"===n?s.unreadCount++:"sync"===n&&r.setIsRead(!0),s.subType=r.conversationSubType)}}return s.lastMessage=a[a.length-1],{eventDataList:a.length>0?[s]:[],result:a}}},{key:"_onSyncMessagesProcessing",value:function(e){var t=this._newC2CMessageStoredAndSummary({notifiesList:e.data,type:En.CONV_C2C,isFromSync:!0,C2CRemainingUnreadList:e.C2CRemainingUnreadList}),n=t.eventDataList,r=t.result;this.emitInnerEvent(Zh,{eventDataList:n,result:r})}},{key:"_onSyncMessagesFinished",value:function(e){this.triggerReady();var t=this._newC2CMessageStoredAndSummary({notifiesList:e.data.messageList,type:En.CONV_C2C,isFromSync:!0,C2CRemainingUnreadList:e.data.C2CRemainingUnreadList}),n=t.eventDataList,r=t.result;this.emitInnerEvent(ed,{eventDataList:n,result:r})}},{key:"getHistoryMessages",value:function(e){if(e.conversationID===En.CONV_SYSTEM)return rg();!e.count&&(e.count=15),e.count>20&&(e.count=20);var t=this.messagesList.getLocalOldestMessageByConversationID(e.conversationID);t||((t={}).time=0,t.sequence=0,0===e.conversationID.indexOf(En.CONV_C2C)?(t.to=e.conversationID.replace(En.CONV_C2C,""),t.conversationType=En.CONV_C2C):0===e.conversationID.indexOf(En.CONV_GROUP)&&(t.to=e.conversationID.replace(En.CONV_GROUP,""),t.conversationType=En.CONV_GROUP));var n="";switch(t.conversationType){case En.CONV_C2C:return n=e.conversationID.replace(En.CONV_C2C,""),this.getC2CRoamMessages({conversationID:e.conversationID,peerAccount:n,count:e.count,lastMessageTime:void 0===this.currentMessageKey[e.conversationID]?0:t.time});case En.CONV_GROUP:return this.getGroupRoamMessages({conversationID:e.conversationID,groupID:t.to,count:e.count,sequence:t.sequence-1});default:return rg()}}},{key:"getC2CRoamMessages",value:function(e){var t=this,n=e.conversationID,r=void 0!==this.currentMessageKey[n]?this.currentMessageKey[n]:"";Ts.log("MessageController.getC2CRoamMessages toAccount=".concat(e.peerAccount," count=").concat(e.count||15," lastMessageTime=").concat(e.lastMessageTime||0," messageKey=").concat(r));var o=new Mg(wg);return this.request({name:"c2cMessage",action:"query",param:{peerAccount:e.peerAccount,count:e.count||15,lastMessageTime:e.lastMessageTime||0,messageKey:r}}).then((function(i){var a=i.data,s=a.complete,u=a.messageList;Ls(u)?Ts.log("MessageController.getC2CRoamMessages ok. complete=".concat(s," but messageList is undefined!")):Ts.log("MessageController.getC2CRoamMessages ok. complete=".concat(s," nums=").concat(u.length)),o.setNetworkType(t.getNetworkType()).setText("".concat(e.peerAccount,"-").concat(e.count||15,"-").concat(e.lastMessageTime||0,"-").concat(r,"-").concat(s,"-").concat(u?u.length:"undefined")).setEnd(),1===s&&t.getMessageHandler.setCompleted(n);var c=t._roamMessageStore(u,En.CONV_C2C,n);t.modifyMessageList(n),t.readReportHandler.updateIsRead(n),t.currentMessageKey[n]=i.data.messageKey;var l=t._peerReadTimeMap.get(n);if(Ts.log("MessageController.getC2CRoamMessages update isPeerRead property. conversationID=".concat(n," peerReadTime=").concat(l)),l)t._updateMessageIsPeerReadProperty(n,l);else{var p=n.replace(En.CONV_C2C,"");t.getPeerReadTime([p]).then((function(){t._updateMessageIsPeerReadProperty(n,t._peerReadTimeMap.get(n))}))}return c})).catch((function(n){return t.probeNetwork().then((function(t){var i=Wn(t,2),a=i[0],s=i[1];o.setError(n,a,s).setText("".concat(e.peerAccount,"-").concat(e.count||15,"-").concat(e.lastMessageTime||0,"-").concat(r)).setEnd()})),Ts.warn("MessageController.getC2CRoamMessages failed. ".concat(n)),og(n)}))}},{key:"modifyMessageList",value:function(e){if(e.startsWith(En.CONV_C2C)){var t=Date.now();this.messagesList.modifyMessageSentByPeer(e);var n=this._getNickAndAvatarByUserID(this.tim.context.identifier);this.messagesList.modifyMessageSentByMe({conversationID:e,latestNick:n.nick,latestAvatar:n.avatar}),Ts.log("MessageController.modifyMessageList conversationID=".concat(e," cost ").concat(Date.now()-t," ms"))}}},{key:"_computeLastSequence",value:function(e){return e.sequence>=0?Promise.resolve(e.sequence):this.tim.groupController.getGroupLastSequence(e.groupID)}},{key:"getGroupRoamMessages",value:function(e){var t=this,n=new Mg(bg),r=0;return this._computeLastSequence(e).then((function(n){return r=n,Ts.log("MessageController.getGroupRoamMessages groupID=".concat(e.groupID," lastSequence=").concat(r)),t.request({name:"groupMessage",action:"query",param:{groupID:e.groupID,count:21,sequence:r}})})).then((function(o){var i=o.data,a=i.messageList,s=i.complete;Ls(a)?Ts.log("MessageController.getGroupRoamMessages ok. complete=".concat(s," but messageList is undefined!")):Ts.log("MessageController.getGroupRoamMessages ok. complete=".concat(s," nums=").concat(a.length)),n.setNetworkType(t.getNetworkType()).setText("".concat(e.groupID,"-").concat(r,"-").concat(s,"-").concat(a?a.length:"undefined")).setEnd();var u="GROUP".concat(e.groupID);if(2===s||cu(a))return t.getMessageHandler.setCompleted(u),[];var c=t._roamMessageStore(a,En.CONV_GROUP,u);return t.readReportHandler.updateIsRead(u),t._patchConversationLastMessage(u),c})).catch((function(o){return t.probeNetwork().then((function(t){var i=Wn(t,2),a=i[0],s=i[1];n.setError(o,a,s).setText("".concat(e.groupID,"-").concat(r)).setEnd()})),Ts.warn("MessageController.getGroupRoamMessages failed. ".concat(o)),og(o)}))}},{key:"_patchConversationLastMessage",value:function(e){var t=this.tim.conversationController.getLocalConversation(e);if(t){var n=t.lastMessage,r=n.messageForShow,o=n.payload;if(cu(r)||cu(o)){var i=this.messagesList.getLocalMessageList(e);if(0===i.length)return;var a=i[i.length-1];Ts.log("MessageController._patchConversationLastMessage conversationID:".concat(e," payload:"),a.payload),t.updateLastMessage(a)}}}},{key:"_roamMessageStore",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0,r=null,o=[],i=0,a=e.length,s=null,u=t===En.CONV_GROUP,c=this.tim.bigDataHallwayController,l=function(){i=u?e.length-1:0,a=u?0:e.length},p=function(){u?--i:++i},f=function(){return u?i>=a:i<a};for(l();f();p())if(u&&1===e[i].sequence&&this.getMessageHandler.setCompleted(n),1!==e[i].isPlaceMessage)if((r=new Th(e[i])).to=e[i].to,r.isSystemMessage=!!e[i].isSystemMessage,r.conversationType=t,e[i].event===lp.JSON.TYPE.GROUP.TIP?s={type:En.MSG_GRP_TIP,content:Un(Un({},e[i].elements),{},{groupProfile:e[i].groupProfile})}:(e[i].elements=c.parseElements(e[i].elements,e[i].from),s=e[i].elements),u||r.setNickAndAvatar({nick:e[i].nick,avatar:e[i].avatar}),cu(s)){var h=new Mg(qg);h.setText("from:".concat(r.from," to:").concat(r.to," sequence:").concat(r.sequence," event:").concat(e[i].event)),h.setNetworkType(this.getNetworkType()).setEnd()}else r.setElement(s),r.reInitialize(this.tim.context.identifier),o.push(r);return this.messagesList.unshift(o),l=p=f=null,o}},{key:"getLocalMessageList",value:function(e){return this.messagesList.getLocalMessageList(e)}},{key:"getLocalMessage",value:function(e,t){return this.messagesList.getLocalMessage(e,t)}},{key:"hasLocalMessage",value:function(e,t){return this.messagesList.hasLocalMessage(e,t)}},{key:"deleteLocalMessage",value:function(e){e instanceof Th&&this.messagesList.remove(e)}},{key:"revokeMessage",value:function(e){var t,n=this;e.conversationType===En.CONV_C2C?t={name:"c2cMessageWillBeRevoked",action:"create",param:{msgInfo:{fromAccount:e.from,toAccount:e.to,msgSeq:e.sequence,msgRandom:e.random,msgTimeStamp:e.time}}}:e.conversationType===En.CONV_GROUP&&(t={name:"groupMessageWillBeRevoked",action:"create",param:{to:e.to,msgSeqList:[{msgSeq:e.sequence}]}});var r=new Mg(Pg);return r.setMessageType(e.type).setText("".concat(this.generateTjgID(e),"-").concat(e.type,"-").concat(e.from,"-").concat(e.to)),this.request(t).then((function(t){var o=t.data.recallRetList;if(!cu(o)&&0!==o[0].retCode){var i=new zp({code:o[0].retCode,message:$p[o[0].retCode]||pf,data:{message:e}});return r.setCode(i.code).setMessage(i.message).setEnd(),og(i)}return Ts.info("MessageController.revokeMessage ok. ID=".concat(e.ID)),e.isRevoked=!0,r.setEnd(),n.emitInnerEvent(od,[e]),new eg({message:e})})).catch((function(t){n.probeNetwork().then((function(e){var n=Wn(e,2),o=n[0],i=n[1];r.setError(t,o,i).setEnd()}));var o=new zp({code:t&&t.code?t.code:Wp.MESSAGE_REVOKE_FAIL,message:t&&t.message?t.message:pf,data:{message:e}});return Ts.warn("MessageController.revokeMessage failed. ID=".concat(e.ID," code=").concat(o.code," message=").concat(o.message)),og(o)}))}},{key:"setMessageRead",value:function(e){var t=this;return new Promise((function(n,r){t.ready((function(){t.readReportHandler.setMessageRead(e).then(n).catch(r)}))}))}},{key:"getMessageList",value:function(e){return this.getMessageHandler.getMessageList(e)}},{key:"createTextMessage",value:function(e){var t=this.tim.context.identifier;e.currentUser=t;var n=new Th(e),r="string"==typeof e.payload?e.payload:e.payload.text,o=new ic({text:r}),i=this._getNickAndAvatarByUserID(t);return n.setElement(o),n.setNickAndAvatar(i),n}},{key:"createCustomMessage",value:function(e){var t=this.tim.context.identifier;e.currentUser=t;var n=new Th(e),r=new dh({data:e.payload.data,description:e.payload.description,extension:e.payload.extension}),o=this._getNickAndAvatarByUserID(t);return n.setElement(r),n.setNickAndAvatar(o),n}},{key:"createImageMessage",value:function(e){var t=this.tim.context.identifier;e.currentUser=t;var n=new Th(e);if(Ha){var r=e.payload.file;if(Ds(r))return void Ts.warn("小程序环境下调用 createImageMessage 接口时，payload.file 不支持传入 File 对象");var o=r.tempFilePaths[0],i={url:o,name:o.slice(o.lastIndexOf("/")+1),size:r.tempFiles&&r.tempFiles[0].size||1,type:o.slice(o.lastIndexOf(".")+1).toLowerCase()};e.payload.file=i}else if($a&&Ds(e.payload.file)){var a=e.payload.file;e.payload.file={files:[a]}}var s=new Op({imageFormat:lp.IMAGE_FORMAT.UNKNOWN,uuid:this._generateUUID(),file:e.payload.file}),u=this._getNickAndAvatarByUserID(t);return n.setElement(s),n.setNickAndAvatar(u),this.messageOptionMap.set(n.messageID,e),n}},{key:"createFileMessage",value:function(e){if(!Ha){if($a&&Ds(e.payload.file)){var t=e.payload.file;e.payload.file={files:[t]}}var n=this.tim.context.identifier;e.currentUser=n;var r=new Th(e),o=new hh({uuid:this._generateUUID(),file:e.payload.file}),i=this._getNickAndAvatarByUserID(n);return r.setElement(o),r.setNickAndAvatar(i),this.messageOptionMap.set(r.messageID,e),r}Ts.warn("小程序目前不支持选择文件， createFileMessage 接口不可用！")}},{key:"createAudioMessage",value:function(e){if(Ha){var t=e.payload.file;if(Ha){var n={url:t.tempFilePath,name:t.tempFilePath.slice(t.tempFilePath.lastIndexOf("/")+1),size:t.fileSize,second:parseInt(t.duration)/1e3,type:t.tempFilePath.slice(t.tempFilePath.lastIndexOf(".")+1).toLowerCase()};e.payload.file=n}var r=this.tim.context.identifier;e.currentUser=r;var o=new Th(e),i=new Np({second:Math.floor(t.duration/1e3),size:t.fileSize,url:t.tempFilePath,uuid:this._generateUUID()}),a=this._getNickAndAvatarByUserID(r);return o.setElement(i),o.setNickAndAvatar(a),this.messageOptionMap.set(o.messageID,e),o}Ts.warn("createAudioMessage 目前只支持小程序环境下发语音消息")}},{key:"createVideoMessage",value:function(e){var t=this.tim.context.identifier;e.currentUser=t,e.payload.file.thumbUrl="https://web.sdk.qcloud.com/im/assets/images/transparent.png",e.payload.file.thumbSize=1668;var n={};if(Ha){if(Ds(e.payload.file))return void Ts.warn("小程序环境下调用 createVideoMessage 接口时，payload.file 不支持传入 File 对象");var r=e.payload.file;n.url=r.tempFilePath,n.name=r.tempFilePath.slice(r.tempFilePath.lastIndexOf("/")+1),n.size=r.size,n.second=r.duration,n.type=r.tempFilePath.slice(r.tempFilePath.lastIndexOf(".")+1).toLowerCase()}else if($a){if(Ds(e.payload.file)){var o=e.payload.file;e.payload.file.files=[o]}var i=e.payload.file;n.url=window.URL.createObjectURL(i.files[0]),n.name=i.files[0].name,n.size=i.files[0].size,n.second=i.files[0].duration||0,n.type=i.files[0].type.split("/")[1]}e.payload.file.videoFile=n;var a=new Th(e),s=new gh({videoFormat:n.type,videoSecond:Number(n.second.toFixed(0)),videoSize:n.size,remoteVideoUrl:"",videoUrl:n.url,videoUUID:this._generateUUID(),thumbUUID:this._generateUUID(),thumbWidth:e.payload.file.width||200,thumbHeight:e.payload.file.height||200,thumbUrl:e.payload.file.thumbUrl,thumbSize:e.payload.file.thumbSize,thumbFormat:e.payload.file.thumbUrl.slice(e.payload.file.thumbUrl.lastIndexOf(".")+1).toLowerCase()}),u=this._getNickAndAvatarByUserID(t);return a.setElement(s),a.setNickAndAvatar(u),this.messageOptionMap.set(a.messageID,e),a}},{key:"createFaceMessage",value:function(e){var t=this.tim.context.identifier;e.currentUser=t;var n=new Th(e),r=new Rp(e.payload),o=this._getNickAndAvatarByUserID(t);return n.setElement(r),n.setNickAndAvatar(o),n}},{key:"createMergerMessage",value:function(e){var t=this.tim.context.identifier;e.currentUser=t;var n=this._getNickAndAvatarByUserID(t),r=new Th(e),o=new Eh(e.payload);return r.setElement(o),r.setNickAndAvatar(n),r.setRelayFlag(!0),r}},{key:"createForwardMessage",value:function(e){var t=e.to,n=e.conversationType,r=e.priority,o=e.payload,i=this.tim.context.identifier,a=this._getNickAndAvatarByUserID(i);if(o.type===En.MSG_GRP_TIP)return og(new zp({code:Wp.MESSAGE_FORWARD_TYPE_INVALID,message:kf}));var s={to:t,conversationType:n,conversationID:"".concat(n).concat(t),priority:r,isPlaceMessage:0,status:rc.UNSEND,currentUser:i,cloudCustomData:e.cloudCustomData||o.cloudCustomData||""},u=new Th(s);return u.setElement(o.getElements()[0]),u.setNickAndAvatar(a),u.setRelayFlag(!0),u}},{key:"downloadMergerMessage",value:function(e){return this.mergerMessageHandler.downloadMergerMessage(e)}},{key:"_generateUUID",value:function(){var e=this.tim.context;return"".concat(e.SDKAppID,"-").concat(e.identifier,"-").concat(function(){for(var e="",t=32;t>0;--t)e+=Hs[Math.floor(Math.random()*$s)];return e}())}},{key:"generateTjgID",value:function(e){return this.tim.context.tinyID+"-"+e.random}},{key:"getMessageOptionByID",value:function(e){return this.messageOptionMap.get(e)}},{key:"isMessageSentByCurrentInstance",value:function(e){return!(!this.messagesList.hasLocalMessage(e.conversationID,e.ID)&&!this.singlyLinkedList.has(e.random))}},{key:"pushToMessageList",value:function(e){this.messagesList.pushIn(e)}}]),n}(Xd),Uy=function(){function e(t){Ln(this,e),this.userID="",this.avatar="",this.nick="",this.role="",this.joinTime="",this.lastSendMsgTime="",this.nameCard="",this.muteUntil=0,this.memberCustomField=[],this._initMember(t)}return bn(e,[{key:"_initMember",value:function(e){this.updateMember(e)}},{key:"updateMember",value:function(e){var t=[null,void 0,"",0,NaN];e.memberCustomField&&Xs(this.memberCustomField,e.memberCustomField),Fs(this,e,["memberCustomField"],t)}},{key:"updateRole",value:function(e){["Owner","Admin","Member"].indexOf(e)<0||(this.role=e)}},{key:"updateMuteUntil",value:function(e){Ls(e)||(this.muteUntil=Math.floor((Date.now()+1e3*e)/1e3))}},{key:"updateNameCard",value:function(e){Ls(e)||(this.nameCard=e)}},{key:"updateMemberCustomField",value:function(e){e&&Xs(this.memberCustomField,e)}}]),e}(),qy=function(){function e(t){Ln(this,e),this.tim=t.tim,this.groupController=t.groupController,this._initListeners()}return bn(e,[{key:"_initListeners",value:function(){this.tim.innerEmitter.on(nd,this._onReceivedGroupTips,this)}},{key:"_onReceivedGroupTips",value:function(e){var t=this,n=e.data,r=n.result;n.isGroupTip&&r.forEach((function(e){switch(e.payload.operationType){case 1:t._onNewMemberComeIn(e);break;case 2:t._onMemberQuit(e);break;case 3:t._onMemberKickedOut(e);break;case 4:t._onMemberSetAdmin(e);break;case 5:t._onMemberCancelledAdmin(e);break;case 6:t._onGroupProfileModified(e);break;case 7:t._onMemberInfoModified(e);break;default:Ts.warn("GroupTipsHandler._onReceivedGroupTips Unhandled groupTips. operationType=",e.payload.operationType)}}))}},{key:"_onNewMemberComeIn",value:function(e){var t=e.payload,n=t.memberNum,r=t.groupProfile.groupID,o=this.groupController.getLocalGroupProfile(r);o&&ks(n)&&(o.memberNum=n)}},{key:"_onMemberQuit",value:function(e){var t=e.payload,n=t.memberNum,r=t.groupProfile.groupID,o=this.groupController.getLocalGroupProfile(r);o&&ks(n)&&(o.memberNum=n),this.groupController.deleteLocalGroupMembers(r,e.payload.userIDList)}},{key:"_onMemberKickedOut",value:function(e){var t=e.payload,n=t.memberNum,r=t.groupProfile.groupID,o=this.groupController.getLocalGroupProfile(r);o&&ks(n)&&(o.memberNum=n),this.groupController.deleteLocalGroupMembers(r,e.payload.userIDList)}},{key:"_onMemberSetAdmin",value:function(e){var t=this,n=e.payload.groupProfile.groupID;e.payload.userIDList.forEach((function(e){var r=t.groupController.getLocalGroupMemberInfo(n,e);r&&r.updateRole(En.GRP_MBR_ROLE_ADMIN)}))}},{key:"_onMemberCancelledAdmin",value:function(e){var t=this,n=e.payload.groupProfile.groupID;e.payload.userIDList.forEach((function(e){var r=t.groupController.getLocalGroupMemberInfo(n,e);r&&r.updateRole(En.GRP_MBR_ROLE_MEMBER)}))}},{key:"_onGroupProfileModified",value:function(e){var t=this,n=e.payload.newGroupProfile,r=e.payload.groupProfile.groupID,o=this.groupController.getLocalGroupProfile(r);Object.keys(n).forEach((function(e){switch(e){case"ownerID":t._ownerChaged(o,n);break;default:o[e]=n[e]}})),this.groupController.emitGroupListUpdate(!0,!0)}},{key:"_ownerChaged",value:function(e,t){var n=e.groupID,r=this.groupController.getLocalGroupProfile(n),o=this.tim.context.identifier;if(o===t.ownerID){r.updateGroup({selfInfo:{role:En.GRP_MBR_ROLE_OWNER}});var i=this.groupController.getLocalGroupMemberInfo(n,o),a=this.groupController.getLocalGroupProfile(n).ownerID,s=this.groupController.getLocalGroupMemberInfo(n,a);i&&i.updateRole(En.GRP_MBR_ROLE_OWNER),s&&s.updateRole(En.GRP_MBR_ROLE_MEMBER)}}},{key:"_onMemberInfoModified",value:function(e){var t=this,n=e.payload.groupProfile.groupID;e.payload.memberList.forEach((function(e){var r=t.groupController.getLocalGroupMemberInfo(n,e.userID);r&&e.muteTime&&r.updateMuteUntil(e.muteTime)}))}}]),e}(),xy=function(){function e(t){Ln(this,e),this.groupController=t.groupController,this.tim=t.tim,this.pendencyMap=new Map,this._initListener()}return bn(e,[{key:"_initListener",value:function(){this.tim.innerEmitter.on(rd,this._onReceivedGroupSystemNotice,this),this.tim.innerEmitter.on(Xh,this._clearGroupSystemNotice,this)}},{key:"_clearGroupSystemNotice",value:function(){var e=this;this.getPendencyList().then((function(t){t.forEach((function(t){e.pendencyMap.set("".concat(t.from,"_").concat(t.groupID,"_").concat(t.to),t)}));var n=e.tim.messageController.getLocalMessageList(En.CONV_SYSTEM),r=[];n.forEach((function(t){var n=t.payload,o=n.operatorID,i=n.operationType,a=n.groupProfile;if(i===pp){var s="".concat(o,"_").concat(a.groupID,"_").concat(a.to),u=e.pendencyMap.get(s);u&&ks(u.handled)&&0!==u.handled&&r.push(t)}})),e.groupController.deleteGroupSystemNotice({messageList:r})}))}},{key:"getPendencyList",value:function(e){var t=this;return this.groupController.request({name:"group",action:"getGroupPendency",param:{startTime:e&&e.startTime?e.startTime:0,limit:e&&e.limit?e.limit:10,handleAccount:this.tim.context.identifier}}).then((function(e){var n=e.data,r=n.pendencyList;return 0!==n.nextStartTime?t.getPendencyList({startTime:n.nextStartTime}).then((function(e){return[].concat(Yn(r),Yn(e))})):r}))}},{key:"_onReceivedGroupSystemNotice",value:function(e){var t=this,n=e.data,r=n.result;"sync"!==n.type&&r.forEach((function(e){switch(e.payload.operationType){case 1:t._onApplyGroupRequest(e);break;case 2:t._onApplyGroupRequestAgreed(e);break;case 3:t._onApplyGroupRequestRefused(e);break;case 4:t._onMemberKicked(e);break;case 5:t._onGroupDismissed(e);break;case 6:break;case 7:t._onInviteGroup(e);break;case 8:t._onQuitGroup(e);break;case 9:t._onSetManager(e);break;case 10:t._onDeleteManager(e);break;case 11:case 12:case 15:break;case 255:t.groupController.emitOuterEvent(Cn.GROUP_SYSTEM_NOTICE_RECEIVED,{message:e,type:Ip})}}))}},{key:"_onApplyGroupRequest",value:function(e){this.groupController.emitOuterEvent(Cn.GROUP_SYSTEM_NOTICE_RECEIVED,{message:e,type:pp})}},{key:"_onApplyGroupRequestAgreed",value:function(e){var t=this,n=e.payload.groupProfile.groupID;this.groupController.hasLocalGroup(n)||this.groupController.getGroupProfile({groupID:n}).then((function(e){var n=e.data.group;n&&(t.groupController.updateGroupMap([n]),t.groupController.emitGroupListUpdate())})),this.groupController.emitOuterEvent(Cn.GROUP_SYSTEM_NOTICE_RECEIVED,{message:e,type:fp})}},{key:"_onApplyGroupRequestRefused",value:function(e){this.groupController.emitOuterEvent(Cn.GROUP_SYSTEM_NOTICE_RECEIVED,{message:e,type:hp})}},{key:"_onMemberKicked",value:function(e){var t=e.payload.groupProfile.groupID;this.groupController.hasLocalGroup(t)&&this.groupController.deleteLocalGroupAndConversation(t),this.groupController.emitOuterEvent(Cn.GROUP_SYSTEM_NOTICE_RECEIVED,{message:e,type:dp})}},{key:"_onGroupDismissed",value:function(e){var t=e.payload.groupProfile.groupID,n=this.groupController.hasLocalGroup(t),r=this.groupController.AVChatRoomHandler;n&&this.groupController.deleteLocalGroupAndConversation(t),r.checkJoinedAVChatRoomByID(t)&&r.reset(t),this.groupController.emitOuterEvent(Cn.GROUP_SYSTEM_NOTICE_RECEIVED,{message:e,type:gp})}},{key:"_onInviteGroup",value:function(e){var t=this,n=e.payload.groupProfile.groupID;this.groupController.hasLocalGroup(n)||this.groupController.getGroupProfile({groupID:n}).then((function(e){var n=e.data.group;n&&(t.groupController.updateGroupMap([n]),t.groupController.emitGroupListUpdate())})),this.groupController.emitOuterEvent(Cn.GROUP_SYSTEM_NOTICE_RECEIVED,{message:e,type:mp})}},{key:"_onQuitGroup",value:function(e){var t=e.payload.groupProfile.groupID;this.groupController.hasLocalGroup(t)&&this.groupController.deleteLocalGroupAndConversation(t),this.groupController.emitOuterEvent(Cn.GROUP_SYSTEM_NOTICE_RECEIVED,{message:e,type:vp})}},{key:"_onSetManager",value:function(e){var t=e.payload.groupProfile,n=t.to,r=t.groupID,o=this.groupController.getLocalGroupMemberInfo(r,n);o&&o.updateRole(En.GRP_MBR_ROLE_ADMIN),this.groupController.emitOuterEvent(Cn.GROUP_SYSTEM_NOTICE_RECEIVED,{message:e,type:yp})}},{key:"_onDeleteManager",value:function(e){var t=e.payload.groupProfile,n=t.to,r=t.groupID,o=this.groupController.getLocalGroupMemberInfo(r,n);o&&o.updateRole(En.GRP_MBR_ROLE_MEMBER),this.groupController.emitOuterEvent(Cn.GROUP_SYSTEM_NOTICE_RECEIVED,{message:e,type:_p})}},{key:"reset",value:function(){this.pendencyMap.clear()}}]),e}(),Fy=Ye("splice"),Vy=lt("splice",{ACCESSORS:!0,0:0,1:2}),By=Math.max,jy=Math.min;Ne({target:"Array",proto:!0,forced:!Fy||!Vy},{splice:function(e,t){var n,r,o,i,a,s,u=we(this),c=ce(u.length),l=fe(e,c),p=arguments.length;if(0===p?n=r=0:1===p?(n=0,r=c-l):(n=p-2,r=jy(By(se(t),0),c-l)),c+n-r>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(o=Be(u,r),i=0;i<r;i++)(a=l+i)in u&&be(o,i,u[a]);if(o.length=r,n<r){for(i=l;i<c-r;i++)s=i+n,(a=i+r)in u?u[s]=u[a]:delete u[s];for(i=c;i>c-r+n;i--)delete u[i-1]}else if(n>r)for(i=c-r;i>l;i--)s=i+n-1,(a=i+r-1)in u?u[s]=u[a]:delete u[s];for(i=0;i<n;i++)u[i+l]=arguments[i+2];return u.length=c-r+n,o}});var Ky={3:!0,4:!0,5:!0,6:!0},Hy=function(){function e(t){var n=t.tim,r=t.groupController;Ln(this,e),this.tim=n,this.groupController=r,this.sequencesLinkedList=new Ly(100),this.receivedMessageCount=0,this._pollingRequestInfoMap=new Map,this._pollingInstanceMap=new Map,this._joinedGroupMap=new Map,this._reportMessageStackedCount=0,this._onlineMemberCountMap=new Map,this.DEFAULT_EXPIRE_TIME=60}return bn(e,[{key:"hasJoinedAVChatRoom",value:function(){return this._joinedGroupMap.size>0}},{key:"checkJoinedAVChatRoomByID",value:function(e){return this._joinedGroupMap.has(e)}},{key:"getJoinedAVChatRoom",value:function(){return this._joinedGroupMap.size>0?Yn(this._joinedGroupMap.keys()):null}},{key:"start",value:function(e){var t=this._pollingRequestInfoMap.get(e),n={key:t.key,startSeq:t.startSeq};if(this._pollingInstanceMap.has(e)){var r=this._pollingInstanceMap.get(e);r.isRunning()||r.start()}else{var o=this.groupController.createTransportCapsule({name:"AVChatRoom",action:"startLongPoll",param:n}),i=this.tim.connectionController.createRunLoop({pack:o,before:this._updateRequestData.bind(this,e),success:this._handleSuccess.bind(this,e),fail:this._handleFailure.bind(this),isAVChatRoomLoop:!0});i.start(),this._pollingInstanceMap.set(e,i),Ts.log("AVChatRoomHandler.start message channel started. groupID=".concat(e))}}},{key:"stop",value:function(e){var t=this._pollingInstanceMap.get(e);t&&t.isRunning()&&(t.abort(),t.stop(),Ts.log("AVChatRoomHandler.stop message channel stopped. groupID=".concat(e)))}},{key:"startRunLoop",value:function(e){var t=this;return this._precheck().then((function(){var n=e.longPollingKey,r=e.group,o=r.groupID;return t._pollingRequestInfoMap.set(o,{key:n,startSeq:0}),t._joinedGroupMap.set(o,r),t._addAVChatRoomID(o),t.groupController.updateGroupMap([r]),t.groupController.emitGroupListUpdate(!0,!1),t.start(o),t.groupController.isLoggedIn()?rg({status:ec.SUCCESS,group:r}):rg({status:ec.SUCCESS})}))}},{key:"joinWithoutAuth",value:function(e){var t=this;return this.groupController.request({name:"group",action:"applyJoinAVChatRoom",param:e}).then((function(n){var r=n.data.longPollingKey;if(Ls(r))return og(new zp({code:Wp.CANNOT_JOIN_NON_AVCHATROOM_WITHOUT_LOGIN,message:xf}));Ts.log("AVChatRoomHandler.joinWithoutAuth ok. groupID:".concat(e.groupID)),t.groupController.emitInnerEvent(Pd),t.groupController.emitInnerEvent(bd,e.groupID);var o=new fy({groupID:e.groupID});return t.startRunLoop({group:o,longPollingKey:r}),new eg({status:ec.SUCCESS})})).catch((function(t){return Ts.error("AVChatRoomHandler.joinWithoutAuth error:".concat(Vs(t),". groupID:").concat(e.groupID)),og(t)}))}},{key:"_precheck",value:function(){if(this.tim.context.unlimitedAVChatRoom)return Promise.resolve();if(!this.hasJoinedAVChatRoom())return Promise.resolve();var e=Wn(this._joinedGroupMap.entries().next().value,2),t=e[0],n=e[1];if(this.groupController.isLoggedIn()){if(!(n.selfInfo.role===En.GRP_MBR_ROLE_OWNER||n.ownerID===this.tim.loginInfo.identifier))return this.groupController.quitGroup(t);this.groupController.deleteLocalGroupAndConversation(t)}else this.groupController.deleteLocalGroupAndConversation(t);return this.reset(t),Promise.resolve()}},{key:"_updateRequestData",value:function(e,t){var n=this._pollingRequestInfoMap.get(e),r=n.key,o=n.startSeq;t.StartSeq=o,t.Key=r,this.tim.sumStatController.addTotalCount(ug)}},{key:"_handleSuccess",value:function(e,t){this.tim.sumStatController.addSuccessCount(ug),this.tim.sumStatController.addCost(ug,t.data.timecost);var n=t.data,r=n.errorCode,o=n.errorInfo,i=n.key,a=n.nextSeq,s=n.rspMsgList;if(r!==tc.SUCCESS){var u=this._pollingRequestInfoMap.get(e),c=new Mg(vm),l=u?"".concat(u.key,"-").concat(u.startSeq):"requestInfo is undefined";c.setMessage("".concat(e,"-").concat(l,"-").concat(o||JSON.stringify(t.data))).setCode(r).setNetworkType(this.groupController.getNetworkType()).setEnd(!0)}else As(i)&&ks(a)&&this._pollingRequestInfoMap.set(e,{key:i,startSeq:a}),Ns(s)&&s.length>0&&(s.forEach((function(e){e.to=e.groupID})),this._dispatchNotice(s));this.groupController.emitInnerEvent(Ed)}},{key:"_handleFailure",value:function(e){if(e.error)if("ECONNABORTED"===e.error.code||e.error.code===Wp.NETWORK_TIMEOUT)if(e.error.config){var t=e.error.config.url,n=e.error.config.data;Ts.log("AVChatRoomHandler._handleFailure request timed out. url=".concat(t," data=").concat(n))}else Ts.log("AVChatRoomHandler._handleFailure request timed out");else Ts.log("AVChatRoomHandler._handleFailure request failed due to network error");this.groupController.emitInnerEvent(Cd)}},{key:"_dispatchNotice",value:function(e){if(Ns(e)&&0!==e.length){var t=Date.now(),n=null,r=[],o=[],i=e.length;i>1&&e.sort((function(e,t){return e.sequence-t.sequence}));for(var a=0;a<i;a++)if(Ky[e[a].event]){if(this.receivedMessageCount+=1,n=this.packMessage(e[a],e[a].event),this.tim.context.unlimitedAVChatRoom||!this.sequencesLinkedList.has(n.sequence)){var s=n.conversationID;if(this.receivedMessageCount%40==0&&this.tim.messageLossController.detectMessageLoss(s,this.sequencesLinkedList.data()),null!==this.sequencesLinkedList.tail()){var u=this.sequencesLinkedList.tail().value,c=n.sequence-u;c>1&&c<=20?this.tim.messageLossController.onMessageMaybeLost(s,u+1,c-1):c<-1&&c>=-20&&this.tim.messageLossController.onMessageMaybeLost(s,n.sequence+1,Math.abs(c)-1)}this.sequencesLinkedList.pushIn(n.sequence),this._isMessageSentByCurrentInstance(n)||(n.conversationType===En.CONV_SYSTEM&&o.push(n),r.push(n))}}else Ts.warn("AVChatRoomHandler._dispatchMessage 未处理的 event 类型: ".concat(e[a].event));if(o.length>0&&this.groupController.emitInnerEvent(rd,{result:o,eventDataList:[],type:"poll"}),0!==r.length){var l=this.packConversationOption(r);l.length>0&&this.groupController.emitInnerEvent(nd,{eventDataList:l,type:"poll"}),Ts.debug("AVChatRoomHandler._dispatchNotice nums=".concat(r.length));var p=this.tim.sumStatController;p.addTotalCount(mg),p.addSuccessCount(mg),p.addCost(mg,Date.now()-t),this._checkMessageStacked(r),this.groupController.emitOuterEvent(Cn.MESSAGE_RECEIVED,r)}}}},{key:"_checkMessageStacked",value:function(e){var t=e.length;t>=100&&(Ts.warn("AVChatRoomHandler.checkMessageStacked 直播群消息堆积数:".concat(e.length,'！可能会导致微信小程序渲染时遇到 "Dom limit exceeded" 的错误，建议接入侧此时只渲染最近的10条消息')),this._reportMessageStackedCount<5&&(new Mg(Im).setNetworkType(this.groupController.getNetworkType()).setText("nums=".concat(t," groupID=").concat(Yn(this._joinedGroupMap.keys()))).setEnd(),this._reportMessageStackedCount+=1))}},{key:"_isMessageSentByCurrentInstance",value:function(e){return!!this.tim.messageController.isMessageSentByCurrentInstance(e)}},{key:"packMessage",value:function(e,t){e.currentUser=this.tim.context.identifier,e.conversationType=5===t?En.CONV_SYSTEM:En.CONV_GROUP,e.isSystemMessage=!!e.isSystemMessage;var n=new Th(e),r=this.packElements(e,t);return n.setElement(r),n}},{key:"packElements",value:function(e,t){return 4===t||6===t?(this._updateMemberCountByGroupTips(e),{type:En.MSG_GRP_TIP,content:Un(Un({},e.elements),{},{groupProfile:e.groupProfile})}):5===t?{type:En.MSG_GRP_SYS_NOTICE,content:Un(Un({},e.elements),{},{groupProfile:e.groupProfile})}:this.tim.bigDataHallwayController.parseElements(e.elements,e.from)}},{key:"packConversationOption",value:function(e){for(var t=new Map,n=0;n<e.length;n++){var r=e[n],o=r.conversationID;if(t.has(o)){var i=t.get(o);i.lastMessage=r,"in"===r.flow&&i.unreadCount++}else t.set(o,{conversationID:r.conversationID,unreadCount:"out"===r.flow?0:1,type:r.conversationType,subType:r.conversationSubType,lastMessage:r})}return Yn(t.values())}},{key:"_addAVChatRoomID",value:function(e){var t=this.tim.loginInfo.avchatroomIDList||[];t.includes(e)||(this.tim.context.unlimitedAVChatRoom?t.push(e):t.splice(0,1,e),this.tim.loginInfo.avchatroomIDList=t)}},{key:"_deleteAVChatRoomID",value:function(e){var t=this.tim.loginInfo.avchatroomIDList||[],n=t.indexOf(e);-1!==n&&(t.splice(n,1),this.tim.loginInfo.avchatroomIDList=t)}},{key:"joinAVChatRoomSilently",value:function(){var e=this,t=this.tim.loginInfo.avchatroomIDList||[];if(0!==t.length){var n=new Mg(Yg);t.forEach((function(t){e.groupController.joinGroup({groupID:t}).then((function(r){Ts.warn("AVChatRoomHandler.joinAVChatRoomSilently silently join group ok:".concat(t)),n.setCode(r.code).setText("groupID=".concat(t)).setNetworkType(e.groupController.getNetworkType()).setEnd(!0)})).catch((function(r){Ts.warn("AVChatRoomHandler.joinAVChatRoomSilently silently join group failed:".concat(Vs(r))),n.setMessage("".concat(t,"-").concat(JSON.stringify(r))).setCode(r.code).setNetworkType(e.groupController.getNetworkType()).setEnd(!0)}))}))}}},{key:"getGroupOnlineMemberCount",value:function(e){var t=this._onlineMemberCountMap.get(e)||{},n=Date.now();return cu(t)||n-t.lastSyncTime>1e3*t.expireTime&&n-t.latestUpdateTime>1e4&&n-t.lastReqTime>3e3?(t.lastReqTime=n,this._onlineMemberCountMap.set(e,t),this._getGroupOnlineMemberCount(e).then((function(e){return new eg({memberCount:e.memberCount})})).catch((function(e){return og(e)}))):rg({memberCount:t.memberCount})}},{key:"_getGroupOnlineMemberCount",value:function(e){var t=this;return this.groupController.request({name:"group",action:"getOnlineMemberNum",param:{groupID:e}}).then((function(n){var r=t._onlineMemberCountMap.get(e)||{},o=n.data,i=o.onlineMemberNum,a=void 0===i?0:i,s=o.expireTime,u=void 0===s?t.DEFAULT_EXPIRE_TIME:s;Ts.log("AVChatRoomHandler._getGroupOnlineMemberCount ok. groupID=".concat(e," memberCount=").concat(a," expireTime=").concat(u));var c=Date.now();return cu(r)&&(r.lastReqTime=c),t._onlineMemberCountMap.set(e,Object.assign(r,{lastSyncTime:c,latestUpdateTime:c,memberCount:a,expireTime:u})),{memberCount:a}})).catch((function(n){return Ts.warn("AVChatRoomHandler._getGroupOnlineMemberCount failed. error:".concat(Vs(n))),new Mg(gm).setCode(n.code).setMessage("".concat(e,"-").concat(JSON.stringify(n))).setNetworkType(t.groupController.getNetworkType()).setEnd(),Promise.reject(n)}))}},{key:"_updateMemberCountByGroupTips",value:function(e){var t=e.groupProfile.groupID,n=e.elements.onlineMemberInfo,r=void 0===n?void 0:n;if(void 0!==r){var o=r.onlineMemberNum,i=void 0===o?0:o,a=r.expireTime,s=void 0===a?this.DEFAULT_EXPIRE_TIME:a,u=this._onlineMemberCountMap.get(t)||{},c=Date.now();cu(u)?Object.assign(u,{lastReqTime:0,lastSyncTime:0,latestUpdateTime:c,memberCount:i,expireTime:s}):(u.latestUpdateTime=c,u.memberCount=i),Ts.debug("AVChatRoomHandler._updateMemberCountByGroupTips info:",u),this._onlineMemberCountMap.set(t,u)}}},{key:"reset",value:function(e){if(0!==this._pollingInstanceMap.size){if(e)Ts.log("AVChatRoomHandler.reset groupID=".concat(e)),this.stop(e),this._pollingInstanceMap.delete(e),this._joinedGroupMap.delete(e),this._pollingRequestInfoMap.delete(e),this._onlineMemberCountMap.delete(e);else{Ts.log("AVChatRoomHandler.reset all");var t,n=tr(this._pollingInstanceMap.keys());try{for(n.s();!(t=n.n()).done;){var r=t.value;this.stop(r)}}catch(o){n.e(o)}finally{n.f()}this._pollingInstanceMap.clear(),this._joinedGroupMap.clear(),this._pollingRequestInfoMap.clear(),this._onlineMemberCountMap.clear()}this.sequencesLinkedList.reset(),this.receivedMessageCount=0,this._reportMessageStackedCount=0,this._deleteAVChatRoomID(e)}}}]),e}(),$y="GroupController",zy=function(e){qn(n,e);var t=zn(n);function n(e){var r;return Ln(this,n),(r=t.call(this,e)).groupMap=new Map,r.groupMemberListMap=new Map,r.groupNoticeHandler=new xy({tim:e,groupController:Hn(r)}),r.groupTipsHandler=new qy({tim:e,groupController:Hn(r)}),r.AVChatRoomHandler=new Hy({tim:e,groupController:Hn(r)}),r._initListeners(),r}return bn(n,[{key:"createGroup",value:function(e){var t=this,n="".concat($y,".createGroup");if(!["Public","Private","ChatRoom","AVChatRoom"].includes(e.type)){var r=new zp({code:Wp.ILLEGAL_GROUP_TYPE,message:Nf});return og(r)}tu(e.type)&&!Ls(e.memberList)&&e.memberList.length>0&&(Ts.warn("".concat(n,"创建AVChatRoom时不能添加群成员，自动忽略该字段")),e.memberList=void 0),Zs(e.type)||Ls(e.joinOption)||(Ts.warn("".concat(n," 创建Work/Meeting/AVChatRoom群时不能设置字段：joinOption，自动忽略该字段")),e.joinOption=void 0);var o=new Mg(zg);Ts.log("".concat(n));var i=[];return this.request({name:"group",action:"create",param:e}).then((function(r){var a=r.data,s=a.groupID,u=a.overLimitUserIDList,c=void 0===u?[]:u;if(i=c,o.setNetworkType(t.getNetworkType()).setText("groupType=".concat(e.type," groupID=").concat(s," overLimitUserIDList=").concat(c)).setEnd(),Ts.log("".concat(n," ok. groupID:").concat(s," overLimitUserIDList:"),c),e.type===En.GRP_AVCHATROOM)return t.getGroupProfile({groupID:s});cu(e.memberList)||cu(c)||(e.memberList=e.memberList.filter((function(e){return-1===c.indexOf(e.userID)}))),t.updateGroupMap([Un(Un({},e),{},{groupID:s})]);var l=t.tim.createCustomMessage({to:s,conversationType:En.CONV_GROUP,payload:{data:"group_create",extension:"".concat(t.tim.context.identifier,"创建群组")}});return t.tim.sendMessage(l),t.emitGroupListUpdate(),t.getGroupProfile({groupID:s})})).then((function(e){var t=e.data.group;return t.selfInfo.messageRemindType=En.MSG_REMIND_ACPT_AND_NOTE,t.selfInfo.role=En.GRP_MBR_ROLE_OWNER,new eg({group:t,overLimitUserIDList:i})})).catch((function(r){return o.setText("groupType=".concat(e.type)),t.probeNetwork().then((function(e){var t=Wn(e,2),n=t[0],i=t[1];o.setError(r,n,i).setEnd()})),Ts.error("".concat(n," error:"),r),og(r)}))}},{key:"joinGroup",value:function(e){var t=this,n=e.groupID,r=e.type,o="".concat($y,".joinGroup");if(r===En.GRP_WORK){var i=new zp({code:Wp.CANNOT_JOIN_WORK,message:Lf});return og(i)}if(this.hasLocalGroup(n)){if(!this.isLoggedIn())return rg({status:En.JOIN_STATUS_ALREADY_IN_GROUP});var a=new Mg(Wg);return this.getGroupProfile({groupID:n}).then((function(e){return a.setNetworkType(t.getNetworkType()).setText("groupID=".concat(n," joinedStatus=").concat(En.JOIN_STATUS_ALREADY_IN_GROUP)).setEnd(),rg({status:En.JOIN_STATUS_ALREADY_IN_GROUP})})).catch((function(r){return a.setNetworkType(t.getNetworkType()).setText("groupID=".concat(n," unjoined")).setEnd(),Ts.warn("".concat(o," ").concat(n," was unjoined, now join!")),t.groupMap.delete(n),t.applyJoinGroup(e)}))}return Ts.log("".concat(o," groupID:"),n),this.isLoggedIn()?this.applyJoinGroup(e):this.AVChatRoomHandler.joinWithoutAuth(e)}},{key:"quitGroup",value:function(e){var t=this,n="".concat($y,".quitGroup");Ts.log("".concat(n," groupID:"),e);var r=this.AVChatRoomHandler.checkJoinedAVChatRoomByID(e);if(!r&&!this.hasLocalGroup(e)){var o=new zp({code:Wp.MEMBER_NOT_IN_GROUP,message:Gf});return og(o)}if(r&&!this.isLoggedIn())return Ts.log("".concat(n," anonymously ok. groupID:"),e),this.deleteLocalGroupAndConversation(e),this.AVChatRoomHandler.reset(e),rg({groupID:e});var i=new Mg(Jg);return this.request({name:"group",action:"quitGroup",param:{groupID:e}}).then((function(){return i.setNetworkType(t.getNetworkType()).setText("groupID=".concat(e)).setEnd(),Ts.log("".concat(n," ok. groupID:"),e),r&&t.AVChatRoomHandler.reset(e),t.deleteLocalGroupAndConversation(e),new eg({groupID:e})})).catch((function(r){return i.setText("groupID=".concat(e)),t.probeNetwork().then((function(e){var t=Wn(e,2),n=t[0],o=t[1];i.setError(r,n,o).setEnd()})),Ts.error("".concat(n," error. error:").concat(Vs(r)," groupID:").concat(e)),og(r)}))}},{key:"changeGroupOwner",value:function(e){var t=this,n="".concat($y,".changeGroupOwner");if(this.hasLocalGroup(e.groupID)&&this.getLocalGroupProfile(e.groupID).type===En.GRP_AVCHATROOM)return og(new zp({code:Wp.CANNOT_CHANGE_OWNER_IN_AVCHATROOM,message:wf}));if(e.newOwnerID===this.tim.loginInfo.identifier)return og(new zp({code:Wp.CANNOT_CHANGE_OWNER_TO_SELF,message:bf}));var r=new Mg(Qg);return Ts.log("".concat(n," groupID:"),e.groupID),this.request({name:"group",action:"changeGroupOwner",param:e}).then((function(){r.setNetworkType(t.getNetworkType()).setText("groupID=".concat(e.groupID)).setEnd(),Ts.log("".concat(n," ok. groupID:"),e.groupID);var o=e.groupID,i=e.newOwnerID;t.groupMap.get(o).ownerID=i;var a=t.groupMemberListMap.get(o);if(a instanceof Map){var s=a.get(t.tim.loginInfo.identifier);Ls(s)||(s.updateRole("Member"),t.groupMap.get(o).selfInfo.role="Member");var u=a.get(i);Ls(u)||u.updateRole("Owner")}return t.emitGroupListUpdate(!0,!1),new eg({group:t.groupMap.get(o)})})).catch((function(o){return r.setText("groupID=".concat(e.groupID)),t.probeNetwork().then((function(e){var t=Wn(e,2),n=t[0],i=t[1];r.setError(o,n,i).setEnd()})),Ts.error("".concat(n," error:").concat(Vs(o)," groupID:").concat(e.groupID)),og(o)}))}},{key:"dismissGroup",value:function(e){var t=this,n="".concat($y,".dismissGroup");if(this.hasLocalGroup(e)&&this.getLocalGroupProfile(e).type===En.GRP_WORK)return og(new zp({code:Wp.CANNOT_DISMISS_WORK,message:Pf}));var r=new Mg(tm);return Ts.log("".concat(n," groupID:").concat(e)),this.request({name:"group",action:"destroyGroup",param:{groupID:e}}).then((function(){return r.setNetworkType(t.getNetworkType()).setText("groupID=".concat(e)).setEnd(),Ts.log("".concat(n," ok. groupID:").concat(e)),t.deleteLocalGroupAndConversation(e),t.checkJoinedAVChatRoomByID(e)&&t.AVChatRoomHandler.reset(e),new eg({groupID:e})})).catch((function(o){return r.setText("groupID=".concat(e)),t.probeNetwork().then((function(e){var t=Wn(e,2),n=t[0],i=t[1];r.setError(o,n,i).setEnd()})),Ts.error("".concat(n," error:").concat(Vs(o)," groupID:").concat(e)),og(o)}))}},{key:"updateGroupProfile",value:function(e){var t=this,n="".concat($y,".updateGroupProfile");!this.hasLocalGroup(e.groupID)||Zs(this.getLocalGroupProfile(e.groupID).type)||Ls(e.joinOption)||(Ts.warn("".concat(n," Work/Meeting/AVChatRoom群不能设置字段：joinOption，自动忽略该字段")),e.joinOption=void 0),Ls(e.muteAllMembers)||(e.muteAllMembers?e.muteAllMembers="On":e.muteAllMembers="Off");var r=new Mg(nm);return r.setText(JSON.stringify(e)),Ts.log("".concat(n," groupID:"),e.groupID),this.request({name:"group",action:"updateGroupProfile",param:e}).then((function(){(r.setNetworkType(t.getNetworkType()).setEnd(),Ts.log("".concat(n," ok. groupID:"),e.groupID),t.hasLocalGroup(e.groupID))&&(t.groupMap.get(e.groupID).updateGroup(e),t._setStorageGroupList());return new eg({group:t.groupMap.get(e.groupID)})})).catch((function(o){return t.probeNetwork().then((function(e){var t=Wn(e,2),n=t[0],i=t[1];r.setError(o,n,i).setEnd()})),Ts.log("".concat(n," failed. error:").concat(Vs(o)," groupID:").concat(e.groupID)),og(o)}))}},{key:"setGroupMemberRole",value:function(e){var t=this,n="".concat($y,".setGroupMemberRole"),r=e.groupID,o=e.userID,i=e.role,a=this.groupMap.get(r);if(a.selfInfo.role!==En.GRP_MBR_ROLE_OWNER)return og(new zp({code:Wp.NOT_OWNER,message:Vf}));if([En.GRP_WORK,En.GRP_AVCHATROOM].includes(a.type))return og(new zp({code:Wp.CANNOT_SET_MEMBER_ROLE_IN_WORK_AND_AVCHATROOM,message:Bf}));if([En.GRP_MBR_ROLE_ADMIN,En.GRP_MBR_ROLE_MEMBER].indexOf(i)<0)return og(new zp({code:Wp.INVALID_MEMBER_ROLE,message:jf}));if(o===this.tim.loginInfo.identifier)return og(new zp({code:Wp.CANNOT_SET_SELF_MEMBER_ROLE,message:Kf}));var s=new Mg(hm);return s.setText("groupID=".concat(r," userID=").concat(o," role=").concat(i)),Ts.log("".concat(n," groupID:").concat(r,". userID: ").concat(o)),this._modifyGroupMemberInfo({groupID:r,userID:o,role:i}).then((function(e){return s.setNetworkType(t.getNetworkType()).setEnd(),Ts.log("".concat(n," ok. groupID:").concat(r,". userID: ").concat(o)),new eg({group:a,member:e})})).catch((function(e){return t.probeNetwork().then((function(t){var n=Wn(t,2),r=n[0],o=n[1];s.setError(e,r,o).setEnd()})),Ts.error("".concat(n," error:").concat(Vs(e)," groupID:").concat(r," userID:").concat(o)),og(e)}))}},{key:"setGroupMemberMuteTime",value:function(e){var t=this,n=e.groupID,r=e.userID,o=e.muteTime,i="".concat($y,".setGroupMemberMuteTime");if(r===this.tim.loginInfo.identifier)return og(new zp({code:Wp.CANNOT_MUTE_SELF,message:Hf}));Ts.log("".concat(i," groupID:").concat(n,". userID: ").concat(r));var a=new Mg(pm);return a.setText("groupID=".concat(n," userID=").concat(r," muteTime=").concat(o)),this._modifyGroupMemberInfo({groupID:n,userID:r,muteTime:o}).then((function(e){return a.setNetworkType(t.getNetworkType()).setEnd(),Ts.log("".concat(i," ok. groupID:").concat(n,". userID: ").concat(r)),new eg({group:t.getLocalGroupProfile(n),member:e})})).catch((function(e){return t.probeNetwork().then((function(t){var n=Wn(t,2),r=n[0],o=n[1];a.setError(e,r,o).setEnd()})),Ts.error("".concat(i," error:").concat(Vs(e)," groupID:").concat(n," userID:").concat(r)),og(e)}))}},{key:"setMessageRemindType",value:function(e){var t=this,n="".concat($y,".setMessageRemindType"),r=new Mg(em);r.setText("groupID=".concat(e.groupID," userID=").concat(e.userID||this.tim.loginInfo.identifier)),Ts.log("".concat(n," groupID:").concat(e.groupID,". userID: ").concat(e.userID||this.tim.loginInfo.identifier));var o=e.groupID,i=e.messageRemindType;return this._modifyGroupMemberInfo({groupID:o,messageRemindType:i,userID:this.tim.loginInfo.identifier}).then((function(){r.setNetworkType(t.getNetworkType()).setEnd(),Ts.log("".concat(n," ok. groupID:").concat(e.groupID," userID:").concat(e.userID||t.tim.loginInfo.identifier));var o=t.getLocalGroupProfile(e.groupID);return o&&(o.selfInfo.messageRemindType=i),new eg({group:o})})).catch((function(o){return t.probeNetwork().then((function(e){var t=Wn(e,2),n=t[0],i=t[1];r.setError(o,n,i).setEnd()})),Ts.error("".concat(n," error:").concat(Vs(o)," groupID:").concat(e.groupID," userID:").concat(e.userID||t.tim.loginInfo.identifier)),og(o)}))}},{key:"setGroupMemberNameCard",value:function(e){var t=this,n="".concat($y,".setGroupMemberNameCard"),r=e.groupID,o=e.userID,i=void 0===o?this.tim.loginInfo.identifier:o,a=e.nameCard;Ts.log("".concat(n," groupID:").concat(r,". userID: ").concat(i));var s=new Mg(fm);return s.setText("groupID=".concat(r," userID=").concat(i," nameCard=").concat(a)),this._modifyGroupMemberInfo({groupID:r,userID:i,nameCard:a}).then((function(e){Ts.log("".concat(n," ok. groupID:").concat(r,". userID: ").concat(i)),s.setNetworkType(t.getNetworkType()).setEnd();var o=t.getLocalGroupProfile(r);return i===t.tim.loginInfo.identifier&&o&&o.setSelfNameCard(a),new eg({group:o,member:e})})).catch((function(e){return t.probeNetwork().then((function(t){var n=Wn(t,2),r=n[0],o=n[1];s.setError(e,r,o).setEnd()})),Ts.error("".concat(n," error:").concat(Vs(e)," groupID:").concat(r," userID:").concat(i)),og(e)}))}},{key:"setGroupMemberCustomField",value:function(e){var t=this,n="".concat($y,".setGroupMemberCustomField"),r=e.groupID,o=e.userID,i=void 0===o?this.tim.loginInfo.identifier:o,a=e.memberCustomField;Ts.log("".concat(n," groupID:").concat(r,". userID: ").concat(i));var s=new Mg(dm);return s.setText("groupID=".concat(r," userID=").concat(i," memberCustomField=").concat(JSON.stringify(a))),this._modifyGroupMemberInfo({groupID:r,userID:i,memberCustomField:a}).then((function(e){return s.setNetworkType(t.getNetworkType()).setEnd(),Ts.log("".concat(n," ok. groupID:").concat(r,". userID: ").concat(i)),new eg({group:t.groupMap.get(r),member:e})})).catch((function(e){return t.probeNetwork().then((function(t){var n=Wn(t,2),r=n[0],o=n[1];s.setError(e,r,o).setEnd()})),Ts.error("".concat(n," error:").concat(Vs(e)," groupID:").concat(r," userID:").concat(i)),og(e)}))}},{key:"getGroupList",value:function(e){var t=this,n="".concat($y,".getGroupList"),r=new Mg(rm);Ts.log("".concat(n));var o={introduction:"Introduction",notification:"Notification",createTime:"CreateTime",ownerID:"Owner_Account",lastInfoTime:"LastInfoTime",memberNum:"MemberNum",maxMemberNum:"MaxMemberNum",joinOption:"ApplyJoinOption",muteAllMembers:"ShutUpAllMember"},i=["Type","Name","FaceUrl","NextMsgSeq","LastMsgTime"];return e&&e.groupProfileFilter&&e.groupProfileFilter.forEach((function(e){o[e]&&i.push(o[e])})),this.request({name:"group",action:"list",param:{responseFilter:{groupBaseInfoFilter:i,selfInfoFilter:["Role","JoinTime","MsgFlag"]}}}).then((function(e){var o=e.data.groups;return Ts.log("".concat(n," ok. nums=").concat(o.length)),t._groupListTreeShaking(o),t.updateGroupMap(o),r.setNetworkType(t.getNetworkType()).setText("".concat(o.length,"-afterTreeshaking-").concat(t.groupMap.size)).setEnd(),t.tempConversationList&&(Ts.log("".concat(n," update last message with tempConversationList, nums=").concat(t.tempConversationList.length)),t._handleUpdateGroupLastMessage({data:t.tempConversationList}),t.tempConversationList=null),t.emitGroupListUpdate(),new eg({groupList:t.getLocalGroups()})})).catch((function(e){return t.probeNetwork().then((function(t){var n=Wn(t,2),o=n[0],i=n[1];r.setError(e,o,i).setEnd()})),Ts.error("".concat(n," error:"),e),og(e)}))}},{key:"getGroupMemberList",value:function(e){var t=this,n=e.groupID,r=e.offset,o=void 0===r?0:r,i=e.count,a=void 0===i?15:i,s="".concat($y,".getGroupMemberList"),u=new Mg(sm);Ts.log("".concat(s," groupID: ").concat(n," offset: ").concat(o," count: ").concat(a));var c=[];return this.request({name:"group",action:"getGroupMemberList",param:{groupID:n,offset:o,limit:a>100?100:a,memberInfoFilter:["Role","NameCard","ShutUpUntil"]}}).then((function(e){var r=e.data,o=r.members,i=r.memberNum;return Ns(o)&&0!==o.length?(t.hasLocalGroup(n)&&(t.getLocalGroupProfile(n).memberNum=i),c=t._updateLocalGroupMemberMap(n,o),t.tim.getUserProfile({userIDList:o.map((function(e){return e.userID})),tagList:[Tp.NICK,Tp.AVATAR]})):Promise.resolve([])})).then((function(e){var r=e.data;if(!Ns(r)||0===r.length)return rg({memberList:[]});var i=r.map((function(e){return{userID:e.userID,nick:e.nick,avatar:e.avatar}}));return t._updateLocalGroupMemberMap(n,i),u.setNetworkType(t.getNetworkType()).setText("groupID=".concat(n," offset=").concat(o," count=").concat(a)).setEnd(),Ts.log("".concat(s," ok.")),new eg({memberList:c})})).catch((function(e){return t.probeNetwork().then((function(t){var n=Wn(t,2),r=n[0],o=n[1];u.setError(e,r,o).setEnd()})),Ts.error("".concat(s," error:"),e),og(e)}))}},{key:"getLocalGroups",value:function(){return Yn(this.groupMap.values())}},{key:"getLocalGroupProfile",value:function(e){return this.groupMap.get(e)}},{key:"hasLocalGroup",value:function(e){return this.groupMap.has(e)}},{key:"getLocalGroupMemberInfo",value:function(e,t){return this.groupMemberListMap.has(e)?this.groupMemberListMap.get(e).get(t):null}},{key:"setLocalGroupMember",value:function(e,t){if(this.groupMemberListMap.has(e))this.groupMemberListMap.get(e).set(t.userID,t);else{var n=(new Map).set(t.userID,t);this.groupMemberListMap.set(e,n)}}},{key:"hasLocalGroupMember",value:function(e,t){return this.groupMemberListMap.has(e)&&this.groupMemberListMap.get(e).has(t)}},{key:"hasLocalGroupMemberMap",value:function(e){return this.groupMemberListMap.has(e)}},{key:"getGroupProfile",value:function(e){var t=this,n="".concat($y,".getGroupProfile"),r=new Mg(om);Ts.log("".concat(n," groupID:"),e.groupID);var o=e.groupID,i=e.groupCustomFieldFilter,a={groupIDList:[o],responseFilter:{groupBaseInfoFilter:["Type","Name","Introduction","Notification","FaceUrl","Owner_Account","CreateTime","InfoSeq","LastInfoTime","LastMsgTime","MemberNum","MaxMemberNum","ApplyJoinOption","NextMsgSeq","ShutUpAllMember"],groupCustomFieldFilter:i}};return this.getGroupProfileAdvance(a).then((function(i){var a,s=i.data,u=s.successGroupList,c=s.failureGroupList;return Ts.log("".concat(n," ok. groupID:").concat(e.groupID)),c.length>0?og(c[0]):(tu(u[0].type)&&!t.hasLocalGroup(o)?a=new fy(u[0]):(t.updateGroupMap(u),a=t.getLocalGroupProfile(o)),r.setNetworkType(t.getNetworkType()).setText("groupID=".concat(a.groupID," type=").concat(a.type," muteAllMembers=").concat(a.muteAllMembers," ownerID=").concat(a.ownerID)).setEnd(),a&&a.selfInfo&&!a.selfInfo.nameCard?t.updateSelfInfo(a).then((function(e){return new eg({group:e})})):new eg({group:a}))})).catch((function(o){return t.probeNetwork().then((function(t){var n=Wn(t,2),i=n[0],a=n[1];r.setError(o,i,a).setText("groupID=".concat(e.groupID)).setEnd()})),Ts.error("".concat(n," error:").concat(Vs(o)," groupID:").concat(e.groupID)),og(o)}))}},{key:"getGroupMemberProfile",value:function(e){var t=this,n="".concat($y,".getGroupMemberProfile"),r=new Mg(um);r.setText(e.userIDList.length>5?"userIDList.length=".concat(e.userIDList.length):"userIDList=".concat(e.userIDList)),Ts.log("".concat(n," groupID:").concat(e.groupID," userIDList:").concat(e.userIDList.join(","))),e.userIDList.length>50&&(e.userIDList=e.userIDList.slice(0,50));var o=e.groupID,i=e.userIDList;return this._getGroupMemberProfileAdvance(Un(Un({},e),{},{userIDList:i})).then((function(e){var n=e.data.members;return Ns(n)&&0!==n.length?(t._updateLocalGroupMemberMap(o,n),t.tim.getUserProfile({userIDList:n.map((function(e){return e.userID})),tagList:[Tp.NICK,Tp.AVATAR]})):rg([])})).then((function(e){var n=e.data.map((function(e){return{userID:e.userID,nick:e.nick,avatar:e.avatar}}));t._updateLocalGroupMemberMap(o,n);var a=i.filter((function(e){return t.hasLocalGroupMember(o,e)})).map((function(e){return t.getLocalGroupMemberInfo(o,e)}));return r.setNetworkType(t.getNetworkType()).setEnd(),new eg({memberList:a})}))}},{key:"_getGroupMemberProfileAdvance",value:function(e){return this.request({name:"group",action:"getGroupMemberProfile",param:Un(Un({},e),{},{memberInfoFilter:e.memberInfoFilter?e.memberInfoFilter:["Role","JoinTime","NameCard","ShutUpUntil"]})})}},{key:"updateSelfInfo",value:function(e){var t="".concat($y,".updateSelfInfo"),n=e.groupID;Ts.log("".concat(t," groupID:"),n);var r={groupID:n,userIDList:[this.tim.loginInfo.identifier]};return this.getGroupMemberProfile(r).then((function(r){var o=r.data.memberList;return Ts.log("".concat(t," ok. groupID:"),n),e&&0!==o.length&&e.updateSelfInfo(o[0]),e}))}},{key:"addGroupMember",value:function(e){var t=this,n="".concat($y,".addGroupMember"),r=new Mg(cm);r.setText("groupID=".concat(e.groupID));var o=this.getLocalGroupProfile(e.groupID);if(tu(o.type)){var i=new zp({code:Wp.CANNOT_ADD_MEMBER_IN_AVCHATROOM,message:qf});return r.setCode(Wp.CANNOT_ADD_MEMBER_IN_AVCHATROOM).setMessage(qf).setNetworkType(this.getNetworkType()).setText("groupID=".concat(e.groupID," groupType=").concat(o.type)).setEnd(),og(i)}return e.userIDList=e.userIDList.map((function(e){return{userID:e}})),Ts.log("".concat(n," groupID:"),e.groupID),this.request({name:"group",action:"addGroupMember",param:e}).then((function(i){var a=i.data.members;Ts.log("".concat(n," ok. groupID:"),e.groupID);var s=a.filter((function(e){return 1===e.result})).map((function(e){return e.userID})),u=a.filter((function(e){return 0===e.result})).map((function(e){return e.userID})),c=a.filter((function(e){return 2===e.result})).map((function(e){return e.userID})),l=a.filter((function(e){return 4===e.result})).map((function(e){return e.userID})),p="groupID:".concat(e.groupID,", ")+"successUserIDList:".concat(s,", ")+"failureUserIDList:".concat(u,", ")+"existedUserIDList:".concat(c,", ")+"overLimitUserIDList:".concat(l);return r.setNetworkType(t.getNetworkType()).setText(p).setEnd(),0===s.length?new eg({successUserIDList:s,failureUserIDList:u,existedUserIDList:c,overLimitUserIDList:l}):(o.memberNum+=s.length,new eg({successUserIDList:s,failureUserIDList:u,existedUserIDList:c,overLimitUserIDList:l,group:o}))})).catch((function(o){return t.probeNetwork().then((function(t){var n=Wn(t,2),i=n[0],a=n[1];r.setError(o,i,a).setText("groupID=".concat(e.groupID)).setEnd()})),Ts.error("".concat(n," error:").concat(Vs(o)," groupID:").concat(e.groupID)),og(o)}))}},{key:"deleteGroupMember",value:function(e){var t=this,n="".concat($y,".deleteGroupMember"),r=new Mg(lm);r.setText(e.userIDList.length>5?"userIDList.length=".concat(e.userIDList.length):"userIDList=".concat(e.userIDList)),Ts.log("".concat(n," groupID:").concat(e.groupID," userIDList:").concat(e.userIDList));var o=this.getLocalGroupProfile(e.groupID);return o.type===En.GRP_AVCHATROOM?og(new zp({code:Wp.CANNOT_KICK_MEMBER_IN_AVCHATROOM,message:Ff})):this.request({name:"group",action:"deleteGroupMember",param:e}).then((function(){return r.setNetworkType(t.getNetworkType()).setEnd(),Ts.log("".concat(n," ok")),o.memberNum--,t.deleteLocalGroupMembers(e.groupID,e.userIDList),new eg({group:o,userIDList:e.userIDList})})).catch((function(o){return t.probeNetwork().then((function(t){var n=Wn(t,2),i=n[0],a=n[1];r.setError(o,i,a).setText("groupID=".concat(e.groupID)).setEnd()})),Ts.error("".concat(n," error:").concat(Vs(o)," groupID:").concat(e.groupID)),og(o)}))}},{key:"searchGroupByID",value:function(e){var t=this,n="".concat($y,".searchGroupByID"),r={groupIDList:[e]},o=new Mg(Xg);return o.setText("groupID=".concat(e)),Ts.log("".concat(n," groupID:").concat(e)),this.request({name:"group",action:"searchGroupByID",param:r}).then((function(r){var i=r.data.groupProfile;if(i[0].errorCode!==tc.SUCCESS)throw new zp({code:i[0].errorCode,message:i[0].errorInfo});return o.setNetworkType(t.getNetworkType()).setEnd(),Ts.log("".concat(n," ok. groupID:").concat(e)),new eg({group:new fy(i[0])})})).catch((function(r){return t.probeNetwork().then((function(e){var t=Wn(e,2),n=t[0],i=t[1];o.setError(r,n,i).setEnd()})),Ts.warn("".concat(n," error:").concat(Vs(r)," groupID:").concat(e)),og(r)}))}},{key:"applyJoinGroup",value:function(e){var t=this,n="".concat($y,".applyJoinGroup"),r=new Mg(Wg);return this.request({name:"group",action:"applyJoinGroup",param:e}).then((function(o){var i=o.data,a=i.joinedStatus,s=i.longPollingKey;switch(r.setNetworkType(t.getNetworkType()).setText("groupID=".concat(e.groupID," joinedStatus=").concat(a)).setEnd(),Ts.log("".concat(n," ok. groupID:").concat(e.groupID," joinedStatus:").concat(a," longPollingKey:").concat(s)),a){case ec.WAIT_APPROVAL:return new eg({status:ec.WAIT_APPROVAL});case ec.SUCCESS:return t.getGroupProfile({groupID:e.groupID}).then((function(n){var r=n.data.group,o={status:ec.SUCCESS,group:r};return Ls(s)?(t.emitGroupListUpdate(!0,!1),new eg(o)):(t.emitInnerEvent(bd,e.groupID),t.AVChatRoomHandler.startRunLoop({longPollingKey:s,group:r}))}));default:var u=new zp({code:Wp.JOIN_GROUP_FAIL,message:Uf});return Ts.error("".concat(n," error:").concat(Vs(u)," groupID:").concat(e.groupID)),og(u)}})).catch((function(o){return r.setText("groupID=".concat(e.groupID)),t.probeNetwork().then((function(e){var t=Wn(e,2),n=t[0],i=t[1];r.setError(o,n,i).setEnd()})),Ts.error("".concat(n," error:").concat(Vs(o)," groupID:").concat(e.groupID)),og(o)}))}},{key:"applyJoinAVChatRoom",value:function(e){return this.AVChatRoomHandler.applyJoinAVChatRoom(e)}},{key:"handleGroupApplication",value:function(e){var t=this,n="".concat($y,".handleGroupApplication"),r=e.message.payload,o=r.groupProfile.groupID,i=r.authentication,a=r.messageKey,s=r.operatorID,u=new Mg(Zg);return u.setText("groupID=".concat(o)),Ts.log("".concat(n," groupID:"),o),this.request({name:"group",action:"handleApplyJoinGroup",param:Un(Un({},e),{},{applicant:s,groupID:o,authentication:i,messageKey:a})}).then((function(){return u.setNetworkType(t.getNetworkType()).setEnd(),Ts.log("".concat(n," ok. groupID:"),o),t.deleteGroupSystemNotice({messageList:[e.message]}),new eg({group:t.getLocalGroupProfile(o)})})).catch((function(e){return t.probeNetwork().then((function(t){var n=Wn(t,2),r=n[0],o=n[1];u.setError(e,r,o).setEnd()})),Ts.error("".concat(n," error. error:").concat(Vs(e)," groupID:").concat(o)),og(e)}))}},{key:"deleteGroupSystemNotice",value:function(e){var t=this,n="".concat($y,".deleteGroupSystemNotice");return Ns(e.messageList)&&0!==e.messageList.length?(Ts.log("".concat(n)+e.messageList.map((function(e){return e.ID}))),this.request({name:"group",action:"deleteGroupSystemNotice",param:{messageListToDelete:e.messageList.map((function(e){return{from:En.CONV_SYSTEM,messageSeq:e.clientSequence,messageRandom:e.random}}))}}).then((function(){return Ts.log("".concat(n," ok")),e.messageList.forEach((function(e){t.tim.messageController.deleteLocalMessage(e)})),new eg})).catch((function(e){return Ts.error("".concat(n," error:"),e),og(e)}))):rg()}},{key:"getGroupProfileAdvance",value:function(e){var t="".concat($y,".getGroupProfileAdvance");return Ns(e.groupIDList)&&e.groupIDList.length>50&&(Ts.warn("".concat(t," 获取群资料的数量不能超过50个")),e.groupIDList.length=50),Ts.log("".concat(t," groupIDList:"),e.groupIDList),this.request({name:"group",action:"query",param:e}).then((function(e){Ts.log("".concat(t," ok."));var n=e.data.groups,r=n.filter((function(e){return Ls(e.errorCode)||e.errorCode===tc.SUCCESS})),o=n.filter((function(e){return e.errorCode&&e.errorCode!==tc.SUCCESS})).map((function(e){return new zp({code:e.errorCode,message:e.errorInfo,data:{groupID:e.groupID}})}));return new eg({successGroupList:r,failureGroupList:o})})).catch((function(n){return Ts.error("".concat(t," error:").concat(Vs(n)," groupIDList:").concat(e.groupIDList)),og(n)}))}},{key:"_deleteLocalGroup",value:function(e){return this.groupMap.delete(e),this.groupMemberListMap.delete(e),this._setStorageGroupList(),this.groupMap.has(e)&&this.groupMemberListMap.has(e)}},{key:"_initGroupList",value:function(){var e=this,t="".concat($y,"._initGroupList"),n=new Mg(im);Ts.time(yg),Ts.log("".concat(t));var r=this._getStorageGroupList();Ns(r)&&r.length>0?(r.forEach((function(t){e.groupMap.set(t.groupID,new fy(t))})),this.emitGroupListUpdate(!0,!1),n.setNetworkType(this.getNetworkType()).setText(this.groupMap.size).setEnd()):n.setNetworkType(this.getNetworkType()).setText(0).setEnd(),this.triggerReady(),Ts.log("".concat(t," ok. initCost=").concat(Ts.timeEnd(yg),"ms")),this.getGroupList()}},{key:"_initListeners",value:function(){var e=this.tim.innerEmitter;e.once(Wh,this._initGroupList,this),e.on(Rd,this._handleUpdateGroupLastMessage,this),e.on(nd,this._handleReceivedGroupMessage,this),e.on(wd,this._handleProfileUpdated,this)}},{key:"emitGroupListUpdate",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.getLocalGroups(),r=JSON.parse(JSON.stringify(n));t&&this.emitInnerEvent(Sd,r),e&&this.emitOuterEvent(Cn.GROUP_LIST_UPDATED,n)}},{key:"_handleReceivedGroupMessage",value:function(e){var t=this,n=e.data.eventDataList;Array.isArray(n)&&n.forEach((function(e){var n=e.conversationID.replace(En.CONV_GROUP,"");t.groupMap.has(n)&&(t.groupMap.get(n).nextMessageSeq=e.lastMessage.sequence+1)}))}},{key:"_onReceivedGroupSystemNotice",value:function(e){var t=e.data;this.groupNoticeHandler._onReceivedGroupNotice(t)}},{key:"_handleUpdateGroupLastMessage",value:function(e){var t="".concat($y,"._handleUpdateGroupLastMessage"),n=e.data;if(Ts.log("".concat(t," convNums=").concat(n.length," groupNums=").concat(this.groupMap.size)),0!==this.groupMap.size){for(var r,o,i,a=!1,s=0,u=n.length;s<u;s++)(r=n[s]).conversationID&&r.type!==En.CONV_GROUP&&(o=r.conversationID.split(/^GROUP/)[1],(i=this.getLocalGroupProfile(o))&&(i.lastMessage=r.lastMessage,a=!0));a&&(this.groupMap=this._sortLocalGroupList(this.groupMap),this.emitGroupListUpdate(!0,!1))}else this.tempConversationList=n}},{key:"_sortLocalGroupList",value:function(e){var t=Yn(e).filter((function(e){var t=Wn(e,2);t[0];return!cu(t[1].lastMessage)}));return t.sort((function(e,t){return t[1].lastMessage.lastTime-e[1].lastMessage.lastTime})),new Map([].concat(Yn(t),Yn(e)))}},{key:"_getStorageGroupList",value:function(){return this.tim.storage.getItem("groupMap")}},{key:"_setStorageGroupList",value:function(){var e=this.getLocalGroups().filter((function(e){var t=e.type;return!tu(t)})).slice(0,20).map((function(e){return{groupID:e.groupID,name:e.name,avatar:e.avatar,type:e.type}}));this.tim.storage.setItem("groupMap",e)}},{key:"updateGroupMap",value:function(e){var t=this;e.forEach((function(e){t.groupMap.has(e.groupID)?t.groupMap.get(e.groupID).updateGroup(e):t.groupMap.set(e.groupID,new fy(e))})),this._setStorageGroupList()}},{key:"_updateLocalGroupMemberMap",value:function(e,t){var n=this;return Ns(t)&&0!==t.length?t.map((function(t){return n.hasLocalGroupMember(e,t.userID)?n.getLocalGroupMemberInfo(e,t.userID).updateMember(t):n.setLocalGroupMember(e,new Uy(t)),n.getLocalGroupMemberInfo(e,t.userID)})):[]}},{key:"deleteLocalGroupMembers",value:function(e,t){var n=this.groupMemberListMap.get(e);n&&t.forEach((function(e){n.delete(e)}))}},{key:"_modifyGroupMemberInfo",value:function(e){var t=this,n=e.groupID,r=e.userID;return this.request({name:"group",action:"modifyGroupMemberInfo",param:e}).then((function(){if(t.hasLocalGroupMember(n,r)){var o=t.getLocalGroupMemberInfo(n,r);return Ls(e.muteTime)||o.updateMuteUntil(e.muteTime),Ls(e.role)||o.updateRole(e.role),Ls(e.nameCard)||o.updateNameCard(e.nameCard),Ls(e.memberCustomField)||o.updateMemberCustomField(e.memberCustomField),o}return t.getGroupMemberProfile({groupID:n,userIDList:[r]}).then((function(e){return Wn(e.data.memberList,1)[0]}))}))}},{key:"_groupListTreeShaking",value:function(e){for(var t=new Map(Yn(this.groupMap)),n=0,r=e.length;n<r;n++)t.delete(e[n].groupID);this.AVChatRoomHandler.hasJoinedAVChatRoom()&&this.AVChatRoomHandler.getJoinedAVChatRoom().forEach((function(e){t.delete(e)}));for(var o=Yn(t.keys()),i=0,a=o.length;i<a;i++)this.groupMap.delete(o[i])}},{key:"_handleProfileUpdated",value:function(e){for(var t=this,n=e.data,r=function(e){var r=n[e];t.groupMemberListMap.forEach((function(e){e.has(r.userID)&&e.get(r.userID).updateMember({nick:r.nick,avatar:r.avatar})}))},o=0;o<n.length;o++)r(o)}},{key:"getJoinedAVChatRoom",value:function(){return this.AVChatRoomHandler.getJoinedAVChatRoom()}},{key:"deleteLocalGroupAndConversation",value:function(e){this._deleteLocalGroup(e),this.tim.conversationController.deleteLocalConversation("GROUP".concat(e)),this.emitGroupListUpdate(!0,!1)}},{key:"checkJoinedAVChatRoomByID",value:function(e){return this.AVChatRoomHandler.checkJoinedAVChatRoomByID(e)}},{key:"getGroupLastSequence",value:function(e){var t=this,n="".concat($y,".getGroupLastSequence"),r=new Mg(am),o=0;if(this.hasLocalGroup(e)){var i=this.getLocalGroupProfile(e);if(i.lastMessage.lastSequence>0)return o=i.lastMessage.lastSequence,Ts.log("".concat(n," got lastSequence=").concat(o," from local group profile[lastMessage.lastSequence]. groupID=").concat(e)),r.setNetworkType(this.getNetworkType()).setText("got lastSequence=".concat(o," from local group profile[lastMessage.lastSequence]. groupID=").concat(e)).setEnd(),Promise.resolve(o);if(i.nextMessageSeq>1)return o=i.nextMessageSeq-1,Ts.log("".concat(n," got lastSequence=").concat(o," from local group profile[nextMessageSeq]. groupID=").concat(e)),r.setNetworkType(this.getNetworkType()).setText("got lastSequence=".concat(o," from local group profile[nextMessageSeq]. groupID=").concat(e)).setEnd(),Promise.resolve(o)}var a="GROUP".concat(e),s=this.tim.conversationController.getLocalConversation(a);if(s&&s.lastMessage.lastSequence)return o=s.lastMessage.lastSequence,Ts.log("".concat(n," got lastSequence=").concat(o," from local conversation profile[lastMessage.lastSequence]. groupID=").concat(e)),r.setNetworkType(this.getNetworkType()).setText("got lastSequence=".concat(o," from local conversation profile[lastMessage.lastSequence]. groupID=").concat(e)).setEnd(),Promise.resolve(o);var u={groupIDList:[e],responseFilter:{groupBaseInfoFilter:["NextMsgSeq"]}};return this.getGroupProfileAdvance(u).then((function(i){var a=i.data.successGroupList;return cu(a)?Ts.log("".concat(n," successGroupList is empty. groupID=").concat(e)):(o=a[0].nextMessageSeq-1,Ts.log("".concat(n," got lastSequence=").concat(o," from getGroupProfileAdvance. groupID=").concat(e))),r.setNetworkType(t.getNetworkType()).setText("got lastSequence=".concat(o," from getGroupProfileAdvance. groupID=").concat(e)).setEnd(),o})).catch((function(o){return t.probeNetwork().then((function(t){var n=Wn(t,2),i=n[0],a=n[1];r.setError(o,i,a).setText("get lastSequence failed from getGroupProfileAdvance. groupID=".concat(e)).setEnd()})),Ts.warn("".concat(n," failed. ").concat(o)),og(o)}))}},{key:"getGroupOnlineMemberCount",value:function(e){return this.AVChatRoomHandler.checkJoinedAVChatRoomByID(e)?this.AVChatRoomHandler.getGroupOnlineMemberCount(e):rg({memberCount:0})}},{key:"reset",value:function(){this.groupMap.clear(),this.groupMemberListMap.clear(),this.resetReady(),this.groupNoticeHandler.reset(),this.AVChatRoomHandler.reset(),this.tim.innerEmitter.once(Wh,this._initGroupList,this)}}]),n}(Xd),Wy=function(e){qn(n,e);var t=zn(n);function n(e){var r;Ln(this,n),(r=t.call(this,e)).REALTIME_MESSAGE_TIMEOUT=3e5,r.LONGPOLLING_ID_TIMEOUT=3e5,r._currentState=En.NET_STATE_CONNECTED,r._status={OPENIM:{lastResponseReceivedTime:0,jitterCount:0,failedCount:0},AVCHATROOM:{lastResponseReceivedTime:0,jitterCount:0,failedCount:0}};var o=r.tim.innerEmitter;return o.on(id,r._onGetLongPollIDFailed,Hn(r)),o.on(sd,r._onOpenIMResponseOK,Hn(r)),o.on(ad,r._onOpenIMRequestFailed,Hn(r)),o.on(Ed,r._onAVChatroomResponseOK,Hn(r)),o.on(Cd,r._onAVChatroomRequestFailed,Hn(r)),r}return bn(n,[{key:"_onGetLongPollIDFailed",value:function(){this._currentState!==En.NET_STATE_DISCONNECTED&&this._emitNetStateChangeEvent(En.NET_STATE_DISCONNECTED)}},{key:"_onOpenIMResponseOK",value:function(){this._onResponseOK("OPENIM")}},{key:"_onOpenIMRequestFailed",value:function(){this._onRequestFailed("OPENIM")}},{key:"_onAVChatroomResponseOK",value:function(){this.isLoggedIn()||this._onResponseOK("AVCHATROOM")}},{key:"_onAVChatroomRequestFailed",value:function(){this.isLoggedIn()||this._onRequestFailed("AVCHATROOM")}},{key:"_onResponseOK",value:function(e){var t=this._status[e],n=Date.now();if(0!==t.lastResponseReceivedTime){var r=n-t.lastResponseReceivedTime;Ts.debug("StatusController._onResponseOK key=".concat(e," currentState=").concat(this._currentState," interval=").concat(r," failedCount=").concat(t.failedCount," jitterCount=").concat(t.jitterCount)),t.failedCount>0&&(t.failedCount=0,t.jitterCount+=1,this._currentState!==En.NET_STATE_CONNECTED&&this._emitNetStateChangeEvent(En.NET_STATE_CONNECTED));r<=this.LONGPOLLING_ID_TIMEOUT?t.jitterCount>=3&&(new Mg(ym).setText("".concat(e,"-").concat(r,"-").concat(t.jitterCount)).setNetworkType(this.getNetworkType()).setEnd(),t.jitterCount=0):(new Mg(_m).setText("".concat(e,"-").concat(r)).setNetworkType(this.getNetworkType()).setEnd(),Ts.warn("StatusController._onResponseOK, sdk reload. key=".concat(e," interval=").concat(r,"ms. https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/module-EVENT.html#.SDK_RELOAD")),this.emitInnerEvent(Ud)),t.lastResponseReceivedTime=n}else t.lastResponseReceivedTime=n}},{key:"_onRequestFailed",value:function(e){var t=this,n=this._status[e];Date.now()-n.lastResponseReceivedTime>=this.LONGPOLLING_ID_TIMEOUT?this._currentState!==En.NET_STATE_DISCONNECTED&&(Ts.warn("StatusController._onRequestFailed, disconnected, longpolling unavailable more than 5min. key=".concat(e," networkType=").concat(this.getNetworkType())),this._emitNetStateChangeEvent(En.NET_STATE_DISCONNECTED)):(n.failedCount+=1,n.failedCount>5?this.probeNetwork().then((function(r){var o=Wn(r,2),i=o[0],a=o[1];i?(t._currentState!==En.NET_STATE_CONNECTING&&t._emitNetStateChangeEvent(En.NET_STATE_CONNECTING),Ts.warn("StatusController._onRequestFailed, connecting, network jitter. key=".concat(e," networkType=").concat(a))):(t._currentState!==En.NET_STATE_DISCONNECTED&&t._emitNetStateChangeEvent(En.NET_STATE_DISCONNECTED),Ts.warn("StatusController._onRequestFailed, disconnected, longpolling unavailable. key=".concat(e," networkType=").concat(a))),n.failedCount=0,n.jitterCount=0})):this._currentState===En.NET_STATE_CONNECTED&&this._emitNetStateChangeEvent(En.NET_STATE_CONNECTING))}},{key:"_emitNetStateChangeEvent",value:function(e){Ts.log("StatusController._emitNetStateChangeEvent net state changed from ".concat(this._currentState," to ").concat(e)),this._currentState=e,this.emitOuterEvent(Cn.NET_STATE_CHANGE,{state:e})}},{key:"reset",value:function(){Ts.log("StatusController.reset"),this._currentState=En.NET_STATE_CONNECTED,this._status={OPENIM:{lastResponseReceivedTime:0,jitterCount:0,failedCount:0},AVCHATROOM:{lastResponseReceivedTime:0,jitterCount:0,failedCount:0}}}}]),n}(Xd);function Yy(){return null}var Jy=function(){function e(t){Ln(this,e),this.tim=t,this.storageQueue=new Map,this.checkTimes=0,this.checkTimer=setInterval(this._onCheckTimer.bind(this),1e3),this._errorTolerantHandle()}return bn(e,[{key:"_errorTolerantHandle",value:function(){!Ha&&Ls(window.localStorage)&&(this.getItem=Yy,this.setItem=Yy,this.removeItem=Yy,this.clear=Yy)}},{key:"_onCheckTimer",value:function(){if(this.checkTimes++,this.checkTimes%20==0){if(0===this.storageQueue.size)return;this._doFlush()}}},{key:"_doFlush",value:function(){try{var e,t=tr(this.storageQueue);try{for(t.s();!(e=t.n()).done;){var n=Wn(e.value,2),r=n[0],o=n[1];this._setStorageSync(this._getKey(r),o)}}catch(i){t.e(i)}finally{t.f()}this.storageQueue.clear()}catch(E_){Ts.warn("Storage._doFlush error",E_)}}},{key:"_getPrefix",value:function(){var e=this.tim.loginInfo,t=e.SDKAppID,n=e.identifier;return"TIM_".concat(t,"_").concat(n,"_")}},{key:"getItem",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];try{var n=t?this._getKey(e):e;return this._getStorageSync(n)}catch(E_){return Ts.warn("Storage.getItem error:",E_),{}}}},{key:"setItem",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];if(n){var o=r?this._getKey(e):e;this._setStorageSync(o,t)}else this.storageQueue.set(e,t)}},{key:"clear",value:function(){try{Ha?za.clearStorageSync():localStorage.clear()}catch(E_){Ts.warn("Storage.clear error:",E_)}}},{key:"removeItem",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];try{var n=t?this._getKey(e):e;this._removeStorageSync(n)}catch(E_){Ts.warn("Storage.removeItem error:",E_)}}},{key:"getSize",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"b";try{var r={size:0,limitSize:5242880,unit:n};if(Object.defineProperty(r,"leftSize",{enumerable:!0,get:function(){return r.limitSize-r.size}}),Ha&&(r.limitSize=1024*za.getStorageInfoSync().limitSize),e)r.size=JSON.stringify(this.getItem(e)).length+this._getKey(e).length;else if(Ha){var o=za.getStorageInfoSync(),i=o.keys;i.forEach((function(e){r.size+=JSON.stringify(t._getStorageSync(e)).length+t._getKey(e).length}))}else for(var a in localStorage)localStorage.hasOwnProperty(a)&&(r.size+=localStorage.getItem(a).length+a.length);return this._convertUnit(r)}catch(E_){Ts.warn("Storage.getSize error:",E_)}}},{key:"_convertUnit",value:function(e){var t={},n=e.unit;for(var r in t.unit=n,e)"number"==typeof e[r]&&("kb"===n.toLowerCase()?t[r]=Math.round(e[r]/1024):"mb"===n.toLowerCase()?t[r]=Math.round(e[r]/1024/1024):t[r]=e[r]);return t}},{key:"_getKey",value:function(e){return"".concat(this._getPrefix()).concat(e)}},{key:"_setStorageSync",value:function(e,t){Ha?Ka?my.setStorageSync({key:e,data:t}):za.setStorageSync(e,t):localStorage.setItem(e,JSON.stringify(t))}},{key:"_getStorageSync",value:function(e){return Ha?Ka?my.getStorageSync({key:e}).data:za.getStorageSync(e):JSON.parse(localStorage.getItem(e))}},{key:"_removeStorageSync",value:function(e){Ha?Ka?my.removeStorageSync({key:e}):za.removeStorageSync(e):localStorage.removeItem(e)}},{key:"reset",value:function(){this._doFlush(),this.checkTimes=0}}]),e}(),Xy=t((function(e){var t=Object.prototype.hasOwnProperty,n="~";function r(){}function o(e,t,n){this.fn=e,this.context=t,this.once=n||!1}function i(e,t,r,i,a){if("function"!=typeof r)throw new TypeError("The listener must be a function");var s=new o(r,i||e,a),u=n?n+t:t;return e._events[u]?e._events[u].fn?e._events[u]=[e._events[u],s]:e._events[u].push(s):(e._events[u]=s,e._eventsCount++),e}function a(e,t){0==--e._eventsCount?e._events=new r:delete e._events[t]}function s(){this._events=new r,this._eventsCount=0}Object.create&&(r.prototype=Object.create(null),(new r).__proto__||(n=!1)),s.prototype.eventNames=function(){var e,r,o=[];if(0===this._eventsCount)return o;for(r in e=this._events)t.call(e,r)&&o.push(n?r.slice(1):r);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(e)):o},s.prototype.listeners=function(e){var t=n?n+e:e,r=this._events[t];if(!r)return[];if(r.fn)return[r.fn];for(var o=0,i=r.length,a=new Array(i);o<i;o++)a[o]=r[o].fn;return a},s.prototype.listenerCount=function(e){var t=n?n+e:e,r=this._events[t];return r?r.fn?1:r.length:0},s.prototype.emit=function(e,t,r,o,i,a){var s=n?n+e:e;if(!this._events[s])return!1;var u,c,l=this._events[s],p=arguments.length;if(l.fn){switch(l.once&&this.removeListener(e,l.fn,void 0,!0),p){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,t),!0;case 3:return l.fn.call(l.context,t,r),!0;case 4:return l.fn.call(l.context,t,r,o),!0;case 5:return l.fn.call(l.context,t,r,o,i),!0;case 6:return l.fn.call(l.context,t,r,o,i,a),!0}for(c=1,u=new Array(p-1);c<p;c++)u[c-1]=arguments[c];l.fn.apply(l.context,u)}else{var f,h=l.length;for(c=0;c<h;c++)switch(l[c].once&&this.removeListener(e,l[c].fn,void 0,!0),p){case 1:l[c].fn.call(l[c].context);break;case 2:l[c].fn.call(l[c].context,t);break;case 3:l[c].fn.call(l[c].context,t,r);break;case 4:l[c].fn.call(l[c].context,t,r,o);break;default:if(!u)for(f=1,u=new Array(p-1);f<p;f++)u[f-1]=arguments[f];l[c].fn.apply(l[c].context,u)}}return!0},s.prototype.on=function(e,t,n){return i(this,e,t,n,!1)},s.prototype.once=function(e,t,n){return i(this,e,t,n,!0)},s.prototype.removeListener=function(e,t,r,o){var i=n?n+e:e;if(!this._events[i])return this;if(!t)return a(this,i),this;var s=this._events[i];if(s.fn)s.fn!==t||o&&!s.once||r&&s.context!==r||a(this,i);else{for(var u=0,c=[],l=s.length;u<l;u++)(s[u].fn!==t||o&&!s[u].once||r&&s[u].context!==r)&&c.push(s[u]);c.length?this._events[i]=1===c.length?c[0]:c:a(this,i)}return this},s.prototype.removeAllListeners=function(e){var t;return e?(t=n?n+e:e,this._events[t]&&a(this,t)):(this._events=new r,this._eventsCount=0),this},s.prototype.off=s.prototype.removeListener,s.prototype.addListener=s.prototype.on,s.prefixed=n,s.EventEmitter=s,e.exports=s}));function Qy(e){var t=e.context||null;return{platform:Uh,websdkappid:Gh,v:Ph,a2:t&&t.a2Key||void 0,tinyid:t&&t.tinyID||void 0,sdkappid:t&&t.SDKAppID||0,contentType:t&&t.contentType||0,apn:t&&t.apn||1,accounttype:t&&t.accountType||0,sdkability:2}}var Zy=function(){function e(t){Ln(this,e),this.tim=t,this.tim.innerEmitter.on($h,this._update,this),this.tim.innerEmitter.on(zh,this._update,this),this.tim.innerEmitter.on(Yh,this._updateSpecifiedConfig,this),this._initConfig()}return bn(e,[{key:"_update",value:function(e){this._initConfig()}},{key:"_updateSpecifiedConfig",value:function(e){var t=this;e.data.forEach((function(e){t._set(e)}))}},{key:"get",value:function(e){var t=e.name,n=e.action,r=e.param,o=e.tjgID;if(Ls(this.config[t])||Ls(this.config[t][n]))throw new zp({code:Wp.NETWORK_PACKAGE_UNDEFINED,message:"".concat(eh,": PackageConfig.").concat(t)});var i=function e(t){if(0===Object.getOwnPropertyNames(t).length)return Object.create(null);var n=Array.isArray(t)?[]:Object.create(null),r="";for(var o in t)null!==t[o]?void 0!==t[o]?(r=Nn(t[o]),["string","number","function","boolean"].indexOf(r)>=0?n[o]=t[o]:n[o]=e(t[o])):n[o]=void 0:n[o]=null;return n}(this.config[t][n]);return i.requestData=this._initRequestData(r,i),i.encode=this._initEncoder(i),i.decode=this._initDecoder(i),o&&(i.queryString.tjg_id=o),i}},{key:"_set",value:function(e){var t=e.key,n=e.value;if(!1!=!!t){var r=t.split(".");if(!(r.length<=0)){!function e(t,n,r,o){var i=n[r];"object"===Nn(t[i])?e(t[i],n,r+1,o):t[i]=o}(this.config,r,0,n)}}}},{key:"_initConfig",value:function(){var e;this.config={},this.config.accessLayer=(e=this.tim,{create:null,query:{serverName:Kh.NAME.WEB_IM,cmd:Kh.CMD.ACCESS_LAYER,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:Un(Un({},Qy(e)),{},{identifier:e.context.identifier,usersig:e.context.userSig}),requestData:{}},update:null,delete:null}),this.config.login=function(e){return{create:null,query:{serverName:Kh.NAME.OPEN_IM,cmd:Kh.CMD.LOGIN,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:Un(Un({},Qy(e)),{},{identifier:e.loginInfo.identifier,usersig:e.loginInfo.userSig,sdkappid:e.loginInfo.SDKAppID,accounttype:e.loginInfo.accountType,reqtime:+new Date/1e3}),requestData:{state:"Online"},keyMaps:{request:{tinyID:"tinyId"},response:{TinyId:"tinyID"}}},update:null,delete:null}}(this.tim),this.config.logout=function(e){return{create:null,query:{serverName:Kh.NAME.OPEN_IM,cmd:Kh.CMD.LOGOUT_ALL,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:Un(Un({},Qy(e)),{},{reqtime:+new Date/1e3}),requestData:{}},update:null,delete:null}}(this.tim),this.config.longPollLogout=function(e){return{create:null,query:{serverName:Kh.NAME.OPEN_IM,cmd:Kh.CMD.LOGOUT_LONG_POLL,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:Un(Un({},Qy(e)),{},{reqtime:+new Date}),requestData:{longPollID:""},keyMaps:{request:{longPollID:"LongPollingId"}}},update:null,delete:null}}(this.tim),this.config.profile=function(e){var t=Qy(e),n={serverName:Kh.NAME.PROFILE,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t};return{query:Un(Un({},n),{},{cmd:Kh.CMD.PORTRAIT_GET,requestData:{fromAccount:"",userItem:[]},keyMaps:{request:{toAccount:"To_Account",standardSequence:"StandardSequence",customSequence:"CustomSequence"}}}),update:Un(Un({},n),{},{cmd:Kh.CMD.PORTRAIT_SET,requestData:{fromAccount:"",profileItem:[{tag:Tp.NICK,value:""},{tag:Tp.GENDER,value:""},{tag:Tp.ALLOWTYPE,value:""},{tag:Tp.AVATAR,value:""}]}})}}(this.tim),this.config.group=function(e){var t=Kh.NAME.GROUP,n=Qy(e);if(e.context.login!==nc.IS_LOGIN||!e.context.a2Key){t=Kh.NAME.BIG_GROUP_NO_AUTH;var r=Qy(e);r.a2,r.tinyid;n=Kn(r,["a2","tinyid"])}var o={request:{ownerID:"Owner_Account",userID:"Member_Account",newOwnerID:"NewOwner_Account",maxMemberNum:"MaxMemberCount",groupCustomField:"AppDefinedData",memberCustomField:"AppMemberDefinedData",groupCustomFieldFilter:"AppDefinedDataFilter_Group",memberCustomFieldFilter:"AppDefinedDataFilter_GroupMember",messageRemindType:"MsgFlag",userIDList:"MemberList",groupIDList:"GroupIdList",applyMessage:"ApplyMsg",muteTime:"ShutUpTime",muteAllMembers:"ShutUpAllMember",joinOption:"ApplyJoinOption",avatar:"FaceUrl"},response:{GroupIdList:"groups",MsgFlag:"messageRemindType",AppDefinedData:"groupCustomField",AppMemberDefinedData:"memberCustomField",AppDefinedDataFilter_Group:"groupCustomFieldFilter",AppDefinedDataFilter_GroupMember:"memberCustomFieldFilter",InfoSeq:"infoSequence",MemberList:"members",GroupInfo:"groups",ShutUpUntil:"muteUntil",ShutUpAllMember:"muteAllMembers",ApplyJoinOption:"joinOption",OverJoinedGroupLimit_Account:"overLimitUserIDList"}},i={serverName:Kh.NAME.GROUP,channel:Kh.CHANNEL.XHR,protocol:xh,queryString:n};return{create:Un(Un({},i),{},{cmd:Kh.CMD.CREATE_GROUP,requestData:{type:En.GRP_WORK,name:void 0,groupID:void 0,ownerID:e.loginInfo.identifier,introduction:void 0,notification:void 0,avatar:void 0,maxMemberNum:void 0,joinOption:void 0,memberList:void 0,groupCustomField:void 0},keyMaps:o}),list:Un(Un({},i),{},{cmd:Kh.CMD.GET_JOINED_GROUPS,requestData:{userID:e.loginInfo.identifier,limit:void 0,offset:void 0,groupType:void 0,responseFilter:void 0},keyMaps:o}),query:Un(Un({},i),{},{cmd:Kh.CMD.GET_GROUP_INFO,requestData:{groupIDList:void 0,responseFilter:void 0},keyMaps:o}),getGroupMemberProfile:Un(Un({},i),{},{cmd:Kh.CMD.GET_GROUP_MEMBER_INFO,requestData:{groupID:void 0,userIDList:void 0,memberInfoFilter:void 0,memberCustomFieldFilter:void 0},keyMaps:{request:Un(Un({},o.request),{},{userIDList:"Member_List_Account"}),response:o.response}}),getGroupMemberList:Un(Un({},i),{},{cmd:Kh.CMD.GET_GROUP_MEMBER_LIST,requestData:{groupID:void 0,limit:0,offset:0,memberRoleFilter:void 0,memberInfoFilter:void 0},keyMaps:o}),quitGroup:Un(Un({},i),{},{cmd:Kh.CMD.QUIT_GROUP,requestData:{groupID:void 0}}),changeGroupOwner:Un(Un({},i),{},{cmd:Kh.CMD.CHANGE_GROUP_OWNER,queryString:n,requestData:{groupID:void 0,newOwnerID:void 0},keyMaps:o}),destroyGroup:Un(Un({},i),{},{cmd:Kh.CMD.DESTROY_GROUP,requestData:{groupID:void 0}}),updateGroupProfile:Un(Un({},i),{},{cmd:Kh.CMD.MODIFY_GROUP_INFO,requestData:{groupID:void 0,name:void 0,introduction:void 0,notification:void 0,avatar:void 0,maxMemberNum:void 0,joinOption:void 0,groupCustomField:void 0,muteAllMembers:void 0},keyMaps:{request:Un(Un({},o.request),{},{groupCustomField:"AppDefinedData"}),response:o.response}}),modifyGroupMemberInfo:Un(Un({},i),{},{cmd:Kh.CMD.MODIFY_GROUP_MEMBER_INFO,requestData:{groupID:void 0,userID:void 0,messageRemindType:void 0,nameCard:void 0,role:void 0,memberCustomField:void 0,muteTime:void 0},keyMaps:o}),addGroupMember:Un(Un({},i),{},{cmd:Kh.CMD.ADD_GROUP_MEMBER,requestData:{groupID:void 0,silence:void 0,userIDList:void 0},keyMaps:o}),deleteGroupMember:Un(Un({},i),{},{cmd:Kh.CMD.DELETE_GROUP_MEMBER,requestData:{groupID:void 0,userIDList:void 0,reason:void 0},keyMaps:{request:{userIDList:"MemberToDel_Account"}}}),searchGroupByID:Un(Un({},i),{},{cmd:Kh.CMD.SEARCH_GROUP_BY_ID,requestData:{groupIDList:void 0,responseFilter:{groupBasePublicInfoFilter:["Type","Name","Introduction","Notification","FaceUrl","CreateTime","Owner_Account","LastInfoTime","LastMsgTime","NextMsgSeq","MemberNum","MaxMemberNum","ApplyJoinOption"]}},keyMaps:{request:{groupIDList:"GroupIdList"}}}),applyJoinGroup:Un(Un({},i),{},{cmd:Kh.CMD.APPLY_JOIN_GROUP,requestData:{groupID:void 0,applyMessage:void 0,userDefinedField:void 0},keyMaps:o}),applyJoinAVChatRoom:Un(Un({},i),{},{serverName:Kh.NAME.BIG_GROUP_NO_AUTH,cmd:Kh.CMD.APPLY_JOIN_GROUP,requestData:{groupID:void 0,applyMessage:void 0,userDefinedField:void 0},keyMaps:o}),handleApplyJoinGroup:Un(Un({},i),{},{cmd:Kh.CMD.HANDLE_APPLY_JOIN_GROUP,requestData:{groupID:void 0,applicant:void 0,handleAction:void 0,handleMessage:void 0,authentication:void 0,messageKey:void 0,userDefinedField:void 0},keyMaps:{request:{applicant:"Applicant_Account",handleAction:"HandleMsg",handleMessage:"ApprovalMsg",messageKey:"MsgKey"},response:{MsgKey:"messageKey"}}}),deleteGroupSystemNotice:Un(Un({},i),{},{serverName:Kh.NAME.OPEN_IM,cmd:Kh.CMD.DELETE_GROUP_SYSTEM_MESSAGE,requestData:{messageListToDelete:void 0},keyMaps:{request:{messageListToDelete:"DelMsgList",messageSeq:"MsgSeq",messageRandom:"MsgRandom"}}}),getGroupPendency:Un(Un({},i),{},{cmd:Kh.CMD.GET_GROUP_PENDENCY,requestData:{startTime:void 0,limit:void 0,handleAccount:void 0},keyMaps:{request:{handleAccount:"Handle_Account"}}}),getOnlineMemberNum:{serverName:t,cmd:Kh.CMD.GET_ONLINE_MEMBER_NUM,channel:Kh.CHANNEL.XHR,protocol:xh,queryString:n,requestData:{groupID:void 0}}}}(this.tim),this.config.longPollID=function(e){return{create:{},query:{serverName:Kh.NAME.OPEN_IM,cmd:Kh.CMD.GET_LONG_POLL_ID,channel:Kh.CHANNEL.XHR,protocol:xh,queryString:Un(Un({},Qy(e)),{},{instanceid:e.context.instanceID,reqtime:+new Date/1e3}),requestData:{},keyMaps:{response:{LongPollingId:"longPollingID"}}},update:{},delete:{}}}(this.tim),this.config.longPoll=function(e){var t=Un(Un({},Qy(e)),{},{instanceid:e.context.instanceID,reqtime:Math.ceil(+new Date/1e3)});return{create:{},query:{serverName:Kh.NAME.OPEN_IM,cmd:Kh.CMD.LONG_POLL,channel:Kh.CHANNEL.AUTO,protocol:xh,queryString:t,requestData:{timeout:null,cookie:{notifySeq:0,noticeSeq:0,longPollingID:0}},keyMaps:{response:{C2cMsgArray:"C2CMessageArray",GroupMsgArray:"groupMessageArray",GroupTips:"groupTips",C2cNotifyMsgArray:"C2CNotifyMessageArray",ClientSeq:"clientSequence",MsgPriority:"priority",NoticeSeq:"noticeSequence",MsgContent:"content",MsgType:"type",MsgBody:"elements",ToGroupId:"to",Desc:"description",Ext:"extension"}}},update:{},delete:{}}}(this.tim),this.config.applyC2C=function(e){var t=Qy(e),n={serverName:Kh.NAME.FRIEND,channel:Kh.CHANNEL.XHR,protocol:xh,queryString:t};return{create:Un(Un({},n),{},{cmd:Kh.CMD.FRIEND_ADD,requestData:{fromAccount:"",addFriendItem:[]}}),get:Un(Un({},n),{},{cmd:Kh.CMD.GET_PENDENCY,requestData:{fromAccount:"",pendencyType:"Pendency_Type_ComeIn"}}),update:Un(Un({},n),{},{cmd:Kh.CMD.RESPONSE_PENDENCY,requestData:{fromAccount:"",responseFriendItem:[]}}),delete:Un(Un({},n),{},{cmd:Kh.CMD.DELETE_PENDENCY,requestData:{fromAccount:"",toAccount:[],pendencyType:"Pendency_Type_ComeIn"}})}}(this.tim),this.config.friend=function(e){var t=Un(Un({},Qy(e)),{},{reqtime:function(){return+new Date}}),n={serverName:Kh.NAME.FRIEND,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t};return{get:Un(Un({},n),{},{cmd:Kh.CMD.FRIEND_GET_ALL,requestData:{fromAccount:"",timeStamp:0,tagList:[Tp.NICK,"Tag_SNS_IM_Remark",Tp.AVATAR]},keyMaps:{request:{},response:{}}}),delete:Un(Un({},n),{},{cmd:Kh.CMD.FRIEND_DELETE,requestData:{fromAccount:"",toAccount:[],deleteType:"Delete_Type_Single"}})}}(this.tim),this.config.blacklist=function(e){var t=Qy(e),n={serverName:Kh.NAME.FRIEND,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t};return{create:Un(Un({},n),{},{cmd:Kh.CMD.ADD_BLACKLIST,requestData:{fromAccount:"",toAccount:[]}}),get:Un(Un({},n),{},{cmd:Kh.CMD.GET_BLACKLIST,requestData:{fromAccount:"",startIndex:0,maxLimited:30,lastSequence:0}}),delete:Un(Un({},n),{},{cmd:Kh.CMD.DELETE_BLACKLIST,requestData:{fromAccount:"",toAccount:[]}}),update:{}}}(this.tim),this.config.c2cMessage=function(e){var t=Un(Un({},Qy(e)),{},{reqtime:function(){return+new Date}}),n={request:{fromAccount:"From_Account",toAccount:"To_Account",msgTimeStamp:"MsgTimeStamp",msgSeq:"MsgSeq",msgRandom:"MsgRandom",msgBody:"MsgBody",count:"MaxCnt",lastMessageTime:"LastMsgTime",messageKey:"MsgKey",peerAccount:"Peer_Account",data:"Data",description:"Desc",extension:"Ext",type:"MsgType",content:"MsgContent",sizeType:"Type",uuid:"UUID",url:"",imageUrl:"URL",fileUrl:"Url",remoteAudioUrl:"Url",remoteVideoUrl:"VideoUrl",thumbUUID:"ThumbUUID",videoUUID:"VideoUUID",videoUrl:"",downloadFlag:"Download_Flag",nick:"From_AccountNick",avatar:"From_AccountHeadurl",from:"From_Account",time:"MsgTimeStamp",messageRandom:"MsgRandom",messageSequence:"MsgSeq",elements:"MsgBody",clientSequence:"ClientSeq",payload:"MsgContent",messageList:"MsgList",messageNumber:"MsgNum",abstractList:"AbstractList",messageBody:"MsgBody"},response:{MsgContent:"content",MsgTime:"time",Data:"data",Desc:"description",Ext:"extension",MsgKey:"messageKey",MsgType:"type",MsgBody:"elements",Download_Flag:"downloadFlag",ThumbUUID:"thumbUUID",VideoUUID:"videoUUID"}},r={serverName:Kh.NAME.OPEN_IM,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t};return{create:Un(Un({},r),{},{cmd:Kh.CMD.SEND_MESSAGE,requestData:{fromAccount:e.loginInfo.identifier,toAccount:"",msgTimeStamp:Math.ceil(+new Date/1e3),msgSeq:0,msgRandom:0,msgBody:[],cloudCustomData:void 0,nick:"",avatar:"",msgLifeTime:void 0,offlinePushInfo:{pushFlag:0,title:"",desc:"",ext:"",apnsInfo:{badgeMode:0},androidInfo:{OPPOChannelID:""}}},keyMaps:n}),query:Un(Un({},r),{},{cmd:Kh.CMD.GET_C2C_ROAM_MESSAGES,requestData:{peerAccount:"",count:15,lastMessageTime:0,messageKey:"",withRecalledMsg:1},keyMaps:n})}}(this.tim),this.config.c2cMessageWillBeRevoked=function(e){var t=Un(Un({},Qy(e)),{},{reqtime:function(){return+new Date}});return{create:{serverName:Kh.NAME.OPEN_IM,cmd:Kh.CMD.REVOKE_C2C_MESSAGE,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t,requestData:{msgInfo:{fromAccount:"",toAccount:"",msgTimeStamp:Math.ceil(+new Date/1e3),msgSeq:0,msgRandom:0}},keyMaps:{request:{msgInfo:"MsgInfo",fromAccount:"From_Account",toAccount:"To_Account",msgTimeStamp:"MsgTimeStamp",msgSeq:"MsgSeq",msgRandom:"MsgRandom",msgBody:"MsgBody"}}}}}(this.tim),this.config.c2cPeerReadTime=function(e){var t=Un(Un({},Qy(e)),{},{reqtime:function(){return+new Date}});return{get:{serverName:Kh.NAME.OPEN_IM,cmd:Kh.CMD.GET_PEER_READ_TIME,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t,requestData:{userIDList:void 0},keyMaps:{request:{userIDList:"To_Account"},response:{ReadTime:"peerReadTimeList"}}}}}(this.tim),this.config.groupMessage=function(e){var t=Un(Un({},Qy(e)),{},{reqtime:function(){return+new Date}}),n={request:{to:"GroupId",extension:"Ext",data:"Data",description:"Desc",random:"Random",sequence:"ReqMsgSeq",count:"ReqMsgNumber",type:"MsgType",priority:"MsgPriority",content:"MsgContent",elements:"MsgBody",sizeType:"Type",uuid:"UUID",url:"",imageUrl:"URL",fileUrl:"Url",remoteAudioUrl:"Url",remoteVideoUrl:"VideoUrl",thumbUUID:"ThumbUUID",videoUUID:"VideoUUID",videoUrl:"",downloadFlag:"Download_Flag",clientSequence:"ClientSeq",from:"From_Account",time:"MsgTimeStamp",messageRandom:"MsgRandom",messageSequence:"MsgSeq",payload:"MsgContent",messageList:"MsgList",messageNumber:"MsgNum",abstractList:"AbstractList",messageBody:"MsgBody"},response:{Random:"random",MsgTime:"time",MsgSeq:"sequence",ReqMsgSeq:"sequence",RspMsgList:"messageList",IsPlaceMsg:"isPlaceMessage",IsSystemMsg:"isSystemMessage",ToGroupId:"to",EnumFrom_AccountType:"fromAccountType",EnumTo_AccountType:"toAccountType",GroupCode:"groupCode",MsgPriority:"priority",MsgBody:"elements",MsgType:"type",MsgContent:"content",IsFinished:"complete",Download_Flag:"downloadFlag",ClientSeq:"clientSequence",ThumbUUID:"thumbUUID",VideoUUID:"videoUUID"}},r={serverName:Kh.NAME.GROUP,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t};return{create:Un(Un({},r),{},{cmd:Kh.CMD.SEND_GROUP_MESSAGE,requestData:{groupID:"",fromAccount:e.loginInfo.identifier,random:0,clientSequence:0,priority:"",msgBody:[],cloudCustomData:void 0,onlineOnlyFlag:0,offlinePushInfo:{pushFlag:0,title:"",desc:"",ext:"",apnsInfo:{badgeMode:0},androidInfo:{OPPOChannelID:""}},groupAtInfo:[]},keyMaps:n}),query:Un(Un({},r),{},{cmd:Kh.CMD.GET_GROUP_ROAM_MESSAGES,requestData:{withRecalledMsg:1,groupID:"",count:15,sequence:""},keyMaps:n}),update:null,delete:null}}(this.tim),this.config.groupMessageWillBeRevoked=function(e){var t=Un(Un({},Qy(e)),{},{reqtime:function(){return+new Date}});return{create:{serverName:Kh.NAME.GROUP,cmd:Kh.CMD.REVOKE_GROUP_MESSAGE,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t,requestData:{to:"",msgSeqList:[]},keyMaps:{request:{to:"GroupId",msgSeqList:"MsgSeqList",msgSeq:"MsgSeq"}}}}}(this.tim),this.config.conversation=function(e){var t=Qy(e),n={serverName:Kh.NAME.RECENT_CONTACT,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t};return{query:Un(Un({},n),{},{cmd:Kh.CMD.GET_CONVERSATION_LIST,requestData:{fromAccount:e.loginInfo.identifier,count:0},keyMaps:{request:{},response:{SessionItem:"conversations",ToAccount:"groupID",To_Account:"userID",UnreadMsgCount:"unreadCount",MsgGroupReadedSeq:"messageReadSeq"}}}),pagingQuery:Un(Un({},n),{},{cmd:Kh.CMD.PAGING_GET_CONVERSATION_LIST,requestData:{fromAccount:void 0,timeStamp:void 0,orderType:void 0},keyMaps:{request:{},response:{SessionItem:"conversations",ToAccount:"groupID",To_Account:"userID",UnreadMsgCount:"unreadCount",MsgGroupReadedSeq:"messageReadSeq",C2cPeerReadTime:"c2cPeerReadTime"}}}),delete:Un(Un({},n),{},{cmd:Kh.CMD.DELETE_CONVERSATION,requestData:{fromAccount:e.loginInfo.identifier,toAccount:void 0,type:1,toGroupID:void 0},keyMaps:{request:{toGroupID:"ToGroupid"}}}),setC2CMessageRead:Un(Un({},n),{},{serverName:Kh.NAME.OPEN_IM,cmd:Kh.CMD.SET_C2C_MESSAGE_READ,requestData:{C2CMsgReaded:void 0},keyMaps:{request:{lastMessageTime:"LastedMsgTime"}}}),setGroupMessageRead:Un(Un({},n),{},{serverName:Kh.NAME.GROUP,cmd:Kh.CMD.SET_GROUP_MESSAGE_READ,requestData:{groupID:void 0,messageReadSeq:void 0},keyMaps:{request:{messageReadSeq:"MsgReadedSeq"}}}),deleteGroupAtTips:Un(Un({},n),{},{serverName:Kh.NAME.OPEN_IM,cmd:Kh.CMD.DELETE_GROUP_AT_TIPS,requestData:{messageListToDelete:void 0},keyMaps:{request:{messageListToDelete:"DelMsgList",messageSeq:"MsgSeq",messageRandom:"MsgRandom"}}})}}(this.tim),this.config.syncMessage=function(e){var t=Un(Un({},Qy(e)),{},{reqtime:function(){return[Math.ceil(+new Date),Math.random()].join("")}});return{create:null,query:{serverName:Kh.NAME.OPEN_IM,cmd:Kh.CMD.GET_MESSAGES,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t,requestData:{cookie:"",syncFlag:0,needAbstract:1},keyMaps:{request:{fromAccount:"From_Account",toAccount:"To_Account",from:"From_Account",to:"To_Account",time:"MsgTimeStamp",sequence:"MsgSeq",random:"MsgRandom",elements:"MsgBody"},response:{MsgList:"messageList",SyncFlag:"syncFlag",To_Account:"to",From_Account:"from",ClientSeq:"clientSequence",MsgSeq:"sequence",NoticeSeq:"noticeSequence",NotifySeq:"notifySequence",MsgRandom:"random",MsgTimeStamp:"time",MsgContent:"content",ToGroupId:"groupID",MsgKey:"messageKey",GroupTips:"groupTips",MsgBody:"elements",MsgType:"type",C2CRemainingUnreadCount:"C2CRemainingUnreadList"}}},update:null,delete:null}}(this.tim),this.config.AVChatRoom=function(e){var t=Kh.NAME.BIG_GROUP_LONG_POLLING,n=Un(Un({},Qy(e)),{},{accounttype:"792",reqtime:function(){return+new Date}});if(e.context.login!==nc.IS_LOGIN||!e.context.a2Key){t=Kh.NAME.BIG_GROUP_LONG_POLLING_NO_AUTH;var r=n;r.a2,r.tinyid;n=Kn(r,["a2","tinyid"])}return{startLongPoll:{serverName:t,cmd:Kh.CMD.AVCHATROOM_LONG_POLL,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:n,requestData:{USP:1,startSeq:1,holdTime:90,key:void 0},keyMaps:{request:{USP:"USP"},response:{ToGroupId:"groupID",MsgPriority:"priority"}}}}}(this.tim),this.config.cosUpload=function(e){var t=Un(Un({},Qy(e)),{},{reqtime:function(){return+new Date}});return{create:{serverName:Kh.NAME.OPEN_IM,cmd:Kh.CMD.FILE_UPLOAD,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t,requestData:{appVersion:"2.1",fromAccount:"",toAccount:"",sequence:0,time:function(){return Math.ceil(Date.now()/1e3)},random:function(){return Ks()},fileStrMd5:"",fileSize:"",serverVer:1,authKey:"",busiId:1,pkgFlag:1,sliceOffset:0,sliceSize:0,sliceData:"",contentType:"application/x-www-form-urlencoded"},keyMaps:{request:{},response:{}}},update:null,delete:null}}(this.tim),this.config.cosSig=function(e){var t={sdkappid:e.loginInfo.SDKAppID,identifier:e.loginInfo.identifier,userSig:e.context.userSig};return{create:null,query:{serverName:Kh.NAME.IM_COS_SIGN,cmd:Kh.CMD.COS_SIGN,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t,requestData:{cmd:"open_im_cos_svc",subCmd:"get_cos_token",duration:300,version:2},keyMaps:{request:{userSig:"usersig",subCmd:"sub_cmd",cmd:"cmd",duration:"duration",version:"version"},response:{expired_time:"expiredTime",bucket_name:"bucketName",session_token:"sessionToken",tmp_secret_id:"secretId",tmp_secret_key:"secretKey"}}},update:null,delete:null}}(this.tim),this.config.cosPreSig=function(e){var t={sdkappid:e.loginInfo.SDKAppID,identifier:e.loginInfo.identifier,userSig:e.context.userSig,platform:Ha?8:7,version:Ph};return{query:{serverName:Kh.NAME.IM_COS_MESSAGE,cmd:Kh.CMD.COS_PRE_SIG,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t,requestData:{fileType:void 0,fileName:void 0,uploadMethod:0,duration:900},keyMaps:{request:{userSig:"usersig",fileType:"file_type",fileName:"file_name",uploadMethod:"upload_method"},response:{expired_time:"expiredTime",request_id:"requestId",head_url:"headUrl",upload_url:"uploadUrl",download_url:"downloadUrl",ci_url:"ciUrl"}}}}}(this.tim),this.config.bigDataHallwayAuthKey=function(e){return{create:null,query:{serverName:Kh.NAME.OPEN_IM,cmd:Kh.CMD.BIG_DATA_HALLWAY_AUTH_KEY,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:Un(Un({},Qy(e)),{},{accounttype:"792",reqtime:function(){return+new Date}}),requestData:{}}}}(this.tim),this.config.ssoEventStat=function(e){var t={sdkappid:e.loginInfo.SDKAppID,reqtime:Math.ceil(+new Date/1e3)};return{create:{serverName:Kh.NAME.IM_OPEN_STAT,cmd:Kh.CMD.TIM_WEB_REPORT,channel:Kh.CHANNEL.AUTO,protocol:xh,queryString:t,requestData:{table:"",report:[]},keyMaps:{request:{table:"table",report:"report",SDKAppID:"sdkappid",version:"version",tinyID:"tinyid",userID:"userid",platform:"platform",method:"method",time:"time",start:"start",end:"end",cost:"cost",status:"status",codeint:"codeint",message:"message",pointer:"pointer",text:"text",msgType:"msgtype",networkType:"networktype",startts:"startts",endts:"endts",timespan:"timespan"}}},query:{},update:{},delete:{}}}(this.tim),this.config.ssoSumStat=function(e){var t=null;null!==e.context&&(t={sdkappid:e.context.SDKAppID,reqtime:Math.ceil(+new Date/1e3)});return{create:{serverName:Kh.NAME.IM_OPEN_STAT,cmd:Kh.CMD.TIM_WEB_REPORT,channel:Kh.CHANNEL.AUTO,protocol:xh,queryString:t,requestData:{table:"",report:[]},keyMaps:{request:{table:"table",report:"report",SDKAppID:"sdkappid",version:"version",tinyID:"tinyid",userID:"userid",item:"item",lpID:"lpid",platform:"platform",scene:"scene",networkType:"networktype",total:"total",successRate:"successrate",avg:"avg",timespan:"timespan",time:"time"}}},query:{},update:{},delete:{}}}(this.tim),this.config.mergerMessage=function(e){var t=Un(Un({},Qy(e)),{},{reqtime:function(){return+new Date}}),n={request:{fromAccount:"From_Account",toAccount:"To_Account",msgTimeStamp:"MsgTimeStamp",msgSeq:"MsgSeq",msgRandom:"MsgRandom",msgBody:"MsgBody",type:"MsgType",content:"MsgContent",data:"Data",description:"Desc",extension:"Ext",sizeType:"Type",uuid:"UUID",url:"",imageUrl:"URL",fileUrl:"Url",remoteAudioUrl:"Url",remoteVideoUrl:"VideoUrl",thumbUUID:"ThumbUUID",videoUUID:"VideoUUID",videoUrl:"",downloadFlag:"Download_Flag",from:"From_Account",time:"MsgTimeStamp",messageRandom:"MsgRandom",messageSequence:"MsgSeq",elements:"MsgBody",clientSequence:"ClientSeq",payload:"MsgContent",messageList:"MsgList",messageNumber:"MsgNum",abstractList:"AbstractList",messageBody:"MsgBody"},response:{Data:"data",Desc:"description",Ext:"extension",Download_Flag:"downloadFlag",ThumbUUID:"thumbUUID",VideoUUID:"videoUUID"}},r={serverName:Kh.NAME.IM_LONG_MESSAGE,channel:Kh.CHANNEL.XHR,protocol:xh,method:"POST",queryString:t};return{create:Un(Un({},r),{},{cmd:Kh.CMD.UPLOAD_MERGER_MESSAGE,requestData:{messageList:[]},keyMaps:n}),query:Un(Un({},r),{},{cmd:Kh.CMD.DOWNLOAD_MERGER_MESSAGE,requestData:{downloadKey:""},keyMaps:n})}}(this.tim)}},{key:"_initRequestData",value:function(e,t){if(void 0===e)return Kd(t.requestData,this._getRequestMap(t),this.tim);var n=t.requestData,r=Object.create(null);for(var o in n)if(Object.prototype.hasOwnProperty.call(n,o)){if(r[o]="function"==typeof n[o]?n[o]():n[o],void 0===e[o])continue;r[o]=e[o]}return r=Kd(r,this._getRequestMap(t),this.tim)}},{key:"_getRequestMap",value:function(e){if(e.keyMaps&&e.keyMaps.request&&Object.keys(e.keyMaps.request).length>0)return e.keyMaps.request}},{key:"_initEncoder",value:function(e){switch(e.protocol){case xh:return function(e){if("string"===Nn(e))try{return JSON.parse(e)}catch(E_){return e}return e};case qh:return function(e){return e};default:return function(e){return Ts.warn("PackageConfig._initEncoder(), unknow response type, data: ",JSON.stringify(e)),e}}}},{key:"_initDecoder",value:function(e){switch(e.protocol){case xh:return function(e){if("string"===Nn(e))try{return JSON.parse(e)}catch(E_){return e}return e};case qh:return function(e){return e};default:return function(e){return Ts.warn("PackageConfig._initDecoder(), unknow response type, data: ",e),e}}}}]),e}(),e_=Math.floor;Ne({target:"Number",stat:!0},{isInteger:function(e){return!m(e)&&isFinite(e)&&e_(e)===e}});var t_=function(){for(var e=[],t=n_(arguments),n=0;n<arguments.length;n++)Number.isInteger(arguments[n])?e.push(arguments[n]):e.push(!0==!!arguments[n]?"1":"0");return e.join(t)},n_=function(e){var t=e.length,n=e[t-1];if("string"!=typeof n)return"";if(n.length>1)return"";var r=e[t-1];return delete e[t-1],e.length-=t===e.length?1:0,r},r_={C2CMessageArray:1,groupMessageArray:1,groupTips:1,C2CNotifyMessageArray:1,profileModify:1,friendListMod:1},o_=function(e){qn(n,e);var t=zn(n);function n(e){var r;return Ln(this,n),(r=t.call(this,e))._initialization(),r}return bn(n,[{key:"_initialization",value:function(){this._syncOffset="",this._syncNoticeList=[],this._syncEventArray=[],this._syncMessagesIsRunning=!1,this._syncMessagesFinished=!1,this._isLongPoll=!1,this._longPollID="0",this._noticeSequence=0,this._initializeListener(),this._runLoop=null,this._initShuntChannels()}},{key:"_initShuntChannels",value:function(){this._shuntChannels=Object.create(null),this._shuntChannels.C2CMessageArray=this._C2CMessageArrayChannel.bind(this),this._shuntChannels.groupMessageArray=this._groupMessageArrayChannel.bind(this),this._shuntChannels.groupTips=this._groupTipsChannel.bind(this),this._shuntChannels.C2CNotifyMessageArray=this._C2CNotifyMessageArrayChannel.bind(this),this._shuntChannels.profileModify=this._profileModifyChannel.bind(this),this._shuntChannels.friendListMod=this._friendListModChannel.bind(this)}},{key:"_C2CMessageArrayChannel",value:function(e,t,n){this.emitInnerEvent(ld,t)}},{key:"_groupMessageArrayChannel",value:function(e,t,n){this.emitInnerEvent(pd,t)}},{key:"_groupTipsChannel",value:function(e,t,n){var r=this;switch(e){case 4:case 6:this.emitInnerEvent(fd,t);break;case 5:t.forEach((function(e){Ns(e.elements.revokedInfos)?r.emitInnerEvent(vd,t):Ns(e.elements.groupMessageReadNotice)?r.emitInnerEvent(yd,t):r.emitInnerEvent(dd,{groupSystemNotices:t,type:n})}));break;case 12:this.emitInnerEvent(hd,t);break;default:Ts.log("NotificationController._groupTipsChannel unknown event=".concat(e," type=").concat(n),t)}}},{key:"_C2CNotifyMessageArrayChannel",value:function(e,t,n){var r=this;Ns(t)&&t.forEach((function(e){Rs(e)&&(e.hasOwnProperty("kickoutMsgNotify")?r.emitInnerEvent(cd):e.hasOwnProperty("c2cMessageRevokedNotify")?r.emitInnerEvent(_d,t):e.hasOwnProperty("c2cMessageReadReceipt")?r.emitInnerEvent(Md,t):e.hasOwnProperty("c2cMessageReadNotice")&&r.emitInnerEvent(Id,t))}))}},{key:"_profileModifyChannel",value:function(e,t,n){this.emitInnerEvent(md,t)}},{key:"_friendListModChannel",value:function(e,t,n){this.emitInnerEvent(gd,t)}},{key:"_dispatchNotice",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"poll";if(Ns(e))for(var n=null,r=null,o="",i=0,a=0,s=e.length;a<s;a++)i=(n=e[a]).event,o=Object.keys(n).find((function(e){return void 0!==r_[e]})),bs(this._shuntChannels[o])?(r=n[o],"poll"===t&&this._updatenoticeSequence(r),this._shuntChannels[o](i,r,t)):("poll"===t&&this._updatenoticeSequence(),Ts.log("NotificationController._dispatchNotice unknown eventItem=",n))}},{key:"getLongPollID",value:function(){return this._longPollID}},{key:"_IAmReady",value:function(){this.triggerReady()}},{key:"reset",value:function(){this._noticeSequence=0,this._resetSync(),this.closeNoticeChannel()}},{key:"_resetSync",value:function(){this._syncOffset="",this._syncNoticeList=[],this._syncEventArray=[],this._syncMessagesIsRunning=!1,this._syncMessagesFinished=!1}},{key:"_setNoticeSeqInRequestData",value:function(e){e.Cookie.NoticeSeq=this._noticeSequence,this.tim.sumStatController.addTotalCount(sg)}},{key:"_updatenoticeSequence",value:function(e){if(e){var t=e[e.length-1].noticeSequence;t&&"number"==typeof t?t<=this._noticeSequence||(this._noticeSequence=t):this._noticeSequence++}else this._noticeSequence++}},{key:"_initializeListener",value:function(){var e=this.tim.innerEmitter;e.on(Wh,this._startSyncMessages,this),e.on(kd,this.closeNoticeChannel,this)}},{key:"openNoticeChannel",value:function(){Ts.log("NotificationController.openNoticeChannel"),this._getLongPollID()}},{key:"closeNoticeChannel",value:function(){Ts.log("NotificationController.closeNoticeChannel"),(this._runLoop instanceof zv||this._runLoop instanceof Wv)&&(this._runLoop.abort(),this._runLoop.stop()),this._longPollID="0",this._isLongPoll=!1}},{key:"_getLongPollID",value:function(){var e=this;if("0"===this._longPollID){var t=new Mg(mm);this.request({name:"longPollID",action:"query"}).then((function(n){var r=n.data.longPollingID;e._onGetLongPollIDSuccess(r),t.setText("longPollingID=".concat(r)).setNetworkType(e.getNetworkType()).setEnd()})).catch((function(n){var r=new zp({code:n.code||Wp.GET_LONGPOLL_ID_FAILED,message:n.message||oh});e.emitInnerEvent(id),e.emitInnerEvent(Od,r),e.probeNetwork().then((function(e){var n=Wn(e,2),o=n[0],i=n[1];t.setError(r,o,i).setEnd()}))}))}else this._onGetLongPollIDSuccess(this._longPollID)}},{key:"_onGetLongPollIDSuccess",value:function(e){this.emitInnerEvent(Yh,[{key:"long_poll_logout.query.requestData.longPollingID",value:e},{key:"longPoll.query.requestData.cookie.longPollingID",value:e}]),this._longPollID=e,this._startLongPoll(),this._IAmReady(),this.tim.sumStatController.recordLongPollingID(this._longPollID)}},{key:"_startLongPoll",value:function(){if(!0!==this._isLongPoll){Ts.log("NotificationController._startLongPoll...");var e=this.tim.connectionController,t=this.createTransportCapsule({name:"longPoll",action:"query"});this._isLongPoll=!0,this._runLoop=e.createRunLoop({pack:t,before:this._setNoticeSeqInRequestData.bind(this),success:this._onNoticeReceived.bind(this),fail:this._onNoticeFail.bind(this)}),this._runLoop.start()}else Ts.log("NotificationController._startLongPoll is running...")}},{key:"_onNoticeReceived",value:function(e){var t=e.data;t.errorCode!==tc.SUCCESS?(new Mg(vm).setMessage(t.errorInfo||JSON.stringify(t)).setCode(t.errorCode).setNetworkType(this.getNetworkType()).setEnd(!0),this._onResponseError(t)):this.emitInnerEvent(sd);this.tim.sumStatController.addSuccessCount(sg),this.tim.sumStatController.addCost(sg,t.timecost),e.data.eventArray&&this._dispatchNotice(e.data.eventArray)}},{key:"_onResponseError",value:function(e){switch(e.errorCode){case Wp.LONG_POLL_KICK_OUT:Ts.warn("NotificationController._onResponseError, longPollingID=".concat(this._longPollID," was kicked out")),this.emitInnerEvent(ud),this.closeNoticeChannel();break;case Wp.MESSAGE_A2KEY_EXPIRED:case Wp.ACCOUNT_A2KEY_EXPIRED:this.emitInnerEvent(Ad);break;default:Ls(e.errorCode)||Ls(e.errorInfo)?Ts.log("NotificationController._onResponseError, errorCode or errorInfo undefined!",e):this.emitInnerEvent(Od,new zp({code:e.errorCode,message:e.errorInfo}))}}},{key:"_onNoticeFail",value:function(e){if(e.error)if("ECONNABORTED"===e.error.code||e.error.code===Wp.NETWORK_TIMEOUT)if(e.error.config){var t=e.error.config.url,n=e.error.config.data;Ts.log("NotificationController._onNoticeFail request timed out. url=".concat(t," data=").concat(n))}else Ts.log("NotificationController._onNoticeFail request timed out.");else Ts.log("NotificationController._onNoticeFail request failed due to network error");this.emitInnerEvent(ad)}},{key:"_startSyncMessages",value:function(e){!0!==this._syncMessagesFinished&&this.syncMessage()}},{key:"syncMessage",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this._syncMessagesIsRunning=!0,this.request({name:"syncMessage",action:"query",param:{cookie:t,syncFlag:n}}).then((function(t){var n=t.data;switch(t_(n.cookie,n.syncFlag)){case"00":case"01":e.emitInnerEvent(Od,{code:Wp.NOTICE_RUNLOOP_OFFSET_LOST,message:rh});break;case"10":case"11":n.eventArray&&e._dispatchNotice(n.eventArray,"sync"),e._syncNoticeList=e._syncNoticeList.concat(n.messageList),e.emitInnerEvent(Jh,{data:n.messageList,C2CRemainingUnreadList:n.C2CRemainingUnreadList}),e._syncOffset=n.cookie,e.syncMessage(n.cookie,n.syncFlag);break;case"12":n.eventArray&&e._dispatchNotice(n.eventArray,"sync"),e.openNoticeChannel(),e._syncNoticeList=e._syncNoticeList.concat(n.messageList),e.emitInnerEvent(Xh,{messageList:n.messageList,C2CRemainingUnreadList:n.C2CRemainingUnreadList}),e._syncOffset=n.cookie,e._syncNoticeList=[],e._syncMessagesIsRunning=!1,e._syncMessagesFinished=!0}})).catch((function(t){e._syncMessagesIsRunning=!1,Ts.error("NotificationController.syncMessage failed. error:",t)}))}}]),n}(Xd),i_=function(e){qn(n,e);var t=zn(n);function n(e){var r;return Ln(this,n),(r=t.call(this,e)).TIMUploadPlugin=null,r.timUploadPlugin=null,r.COSSDK=null,r._cosUploadMethod=null,r.expiredTimeLimit=600,r.appid=0,r.bucketName="",r.ciUrl="",r.directory="",r.downloadUrl="",r.uploadUrl="",r.expiredTimeOut=r.expiredTimeLimit,r.region="ap-shanghai",r.cos=null,r.cosOptions={secretId:"",secretKey:"",sessionToken:"",expiredTime:0},r._timer=0,r.uploadFileType="",r.duration=900,r.tryCount=0,r.tim.innerEmitter.on(Wh,r._init,Hn(r)),r.triggerReady(),r}return bn(n,[{key:"_expiredTimer",value:function(){var e=this;this._timer=setInterval((function(){Math.ceil(Date.now()/1e3)>=e.cosOptions.expiredTime-120&&(e._getAuthorizationKey(),clearInterval(e._timer))}),6e4)}},{key:"_init",value:function(){if(this.TIMUploadPlugin=this.tim.getPlugin("tim-upload-plugin"),this.TIMUploadPlugin)this._initUploaderMethod();else{var e=Ha?"cos-wx-sdk":"cos-js-sdk";this.COSSDK=this.tim.getPlugin(e),this.COSSDK?(this._getAuthorizationKey(),Ts.warn("UploadController._init v2.9.2起推荐使用 tim-upload-plugin 代替 ".concat(e,"，上传更快更安全。详细请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#registerPlugin"))):Ts.warn("UploadController._init 没有检测到上传插件，将无法发送图片、音频、视频、文件等类型的消息。详细请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#registerPlugin")}}},{key:"_getAuthorizationKey",value:function(){var e=this,t=Math.ceil(Date.now()/1e3),n=new Mg(Ag);this.request({name:"cosSig",action:"query",param:{duration:this.expiredTimeLimit}}).then((function(r){Ts.log("UploadController._getAuthorizationKey ok. data:",r.data);var o=r.data,i=o.expiredTime-t;n.setText("requestId=".concat(o.requestId," requestTime=").concat(t," expiredTime=").concat(o.expiredTime," timeout=").concat(i,"s")).setNetworkType(e.getNetworkType()).setEnd(),!Ha&&o.region&&(e.region=o.region),e.appid=o.appid,e.bucketName=o.bucketName,e.ciUrl=o.ciUrl,e.directory=o.directory,e.downloadUrl=o.downloadUrl,e.uploadUrl=o.uploadUrl,e.expiredTimeOut=i,e.cosOptions={secretId:o.secretId,secretKey:o.secretKey,sessionToken:o.sessionToken,expiredTime:o.expiredTime},Ts.log("UploadController._getAuthorizationKey cos.config:","region=".concat(e.region,",bucketName=").concat(e.bucketName)),e._initUploaderMethod(),e._expiredTimer()})).catch((function(t){e.probeNetwork().then((function(e){var r=Wn(e,2),o=r[0],i=r[1];n.setError(t,o,i).setEnd()})),Ts.warn("UploadController._getAuthorizationKey failed. error:",t)}))}},{key:"_getCosPreSigUrl",value:function(e){var t=this,n=Math.ceil(Date.now()/1e3),r=new Mg(Og);return this.request({name:"cosPreSig",action:"query",param:{fileType:e.fileType,fileName:e.fileName,uploadMethod:e.uploadMethod,duration:e.duration}}).then((function(e){t.tryCount=0;var o=e.data||{},i=o.expiredTime-n;return Ts.log("UploadController._getCosPreSigUrl ok. data:",o),r.setText("requestId=".concat(o.requestId," expiredTime=").concat(o.expiredTime," timeout=").concat(i,"s")).setNetworkType(t.getNetworkType()).setEnd(),o})).catch((function(n){return-1===n.code&&(n.code=Wp.COS_GET_SIG_FAIL),t.probeNetwork().then((function(e){var t=Wn(e,2),o=t[0],i=t[1];r.setError(n,o,i).setEnd()})),Ts.warn("UploadController._getCosPreSigUrl failed. error:",n),t.tryCount<1?(t.tryCount++,t._getCosPreSigUrl(e)):(t.tryCount=0,og(new zp({code:Wp.COS_GET_SIG_FAIL,message:rf})))}))}},{key:"_initUploaderMethod",value:function(){var e=this;if(this.TIMUploadPlugin)return this.timUploadPlugin=new this.TIMUploadPlugin,void(this._cosUploadMethod=function(t,n){e.timUploadPlugin.uploadFile(t,n)});this.appid&&(this.cos=Ha?new this.COSSDK({ForcePathStyle:!0,getAuthorization:this._getAuthorization.bind(this)}):new this.COSSDK({getAuthorization:this._getAuthorization.bind(this)}),this._cosUploadMethod=Ha?function(t,n){e.cos.postObject(t,n)}:function(t,n){e.cos.uploadFiles(t,n)})}},{key:"_getAuthorization",value:function(e,t){t({TmpSecretId:this.cosOptions.secretId,TmpSecretKey:this.cosOptions.secretKey,XCosSecurityToken:this.cosOptions.sessionToken,ExpiredTime:this.cosOptions.expiredTime})}},{key:"uploadImage",value:function(e){if(!e.file)return og(new zp({code:Wp.MESSAGE_IMAGE_SELECT_FILE_FIRST,message:ff}));var t=this._checkImageType(e.file);if(!0!==t)return t;var n=this._checkImageMime(e.file);if(!0!==n)return n;var r=this._checkImageSize(e.file);if(!0!==r)return r;var o=null;return this._setUploadFileType(ch),this.upload(e).then((function(e){return o=e,t="https://".concat(e.location),Ha?new Promise((function(e,n){za.getImageInfo({src:t,success:function(t){e({width:t.width,height:t.height})},fail:function(){e({width:0,height:0})}})})):is&&9===as?Promise.resolve({width:0,height:0}):new Promise((function(e,n){var r=new Image;r.onload=function(){e({width:this.width,height:this.height}),r=null},r.onerror=function(){e({width:0,height:0}),r=null},r.src=t}));var t})).then((function(e){return o.width=e.width,o.height=e.height,Promise.resolve(o)}))}},{key:"_checkImageType",value:function(e){var t="";return t=Ha?e.url.slice(e.url.lastIndexOf(".")+1):e.files[0].name.slice(e.files[0].name.lastIndexOf(".")+1),sh.indexOf(t.toLowerCase())>=0||og(new zp({code:Wp.MESSAGE_IMAGE_TYPES_LIMIT,message:hf}))}},{key:"_checkImageMime",value:function(e){return!0}},{key:"_checkImageSize",value:function(e){var t=0;return 0===(t=Ha?e.size:e.files[0].size)?og(new zp({code:Wp.MESSAGE_FILE_IS_EMPTY,message:"".concat(cf)})):t<20971520||og(new zp({code:Wp.MESSAGE_IMAGE_SIZE_LIMIT,message:"".concat(df)}))}},{key:"uploadFile",value:function(e){var t=null;return e.file?e.file.files[0].size>104857600?(t=new zp({code:Wp.MESSAGE_FILE_SIZE_LIMIT,message:Cf}),og(t)):0===e.file.files[0].size?(t=new zp({code:Wp.MESSAGE_FILE_IS_EMPTY,message:"".concat(cf)}),og(t)):(this._setUploadFileType(fh),this.upload(e)):(t=new zp({code:Wp.MESSAGE_FILE_SELECT_FILE_FIRST,message:If}),og(t))}},{key:"uploadVideo",value:function(e){return e.file.videoFile.size>104857600?og(new zp({code:Wp.MESSAGE_VIDEO_SIZE_LIMIT,message:"".concat(yf)})):0===e.file.videoFile.size?og(new zp({code:Wp.MESSAGE_FILE_IS_EMPTY,message:"".concat(cf)})):-1===uh.indexOf(e.file.videoFile.type)?og(new zp({code:Wp.MESSAGE_VIDEO_TYPES_LIMIT,message:"".concat(_f)})):(this._setUploadFileType(lh),Ha?this.handleVideoUpload({file:e.file.videoFile}):$a?this.handleVideoUpload(e):void 0)}},{key:"handleVideoUpload",value:function(e){var t=this;return new Promise((function(n,r){t.upload(e).then((function(e){n(e)})).catch((function(){t.upload(e).then((function(e){n(e)})).catch((function(){r(new zp({code:Wp.MESSAGE_VIDEO_UPLOAD_FAIL,message:vf}))}))}))}))}},{key:"uploadAudio",value:function(e){return e.file?e.file.size>20971520?og(new zp({code:Wp.MESSAGE_AUDIO_SIZE_LIMIT,message:"".concat(mf)})):0===e.file.size?og(new zp({code:Wp.MESSAGE_FILE_IS_EMPTY,message:"".concat(cf)})):(this._setUploadFileType(ph),this.upload(e)):og(new zp({code:Wp.MESSAGE_AUDIO_UPLOAD_FAIL,message:gf}))}},{key:"upload",value:function(e){var t=this;if(!bs(this._cosUploadMethod))return Ts.warn("UploadController.upload 没有检测到上传插件，将无法发送图片、音频、视频、文件等类型的消息。详细请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#registerPlugin"),og(new zp({code:Wp.COS_UNDETECTED,message:nf}));if(this.timUploadPlugin)return this._uploadWithPreSigUrl(e);var n=new Mg(Rg);Ts.time(_g);var r=Ha?e.file:e.file.files[0];return new Promise((function(o,i){var a=Ha?t._createCosOptionsWXMiniApp(e):t._createCosOptionsWeb(e),s=t;t._cosUploadMethod(a,(function(e,a){var u=Object.create(null);if(a){if(e||Ns(a.files)&&a.files[0].error){var c=new zp({code:Wp.MESSAGE_FILE_UPLOAD_FAIL,message:Mf});return n.setError(c,!0,t.getNetworkType()).setEnd(),Ts.log("UploadController.upload failed, error:",a.files[0].error),403===a.files[0].error.statusCode&&(Ts.warn("UploadController.upload failed. cos AccessKeyId was invalid, regain auth key!"),t._getAuthorizationKey()),void i(c)}u.fileName=r.name,u.fileSize=r.size,u.fileType=r.type.slice(r.type.indexOf("/")+1).toLowerCase(),u.location=Ha?a.Location:a.files[0].data.Location;var l=Ts.timeEnd(_g),p=s._formatFileSize(r.size),f=s._formatSpeed(1e3*r.size/l),h="size=".concat(p,",time=").concat(l,"ms,speed=").concat(f);return Ts.log("UploadController.upload success name=".concat(r.name,",").concat(h)),o(u),void n.setNetworkType(t.getNetworkType()).setText(h).setEnd()}var d=new zp({code:Wp.MESSAGE_FILE_UPLOAD_FAIL,message:Mf});n.setError(d,!0,s.getNetworkType()).setEnd(),Ts.warn("UploadController.upload failed, error:",e),403===e.statusCode&&(Ts.warn("UploadController.upload failed. cos AccessKeyId was invalid, regain auth key!"),t._getAuthorizationKey()),i(d)}))}))}},{key:"_uploadWithPreSigUrl",value:function(e){var t=this,n=Ha?e.file:e.file.files[0];return this._createCosOptionsPreSigUrl(e).then((function(e){return new Promise((function(r,o){var i=new Mg(Rg);Ts.time(_g),t._cosUploadMethod(e,(function(e,a){var s=Object.create(null);if(e||403===a.statusCode){var u=new zp({code:Wp.MESSAGE_FILE_UPLOAD_FAIL,message:Mf});return i.setError(u,!0,t.getNetworkType()).setEnd(),Ts.log("UploadController._uploadWithPreSigUrl failed, error:",e),void o(u)}var c=a.data.location||"";0!==c.indexOf("https://")&&0!==c.indexOf("http://")||(c=c.split("//")[1]),s.fileName=n.name,s.fileSize=n.size,s.fileType=n.type.slice(n.type.indexOf("/")+1).toLowerCase(),s.location=c;var l=Ts.timeEnd(_g),p=t._formatFileSize(n.size),f=t._formatSpeed(1e3*n.size/l),h="size=".concat(p,",time=").concat(l,"ms,speed=").concat(f);Ts.log("UploadController._uploadWithPreSigUrl success name=".concat(n.name,",").concat(h)),i.setNetworkType(t.getNetworkType()).setText(h).setEnd(),r(s)}))}))}))}},{key:"_formatFileSize",value:function(e){return e<1024?e+"B":e<1048576?Math.floor(e/1024)+"KB":Math.floor(e/1048576)+"MB"}},{key:"_formatSpeed",value:function(e){return e<=1048576?(e/1024).toFixed(1)+"KB/s":(e/1048576).toFixed(1)+"MB/s"}},{key:"_createCosOptionsWeb",value:function(e){var t=this._genFileName(e.file.files[0].name);return{files:[{Bucket:"".concat(this.bucketName,"-").concat(this.appid),Region:this.region,Key:"".concat(this.directory,"/").concat(t),Body:e.file.files[0]}],SliceSize:1048576,onProgress:function(t){if("function"==typeof e.onProgress)try{e.onProgress(t.percent)}catch(n){Ts.warn("onProgress callback error:",n),Ts.error(n)}},onFileFinish:function(e,t,n){}}}},{key:"_createCosOptionsWXMiniApp",value:function(e){var t=this._genFileName(e.file.name),n=e.file.url;return{Bucket:"".concat(this.bucketName,"-").concat(this.appid),Region:this.region,Key:"".concat(this.directory,"/").concat(t),FilePath:n,onProgress:function(t){if(Ts.log(JSON.stringify(t)),"function"==typeof e.onProgress)try{e.onProgress(t.percent)}catch(n){Ts.warn("onProgress callback error:",n),Ts.error(n)}}}}},{key:"_createCosOptionsPreSigUrl",value:function(e){var t=this,n="",r="",o=0;return Ha?(n=this._genFileName(e.file.name),r=e.file.url,o=1):(n=this._genFileName("".concat(Ks(999999))),r=e.file.files[0],o=0),this._getCosPreSigUrl({fileType:this.uploadFileType,fileName:n,uploadMethod:o,duration:this.duration}).then((function(o){var i=o.uploadUrl,a=o.downloadUrl;return{url:i,fileType:t.uploadFileType,fileName:n,resources:r,downloadUrl:a,onProgress:function(t){if("function"==typeof e.onProgress)try{e.onProgress(t.percent)}catch(n){Ts.warn("onProgress callback error:",n),Ts.error(n)}}}}))}},{key:"_genFileName",value:function(e){return"".concat(iu(),"-").concat(e)}},{key:"_setUploadFileType",value:function(e){this.uploadFileType=e}},{key:"reset",value:function(){this._timer&&(clearInterval(this._timer),this._timer=0)}}]),n}(Xd),a_=function(e){qn(n,e);var t=zn(n);function n(e){var r;return Ln(this,n),(r=t.call(this,e)).FILETYPE={SOUND:2106,FILE:2107,VIDEO:2113},r._bdh_download_server="grouptalk.c2c.qq.com",r._BDHBizID=10001,r._authKey="",r._expireTime=0,r.tim.innerEmitter.on(Wh,r._getAuthKey,Hn(r)),r}return bn(n,[{key:"_getAuthKey",value:function(){var e=this;this.request({name:"bigDataHallwayAuthKey",action:"query"}).then((function(t){t.data.authKey&&(e._authKey=t.data.authKey,e._expireTime=parseInt(t.data.expireTime))}))}},{key:"_isFromOlderVersion",value:function(e){return!(!e.content||2===e.content.downloadFlag)}},{key:"parseElements",value:function(e,t){if(!Ns(e)||!t)return[];for(var n=[],r=null,o=0;o<e.length;o++)r=e[o],this._needParse(r)?n.push(this._parseElement(r,t)):n.push(e[o]);return n}},{key:"_needParse",value:function(e){return!e.cloudCustomData&&!(!this._isFromOlderVersion(e)||e.type!==En.MSG_AUDIO&&e.type!==En.MSG_FILE&&e.type!==En.MSG_VIDEO)}},{key:"_parseElement",value:function(e,t){switch(e.type){case En.MSG_AUDIO:return this._parseAudioElement(e,t);case En.MSG_FILE:return this._parseFileElement(e,t);case En.MSG_VIDEO:return this._parseVideoElement(e,t)}}},{key:"_parseAudioElement",value:function(e,t){return e.content.url=this._genAudioUrl(e.content.uuid,t),e}},{key:"_parseFileElement",value:function(e,t){return e.content.url=this._genFileUrl(e.content.uuid,t,e.content.fileName),e}},{key:"_parseVideoElement",value:function(e,t){return e.content.url=this._genVideoUrl(e.content.uuid,t),e}},{key:"_genAudioUrl",value:function(e,t){return""===this._authKey?(Ts.warn("BigDataHallwayController._genAudioUrl no authKey!"),""):"https://".concat(this._bdh_download_server,"/asn.com/stddownload_common_file?authkey=").concat(this._authKey,"&bid=").concat(this._BDHBizID,"&subbid=").concat(this.tim.context.SDKAppID,"&fileid=").concat(e,"&filetype=").concat(this.FILETYPE.SOUND,"&openid=").concat(t,"&ver=0")}},{key:"_genFileUrl",value:function(e,t,n){return""===this._authKey?(Ts.warn("BigDataHallwayController._genFileUrl no authKey!"),""):(n||(n="".concat(Math.floor(1e5*Math.random()),"-").concat(Date.now())),"https://".concat(this._bdh_download_server,"/asn.com/stddownload_common_file?authkey=").concat(this._authKey,"&bid=").concat(this._BDHBizID,"&subbid=").concat(this.tim.context.SDKAppID,"&fileid=").concat(e,"&filetype=").concat(this.FILETYPE.FILE,"&openid=").concat(t,"&ver=0&filename=").concat(encodeURIComponent(n)))}},{key:"_genVideoUrl",value:function(e,t){return""===this._authKey?(Ts.warn("BigDataHallwayController._genVideoUrl no authKey!"),""):"https://".concat(this._bdh_download_server,"/asn.com/stddownload_common_file?authkey=").concat(this._authKey,"&bid=").concat(this._BDHBizID,"&subbid=").concat(this.tim.context.SDKAppID,"&fileid=").concat(e,"&filetype=").concat(this.FILETYPE.VIDEO,"&openid=").concat(t,"&ver=0")}},{key:"reset",value:function(){this._authKey="",this.expireTime=0}}]),n}(Xd),s_=function(){function e(t){Ln(this,e),this._table="timwebii",this._report=[]}return bn(e,[{key:"pushIn",value:function(e){Ts.debug("SSOLogBody.pushIn",this._report.length,e),this._report.push(e)}},{key:"backfill",value:function(e){var t;Ns(e)&&0!==e.length&&(Ts.debug("SSOLogBody.backfill",this._report.length,e.length),(t=this._report).unshift.apply(t,Yn(e)))}},{key:"getLogsNumInMemory",value:function(){return this._report.length}},{key:"isEmpty",value:function(){return 0===this._report.length}},{key:"_reset",value:function(){this._report.length=0,this._report=[]}},{key:"getTable",value:function(){return this._table}},{key:"getLogsInMemory",value:function(){var e=this._report.slice();return this._reset(),e}}]),e}(),u_=function(e){qn(n,e);var t=zn(n);function n(e){var r;return Ln(this,n),(r=t.call(this,e)).TAG="im-ssolog-event",r._reportBody=new s_,r._version="2.10.2",r.MIN_THRESHOLD=20,r.MAX_THRESHOLD=100,r.WAITING_TIME=6e4,r.INTERVAL=2e4,r._timerID=0,r._resetLastReportTime(),r._startReportTimer(),r._retryCount=0,r.MAX_RETRY_COUNT=3,r.tim.innerEmitter.on(Td,r._onLoginSuccess,Hn(r)),r}return bn(n,[{key:"reportAtOnce",value:function(){Ts.debug("EventStatController.reportAtOnce"),this._report()}},{key:"_onLoginSuccess",value:function(){var e=this,t=this.tim.storage,n=t.getItem(this.TAG,!1);!cu(n)&&bs(n.forEach)&&(Ts.log("EventStatController._onLoginSuccess get ssolog in storage, nums="+n.length),n.forEach((function(t){e._reportBody.pushIn(t)})),t.removeItem(this.TAG,!1))}},{key:"pushIn",value:function(e){e instanceof Mg&&(e.setCommonInfo({SDKAppID:this.tim.context.SDKAppID,version:this._version,tinyID:this.tim.context.tinyID,userID:this.tim.loginInfo.identifier,platform:this.getPlatform(),scene:this.tim.context.scene,instanceID:this.tim.context.instanceID}),this._reportBody.pushIn(e),this._reportBody.getLogsNumInMemory()>=this.MIN_THRESHOLD&&this._report())}},{key:"_resetLastReportTime",value:function(){this._lastReportTime=Date.now()}},{key:"_startReportTimer",value:function(){var e=this;this._timerID=setInterval((function(){Date.now()<e._lastReportTime+e.WAITING_TIME||e._reportBody.isEmpty()||e._report()}),this.INTERVAL)}},{key:"_stopReportTimer",value:function(){this._timerID>0&&(clearInterval(this._timerID),this._timerID=0)}},{key:"_report",value:function(){var e=this;if(!this._reportBody.isEmpty()){var t=this._reportBody.getLogsInMemory();this.request({name:"ssoEventStat",action:"create",param:{table:this._reportBody.getTable(),report:t}}).then((function(){e._resetLastReportTime(),e._retryCount>0&&(Ts.debug("EventStatController.report retry success"),e._retryCount=0)})).catch((function(n){if(Ts.warn("EventStatController.report, networkType:".concat(e.getNetworkType()," error:").concat(Vs(n))),e._reportBody.backfill(t),e._reportBody.getLogsNumInMemory()>e.MAX_THRESHOLD||e._retryCount===e.MAX_RETRY_COUNT||0===e._timerID)return e._retryCount=0,void e._flushAtOnce();e._retryCount+=1}))}}},{key:"_flushAtOnce",value:function(){var e=this.tim.storage,t=e.getItem(this.TAG,!1),n=this._reportBody.getLogsInMemory();if(cu(t))Ts.log("EventStatController._flushAtOnce nums="+n.length),e.setItem(this.TAG,n,!0,!1);else{var r=n.concat(t);r.length>this.MAX_THRESHOLD&&(r=r.slice(0,this.MAX_THRESHOLD)),Ts.log("EventStatController._flushAtOnce nums="+r.length),e.setItem(this.TAG,r,!0,!1)}}},{key:"reset",value:function(){Ts.log("EventStatController.reset"),this._stopReportTimer(),this._report()}}]),n}(Xd),c_="none",l_="online",p_=function(){function e(){Ln(this,e),this._networkType="",this.maxWaitTime=3e3}return bn(e,[{key:"start",value:function(){var e=this;Ha?(za.getNetworkType({success:function(t){e._networkType=t.networkType,t.networkType===c_?Ts.warn("NetMonitor no network, please check!"):Ts.info("NetMonitor networkType:".concat(t.networkType))}}),za.onNetworkStatusChange(this._onNetworkStatusChange.bind(this))):this._networkType=l_}},{key:"_onNetworkStatusChange",value:function(e){this._networkType=e.networkType,e.isConnected?Ts.info("NetMonitor networkType:".concat(e.networkType)):Ts.warn("NetMonitor no network, please check!")}},{key:"probe",value:function(){var e=this;return new Promise((function(t,n){if(Ha)za.getNetworkType({success:function(n){e._networkType=n.networkType,n.networkType===c_?(Ts.warn("NetMonitor no network, please check!"),t([!1,n.networkType])):(Ts.info("NetMonitor networkType:".concat(n.networkType)),t([!0,n.networkType]))}});else if(window&&window.fetch)fetch("".concat(Ys(),"//web.sdk.qcloud.com/im/assets/speed.xml?random=").concat(Math.random())).then((function(e){e.ok?t([!0,l_]):t([!1,c_])})).catch((function(e){t([!1,c_])}));else{var r=new XMLHttpRequest,o=setTimeout((function(){Ts.warn("NetMonitor fetch timeout. Probably no network, please check!"),r.abort(),e._networkType=c_,t([!1,c_])}),e.maxWaitTime);r.onreadystatechange=function(){4===r.readyState&&(clearTimeout(o),200===r.status||304===r.status?(this._networkType=l_,t([!0,l_])):(Ts.warn("NetMonitor fetch status:".concat(r.status,". Probably no network, please check!")),this._networkType=c_,t([!1,c_])))},r.open("GET","".concat(Ys(),"//web.sdk.qcloud.com/im/assets/speed.xml?random=").concat(Math.random())),r.send()}}))}},{key:"getNetworkType",value:function(){return this._networkType}},{key:"reset",value:function(){this._networkType=""}}]),e}(),f_=function(){function e(t){var n=this;Ln(this,e),Ns(t)?(this._map=new Map,t.forEach((function(e){n._map.set(e,[])}))):Ts.warn("AverageCalculator.constructor need keys")}return bn(e,[{key:"push",value:function(e,t){return!(Ls(e)||!this._map.has(e)||!ks(t))&&(this._map.get(e).push(t),!0)}},{key:"getSize",value:function(e){return Ls(e)||!this._map.has(e)?-1:this._map.get(e).length}},{key:"getAvg",value:function(e){if(Ls(e)||!this._map.has(e))return-1;var t=this._map.get(e),n=t.length;if(0===n)return 0;var r=0;return t.forEach((function(e){r+=e})),t.length=0,this._map.set(e,[]),parseInt(r/n)}},{key:"getMax",value:function(e){return Ls(e)||!this._map.has(e)?-1:Math.max.apply(null,this._map.get(e))}},{key:"getMin",value:function(e){return Ls(e)||!this._map.has(e)?-1:Math.min.apply(null,this._map.get(e))}},{key:"reset",value:function(){this._map.forEach((function(e){e.length=0}))}}]),e}(),h_=function(){function e(t){var n=this;Ln(this,e),Ns(t)?(this._map=new Map,t.forEach((function(e){n._map.set(e,{totalCount:0,successCount:0})}))):Ts.warn("SuccessRateCalculator.constructor need keys")}return bn(e,[{key:"addTotalCount",value:function(e){return!(Ls(e)||!this._map.has(e))&&(this._map.get(e).totalCount+=1,!0)}},{key:"addSuccessCount",value:function(e){return!(Ls(e)||!this._map.has(e))&&(this._map.get(e).successCount+=1,!0)}},{key:"getSuccessRate",value:function(e){if(Ls(e)||!this._map.has(e))return-1;var t=this._map.get(e);if(0===t.totalCount)return 1;var n=parseFloat((t.successCount/t.totalCount).toFixed(2));return n>1&&(n=1),t.totalCount=t.successCount=0,n}},{key:"getTotalCount",value:function(e){return Ls(e)||!this._map.has(e)?-1:this._map.get(e).totalCount}},{key:"reset",value:function(){this._map.forEach((function(e){e.totalCount=0,e.successCount=0}))}}]),e}(),d_=function(e){qn(n,e);var t=zn(n);function n(e){var r;return Ln(this,n),(r=t.call(this,e)).TABLE="timwebsum",r.TAG="im-ssolog-sumstat",r._items=[sg,ug,cg,lg,pg,fg,hg,dg,gg,mg],r._thresholdMap=new Map,r._thresholdMap.set(sg,100),r._thresholdMap.set(ug,150),r._thresholdMap.set(cg,15),r._thresholdMap.set(lg,6),r._thresholdMap.set(pg,6),r._thresholdMap.set(fg,6),r._thresholdMap.set(hg,6),r._thresholdMap.set(dg,6),r._thresholdMap.set(gg,50),r._thresholdMap.set(mg,50),r._lpID="",r._platform=r.getPlatform(),r._lastReportTime=0,r._statInfoArr=[],r._retryCount=0,r._avgCalc=new f_(r._items),r._successRateCalc=new h_(r._items),r.tim.innerEmitter.on(Td,r._onLoginSuccess,Hn(r)),r}return bn(n,[{key:"_onLoginSuccess",value:function(){var e=this,t=this.tim.storage,n=t.getItem(this.TAG,!1);!cu(n)&&bs(n.forEach)&&(Ts.log("SumStatController._onLoginSuccess get sumstatlog in storage, nums="+n.length),n.forEach((function(t){e._statInfoArr.push(t)})),t.removeItem(this.TAG,!1))}},{key:"recordLongPollingID",value:function(e){this._lpID=e}},{key:"addTotalCount",value:function(e){this._successRateCalc.addTotalCount(e)?1===this._successRateCalc.getTotalCount(e)&&(this._lastReportTime=Date.now()):Ts.warn("SumStatController.addTotalCount invalid key:",e)}},{key:"addSuccessCount",value:function(e){this._successRateCalc.addSuccessCount(e)||Ts.warn("SumStatController.addSuccessCount invalid key:",e)}},{key:"addCost",value:function(e,t){this._avgCalc.push(e,t)?(Ts.debug("SumStatController.addCost",e,t,this._avgCalc.getSize(e)),this._avgCalc.getSize(e)>=this._thresholdMap.get(e)&&this._report(e)):Ts.warn("SumStatController.addCost invalid key or cost:",e,t)}},{key:"_getItemNum",value:function(e){switch(e){case sg:return 1;case ug:return 2;case cg:return 3;case gg:return 4;case mg:return 5;case lg:return 6;case pg:return 7;case fg:return 8;case hg:return 9;case dg:return 10;default:return 100}}},{key:"_getStatInfo",value:function(e){var t=null;return this._avgCalc.getSize(e)>0&&(t={SDKAppID:"".concat(this.tim.context.SDKAppID),version:"".concat("2.10.2"),tinyID:this.tim.context.tinyID,userID:this.tim.loginInfo.identifier,item:this._getItemNum(e),lpID:e===sg?this._lpID:"",platform:this._platform,scene:this.tim.context.scene,networkType:this.getNetworkType(),total:this._successRateCalc.getTotalCount(e),successRate:this._successRateCalc.getSuccessRate(e),avg:this._avgCalc.getAvg(e),timespan:Date.now()-this._lastReportTime,time:Bs()}),t}},{key:"_report",value:function(e){var t=this,n=[],r=null;Ls(e)?this._items.forEach((function(e){null!==(r=t._getStatInfo(e))&&n.push(r)})):null!==(r=this._getStatInfo(e))&&n.push(r),Ts.debug("SumStatController._report",n),this._statInfoArr.length>0&&(n=n.concat(this.statInfoArr),this._statInfoArr=[]),this._doReport(n)}},{key:"_doReport",value:function(e){var t=this;cu(e)?Ts.warn("SumStatController._doReport statInfoArr is empty, do nothing"):this.request({name:"ssoSumStat",action:"create",param:{table:this.TABLE,report:e}}).then((function(){t._lastReportTime=Date.now(),t._retryCount>0&&(Ts.debug("SumStatController._doReport retry success"),t._retryCount=0)})).catch((function(n){Ts.warn("SumStatController._doReport, online:".concat(t.getNetworkType()," error:").concat(Vs(n)),e),t._retryCount<=1?setTimeout((function(){Ts.info("SumStatController._doReport retry",e),t._retryCount+=1,t._doReport(e)}),5e3):(t._retryCount=0,t._statInfoArr=t._statInfoArr.concat(e),t._flushAtOnce())}))}},{key:"_flushAtOnce",value:function(){var e=this.tim.storage,t=e.getItem(this.TAG,!1),n=this._statInfoArr;if(cu(t))Ts.log("SumStatController._flushAtOnce nums="+n.length),e.setItem(this.TAG,n,!0,!1);else{var r=n.concat(t);r.length>10&&(r=r.slice(0,10)),Ts.log("SumStatController._flushAtOnce nums="+r.length),e.setItem(this.TAG,r,!0,!1)}this._statInfoArr=[]}},{key:"reset",value:function(){Ts.info("SumStatController.reset"),this._report(),this._avgCalc.reset(),this._successRateCalc.reset()}}]),n}(Xd),g_=function(){function e(){Ln(this,e),this._funcMap=new Map}return bn(e,[{key:"defense",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;if("string"!=typeof e)return null;if(0===e.length)return null;if("function"!=typeof t)return null;if(this._funcMap.has(e)&&this._funcMap.get(e).has(t))return this._funcMap.get(e).get(t);this._funcMap.has(e)||this._funcMap.set(e,new Map);var r=null;return this._funcMap.get(e).has(t)?r=this._funcMap.get(e).get(t):(r=this._pack(e,t,n),this._funcMap.get(e).set(t,r)),r}},{key:"defenseOnce",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return"function"!=typeof t?null:this._pack(e,t,n)}},{key:"find",value:function(e,t){return"string"!=typeof e||0===e.length||"function"!=typeof t?null:this._funcMap.has(e)?this._funcMap.get(e).has(t)?this._funcMap.get(e).get(t):(Ts.log("SafetyCallback.find: 找不到 func —— ".concat(e,"/").concat(""!==t.name?t.name:"[anonymous]")),null):(Ts.log("SafetyCallback.find: 找不到 eventName-".concat(e," 对应的 func")),null)}},{key:"delete",value:function(e,t){return"function"==typeof t&&(!!this._funcMap.has(e)&&(!!this._funcMap.get(e).has(t)&&(this._funcMap.get(e).delete(t),0===this._funcMap.get(e).size&&this._funcMap.delete(e),!0)))}},{key:"_pack",value:function(e,t,n){return function(){try{t.apply(n,Array.from(arguments))}catch(a){var r=Object.values(Cn).indexOf(e);if(-1!==r){var o=Object.keys(Cn)[r];Ts.warn("接入侧事件 TIM.EVENT.".concat(o," 对应的回调函数逻辑存在问题，请检查！"),a)}var i=new Mg(Am);i.setText("eventName=".concat(e)).setMessage(a.message).setEnd()}}}}]),e}(),m_=function(e){qn(n,e);var t=zn(n);function n(e){var r;return Ln(this,n),(r=t.call(this,e))._maybeLostSequencesMap=new Map,r}return bn(n,[{key:"onMessageMaybeLost",value:function(e,t,n){this._maybeLostSequencesMap.has(e)||this._maybeLostSequencesMap.set(e,[]);for(var r=this._maybeLostSequencesMap.get(e),o=0;o<n;o++)r.push(t+o);Ts.debug("MessageLossController.onMessageMaybeLost. maybeLostSequences:".concat(r))}},{key:"detectMessageLoss",value:function(e,t){var n=this._maybeLostSequencesMap.get(e);if(!cu(n)&&!cu(t)){var r=t.filter((function(e){return-1!==n.indexOf(e)}));if(Ts.debug("MessageLossController.detectMessageLoss. matchedSequences:".concat(r)),n.length===r.length)Ts.info("MessageLossController.detectMessageLoss no message loss. conversationID=".concat(e));else{var o,i=n.filter((function(e){return-1===r.indexOf(e)})),a=i.length;a<=5?o=e+"-"+i.join("-"):(i.sort((function(e,t){return e-t})),o=e+" start:"+i[0]+" end:"+i[a-1]+" count:"+a),new Mg(Mm).setText(o).setNetworkType(this.getNetworkType()).setEnd(),Ts.warn("MessageLossController.detectMessageLoss message loss detected. conversationID:".concat(e," lostSequences:").concat(i))}n.length=0}}},{key:"reset",value:function(){Ts.log("MessageLossController.reset"),this._maybeLostSequencesMap.clear()}}]),n}(Xd),v_=function(e){qn(n,e);var t=zn(n);function n(e){var r;return Ln(this,n),(r=t.call(this,e))._request=Ha?new jv:new Bv,r}return bn(n,[{key:"sendMessage",value:function(e){var t=this,n=this._constructMessageInstance(e);if(null===n)return og({code:Wp.MESSAGE_SEND_FAIL,message:of});var r=Date.now(),o=cu(e.GroupId)?"openim/sendmsg":"group_open_http_svc/send_group_msg",i=this.tim.context,a=i.a2Key,s=i.tinyID,u=i.SDKAppID,c=i.identifier,l={url:"https://"+(!0===this.tim.context.oversea?"api.im.qcloud.com":"webim.tim.qq.com")+"/v4/"+o+"?platform=10&websdkappid=537048168&v=1.7.3&a2="+a+"&tinyid="+s+"&sdkappid="+u+"&contentType=json&apn=1&reqtime="+Date.now()+"tjg_id="+this._generateTjgID(n),data:e,method:"POST"};this._addSendMessageTotalCount(n);var p=new Mg(Lg);return p.setText("".concat(this._generateTjgID(n),"-").concat(n.from,"-").concat(n.to,"-").concat(n.getElements().length)),this._request.request(l).then((function(e){var o=e.data,i=o.ErrorCode,a=o.ErrorInfo;if(0!==i)return p.setCode(i).setMessage(a).setNetworkType(t.getNetworkType()).setEnd(),n.status=rc.FAIL,og(new zp({code:i,message:a||of,data:{message:n}}));t._addSendMessageSuccessCount(n,r),n.status=rc.SUCCESS;var s=e.data,u=s.MsgTime,l=s.MsgSeq;return n.time=u,l&&(n.sequence=l),n.generateMessageID(c),t.tim.messageController.pushToMessageList(n),t.emitInnerEvent(Qh,{eventDataList:[{conversationID:n.conversationID,unreadCount:0,type:n.conversationType,subType:n.conversationSubType,lastMessage:n}]}),rg(n)})).catch((function(e){return t.probeNetwork().then((function(t){var n=Wn(t,2),r=n[0],o=n[1];p.setError(e,r,o).setEnd()})),Ts.warn("ComboMessageController.sendMessage failed. error:",e),n.status=rc.FAIL,og(new zp({code:Wp.MESSAGE_SEND_FAIL,message:of,data:{message:n}}))}))}},{key:"_constructMessageInstance",value:function(e){var t=null;try{var n=this.tim.context.identifier,r={};r.currentUser=n,r.from=e.From_Account||n,e.GroupId?(r.conversationID="".concat(En.CONV_GROUP).concat(e.GroupId),r.conversationType=En.CONV_GROUP,r.to=e.GroupId):e.To_Account&&(r.conversationID="".concat(En.CONV_C2C).concat(e.To_Account),r.conversationType=En.CONV_C2C,r.to=e.To_Account),r.time=e.MsgTimeStamp||0,r.random=e.Random||e.MsgRandom||0,r.priority=e.MsgPriority,(t=new Th(r)).status=rc.UNSEND;for(var o,i=e.MsgBody.length,a=0;a<i;a++)"TIMTextElem"===(o=e.MsgBody[a]).MsgType?t.setTextElement(o.MsgContent.Text):"TIMCustomElem"===o.MsgType?t.setCustomElement({data:o.MsgContent.Data||"",description:o.MsgContent.Desc||"",extension:o.MsgContent.Ext||""}):"TIMFaceElem"===o.MsgType&&t.setFaceElement({index:o.MsgContent.Index,data:o.MsgContent.Data});var s=t.getElements();t.payload=s[0].content,t.type=s[0].type}catch(E_){t=null,Ts.error("ComboMessageController._constructMessageInstance failed. error:",E_)}return t}},{key:"_addSendMessageSuccessCount",value:function(e,t){var n=this.tim.sumStatController,r=Math.abs(Date.now()-t);n.addSuccessCount(cg),n.addCost(cg,r);var o=this._getSendMessageSpecifiedKey(e);o&&(n.addSuccessCount(o),n.addCost(o,r))}},{key:"_addSendMessageTotalCount",value:function(e){var t=this.tim.sumStatController;t.addTotalCount(cg);var n=this._getSendMessageSpecifiedKey(e);n&&t.addTotalCount(n)}},{key:"_getSendMessageSpecifiedKey",value:function(e){if(e.conversationType===En.CONV_C2C)return lg;if(e.conversationType===En.CONV_GROUP){var t=this.tim.groupController.getLocalGroupProfile(e.to);if(!t)return;var n=t.type;if(Qs(n))return pg;if(Zs(n))return fg;if(eu(n))return hg;if(tu(n))return dg}}},{key:"_generateTjgID",value:function(e){return this.tim.context.tinyID+"-"+e.random}},{key:"reset",value:function(){Ts.info("ComboMessageController.reset")}}]),n}(Xd),y_=function(){function e(t){Ln(this,e);var n=new Mg(Ig);Jd.mixin(this),this._initOptions(t),this._initMemberVariables(),this._initControllers(),this._initListener(),Mg.bindController(this.eventStatController),n.setText("instanceID=".concat(this.loginInfo.instanceID,"-oversea=").concat(this.loginInfo.oversea,"-mp=").concat(Ha,"-ua=").concat(Ya)).setEnd(),Ts.info("SDK instanceID:".concat(this.loginInfo.instanceID," oversea:").concat(this.loginInfo.oversea," inMiniApp:").concat(Ha,", SDKAppID:").concat(t.SDKAppID,", UserAgent:").concat(Ya)),this._safetyCallbackFactory=new g_}return bn(e,[{key:"login",value:function(e){return Ts.time(ig),this._ssoLog=new Mg(Cg),this.netMonitor.start(),this.loginInfo.identifier=e.identifier||e.userID,this.loginInfo.userSig=e.userSig,this.signController.login(this.loginInfo)}},{key:"logout",value:function(){var e=this.signController.logout();return this.resetSDK(),e}},{key:"on",value:function(e,t,n){e===Cn.GROUP_SYSTEM_NOTICE_RECEIVED&&Ts.warn("！！！TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED v2.6.0起弃用，为了更好的体验，请在 TIM.EVENT.MESSAGE_RECEIVED 事件回调内接收处理群系统通知，详细请参考：https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/Message.html#.GroupSystemNoticePayload"),Ts.debug("on","eventName:".concat(e)),this.outerEmitter.on(e,this._safetyCallbackFactory.defense(e,t,n),n)}},{key:"once",value:function(e,t,n){Ts.debug("once","eventName:".concat(e)),this.outerEmitter.once(e,this._safetyCallbackFactory.defenseOnce(e,t,n),n||this)}},{key:"off",value:function(e,t,n,r){Ts.debug("off","eventName:".concat(e));var o=this._safetyCallbackFactory.find(e,t);null!==o&&(this.outerEmitter.off(e,o,n,r),this._safetyCallbackFactory.delete(e,t))}},{key:"registerPlugin",value:function(e){var t=this;this.plugins||(this.plugins={}),Object.keys(e).forEach((function(n){t.plugins[n]=e[n]})),new Mg(kg).setText("key=".concat(Object.keys(e))).setEnd()}},{key:"getPlugin",value:function(e){return this.plugins[e]||void 0}},{key:"setLogLevel",value:function(e){if(e<=0){console.log([""," ________  ______  __       __  __       __  ________  _______","|        \\|      \\|  \\     /  \\|  \\  _  |  \\|        \\|       \\"," \\$$$$$$$$ \\$$$$$$| $$\\   /  $$| $$ / \\ | $$| $$$$$$$$| $$$$$$$\\","   | $$     | $$  | $$$\\ /  $$$| $$/  $\\| $$| $$__    | $$__/ $$","   | $$     | $$  | $$$$\\  $$$$| $$  $$$\\ $$| $$  \\   | $$    $$","   | $$     | $$  | $$\\$$ $$ $$| $$ $$\\$$\\$$| $$$$$   | $$$$$$$\\","   | $$    _| $$_ | $$ \\$$$| $$| $$$$  \\$$$$| $$_____ | $$__/ $$","   | $$   |   $$ \\| $$  \\$ | $$| $$$    \\$$$| $$     \\| $$    $$","    \\$$    \\$$$$$$ \\$$      \\$$ \\$$      \\$$ \\$$$$$$$$ \\$$$$$$$","",""].join("\n")),console.log("%cIM 智能客服，随时随地解决您的问题 →_→ https://cloud.tencent.com/act/event/smarty-service?from=im-doc","color:#ff0000");console.log(["","参考以下文档，会更快解决问题哦！(#^.^#)\n","SDK 更新日志: https://cloud.tencent.com/document/product/269/38492\n","SDK 接口文档: https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html\n","常见问题: https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/tutorial-01-faq.html\n","反馈问题？戳我提 issue: https://github.com/tencentyun/TIMSDK/issues\n","如果您需要在生产环境关闭上面的日志，请 tim.setLogLevel(1)\n"].join("\n"))}Ts.setLevel(e)}},{key:"destroy",value:function(){var e=this;return this.logout().finally((function(){e.outerEmitter.emit(Cn.SDK_DESTROY,{SDKAppID:e.loginInfo.SDKAppID})}))}},{key:"createTextMessage",value:function(e){return this.messageController.createTextMessage(e)}},{key:"createTextAtMessage",value:function(e){return this.messageController.createTextMessage(e)}},{key:"createImageMessage",value:function(e){return this.messageController.createImageMessage(e)}},{key:"createAudioMessage",value:function(e){return this.messageController.createAudioMessage(e)}},{key:"createVideoMessage",value:function(e){return this.messageController.createVideoMessage(e)}},{key:"createCustomMessage",value:function(e){return this.messageController.createCustomMessage(e)}},{key:"createFaceMessage",value:function(e){return this.messageController.createFaceMessage(e)}},{key:"createFileMessage",value:function(e){return this.messageController.createFileMessage(e)}},{key:"createMergerMessage",value:function(e){return this.messageController.createMergerMessage(e)}},{key:"downloadMergerMessage",value:function(e){return e.type!==En.MSG_MERGER?og(new zp({code:Wp.MESSAGE_MERGER_TYPE_INVALID,message:Sf})):cu(e.payload.downloadKey)?og(new zp({code:Wp.MESSAGE_MERGER_KEY_INVALID,message:Tf})):this.messageController.downloadMergerMessage(e).catch((function(e){return og(new zp({code:Wp.MESSAGE_MERGER_DOWNLOAD_FAIL,message:Df}))}))}},{key:"createForwardMessage",value:function(e){return this.messageController.createForwardMessage(e)}},{key:"sendMessage",value:function(e,t){return e instanceof Th?this.messageController.sendMessageInstance(e,t):og(new zp({code:Wp.MESSAGE_SEND_NEED_MESSAGE_INSTANCE,message:sf}))}},{key:"callExperimentalAPI",value:function(e,t){return"sendComboMessage"===e?this.comboMessageController.sendMessage(t):og(new zp({code:Wp.INVALID_OPERATION,message:ih}))}},{key:"revokeMessage",value:function(e){return this.messageController.revokeMessage(e)}},{key:"resendMessage",value:function(e){return this.messageController.resendMessage(e)}},{key:"getMessageList",value:function(e){return this.messageController.getMessageList(e)}},{key:"setMessageRead",value:function(e){return this.messageController.setMessageRead(e)}},{key:"getConversationList",value:function(){return this.conversationController.getConversationList()}},{key:"getConversationProfile",value:function(e){return this.conversationController.getConversationProfile(e)}},{key:"deleteConversation",value:function(e){return this.conversationController.deleteConversation(e)}},{key:"getMyProfile",value:function(){return this.userController.getMyProfile()}},{key:"getUserProfile",value:function(e){return this.userController.getUserProfile(e)}},{key:"updateMyProfile",value:function(e){return this.userController.updateMyProfile(e)}},{key:"getFriendList",value:function(){return this.userController.getFriendList()}},{key:"deleteFriend",value:function(e){return this.userController.deleteFriend(e)}},{key:"getBlacklist",value:function(){return this.userController.getBlacklist()}},{key:"addToBlacklist",value:function(e){return this.userController.addBlacklist(e)}},{key:"removeFromBlacklist",value:function(e){return this.userController.deleteBlacklist(e)}},{key:"getGroupList",value:function(e){return this.groupController.getGroupList(e)}},{key:"getGroupProfile",value:function(e){return this.groupController.getGroupProfile(e)}},{key:"createGroup",value:function(e){return this.groupController.createGroup(e)}},{key:"dismissGroup",value:function(e){return this.groupController.dismissGroup(e)}},{key:"updateGroupProfile",value:function(e){return this.groupController.updateGroupProfile(e)}},{key:"joinGroup",value:function(e){return this.groupController.joinGroup(e)}},{key:"quitGroup",value:function(e){return this.groupController.quitGroup(e)}},{key:"searchGroupByID",value:function(e){return this.groupController.searchGroupByID(e)}},{key:"changeGroupOwner",value:function(e){return this.groupController.changeGroupOwner(e)}},{key:"handleGroupApplication",value:function(e){return this.groupController.handleGroupApplication(e)}},{key:"setMessageRemindType",value:function(e){return this.groupController.setMessageRemindType(e)}},{key:"getGroupMemberList",value:function(e){return this.groupController.getGroupMemberList(e)}},{key:"getGroupMemberProfile",value:function(e){return this.groupController.getGroupMemberProfile(e)}},{key:"getGroupOnlineMemberCount",value:function(e){return this.groupController.getGroupOnlineMemberCount(e)}},{key:"addGroupMember",value:function(e){return this.groupController.addGroupMember(e)}},{key:"deleteGroupMember",value:function(e){return this.groupController.deleteGroupMember(e)}},{key:"setGroupMemberMuteTime",value:function(e){return this.groupController.setGroupMemberMuteTime(e)}},{key:"setGroupMemberRole",value:function(e){return this.groupController.setGroupMemberRole(e)}},{key:"setGroupMemberNameCard",value:function(e){return this.groupController.setGroupMemberNameCard(e)}},{key:"setGroupMemberCustomField",value:function(e){return this.groupController.setGroupMemberCustomField(e)}},{key:"_initOptions",value:function(e){this.plugins={},this._sdkReloadFlag=!1;var t=e.SDKAppID||0,n=Ks();this.context={SDKAppID:t,accountType:n},this.loginInfo={SDKAppID:t,accountType:n,identifier:null,userSig:null,unlimitedAVChatRoom:e.unlimitedAVChatRoom||!1,scene:e.scene||"",oversea:e.oversea||!1,avchatroomIDList:[],instanceID:iu()},this.options={runLoopNetType:e.runLoopNetType||Cp,enablePointer:e.enablePointer||!1}}},{key:"_initMemberVariables",value:function(){this.innerEmitter=new Xy,this.outerEmitter=new Xy,ng(this.outerEmitter),this.packageConfig=new Zy(this),this.storage=new Jy(this),this.netMonitor=new p_,this.outerEmitter._emit=this.outerEmitter.emit,this.outerEmitter.emit=function(e,t){var n=arguments[0],r=[n,{name:arguments[0],data:arguments[1]}];this.outerEmitter._emit.apply(this.outerEmitter,r)}.bind(this),this.innerEmitter._emit=this.innerEmitter.emit,this.innerEmitter.emit=function(e,t){var n;Rs(arguments[1])&&arguments[1].data?(Ts.warn("inner eventData has data property, please check!"),n=[e,{name:arguments[0],data:arguments[1].data}]):n=[e,{name:arguments[0],data:arguments[1]}],this.innerEmitter._emit.apply(this.innerEmitter,n)}.bind(this)}},{key:"_initControllers",value:function(){this.exceptionController=new Jv(this),this.connectionController=new Yv(this),this.contextController=new Zd(this),this.context=this.contextController.getContext(),this.signController=new Rm(this),this.messageController=new Gy(this),this.comboMessageController=new v_(this),this.conversationController=new vy(this),this.userController=new iy(this),this.groupController=new zy(this),this.notificationController=new o_(this),this.bigDataHallwayController=new a_(this),this.statusController=new Wy(this),this.uploadController=new i_(this),this.messageLossController=new m_(this),this.eventStatController=new u_(this),this.sumStatController=new d_(this),this._initReadyListener()}},{key:"_initListener",value:function(){var e=this;if(this.innerEmitter.on(Ud,this._onSDKReload,this),Ha&&"function"==typeof za.onAppShow&&"function"==typeof za.onAppHide){var t=null;za.onAppHide((function(){t=new Mg(km)})),za.onAppShow((function(){null!==t&&t.setNetworkType(e.netMonitor.getNetworkType()).setEnd()}))}}},{key:"_initReadyListener",value:function(){for(var e=this,t=this.readyList,n=0,r=t.length;n<r;n++)this[t[n]].ready((function(){return e._readyHandle()}))}},{key:"_onSDKReload",value:function(){var e=this;Ts.log("sdk reloading..."),this.resetSDK(),this.login(this.loginInfo).then((function(t){e._sdkReloadFlag=!0}))}},{key:"resetSDK",value:function(){var e=this;this.initList.forEach((function(t){e[t].reset&&e[t].reset()})),this.netMonitor.reset(),this.storage.reset(),this.resetReady(),this._initReadyListener(),this.outerEmitter.emit(Cn.SDK_NOT_READY)}},{key:"_readyHandle",value:function(){for(var e=this.readyList,t=!0,n=0,r=e.length;n<r;n++)if(!this[e[n]].isReady()){t=!1;break}if(t){var o=Ts.timeEnd(ig);Ts.warn("SDK is ready. cost=".concat(o,"ms")),this.triggerReady(),this.innerEmitter.emit(Gd),this.outerEmitter.emit(Cn.SDK_READY),this._sdkReloadFlag&&(this.outerEmitter.emit(Cn.SDK_RELOAD),this.groupController.AVChatRoomHandler.joinAVChatRoomSilently(),this._sdkReloadFlag=!1),this._ssoLog.setNetworkType(this.netMonitor.getNetworkType()).setText(o).setEnd()}}}]),e}();y_.prototype.readyList=["conversationController"],y_.prototype.initList=["exceptionController","connectionController","signController","contextController","messageController","comboMessageController","conversationController","userController","groupController","notificationController","eventStatController","sumStatController","messageLossController","statusController"];var __={login:"login",logout:"logout",destroy:"destroy",on:"on",off:"off",ready:"ready",setLogLevel:"setLogLevel",joinGroup:"joinGroup",quitGroup:"quitGroup",registerPlugin:"registerPlugin",getGroupOnlineMemberCount:"getGroupOnlineMemberCount"};function M_(e,t){return!(!e.isReady()&&void 0===__[t])||(e.innerEmitter.emit(Od,new zp({code:Wp.SDK_IS_NOT_READY,message:"".concat(t," ").concat(ah,"，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/module-EVENT.html#.SDK_READY")})),!1)}var I_={},C_={};return C_.create=function(e){if(e.SDKAppID&&I_[e.SDKAppID])return I_[e.SDKAppID];Ts.log("TIM.create");var t=new y_(e);t.on(Cn.SDK_DESTROY,(function(e){I_[e.data.SDKAppID]=null,delete I_[e.data.SDKAppID]}));var n=function(e){var t=Object.create(null);return Object.keys(wh).forEach((function(n){if(e[n]){var r=wh[n],o=new nr;t[r]=function(){var t=Array.from(arguments);return o.use((function(t,r){return M_(e,n)?r():og(new zp({code:Wp.SDK_IS_NOT_READY,message:"".concat(n," ").concat(ah,"。")}))})).use((function(e,t){if(!0===lu(e,Lh[n],r))return t()})).use((function(t,r){return e[n].apply(e,t)})),o.run(t)}}})),t}(t);return I_[e.SDKAppID]=n,Ts.log("TIM.create ok"),n},C_.TYPES=En,C_.EVENT=Cn,C_.VERSION="2.10.2",Ts.log("TIM.VERSION: ".concat(C_.VERSION)),C_}));


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tim_js_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50);
/* harmony import */ var tim_js_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tim_js_sdk__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cos_js_sdk_v5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);
/* harmony import */ var cos_js_sdk_v5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cos_js_sdk_v5__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(69);



var globalTim = tim_js_sdk__WEBPACK_IMPORTED_MODULE_0___default().create({
  SDKAppID: _constant__WEBPACK_IMPORTED_MODULE_2__.SDK_APP_ID
}); // 设置日志级别

globalTim.setLogLevel(1); // 注册 COS SDK 插件

globalTim.registerPlugin({
  "cos-js-sdk": (cos_js_sdk_v5__WEBPACK_IMPORTED_MODULE_1___default())
});
globalTim.on((tim_js_sdk__WEBPACK_IMPORTED_MODULE_0___default().EVENT.SDK_READY), onReadyStateUpdate); // 取消监听(防止多次监听的情况)

globalTim.off((tim_js_sdk__WEBPACK_IMPORTED_MODULE_0___default().EVENT.MESSAGE_RECEIVED), onReceiveMessage); // 收到新消息

globalTim.on((tim_js_sdk__WEBPACK_IMPORTED_MODULE_0___default().EVENT.MESSAGE_RECEIVED), onReceiveMessage);

function onReadyStateUpdate() {
  console.warn("sdk_ready");
}

function onReceiveMessage(event) {
  if (event) {
    var myEvent = new CustomEvent("timOnReceiveMessage", {
      detail: event.data
    });

    if (window.dispatchEvent) {
      window.dispatchEvent(myEvent);
    } else {
      window.fireEvent(myEvent);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (globalTim);

/***/ }),
/* 52 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var COS = __webpack_require__(53);
module.exports = COS;

/***/ }),
/* 53 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var util = __webpack_require__(54);
var event = __webpack_require__(62);
var task = __webpack_require__(63);
var base = __webpack_require__(65);
var advance = __webpack_require__(67);

var defaultOptions = {
    AppId: '', // AppId 已废弃，请拼接到 Bucket 后传入，例如：test-1250000000
    SecretId: '',
    SecretKey: '',
    XCosSecurityToken: '', // 使用临时密钥需要注意自行刷新 Token
    ChunkRetryTimes: 2,
    FileParallelLimit: 3,
    ChunkParallelLimit: 3,
    ChunkSize: 1024 * 1024,
    SliceSize: 1024 * 1024,
    CopyChunkParallelLimit: 20,
    CopyChunkSize: 1024 * 1024 * 10,
    CopySliceSize: 1024 * 1024 * 10,
    MaxPartNumber: 10000,
    ProgressInterval: 1000,
    UploadQueueSize: 10000,
    Domain: '',
    ServiceDomain: '',
    Protocol: '',
    CompatibilityMode: false,
    ForcePathStyle: false,
    UseRawKey: false,
    Timeout: 0, // 单位毫秒，0 代表不设置超时时间
    CorrectClockSkew: true,
    SystemClockOffset: 0, // 单位毫秒，ms
    UploadCheckContentMd5: false,
    UploadAddMetaMd5: false,
    UploadIdCacheLimit: 50,
};

// 对外暴露的类
var COS = function (options) {
    this.options = util.extend(util.clone(defaultOptions), options || {});
    this.options.FileParallelLimit = Math.max(1, this.options.FileParallelLimit);
    this.options.ChunkParallelLimit = Math.max(1, this.options.ChunkParallelLimit);
    this.options.ChunkRetryTimes = Math.max(0, this.options.ChunkRetryTimes);
    this.options.ChunkSize = Math.max(1024 * 1024, this.options.ChunkSize);
    this.options.CopyChunkParallelLimit = Math.max(1, this.options.CopyChunkParallelLimit);
    this.options.CopyChunkSize = Math.max(1024 * 1024, this.options.CopyChunkSize);
    this.options.CopySliceSize = Math.max(0, this.options.CopySliceSize);
    this.options.MaxPartNumber = Math.max(1024, Math.min(10000, this.options.MaxPartNumber));
    this.options.Timeout = Math.max(0, this.options.Timeout);
    if (this.options.AppId) {
        console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: "test-1250000000").');
    }
    event.init(this);
    task.init(this);
};

base.init(COS, task);
advance.init(COS, task);

COS.getAuthorization = util.getAuth;
COS.version = '0.5.27';

module.exports = COS;


/***/ }),
/* 54 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var md5 = __webpack_require__(55);
var CryptoJS = __webpack_require__(56);
var xml2json = __webpack_require__(57);
var json2xml = __webpack_require__(61);

function camSafeUrlEncode(str) {
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
}

//测试用的key后面可以去掉
var getAuth = function (opt) {
    opt = opt || {};

    var SecretId = opt.SecretId;
    var SecretKey = opt.SecretKey;
    var KeyTime = opt.KeyTime;
    var method = (opt.method || opt.Method || 'get').toLowerCase();
    var queryParams = clone(opt.Query || opt.params || {});
    var headers = clone(opt.Headers || opt.headers || {});

    var Key = opt.Key || '';
    var pathname;
    if (opt.UseRawKey) {
        pathname = opt.Pathname || opt.pathname || '/' + Key;
    } else {
        pathname = opt.Pathname || opt.pathname || Key;
        pathname.indexOf('/') !== 0 && (pathname = '/' + pathname);
    }

    if (!SecretId) return console.error('missing param SecretId');
    if (!SecretKey) return console.error('missing param SecretKey');

    var getObjectKeys = function (obj) {
        var list = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                list.push(key);
            }
        }
        return list.sort(function (a, b) {
            a = a.toLowerCase();
            b = b.toLowerCase();
            return a === b ? 0 : (a > b ? 1 : -1);
        });
    };

    var obj2str = function (obj) {
        var i, key, val;
        var list = [];
        var keyList = getObjectKeys(obj);
        for (i = 0; i < keyList.length; i++) {
            key = keyList[i];
            val = (obj[key] === undefined || obj[key] === null) ? '' : ('' + obj[key]);
            key = key.toLowerCase();
            key = camSafeUrlEncode(key);
            val = camSafeUrlEncode(val) || '';
            list.push(key + '=' + val)
        }
        return list.join('&');
    };

    // 签名有效起止时间
    var now = Math.round(getSkewTime(opt.SystemClockOffset) / 1000) - 1;
    var exp = now;

    var Expires = opt.Expires || opt.expires;
    if (Expires === undefined) {
        exp += 900; // 签名过期时间为当前 + 900s
    } else {
        exp += (Expires * 1) || 0;
    }

    // 要用到的 Authorization 参数列表
    var qSignAlgorithm = 'sha1';
    var qAk = SecretId;
    var qSignTime = KeyTime || now + ';' + exp;
    var qKeyTime = KeyTime || now + ';' + exp;
    var qHeaderList = getObjectKeys(headers).join(';').toLowerCase();
    var qUrlParamList = getObjectKeys(queryParams).join(';').toLowerCase();

    // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
    // 步骤一：计算 SignKey
    var signKey = CryptoJS.HmacSHA1(qKeyTime, SecretKey).toString();

    // 步骤二：构成 FormatString
    var formatString = [method, pathname, obj2str(queryParams), obj2str(headers), ''].join('\n');

    // 步骤三：计算 StringToSign
    var stringToSign = ['sha1', qSignTime, CryptoJS.SHA1(formatString).toString(), ''].join('\n');

    // 步骤四：计算 Signature
    var qSignature = CryptoJS.HmacSHA1(stringToSign, signKey).toString();

    // 步骤五：构造 Authorization
    var authorization = [
        'q-sign-algorithm=' + qSignAlgorithm,
        'q-ak=' + qAk,
        'q-sign-time=' + qSignTime,
        'q-key-time=' + qKeyTime,
        'q-header-list=' + qHeaderList,
        'q-url-param-list=' + qUrlParamList,
        'q-signature=' + qSignature
    ].join('&');

    return authorization;

};

var noop = function () {

};

// 清除对象里值为的 undefined 或 null 的属性
var clearKey = function (obj) {
    var retObj = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null) {
            retObj[key] = obj[key];
        }
    }
    return retObj;
};

var readAsBinaryString = function (blob, callback) {
    var readFun;
    var fr = new FileReader();
    if (FileReader.prototype.readAsBinaryString) {
        readFun = FileReader.prototype.readAsBinaryString;
        fr.onload = function () {
            callback(this.result);
        };
    } else if (FileReader.prototype.readAsArrayBuffer) { // 在 ie11 添加 readAsBinaryString 兼容
        readFun = function (fileData) {
            var binary = "";
            var pt = this;
            var reader = new FileReader();
            reader.onload = function (e) {
                var bytes = new Uint8Array(reader.result);
                var length = bytes.byteLength;
                for (var i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                callback(binary);
            };
            reader.readAsArrayBuffer(fileData);
        };
    } else {
        console.error('FileReader not support readAsBinaryString');
    }
    readFun.call(fr, blob);
};

var fileSliceNeedCopy = (function () {
    var compareVersion = function(a, b) {
        a = a.split('.');
        b = b.split('.');
        for (var i = 0; i < b.length; i++) {
            if (a[i] !== b[i]) {
                return parseInt(a[i]) > parseInt(b[i]) ? 1 : -1;
            }
        }
        return 0;
    };
    var check = function (ua) {
        var ChromeVersion = (ua.match(/Chrome\/([.\d]+)/) || [])[1];
        var QBCoreVersion = (ua.match(/QBCore\/([.\d]+)/) || [])[1];
        var QQBrowserVersion = (ua.match(/QQBrowser\/([.\d]+)/) || [])[1];
        var need = ChromeVersion && compareVersion(ChromeVersion, '53.0.2785.116') < 0
            && QBCoreVersion && compareVersion(QBCoreVersion, '3.53.991.400') < 0
            && QQBrowserVersion && compareVersion(QQBrowserVersion, '9.0.2524.400') <= 0 || false;
        return need;
    };
    return check(navigator && navigator.userAgent);
})();

// 获取文件分片
var fileSlice = function (file, start, end, isUseToUpload, callback) {
    var blob;
    if (file.slice) {
        blob = file.slice(start, end);
    } else if (file.mozSlice) {
        blob = file.mozSlice(start, end);
    } else if (file.webkitSlice) {
        blob = file.webkitSlice(start, end);
    }
    if (isUseToUpload && fileSliceNeedCopy) {
        var reader = new FileReader();
        reader.onload = function (e) {
            blob = null;
            callback(new Blob([reader.result]));
        };
        reader.readAsArrayBuffer(blob);
    } else {
        callback(blob);
    }
};

// 获取文件内容的 MD5
var getBodyMd5 = function (UploadCheckContentMd5, Body, callback, onProgress) {
    callback = callback || noop;
    if (UploadCheckContentMd5) {
        if (typeof Body === 'string') {
            callback(util.md5(Body, true));
        } else if (Blob && Body instanceof Blob) {
            util.getFileMd5(Body, function (err, md5) {
                callback(md5);
            }, onProgress);
        } else {
            callback();
        }
    } else {
        callback();
    }
};

// 获取文件 md5 值
var md5ChunkSize = 1024 * 1024;
var getFileMd5 = function (blob, callback, onProgress) {
    var size = blob.size;
    var loaded = 0;
    var md5ctx = md5.getCtx();
    var next = function (start) {
        if (start >= size) {
            var hash = md5ctx.digest('hex');
            callback(null, hash);
            return;
        }
        var end = Math.min(size, start + md5ChunkSize);
        util.fileSlice(blob, start, end, false, function (chunk) {
            readAsBinaryString(chunk, function (content) {
                chunk = null;
                md5ctx = md5ctx.update(content, true);
                loaded += content.length;
                content = null;
                if (onProgress) onProgress({loaded: loaded, total: size, percent: Math.round(loaded / size * 10000) / 10000});
                next(start + md5ChunkSize);
            });
        });
    };
    next(0);
};

function clone(obj) {
    return map(obj, function (v) {
        return typeof v === 'object' ? clone(v) : v;
    });
}

function extend(target, source) {
    each(source, function (val, key) {
        target[key] = source[key];
    });
    return target;
}

function isArray(arr) {
    return arr instanceof Array;
}

function isInArray(arr, item) {
    var flag = false;
    for (var i = 0; i < arr.length; i++) {
        if (item === arr[i]) {
            flag = true;
            break;
        }
    }
    return flag;
}

function makeArray(arr) {
    return isArray(arr) ? arr : [arr];
}

function each(obj, fn) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            fn(obj[i], i);
        }
    }
}

function map(obj, fn) {
    var o = isArray(obj) ? [] : {};
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            o[i] = fn(obj[i], i);
        }
    }
    return o;
}

function filter(obj, fn) {
    var iaArr = isArray(obj);
    var o = iaArr ? [] : {};
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (fn(obj[i], i)) {
                if (iaArr) {
                    o.push(obj[i]);
                } else {
                    o[i] = obj[i];
                }
            }
        }
    }
    return o;
}

var binaryBase64 = function (str) {
    var i, len, char, res = '';
    for (i = 0, len = str.length / 2; i < len; i++) {
        char = parseInt(str[i * 2] + str[i * 2 + 1], 16);
        res += String.fromCharCode(char);
    }
    return btoa(res);
};
var uuid = function () {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

var hasMissingParams = function (apiName, params) {
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    if (apiName.indexOf('Bucket') > -1 || apiName === 'deleteMultipleObject' || apiName === 'multipartList' || apiName === 'listObjectVersions') {
        if (!Bucket) return 'Bucket';
        if (!Region) return 'Region';
    } else if (apiName.indexOf('Object') > -1 || apiName.indexOf('multipart') > -1 || apiName === 'sliceUploadFile' || apiName === 'abortUploadTask') {
        if (!Bucket) return 'Bucket';
        if (!Region) return 'Region';
        if (!Key) return 'Key';
    }
    return false;
};

var formatParams = function (apiName, params) {

    // 复制参数对象
    params = extend({}, params);

    // 统一处理 Headers
    if (apiName !== 'getAuth' && apiName !== 'getV4Auth' && apiName !== 'getObjectUrl') {
        var Headers = params.Headers || {};
        if (params && typeof params === 'object') {
            (function () {
                for (var key in params) {
                    if (params.hasOwnProperty(key) && key.indexOf('x-cos-') > -1) {
                        Headers[key] = params[key];
                    }
                }
            })();

            var headerMap = {
                // params headers
                'x-cos-mfa': 'MFA',
                'Content-MD5': 'ContentMD5',
                'Content-Length': 'ContentLength',
                'Content-Type': 'ContentType',
                'Expect': 'Expect',
                'Expires': 'Expires',
                'Cache-Control': 'CacheControl',
                'Content-Disposition': 'ContentDisposition',
                'Content-Encoding': 'ContentEncoding',
                'Range': 'Range',
                'If-Modified-Since': 'IfModifiedSince',
                'If-Unmodified-Since': 'IfUnmodifiedSince',
                'If-Match': 'IfMatch',
                'If-None-Match': 'IfNoneMatch',
                'x-cos-copy-source': 'CopySource',
                'x-cos-copy-source-Range': 'CopySourceRange',
                'x-cos-metadata-directive': 'MetadataDirective',
                'x-cos-copy-source-If-Modified-Since': 'CopySourceIfModifiedSince',
                'x-cos-copy-source-If-Unmodified-Since': 'CopySourceIfUnmodifiedSince',
                'x-cos-copy-source-If-Match': 'CopySourceIfMatch',
                'x-cos-copy-source-If-None-Match': 'CopySourceIfNoneMatch',
                'x-cos-acl': 'ACL',
                'x-cos-grant-read': 'GrantRead',
                'x-cos-grant-write': 'GrantWrite',
                'x-cos-grant-full-control': 'GrantFullControl',
                'x-cos-grant-read-acp': 'GrantReadAcp',
                'x-cos-grant-write-acp': 'GrantWriteAcp',
                'x-cos-storage-class': 'StorageClass',
                // SSE-C
                'x-cos-server-side-encryption-customer-algorithm': 'SSECustomerAlgorithm',
                'x-cos-server-side-encryption-customer-key': 'SSECustomerKey',
                'x-cos-server-side-encryption-customer-key-MD5': 'SSECustomerKeyMD5',
                // SSE-COS、SSE-KMS
                'x-cos-server-side-encryption': 'ServerSideEncryption',
                'x-cos-server-side-encryption-cos-kms-key-id': 'SSEKMSKeyId',
                'x-cos-server-side-encryption-context': 'SSEContext',
            };
            util.each(headerMap, function (paramKey, headerKey) {
                if (params[paramKey] !== undefined) {
                    Headers[headerKey] = params[paramKey];
                }
            });

            params.Headers = clearKey(Headers);
        }
    }

    return params;
};

var apiWrapper = function (apiName, apiFn) {
    return function (params, callback) {

        // 处理参数
        if (typeof params === 'function') {
            callback = params;
            params = {};
        }

        // 整理参数格式
        params = formatParams(apiName, params);

        // 代理回调函数
        var formatResult = function (result) {
            if (result && result.headers) {
                result.headers['x-cos-version-id'] && (result.VersionId = result.headers['x-cos-version-id']);
                result.headers['x-cos-delete-marker'] && (result.DeleteMarker = result.headers['x-cos-delete-marker']);
            }
            return result;
        };
        var _callback = function (err, data) {
            callback && callback(formatResult(err), formatResult(data));
        };

        if (apiName !== 'getService' && apiName !== 'abortUploadTask') {
            // 判断参数是否完整
            var missingResult;
            if (missingResult = hasMissingParams(apiName, params)) {
                _callback({error: 'missing param ' + missingResult});
                return;
            }
            // 判断 region 格式
            if (params.Region) {
                if (params.Region.indexOf('cos.') > -1) {
                    _callback({error: 'param Region should not be start with "cos."'});
                    return;
                } else if (!/^([a-z\d-]+)$/.test(params.Region)) {
                    _callback({error: 'Region format error.'});
                    return;
                }
                // 判断 region 格式
                if (!this.options.CompatibilityMode && params.Region.indexOf('-') === -1 && params.Region !== 'yfb' && params.Region !== 'default') {
                    console.warn('warning: param Region format error, find help here: https://cloud.tencent.com/document/product/436/6224');
                }
            }
            // 兼容不带 AppId 的 Bucket
            if (params.Bucket) {
                if (!/^([a-z\d-]+)-(\d+)$/.test(params.Bucket)) {
                    if (params.AppId) {
                        params.Bucket = params.Bucket + '-' + params.AppId;
                    } else if (this.options.AppId) {
                        params.Bucket = params.Bucket + '-' + this.options.AppId;
                    } else {
                        _callback({error: 'Bucket should format as "test-1250000000".'});
                        return;
                    }
                }
                if (params.AppId) {
                    console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g Bucket:"test-1250000000" ).');
                    delete params.AppId;
                }
            }
            // 如果 Key 是 / 开头，强制去掉第一个 /
            if (!this.options.UseRawKey && params.Key && params.Key.substr(0, 1) === '/') {
                params.Key = params.Key.substr(1);
            }
        }
        var res = apiFn.call(this, params, _callback);
        if (apiName === 'getAuth' || apiName === 'getObjectUrl') {
            return res;
        }
    }
};

var throttleOnProgress = function (total, onProgress) {
    var self = this;
    var size0 = 0;
    var size1 = 0;
    var time0 = Date.now();
    var time1;
    var timer;

    function update() {
        timer = 0;
        if (onProgress && (typeof onProgress === 'function')) {
            time1 = Date.now();
            var speed = Math.max(0, Math.round((size1 - size0) / ((time1 - time0) / 1000) * 100) / 100);
            var percent;
            if (size1 === 0 && total === 0) {
                percent = 1;
            } else {
                percent = Math.round(size1 / total * 100) / 100 || 0;
            }
            time0 = time1;
            size0 = size1;
            try {
                onProgress({loaded: size1, total: total, speed: speed, percent: percent});
            } catch (e) {
            }
        }
    }

    return function (info, immediately) {
        if (info) {
            size1 = info.loaded;
            total = info.total;
        }
        if (immediately) {
            clearTimeout(timer);
            update();
        } else {
            if (timer) return;
            timer = setTimeout(update, self.options.ProgressInterval);
        }
    };
};

var getFileSize = function (api, params, callback) {
    var size;
    if (typeof params.Body === 'string') {
        params.Body = new Blob([params.Body], {type: 'text/plain'});
    }
    if ((params.Body && (params.Body instanceof Blob || params.Body.toString() === '[object File]' || params.Body.toString() === '[object Blob]'))) {
        size = params.Body.size;
    } else {
        callback({error: 'params body format error, Only allow File|Blob|String.'});
        return;
    }
    params.ContentLength = size;
    callback(null, size);
};

// 获取调正的时间戳
var getSkewTime = function (offset) {
    return Date.now() + (offset || 0);
};

var util = {
    noop: noop,
    formatParams: formatParams,
    apiWrapper: apiWrapper,
    xml2json: xml2json,
    json2xml: json2xml,
    md5: md5,
    clearKey: clearKey,
    fileSlice: fileSlice,
    getBodyMd5: getBodyMd5,
    getFileMd5: getFileMd5,
    binaryBase64: binaryBase64,
    extend: extend,
    isArray: isArray,
    isInArray: isInArray,
    makeArray: makeArray,
    each: each,
    map: map,
    filter: filter,
    clone: clone,
    uuid: uuid,
    camSafeUrlEncode: camSafeUrlEncode,
    throttleOnProgress: throttleOnProgress,
    getFileSize: getFileSize,
    getSkewTime: getSkewTime,
    getAuth: getAuth,
    isBrowser: true,
};

module.exports = util;


/***/ }),
/* 55 */
/***/ ((module) => {

/**
 * http://www.myersdaily.org/joseph/javascript/md5-text.html
 * http://pajhome.org.uk/crypt/md5
 * https://github.com/wbond/md5-js
 */
function md5cycle(x, k) {
    var a = x[0], b = x[1], c = x[2], d = x[3];

    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);

    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);

    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);

    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);

    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
}

function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md5blk(s) { /* I figured global was faster.   */
    var md5blks = [], i; /* Andy King said do it this way. */
    for (i = 0; i < 64; i += 4) {
        md5blks[i >> 2] = s.charCodeAt(i) +
            (s.charCodeAt(i + 1) << 8) +
            (s.charCodeAt(i + 2) << 16) +
            (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n) {
    var s = '', j = 0;
    for (; j < 4; j++)
        s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] +
            hex_chr[(n >> (j * 8)) & 0x0F];
    return s;
}

function hex(x) {
    for (var i = 0; i < x.length; i++)
        x[i] = rhex(x[i]);
    return x.join('');
}

var add32 = function (a, b) {
    return (a + b) & 0xFFFFFFFF;
}

function getCtx() {
    var ctx = {};
    ctx.state = [1732584193, -271733879, -1732584194, 271733878];
    ctx.tail = '';
    ctx.size = 0;
    ctx.update = function (s, isBinStr) {
        if (!isBinStr) s = unescape(encodeURIComponent(s));
        ctx.size += s.length;
        s = ctx.tail + s;
        var i, state = ctx.state;
        for (i = 64; i <= s.length; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        ctx.tail = s.substring(i - 64);
        return ctx;
    };
    ctx.digest = function (encode) {
        var i,
            n = ctx.size,
            state = ctx.state,
            s = ctx.tail,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < s.length; i++)
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i++) tail[i] = 0;
        }
        tail[14] = n * 8;
        md5cycle(state, tail);
        return hex(state);
    };
    return ctx;
}

var md5 = function (s, isBinStr) {
    return getCtx().update(s, isBinStr).digest('hex');
}

if (md5('hello') !== '5d41402abc4b2a76b9719d911017c592') {
    add32 = function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
}

md5.getCtx = getCtx;
module.exports = md5;


/***/ }),
/* 56 */
/***/ ((module) => {

/*
 CryptoJS v3.1.2
 code.google.com/p/crypto-js
 (c) 2009-2013 by Jeff Mott. All rights reserved.
 code.google.com/p/crypto-js/wiki/License
 */
var CryptoJS=CryptoJS||function(g,l){var e={},d=e.lib={},m=function(){},k=d.Base={extend:function(a){m.prototype=this;var c=new m;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
        p=d.WordArray=k.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=l?c:4*a.length},toString:function(a){return(a||n).stringify(this)},concat:function(a){var c=this.words,q=a.words,f=this.sigBytes;a=a.sigBytes;this.clamp();if(f%4)for(var b=0;b<a;b++)c[f+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((f+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[f+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
            32-8*(c%4);a.length=g.ceil(c/4)},clone:function(){var a=k.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*g.random()|0);return new p.init(c,a)}}),b=e.enc={},n=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],f=0;f<a;f++){var d=c[f>>>2]>>>24-8*(f%4)&255;b.push((d>>>4).toString(16));b.push((d&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],f=0;f<c;f+=2)b[f>>>3]|=parseInt(a.substr(f,
                2),16)<<24-4*(f%8);return new p.init(b,c/2)}},j=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],f=0;f<a;f++)b.push(String.fromCharCode(c[f>>>2]>>>24-8*(f%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],f=0;f<c;f++)b[f>>>2]|=(a.charCodeAt(f)&255)<<24-8*(f%4);return new p.init(b,c)}},h=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(j.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return j.parse(unescape(encodeURIComponent(a)))}},
        r=d.BufferedBlockAlgorithm=k.extend({reset:function(){this._data=new p.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=h.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,f=c.sigBytes,d=this.blockSize,e=f/(4*d),e=a?g.ceil(e):g.max((e|0)-this._minBufferSize,0);a=e*d;f=g.min(4*a,f);if(a){for(var k=0;k<a;k+=d)this._doProcessBlock(b,k);k=b.splice(0,a);c.sigBytes-=f}return new p.init(k,f)},clone:function(){var a=k.clone.call(this);
            a._data=this._data.clone();return a},_minBufferSize:0});d.Hasher=r.extend({cfg:k.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){r.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,d){return(new a.init(d)).finalize(b)}},_createHmacHelper:function(a){return function(b,d){return(new s.HMAC.init(a,
        d)).finalize(b)}}});var s=e.algo={};return e}(Math);
(function(){var g=CryptoJS,l=g.lib,e=l.WordArray,d=l.Hasher,m=[],l=g.algo.SHA1=d.extend({_doReset:function(){this._hash=new e.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(d,e){for(var b=this._hash.words,n=b[0],j=b[1],h=b[2],g=b[3],l=b[4],a=0;80>a;a++){if(16>a)m[a]=d[e+a]|0;else{var c=m[a-3]^m[a-8]^m[a-14]^m[a-16];m[a]=c<<1|c>>>31}c=(n<<5|n>>>27)+l+m[a];c=20>a?c+((j&h|~j&g)+1518500249):40>a?c+((j^h^g)+1859775393):60>a?c+((j&h|j&g|h&g)-1894007588):c+((j^h^
g)-899497514);l=g;g=h;h=j<<30|j>>>2;j=n;n=c}b[0]=b[0]+n|0;b[1]=b[1]+j|0;b[2]=b[2]+h|0;b[3]=b[3]+g|0;b[4]=b[4]+l|0},_doFinalize:function(){var d=this._data,e=d.words,b=8*this._nDataBytes,g=8*d.sigBytes;e[g>>>5]|=128<<24-g%32;e[(g+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(g+64>>>9<<4)+15]=b;d.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=d.clone.call(this);e._hash=this._hash.clone();return e}});g.SHA1=d._createHelper(l);g.HmacSHA1=d._createHmacHelper(l)})();
(function(){var g=CryptoJS,l=g.enc.Utf8;g.algo.HMAC=g.lib.Base.extend({init:function(e,d){e=this._hasher=new e.init;"string"==typeof d&&(d=l.parse(d));var g=e.blockSize,k=4*g;d.sigBytes>k&&(d=e.finalize(d));d.clamp();for(var p=this._oKey=d.clone(),b=this._iKey=d.clone(),n=p.words,j=b.words,h=0;h<g;h++)n[h]^=1549556828,j[h]^=909522486;p.sigBytes=b.sigBytes=k;this.reset()},reset:function(){var e=this._hasher;e.reset();e.update(this._iKey)},update:function(e){this._hasher.update(e);return this},finalize:function(e){var d=
    this._hasher;e=d.finalize(e);d.reset();return d.finalize(this._oKey.clone().concat(e))}})})();


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * Base64 encoding strategy.
     */
    var Base64 = C_enc.Base64 = {
        /**
         * Converts a word array to a Base64 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Base64 string.
         *
         * @static
         *
         * @example
         *
         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
         */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;

            // Clamp excess bits
            wordArray.clamp();

            // Convert
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
                }
            }

            // Add padding
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                while (base64Chars.length % 4) {
                    base64Chars.push(paddingChar);
                }
            }

            return base64Chars.join('');
        },

        /**
         * Converts a Base64 string to a word array.
         *
         * @param {string} base64Str The Base64 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
         */
        parse: function (base64Str) {
            // Shortcuts
            var base64StrLength = base64Str.length;
            var map = this._map;

            // Ignore padding
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex != -1) {
                    base64StrLength = paddingIndex;
                }
            }

            // Convert
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
                if (i % 4) {
                    var bits1 = map.indexOf(base64Str.charAt(i - 1)) << ((i % 4) * 2);
                    var bits2 = map.indexOf(base64Str.charAt(i)) >>> (6 - (i % 4) * 2);
                    words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
                    nBytes++;
                }
            }

            return WordArray.create(words, nBytes);
        },

        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    };
}());

if(true){
    module.exports = CryptoJS;
}else{}


/***/ }),
/* 57 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright 2015 William Summers, MetaTribal LLC
 * adapted from https://developer.mozilla.org/en-US/docs/JXON
 *
 * Licensed under the MIT License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author William Summers
 * https://github.com/metatribal/xmlToJSON
 */
var DOMParser = __webpack_require__(58).DOMParser;

var xmlToJSON = (function () {

    this.version = "1.3.5";

    var options = { // set up the default options
        mergeCDATA: true, // extract cdata and merge with text
        normalize: true, // collapse multiple spaces to single space
        stripElemPrefix: true, // for elements of same name in diff namespaces, you can enable namespaces and access the nskey property
    };

    var prefixMatch = new RegExp(/(?!xmlns)^.*:/);
    var trimMatch = new RegExp(/^\s+|\s+$/g);

    this.grokType = function (sValue) {
        if (/^\s*$/.test(sValue)) {
            return null;
        }
        if (/^(?:true|false)$/i.test(sValue)) {
            return sValue.toLowerCase() === "true";
        }
        if (isFinite(sValue)) {
            return parseFloat(sValue);
        }
        return sValue;
    };

    this.parseString = function (xmlString, opt) {
        if (xmlString) {
            var xml = this.stringToXML(xmlString);
            if (xml.getElementsByTagName('parsererror').length) {
                return null;
            } else {
                return this.parseXML(xml, opt);
            }
        } else {
            return null;
        }
    };

    this.parseXML = function (oXMLParent, opt) {

        // initialize options
        for (var key in opt) {
            options[key] = opt[key];
        }

        var vResult = {},
            nLength = 0,
            sCollectedTxt = "";

        // iterate over the children
        var childNum = oXMLParent.childNodes.length;
        if (childNum) {
            for (var oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
                oNode = oXMLParent.childNodes.item(nItem);

                if (oNode.nodeType === 4) {
                    if (options.mergeCDATA) {
                        sCollectedTxt += oNode.nodeValue;
                    }
                } /* nodeType is "CDATASection" (4) */
                else if (oNode.nodeType === 3) {
                    sCollectedTxt += oNode.nodeValue;
                } /* nodeType is "Text" (3) */
                else if (oNode.nodeType === 1) { /* nodeType is "Element" (1) */

                    if (nLength === 0) {
                        vResult = {};
                    }

                    // using nodeName to support browser (IE) implementation with no 'localName' property
                    if (options.stripElemPrefix) {
                        sProp = oNode.nodeName.replace(prefixMatch, '');
                    } else {
                        sProp = oNode.nodeName;
                    }

                    vContent = xmlToJSON.parseXML(oNode);

                    if (vResult.hasOwnProperty(sProp)) {
                        if (vResult[sProp].constructor !== Array) {
                            vResult[sProp] = [vResult[sProp]];
                        }
                        vResult[sProp].push(vContent);

                    } else {
                        vResult[sProp] = vContent;
                        nLength++;
                    }
                }
            }
        }

        if (!Object.keys(vResult).length) {
            // vResult = sCollectedTxt.replace(trimMatch, '') || ''; // by carsonxu 修复 getBucket返回的 Key 是 " /" 这种场景
            vResult = sCollectedTxt || '';
        }

        return vResult;
    };

    // Convert xmlDocument to a string
    // Returns null on failure
    this.xmlToString = function (xmlDoc) {
        try {
            var xmlString = xmlDoc.xml ? xmlDoc.xml : (new XMLSerializer()).serializeToString(xmlDoc);
            return xmlString;
        } catch (err) {
            return null;
        }
    };

    // Convert a string to XML Node Structure
    // Returns null on failure
    this.stringToXML = function (xmlString) {
        try {
            var xmlDoc = null;

            if (window.DOMParser) {

                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(xmlString, "text/xml");

                return xmlDoc;
            } else {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlString);

                return xmlDoc;
            }
        } catch (e) {
            return null;
        }
    };

    return this;

}).call({});

var xml2json = function (xmlString) {
    return xmlToJSON.parseString(xmlString);
};

module.exports = xml2json;


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

function DOMParser(options){
	this.options = options ||{locator:{}};
	
}
DOMParser.prototype.parseFromString = function(source,mimeType){
	var options = this.options;
	var sax =  new XMLReader();
	var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
	var errorHandler = options.errorHandler;
	var locator = options.locator;
	var defaultNSMap = options.xmlns||{};
	var entityMap = {'lt':'<','gt':'>','amp':'&','quot':'"','apos':"'"}
	if(locator){
		domBuilder.setDocumentLocator(locator)
	}
	
	sax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if(/\/x?html?$/.test(mimeType)){
		entityMap.nbsp = '\xa0';
		entityMap.copy = '\xa9';
		defaultNSMap['']= 'http://www.w3.org/1999/xhtml';
	}
	defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
	if(source){
		sax.parse(source,defaultNSMap,entityMap);
	}else{
		sax.errorHandler.error("invalid doc source");
	}
	return domBuilder.doc;
}
function buildErrorHandler(errorImpl,domBuilder,locator){
	if(!errorImpl){
		if(domBuilder instanceof DOMHandler){
			return domBuilder;
		}
		errorImpl = domBuilder ;
	}
	var errorHandler = {}
	var isCallback = errorImpl instanceof Function;
	locator = locator||{}
	function build(key){
		var fn = errorImpl[key];
		if(!fn && isCallback){
			fn = errorImpl.length == 2?function(msg){errorImpl(key,msg)}:errorImpl;
		}
		errorHandler[key] = fn && function(msg){
			fn('[xmldom '+key+']\t'+msg+_locator(locator));
		}||function(){};
	}
	build('warning');
	build('error');
	build('fatalError');
	return errorHandler;
}

//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler 
 * 
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
    this.cdata = false;
}
function position(locator,node){
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */ 
DOMHandler.prototype = {
	startDocument : function() {
    	this.doc = new DOMImplementation().createDocument(null, null, null);
    	if (this.locator) {
        	this.doc.documentURI = this.locator.systemId;
    	}
	},
	startElement:function(namespaceURI, localName, qName, attrs) {
		var doc = this.doc;
	    var el = doc.createElementNS(namespaceURI, qName||localName);
	    var len = attrs.length;
	    appendElement(this, el);
	    this.currentElement = el;
	    
		this.locator && position(this.locator,el)
	    for (var i = 0 ; i < len; i++) {
	        var namespaceURI = attrs.getURI(i);
	        var value = attrs.getValue(i);
	        var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			this.locator &&position(attrs.getLocator(i),attr);
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr)
	    }
	},
	endElement:function(namespaceURI, localName, qName) {
		var current = this.currentElement
		var tagName = current.tagName;
		this.currentElement = current.parentNode;
	},
	startPrefixMapping:function(prefix, uri) {
	},
	endPrefixMapping:function(prefix) {
	},
	processingInstruction:function(target, data) {
	    var ins = this.doc.createProcessingInstruction(target, data);
	    this.locator && position(this.locator,ins)
	    appendElement(this, ins);
	},
	ignorableWhitespace:function(ch, start, length) {
	},
	characters:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
		//console.log(chars)
		if(chars){
			if (this.cdata) {
				var charNode = this.doc.createCDATASection(chars);
			} else {
				var charNode = this.doc.createTextNode(chars);
			}
			if(this.currentElement){
				this.currentElement.appendChild(charNode);
			}else if(/^\s*$/.test(chars)){
				this.doc.appendChild(charNode);
				//process xml
			}
			this.locator && position(this.locator,charNode)
		}
	},
	skippedEntity:function(name) {
	},
	endDocument:function() {
		this.doc.normalize();
	},
	setDocumentLocator:function (locator) {
	    if(this.locator = locator){// && !('lineNumber' in locator)){
	    	locator.lineNumber = 0;
	    }
	},
	//LexicalHandler
	comment:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
	    var comm = this.doc.createComment(chars);
	    this.locator && position(this.locator,comm)
	    appendElement(this, comm);
	},
	
	startCDATA:function() {
	    //used in characters() methods
	    this.cdata = true;
	},
	endCDATA:function() {
	    this.cdata = false;
	},
	
	startDTD:function(name, publicId, systemId) {
		var impl = this.doc.implementation;
	    if (impl && impl.createDocumentType) {
	        var dt = impl.createDocumentType(name, publicId, systemId);
	        this.locator && position(this.locator,dt)
	        appendElement(this, dt);
	    }
	},
	/**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
	warning:function(error) {
		console.warn('[xmldom warning]\t'+error,_locator(this.locator));
	},
	error:function(error) {
		console.error('[xmldom error]\t'+error,_locator(this.locator));
	},
	fatalError:function(error) {
		console.error('[xmldom fatalError]\t'+error,_locator(this.locator));
	    throw error;
	}
}
function _locator(l){
	if(l){
		return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
	}
}
function _toString(chars,start,length){
	if(typeof chars == 'string'){
		return chars.substr(start,length)
	}else{//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if(chars.length >= start+length || start){
			return new java.lang.String(chars,start,length)+'';
		}
		return chars;
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
	DOMHandler.prototype[key] = function(){return null}
})

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander,node) {
    if (!hander.currentElement) {
        hander.doc.appendChild(node);
    } else {
        hander.currentElement.appendChild(node);
    }
}//appendChild and setAttributeNS are preformance key

//if(typeof require == 'function'){
	var XMLReader = __webpack_require__(59).XMLReader;
	var DOMImplementation = exports.DOMImplementation = __webpack_require__(60).DOMImplementation;
	exports.XMLSerializer = __webpack_require__(60).XMLSerializer ;
	exports.DOMParser = DOMParser;
//}


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports) => {

//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]///\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9"+nameStartChar.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
var tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\:'+nameStartChar.source+nameChar.source+'*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
var S_TAG = 0;//tag name offerring
var S_ATTR = 1;//attr name offerring 
var S_ATTR_SPACE=2;//attr name end and space offer
var S_EQ = 3;//=space?
var S_ATTR_NOQUOT_VALUE = 4;//attr value(no quot value only)
var S_ATTR_END = 5;//attr value end and no space(quot end)
var S_TAG_SPACE = 6;//(attr value end || tag end ) && (space offer)
var S_TAG_CLOSE = 7;//closed el<el />

function XMLReader(){
	
}

XMLReader.prototype = {
	parse:function(source,defaultNSMap,entityMap){
		var domBuilder = this.domBuilder;
		domBuilder.startDocument();
		_copy(defaultNSMap ,defaultNSMap = {})
		parse(source,defaultNSMap,entityMap,
				domBuilder,this.errorHandler);
		domBuilder.endDocument();
	}
}
function parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){
	function fixedFromCharCode(code) {
		// String.prototype.fromCharCode does not supports
		// > 2 bytes unicode chars directly
		if (code > 0xffff) {
			code -= 0x10000;
			var surrogate1 = 0xd800 + (code >> 10)
				, surrogate2 = 0xdc00 + (code & 0x3ff);

			return String.fromCharCode(surrogate1, surrogate2);
		} else {
			return String.fromCharCode(code);
		}
	}
	function entityReplacer(a){
		var k = a.slice(1,-1);
		if(k in entityMap){
			return entityMap[k]; 
		}else if(k.charAt(0) === '#'){
			return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
		}else{
			errorHandler.error('entity not found:'+a);
			return a;
		}
	}
	function appendText(end){//has some bugs
		if(end>start){
			var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
			locator&&position(start);
			domBuilder.characters(xt,0,end-start);
			start = end
		}
	}
	function position(p,m){
		while(p>=lineEnd && (m = linePattern.exec(source))){
			lineStart = m.index;
			lineEnd = lineStart + m[0].length;
			locator.lineNumber++;
			//console.log('line++:',locator,startPos,endPos)
		}
		locator.columnNumber = p-lineStart+1;
	}
	var lineStart = 0;
	var lineEnd = 0;
	var linePattern = /.*(?:\r\n?|\n)|.*$/g
	var locator = domBuilder.locator;
	
	var parseStack = [{currentNSMap:defaultNSMapCopy}]
	var closeMap = {};
	var start = 0;
	while(true){
		try{
			var tagStart = source.indexOf('<',start);
			if(tagStart<0){
				if(!source.substr(start).match(/^\s*$/)){
					var doc = domBuilder.doc;
	    			var text = doc.createTextNode(source.substr(start));
	    			doc.appendChild(text);
	    			domBuilder.currentElement = text;
				}
				return;
			}
			if(tagStart>start){
				appendText(tagStart);
			}
			switch(source.charAt(tagStart+1)){
			case '/':
				var end = source.indexOf('>',tagStart+3);
				var tagName = source.substring(tagStart+2,end);
				var config = parseStack.pop();
				if(end<0){
					
	        		tagName = source.substring(tagStart+2).replace(/[\s<].*/,'');
	        		//console.error('#@@@@@@'+tagName)
	        		errorHandler.error("end tag name: "+tagName+' is not complete:'+config.tagName);
	        		end = tagStart+1+tagName.length;
	        	}else if(tagName.match(/\s</)){
	        		tagName = tagName.replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' maybe not complete');
	        		end = tagStart+1+tagName.length;
				}
				//console.error(parseStack.length,parseStack)
				//console.error(config);
				var localNSMap = config.localNSMap;
				var endMatch = config.tagName == tagName;
				var endIgnoreCaseMach = endMatch || config.tagName&&config.tagName.toLowerCase() == tagName.toLowerCase()
		        if(endIgnoreCaseMach){
		        	domBuilder.endElement(config.uri,config.localName,tagName);
					if(localNSMap){
						for(var prefix in localNSMap){
							domBuilder.endPrefixMapping(prefix) ;
						}
					}
					if(!endMatch){
		            	errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName );
					}
		        }else{
		        	parseStack.push(config)
		        }
				
				end++;
				break;
				// end elment
			case '?':// <?...?>
				locator&&position(tagStart);
				end = parseInstruction(source,tagStart,domBuilder);
				break;
			case '!':// <!doctype,<![CDATA,<!--
				locator&&position(tagStart);
				end = parseDCC(source,tagStart,domBuilder,errorHandler);
				break;
			default:
				locator&&position(tagStart);
				var el = new ElementAttributes();
				var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
				//elStartEnd
				var end = parseElementStartPart(source,tagStart,el,currentNSMap,entityReplacer,errorHandler);
				var len = el.length;
				
				
				if(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){
					el.closed = true;
					if(!entityMap.nbsp){
						errorHandler.warning('unclosed xml attribute');
					}
				}
				if(locator && len){
					var locator2 = copyLocator(locator,{});
					//try{//attribute position fixed
					for(var i = 0;i<len;i++){
						var a = el[i];
						position(a.offset);
						a.locator = copyLocator(locator,{});
					}
					//}catch(e){console.error('@@@@@'+e)}
					domBuilder.locator = locator2
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
					domBuilder.locator = locator;
				}else{
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
				}
				
				
				
				if(el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed){
					end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder)
				}else{
					end++;
				}
			}
		}catch(e){
			errorHandler.error('element parse error: '+e)
			//errorHandler.error('element parse error: '+e);
			end = -1;
			//throw e;
		}
		if(end>start){
			start = end;
		}else{
			//TODO: 这里有可能sax回退，有位置错误风险
			appendText(Math.max(tagStart,start)+1);
		}
	}
}
function copyLocator(f,t){
	t.lineNumber = f.lineNumber;
	t.columnNumber = f.columnNumber;
	return t;
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source,start,el,currentNSMap,entityReplacer,errorHandler){
	var attrName;
	var value;
	var p = ++start;
	var s = S_TAG;//status
	while(true){
		var c = source.charAt(p);
		switch(c){
		case '=':
			if(s === S_ATTR){//attrName
				attrName = source.slice(start,p);
				s = S_EQ;
			}else if(s === S_ATTR_SPACE){
				s = S_EQ;
			}else{
				//fatalError: equal must after attrName or space after attrName
				throw new Error('attribute equal must after attrName');
			}
			break;
		case '\'':
		case '"':
			if(s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
				){//equal
				if(s === S_ATTR){
					errorHandler.warning('attribute value must after "="')
					attrName = source.slice(start,p)
				}
				start = p+1;
				p = source.indexOf(c,start)
				if(p>0){
					value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					el.add(attrName,value,start-1);
					s = S_ATTR_END;
				}else{
					//fatalError: no end quot match
					throw new Error('attribute value no end \''+c+'\' match');
				}
			}else if(s == S_ATTR_NOQUOT_VALUE){
				value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
				//console.log(attrName,value,start,p)
				el.add(attrName,value,start);
				//console.dir(el)
				errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
				start = p+1;
				s = S_ATTR_END
			}else{
				//fatalError: no equal before
				throw new Error('attribute value must after "="');
			}
			break;
		case '/':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				s =S_TAG_CLOSE;
				el.closed = true;
			case S_ATTR_NOQUOT_VALUE:
			case S_ATTR:
			case S_ATTR_SPACE:
				break;
			//case S_EQ:
			default:
				throw new Error("attribute invalid close char('/')")
			}
			break;
		case ''://end document
			//throw new Error('unexpected end of input')
			errorHandler.error('unexpected end of input');
			if(s == S_TAG){
				el.setTagName(source.slice(start,p));
			}
			return p;
		case '>':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				break;//normal
			case S_ATTR_NOQUOT_VALUE://Compatible state
			case S_ATTR:
				value = source.slice(start,p);
				if(value.slice(-1) === '/'){
					el.closed  = true;
					value = value.slice(0,-1)
				}
			case S_ATTR_SPACE:
				if(s === S_ATTR_SPACE){
					value = attrName;
				}
				if(s == S_ATTR_NOQUOT_VALUE){
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					el.add(attrName,value.replace(/&#?\w+;/g,entityReplacer),start)
				}else{
					if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!')
					}
					el.add(value,value,start)
				}
				break;
			case S_EQ:
				throw new Error('attribute value missed!!');
			}
//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
			return p;
		/*xml space '\x20' | #x9 | #xD | #xA; */
		case '\u0080':
			c = ' ';
		default:
			if(c<= ' '){//space
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));//tagName
					s = S_TAG_SPACE;
					break;
				case S_ATTR:
					attrName = source.slice(start,p)
					s = S_ATTR_SPACE;
					break;
				case S_ATTR_NOQUOT_VALUE:
					var value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					el.add(attrName,value,start)
				case S_ATTR_END:
					s = S_TAG_SPACE;
					break;
				//case S_TAG_SPACE:
				//case S_EQ:
				//case S_ATTR_SPACE:
				//	void();break;
				//case S_TAG_CLOSE:
					//ignore warning
				}
			}else{//not space
//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
				switch(s){
				//case S_TAG:void();break;
				//case S_ATTR:void();break;
				//case S_ATTR_NOQUOT_VALUE:void();break;
				case S_ATTR_SPACE:
					var tagName =  el.tagName;
					if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead2!!')
					}
					el.add(attrName,attrName,start);
					start = p;
					s = S_ATTR;
					break;
				case S_ATTR_END:
					errorHandler.warning('attribute space is required"'+attrName+'"!!')
				case S_TAG_SPACE:
					s = S_ATTR;
					start = p;
					break;
				case S_EQ:
					s = S_ATTR_NOQUOT_VALUE;
					start = p;
					break;
				case S_TAG_CLOSE:
					throw new Error("elements closed character '/' and '>' must be connected to");
				}
			}
		}//end outer switch
		//console.log('p++',p)
		p++;
	}
}
/**
 * @return true if has new namespace define
 */
function appendElement(el,domBuilder,currentNSMap){
	var tagName = el.tagName;
	var localNSMap = null;
	//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
	var i = el.length;
	while(i--){
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if(nsp>0){
			var prefix = a.prefix = qName.slice(0,nsp);
			var localName = qName.slice(nsp+1);
			var nsPrefix = prefix === 'xmlns' && localName
		}else{
			localName = qName;
			prefix = null
			nsPrefix = qName === 'xmlns' && ''
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName ;
		//prefix == null for no ns prefix attribute 
		if(nsPrefix !== false){//hack!!
			if(localNSMap == null){
				localNSMap = {}
				//console.log(currentNSMap,0)
				_copy(currentNSMap,currentNSMap={})
				//console.log(currentNSMap,1)
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = 'http://www.w3.org/2000/xmlns/'
			domBuilder.startPrefixMapping(nsPrefix, value) 
		}
	}
	var i = el.length;
	while(i--){
		a = el[i];
		var prefix = a.prefix;
		if(prefix){//no prefix attribute has no namespace
			if(prefix === 'xml'){
				a.uri = 'http://www.w3.org/XML/1998/namespace';
			}if(prefix !== 'xmlns'){
				a.uri = currentNSMap[prefix || '']
				
				//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if(nsp>0){
		prefix = el.prefix = tagName.slice(0,nsp);
		localName = el.localName = tagName.slice(nsp+1);
	}else{
		prefix = null;//important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	var ns = el.uri = currentNSMap[prefix || ''];
	domBuilder.startElement(ns,localName,tagName,el);
	//endPrefixMapping and startPrefixMapping have not any help for dom builder
	//localNSMap = null
	if(el.closed){
		domBuilder.endElement(ns,localName,tagName);
		if(localNSMap){
			for(prefix in localNSMap){
				domBuilder.endPrefixMapping(prefix) 
			}
		}
	}else{
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		//parseStack.push(el);
		return true;
	}
}
function parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){
	if(/^(?:script|textarea)$/i.test(tagName)){
		var elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);
		var text = source.substring(elStartEnd+1,elEndStart);
		if(/[&<]/.test(text)){
			if(/^script$/i.test(tagName)){
				//if(!/\]\]>/.test(text)){
					//lexHandler.startCDATA();
					domBuilder.characters(text,0,text.length);
					//lexHandler.endCDATA();
					return elEndStart;
				//}
			}//}else{//text area
				text = text.replace(/&#?\w+;/g,entityReplacer);
				domBuilder.characters(text,0,text.length);
				return elEndStart;
			//}
			
		}
	}
	return elStartEnd+1;
}
function fixSelfClosed(source,elStartEnd,tagName,closeMap){
	//if(tagName in closeMap){
	var pos = closeMap[tagName];
	if(pos == null){
		//console.log(tagName)
		pos =  source.lastIndexOf('</'+tagName+'>')
		if(pos<elStartEnd){//忘记闭合
			pos = source.lastIndexOf('</'+tagName)
		}
		closeMap[tagName] =pos
	}
	return pos<elStartEnd;
	//} 
}
function _copy(source,target){
	for(var n in source){target[n] = source[n]}
}
function parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'
	var next= source.charAt(start+2)
	switch(next){
	case '-':
		if(source.charAt(start + 3) === '-'){
			var end = source.indexOf('-->',start+4);
			//append comment source.substring(4,end)//<!--
			if(end>start){
				domBuilder.comment(source,start+4,end-start-4);
				return end+3;
			}else{
				errorHandler.error("Unclosed comment");
				return -1;
			}
		}else{
			//error
			return -1;
		}
	default:
		if(source.substr(start+3,6) == 'CDATA['){
			var end = source.indexOf(']]>',start+9);
			domBuilder.startCDATA();
			domBuilder.characters(source,start+9,end-start-9);
			domBuilder.endCDATA() 
			return end+3;
		}
		//<!DOCTYPE
		//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
		var matchs = split(source,start);
		var len = matchs.length;
		if(len>1 && /!doctype/i.test(matchs[0][0])){
			var name = matchs[1][0];
			var pubid = len>3 && /^public$/i.test(matchs[2][0]) && matchs[3][0]
			var sysid = len>4 && matchs[4][0];
			var lastMatch = matchs[len-1]
			domBuilder.startDTD(name,pubid && pubid.replace(/^(['"])(.*?)\1$/,'$2'),
					sysid && sysid.replace(/^(['"])(.*?)\1$/,'$2'));
			domBuilder.endDTD();
			
			return lastMatch.index+lastMatch[0].length
		}
	}
	return -1;
}



function parseInstruction(source,start,domBuilder){
	var end = source.indexOf('?>',start);
	if(end){
		var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
		if(match){
			var len = match[0].length;
			domBuilder.processingInstruction(match[1], match[2]) ;
			return end+2;
		}else{//error
			return -1;
		}
	}
	return -1;
}

/**
 * @param source
 */
function ElementAttributes(source){
	
}
ElementAttributes.prototype = {
	setTagName:function(tagName){
		if(!tagNamePattern.test(tagName)){
			throw new Error('invalid tagName:'+tagName)
		}
		this.tagName = tagName
	},
	add:function(qName,value,offset){
		if(!tagNamePattern.test(qName)){
			throw new Error('invalid attribute:'+qName)
		}
		this[this.length++] = {qName:qName,value:value,offset:offset}
	},
	length:0,
	getLocalName:function(i){return this[i].localName},
	getLocator:function(i){return this[i].locator},
	getQName:function(i){return this[i].qName},
	getURI:function(i){return this[i].uri},
	getValue:function(i){return this[i].value}
//	,getIndex:function(uri, localName)){
//		if(localName){
//			
//		}else{
//			var qName = uri
//		}
//	},
//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
//	getType:function(uri,localName){}
//	getType:function(i){},
}




function _set_proto_(thiz,parent){
	thiz.__proto__ = parent;
	return thiz;
}
if(!(_set_proto_({},_set_proto_.prototype) instanceof _set_proto_)){
	_set_proto_ = function(thiz,parent){
		function p(){};
		p.prototype = parent;
		p = new p();
		for(parent in thiz){
			p[parent] = thiz[parent];
		}
		return p;
	}
}

function split(source,start){
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = start;
	reg.exec(source);//skip <
	while(match = reg.exec(source)){
		buf.push(match);
		if(match[1])return buf;
	}
}

exports.XMLReader = XMLReader;



/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports) => {

/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */

function copy(src,dest){
	for(var p in src){
		dest[p] = src[p];
	}
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class,Super){
	var pt = Class.prototype;
	if(Object.create){
		var ppt = Object.create(Super.prototype)
		pt.__proto__ = ppt;
	}
	if(!(pt instanceof Super)){
		function t(){};
		t.prototype = Super.prototype;
		t = new t();
		copy(pt,t);
		Class.prototype = pt = t;
	}
	if(pt.constructor != Class){
		if(typeof Class != 'function'){
			console.error("unknow Class:"+Class)
		}
		pt.constructor = Class
	}
}
var htmlns = 'http://www.w3.org/1999/xhtml' ;
// Node Types
var NodeType = {}
var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

// ExceptionCode
var ExceptionCode = {}
var ExceptionMessage = {};
var INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
var DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
var WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
var INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
var NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
var NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
//level2
var INVALID_STATE_ERR        	= ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
var SYNTAX_ERR               	= ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
var INVALID_MODIFICATION_ERR 	= ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
var NAMESPACE_ERR            	= ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
var INVALID_ACCESS_ERR       	= ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);


function DOMException(code, message) {
	if(message instanceof Error){
		var error = message;
	}else{
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if(message) this.message = this.message + ": " + message;
	return error;
};
DOMException.prototype = Error.prototype;
copy(ExceptionCode,DOMException)
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
};
NodeList.prototype = {
	/**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */
	length:0, 
	/**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long 
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
	 */
	item: function(index) {
		return this[index] || null;
	},
	toString:function(isHTML,nodeFilter){
		for(var buf = [], i = 0;i<this.length;i++){
			serializeToString(this[i],buf,isHTML,nodeFilter);
		}
		return buf.join('');
	}
};
function LiveNodeList(node,refresh){
	this._node = node;
	this._refresh = refresh
	_updateLiveList(this);
}
function _updateLiveList(list){
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if(list._inc != inc){
		var ls = list._refresh(list._node);
		//console.log(ls.length)
		__set__(list,'length',ls.length);
		copy(ls,list);
		list._inc = inc;
	}
}
LiveNodeList.prototype.item = function(i){
	_updateLiveList(this);
	return this[i];
}

_extends(LiveNodeList,NodeList);
/**
 * 
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */
function NamedNodeMap() {
};

function _findNodeIndex(list,node){
	var i = list.length;
	while(i--){
		if(list[i] === node){return i}
	}
}

function _addNamedNode(el,list,newAttr,oldAttr){
	if(oldAttr){
		list[_findNodeIndex(list,oldAttr)] = newAttr;
	}else{
		list[list.length++] = newAttr;
	}
	if(el){
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if(doc){
			oldAttr && _onRemoveAttribute(doc,el,oldAttr);
			_onAddAttribute(doc,el,newAttr);
		}
	}
}
function _removeNamedNode(el,list,attr){
	//console.log('remove attr:'+attr)
	var i = _findNodeIndex(list,attr);
	if(i>=0){
		var lastIndex = list.length-1
		while(i<lastIndex){
			list[i] = list[++i]
		}
		list.length = lastIndex;
		if(el){
			var doc = el.ownerDocument;
			if(doc){
				_onRemoveAttribute(doc,el,attr);
				attr.ownerElement = null;
			}
		}
	}else{
		throw DOMException(NOT_FOUND_ERR,new Error(el.tagName+'@'+attr))
	}
}
NamedNodeMap.prototype = {
	length:0,
	item:NodeList.prototype.item,
	getNamedItem: function(key) {
//		if(key.indexOf(':')>0 || key == 'xmlns'){
//			return null;
//		}
		//console.log()
		var i = this.length;
		while(i--){
			var attr = this[i];
			//console.log(attr.nodeName,key)
			if(attr.nodeName == key){
				return attr;
			}
		}
	},
	setNamedItem: function(attr) {
		var el = attr.ownerElement;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},
	/* returns Node */
	setNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var el = attr.ownerElement, oldAttr;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},

	/* returns Node */
	removeNamedItem: function(key) {
		var attr = this.getNamedItem(key);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
		
		
	},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
	
	//for level2
	removeNamedItemNS:function(namespaceURI,localName){
		var attr = this.getNamedItemNS(namespaceURI,localName);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
	},
	getNamedItemNS: function(namespaceURI, localName) {
		var i = this.length;
		while(i--){
			var node = this[i];
			if(node.localName == localName && node.namespaceURI == namespaceURI){
				return node;
			}
		}
		return null;
	}
};
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation(/* Object */ features) {
	this._features = {};
	if (features) {
		for (var feature in features) {
			 this._features = features[feature];
		}
	}
};

DOMImplementation.prototype = {
	hasFeature: function(/* string */ feature, /* string */ version) {
		var versions = this._features[feature.toLowerCase()];
		if (versions && (!version || version in versions)) {
			return true;
		} else {
			return false;
		}
	},
	// Introduced in DOM Level 2:
	createDocument:function(namespaceURI,  qualifiedName, doctype){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
		var doc = new Document();
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype;
		if(doctype){
			doc.appendChild(doctype);
		}
		if(qualifiedName){
			var root = doc.createElementNS(namespaceURI,qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	// Introduced in DOM Level 2:
	createDocumentType:function(qualifiedName, publicId, systemId){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId;
		node.systemId = systemId;
		// Introduced in DOM Level 2:
		//readonly attribute DOMString        internalSubset;
		
		//TODO:..
		//  readonly attribute NamedNodeMap     entities;
		//  readonly attribute NamedNodeMap     notations;
		return node;
	}
};


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
};

Node.prototype = {
	firstChild : null,
	lastChild : null,
	previousSibling : null,
	nextSibling : null,
	attributes : null,
	parentNode : null,
	childNodes : null,
	ownerDocument : null,
	nodeValue : null,
	namespaceURI : null,
	prefix : null,
	localName : null,
	// Modified in DOM Level 2:
	insertBefore:function(newChild, refChild){//raises 
		return _insertBefore(this,newChild,refChild);
	},
	replaceChild:function(newChild, oldChild){//raises 
		this.insertBefore(newChild,oldChild);
		if(oldChild){
			this.removeChild(oldChild);
		}
	},
	removeChild:function(oldChild){
		return _removeChild(this,oldChild);
	},
	appendChild:function(newChild){
		return this.insertBefore(newChild,null);
	},
	hasChildNodes:function(){
		return this.firstChild != null;
	},
	cloneNode:function(deep){
		return cloneNode(this.ownerDocument||this,this,deep);
	},
	// Modified in DOM Level 2:
	normalize:function(){
		var child = this.firstChild;
		while(child){
			var next = child.nextSibling;
			if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
				this.removeChild(next);
				child.appendData(next.data);
			}else{
				child.normalize();
				child = next;
			}
		}
	},
  	// Introduced in DOM Level 2:
	isSupported:function(feature, version){
		return this.ownerDocument.implementation.hasFeature(feature,version);
	},
    // Introduced in DOM Level 2:
    hasAttributes:function(){
    	return this.attributes.length>0;
    },
    lookupPrefix:function(namespaceURI){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			for(var n in map){
    				if(map[n] == namespaceURI){
    					return n;
    				}
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI:function(prefix){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			if(prefix in map){
    				return map[prefix] ;
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace:function(namespaceURI){
    	var prefix = this.lookupPrefix(namespaceURI);
    	return prefix == null;
    }
};


function _xmlEncoder(c){
	return c == '<' && '&lt;' ||
         c == '>' && '&gt;' ||
         c == '&' && '&amp;' ||
         c == '"' && '&quot;' ||
         '&#'+c.charCodeAt()+';'
}


copy(NodeType,Node);
copy(NodeType,Node.prototype);

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node,callback){
	if(callback(node)){
		return true;
	}
	if(node = node.firstChild){
		do{
			if(_visitNode(node,callback)){return true}
        }while(node=node.nextSibling)
    }
}



function Document(){
}
function _onAddAttribute(doc,el,newAttr){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value
	}
}
function _onRemoveAttribute(doc,el,newAttr,remove){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		delete el._nsMap[newAttr.prefix?newAttr.localName:'']
	}
}
function _onUpdateChild(doc,el,newChild){
	if(doc && doc._inc){
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if(newChild){
			cs[cs.length++] = newChild;
		}else{
			//console.log(1)
			var child = el.firstChild;
			var i = 0;
			while(child){
				cs[i++] = child;
				child =child.nextSibling;
			}
			cs.length = i;
		}
	}
}

/**
 * attributes;
 * children;
 * 
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */
function _removeChild(parentNode,child){
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if(previous){
		previous.nextSibling = next;
	}else{
		parentNode.firstChild = next
	}
	if(next){
		next.previousSibling = previous;
	}else{
		parentNode.lastChild = previous;
	}
	_onUpdateChild(parentNode.ownerDocument,parentNode);
	return child;
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode,newChild,nextChild){
	var cp = newChild.parentNode;
	if(cp){
		cp.removeChild(newChild);//remove and update
	}
	if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
		var newFirst = newChild.firstChild;
		if (newFirst == null) {
			return newChild;
		}
		var newLast = newChild.lastChild;
	}else{
		newFirst = newLast = newChild;
	}
	var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = nextChild;
	
	
	if(pre){
		pre.nextSibling = newFirst;
	}else{
		parentNode.firstChild = newFirst;
	}
	if(nextChild == null){
		parentNode.lastChild = newLast;
	}else{
		nextChild.previousSibling = newLast;
	}
	do{
		newFirst.parentNode = parentNode;
	}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
	_onUpdateChild(parentNode.ownerDocument||parentNode,parentNode);
	//console.log(parentNode.lastChild.nextSibling == null)
	if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
		newChild.firstChild = newChild.lastChild = null;
	}
	return newChild;
}
function _appendSingleChild(parentNode,newChild){
	var cp = newChild.parentNode;
	if(cp){
		var pre = parentNode.lastChild;
		cp.removeChild(newChild);//remove and update
		var pre = parentNode.lastChild;
	}
	var pre = parentNode.lastChild;
	newChild.parentNode = parentNode;
	newChild.previousSibling = pre;
	newChild.nextSibling = null;
	if(pre){
		pre.nextSibling = newChild;
	}else{
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument,parentNode,newChild);
	return newChild;
	//console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
	//implementation : null,
	nodeName :  '#document',
	nodeType :  DOCUMENT_NODE,
	doctype :  null,
	documentElement :  null,
	_inc : 1,
	
	insertBefore :  function(newChild, refChild){//raises 
		if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
			var child = newChild.firstChild;
			while(child){
				var next = child.nextSibling;
				this.insertBefore(child,refChild);
				child = next;
			}
			return newChild;
		}
		if(this.documentElement == null && newChild.nodeType == ELEMENT_NODE){
			this.documentElement = newChild;
		}
		
		return _insertBefore(this,newChild,refChild),(newChild.ownerDocument = this),newChild;
	},
	removeChild :  function(oldChild){
		if(this.documentElement == oldChild){
			this.documentElement = null;
		}
		return _removeChild(this,oldChild);
	},
	// Introduced in DOM Level 2:
	importNode : function(importedNode,deep){
		return importNode(this,importedNode,deep);
	},
	// Introduced in DOM Level 2:
	getElementById :	function(id){
		var rtv = null;
		_visitNode(this.documentElement,function(node){
			if(node.nodeType == ELEMENT_NODE){
				if(node.getAttribute('id') == id){
					rtv = node;
					return true;
				}
			}
		})
		return rtv;
	},
	
	//document factory method:
	createElement :	function(tagName){
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.childNodes = new NodeList();
		var attrs	= node.attributes = new NamedNodeMap();
		attrs._ownerElement = node;
		return node;
	},
	createDocumentFragment :	function(){
		var node = new DocumentFragment();
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	createTextNode :	function(data){
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createComment :	function(data){
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createCDATASection :	function(data){
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createProcessingInstruction :	function(target,data){
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.tagName = node.target = target;
		node.nodeValue= node.data = data;
		return node;
	},
	createAttribute :	function(name){
		var node = new Attr();
		node.ownerDocument	= this;
		node.name = name;
		node.nodeName	= name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	createEntityReference :	function(name){
		var node = new EntityReference();
		node.ownerDocument	= this;
		node.nodeName	= name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS :	function(namespaceURI,qualifiedName){
		var node = new Element();
		var pl = qualifiedName.split(':');
		var attrs	= node.attributes = new NamedNodeMap();
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = namespaceURI;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS :	function(namespaceURI,qualifiedName){
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.namespaceURI = namespaceURI;
		node.specified = true;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		return node;
	}
};
_extends(Document,Node);


function Element() {
	this._nsMap = {};
};
Element.prototype = {
	nodeType : ELEMENT_NODE,
	hasAttribute : function(name){
		return this.getAttributeNode(name)!=null;
	},
	getAttribute : function(name){
		var attr = this.getAttributeNode(name);
		return attr && attr.value || '';
	},
	getAttributeNode : function(name){
		return this.attributes.getNamedItem(name);
	},
	setAttribute : function(name, value){
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	removeAttribute : function(name){
		var attr = this.getAttributeNode(name)
		attr && this.removeAttributeNode(attr);
	},
	
	//four real opeartion method
	appendChild:function(newChild){
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			return this.insertBefore(newChild,null);
		}else{
			return _appendSingleChild(this,newChild);
		}
	},
	setAttributeNode : function(newAttr){
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS : function(newAttr){
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode : function(oldAttr){
		//console.log(this == oldAttr.ownerElement)
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS : function(namespaceURI, localName){
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},
	
	hasAttributeNS : function(namespaceURI, localName){
		return this.getAttributeNodeNS(namespaceURI, localName)!=null;
	},
	getAttributeNS : function(namespaceURI, localName){
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS : function(namespaceURI, qualifiedName, value){
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	getAttributeNodeNS : function(namespaceURI, localName){
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},
	
	getElementsByTagName : function(tagName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
					ls.push(node);
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS : function(namespaceURI, localName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){
					ls.push(node);
				}
			});
			return ls;
			
		});
	}
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


_extends(Element,Node);
function Attr() {
};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr,Node);


function CharacterData() {
};
CharacterData.prototype = {
	data : '',
	substringData : function(offset, count) {
		return this.data.substring(offset, offset+count);
	},
	appendData: function(text) {
		text = this.data+text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function(offset,text) {
		this.replaceData(offset,0,text);
	
	},
	appendChild:function(newChild){
		throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
	},
	deleteData: function(offset, count) {
		this.replaceData(offset,count,"");
	},
	replaceData: function(offset, count, text) {
		var start = this.data.substring(0,offset);
		var end = this.data.substring(offset+count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	}
}
_extends(CharacterData,Node);
function Text() {
};
Text.prototype = {
	nodeName : "#text",
	nodeType : TEXT_NODE,
	splitText : function(offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if(this.parentNode){
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	}
}
_extends(Text,CharacterData);
function Comment() {
};
Comment.prototype = {
	nodeName : "#comment",
	nodeType : COMMENT_NODE
}
_extends(Comment,CharacterData);

function CDATASection() {
};
CDATASection.prototype = {
	nodeName : "#cdata-section",
	nodeType : CDATA_SECTION_NODE
}
_extends(CDATASection,CharacterData);


function DocumentType() {
};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType,Node);

function Notation() {
};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation,Node);

function Entity() {
};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity,Node);

function EntityReference() {
};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference,Node);

function DocumentFragment() {
};
DocumentFragment.prototype.nodeName =	"#document-fragment";
DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment,Node);


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction,Node);
function XMLSerializer(){}
XMLSerializer.prototype.serializeToString = function(node,isHtml,nodeFilter){
	return nodeSerializeToString.call(node,isHtml,nodeFilter);
}
Node.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(isHtml,nodeFilter){
	var buf = [];
	var refNode = this.nodeType == 9?this.documentElement:this;
	var prefix = refNode.prefix;
	var uri = refNode.namespaceURI;
	
	if(uri && prefix == null){
		//console.log(prefix)
		var prefix = refNode.lookupPrefix(uri);
		if(prefix == null){
			//isHTML = true;
			var visibleNamespaces=[
			{namespace:uri,prefix:null}
			//{namespace:uri,prefix:''}
			]
		}
	}
	serializeToString(this,buf,isHtml,nodeFilter,visibleNamespaces);
	//console.log('###',this.nodeType,uri,prefix,buf.join(''))
	return buf.join('');
}
function needNamespaceDefine(node,isHTML, visibleNamespaces) {
	var prefix = node.prefix||'';
	var uri = node.namespaceURI;
	if (!prefix && !uri){
		return false;
	}
	if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" 
		|| uri == 'http://www.w3.org/2000/xmlns/'){
		return false;
	}
	
	var i = visibleNamespaces.length 
	//console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
	while (i--) {
		var ns = visibleNamespaces[i];
		// get namespace prefix
		//console.log(node.nodeType,node.tagName,ns.prefix,prefix)
		if (ns.prefix == prefix){
			return ns.namespace != uri;
		}
	}
	//console.log(isHTML,uri,prefix=='')
	//if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
	//	return false;
	//}
	//node.flag = '11111'
	//console.error(3,true,node.flag,node.prefix,node.namespaceURI)
	return true;
}
function serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){
	if(nodeFilter){
		node = nodeFilter(node);
		if(node){
			if(typeof node == 'string'){
				buf.push(node);
				return;
			}
		}else{
			return;
		}
		//buf.sort.apply(attrs, attributeSorter);
	}
	switch(node.nodeType){
	case ELEMENT_NODE:
		if (!visibleNamespaces) visibleNamespaces = [];
		var startVisibleNamespaces = visibleNamespaces.length;
		var attrs = node.attributes;
		var len = attrs.length;
		var child = node.firstChild;
		var nodeName = node.tagName;
		
		isHTML =  (htmlns === node.namespaceURI) ||isHTML 
		buf.push('<',nodeName);
		
		
		
		for(var i=0;i<len;i++){
			// add namespaces for attributes
			var attr = attrs.item(i);
			if (attr.prefix == 'xmlns') {
				visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
			}else if(attr.nodeName == 'xmlns'){
				visibleNamespaces.push({ prefix: '', namespace: attr.value });
			}
		}
		for(var i=0;i<len;i++){
			var attr = attrs.item(i);
			if (needNamespaceDefine(attr,isHTML, visibleNamespaces)) {
				var prefix = attr.prefix||'';
				var uri = attr.namespaceURI;
				var ns = prefix ? ' xmlns:' + prefix : " xmlns";
				buf.push(ns, '="' , uri , '"');
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
			serializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);
		}
		// add namespace for current node		
		if (needNamespaceDefine(node,isHTML, visibleNamespaces)) {
			var prefix = node.prefix||'';
			var uri = node.namespaceURI;
			var ns = prefix ? ' xmlns:' + prefix : " xmlns";
			buf.push(ns, '="' , uri , '"');
			visibleNamespaces.push({ prefix: prefix, namespace:uri });
		}
		
		if(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){
			buf.push('>');
			//if is cdata child node
			if(isHTML && /^script$/i.test(nodeName)){
				while(child){
					if(child.data){
						buf.push(child.data);
					}else{
						serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
					}
					child = child.nextSibling;
				}
			}else
			{
				while(child){
					serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
					child = child.nextSibling;
				}
			}
			buf.push('</',nodeName,'>');
		}else{
			buf.push('/>');
		}
		// remove added visible namespaces
		//visibleNamespaces.length = startVisibleNamespaces;
		return;
	case DOCUMENT_NODE:
	case DOCUMENT_FRAGMENT_NODE:
		var child = node.firstChild;
		while(child){
			serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
			child = child.nextSibling;
		}
		return;
	case ATTRIBUTE_NODE:
		return buf.push(' ',node.name,'="',node.value.replace(/[<&"]/g,_xmlEncoder),'"');
	case TEXT_NODE:
		return buf.push(node.data.replace(/[<&]/g,_xmlEncoder));
	case CDATA_SECTION_NODE:
		return buf.push( '<![CDATA[',node.data,']]>');
	case COMMENT_NODE:
		return buf.push( "<!--",node.data,"-->");
	case DOCUMENT_TYPE_NODE:
		var pubid = node.publicId;
		var sysid = node.systemId;
		buf.push('<!DOCTYPE ',node.name);
		if(pubid){
			buf.push(' PUBLIC "',pubid);
			if (sysid && sysid!='.') {
				buf.push( '" "',sysid);
			}
			buf.push('">');
		}else if(sysid && sysid!='.'){
			buf.push(' SYSTEM "',sysid,'">');
		}else{
			var sub = node.internalSubset;
			if(sub){
				buf.push(" [",sub,"]");
			}
			buf.push(">");
		}
		return;
	case PROCESSING_INSTRUCTION_NODE:
		return buf.push( "<?",node.target," ",node.data,"?>");
	case ENTITY_REFERENCE_NODE:
		return buf.push( '&',node.nodeName,';');
	//case ENTITY_NODE:
	//case NOTATION_NODE:
	default:
		buf.push('??',node.nodeName);
	}
}
function importNode(doc,node,deep){
	var node2;
	switch (node.nodeType) {
	case ELEMENT_NODE:
		node2 = node.cloneNode(false);
		node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
			//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
	case DOCUMENT_FRAGMENT_NODE:
		break;
	case ATTRIBUTE_NODE:
		deep = true;
		break;
	//case ENTITY_REFERENCE_NODE:
	//case PROCESSING_INSTRUCTION_NODE:
	////case TEXT_NODE:
	//case CDATA_SECTION_NODE:
	//case COMMENT_NODE:
	//	deep = false;
	//	break;
	//case DOCUMENT_NODE:
	//case DOCUMENT_TYPE_NODE:
	//cannot be imported.
	//case ENTITY_NODE:
	//case NOTATION_NODE：
	//can not hit in level3
	//default:throw e;
	}
	if(!node2){
		node2 = node.cloneNode(false);//false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(importNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function cloneNode(doc,node,deep){
	var node2 = new node.constructor();
	for(var n in node){
		var v = node[n];
		if(typeof v != 'object' ){
			if(v != node2[n]){
				node2[n] = v;
			}
		}
	}
	if(node.childNodes){
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
	case ELEMENT_NODE:
		var attrs	= node.attributes;
		var attrs2	= node2.attributes = new NamedNodeMap();
		var len = attrs.length
		attrs2._ownerElement = node2;
		for(var i=0;i<len;i++){
			node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
		}
		break;;
	case ATTRIBUTE_NODE:
		deep = true;
	}
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(cloneNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object,key,value){
	object[key] = value
}
//do dynamic
try{
	if(Object.defineProperty){
		Object.defineProperty(LiveNodeList.prototype,'length',{
			get:function(){
				_updateLiveList(this);
				return this.$$length;
			}
		});
		Object.defineProperty(Node.prototype,'textContent',{
			get:function(){
				return getTextContent(this);
			},
			set:function(data){
				switch(this.nodeType){
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					while(this.firstChild){
						this.removeChild(this.firstChild);
					}
					if(data || String(data)){
						this.appendChild(this.ownerDocument.createTextNode(data));
					}
					break;
				default:
					//TODO:
					this.data = data;
					this.value = data;
					this.nodeValue = data;
				}
			}
		})
		
		function getTextContent(node){
			switch(node.nodeType){
			case ELEMENT_NODE:
			case DOCUMENT_FRAGMENT_NODE:
				var buf = [];
				node = node.firstChild;
				while(node){
					if(node.nodeType!==7 && node.nodeType !==8){
						buf.push(getTextContent(node));
					}
					node = node.nextSibling;
				}
				return buf.join('');
			default:
				return node.nodeValue;
			}
		}
		__set__ = function(object,key,value){
			//console.log(value)
			object['$$'+key] = value
		}
	}
}catch(e){//ie8
}

//if(typeof require == 'function'){
	exports.DOMImplementation = DOMImplementation;
	exports.XMLSerializer = XMLSerializer;
//}


/***/ }),
/* 61 */
/***/ ((module) => {

//copyright Ryan Day 2010 <http://ryanday.org>, Joscha Feth 2013 <http://www.feth.com> [MIT Licensed]

var element_start_char =
    "a-zA-Z_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FFF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD";
var element_non_start_char = "\-.0-9\u00B7\u0300-\u036F\u203F\u2040";
var element_replace = new RegExp("^([^" + element_start_char + "])|^((x|X)(m|M)(l|L))|([^" + element_start_char + element_non_start_char + "])", "g");
var not_safe_in_xml = /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm;

var objKeys = function (obj) {
    var l = [];
    if (obj instanceof Object) {
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                l.push(k);
            }
        }
    }
    return l;
};
var process_to_xml = function (node_data, options) {

    var makeNode = function (name, content, attributes, level, hasSubNodes) {
        var indent_value = options.indent !== undefined ? options.indent : "\t";
        var indent = options.prettyPrint ? '\n' + new Array(level).join(indent_value) : '';
        if (options.removeIllegalNameCharacters) {
            name = name.replace(element_replace, '_');
        }

        var node = [indent, '<', name, (attributes || '')];
        if (content && content.length > 0) {
            node.push('>')
            node.push(content);
            hasSubNodes && node.push(indent);
            node.push('</');
            node.push(name);
            node.push('>');
        } else {
            node.push('/>');
        }
        return node.join('');
    };

    return (function fn(node_data, node_descriptor, level) {
        var type = typeof node_data;
        if ((Array.isArray) ? Array.isArray(node_data) : node_data instanceof Array) {
            type = 'array';
        } else if (node_data instanceof Date) {
            type = 'date';
        }

        switch (type) {
            //if value is an array create child nodes from values
            case 'array':
                var ret = [];
                node_data.map(function (v) {
                    ret.push(fn(v, 1, level + 1));
                    //entries that are values of an array are the only ones that can be special node descriptors
                });
                options.prettyPrint && ret.push('\n');
                return ret.join('');
                break;

            case 'date':
                // cast dates to ISO 8601 date (soap likes it)
                return node_data.toJSON ? node_data.toJSON() : node_data + '';
                break;

            case 'object':
                var nodes = [];
                for (var name in node_data) {
                    if (node_data.hasOwnProperty(name)) {
                        if (node_data[name] instanceof Array) {
                            for (var j = 0; j < node_data[name].length; j++) {
                                if (node_data[name].hasOwnProperty(j)) {
                                    nodes.push(makeNode(name, fn(node_data[name][j], 0, level + 1), null, level + 1, objKeys(node_data[name][j]).length));
                                }
                            }
                        } else {
                            nodes.push(makeNode(name, fn(node_data[name], 0, level + 1), null, level + 1));
                        }
                    }
                }
                options.prettyPrint && nodes.length > 0 && nodes.push('\n');
                return nodes.join('');
                break;

            case 'function':
                return node_data();
                break;

            default:
                return options.escape ? esc(node_data) : '' + node_data;
        }

    }(node_data, 0, 0))
};


var xml_header = function (standalone) {
    var ret = ['<?xml version="1.0" encoding="UTF-8"'];

    if (standalone) {
        ret.push(' standalone="yes"');
    }
    ret.push('?>');

    return ret.join('');
};

function esc(str) {
    return ('' + str).replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&apos;')
        .replace(/"/g, '&quot;')
        .replace(not_safe_in_xml, '');
}

module.exports = function (obj, options) {
    if (!options) {
        options = {
            xmlHeader: {
                standalone: true
            },
            prettyPrint: true,
            indent: "  ",
            escape: true,
        };
    }

    if (typeof obj == 'string') {
        try {
            obj = JSON.parse(obj.toString());
        } catch (e) {
            return false;
        }
    }

    var xmlheader = '';
    var docType = '';
    if (options) {
        if (typeof options == 'object') {
            // our config is an object

            if (options.xmlHeader) {
                // the user wants an xml header
                xmlheader = xml_header(!!options.xmlHeader.standalone);
            }

            if (typeof options.docType != 'undefined') {
                docType = '<!DOCTYPE ' + options.docType + '>'
            }
        } else {
            // our config is a boolean value, so just add xml header
            xmlheader = xml_header();
        }
    }
    options = options || {}

    var ret = [
        xmlheader,
        (options.prettyPrint && docType ? '\n' : ''),
        docType,
        process_to_xml(obj, options)
    ];
    return ret.join('').replace(/\n{2,}/g, '\n').replace(/\s+$/g, '');
};

/***/ }),
/* 62 */
/***/ ((module) => {

var initEvent = function (cos) {
    var listeners = {};
    var getList = function (action) {
        !listeners[action] && (listeners[action] = []);
        return listeners[action];
    };
    cos.on = function (action, callback) {
        if (action === 'task-list-update') {
            console.warn('warning: Event "' + action + '" has been deprecated. Please use "list-update" instead.');
        }
        getList(action).push(callback);
    };
    cos.off = function (action, callback) {
        var list = getList(action);
        for (var i = list.length - 1; i >= 0; i--) {
            callback === list[i] && list.splice(i, 1);
        }
    };
    cos.emit = function (action, data) {
        var list = getList(action).map(function (cb) {
            return cb;
        });
        for (var i = 0; i < list.length; i++) {
            list[i](data);
        }
    };
};

var EventProxy = function () {
    initEvent(this);
};

module.exports.init = initEvent;
module.exports.EventProxy = EventProxy;

/***/ }),
/* 63 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var session = __webpack_require__(64);
var util = __webpack_require__(54);

var originApiMap = {};
var transferToTaskMethod = function (apiMap, apiName) {
    originApiMap[apiName] = apiMap[apiName];
    apiMap[apiName] = function (params, callback) {
        if (params.SkipTask) {
            originApiMap[apiName].call(this, params, callback);
        } else {
            this._addTask(apiName, params, callback);
        }
    };
};

var initTask = function (cos) {

    var queue = [];
    var tasks = {};
    var uploadingFileCount = 0;
    var nextUploadIndex = 0;

    // 接口返回简略的任务信息
    var formatTask = function (task) {
        var t = {
            id: task.id,
            Bucket: task.Bucket,
            Region: task.Region,
            Key: task.Key,
            FilePath: task.FilePath,
            state: task.state,
            loaded: task.loaded,
            size: task.size,
            speed: task.speed,
            percent: task.percent,
            hashPercent: task.hashPercent,
            error: task.error,
        };
        if (task.FilePath) t.FilePath = task.FilePath;
        if (task._custom) t._custom = task._custom;
        return t;
    };

    var emitListUpdate = (function () {
        var timer;
        var emit = function () {
            timer = 0;
            cos.emit('task-list-update', {list: util.map(queue, formatTask)});
            cos.emit('list-update', {list: util.map(queue, formatTask)});
        };
        return function () {
            if (!timer) timer = setTimeout(emit);
        }
    })();

    var clearQueue = function () {
        if (queue.length <= cos.options.UploadQueueSize) return;
        for (var i = 0;
             i < nextUploadIndex && // 小于当前操作的 index 才清理
             i < queue.length && // 大于队列才清理
             queue.length > cos.options.UploadQueueSize // 如果还太多，才继续清理
            ;) {
            var isActive = queue[i].state === 'waiting' || queue[i].state === 'checking' || queue[i].state === 'uploading';
            if (!queue[i] || !isActive) {
                tasks[queue[i].id] && (delete tasks[queue[i].id]);
                queue.splice(i, 1);
                nextUploadIndex--;
            } else {
                i++;
            }
        }
        emitListUpdate();
    };

    var startNextTask = function () {
        // 检查是否允许增加执行进程
        if (uploadingFileCount >= cos.options.FileParallelLimit) return;
        // 跳过不可执行的任务
        while (queue[nextUploadIndex] && queue[nextUploadIndex].state !== 'waiting') nextUploadIndex++;
        // 检查是否已遍历结束
        if (nextUploadIndex >= queue.length) return;
        // 上传该遍历到的任务
        var task = queue[nextUploadIndex];
        nextUploadIndex++;
        uploadingFileCount++;
        task.state = 'checking';
        task.params.onTaskStart && task.params.onTaskStart(formatTask(task));
        !task.params.UploadData && (task.params.UploadData = {});
        var apiParams = util.formatParams(task.api, task.params);
        originApiMap[task.api].call(cos, apiParams, function (err, data) {
            if (!cos._isRunningTask(task.id)) return;
            if (task.state === 'checking' || task.state === 'uploading') {
                task.state = err ? 'error' : 'success';
                err && (task.error = err);
                uploadingFileCount--;
                emitListUpdate();
                startNextTask();
                task.callback && task.callback(err, data);
                if (task.state === 'success') {
                    if (task.params) {
                        delete task.params.UploadData;
                        delete task.params.Body;
                        delete task.params;
                    }
                    delete task.callback;
                }
            }
            clearQueue();
        });
        emitListUpdate();
        // 异步执行下一个任务
        setTimeout(startNextTask);
    };

    var killTask = function (id, switchToState) {
        var task = tasks[id];
        if (!task) return;
        var waiting = task && task.state === 'waiting';
        var running = task && (task.state === 'checking' || task.state === 'uploading');
        if (switchToState === 'canceled' && task.state !== 'canceled' ||
            switchToState === 'paused' && waiting ||
            switchToState === 'paused' && running) {
            if (switchToState === 'paused' && task.params.Body && typeof task.params.Body.pipe === 'function') {
                console.error('stream not support pause');
                return;
            }
            task.state = switchToState;
            cos.emit('inner-kill-task', {TaskId: id, toState: switchToState});
            try {
                var UploadId = task && task.params && task.params.UploadData.UploadId
            } catch(e) {}
            if (switchToState === 'canceled' && UploadId) session.removeUsing(UploadId)
            emitListUpdate();
            if (running) {
                uploadingFileCount--;
                startNextTask();
            }
            if (switchToState === 'canceled') {
                if (task.params) {
                    delete task.params.UploadData;
                    delete task.params.Body;
                    delete task.params;
                }
                delete task.callback;
            }
        }
        clearQueue();
    };

    cos._addTasks = function (taskList) {
        util.each(taskList, function (task) {
            cos._addTask(task.api, task.params, task.callback, true);
        });
        emitListUpdate();
    };

    var isTaskReadyWarning = true;
    cos._addTask = function (api, params, callback, ignoreAddEvent) {

        // 复制参数对象
        params = util.formatParams(api, params);

        // 生成 id
        var id = util.uuid();
        params.TaskId = id;
        params.onTaskReady && params.onTaskReady(id);
        if (params.TaskReady) {
            params.TaskReady(id);
            isTaskReadyWarning && console.warn('warning: Param "TaskReady" has been deprecated. Please use "onTaskReady" instead.');
            isTaskReadyWarning = false;
        }

        var task = {
            // env
            params: params,
            callback: callback,
            api: api,
            index: queue.length,
            // task
            id: id,
            Bucket: params.Bucket,
            Region: params.Region,
            Key: params.Key,
            FilePath: params.FilePath || '',
            state: 'waiting',
            loaded: 0,
            size: 0,
            speed: 0,
            percent: 0,
            hashPercent: 0,
            error: null,
            _custom: params._custom,
        };
        var onHashProgress = params.onHashProgress;
        params.onHashProgress = function (info) {
            if (!cos._isRunningTask(task.id)) return;
            task.hashPercent = info.percent;
            onHashProgress && onHashProgress(info);
            emitListUpdate();
        };
        var onProgress = params.onProgress;
        params.onProgress = function (info) {
            if (!cos._isRunningTask(task.id)) return;
            task.state === 'checking' && (task.state = 'uploading');
            task.loaded = info.loaded;
            task.speed = info.speed;
            task.percent = info.percent;
            onProgress && onProgress(info);
            emitListUpdate();
        };

        // 异步获取 filesize
        util.getFileSize(api, params, function (err, size) {
            // 开始处理上传
            if (err) { // 如果获取大小出错，不加入队列
                callback(err);
                return;
            }
            // 获取完文件大小再把任务加入队列
            tasks[id] = task;
            queue.push(task);
            task.size = size;
            !ignoreAddEvent && emitListUpdate();
            startNextTask();
            clearQueue();
        });
        return id;
    };
    cos._isRunningTask = function (id) {
        var task = tasks[id];
        return !!(task && (task.state === 'checking' || task.state === 'uploading'));
    };
    cos.getTaskList = function () {
        return util.map(queue, formatTask);
    };
    cos.cancelTask = function (id) {
        killTask(id, 'canceled');
    };
    cos.pauseTask = function (id) {
        killTask(id, 'paused');
    };
    cos.restartTask = function (id) {
        var task = tasks[id];
        if (task && (task.state === 'paused' || task.state === 'error')) {
            task.state = 'waiting';
            emitListUpdate();
            nextUploadIndex = Math.min(nextUploadIndex, task.index);
            startNextTask();
        }
    };
    cos.isUploadRunning = function () {
        return uploadingFileCount || nextUploadIndex < queue.length;
    };

};

module.exports.transferToTaskMethod = transferToTaskMethod;
module.exports.init = initTask;


/***/ }),
/* 64 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var util = __webpack_require__(54);

// 按照文件特征值，缓存 UploadId
var cacheKey = 'cos_sdk_upload_cache';
var expires = 30 * 24 * 3600;
var cache;
var timer;

var init = function () {
    if (cache) return;
    cache = JSON.parse(localStorage.getItem(cacheKey) || '[]') || [];
    // 清理太老旧的数据
    var changed = false;
    var now = Math.round(Date.now() / 1000);
    for (var i = cache.length - 1; i >= 0; i--) {
        var mtime = cache[i][2];
        if (!mtime || mtime + expires < now) {
            cache.splice(i, 1);
            changed = true;
        }
    }
    changed && localStorage.setItem(cacheKey, JSON.stringify(cache));
};

// 把缓存存到本地
var save = function () {
    if (timer) return;
    timer = setTimeout(function () {
        localStorage.setItem(cacheKey, JSON.stringify(cache));
        timer = null;
    }, 400);
};

var mod = {
    using: {},
    // 标记 UploadId 正在使用
    setUsing: function (uuid) {
        mod.using[uuid] = true;
    },
    // 标记 UploadId 已经没在使用
    removeUsing: function (uuid) {
        delete mod.using[uuid];
    },
    // 用上传参数生成哈希值
    getFileId: function (file, ChunkSize, Bucket, Key) {
        if (file.name && file.size && file.lastModifiedDate && ChunkSize) {
            return util.md5([file.name, file.size, file.lastModifiedDate, ChunkSize, Bucket, Key].join('::'));
        } else {
            return null;
        }
    },
    // 获取文件对应的 UploadId 列表
    getUploadIdList: function (uuid) {
        if (!uuid) return null;
        init();
        var list = [];
        for (var i = 0; i < cache.length; i++) {
            if (cache[i][0] === uuid)
                list.push(cache[i][1]);
        }
        return list.length ? list : null;
    },
    // 缓存 UploadId
    saveUploadId: function (uuid, UploadId, limit) {
        init();
        if (!uuid) return;
        // 清理没用的 UploadId
        for (var i = cache.length - 1; i >= 0; i--) {
            var item = cache[i];
            if (item[0] === uuid && item[1] === UploadId) {
                cache.splice(i, 1);
            }
        }
        cache.unshift([uuid, UploadId, Math.round(Date.now() / 1000)]);
        if (cache.length > limit) cache.splice(limit);
        save();
    },
    // UploadId 已用完，移除掉
    removeUploadId: function (UploadId) {
        init();
        delete mod.using[UploadId];
        for (var i = cache.length - 1; i >= 0; i--) {
            if (cache[i][1] === UploadId) cache.splice(i, 1)
        }
        save();
    },
};

module.exports = mod;


/***/ }),
/* 65 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var REQUEST = __webpack_require__(66);
var util = __webpack_require__(54);


// Bucket 相关

/**
 * 获取用户的 bucket 列表
 * @param  {Object}  params         回调函数，必须，下面为参数列表
 * 无特殊参数
 * @param  {Function}  callback     回调函数，必须
 */
function getService(params, callback) {

    if (typeof params === 'function') {
        callback = params;
        params = {};
    }
    var protocol = this.options.Protocol || (util.isBrowser && location.protocol === 'http:' ? 'http:' : 'https:');
    var domain = this.options.ServiceDomain;
    var region = params.Region;
    if (domain) {
        domain = domain.replace(/\{Region\}/ig, region || '').replace(/\{.*?\}/ig, '');
        if (!/^[a-zA-Z]+:\/\//.test(domain)) {
            domain = protocol + '//' + domain;
        }
        if (domain.slice(-1) === '/') {
            domain = domain.slice(0, -1);
        }
    } else if(region){
        domain = protocol + '//cos.'+ region + '.myqcloud.com';
    } else {
        domain = protocol + '//service.cos.myqcloud.com';
    }

    submitRequest.call(this, {
        Action: 'name/cos:GetService',
        url: domain,
        method: 'GET',
        headers: params.Headers,
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var buckets = (data && data.ListAllMyBucketsResult && data.ListAllMyBucketsResult.Buckets
            && data.ListAllMyBucketsResult.Buckets.Bucket) || [];
        buckets = util.isArray(buckets) ? buckets : [buckets];
        var owner = (data && data.ListAllMyBucketsResult && data.ListAllMyBucketsResult.Owner) || {};
        callback(null, {
            Buckets: buckets,
            Owner: owner,
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 创建 Bucket，并初始化访问权限
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 *     @param  {String}  params.ACL                 用户自定义文件权限，可以设置：private，public-read；默认值：private，非必须
 *     @param  {String}  params.GrantRead           赋予被授权者读的权限，格式x-cos-grant-read: uin=" ",uin=" "，非必须
 *     @param  {String}  params.GrantWrite          赋予被授权者写的权限，格式x-cos-grant-write: uin=" ",uin=" "，非必须
 *     @param  {String}  params.GrantFullControl    赋予被授权者读写权限，格式x-cos-grant-full-control: uin=" ",uin=" "，非必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          返回的数据
 *     @return  {String}  data.Location             操作地址
 */
function putBucket(params, callback) {

    var self = this;
    submitRequest.call(this, {
        Action: 'name/cos:PutBucket',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var url = getUrl({
            protocol: self.options.Protocol,
            domain: self.options.Domain,
            bucket: params.Bucket,
            region: params.Region,
            isLocation: true,
        });
        callback(null, {
            Location: url,
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 查看是否存在该Bucket，是否有权限访问
 * @param  {Object}  params                     参数对象，必须
 *     @param  {String}  params.Bucket          Bucket名称，必须
 *     @param  {String}  params.Region          地域名称，必须
 * @param  {Function}  callback                 回调函数，必须
 * @return  {Object}  err                       请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                      返回的数据
 *     @return  {Boolean}  data.BucketExist     Bucket是否存在
 *     @return  {Boolean}  data.BucketAuth      是否有 Bucket 的访问权限
 */
function headBucket(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:HeadBucket',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        method: 'HEAD',
    }, function (err, data) {
        callback(err, data);
    });
}

/**
 * 获取 Bucket 下的 object 列表
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 *     @param  {String}  params.Prefix              前缀匹配，用来规定返回的文件前缀地址，非必须
 *     @param  {String}  params.Delimiter           定界符为一个符号，如果有Prefix，则将Prefix到delimiter之间的相同路径归为一类，非必须
 *     @param  {String}  params.Marker              默认以UTF-8二进制顺序列出条目，所有列出条目从marker开始，非必须
 *     @param  {String}  params.MaxKeys             单次返回最大的条目数量，默认1000，非必须
 *     @param  {String}  params.EncodingType        规定返回值的编码方式，非必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          返回的数据
 *     @return  {Object}  data.ListBucketResult     返回的 object 列表信息
 */
function getBucket(params, callback) {
    var reqParams = {};
    reqParams['prefix'] = params['Prefix'] || '';
    reqParams['delimiter'] = params['Delimiter'];
    reqParams['marker'] = params['Marker'];
    reqParams['max-keys'] = params['MaxKeys'];
    reqParams['encoding-type'] = params['EncodingType'];

    submitRequest.call(this, {
        Action: 'name/cos:GetBucket',
        ResourceKey: reqParams['prefix'],
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        qs: reqParams,
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var ListBucketResult = data.ListBucketResult || {};
        var Contents = ListBucketResult.Contents || [];
        var CommonPrefixes = ListBucketResult.CommonPrefixes || [];

        Contents = util.isArray(Contents) ? Contents : [Contents];
        CommonPrefixes = util.isArray(CommonPrefixes) ? CommonPrefixes : [CommonPrefixes];

        var result = util.clone(ListBucketResult);
        util.extend(result, {
            Contents: Contents,
            CommonPrefixes: CommonPrefixes,
            statusCode: data.statusCode,
            headers: data.headers,
        });

        callback(null, result);
    });
}

/**
 * 删除 Bucket
 * @param  {Object}  params                 参数对象，必须
 *     @param  {String}  params.Bucket      Bucket名称，必须
 *     @param  {String}  params.Region      地域名称，必须
 * @param  {Function}  callback             回调函数，必须
 * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                  返回的数据
 *     @return  {String}  data.Location     操作地址
 */
function deleteBucket(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucket',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        method: 'DELETE',
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, {statusCode: err.statusCode});
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 设置 Bucket 的 权限列表
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 *     @param  {String}  params.ACL                 用户自定义文件权限，可以设置：private，public-read；默认值：private，非必须
 *     @param  {String}  params.GrantRead           赋予被授权者读的权限，格式x-cos-grant-read: uin=" ",uin=" "，非必须
 *     @param  {String}  params.GrantWrite          赋予被授权者写的权限，格式x-cos-grant-write: uin=" ",uin=" "，非必须
 *     @param  {String}  params.GrantFullControl    赋予被授权者读写权限，格式x-cos-grant-full-control: uin=" ",uin=" "，非必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          返回的数据
 */
function putBucketAcl(params, callback) {
    var headers = params.Headers;

    var xml = '';
    if (params['AccessControlPolicy']) {
        var AccessControlPolicy = util.clone(params['AccessControlPolicy'] || {});
        var Grants = AccessControlPolicy.Grants || AccessControlPolicy.Grant;
        Grants = util.isArray(Grants) ? Grants : [Grants];
        delete AccessControlPolicy.Grant;
        delete AccessControlPolicy.Grants;
        AccessControlPolicy.AccessControlList = {Grant: Grants};
        xml = util.json2xml({AccessControlPolicy: AccessControlPolicy});

        headers['Content-Type'] = 'application/xml';
        headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
    }

    // Grant Header 去重
    util.each(headers, function (val, key) {
        if (key.indexOf('x-cos-grant-') === 0) {
            headers[key] = uniqGrant(headers[key]);
        }
    });

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketACL',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: headers,
        action: 'acl',
        body: xml,
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 获取 Bucket 的 权限列表
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          返回的数据
 *     @return  {Object}  data.AccessControlPolicy  访问权限信息
 */
function getBucketAcl(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:GetBucketACL',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'acl',
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var AccessControlPolicy = data.AccessControlPolicy || {};
        var Owner = AccessControlPolicy.Owner || {};
        var Grant = AccessControlPolicy.AccessControlList.Grant || [];
        Grant = util.isArray(Grant) ? Grant : [Grant];
        var result = decodeAcl(AccessControlPolicy);
        if (data.headers && data.headers['x-cos-acl']) {
            result.ACL = data.headers['x-cos-acl'];
        }
        result = util.extend(result, {
            Owner: Owner,
            Grants: Grant,
            statusCode: data.statusCode,
            headers: data.headers,
        });
        callback(null, result);
    });
}

/**
 * 设置 Bucket 的 跨域设置
 * @param  {Object}  params                             参数对象，必须
 *     @param  {String}  params.Bucket                  Bucket名称，必须
 *     @param  {String}  params.Region                  地域名称，必须
 *     @param  {Object}  params.CORSConfiguration       相关的跨域设置，必须
 * @param  {Array}  params.CORSConfiguration.CORSRules  对应的跨域规则
 * @param  {Function}  callback                         回调函数，必须
 * @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                              返回的数据
 */
function putBucketCors(params, callback) {

    var CORSConfiguration = params['CORSConfiguration'] || {};
    var CORSRules = CORSConfiguration['CORSRules'] || params['CORSRules'] || [];
    CORSRules = util.clone(util.isArray(CORSRules) ? CORSRules : [CORSRules]);
    util.each(CORSRules, function (rule) {
        util.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], function (key, k) {
            var sKey = key + 's';
            var val = rule[sKey] || rule[key] || [];
            delete rule[sKey];
            rule[key] = util.isArray(val) ? val : [val];
        });
    });

    var xml = util.json2xml({CORSConfiguration: {CORSRule: CORSRules}});

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketCORS',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'cors',
        headers: headers,
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 获取 Bucket 的 跨域设置
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          返回的数据
 *     @return  {Object}  data.CORSRules            Bucket的跨域设置
 */
function getBucketCors(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketCORS',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'cors',
    }, function (err, data) {
        if (err) {
            if (err.statusCode === 404 && err.error && err.error.Code === 'NoSuchCORSConfiguration') {
                var result = {
                    CORSRules: [],
                    statusCode: err.statusCode,
                };
                err.headers && (result.headers = err.headers);
                callback(null, result);
            } else {
                callback(err);
            }
            return;
        }
        var CORSConfiguration = data.CORSConfiguration || {};
        var CORSRules = CORSConfiguration.CORSRules || CORSConfiguration.CORSRule || [];
        CORSRules = util.clone(util.isArray(CORSRules) ? CORSRules : [CORSRules]);

        util.each(CORSRules, function (rule) {
            util.each(['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'], function (key, j) {
                var sKey = key + 's';
                var val = rule[sKey] || rule[key] || [];
                delete rule[key];
                rule[sKey] = util.isArray(val) ? val : [val];
            });
        });

        callback(null, {
            CORSRules: CORSRules,
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 删除 Bucket 的 跨域设置
 * @param  {Object}  params                 参数对象，必须
 *     @param  {String}  params.Bucket      Bucket名称，必须
 *     @param  {String}  params.Region      地域名称，必须
 * @param  {Function}  callback             回调函数，必须
 * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                  返回的数据
 */
function deleteBucketCors(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketCORS',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'cors',
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, {statusCode: err.statusCode});
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode || err.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 获取 Bucket 的 地域信息
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据，包含地域信息 LocationConstraint
 */
function getBucketLocation(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketLocation',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'location',
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
}

function putBucketPolicy(params, callback) {
    var Policy = params['Policy'];
    var PolicyStr = Policy;
    try {
        if (typeof Policy === 'string') {
            Policy = JSON.parse(PolicyStr);
        } else {
            PolicyStr = JSON.stringify(Policy);
        }
    } catch (e) {
        callback({error: 'Policy format error'});
    }

    var headers = params.Headers;
    headers['Content-Type'] = 'application/json';
    headers['Content-MD5'] = util.binaryBase64(util.md5(PolicyStr));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketPolicy',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        action: 'policy',
        body: util.isBrowser ? PolicyStr : Policy,
        headers: headers,
        json: true,
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, {statusCode: err.statusCode});
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 获取 Bucket 的读取权限策略
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function getBucketPolicy(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketPolicy',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'policy',
        rawBody: true,
    }, function (err, data) {
        if (err) {
            if (err.statusCode && err.statusCode === 403) {
                return callback({ErrorStatus: 'Access Denied'});
            }
            if (err.statusCode && err.statusCode === 405) {
                return callback({ErrorStatus: 'Method Not Allowed'});
            }
            if (err.statusCode && err.statusCode === 404) {
                return callback({ErrorStatus: 'Policy Not Found'});
            }
            return callback(err);
        }
        var Policy = {};
        try {
            Policy = JSON.parse(data.body);
        } catch (e) {
        }
        callback(null, {
            Policy: Policy,
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 删除 Bucket 的 跨域设置
 * @param  {Object}  params                 参数对象，必须
 *     @param  {String}  params.Bucket      Bucket名称，必须
 *     @param  {String}  params.Region      地域名称，必须
 * @param  {Function}  callback             回调函数，必须
 * @return  {Object}  err                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                  返回的数据
 */
function deleteBucketPolicy(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketPolicy',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'policy',
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, {statusCode: err.statusCode});
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode || err.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 设置 Bucket 的标签
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 *     @param  {Array}   params.TagSet  标签设置，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function putBucketTagging(params, callback) {

    var Tagging = params['Tagging'] || {};
    var Tags = Tagging.TagSet || Tagging.Tags || params['Tags'] || [];
    Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);
    var xml = util.json2xml({Tagging: {TagSet: {Tag: Tags}}});

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketTagging',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'tagging',
        headers: headers,
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, {statusCode: err.statusCode});
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 获取 Bucket 的标签设置
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function getBucketTagging(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:GetBucketTagging',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'tagging',
    }, function (err, data) {
        if (err) {
            if (err.statusCode === 404 && err.error && (err.error === "Not Found" || err.error.Code === 'NoSuchTagSet')) {
                var result = {
                    Tags: [],
                    statusCode: err.statusCode,
                };
                err.headers && (result.headers = err.headers);
                callback(null, result);
            } else {
                callback(err);
            }
            return;
        }
        var Tags = [];
        try {
            Tags = data.Tagging.TagSet.Tag || [];
        } catch (e) {
        }
        Tags = util.clone(util.isArray(Tags) ? Tags : [Tags]);
        callback(null, {
            Tags: Tags,
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 删除 Bucket 的 标签设置
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回的数据
 */
function deleteBucketTagging(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketTagging',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'tagging',
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, {statusCode: err.statusCode});
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

function putBucketLifecycle(params, callback) {

    var LifecycleConfiguration = params['LifecycleConfiguration'] || {};
    var Rules = LifecycleConfiguration.Rules || params.Rules || [];
    Rules = util.clone(Rules);
    var xml = util.json2xml({LifecycleConfiguration: {Rule: Rules}});

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketLifecycle',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'lifecycle',
        headers: headers,
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, {statusCode: err.statusCode});
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

function getBucketLifecycle(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketLifecycle',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'lifecycle',
    }, function (err, data) {
        if (err) {
            if (err.statusCode === 404 && err.error && err.error.Code === 'NoSuchLifecycleConfiguration') {
                var result = {
                    Rules: [],
                    statusCode: err.statusCode,
                };
                err.headers && (result.headers = err.headers);
                callback(null, result);
            } else {
                callback(err);
            }
            return;
        }
        var Rules = [];
        try {
            Rules = data.LifecycleConfiguration.Rule || [];
        } catch (e) {
        }
        Rules = util.clone(util.isArray(Rules) ? Rules : [Rules]);
        callback(null, {
            Rules: Rules,
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

function deleteBucketLifecycle(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketLifecycle',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'lifecycle',
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, {statusCode: err.statusCode});
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

function putBucketVersioning(params, callback) {

    if (!params['VersioningConfiguration']) {
        callback({error: 'missing param VersioningConfiguration'});
        return;
    }
    var VersioningConfiguration = params['VersioningConfiguration'] || {};
    var xml = util.json2xml({VersioningConfiguration: VersioningConfiguration});

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketVersioning',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'versioning',
        headers: headers,
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, {statusCode: err.statusCode});
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

function getBucketVersioning(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketVersioning',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'versioning',
    }, function (err, data) {
        if (!err) {
            !data.VersioningConfiguration && (data.VersioningConfiguration = {});
        }
        callback(err, data);
    });
}

function putBucketReplication(params, callback) {
    var ReplicationConfiguration = util.clone(params.ReplicationConfiguration);
    var xml = util.json2xml({ReplicationConfiguration: ReplicationConfiguration});
    xml = xml.replace(/<(\/?)Rules>/ig, '<$1Rule>');
    xml = xml.replace(/<(\/?)Tags>/ig, '<$1Tag>');

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketReplication',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'replication',
        headers: headers,
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, {statusCode: err.statusCode});
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

function getBucketReplication(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:GetBucketReplication',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'replication',
    }, function (err, data) {
        if (err) {
            if (err.statusCode === 404 && err.error && (err.error === 'Not Found' || err.error.Code === 'ReplicationConfigurationnotFoundError')) {
                var result = {
                    ReplicationConfiguration: {Rules: []},
                    statusCode: err.statusCode,
                };
                err.headers && (result.headers = err.headers);
                callback(null, result);
            } else {
                callback(err);
            }
            return;
        }
        if (!err) {
            !data.ReplicationConfiguration && (data.ReplicationConfiguration = {});
        }
        if (data.ReplicationConfiguration.Rule) {
            data.ReplicationConfiguration.Rules = data.ReplicationConfiguration.Rule;
            delete data.ReplicationConfiguration.Rule;
        }
        callback(err, data);
    });
}

function deleteBucketReplication(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketReplication',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'replication',
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, {statusCode: err.statusCode});
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 设置 Bucket 静态网站配置信息
 * @param  {Object}  params                                                 参数对象，必须
 *     @param  {String}  params.Bucket                                      Bucket名称，必须
 *     @param  {String}  params.Region                                      地域名称，必须
 *     @param  {Object}  params.WebsiteConfiguration                        地域名称，必须
 *         @param  {Object}   WebsiteConfiguration.IndexDocument            索引文档，必须
 *         @param  {Object}   WebsiteConfiguration.ErrorDocument            错误文档，非必须
 *         @param  {Object}   WebsiteConfiguration.RedirectAllRequestsTo    重定向所有请求，非必须
 *         @param  {Array}   params.RoutingRules                            重定向规则，非必须
 * @param  {Function}  callback                                             回调函数，必须
 * @return  {Object}  err                                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                                  返回数据
 */
function putBucketWebsite(params, callback) {

    if (!params['WebsiteConfiguration']) {
        callback({ error: 'missing param WebsiteConfiguration' });
        return;
    }

    var WebsiteConfiguration = util.clone(params['WebsiteConfiguration'] || {});
    var RoutingRules = WebsiteConfiguration['RoutingRules'] || WebsiteConfiguration['RoutingRule'] || [];
    RoutingRules = util.isArray(RoutingRules) ? RoutingRules : [RoutingRules];
    delete WebsiteConfiguration.RoutingRule;
    delete WebsiteConfiguration.RoutingRules;
    RoutingRules.length > 0 && (WebsiteConfiguration.RoutingRules = { RoutingRule: RoutingRules });
    var xml = util.json2xml({ WebsiteConfiguration: WebsiteConfiguration });

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:PutBucketWebsite',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'website',
        headers: headers,
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, {statusCode: err.statusCode});
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 获取 Bucket 的静态网站配置信息
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function getBucketWebsite(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:GetBucketWebsite',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: params.Headers,
        action: 'website',
    }, function (err, data) {
        if (err) {
            if(err.statusCode === 404 && err.error.Code === 'NoSuchWebsiteConfiguration'){
                var result = {
                    WebsiteConfiguration: {},
                    statusCode: err.statusCode,
                };
                err.headers && (result.headers = err.headers);
                callback(null, result);
            } else {
                callback(err);
            }
            return;
        }

        var WebsiteConfiguration = data.WebsiteConfiguration || {};
        if (WebsiteConfiguration['RoutingRules']) {
            var RoutingRules = util.clone(WebsiteConfiguration['RoutingRules'].RoutingRule || []);
            RoutingRules = util.makeArray(RoutingRules);
            WebsiteConfiguration.RoutingRules = RoutingRules;
        }

        callback(null, {
            WebsiteConfiguration: WebsiteConfiguration,
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 删除 Bucket 的静态网站配置
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回数据
 */
function deleteBucketWebsite(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:DeleteBucketWebsite',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        action: 'website',
    }, function (err, data) {
        if (err && err.statusCode === 204) {
            return callback(null, {statusCode: err.statusCode});
        } else if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

// Object 相关

/**
 * 取回对应Object的元数据，Head的权限与Get的权限一致
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 *     @param  {String}  params.Key                 文件名称，必须
 *     @param  {String}  params.IfModifiedSince     当Object在指定时间后被修改，则返回对应Object元信息，否则返回304，非必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          为指定 object 的元数据，如果设置了 IfModifiedSince ，且文件未修改，则返回一个对象，NotModified 属性为 true
 *     @return  {Boolean}  data.NotModified         是否在 IfModifiedSince 时间点之后未修改该 object，则为 true
 */
function headObject(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:HeadObject',
        method: 'HEAD',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        VersionId: params.VersionId,
        headers: params.Headers,
    }, function (err, data) {
        if (err) {
            var statusCode = err.statusCode;
            if (params.Headers['If-Modified-Since'] && statusCode && statusCode === 304) {
                return callback(null, {
                    NotModified: true,
                    statusCode: statusCode,
                });
            }
            return callback(err);
        }
        if (data.headers && data.headers.etag) {
            data.ETag = data.headers && data.headers.etag;
        }
        callback(null, data);
    });
}


function listObjectVersions(params, callback) {
    var reqParams = {};
    reqParams['prefix'] = params['Prefix'] || '';
    reqParams['delimiter'] = params['Delimiter'];
    reqParams['key-marker'] = params['KeyMarker'];
    reqParams['version-id-marker'] = params['VersionIdMarker'];
    reqParams['max-keys'] = params['MaxKeys'];
    reqParams['encoding-type'] = params['EncodingType'];

    submitRequest.call(this, {
        Action: 'name/cos:GetBucketObjectVersions',
        ResourceKey: reqParams['prefix'],
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        qs: reqParams,
        action: 'versions',
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var ListVersionsResult = data.ListVersionsResult || {};
        var DeleteMarkers = ListVersionsResult.DeleteMarker || [];
        DeleteMarkers = util.isArray(DeleteMarkers) ? DeleteMarkers : [DeleteMarkers];
        var Versions = ListVersionsResult.Version || [];
        Versions = util.isArray(Versions) ? Versions : [Versions];

        var result = util.clone(ListVersionsResult);
        delete result.DeleteMarker;
        delete result.Version;
        util.extend(result, {
            DeleteMarkers: DeleteMarkers,
            Versions: Versions,
            statusCode: data.statusCode,
            headers: data.headers,
        });

        callback(null, result);
    });
}

/**
 * 下载 object
 * @param  {Object}  params                                 参数对象，必须
 *     @param  {String}  params.Bucket                      Bucket名称，必须
 *     @param  {String}  params.Region                      地域名称，必须
 *     @param  {String}  params.Key                         文件名称，必须
 *     @param  {WriteStream}  params.Output                 文件写入流，非必须
 *     @param  {String}  params.IfModifiedSince             当Object在指定时间后被修改，则返回对应Object元信息，否则返回304，非必须
 *     @param  {String}  params.IfUnmodifiedSince           如果文件修改时间早于或等于指定时间，才返回文件内容。否则返回 412 (precondition failed)，非必须
 *     @param  {String}  params.IfMatch                     当 ETag 与指定的内容一致，才返回文件。否则返回 412 (precondition failed)，非必须
 *     @param  {String}  params.IfNoneMatch                 当 ETag 与指定的内容不一致，才返回文件。否则返回304 (not modified)，非必须
 *     @param  {String}  params.ResponseContentType         设置返回头部中的 Content-Type 参数，非必须
 *     @param  {String}  params.ResponseContentLanguage     设置返回头部中的 Content-Language 参数，非必须
 *     @param  {String}  params.ResponseExpires             设置返回头部中的 Content-Expires 参数，非必须
 *     @param  {String}  params.ResponseCacheControl        设置返回头部中的 Cache-Control 参数，非必须
 *     @param  {String}  params.ResponseContentDisposition  设置返回头部中的 Content-Disposition 参数，非必须
 *     @param  {String}  params.ResponseContentEncoding     设置返回头部中的 Content-Encoding 参数，非必须
 * @param  {Function}  callback                             回调函数，必须
 * @param  {Object}  err                                    请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @param  {Object}  data                                   为对应的 object 数据，包括 body 和 headers
 */
function getObject(params, callback) {
    var reqParams = {};

    reqParams['response-content-type'] = params['ResponseContentType'];
    reqParams['response-content-language'] = params['ResponseContentLanguage'];
    reqParams['response-expires'] = params['ResponseExpires'];
    reqParams['response-cache-control'] = params['ResponseCacheControl'];
    reqParams['response-content-disposition'] = params['ResponseContentDisposition'];
    reqParams['response-content-encoding'] = params['ResponseContentEncoding'];

    // 如果用户自己传入了 output
    submitRequest.call(this, {
        Action: 'name/cos:GetObject',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        VersionId: params.VersionId,
        headers: params.Headers,
        qs: reqParams,
        rawBody: true,
    }, function (err, data) {
        if (err) {
            var statusCode = err.statusCode;
            if (params.Headers['If-Modified-Since'] && statusCode && statusCode === 304) {
                return callback(null, {
                    NotModified: true
                });
            }
            return callback(err);
        }
        var result = {};
        result.Body = data.body;
        if (data.headers && data.headers.etag) {
            result.ETag = data.headers && data.headers.etag;
        }
        util.extend(result, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
        callback(null, result);
    });

}

/**
 * 上传 object
 * @param  {Object} params                                          参数对象，必须
 *     @param  {String}  params.Bucket                              Bucket名称，必须
 *     @param  {String}  params.Region                              地域名称，必须
 *     @param  {String}  params.Key                                 文件名称，必须
 *     @param  {File || Blob || String}  params.Body                上传文件对象或字符串，必须
 *     @param  {String}  params.CacheControl                        RFC 2616 中定义的缓存策略，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentDisposition                  RFC 2616 中定义的文件名称，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentEncoding                     RFC 2616 中定义的编码格式，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentLength                       RFC 2616 中定义的 HTTP 请求内容长度（字节），必须
 *     @param  {String}  params.ContentType                         RFC 2616 中定义的内容类型（MIME），将作为 Object 元数据保存，非必须
 *     @param  {String}  params.Expect                              当使用 Expect: 100-continue 时，在收到服务端确认后，才会发送请求内容，非必须
 *     @param  {String}  params.Expires                             RFC 2616 中定义的过期时间，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ACL                                 允许用户自定义文件权限，有效值：private | public-read，非必须
 *     @param  {String}  params.GrantRead                           赋予被授权者读取对象的权限，格式：id="[OwnerUin]"，可使用半角逗号（,）分隔多组被授权者，非必须
 *     @param  {String}  params.GrantReadAcp                        赋予被授权者读取对象的访问控制列表（ACL）的权限，格式：id="[OwnerUin]"，可使用半角逗号（,）分隔多组被授权者，非必须
 *     @param  {String}  params.GrantWriteAcp                       赋予被授权者写入对象的访问控制列表（ACL）的权限，格式：id="[OwnerUin]"，可使用半角逗号（,）分隔多组被授权者，非必须
 *     @param  {String}  params.GrantFullControl                    赋予被授权者操作对象的所有权限，格式：id="[OwnerUin]"，可使用半角逗号（,）分隔多组被授权者，非必须
 *     @param  {String}  params.StorageClass                        设置对象的存储级别，枚举值：STANDARD、STANDARD_IA、ARCHIVE，默认值：STANDARD，非必须
 *     @param  {String}  params.x-cos-meta-*                        允许用户自定义的头部信息，将作为对象的元数据保存。大小限制2KB，非必须
 *     @param  {String}  params.ContentSha1                         RFC 3174 中定义的 160-bit 内容 SHA-1 算法校验，非必须
 *     @param  {String}  params.ServerSideEncryption                支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: "AES256"，非必须
 *     @param  {Function}  params.onProgress                        上传进度回调函数
 * @param  {Function}  callback                                     回调函数，必须
 * @return  {Object}  err                                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                          为对应的 object 数据
 *     @return  {String}  data.ETag                                 为对应上传文件的 ETag 值
 */
function putObject(params, callback) {
    var self = this;
    var FileSize = params.ContentLength;
    var onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);

    // 特殊处理 Cache-Control
    var headers = params.Headers;
    !headers['Cache-Control'] && (headers['Cache-Control'] = '');

    // 获取 File 或 Blob 的 type 属性，如果有，作为文件 Content-Type
    var ContentType = headers['Content-Type'] || (params.Body && params.Body.type);
    !headers['Content-Type'] && ContentType && (headers['Content-Type'] = ContentType);

    var needCalcMd5 = params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5 || self.options.UploadCheckContentMd5;
    util.getBodyMd5(needCalcMd5, params.Body, function (md5) {
        if (md5) {
            if (self.options.UploadCheckContentMd5) params.Headers['Content-MD5'] = util.binaryBase64(md5);
            if (params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5) params.Headers['x-cos-meta-md5'] = md5;
        }

        if (params.ContentLength !== undefined) {
            params.Headers['Content-Length'] = params.ContentLength;
        }
        onProgress(null, true); // 任务状态开始 uploading
        submitRequest.call(self, {
            Action: 'name/cos:PutObject',
            TaskId: params.TaskId,
            method: 'PUT',
            Bucket: params.Bucket,
            Region: params.Region,
            Key: params.Key,
            headers: params.Headers,
            body: params.Body,
            onProgress: onProgress,
        }, function (err, data) {
            if (err) {
                onProgress(null, true);
                return callback(err);
            }
            onProgress({loaded: FileSize, total: FileSize}, true);
            if (data) {
                var url = getUrl({
                    ForcePathStyle: self.options.ForcePathStyle,
                    protocol: self.options.Protocol,
                    domain: self.options.Domain,
                    bucket: params.Bucket,
                    region: params.Region,
                    object: params.Key,
                });
                url = url.substr(url.indexOf('://') + 3);
                var result = {
                    Location: url,
                    statusCode: data.statusCode,
                    headers: data.headers,
                };
                if (data.headers && data.headers.etag) {
                    result.ETag = data.headers.etag;
                }
                return callback(null, result);
            }
            callback(null, data);
        });
    }, params.onHashProgress);
}

/**
 * 删除 object
 * @param  {Object}  params                     参数对象，必须
 *     @param  {String}  params.Bucket          Bucket名称，必须
 *     @param  {String}  params.Region          地域名称，必须
 *     @param  {String}  params.Key             object名称，必须
 * @param  {Function}  callback                 回调函数，必须
 * @param  {Object}  err                        请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @param  {Object}  data                       删除操作成功之后返回的数据
 */
function deleteObject(params, callback) {
    submitRequest.call(this, {
        Action: 'name/cos:DeleteObject',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: params.Headers,
        VersionId: params.VersionId,
    }, function (err, data) {
        if (err) {
            var statusCode = err.statusCode;
            if (statusCode && statusCode === 204) {
                return callback(null, {statusCode: statusCode});
            } else if (statusCode && statusCode === 404) {
                return callback(null, {BucketNotFound: true, statusCode: statusCode,});
            } else {
                return callback(err);
            }
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 获取 object 的 权限列表
 * @param  {Object}  params                         参数对象，必须
 *     @param  {String}  params.Bucket              Bucket名称，必须
 *     @param  {String}  params.Region              地域名称，必须
 *     @param  {String}  params.Key                 object名称，必须
 * @param  {Function}  callback                     回调函数，必须
 * @return  {Object}  err                           请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                          返回的数据
 *     @return  {Object}  data.AccessControlPolicy  权限列表
 */
function getObjectAcl(params, callback) {

    submitRequest.call(this, {
        Action: 'name/cos:GetObjectACL',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: params.Headers,
        action: 'acl',
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var AccessControlPolicy = data.AccessControlPolicy || {};
        var Owner = AccessControlPolicy.Owner || {};
        var Grant = AccessControlPolicy.AccessControlList && AccessControlPolicy.AccessControlList.Grant || [];
        Grant = util.isArray(Grant) ? Grant : [Grant];
        var result = decodeAcl(AccessControlPolicy);
        if (data.headers && data.headers['x-cos-acl']) {
            result.ACL = data.headers['x-cos-acl'];
        }
        result = util.extend(result, {
            Owner: Owner,
            Grants: Grant,
            statusCode: data.statusCode,
            headers: data.headers,
        });
        callback(null, result);
    });
}

/**
 * 设置 object 的 权限列表
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 *     @param  {String}  params.Key     object名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回的数据
 */
function putObjectAcl(params, callback) {
    var headers = params.Headers;

    var xml = '';
    if (params['AccessControlPolicy']) {
        var AccessControlPolicy = util.clone(params['AccessControlPolicy'] || {});
        var Grants = AccessControlPolicy.Grants || AccessControlPolicy.Grant;
        Grants = util.isArray(Grants) ? Grants : [Grants];
        delete AccessControlPolicy.Grant;
        delete AccessControlPolicy.Grants;
        AccessControlPolicy.AccessControlList = {Grant: Grants};
        xml = util.json2xml({AccessControlPolicy: AccessControlPolicy});

        headers['Content-Type'] = 'application/xml';
        headers['Content-MD5'] = util.binaryBase64(util.md5(xml));
    }

    // Grant Header 去重
    util.each(headers, function (val, key) {
        if (key.indexOf('x-cos-grant-') === 0) {
            headers[key] = uniqGrant(headers[key]);
        }
    });

    submitRequest.call(this, {
        Action: 'name/cos:PutObjectACL',
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        action: 'acl',
        headers: headers,
        body: xml,
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * Options Object请求实现跨域访问的预请求。即发出一个 OPTIONS 请求给服务器以确认是否可以进行跨域操作。
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Bucket  Bucket名称，必须
 *     @param  {String}  params.Region  地域名称，必须
 *     @param  {String}  params.Key     object名称，必须
 * @param  {Function}  callback         回调函数，必须
 * @return  {Object}  err               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data              返回的数据
 */
function optionsObject(params, callback) {

    var headers = params.Headers;
    headers['Origin'] = params['Origin'];
    headers['Access-Control-Request-Method'] = params['AccessControlRequestMethod'];
    headers['Access-Control-Request-Headers'] = params['AccessControlRequestHeaders'];

    submitRequest.call(this, {
        Action: 'name/cos:OptionsObject',
        method: 'OPTIONS',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: headers,
    }, function (err, data) {
        if (err) {
            if (err.statusCode && err.statusCode === 403) {
                return callback(null, {
                    OptionsForbidden: true,
                    statusCode: err.statusCode
                });
            }
            return callback(err);
        }

        var headers = data.headers || {};
        callback(null, {
            AccessControlAllowOrigin: headers['access-control-allow-origin'],
            AccessControlAllowMethods: headers['access-control-allow-methods'],
            AccessControlAllowHeaders: headers['access-control-allow-headers'],
            AccessControlExposeHeaders: headers['access-control-expose-headers'],
            AccessControlMaxAge: headers['access-control-max-age'],
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * @param  {Object}                                     参数列表
 *     @param  {String}  Bucket                         Bucket 名称
 *     @param  {String}  Region                         地域名称
 *     @param  {String}  Key                            文件名称
 *     @param  {String}  CopySource                     源文件URL绝对路径，可以通过versionid子资源指定历史版本
 *     @param  {String}  ACL                            允许用户自定义文件权限。有效值：private，public-read默认值：private。
 *     @param  {String}  GrantRead                      赋予被授权者读的权限，格式 x-cos-grant-read: uin=" ",uin=" "，当需要给子账户授权时，uin="RootAcountID/SubAccountID"，当需要给根账户授权时，uin="RootAcountID"。
 *     @param  {String}  GrantWrite                     赋予被授权者写的权限，格式 x-cos-grant-write: uin=" ",uin=" "，当需要给子账户授权时，uin="RootAcountID/SubAccountID"，当需要给根账户授权时，uin="RootAcountID"。
 *     @param  {String}  GrantFullControl               赋予被授权者读写权限，格式 x-cos-grant-full-control: uin=" ",uin=" "，当需要给子账户授权时，uin="RootAcountID/SubAccountID"，当需要给根账户授权时，uin="RootAcountID"。
 *     @param  {String}  MetadataDirective              是否拷贝元数据，枚举值：Copy, Replaced，默认值Copy。假如标记为Copy，忽略Header中的用户元数据信息直接复制；假如标记为Replaced，按Header信息修改元数据。当目标路径和原路径一致，即用户试图修改元数据时，必须为Replaced
 *     @param  {String}  CopySourceIfModifiedSince      当Object在指定时间后被修改，则执行操作，否则返回412。可与x-cos-copy-source-If-None-Match一起使用，与其他条件联合使用返回冲突。
 *     @param  {String}  CopySourceIfUnmodifiedSince    当Object在指定时间后未被修改，则执行操作，否则返回412。可与x-cos-copy-source-If-Match一起使用，与其他条件联合使用返回冲突。
 *     @param  {String}  CopySourceIfMatch              当Object的Etag和给定一致时，则执行操作，否则返回412。可与x-cos-copy-source-If-Unmodified-Since一起使用，与其他条件联合使用返回冲突。
 *     @param  {String}  CopySourceIfNoneMatch          当Object的Etag和给定不一致时，则执行操作，否则返回412。可与x-cos-copy-source-If-Modified-Since一起使用，与其他条件联合使用返回冲突。
 *     @param  {String}  StorageClass                   存储级别，枚举值：存储级别，枚举值：Standard, Standard_IA，Archive；默认值：Standard
 *     @param  {String}  CacheControl                   指定所有缓存机制在整个请求/响应链中必须服从的指令。
 *     @param  {String}  ContentDisposition             MIME 协议的扩展，MIME 协议指示 MIME 用户代理如何显示附加的文件
 *     @param  {String}  ContentEncoding                HTTP 中用来对「采用何种编码格式传输正文」进行协定的一对头部字段
 *     @param  {String}  ContentLength                  设置响应消息的实体内容的大小，单位为字节
 *     @param  {String}  ContentType                    RFC 2616 中定义的 HTTP 请求内容类型（MIME），例如text/plain
 *     @param  {String}  Expect                         请求的特定的服务器行为
 *     @param  {String}  Expires                        响应过期的日期和时间
 *     @param  {String}  params.ServerSideEncryption   支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: "AES256"，非必须
 *     @param  {String}  ContentLanguage                指定内容语言
 *     @param  {String}  x-cos-meta-*                   允许用户自定义的头部信息，将作为 Object 元数据返回。大小限制2K。
 */
function putObjectCopy(params, callback) {

    // 特殊处理 Cache-Control
    var headers = params.Headers;
    !headers['Cache-Control'] && (headers['Cache-Control'] = '');

    var CopySource = params.CopySource || '';
    var m = CopySource.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/);
    if (!m) {
        callback({error: 'CopySource format error'});
        return;
    }

    var SourceBucket = m[1];
    var SourceRegion = m[3];
    var SourceKey = decodeURIComponent(m[4]);

    submitRequest.call(this, {
        Scope: [{
            action: 'name/cos:GetObject',
            bucket: SourceBucket,
            region: SourceRegion,
            prefix: SourceKey,
        }, {
            action: 'name/cos:PutObject',
            bucket: params.Bucket,
            region: params.Region,
            prefix: params.Key,
        }],
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        VersionId: params.VersionId,
        headers: params.Headers,
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var result = util.clone(data.CopyObjectResult || {});
        util.extend(result, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
        callback(null, result);
    });
}

function uploadPartCopy(params, callback) {

    var CopySource = params.CopySource || '';
    var m = CopySource.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/);
    if (!m) {
        callback({error: 'CopySource format error'});
        return;
    }

    var SourceBucket = m[1];
    var SourceRegion = m[3];
    var SourceKey = decodeURIComponent(m[4]);

    submitRequest.call(this, {
        Scope: [{
            action: 'name/cos:GetObject',
            bucket: SourceBucket,
            region: SourceRegion,
            prefix: SourceKey,
        }, {
            action: 'name/cos:PutObject',
            bucket: params.Bucket,
            region: params.Region,
            prefix: params.Key,
        }],
        method: 'PUT',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        VersionId: params.VersionId,
        qs: {
            partNumber: params['PartNumber'],
            uploadId: params['UploadId'],
        },
        headers: params.Headers,
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var result = util.clone(data.CopyPartResult || {});
        util.extend(result, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
        callback(null, result);
    });
}

function deleteMultipleObject(params, callback) {
    var Objects = params.Objects || [];
    var Quiet = params.Quiet;
    Objects = util.isArray(Objects) ? Objects : [Objects];

    var xml = util.json2xml({Delete: {Object: Objects, Quiet: Quiet || false}});

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    var Scope = util.map(Objects, function (v) {
        return {
            action: 'name/cos:DeleteObject',
            bucket: params.Bucket,
            region: params.Region,
            prefix: v.Key,
        };
    });

    submitRequest.call(this, {
        Scope: Scope,
        method: 'POST',
        Bucket: params.Bucket,
        Region: params.Region,
        body: xml,
        action: 'delete',
        headers: headers,
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var DeleteResult = data.DeleteResult || {};
        var Deleted = DeleteResult.Deleted || [];
        var Errors = DeleteResult.Error || [];

        Deleted = util.isArray(Deleted) ? Deleted : [Deleted];
        Errors = util.isArray(Errors) ? Errors : [Errors];

        var result = util.clone(DeleteResult);
        util.extend(result, {
            Error: Errors,
            Deleted: Deleted,
            statusCode: data.statusCode,
            headers: data.headers,
        });
        callback(null, result);
    });
}

function restoreObject(params, callback) {
    var headers = params.Headers;
    if (!params['RestoreRequest']) {
        callback({error: 'missing param RestoreRequest'});
        return;
    }

    var RestoreRequest = params.RestoreRequest || {};
    var xml = util.json2xml({RestoreRequest: RestoreRequest});

    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:RestoreObject',
        method: 'POST',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        VersionId: params.VersionId,
        body: xml,
        action: 'restore',
        headers: headers,
    }, function (err, data) {
        callback(err, data);
    });
}


// 分块上传


/**
 * 初始化分块上传
 * @param  {Object}  params                                     参数对象，必须
 *     @param  {String}  params.Bucket                          Bucket名称，必须
 *     @param  {String}  params.Region                          地域名称，必须
 *     @param  {String}  params.Key                             object名称，必须
 *     @param  {String}  params.UploadId                        object名称，必须
 *     @param  {String}  params.CacheControl                    RFC 2616 中定义的缓存策略，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentDisposition              RFC 2616 中定义的文件名称，将作为 Object 元数据保存    ，非必须
 *     @param  {String}  params.ContentEncoding                 RFC 2616 中定义的编码格式，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ContentType                     RFC 2616 中定义的内容类型（MIME），将作为 Object 元数据保存，非必须
 *     @param  {String}  params.Expires                         RFC 2616 中定义的过期时间，将作为 Object 元数据保存，非必须
 *     @param  {String}  params.ACL                             允许用户自定义文件权限，非必须
 *     @param  {String}  params.GrantRead                       赋予被授权者读的权限 ，非必须
 *     @param  {String}  params.GrantWrite                      赋予被授权者写的权限 ，非必须
 *     @param  {String}  params.GrantFullControl                赋予被授权者读写权限 ，非必须
 *     @param  {String}  params.StorageClass                    设置Object的存储级别，枚举值：Standard，Standard_IA，Archive，非必须
 *     @param  {String}  params.ServerSideEncryption           支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: "AES256"，非必须
 * @param  {Function}  callback                                 回调函数，必须
 * @return  {Object}  err                                       请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                      返回的数据
 */
function multipartInit(params, callback) {

    var self = this;
    // 特殊处理 Cache-Control
    var headers = params.Headers;
    !headers['Cache-Control'] && (headers['Cache-Control'] = '');
    util.getBodyMd5(params.Body && (params.UploadAddMetaMd5 || self.options.UploadAddMetaMd5), params.Body, function (md5) {
        if (md5) params.Headers['x-cos-meta-md5'] = md5;
        submitRequest.call(self, {
            Action: 'name/cos:InitiateMultipartUpload',
            method: 'POST',
            Bucket: params.Bucket,
            Region: params.Region,
            Key: params.Key,
            action: 'uploads',
            headers: params.Headers,
        }, function (err, data) {
            if (err) {
                return callback(err);
            }
            data = util.clone(data || {});
            if (data && data.InitiateMultipartUploadResult) {
                return callback(null, util.extend(data.InitiateMultipartUploadResult, {
                    statusCode: data.statusCode,
                    headers: data.headers,
                }));
            }
            callback(null, data);
        });
    }, params.onHashProgress);
}

/**
 * 分块上传
 * @param  {Object}  params                                 参数对象，必须
 *     @param  {String}  params.Bucket                      Bucket名称，必须
 *     @param  {String}  params.Region                      地域名称，必须
 *     @param  {String}  params.Key                         object名称，必须
 *     @param  {File || Blob || String}  params.Body        上传文件对象或字符串
 *     @param  {String} params.ContentLength                RFC 2616 中定义的 HTTP 请求内容长度（字节），非必须
 *     @param  {String} params.Expect                       当使用 Expect: 100-continue 时，在收到服务端确认后，才会发送请求内容，非必须
 *     @param  {String} params.ServerSideEncryption         支持按照指定的加密算法进行服务端数据加密，格式 x-cos-server-side-encryption: "AES256"，非必须
 *     @param  {String} params.ContentSha1                  RFC 3174 中定义的 160-bit 内容 SHA-1 算法校验值，非必须
 * @param  {Function}  callback                             回调函数，必须
 *     @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}  data                              返回的数据
 *     @return  {Object}  data.ETag                         返回的文件分块 sha1 值
 */
function multipartUpload(params, callback) {

    var self = this;
    util.getFileSize('multipartUpload', params, function () {
        util.getBodyMd5(self.options.UploadCheckContentMd5, params.Body, function (md5) {
            if (md5) params.Headers['Content-MD5'] = util.binaryBase64(md5);
            submitRequest.call(self, {
                Action: 'name/cos:UploadPart',
                TaskId: params.TaskId,
                method: 'PUT',
                Bucket: params.Bucket,
                Region: params.Region,
                Key: params.Key,
                qs: {
                    partNumber: params['PartNumber'],
                    uploadId: params['UploadId'],
                },
                headers: params.Headers,
                onProgress: params.onProgress,
                body: params.Body || null
            }, function (err, data) {
                if (err) {
                    return callback(err);
                }
                data['headers'] = data['headers'] || {};
                callback(null, {
                    ETag: data['headers']['etag'] || '',
                    statusCode: data.statusCode,
                    headers: data.headers,
                });
            });
        });
    });

}

/**
 * 完成分块上传
 * @param  {Object}  params                             参数对象，必须
 *     @param  {String}  params.Bucket                  Bucket名称，必须
 *     @param  {String}  params.Region                  地域名称，必须
 *     @param  {String}  params.Key                     object名称，必须
 *     @param  {Array}   params.Parts                   分块信息列表，必须
 *     @param  {String}  params.Parts[i].PartNumber     块编号，必须
 *     @param  {String}  params.Parts[i].ETag           分块的 sha1 校验值
 * @param  {Function}  callback                         回调函数，必须
 * @return  {Object}  err                               请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                              返回的数据
 *     @return  {Object}  data.CompleteMultipartUpload  完成分块上传后的文件信息，包括Location, Bucket, Key 和 ETag
 */
function multipartComplete(params, callback) {
    var self = this;

    var UploadId = params.UploadId;

    var Parts = params['Parts'];

    for (var i = 0, len = Parts.length; i < len; i++) {
        if (Parts[i]['ETag'].indexOf('"') === 0) {
            continue;
        }
        Parts[i]['ETag'] = '"' + Parts[i]['ETag'] + '"';
    }

    var xml = util.json2xml({CompleteMultipartUpload: {Part: Parts}});

    var headers = params.Headers;
    headers['Content-Type'] = 'application/xml';
    headers['Content-MD5'] = util.binaryBase64(util.md5(xml));

    submitRequest.call(this, {
        Action: 'name/cos:CompleteMultipartUpload',
        method: 'POST',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        qs: {
            uploadId: UploadId
        },
        body: xml,
        headers: headers,
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var url = getUrl({
            ForcePathStyle: self.options.ForcePathStyle,
            protocol: self.options.Protocol,
            domain: self.options.Domain,
            bucket: params.Bucket,
            region: params.Region,
            object: params.Key,
            isLocation: true,
        });
        var CompleteMultipartUploadResult = data.CompleteMultipartUploadResult || {};
        var result = util.extend(CompleteMultipartUploadResult, {
            Location: url,
            statusCode: data.statusCode,
            headers: data.headers,
        });
        callback(null, result);
    });
}

/**
 * 分块上传任务列表查询
 * @param  {Object}  params                                 参数对象，必须
 *     @param  {String}  params.Bucket                      Bucket名称，必须
 *     @param  {String}  params.Region                      地域名称，必须
 *     @param  {String}  params.Delimiter                   定界符为一个符号，如果有Prefix，则将Prefix到delimiter之间的相同路径归为一类，定义为Common Prefix，然后列出所有Common Prefix。如果没有Prefix，则从路径起点开始，非必须
 *     @param  {String}  params.EncodingType                规定返回值的编码方式，非必须
 *     @param  {String}  params.Prefix                      前缀匹配，用来规定返回的文件前缀地址，非必须
 *     @param  {String}  params.MaxUploads                  单次返回最大的条目数量，默认1000，非必须
 *     @param  {String}  params.KeyMarker                   与upload-id-marker一起使用 </Br>当upload-id-marker未被指定时，ObjectName字母顺序大于key-marker的条目将被列出 </Br>当upload-id-marker被指定时，ObjectName字母顺序大于key-marker的条目被列出，ObjectName字母顺序等于key-marker同时UploadId大于upload-id-marker的条目将被列出，非必须
 *     @param  {String}  params.UploadIdMarker              与key-marker一起使用 </Br>当key-marker未被指定时，upload-id-marker将被忽略 </Br>当key-marker被指定时，ObjectName字母顺序大于key-marker的条目被列出，ObjectName字母顺序等于key-marker同时UploadId大于upload-id-marker的条目将被列出，非必须
 * @param  {Function}  callback                             回调函数，必须
 * @return  {Object}  err                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                  返回的数据
 *     @return  {Object}  data.ListMultipartUploadsResult   分块上传任务信息
 */
function multipartList(params, callback) {
    var reqParams = {};

    reqParams['delimiter'] = params['Delimiter'];
    reqParams['encoding-type'] = params['EncodingType'];
    reqParams['prefix'] = params['Prefix'] || '';

    reqParams['max-uploads'] = params['MaxUploads'];

    reqParams['key-marker'] = params['KeyMarker'];
    reqParams['upload-id-marker'] = params['UploadIdMarker'];

    reqParams = util.clearKey(reqParams);

    submitRequest.call(this, {
        Action: 'name/cos:ListMultipartUploads',
        ResourceKey: reqParams['prefix'],
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        headers: params.Headers,
        qs: reqParams,
        action: 'uploads',
    }, function (err, data) {
        if (err) {
            return callback(err);
        }

        if (data && data.ListMultipartUploadsResult) {
            var Upload = data.ListMultipartUploadsResult.Upload || [];

            var CommonPrefixes = data.ListMultipartUploadsResult.CommonPrefixes || [];

            CommonPrefixes = util.isArray(CommonPrefixes) ? CommonPrefixes : [CommonPrefixes];
            Upload = util.isArray(Upload) ? Upload : [Upload];

            data.ListMultipartUploadsResult.Upload = Upload;
            data.ListMultipartUploadsResult.CommonPrefixes = CommonPrefixes;
        }
        var result = util.clone(data.ListMultipartUploadsResult || {});
        util.extend(result, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
        callback(null, result);
    });
}

/**
 * 上传的分块列表查询
 * @param  {Object}  params                                 参数对象，必须
 *     @param  {String}  params.Bucket                      Bucket名称，必须
 *     @param  {String}  params.Region                      地域名称，必须
 *     @param  {String}  params.Key                         object名称，必须
 *     @param  {String}  params.UploadId                    标示本次分块上传的ID，必须
 *     @param  {String}  params.EncodingType                规定返回值的编码方式，非必须
 *     @param  {String}  params.MaxParts                    单次返回最大的条目数量，默认1000，非必须
 *     @param  {String}  params.PartNumberMarker            默认以UTF-8二进制顺序列出条目，所有列出条目从marker开始，非必须
 * @param  {Function}  callback                             回调函数，必须
 * @return  {Object}  err                                   请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 * @return  {Object}  data                                  返回的数据
 *     @return  {Object}  data.ListMultipartUploadsResult   分块信息
 */
function multipartListPart(params, callback) {
    var reqParams = {};

    reqParams['uploadId'] = params['UploadId'];
    reqParams['encoding-type'] = params['EncodingType'];
    reqParams['max-parts'] = params['MaxParts'];
    reqParams['part-number-marker'] = params['PartNumberMarker'];

    submitRequest.call(this, {
        Action: 'name/cos:ListParts',
        method: 'GET',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: params.Headers,
        qs: reqParams,
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var ListPartsResult = data.ListPartsResult || {};
        var Part = ListPartsResult.Part || [];
        Part = util.isArray(Part) ? Part : [Part];

        ListPartsResult.Part = Part;
        var result = util.clone(ListPartsResult);
        util.extend(result, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
        callback(null, result);
    });
}

/**
 * 抛弃分块上传
 * @param  {Object}  params                 参数对象，必须
 *     @param  {String}  params.Bucket      Bucket名称，必须
 *     @param  {String}  params.Region      地域名称，必须
 *     @param  {String}  params.Key         object名称，必须
 *     @param  {String}  params.UploadId    标示本次分块上传的ID，必须
 * @param  {Function}  callback             回调函数，必须
 *     @return  {Object}    err             请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}    data            返回的数据
 */
function multipartAbort(params, callback) {
    var reqParams = {};

    reqParams['uploadId'] = params['UploadId'];
    submitRequest.call(this, {
        Action: 'name/cos:AbortMultipartUpload',
        method: 'DELETE',
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        headers: params.Headers,
        qs: reqParams,
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: data.statusCode,
            headers: data.headers,
        });
    });
}

/**
 * 获取签名
 * @param  {Object}  params             参数对象，必须
 *     @param  {String}  params.Method  请求方法，必须
 *     @param  {String}  params.Key     object名称，必须
 *     @param  {String}  params.Expires 名超时时间，单位秒，可选
 * @return  {String}  data              返回签名字符串
 */
function getAuth(params) {
    var self = this;
    return util.getAuth({
        SecretId: params.SecretId || this.options.SecretId || '',
        SecretKey: params.SecretKey || this.options.SecretKey || '',
        Method: params.Method,
        Key: params.Key,
        Query: params.Query,
        Headers: params.Headers,
        Expires: params.Expires,
        UseRawKey: self.options.UseRawKey,
        SystemClockOffset: self.options.SystemClockOffset,
    });
}

/**
 * 获取文件下载链接
 * @param  {Object}  params                 参数对象，必须
 *     @param  {String}  params.Bucket      Bucket名称，必须
 *     @param  {String}  params.Region      地域名称，必须
 *     @param  {String}  params.Key         object名称，必须
 *     @param  {String}  params.Method      请求的方法，可选
 *     @param  {String}  params.Expires     签名超时时间，单位秒，可选
 * @param  {Function}  callback             回调函数，必须
 *     @return  {Object}    err             请求失败的错误，如果请求成功，则为空。https://cloud.tencent.com/document/product/436/7730
 *     @return  {Object}    data            返回的数据
 */
function getObjectUrl(params, callback) {
    var self = this;
    var url = getUrl({
        ForcePathStyle: self.options.ForcePathStyle,
        protocol: params.Protocol || self.options.Protocol,
        domain: self.options.Domain,
        bucket: params.Bucket,
        region: params.Region,
        object: params.Key,
    });
    if (params.Sign !== undefined && !params.Sign) {
        callback(null, {Url: url});
        return url;
    }
    var AuthData = getAuthorizationAsync.call(this, {
        Action: ((params.Method || '').toUpperCase() === 'PUT' ? 'name/cos:PutObject' : 'name/cos:GetObject'),
        Bucket: params.Bucket || '',
        Region: params.Region || '',
        Method: params.Method || 'get',
        Key: params.Key,
        Expires: params.Expires,
    }, function (err, AuthData) {
        if (!callback) return;
        if (err) {
            callback(err);
            return;
        }
        var signUrl = url;
        signUrl += '?' + (AuthData.Authorization.indexOf('q-signature') > -1 ?
            AuthData.Authorization : 'sign=' + encodeURIComponent(AuthData.Authorization));
        AuthData.XCosSecurityToken && (signUrl += '&x-cos-security-token=' + AuthData.XCosSecurityToken);
        AuthData.ClientIP && (signUrl += '&clientIP=' + AuthData.ClientIP);
        AuthData.ClientUA && (signUrl += '&clientUA=' + AuthData.ClientUA);
        AuthData.Token && (signUrl += '&token=' + AuthData.Token);
        setTimeout(function () {
            callback(null, {Url: signUrl});
        });
    });
    if (AuthData) {
        return url + '?' + AuthData.Authorization +
            (AuthData.XCosSecurityToken ? '&x-cos-security-token=' + AuthData.XCosSecurityToken : '');
    } else {
        return url;
    }
}


/**
 * 私有方法
 */
function decodeAcl(AccessControlPolicy) {
    var result = {
        GrantFullControl: [],
        GrantWrite: [],
        GrantRead: [],
        GrantReadAcp: [],
        GrantWriteAcp: [],
        ACL: '',
    };
    var GrantMap = {
        'FULL_CONTROL': 'GrantFullControl',
        'WRITE': 'GrantWrite',
        'READ': 'GrantRead',
        'READ_ACP': 'GrantReadAcp',
        'WRITE_ACP': 'GrantWriteAcp',
    };
    var AccessControlList = AccessControlPolicy && AccessControlPolicy.AccessControlList || {};
    var Grant = AccessControlList.Grant;
    if (Grant) {
        Grant = util.isArray(Grant) ? Grant : [Grant];
    }
    var PublicAcl = {READ: 0, WRITE: 0, FULL_CONTROL: 0};
    Grant && Grant.length && util.each(Grant, function (item) {
        if (item.Grantee.ID === 'qcs::cam::anyone:anyone' || item.Grantee.URI === 'http://cam.qcloud.com/groups/global/AllUsers') {
            PublicAcl[item.Permission] = 1;
        } else if (item.Grantee.ID !== AccessControlPolicy.Owner.ID) {
            result[GrantMap[item.Permission]].push('id="' + item.Grantee.ID + '"');
        }
    });
    if (PublicAcl.FULL_CONTROL || (PublicAcl.WRITE && PublicAcl.READ)) {
        result.ACL = 'public-read-write';
    } else if (PublicAcl.READ) {
        result.ACL = 'public-read';
    } else {
        result.ACL = 'private';
    }
    util.each(GrantMap, function (item) {
        result[item] = uniqGrant(result[item].join(','));
    });
    return result;
}

// Grant 去重
function uniqGrant(str) {
    var arr = str.split(',');
    var exist = {};
    var i, item;
    for (i = 0; i < arr.length; ) {
        item = arr[i].trim();
        if (exist[item]) {
            arr.splice(i, 1);
        } else {
            exist[item] = true;
            arr[i] = item;
            i++;
        }
    }
    return arr.join(',');
}

// 生成操作 url
function getUrl(params) {
    var longBucket = params.bucket;
    var shortBucket = longBucket.substr(0, longBucket.lastIndexOf('-'));
    var appId = longBucket.substr(longBucket.lastIndexOf('-') + 1);
    var domain = params.domain;
    var region = params.region;
    var object = params.object;
    var protocol = params.protocol || (util.isBrowser && location.protocol === 'http:' ? 'http:' : 'https:');
    if (!domain) {
        if (['cn-south', 'cn-south-2', 'cn-north', 'cn-east', 'cn-southwest', 'sg'].indexOf(region) > -1) {
            domain = '{Region}.myqcloud.com';
        } else {
            domain = 'cos.{Region}.myqcloud.com';
        }
        if (!params.ForcePathStyle) {
            domain = '{Bucket}.' + domain;
        }
    }
    domain = domain.replace(/\{\{AppId\}\}/ig, appId)
        .replace(/\{\{Bucket\}\}/ig, shortBucket)
        .replace(/\{\{Region\}\}/ig, region)
        .replace(/\{\{.*?\}\}/ig, '');
    domain = domain.replace(/\{AppId\}/ig, appId)
        .replace(/\{BucketName\}/ig, shortBucket)
        .replace(/\{Bucket\}/ig, longBucket)
        .replace(/\{Region\}/ig, region)
        .replace(/\{.*?\}/ig, '');
    if (!/^[a-zA-Z]+:\/\//.test(domain)) {
        domain = protocol + '//' + domain;
    }

    // 去掉域名最后的斜杆
    if (domain.slice(-1) === '/') {
        domain = domain.slice(0, -1);
    }
    var url = domain;

    if (params.ForcePathStyle) {
        url += '/' + longBucket;
    }
    url += '/';
    if (object) {
        url += util.camSafeUrlEncode(object).replace(/%2F/g, '/');
    }

    if (params.isLocation) {
        url = url.replace(/^https?:\/\//, '');
    }
    return url;
}

// 异步获取签名
function getAuthorizationAsync(params, callback) {

    var headers = util.clone(params.Headers);
    delete headers['Content-Type'];
    delete headers['Cache-Control'];
    util.each(headers, function (v, k) {
        v === '' && delete headers[k];
    });

    var cb = function (AuthData) {

        // 检查签名格式
        var formatAllow = false;
        var auth = AuthData.Authorization;
        if (auth) {
            if (auth.indexOf(' ') > -1) {
                formatAllow = false;
            } else if (auth.indexOf('q-sign-algorithm=') > -1 &&
                auth.indexOf('q-ak=') > -1 &&
                auth.indexOf('q-sign-time=') > -1 &&
                auth.indexOf('q-key-time=') > -1 &&
                auth.indexOf('q-url-param-list=') > -1) {
                formatAllow = true;
            } else {
                try {
                    auth = atob(auth);
                    if (auth.indexOf('a=') > -1 &&
                        auth.indexOf('k=') > -1 &&
                        auth.indexOf('t=') > -1 &&
                        auth.indexOf('r=') > -1 &&
                        auth.indexOf('b=') > -1) {
                        formatAllow = true;
                    }
                } catch (e) {}
            }
        }
        if (formatAllow) {
            callback && callback(null, AuthData);
        } else {
            callback && callback('authorization error');
        }
    };

    var self = this;
    var Bucket = params.Bucket || '';
    var Region = params.Region || '';

    // PathName
    var KeyName = params.Key || '';
    if (self.options.ForcePathStyle && Bucket) {
        KeyName = Bucket + '/' + KeyName;
    }
    var Pathname = '/' + KeyName;

    // Action、ResourceKey
    var StsData = {};
    var Scope = params.Scope;
    if (!Scope) {
        var Action = params.Action || '';
        var ResourceKey = params.ResourceKey || params.Key || '';
        Scope = params.Scope || [{
            action: Action,
            bucket: Bucket,
            region: Region,
            prefix: ResourceKey,
        }];
    }
    var ScopeKey  = util.md5(JSON.stringify(Scope));

    // STS
    self._StsCache = self._StsCache ||[];
    (function () {
        var i, AuthData;
        for (i = self._StsCache.length - 1; i >= 0; i--) {
            AuthData = self._StsCache[i];
            var compareTime = Math.round(util.getSkewTime(self.options.SystemClockOffset) / 1000) + 30;
            if (AuthData.StartTime && compareTime < AuthData.StartTime || compareTime >= AuthData.ExpiredTime) {
                self._StsCache.splice(i, 1);
                continue;
            }
            if (!AuthData.ScopeLimit || AuthData.ScopeLimit && AuthData.ScopeKey === ScopeKey) {
                StsData = AuthData;
                break;
            }
        }
    })();

    var calcAuthByTmpKey = function () {
        var KeyTime = StsData.StartTime && StsData.ExpiredTime ? StsData.StartTime + ';' + StsData.ExpiredTime : '';
        var Authorization = util.getAuth({
            SecretId: StsData.TmpSecretId,
            SecretKey: StsData.TmpSecretKey,
            Method: params.Method,
            Pathname: Pathname,
            Query: params.Query,
            Headers: headers,
            Expires: params.Expires,
            UseRawKey: self.options.UseRawKey,
            SystemClockOffset: self.options.SystemClockOffset,
            KeyTime: KeyTime
        });
        var AuthData = {
            Authorization: Authorization,
            XCosSecurityToken: StsData.XCosSecurityToken || '',
            Token: StsData.Token || '',
            ClientIP: StsData.ClientIP || '',
            ClientUA: StsData.ClientUA || '',
        };
        cb(AuthData);
    };

    // 先判断是否有临时密钥
    if (StsData.ExpiredTime && StsData.ExpiredTime - (util.getSkewTime(self.options.SystemClockOffset) / 1000) > 60) { // 如果缓存的临时密钥有效，并还有超过60秒有效期就直接使用
        calcAuthByTmpKey();
    } else if (self.options.getAuthorization) { // 外部计算签名或获取临时密钥
        self.options.getAuthorization.call(self, {
            Bucket: Bucket,
            Region: Region,
            Method: params.Method,
            Key: KeyName,
            Pathname: Pathname,
            Query: params.Query,
            Headers: headers,
            Scope: Scope,
        }, function (AuthData) {
            if (typeof AuthData === 'string') {
                AuthData = {Authorization: AuthData};
            }
            if (AuthData.TmpSecretId &&
                AuthData.TmpSecretKey &&
                AuthData.XCosSecurityToken &&
                AuthData.ExpiredTime) {
                StsData = AuthData || {};
                StsData.Scope = Scope;
                StsData.ScopeKey = ScopeKey;
                self._StsCache.push(StsData);
                calcAuthByTmpKey();
            } else {
                cb(AuthData);
            }
        });
    } else if (self.options.getSTS) { // 外部获取临时密钥
        self.options.getSTS.call(self, {
            Bucket: Bucket,
            Region: Region,
        }, function (data) {
            StsData = data || {};
            StsData.Scope = Scope;
            StsData.ScopeKey = ScopeKey;
            StsData.TmpSecretId = StsData.SecretId;
            StsData.TmpSecretKey = StsData.SecretKey;
            self._StsCache.push(StsData);
            calcAuthByTmpKey();
        });
    } else { // 内部计算获取签名
        return (function () {
            var Authorization = util.getAuth({
                SecretId: params.SecretId || self.options.SecretId,
                SecretKey: params.SecretKey || self.options.SecretKey,
                Method: params.Method,
                Pathname: Pathname,
                Query: params.Query,
                Headers: headers,
                Expires: params.Expires,
                UseRawKey: self.options.UseRawKey,
                SystemClockOffset: self.options.SystemClockOffset,
            });
            var AuthData = {
                Authorization: Authorization,
                XCosSecurityToken: self.options.XCosSecurityToken,
            };
            cb(AuthData);
            return AuthData;
        })();
    }
    return '';
}

// 调整时间偏差
function allowRetry(err) {
    var allowRetry = false;
    var isTimeError = false;
    var serverDate = (err.headers && (err.headers.date || err.headers.Date)) || (err.error && err.error.ServerTime);
    try {
        var errorCode = err.error.Code;
        var errorMessage = err.error.Message;
        if (errorCode === 'RequestTimeTooSkewed' ||
            (errorCode === 'AccessDenied' && errorMessage === 'Request has expired')) {
            isTimeError = true;
        }
    } catch (e) {
    }
    if (err) {
        if (isTimeError && serverDate) {
            var serverTime = Date.parse(serverDate);
            if (this.options.CorrectClockSkew && Math.abs(util.getSkewTime(this.options.SystemClockOffset) - serverTime) >= 30000) {
                console.error('error: Local time is too skewed.');
                this.options.SystemClockOffset = serverTime - Date.now();
                allowRetry = true;
            }
        } else if (Math.round(err.statusCode / 100) === 5) {
            allowRetry = true;
        }
    }
    return allowRetry;
}

// 获取签名并发起请求
function submitRequest(params, callback) {
    var self = this;

    // 处理 headers
    !params.headers && (params.headers = {});

    // 处理 query
    !params.qs && (params.qs = {});
    params.VersionId && (params.qs.versionId = params.VersionId);
    params.qs = util.clearKey(params.qs);

    // 清理 undefined 和 null 字段
    params.headers && (params.headers = util.clearKey(params.headers));
    params.qs && (params.qs = util.clearKey(params.qs));

    var Query = util.clone(params.qs);
    params.action && (Query[params.action] = '');

    var next = function (tryTimes) {
        var oldClockOffset = self.options.SystemClockOffset;
        getAuthorizationAsync.call(self, {
            Bucket: params.Bucket || '',
            Region: params.Region || '',
            Method: params.method,
            Key: params.Key,
            Query: Query,
            Headers: params.headers,
            Action: params.Action,
            ResourceKey: params.ResourceKey,
            Scope: params.Scope,
        }, function (err, AuthData) {
            if (err) {
                callback(err);
                return;
            }
            params.AuthData = AuthData;
            _submitRequest.call(self, params, function (err, data) {
                if (err && tryTimes < 2 && (oldClockOffset !== self.options.SystemClockOffset || allowRetry.call(self, err))) {
                    if (params.headers) {
                        delete params.headers.Authorization;
                        delete params.headers['token'];
                        delete params.headers['clientIP'];
                        delete params.headers['clientUA'];
                        delete params.headers['x-cos-security-token'];
                    }
                    next(tryTimes + 1);
                } else {
                    callback(err, data);
                }
            });
        });
    };
    next(1);

}

// 发起请求
function _submitRequest(params, callback) {
    var self = this;
    var TaskId = params.TaskId;
    if (TaskId && !self._isRunningTask(TaskId)) return;

    var bucket = params.Bucket;
    var region = params.Region;
    var object = params.Key;
    var method = params.method || 'GET';
    var url = params.url;
    var body = params.body;
    var json = params.json;
    var rawBody = params.rawBody;

    // url
    url = url || getUrl({
        ForcePathStyle: self.options.ForcePathStyle,
        protocol: self.options.Protocol,
        domain: self.options.Domain,
        bucket: bucket,
        region: region,
        object: object,
    });
    if (params.action) {
        url = url + '?' + params.action;
    }

    var opt = {
        method: method,
        url: url,
        headers: params.headers,
        qs: params.qs,
        body: body,
        json: json,
    };

    // 获取签名
    opt.headers.Authorization = params.AuthData.Authorization;
    params.AuthData.Token && (opt.headers['token'] = params.AuthData.Token);
    params.AuthData.ClientIP && (opt.headers['clientIP'] = params.AuthData.ClientIP);
    params.AuthData.ClientUA && (opt.headers['clientUA'] = params.AuthData.ClientUA);
    params.AuthData.XCosSecurityToken && (opt.headers['x-cos-security-token'] = params.AuthData.XCosSecurityToken);

    // 清理 undefined 和 null 字段
    opt.headers && (opt.headers = util.clearKey(opt.headers));
    opt = util.clearKey(opt);

    // progress
    if (params.onProgress && typeof params.onProgress === 'function') {
        var contentLength = body && (body.size || body.length) || 0;
        opt.onProgress = function (e) {
            if (TaskId && !self._isRunningTask(TaskId)) return;
            var loaded = e ? e.loaded : 0;
            params.onProgress({loaded: loaded, total: contentLength});
        };
    }
    if (this.options.Timeout) {
        opt.timeout = this.options.Timeout;
    }

    self.emit('before-send', opt);
    var sender = REQUEST(opt, function (err, response, body) {
        if (err === 'abort') return;

        // 返回内容添加 状态码 和 headers
        var hasReturned;
        var cb = function (err, data) {
            TaskId && self.off('inner-kill-task', killTask);
            if (hasReturned) return;
            hasReturned = true;
            var attrs = {};
            response && response.statusCode && (attrs.statusCode = response.statusCode);
            response && response.headers && (attrs.headers = response.headers);

            if (err) {
                err = util.extend(err || {}, attrs);
                callback(err, null);
            } else {
                data = util.extend(data || {}, attrs);
                callback(null, data);
            }
            sender = null;
        };

        // 请求错误，发生网络错误
        if (err) {
            cb({error: err});
            return;
        }

        var jsonRes;

        // 不对 body 进行转换，body 直接挂载返回
        if(rawBody) {
            jsonRes = {};
            jsonRes.body = body;
        } else {
            try {
                jsonRes = body && body.indexOf('<') > -1 && body.indexOf('>') > -1 && util.xml2json(body) || {};
            } catch (e) {
                jsonRes = body || {};
            }
        }

        // 请求返回码不为 200
        var statusCode = response.statusCode;
        var statusSuccess = Math.floor(statusCode / 100) === 2; // 200 202 204 206
        if (!statusSuccess) {
            cb({error: jsonRes.Error || jsonRes});
            return;
        }


        if (jsonRes.Error) {
            cb({error: jsonRes.Error});
            return;
        }
        cb(null, jsonRes);
    });

    // kill task
    var killTask = function (data) {
        if (data.TaskId === TaskId) {
            sender && sender.abort && sender.abort();
            self.off('inner-kill-task', killTask);
        }
    };
    TaskId && self.on('inner-kill-task', killTask);

}


var API_MAP = {
    // Bucket 相关方法
    getService: getService,                      // Bucket
    putBucket: putBucket,
    headBucket: headBucket,                      // Bucket
    getBucket: getBucket,
    deleteBucket: deleteBucket,
    putBucketAcl: putBucketAcl,                  // BucketACL
    getBucketAcl: getBucketAcl,
    putBucketCors: putBucketCors,                // BucketCors
    getBucketCors: getBucketCors,
    deleteBucketCors: deleteBucketCors,
    getBucketLocation: getBucketLocation,        // BucketLocation
    getBucketPolicy: getBucketPolicy,            // BucketPolicy
    putBucketPolicy: putBucketPolicy,
    deleteBucketPolicy: deleteBucketPolicy,
    putBucketTagging: putBucketTagging,          // BucketTagging
    getBucketTagging: getBucketTagging,
    deleteBucketTagging: deleteBucketTagging,
    putBucketLifecycle: putBucketLifecycle,      // BucketLifecycle
    getBucketLifecycle: getBucketLifecycle,
    deleteBucketLifecycle: deleteBucketLifecycle,
    putBucketVersioning: putBucketVersioning,    // BucketVersioning
    getBucketVersioning: getBucketVersioning,
    putBucketReplication: putBucketReplication,  // BucketReplication
    getBucketReplication: getBucketReplication,
    deleteBucketReplication: deleteBucketReplication,
    putBucketWebsite: putBucketWebsite,          // BucketWebsite
    getBucketWebsite: getBucketWebsite,
    deleteBucketWebsite: deleteBucketWebsite,

    // Object 相关方法
    getObject: getObject,
    headObject: headObject,
    listObjectVersions: listObjectVersions,
    putObject: putObject,
    deleteObject: deleteObject,
    getObjectAcl: getObjectAcl,
    putObjectAcl: putObjectAcl,
    optionsObject: optionsObject,
    putObjectCopy: putObjectCopy,
    deleteMultipleObject: deleteMultipleObject,
    restoreObject: restoreObject,

    // 分块上传相关方法
    uploadPartCopy: uploadPartCopy,
    multipartInit: multipartInit,
    multipartUpload: multipartUpload,
    multipartComplete: multipartComplete,
    multipartList: multipartList,
    multipartListPart: multipartListPart,
    multipartAbort: multipartAbort,

    // 工具方法
    getObjectUrl: getObjectUrl,
    getAuth: getAuth,
};

function warnOldApi(apiName, fn, proto) {
    util.each(['Cors', 'Acl'], function (suffix) {
        if (apiName.slice(-suffix.length) === suffix) {
            var oldName = apiName.slice(0, -suffix.length) + suffix.toUpperCase();
            var apiFn = util.apiWrapper(apiName, fn);
            var warned = false;
            proto[oldName] = function () {
                !warned && console.warn('warning: cos.' + oldName + ' has been deprecated. Please Use cos.' + apiName + ' instead.');
                warned = true;
                apiFn.apply(this, arguments);
            };
        }
    });
}

module.exports.init = function (COS, task) {
    task.transferToTaskMethod(API_MAP, 'putObject');
    util.each(API_MAP, function (fn, apiName) {
        COS.prototype[apiName] = util.apiWrapper(apiName, fn);
        warnOldApi(apiName, fn, COS.prototype);
    });
};


/***/ }),
/* 66 */
/***/ ((module) => {

var $ = (function () {
    var deletedIds = [];

    var slice = deletedIds.slice;

    var concat = deletedIds.concat;

    var push = deletedIds.push;

    var indexOf = deletedIds.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var support = {};


    var
        version = "1.11.1 -css,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var/cssExpand,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-effects,-effects/Tween,-effects/animatedSelector,-effects/support,-dimensions,-offset,-deprecated,-event-alias,-wrap",

        // Define a local copy of jQuery
        jQuery = function (selector, context) {
            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init(selector, context);
        },

        // Support: Android<4.1, IE<9
        // Make sure we trim BOM and NBSP
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,

        // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function (all, letter) {
            return letter.toUpperCase();
        };

    jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // Start with an empty selector
        selector: "",

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function () {
            return slice.call(this);
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function (num) {
            return num != null ?

                // Return just the one element from the set
                ( num < 0 ? this[num + this.length] : this[num] ) :

                // Return all the elements in a clean array
                slice.call(this);
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function (elems) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;
            ret.context = this.context;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        // (You can seed the arguments with an array of args, but this is
        // only used internally.)
        each: function (callback, args) {
            return jQuery.each(this, callback, args);
        },

        map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem);
            }));
        },

        slice: function () {
            return this.pushStack(slice.apply(this, arguments));
        },

        first: function () {
            return this.eq(0);
        },

        last: function () {
            return this.eq(-1);
        },

        eq: function (i) {
            var len = this.length,
                j = +i + ( i < 0 ? len : 0 );
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },

        end: function () {
            return this.prevObject || this.constructor(null);
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    };

    jQuery.extend = jQuery.fn.extend = function () {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) )) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + ( version + Math.random() ).replace(/\D/g, ""),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function (msg) {
            throw new Error(msg);
        },

        noop: function () {
        },

        // See test/unit/core.js for details concerning isFunction.
        // Since version 1.3, DOM methods and functions like alert
        // aren't supported. They return false on IE (#2968).
        isFunction: function (obj) {
            return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray || function (obj) {
            return jQuery.type(obj) === "array";
        },

        isWindow: function (obj) {
            /* jshint eqeqeq: false */
            return obj != null && obj == obj.window;
        },

        isNumeric: function (obj) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0;
        },

        isEmptyObject: function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },

        isPlainObject: function (obj) {
            var key;

            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }

            try {
                // Not own constructor property must be Object
                if (obj.constructor &&
                    !hasOwn.call(obj, "constructor") &&
                    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }

            // Support: IE<9
            // Handle iteration over inherited properties before own properties.
            if (support.ownLast) {
                for (key in obj) {
                    return hasOwn.call(obj, key);
                }
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            for (key in obj) {
            }

            return key === undefined || hasOwn.call(obj, key);
        },

        type: function (obj) {
            if (obj == null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj;
        },

        // Evaluates a script in a global context
        // Workarounds based on findings by Jim Driscoll
        // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
        globalEval: function (data) {
            if (data && jQuery.trim(data)) {
                // We use execScript on Internet Explorer
                // We use an anonymous function so that context is window
                // rather than jQuery in Firefox
                ( window.execScript || function (data) {
                    window["eval"].call(window, data);
                } )(data);
            }
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function (string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },

        nodeName: function (elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        // args is for internal usage only
        each: function (obj, callback, args) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike(obj);

            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                }

                // A special, fast, case for the most common use of each
            } else {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                }
            }

            return obj;
        },

        // Support: Android<4.1, IE<9
        trim: function (text) {
            return text == null ?
                "" :
                ( text + "" ).replace(rtrim, "");
        },

        // results is for internal usage only
        makeArray: function (arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret,
                        typeof arr === "string" ?
                            [arr] : arr
                    );
                } else {
                    push.call(ret, arr);
                }
            }

            return ret;
        },

        inArray: function (elem, arr, i) {
            var len;

            if (arr) {
                if (indexOf) {
                    return indexOf.call(arr, elem, i);
                }

                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

                for (; i < len; i++) {
                    // Skip accessing in sparse arrays
                    if (i in arr && arr[i] === elem) {
                        return i;
                    }
                }
            }

            return -1;
        },

        merge: function (first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            while (j < len) {
                first[i++] = second[j++];
            }

            // Support: IE<9
            // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
            if (len !== len) {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }

            first.length = i;

            return first;
        },

        grep: function (elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function (elems, callback, arg) {
            var value,
                i = 0,
                length = elems.length,
                isArray = isArraylike(elems),
                ret = [];

            // Go through the array, translating each of the items to their new values
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }

                // Go through every key on the object,
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply([], ret);
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function (fn, context) {
            var args, proxy, tmp;

            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }

            // Simulated bind
            args = slice.call(arguments, 2);
            proxy = function () {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },

        now: function () {
            return +( new Date() );
        },

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    });

// Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    function isArraylike(obj) {
        var length = obj.length,
            type = jQuery.type(obj);

        if (type === "function" || jQuery.isWindow(obj)) {
            return false;
        }

        if (obj.nodeType === 1 && length) {
            return true;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }


// Initialize a jQuery object


// A central reference to the root jQuery(document)
    var rootjQuery,

        // Use the correct document accordingly with window argument (sandbox)
        document = window.document,

        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        // Strict HTML recognition (#11290: must start with <)
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

        init = jQuery.fn.init = function (selector, context) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }

            // Handle HTML strings
            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [null, selector, null];

                } else {
                    match = rquickExpr.exec(selector);
                }

                // Match html or make sure no context is specified for #id
                if (match && (match[1] || !context)) {

                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;

                        // scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge(this, jQuery.parseHTML(
                            match[1],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ));

                        // HANDLE: $(html, props)
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                // Properties of context are called as methods if possible
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById(match[2]);

                        // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document #6963
                        if (elem && elem.parentNode) {
                            // Handle the case where IE and Opera return items
                            // by name instead of ID
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector);
                            }

                            // Otherwise, we inject the element directly into the jQuery object
                            this.length = 1;
                            this[0] = elem;
                        }

                        this.context = document;
                        this.selector = selector;
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if (!context || context.jquery) {
                    return ( context || rootjQuery ).find(selector);

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor(context).find(selector);
                }

                // HANDLE: $(DOMElement)
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if (jQuery.isFunction(selector)) {
                return typeof rootjQuery.ready !== "undefined" ?
                    rootjQuery.ready(selector) :
                    // Execute immediately if ready is not present
                    selector(jQuery);
            }

            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }

            return jQuery.makeArray(selector, this);
        };

// Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

// Initialize central reference
    rootjQuery = jQuery(document);


    var rnotwhite = (/\S+/g);

// String to Object options format cache
    var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
            object[flag] = true;
        });
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function (options) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            ( optionsCache[options] || createOptions(options) ) :
            jQuery.extend({}, options);

        var // Flag to know if list is currently firing
            firing,
            // Last fire value (for non-forgettable lists)
            memory,
            // Flag to know if list was already fired
            fired,
            // End of the loop when firing
            firingLength,
            // Index of currently firing callback (modified by remove if needed)
            firingIndex,
            // First callback to fire (used internally by add and fireWith)
            firingStart,
            // Actual callback list
            list = [],
            // Stack of fire calls for repeatable lists
            stack = !options.once && [],
            // Fire callbacks
            fire = function (data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false; // To prevent further calls using add
                        break;
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        if (stack.length) {
                            fire(stack.shift());
                        }
                    } else if (memory) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            },
            // Actual Callbacks object
            self = {
                // Add a callback or a collection of callbacks to the list
                add: function () {
                    if (list) {
                        // First, we save the current length
                        var start = list.length;
                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                var type = jQuery.type(arg);
                                if (type === "function") {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && type !== "string") {
                                    // Inspect recursively
                                    add(arg);
                                }
                            });
                        })(arguments);
                        // Do we need to add the callbacks to the
                        // current firing batch?
                        if (firing) {
                            firingLength = list.length;
                            // With memory, if we're not firing then
                            // we should call right away
                        } else if (memory) {
                            firingStart = start;
                            fire(memory);
                        }
                    }
                    return this;
                },
                // Remove a callback from the list
                remove: function () {
                    if (list) {
                        jQuery.each(arguments, function (_, arg) {
                            var index;
                            while (( index = jQuery.inArray(arg, list, index) ) > -1) {
                                list.splice(index, 1);
                                // Handle firing indexes
                                if (firing) {
                                    if (index <= firingLength) {
                                        firingLength--;
                                    }
                                    if (index <= firingIndex) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function (fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : !!( list && list.length );
                },
                // Remove all callbacks from the list
                empty: function () {
                    list = [];
                    firingLength = 0;
                    return this;
                },
                // Have the list do nothing anymore
                disable: function () {
                    list = stack = memory = undefined;
                    return this;
                },
                // Is it disabled?
                disabled: function () {
                    return !list;
                },
                // Lock the list in its current state
                lock: function () {
                    stack = undefined;
                    if (!memory) {
                        self.disable();
                    }
                    return this;
                },
                // Is it locked?
                locked: function () {
                    return !stack;
                },
                // Call all callbacks with the given context and arguments
                fireWith: function (context, args) {
                    if (list && ( !fired || stack )) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        if (firing) {
                            stack.push(args);
                        } else {
                            fire(args);
                        }
                    }
                    return this;
                },
                // Call all the callbacks with the given arguments
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },
                // To know if the callbacks have already been called at least once
                fired: function () {
                    return !!fired;
                }
            };

        return self;
    };


    jQuery.extend({

        Deferred: function (func) {
            var tuples = [
                    // action, add listener, listener list, final state
                    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", jQuery.Callbacks("memory")]
                ],
                state = "pending",
                promise = {
                    state: function () {
                        return state;
                    },
                    always: function () {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function (/* fnDone, fnFail, fnProgress */) {
                        var fns = arguments;
                        return jQuery.Deferred(function (newDefer) {
                            jQuery.each(tuples, function (i, tuple) {
                                var fn = jQuery.isFunction(fns[i]) && fns[i];
                                // deferred[ done | fail | progress ] for forwarding actions to newDefer
                                deferred[tuple[1]](function () {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise()
                                            .done(newDefer.resolve)
                                            .fail(newDefer.reject)
                                            .progress(newDefer.notify);
                                    } else {
                                        newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function (obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                },
                deferred = {};

            // Keep pipe for back-compat
            promise.pipe = promise.then;

            // Add list-specific methods
            jQuery.each(tuples, function (i, tuple) {
                var list = tuple[2],
                    stateString = tuple[3];

                // promise[ done | fail | progress ] = list.add
                promise[tuple[1]] = list.add;

                // Handle state
                if (stateString) {
                    list.add(function () {
                        // state = [ resolved | rejected ]
                        state = stateString;

                        // [ reject_list | resolve_list ].disable; progress_list.lock
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }

                // deferred[ resolve | reject | notify ]
                deferred[tuple[0]] = function () {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });

            // Make the deferred a promise
            promise.promise(deferred);

            // Call given func if any
            if (func) {
                func.call(deferred, deferred);
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when: function (subordinate /* , ..., subordinateN */) {
            var i = 0,
                resolveValues = slice.call(arguments),
                length = resolveValues.length,

                // the count of uncompleted subordinates
                remaining = length !== 1 || ( subordinate && jQuery.isFunction(subordinate.promise) ) ? length : 0,

                // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

                // Update function for both resolve and progress values
                updateFunc = function (i, contexts, values) {
                    return function (value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values);

                        } else if (!(--remaining)) {
                            deferred.resolveWith(contexts, values);
                        }
                    };
                },

                progressValues, progressContexts, resolveContexts;

            // add listeners to Deferred subordinates; treat others as resolved
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise()
                            .done(updateFunc(i, resolveContexts, resolveValues))
                            .fail(deferred.reject)
                            .progress(updateFunc(i, progressContexts, progressValues));
                    } else {
                        --remaining;
                    }
                }
            }

            // if we're not waiting on anything, resolve the master
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }

            return deferred.promise();
        }
    });


// The deferred used on DOM ready
    var readyList;

    jQuery.fn.ready = function (fn) {
        // Add the callback
        jQuery.ready.promise().done(fn);

        return this;
    };

    jQuery.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Hold (or release) the ready event
        holdReady: function (hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },

        // Handle when the DOM is ready
        ready: function (wait) {

            // Abort if there are pending holds or we're already ready
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }

            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if (!document.body) {
                return setTimeout(jQuery.ready);
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith(document, [jQuery]);

            // Trigger any bound ready events
            if (jQuery.fn.triggerHandler) {
                jQuery(document).triggerHandler("ready");
                jQuery(document).off("ready");
            }
        }
    });

    /**
     * Clean-up method for dom ready events
     */
    function detach() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed, false);
            window.removeEventListener("load", completed, false);

        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    }

    /**
     * The ready event handler and self cleanup method
     */
    function completed() {
        // readyState === "complete" is good enough for us to call the dom ready in oldIE
        if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
            detach();
            jQuery.ready();
        }
    }

    jQuery.ready.promise = function (obj) {
        if (!readyList) {

            readyList = jQuery.Deferred();

            // Catch cases where $(document).ready() is called after the browser event has already occurred.
            // we once tried to use readyState "interactive" here, but it caused issues like the one
            // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
            if (document.readyState === "complete") {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                setTimeout(jQuery.ready);

                // Standards-based browsers support DOMContentLoaded
            } else if (document.addEventListener) {
                // Use the handy event callback
                document.addEventListener("DOMContentLoaded", completed, false);

                // A fallback to window.onload, that will always work
                window.addEventListener("load", completed, false);

                // If IE event model is used
            } else {
                // Ensure firing before onload, maybe late but safe also for iframes
                document.attachEvent("onreadystatechange", completed);

                // A fallback to window.onload, that will always work
                window.attachEvent("onload", completed);

                // If IE and not a frame
                // continually check to see if the document is ready
                var top = false;

                try {
                    top = window.frameElement == null && document.documentElement;
                } catch (e) {
                }

                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!jQuery.isReady) {

                            try {
                                // Use the trick by Diego Perini
                                // http://javascript.nwbox.com/IEContentLoaded/
                                top.doScroll("left");
                            } catch (e) {
                                return setTimeout(doScrollCheck, 50);
                            }

                            // detach all dom ready events
                            detach();

                            // and execute any waiting functions
                            jQuery.ready();
                        }
                    })();
                }
            }
        }
        return readyList.promise(obj);
    };


    var strundefined = typeof undefined;


// Support: IE<9
// Iteration over object's inherited properties before its own
    var i;
    for (i in jQuery(support)) {
        break;
    }
    support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
    support.inlineBlockNeedsLayout = false;


// Execute ASAP in case we need to set body.style.zoom
    jQuery(function () {
        // Minified: var a,b,c,d
        var val, div, body, container;

        body = document.getElementsByTagName("body")[0];
        if (!body || !body.style) {
            // Return for frameset docs that don't have a body
            return;
        }

        // Setup
        div = document.createElement("div");
        container = document.createElement("div");
        container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
        body.appendChild(container).appendChild(div);

        if (typeof div.style.zoom !== strundefined) {
            // Support: IE<8
            // Check if natively block-level elements act like inline-block
            // elements when setting their display to 'inline' and giving
            // them layout
            div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

            support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
            if (val) {
                // Prevent IE 6 from affecting layout for positioned elements #11048
                // Prevent IE from shrinking the body in IE 7 mode #12869
                // Support: IE<8
                body.style.zoom = 1;
            }
        }

        body.removeChild(container);
    });


    (function () {
        var div = document.createElement("div");

        // Execute the test only if not already executed in another module.
        if (support.deleteExpando == null) {
            // Support: IE<9
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = false;
            }
        }

        // Null elements to avoid leaks in IE.
        div = null;
    })();


    /**
     * Determines whether an object can have data
     */
    jQuery.acceptData = function (elem) {
        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
            nodeType = +elem.nodeType || 1;

        // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
        return nodeType !== 1 && nodeType !== 9 ?
            false :

            // Nodes accept data unless otherwise specified; rejection can be conditional
            !noData || noData !== true && elem.getAttribute("classid") === noData;
    };


    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;

    function dataAttr(elem, key, data) {
        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if (data === undefined && elem.nodeType === 1) {

            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();

            data = elem.getAttribute(name);

            if (typeof data === "string") {
                try {
                    data = data === "true" ? true :
                        data === "false" ? false :
                            data === "null" ? null :
                                // Only convert to a number if it doesn't change the string
                                +data + "" === data ? +data :
                                    rbrace.test(data) ? jQuery.parseJSON(data) :
                                        data;
                } catch (e) {
                }

                // Make sure we set the data so it isn't changed later
                jQuery.data(elem, key, data);

            } else {
                data = undefined;
            }
        }

        return data;
    }

// checks a cache object for emptiness
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {

            // if the public data object is empty, the private is still empty
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue;
            }
            if (name !== "toJSON") {
                return false;
            }
        }

        return true;
    }

    function internalData(elem, name, data, pvt /* Internal Use Only */) {
        if (!jQuery.acceptData(elem)) {
            return;
        }

        var ret, thisCache,
            internalKey = jQuery.expando,

            // We have to handle DOM nodes and JS objects differently because IE6-7
            // can't GC object references properly across the DOM-JS boundary
            isNode = elem.nodeType,

            // Only DOM nodes need the global jQuery cache; JS object data is
            // attached directly to the object so GC can occur automatically
            cache = isNode ? jQuery.cache : elem,

            // Only defining an ID for JS objects if its cache already exists allows
            // the code to shortcut on the same path as a DOM node with no cache
            id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;

        // Avoid doing any more work than we need to when trying to get data on an
        // object that has no data at all
        if ((!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string") {
            return;
        }

        if (!id) {
            // Only DOM nodes need a new unique ID for each element since their data
            // ends up in the global cache
            if (isNode) {
                id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
            } else {
                id = internalKey;
            }
        }

        if (!cache[id]) {
            // Avoid exposing jQuery metadata on plain JS objects when the object
            // is serialized using JSON.stringify
            cache[id] = isNode ? {} : {toJSON: jQuery.noop};
        }

        // An object can be passed to jQuery.data instead of a key/value pair; this gets
        // shallow copied over onto the existing cache
        if (typeof name === "object" || typeof name === "function") {
            if (pvt) {
                cache[id] = jQuery.extend(cache[id], name);
            } else {
                cache[id].data = jQuery.extend(cache[id].data, name);
            }
        }

        thisCache = cache[id];

        // jQuery data() is stored in a separate object inside the object's internal data
        // cache in order to avoid key collisions between internal data and user-defined
        // data.
        if (!pvt) {
            if (!thisCache.data) {
                thisCache.data = {};
            }

            thisCache = thisCache.data;
        }

        if (data !== undefined) {
            thisCache[jQuery.camelCase(name)] = data;
        }

        // Check for both converted-to-camel and non-converted data property names
        // If a data property was specified
        if (typeof name === "string") {

            // First Try to find as-is property data
            ret = thisCache[name];

            // Test for null|undefined property data
            if (ret == null) {

                // Try to find the camelCased property
                ret = thisCache[jQuery.camelCase(name)];
            }
        } else {
            ret = thisCache;
        }

        return ret;
    }

    function internalRemoveData(elem, name, pvt) {
        if (!jQuery.acceptData(elem)) {
            return;
        }

        var thisCache, i,
            isNode = elem.nodeType,

            // See jQuery.data for more information
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[jQuery.expando] : jQuery.expando;

        // If there is already no cache entry for this object, there is no
        // purpose in continuing
        if (!cache[id]) {
            return;
        }

        if (name) {

            thisCache = pvt ? cache[id] : cache[id].data;

            if (thisCache) {

                // Support array or space separated string names for data keys
                if (!jQuery.isArray(name)) {

                    // try the string as a key before any manipulation
                    if (name in thisCache) {
                        name = [name];
                    } else {

                        // split the camel cased version by spaces unless a key with the spaces exists
                        name = jQuery.camelCase(name);
                        if (name in thisCache) {
                            name = [name];
                        } else {
                            name = name.split(" ");
                        }
                    }
                } else {
                    // If "name" is an array of keys...
                    // When data is initially created, via ("key", "val") signature,
                    // keys will be converted to camelCase.
                    // Since there is no way to tell _how_ a key was added, remove
                    // both plain key and camelCase key. #12786
                    // This will only penalize the array argument path.
                    name = name.concat(jQuery.map(name, jQuery.camelCase));
                }

                i = name.length;
                while (i--) {
                    delete thisCache[name[i]];
                }

                // If there is no data left in the cache, we want to continue
                // and let the cache object itself get destroyed
                if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
                    return;
                }
            }
        }

        // See jQuery.data for more information
        if (!pvt) {
            delete cache[id].data;

            // Don't destroy the parent cache unless the internal data object
            // had been the only thing left in it
            if (!isEmptyDataObject(cache[id])) {
                return;
            }
        }

        // Destroy the cache
        if (isNode) {
            jQuery.cleanData([elem], true);

            // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
            /* jshint eqeqeq: false */
        } else if (support.deleteExpando || cache != cache.window) {
            /* jshint eqeqeq: true */
            delete cache[id];

            // When all else fails, null
        } else {
            cache[id] = null;
        }
    }

    jQuery.extend({
        cache: {},

        // The following elements (space-suffixed to avoid Object.prototype collisions)
        // throw uncatchable exceptions if you attempt to set expando properties
        noData: {
            "applet ": true,
            "embed ": true,
            // ...but Flash objects (which have this classid) *can* handle expandos
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },

        hasData: function (elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },

        data: function (elem, name, data) {
            return internalData(elem, name, data);
        },

        removeData: function (elem, name) {
            return internalRemoveData(elem, name);
        },

        // For internal use only.
        _data: function (elem, name, data) {
            return internalData(elem, name, data, true);
        },

        _removeData: function (elem, name) {
            return internalRemoveData(elem, name, true);
        }
    });

    jQuery.fn.extend({
        data: function (key, value) {
            var i, name, data,
                elem = this[0],
                attrs = elem && elem.attributes;

            // Special expections of .data basically thwart jQuery.access,
            // so implement the relevant behavior ourselves

            // Gets all values
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);

                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        i = attrs.length;
                        while (i--) {

                            // Support: IE11+
                            // The attrs elements can be null (#14894)
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true);
                    }
                }

                return data;
            }

            // Sets multiple values
            if (typeof key === "object") {
                return this.each(function () {
                    jQuery.data(this, key);
                });
            }

            return arguments.length > 1 ?

                // Sets one value
                this.each(function () {
                    jQuery.data(this, key, value);
                }) :

                // Gets one value
                // Try to fetch any internally stored data first
                elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined;
        },

        removeData: function (key) {
            return this.each(function () {
                jQuery.removeData(this, key);
            });
        }
    });


    jQuery.extend({
        queue: function (elem, type, data) {
            var queue;

            if (elem) {
                type = ( type || "fx" ) + "queue";
                queue = jQuery._data(elem, type);

                // Speed up dequeue by getting out quickly if this is just a lookup
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },

        dequeue: function (elem, type) {
            type = type || "fx";

            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function () {
                    jQuery.dequeue(elem, type);
                };

            // If the fx queue is dequeued, always remove the progress sentinel
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }

            if (fn) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if (type === "fx") {
                    queue.unshift("inprogress");
                }

                // clear up the last queue stop function
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }

            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },

        // not intended for public consumption - generates a queueHooks object, or returns the current one
        _queueHooks: function (elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function () {
                        jQuery._removeData(elem, type + "queue");
                        jQuery._removeData(elem, key);
                    })
                });
        }
    });

    jQuery.fn.extend({
        queue: function (type, data) {
            var setter = 2;

            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }

            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }

            return data === undefined ?
                this :
                this.each(function () {
                    var queue = jQuery.queue(this, type, data);

                    // ensure a hooks for this queue
                    jQuery._queueHooks(this, type);

                    if (type === "fx" && queue[0] !== "inprogress") {
                        jQuery.dequeue(this, type);
                    }
                });
        },
        dequeue: function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function (type) {
            return this.queue(type || "fx", []);
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function (type, obj) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function () {
                    if (!( --count )) {
                        defer.resolveWith(elements, [elements]);
                    }
                };

            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });


    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

        global: {},

        add: function (elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn,
                special, eventHandle, handleObj,
                handlers, type, namespaces, origType,
                elemData = jQuery._data(elem);

            // Don't attach events to noData or text/comment nodes (but allow plain objects)
            if (!elemData) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function (e) {
                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
                        jQuery.event.dispatch.apply(eventHandle.elem, arguments) :
                        undefined;
                };
                // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
                eventHandle.elem = elem;
            }

            // Handle multiple events separated by a space
            types = ( types || "" ).match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = ( tmp[2] || "" ).split(".").sort();

                // There *must* be a type, no attaching namespace-only handlers
                if (!type) {
                    continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[type] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = ( selector ? special.delegateType : special.bindType ) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[type] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);

                // Init the event handler queue if we're the first
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener/attachEvent if the special events handler returns false
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        // Bind the global event handler to the element
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);

                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }

                if (special.add) {
                    special.add.call(elem, handleObj);

                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[type] = true;
            }

            // Nullify elem to prevent memory leaks in IE
            elem = null;
        },

        // Detach an event or set of events from an element
        remove: function (elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp,
                origCount, t, events,
                special, handlers, type,
                namespaces, origType,
                elemData = jQuery.hasData(elem) && jQuery._data(elem);

            if (!elemData || !(events = elemData.events)) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = ( types || "" ).match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = ( tmp[2] || "" ).split(".").sort();

                // Unbind all events (on this namespace, if provided) for the element
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }

                special = jQuery.event.special[type] || {};
                type = ( selector ? special.delegateType : special.bindType ) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

                // Remove matching events
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];

                    if (( mappedTypes || origType === handleObj.origType ) &&
                        ( !handler || handler.guid === handleObj.guid ) &&
                        ( !tmp || tmp.test(handleObj.namespace) ) &&
                        ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector )) {
                        handlers.splice(j, 1);

                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }

                    delete events[type];
                }
            }

            // Remove the expando if it's no longer used
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;

                // removeData also checks for emptiness and clears the expando if empty
                // so use it instead of delete
                jQuery._removeData(elem, "events");
            }
        },

        trigger: function (event, data, elem, onlyHandlers) {
            var handle, ontype, cur,
                bubbleType, special, tmp, i,
                eventPath = [elem || document],
                type = hasOwn.call(event, "type") ? event.type : event,
                namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

            cur = tmp = elem = elem || document;

            // Don't do events on text and comment nodes
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }

            if (type.indexOf(".") >= 0) {
                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;

            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[jQuery.expando] ?
                event :
                new jQuery.Event(type, typeof event === "object" && event);

            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ?
                new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                null;

            // Clean up the event in case it is being reused
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ?
                [event] :
                jQuery.makeArray(data, [event]);

            // Allow special events to draw outside the lines
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }

            // Fire handlers on the event path
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

                event.type = i > 1 ?
                    bubbleType :
                    special.bindType || type;

                // jQuery handler
                handle = ( jQuery._data(cur, "events") || {} )[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }

                // Native handler
                handle = ontype && cur[ontype];
                if (handle && handle.apply && jQuery.acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if (!onlyHandlers && !event.isDefaultPrevented()) {

                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) &&
                    jQuery.acceptData(elem)) {

                    // Call a native DOM method on the target with the same name name as the event.
                    // Can't use an .isFunction() check here because IE6/7 fails that test.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if (ontype && elem[type] && !jQuery.isWindow(elem)) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ontype];

                        if (tmp) {
                            elem[ontype] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;
                        try {
                            elem[type]();
                        } catch (e) {
                            // IE<9 dies on focus/blur to hidden element (#1486,#12518)
                            // only reproducible on winXP IE8 native, not IE9 in IE8 mode
                        }
                        jQuery.event.triggered = undefined;

                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }

            return event.result;
        },

        dispatch: function (event) {

            // Make a writable jQuery.Event from the native event object
            event = jQuery.event.fix(event);

            var i, ret, handleObj, matched, j,
                handlerQueue = [],
                args = slice.call(arguments),
                handlers = ( jQuery._data(this, "events") || {} )[event.type] || [],
                special = jQuery.event.special[event.type] || {};

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event;
            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }

            // Determine handlers
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);

            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;

                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

                    // Triggered event must either 1) have no namespace, or
                    // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
                    if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {

                        event.handleObj = handleObj;
                        event.data = handleObj.data;

                        ret = ( (jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler )
                            .apply(matched.elem, args);

                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }

            return event.result;
        },

        handlers: function (event, handlers) {
            var sel, handleObj, matches, i,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

            // Find delegate handlers
            // Black-hole SVG <use> instance trees (#13180)
            // Avoid non-left-click bubbling in Firefox (#3861)
            if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {

                /* jshint eqeqeq: false */
                for (; cur != this; cur = cur.parentNode || this) {
                    /* jshint eqeqeq: true */

                    // Don't check non-elements (#13208)
                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];

                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";

                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ?
                                    jQuery(sel, this).index(cur) >= 0 :
                                    jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (matches[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({elem: cur, handlers: matches});
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            if (delegateCount < handlers.length) {
                handlerQueue.push({elem: this, handlers: handlers.slice(delegateCount)});
            }

            return handlerQueue;
        },

        fix: function (event) {
            if (event[jQuery.expando]) {
                return event;
            }

            // Create a writable copy of the event object and normalize some properties
            var i, prop, copy,
                type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[type];

            if (!fixHook) {
                this.fixHooks[type] = fixHook =
                    rmouseEvent.test(type) ? this.mouseHooks :
                        rkeyEvent.test(type) ? this.keyHooks :
                            {};
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

            event = new jQuery.Event(originalEvent);

            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }

            // Support: IE<9
            // Fix target property (#1925)
            if (!event.target) {
                event.target = originalEvent.srcElement || document;
            }

            // Support: Chrome 23+, Safari?
            // Target should not be a text node (#504, #13143)
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }

            // Support: IE<9
            // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
            event.metaKey = !!event.metaKey;

            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },

        // Includes some event props shared by KeyEvent and MouseEvent
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

        fixHooks: {},

        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (event, original) {

                // Add which for key events
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }

                return event;
            }
        },

        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (event, original) {
                var body, eventDoc, doc,
                    button = original.button,
                    fromElement = original.fromElement;

                // Calculate pageX/Y if missing and clientX/Y available
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;

                    event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
                    event.pageY = original.clientY + ( doc && doc.scrollTop || body && body.scrollTop || 0 ) - ( doc && doc.clientTop || body && body.clientTop || 0 );
                }

                // Add relatedTarget, if necessary
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                }

                // Add which for click: 1 === left; 2 === middle; 3 === right
                // Note: button is not normalized, so don't use it
                if (!event.which && button !== undefined) {
                    event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
                }

                return event;
            }
        },

        special: {
            load: {
                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {
                // Fire native event if possible so blur/focus sequence is correct
                trigger: function () {
                    if (this !== safeActiveElement() && this.focus) {
                        try {
                            this.focus();
                            return false;
                        } catch (e) {
                            // Support: IE<9
                            // If we error on focus to hidden element (#1486, #12518),
                            // let .trigger() run the handlers
                        }
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                // For checkbox, fire native event so checked state will be right
                trigger: function () {
                    if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                        this.click();
                        return false;
                    }
                },

                // For cross-browser consistency, don't fire native .click() on links
                _default: function (event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },

            beforeunload: {
                postDispatch: function (event) {

                    // Support: Firefox 20+
                    // Firefox doesn't alert if the returnValue field is not set.
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },

        simulate: function (type, elem, event, bubble) {
            // Piggyback on a donor event to simulate a different one.
            // Fake originalEvent to avoid donor's stopPropagation, but if the
            // simulated event prevents default then we do the same on the donor.
            var e = jQuery.extend(
                new jQuery.Event(),
                event,
                {
                    type: type,
                    isSimulated: true,
                    originalEvent: {}
                }
            );
            if (bubble) {
                jQuery.event.trigger(e, null, elem);
            } else {
                jQuery.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };

    jQuery.removeEvent = document.removeEventListener ?
        function (elem, type, handle) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle, false);
            }
        } :
        function (elem, type, handle) {
            var name = "on" + type;

            if (elem.detachEvent) {

                // #8545, #7054, preventing memory leaks for custom events in IE6-8
                // detachEvent needed property on element, by name of that event, to properly expose it to GC
                if (typeof elem[name] === strundefined) {
                    elem[name] = null;
                }

                elem.detachEvent(name, handle);
            }
        };

    jQuery.Event = function (src, props) {
        // Allow instantiation without the 'new' keyword
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }

        // Event object
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented ||
            src.defaultPrevented === undefined &&
            // Support: IE < 9, Android < 4.0
            src.returnValue === false ?
                returnTrue :
                returnFalse;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if (props) {
            jQuery.extend(this, props);
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();

        // Mark it as fixed
        this[jQuery.expando] = true;
    };

    var rformElems = /^(?:input|select|textarea)$/i,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,

        preventDefault: function () {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;
            if (!e) {
                return;
            }

            // If preventDefault exists, run it on the original event
            if (e.preventDefault) {
                e.preventDefault();

                // Support: IE
                // Otherwise set the returnValue property of the original event to false
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;
            if (!e) {
                return;
            }
            // If stopPropagation exists, run it on the original event
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            // Support: IE
            // Set the cancelBubble property of the original event to true
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;

            this.isImmediatePropagationStopped = returnTrue;

            if (e && e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }

            this.stopPropagation();
        }
    };


// IE submit delegation
    if (!support.submitBubbles) {

        jQuery.event.special.submit = {
            setup: function () {
                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }

                // Lazy-add a submit handler when a descendant form may potentially be submitted
                jQuery.event.add(this, "click._submit keypress._submit", function (e) {
                    // Node name check avoids a VML-related crash in IE (#9807)
                    var elem = e.target,
                        form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !jQuery._data(form, "submitBubbles")) {
                        jQuery.event.add(form, "submit._submit", function (event) {
                            event._submit_bubble = true;
                        });
                        jQuery._data(form, "submitBubbles", true);
                    }
                });
                // return undefined since we don't need an event listener
            },

            postDispatch: function (event) {
                // If form was submitted by the user, bubble the event up the tree
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true);
                    }
                }
            },

            teardown: function () {
                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }

                // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
                jQuery.event.remove(this, "._submit");
            }
        };
    }

// IE change delegation and checkbox/radio fix
    if (!support.changeBubbles) {

        jQuery.event.special.change = {

            setup: function () {

                if (rformElems.test(this.nodeName)) {
                    // IE doesn't fire change on a check/radio until blur; trigger it on click
                    // after a propertychange. Eat the blur-change in special.change.handle.
                    // This still fires onchange a second time for check/radio after blur.
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function (event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true;
                            }
                        });
                        jQuery.event.add(this, "click._change", function (event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false;
                            }
                            // Allow triggered, simulated change events (#11500)
                            jQuery.event.simulate("change", this, event, true);
                        });
                    }
                    return false;
                }
                // Delegated event; lazy-add a change handler on descendant inputs
                jQuery.event.add(this, "beforeactivate._change", function (e) {
                    var elem = e.target;

                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
                        jQuery.event.add(elem, "change._change", function (event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true);
                            }
                        });
                        jQuery._data(elem, "changeBubbles", true);
                    }
                });
            },

            handle: function (event) {
                var elem = event.target;

                // Swallow native change events from checkbox/radio, we already triggered them above
                if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                    return event.handleObj.handler.apply(this, arguments);
                }
            },

            teardown: function () {
                jQuery.event.remove(this, "._change");

                return !rformElems.test(this.nodeName);
            }
        };
    }

// Create "bubbling" focus and blur events
    if (!support.focusinBubbles) {
        jQuery.each({focus: "focusin", blur: "focusout"}, function (orig, fix) {

            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function (event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
            };

            jQuery.event.special[fix] = {
                setup: function () {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data(doc, fix);

                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    jQuery._data(doc, fix, ( attaches || 0 ) + 1);
                },
                teardown: function () {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data(doc, fix) - 1;

                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        jQuery._removeData(doc, fix);
                    } else {
                        jQuery._data(doc, fix, attaches);
                    }
                }
            };
        });
    }

    jQuery.fn.extend({

        on: function (types, selector, data, fn, /*INTERNAL*/ one) {
            var type, origFn;

            // Types can be a map of types/handlers
            if (typeof types === "object") {
                // ( types-Object, selector, data )
                if (typeof selector !== "string") {
                    // ( types-Object, data )
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one);
                }
                return this;
            }

            if (data == null && fn == null) {
                // ( types, fn )
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    // ( types, selector, fn )
                    fn = data;
                    data = undefined;
                } else {
                    // ( types, data, fn )
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }

            if (one === 1) {
                origFn = fn;
                fn = function (event) {
                    // Can use an empty set, since event contains the info
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                // Use same guid so caller can remove using origFn
                fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
            }
            return this.each(function () {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function (types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function (types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(
                    handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if (typeof types === "object") {
                // ( types-object [, selector] )
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function () {
                jQuery.event.remove(this, types, fn, selector);
            });
        },

        trigger: function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function (type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function (time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";

        return this.queue(type, function (next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function () {
                clearTimeout(timeout);
            };
        });
    };


    var nonce = jQuery.now();

    var rquery = (/\?/);


    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

    jQuery.parseJSON = function (data) {
        // Attempt to parse using the native JSON parser first
        if (window.JSON && window.JSON.parse) {
            // Support: Android 2.3
            // Workaround failure to string-cast null input
            return window.JSON.parse(data + "");
        }

        var requireNonComma,
            depth = null,
            str = jQuery.trim(data + "");

        // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
        // after removing valid tokens
        return str && !jQuery.trim(str.replace(rvalidtokens, function (token, comma, open, close) {

            // Force termination if we see a misplaced comma
            if (requireNonComma && comma) {
                depth = 0;
            }

            // Perform no more replacements after returning to outermost depth
            if (depth === 0) {
                return token;
            }

            // Commas must not follow "[", "{", or ","
            requireNonComma = open || comma;

            // Determine new depth
            // array/object open ("[" or "{"): depth += true - false (increment)
            // array/object close ("]" or "}"): depth += false - true (decrement)
            // other cases ("," or primitive): depth += true - true (numeric cast)
            depth += !close - !open;

            // Remove this token
            return "";
        })) ?
            ( Function("return " + str) )() :
            jQuery.error("Invalid JSON: " + data);
    };


// Cross-browser xml parsing
    jQuery.parseXML = function (data) {
        var xml, tmp;
        if (!data || typeof data !== "string") {
            return null;
        }
        try {
            if (window.DOMParser) { // Standard
                tmp = new DOMParser();
                xml = tmp.parseFromString(data, "text/xml");
            } else { // IE
                xml = new ActiveXObject("Microsoft.XMLDOM");
                xml.async = "false";
                xml.loadXML(data);
            }
        } catch (e) {
            xml = undefined;
        }
        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };


    var
        // Document location
        ajaxLocParts,
        ajaxLocation,

        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
        // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
        prefilters = {},

        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
        transports = {},

        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
    try {
        ajaxLocation = location.href;
    } catch (e) {
        // Use the href attribute of an A element
        // since IE will modify it given document.location
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }

// Segment location into parts
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports(structure) {

        // dataTypeExpression is optional and defaults to "*"
        return function (dataTypeExpression, func) {

            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

            if (jQuery.isFunction(func)) {
                // For each dataType in the dataTypeExpression
                while ((dataType = dataTypes[i++])) {
                    // Prepend if requested
                    if (dataType.charAt(0) === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);

                        // Otherwise append
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }

// Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

        var inspected = {},
            seekingTransport = ( structure === transports );

        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !( selected = dataTypeOrTransport );
                }
            });
            return selected;
        }

        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
    function ajaxExtend(target, src) {
        var deep, key,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};

        for (key in src) {
            if (src[key] !== undefined) {
                ( flatOptions[key] ? target : ( deep || (deep = {}) ) )[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }

        return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses(s, jqXHR, responses) {
        var firstDataType, ct, finalDataType, type,
            contents = s.contents,
            dataTypes = s.dataTypes;

        // Remove auto dataType and get content-type in the process
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }

        // Check if we're dealing with a known content-type
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            // Try convertible dataTypes
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev,
            converters = {},
            // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();

        // Create converters map with lowercased keys
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }

        current = dataTypes.shift();

        // Convert to each sequential dataType
        while (current) {

            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }

            // Apply the dataFilter if provided
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }

            prev = current;
            current = dataTypes.shift();

            if (current) {

                // There's only work to do if current dataType is non-auto
                if (current === "*") {

                    current = prev;

                    // Convert response if prev dataType is non-auto and differs from current
                } else if (prev !== "*" && prev !== current) {

                    // Seek a direct converter
                    conv = converters[prev + " " + current] || converters["* " + current];

                    // If none found, seek a pair
                    if (!conv) {
                        for (conv2 in converters) {

                            // If conv2 outputs current
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {

                                // If prev can be converted to accepted input
                                conv = converters[prev + " " + tmp[0]] ||
                                    converters["* " + tmp[0]];
                                if (conv) {
                                    // Condense equivalence converters
                                    if (conv === true) {
                                        conv = converters[conv2];

                                        // Otherwise, insert the intermediate dataType
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if (conv !== true) {

                        // Unless errors are allowed to bubble, catch and return them
                        if (conv && s["throws"]) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }

        return {state: "success", data: response};
    }

    jQuery.extend({

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},

        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            /*
             timeout: 0,
             data: null,
             dataType: null,
             username: null,
             password: null,
             cache: null,
             throws: false,
             traditional: false,
             headers: {},
             */

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },

            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": jQuery.parseJSON,

                // Parse text as xml
                "text xml": jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function (target, settings) {
            return settings ?

                // Building a settings object
                ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

                // Extending ajaxSettings
                ajaxExtend(jQuery.ajaxSettings, target);
        },

        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),

        // Main method
        ajax: function (url, options) {

            // If url is an object, simulate pre-1.5 signature
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var // Cross-domain detection vars
                parts,
                // Loop variable
                i,
                // URL without anti-cache param
                cacheURL,
                // Response headers as string
                responseHeadersString,
                // timeout handle
                timeoutTimer,

                // To know if global events are to be dispatched
                fireGlobals,

                transport,
                // Response headers
                responseHeaders,
                // Create the final options object
                s = jQuery.ajaxSetup({}, options),
                // Callbacks context
                callbackContext = s.context || s,
                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
                    jQuery(callbackContext) :
                    jQuery.event,
                // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                // Status-dependent callbacks
                statusCode = s.statusCode || {},
                // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},
                // The jqXHR state
                state = 0,
                // Default abort message
                strAbort = "canceled",
                // Fake xhr
                jqXHR = {
                    readyState: 0,

                    // Builds headers hashtable if needed
                    getResponseHeader: function (key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },

                    // Raw string
                    getAllResponseHeaders: function () {
                        return state === 2 ? responseHeadersString : null;
                    },

                    // Caches the header
                    setRequestHeader: function (name, value) {
                        var lname = name.toLowerCase();
                        if (!state) {
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },

                    // Overrides response content-type header
                    overrideMimeType: function (type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    },

                    // Status-dependent callbacks
                    statusCode: function (map) {
                        var code;
                        if (map) {
                            if (state < 2) {
                                for (code in map) {
                                    // Lazy-add the new callback in a way that preserves old ones
                                    statusCode[code] = [statusCode[code], map[code]];
                                }
                            } else {
                                // Execute the appropriate callbacks
                                jqXHR.always(map[jqXHR.status]);
                            }
                        }
                        return this;
                    },

                    // Cancel the request
                    abort: function (statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };

            // Attach deferreds
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;

            // Remove hash character (#7531: and string promotion)
            // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");

            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;

            // Extract dataTypes list
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

            // A cross-domain request is in order when we have a protocol:host:port mismatch
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!( parts &&
                    ( parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] ||
                    ( parts[3] || ( parts[1] === "http:" ? "80" : "443" ) ) !==
                    ( ajaxLocParts[3] || ( ajaxLocParts[1] === "http:" ? "80" : "443" ) ) )
                );
            }

            // Convert data if not already a string
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }

            // Apply prefilters
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

            // If request was aborted inside a prefilter, stop there
            if (state === 2) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            fireGlobals = s.global;

            // Watch for a new set of requests
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test(s.type);

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            cacheURL = s.url;

            // More options handling for requests with no content
            if (!s.hasContent) {

                // If data is available, append data to url
                if (s.data) {
                    cacheURL = ( s.url += ( rquery.test(cacheURL) ? "&" : "?" ) + s.data );
                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add anti-cache in url if needed
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ?

                        // If there is already a '_' parameter, set its value
                        cacheURL.replace(rts, "$1_=" + nonce++) :

                        // Otherwise add one to the end
                        cacheURL + ( rquery.test(cacheURL) ? "&" : "?" ) + "_=" + nonce++;
                }
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }

            // Set the correct header, if data is being sent
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }

            // Set the Accepts header for the server, depending on the dataType
            // jqXHR.setRequestHeader(
            //     "Accept",
            //     s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
            //         s.accepts[s.dataTypes[0]] + ( s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
            //         s.accepts["*"]
            // );

            // Check for headers option
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }

            // Allow custom headers/mimetypes and early abort
            if (s.beforeSend && ( s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2 )) {
                // Abort if not done already and return
                return jqXHR.abort();
            }

            // aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            for (i in {success: 1, error: 1, complete: 1}) {
                jqXHR[i](s[i]);
            }

            // Get transport
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

            // If no transport, we auto-abort
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;

                // Send global event
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }
                // Timeout
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function () {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }

                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    // Propagate exception as error if not done
                    if (state < 2) {
                        done(-1, e);
                        // Simply rethrow otherwise
                    } else {
                        throw e;
                    }
                }
            }

            // Callback for when everything is done
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;

                // Called once
                if (state === 2) {
                    return;
                }

                // State is "done" now
                state = 2;

                // Clear timeout if it exists
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;

                // Get response data
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert(s, response, jqXHR, isSuccess);

                // If successful, handle type chaining
                if (isSuccess) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }

                    // if no content
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";

                        // if not modified
                    } else if (status === 304) {
                        statusText = "notmodified";

                        // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    // We extract error from statusText
                    // then normalize statusText and status for non-aborts
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = ( nativeStatusText || statusText ) + "";

                // Success/Error
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }

                // Status-dependent callbacks
                jqXHR.statusCode(statusCode);
                statusCode = undefined;

                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError",
                        [jqXHR, s, isSuccess ? success : error]);
                }

                // Complete
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    // Handle the global AJAX counter
                    if (!( --jQuery.active )) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }

            return jqXHR;
        },

        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },

        getScript: function (url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });

    jQuery.each(["get", "post"], function (i, method) {
        jQuery[method] = function (url, data, callback, type) {
            // shift arguments if data argument was omitted
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });

// Attach a bunch of functions for handling common AJAX events
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
        jQuery.fn[type] = function (fn) {
            return this.on(type, fn);
        };
    });


    jQuery._evalUrl = function (url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        });
    };


    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
        var name;

        if (jQuery.isArray(obj)) {
            // Serialize array item.
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {
                    // Treat each array item as a scalar.
                    add(prefix, v);

                } else {
                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams(prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add);
                }
            });

        } else if (!traditional && jQuery.type(obj) === "object") {
            // Serialize object item.
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }

        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }

// Serialize an array of form elements or a set of
// key/values into a query string
    jQuery.param = function (a, traditional) {
        var prefix,
            s = [],
            add = function (key, value) {
                // If value is a function, invoke it and return its value
                value = jQuery.isFunction(value) ? value() : ( value == null ? "" : value );
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };

        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }

        // If an array was passed in, assume that it is an array of form elements.
        if (jQuery.isArray(a) || ( a.jquery && !jQuery.isPlainObject(a) )) {
            // Serialize the form elements
            jQuery.each(a, function () {
                add(this.name, this.value);
            });

        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }

        // Return the resulting serialization
        return s.join("&").replace(r20, "+");
    };

    jQuery.fn.extend({
        serialize: function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            })
                .filter(function () {
                    var type = this.type;
                    // Use .is(":disabled") so that fieldset[disabled] works
                    return this.name && !jQuery(this).is(":disabled") &&
                        rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                        ( this.checked || !rcheckableType.test(type) );
                })
                .map(function (i, elem) {
                    var val = jQuery(this).val();

                    return val == null ?
                        null :
                        jQuery.isArray(val) ?
                            jQuery.map(val, function (val) {
                                return {name: elem.name, value: val.replace(rCRLF, "\r\n")};
                            }) :
                            {name: elem.name, value: val.replace(rCRLF, "\r\n")};
                }).get();
        }
    });


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
        // Support: IE6+
        function () {

            // XHR cannot access local files, always use ActiveX for that case
            return !this.isLocal &&

                // Support: IE7-8
                // oldIE XHR does not support non-RFC2616 methods (#13240)
                // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
                // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
                // Although this check for six methods instead of eight
                // since IE also does not support "trace" and "connect"
                /^(get|post|head|put|delete|options)$/i.test(this.type) &&

                createStandardXHR() || createActiveXHR();
        } :
        // For all other browsers, use the standard XMLHttpRequest object
        createStandardXHR;

    var xhrId = 0,
        xhrCallbacks = {},
        xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
    if (window.ActiveXObject) {
        jQuery(window).on("unload", function () {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](undefined, true);
            }
        });
    }

// Determine support properties
    support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
    xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
    if (xhrSupported) {

        jQuery.ajaxTransport(function (options) {
            // Cross domain only allowed if supported through XMLHttpRequest
            if (!options.crossDomain || support.cors) {

                var callback;

                return {
                    send: function (headers, complete) {
                        var i,
                            xhr = options.xhr(),
                            id = ++xhrId;

                        // Open the socket
                        xhr.open(options.type, options.url, options.async, options.username, options.password);

                        // Apply custom fields if provided
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i];
                            }
                        }

                        // Override mime type if needed
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType);
                        }

                        // X-Requested-With header
                        // For cross-domain requests, seeing as conditions for a preflight are
                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                        // (it can always be set on a per-request basis or even using ajaxSetup)
                        // For same-domain requests, won't change header if already provided.
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }

                        // Set headers
                        for (i in headers) {
                            // Support: IE<9
                            // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
                            // request header to a null-value.
                            //
                            // To keep consistent with other XHR implementations, cast the value
                            // to string and ignore `undefined`.
                            if (headers[i] !== undefined) {
                                xhr.setRequestHeader(i, headers[i] + "");
                            }
                        }

                        if (xhr.upload && options.progress) {
                            xhr.upload.onprogress = options.progress;
                        }

                        // Do send the request
                        // This may raise an exception which is actually
                        // handled in jQuery.ajax (so no try/catch here)
                        xhr.send(( options.hasContent && (options.body || options.data)) || null);

                        // Listener
                        callback = function (_, isAbort) {
                            var status, statusText, responses;

                            // Was never called and is aborted or complete
                            if (callback && ( isAbort || xhr.readyState === 4 )) {
                                // Clean up
                                delete xhrCallbacks[id];
                                callback = undefined;
                                xhr.onreadystatechange = jQuery.noop;

                                // Abort manually if needed
                                if (isAbort) {
                                    if (xhr.readyState !== 4) {
                                        xhr.abort();
                                    }
                                } else {
                                    responses = {};
                                    status = xhr.status;

                                    // Support: IE<10
                                    // Accessing binary-data responseText throws an exception
                                    // (#11426)
                                    if (typeof xhr.responseText === "string") {
                                        responses.text = xhr.responseText;
                                    }

                                    // Firefox throws an exception when accessing
                                    // statusText for faulty cross-domain requests
                                    try {
                                        statusText = xhr.statusText;
                                    } catch (e) {
                                        // We normalize with Webkit giving an empty statusText
                                        statusText = "";
                                    }

                                    // Filter status for non standard behaviors

                                    // If the request is local and we have data: assume a success
                                    // (success with no data won't get notified, that's the best we
                                    // can do given current implementations)
                                    if (!status && options.isLocal && !options.crossDomain) {
                                        status = responses.text ? 200 : 404;
                                        // IE - #1450: sometimes returns 1223 when it should be 204
                                    } else if (status === 1223) {
                                        status = 204;
                                    }
                                }
                            }

                            // Call complete if needed
                            if (responses) {
                                complete(status, statusText, responses, xhr.getAllResponseHeaders());
                            }
                        };

                        if (!options.async) {
                            // if we're in sync mode we fire the callback
                            callback();
                        } else if (xhr.readyState === 4) {
                            // (IE6 & IE7) if it's in cache and has been
                            // retrieved directly we need to fire the callback
                            setTimeout(callback);
                        } else {
                            // Add to the list of active xhr callbacks
                            xhr.onreadystatechange = xhrCallbacks[id] = callback;
                        }
                    },

                    abort: function () {
                        if (callback) {
                            callback(undefined, true);
                        }
                    }
                };
            }
        });
    }

// Functions to create xhrs
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {
        }
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
        }
    }


// Install script dataType
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function (text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });

// Handle cache's special case and global
    jQuery.ajaxPrefilter("script", function (s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });

// Bind script tag hack transport
    jQuery.ajaxTransport("script", function (s) {

        // This transport only deals with cross domain requests
        if (s.crossDomain) {

            var script,
                head = document.head || jQuery("head")[0] || document.documentElement;

            return {

                send: function (_, callback) {

                    script = document.createElement("script");

                    script.async = true;

                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }

                    script.src = s.url;

                    // Attach handlers for all browsers
                    script.onload = script.onreadystatechange = function (_, isAbort) {

                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

                            // Handle memory leak in IE
                            script.onload = script.onreadystatechange = null;

                            // Remove the script
                            if (script.parentNode) {
                                script.parentNode.removeChild(script);
                            }

                            // Dereference the script
                            script = null;

                            // Callback if not abort
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };

                    // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    head.insertBefore(script, head.firstChild);
                },

                abort: function () {
                    if (script) {
                        script.onload(undefined, true);
                    }
                }
            };
        }
    });


    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
            this[callback] = true;
            return callback;
        }
    });

// Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && ( rjsonp.test(s.url) ?
                        "url" :
                        typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data"
                );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if (jsonProp || s.dataTypes[0] === "jsonp") {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
                s.jsonpCallback() :
                s.jsonpCallback;

            // Insert callback into url or form data
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += ( rquery.test(s.url) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function () {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };

            // force json dataType
            s.dataTypes[0] = "json";

            // Install callback
            overwritten = window[callbackName];
            window[callbackName] = function () {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always(function () {
                // Restore preexisting value
                window[callbackName] = overwritten;

                // Save back as free
                if (s[callbackName]) {
                    // make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // save the callback name for future use
                    oldCallbacks.push(callbackName);
                }

                // Call if it was a function and we have a response
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }

                responseContainer = overwritten = undefined;
            });

            // Delegate to script
            return "script";
        }
    });

// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function (data, context, keepScripts) {
        if (!data || typeof data !== "string") {
            return null;
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }
        context = context || document;

        var parsed = rsingleTag.exec(data),
            scripts = !keepScripts && [];

        // Single tag
        if (parsed) {
            return [context.createElement(parsed[1])];
        }

        parsed = jQuery.buildFragment([data], context, scripts);

        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }

        return jQuery.merge([], parsed.childNodes);
    };

    return jQuery;

})();

var stringifyPrimitive = function(v) {
    switch (typeof v) {
        case 'string':
            return v;
        case 'boolean':
            return v ? 'true' : 'false';
        case 'number':
            return isFinite(v) ? v : '';
        default:
            return '';
    }
};

var queryStringify = function(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
        obj = undefined;
    }
    if (typeof obj === 'object') {
        return Object.keys(obj).map(function(k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
            if (Array.isArray(obj[k])) {
                return obj[k].map(function(v) {
                    return ks + encodeURIComponent(stringifyPrimitive(v));
                }).join(sep);
            } else {
                return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }
        }).filter(Boolean).join(sep);

    }
    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
        encodeURIComponent(stringifyPrimitive(obj));
};

var request = function (options, callback) {

    options = $.extend(true, {headers: {}, qs: {}}, options);

    // method
    options.type = options.method;
    delete options.method;

    // progress
    if (options.onProgress) {
        options.progress = options.onProgress;
        delete options.onProgress;
    }

    // qs
    if (options.qs) {
        var qsStr = queryStringify(options.qs);
        if (qsStr) {
            options.url += (options.url.indexOf('?') === -1 ? '?' : '&') + qsStr;
        }
        delete options.qs;
    }

    // json
    if (options.json) {
        options.data = options.body;
        delete options.json;
        delete options.body;
        !options.headers && (options.headers = {});
        options.headers['Content-Type'] = 'application/json';
    }

    // body
    if (options.body) {
        if (!(options.body instanceof Blob || options.body.toString() === '[object File]' || options.body.toString() === '[object Blob]')) {
            options.data = options.body;
            delete options.body;
        }
    }

    // headers
    if (options.headers) {
        var headers = options.headers;
        delete options.headers;
        options.beforeSend = function (xhr) {
            for (var key in headers) {
                if (headers.hasOwnProperty(key) &&
                    key.toLowerCase() !== 'content-length' &&
                    key.toLowerCase() !== 'user-agent' &&
                    key.toLowerCase() !== 'origin' &&
                    key.toLowerCase() !== 'host') {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        };
    }

    var getResponse = function (xhr) {
        var headers = {};
        xhr.getAllResponseHeaders().trim().split('\n').forEach(function (item) {
            if (item) {
                var index = item.indexOf(':');
                var key = item.substr(0, index).trim().toLowerCase();
                var val = item.substr(index + 1).trim();
                headers[key] = val;
            }
        });
        return {
            statusCode: xhr.status,
            statusMessage: xhr.statusText,
            headers: headers
        };
    };

    // callback
    options.success = function (data, state, xhr) {
        callback(null, getResponse(xhr), data);
    };
    options.error = function (xhr) {
        if (xhr.responseText) {
            callback(null, getResponse(xhr), xhr.responseText);
        } else {
            callback(xhr.statusText, getResponse(xhr), xhr.responseText);
        }
    };

    options.dataType = 'text';

    // send
    return $.ajax(options);

};

module.exports = request;


/***/ }),
/* 67 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var session = __webpack_require__(64);
var Async = __webpack_require__(68);
var EventProxy = __webpack_require__(62).EventProxy;
var util = __webpack_require__(54);

// 文件分块上传全过程，暴露的分块上传接口
function sliceUploadFile(params, callback) {
    var self = this;
    var ep = new EventProxy();
    var TaskId = params.TaskId;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var Body = params.Body;
    var ChunkSize = params.ChunkSize || params.SliceSize || self.options.ChunkSize;
    var AsyncLimit = params.AsyncLimit;
    var StorageClass = params.StorageClass || 'Standard';
    var ServerSideEncryption = params.ServerSideEncryption;
    var FileSize;

    var onProgress;
    var onHashProgress = params.onHashProgress;

    // 上传过程中出现错误，返回错误
    ep.on('error', function (err) {
        if (!self._isRunningTask(TaskId)) return;
        return callback(err);
    });

    // 上传分块完成，开始 uploadSliceComplete 操作
    ep.on('upload_complete', function (UploadCompleteData) {
        callback(null, UploadCompleteData);
    });

    // 上传分块完成，开始 uploadSliceComplete 操作
    ep.on('upload_slice_complete', function (UploadData) {
        uploadSliceComplete.call(self, {
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            UploadId: UploadData.UploadId,
            SliceList: UploadData.SliceList,
        }, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            session.removeUsing(UploadData.UploadId);
            if (err) {
                onProgress(null, true);
                return ep.emit('error', err);
            }
            session.removeUploadId(UploadData.UploadId);
            onProgress({loaded: FileSize, total: FileSize}, true);
            ep.emit('upload_complete', data);
        });
    });

    // 获取 UploadId 完成，开始上传每个分片
    ep.on('get_upload_data_finish', function (UploadData) {

        // 处理 UploadId 缓存
        var uuid = session.getFileId(Body, params.ChunkSize, Bucket, Key);
        uuid && session.saveUploadId(uuid, UploadData.UploadId, self.options.UploadIdCacheLimit); // 缓存 UploadId
        session.setUsing(UploadData.UploadId); // 标记 UploadId 为正在使用

        // 获取 UploadId
        onProgress(null, true); // 任务状态开始 uploading
        uploadSliceList.call(self, {
            TaskId: TaskId,
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            Body: Body,
            FileSize: FileSize,
            SliceSize: ChunkSize,
            AsyncLimit: AsyncLimit,
            ServerSideEncryption: ServerSideEncryption,
            UploadData: UploadData,
            onProgress: onProgress
        }, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (err) {
                onProgress(null, true);
                return ep.emit('error', err);
            }
            ep.emit('upload_slice_complete', data);
        });
    });

    // 开始获取文件 UploadId，里面会视情况计算 ETag，并比对，保证文件一致性，也优化上传
    ep.on('get_file_size_finish', function () {

        onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);

        if (params.UploadData.UploadId) {
            ep.emit('get_upload_data_finish', params.UploadData);
        } else {
            var _params = util.extend({
                TaskId: TaskId,
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                Headers: params.Headers,
                StorageClass: StorageClass,
                Body: Body,
                FileSize: FileSize,
                SliceSize: ChunkSize,
                onHashProgress: onHashProgress,
            }, params);
            getUploadIdAndPartList.call(self, _params, function (err, UploadData) {
                if (!self._isRunningTask(TaskId)) return;
                if (err) return ep.emit('error', err);
                params.UploadData.UploadId = UploadData.UploadId;
                params.UploadData.PartList = UploadData.PartList;
                ep.emit('get_upload_data_finish', params.UploadData);
            });
        }
    });

    // 获取上传文件大小
    FileSize = params.ContentLength;
    delete params.ContentLength;
    !params.Headers && (params.Headers = {});
    util.each(params.Headers, function (item, key) {
        if (key.toLowerCase() === 'content-length') {
            delete params.Headers[key];
        }
    });

    // 控制分片大小
    (function () {
        var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 5];
        var AutoChunkSize = 1024 * 1024;
        for (var i = 0; i < SIZE.length; i++) {
            AutoChunkSize = SIZE[i] * 1024 * 1024;
            if (FileSize / AutoChunkSize <= self.options.MaxPartNumber) break;
        }
        params.ChunkSize = params.SliceSize = ChunkSize = Math.max(ChunkSize, AutoChunkSize);
    })();

    // 开始上传
    if (FileSize === 0) {
        params.Body = '';
        params.ContentLength = 0;
        params.SkipTask = true;
        self.putObject(params, function (err, data) {
            if (err) {
                return callback(err);
            }
            callback(null, data);
        });
    } else {
        ep.emit('get_file_size_finish');
    }

}

// 获取上传任务的 UploadId
function getUploadIdAndPartList(params, callback) {
    var TaskId = params.TaskId;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var StorageClass = params.StorageClass;
    var self = this;

    // 计算 ETag
    var ETagMap = {};
    var FileSize = params.FileSize;
    var SliceSize = params.SliceSize;
    var SliceCount = Math.ceil(FileSize / SliceSize);
    var FinishSliceCount = 0;
    var FinishSize = 0;
    var onHashProgress = util.throttleOnProgress.call(self, FileSize, params.onHashProgress);
    var getChunkETag = function (PartNumber, callback) {
        var start = SliceSize * (PartNumber - 1);
        var end = Math.min(start + SliceSize, FileSize);
        var ChunkSize = end - start;

        if (ETagMap[PartNumber]) {
            callback(null, {
                PartNumber: PartNumber,
                ETag: ETagMap[PartNumber],
                Size: ChunkSize
            });
        } else {
            util.fileSlice(params.Body, start, end, false, function (chunkItem) {
                util.getFileMd5(chunkItem, function (err, md5) {
                    if (err) return callback(err);
                    var ETag = '"' + md5 + '"';
                    ETagMap[PartNumber] = ETag;
                    FinishSliceCount += 1;
                    FinishSize += ChunkSize;
                    callback(err, {
                        PartNumber: PartNumber,
                        ETag: ETag,
                        Size: ChunkSize
                    });
                    onHashProgress({loaded: FinishSize, total: FileSize});
                });
            });
        }
    };

    // 通过和文件的 md5 对比，判断 UploadId 是否可用
    var isAvailableUploadList = function (PartList, callback) {
        var PartCount = PartList.length;
        // 如果没有分片，通过
        if (PartCount === 0) {
            return callback(null, true);
        }
        // 检查分片数量
        if (PartCount > SliceCount) {
            return callback(null, false);
        }
        // 检查分片大小
        if (PartCount > 1) {
            var PartSliceSize = Math.max(PartList[0].Size, PartList[1].Size);
            if (PartSliceSize !== SliceSize) {
                return callback(null, false);
            }
        }
        // 逐个分片计算并检查 ETag 是否一致
        var next = function (index) {
            if (index < PartCount) {
                var Part = PartList[index];
                getChunkETag(Part.PartNumber, function (err, chunk) {
                    if (chunk && chunk.ETag === Part.ETag && chunk.Size === Part.Size) {
                        next(index + 1);
                    } else {
                        callback(null, false);
                    }
                });
            } else {
                callback(null, true);
            }
        };
        next(0);
    };

    var ep = new EventProxy();
    ep.on('error', function (errData) {
        if (!self._isRunningTask(TaskId)) return;
        return callback(errData);
    });

    // 存在 UploadId
    ep.on('upload_id_available', function (UploadData) {
        // 转换成 map
        var map = {};
        var list = [];
        util.each(UploadData.PartList, function (item) {
            map[item.PartNumber] = item;
        });
        for (var PartNumber = 1; PartNumber <= SliceCount; PartNumber++) {
            var item = map[PartNumber];
            if (item) {
                item.PartNumber = PartNumber;
                item.Uploaded = true;
            } else {
                item = {
                    PartNumber: PartNumber,
                    ETag: null,
                    Uploaded: false
                };
            }
            list.push(item);
        }
        UploadData.PartList = list;
        callback(null, UploadData);
    });

    // 不存在 UploadId, 初始化生成 UploadId
    ep.on('no_available_upload_id', function () {
        if (!self._isRunningTask(TaskId)) return;
        var _params = util.extend({
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            Headers: util.clone(params.Headers),
            StorageClass: StorageClass,
            Body: params.Body,
        }, params);
        // 获取 File 或 Blob 的 type 属性，如果有，作为文件 Content-Type
        var ContentType = params.Headers['Content-Type'] || (params.Body && params.Body.type);
        if (ContentType) {
            _params.Headers['Content-Type'] = ContentType;
        }
        self.multipartInit(_params, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (err) return ep.emit('error', err);
            var UploadId = data.UploadId;
            if (!UploadId) {
                return callback({Message: 'no upload id'});
            }
            ep.emit('upload_id_available', {UploadId: UploadId, PartList: []});
        });
    });

    // 如果已存在 UploadId，找一个可以用的 UploadId
    ep.on('has_and_check_upload_id', function (UploadIdList) {
        // 串行地，找一个内容一致的 UploadId
        UploadIdList = UploadIdList.reverse();
        Async.eachLimit(UploadIdList, 1, function (UploadId, asyncCallback) {
            if (!self._isRunningTask(TaskId)) return;
            // 如果正在上传，跳过
            if (session.using[UploadId]) {
                asyncCallback(); // 检查下一个 UploadId
                return;
            }
            // 判断 UploadId 是否可用
            wholeMultipartListPart.call(self, {
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                UploadId: UploadId,
            }, function (err, PartListData) {
                if (!self._isRunningTask(TaskId)) return;
                if (err) {
                    session.removeUsing(UploadId);
                    return ep.emit('error', err);
                }
                var PartList = PartListData.PartList;
                PartList.forEach(function (item) {
                    item.PartNumber *= 1;
                    item.Size *= 1;
                    item.ETag = item.ETag || '';
                });
                isAvailableUploadList(PartList, function (err, isAvailable) {
                    if (!self._isRunningTask(TaskId)) return;
                    if (err) return ep.emit('error', err);
                    if (isAvailable) {
                        asyncCallback({
                            UploadId: UploadId,
                            PartList: PartList
                        }); // 马上结束
                    } else {
                        asyncCallback(); // 检查下一个 UploadId
                    }
                });
            });
        }, function (AvailableUploadData) {
            if (!self._isRunningTask(TaskId)) return;
            onHashProgress(null, true);
            if (AvailableUploadData && AvailableUploadData.UploadId) {
                ep.emit('upload_id_available', AvailableUploadData);
            } else {
                ep.emit('no_available_upload_id');
            }
        });
    });

    // 在本地缓存找可用的 UploadId
    ep.on('seek_local_avail_upload_id', function (RemoteUploadIdList) {
        // 在本地找可用的 UploadId
        var uuid = session.getFileId(params.Body, params.ChunkSize, Bucket, Key);
        var LocalUploadIdList = session.getUploadIdList(uuid);
        if (!uuid || !LocalUploadIdList) {
            ep.emit('has_and_check_upload_id', RemoteUploadIdList);
            return;
        }
        var next = function (index) {
            // 如果本地找不到可用 UploadId，再一个个遍历校验远端
            if (index >= LocalUploadIdList.length) {
                ep.emit('has_and_check_upload_id', RemoteUploadIdList);
                return;
            }
            var UploadId = LocalUploadIdList[index];
            // 如果不在远端 UploadId 列表里，跳过并删除
            if (!util.isInArray(RemoteUploadIdList, UploadId)) {
                session.removeUploadId(UploadId);
                next(index + 1);
                return;
            }
            // 如果正在上传，跳过
            if (session.using[UploadId]) {
                next(index + 1);
                return;
            }
            // 判断 UploadId 是否存在线上
            wholeMultipartListPart.call(self, {
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                UploadId: UploadId,
            }, function (err, PartListData) {
                if (!self._isRunningTask(TaskId)) return;
                if (err) {
                    // 如果 UploadId 获取会出错，跳过并删除
                    session.removeUploadId(UploadId);
                    next(index + 1);
                } else {
                    // 找到可用 UploadId
                    ep.emit('upload_id_available', {
                        UploadId: UploadId,
                        PartList: PartListData.PartList,
                    });
                }
            });
        };
        next(0);
    });

    // 获取线上 UploadId 列表
    ep.on('get_remote_upload_id_list', function (RemoteUploadIdList) {
        // 获取符合条件的 UploadId 列表，因为同一个文件可以有多个上传任务。
        wholeMultipartList.call(self, {
            Bucket: Bucket,
            Region: Region,
            Key: Key,
        }, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (err) {
                return ep.emit('error', err);
            }
            // 整理远端 UploadId 列表
            var RemoteUploadIdList = util.filter(data.UploadList, function (item) {
                return item.Key === Key && (!StorageClass || item.StorageClass.toUpperCase() === StorageClass.toUpperCase());
            }).reverse().map(function (item) {
                return item.UploadId || item.UploadID;
            });
            if (RemoteUploadIdList.length) {
                ep.emit('seek_local_avail_upload_id', RemoteUploadIdList);
            } else {
                // 远端没有 UploadId，清理缓存的 UploadId
                var uuid = session.getFileId(params.Body, params.ChunkSize, Bucket, Key), LocalUploadIdList;
                if (uuid && (LocalUploadIdList = session.getUploadIdList(uuid))) {
                    util.each(LocalUploadIdList, function (UploadId) {
                        session.removeUploadId(UploadId);
                    });
                }
                ep.emit('no_available_upload_id');
            }
        });
    });

    // 开始找可用 UploadId
    ep.emit('get_remote_upload_id_list');

}

// 获取符合条件的全部上传任务 (条件包括 Bucket, Region, Prefix)
function wholeMultipartList(params, callback) {
    var self = this;
    var UploadList = [];
    var sendParams = {
        Bucket: params.Bucket,
        Region: params.Region,
        Prefix: params.Key
    };
    var next = function () {
        self.multipartList(sendParams, function (err, data) {
            if (err) return callback(err);
            UploadList.push.apply(UploadList, data.Upload || []);
            if (data.IsTruncated === 'true') { // 列表不完整
                sendParams.KeyMarker = data.NextKeyMarker;
                sendParams.UploadIdMarker = data.NextUploadIdMarker;
                next();
            } else {
                callback(null, {UploadList: UploadList});
            }
        });
    };
    next();
}

// 获取指定上传任务的分块列表
function wholeMultipartListPart(params, callback) {
    var self = this;
    var PartList = [];
    var sendParams = {
        Bucket: params.Bucket,
        Region: params.Region,
        Key: params.Key,
        UploadId: params.UploadId
    };
    var next = function () {
        self.multipartListPart(sendParams, function (err, data) {
            if (err) return callback(err);
            PartList.push.apply(PartList, data.Part || []);
            if (data.IsTruncated === 'true') { // 列表不完整
                sendParams.PartNumberMarker = data.NextPartNumberMarker;
                next();
            } else {
                callback(null, {PartList: PartList});
            }
        });
    };
    next();
}

// 上传文件分块，包括
/*
 UploadId (上传任务编号)
 AsyncLimit (并发量)，
 SliceList (上传的分块数组)，
 FilePath (本地文件的位置)，
 SliceSize (文件分块大小)
 FileSize (文件大小)
 onProgress (上传成功之后的回调函数)
 */
function uploadSliceList(params, cb) {
    var self = this;
    var TaskId = params.TaskId;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var UploadData = params.UploadData;
    var FileSize = params.FileSize;
    var SliceSize = params.SliceSize;
    var ChunkParallel = Math.min(params.AsyncLimit || self.options.ChunkParallelLimit || 1, 256);
    var Body = params.Body;
    var SliceCount = Math.ceil(FileSize / SliceSize);
    var FinishSize = 0;
    var ServerSideEncryption = params.ServerSideEncryption;
    var needUploadSlices = util.filter(UploadData.PartList, function (SliceItem) {
        if (SliceItem['Uploaded']) {
            FinishSize += SliceItem['PartNumber'] >= SliceCount ? (FileSize % SliceSize || SliceSize) : SliceSize;
        }
        return !SliceItem['Uploaded'];
    });
    var onProgress = params.onProgress;

    Async.eachLimit(needUploadSlices, ChunkParallel, function (SliceItem, asyncCallback) {
        if (!self._isRunningTask(TaskId)) return;
        var PartNumber = SliceItem['PartNumber'];
        var currentSize = Math.min(FileSize, SliceItem['PartNumber'] * SliceSize) - (SliceItem['PartNumber'] - 1) * SliceSize;
        var preAddSize = 0;
        uploadSliceItem.call(self, {
            TaskId: TaskId,
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            SliceSize: SliceSize,
            FileSize: FileSize,
            PartNumber: PartNumber,
            ServerSideEncryption: ServerSideEncryption,
            Body: Body,
            UploadData: UploadData,
            onProgress: function (data) {
                FinishSize += data.loaded - preAddSize;
                preAddSize = data.loaded;
                onProgress({loaded: FinishSize, total: FileSize});
            },
        }, function (err, data) {
            if (!self._isRunningTask(TaskId)) return;
            if (util.isBrowser && !err && !data.ETag) {
                err = 'get ETag error, please add "ETag" to CORS ExposeHeader setting.';
            }
            if (err) {
                FinishSize -= preAddSize;
            } else {
                FinishSize += currentSize - preAddSize;
                SliceItem.ETag = data.ETag;
            }
            asyncCallback(err || null, data);
        });
    }, function (err) {
        if (!self._isRunningTask(TaskId)) return;
        if (err)  return cb(err);
        cb(null, {
            UploadId: UploadData.UploadId,
            SliceList: UploadData.PartList
        });
    });
}

// 上传指定分片
function uploadSliceItem(params, callback) {
    var self = this;
    var TaskId = params.TaskId;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var FileSize = params.FileSize;
    var FileBody = params.Body;
    var PartNumber = params.PartNumber * 1;
    var SliceSize = params.SliceSize;
    var ServerSideEncryption = params.ServerSideEncryption;
    var UploadData = params.UploadData;
    var ChunkRetryTimes = self.options.ChunkRetryTimes + 1;

    var start = SliceSize * (PartNumber - 1);

    var ContentLength = SliceSize;

    var end = start + SliceSize;

    if (end > FileSize) {
        end = FileSize;
        ContentLength = end - start;
    }

    var PartItem = UploadData.PartList[PartNumber - 1];
    Async.retry(ChunkRetryTimes, function (tryCallback) {
        if (!self._isRunningTask(TaskId)) return;
        util.fileSlice(FileBody, start, end, true, function (Body) {
            self.multipartUpload({
                TaskId: TaskId,
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                ContentLength: ContentLength,
                PartNumber: PartNumber,
                UploadId: UploadData.UploadId,
                ServerSideEncryption: ServerSideEncryption,
                Body: Body,
                onProgress: params.onProgress,
            }, function (err, data) {
                if (!self._isRunningTask(TaskId)) return;
                if (err) {
                    return tryCallback(err);
                } else {
                    PartItem.Uploaded = true;
                    return tryCallback(null, data);
                }
            });
        });
    }, function (err, data) {
        if (!self._isRunningTask(TaskId)) return;
        return callback(err, data);
    });
}


// 完成分块上传
function uploadSliceComplete(params, callback) {
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var UploadId = params.UploadId;
    var SliceList = params.SliceList;
    var self = this;
    var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;
    var Parts = SliceList.map(function (item) {
        return {
            PartNumber: item.PartNumber,
            ETag: item.ETag
        };
    });
    // 完成上传的请求也做重试
    Async.retry(ChunkRetryTimes, function (tryCallback) {
        self.multipartComplete({
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            UploadId: UploadId,
            Parts: Parts
        }, tryCallback);
    }, function (err, data) {
        callback(err, data);
    });
}

// 抛弃分块上传任务
/*
 AsyncLimit (抛弃上传任务的并发量)，
 UploadId (上传任务的编号，当 Level 为 task 时候需要)
 Level (抛弃分块上传任务的级别，task : 抛弃指定的上传任务，file ： 抛弃指定的文件对应的上传任务，其他值 ：抛弃指定Bucket 的全部上传任务)
 */
function abortUploadTask(params, callback) {
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var UploadId = params.UploadId;
    var Level = params.Level || 'task';
    var AsyncLimit = params.AsyncLimit;
    var self = this;

    var ep = new EventProxy();

    ep.on('error', function (errData) {
        return callback(errData);
    });

    // 已经获取到需要抛弃的任务列表
    ep.on('get_abort_array', function (AbortArray) {
        abortUploadTaskArray.call(self, {
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            Headers: params.Headers,
            AsyncLimit: AsyncLimit,
            AbortArray: AbortArray
        }, function (err, data) {
            if (err) {
                return callback(err);
            }
            callback(null, data);
        });
    });

    if (Level === 'bucket') {
        // Bucket 级别的任务抛弃，抛弃该 Bucket 下的全部上传任务
        wholeMultipartList.call(self, {
            Bucket: Bucket,
            Region: Region
        }, function (err, data) {
            if (err) {
                return callback(err);
            }
            ep.emit('get_abort_array', data.UploadList || []);
        });
    } else if (Level === 'file') {
        // 文件级别的任务抛弃，抛弃该文件的全部上传任务
        if (!Key) return callback({error: 'abort_upload_task_no_key'});
        wholeMultipartList.call(self, {
            Bucket: Bucket,
            Region: Region,
            Key: Key
        }, function (err, data) {
            if (err) {
                return callback(err);
            }
            ep.emit('get_abort_array', data.UploadList || []);
        });
    } else if (Level === 'task') {
        // 单个任务级别的任务抛弃，抛弃指定 UploadId 的上传任务
        if (!UploadId) return callback({error: 'abort_upload_task_no_id'});
        if (!Key) return callback({error: 'abort_upload_task_no_key'});
        ep.emit('get_abort_array', [{
            Key: Key,
            UploadId: UploadId
        }]);
    } else {
        return callback({error: 'abort_unknown_level'});
    }
}

// 批量抛弃分块上传任务
function abortUploadTaskArray(params, callback) {

    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var AbortArray = params.AbortArray;
    var AsyncLimit = params.AsyncLimit || 1;
    var self = this;

    var index = 0;
    var resultList = new Array(AbortArray.length);
    Async.eachLimit(AbortArray, AsyncLimit, function (AbortItem, callback) {
        var eachIndex = index;
        if (Key && Key !== AbortItem.Key) {
            resultList[eachIndex] = {error: {KeyNotMatch: true}};
            callback(null);
            return;
        }
        var UploadId = AbortItem.UploadId || AbortItem.UploadID;

        self.multipartAbort({
            Bucket: Bucket,
            Region: Region,
            Key: AbortItem.Key,
            Headers: params.Headers,
            UploadId: UploadId
        }, function (err, data) {
            var task = {
                Bucket: Bucket,
                Region: Region,
                Key: AbortItem.Key,
                UploadId: UploadId
            };
            resultList[eachIndex] = {error: err, task: task};
            callback(null);
        });
        index++;

    }, function (err) {
        if (err) {
            return callback(err);
        }

        var successList = [];
        var errorList = [];

        for (var i = 0, len = resultList.length; i < len; i++) {
            var item = resultList[i];
            if (item['task']) {
                if (item['error']) {
                    errorList.push(item['task']);
                } else {
                    successList.push(item['task']);
                }
            }
        }

        return callback(null, {
            successList: successList,
            errorList: errorList
        });
    });
}


// 批量上传文件
function uploadFiles(params, callback) {
    var self = this;

    // 判断多大的文件使用分片上传
    var SliceSize = params.SliceSize === undefined ? self.options.SliceSize : params.SliceSize;

    // 汇总返回进度
    var TotalSize = 0;
    var TotalFinish = 0;
    var onTotalProgress = util.throttleOnProgress.call(self, TotalFinish, params.onProgress);

    // 汇总返回回调
    var unFinishCount = params.files.length;
    var _onTotalFileFinish = params.onFileFinish;
    var resultList = Array(unFinishCount);
    var onTotalFileFinish = function (err, data, options) {
        onTotalProgress(null, true);
        _onTotalFileFinish && _onTotalFileFinish(err, data, options);
        resultList[options.Index] = {
            options: options,
            error: err,
            data: data
        };
        if (--unFinishCount <= 0 && callback) {
            callback(null, {
                files: resultList,
            });
        }
    };

    // 开始处理每个文件
    var taskList = [];
    util.each(params.files, function (fileParams, index) {
        (function () { // 对齐 nodejs 缩进

            var Body = fileParams.Body;
            var FileSize = Body.size || Body.length || 0;
            var fileInfo = {Index: index, TaskId: ''};

            // 更新文件总大小
            TotalSize += FileSize;

            // 整理 option，用于返回给回调
            util.each(fileParams, function (v, k) {
                if (typeof v !== 'object' && typeof v !== 'function') {
                    fileInfo[k] = v;
                }
            });

            // 处理单个文件 TaskReady
            var _onTaskReady = fileParams.onTaskReady;
            var onTaskReady = function (tid) {
                fileInfo.TaskId = tid;
                _onTaskReady && _onTaskReady(tid);
            };
            fileParams.onTaskReady = onTaskReady;

            // 处理单个文件进度
            var PreAddSize = 0;
            var _onProgress = fileParams.onProgress;
            var onProgress = function (info) {
                TotalFinish = TotalFinish - PreAddSize + info.loaded;
                PreAddSize = info.loaded;
                _onProgress && _onProgress(info);
                onTotalProgress({loaded: TotalFinish, total: TotalSize});
            };
            fileParams.onProgress = onProgress;

            // 处理单个文件完成
            var _onFileFinish = fileParams.onFileFinish;
            var onFileFinish = function (err, data) {
                _onFileFinish && _onFileFinish(err, data);
                onTotalFileFinish && onTotalFileFinish(err, data, fileInfo);
            };

            // 添加上传任务
            var api = FileSize >= SliceSize ? 'sliceUploadFile' : 'putObject';
            taskList.push({
                api: api,
                params: fileParams,
                callback: onFileFinish,
            });
        })();
    });
    self._addTasks(taskList);
}

// 分片复制文件
function sliceCopyFile(params, callback) {
    var ep = new EventProxy();

    var self = this;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var CopySource = params.CopySource;
    var m = CopySource.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^/]+\/(.+)$/);
    if (!m) {
        callback({error: 'CopySource format error'});
        return;
    }

    var SourceBucket = m[1];
    var SourceRegion = m[3];
    var SourceKey = decodeURIComponent(m[4]);
    var CopySliceSize = params.CopySliceSize === undefined ? self.options.CopySliceSize : params.CopySliceSize;
    CopySliceSize = Math.max(0, CopySliceSize);

    var ChunkSize = params.CopyChunkSize || this.options.CopyChunkSize;
    var ChunkParallel = this.options.CopyChunkParallelLimit;

    var FinishSize = 0;
    var FileSize;
    var onProgress;

    // 分片复制完成，开始 multipartComplete 操作
    ep.on('copy_slice_complete', function (UploadData) {
        self.multipartComplete({
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            UploadId: UploadData.UploadId,
            Parts: UploadData.PartList,
        },function (err, data) {
            if (err) {
                onProgress(null, true);
                return callback(err);
            }
            onProgress({loaded: FileSize, total: FileSize}, true);
            callback(null, data);
        });
    });

    ep.on('get_copy_data_finish',function (UploadData) {
        Async.eachLimit(UploadData.PartList, ChunkParallel, function (SliceItem, asyncCallback) {
            var PartNumber = SliceItem.PartNumber;
            var CopySourceRange = SliceItem.CopySourceRange;
            var currentSize = SliceItem.end - SliceItem.start;
            var preAddSize = 0;

            copySliceItem.call(self, {
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                CopySource: CopySource,
                UploadId: UploadData.UploadId,
                PartNumber: PartNumber,
                CopySourceRange: CopySourceRange,
                onProgress: function (data) {
                    FinishSize += data.loaded - preAddSize;
                    preAddSize = data.loaded;
                    onProgress({loaded: FinishSize, total: FileSize});
                }
            },function (err,data) {
                if (err) {
                    return asyncCallback(err);
                }
                onProgress({loaded: FinishSize, total: FileSize});

                FinishSize += currentSize - preAddSize;
                SliceItem.ETag = data.ETag;
                asyncCallback(err || null, data);
            });
        }, function (err) {
            if (err) {
                onProgress(null, true);
                return callback(err);
            }

            ep.emit('copy_slice_complete', UploadData);
        });
    });

    ep.on('get_file_size_finish', function (SourceHeaders) {
        // 控制分片大小
        (function () {
            var SIZE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 1024 * 2, 1024 * 4, 1024 * 5];
            var AutoChunkSize = 1024 * 1024;
            for (var i = 0; i < SIZE.length; i++) {
                AutoChunkSize = SIZE[i] * 1024 * 1024;
                if (FileSize / AutoChunkSize <= self.options.MaxPartNumber) break;
            }
            params.ChunkSize = ChunkSize = Math.max(ChunkSize, AutoChunkSize);

            var ChunkCount = Math.ceil(FileSize / ChunkSize);

            var list = [];
            for (var partNumber = 1; partNumber <= ChunkCount; partNumber++) {
                var start = (partNumber - 1) * ChunkSize;
                var end = partNumber * ChunkSize < FileSize ? (partNumber * ChunkSize - 1) : FileSize - 1;
                var item = {
                    PartNumber: partNumber,
                    start: start,
                    end: end,
                    CopySourceRange: "bytes=" + start + "-" + end,
                };
                list.push(item);
            }
            params.PartList = list;
        })();

        var TargetHeader;
        if (params.Headers['x-cos-metadata-directive'] === 'Replaced') {
            TargetHeader = params.Headers;
        } else {
            TargetHeader = SourceHeaders;
        }
        TargetHeader['x-cos-storage-class'] = params.Headers['x-cos-storage-class'] || SourceHeaders['x-cos-storage-class'];
        TargetHeader = util.clearKey(TargetHeader);
        /**
         * 对于归档存储的对象，如果未恢复副本，则不允许 Copy
         */
        if (SourceHeaders['x-cos-storage-class'] === 'ARCHIVE') {
            var restoreHeader = SourceHeaders['x-cos-restore'];
            if (!restoreHeader || restoreHeader === 'ongoing-request="true"') {
                callback({ error: 'Unrestored archive object is not allowed to be copied' });
                return;
            }
        }
        /**
         * 去除一些无用的头部，规避 multipartInit 出错
         * 这些头部通常是在 putObjectCopy 时才使用
         */
        delete TargetHeader['x-cos-copy-source'];
        delete TargetHeader['x-cos-metadata-directive'];
        delete TargetHeader['x-cos-copy-source-If-Modified-Since'];
        delete TargetHeader['x-cos-copy-source-If-Unmodified-Since'];
        delete TargetHeader['x-cos-copy-source-If-Match'];
        delete TargetHeader['x-cos-copy-source-If-None-Match'];
        self.multipartInit({
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            Headers: TargetHeader,
        },function (err,data) {
            if (err) {
                return callback(err);
            }
            params.UploadId = data.UploadId;
            ep.emit('get_copy_data_finish', params);
        });
    });

    // 获取远端复制源文件的大小
    self.headObject({
        Bucket: SourceBucket,
        Region: SourceRegion,
        Key: SourceKey,
    },function(err, data) {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                callback({ErrorStatus: SourceKey + ' Not Exist'});
            } else {
                callback(err);
            }
            return;
        }

        FileSize = params.FileSize = data.headers['content-length'];
        if (FileSize === undefined || !FileSize) {
            callback({error: 'get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.'});
            return;
        }

        onProgress = util.throttleOnProgress.call(self, FileSize, params.onProgress);

        // 开始上传
        if (FileSize <= CopySliceSize) {
            if (!params.Headers['x-cos-metadata-directive']) {
                params.Headers['x-cos-metadata-directive'] = 'Copy';
            }
            self.putObjectCopy(params, function (err, data) {
                if (err) {
                    onProgress(null, true);
                    return callback(err);
                }
                onProgress({loaded: FileSize, total: FileSize}, true);
                callback(err, data);
            });
        } else {
            var resHeaders = data.headers;
            var SourceHeaders = {
                'Cache-Control': resHeaders['cache-control'],
                'Content-Disposition': resHeaders['content-disposition'],
                'Content-Encoding': resHeaders['content-encoding'],
                'Content-Type': resHeaders['content-type'],
                'Expires': resHeaders['expires'],
                'x-cos-storage-class': resHeaders['x-cos-storage-class'],
            };
            util.each(resHeaders, function (v, k) {
                var metaPrefix = 'x-cos-meta-';
                if (k.indexOf(metaPrefix) === 0 && k.length > metaPrefix.length) {
                    SourceHeaders[k] = v;
                }
            });
            ep.emit('get_file_size_finish', SourceHeaders);
        }
    });
}

// 复制指定分片
function copySliceItem(params, callback) {
    var TaskId = params.TaskId;
    var Bucket = params.Bucket;
    var Region = params.Region;
    var Key = params.Key;
    var CopySource = params.CopySource;
    var UploadId = params.UploadId;
    var PartNumber = params.PartNumber * 1;
    var CopySourceRange = params.CopySourceRange;

    var ChunkRetryTimes = this.options.ChunkRetryTimes + 1;
    var self = this;

    Async.retry(ChunkRetryTimes, function (tryCallback) {
        self.uploadPartCopy({
            TaskId: TaskId,
            Bucket: Bucket,
            Region: Region,
            Key: Key,
            CopySource: CopySource,
            UploadId: UploadId,
            PartNumber:PartNumber,
            CopySourceRange:CopySourceRange,
            onProgress:params.onProgress,
        },function (err,data) {
            tryCallback(err || null, data);
        })
    }, function (err, data) {
        return callback(err, data);
    });
}


var API_MAP = {
    sliceUploadFile: sliceUploadFile,
    abortUploadTask: abortUploadTask,
    uploadFiles: uploadFiles,
    sliceCopyFile: sliceCopyFile,
};

module.exports.init = function (COS, task) {
    task.transferToTaskMethod(API_MAP, 'sliceUploadFile');
    util.each(API_MAP, function (fn, apiName) {
        COS.prototype[apiName] = util.apiWrapper(apiName, fn);
    });
};


/***/ }),
/* 68 */
/***/ ((module) => {

var eachLimit = function (arr, limit, iterator, callback) {
    callback = callback || function () {};
    if (!arr.length || limit <= 0) {
        return callback();
    }

    var completed = 0;
    var started = 0;
    var running = 0;

    (function replenish () {
        if (completed >= arr.length) {
            return callback();
        }

        while (running < limit && started < arr.length) {
            started += 1;
            running += 1;
            iterator(arr[started - 1], function (err) {

                if (err) {
                    callback(err);
                    callback = function () {};
                } else {
                    completed += 1;
                    running -= 1;
                    if (completed >= arr.length) {
                        callback();
                    } else {
                        replenish();
                    }
                }
            });
        }
    })();
};

var retry = function (times, iterator, callback) {
    var next = function (index) {
        iterator(function (err, data) {
            if (err && index < times) {
                next(index + 1);
            } else {
                callback(err, data);
            }
        });
    };
    if (times < 1) {
        callback();
    } else {
        next(1);
    }
};

var async = {
    eachLimit: eachLimit,
    retry: retry
};

module.exports = async;

/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HTTP_ERROR_MESSAGE": () => (/* binding */ HTTP_ERROR_MESSAGE),
/* harmony export */   "ELEMENT_MESSAGE_DURATION": () => (/* binding */ ELEMENT_MESSAGE_DURATION),
/* harmony export */   "AUTH_TOKEN_FRONT": () => (/* binding */ AUTH_TOKEN_FRONT),
/* harmony export */   "AUTH_TOKEN_END": () => (/* binding */ AUTH_TOKEN_END),
/* harmony export */   "UPLOAD_IMAGE_TYPE": () => (/* binding */ UPLOAD_IMAGE_TYPE),
/* harmony export */   "UPLOAD_IMAGE_MAX_SIZE": () => (/* binding */ UPLOAD_IMAGE_MAX_SIZE),
/* harmony export */   "REGULAR_EXPRESSION_IDNUMBER": () => (/* binding */ REGULAR_EXPRESSION_IDNUMBER),
/* harmony export */   "SDK_APP_ID": () => (/* binding */ SDK_APP_ID),
/* harmony export */   "VIDEO_CLIENT_ID": () => (/* binding */ VIDEO_CLIENT_ID),
/* harmony export */   "TMC_LIVE_ADDRESS": () => (/* binding */ TMC_LIVE_ADDRESS),
/* harmony export */   "TENCENT_LIVE_BIZ_ID": () => (/* binding */ TENCENT_LIVE_BIZ_ID),
/* harmony export */   "RISK": () => (/* binding */ RISK)
/* harmony export */ });
// 网络连接错误提示信息
var HTTP_ERROR_MESSAGE = "系统出小差了，请联系管理员处理 ≧﹏≦"; // 提示信息停留时间

var ELEMENT_MESSAGE_DURATION = 3000; // 前台存储的token字段名

var AUTH_TOKEN_FRONT = "_PEACH_TOKEN_HOSPITAL"; // 后台存储的token字段名

var AUTH_TOKEN_END = "Token"; // 允许的图片类型列表

var UPLOAD_IMAGE_TYPE = ["bmp", "jpg", "jpeg", "png", "tif", "gif", "pcx", "tga", "exif", "fpx", "svg", "psd", "cdr", "pcd", "dxf", "ufo", "eps,", "ai,", "raw", ",WMF", "webp"]; // 上传图片的最大大小，单位：MB

var UPLOAD_IMAGE_MAX_SIZE = 10; // 正则表达式：身份证号

var REGULAR_EXPRESSION_IDNUMBER = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; // 腾讯im 音视频

var SDK_APP_ID = process.env.VUE_APP_SDK_APP_ID; // 视频clientID

var VIDEO_CLIENT_ID = "19100717375020139551301001"; // TMC直播地址

var TMC_LIVE_ADDRESS = "https://tmclive.100cbc.com/live/49111_"; // IM直播bizID

var TENCENT_LIVE_BIZ_ID = "49111";
var RISK = [{
  name: '禁用',
  val: 1
}, {
  name: '忌用',
  val: 2
}, {
  name: '慎用',
  val: 3
}, {
  name: '酌量',
  val: 4
}];

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Chat)
/* harmony export */ });
/* harmony import */ var core_js_modules_es6_object_define_property_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var core_js_modules_es6_object_define_property_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_define_property_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var core_js_modules_es6_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_promise_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27);
/* harmony import */ var core_js_modules_es6_promise_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tim_js_sdk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(50);
/* harmony import */ var tim_js_sdk__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tim_js_sdk__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _core_tim__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(51);





function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable */



var Chat = /*#__PURE__*/function () {
  // 是否登录成功
  // ready 状态
  function Chat(userID, userSig) {
    _classCallCheck(this, Chat);

    this.tim = _core_tim__WEBPACK_IMPORTED_MODULE_5__.default; // this.isLogin = false;
    // this.isReady = false;

    this.userSig = userSig;
    this.userID = userID;
    this.instance = null;
    this.init();
  }
  /**
   * 初始化
   */


  _createClass(Chat, [{
    key: "init",
    value: function init() {
      // tim登录
      this.login({
        userID: this.userID,
        userSig: this.userSig
      });
    }
  }, {
    key: "login",
    value:
    /**
     * 登录
     * @param {*} options {userID,userSig}
     */
    function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.tim.login(options);

              case 3:
                res = _context.sent;

                if (res.code === 0) {
                  this.isLogin = true;
                }

                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                this.isLogin = false;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function login(_x) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
    /**
     * 登出
     */

  }, {
    key: "logout",
    value: function logout() {
      this.tim.logout();
    }
    /**
     * 将会话设置已读
     * @param {}} conversationID
     */

  }, {
    key: "sendTextMessage",
    value:
    /**
     * 发送文本消息
     * @param {*} to 消息的接收方
     * @param {*} text  消息内容的容器
     */
    function () {
      var _sendTextMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(to, payload) {
        var message, promise;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                message = this.tim.createTextMessage({
                  to: to,
                  conversationType: (tim_js_sdk__WEBPACK_IMPORTED_MODULE_4___default().TYPES.CONV_C2C),
                  payload: payload
                });
                _context2.next = 4;
                return this.tim.sendMessage(message);

              case 4:
                promise = _context2.sent;
                return _context2.abrupt("return", promise);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                console.error("发送失败", _context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function sendTextMessage(_x2, _x3) {
        return _sendTextMessage.apply(this, arguments);
      }

      return sendTextMessage;
    }()
    /**
     * 发送图片消息
     * @param {*} to 消息的接收方
     * @param {*} text  消息内容的容器
     */

  }, {
    key: "sendImageMessage",
    value: function () {
      var _sendImageMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(to, payload) {
        var message, promise;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                message = this.tim.createImageMessage({
                  to: to,
                  conversationType: (tim_js_sdk__WEBPACK_IMPORTED_MODULE_4___default().TYPES.CONV_C2C),
                  payload: payload
                });
                _context3.next = 4;
                return this.tim.sendMessage(message);

              case 4:
                promise = _context3.sent;
                return _context3.abrupt("return", promise);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                console.error("发送失败", _context3.t0);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function sendImageMessage(_x4, _x5) {
        return _sendImageMessage.apply(this, arguments);
      }

      return sendImageMessage;
    }()
    /**
     * 发送自定义消息
     * @param {*} to 消息的接收方
     * @param {*} text  消息内容的容器
     */

  }, {
    key: "sendCustomMessage",
    value: function () {
      var _sendCustomMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(to, payload) {
        var message, promise;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                message = this.tim.createCustomMessage({
                  to: to,
                  conversationType: (tim_js_sdk__WEBPACK_IMPORTED_MODULE_4___default().TYPES.CONV_C2C),
                  payload: payload
                });
                _context4.next = 4;
                return this.tim.sendMessage(message);

              case 4:
                promise = _context4.sent;
                return _context4.abrupt("return", promise);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                console.error("发送失败", _context4.t0);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 8]]);
      }));

      function sendCustomMessage(_x6, _x7) {
        return _sendCustomMessage.apply(this, arguments);
      }

      return sendCustomMessage;
    }()
    /**
    * 创建消息
    * @param {*} to 消息的接收方
    * @param {*} text  消息内容的容器
    * @param {*} msgType  消息类型
    */

  }, {
    key: "createMessage",
    value: function () {
      var _createMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(to, payload, msgType) {
        var message, options, msg;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                message = {};
                options = {
                  to: to,
                  conversationType: (tim_js_sdk__WEBPACK_IMPORTED_MODULE_4___default().TYPES.CONV_C2C),
                  payload: payload
                };
                msg = "";
                _context5.t0 = msgType;
                _context5.next = _context5.t0 === "TEXT" ? 7 : _context5.t0 === "IMAGE" ? 12 : _context5.t0 === "AUDIO" ? 17 : _context5.t0 === "FILE" ? 22 : _context5.t0 === "CUSTOM" ? 27 : _context5.t0 === "VIDEO" ? 32 : _context5.t0 === "FACE" ? 37 : _context5.t0 === "ADDRESS" ? 42 : 47;
                break;

              case 7:
                _context5.next = 9;
                return this.tim.createTextMessage(options);

              case 9:
                message = _context5.sent;
                msg = payload.text;
                return _context5.abrupt("break", 47);

              case 12:
                _context5.next = 14;
                return this.tim.createImageMessage(options);

              case 14:
                message = _context5.sent;
                msg = "[图片]";
                return _context5.abrupt("break", 47);

              case 17:
                _context5.next = 19;
                return this.tim.createAudioMessage(options);

              case 19:
                message = _context5.sent;
                msg = "";
                return _context5.abrupt("break", 47);

              case 22:
                _context5.next = 24;
                return this.tim.createFileMessage(options);

              case 24:
                message = _context5.sent;
                msg = "[文件]";
                return _context5.abrupt("break", 47);

              case 27:
                _context5.next = 29;
                return this.tim.createCustomMessage(options);

              case 29:
                message = _context5.sent;
                msg = "";
                return _context5.abrupt("break", 47);

              case 32:
                _context5.next = 34;
                return this.tim.createVideoMessage(options);

              case 34:
                message = _context5.sent;
                msg = "[视频]";
                return _context5.abrupt("break", 47);

              case 37:
                _context5.next = 39;
                return this.tim.createFaceMessage(options);

              case 39:
                message = _context5.sent;
                msg = "[表情]";
                return _context5.abrupt("break", 47);

              case 42:
                _context5.next = 44;
                return this.tim.createCustomMessage(options);

              case 44:
                message = _context5.sent;
                msg = "";
                return _context5.abrupt("break", 47);

              case 47:
                return _context5.abrupt("return", message);

              case 50:
                _context5.prev = 50;
                _context5.t1 = _context5["catch"](0);
                console.error("发送失败", _context5.t1);

              case 53:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 50]]);
      }));

      function createMessage(_x8, _x9, _x10) {
        return _createMessage.apply(this, arguments);
      }

      return createMessage;
    }()
    /**
    * @param {*} message 消息体
    */

  }, {
    key: "sendMessage",
    value: function () {
      var _sendMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(message) {
        var promise;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.tim.sendMessage(message);

              case 2:
                promise = _context6.sent;
                return _context6.abrupt("return", promise);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function sendMessage(_x11) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
    /**
     * 获取某会话的消息列表
     * @param {*} conversationID 
     * @param {*} nextReqMessageID 
     * @param {*} count 
     */

  }, {
    key: "getMessageList",
    value: function () {
      var _getMessageList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(conversationID, count) {
        var promise;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return this.tim.getMessageList({
                  conversationID: conversationID,
                  count: count
                });

              case 3:
                promise = _context7.sent;
                return _context7.abrupt("return", promise);

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](0);
                console.error("获取某会话的消息列表", _context7.t0);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 7]]);
      }));

      function getMessageList(_x12, _x13) {
        return _getMessageList.apply(this, arguments);
      }

      return getMessageList;
    }()
    /**
     * 获取会话列表
     */

  }, {
    key: "getConversationList",
    value: function () {
      var _getConversationList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var promise;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return this.tim.getConversationList();

              case 3:
                promise = _context8.sent;
                return _context8.abrupt("return", promise);

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](0);
                console.error("获取某会话的消息列表", _context8.t0);

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 7]]);
      }));

      function getConversationList() {
        return _getConversationList.apply(this, arguments);
      }

      return getConversationList;
    }()
  }], [{
    key: "getInstance",
    value: function getInstance(userID, userSig) {
      if (!this.instance) {
        this.instance = new Chat(userID, userSig);
      }

      return this.instance;
    }
  }, {
    key: "setMessageRead",
    value: function setMessageRead(conversationID) {
      this.tim.setMessageRead({
        conversationID: conversationID
      });
    }
  }]);

  return Chat;
}();

_defineProperty(Chat, "tim", void 0);

_defineProperty(Chat, "isLogin", void 0);

_defineProperty(Chat, "userSig", void 0);

_defineProperty(Chat, "userID", void 0);

_defineProperty(Chat, "isReady", false);


})();

/******/ })()
;