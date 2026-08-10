var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "../node_modules/react/cjs/react.production.min.js"(exports2) {
    "use strict";
    var l = /* @__PURE__ */ Symbol.for("react.element");
    var n = /* @__PURE__ */ Symbol.for("react.portal");
    var p = /* @__PURE__ */ Symbol.for("react.fragment");
    var q = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var r = /* @__PURE__ */ Symbol.for("react.profiler");
    var t = /* @__PURE__ */ Symbol.for("react.provider");
    var u = /* @__PURE__ */ Symbol.for("react.context");
    var v = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var w = /* @__PURE__ */ Symbol.for("react.suspense");
    var x = /* @__PURE__ */ Symbol.for("react.memo");
    var y = /* @__PURE__ */ Symbol.for("react.lazy");
    var z = Symbol.iterator;
    function A(a) {
      if (null === a || "object" !== typeof a) return null;
      a = z && a[z] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var B = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } };
    var C = Object.assign;
    var D = {};
    function E(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    E.prototype.isReactComponent = {};
    E.prototype.setState = function(a, b) {
      if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    E.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function F() {
    }
    F.prototype = E.prototype;
    function G(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    var H = G.prototype = new F();
    H.constructor = G;
    C(H, E.prototype);
    H.isPureReactComponent = true;
    var I = Array.isArray;
    var J = Object.prototype.hasOwnProperty;
    var K = { current: null };
    var L2 = { key: true, ref: true, __self: true, __source: true };
    function M(a, b, e) {
      var d, c = {}, k = null, h = null;
      if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L2.hasOwnProperty(d) && (c[d] = b[d]);
      var g = arguments.length - 2;
      if (1 === g) c.children = e;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
        c.children = f;
      }
      if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
      return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
    }
    function N(a, b) {
      return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function O(a) {
      return "object" === typeof a && null !== a && a.$$typeof === l;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var P = /\/+/g;
    function Q(a, b) {
      return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
    }
    function R2(a, b, e, d, c) {
      var k = typeof a;
      if ("undefined" === k || "boolean" === k) a = null;
      var h = false;
      if (null === a) h = true;
      else switch (k) {
        case "string":
        case "number":
          h = true;
          break;
        case "object":
          switch (a.$$typeof) {
            case l:
            case n:
              h = true;
          }
      }
      if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R2(c, b, e, "", function(a2) {
        return a2;
      })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
      h = 0;
      d = "" === d ? "." : d + ":";
      if (I(a)) for (var g = 0; g < a.length; g++) {
        k = a[g];
        var f = d + Q(k, g);
        h += R2(k, b, e, f, c);
      }
      else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R2(k, b, e, f, c);
      else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
      return h;
    }
    function S(a, b, e) {
      if (null == a) return a;
      var d = [], c = 0;
      R2(a, d, "", "", function(a2) {
        return b.call(e, a2, c++);
      });
      return d;
    }
    function T(a) {
      if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
        }, function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
        });
        -1 === a._status && (a._status = 0, a._result = b);
      }
      if (1 === a._status) return a._result.default;
      throw a._result;
    }
    var U = { current: null };
    var V = { transition: null };
    var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
    function X() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    exports2.Children = { map: S, forEach: function(a, b, e) {
      S(a, function() {
        b.apply(this, arguments);
      }, e);
    }, count: function(a) {
      var b = 0;
      S(a, function() {
        b++;
      });
      return b;
    }, toArray: function(a) {
      return S(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
      return a;
    } };
    exports2.Component = E;
    exports2.Fragment = p;
    exports2.Profiler = r;
    exports2.PureComponent = G;
    exports2.StrictMode = q;
    exports2.Suspense = w;
    exports2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
    exports2.act = X;
    exports2.cloneElement = function(a, b, e) {
      if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
      var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
      if (null != b) {
        void 0 !== b.ref && (k = b.ref, h = K.current);
        void 0 !== b.key && (c = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for (f in b) J.call(b, f) && !L2.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (1 === f) d.children = e;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
        d.children = g;
      }
      return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
    };
    exports2.createContext = function(a) {
      a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
      a.Provider = { $$typeof: t, _context: a };
      return a.Consumer = a;
    };
    exports2.createElement = M;
    exports2.createFactory = function(a) {
      var b = M.bind(null, a);
      b.type = a;
      return b;
    };
    exports2.createRef = function() {
      return { current: null };
    };
    exports2.forwardRef = function(a) {
      return { $$typeof: v, render: a };
    };
    exports2.isValidElement = O;
    exports2.lazy = function(a) {
      return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
    };
    exports2.memo = function(a, b) {
      return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
    };
    exports2.startTransition = function(a) {
      var b = V.transition;
      V.transition = {};
      try {
        a();
      } finally {
        V.transition = b;
      }
    };
    exports2.unstable_act = X;
    exports2.useCallback = function(a, b) {
      return U.current.useCallback(a, b);
    };
    exports2.useContext = function(a) {
      return U.current.useContext(a);
    };
    exports2.useDebugValue = function() {
    };
    exports2.useDeferredValue = function(a) {
      return U.current.useDeferredValue(a);
    };
    exports2.useEffect = function(a, b) {
      return U.current.useEffect(a, b);
    };
    exports2.useId = function() {
      return U.current.useId();
    };
    exports2.useImperativeHandle = function(a, b, e) {
      return U.current.useImperativeHandle(a, b, e);
    };
    exports2.useInsertionEffect = function(a, b) {
      return U.current.useInsertionEffect(a, b);
    };
    exports2.useLayoutEffect = function(a, b) {
      return U.current.useLayoutEffect(a, b);
    };
    exports2.useMemo = function(a, b) {
      return U.current.useMemo(a, b);
    };
    exports2.useReducer = function(a, b, e) {
      return U.current.useReducer(a, b, e);
    };
    exports2.useRef = function(a) {
      return U.current.useRef(a);
    };
    exports2.useState = function(a) {
      return U.current.useState(a);
    };
    exports2.useSyncExternalStore = function(a, b, e) {
      return U.current.useSyncExternalStore(a, b, e);
    };
    exports2.useTransition = function() {
      return U.current.useTransition();
    };
    exports2.version = "18.3.1";
  }
});

// ../node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "../node_modules/react/cjs/react.development.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var ReactVersion = "18.3.1";
        var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.element");
        var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = /* @__PURE__ */ Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
        var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = /* @__PURE__ */ Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactCurrentDispatcher = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactCurrentBatchConfig = {
          transition: null
        };
        var ReactCurrentActQueue = {
          current: null,
          // Used to reproduce behavior of `batchedUpdates` in legacy mode.
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false
        };
        var ReactCurrentOwner = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactDebugCurrentFrame = {};
        var currentExtraStackFrame = null;
        function setExtraStackFrame(stack) {
          {
            currentExtraStackFrame = stack;
          }
        }
        {
          ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
            {
              currentExtraStackFrame = stack;
            }
          };
          ReactDebugCurrentFrame.getCurrentStack = null;
          ReactDebugCurrentFrame.getStackAddendum = function() {
            var stack = "";
            if (currentExtraStackFrame) {
              stack += currentExtraStackFrame;
            }
            var impl = ReactDebugCurrentFrame.getCurrentStack;
            if (impl) {
              stack += impl() || "";
            }
            return stack;
          };
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var ReactSharedInternals = {
          ReactCurrentDispatcher,
          ReactCurrentBatchConfig,
          ReactCurrentOwner
        };
        {
          ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
          ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
        }
        function warn(format) {
          {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
        }
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var didWarnStateUpdateForUnmountedComponent = {};
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
              return;
            }
            error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
            didWarnStateUpdateForUnmountedComponent[warningKey] = true;
          }
        }
        var ReactNoopUpdateQueue = {
          /**
           * Checks whether or not this composite component is mounted.
           * @param {ReactClass} publicInstance The instance we want to test.
           * @return {boolean} True if mounted, false otherwise.
           * @protected
           * @final
           */
          isMounted: function(publicInstance) {
            return false;
          },
          /**
           * Forces an update. This should only be invoked when it is known with
           * certainty that we are **not** in a DOM transaction.
           *
           * You may want to call this when you know that some deeper aspect of the
           * component's state has changed but `setState` was not called.
           *
           * This will not invoke `shouldComponentUpdate`, but it will invoke
           * `componentWillUpdate` and `componentDidUpdate`.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, "forceUpdate");
          },
          /**
           * Replaces all of the state. Always use this or `setState` to mutate state.
           * You should treat `this.state` as immutable.
           *
           * There is no guarantee that `this.state` will be immediately updated, so
           * accessing `this.state` after calling this method may return the old value.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} completeState Next state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
            warnNoop(publicInstance, "replaceState");
          },
          /**
           * Sets a subset of the state. This only exists because _pendingState is
           * internal. This provides a merging strategy that is not available to deep
           * properties which is confusing. TODO: Expose pendingState or don't use it
           * during the merge.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} partialState Next partial state to be merged with state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} Name of the calling function in the public API.
           * @internal
           */
          enqueueSetState: function(publicInstance, partialState, callback, callerName) {
            warnNoop(publicInstance, "setState");
          }
        };
        var assign = Object.assign;
        var emptyObject = {};
        {
          Object.freeze(emptyObject);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
            throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
          }
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        {
          var deprecatedAPIs = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          };
          var defineDeprecationWarning = function(methodName, info) {
            Object.defineProperty(Component.prototype, methodName, {
              get: function() {
                warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                return void 0;
              }
            });
          };
          for (var fnName in deprecatedAPIs) {
            if (deprecatedAPIs.hasOwnProperty(fnName)) {
              defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
            }
          }
        }
        function ComponentDummy() {
        }
        ComponentDummy.prototype = Component.prototype;
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
        pureComponentPrototype.constructor = PureComponent;
        assign(pureComponentPrototype, Component.prototype);
        pureComponentPrototype.isPureReactComponent = true;
        function createRef() {
          var refObject = {
            current: null
          };
          {
            Object.seal(refObject);
          }
          return refObject;
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          var warnAboutAccessingKey = function() {
            {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function defineRefPropWarningGetter(props, displayName) {
          var warnAboutAccessingRef = function() {
            {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
        function warnIfStringRefCannotBeAutoConverted(config) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function createElement(type, config, children) {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          var self = null;
          var source = null;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              {
                warnIfStringRefCannotBeAutoConverted(config);
              }
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            self = config.__self === void 0 ? null : config.__self;
            source = config.__source === void 0 ? null : config.__source;
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            {
              if (Object.freeze) {
                Object.freeze(childArray);
              }
            }
            props.children = childArray;
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          {
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
          return newElement;
        }
        function cloneElement(element, config, children) {
          if (element === null || element === void 0) {
            throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
          }
          var propName;
          var props = assign({}, element.props);
          var key = element.key;
          var ref = element.ref;
          var self = element._self;
          var source = element._source;
          var owner = element._owner;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              owner = ReactCurrentOwner.current;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            var defaultProps;
            if (element.type && element.type.defaultProps) {
              defaultProps = element.type.defaultProps;
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                if (config[propName] === void 0 && defaultProps !== void 0) {
                  props[propName] = defaultProps[propName];
                } else {
                  props[propName] = config[propName];
                }
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
          }
          return ReactElement(element.type, key, ref, self, source, owner, props);
        }
        function isValidElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var SEPARATOR = ".";
        var SUBSEPARATOR = ":";
        function escape(key) {
          var escapeRegex = /[=:]/g;
          var escaperLookup = {
            "=": "=0",
            ":": "=2"
          };
          var escapedString = key.replace(escapeRegex, function(match) {
            return escaperLookup[match];
          });
          return "$" + escapedString;
        }
        var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
          return text.replace(userProvidedKeyEscapeRegex, "$&/");
        }
        function getElementKey(element, index) {
          if (typeof element === "object" && element !== null && element.key != null) {
            {
              checkKeyStringCoercion(element.key);
            }
            return escape("" + element.key);
          }
          return index.toString(36);
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if (type === "undefined" || type === "boolean") {
            children = null;
          }
          var invokeCallback = false;
          if (children === null) {
            invokeCallback = true;
          } else {
            switch (type) {
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                }
            }
          }
          if (invokeCallback) {
            var _child = children;
            var mappedChild = callback(_child);
            var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
            if (isArray(mappedChild)) {
              var escapedChildKey = "";
              if (childKey != null) {
                escapedChildKey = escapeUserProvidedKey(childKey) + "/";
              }
              mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                return c;
              });
            } else if (mappedChild != null) {
              if (isValidElement(mappedChild)) {
                {
                  if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                    checkKeyStringCoercion(mappedChild.key);
                  }
                }
                mappedChild = cloneAndReplaceKey(
                  mappedChild,
                  // Keep both the (mapped) and old keys if they differ, just as
                  // traverseAllChildren used to do for objects as children
                  escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                  (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                    // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                    // eslint-disable-next-line react-internal/safe-string-coercion
                    escapeUserProvidedKey("" + mappedChild.key) + "/"
                  ) : "") + childKey
                );
              }
              array.push(mappedChild);
            }
            return 1;
          }
          var child;
          var nextName;
          var subtreeCount = 0;
          var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              child = children[i];
              nextName = nextNamePrefix + getElementKey(child, i);
              subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
            }
          } else {
            var iteratorFn = getIteratorFn(children);
            if (typeof iteratorFn === "function") {
              var iterableChildren = children;
              {
                if (iteratorFn === iterableChildren.entries) {
                  if (!didWarnAboutMaps) {
                    warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
                }
              }
              var iterator = iteratorFn.call(iterableChildren);
              var step;
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getElementKey(child, ii++);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else if (type === "object") {
              var childrenString = String(children);
              throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
            }
          }
          return subtreeCount;
        }
        function mapChildren(children, func, context) {
          if (children == null) {
            return children;
          }
          var result = [];
          var count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function countChildren(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        }
        function forEachChildren(children, forEachFunc, forEachContext) {
          mapChildren(children, function() {
            forEachFunc.apply(this, arguments);
          }, forEachContext);
        }
        function toArray(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        }
        function onlyChild(children) {
          if (!isValidElement(children)) {
            throw new Error("React.Children.only expected to receive a single React element child.");
          }
          return children;
        }
        function createContext(defaultValue) {
          var context = {
            $$typeof: REACT_CONTEXT_TYPE,
            // As a workaround to support multiple concurrent renderers, we categorize
            // some renderers as primary and others as secondary. We only expect
            // there to be two concurrent renderers at most: React Native (primary) and
            // Fabric (secondary); React DOM (primary) and React ART (secondary).
            // Secondary renderers store their context values on separate fields.
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            // Used to track how many concurrent renderers this context currently
            // supports within in a single renderer. Such as parallel server rendering.
            _threadCount: 0,
            // These are circular
            Provider: null,
            Consumer: null,
            // Add these to use same hidden class in VM as ServerContext
            _defaultValue: null,
            _globalName: null
          };
          context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
          };
          var hasWarnedAboutUsingNestedContextConsumers = false;
          var hasWarnedAboutUsingConsumerProvider = false;
          var hasWarnedAboutDisplayNameOnConsumer = false;
          {
            var Consumer = {
              $$typeof: REACT_CONTEXT_TYPE,
              _context: context
            };
            Object.defineProperties(Consumer, {
              Provider: {
                get: function() {
                  if (!hasWarnedAboutUsingConsumerProvider) {
                    hasWarnedAboutUsingConsumerProvider = true;
                    error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                  }
                  return context.Provider;
                },
                set: function(_Provider) {
                  context.Provider = _Provider;
                }
              },
              _currentValue: {
                get: function() {
                  return context._currentValue;
                },
                set: function(_currentValue) {
                  context._currentValue = _currentValue;
                }
              },
              _currentValue2: {
                get: function() {
                  return context._currentValue2;
                },
                set: function(_currentValue2) {
                  context._currentValue2 = _currentValue2;
                }
              },
              _threadCount: {
                get: function() {
                  return context._threadCount;
                },
                set: function(_threadCount) {
                  context._threadCount = _threadCount;
                }
              },
              Consumer: {
                get: function() {
                  if (!hasWarnedAboutUsingNestedContextConsumers) {
                    hasWarnedAboutUsingNestedContextConsumers = true;
                    error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                  return context.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return context.displayName;
                },
                set: function(displayName) {
                  if (!hasWarnedAboutDisplayNameOnConsumer) {
                    warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                    hasWarnedAboutDisplayNameOnConsumer = true;
                  }
                }
              }
            });
            context.Consumer = Consumer;
          }
          {
            context._currentRenderer = null;
            context._currentRenderer2 = null;
          }
          return context;
        }
        var Uninitialized = -1;
        var Pending = 0;
        var Resolved = 1;
        var Rejected = 2;
        function lazyInitializer(payload) {
          if (payload._status === Uninitialized) {
            var ctor = payload._result;
            var thenable = ctor();
            thenable.then(function(moduleObject2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var resolved = payload;
                resolved._status = Resolved;
                resolved._result = moduleObject2;
              }
            }, function(error2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var rejected = payload;
                rejected._status = Rejected;
                rejected._result = error2;
              }
            });
            if (payload._status === Uninitialized) {
              var pending = payload;
              pending._status = Pending;
              pending._result = thenable;
            }
          }
          if (payload._status === Resolved) {
            var moduleObject = payload._result;
            {
              if (moduleObject === void 0) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
              }
            }
            {
              if (!("default" in moduleObject)) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
              }
            }
            return moduleObject.default;
          } else {
            throw payload._result;
          }
        }
        function lazy(ctor) {
          var payload = {
            // We use these fields to store the result.
            _status: Uninitialized,
            _result: ctor
          };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: payload,
            _init: lazyInitializer
          };
          {
            var defaultProps;
            var propTypes;
            Object.defineProperties(lazyType, {
              defaultProps: {
                configurable: true,
                get: function() {
                  return defaultProps;
                },
                set: function(newDefaultProps) {
                  error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  defaultProps = newDefaultProps;
                  Object.defineProperty(lazyType, "defaultProps", {
                    enumerable: true
                  });
                }
              },
              propTypes: {
                configurable: true,
                get: function() {
                  return propTypes;
                },
                set: function(newPropTypes) {
                  error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  propTypes = newPropTypes;
                  Object.defineProperty(lazyType, "propTypes", {
                    enumerable: true
                  });
                }
              }
            });
          }
          return lazyType;
        }
        function forwardRef(render) {
          {
            if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
              error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
            } else if (typeof render !== "function") {
              error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
            } else {
              if (render.length !== 0 && render.length !== 2) {
                error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
              }
            }
            if (render != null) {
              if (render.defaultProps != null || render.propTypes != null) {
                error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
              }
            }
          }
          var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!render.name && !render.displayName) {
                  render.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = /* @__PURE__ */ Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function memo(type, compare) {
          {
            if (!isValidElementType(type)) {
              error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
            }
          }
          var elementType = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: compare === void 0 ? null : compare
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!type.name && !type.displayName) {
                  type.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        function resolveDispatcher() {
          var dispatcher = ReactCurrentDispatcher.current;
          {
            if (dispatcher === null) {
              error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          return dispatcher;
        }
        function useContext(Context) {
          var dispatcher = resolveDispatcher();
          {
            if (Context._context !== void 0) {
              var realContext = Context._context;
              if (realContext.Consumer === Context) {
                error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
              } else if (realContext.Provider === Context) {
                error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
              }
            }
          }
          return dispatcher.useContext(Context);
        }
        function useState3(initialState) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useState(initialState);
        }
        function useReducer(reducer, initialArg, init) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useReducer(reducer, initialArg, init);
        }
        function useRef3(initialValue) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useRef(initialValue);
        }
        function useEffect3(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useEffect(create, deps);
        }
        function useInsertionEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useInsertionEffect(create, deps);
        }
        function useLayoutEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useLayoutEffect(create, deps);
        }
        function useCallback(callback, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useCallback(callback, deps);
        }
        function useMemo3(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useMemo(create, deps);
        }
        function useImperativeHandle(ref, create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useImperativeHandle(ref, create, deps);
        }
        function useDebugValue(value, formatterFn) {
          {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDebugValue(value, formatterFn);
          }
        }
        function useTransition() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useTransition();
        }
        function useDeferredValue(value) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDeferredValue(value);
        }
        function useId() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useId();
        }
        function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher$1.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component2) {
          var prototype = Component2.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              setExtraStackFrame(stack);
            } else {
              setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function getDeclarationErrorAddendum() {
          if (ReactCurrentOwner.current) {
            var name = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
        function getSourceInfoErrorAddendum(source) {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
        function getSourceInfoErrorAddendumForProps(elementProps) {
          if (elementProps !== null && elementProps !== void 0) {
            return getSourceInfoErrorAddendum(elementProps.__source);
          }
          return "";
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
        function validateExplicitKey(element, parentType) {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          {
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function createElementWithValidation(type, props, children) {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendumForProps(props);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            {
              error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
          }
          var element = createElement.apply(this, arguments);
          if (element == null) {
            return element;
          }
          if (validType) {
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], type);
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
        var didWarnAboutDeprecatedCreateFactory = false;
        function createFactoryWithValidation(type) {
          var validatedFactory = createElementWithValidation.bind(null, type);
          validatedFactory.type = type;
          {
            if (!didWarnAboutDeprecatedCreateFactory) {
              didWarnAboutDeprecatedCreateFactory = true;
              warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
            }
            Object.defineProperty(validatedFactory, "type", {
              enumerable: false,
              get: function() {
                warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                Object.defineProperty(this, "type", {
                  value: type
                });
                return type;
              }
            });
          }
          return validatedFactory;
        }
        function cloneElementWithValidation(element, props, children) {
          var newElement = cloneElement.apply(this, arguments);
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], newElement.type);
          }
          validatePropTypes(newElement);
          return newElement;
        }
        function startTransition(scope, options) {
          var prevTransition = ReactCurrentBatchConfig.transition;
          ReactCurrentBatchConfig.transition = {};
          var currentTransition = ReactCurrentBatchConfig.transition;
          {
            ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
          }
          try {
            scope();
          } finally {
            ReactCurrentBatchConfig.transition = prevTransition;
            {
              if (prevTransition === null && currentTransition._updatedFibers) {
                var updatedFibersCount = currentTransition._updatedFibers.size;
                if (updatedFibersCount > 10) {
                  warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                }
                currentTransition._updatedFibers.clear();
              }
            }
          }
        }
        var didWarnAboutMessageChannel = false;
        var enqueueTaskImpl = null;
        function enqueueTask(task) {
          if (enqueueTaskImpl === null) {
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              var nodeRequire = module2 && module2[requireString];
              enqueueTaskImpl = nodeRequire.call(module2, "timers").setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                {
                  if (didWarnAboutMessageChannel === false) {
                    didWarnAboutMessageChannel = true;
                    if (typeof MessageChannel === "undefined") {
                      error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                    }
                  }
                }
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          }
          return enqueueTaskImpl(task);
        }
        var actScopeDepth = 0;
        var didWarnNoAwaitAct = false;
        function act(callback) {
          {
            var prevActScopeDepth = actScopeDepth;
            actScopeDepth++;
            if (ReactCurrentActQueue.current === null) {
              ReactCurrentActQueue.current = [];
            }
            var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
            var result;
            try {
              ReactCurrentActQueue.isBatchingLegacy = true;
              result = callback();
              if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                var queue = ReactCurrentActQueue.current;
                if (queue !== null) {
                  ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                  flushActQueue(queue);
                }
              }
            } catch (error2) {
              popActScope(prevActScopeDepth);
              throw error2;
            } finally {
              ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
            }
            if (result !== null && typeof result === "object" && typeof result.then === "function") {
              var thenableResult = result;
              var wasAwaited = false;
              var thenable = {
                then: function(resolve, reject) {
                  wasAwaited = true;
                  thenableResult.then(function(returnValue2) {
                    popActScope(prevActScopeDepth);
                    if (actScopeDepth === 0) {
                      recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                    } else {
                      resolve(returnValue2);
                    }
                  }, function(error2) {
                    popActScope(prevActScopeDepth);
                    reject(error2);
                  });
                }
              };
              {
                if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                  Promise.resolve().then(function() {
                  }).then(function() {
                    if (!wasAwaited) {
                      didWarnNoAwaitAct = true;
                      error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                    }
                  });
                }
              }
              return thenable;
            } else {
              var returnValue = result;
              popActScope(prevActScopeDepth);
              if (actScopeDepth === 0) {
                var _queue = ReactCurrentActQueue.current;
                if (_queue !== null) {
                  flushActQueue(_queue);
                  ReactCurrentActQueue.current = null;
                }
                var _thenable = {
                  then: function(resolve, reject) {
                    if (ReactCurrentActQueue.current === null) {
                      ReactCurrentActQueue.current = [];
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    } else {
                      resolve(returnValue);
                    }
                  }
                };
                return _thenable;
              } else {
                var _thenable2 = {
                  then: function(resolve, reject) {
                    resolve(returnValue);
                  }
                };
                return _thenable2;
              }
            }
          }
        }
        function popActScope(prevActScopeDepth) {
          {
            if (prevActScopeDepth !== actScopeDepth - 1) {
              error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
            }
            actScopeDepth = prevActScopeDepth;
          }
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          {
            var queue = ReactCurrentActQueue.current;
            if (queue !== null) {
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  if (queue.length === 0) {
                    ReactCurrentActQueue.current = null;
                    resolve(returnValue);
                  } else {
                    recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                  }
                });
              } catch (error2) {
                reject(error2);
              }
            } else {
              resolve(returnValue);
            }
          }
        }
        var isFlushing = false;
        function flushActQueue(queue) {
          {
            if (!isFlushing) {
              isFlushing = true;
              var i = 0;
              try {
                for (; i < queue.length; i++) {
                  var callback = queue[i];
                  do {
                    callback = callback(true);
                  } while (callback !== null);
                }
                queue.length = 0;
              } catch (error2) {
                queue = queue.slice(i + 1);
                throw error2;
              } finally {
                isFlushing = false;
              }
            }
          }
        }
        var createElement$1 = createElementWithValidation;
        var cloneElement$1 = cloneElementWithValidation;
        var createFactory = createFactoryWithValidation;
        var Children = {
          map: mapChildren,
          forEach: forEachChildren,
          count: countChildren,
          toArray,
          only: onlyChild
        };
        exports2.Children = Children;
        exports2.Component = Component;
        exports2.Fragment = REACT_FRAGMENT_TYPE;
        exports2.Profiler = REACT_PROFILER_TYPE;
        exports2.PureComponent = PureComponent;
        exports2.StrictMode = REACT_STRICT_MODE_TYPE;
        exports2.Suspense = REACT_SUSPENSE_TYPE;
        exports2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
        exports2.act = act;
        exports2.cloneElement = cloneElement$1;
        exports2.createContext = createContext;
        exports2.createElement = createElement$1;
        exports2.createFactory = createFactory;
        exports2.createRef = createRef;
        exports2.forwardRef = forwardRef;
        exports2.isValidElement = isValidElement;
        exports2.lazy = lazy;
        exports2.memo = memo;
        exports2.startTransition = startTransition;
        exports2.unstable_act = act;
        exports2.useCallback = useCallback;
        exports2.useContext = useContext;
        exports2.useDebugValue = useDebugValue;
        exports2.useDeferredValue = useDeferredValue;
        exports2.useEffect = useEffect3;
        exports2.useId = useId;
        exports2.useImperativeHandle = useImperativeHandle;
        exports2.useInsertionEffect = useInsertionEffect;
        exports2.useLayoutEffect = useLayoutEffect;
        exports2.useMemo = useMemo3;
        exports2.useReducer = useReducer;
        exports2.useRef = useRef3;
        exports2.useState = useState3;
        exports2.useSyncExternalStore = useSyncExternalStore;
        exports2.useTransition = useTransition;
        exports2.version = ReactVersion;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// ../node_modules/react/index.js
var require_react = __commonJS({
  "../node_modules/react/index.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_production_min();
    } else {
      module2.exports = require_react_development();
    }
  }
});

// ../node_modules/react-dom/cjs/react-dom-server-legacy.node.production.min.js
var require_react_dom_server_legacy_node_production_min = __commonJS({
  "../node_modules/react-dom/cjs/react-dom-server-legacy.node.production.min.js"(exports2) {
    "use strict";
    var ea = require_react();
    var fa = require("stream");
    var n = Object.prototype.hasOwnProperty;
    var ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
    var ia = {};
    var ja = {};
    function ka(a) {
      if (n.call(ja, a)) return true;
      if (n.call(ia, a)) return false;
      if (ha.test(a)) return ja[a] = true;
      ia[a] = true;
      return false;
    }
    function q(a, b, c, d, f, e, g) {
      this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
      this.attributeName = d;
      this.attributeNamespace = f;
      this.mustUseProperty = c;
      this.propertyName = a;
      this.type = b;
      this.sanitizeURL = e;
      this.removeEmptyString = g;
    }
    var r = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      r[a] = new q(a, 0, false, a, null, false, false);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      r[b] = new q(b, 1, false, a[1], null, false, false);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      r[a] = new q(a, 2, false, a.toLowerCase(), null, false, false);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      r[a] = new q(a, 2, false, a, null, false, false);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      r[a] = new q(a, 3, false, a.toLowerCase(), null, false, false);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      r[a] = new q(a, 3, true, a, null, false, false);
    });
    ["capture", "download"].forEach(function(a) {
      r[a] = new q(a, 4, false, a, null, false, false);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      r[a] = new q(a, 6, false, a, null, false, false);
    });
    ["rowSpan", "start"].forEach(function(a) {
      r[a] = new q(a, 5, false, a.toLowerCase(), null, false, false);
    });
    var la = /[\-:]([a-z])/g;
    function ma(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(
        la,
        ma
      );
      r[b] = new q(b, 1, false, a, null, false, false);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(la, ma);
      r[b] = new q(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(la, ma);
      r[b] = new q(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      r[a] = new q(a, 1, false, a.toLowerCase(), null, false, false);
    });
    r.xlinkHref = new q("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      r[a] = new q(a, 1, false, a.toLowerCase(), null, true, true);
    });
    var t = {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    var na = ["Webkit", "ms", "Moz", "O"];
    Object.keys(t).forEach(function(a) {
      na.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1);
        t[b] = t[a];
      });
    });
    var oa = /["'&<>]/;
    function u(a) {
      if ("boolean" === typeof a || "number" === typeof a) return "" + a;
      a = "" + a;
      var b = oa.exec(a);
      if (b) {
        var c = "", d, f = 0;
        for (d = b.index; d < a.length; d++) {
          switch (a.charCodeAt(d)) {
            case 34:
              b = "&quot;";
              break;
            case 38:
              b = "&amp;";
              break;
            case 39:
              b = "&#x27;";
              break;
            case 60:
              b = "&lt;";
              break;
            case 62:
              b = "&gt;";
              break;
            default:
              continue;
          }
          f !== d && (c += a.substring(f, d));
          f = d + 1;
          c += b;
        }
        a = f !== d ? c + a.substring(f, d) : c;
      }
      return a;
    }
    var pa = /([A-Z])/g;
    var qa = /^ms-/;
    var ra = Array.isArray;
    function v(a, b) {
      return { insertionMode: a, selectedValue: b };
    }
    function sa(a, b, c) {
      switch (b) {
        case "select":
          return v(1, null != c.value ? c.value : c.defaultValue);
        case "svg":
          return v(2, null);
        case "math":
          return v(3, null);
        case "foreignObject":
          return v(1, null);
        case "table":
          return v(4, null);
        case "thead":
        case "tbody":
        case "tfoot":
          return v(5, null);
        case "colgroup":
          return v(7, null);
        case "tr":
          return v(6, null);
      }
      return 4 <= a.insertionMode || 0 === a.insertionMode ? v(1, null) : a;
    }
    var ta = /* @__PURE__ */ new Map();
    function ua(a, b, c) {
      if ("object" !== typeof c) throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      b = true;
      for (var d in c) if (n.call(c, d)) {
        var f = c[d];
        if (null != f && "boolean" !== typeof f && "" !== f) {
          if (0 === d.indexOf("--")) {
            var e = u(d);
            f = u(("" + f).trim());
          } else {
            e = d;
            var g = ta.get(e);
            void 0 !== g ? e = g : (g = u(e.replace(pa, "-$1").toLowerCase().replace(qa, "-ms-")), ta.set(e, g), e = g);
            f = "number" === typeof f ? 0 === f || n.call(
              t,
              d
            ) ? "" + f : f + "px" : u(("" + f).trim());
          }
          b ? (b = false, a.push(' style="', e, ":", f)) : a.push(";", e, ":", f);
        }
      }
      b || a.push('"');
    }
    function w(a, b, c, d) {
      switch (c) {
        case "style":
          ua(a, b, d);
          return;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          return;
      }
      if (!(2 < c.length) || "o" !== c[0] && "O" !== c[0] || "n" !== c[1] && "N" !== c[1]) {
        if (b = r.hasOwnProperty(c) ? r[c] : null, null !== b) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (!b.acceptsBooleans) return;
          }
          c = b.attributeName;
          switch (b.type) {
            case 3:
              d && a.push(" ", c, '=""');
              break;
            case 4:
              true === d ? a.push(" ", c, '=""') : false !== d && a.push(" ", c, '="', u(d), '"');
              break;
            case 5:
              isNaN(d) || a.push(" ", c, '="', u(d), '"');
              break;
            case 6:
              !isNaN(d) && 1 <= d && a.push(" ", c, '="', u(d), '"');
              break;
            default:
              b.sanitizeURL && (d = "" + d), a.push(" ", c, '="', u(d), '"');
          }
        } else if (ka(c)) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (b = c.toLowerCase().slice(0, 5), "data-" !== b && "aria-" !== b) return;
          }
          a.push(" ", c, '="', u(d), '"');
        }
      }
    }
    function x(a, b, c) {
      if (null != b) {
        if (null != c) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if ("object" !== typeof b || !("__html" in b)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        b = b.__html;
        null !== b && void 0 !== b && a.push("" + b);
      }
    }
    function va(a) {
      var b = "";
      ea.Children.forEach(a, function(a2) {
        null != a2 && (b += a2);
      });
      return b;
    }
    function wa(a, b, c, d) {
      a.push(z(c));
      var f = c = null, e;
      for (e in b) if (n.call(b, e)) {
        var g = b[e];
        if (null != g) switch (e) {
          case "children":
            c = g;
            break;
          case "dangerouslySetInnerHTML":
            f = g;
            break;
          default:
            w(a, d, e, g);
        }
      }
      a.push(">");
      x(a, f, c);
      return "string" === typeof c ? (a.push(u(c)), null) : c;
    }
    var xa = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var ya = /* @__PURE__ */ new Map();
    function z(a) {
      var b = ya.get(a);
      if (void 0 === b) {
        if (!xa.test(a)) throw Error("Invalid tag: " + a);
        b = "<" + a;
        ya.set(a, b);
      }
      return b;
    }
    function za(a, b, c, d, f) {
      switch (b) {
        case "select":
          a.push(z("select"));
          var e = null, g = null;
          for (l in c) if (n.call(c, l)) {
            var h = c[l];
            if (null != h) switch (l) {
              case "children":
                e = h;
                break;
              case "dangerouslySetInnerHTML":
                g = h;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                w(a, d, l, h);
            }
          }
          a.push(">");
          x(a, g, e);
          return e;
        case "option":
          g = f.selectedValue;
          a.push(z("option"));
          var k = h = null, m = null;
          var l = null;
          for (e in c) if (n.call(c, e)) {
            var p = c[e];
            if (null != p) switch (e) {
              case "children":
                h = p;
                break;
              case "selected":
                m = p;
                break;
              case "dangerouslySetInnerHTML":
                l = p;
                break;
              case "value":
                k = p;
              default:
                w(a, d, e, p);
            }
          }
          if (null != g) if (c = null !== k ? "" + k : va(h), ra(g)) for (d = 0; d < g.length; d++) {
            if ("" + g[d] === c) {
              a.push(' selected=""');
              break;
            }
          }
          else "" + g === c && a.push(' selected=""');
          else m && a.push(' selected=""');
          a.push(">");
          x(a, l, h);
          return h;
        case "textarea":
          a.push(z("textarea"));
          l = g = e = null;
          for (h in c) if (n.call(c, h) && (k = c[h], null != k)) switch (h) {
            case "children":
              l = k;
              break;
            case "value":
              e = k;
              break;
            case "defaultValue":
              g = k;
              break;
            case "dangerouslySetInnerHTML":
              throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
            default:
              w(a, d, h, k);
          }
          null === e && null !== g && (e = g);
          a.push(">");
          if (null != l) {
            if (null != e) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (ra(l) && 1 < l.length) throw Error("<textarea> can only have at most one child.");
            e = "" + l;
          }
          "string" === typeof e && "\n" === e[0] && a.push("\n");
          null !== e && a.push(u("" + e));
          return null;
        case "input":
          a.push(z("input"));
          k = l = h = e = null;
          for (g in c) if (n.call(c, g) && (m = c[g], null != m)) switch (g) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
            case "defaultChecked":
              k = m;
              break;
            case "defaultValue":
              h = m;
              break;
            case "checked":
              l = m;
              break;
            case "value":
              e = m;
              break;
            default:
              w(a, d, g, m);
          }
          null !== l ? w(a, d, "checked", l) : null !== k && w(a, d, "checked", k);
          null !== e ? w(a, d, "value", e) : null !== h && w(a, d, "value", h);
          a.push("/>");
          return null;
        case "menuitem":
          a.push(z("menuitem"));
          for (var B in c) if (n.call(c, B) && (e = c[B], null != e)) switch (B) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
            default:
              w(
                a,
                d,
                B,
                e
              );
          }
          a.push(">");
          return null;
        case "title":
          a.push(z("title"));
          e = null;
          for (p in c) if (n.call(c, p) && (g = c[p], null != g)) switch (p) {
            case "children":
              e = g;
              break;
            case "dangerouslySetInnerHTML":
              throw Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
            default:
              w(a, d, p, g);
          }
          a.push(">");
          return e;
        case "listing":
        case "pre":
          a.push(z(b));
          g = e = null;
          for (k in c) if (n.call(c, k) && (h = c[k], null != h)) switch (k) {
            case "children":
              e = h;
              break;
            case "dangerouslySetInnerHTML":
              g = h;
              break;
            default:
              w(a, d, k, h);
          }
          a.push(">");
          if (null != g) {
            if (null != e) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            if ("object" !== typeof g || !("__html" in g)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
            c = g.__html;
            null !== c && void 0 !== c && ("string" === typeof c && 0 < c.length && "\n" === c[0] ? a.push("\n", c) : a.push("" + c));
          }
          "string" === typeof e && "\n" === e[0] && a.push("\n");
          return e;
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          a.push(z(b));
          for (var C in c) if (n.call(c, C) && (e = c[C], null != e)) switch (C) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(b + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
            default:
              w(a, d, C, e);
          }
          a.push("/>");
          return null;
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return wa(a, c, b, d);
        case "html":
          return 0 === f.insertionMode && a.push("<!DOCTYPE html>"), wa(a, c, b, d);
        default:
          if (-1 === b.indexOf("-") && "string" !== typeof c.is) return wa(a, c, b, d);
          a.push(z(b));
          g = e = null;
          for (m in c) if (n.call(c, m) && (h = c[m], null != h)) switch (m) {
            case "children":
              e = h;
              break;
            case "dangerouslySetInnerHTML":
              g = h;
              break;
            case "style":
              ua(a, d, h);
              break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
              break;
            default:
              ka(m) && "function" !== typeof h && "symbol" !== typeof h && a.push(" ", m, '="', u(h), '"');
          }
          a.push(">");
          x(a, g, e);
          return e;
      }
    }
    function Aa(a, b, c) {
      a.push('<!--$?--><template id="');
      if (null === c) throw Error("An ID must have been assigned before we can complete the boundary.");
      a.push(c);
      return a.push('"></template>');
    }
    function Ba(a, b, c, d) {
      switch (c.insertionMode) {
        case 0:
        case 1:
          return a.push('<div hidden id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 2:
          return a.push('<svg aria-hidden="true" style="display:none" id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 3:
          return a.push('<math aria-hidden="true" style="display:none" id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 4:
          return a.push('<table hidden id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 5:
          return a.push('<table hidden><tbody id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 6:
          return a.push('<table hidden><tr id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 7:
          return a.push('<table hidden><colgroup id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    function Ca(a, b) {
      switch (b.insertionMode) {
        case 0:
        case 1:
          return a.push("</div>");
        case 2:
          return a.push("</svg>");
        case 3:
          return a.push("</math>");
        case 4:
          return a.push("</table>");
        case 5:
          return a.push("</tbody></table>");
        case 6:
          return a.push("</tr></table>");
        case 7:
          return a.push("</colgroup></table>");
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    var Da = /[<\u2028\u2029]/g;
    function Ea(a) {
      return JSON.stringify(a).replace(Da, function(a2) {
        switch (a2) {
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
        }
      });
    }
    function Fa(a, b) {
      b = void 0 === b ? "" : b;
      return { bootstrapChunks: [], startInlineScript: "<script>", placeholderPrefix: b + "P:", segmentPrefix: b + "S:", boundaryPrefix: b + "B:", idPrefix: b, nextSuspenseID: 0, sentCompleteSegmentFunction: false, sentCompleteBoundaryFunction: false, sentClientRenderFunction: false, generateStaticMarkup: a };
    }
    function Ga() {
      return { insertionMode: 1, selectedValue: null };
    }
    function Ha(a, b, c, d) {
      if (c.generateStaticMarkup) return a.push(u(b)), false;
      "" === b ? a = d : (d && a.push("<!-- -->"), a.push(u(b)), a = true);
      return a;
    }
    var A = Object.assign;
    var Ia = /* @__PURE__ */ Symbol.for("react.element");
    var Ja = /* @__PURE__ */ Symbol.for("react.portal");
    var Ka = /* @__PURE__ */ Symbol.for("react.fragment");
    var La = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var Ma = /* @__PURE__ */ Symbol.for("react.profiler");
    var Na = /* @__PURE__ */ Symbol.for("react.provider");
    var Oa = /* @__PURE__ */ Symbol.for("react.context");
    var Pa = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var Qa = /* @__PURE__ */ Symbol.for("react.suspense");
    var Ra = /* @__PURE__ */ Symbol.for("react.suspense_list");
    var Sa = /* @__PURE__ */ Symbol.for("react.memo");
    var Ta = /* @__PURE__ */ Symbol.for("react.lazy");
    var Ua = /* @__PURE__ */ Symbol.for("react.scope");
    var Va = /* @__PURE__ */ Symbol.for("react.debug_trace_mode");
    var Wa = /* @__PURE__ */ Symbol.for("react.legacy_hidden");
    var Xa = /* @__PURE__ */ Symbol.for("react.default_value");
    var Ya = Symbol.iterator;
    function Za(a) {
      if (null == a) return null;
      if ("function" === typeof a) return a.displayName || a.name || null;
      if ("string" === typeof a) return a;
      switch (a) {
        case Ka:
          return "Fragment";
        case Ja:
          return "Portal";
        case Ma:
          return "Profiler";
        case La:
          return "StrictMode";
        case Qa:
          return "Suspense";
        case Ra:
          return "SuspenseList";
      }
      if ("object" === typeof a) switch (a.$$typeof) {
        case Oa:
          return (a.displayName || "Context") + ".Consumer";
        case Na:
          return (a._context.displayName || "Context") + ".Provider";
        case Pa:
          var b = a.render;
          a = a.displayName;
          a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          return a;
        case Sa:
          return b = a.displayName || null, null !== b ? b : Za(a.type) || "Memo";
        case Ta:
          b = a._payload;
          a = a._init;
          try {
            return Za(a(b));
          } catch (c) {
          }
      }
      return null;
    }
    var $a = {};
    function ab(a, b) {
      a = a.contextTypes;
      if (!a) return $a;
      var c = {}, d;
      for (d in a) c[d] = b[d];
      return c;
    }
    var D = null;
    function E(a, b) {
      if (a !== b) {
        a.context._currentValue2 = a.parentValue;
        a = a.parent;
        var c = b.parent;
        if (null === a) {
          if (null !== c) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
        } else {
          if (null === c) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
          E(a, c);
        }
        b.context._currentValue2 = b.value;
      }
    }
    function bb(a) {
      a.context._currentValue2 = a.parentValue;
      a = a.parent;
      null !== a && bb(a);
    }
    function cb(a) {
      var b = a.parent;
      null !== b && cb(b);
      a.context._currentValue2 = a.value;
    }
    function db(a, b) {
      a.context._currentValue2 = a.parentValue;
      a = a.parent;
      if (null === a) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
      a.depth === b.depth ? E(a, b) : db(a, b);
    }
    function eb(a, b) {
      var c = b.parent;
      if (null === c) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
      a.depth === c.depth ? E(a, c) : eb(a, c);
      b.context._currentValue2 = b.value;
    }
    function F(a) {
      var b = D;
      b !== a && (null === b ? cb(a) : null === a ? bb(b) : b.depth === a.depth ? E(b, a) : b.depth > a.depth ? db(b, a) : eb(b, a), D = a);
    }
    var fb = { isMounted: function() {
      return false;
    }, enqueueSetState: function(a, b) {
      a = a._reactInternals;
      null !== a.queue && a.queue.push(b);
    }, enqueueReplaceState: function(a, b) {
      a = a._reactInternals;
      a.replace = true;
      a.queue = [b];
    }, enqueueForceUpdate: function() {
    } };
    function gb(a, b, c, d) {
      var f = void 0 !== a.state ? a.state : null;
      a.updater = fb;
      a.props = c;
      a.state = f;
      var e = { queue: [], replace: false };
      a._reactInternals = e;
      var g = b.contextType;
      a.context = "object" === typeof g && null !== g ? g._currentValue2 : d;
      g = b.getDerivedStateFromProps;
      "function" === typeof g && (g = g(c, f), f = null === g || void 0 === g ? f : A({}, f, g), a.state = f);
      if ("function" !== typeof b.getDerivedStateFromProps && "function" !== typeof a.getSnapshotBeforeUpdate && ("function" === typeof a.UNSAFE_componentWillMount || "function" === typeof a.componentWillMount)) if (b = a.state, "function" === typeof a.componentWillMount && a.componentWillMount(), "function" === typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(), b !== a.state && fb.enqueueReplaceState(a, a.state, null), null !== e.queue && 0 < e.queue.length) if (b = e.queue, g = e.replace, e.queue = null, e.replace = false, g && 1 === b.length) a.state = b[0];
      else {
        e = g ? b[0] : a.state;
        f = true;
        for (g = g ? 1 : 0; g < b.length; g++) {
          var h = b[g];
          h = "function" === typeof h ? h.call(a, e, c, d) : h;
          null != h && (f ? (f = false, e = A({}, e, h)) : A(e, h));
        }
        a.state = e;
      }
      else e.queue = null;
    }
    var hb = { id: 1, overflow: "" };
    function ib(a, b, c) {
      var d = a.id;
      a = a.overflow;
      var f = 32 - G(d) - 1;
      d &= ~(1 << f);
      c += 1;
      var e = 32 - G(b) + f;
      if (30 < e) {
        var g = f - f % 5;
        e = (d & (1 << g) - 1).toString(32);
        d >>= g;
        f -= g;
        return { id: 1 << 32 - G(b) + f | c << f | d, overflow: e + a };
      }
      return { id: 1 << e | c << f | d, overflow: a };
    }
    var G = Math.clz32 ? Math.clz32 : jb;
    var kb = Math.log;
    var lb = Math.LN2;
    function jb(a) {
      a >>>= 0;
      return 0 === a ? 32 : 31 - (kb(a) / lb | 0) | 0;
    }
    function mb(a, b) {
      return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var nb = "function" === typeof Object.is ? Object.is : mb;
    var H = null;
    var ob = null;
    var I = null;
    var J = null;
    var K = false;
    var L2 = false;
    var M = 0;
    var N = null;
    var O = 0;
    function P() {
      if (null === H) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
      return H;
    }
    function rb() {
      if (0 < O) throw Error("Rendered more hooks than during the previous render");
      return { memoizedState: null, queue: null, next: null };
    }
    function sb() {
      null === J ? null === I ? (K = false, I = J = rb()) : (K = true, J = I) : null === J.next ? (K = false, J = J.next = rb()) : (K = true, J = J.next);
      return J;
    }
    function tb() {
      ob = H = null;
      L2 = false;
      I = null;
      O = 0;
      J = N = null;
    }
    function ub(a, b) {
      return "function" === typeof b ? b(a) : b;
    }
    function vb(a, b, c) {
      H = P();
      J = sb();
      if (K) {
        var d = J.queue;
        b = d.dispatch;
        if (null !== N && (c = N.get(d), void 0 !== c)) {
          N.delete(d);
          d = J.memoizedState;
          do
            d = a(d, c.action), c = c.next;
          while (null !== c);
          J.memoizedState = d;
          return [d, b];
        }
        return [J.memoizedState, b];
      }
      a = a === ub ? "function" === typeof b ? b() : b : void 0 !== c ? c(b) : b;
      J.memoizedState = a;
      a = J.queue = { last: null, dispatch: null };
      a = a.dispatch = wb.bind(null, H, a);
      return [J.memoizedState, a];
    }
    function xb(a, b) {
      H = P();
      J = sb();
      b = void 0 === b ? null : b;
      if (null !== J) {
        var c = J.memoizedState;
        if (null !== c && null !== b) {
          var d = c[1];
          a: if (null === d) d = false;
          else {
            for (var f = 0; f < d.length && f < b.length; f++) if (!nb(b[f], d[f])) {
              d = false;
              break a;
            }
            d = true;
          }
          if (d) return c[0];
        }
      }
      a = a();
      J.memoizedState = [a, b];
      return a;
    }
    function wb(a, b, c) {
      if (25 <= O) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
      if (a === H) if (L2 = true, a = { action: c, next: null }, null === N && (N = /* @__PURE__ */ new Map()), c = N.get(b), void 0 === c) N.set(b, a);
      else {
        for (b = c; null !== b.next; ) b = b.next;
        b.next = a;
      }
    }
    function yb() {
      throw Error("startTransition cannot be called during server rendering.");
    }
    function Q() {
    }
    var zb = { readContext: function(a) {
      return a._currentValue2;
    }, useContext: function(a) {
      P();
      return a._currentValue2;
    }, useMemo: xb, useReducer: vb, useRef: function(a) {
      H = P();
      J = sb();
      var b = J.memoizedState;
      return null === b ? (a = { current: a }, J.memoizedState = a) : b;
    }, useState: function(a) {
      return vb(ub, a);
    }, useInsertionEffect: Q, useLayoutEffect: function() {
    }, useCallback: function(a, b) {
      return xb(function() {
        return a;
      }, b);
    }, useImperativeHandle: Q, useEffect: Q, useDebugValue: Q, useDeferredValue: function(a) {
      P();
      return a;
    }, useTransition: function() {
      P();
      return [false, yb];
    }, useId: function() {
      var a = ob.treeContext;
      var b = a.overflow;
      a = a.id;
      a = (a & ~(1 << 32 - G(a) - 1)).toString(32) + b;
      var c = R2;
      if (null === c) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
      b = M++;
      a = ":" + c.idPrefix + "R" + a;
      0 < b && (a += "H" + b.toString(32));
      return a + ":";
    }, useMutableSource: function(a, b) {
      P();
      return b(a._source);
    }, useSyncExternalStore: function(a, b, c) {
      if (void 0 === c) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      return c();
    } };
    var R2 = null;
    var Ab = ea.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
    function Bb(a) {
      console.error(a);
      return null;
    }
    function S() {
    }
    function Cb(a, b, c, d, f, e, g, h, k) {
      var m = [], l = /* @__PURE__ */ new Set();
      b = { destination: null, responseState: b, progressiveChunkSize: void 0 === d ? 12800 : d, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: l, pingedTasks: m, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: void 0 === f ? Bb : f, onAllReady: void 0 === e ? S : e, onShellReady: void 0 === g ? S : g, onShellError: void 0 === h ? S : h, onFatalError: void 0 === k ? S : k };
      c = T(b, 0, null, c, false, false);
      c.parentFlushed = true;
      a = Db(b, a, null, c, l, $a, null, hb);
      m.push(a);
      return b;
    }
    function Db(a, b, c, d, f, e, g, h) {
      a.allPendingTasks++;
      null === c ? a.pendingRootTasks++ : c.pendingTasks++;
      var k = { node: b, ping: function() {
        var b2 = a.pingedTasks;
        b2.push(k);
        1 === b2.length && Eb(a);
      }, blockedBoundary: c, blockedSegment: d, abortSet: f, legacyContext: e, context: g, treeContext: h };
      f.add(k);
      return k;
    }
    function T(a, b, c, d, f, e) {
      return { status: 0, id: -1, index: b, parentFlushed: false, chunks: [], children: [], formatContext: d, boundary: c, lastPushedText: f, textEmbedded: e };
    }
    function U(a, b) {
      a = a.onError(b);
      if (null != a && "string" !== typeof a) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a + '" instead');
      return a;
    }
    function V(a, b) {
      var c = a.onShellError;
      c(b);
      c = a.onFatalError;
      c(b);
      null !== a.destination ? (a.status = 2, a.destination.destroy(b)) : (a.status = 1, a.fatalError = b);
    }
    function Fb(a, b, c, d, f) {
      H = {};
      ob = b;
      M = 0;
      for (a = c(d, f); L2; ) L2 = false, M = 0, O += 1, J = null, a = c(d, f);
      tb();
      return a;
    }
    function Gb(a, b, c, d) {
      var f = c.render(), e = d.childContextTypes;
      if (null !== e && void 0 !== e) {
        var g = b.legacyContext;
        if ("function" !== typeof c.getChildContext) d = g;
        else {
          c = c.getChildContext();
          for (var h in c) if (!(h in e)) throw Error((Za(d) || "Unknown") + '.getChildContext(): key "' + h + '" is not defined in childContextTypes.');
          d = A({}, g, c);
        }
        b.legacyContext = d;
        W(a, b, f);
        b.legacyContext = g;
      } else W(a, b, f);
    }
    function Hb(a, b) {
      if (a && a.defaultProps) {
        b = A({}, b);
        a = a.defaultProps;
        for (var c in a) void 0 === b[c] && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    function Ib(a, b, c, d, f) {
      if ("function" === typeof c) if (c.prototype && c.prototype.isReactComponent) {
        f = ab(c, b.legacyContext);
        var e = c.contextType;
        e = new c(d, "object" === typeof e && null !== e ? e._currentValue2 : f);
        gb(e, c, d, f);
        Gb(a, b, e, c);
      } else {
        e = ab(c, b.legacyContext);
        f = Fb(a, b, c, d, e);
        var g = 0 !== M;
        if ("object" === typeof f && null !== f && "function" === typeof f.render && void 0 === f.$$typeof) gb(f, c, d, e), Gb(a, b, f, c);
        else if (g) {
          d = b.treeContext;
          b.treeContext = ib(d, 1, 0);
          try {
            W(a, b, f);
          } finally {
            b.treeContext = d;
          }
        } else W(a, b, f);
      }
      else if ("string" === typeof c) {
        f = b.blockedSegment;
        e = za(f.chunks, c, d, a.responseState, f.formatContext);
        f.lastPushedText = false;
        g = f.formatContext;
        f.formatContext = sa(g, c, d);
        Jb(a, b, e);
        f.formatContext = g;
        switch (c) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break;
          default:
            f.chunks.push("</", c, ">");
        }
        f.lastPushedText = false;
      } else {
        switch (c) {
          case Wa:
          case Va:
          case La:
          case Ma:
          case Ka:
            W(a, b, d.children);
            return;
          case Ra:
            W(a, b, d.children);
            return;
          case Ua:
            throw Error("ReactDOMServer does not yet support scope components.");
          case Qa:
            a: {
              c = b.blockedBoundary;
              f = b.blockedSegment;
              e = d.fallback;
              d = d.children;
              g = /* @__PURE__ */ new Set();
              var h = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g, errorDigest: null }, k = T(a, f.chunks.length, h, f.formatContext, false, false);
              f.children.push(k);
              f.lastPushedText = false;
              var m = T(a, 0, null, f.formatContext, false, false);
              m.parentFlushed = true;
              b.blockedBoundary = h;
              b.blockedSegment = m;
              try {
                if (Jb(a, b, d), a.responseState.generateStaticMarkup || m.lastPushedText && m.textEmbedded && m.chunks.push("<!-- -->"), m.status = 1, X(h, m), 0 === h.pendingTasks) break a;
              } catch (l) {
                m.status = 4, h.forceClientRender = true, h.errorDigest = U(a, l);
              } finally {
                b.blockedBoundary = c, b.blockedSegment = f;
              }
              b = Db(a, e, c, k, g, b.legacyContext, b.context, b.treeContext);
              a.pingedTasks.push(b);
            }
            return;
        }
        if ("object" === typeof c && null !== c) switch (c.$$typeof) {
          case Pa:
            d = Fb(a, b, c.render, d, f);
            if (0 !== M) {
              c = b.treeContext;
              b.treeContext = ib(c, 1, 0);
              try {
                W(a, b, d);
              } finally {
                b.treeContext = c;
              }
            } else W(a, b, d);
            return;
          case Sa:
            c = c.type;
            d = Hb(c, d);
            Ib(a, b, c, d, f);
            return;
          case Na:
            f = d.children;
            c = c._context;
            d = d.value;
            e = c._currentValue2;
            c._currentValue2 = d;
            g = D;
            D = d = { parent: g, depth: null === g ? 0 : g.depth + 1, context: c, parentValue: e, value: d };
            b.context = d;
            W(a, b, f);
            a = D;
            if (null === a) throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
            d = a.parentValue;
            a.context._currentValue2 = d === Xa ? a.context._defaultValue : d;
            a = D = a.parent;
            b.context = a;
            return;
          case Oa:
            d = d.children;
            d = d(c._currentValue2);
            W(a, b, d);
            return;
          case Ta:
            f = c._init;
            c = f(c._payload);
            d = Hb(c, d);
            Ib(a, b, c, d, void 0);
            return;
        }
        throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((null == c ? c : typeof c) + "."));
      }
    }
    function W(a, b, c) {
      b.node = c;
      if ("object" === typeof c && null !== c) {
        switch (c.$$typeof) {
          case Ia:
            Ib(a, b, c.type, c.props, c.ref);
            return;
          case Ja:
            throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
          case Ta:
            var d = c._init;
            c = d(c._payload);
            W(a, b, c);
            return;
        }
        if (ra(c)) {
          Kb(a, b, c);
          return;
        }
        null === c || "object" !== typeof c ? d = null : (d = Ya && c[Ya] || c["@@iterator"], d = "function" === typeof d ? d : null);
        if (d && (d = d.call(c))) {
          c = d.next();
          if (!c.done) {
            var f = [];
            do
              f.push(c.value), c = d.next();
            while (!c.done);
            Kb(a, b, f);
          }
          return;
        }
        a = Object.prototype.toString.call(c);
        throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === a ? "object with keys {" + Object.keys(c).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
      }
      "string" === typeof c ? (d = b.blockedSegment, d.lastPushedText = Ha(b.blockedSegment.chunks, c, a.responseState, d.lastPushedText)) : "number" === typeof c && (d = b.blockedSegment, d.lastPushedText = Ha(
        b.blockedSegment.chunks,
        "" + c,
        a.responseState,
        d.lastPushedText
      ));
    }
    function Kb(a, b, c) {
      for (var d = c.length, f = 0; f < d; f++) {
        var e = b.treeContext;
        b.treeContext = ib(e, d, f);
        try {
          Jb(a, b, c[f]);
        } finally {
          b.treeContext = e;
        }
      }
    }
    function Jb(a, b, c) {
      var d = b.blockedSegment.formatContext, f = b.legacyContext, e = b.context;
      try {
        return W(a, b, c);
      } catch (k) {
        if (tb(), "object" === typeof k && null !== k && "function" === typeof k.then) {
          c = k;
          var g = b.blockedSegment, h = T(a, g.chunks.length, null, g.formatContext, g.lastPushedText, true);
          g.children.push(h);
          g.lastPushedText = false;
          a = Db(a, b.node, b.blockedBoundary, h, b.abortSet, b.legacyContext, b.context, b.treeContext).ping;
          c.then(a, a);
          b.blockedSegment.formatContext = d;
          b.legacyContext = f;
          b.context = e;
          F(e);
        } else throw b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, F(e), k;
      }
    }
    function Lb(a) {
      var b = a.blockedBoundary;
      a = a.blockedSegment;
      a.status = 3;
      Mb(this, b, a);
    }
    function Nb(a, b, c) {
      var d = a.blockedBoundary;
      a.blockedSegment.status = 3;
      null === d ? (b.allPendingTasks--, 2 !== b.status && (b.status = 2, null !== b.destination && b.destination.push(null))) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = true, d.errorDigest = b.onError(void 0 === c ? Error("The render was aborted by the server without a reason.") : c), d.parentFlushed && b.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a2) {
        return Nb(a2, b, c);
      }), d.fallbackAbortableTasks.clear(), b.allPendingTasks--, 0 === b.allPendingTasks && (a = b.onAllReady, a()));
    }
    function X(a, b) {
      if (0 === b.chunks.length && 1 === b.children.length && null === b.children[0].boundary) {
        var c = b.children[0];
        c.id = b.id;
        c.parentFlushed = true;
        1 === c.status && X(a, c);
      } else a.completedSegments.push(b);
    }
    function Mb(a, b, c) {
      if (null === b) {
        if (c.parentFlushed) {
          if (null !== a.completedRootSegment) throw Error("There can only be one root segment. This is a bug in React.");
          a.completedRootSegment = c;
        }
        a.pendingRootTasks--;
        0 === a.pendingRootTasks && (a.onShellError = S, b = a.onShellReady, b());
      } else b.pendingTasks--, b.forceClientRender || (0 === b.pendingTasks ? (c.parentFlushed && 1 === c.status && X(b, c), b.parentFlushed && a.completedBoundaries.push(b), b.fallbackAbortableTasks.forEach(Lb, a), b.fallbackAbortableTasks.clear()) : c.parentFlushed && 1 === c.status && (X(b, c), 1 === b.completedSegments.length && b.parentFlushed && a.partialBoundaries.push(b)));
      a.allPendingTasks--;
      0 === a.allPendingTasks && (a = a.onAllReady, a());
    }
    function Eb(a) {
      if (2 !== a.status) {
        var b = D, c = Ab.current;
        Ab.current = zb;
        var d = R2;
        R2 = a.responseState;
        try {
          var f = a.pingedTasks, e;
          for (e = 0; e < f.length; e++) {
            var g = f[e];
            var h = a, k = g.blockedSegment;
            if (0 === k.status) {
              F(g.context);
              try {
                W(h, g, g.node), h.responseState.generateStaticMarkup || k.lastPushedText && k.textEmbedded && k.chunks.push("<!-- -->"), g.abortSet.delete(g), k.status = 1, Mb(h, g.blockedBoundary, k);
              } catch (y) {
                if (tb(), "object" === typeof y && null !== y && "function" === typeof y.then) {
                  var m = g.ping;
                  y.then(m, m);
                } else {
                  g.abortSet.delete(g);
                  k.status = 4;
                  var l = g.blockedBoundary, p = y, B = U(h, p);
                  null === l ? V(h, p) : (l.pendingTasks--, l.forceClientRender || (l.forceClientRender = true, l.errorDigest = B, l.parentFlushed && h.clientRenderedBoundaries.push(l)));
                  h.allPendingTasks--;
                  if (0 === h.allPendingTasks) {
                    var C = h.onAllReady;
                    C();
                  }
                }
              } finally {
              }
            }
          }
          f.splice(0, e);
          null !== a.destination && Ob(a, a.destination);
        } catch (y) {
          U(a, y), V(a, y);
        } finally {
          R2 = d, Ab.current = c, c === zb && F(b);
        }
      }
    }
    function Y(a, b, c) {
      c.parentFlushed = true;
      switch (c.status) {
        case 0:
          var d = c.id = a.nextSegmentId++;
          c.lastPushedText = false;
          c.textEmbedded = false;
          a = a.responseState;
          b.push('<template id="');
          b.push(a.placeholderPrefix);
          a = d.toString(16);
          b.push(a);
          return b.push('"></template>');
        case 1:
          c.status = 2;
          var f = true;
          d = c.chunks;
          var e = 0;
          c = c.children;
          for (var g = 0; g < c.length; g++) {
            for (f = c[g]; e < f.index; e++) b.push(d[e]);
            f = Z(a, b, f);
          }
          for (; e < d.length - 1; e++) b.push(d[e]);
          e < d.length && (f = b.push(d[e]));
          return f;
        default:
          throw Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
      }
    }
    function Z(a, b, c) {
      var d = c.boundary;
      if (null === d) return Y(a, b, c);
      d.parentFlushed = true;
      if (d.forceClientRender) return a.responseState.generateStaticMarkup || (d = d.errorDigest, b.push("<!--$!-->"), b.push("<template"), d && (b.push(' data-dgst="'), d = u(d), b.push(d), b.push('"')), b.push("></template>")), Y(a, b, c), a = a.responseState.generateStaticMarkup ? true : b.push("<!--/$-->"), a;
      if (0 < d.pendingTasks) {
        d.rootSegmentID = a.nextSegmentId++;
        0 < d.completedSegments.length && a.partialBoundaries.push(d);
        var f = a.responseState;
        var e = f.nextSuspenseID++;
        f = f.boundaryPrefix + e.toString(16);
        d = d.id = f;
        Aa(b, a.responseState, d);
        Y(a, b, c);
        return b.push("<!--/$-->");
      }
      if (d.byteSize > a.progressiveChunkSize) return d.rootSegmentID = a.nextSegmentId++, a.completedBoundaries.push(d), Aa(b, a.responseState, d.id), Y(a, b, c), b.push("<!--/$-->");
      a.responseState.generateStaticMarkup || b.push("<!--$-->");
      c = d.completedSegments;
      if (1 !== c.length) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
      Z(a, b, c[0]);
      a = a.responseState.generateStaticMarkup ? true : b.push("<!--/$-->");
      return a;
    }
    function Pb(a, b, c) {
      Ba(b, a.responseState, c.formatContext, c.id);
      Z(a, b, c);
      return Ca(b, c.formatContext);
    }
    function Qb(a, b, c) {
      for (var d = c.completedSegments, f = 0; f < d.length; f++) Rb(a, b, c, d[f]);
      d.length = 0;
      a = a.responseState;
      d = c.id;
      c = c.rootSegmentID;
      b.push(a.startInlineScript);
      a.sentCompleteBoundaryFunction ? b.push('$RC("') : (a.sentCompleteBoundaryFunction = true, b.push('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'));
      if (null === d) throw Error("An ID must have been assigned before we can complete the boundary.");
      c = c.toString(16);
      b.push(d);
      b.push('","');
      b.push(a.segmentPrefix);
      b.push(c);
      return b.push('")</script>');
    }
    function Rb(a, b, c, d) {
      if (2 === d.status) return true;
      var f = d.id;
      if (-1 === f) {
        if (-1 === (d.id = c.rootSegmentID)) throw Error("A root segment ID must have been assigned by now. This is a bug in React.");
        return Pb(a, b, d);
      }
      Pb(a, b, d);
      a = a.responseState;
      b.push(a.startInlineScript);
      a.sentCompleteSegmentFunction ? b.push('$RS("') : (a.sentCompleteSegmentFunction = true, b.push('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'));
      b.push(a.segmentPrefix);
      f = f.toString(16);
      b.push(f);
      b.push('","');
      b.push(a.placeholderPrefix);
      b.push(f);
      return b.push('")</script>');
    }
    function Ob(a, b) {
      try {
        var c = a.completedRootSegment;
        if (null !== c && 0 === a.pendingRootTasks) {
          Z(a, b, c);
          a.completedRootSegment = null;
          var d = a.responseState.bootstrapChunks;
          for (c = 0; c < d.length - 1; c++) b.push(d[c]);
          c < d.length && b.push(d[c]);
        }
        var f = a.clientRenderedBoundaries, e;
        for (e = 0; e < f.length; e++) {
          var g = f[e];
          d = b;
          var h = a.responseState, k = g.id, m = g.errorDigest, l = g.errorMessage, p = g.errorComponentStack;
          d.push(h.startInlineScript);
          h.sentClientRenderFunction ? d.push('$RX("') : (h.sentClientRenderFunction = true, d.push('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'));
          if (null === k) throw Error("An ID must have been assigned before we can complete the boundary.");
          d.push(k);
          d.push('"');
          if (m || l || p) {
            d.push(",");
            var B = Ea(m || "");
            d.push(B);
          }
          if (l || p) {
            d.push(",");
            var C = Ea(l || "");
            d.push(C);
          }
          if (p) {
            d.push(",");
            var y = Ea(p);
            d.push(y);
          }
          if (!d.push(")</script>")) {
            a.destination = null;
            e++;
            f.splice(0, e);
            return;
          }
        }
        f.splice(0, e);
        var aa = a.completedBoundaries;
        for (e = 0; e < aa.length; e++) if (!Qb(a, b, aa[e])) {
          a.destination = null;
          e++;
          aa.splice(0, e);
          return;
        }
        aa.splice(0, e);
        var ba = a.partialBoundaries;
        for (e = 0; e < ba.length; e++) {
          var pb = ba[e];
          a: {
            f = a;
            g = b;
            var ca = pb.completedSegments;
            for (h = 0; h < ca.length; h++) if (!Rb(f, g, pb, ca[h])) {
              h++;
              ca.splice(0, h);
              var qb = false;
              break a;
            }
            ca.splice(0, h);
            qb = true;
          }
          if (!qb) {
            a.destination = null;
            e++;
            ba.splice(0, e);
            return;
          }
        }
        ba.splice(0, e);
        var da = a.completedBoundaries;
        for (e = 0; e < da.length; e++) if (!Qb(a, b, da[e])) {
          a.destination = null;
          e++;
          da.splice(0, e);
          return;
        }
        da.splice(0, e);
      } finally {
        0 === a.allPendingTasks && 0 === a.pingedTasks.length && 0 === a.clientRenderedBoundaries.length && 0 === a.completedBoundaries.length && b.push(null);
      }
    }
    function Sb(a, b) {
      if (1 === a.status) a.status = 2, b.destroy(a.fatalError);
      else if (2 !== a.status && null === a.destination) {
        a.destination = b;
        try {
          Ob(a, b);
        } catch (c) {
          U(a, c), V(a, c);
        }
      }
    }
    function Tb(a, b) {
      try {
        var c = a.abortableTasks;
        c.forEach(function(c2) {
          return Nb(c2, a, b);
        });
        c.clear();
        null !== a.destination && Ob(a, a.destination);
      } catch (d) {
        U(a, d), V(a, d);
      }
    }
    function Ub() {
    }
    function Vb(a, b, c, d) {
      var f = false, e = null, g = "", h = false;
      a = Cb(a, Fa(c, b ? b.identifierPrefix : void 0), Ga(), Infinity, Ub, void 0, function() {
        h = true;
      }, void 0, void 0);
      Eb(a);
      Tb(a, d);
      Sb(a, { push: function(a2) {
        null !== a2 && (g += a2);
        return true;
      }, destroy: function(a2) {
        f = true;
        e = a2;
      } });
      if (f) throw e;
      if (!h) throw Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
      return g;
    }
    function Wb(a, b) {
      a.prototype = Object.create(b.prototype);
      a.prototype.constructor = a;
      a.__proto__ = b;
    }
    var Xb = (function(a) {
      function b() {
        var b2 = a.call(this, {}) || this;
        b2.request = null;
        b2.startedFlowing = false;
        return b2;
      }
      Wb(b, a);
      var c = b.prototype;
      c._destroy = function(a2, b2) {
        Tb(this.request);
        b2(a2);
      };
      c._read = function() {
        this.startedFlowing && Sb(this.request, this);
      };
      return b;
    })(fa.Readable);
    function Yb() {
    }
    function Zb(a, b) {
      var c = new Xb(), d = Cb(a, Fa(false, b ? b.identifierPrefix : void 0), Ga(), Infinity, Yb, function() {
        c.startedFlowing = true;
        Sb(d, c);
      }, void 0, void 0);
      c.request = d;
      Eb(d);
      return c;
    }
    exports2.renderToNodeStream = function(a, b) {
      return Zb(a, b);
    };
    exports2.renderToStaticMarkup = function(a, b) {
      return Vb(a, b, true, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server');
    };
    exports2.renderToStaticNodeStream = function(a, b) {
      return Zb(a, b);
    };
    exports2.renderToString = function(a, b) {
      return Vb(a, b, false, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server');
    };
    exports2.version = "18.3.1";
  }
});

// ../node_modules/react-dom/cjs/react-dom-server.node.production.min.js
var require_react_dom_server_node_production_min = __commonJS({
  "../node_modules/react-dom/cjs/react-dom-server.node.production.min.js"(exports2) {
    "use strict";
    var aa = require("util");
    var ba = require_react();
    var k = null;
    var l = 0;
    var q = true;
    function r(a, b) {
      if ("string" === typeof b) {
        if (0 !== b.length) if (2048 < 3 * b.length) 0 < l && (t(a, k.subarray(0, l)), k = new Uint8Array(2048), l = 0), t(a, u.encode(b));
        else {
          var c = k;
          0 < l && (c = k.subarray(l));
          c = u.encodeInto(b, c);
          var d = c.read;
          l += c.written;
          d < b.length && (t(a, k), k = new Uint8Array(2048), l = u.encodeInto(b.slice(d), k).written);
          2048 === l && (t(a, k), k = new Uint8Array(2048), l = 0);
        }
      } else 0 !== b.byteLength && (2048 < b.byteLength ? (0 < l && (t(a, k.subarray(0, l)), k = new Uint8Array(2048), l = 0), t(a, b)) : (c = k.length - l, c < b.byteLength && (0 === c ? t(
        a,
        k
      ) : (k.set(b.subarray(0, c), l), l += c, t(a, k), b = b.subarray(c)), k = new Uint8Array(2048), l = 0), k.set(b, l), l += b.byteLength, 2048 === l && (t(a, k), k = new Uint8Array(2048), l = 0)));
    }
    function t(a, b) {
      a = a.write(b);
      q = q && a;
    }
    function w(a, b) {
      r(a, b);
      return q;
    }
    function ca(a) {
      k && 0 < l && a.write(k.subarray(0, l));
      k = null;
      l = 0;
      q = true;
    }
    var u = new aa.TextEncoder();
    function x(a) {
      return u.encode(a);
    }
    var y = Object.prototype.hasOwnProperty;
    var da = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
    var ea = {};
    var fa = {};
    function ha(a) {
      if (y.call(fa, a)) return true;
      if (y.call(ea, a)) return false;
      if (da.test(a)) return fa[a] = true;
      ea[a] = true;
      return false;
    }
    function z(a, b, c, d, f, e, g) {
      this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
      this.attributeName = d;
      this.attributeNamespace = f;
      this.mustUseProperty = c;
      this.propertyName = a;
      this.type = b;
      this.sanitizeURL = e;
      this.removeEmptyString = g;
    }
    var A = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      A[a] = new z(a, 0, false, a, null, false, false);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      A[b] = new z(b, 1, false, a[1], null, false, false);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      A[a] = new z(a, 2, false, a.toLowerCase(), null, false, false);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      A[a] = new z(a, 2, false, a, null, false, false);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      A[a] = new z(a, 3, false, a.toLowerCase(), null, false, false);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      A[a] = new z(a, 3, true, a, null, false, false);
    });
    ["capture", "download"].forEach(function(a) {
      A[a] = new z(a, 4, false, a, null, false, false);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      A[a] = new z(a, 6, false, a, null, false, false);
    });
    ["rowSpan", "start"].forEach(function(a) {
      A[a] = new z(a, 5, false, a.toLowerCase(), null, false, false);
    });
    var ia = /[\-:]([a-z])/g;
    function ja(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(
        ia,
        ja
      );
      A[b] = new z(b, 1, false, a, null, false, false);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(ia, ja);
      A[b] = new z(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(ia, ja);
      A[b] = new z(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      A[a] = new z(a, 1, false, a.toLowerCase(), null, false, false);
    });
    A.xlinkHref = new z("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      A[a] = new z(a, 1, false, a.toLowerCase(), null, true, true);
    });
    var B = {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    var ka = ["Webkit", "ms", "Moz", "O"];
    Object.keys(B).forEach(function(a) {
      ka.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1);
        B[b] = B[a];
      });
    });
    var la = /["'&<>]/;
    function F(a) {
      if ("boolean" === typeof a || "number" === typeof a) return "" + a;
      a = "" + a;
      var b = la.exec(a);
      if (b) {
        var c = "", d, f = 0;
        for (d = b.index; d < a.length; d++) {
          switch (a.charCodeAt(d)) {
            case 34:
              b = "&quot;";
              break;
            case 38:
              b = "&amp;";
              break;
            case 39:
              b = "&#x27;";
              break;
            case 60:
              b = "&lt;";
              break;
            case 62:
              b = "&gt;";
              break;
            default:
              continue;
          }
          f !== d && (c += a.substring(f, d));
          f = d + 1;
          c += b;
        }
        a = f !== d ? c + a.substring(f, d) : c;
      }
      return a;
    }
    var ma = /([A-Z])/g;
    var pa = /^ms-/;
    var qa = Array.isArray;
    var ra = x("<script>");
    var sa = x("</script>");
    var ta = x('<script src="');
    var ua = x('<script type="module" src="');
    var va = x('" async=""></script>');
    var wa = /(<\/|<)(s)(cript)/gi;
    function xa(a, b, c, d) {
      return "" + b + ("s" === c ? "\\u0073" : "\\u0053") + d;
    }
    function G(a, b) {
      return { insertionMode: a, selectedValue: b };
    }
    function ya(a, b, c) {
      switch (b) {
        case "select":
          return G(1, null != c.value ? c.value : c.defaultValue);
        case "svg":
          return G(2, null);
        case "math":
          return G(3, null);
        case "foreignObject":
          return G(1, null);
        case "table":
          return G(4, null);
        case "thead":
        case "tbody":
        case "tfoot":
          return G(5, null);
        case "colgroup":
          return G(7, null);
        case "tr":
          return G(6, null);
      }
      return 4 <= a.insertionMode || 0 === a.insertionMode ? G(1, null) : a;
    }
    var za = x("<!-- -->");
    function Aa(a, b, c, d) {
      if ("" === b) return d;
      d && a.push(za);
      a.push(F(b));
      return true;
    }
    var Ba = /* @__PURE__ */ new Map();
    var Ca = x(' style="');
    var Da = x(":");
    var Ea = x(";");
    function Fa(a, b, c) {
      if ("object" !== typeof c) throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      b = true;
      for (var d in c) if (y.call(c, d)) {
        var f = c[d];
        if (null != f && "boolean" !== typeof f && "" !== f) {
          if (0 === d.indexOf("--")) {
            var e = F(d);
            f = F(("" + f).trim());
          } else {
            e = d;
            var g = Ba.get(e);
            void 0 !== g ? e = g : (g = x(F(e.replace(ma, "-$1").toLowerCase().replace(pa, "-ms-"))), Ba.set(e, g), e = g);
            f = "number" === typeof f ? 0 === f || y.call(
              B,
              d
            ) ? "" + f : f + "px" : F(("" + f).trim());
          }
          b ? (b = false, a.push(Ca, e, Da, f)) : a.push(Ea, e, Da, f);
        }
      }
      b || a.push(H);
    }
    var I = x(" ");
    var J = x('="');
    var H = x('"');
    var Ga = x('=""');
    function K(a, b, c, d) {
      switch (c) {
        case "style":
          Fa(a, b, d);
          return;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          return;
      }
      if (!(2 < c.length) || "o" !== c[0] && "O" !== c[0] || "n" !== c[1] && "N" !== c[1]) {
        if (b = A.hasOwnProperty(c) ? A[c] : null, null !== b) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (!b.acceptsBooleans) return;
          }
          c = b.attributeName;
          switch (b.type) {
            case 3:
              d && a.push(I, c, Ga);
              break;
            case 4:
              true === d ? a.push(I, c, Ga) : false !== d && a.push(I, c, J, F(d), H);
              break;
            case 5:
              isNaN(d) || a.push(I, c, J, F(d), H);
              break;
            case 6:
              !isNaN(d) && 1 <= d && a.push(I, c, J, F(d), H);
              break;
            default:
              b.sanitizeURL && (d = "" + d), a.push(I, c, J, F(d), H);
          }
        } else if (ha(c)) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (b = c.toLowerCase().slice(0, 5), "data-" !== b && "aria-" !== b) return;
          }
          a.push(I, c, J, F(d), H);
        }
      }
    }
    var L2 = x(">");
    var Ha = x("/>");
    function M(a, b, c) {
      if (null != b) {
        if (null != c) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if ("object" !== typeof b || !("__html" in b)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        b = b.__html;
        null !== b && void 0 !== b && a.push("" + b);
      }
    }
    function Ia(a) {
      var b = "";
      ba.Children.forEach(a, function(a2) {
        null != a2 && (b += a2);
      });
      return b;
    }
    var Ja = x(' selected=""');
    function Ka(a, b, c, d) {
      a.push(N(c));
      var f = c = null, e;
      for (e in b) if (y.call(b, e)) {
        var g = b[e];
        if (null != g) switch (e) {
          case "children":
            c = g;
            break;
          case "dangerouslySetInnerHTML":
            f = g;
            break;
          default:
            K(a, d, e, g);
        }
      }
      a.push(L2);
      M(a, f, c);
      return "string" === typeof c ? (a.push(F(c)), null) : c;
    }
    var La = x("\n");
    var Ma = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var Na = /* @__PURE__ */ new Map();
    function N(a) {
      var b = Na.get(a);
      if (void 0 === b) {
        if (!Ma.test(a)) throw Error("Invalid tag: " + a);
        b = x("<" + a);
        Na.set(a, b);
      }
      return b;
    }
    var Oa = x("<!DOCTYPE html>");
    function Pa(a, b, c, d, f) {
      switch (b) {
        case "select":
          a.push(N("select"));
          var e = null, g = null;
          for (p in c) if (y.call(c, p)) {
            var h = c[p];
            if (null != h) switch (p) {
              case "children":
                e = h;
                break;
              case "dangerouslySetInnerHTML":
                g = h;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                K(a, d, p, h);
            }
          }
          a.push(L2);
          M(a, g, e);
          return e;
        case "option":
          g = f.selectedValue;
          a.push(N("option"));
          var m = h = null, n = null;
          var p = null;
          for (e in c) if (y.call(c, e)) {
            var v = c[e];
            if (null != v) switch (e) {
              case "children":
                h = v;
                break;
              case "selected":
                n = v;
                break;
              case "dangerouslySetInnerHTML":
                p = v;
                break;
              case "value":
                m = v;
              default:
                K(a, d, e, v);
            }
          }
          if (null != g) if (c = null !== m ? "" + m : Ia(h), qa(g)) for (d = 0; d < g.length; d++) {
            if ("" + g[d] === c) {
              a.push(Ja);
              break;
            }
          }
          else "" + g === c && a.push(Ja);
          else n && a.push(Ja);
          a.push(L2);
          M(a, p, h);
          return h;
        case "textarea":
          a.push(N("textarea"));
          p = g = e = null;
          for (h in c) if (y.call(c, h) && (m = c[h], null != m)) switch (h) {
            case "children":
              p = m;
              break;
            case "value":
              e = m;
              break;
            case "defaultValue":
              g = m;
              break;
            case "dangerouslySetInnerHTML":
              throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
            default:
              K(a, d, h, m);
          }
          null === e && null !== g && (e = g);
          a.push(L2);
          if (null != p) {
            if (null != e) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (qa(p) && 1 < p.length) throw Error("<textarea> can only have at most one child.");
            e = "" + p;
          }
          "string" === typeof e && "\n" === e[0] && a.push(La);
          null !== e && a.push(F("" + e));
          return null;
        case "input":
          a.push(N("input"));
          m = p = h = e = null;
          for (g in c) if (y.call(c, g) && (n = c[g], null != n)) switch (g) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
            case "defaultChecked":
              m = n;
              break;
            case "defaultValue":
              h = n;
              break;
            case "checked":
              p = n;
              break;
            case "value":
              e = n;
              break;
            default:
              K(a, d, g, n);
          }
          null !== p ? K(a, d, "checked", p) : null !== m && K(a, d, "checked", m);
          null !== e ? K(a, d, "value", e) : null !== h && K(a, d, "value", h);
          a.push(Ha);
          return null;
        case "menuitem":
          a.push(N("menuitem"));
          for (var C in c) if (y.call(c, C) && (e = c[C], null != e)) switch (C) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
            default:
              K(a, d, C, e);
          }
          a.push(L2);
          return null;
        case "title":
          a.push(N("title"));
          e = null;
          for (v in c) if (y.call(c, v) && (g = c[v], null != g)) switch (v) {
            case "children":
              e = g;
              break;
            case "dangerouslySetInnerHTML":
              throw Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
            default:
              K(a, d, v, g);
          }
          a.push(L2);
          return e;
        case "listing":
        case "pre":
          a.push(N(b));
          g = e = null;
          for (m in c) if (y.call(c, m) && (h = c[m], null != h)) switch (m) {
            case "children":
              e = h;
              break;
            case "dangerouslySetInnerHTML":
              g = h;
              break;
            default:
              K(a, d, m, h);
          }
          a.push(L2);
          if (null != g) {
            if (null != e) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            if ("object" !== typeof g || !("__html" in g)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
            c = g.__html;
            null !== c && void 0 !== c && ("string" === typeof c && 0 < c.length && "\n" === c[0] ? a.push(La, c) : a.push("" + c));
          }
          "string" === typeof e && "\n" === e[0] && a.push(La);
          return e;
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          a.push(N(b));
          for (var D in c) if (y.call(c, D) && (e = c[D], null != e)) switch (D) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(b + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
            default:
              K(a, d, D, e);
          }
          a.push(Ha);
          return null;
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return Ka(a, c, b, d);
        case "html":
          return 0 === f.insertionMode && a.push(Oa), Ka(
            a,
            c,
            b,
            d
          );
        default:
          if (-1 === b.indexOf("-") && "string" !== typeof c.is) return Ka(a, c, b, d);
          a.push(N(b));
          g = e = null;
          for (n in c) if (y.call(c, n) && (h = c[n], null != h)) switch (n) {
            case "children":
              e = h;
              break;
            case "dangerouslySetInnerHTML":
              g = h;
              break;
            case "style":
              Fa(a, d, h);
              break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
              break;
            default:
              ha(n) && "function" !== typeof h && "symbol" !== typeof h && a.push(I, n, J, F(h), H);
          }
          a.push(L2);
          M(a, g, e);
          return e;
      }
    }
    var Qa = x("</");
    var Ra = x(">");
    var Sa = x('<template id="');
    var Ta = x('"></template>');
    var Ua = x("<!--$-->");
    var Va = x('<!--$?--><template id="');
    var Wa = x('"></template>');
    var Xa = x("<!--$!-->");
    var Ya = x("<!--/$-->");
    var Za = x("<template");
    var $a = x('"');
    var ab = x(' data-dgst="');
    x(' data-msg="');
    x(' data-stck="');
    var bb = x("></template>");
    function cb(a, b, c) {
      r(a, Va);
      if (null === c) throw Error("An ID must have been assigned before we can complete the boundary.");
      r(a, c);
      return w(a, Wa);
    }
    var db = x('<div hidden id="');
    var eb = x('">');
    var fb = x("</div>");
    var gb = x('<svg aria-hidden="true" style="display:none" id="');
    var hb = x('">');
    var ib = x("</svg>");
    var jb = x('<math aria-hidden="true" style="display:none" id="');
    var kb = x('">');
    var lb = x("</math>");
    var mb = x('<table hidden id="');
    var nb = x('">');
    var ob = x("</table>");
    var pb = x('<table hidden><tbody id="');
    var qb = x('">');
    var rb = x("</tbody></table>");
    var sb = x('<table hidden><tr id="');
    var tb = x('">');
    var ub = x("</tr></table>");
    var vb = x('<table hidden><colgroup id="');
    var wb = x('">');
    var xb = x("</colgroup></table>");
    function yb(a, b, c, d) {
      switch (c.insertionMode) {
        case 0:
        case 1:
          return r(a, db), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, eb);
        case 2:
          return r(a, gb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, hb);
        case 3:
          return r(a, jb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, kb);
        case 4:
          return r(a, mb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, nb);
        case 5:
          return r(a, pb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, qb);
        case 6:
          return r(a, sb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, tb);
        case 7:
          return r(a, vb), r(
            a,
            b.segmentPrefix
          ), r(a, d.toString(16)), w(a, wb);
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    function zb(a, b) {
      switch (b.insertionMode) {
        case 0:
        case 1:
          return w(a, fb);
        case 2:
          return w(a, ib);
        case 3:
          return w(a, lb);
        case 4:
          return w(a, ob);
        case 5:
          return w(a, rb);
        case 6:
          return w(a, ub);
        case 7:
          return w(a, xb);
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    var Ab = x('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("');
    var Bb = x('$RS("');
    var Cb = x('","');
    var Db = x('")</script>');
    var Fb = x('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("');
    var Gb = x('$RC("');
    var Hb = x('","');
    var Ib = x('")</script>');
    var Jb = x('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("');
    var Kb = x('$RX("');
    var Lb = x('"');
    var Mb = x(")</script>");
    var Nb = x(",");
    var Ob = /[<\u2028\u2029]/g;
    function Pb(a) {
      return JSON.stringify(a).replace(Ob, function(a2) {
        switch (a2) {
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
        }
      });
    }
    var O = Object.assign;
    var Qb = /* @__PURE__ */ Symbol.for("react.element");
    var Rb = /* @__PURE__ */ Symbol.for("react.portal");
    var Sb = /* @__PURE__ */ Symbol.for("react.fragment");
    var Tb = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var Ub = /* @__PURE__ */ Symbol.for("react.profiler");
    var Vb = /* @__PURE__ */ Symbol.for("react.provider");
    var Wb = /* @__PURE__ */ Symbol.for("react.context");
    var Xb = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var Yb = /* @__PURE__ */ Symbol.for("react.suspense");
    var Zb = /* @__PURE__ */ Symbol.for("react.suspense_list");
    var $b = /* @__PURE__ */ Symbol.for("react.memo");
    var ac = /* @__PURE__ */ Symbol.for("react.lazy");
    var bc = /* @__PURE__ */ Symbol.for("react.scope");
    var cc = /* @__PURE__ */ Symbol.for("react.debug_trace_mode");
    var dc = /* @__PURE__ */ Symbol.for("react.legacy_hidden");
    var ec = /* @__PURE__ */ Symbol.for("react.default_value");
    var fc = Symbol.iterator;
    function gc(a) {
      if (null == a) return null;
      if ("function" === typeof a) return a.displayName || a.name || null;
      if ("string" === typeof a) return a;
      switch (a) {
        case Sb:
          return "Fragment";
        case Rb:
          return "Portal";
        case Ub:
          return "Profiler";
        case Tb:
          return "StrictMode";
        case Yb:
          return "Suspense";
        case Zb:
          return "SuspenseList";
      }
      if ("object" === typeof a) switch (a.$$typeof) {
        case Wb:
          return (a.displayName || "Context") + ".Consumer";
        case Vb:
          return (a._context.displayName || "Context") + ".Provider";
        case Xb:
          var b = a.render;
          a = a.displayName;
          a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          return a;
        case $b:
          return b = a.displayName || null, null !== b ? b : gc(a.type) || "Memo";
        case ac:
          b = a._payload;
          a = a._init;
          try {
            return gc(a(b));
          } catch (c) {
          }
      }
      return null;
    }
    var hc = {};
    function ic(a, b) {
      a = a.contextTypes;
      if (!a) return hc;
      var c = {}, d;
      for (d in a) c[d] = b[d];
      return c;
    }
    var P = null;
    function Q(a, b) {
      if (a !== b) {
        a.context._currentValue = a.parentValue;
        a = a.parent;
        var c = b.parent;
        if (null === a) {
          if (null !== c) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
        } else {
          if (null === c) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
          Q(a, c);
        }
        b.context._currentValue = b.value;
      }
    }
    function jc(a) {
      a.context._currentValue = a.parentValue;
      a = a.parent;
      null !== a && jc(a);
    }
    function kc(a) {
      var b = a.parent;
      null !== b && kc(b);
      a.context._currentValue = a.value;
    }
    function lc(a, b) {
      a.context._currentValue = a.parentValue;
      a = a.parent;
      if (null === a) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
      a.depth === b.depth ? Q(a, b) : lc(a, b);
    }
    function mc(a, b) {
      var c = b.parent;
      if (null === c) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
      a.depth === c.depth ? Q(a, c) : mc(a, c);
      b.context._currentValue = b.value;
    }
    function nc(a) {
      var b = P;
      b !== a && (null === b ? kc(a) : null === a ? jc(b) : b.depth === a.depth ? Q(b, a) : b.depth > a.depth ? lc(b, a) : mc(b, a), P = a);
    }
    var oc = { isMounted: function() {
      return false;
    }, enqueueSetState: function(a, b) {
      a = a._reactInternals;
      null !== a.queue && a.queue.push(b);
    }, enqueueReplaceState: function(a, b) {
      a = a._reactInternals;
      a.replace = true;
      a.queue = [b];
    }, enqueueForceUpdate: function() {
    } };
    function pc(a, b, c, d) {
      var f = void 0 !== a.state ? a.state : null;
      a.updater = oc;
      a.props = c;
      a.state = f;
      var e = { queue: [], replace: false };
      a._reactInternals = e;
      var g = b.contextType;
      a.context = "object" === typeof g && null !== g ? g._currentValue : d;
      g = b.getDerivedStateFromProps;
      "function" === typeof g && (g = g(c, f), f = null === g || void 0 === g ? f : O({}, f, g), a.state = f);
      if ("function" !== typeof b.getDerivedStateFromProps && "function" !== typeof a.getSnapshotBeforeUpdate && ("function" === typeof a.UNSAFE_componentWillMount || "function" === typeof a.componentWillMount)) if (b = a.state, "function" === typeof a.componentWillMount && a.componentWillMount(), "function" === typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(), b !== a.state && oc.enqueueReplaceState(a, a.state, null), null !== e.queue && 0 < e.queue.length) if (b = e.queue, g = e.replace, e.queue = null, e.replace = false, g && 1 === b.length) a.state = b[0];
      else {
        e = g ? b[0] : a.state;
        f = true;
        for (g = g ? 1 : 0; g < b.length; g++) {
          var h = b[g];
          h = "function" === typeof h ? h.call(a, e, c, d) : h;
          null != h && (f ? (f = false, e = O({}, e, h)) : O(e, h));
        }
        a.state = e;
      }
      else e.queue = null;
    }
    var qc = { id: 1, overflow: "" };
    function rc(a, b, c) {
      var d = a.id;
      a = a.overflow;
      var f = 32 - sc(d) - 1;
      d &= ~(1 << f);
      c += 1;
      var e = 32 - sc(b) + f;
      if (30 < e) {
        var g = f - f % 5;
        e = (d & (1 << g) - 1).toString(32);
        d >>= g;
        f -= g;
        return { id: 1 << 32 - sc(b) + f | c << f | d, overflow: e + a };
      }
      return { id: 1 << e | c << f | d, overflow: a };
    }
    var sc = Math.clz32 ? Math.clz32 : tc;
    var uc = Math.log;
    var vc = Math.LN2;
    function tc(a) {
      a >>>= 0;
      return 0 === a ? 32 : 31 - (uc(a) / vc | 0) | 0;
    }
    function wc(a, b) {
      return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var xc = "function" === typeof Object.is ? Object.is : wc;
    var R2 = null;
    var yc = null;
    var zc = null;
    var S = null;
    var T = false;
    var Ac = false;
    var U = 0;
    var V = null;
    var Bc = 0;
    function W() {
      if (null === R2) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
      return R2;
    }
    function Cc() {
      if (0 < Bc) throw Error("Rendered more hooks than during the previous render");
      return { memoizedState: null, queue: null, next: null };
    }
    function Dc() {
      null === S ? null === zc ? (T = false, zc = S = Cc()) : (T = true, S = zc) : null === S.next ? (T = false, S = S.next = Cc()) : (T = true, S = S.next);
      return S;
    }
    function Ec() {
      yc = R2 = null;
      Ac = false;
      zc = null;
      Bc = 0;
      S = V = null;
    }
    function Fc(a, b) {
      return "function" === typeof b ? b(a) : b;
    }
    function Gc(a, b, c) {
      R2 = W();
      S = Dc();
      if (T) {
        var d = S.queue;
        b = d.dispatch;
        if (null !== V && (c = V.get(d), void 0 !== c)) {
          V.delete(d);
          d = S.memoizedState;
          do
            d = a(d, c.action), c = c.next;
          while (null !== c);
          S.memoizedState = d;
          return [d, b];
        }
        return [S.memoizedState, b];
      }
      a = a === Fc ? "function" === typeof b ? b() : b : void 0 !== c ? c(b) : b;
      S.memoizedState = a;
      a = S.queue = { last: null, dispatch: null };
      a = a.dispatch = Hc.bind(null, R2, a);
      return [S.memoizedState, a];
    }
    function Ic(a, b) {
      R2 = W();
      S = Dc();
      b = void 0 === b ? null : b;
      if (null !== S) {
        var c = S.memoizedState;
        if (null !== c && null !== b) {
          var d = c[1];
          a: if (null === d) d = false;
          else {
            for (var f = 0; f < d.length && f < b.length; f++) if (!xc(b[f], d[f])) {
              d = false;
              break a;
            }
            d = true;
          }
          if (d) return c[0];
        }
      }
      a = a();
      S.memoizedState = [a, b];
      return a;
    }
    function Hc(a, b, c) {
      if (25 <= Bc) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
      if (a === R2) if (Ac = true, a = { action: c, next: null }, null === V && (V = /* @__PURE__ */ new Map()), c = V.get(b), void 0 === c) V.set(b, a);
      else {
        for (b = c; null !== b.next; ) b = b.next;
        b.next = a;
      }
    }
    function Jc() {
      throw Error("startTransition cannot be called during server rendering.");
    }
    function Kc() {
    }
    var Mc = { readContext: function(a) {
      return a._currentValue;
    }, useContext: function(a) {
      W();
      return a._currentValue;
    }, useMemo: Ic, useReducer: Gc, useRef: function(a) {
      R2 = W();
      S = Dc();
      var b = S.memoizedState;
      return null === b ? (a = { current: a }, S.memoizedState = a) : b;
    }, useState: function(a) {
      return Gc(Fc, a);
    }, useInsertionEffect: Kc, useLayoutEffect: function() {
    }, useCallback: function(a, b) {
      return Ic(function() {
        return a;
      }, b);
    }, useImperativeHandle: Kc, useEffect: Kc, useDebugValue: Kc, useDeferredValue: function(a) {
      W();
      return a;
    }, useTransition: function() {
      W();
      return [false, Jc];
    }, useId: function() {
      var a = yc.treeContext;
      var b = a.overflow;
      a = a.id;
      a = (a & ~(1 << 32 - sc(a) - 1)).toString(32) + b;
      var c = Lc;
      if (null === c) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
      b = U++;
      a = ":" + c.idPrefix + "R" + a;
      0 < b && (a += "H" + b.toString(32));
      return a + ":";
    }, useMutableSource: function(a, b) {
      W();
      return b(a._source);
    }, useSyncExternalStore: function(a, b, c) {
      if (void 0 === c) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      return c();
    } };
    var Lc = null;
    var Nc = ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
    function Oc(a) {
      console.error(a);
      return null;
    }
    function X() {
    }
    function Pc(a, b) {
      var c = a.pingedTasks;
      c.push(b);
      1 === c.length && setImmediate(function() {
        return Qc(a);
      });
    }
    function Rc(a, b, c, d, f, e, g, h) {
      a.allPendingTasks++;
      null === c ? a.pendingRootTasks++ : c.pendingTasks++;
      var m = { node: b, ping: function() {
        return Pc(a, m);
      }, blockedBoundary: c, blockedSegment: d, abortSet: f, legacyContext: e, context: g, treeContext: h };
      f.add(m);
      return m;
    }
    function Sc(a, b, c, d, f, e) {
      return { status: 0, id: -1, index: b, parentFlushed: false, chunks: [], children: [], formatContext: d, boundary: c, lastPushedText: f, textEmbedded: e };
    }
    function Y(a, b) {
      a = a.onError(b);
      if (null != a && "string" !== typeof a) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a + '" instead');
      return a;
    }
    function Tc(a, b) {
      var c = a.onShellError;
      c(b);
      c = a.onFatalError;
      c(b);
      null !== a.destination ? (a.status = 2, a.destination.destroy(b)) : (a.status = 1, a.fatalError = b);
    }
    function Uc(a, b, c, d, f) {
      R2 = {};
      yc = b;
      U = 0;
      for (a = c(d, f); Ac; ) Ac = false, U = 0, Bc += 1, S = null, a = c(d, f);
      Ec();
      return a;
    }
    function Vc(a, b, c, d) {
      var f = c.render(), e = d.childContextTypes;
      if (null !== e && void 0 !== e) {
        var g = b.legacyContext;
        if ("function" !== typeof c.getChildContext) d = g;
        else {
          c = c.getChildContext();
          for (var h in c) if (!(h in e)) throw Error((gc(d) || "Unknown") + '.getChildContext(): key "' + h + '" is not defined in childContextTypes.');
          d = O({}, g, c);
        }
        b.legacyContext = d;
        Z(a, b, f);
        b.legacyContext = g;
      } else Z(a, b, f);
    }
    function Wc(a, b) {
      if (a && a.defaultProps) {
        b = O({}, b);
        a = a.defaultProps;
        for (var c in a) void 0 === b[c] && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    function Xc(a, b, c, d, f) {
      if ("function" === typeof c) if (c.prototype && c.prototype.isReactComponent) {
        f = ic(c, b.legacyContext);
        var e = c.contextType;
        e = new c(d, "object" === typeof e && null !== e ? e._currentValue : f);
        pc(e, c, d, f);
        Vc(a, b, e, c);
      } else {
        e = ic(c, b.legacyContext);
        f = Uc(a, b, c, d, e);
        var g = 0 !== U;
        if ("object" === typeof f && null !== f && "function" === typeof f.render && void 0 === f.$$typeof) pc(f, c, d, e), Vc(a, b, f, c);
        else if (g) {
          d = b.treeContext;
          b.treeContext = rc(d, 1, 0);
          try {
            Z(a, b, f);
          } finally {
            b.treeContext = d;
          }
        } else Z(a, b, f);
      }
      else if ("string" === typeof c) {
        f = b.blockedSegment;
        e = Pa(f.chunks, c, d, a.responseState, f.formatContext);
        f.lastPushedText = false;
        g = f.formatContext;
        f.formatContext = ya(g, c, d);
        Yc(a, b, e);
        f.formatContext = g;
        switch (c) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break;
          default:
            f.chunks.push(Qa, c, Ra);
        }
        f.lastPushedText = false;
      } else {
        switch (c) {
          case dc:
          case cc:
          case Tb:
          case Ub:
          case Sb:
            Z(a, b, d.children);
            return;
          case Zb:
            Z(
              a,
              b,
              d.children
            );
            return;
          case bc:
            throw Error("ReactDOMServer does not yet support scope components.");
          case Yb:
            a: {
              c = b.blockedBoundary;
              f = b.blockedSegment;
              e = d.fallback;
              d = d.children;
              g = /* @__PURE__ */ new Set();
              var h = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g, errorDigest: null }, m = Sc(a, f.chunks.length, h, f.formatContext, false, false);
              f.children.push(m);
              f.lastPushedText = false;
              var n = Sc(a, 0, null, f.formatContext, false, false);
              n.parentFlushed = true;
              b.blockedBoundary = h;
              b.blockedSegment = n;
              try {
                if (Yc(a, b, d), n.lastPushedText && n.textEmbedded && n.chunks.push(za), n.status = 1, Zc(h, n), 0 === h.pendingTasks) break a;
              } catch (p) {
                n.status = 4, h.forceClientRender = true, h.errorDigest = Y(a, p);
              } finally {
                b.blockedBoundary = c, b.blockedSegment = f;
              }
              b = Rc(a, e, c, m, g, b.legacyContext, b.context, b.treeContext);
              a.pingedTasks.push(b);
            }
            return;
        }
        if ("object" === typeof c && null !== c) switch (c.$$typeof) {
          case Xb:
            d = Uc(a, b, c.render, d, f);
            if (0 !== U) {
              c = b.treeContext;
              b.treeContext = rc(c, 1, 0);
              try {
                Z(a, b, d);
              } finally {
                b.treeContext = c;
              }
            } else Z(
              a,
              b,
              d
            );
            return;
          case $b:
            c = c.type;
            d = Wc(c, d);
            Xc(a, b, c, d, f);
            return;
          case Vb:
            f = d.children;
            c = c._context;
            d = d.value;
            e = c._currentValue;
            c._currentValue = d;
            g = P;
            P = d = { parent: g, depth: null === g ? 0 : g.depth + 1, context: c, parentValue: e, value: d };
            b.context = d;
            Z(a, b, f);
            a = P;
            if (null === a) throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
            d = a.parentValue;
            a.context._currentValue = d === ec ? a.context._defaultValue : d;
            a = P = a.parent;
            b.context = a;
            return;
          case Wb:
            d = d.children;
            d = d(c._currentValue);
            Z(a, b, d);
            return;
          case ac:
            f = c._init;
            c = f(c._payload);
            d = Wc(c, d);
            Xc(a, b, c, d, void 0);
            return;
        }
        throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((null == c ? c : typeof c) + "."));
      }
    }
    function Z(a, b, c) {
      b.node = c;
      if ("object" === typeof c && null !== c) {
        switch (c.$$typeof) {
          case Qb:
            Xc(a, b, c.type, c.props, c.ref);
            return;
          case Rb:
            throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
          case ac:
            var d = c._init;
            c = d(c._payload);
            Z(a, b, c);
            return;
        }
        if (qa(c)) {
          $c(a, b, c);
          return;
        }
        null === c || "object" !== typeof c ? d = null : (d = fc && c[fc] || c["@@iterator"], d = "function" === typeof d ? d : null);
        if (d && (d = d.call(c))) {
          c = d.next();
          if (!c.done) {
            var f = [];
            do
              f.push(c.value), c = d.next();
            while (!c.done);
            $c(a, b, f);
          }
          return;
        }
        a = Object.prototype.toString.call(c);
        throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === a ? "object with keys {" + Object.keys(c).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
      }
      "string" === typeof c ? (d = b.blockedSegment, d.lastPushedText = Aa(b.blockedSegment.chunks, c, a.responseState, d.lastPushedText)) : "number" === typeof c && (d = b.blockedSegment, d.lastPushedText = Aa(
        b.blockedSegment.chunks,
        "" + c,
        a.responseState,
        d.lastPushedText
      ));
    }
    function $c(a, b, c) {
      for (var d = c.length, f = 0; f < d; f++) {
        var e = b.treeContext;
        b.treeContext = rc(e, d, f);
        try {
          Yc(a, b, c[f]);
        } finally {
          b.treeContext = e;
        }
      }
    }
    function Yc(a, b, c) {
      var d = b.blockedSegment.formatContext, f = b.legacyContext, e = b.context;
      try {
        return Z(a, b, c);
      } catch (m) {
        if (Ec(), "object" === typeof m && null !== m && "function" === typeof m.then) {
          c = m;
          var g = b.blockedSegment, h = Sc(a, g.chunks.length, null, g.formatContext, g.lastPushedText, true);
          g.children.push(h);
          g.lastPushedText = false;
          a = Rc(a, b.node, b.blockedBoundary, h, b.abortSet, b.legacyContext, b.context, b.treeContext).ping;
          c.then(a, a);
          b.blockedSegment.formatContext = d;
          b.legacyContext = f;
          b.context = e;
          nc(e);
        } else throw b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, nc(e), m;
      }
    }
    function ad(a) {
      var b = a.blockedBoundary;
      a = a.blockedSegment;
      a.status = 3;
      bd(this, b, a);
    }
    function cd(a, b, c) {
      var d = a.blockedBoundary;
      a.blockedSegment.status = 3;
      null === d ? (b.allPendingTasks--, 2 !== b.status && (b.status = 2, null !== b.destination && b.destination.end())) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = true, d.errorDigest = b.onError(void 0 === c ? Error("The render was aborted by the server without a reason.") : c), d.parentFlushed && b.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a2) {
        return cd(a2, b, c);
      }), d.fallbackAbortableTasks.clear(), b.allPendingTasks--, 0 === b.allPendingTasks && (a = b.onAllReady, a()));
    }
    function Zc(a, b) {
      if (0 === b.chunks.length && 1 === b.children.length && null === b.children[0].boundary) {
        var c = b.children[0];
        c.id = b.id;
        c.parentFlushed = true;
        1 === c.status && Zc(a, c);
      } else a.completedSegments.push(b);
    }
    function bd(a, b, c) {
      if (null === b) {
        if (c.parentFlushed) {
          if (null !== a.completedRootSegment) throw Error("There can only be one root segment. This is a bug in React.");
          a.completedRootSegment = c;
        }
        a.pendingRootTasks--;
        0 === a.pendingRootTasks && (a.onShellError = X, b = a.onShellReady, b());
      } else b.pendingTasks--, b.forceClientRender || (0 === b.pendingTasks ? (c.parentFlushed && 1 === c.status && Zc(b, c), b.parentFlushed && a.completedBoundaries.push(b), b.fallbackAbortableTasks.forEach(ad, a), b.fallbackAbortableTasks.clear()) : c.parentFlushed && 1 === c.status && (Zc(b, c), 1 === b.completedSegments.length && b.parentFlushed && a.partialBoundaries.push(b)));
      a.allPendingTasks--;
      0 === a.allPendingTasks && (a = a.onAllReady, a());
    }
    function Qc(a) {
      if (2 !== a.status) {
        var b = P, c = Nc.current;
        Nc.current = Mc;
        var d = Lc;
        Lc = a.responseState;
        try {
          var f = a.pingedTasks, e;
          for (e = 0; e < f.length; e++) {
            var g = f[e];
            var h = a, m = g.blockedSegment;
            if (0 === m.status) {
              nc(g.context);
              try {
                Z(h, g, g.node), m.lastPushedText && m.textEmbedded && m.chunks.push(za), g.abortSet.delete(g), m.status = 1, bd(h, g.blockedBoundary, m);
              } catch (E) {
                if (Ec(), "object" === typeof E && null !== E && "function" === typeof E.then) {
                  var n = g.ping;
                  E.then(n, n);
                } else {
                  g.abortSet.delete(g);
                  m.status = 4;
                  var p = g.blockedBoundary, v = E, C = Y(h, v);
                  null === p ? Tc(h, v) : (p.pendingTasks--, p.forceClientRender || (p.forceClientRender = true, p.errorDigest = C, p.parentFlushed && h.clientRenderedBoundaries.push(p)));
                  h.allPendingTasks--;
                  if (0 === h.allPendingTasks) {
                    var D = h.onAllReady;
                    D();
                  }
                }
              } finally {
              }
            }
          }
          f.splice(0, e);
          null !== a.destination && dd(a, a.destination);
        } catch (E) {
          Y(a, E), Tc(a, E);
        } finally {
          Lc = d, Nc.current = c, c === Mc && nc(b);
        }
      }
    }
    function ed(a, b, c) {
      c.parentFlushed = true;
      switch (c.status) {
        case 0:
          var d = c.id = a.nextSegmentId++;
          c.lastPushedText = false;
          c.textEmbedded = false;
          a = a.responseState;
          r(b, Sa);
          r(b, a.placeholderPrefix);
          a = d.toString(16);
          r(b, a);
          return w(b, Ta);
        case 1:
          c.status = 2;
          var f = true;
          d = c.chunks;
          var e = 0;
          c = c.children;
          for (var g = 0; g < c.length; g++) {
            for (f = c[g]; e < f.index; e++) r(b, d[e]);
            f = fd(a, b, f);
          }
          for (; e < d.length - 1; e++) r(b, d[e]);
          e < d.length && (f = w(b, d[e]));
          return f;
        default:
          throw Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
      }
    }
    function fd(a, b, c) {
      var d = c.boundary;
      if (null === d) return ed(a, b, c);
      d.parentFlushed = true;
      if (d.forceClientRender) d = d.errorDigest, w(b, Xa), r(b, Za), d && (r(b, ab), r(b, F(d)), r(b, $a)), w(b, bb), ed(a, b, c);
      else if (0 < d.pendingTasks) {
        d.rootSegmentID = a.nextSegmentId++;
        0 < d.completedSegments.length && a.partialBoundaries.push(d);
        var f = a.responseState;
        var e = f.nextSuspenseID++;
        f = x(f.boundaryPrefix + e.toString(16));
        d = d.id = f;
        cb(b, a.responseState, d);
        ed(a, b, c);
      } else if (d.byteSize > a.progressiveChunkSize) d.rootSegmentID = a.nextSegmentId++, a.completedBoundaries.push(d), cb(b, a.responseState, d.id), ed(a, b, c);
      else {
        w(b, Ua);
        c = d.completedSegments;
        if (1 !== c.length) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
        fd(a, b, c[0]);
      }
      return w(b, Ya);
    }
    function gd(a, b, c) {
      yb(b, a.responseState, c.formatContext, c.id);
      fd(a, b, c);
      return zb(b, c.formatContext);
    }
    function hd(a, b, c) {
      for (var d = c.completedSegments, f = 0; f < d.length; f++) id(a, b, c, d[f]);
      d.length = 0;
      a = a.responseState;
      d = c.id;
      c = c.rootSegmentID;
      r(b, a.startInlineScript);
      a.sentCompleteBoundaryFunction ? r(b, Gb) : (a.sentCompleteBoundaryFunction = true, r(b, Fb));
      if (null === d) throw Error("An ID must have been assigned before we can complete the boundary.");
      c = c.toString(16);
      r(b, d);
      r(b, Hb);
      r(b, a.segmentPrefix);
      r(b, c);
      return w(b, Ib);
    }
    function id(a, b, c, d) {
      if (2 === d.status) return true;
      var f = d.id;
      if (-1 === f) {
        if (-1 === (d.id = c.rootSegmentID)) throw Error("A root segment ID must have been assigned by now. This is a bug in React.");
        return gd(a, b, d);
      }
      gd(a, b, d);
      a = a.responseState;
      r(b, a.startInlineScript);
      a.sentCompleteSegmentFunction ? r(b, Bb) : (a.sentCompleteSegmentFunction = true, r(b, Ab));
      r(b, a.segmentPrefix);
      f = f.toString(16);
      r(b, f);
      r(b, Cb);
      r(b, a.placeholderPrefix);
      r(b, f);
      return w(b, Db);
    }
    function dd(a, b) {
      k = new Uint8Array(2048);
      l = 0;
      q = true;
      try {
        var c = a.completedRootSegment;
        if (null !== c && 0 === a.pendingRootTasks) {
          fd(a, b, c);
          a.completedRootSegment = null;
          var d = a.responseState.bootstrapChunks;
          for (c = 0; c < d.length - 1; c++) r(b, d[c]);
          c < d.length && w(b, d[c]);
        }
        var f = a.clientRenderedBoundaries, e;
        for (e = 0; e < f.length; e++) {
          var g = f[e];
          d = b;
          var h = a.responseState, m = g.id, n = g.errorDigest, p = g.errorMessage, v = g.errorComponentStack;
          r(d, h.startInlineScript);
          h.sentClientRenderFunction ? r(d, Kb) : (h.sentClientRenderFunction = true, r(d, Jb));
          if (null === m) throw Error("An ID must have been assigned before we can complete the boundary.");
          r(d, m);
          r(d, Lb);
          if (n || p || v) r(d, Nb), r(d, Pb(n || ""));
          if (p || v) r(d, Nb), r(d, Pb(p || ""));
          v && (r(d, Nb), r(d, Pb(v)));
          if (!w(d, Mb)) {
            a.destination = null;
            e++;
            f.splice(0, e);
            return;
          }
        }
        f.splice(0, e);
        var C = a.completedBoundaries;
        for (e = 0; e < C.length; e++) if (!hd(a, b, C[e])) {
          a.destination = null;
          e++;
          C.splice(0, e);
          return;
        }
        C.splice(0, e);
        ca(b);
        k = new Uint8Array(2048);
        l = 0;
        q = true;
        var D = a.partialBoundaries;
        for (e = 0; e < D.length; e++) {
          var E = D[e];
          a: {
            f = a;
            g = b;
            var na = E.completedSegments;
            for (h = 0; h < na.length; h++) if (!id(f, g, E, na[h])) {
              h++;
              na.splice(0, h);
              var Eb = false;
              break a;
            }
            na.splice(0, h);
            Eb = true;
          }
          if (!Eb) {
            a.destination = null;
            e++;
            D.splice(0, e);
            return;
          }
        }
        D.splice(0, e);
        var oa = a.completedBoundaries;
        for (e = 0; e < oa.length; e++) if (!hd(a, b, oa[e])) {
          a.destination = null;
          e++;
          oa.splice(0, e);
          return;
        }
        oa.splice(0, e);
      } finally {
        ca(b), "function" === typeof b.flush && b.flush(), 0 === a.allPendingTasks && 0 === a.pingedTasks.length && 0 === a.clientRenderedBoundaries.length && 0 === a.completedBoundaries.length && b.end();
      }
    }
    function jd(a) {
      setImmediate(function() {
        return Qc(a);
      });
    }
    function kd(a, b) {
      if (1 === a.status) a.status = 2, b.destroy(a.fatalError);
      else if (2 !== a.status && null === a.destination) {
        a.destination = b;
        try {
          dd(a, b);
        } catch (c) {
          Y(a, c), Tc(a, c);
        }
      }
    }
    function ld(a, b) {
      try {
        var c = a.abortableTasks;
        c.forEach(function(c2) {
          return cd(c2, a, b);
        });
        c.clear();
        null !== a.destination && dd(a, a.destination);
      } catch (d) {
        Y(a, d), Tc(a, d);
      }
    }
    function md(a, b) {
      return function() {
        return kd(b, a);
      };
    }
    function nd(a, b) {
      return function() {
        return ld(a, b);
      };
    }
    function od(a, b) {
      var c = b ? b.identifierPrefix : void 0, d = b ? b.nonce : void 0, f = b ? b.bootstrapScriptContent : void 0, e = b ? b.bootstrapScripts : void 0;
      var g = b ? b.bootstrapModules : void 0;
      c = void 0 === c ? "" : c;
      d = void 0 === d ? ra : x('<script nonce="' + F(d) + '">');
      var h = [];
      void 0 !== f && h.push(d, ("" + f).replace(wa, xa), sa);
      if (void 0 !== e) for (f = 0; f < e.length; f++) h.push(ta, F(e[f]), va);
      if (void 0 !== g) for (e = 0; e < g.length; e++) h.push(ua, F(g[e]), va);
      g = {
        bootstrapChunks: h,
        startInlineScript: d,
        placeholderPrefix: x(c + "P:"),
        segmentPrefix: x(c + "S:"),
        boundaryPrefix: c + "B:",
        idPrefix: c,
        nextSuspenseID: 0,
        sentCompleteSegmentFunction: false,
        sentCompleteBoundaryFunction: false,
        sentClientRenderFunction: false
      };
      e = b ? b.namespaceURI : void 0;
      e = G("http://www.w3.org/2000/svg" === e ? 2 : "http://www.w3.org/1998/Math/MathML" === e ? 3 : 0, null);
      f = b ? b.progressiveChunkSize : void 0;
      d = b ? b.onError : void 0;
      h = b ? b.onAllReady : void 0;
      var m = b ? b.onShellReady : void 0, n = b ? b.onShellError : void 0;
      b = [];
      c = /* @__PURE__ */ new Set();
      g = {
        destination: null,
        responseState: g,
        progressiveChunkSize: void 0 === f ? 12800 : f,
        status: 0,
        fatalError: null,
        nextSegmentId: 0,
        allPendingTasks: 0,
        pendingRootTasks: 0,
        completedRootSegment: null,
        abortableTasks: c,
        pingedTasks: b,
        clientRenderedBoundaries: [],
        completedBoundaries: [],
        partialBoundaries: [],
        onError: void 0 === d ? Oc : d,
        onAllReady: void 0 === h ? X : h,
        onShellReady: void 0 === m ? X : m,
        onShellError: void 0 === n ? X : n,
        onFatalError: X
      };
      e = Sc(g, 0, null, e, false, false);
      e.parentFlushed = true;
      a = Rc(g, a, null, e, c, hc, null, qc);
      b.push(a);
      return g;
    }
    exports2.renderToPipeableStream = function(a, b) {
      var c = od(a, b), d = false;
      jd(c);
      return { pipe: function(a2) {
        if (d) throw Error("React currently only supports piping to one writable stream.");
        d = true;
        kd(c, a2);
        a2.on("drain", md(a2, c));
        a2.on("error", nd(c, Error("The destination stream errored while writing data.")));
        a2.on("close", nd(c, Error("The destination stream closed early.")));
        return a2;
      }, abort: function(a2) {
        ld(c, a2);
      } };
    };
    exports2.version = "18.3.1";
  }
});

// ../node_modules/react-dom/cjs/react-dom-server-legacy.node.development.js
var require_react_dom_server_legacy_node_development = __commonJS({
  "../node_modules/react-dom/cjs/react-dom-server-legacy.node.development.js"(exports2) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var React9 = require_react();
        var stream = require("stream");
        var ReactVersion = "18.3.1";
        var ReactSharedInternals = React9.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function warn(format) {
          {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
        }
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        function scheduleWork(callback) {
          callback();
        }
        function beginWriting(destination) {
        }
        function writeChunk(destination, chunk) {
          writeChunkAndReturn(destination, chunk);
        }
        function writeChunkAndReturn(destination, chunk) {
          return destination.push(chunk);
        }
        function completeWriting(destination) {
        }
        function close(destination) {
          destination.push(null);
        }
        function stringToChunk(content) {
          return content;
        }
        function stringToPrecomputedChunk(content) {
          return content;
        }
        function closeWithError(destination, error2) {
          destination.destroy(error2);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkAttributeStringCoercion(value, attributeName) {
          {
            if (willCoercionThrow(value)) {
              error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", attributeName, typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        function checkCSSPropertyStringCoercion(value, propName) {
          {
            if (willCoercionThrow(value)) {
              error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", propName, typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        function checkHtmlStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED = 0;
        var STRING = 1;
        var BOOLEANISH_STRING = 2;
        var BOOLEAN = 3;
        var OVERLOADED_BOOLEAN = 4;
        var NUMERIC = 5;
        var POSITIVE_NUMERIC = 6;
        var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
        var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
        var VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$");
        var illegalAttributeNameCache = {};
        var validatedAttributeNameCache = {};
        function isAttributeNameSafe(attributeName) {
          if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
            return true;
          }
          if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
            return false;
          }
          if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
            validatedAttributeNameCache[attributeName] = true;
            return true;
          }
          illegalAttributeNameCache[attributeName] = true;
          {
            error("Invalid attribute name: `%s`", attributeName);
          }
          return false;
        }
        function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
          if (propertyInfo !== null && propertyInfo.type === RESERVED) {
            return false;
          }
          switch (typeof value) {
            case "function":
            // $FlowIssue symbol is perfectly valid here
            case "symbol":
              return true;
            case "boolean": {
              if (isCustomComponentTag) {
                return false;
              }
              if (propertyInfo !== null) {
                return !propertyInfo.acceptsBooleans;
              } else {
                var prefix2 = name.toLowerCase().slice(0, 5);
                return prefix2 !== "data-" && prefix2 !== "aria-";
              }
            }
            default:
              return false;
          }
        }
        function getPropertyInfo(name) {
          return properties.hasOwnProperty(name) ? properties[name] : null;
        }
        function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
          this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
          this.attributeName = attributeName;
          this.attributeNamespace = attributeNamespace;
          this.mustUseProperty = mustUseProperty;
          this.propertyName = name;
          this.type = type;
          this.sanitizeURL = sanitizeURL2;
          this.removeEmptyString = removeEmptyString;
        }
        var properties = {};
        var reservedProps = [
          "children",
          "dangerouslySetInnerHTML",
          // TODO: This prevents the assignment of defaultValue to regular
          // elements (not just inputs). Now that ReactDOMInput assigns to the
          // defaultValue property -- do we need this?
          "defaultValue",
          "defaultChecked",
          "innerHTML",
          "suppressContentEditableWarning",
          "suppressHydrationWarning",
          "style"
        ];
        reservedProps.forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            RESERVED,
            false,
            // mustUseProperty
            name,
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
          var name = _ref[0], attributeName = _ref[1];
          properties[name] = new PropertyInfoRecord(
            name,
            STRING,
            false,
            // mustUseProperty
            attributeName,
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            BOOLEANISH_STRING,
            false,
            // mustUseProperty
            name.toLowerCase(),
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            BOOLEANISH_STRING,
            false,
            // mustUseProperty
            name,
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        [
          "allowFullScreen",
          "async",
          // Note: there is a special case that prevents it from being written to the DOM
          // on the client side because the browsers are inconsistent. Instead we call focus().
          "autoFocus",
          "autoPlay",
          "controls",
          "default",
          "defer",
          "disabled",
          "disablePictureInPicture",
          "disableRemotePlayback",
          "formNoValidate",
          "hidden",
          "loop",
          "noModule",
          "noValidate",
          "open",
          "playsInline",
          "readOnly",
          "required",
          "reversed",
          "scoped",
          "seamless",
          // Microdata
          "itemScope"
        ].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            BOOLEAN,
            false,
            // mustUseProperty
            name.toLowerCase(),
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        [
          "checked",
          // Note: `option.selected` is not updated if `select.multiple` is
          // disabled with `removeAttribute`. We have special logic for handling this.
          "multiple",
          "muted",
          "selected"
          // NOTE: if you add a camelCased prop to this list,
          // you'll need to set attributeName to name.toLowerCase()
          // instead in the assignment below.
        ].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            BOOLEAN,
            true,
            // mustUseProperty
            name,
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        [
          "capture",
          "download"
          // NOTE: if you add a camelCased prop to this list,
          // you'll need to set attributeName to name.toLowerCase()
          // instead in the assignment below.
        ].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            OVERLOADED_BOOLEAN,
            false,
            // mustUseProperty
            name,
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        [
          "cols",
          "rows",
          "size",
          "span"
          // NOTE: if you add a camelCased prop to this list,
          // you'll need to set attributeName to name.toLowerCase()
          // instead in the assignment below.
        ].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            POSITIVE_NUMERIC,
            false,
            // mustUseProperty
            name,
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        ["rowSpan", "start"].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            NUMERIC,
            false,
            // mustUseProperty
            name.toLowerCase(),
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        var CAMELIZE = /[\-\:]([a-z])/g;
        var capitalize = function(token) {
          return token[1].toUpperCase();
        };
        [
          "accent-height",
          "alignment-baseline",
          "arabic-form",
          "baseline-shift",
          "cap-height",
          "clip-path",
          "clip-rule",
          "color-interpolation",
          "color-interpolation-filters",
          "color-profile",
          "color-rendering",
          "dominant-baseline",
          "enable-background",
          "fill-opacity",
          "fill-rule",
          "flood-color",
          "flood-opacity",
          "font-family",
          "font-size",
          "font-size-adjust",
          "font-stretch",
          "font-style",
          "font-variant",
          "font-weight",
          "glyph-name",
          "glyph-orientation-horizontal",
          "glyph-orientation-vertical",
          "horiz-adv-x",
          "horiz-origin-x",
          "image-rendering",
          "letter-spacing",
          "lighting-color",
          "marker-end",
          "marker-mid",
          "marker-start",
          "overline-position",
          "overline-thickness",
          "paint-order",
          "panose-1",
          "pointer-events",
          "rendering-intent",
          "shape-rendering",
          "stop-color",
          "stop-opacity",
          "strikethrough-position",
          "strikethrough-thickness",
          "stroke-dasharray",
          "stroke-dashoffset",
          "stroke-linecap",
          "stroke-linejoin",
          "stroke-miterlimit",
          "stroke-opacity",
          "stroke-width",
          "text-anchor",
          "text-decoration",
          "text-rendering",
          "underline-position",
          "underline-thickness",
          "unicode-bidi",
          "unicode-range",
          "units-per-em",
          "v-alphabetic",
          "v-hanging",
          "v-ideographic",
          "v-mathematical",
          "vector-effect",
          "vert-adv-y",
          "vert-origin-x",
          "vert-origin-y",
          "word-spacing",
          "writing-mode",
          "xmlns:xlink",
          "x-height"
          // NOTE: if you add a camelCased prop to this list,
          // you'll need to set attributeName to name.toLowerCase()
          // instead in the assignment below.
        ].forEach(function(attributeName) {
          var name = attributeName.replace(CAMELIZE, capitalize);
          properties[name] = new PropertyInfoRecord(
            name,
            STRING,
            false,
            // mustUseProperty
            attributeName,
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        [
          "xlink:actuate",
          "xlink:arcrole",
          "xlink:role",
          "xlink:show",
          "xlink:title",
          "xlink:type"
          // NOTE: if you add a camelCased prop to this list,
          // you'll need to set attributeName to name.toLowerCase()
          // instead in the assignment below.
        ].forEach(function(attributeName) {
          var name = attributeName.replace(CAMELIZE, capitalize);
          properties[name] = new PropertyInfoRecord(
            name,
            STRING,
            false,
            // mustUseProperty
            attributeName,
            "http://www.w3.org/1999/xlink",
            false,
            // sanitizeURL
            false
          );
        });
        [
          "xml:base",
          "xml:lang",
          "xml:space"
          // NOTE: if you add a camelCased prop to this list,
          // you'll need to set attributeName to name.toLowerCase()
          // instead in the assignment below.
        ].forEach(function(attributeName) {
          var name = attributeName.replace(CAMELIZE, capitalize);
          properties[name] = new PropertyInfoRecord(
            name,
            STRING,
            false,
            // mustUseProperty
            attributeName,
            "http://www.w3.org/XML/1998/namespace",
            false,
            // sanitizeURL
            false
          );
        });
        ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
          properties[attributeName] = new PropertyInfoRecord(
            attributeName,
            STRING,
            false,
            // mustUseProperty
            attributeName.toLowerCase(),
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        var xlinkHref = "xlinkHref";
        properties[xlinkHref] = new PropertyInfoRecord(
          "xlinkHref",
          STRING,
          false,
          // mustUseProperty
          "xlink:href",
          "http://www.w3.org/1999/xlink",
          true,
          // sanitizeURL
          false
        );
        ["src", "href", "action", "formAction"].forEach(function(attributeName) {
          properties[attributeName] = new PropertyInfoRecord(
            attributeName,
            STRING,
            false,
            // mustUseProperty
            attributeName.toLowerCase(),
            // attributeName
            null,
            // attributeNamespace
            true,
            // sanitizeURL
            true
          );
        });
        var isUnitlessNumber = {
          animationIterationCount: true,
          aspectRatio: true,
          borderImageOutset: true,
          borderImageSlice: true,
          borderImageWidth: true,
          boxFlex: true,
          boxFlexGroup: true,
          boxOrdinalGroup: true,
          columnCount: true,
          columns: true,
          flex: true,
          flexGrow: true,
          flexPositive: true,
          flexShrink: true,
          flexNegative: true,
          flexOrder: true,
          gridArea: true,
          gridRow: true,
          gridRowEnd: true,
          gridRowSpan: true,
          gridRowStart: true,
          gridColumn: true,
          gridColumnEnd: true,
          gridColumnSpan: true,
          gridColumnStart: true,
          fontWeight: true,
          lineClamp: true,
          lineHeight: true,
          opacity: true,
          order: true,
          orphans: true,
          tabSize: true,
          widows: true,
          zIndex: true,
          zoom: true,
          // SVG-related properties
          fillOpacity: true,
          floodOpacity: true,
          stopOpacity: true,
          strokeDasharray: true,
          strokeDashoffset: true,
          strokeMiterlimit: true,
          strokeOpacity: true,
          strokeWidth: true
        };
        function prefixKey(prefix2, key) {
          return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
        }
        var prefixes = ["Webkit", "ms", "Moz", "O"];
        Object.keys(isUnitlessNumber).forEach(function(prop) {
          prefixes.forEach(function(prefix2) {
            isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
          });
        });
        var hasReadOnlyValue = {
          button: true,
          checkbox: true,
          image: true,
          hidden: true,
          radio: true,
          reset: true,
          submit: true
        };
        function checkControlledValueProps(tagName, props) {
          {
            if (!(hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null)) {
              error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
            }
            if (!(props.onChange || props.readOnly || props.disabled || props.checked == null)) {
              error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
            }
          }
        }
        function isCustomComponent(tagName, props) {
          if (tagName.indexOf("-") === -1) {
            return typeof props.is === "string";
          }
          switch (tagName) {
            // These are reserved SVG and MathML elements.
            // We don't mind this list too much because we expect it to never grow.
            // The alternative is to track the namespace in a few places which is convoluted.
            // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
              return false;
            default:
              return true;
          }
        }
        var ariaProperties = {
          "aria-current": 0,
          // state
          "aria-description": 0,
          "aria-details": 0,
          "aria-disabled": 0,
          // state
          "aria-hidden": 0,
          // state
          "aria-invalid": 0,
          // state
          "aria-keyshortcuts": 0,
          "aria-label": 0,
          "aria-roledescription": 0,
          // Widget Attributes
          "aria-autocomplete": 0,
          "aria-checked": 0,
          "aria-expanded": 0,
          "aria-haspopup": 0,
          "aria-level": 0,
          "aria-modal": 0,
          "aria-multiline": 0,
          "aria-multiselectable": 0,
          "aria-orientation": 0,
          "aria-placeholder": 0,
          "aria-pressed": 0,
          "aria-readonly": 0,
          "aria-required": 0,
          "aria-selected": 0,
          "aria-sort": 0,
          "aria-valuemax": 0,
          "aria-valuemin": 0,
          "aria-valuenow": 0,
          "aria-valuetext": 0,
          // Live Region Attributes
          "aria-atomic": 0,
          "aria-busy": 0,
          "aria-live": 0,
          "aria-relevant": 0,
          // Drag-and-Drop Attributes
          "aria-dropeffect": 0,
          "aria-grabbed": 0,
          // Relationship Attributes
          "aria-activedescendant": 0,
          "aria-colcount": 0,
          "aria-colindex": 0,
          "aria-colspan": 0,
          "aria-controls": 0,
          "aria-describedby": 0,
          "aria-errormessage": 0,
          "aria-flowto": 0,
          "aria-labelledby": 0,
          "aria-owns": 0,
          "aria-posinset": 0,
          "aria-rowcount": 0,
          "aria-rowindex": 0,
          "aria-rowspan": 0,
          "aria-setsize": 0
        };
        var warnedProperties = {};
        var rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
        var rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
        function validateProperty(tagName, name) {
          {
            if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
              return true;
            }
            if (rARIACamel.test(name)) {
              var ariaName = "aria-" + name.slice(4).toLowerCase();
              var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
              if (correctName == null) {
                error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name);
                warnedProperties[name] = true;
                return true;
              }
              if (name !== correctName) {
                error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName);
                warnedProperties[name] = true;
                return true;
              }
            }
            if (rARIA.test(name)) {
              var lowerCasedName = name.toLowerCase();
              var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
              if (standardName == null) {
                warnedProperties[name] = true;
                return false;
              }
              if (name !== standardName) {
                error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName);
                warnedProperties[name] = true;
                return true;
              }
            }
          }
          return true;
        }
        function warnInvalidARIAProps(type, props) {
          {
            var invalidProps = [];
            for (var key in props) {
              var isValid = validateProperty(type, key);
              if (!isValid) {
                invalidProps.push(key);
              }
            }
            var unknownPropString = invalidProps.map(function(prop) {
              return "`" + prop + "`";
            }).join(", ");
            if (invalidProps.length === 1) {
              error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
            } else if (invalidProps.length > 1) {
              error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
            }
          }
        }
        function validateProperties(type, props) {
          if (isCustomComponent(type, props)) {
            return;
          }
          warnInvalidARIAProps(type, props);
        }
        var didWarnValueNull = false;
        function validateProperties$1(type, props) {
          {
            if (type !== "input" && type !== "textarea" && type !== "select") {
              return;
            }
            if (props != null && props.value === null && !didWarnValueNull) {
              didWarnValueNull = true;
              if (type === "select" && props.multiple) {
                error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type);
              } else {
                error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type);
              }
            }
          }
        }
        var possibleStandardNames = {
          // HTML
          accept: "accept",
          acceptcharset: "acceptCharset",
          "accept-charset": "acceptCharset",
          accesskey: "accessKey",
          action: "action",
          allowfullscreen: "allowFullScreen",
          alt: "alt",
          as: "as",
          async: "async",
          autocapitalize: "autoCapitalize",
          autocomplete: "autoComplete",
          autocorrect: "autoCorrect",
          autofocus: "autoFocus",
          autoplay: "autoPlay",
          autosave: "autoSave",
          capture: "capture",
          cellpadding: "cellPadding",
          cellspacing: "cellSpacing",
          challenge: "challenge",
          charset: "charSet",
          checked: "checked",
          children: "children",
          cite: "cite",
          class: "className",
          classid: "classID",
          classname: "className",
          cols: "cols",
          colspan: "colSpan",
          content: "content",
          contenteditable: "contentEditable",
          contextmenu: "contextMenu",
          controls: "controls",
          controlslist: "controlsList",
          coords: "coords",
          crossorigin: "crossOrigin",
          dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
          data: "data",
          datetime: "dateTime",
          default: "default",
          defaultchecked: "defaultChecked",
          defaultvalue: "defaultValue",
          defer: "defer",
          dir: "dir",
          disabled: "disabled",
          disablepictureinpicture: "disablePictureInPicture",
          disableremoteplayback: "disableRemotePlayback",
          download: "download",
          draggable: "draggable",
          enctype: "encType",
          enterkeyhint: "enterKeyHint",
          for: "htmlFor",
          form: "form",
          formmethod: "formMethod",
          formaction: "formAction",
          formenctype: "formEncType",
          formnovalidate: "formNoValidate",
          formtarget: "formTarget",
          frameborder: "frameBorder",
          headers: "headers",
          height: "height",
          hidden: "hidden",
          high: "high",
          href: "href",
          hreflang: "hrefLang",
          htmlfor: "htmlFor",
          httpequiv: "httpEquiv",
          "http-equiv": "httpEquiv",
          icon: "icon",
          id: "id",
          imagesizes: "imageSizes",
          imagesrcset: "imageSrcSet",
          innerhtml: "innerHTML",
          inputmode: "inputMode",
          integrity: "integrity",
          is: "is",
          itemid: "itemID",
          itemprop: "itemProp",
          itemref: "itemRef",
          itemscope: "itemScope",
          itemtype: "itemType",
          keyparams: "keyParams",
          keytype: "keyType",
          kind: "kind",
          label: "label",
          lang: "lang",
          list: "list",
          loop: "loop",
          low: "low",
          manifest: "manifest",
          marginwidth: "marginWidth",
          marginheight: "marginHeight",
          max: "max",
          maxlength: "maxLength",
          media: "media",
          mediagroup: "mediaGroup",
          method: "method",
          min: "min",
          minlength: "minLength",
          multiple: "multiple",
          muted: "muted",
          name: "name",
          nomodule: "noModule",
          nonce: "nonce",
          novalidate: "noValidate",
          open: "open",
          optimum: "optimum",
          pattern: "pattern",
          placeholder: "placeholder",
          playsinline: "playsInline",
          poster: "poster",
          preload: "preload",
          profile: "profile",
          radiogroup: "radioGroup",
          readonly: "readOnly",
          referrerpolicy: "referrerPolicy",
          rel: "rel",
          required: "required",
          reversed: "reversed",
          role: "role",
          rows: "rows",
          rowspan: "rowSpan",
          sandbox: "sandbox",
          scope: "scope",
          scoped: "scoped",
          scrolling: "scrolling",
          seamless: "seamless",
          selected: "selected",
          shape: "shape",
          size: "size",
          sizes: "sizes",
          span: "span",
          spellcheck: "spellCheck",
          src: "src",
          srcdoc: "srcDoc",
          srclang: "srcLang",
          srcset: "srcSet",
          start: "start",
          step: "step",
          style: "style",
          summary: "summary",
          tabindex: "tabIndex",
          target: "target",
          title: "title",
          type: "type",
          usemap: "useMap",
          value: "value",
          width: "width",
          wmode: "wmode",
          wrap: "wrap",
          // SVG
          about: "about",
          accentheight: "accentHeight",
          "accent-height": "accentHeight",
          accumulate: "accumulate",
          additive: "additive",
          alignmentbaseline: "alignmentBaseline",
          "alignment-baseline": "alignmentBaseline",
          allowreorder: "allowReorder",
          alphabetic: "alphabetic",
          amplitude: "amplitude",
          arabicform: "arabicForm",
          "arabic-form": "arabicForm",
          ascent: "ascent",
          attributename: "attributeName",
          attributetype: "attributeType",
          autoreverse: "autoReverse",
          azimuth: "azimuth",
          basefrequency: "baseFrequency",
          baselineshift: "baselineShift",
          "baseline-shift": "baselineShift",
          baseprofile: "baseProfile",
          bbox: "bbox",
          begin: "begin",
          bias: "bias",
          by: "by",
          calcmode: "calcMode",
          capheight: "capHeight",
          "cap-height": "capHeight",
          clip: "clip",
          clippath: "clipPath",
          "clip-path": "clipPath",
          clippathunits: "clipPathUnits",
          cliprule: "clipRule",
          "clip-rule": "clipRule",
          color: "color",
          colorinterpolation: "colorInterpolation",
          "color-interpolation": "colorInterpolation",
          colorinterpolationfilters: "colorInterpolationFilters",
          "color-interpolation-filters": "colorInterpolationFilters",
          colorprofile: "colorProfile",
          "color-profile": "colorProfile",
          colorrendering: "colorRendering",
          "color-rendering": "colorRendering",
          contentscripttype: "contentScriptType",
          contentstyletype: "contentStyleType",
          cursor: "cursor",
          cx: "cx",
          cy: "cy",
          d: "d",
          datatype: "datatype",
          decelerate: "decelerate",
          descent: "descent",
          diffuseconstant: "diffuseConstant",
          direction: "direction",
          display: "display",
          divisor: "divisor",
          dominantbaseline: "dominantBaseline",
          "dominant-baseline": "dominantBaseline",
          dur: "dur",
          dx: "dx",
          dy: "dy",
          edgemode: "edgeMode",
          elevation: "elevation",
          enablebackground: "enableBackground",
          "enable-background": "enableBackground",
          end: "end",
          exponent: "exponent",
          externalresourcesrequired: "externalResourcesRequired",
          fill: "fill",
          fillopacity: "fillOpacity",
          "fill-opacity": "fillOpacity",
          fillrule: "fillRule",
          "fill-rule": "fillRule",
          filter: "filter",
          filterres: "filterRes",
          filterunits: "filterUnits",
          floodopacity: "floodOpacity",
          "flood-opacity": "floodOpacity",
          floodcolor: "floodColor",
          "flood-color": "floodColor",
          focusable: "focusable",
          fontfamily: "fontFamily",
          "font-family": "fontFamily",
          fontsize: "fontSize",
          "font-size": "fontSize",
          fontsizeadjust: "fontSizeAdjust",
          "font-size-adjust": "fontSizeAdjust",
          fontstretch: "fontStretch",
          "font-stretch": "fontStretch",
          fontstyle: "fontStyle",
          "font-style": "fontStyle",
          fontvariant: "fontVariant",
          "font-variant": "fontVariant",
          fontweight: "fontWeight",
          "font-weight": "fontWeight",
          format: "format",
          from: "from",
          fx: "fx",
          fy: "fy",
          g1: "g1",
          g2: "g2",
          glyphname: "glyphName",
          "glyph-name": "glyphName",
          glyphorientationhorizontal: "glyphOrientationHorizontal",
          "glyph-orientation-horizontal": "glyphOrientationHorizontal",
          glyphorientationvertical: "glyphOrientationVertical",
          "glyph-orientation-vertical": "glyphOrientationVertical",
          glyphref: "glyphRef",
          gradienttransform: "gradientTransform",
          gradientunits: "gradientUnits",
          hanging: "hanging",
          horizadvx: "horizAdvX",
          "horiz-adv-x": "horizAdvX",
          horizoriginx: "horizOriginX",
          "horiz-origin-x": "horizOriginX",
          ideographic: "ideographic",
          imagerendering: "imageRendering",
          "image-rendering": "imageRendering",
          in2: "in2",
          in: "in",
          inlist: "inlist",
          intercept: "intercept",
          k1: "k1",
          k2: "k2",
          k3: "k3",
          k4: "k4",
          k: "k",
          kernelmatrix: "kernelMatrix",
          kernelunitlength: "kernelUnitLength",
          kerning: "kerning",
          keypoints: "keyPoints",
          keysplines: "keySplines",
          keytimes: "keyTimes",
          lengthadjust: "lengthAdjust",
          letterspacing: "letterSpacing",
          "letter-spacing": "letterSpacing",
          lightingcolor: "lightingColor",
          "lighting-color": "lightingColor",
          limitingconeangle: "limitingConeAngle",
          local: "local",
          markerend: "markerEnd",
          "marker-end": "markerEnd",
          markerheight: "markerHeight",
          markermid: "markerMid",
          "marker-mid": "markerMid",
          markerstart: "markerStart",
          "marker-start": "markerStart",
          markerunits: "markerUnits",
          markerwidth: "markerWidth",
          mask: "mask",
          maskcontentunits: "maskContentUnits",
          maskunits: "maskUnits",
          mathematical: "mathematical",
          mode: "mode",
          numoctaves: "numOctaves",
          offset: "offset",
          opacity: "opacity",
          operator: "operator",
          order: "order",
          orient: "orient",
          orientation: "orientation",
          origin: "origin",
          overflow: "overflow",
          overlineposition: "overlinePosition",
          "overline-position": "overlinePosition",
          overlinethickness: "overlineThickness",
          "overline-thickness": "overlineThickness",
          paintorder: "paintOrder",
          "paint-order": "paintOrder",
          panose1: "panose1",
          "panose-1": "panose1",
          pathlength: "pathLength",
          patterncontentunits: "patternContentUnits",
          patterntransform: "patternTransform",
          patternunits: "patternUnits",
          pointerevents: "pointerEvents",
          "pointer-events": "pointerEvents",
          points: "points",
          pointsatx: "pointsAtX",
          pointsaty: "pointsAtY",
          pointsatz: "pointsAtZ",
          prefix: "prefix",
          preservealpha: "preserveAlpha",
          preserveaspectratio: "preserveAspectRatio",
          primitiveunits: "primitiveUnits",
          property: "property",
          r: "r",
          radius: "radius",
          refx: "refX",
          refy: "refY",
          renderingintent: "renderingIntent",
          "rendering-intent": "renderingIntent",
          repeatcount: "repeatCount",
          repeatdur: "repeatDur",
          requiredextensions: "requiredExtensions",
          requiredfeatures: "requiredFeatures",
          resource: "resource",
          restart: "restart",
          result: "result",
          results: "results",
          rotate: "rotate",
          rx: "rx",
          ry: "ry",
          scale: "scale",
          security: "security",
          seed: "seed",
          shaperendering: "shapeRendering",
          "shape-rendering": "shapeRendering",
          slope: "slope",
          spacing: "spacing",
          specularconstant: "specularConstant",
          specularexponent: "specularExponent",
          speed: "speed",
          spreadmethod: "spreadMethod",
          startoffset: "startOffset",
          stddeviation: "stdDeviation",
          stemh: "stemh",
          stemv: "stemv",
          stitchtiles: "stitchTiles",
          stopcolor: "stopColor",
          "stop-color": "stopColor",
          stopopacity: "stopOpacity",
          "stop-opacity": "stopOpacity",
          strikethroughposition: "strikethroughPosition",
          "strikethrough-position": "strikethroughPosition",
          strikethroughthickness: "strikethroughThickness",
          "strikethrough-thickness": "strikethroughThickness",
          string: "string",
          stroke: "stroke",
          strokedasharray: "strokeDasharray",
          "stroke-dasharray": "strokeDasharray",
          strokedashoffset: "strokeDashoffset",
          "stroke-dashoffset": "strokeDashoffset",
          strokelinecap: "strokeLinecap",
          "stroke-linecap": "strokeLinecap",
          strokelinejoin: "strokeLinejoin",
          "stroke-linejoin": "strokeLinejoin",
          strokemiterlimit: "strokeMiterlimit",
          "stroke-miterlimit": "strokeMiterlimit",
          strokewidth: "strokeWidth",
          "stroke-width": "strokeWidth",
          strokeopacity: "strokeOpacity",
          "stroke-opacity": "strokeOpacity",
          suppresscontenteditablewarning: "suppressContentEditableWarning",
          suppresshydrationwarning: "suppressHydrationWarning",
          surfacescale: "surfaceScale",
          systemlanguage: "systemLanguage",
          tablevalues: "tableValues",
          targetx: "targetX",
          targety: "targetY",
          textanchor: "textAnchor",
          "text-anchor": "textAnchor",
          textdecoration: "textDecoration",
          "text-decoration": "textDecoration",
          textlength: "textLength",
          textrendering: "textRendering",
          "text-rendering": "textRendering",
          to: "to",
          transform: "transform",
          typeof: "typeof",
          u1: "u1",
          u2: "u2",
          underlineposition: "underlinePosition",
          "underline-position": "underlinePosition",
          underlinethickness: "underlineThickness",
          "underline-thickness": "underlineThickness",
          unicode: "unicode",
          unicodebidi: "unicodeBidi",
          "unicode-bidi": "unicodeBidi",
          unicoderange: "unicodeRange",
          "unicode-range": "unicodeRange",
          unitsperem: "unitsPerEm",
          "units-per-em": "unitsPerEm",
          unselectable: "unselectable",
          valphabetic: "vAlphabetic",
          "v-alphabetic": "vAlphabetic",
          values: "values",
          vectoreffect: "vectorEffect",
          "vector-effect": "vectorEffect",
          version: "version",
          vertadvy: "vertAdvY",
          "vert-adv-y": "vertAdvY",
          vertoriginx: "vertOriginX",
          "vert-origin-x": "vertOriginX",
          vertoriginy: "vertOriginY",
          "vert-origin-y": "vertOriginY",
          vhanging: "vHanging",
          "v-hanging": "vHanging",
          videographic: "vIdeographic",
          "v-ideographic": "vIdeographic",
          viewbox: "viewBox",
          viewtarget: "viewTarget",
          visibility: "visibility",
          vmathematical: "vMathematical",
          "v-mathematical": "vMathematical",
          vocab: "vocab",
          widths: "widths",
          wordspacing: "wordSpacing",
          "word-spacing": "wordSpacing",
          writingmode: "writingMode",
          "writing-mode": "writingMode",
          x1: "x1",
          x2: "x2",
          x: "x",
          xchannelselector: "xChannelSelector",
          xheight: "xHeight",
          "x-height": "xHeight",
          xlinkactuate: "xlinkActuate",
          "xlink:actuate": "xlinkActuate",
          xlinkarcrole: "xlinkArcrole",
          "xlink:arcrole": "xlinkArcrole",
          xlinkhref: "xlinkHref",
          "xlink:href": "xlinkHref",
          xlinkrole: "xlinkRole",
          "xlink:role": "xlinkRole",
          xlinkshow: "xlinkShow",
          "xlink:show": "xlinkShow",
          xlinktitle: "xlinkTitle",
          "xlink:title": "xlinkTitle",
          xlinktype: "xlinkType",
          "xlink:type": "xlinkType",
          xmlbase: "xmlBase",
          "xml:base": "xmlBase",
          xmllang: "xmlLang",
          "xml:lang": "xmlLang",
          xmlns: "xmlns",
          "xml:space": "xmlSpace",
          xmlnsxlink: "xmlnsXlink",
          "xmlns:xlink": "xmlnsXlink",
          xmlspace: "xmlSpace",
          y1: "y1",
          y2: "y2",
          y: "y",
          ychannelselector: "yChannelSelector",
          z: "z",
          zoomandpan: "zoomAndPan"
        };
        var validateProperty$1 = function() {
        };
        {
          var warnedProperties$1 = {};
          var EVENT_NAME_REGEX = /^on./;
          var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
          var rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
          var rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
          validateProperty$1 = function(tagName, name, value, eventRegistry) {
            if (hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
              return true;
            }
            var lowerCasedName = name.toLowerCase();
            if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout") {
              error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React.");
              warnedProperties$1[name] = true;
              return true;
            }
            if (eventRegistry != null) {
              var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
              if (registrationNameDependencies.hasOwnProperty(name)) {
                return true;
              }
              var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
              if (registrationName != null) {
                error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName);
                warnedProperties$1[name] = true;
                return true;
              }
              if (EVENT_NAME_REGEX.test(name)) {
                error("Unknown event handler property `%s`. It will be ignored.", name);
                warnedProperties$1[name] = true;
                return true;
              }
            } else if (EVENT_NAME_REGEX.test(name)) {
              if (INVALID_EVENT_NAME_REGEX.test(name)) {
                error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name);
              }
              warnedProperties$1[name] = true;
              return true;
            }
            if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
              return true;
            }
            if (lowerCasedName === "innerhtml") {
              error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`.");
              warnedProperties$1[name] = true;
              return true;
            }
            if (lowerCasedName === "aria") {
              error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead.");
              warnedProperties$1[name] = true;
              return true;
            }
            if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value !== "string") {
              error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value);
              warnedProperties$1[name] = true;
              return true;
            }
            if (typeof value === "number" && isNaN(value)) {
              error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name);
              warnedProperties$1[name] = true;
              return true;
            }
            var propertyInfo = getPropertyInfo(name);
            var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
            if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
              var standardName = possibleStandardNames[lowerCasedName];
              if (standardName !== name) {
                error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName);
                warnedProperties$1[name] = true;
                return true;
              }
            } else if (!isReserved && name !== lowerCasedName) {
              error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName);
              warnedProperties$1[name] = true;
              return true;
            }
            if (typeof value === "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
              if (value) {
                error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name);
              } else {
                error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
              }
              warnedProperties$1[name] = true;
              return true;
            }
            if (isReserved) {
              return true;
            }
            if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
              warnedProperties$1[name] = true;
              return false;
            }
            if ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
              error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value);
              warnedProperties$1[name] = true;
              return true;
            }
            return true;
          };
        }
        var warnUnknownProperties = function(type, props, eventRegistry) {
          {
            var unknownProps = [];
            for (var key in props) {
              var isValid = validateProperty$1(type, key, props[key], eventRegistry);
              if (!isValid) {
                unknownProps.push(key);
              }
            }
            var unknownPropString = unknownProps.map(function(prop) {
              return "`" + prop + "`";
            }).join(", ");
            if (unknownProps.length === 1) {
              error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
            } else if (unknownProps.length > 1) {
              error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
            }
          }
        };
        function validateProperties$2(type, props, eventRegistry) {
          if (isCustomComponent(type, props)) {
            return;
          }
          warnUnknownProperties(type, props, eventRegistry);
        }
        var warnValidStyle = function() {
        };
        {
          var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
          var msPattern = /^-ms-/;
          var hyphenPattern = /-(.)/g;
          var badStyleValueWithSemicolonPattern = /;\s*$/;
          var warnedStyleNames = {};
          var warnedStyleValues = {};
          var warnedForNaNValue = false;
          var warnedForInfinityValue = false;
          var camelize = function(string) {
            return string.replace(hyphenPattern, function(_, character) {
              return character.toUpperCase();
            });
          };
          var warnHyphenatedStyleName = function(name) {
            if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
              return;
            }
            warnedStyleNames[name] = true;
            error(
              "Unsupported style property %s. Did you mean %s?",
              name,
              // As Andi Smith suggests
              // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
              // is converted to lowercase `ms`.
              camelize(name.replace(msPattern, "ms-"))
            );
          };
          var warnBadVendoredStyleName = function(name) {
            if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
              return;
            }
            warnedStyleNames[name] = true;
            error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1));
          };
          var warnStyleValueWithSemicolon = function(name, value) {
            if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
              return;
            }
            warnedStyleValues[value] = true;
            error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, ""));
          };
          var warnStyleValueIsNaN = function(name, value) {
            if (warnedForNaNValue) {
              return;
            }
            warnedForNaNValue = true;
            error("`NaN` is an invalid value for the `%s` css style property.", name);
          };
          var warnStyleValueIsInfinity = function(name, value) {
            if (warnedForInfinityValue) {
              return;
            }
            warnedForInfinityValue = true;
            error("`Infinity` is an invalid value for the `%s` css style property.", name);
          };
          warnValidStyle = function(name, value) {
            if (name.indexOf("-") > -1) {
              warnHyphenatedStyleName(name);
            } else if (badVendoredStyleNamePattern.test(name)) {
              warnBadVendoredStyleName(name);
            } else if (badStyleValueWithSemicolonPattern.test(value)) {
              warnStyleValueWithSemicolon(name, value);
            }
            if (typeof value === "number") {
              if (isNaN(value)) {
                warnStyleValueIsNaN(name, value);
              } else if (!isFinite(value)) {
                warnStyleValueIsInfinity(name, value);
              }
            }
          };
        }
        var warnValidStyle$1 = warnValidStyle;
        var matchHtmlRegExp = /["'&<>]/;
        function escapeHtml(string) {
          {
            checkHtmlStringCoercion(string);
          }
          var str = "" + string;
          var match = matchHtmlRegExp.exec(str);
          if (!match) {
            return str;
          }
          var escape;
          var html = "";
          var index;
          var lastIndex = 0;
          for (index = match.index; index < str.length; index++) {
            switch (str.charCodeAt(index)) {
              case 34:
                escape = "&quot;";
                break;
              case 38:
                escape = "&amp;";
                break;
              case 39:
                escape = "&#x27;";
                break;
              case 60:
                escape = "&lt;";
                break;
              case 62:
                escape = "&gt;";
                break;
              default:
                continue;
            }
            if (lastIndex !== index) {
              html += str.substring(lastIndex, index);
            }
            lastIndex = index + 1;
            html += escape;
          }
          return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
        }
        function escapeTextForBrowser(text) {
          if (typeof text === "boolean" || typeof text === "number") {
            return "" + text;
          }
          return escapeHtml(text);
        }
        var uppercasePattern = /([A-Z])/g;
        var msPattern$1 = /^ms-/;
        function hyphenateStyleName(name) {
          return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern$1, "-ms-");
        }
        var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
        var didWarn = false;
        function sanitizeURL(url) {
          {
            if (!didWarn && isJavaScriptProtocol.test(url)) {
              didWarn = true;
              error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url));
            }
          }
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        var startInlineScript = stringToPrecomputedChunk("<script>");
        var endInlineScript = stringToPrecomputedChunk("</script>");
        var startScriptSrc = stringToPrecomputedChunk('<script src="');
        var startModuleSrc = stringToPrecomputedChunk('<script type="module" src="');
        var endAsyncScript = stringToPrecomputedChunk('" async=""></script>');
        function escapeBootstrapScriptContent(scriptText) {
          {
            checkHtmlStringCoercion(scriptText);
          }
          return ("" + scriptText).replace(scriptRegex, scriptReplacer);
        }
        var scriptRegex = /(<\/|<)(s)(cript)/gi;
        var scriptReplacer = function(match, prefix2, s, suffix) {
          return "" + prefix2 + (s === "s" ? "\\u0073" : "\\u0053") + suffix;
        };
        function createResponseState(identifierPrefix, nonce, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
          var idPrefix = identifierPrefix === void 0 ? "" : identifierPrefix;
          var inlineScriptWithNonce = nonce === void 0 ? startInlineScript : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser(nonce) + '">');
          var bootstrapChunks = [];
          if (bootstrapScriptContent !== void 0) {
            bootstrapChunks.push(inlineScriptWithNonce, stringToChunk(escapeBootstrapScriptContent(bootstrapScriptContent)), endInlineScript);
          }
          if (bootstrapScripts !== void 0) {
            for (var i = 0; i < bootstrapScripts.length; i++) {
              bootstrapChunks.push(startScriptSrc, stringToChunk(escapeTextForBrowser(bootstrapScripts[i])), endAsyncScript);
            }
          }
          if (bootstrapModules !== void 0) {
            for (var _i = 0; _i < bootstrapModules.length; _i++) {
              bootstrapChunks.push(startModuleSrc, stringToChunk(escapeTextForBrowser(bootstrapModules[_i])), endAsyncScript);
            }
          }
          return {
            bootstrapChunks,
            startInlineScript: inlineScriptWithNonce,
            placeholderPrefix: stringToPrecomputedChunk(idPrefix + "P:"),
            segmentPrefix: stringToPrecomputedChunk(idPrefix + "S:"),
            boundaryPrefix: idPrefix + "B:",
            idPrefix,
            nextSuspenseID: 0,
            sentCompleteSegmentFunction: false,
            sentCompleteBoundaryFunction: false,
            sentClientRenderFunction: false
          };
        }
        var ROOT_HTML_MODE = 0;
        var HTML_MODE = 1;
        var SVG_MODE = 2;
        var MATHML_MODE = 3;
        var HTML_TABLE_MODE = 4;
        var HTML_TABLE_BODY_MODE = 5;
        var HTML_TABLE_ROW_MODE = 6;
        var HTML_COLGROUP_MODE = 7;
        function createFormatContext(insertionMode, selectedValue) {
          return {
            insertionMode,
            selectedValue
          };
        }
        function getChildFormatContext(parentContext, type, props) {
          switch (type) {
            case "select":
              return createFormatContext(HTML_MODE, props.value != null ? props.value : props.defaultValue);
            case "svg":
              return createFormatContext(SVG_MODE, null);
            case "math":
              return createFormatContext(MATHML_MODE, null);
            case "foreignObject":
              return createFormatContext(HTML_MODE, null);
            // Table parents are special in that their children can only be created at all if they're
            // wrapped in a table parent. So we need to encode that we're entering this mode.
            case "table":
              return createFormatContext(HTML_TABLE_MODE, null);
            case "thead":
            case "tbody":
            case "tfoot":
              return createFormatContext(HTML_TABLE_BODY_MODE, null);
            case "colgroup":
              return createFormatContext(HTML_COLGROUP_MODE, null);
            case "tr":
              return createFormatContext(HTML_TABLE_ROW_MODE, null);
          }
          if (parentContext.insertionMode >= HTML_TABLE_MODE) {
            return createFormatContext(HTML_MODE, null);
          }
          if (parentContext.insertionMode === ROOT_HTML_MODE) {
            return createFormatContext(HTML_MODE, null);
          }
          return parentContext;
        }
        var UNINITIALIZED_SUSPENSE_BOUNDARY_ID = null;
        function assignSuspenseBoundaryID(responseState) {
          var generatedID = responseState.nextSuspenseID++;
          return stringToPrecomputedChunk(responseState.boundaryPrefix + generatedID.toString(16));
        }
        function makeId(responseState, treeId, localId) {
          var idPrefix = responseState.idPrefix;
          var id = ":" + idPrefix + "R" + treeId;
          if (localId > 0) {
            id += "H" + localId.toString(32);
          }
          return id + ":";
        }
        function encodeHTMLTextNode(text) {
          return escapeTextForBrowser(text);
        }
        var textSeparator = stringToPrecomputedChunk("<!-- -->");
        function pushTextInstance(target, text, responseState, textEmbedded) {
          if (text === "") {
            return textEmbedded;
          }
          if (textEmbedded) {
            target.push(textSeparator);
          }
          target.push(stringToChunk(encodeHTMLTextNode(text)));
          return true;
        }
        function pushSegmentFinale(target, responseState, lastPushedText, textEmbedded) {
          if (lastPushedText && textEmbedded) {
            target.push(textSeparator);
          }
        }
        var styleNameCache = /* @__PURE__ */ new Map();
        function processStyleName(styleName) {
          var chunk = styleNameCache.get(styleName);
          if (chunk !== void 0) {
            return chunk;
          }
          var result = stringToPrecomputedChunk(escapeTextForBrowser(hyphenateStyleName(styleName)));
          styleNameCache.set(styleName, result);
          return result;
        }
        var styleAttributeStart = stringToPrecomputedChunk(' style="');
        var styleAssign = stringToPrecomputedChunk(":");
        var styleSeparator = stringToPrecomputedChunk(";");
        function pushStyle(target, responseState, style) {
          if (typeof style !== "object") {
            throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
          }
          var isFirst = true;
          for (var styleName in style) {
            if (!hasOwnProperty.call(style, styleName)) {
              continue;
            }
            var styleValue = style[styleName];
            if (styleValue == null || typeof styleValue === "boolean" || styleValue === "") {
              continue;
            }
            var nameChunk = void 0;
            var valueChunk = void 0;
            var isCustomProperty = styleName.indexOf("--") === 0;
            if (isCustomProperty) {
              nameChunk = stringToChunk(escapeTextForBrowser(styleName));
              {
                checkCSSPropertyStringCoercion(styleValue, styleName);
              }
              valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
            } else {
              {
                warnValidStyle$1(styleName, styleValue);
              }
              nameChunk = processStyleName(styleName);
              if (typeof styleValue === "number") {
                if (styleValue !== 0 && !hasOwnProperty.call(isUnitlessNumber, styleName)) {
                  valueChunk = stringToChunk(styleValue + "px");
                } else {
                  valueChunk = stringToChunk("" + styleValue);
                }
              } else {
                {
                  checkCSSPropertyStringCoercion(styleValue, styleName);
                }
                valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
              }
            }
            if (isFirst) {
              isFirst = false;
              target.push(styleAttributeStart, nameChunk, styleAssign, valueChunk);
            } else {
              target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
            }
          }
          if (!isFirst) {
            target.push(attributeEnd);
          }
        }
        var attributeSeparator = stringToPrecomputedChunk(" ");
        var attributeAssign = stringToPrecomputedChunk('="');
        var attributeEnd = stringToPrecomputedChunk('"');
        var attributeEmptyString = stringToPrecomputedChunk('=""');
        function pushAttribute(target, responseState, name, value) {
          switch (name) {
            case "style": {
              pushStyle(target, responseState, value);
              return;
            }
            case "defaultValue":
            case "defaultChecked":
            // These shouldn't be set as attributes on generic HTML elements.
            case "innerHTML":
            // Must use dangerouslySetInnerHTML instead.
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
              return;
          }
          if (
            // shouldIgnoreAttribute
            // We have already filtered out null/undefined and reserved words.
            name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N")
          ) {
            return;
          }
          var propertyInfo = getPropertyInfo(name);
          if (propertyInfo !== null) {
            switch (typeof value) {
              case "function":
              // $FlowIssue symbol is perfectly valid here
              case "symbol":
                return;
              case "boolean": {
                if (!propertyInfo.acceptsBooleans) {
                  return;
                }
              }
            }
            var attributeName = propertyInfo.attributeName;
            var attributeNameChunk = stringToChunk(attributeName);
            switch (propertyInfo.type) {
              case BOOLEAN:
                if (value) {
                  target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                }
                return;
              case OVERLOADED_BOOLEAN:
                if (value === true) {
                  target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                } else if (value === false) ;
                else {
                  target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                }
                return;
              case NUMERIC:
                if (!isNaN(value)) {
                  target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                }
                break;
              case POSITIVE_NUMERIC:
                if (!isNaN(value) && value >= 1) {
                  target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                }
                break;
              default:
                if (propertyInfo.sanitizeURL) {
                  {
                    checkAttributeStringCoercion(value, attributeName);
                  }
                  value = "" + value;
                  sanitizeURL(value);
                }
                target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
            }
          } else if (isAttributeNameSafe(name)) {
            switch (typeof value) {
              case "function":
              // $FlowIssue symbol is perfectly valid here
              case "symbol":
                return;
              case "boolean": {
                var prefix2 = name.toLowerCase().slice(0, 5);
                if (prefix2 !== "data-" && prefix2 !== "aria-") {
                  return;
                }
              }
            }
            target.push(attributeSeparator, stringToChunk(name), attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
          }
        }
        var endOfStartTag = stringToPrecomputedChunk(">");
        var endOfStartTagSelfClosing = stringToPrecomputedChunk("/>");
        function pushInnerHTML(target, innerHTML, children) {
          if (innerHTML != null) {
            if (children != null) {
              throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            }
            if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
              throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
            }
            var html = innerHTML.__html;
            if (html !== null && html !== void 0) {
              {
                checkHtmlStringCoercion(html);
              }
              target.push(stringToChunk("" + html));
            }
          }
        }
        var didWarnDefaultInputValue = false;
        var didWarnDefaultChecked = false;
        var didWarnDefaultSelectValue = false;
        var didWarnDefaultTextareaValue = false;
        var didWarnInvalidOptionChildren = false;
        var didWarnInvalidOptionInnerHTML = false;
        var didWarnSelectedSetOnOption = false;
        function checkSelectProp(props, propName) {
          {
            var value = props[propName];
            if (value != null) {
              var array = isArray(value);
              if (props.multiple && !array) {
                error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName);
              } else if (!props.multiple && array) {
                error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
              }
            }
          }
        }
        function pushStartSelect(target, props, responseState) {
          {
            checkControlledValueProps("select", props);
            checkSelectProp(props, "value");
            checkSelectProp(props, "defaultValue");
            if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue) {
              error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components");
              didWarnDefaultSelectValue = true;
            }
          }
          target.push(startChunkForTag("select"));
          var children = null;
          var innerHTML = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML = propValue;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          target.push(endOfStartTag);
          pushInnerHTML(target, innerHTML, children);
          return children;
        }
        function flattenOptionChildren(children) {
          var content = "";
          React9.Children.forEach(children, function(child) {
            if (child == null) {
              return;
            }
            content += child;
            {
              if (!didWarnInvalidOptionChildren && typeof child !== "string" && typeof child !== "number") {
                didWarnInvalidOptionChildren = true;
                error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.");
              }
            }
          });
          return content;
        }
        var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""');
        function pushStartOption(target, props, responseState, formatContext) {
          var selectedValue = formatContext.selectedValue;
          target.push(startChunkForTag("option"));
          var children = null;
          var value = null;
          var selected = null;
          var innerHTML = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "selected":
                  selected = propValue;
                  {
                    if (!didWarnSelectedSetOnOption) {
                      error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.");
                      didWarnSelectedSetOnOption = true;
                    }
                  }
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML = propValue;
                  break;
                // eslint-disable-next-line-no-fallthrough
                case "value":
                  value = propValue;
                // We intentionally fallthrough to also set the attribute on the node.
                // eslint-disable-next-line-no-fallthrough
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          if (selectedValue != null) {
            var stringValue;
            if (value !== null) {
              {
                checkAttributeStringCoercion(value, "value");
              }
              stringValue = "" + value;
            } else {
              {
                if (innerHTML !== null) {
                  if (!didWarnInvalidOptionInnerHTML) {
                    didWarnInvalidOptionInnerHTML = true;
                    error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.");
                  }
                }
              }
              stringValue = flattenOptionChildren(children);
            }
            if (isArray(selectedValue)) {
              for (var i = 0; i < selectedValue.length; i++) {
                {
                  checkAttributeStringCoercion(selectedValue[i], "value");
                }
                var v = "" + selectedValue[i];
                if (v === stringValue) {
                  target.push(selectedMarkerAttribute);
                  break;
                }
              }
            } else {
              {
                checkAttributeStringCoercion(selectedValue, "select.value");
              }
              if ("" + selectedValue === stringValue) {
                target.push(selectedMarkerAttribute);
              }
            }
          } else if (selected) {
            target.push(selectedMarkerAttribute);
          }
          target.push(endOfStartTag);
          pushInnerHTML(target, innerHTML, children);
          return children;
        }
        function pushInput(target, props, responseState) {
          {
            checkControlledValueProps("input", props);
            if (props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked) {
              error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
              didWarnDefaultChecked = true;
            }
            if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue) {
              error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
              didWarnDefaultInputValue = true;
            }
          }
          target.push(startChunkForTag("input"));
          var value = null;
          var defaultValue = null;
          var checked = null;
          var defaultChecked = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                // eslint-disable-next-line-no-fallthrough
                case "defaultChecked":
                  defaultChecked = propValue;
                  break;
                case "defaultValue":
                  defaultValue = propValue;
                  break;
                case "checked":
                  checked = propValue;
                  break;
                case "value":
                  value = propValue;
                  break;
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          if (checked !== null) {
            pushAttribute(target, responseState, "checked", checked);
          } else if (defaultChecked !== null) {
            pushAttribute(target, responseState, "checked", defaultChecked);
          }
          if (value !== null) {
            pushAttribute(target, responseState, "value", value);
          } else if (defaultValue !== null) {
            pushAttribute(target, responseState, "value", defaultValue);
          }
          target.push(endOfStartTagSelfClosing);
          return null;
        }
        function pushStartTextArea(target, props, responseState) {
          {
            checkControlledValueProps("textarea", props);
            if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue) {
              error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components");
              didWarnDefaultTextareaValue = true;
            }
          }
          target.push(startChunkForTag("textarea"));
          var value = null;
          var defaultValue = null;
          var children = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "value":
                  value = propValue;
                  break;
                case "defaultValue":
                  defaultValue = propValue;
                  break;
                case "dangerouslySetInnerHTML":
                  throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
                // eslint-disable-next-line-no-fallthrough
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          if (value === null && defaultValue !== null) {
            value = defaultValue;
          }
          target.push(endOfStartTag);
          if (children != null) {
            {
              error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
            }
            if (value != null) {
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            }
            if (isArray(children)) {
              if (children.length > 1) {
                throw new Error("<textarea> can only have at most one child.");
              }
              {
                checkHtmlStringCoercion(children[0]);
              }
              value = "" + children[0];
            }
            {
              checkHtmlStringCoercion(children);
            }
            value = "" + children;
          }
          if (typeof value === "string" && value[0] === "\n") {
            target.push(leadingNewline);
          }
          if (value !== null) {
            {
              checkAttributeStringCoercion(value, "value");
            }
            target.push(stringToChunk(encodeHTMLTextNode("" + value)));
          }
          return null;
        }
        function pushSelfClosing(target, props, tag, responseState) {
          target.push(startChunkForTag(tag));
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw new Error(tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                // eslint-disable-next-line-no-fallthrough
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          target.push(endOfStartTagSelfClosing);
          return null;
        }
        function pushStartMenuItem(target, props, responseState) {
          target.push(startChunkForTag("menuitem"));
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
                // eslint-disable-next-line-no-fallthrough
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          target.push(endOfStartTag);
          return null;
        }
        function pushStartTitle(target, props, responseState) {
          target.push(startChunkForTag("title"));
          var children = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "dangerouslySetInnerHTML":
                  throw new Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
                // eslint-disable-next-line-no-fallthrough
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          target.push(endOfStartTag);
          {
            var child = Array.isArray(children) && children.length < 2 ? children[0] || null : children;
            if (Array.isArray(children) && children.length > 1) {
              error("A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
            } else if (child != null && child.$$typeof != null) {
              error("A title element received a React element for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
            } else if (child != null && typeof child !== "string" && typeof child !== "number") {
              error("A title element received a value that was not a string or number for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
            }
          }
          return children;
        }
        function pushStartGenericElement(target, props, tag, responseState) {
          target.push(startChunkForTag(tag));
          var children = null;
          var innerHTML = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML = propValue;
                  break;
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          target.push(endOfStartTag);
          pushInnerHTML(target, innerHTML, children);
          if (typeof children === "string") {
            target.push(stringToChunk(encodeHTMLTextNode(children)));
            return null;
          }
          return children;
        }
        function pushStartCustomElement(target, props, tag, responseState) {
          target.push(startChunkForTag(tag));
          var children = null;
          var innerHTML = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML = propValue;
                  break;
                case "style":
                  pushStyle(target, responseState, propValue);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                  break;
                default:
                  if (isAttributeNameSafe(propKey) && typeof propValue !== "function" && typeof propValue !== "symbol") {
                    target.push(attributeSeparator, stringToChunk(propKey), attributeAssign, stringToChunk(escapeTextForBrowser(propValue)), attributeEnd);
                  }
                  break;
              }
            }
          }
          target.push(endOfStartTag);
          pushInnerHTML(target, innerHTML, children);
          return children;
        }
        var leadingNewline = stringToPrecomputedChunk("\n");
        function pushStartPreformattedElement(target, props, tag, responseState) {
          target.push(startChunkForTag(tag));
          var children = null;
          var innerHTML = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML = propValue;
                  break;
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          target.push(endOfStartTag);
          if (innerHTML != null) {
            if (children != null) {
              throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            }
            if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
              throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
            }
            var html = innerHTML.__html;
            if (html !== null && html !== void 0) {
              if (typeof html === "string" && html.length > 0 && html[0] === "\n") {
                target.push(leadingNewline, stringToChunk(html));
              } else {
                {
                  checkHtmlStringCoercion(html);
                }
                target.push(stringToChunk("" + html));
              }
            }
          }
          if (typeof children === "string" && children[0] === "\n") {
            target.push(leadingNewline);
          }
          return children;
        }
        var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
        var validatedTagCache = /* @__PURE__ */ new Map();
        function startChunkForTag(tag) {
          var tagStartChunk = validatedTagCache.get(tag);
          if (tagStartChunk === void 0) {
            if (!VALID_TAG_REGEX.test(tag)) {
              throw new Error("Invalid tag: " + tag);
            }
            tagStartChunk = stringToPrecomputedChunk("<" + tag);
            validatedTagCache.set(tag, tagStartChunk);
          }
          return tagStartChunk;
        }
        var DOCTYPE = stringToPrecomputedChunk("<!DOCTYPE html>");
        function pushStartInstance(target, type, props, responseState, formatContext) {
          {
            validateProperties(type, props);
            validateProperties$1(type, props);
            validateProperties$2(type, props, null);
            if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
              error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
            }
            if (formatContext.insertionMode !== SVG_MODE && formatContext.insertionMode !== MATHML_MODE) {
              if (type.indexOf("-") === -1 && typeof props.is !== "string" && type.toLowerCase() !== type) {
                error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", type);
              }
            }
          }
          switch (type) {
            // Special tags
            case "select":
              return pushStartSelect(target, props, responseState);
            case "option":
              return pushStartOption(target, props, responseState, formatContext);
            case "textarea":
              return pushStartTextArea(target, props, responseState);
            case "input":
              return pushInput(target, props, responseState);
            case "menuitem":
              return pushStartMenuItem(target, props, responseState);
            case "title":
              return pushStartTitle(target, props, responseState);
            // Newline eating tags
            case "listing":
            case "pre": {
              return pushStartPreformattedElement(target, props, type, responseState);
            }
            // Omitted close tags
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "img":
            case "keygen":
            case "link":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr": {
              return pushSelfClosing(target, props, type, responseState);
            }
            // These are reserved SVG and MathML elements, that are never custom elements.
            // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph": {
              return pushStartGenericElement(target, props, type, responseState);
            }
            case "html": {
              if (formatContext.insertionMode === ROOT_HTML_MODE) {
                target.push(DOCTYPE);
              }
              return pushStartGenericElement(target, props, type, responseState);
            }
            default: {
              if (type.indexOf("-") === -1 && typeof props.is !== "string") {
                return pushStartGenericElement(target, props, type, responseState);
              } else {
                return pushStartCustomElement(target, props, type, responseState);
              }
            }
          }
        }
        var endTag1 = stringToPrecomputedChunk("</");
        var endTag2 = stringToPrecomputedChunk(">");
        function pushEndInstance(target, type, props) {
          switch (type) {
            // Omitted close tags
            // TODO: Instead of repeating this switch we could try to pass a flag from above.
            // That would require returning a tuple. Which might be ok if it gets inlined.
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "img":
            case "input":
            case "keygen":
            case "link":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr": {
              break;
            }
            default: {
              target.push(endTag1, stringToChunk(type), endTag2);
            }
          }
        }
        function writeCompletedRoot(destination, responseState) {
          var bootstrapChunks = responseState.bootstrapChunks;
          var i = 0;
          for (; i < bootstrapChunks.length - 1; i++) {
            writeChunk(destination, bootstrapChunks[i]);
          }
          if (i < bootstrapChunks.length) {
            return writeChunkAndReturn(destination, bootstrapChunks[i]);
          }
          return true;
        }
        var placeholder1 = stringToPrecomputedChunk('<template id="');
        var placeholder2 = stringToPrecomputedChunk('"></template>');
        function writePlaceholder(destination, responseState, id) {
          writeChunk(destination, placeholder1);
          writeChunk(destination, responseState.placeholderPrefix);
          var formattedID = stringToChunk(id.toString(16));
          writeChunk(destination, formattedID);
          return writeChunkAndReturn(destination, placeholder2);
        }
        var startCompletedSuspenseBoundary = stringToPrecomputedChunk("<!--$-->");
        var startPendingSuspenseBoundary1 = stringToPrecomputedChunk('<!--$?--><template id="');
        var startPendingSuspenseBoundary2 = stringToPrecomputedChunk('"></template>');
        var startClientRenderedSuspenseBoundary = stringToPrecomputedChunk("<!--$!-->");
        var endSuspenseBoundary = stringToPrecomputedChunk("<!--/$-->");
        var clientRenderedSuspenseBoundaryError1 = stringToPrecomputedChunk("<template");
        var clientRenderedSuspenseBoundaryErrorAttrInterstitial = stringToPrecomputedChunk('"');
        var clientRenderedSuspenseBoundaryError1A = stringToPrecomputedChunk(' data-dgst="');
        var clientRenderedSuspenseBoundaryError1B = stringToPrecomputedChunk(' data-msg="');
        var clientRenderedSuspenseBoundaryError1C = stringToPrecomputedChunk(' data-stck="');
        var clientRenderedSuspenseBoundaryError2 = stringToPrecomputedChunk("></template>");
        function writeStartCompletedSuspenseBoundary(destination, responseState) {
          return writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
        }
        function writeStartPendingSuspenseBoundary(destination, responseState, id) {
          writeChunk(destination, startPendingSuspenseBoundary1);
          if (id === null) {
            throw new Error("An ID must have been assigned before we can complete the boundary.");
          }
          writeChunk(destination, id);
          return writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
        }
        function writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMesssage, errorComponentStack) {
          var result;
          result = writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary);
          writeChunk(destination, clientRenderedSuspenseBoundaryError1);
          if (errorDigest) {
            writeChunk(destination, clientRenderedSuspenseBoundaryError1A);
            writeChunk(destination, stringToChunk(escapeTextForBrowser(errorDigest)));
            writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
          }
          {
            if (errorMesssage) {
              writeChunk(destination, clientRenderedSuspenseBoundaryError1B);
              writeChunk(destination, stringToChunk(escapeTextForBrowser(errorMesssage)));
              writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
            }
            if (errorComponentStack) {
              writeChunk(destination, clientRenderedSuspenseBoundaryError1C);
              writeChunk(destination, stringToChunk(escapeTextForBrowser(errorComponentStack)));
              writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
            }
          }
          result = writeChunkAndReturn(destination, clientRenderedSuspenseBoundaryError2);
          return result;
        }
        function writeEndCompletedSuspenseBoundary(destination, responseState) {
          return writeChunkAndReturn(destination, endSuspenseBoundary);
        }
        function writeEndPendingSuspenseBoundary(destination, responseState) {
          return writeChunkAndReturn(destination, endSuspenseBoundary);
        }
        function writeEndClientRenderedSuspenseBoundary(destination, responseState) {
          return writeChunkAndReturn(destination, endSuspenseBoundary);
        }
        var startSegmentHTML = stringToPrecomputedChunk('<div hidden id="');
        var startSegmentHTML2 = stringToPrecomputedChunk('">');
        var endSegmentHTML = stringToPrecomputedChunk("</div>");
        var startSegmentSVG = stringToPrecomputedChunk('<svg aria-hidden="true" style="display:none" id="');
        var startSegmentSVG2 = stringToPrecomputedChunk('">');
        var endSegmentSVG = stringToPrecomputedChunk("</svg>");
        var startSegmentMathML = stringToPrecomputedChunk('<math aria-hidden="true" style="display:none" id="');
        var startSegmentMathML2 = stringToPrecomputedChunk('">');
        var endSegmentMathML = stringToPrecomputedChunk("</math>");
        var startSegmentTable = stringToPrecomputedChunk('<table hidden id="');
        var startSegmentTable2 = stringToPrecomputedChunk('">');
        var endSegmentTable = stringToPrecomputedChunk("</table>");
        var startSegmentTableBody = stringToPrecomputedChunk('<table hidden><tbody id="');
        var startSegmentTableBody2 = stringToPrecomputedChunk('">');
        var endSegmentTableBody = stringToPrecomputedChunk("</tbody></table>");
        var startSegmentTableRow = stringToPrecomputedChunk('<table hidden><tr id="');
        var startSegmentTableRow2 = stringToPrecomputedChunk('">');
        var endSegmentTableRow = stringToPrecomputedChunk("</tr></table>");
        var startSegmentColGroup = stringToPrecomputedChunk('<table hidden><colgroup id="');
        var startSegmentColGroup2 = stringToPrecomputedChunk('">');
        var endSegmentColGroup = stringToPrecomputedChunk("</colgroup></table>");
        function writeStartSegment(destination, responseState, formatContext, id) {
          switch (formatContext.insertionMode) {
            case ROOT_HTML_MODE:
            case HTML_MODE: {
              writeChunk(destination, startSegmentHTML);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentHTML2);
            }
            case SVG_MODE: {
              writeChunk(destination, startSegmentSVG);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentSVG2);
            }
            case MATHML_MODE: {
              writeChunk(destination, startSegmentMathML);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentMathML2);
            }
            case HTML_TABLE_MODE: {
              writeChunk(destination, startSegmentTable);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentTable2);
            }
            // TODO: For the rest of these, there will be extra wrapper nodes that never
            // get deleted from the document. We need to delete the table too as part
            // of the injected scripts. They are invisible though so it's not too terrible
            // and it's kind of an edge case to suspend in a table. Totally supported though.
            case HTML_TABLE_BODY_MODE: {
              writeChunk(destination, startSegmentTableBody);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentTableBody2);
            }
            case HTML_TABLE_ROW_MODE: {
              writeChunk(destination, startSegmentTableRow);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentTableRow2);
            }
            case HTML_COLGROUP_MODE: {
              writeChunk(destination, startSegmentColGroup);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentColGroup2);
            }
            default: {
              throw new Error("Unknown insertion mode. This is a bug in React.");
            }
          }
        }
        function writeEndSegment(destination, formatContext) {
          switch (formatContext.insertionMode) {
            case ROOT_HTML_MODE:
            case HTML_MODE: {
              return writeChunkAndReturn(destination, endSegmentHTML);
            }
            case SVG_MODE: {
              return writeChunkAndReturn(destination, endSegmentSVG);
            }
            case MATHML_MODE: {
              return writeChunkAndReturn(destination, endSegmentMathML);
            }
            case HTML_TABLE_MODE: {
              return writeChunkAndReturn(destination, endSegmentTable);
            }
            case HTML_TABLE_BODY_MODE: {
              return writeChunkAndReturn(destination, endSegmentTableBody);
            }
            case HTML_TABLE_ROW_MODE: {
              return writeChunkAndReturn(destination, endSegmentTableRow);
            }
            case HTML_COLGROUP_MODE: {
              return writeChunkAndReturn(destination, endSegmentColGroup);
            }
            default: {
              throw new Error("Unknown insertion mode. This is a bug in React.");
            }
          }
        }
        var completeSegmentFunction = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}";
        var completeBoundaryFunction = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}';
        var clientRenderFunction = 'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())}';
        var completeSegmentScript1Full = stringToPrecomputedChunk(completeSegmentFunction + ';$RS("');
        var completeSegmentScript1Partial = stringToPrecomputedChunk('$RS("');
        var completeSegmentScript2 = stringToPrecomputedChunk('","');
        var completeSegmentScript3 = stringToPrecomputedChunk('")</script>');
        function writeCompletedSegmentInstruction(destination, responseState, contentSegmentID) {
          writeChunk(destination, responseState.startInlineScript);
          if (!responseState.sentCompleteSegmentFunction) {
            responseState.sentCompleteSegmentFunction = true;
            writeChunk(destination, completeSegmentScript1Full);
          } else {
            writeChunk(destination, completeSegmentScript1Partial);
          }
          writeChunk(destination, responseState.segmentPrefix);
          var formattedID = stringToChunk(contentSegmentID.toString(16));
          writeChunk(destination, formattedID);
          writeChunk(destination, completeSegmentScript2);
          writeChunk(destination, responseState.placeholderPrefix);
          writeChunk(destination, formattedID);
          return writeChunkAndReturn(destination, completeSegmentScript3);
        }
        var completeBoundaryScript1Full = stringToPrecomputedChunk(completeBoundaryFunction + ';$RC("');
        var completeBoundaryScript1Partial = stringToPrecomputedChunk('$RC("');
        var completeBoundaryScript2 = stringToPrecomputedChunk('","');
        var completeBoundaryScript3 = stringToPrecomputedChunk('")</script>');
        function writeCompletedBoundaryInstruction(destination, responseState, boundaryID, contentSegmentID) {
          writeChunk(destination, responseState.startInlineScript);
          if (!responseState.sentCompleteBoundaryFunction) {
            responseState.sentCompleteBoundaryFunction = true;
            writeChunk(destination, completeBoundaryScript1Full);
          } else {
            writeChunk(destination, completeBoundaryScript1Partial);
          }
          if (boundaryID === null) {
            throw new Error("An ID must have been assigned before we can complete the boundary.");
          }
          var formattedContentID = stringToChunk(contentSegmentID.toString(16));
          writeChunk(destination, boundaryID);
          writeChunk(destination, completeBoundaryScript2);
          writeChunk(destination, responseState.segmentPrefix);
          writeChunk(destination, formattedContentID);
          return writeChunkAndReturn(destination, completeBoundaryScript3);
        }
        var clientRenderScript1Full = stringToPrecomputedChunk(clientRenderFunction + ';$RX("');
        var clientRenderScript1Partial = stringToPrecomputedChunk('$RX("');
        var clientRenderScript1A = stringToPrecomputedChunk('"');
        var clientRenderScript2 = stringToPrecomputedChunk(")</script>");
        var clientRenderErrorScriptArgInterstitial = stringToPrecomputedChunk(",");
        function writeClientRenderBoundaryInstruction(destination, responseState, boundaryID, errorDigest, errorMessage, errorComponentStack) {
          writeChunk(destination, responseState.startInlineScript);
          if (!responseState.sentClientRenderFunction) {
            responseState.sentClientRenderFunction = true;
            writeChunk(destination, clientRenderScript1Full);
          } else {
            writeChunk(destination, clientRenderScript1Partial);
          }
          if (boundaryID === null) {
            throw new Error("An ID must have been assigned before we can complete the boundary.");
          }
          writeChunk(destination, boundaryID);
          writeChunk(destination, clientRenderScript1A);
          if (errorDigest || errorMessage || errorComponentStack) {
            writeChunk(destination, clientRenderErrorScriptArgInterstitial);
            writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorDigest || "")));
          }
          if (errorMessage || errorComponentStack) {
            writeChunk(destination, clientRenderErrorScriptArgInterstitial);
            writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorMessage || "")));
          }
          if (errorComponentStack) {
            writeChunk(destination, clientRenderErrorScriptArgInterstitial);
            writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorComponentStack)));
          }
          return writeChunkAndReturn(destination, clientRenderScript2);
        }
        var regexForJSStringsInScripts = /[<\u2028\u2029]/g;
        function escapeJSStringsForInstructionScripts(input) {
          var escaped = JSON.stringify(input);
          return escaped.replace(regexForJSStringsInScripts, function(match) {
            switch (match) {
              // santizing breaking out of strings and script tags
              case "<":
                return "\\u003c";
              case "\u2028":
                return "\\u2028";
              case "\u2029":
                return "\\u2029";
              default: {
                throw new Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
              }
            }
          });
        }
        function createResponseState$1(generateStaticMarkup, identifierPrefix) {
          var responseState = createResponseState(identifierPrefix, void 0);
          return {
            // Keep this in sync with ReactDOMServerFormatConfig
            bootstrapChunks: responseState.bootstrapChunks,
            startInlineScript: responseState.startInlineScript,
            placeholderPrefix: responseState.placeholderPrefix,
            segmentPrefix: responseState.segmentPrefix,
            boundaryPrefix: responseState.boundaryPrefix,
            idPrefix: responseState.idPrefix,
            nextSuspenseID: responseState.nextSuspenseID,
            sentCompleteSegmentFunction: responseState.sentCompleteSegmentFunction,
            sentCompleteBoundaryFunction: responseState.sentCompleteBoundaryFunction,
            sentClientRenderFunction: responseState.sentClientRenderFunction,
            // This is an extra field for the legacy renderer
            generateStaticMarkup
          };
        }
        function createRootFormatContext() {
          return {
            insertionMode: HTML_MODE,
            // We skip the root mode because we don't want to emit the DOCTYPE in legacy mode.
            selectedValue: null
          };
        }
        function pushTextInstance$1(target, text, responseState, textEmbedded) {
          if (responseState.generateStaticMarkup) {
            target.push(stringToChunk(escapeTextForBrowser(text)));
            return false;
          } else {
            return pushTextInstance(target, text, responseState, textEmbedded);
          }
        }
        function pushSegmentFinale$1(target, responseState, lastPushedText, textEmbedded) {
          if (responseState.generateStaticMarkup) {
            return;
          } else {
            return pushSegmentFinale(target, responseState, lastPushedText, textEmbedded);
          }
        }
        function writeStartCompletedSuspenseBoundary$1(destination, responseState) {
          if (responseState.generateStaticMarkup) {
            return true;
          }
          return writeStartCompletedSuspenseBoundary(destination);
        }
        function writeStartClientRenderedSuspenseBoundary$1(destination, responseState, errorDigest, errorMessage, errorComponentStack) {
          if (responseState.generateStaticMarkup) {
            return true;
          }
          return writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMessage, errorComponentStack);
        }
        function writeEndCompletedSuspenseBoundary$1(destination, responseState) {
          if (responseState.generateStaticMarkup) {
            return true;
          }
          return writeEndCompletedSuspenseBoundary(destination);
        }
        function writeEndClientRenderedSuspenseBoundary$1(destination, responseState) {
          if (responseState.generateStaticMarkup) {
            return true;
          }
          return writeEndClientRenderedSuspenseBoundary(destination);
        }
        var assign = Object.assign;
        var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.element");
        var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = /* @__PURE__ */ Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
        var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
        var REACT_SCOPE_TYPE = /* @__PURE__ */ Symbol.for("react.scope");
        var REACT_DEBUG_TRACING_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.debug_trace_mode");
        var REACT_LEGACY_HIDDEN_TYPE = /* @__PURE__ */ Symbol.for("react.legacy_hidden");
        var REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = /* @__PURE__ */ Symbol.for("react.default_value");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeClassComponentFrame(ctor, source, ownerFn) {
          {
            return describeNativeComponentFrame(ctor, true);
          }
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var warnedAboutMissingGetChildContext;
        {
          warnedAboutMissingGetChildContext = {};
        }
        var emptyContextObject = {};
        {
          Object.freeze(emptyContextObject);
        }
        function getMaskedContext(type, unmaskedContext) {
          {
            var contextTypes = type.contextTypes;
            if (!contextTypes) {
              return emptyContextObject;
            }
            var context = {};
            for (var key in contextTypes) {
              context[key] = unmaskedContext[key];
            }
            {
              var name = getComponentNameFromType(type) || "Unknown";
              checkPropTypes(contextTypes, context, "context", name);
            }
            return context;
          }
        }
        function processChildContext(instance, type, parentContext, childContextTypes) {
          {
            if (typeof instance.getChildContext !== "function") {
              {
                var componentName = getComponentNameFromType(type) || "Unknown";
                if (!warnedAboutMissingGetChildContext[componentName]) {
                  warnedAboutMissingGetChildContext[componentName] = true;
                  error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName);
                }
              }
              return parentContext;
            }
            var childContext = instance.getChildContext();
            for (var contextKey in childContext) {
              if (!(contextKey in childContextTypes)) {
                throw new Error((getComponentNameFromType(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
              }
            }
            {
              var name = getComponentNameFromType(type) || "Unknown";
              checkPropTypes(childContextTypes, childContext, "child context", name);
            }
            return assign({}, parentContext, childContext);
          }
        }
        var rendererSigil;
        {
          rendererSigil = {};
        }
        var rootContextSnapshot = null;
        var currentActiveSnapshot = null;
        function popNode(prev) {
          {
            prev.context._currentValue2 = prev.parentValue;
          }
        }
        function pushNode(next) {
          {
            next.context._currentValue2 = next.value;
          }
        }
        function popToNearestCommonAncestor(prev, next) {
          if (prev === next) ;
          else {
            popNode(prev);
            var parentPrev = prev.parent;
            var parentNext = next.parent;
            if (parentPrev === null) {
              if (parentNext !== null) {
                throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
              }
            } else {
              if (parentNext === null) {
                throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
              }
              popToNearestCommonAncestor(parentPrev, parentNext);
            }
            pushNode(next);
          }
        }
        function popAllPrevious(prev) {
          popNode(prev);
          var parentPrev = prev.parent;
          if (parentPrev !== null) {
            popAllPrevious(parentPrev);
          }
        }
        function pushAllNext(next) {
          var parentNext = next.parent;
          if (parentNext !== null) {
            pushAllNext(parentNext);
          }
          pushNode(next);
        }
        function popPreviousToCommonLevel(prev, next) {
          popNode(prev);
          var parentPrev = prev.parent;
          if (parentPrev === null) {
            throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
          }
          if (parentPrev.depth === next.depth) {
            popToNearestCommonAncestor(parentPrev, next);
          } else {
            popPreviousToCommonLevel(parentPrev, next);
          }
        }
        function popNextToCommonLevel(prev, next) {
          var parentNext = next.parent;
          if (parentNext === null) {
            throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
          }
          if (prev.depth === parentNext.depth) {
            popToNearestCommonAncestor(prev, parentNext);
          } else {
            popNextToCommonLevel(prev, parentNext);
          }
          pushNode(next);
        }
        function switchContext(newSnapshot) {
          var prev = currentActiveSnapshot;
          var next = newSnapshot;
          if (prev !== next) {
            if (prev === null) {
              pushAllNext(next);
            } else if (next === null) {
              popAllPrevious(prev);
            } else if (prev.depth === next.depth) {
              popToNearestCommonAncestor(prev, next);
            } else if (prev.depth > next.depth) {
              popPreviousToCommonLevel(prev, next);
            } else {
              popNextToCommonLevel(prev, next);
            }
            currentActiveSnapshot = next;
          }
        }
        function pushProvider(context, nextValue) {
          var prevValue;
          {
            prevValue = context._currentValue2;
            context._currentValue2 = nextValue;
            {
              if (context._currentRenderer2 !== void 0 && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil) {
                error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
              }
              context._currentRenderer2 = rendererSigil;
            }
          }
          var prevNode = currentActiveSnapshot;
          var newNode = {
            parent: prevNode,
            depth: prevNode === null ? 0 : prevNode.depth + 1,
            context,
            parentValue: prevValue,
            value: nextValue
          };
          currentActiveSnapshot = newNode;
          return newNode;
        }
        function popProvider(context) {
          var prevSnapshot = currentActiveSnapshot;
          if (prevSnapshot === null) {
            throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
          }
          {
            if (prevSnapshot.context !== context) {
              error("The parent context is not the expected context. This is probably a bug in React.");
            }
          }
          {
            var _value = prevSnapshot.parentValue;
            if (_value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED) {
              prevSnapshot.context._currentValue2 = prevSnapshot.context._defaultValue;
            } else {
              prevSnapshot.context._currentValue2 = _value;
            }
            {
              if (context._currentRenderer2 !== void 0 && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil) {
                error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
              }
              context._currentRenderer2 = rendererSigil;
            }
          }
          return currentActiveSnapshot = prevSnapshot.parent;
        }
        function getActiveContext() {
          return currentActiveSnapshot;
        }
        function readContext(context) {
          var value = context._currentValue2;
          return value;
        }
        function get(key) {
          return key._reactInternals;
        }
        function set(key, value) {
          key._reactInternals = value;
        }
        var didWarnAboutNoopUpdateForComponent = {};
        var didWarnAboutDeprecatedWillMount = {};
        var didWarnAboutUninitializedState;
        var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate;
        var didWarnAboutLegacyLifecyclesAndDerivedState;
        var didWarnAboutUndefinedDerivedState;
        var warnOnUndefinedDerivedState;
        var warnOnInvalidCallback;
        var didWarnAboutDirectlyAssigningPropsToState;
        var didWarnAboutContextTypeAndContextTypes;
        var didWarnAboutInvalidateContextType;
        {
          didWarnAboutUninitializedState = /* @__PURE__ */ new Set();
          didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = /* @__PURE__ */ new Set();
          didWarnAboutLegacyLifecyclesAndDerivedState = /* @__PURE__ */ new Set();
          didWarnAboutDirectlyAssigningPropsToState = /* @__PURE__ */ new Set();
          didWarnAboutUndefinedDerivedState = /* @__PURE__ */ new Set();
          didWarnAboutContextTypeAndContextTypes = /* @__PURE__ */ new Set();
          didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
          var didWarnOnInvalidCallback = /* @__PURE__ */ new Set();
          warnOnInvalidCallback = function(callback, callerName) {
            if (callback === null || typeof callback === "function") {
              return;
            }
            var key = callerName + "_" + callback;
            if (!didWarnOnInvalidCallback.has(key)) {
              didWarnOnInvalidCallback.add(key);
              error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback);
            }
          };
          warnOnUndefinedDerivedState = function(type, partialState) {
            if (partialState === void 0) {
              var componentName = getComponentNameFromType(type) || "Component";
              if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
                didWarnAboutUndefinedDerivedState.add(componentName);
                error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName);
              }
            }
          };
        }
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && getComponentNameFromType(_constructor) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnAboutNoopUpdateForComponent[warningKey]) {
              return;
            }
            error("%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.\n\nPlease check the code for the %s component.", callerName, callerName, componentName);
            didWarnAboutNoopUpdateForComponent[warningKey] = true;
          }
        }
        var classComponentUpdater = {
          isMounted: function(inst) {
            return false;
          },
          enqueueSetState: function(inst, payload, callback) {
            var internals = get(inst);
            if (internals.queue === null) {
              warnNoop(inst, "setState");
            } else {
              internals.queue.push(payload);
              {
                if (callback !== void 0 && callback !== null) {
                  warnOnInvalidCallback(callback, "setState");
                }
              }
            }
          },
          enqueueReplaceState: function(inst, payload, callback) {
            var internals = get(inst);
            internals.replace = true;
            internals.queue = [payload];
            {
              if (callback !== void 0 && callback !== null) {
                warnOnInvalidCallback(callback, "setState");
              }
            }
          },
          enqueueForceUpdate: function(inst, callback) {
            var internals = get(inst);
            if (internals.queue === null) {
              warnNoop(inst, "forceUpdate");
            } else {
              {
                if (callback !== void 0 && callback !== null) {
                  warnOnInvalidCallback(callback, "setState");
                }
              }
            }
          }
        };
        function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
          var partialState = getDerivedStateFromProps(nextProps, prevState);
          {
            warnOnUndefinedDerivedState(ctor, partialState);
          }
          var newState = partialState === null || partialState === void 0 ? prevState : assign({}, prevState, partialState);
          return newState;
        }
        function constructClassInstance(ctor, props, maskedLegacyContext) {
          var context = emptyContextObject;
          var contextType = ctor.contextType;
          {
            if ("contextType" in ctor) {
              var isValid = (
                // Allow null for conditional declaration
                contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0
              );
              if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
                didWarnAboutInvalidateContextType.add(ctor);
                var addendum = "";
                if (contextType === void 0) {
                  addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
                } else if (typeof contextType !== "object") {
                  addendum = " However, it is set to a " + typeof contextType + ".";
                } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                  addendum = " Did you accidentally pass the Context.Provider instead?";
                } else if (contextType._context !== void 0) {
                  addendum = " Did you accidentally pass the Context.Consumer instead?";
                } else {
                  addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.";
                }
                error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(ctor) || "Component", addendum);
              }
            }
          }
          if (typeof contextType === "object" && contextType !== null) {
            context = readContext(contextType);
          } else {
            context = maskedLegacyContext;
          }
          var instance = new ctor(props, context);
          {
            if (typeof ctor.getDerivedStateFromProps === "function" && (instance.state === null || instance.state === void 0)) {
              var componentName = getComponentNameFromType(ctor) || "Component";
              if (!didWarnAboutUninitializedState.has(componentName)) {
                didWarnAboutUninitializedState.add(componentName);
                error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName);
              }
            }
            if (typeof ctor.getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function") {
              var foundWillMountName = null;
              var foundWillReceivePropsName = null;
              var foundWillUpdateName = null;
              if (typeof instance.componentWillMount === "function" && instance.componentWillMount.__suppressDeprecationWarning !== true) {
                foundWillMountName = "componentWillMount";
              } else if (typeof instance.UNSAFE_componentWillMount === "function") {
                foundWillMountName = "UNSAFE_componentWillMount";
              }
              if (typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
                foundWillReceivePropsName = "componentWillReceiveProps";
              } else if (typeof instance.UNSAFE_componentWillReceiveProps === "function") {
                foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
              }
              if (typeof instance.componentWillUpdate === "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
                foundWillUpdateName = "componentWillUpdate";
              } else if (typeof instance.UNSAFE_componentWillUpdate === "function") {
                foundWillUpdateName = "UNSAFE_componentWillUpdate";
              }
              if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
                var _componentName = getComponentNameFromType(ctor) || "Component";
                var newApiName = typeof ctor.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
                if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
                  didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
                  error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles", _componentName, newApiName, foundWillMountName !== null ? "\n  " + foundWillMountName : "", foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "", foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "");
                }
              }
            }
          }
          return instance;
        }
        function checkClassInstance(instance, ctor, newProps) {
          {
            var name = getComponentNameFromType(ctor) || "Component";
            var renderPresent = instance.render;
            if (!renderPresent) {
              if (ctor.prototype && typeof ctor.prototype.render === "function") {
                error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name);
              } else {
                error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name);
              }
            }
            if (instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state) {
              error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name);
            }
            if (instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name);
            }
            if (instance.propTypes) {
              error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name);
            }
            if (instance.contextType) {
              error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name);
            }
            {
              if (instance.contextTypes) {
                error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name);
              }
              if (ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor)) {
                didWarnAboutContextTypeAndContextTypes.add(ctor);
                error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name);
              }
            }
            if (typeof instance.componentShouldUpdate === "function") {
              error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name);
            }
            if (ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== "undefined") {
              error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(ctor) || "A pure component");
            }
            if (typeof instance.componentDidUnmount === "function") {
              error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name);
            }
            if (typeof instance.componentDidReceiveProps === "function") {
              error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name);
            }
            if (typeof instance.componentWillRecieveProps === "function") {
              error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name);
            }
            if (typeof instance.UNSAFE_componentWillRecieveProps === "function") {
              error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
            }
            var hasMutatedProps = instance.props !== newProps;
            if (instance.props !== void 0 && hasMutatedProps) {
              error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name);
            }
            if (instance.defaultProps) {
              error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name);
            }
            if (typeof instance.getSnapshotBeforeUpdate === "function" && typeof instance.componentDidUpdate !== "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)) {
              didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);
              error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(ctor));
            }
            if (typeof instance.getDerivedStateFromProps === "function") {
              error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
            }
            if (typeof instance.getDerivedStateFromError === "function") {
              error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
            }
            if (typeof ctor.getSnapshotBeforeUpdate === "function") {
              error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
            }
            var _state = instance.state;
            if (_state && (typeof _state !== "object" || isArray(_state))) {
              error("%s.state: must be set to an object or null", name);
            }
            if (typeof instance.getChildContext === "function" && typeof ctor.childContextTypes !== "object") {
              error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
            }
          }
        }
        function callComponentWillMount(type, instance) {
          var oldState = instance.state;
          if (typeof instance.componentWillMount === "function") {
            {
              if (instance.componentWillMount.__suppressDeprecationWarning !== true) {
                var componentName = getComponentNameFromType(type) || "Unknown";
                if (!didWarnAboutDeprecatedWillMount[componentName]) {
                  warn(
                    // keep this warning in sync with ReactStrictModeWarning.js
                    "componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s",
                    componentName
                  );
                  didWarnAboutDeprecatedWillMount[componentName] = true;
                }
              }
            }
            instance.componentWillMount();
          }
          if (typeof instance.UNSAFE_componentWillMount === "function") {
            instance.UNSAFE_componentWillMount();
          }
          if (oldState !== instance.state) {
            {
              error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromType(type) || "Component");
            }
            classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
          }
        }
        function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
          if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
            var oldQueue = internalInstance.queue;
            var oldReplace = internalInstance.replace;
            internalInstance.queue = null;
            internalInstance.replace = false;
            if (oldReplace && oldQueue.length === 1) {
              inst.state = oldQueue[0];
            } else {
              var nextState = oldReplace ? oldQueue[0] : inst.state;
              var dontMutate = true;
              for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
                var partial = oldQueue[i];
                var partialState = typeof partial === "function" ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;
                if (partialState != null) {
                  if (dontMutate) {
                    dontMutate = false;
                    nextState = assign({}, nextState, partialState);
                  } else {
                    assign(nextState, partialState);
                  }
                }
              }
              inst.state = nextState;
            }
          } else {
            internalInstance.queue = null;
          }
        }
        function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {
          {
            checkClassInstance(instance, ctor, newProps);
          }
          var initialState = instance.state !== void 0 ? instance.state : null;
          instance.updater = classComponentUpdater;
          instance.props = newProps;
          instance.state = initialState;
          var internalInstance = {
            queue: [],
            replace: false
          };
          set(instance, internalInstance);
          var contextType = ctor.contextType;
          if (typeof contextType === "object" && contextType !== null) {
            instance.context = readContext(contextType);
          } else {
            instance.context = maskedLegacyContext;
          }
          {
            if (instance.state === newProps) {
              var componentName = getComponentNameFromType(ctor) || "Component";
              if (!didWarnAboutDirectlyAssigningPropsToState.has(componentName)) {
                didWarnAboutDirectlyAssigningPropsToState.add(componentName);
                error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName);
              }
            }
          }
          var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
          if (typeof getDerivedStateFromProps === "function") {
            instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps);
          }
          if (typeof ctor.getDerivedStateFromProps !== "function" && typeof instance.getSnapshotBeforeUpdate !== "function" && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
            callComponentWillMount(ctor, instance);
            processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext);
          }
        }
        var emptyTreeContext = {
          id: 1,
          overflow: ""
        };
        function getTreeId(context) {
          var overflow = context.overflow;
          var idWithLeadingBit = context.id;
          var id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
          return id.toString(32) + overflow;
        }
        function pushTreeContext(baseContext, totalChildren, index) {
          var baseIdWithLeadingBit = baseContext.id;
          var baseOverflow = baseContext.overflow;
          var baseLength = getBitLength(baseIdWithLeadingBit) - 1;
          var baseId = baseIdWithLeadingBit & ~(1 << baseLength);
          var slot = index + 1;
          var length = getBitLength(totalChildren) + baseLength;
          if (length > 30) {
            var numberOfOverflowBits = baseLength - baseLength % 5;
            var newOverflowBits = (1 << numberOfOverflowBits) - 1;
            var newOverflow = (baseId & newOverflowBits).toString(32);
            var restOfBaseId = baseId >> numberOfOverflowBits;
            var restOfBaseLength = baseLength - numberOfOverflowBits;
            var restOfLength = getBitLength(totalChildren) + restOfBaseLength;
            var restOfNewBits = slot << restOfBaseLength;
            var id = restOfNewBits | restOfBaseId;
            var overflow = newOverflow + baseOverflow;
            return {
              id: 1 << restOfLength | id,
              overflow
            };
          } else {
            var newBits = slot << baseLength;
            var _id = newBits | baseId;
            var _overflow = baseOverflow;
            return {
              id: 1 << length | _id,
              overflow: _overflow
            };
          }
        }
        function getBitLength(number) {
          return 32 - clz32(number);
        }
        function getLeadingBit(id) {
          return 1 << getBitLength(id) - 1;
        }
        var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
        var log = Math.log;
        var LN2 = Math.LN2;
        function clz32Fallback(x) {
          var asUint = x >>> 0;
          if (asUint === 0) {
            return 32;
          }
          return 31 - (log(asUint) / LN2 | 0) | 0;
        }
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var currentlyRenderingComponent = null;
        var currentlyRenderingTask = null;
        var firstWorkInProgressHook = null;
        var workInProgressHook = null;
        var isReRender = false;
        var didScheduleRenderPhaseUpdate = false;
        var localIdCounter = 0;
        var renderPhaseUpdates = null;
        var numberOfReRenders = 0;
        var RE_RENDER_LIMIT = 25;
        var isInHookUserCodeInDev = false;
        var currentHookNameInDev;
        function resolveCurrentlyRenderingComponent() {
          if (currentlyRenderingComponent === null) {
            throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
          }
          {
            if (isInHookUserCodeInDev) {
              error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
            }
          }
          return currentlyRenderingComponent;
        }
        function areHookInputsEqual(nextDeps, prevDeps) {
          if (prevDeps === null) {
            {
              error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
            }
            return false;
          }
          {
            if (nextDeps.length !== prevDeps.length) {
              error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
            }
          }
          for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
            if (objectIs(nextDeps[i], prevDeps[i])) {
              continue;
            }
            return false;
          }
          return true;
        }
        function createHook() {
          if (numberOfReRenders > 0) {
            throw new Error("Rendered more hooks than during the previous render");
          }
          return {
            memoizedState: null,
            queue: null,
            next: null
          };
        }
        function createWorkInProgressHook() {
          if (workInProgressHook === null) {
            if (firstWorkInProgressHook === null) {
              isReRender = false;
              firstWorkInProgressHook = workInProgressHook = createHook();
            } else {
              isReRender = true;
              workInProgressHook = firstWorkInProgressHook;
            }
          } else {
            if (workInProgressHook.next === null) {
              isReRender = false;
              workInProgressHook = workInProgressHook.next = createHook();
            } else {
              isReRender = true;
              workInProgressHook = workInProgressHook.next;
            }
          }
          return workInProgressHook;
        }
        function prepareToUseHooks(task, componentIdentity) {
          currentlyRenderingComponent = componentIdentity;
          currentlyRenderingTask = task;
          {
            isInHookUserCodeInDev = false;
          }
          localIdCounter = 0;
        }
        function finishHooks(Component, props, children, refOrContext) {
          while (didScheduleRenderPhaseUpdate) {
            didScheduleRenderPhaseUpdate = false;
            localIdCounter = 0;
            numberOfReRenders += 1;
            workInProgressHook = null;
            children = Component(props, refOrContext);
          }
          resetHooksState();
          return children;
        }
        function checkDidRenderIdHook() {
          var didRenderIdHook = localIdCounter !== 0;
          return didRenderIdHook;
        }
        function resetHooksState() {
          {
            isInHookUserCodeInDev = false;
          }
          currentlyRenderingComponent = null;
          currentlyRenderingTask = null;
          didScheduleRenderPhaseUpdate = false;
          firstWorkInProgressHook = null;
          numberOfReRenders = 0;
          renderPhaseUpdates = null;
          workInProgressHook = null;
        }
        function readContext$1(context) {
          {
            if (isInHookUserCodeInDev) {
              error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
            }
          }
          return readContext(context);
        }
        function useContext(context) {
          {
            currentHookNameInDev = "useContext";
          }
          resolveCurrentlyRenderingComponent();
          return readContext(context);
        }
        function basicStateReducer(state, action) {
          return typeof action === "function" ? action(state) : action;
        }
        function useState3(initialState) {
          {
            currentHookNameInDev = "useState";
          }
          return useReducer(
            basicStateReducer,
            // useReducer has a special case to support lazy useState initializers
            initialState
          );
        }
        function useReducer(reducer, initialArg, init) {
          {
            if (reducer !== basicStateReducer) {
              currentHookNameInDev = "useReducer";
            }
          }
          currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
          workInProgressHook = createWorkInProgressHook();
          if (isReRender) {
            var queue = workInProgressHook.queue;
            var dispatch = queue.dispatch;
            if (renderPhaseUpdates !== null) {
              var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
              if (firstRenderPhaseUpdate !== void 0) {
                renderPhaseUpdates.delete(queue);
                var newState = workInProgressHook.memoizedState;
                var update = firstRenderPhaseUpdate;
                do {
                  var action = update.action;
                  {
                    isInHookUserCodeInDev = true;
                  }
                  newState = reducer(newState, action);
                  {
                    isInHookUserCodeInDev = false;
                  }
                  update = update.next;
                } while (update !== null);
                workInProgressHook.memoizedState = newState;
                return [newState, dispatch];
              }
            }
            return [workInProgressHook.memoizedState, dispatch];
          } else {
            {
              isInHookUserCodeInDev = true;
            }
            var initialState;
            if (reducer === basicStateReducer) {
              initialState = typeof initialArg === "function" ? initialArg() : initialArg;
            } else {
              initialState = init !== void 0 ? init(initialArg) : initialArg;
            }
            {
              isInHookUserCodeInDev = false;
            }
            workInProgressHook.memoizedState = initialState;
            var _queue = workInProgressHook.queue = {
              last: null,
              dispatch: null
            };
            var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
            return [workInProgressHook.memoizedState, _dispatch];
          }
        }
        function useMemo3(nextCreate, deps) {
          currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
          workInProgressHook = createWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          if (workInProgressHook !== null) {
            var prevState = workInProgressHook.memoizedState;
            if (prevState !== null) {
              if (nextDeps !== null) {
                var prevDeps = prevState[1];
                if (areHookInputsEqual(nextDeps, prevDeps)) {
                  return prevState[0];
                }
              }
            }
          }
          {
            isInHookUserCodeInDev = true;
          }
          var nextValue = nextCreate();
          {
            isInHookUserCodeInDev = false;
          }
          workInProgressHook.memoizedState = [nextValue, nextDeps];
          return nextValue;
        }
        function useRef3(initialValue) {
          currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
          workInProgressHook = createWorkInProgressHook();
          var previousRef = workInProgressHook.memoizedState;
          if (previousRef === null) {
            var ref = {
              current: initialValue
            };
            {
              Object.seal(ref);
            }
            workInProgressHook.memoizedState = ref;
            return ref;
          } else {
            return previousRef;
          }
        }
        function useLayoutEffect(create, inputs) {
          {
            currentHookNameInDev = "useLayoutEffect";
            error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
          }
        }
        function dispatchAction(componentIdentity, queue, action) {
          if (numberOfReRenders >= RE_RENDER_LIMIT) {
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          }
          if (componentIdentity === currentlyRenderingComponent) {
            didScheduleRenderPhaseUpdate = true;
            var update = {
              action,
              next: null
            };
            if (renderPhaseUpdates === null) {
              renderPhaseUpdates = /* @__PURE__ */ new Map();
            }
            var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
            if (firstRenderPhaseUpdate === void 0) {
              renderPhaseUpdates.set(queue, update);
            } else {
              var lastRenderPhaseUpdate = firstRenderPhaseUpdate;
              while (lastRenderPhaseUpdate.next !== null) {
                lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
              }
              lastRenderPhaseUpdate.next = update;
            }
          }
        }
        function useCallback(callback, deps) {
          return useMemo3(function() {
            return callback;
          }, deps);
        }
        function useMutableSource(source, getSnapshot, subscribe) {
          resolveCurrentlyRenderingComponent();
          return getSnapshot(source._source);
        }
        function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          if (getServerSnapshot === void 0) {
            throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
          }
          return getServerSnapshot();
        }
        function useDeferredValue(value) {
          resolveCurrentlyRenderingComponent();
          return value;
        }
        function unsupportedStartTransition() {
          throw new Error("startTransition cannot be called during server rendering.");
        }
        function useTransition() {
          resolveCurrentlyRenderingComponent();
          return [false, unsupportedStartTransition];
        }
        function useId() {
          var task = currentlyRenderingTask;
          var treeId = getTreeId(task.treeContext);
          var responseState = currentResponseState;
          if (responseState === null) {
            throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
          }
          var localId = localIdCounter++;
          return makeId(responseState, treeId, localId);
        }
        function noop() {
        }
        var Dispatcher = {
          readContext: readContext$1,
          useContext,
          useMemo: useMemo3,
          useReducer,
          useRef: useRef3,
          useState: useState3,
          useInsertionEffect: noop,
          useLayoutEffect,
          useCallback,
          // useImperativeHandle is not run in the server environment
          useImperativeHandle: noop,
          // Effects are not run in the server environment.
          useEffect: noop,
          // Debugging effect
          useDebugValue: noop,
          useDeferredValue,
          useTransition,
          useId,
          // Subscriptions are not setup in a server environment.
          useMutableSource,
          useSyncExternalStore
        };
        var currentResponseState = null;
        function setCurrentResponseState(responseState) {
          currentResponseState = responseState;
        }
        function getStackByComponentStackNode(componentStack) {
          try {
            var info = "";
            var node = componentStack;
            do {
              switch (node.tag) {
                case 0:
                  info += describeBuiltInComponentFrame(node.type, null, null);
                  break;
                case 1:
                  info += describeFunctionComponentFrame(node.type, null, null);
                  break;
                case 2:
                  info += describeClassComponentFrame(node.type, null, null);
                  break;
              }
              node = node.parent;
            } while (node);
            return info;
          } catch (x) {
            return "\nError generating stack: " + x.message + "\n" + x.stack;
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        var PENDING = 0;
        var COMPLETED = 1;
        var FLUSHED = 2;
        var ABORTED = 3;
        var ERRORED = 4;
        var OPEN = 0;
        var CLOSING = 1;
        var CLOSED = 2;
        var DEFAULT_PROGRESSIVE_CHUNK_SIZE = 12800;
        function defaultErrorHandler(error2) {
          console["error"](error2);
          return null;
        }
        function noop$1() {
        }
        function createRequest(children, responseState, rootFormatContext, progressiveChunkSize, onError2, onAllReady, onShellReady, onShellError, onFatalError) {
          var pingedTasks = [];
          var abortSet = /* @__PURE__ */ new Set();
          var request = {
            destination: null,
            responseState,
            progressiveChunkSize: progressiveChunkSize === void 0 ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
            status: OPEN,
            fatalError: null,
            nextSegmentId: 0,
            allPendingTasks: 0,
            pendingRootTasks: 0,
            completedRootSegment: null,
            abortableTasks: abortSet,
            pingedTasks,
            clientRenderedBoundaries: [],
            completedBoundaries: [],
            partialBoundaries: [],
            onError: onError2 === void 0 ? defaultErrorHandler : onError2,
            onAllReady: onAllReady === void 0 ? noop$1 : onAllReady,
            onShellReady: onShellReady === void 0 ? noop$1 : onShellReady,
            onShellError: onShellError === void 0 ? noop$1 : onShellError,
            onFatalError: onFatalError === void 0 ? noop$1 : onFatalError
          };
          var rootSegment = createPendingSegment(
            request,
            0,
            null,
            rootFormatContext,
            // Root segments are never embedded in Text on either edge
            false,
            false
          );
          rootSegment.parentFlushed = true;
          var rootTask = createTask(request, children, null, rootSegment, abortSet, emptyContextObject, rootContextSnapshot, emptyTreeContext);
          pingedTasks.push(rootTask);
          return request;
        }
        function pingTask(request, task) {
          var pingedTasks = request.pingedTasks;
          pingedTasks.push(task);
          if (pingedTasks.length === 1) {
            scheduleWork(function() {
              return performWork(request);
            });
          }
        }
        function createSuspenseBoundary(request, fallbackAbortableTasks) {
          return {
            id: UNINITIALIZED_SUSPENSE_BOUNDARY_ID,
            rootSegmentID: -1,
            parentFlushed: false,
            pendingTasks: 0,
            forceClientRender: false,
            completedSegments: [],
            byteSize: 0,
            fallbackAbortableTasks,
            errorDigest: null
          };
        }
        function createTask(request, node, blockedBoundary, blockedSegment, abortSet, legacyContext, context, treeContext) {
          request.allPendingTasks++;
          if (blockedBoundary === null) {
            request.pendingRootTasks++;
          } else {
            blockedBoundary.pendingTasks++;
          }
          var task = {
            node,
            ping: function() {
              return pingTask(request, task);
            },
            blockedBoundary,
            blockedSegment,
            abortSet,
            legacyContext,
            context,
            treeContext
          };
          {
            task.componentStack = null;
          }
          abortSet.add(task);
          return task;
        }
        function createPendingSegment(request, index, boundary, formatContext, lastPushedText, textEmbedded) {
          return {
            status: PENDING,
            id: -1,
            // lazily assigned later
            index,
            parentFlushed: false,
            chunks: [],
            children: [],
            formatContext,
            boundary,
            lastPushedText,
            textEmbedded
          };
        }
        var currentTaskInDEV = null;
        function getCurrentStackInDEV() {
          {
            if (currentTaskInDEV === null || currentTaskInDEV.componentStack === null) {
              return "";
            }
            return getStackByComponentStackNode(currentTaskInDEV.componentStack);
          }
        }
        function pushBuiltInComponentStackInDEV(task, type) {
          {
            task.componentStack = {
              tag: 0,
              parent: task.componentStack,
              type
            };
          }
        }
        function pushFunctionComponentStackInDEV(task, type) {
          {
            task.componentStack = {
              tag: 1,
              parent: task.componentStack,
              type
            };
          }
        }
        function pushClassComponentStackInDEV(task, type) {
          {
            task.componentStack = {
              tag: 2,
              parent: task.componentStack,
              type
            };
          }
        }
        function popComponentStackInDEV(task) {
          {
            if (task.componentStack === null) {
              error("Unexpectedly popped too many stack frames. This is a bug in React.");
            } else {
              task.componentStack = task.componentStack.parent;
            }
          }
        }
        var lastBoundaryErrorComponentStackDev = null;
        function captureBoundaryErrorDetailsDev(boundary, error2) {
          {
            var errorMessage;
            if (typeof error2 === "string") {
              errorMessage = error2;
            } else if (error2 && typeof error2.message === "string") {
              errorMessage = error2.message;
            } else {
              errorMessage = String(error2);
            }
            var errorComponentStack = lastBoundaryErrorComponentStackDev || getCurrentStackInDEV();
            lastBoundaryErrorComponentStackDev = null;
            boundary.errorMessage = errorMessage;
            boundary.errorComponentStack = errorComponentStack;
          }
        }
        function logRecoverableError(request, error2) {
          var errorDigest = request.onError(error2);
          if (errorDigest != null && typeof errorDigest !== "string") {
            throw new Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof errorDigest + '" instead');
          }
          return errorDigest;
        }
        function fatalError(request, error2) {
          var onShellError = request.onShellError;
          onShellError(error2);
          var onFatalError = request.onFatalError;
          onFatalError(error2);
          if (request.destination !== null) {
            request.status = CLOSED;
            closeWithError(request.destination, error2);
          } else {
            request.status = CLOSING;
            request.fatalError = error2;
          }
        }
        function renderSuspenseBoundary(request, task, props) {
          pushBuiltInComponentStackInDEV(task, "Suspense");
          var parentBoundary = task.blockedBoundary;
          var parentSegment = task.blockedSegment;
          var fallback = props.fallback;
          var content = props.children;
          var fallbackAbortSet = /* @__PURE__ */ new Set();
          var newBoundary = createSuspenseBoundary(request, fallbackAbortSet);
          var insertionIndex = parentSegment.chunks.length;
          var boundarySegment = createPendingSegment(
            request,
            insertionIndex,
            newBoundary,
            parentSegment.formatContext,
            // boundaries never require text embedding at their edges because comment nodes bound them
            false,
            false
          );
          parentSegment.children.push(boundarySegment);
          parentSegment.lastPushedText = false;
          var contentRootSegment = createPendingSegment(
            request,
            0,
            null,
            parentSegment.formatContext,
            // boundaries never require text embedding at their edges because comment nodes bound them
            false,
            false
          );
          contentRootSegment.parentFlushed = true;
          task.blockedBoundary = newBoundary;
          task.blockedSegment = contentRootSegment;
          try {
            renderNode(request, task, content);
            pushSegmentFinale$1(contentRootSegment.chunks, request.responseState, contentRootSegment.lastPushedText, contentRootSegment.textEmbedded);
            contentRootSegment.status = COMPLETED;
            queueCompletedSegment(newBoundary, contentRootSegment);
            if (newBoundary.pendingTasks === 0) {
              popComponentStackInDEV(task);
              return;
            }
          } catch (error2) {
            contentRootSegment.status = ERRORED;
            newBoundary.forceClientRender = true;
            newBoundary.errorDigest = logRecoverableError(request, error2);
            {
              captureBoundaryErrorDetailsDev(newBoundary, error2);
            }
          } finally {
            task.blockedBoundary = parentBoundary;
            task.blockedSegment = parentSegment;
          }
          var suspendedFallbackTask = createTask(request, fallback, parentBoundary, boundarySegment, fallbackAbortSet, task.legacyContext, task.context, task.treeContext);
          {
            suspendedFallbackTask.componentStack = task.componentStack;
          }
          request.pingedTasks.push(suspendedFallbackTask);
          popComponentStackInDEV(task);
        }
        function renderHostElement(request, task, type, props) {
          pushBuiltInComponentStackInDEV(task, type);
          var segment = task.blockedSegment;
          var children = pushStartInstance(segment.chunks, type, props, request.responseState, segment.formatContext);
          segment.lastPushedText = false;
          var prevContext = segment.formatContext;
          segment.formatContext = getChildFormatContext(prevContext, type, props);
          renderNode(request, task, children);
          segment.formatContext = prevContext;
          pushEndInstance(segment.chunks, type);
          segment.lastPushedText = false;
          popComponentStackInDEV(task);
        }
        function shouldConstruct$1(Component) {
          return Component.prototype && Component.prototype.isReactComponent;
        }
        function renderWithHooks(request, task, Component, props, secondArg) {
          var componentIdentity = {};
          prepareToUseHooks(task, componentIdentity);
          var result = Component(props, secondArg);
          return finishHooks(Component, props, result, secondArg);
        }
        function finishClassComponent(request, task, instance, Component, props) {
          var nextChildren = instance.render();
          {
            if (instance.props !== props) {
              if (!didWarnAboutReassigningProps) {
                error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromType(Component) || "a component");
              }
              didWarnAboutReassigningProps = true;
            }
          }
          {
            var childContextTypes = Component.childContextTypes;
            if (childContextTypes !== null && childContextTypes !== void 0) {
              var previousContext = task.legacyContext;
              var mergedContext = processChildContext(instance, Component, previousContext, childContextTypes);
              task.legacyContext = mergedContext;
              renderNodeDestructive(request, task, nextChildren);
              task.legacyContext = previousContext;
              return;
            }
          }
          renderNodeDestructive(request, task, nextChildren);
        }
        function renderClassComponent(request, task, Component, props) {
          pushClassComponentStackInDEV(task, Component);
          var maskedContext = getMaskedContext(Component, task.legacyContext);
          var instance = constructClassInstance(Component, props, maskedContext);
          mountClassInstance(instance, Component, props, maskedContext);
          finishClassComponent(request, task, instance, Component, props);
          popComponentStackInDEV(task);
        }
        var didWarnAboutBadClass = {};
        var didWarnAboutModulePatternComponent = {};
        var didWarnAboutContextTypeOnFunctionComponent = {};
        var didWarnAboutGetDerivedStateOnFunctionComponent = {};
        var didWarnAboutReassigningProps = false;
        var didWarnAboutDefaultPropsOnFunctionComponent = {};
        var didWarnAboutGenerators = false;
        var didWarnAboutMaps = false;
        var hasWarnedAboutUsingContextAsConsumer = false;
        function renderIndeterminateComponent(request, task, Component, props) {
          var legacyContext;
          {
            legacyContext = getMaskedContext(Component, task.legacyContext);
          }
          pushFunctionComponentStackInDEV(task, Component);
          {
            if (Component.prototype && typeof Component.prototype.render === "function") {
              var componentName = getComponentNameFromType(Component) || "Unknown";
              if (!didWarnAboutBadClass[componentName]) {
                error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName);
                didWarnAboutBadClass[componentName] = true;
              }
            }
          }
          var value = renderWithHooks(request, task, Component, props, legacyContext);
          var hasId = checkDidRenderIdHook();
          {
            if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
              var _componentName = getComponentNameFromType(Component) || "Unknown";
              if (!didWarnAboutModulePatternComponent[_componentName]) {
                error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName);
                didWarnAboutModulePatternComponent[_componentName] = true;
              }
            }
          }
          if (
            // Run these checks in production only if the flag is off.
            // Eventually we'll delete this branch altogether.
            typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0
          ) {
            {
              var _componentName2 = getComponentNameFromType(Component) || "Unknown";
              if (!didWarnAboutModulePatternComponent[_componentName2]) {
                error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName2, _componentName2, _componentName2);
                didWarnAboutModulePatternComponent[_componentName2] = true;
              }
            }
            mountClassInstance(value, Component, props, legacyContext);
            finishClassComponent(request, task, value, Component, props);
          } else {
            {
              validateFunctionComponentInDev(Component);
            }
            if (hasId) {
              var prevTreeContext = task.treeContext;
              var totalChildren = 1;
              var index = 0;
              task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
              try {
                renderNodeDestructive(request, task, value);
              } finally {
                task.treeContext = prevTreeContext;
              }
            } else {
              renderNodeDestructive(request, task, value);
            }
          }
          popComponentStackInDEV(task);
        }
        function validateFunctionComponentInDev(Component) {
          {
            if (Component) {
              if (Component.childContextTypes) {
                error("%s(...): childContextTypes cannot be defined on a function component.", Component.displayName || Component.name || "Component");
              }
            }
            if (Component.defaultProps !== void 0) {
              var componentName = getComponentNameFromType(Component) || "Unknown";
              if (!didWarnAboutDefaultPropsOnFunctionComponent[componentName]) {
                error("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", componentName);
                didWarnAboutDefaultPropsOnFunctionComponent[componentName] = true;
              }
            }
            if (typeof Component.getDerivedStateFromProps === "function") {
              var _componentName3 = getComponentNameFromType(Component) || "Unknown";
              if (!didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3]) {
                error("%s: Function components do not support getDerivedStateFromProps.", _componentName3);
                didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = true;
              }
            }
            if (typeof Component.contextType === "object" && Component.contextType !== null) {
              var _componentName4 = getComponentNameFromType(Component) || "Unknown";
              if (!didWarnAboutContextTypeOnFunctionComponent[_componentName4]) {
                error("%s: Function components do not support contextType.", _componentName4);
                didWarnAboutContextTypeOnFunctionComponent[_componentName4] = true;
              }
            }
          }
        }
        function resolveDefaultProps(Component, baseProps) {
          if (Component && Component.defaultProps) {
            var props = assign({}, baseProps);
            var defaultProps = Component.defaultProps;
            for (var propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
            return props;
          }
          return baseProps;
        }
        function renderForwardRef(request, task, type, props, ref) {
          pushFunctionComponentStackInDEV(task, type.render);
          var children = renderWithHooks(request, task, type.render, props, ref);
          var hasId = checkDidRenderIdHook();
          if (hasId) {
            var prevTreeContext = task.treeContext;
            var totalChildren = 1;
            var index = 0;
            task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
            try {
              renderNodeDestructive(request, task, children);
            } finally {
              task.treeContext = prevTreeContext;
            }
          } else {
            renderNodeDestructive(request, task, children);
          }
          popComponentStackInDEV(task);
        }
        function renderMemo(request, task, type, props, ref) {
          var innerType = type.type;
          var resolvedProps = resolveDefaultProps(innerType, props);
          renderElement(request, task, innerType, resolvedProps, ref);
        }
        function renderContextConsumer(request, task, context, props) {
          {
            if (context._context === void 0) {
              if (context !== context.Consumer) {
                if (!hasWarnedAboutUsingContextAsConsumer) {
                  hasWarnedAboutUsingContextAsConsumer = true;
                  error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                }
              }
            } else {
              context = context._context;
            }
          }
          var render = props.children;
          {
            if (typeof render !== "function") {
              error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
            }
          }
          var newValue = readContext(context);
          var newChildren = render(newValue);
          renderNodeDestructive(request, task, newChildren);
        }
        function renderContextProvider(request, task, type, props) {
          var context = type._context;
          var value = props.value;
          var children = props.children;
          var prevSnapshot;
          {
            prevSnapshot = task.context;
          }
          task.context = pushProvider(context, value);
          renderNodeDestructive(request, task, children);
          task.context = popProvider(context);
          {
            if (prevSnapshot !== task.context) {
              error("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
            }
          }
        }
        function renderLazyComponent(request, task, lazyComponent, props, ref) {
          pushBuiltInComponentStackInDEV(task, "Lazy");
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;
          var Component = init(payload);
          var resolvedProps = resolveDefaultProps(Component, props);
          renderElement(request, task, Component, resolvedProps, ref);
          popComponentStackInDEV(task);
        }
        function renderElement(request, task, type, props, ref) {
          if (typeof type === "function") {
            if (shouldConstruct$1(type)) {
              renderClassComponent(request, task, type, props);
              return;
            } else {
              renderIndeterminateComponent(request, task, type, props);
              return;
            }
          }
          if (typeof type === "string") {
            renderHostElement(request, task, type, props);
            return;
          }
          switch (type) {
            // TODO: LegacyHidden acts the same as a fragment. This only works
            // because we currently assume that every instance of LegacyHidden is
            // accompanied by a host component wrapper. In the hidden mode, the host
            // component is given a `hidden` attribute, which ensures that the
            // initial HTML is not visible. To support the use of LegacyHidden as a
            // true fragment, without an extra DOM node, we would have to hide the
            // initial HTML in some other way.
            // TODO: Add REACT_OFFSCREEN_TYPE here too with the same capability.
            case REACT_LEGACY_HIDDEN_TYPE:
            case REACT_DEBUG_TRACING_MODE_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_FRAGMENT_TYPE: {
              renderNodeDestructive(request, task, props.children);
              return;
            }
            case REACT_SUSPENSE_LIST_TYPE: {
              pushBuiltInComponentStackInDEV(task, "SuspenseList");
              renderNodeDestructive(request, task, props.children);
              popComponentStackInDEV(task);
              return;
            }
            case REACT_SCOPE_TYPE: {
              throw new Error("ReactDOMServer does not yet support scope components.");
            }
            // eslint-disable-next-line-no-fallthrough
            case REACT_SUSPENSE_TYPE: {
              {
                renderSuspenseBoundary(request, task, props);
              }
              return;
            }
          }
          if (typeof type === "object" && type !== null) {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE: {
                renderForwardRef(request, task, type, props, ref);
                return;
              }
              case REACT_MEMO_TYPE: {
                renderMemo(request, task, type, props, ref);
                return;
              }
              case REACT_PROVIDER_TYPE: {
                renderContextProvider(request, task, type, props);
                return;
              }
              case REACT_CONTEXT_TYPE: {
                renderContextConsumer(request, task, type, props);
                return;
              }
              case REACT_LAZY_TYPE: {
                renderLazyComponent(request, task, type, props);
                return;
              }
            }
          }
          var info = "";
          {
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (type == null ? type : typeof type) + "." + info));
        }
        function validateIterable(iterable, iteratorFn) {
          {
            if (typeof Symbol === "function" && // $FlowFixMe Flow doesn't know about toStringTag
            iterable[Symbol.toStringTag] === "Generator") {
              if (!didWarnAboutGenerators) {
                error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
              }
              didWarnAboutGenerators = true;
            }
            if (iterable.entries === iteratorFn) {
              if (!didWarnAboutMaps) {
                error("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
              }
              didWarnAboutMaps = true;
            }
          }
        }
        function renderNodeDestructive(request, task, node) {
          {
            try {
              return renderNodeDestructiveImpl(request, task, node);
            } catch (x) {
              if (typeof x === "object" && x !== null && typeof x.then === "function") ;
              else {
                lastBoundaryErrorComponentStackDev = lastBoundaryErrorComponentStackDev !== null ? lastBoundaryErrorComponentStackDev : getCurrentStackInDEV();
              }
              throw x;
            }
          }
        }
        function renderNodeDestructiveImpl(request, task, node) {
          task.node = node;
          if (typeof node === "object" && node !== null) {
            switch (node.$$typeof) {
              case REACT_ELEMENT_TYPE: {
                var element = node;
                var type = element.type;
                var props = element.props;
                var ref = element.ref;
                renderElement(request, task, type, props, ref);
                return;
              }
              case REACT_PORTAL_TYPE:
                throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
              // eslint-disable-next-line-no-fallthrough
              case REACT_LAZY_TYPE: {
                var lazyNode = node;
                var payload = lazyNode._payload;
                var init = lazyNode._init;
                var resolvedNode;
                {
                  try {
                    resolvedNode = init(payload);
                  } catch (x) {
                    if (typeof x === "object" && x !== null && typeof x.then === "function") {
                      pushBuiltInComponentStackInDEV(task, "Lazy");
                    }
                    throw x;
                  }
                }
                renderNodeDestructive(request, task, resolvedNode);
                return;
              }
            }
            if (isArray(node)) {
              renderChildrenArray(request, task, node);
              return;
            }
            var iteratorFn = getIteratorFn(node);
            if (iteratorFn) {
              {
                validateIterable(node, iteratorFn);
              }
              var iterator = iteratorFn.call(node);
              if (iterator) {
                var step = iterator.next();
                if (!step.done) {
                  var children = [];
                  do {
                    children.push(step.value);
                    step = iterator.next();
                  } while (!step.done);
                  renderChildrenArray(request, task, children);
                  return;
                }
                return;
              }
            }
            var childString = Object.prototype.toString.call(node);
            throw new Error("Objects are not valid as a React child (found: " + (childString === "[object Object]" ? "object with keys {" + Object.keys(node).join(", ") + "}" : childString) + "). If you meant to render a collection of children, use an array instead.");
          }
          if (typeof node === "string") {
            var segment = task.blockedSegment;
            segment.lastPushedText = pushTextInstance$1(task.blockedSegment.chunks, node, request.responseState, segment.lastPushedText);
            return;
          }
          if (typeof node === "number") {
            var _segment = task.blockedSegment;
            _segment.lastPushedText = pushTextInstance$1(task.blockedSegment.chunks, "" + node, request.responseState, _segment.lastPushedText);
            return;
          }
          {
            if (typeof node === "function") {
              error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
            }
          }
        }
        function renderChildrenArray(request, task, children) {
          var totalChildren = children.length;
          for (var i = 0; i < totalChildren; i++) {
            var prevTreeContext = task.treeContext;
            task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);
            try {
              renderNode(request, task, children[i]);
            } finally {
              task.treeContext = prevTreeContext;
            }
          }
        }
        function spawnNewSuspendedTask(request, task, x) {
          var segment = task.blockedSegment;
          var insertionIndex = segment.chunks.length;
          var newSegment = createPendingSegment(
            request,
            insertionIndex,
            null,
            segment.formatContext,
            // Adopt the parent segment's leading text embed
            segment.lastPushedText,
            // Assume we are text embedded at the trailing edge
            true
          );
          segment.children.push(newSegment);
          segment.lastPushedText = false;
          var newTask = createTask(request, task.node, task.blockedBoundary, newSegment, task.abortSet, task.legacyContext, task.context, task.treeContext);
          {
            if (task.componentStack !== null) {
              newTask.componentStack = task.componentStack.parent;
            }
          }
          var ping = newTask.ping;
          x.then(ping, ping);
        }
        function renderNode(request, task, node) {
          var previousFormatContext = task.blockedSegment.formatContext;
          var previousLegacyContext = task.legacyContext;
          var previousContext = task.context;
          var previousComponentStack = null;
          {
            previousComponentStack = task.componentStack;
          }
          try {
            return renderNodeDestructive(request, task, node);
          } catch (x) {
            resetHooksState();
            if (typeof x === "object" && x !== null && typeof x.then === "function") {
              spawnNewSuspendedTask(request, task, x);
              task.blockedSegment.formatContext = previousFormatContext;
              task.legacyContext = previousLegacyContext;
              task.context = previousContext;
              switchContext(previousContext);
              {
                task.componentStack = previousComponentStack;
              }
              return;
            } else {
              task.blockedSegment.formatContext = previousFormatContext;
              task.legacyContext = previousLegacyContext;
              task.context = previousContext;
              switchContext(previousContext);
              {
                task.componentStack = previousComponentStack;
              }
              throw x;
            }
          }
        }
        function erroredTask(request, boundary, segment, error2) {
          var errorDigest = logRecoverableError(request, error2);
          if (boundary === null) {
            fatalError(request, error2);
          } else {
            boundary.pendingTasks--;
            if (!boundary.forceClientRender) {
              boundary.forceClientRender = true;
              boundary.errorDigest = errorDigest;
              {
                captureBoundaryErrorDetailsDev(boundary, error2);
              }
              if (boundary.parentFlushed) {
                request.clientRenderedBoundaries.push(boundary);
              }
            }
          }
          request.allPendingTasks--;
          if (request.allPendingTasks === 0) {
            var onAllReady = request.onAllReady;
            onAllReady();
          }
        }
        function abortTaskSoft(task) {
          var request = this;
          var boundary = task.blockedBoundary;
          var segment = task.blockedSegment;
          segment.status = ABORTED;
          finishedTask(request, boundary, segment);
        }
        function abortTask(task, request, reason) {
          var boundary = task.blockedBoundary;
          var segment = task.blockedSegment;
          segment.status = ABORTED;
          if (boundary === null) {
            request.allPendingTasks--;
            if (request.status !== CLOSED) {
              request.status = CLOSED;
              if (request.destination !== null) {
                close(request.destination);
              }
            }
          } else {
            boundary.pendingTasks--;
            if (!boundary.forceClientRender) {
              boundary.forceClientRender = true;
              var _error = reason === void 0 ? new Error("The render was aborted by the server without a reason.") : reason;
              boundary.errorDigest = request.onError(_error);
              {
                var errorPrefix = "The server did not finish this Suspense boundary: ";
                if (_error && typeof _error.message === "string") {
                  _error = errorPrefix + _error.message;
                } else {
                  _error = errorPrefix + String(_error);
                }
                var previousTaskInDev = currentTaskInDEV;
                currentTaskInDEV = task;
                try {
                  captureBoundaryErrorDetailsDev(boundary, _error);
                } finally {
                  currentTaskInDEV = previousTaskInDev;
                }
              }
              if (boundary.parentFlushed) {
                request.clientRenderedBoundaries.push(boundary);
              }
            }
            boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
              return abortTask(fallbackTask, request, reason);
            });
            boundary.fallbackAbortableTasks.clear();
            request.allPendingTasks--;
            if (request.allPendingTasks === 0) {
              var onAllReady = request.onAllReady;
              onAllReady();
            }
          }
        }
        function queueCompletedSegment(boundary, segment) {
          if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null) {
            var childSegment = segment.children[0];
            childSegment.id = segment.id;
            childSegment.parentFlushed = true;
            if (childSegment.status === COMPLETED) {
              queueCompletedSegment(boundary, childSegment);
            }
          } else {
            var completedSegments = boundary.completedSegments;
            completedSegments.push(segment);
          }
        }
        function finishedTask(request, boundary, segment) {
          if (boundary === null) {
            if (segment.parentFlushed) {
              if (request.completedRootSegment !== null) {
                throw new Error("There can only be one root segment. This is a bug in React.");
              }
              request.completedRootSegment = segment;
            }
            request.pendingRootTasks--;
            if (request.pendingRootTasks === 0) {
              request.onShellError = noop$1;
              var onShellReady = request.onShellReady;
              onShellReady();
            }
          } else {
            boundary.pendingTasks--;
            if (boundary.forceClientRender) ;
            else if (boundary.pendingTasks === 0) {
              if (segment.parentFlushed) {
                if (segment.status === COMPLETED) {
                  queueCompletedSegment(boundary, segment);
                }
              }
              if (boundary.parentFlushed) {
                request.completedBoundaries.push(boundary);
              }
              boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request);
              boundary.fallbackAbortableTasks.clear();
            } else {
              if (segment.parentFlushed) {
                if (segment.status === COMPLETED) {
                  queueCompletedSegment(boundary, segment);
                  var completedSegments = boundary.completedSegments;
                  if (completedSegments.length === 1) {
                    if (boundary.parentFlushed) {
                      request.partialBoundaries.push(boundary);
                    }
                  }
                }
              }
            }
          }
          request.allPendingTasks--;
          if (request.allPendingTasks === 0) {
            var onAllReady = request.onAllReady;
            onAllReady();
          }
        }
        function retryTask(request, task) {
          var segment = task.blockedSegment;
          if (segment.status !== PENDING) {
            return;
          }
          switchContext(task.context);
          var prevTaskInDEV = null;
          {
            prevTaskInDEV = currentTaskInDEV;
            currentTaskInDEV = task;
          }
          try {
            renderNodeDestructive(request, task, task.node);
            pushSegmentFinale$1(segment.chunks, request.responseState, segment.lastPushedText, segment.textEmbedded);
            task.abortSet.delete(task);
            segment.status = COMPLETED;
            finishedTask(request, task.blockedBoundary, segment);
          } catch (x) {
            resetHooksState();
            if (typeof x === "object" && x !== null && typeof x.then === "function") {
              var ping = task.ping;
              x.then(ping, ping);
            } else {
              task.abortSet.delete(task);
              segment.status = ERRORED;
              erroredTask(request, task.blockedBoundary, segment, x);
            }
          } finally {
            {
              currentTaskInDEV = prevTaskInDEV;
            }
          }
        }
        function performWork(request) {
          if (request.status === CLOSED) {
            return;
          }
          var prevContext = getActiveContext();
          var prevDispatcher = ReactCurrentDispatcher$1.current;
          ReactCurrentDispatcher$1.current = Dispatcher;
          var prevGetCurrentStackImpl;
          {
            prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
            ReactDebugCurrentFrame$1.getCurrentStack = getCurrentStackInDEV;
          }
          var prevResponseState = currentResponseState;
          setCurrentResponseState(request.responseState);
          try {
            var pingedTasks = request.pingedTasks;
            var i;
            for (i = 0; i < pingedTasks.length; i++) {
              var task = pingedTasks[i];
              retryTask(request, task);
            }
            pingedTasks.splice(0, i);
            if (request.destination !== null) {
              flushCompletedQueues(request, request.destination);
            }
          } catch (error2) {
            logRecoverableError(request, error2);
            fatalError(request, error2);
          } finally {
            setCurrentResponseState(prevResponseState);
            ReactCurrentDispatcher$1.current = prevDispatcher;
            {
              ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
            }
            if (prevDispatcher === Dispatcher) {
              switchContext(prevContext);
            }
          }
        }
        function flushSubtree(request, destination, segment) {
          segment.parentFlushed = true;
          switch (segment.status) {
            case PENDING: {
              var segmentID = segment.id = request.nextSegmentId++;
              segment.lastPushedText = false;
              segment.textEmbedded = false;
              return writePlaceholder(destination, request.responseState, segmentID);
            }
            case COMPLETED: {
              segment.status = FLUSHED;
              var r = true;
              var chunks = segment.chunks;
              var chunkIdx = 0;
              var children = segment.children;
              for (var childIdx = 0; childIdx < children.length; childIdx++) {
                var nextChild = children[childIdx];
                for (; chunkIdx < nextChild.index; chunkIdx++) {
                  writeChunk(destination, chunks[chunkIdx]);
                }
                r = flushSegment(request, destination, nextChild);
              }
              for (; chunkIdx < chunks.length - 1; chunkIdx++) {
                writeChunk(destination, chunks[chunkIdx]);
              }
              if (chunkIdx < chunks.length) {
                r = writeChunkAndReturn(destination, chunks[chunkIdx]);
              }
              return r;
            }
            default: {
              throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
            }
          }
        }
        function flushSegment(request, destination, segment) {
          var boundary = segment.boundary;
          if (boundary === null) {
            return flushSubtree(request, destination, segment);
          }
          boundary.parentFlushed = true;
          if (boundary.forceClientRender) {
            writeStartClientRenderedSuspenseBoundary$1(destination, request.responseState, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
            flushSubtree(request, destination, segment);
            return writeEndClientRenderedSuspenseBoundary$1(destination, request.responseState);
          } else if (boundary.pendingTasks > 0) {
            boundary.rootSegmentID = request.nextSegmentId++;
            if (boundary.completedSegments.length > 0) {
              request.partialBoundaries.push(boundary);
            }
            var id = boundary.id = assignSuspenseBoundaryID(request.responseState);
            writeStartPendingSuspenseBoundary(destination, request.responseState, id);
            flushSubtree(request, destination, segment);
            return writeEndPendingSuspenseBoundary(destination, request.responseState);
          } else if (boundary.byteSize > request.progressiveChunkSize) {
            boundary.rootSegmentID = request.nextSegmentId++;
            request.completedBoundaries.push(boundary);
            writeStartPendingSuspenseBoundary(destination, request.responseState, boundary.id);
            flushSubtree(request, destination, segment);
            return writeEndPendingSuspenseBoundary(destination, request.responseState);
          } else {
            writeStartCompletedSuspenseBoundary$1(destination, request.responseState);
            var completedSegments = boundary.completedSegments;
            if (completedSegments.length !== 1) {
              throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
            }
            var contentSegment = completedSegments[0];
            flushSegment(request, destination, contentSegment);
            return writeEndCompletedSuspenseBoundary$1(destination, request.responseState);
          }
        }
        function flushClientRenderedBoundary(request, destination, boundary) {
          return writeClientRenderBoundaryInstruction(destination, request.responseState, boundary.id, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
        }
        function flushSegmentContainer(request, destination, segment) {
          writeStartSegment(destination, request.responseState, segment.formatContext, segment.id);
          flushSegment(request, destination, segment);
          return writeEndSegment(destination, segment.formatContext);
        }
        function flushCompletedBoundary(request, destination, boundary) {
          var completedSegments = boundary.completedSegments;
          var i = 0;
          for (; i < completedSegments.length; i++) {
            var segment = completedSegments[i];
            flushPartiallyCompletedSegment(request, destination, boundary, segment);
          }
          completedSegments.length = 0;
          return writeCompletedBoundaryInstruction(destination, request.responseState, boundary.id, boundary.rootSegmentID);
        }
        function flushPartialBoundary(request, destination, boundary) {
          var completedSegments = boundary.completedSegments;
          var i = 0;
          for (; i < completedSegments.length; i++) {
            var segment = completedSegments[i];
            if (!flushPartiallyCompletedSegment(request, destination, boundary, segment)) {
              i++;
              completedSegments.splice(0, i);
              return false;
            }
          }
          completedSegments.splice(0, i);
          return true;
        }
        function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
          if (segment.status === FLUSHED) {
            return true;
          }
          var segmentID = segment.id;
          if (segmentID === -1) {
            var rootSegmentID = segment.id = boundary.rootSegmentID;
            if (rootSegmentID === -1) {
              throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
            }
            return flushSegmentContainer(request, destination, segment);
          } else {
            flushSegmentContainer(request, destination, segment);
            return writeCompletedSegmentInstruction(destination, request.responseState, segmentID);
          }
        }
        function flushCompletedQueues(request, destination) {
          try {
            var completedRootSegment = request.completedRootSegment;
            if (completedRootSegment !== null && request.pendingRootTasks === 0) {
              flushSegment(request, destination, completedRootSegment);
              request.completedRootSegment = null;
              writeCompletedRoot(destination, request.responseState);
            }
            var clientRenderedBoundaries = request.clientRenderedBoundaries;
            var i;
            for (i = 0; i < clientRenderedBoundaries.length; i++) {
              var boundary = clientRenderedBoundaries[i];
              if (!flushClientRenderedBoundary(request, destination, boundary)) {
                request.destination = null;
                i++;
                clientRenderedBoundaries.splice(0, i);
                return;
              }
            }
            clientRenderedBoundaries.splice(0, i);
            var completedBoundaries = request.completedBoundaries;
            for (i = 0; i < completedBoundaries.length; i++) {
              var _boundary = completedBoundaries[i];
              if (!flushCompletedBoundary(request, destination, _boundary)) {
                request.destination = null;
                i++;
                completedBoundaries.splice(0, i);
                return;
              }
            }
            completedBoundaries.splice(0, i);
            completeWriting(destination);
            beginWriting(destination);
            var partialBoundaries = request.partialBoundaries;
            for (i = 0; i < partialBoundaries.length; i++) {
              var _boundary2 = partialBoundaries[i];
              if (!flushPartialBoundary(request, destination, _boundary2)) {
                request.destination = null;
                i++;
                partialBoundaries.splice(0, i);
                return;
              }
            }
            partialBoundaries.splice(0, i);
            var largeBoundaries = request.completedBoundaries;
            for (i = 0; i < largeBoundaries.length; i++) {
              var _boundary3 = largeBoundaries[i];
              if (!flushCompletedBoundary(request, destination, _boundary3)) {
                request.destination = null;
                i++;
                largeBoundaries.splice(0, i);
                return;
              }
            }
            largeBoundaries.splice(0, i);
          } finally {
            if (request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0) {
              {
                if (request.abortableTasks.size !== 0) {
                  error("There was still abortable task at the root when we closed. This is a bug in React.");
                }
              }
              close(destination);
            }
          }
        }
        function startWork(request) {
          scheduleWork(function() {
            return performWork(request);
          });
        }
        function startFlowing(request, destination) {
          if (request.status === CLOSING) {
            request.status = CLOSED;
            closeWithError(destination, request.fatalError);
            return;
          }
          if (request.status === CLOSED) {
            return;
          }
          if (request.destination !== null) {
            return;
          }
          request.destination = destination;
          try {
            flushCompletedQueues(request, destination);
          } catch (error2) {
            logRecoverableError(request, error2);
            fatalError(request, error2);
          }
        }
        function abort(request, reason) {
          try {
            var abortableTasks = request.abortableTasks;
            abortableTasks.forEach(function(task) {
              return abortTask(task, request, reason);
            });
            abortableTasks.clear();
            if (request.destination !== null) {
              flushCompletedQueues(request, request.destination);
            }
          } catch (error2) {
            logRecoverableError(request, error2);
            fatalError(request, error2);
          }
        }
        function onError() {
        }
        function renderToStringImpl(children, options, generateStaticMarkup, abortReason) {
          var didFatal = false;
          var fatalError2 = null;
          var result = "";
          var destination = {
            push: function(chunk) {
              if (chunk !== null) {
                result += chunk;
              }
              return true;
            },
            destroy: function(error2) {
              didFatal = true;
              fatalError2 = error2;
            }
          };
          var readyToStream = false;
          function onShellReady() {
            readyToStream = true;
          }
          var request = createRequest(children, createResponseState$1(generateStaticMarkup, options ? options.identifierPrefix : void 0), createRootFormatContext(), Infinity, onError, void 0, onShellReady, void 0, void 0);
          startWork(request);
          abort(request, abortReason);
          startFlowing(request, destination);
          if (didFatal) {
            throw fatalError2;
          }
          if (!readyToStream) {
            throw new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          }
          return result;
        }
        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          subClass.__proto__ = superClass;
        }
        var ReactMarkupReadableStream = /* @__PURE__ */ (function(_Readable) {
          _inheritsLoose(ReactMarkupReadableStream2, _Readable);
          function ReactMarkupReadableStream2() {
            var _this;
            _this = _Readable.call(this, {}) || this;
            _this.request = null;
            _this.startedFlowing = false;
            return _this;
          }
          var _proto = ReactMarkupReadableStream2.prototype;
          _proto._destroy = function _destroy(err, callback) {
            abort(this.request);
            callback(err);
          };
          _proto._read = function _read(size) {
            if (this.startedFlowing) {
              startFlowing(this.request, this);
            }
          };
          return ReactMarkupReadableStream2;
        })(stream.Readable);
        function onError$1() {
        }
        function renderToNodeStreamImpl(children, options, generateStaticMarkup) {
          function onAllReady() {
            destination.startedFlowing = true;
            startFlowing(request, destination);
          }
          var destination = new ReactMarkupReadableStream();
          var request = createRequest(children, createResponseState$1(false, options ? options.identifierPrefix : void 0), createRootFormatContext(), Infinity, onError$1, onAllReady, void 0, void 0);
          destination.request = request;
          startWork(request);
          return destination;
        }
        function renderToNodeStream(children, options) {
          {
            error("renderToNodeStream is deprecated. Use renderToPipeableStream instead.");
          }
          return renderToNodeStreamImpl(children, options);
        }
        function renderToStaticNodeStream(children, options) {
          {
            error("ReactDOMServer.renderToStaticNodeStream() is deprecated. Use ReactDOMServer.renderToPipeableStream() and wait to `pipe` until the `onAllReady` callback has been called instead.");
          }
          return renderToNodeStreamImpl(children, options);
        }
        function renderToString(children, options) {
          return renderToStringImpl(children, options, false, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server');
        }
        function renderToStaticMarkup2(children, options) {
          return renderToStringImpl(children, options, true, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server');
        }
        exports2.renderToNodeStream = renderToNodeStream;
        exports2.renderToStaticMarkup = renderToStaticMarkup2;
        exports2.renderToStaticNodeStream = renderToStaticNodeStream;
        exports2.renderToString = renderToString;
        exports2.version = ReactVersion;
      })();
    }
  }
});

// ../node_modules/react-dom/cjs/react-dom-server.node.development.js
var require_react_dom_server_node_development = __commonJS({
  "../node_modules/react-dom/cjs/react-dom-server.node.development.js"(exports2) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var React9 = require_react();
        var util = require("util");
        var ReactVersion = "18.3.1";
        var ReactSharedInternals = React9.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function warn(format) {
          {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
        }
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        function scheduleWork(callback) {
          setImmediate(callback);
        }
        function flushBuffered(destination) {
          if (typeof destination.flush === "function") {
            destination.flush();
          }
        }
        var VIEW_SIZE = 2048;
        var currentView = null;
        var writtenBytes = 0;
        var destinationHasCapacity = true;
        function beginWriting(destination) {
          currentView = new Uint8Array(VIEW_SIZE);
          writtenBytes = 0;
          destinationHasCapacity = true;
        }
        function writeStringChunk(destination, stringChunk) {
          if (stringChunk.length === 0) {
            return;
          }
          if (stringChunk.length * 3 > VIEW_SIZE) {
            if (writtenBytes > 0) {
              writeToDestination(destination, currentView.subarray(0, writtenBytes));
              currentView = new Uint8Array(VIEW_SIZE);
              writtenBytes = 0;
            }
            writeToDestination(destination, textEncoder.encode(stringChunk));
            return;
          }
          var target = currentView;
          if (writtenBytes > 0) {
            target = currentView.subarray(writtenBytes);
          }
          var _textEncoder$encodeIn = textEncoder.encodeInto(stringChunk, target), read = _textEncoder$encodeIn.read, written = _textEncoder$encodeIn.written;
          writtenBytes += written;
          if (read < stringChunk.length) {
            writeToDestination(destination, currentView);
            currentView = new Uint8Array(VIEW_SIZE);
            writtenBytes = textEncoder.encodeInto(stringChunk.slice(read), currentView).written;
          }
          if (writtenBytes === VIEW_SIZE) {
            writeToDestination(destination, currentView);
            currentView = new Uint8Array(VIEW_SIZE);
            writtenBytes = 0;
          }
        }
        function writeViewChunk(destination, chunk) {
          if (chunk.byteLength === 0) {
            return;
          }
          if (chunk.byteLength > VIEW_SIZE) {
            if (writtenBytes > 0) {
              writeToDestination(destination, currentView.subarray(0, writtenBytes));
              currentView = new Uint8Array(VIEW_SIZE);
              writtenBytes = 0;
            }
            writeToDestination(destination, chunk);
            return;
          }
          var bytesToWrite = chunk;
          var allowableBytes = currentView.length - writtenBytes;
          if (allowableBytes < bytesToWrite.byteLength) {
            if (allowableBytes === 0) {
              writeToDestination(destination, currentView);
            } else {
              currentView.set(bytesToWrite.subarray(0, allowableBytes), writtenBytes);
              writtenBytes += allowableBytes;
              writeToDestination(destination, currentView);
              bytesToWrite = bytesToWrite.subarray(allowableBytes);
            }
            currentView = new Uint8Array(VIEW_SIZE);
            writtenBytes = 0;
          }
          currentView.set(bytesToWrite, writtenBytes);
          writtenBytes += bytesToWrite.byteLength;
          if (writtenBytes === VIEW_SIZE) {
            writeToDestination(destination, currentView);
            currentView = new Uint8Array(VIEW_SIZE);
            writtenBytes = 0;
          }
        }
        function writeChunk(destination, chunk) {
          if (typeof chunk === "string") {
            writeStringChunk(destination, chunk);
          } else {
            writeViewChunk(destination, chunk);
          }
        }
        function writeToDestination(destination, view) {
          var currentHasCapacity = destination.write(view);
          destinationHasCapacity = destinationHasCapacity && currentHasCapacity;
        }
        function writeChunkAndReturn(destination, chunk) {
          writeChunk(destination, chunk);
          return destinationHasCapacity;
        }
        function completeWriting(destination) {
          if (currentView && writtenBytes > 0) {
            destination.write(currentView.subarray(0, writtenBytes));
          }
          currentView = null;
          writtenBytes = 0;
          destinationHasCapacity = true;
        }
        function close(destination) {
          destination.end();
        }
        var textEncoder = new util.TextEncoder();
        function stringToChunk(content) {
          return content;
        }
        function stringToPrecomputedChunk(content) {
          return textEncoder.encode(content);
        }
        function closeWithError(destination, error2) {
          destination.destroy(error2);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkAttributeStringCoercion(value, attributeName) {
          {
            if (willCoercionThrow(value)) {
              error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", attributeName, typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        function checkCSSPropertyStringCoercion(value, propName) {
          {
            if (willCoercionThrow(value)) {
              error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", propName, typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        function checkHtmlStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED = 0;
        var STRING = 1;
        var BOOLEANISH_STRING = 2;
        var BOOLEAN = 3;
        var OVERLOADED_BOOLEAN = 4;
        var NUMERIC = 5;
        var POSITIVE_NUMERIC = 6;
        var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
        var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
        var VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$");
        var illegalAttributeNameCache = {};
        var validatedAttributeNameCache = {};
        function isAttributeNameSafe(attributeName) {
          if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
            return true;
          }
          if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
            return false;
          }
          if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
            validatedAttributeNameCache[attributeName] = true;
            return true;
          }
          illegalAttributeNameCache[attributeName] = true;
          {
            error("Invalid attribute name: `%s`", attributeName);
          }
          return false;
        }
        function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
          if (propertyInfo !== null && propertyInfo.type === RESERVED) {
            return false;
          }
          switch (typeof value) {
            case "function":
            // $FlowIssue symbol is perfectly valid here
            case "symbol":
              return true;
            case "boolean": {
              if (isCustomComponentTag) {
                return false;
              }
              if (propertyInfo !== null) {
                return !propertyInfo.acceptsBooleans;
              } else {
                var prefix2 = name.toLowerCase().slice(0, 5);
                return prefix2 !== "data-" && prefix2 !== "aria-";
              }
            }
            default:
              return false;
          }
        }
        function getPropertyInfo(name) {
          return properties.hasOwnProperty(name) ? properties[name] : null;
        }
        function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
          this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
          this.attributeName = attributeName;
          this.attributeNamespace = attributeNamespace;
          this.mustUseProperty = mustUseProperty;
          this.propertyName = name;
          this.type = type;
          this.sanitizeURL = sanitizeURL2;
          this.removeEmptyString = removeEmptyString;
        }
        var properties = {};
        var reservedProps = [
          "children",
          "dangerouslySetInnerHTML",
          // TODO: This prevents the assignment of defaultValue to regular
          // elements (not just inputs). Now that ReactDOMInput assigns to the
          // defaultValue property -- do we need this?
          "defaultValue",
          "defaultChecked",
          "innerHTML",
          "suppressContentEditableWarning",
          "suppressHydrationWarning",
          "style"
        ];
        reservedProps.forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            RESERVED,
            false,
            // mustUseProperty
            name,
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
          var name = _ref[0], attributeName = _ref[1];
          properties[name] = new PropertyInfoRecord(
            name,
            STRING,
            false,
            // mustUseProperty
            attributeName,
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            BOOLEANISH_STRING,
            false,
            // mustUseProperty
            name.toLowerCase(),
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            BOOLEANISH_STRING,
            false,
            // mustUseProperty
            name,
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        [
          "allowFullScreen",
          "async",
          // Note: there is a special case that prevents it from being written to the DOM
          // on the client side because the browsers are inconsistent. Instead we call focus().
          "autoFocus",
          "autoPlay",
          "controls",
          "default",
          "defer",
          "disabled",
          "disablePictureInPicture",
          "disableRemotePlayback",
          "formNoValidate",
          "hidden",
          "loop",
          "noModule",
          "noValidate",
          "open",
          "playsInline",
          "readOnly",
          "required",
          "reversed",
          "scoped",
          "seamless",
          // Microdata
          "itemScope"
        ].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            BOOLEAN,
            false,
            // mustUseProperty
            name.toLowerCase(),
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        [
          "checked",
          // Note: `option.selected` is not updated if `select.multiple` is
          // disabled with `removeAttribute`. We have special logic for handling this.
          "multiple",
          "muted",
          "selected"
          // NOTE: if you add a camelCased prop to this list,
          // you'll need to set attributeName to name.toLowerCase()
          // instead in the assignment below.
        ].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            BOOLEAN,
            true,
            // mustUseProperty
            name,
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        [
          "capture",
          "download"
          // NOTE: if you add a camelCased prop to this list,
          // you'll need to set attributeName to name.toLowerCase()
          // instead in the assignment below.
        ].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            OVERLOADED_BOOLEAN,
            false,
            // mustUseProperty
            name,
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        [
          "cols",
          "rows",
          "size",
          "span"
          // NOTE: if you add a camelCased prop to this list,
          // you'll need to set attributeName to name.toLowerCase()
          // instead in the assignment below.
        ].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            POSITIVE_NUMERIC,
            false,
            // mustUseProperty
            name,
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        ["rowSpan", "start"].forEach(function(name) {
          properties[name] = new PropertyInfoRecord(
            name,
            NUMERIC,
            false,
            // mustUseProperty
            name.toLowerCase(),
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        var CAMELIZE = /[\-\:]([a-z])/g;
        var capitalize = function(token) {
          return token[1].toUpperCase();
        };
        [
          "accent-height",
          "alignment-baseline",
          "arabic-form",
          "baseline-shift",
          "cap-height",
          "clip-path",
          "clip-rule",
          "color-interpolation",
          "color-interpolation-filters",
          "color-profile",
          "color-rendering",
          "dominant-baseline",
          "enable-background",
          "fill-opacity",
          "fill-rule",
          "flood-color",
          "flood-opacity",
          "font-family",
          "font-size",
          "font-size-adjust",
          "font-stretch",
          "font-style",
          "font-variant",
          "font-weight",
          "glyph-name",
          "glyph-orientation-horizontal",
          "glyph-orientation-vertical",
          "horiz-adv-x",
          "horiz-origin-x",
          "image-rendering",
          "letter-spacing",
          "lighting-color",
          "marker-end",
          "marker-mid",
          "marker-start",
          "overline-position",
          "overline-thickness",
          "paint-order",
          "panose-1",
          "pointer-events",
          "rendering-intent",
          "shape-rendering",
          "stop-color",
          "stop-opacity",
          "strikethrough-position",
          "strikethrough-thickness",
          "stroke-dasharray",
          "stroke-dashoffset",
          "stroke-linecap",
          "stroke-linejoin",
          "stroke-miterlimit",
          "stroke-opacity",
          "stroke-width",
          "text-anchor",
          "text-decoration",
          "text-rendering",
          "underline-position",
          "underline-thickness",
          "unicode-bidi",
          "unicode-range",
          "units-per-em",
          "v-alphabetic",
          "v-hanging",
          "v-ideographic",
          "v-mathematical",
          "vector-effect",
          "vert-adv-y",
          "vert-origin-x",
          "vert-origin-y",
          "word-spacing",
          "writing-mode",
          "xmlns:xlink",
          "x-height"
          // NOTE: if you add a camelCased prop to this list,
          // you'll need to set attributeName to name.toLowerCase()
          // instead in the assignment below.
        ].forEach(function(attributeName) {
          var name = attributeName.replace(CAMELIZE, capitalize);
          properties[name] = new PropertyInfoRecord(
            name,
            STRING,
            false,
            // mustUseProperty
            attributeName,
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        [
          "xlink:actuate",
          "xlink:arcrole",
          "xlink:role",
          "xlink:show",
          "xlink:title",
          "xlink:type"
          // NOTE: if you add a camelCased prop to this list,
          // you'll need to set attributeName to name.toLowerCase()
          // instead in the assignment below.
        ].forEach(function(attributeName) {
          var name = attributeName.replace(CAMELIZE, capitalize);
          properties[name] = new PropertyInfoRecord(
            name,
            STRING,
            false,
            // mustUseProperty
            attributeName,
            "http://www.w3.org/1999/xlink",
            false,
            // sanitizeURL
            false
          );
        });
        [
          "xml:base",
          "xml:lang",
          "xml:space"
          // NOTE: if you add a camelCased prop to this list,
          // you'll need to set attributeName to name.toLowerCase()
          // instead in the assignment below.
        ].forEach(function(attributeName) {
          var name = attributeName.replace(CAMELIZE, capitalize);
          properties[name] = new PropertyInfoRecord(
            name,
            STRING,
            false,
            // mustUseProperty
            attributeName,
            "http://www.w3.org/XML/1998/namespace",
            false,
            // sanitizeURL
            false
          );
        });
        ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
          properties[attributeName] = new PropertyInfoRecord(
            attributeName,
            STRING,
            false,
            // mustUseProperty
            attributeName.toLowerCase(),
            // attributeName
            null,
            // attributeNamespace
            false,
            // sanitizeURL
            false
          );
        });
        var xlinkHref = "xlinkHref";
        properties[xlinkHref] = new PropertyInfoRecord(
          "xlinkHref",
          STRING,
          false,
          // mustUseProperty
          "xlink:href",
          "http://www.w3.org/1999/xlink",
          true,
          // sanitizeURL
          false
        );
        ["src", "href", "action", "formAction"].forEach(function(attributeName) {
          properties[attributeName] = new PropertyInfoRecord(
            attributeName,
            STRING,
            false,
            // mustUseProperty
            attributeName.toLowerCase(),
            // attributeName
            null,
            // attributeNamespace
            true,
            // sanitizeURL
            true
          );
        });
        var isUnitlessNumber = {
          animationIterationCount: true,
          aspectRatio: true,
          borderImageOutset: true,
          borderImageSlice: true,
          borderImageWidth: true,
          boxFlex: true,
          boxFlexGroup: true,
          boxOrdinalGroup: true,
          columnCount: true,
          columns: true,
          flex: true,
          flexGrow: true,
          flexPositive: true,
          flexShrink: true,
          flexNegative: true,
          flexOrder: true,
          gridArea: true,
          gridRow: true,
          gridRowEnd: true,
          gridRowSpan: true,
          gridRowStart: true,
          gridColumn: true,
          gridColumnEnd: true,
          gridColumnSpan: true,
          gridColumnStart: true,
          fontWeight: true,
          lineClamp: true,
          lineHeight: true,
          opacity: true,
          order: true,
          orphans: true,
          tabSize: true,
          widows: true,
          zIndex: true,
          zoom: true,
          // SVG-related properties
          fillOpacity: true,
          floodOpacity: true,
          stopOpacity: true,
          strokeDasharray: true,
          strokeDashoffset: true,
          strokeMiterlimit: true,
          strokeOpacity: true,
          strokeWidth: true
        };
        function prefixKey(prefix2, key) {
          return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
        }
        var prefixes = ["Webkit", "ms", "Moz", "O"];
        Object.keys(isUnitlessNumber).forEach(function(prop) {
          prefixes.forEach(function(prefix2) {
            isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
          });
        });
        var hasReadOnlyValue = {
          button: true,
          checkbox: true,
          image: true,
          hidden: true,
          radio: true,
          reset: true,
          submit: true
        };
        function checkControlledValueProps(tagName, props) {
          {
            if (!(hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null)) {
              error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
            }
            if (!(props.onChange || props.readOnly || props.disabled || props.checked == null)) {
              error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
            }
          }
        }
        function isCustomComponent(tagName, props) {
          if (tagName.indexOf("-") === -1) {
            return typeof props.is === "string";
          }
          switch (tagName) {
            // These are reserved SVG and MathML elements.
            // We don't mind this list too much because we expect it to never grow.
            // The alternative is to track the namespace in a few places which is convoluted.
            // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
              return false;
            default:
              return true;
          }
        }
        var ariaProperties = {
          "aria-current": 0,
          // state
          "aria-description": 0,
          "aria-details": 0,
          "aria-disabled": 0,
          // state
          "aria-hidden": 0,
          // state
          "aria-invalid": 0,
          // state
          "aria-keyshortcuts": 0,
          "aria-label": 0,
          "aria-roledescription": 0,
          // Widget Attributes
          "aria-autocomplete": 0,
          "aria-checked": 0,
          "aria-expanded": 0,
          "aria-haspopup": 0,
          "aria-level": 0,
          "aria-modal": 0,
          "aria-multiline": 0,
          "aria-multiselectable": 0,
          "aria-orientation": 0,
          "aria-placeholder": 0,
          "aria-pressed": 0,
          "aria-readonly": 0,
          "aria-required": 0,
          "aria-selected": 0,
          "aria-sort": 0,
          "aria-valuemax": 0,
          "aria-valuemin": 0,
          "aria-valuenow": 0,
          "aria-valuetext": 0,
          // Live Region Attributes
          "aria-atomic": 0,
          "aria-busy": 0,
          "aria-live": 0,
          "aria-relevant": 0,
          // Drag-and-Drop Attributes
          "aria-dropeffect": 0,
          "aria-grabbed": 0,
          // Relationship Attributes
          "aria-activedescendant": 0,
          "aria-colcount": 0,
          "aria-colindex": 0,
          "aria-colspan": 0,
          "aria-controls": 0,
          "aria-describedby": 0,
          "aria-errormessage": 0,
          "aria-flowto": 0,
          "aria-labelledby": 0,
          "aria-owns": 0,
          "aria-posinset": 0,
          "aria-rowcount": 0,
          "aria-rowindex": 0,
          "aria-rowspan": 0,
          "aria-setsize": 0
        };
        var warnedProperties = {};
        var rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
        var rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
        function validateProperty(tagName, name) {
          {
            if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
              return true;
            }
            if (rARIACamel.test(name)) {
              var ariaName = "aria-" + name.slice(4).toLowerCase();
              var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
              if (correctName == null) {
                error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name);
                warnedProperties[name] = true;
                return true;
              }
              if (name !== correctName) {
                error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName);
                warnedProperties[name] = true;
                return true;
              }
            }
            if (rARIA.test(name)) {
              var lowerCasedName = name.toLowerCase();
              var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
              if (standardName == null) {
                warnedProperties[name] = true;
                return false;
              }
              if (name !== standardName) {
                error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName);
                warnedProperties[name] = true;
                return true;
              }
            }
          }
          return true;
        }
        function warnInvalidARIAProps(type, props) {
          {
            var invalidProps = [];
            for (var key in props) {
              var isValid = validateProperty(type, key);
              if (!isValid) {
                invalidProps.push(key);
              }
            }
            var unknownPropString = invalidProps.map(function(prop) {
              return "`" + prop + "`";
            }).join(", ");
            if (invalidProps.length === 1) {
              error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
            } else if (invalidProps.length > 1) {
              error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
            }
          }
        }
        function validateProperties(type, props) {
          if (isCustomComponent(type, props)) {
            return;
          }
          warnInvalidARIAProps(type, props);
        }
        var didWarnValueNull = false;
        function validateProperties$1(type, props) {
          {
            if (type !== "input" && type !== "textarea" && type !== "select") {
              return;
            }
            if (props != null && props.value === null && !didWarnValueNull) {
              didWarnValueNull = true;
              if (type === "select" && props.multiple) {
                error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type);
              } else {
                error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type);
              }
            }
          }
        }
        var possibleStandardNames = {
          // HTML
          accept: "accept",
          acceptcharset: "acceptCharset",
          "accept-charset": "acceptCharset",
          accesskey: "accessKey",
          action: "action",
          allowfullscreen: "allowFullScreen",
          alt: "alt",
          as: "as",
          async: "async",
          autocapitalize: "autoCapitalize",
          autocomplete: "autoComplete",
          autocorrect: "autoCorrect",
          autofocus: "autoFocus",
          autoplay: "autoPlay",
          autosave: "autoSave",
          capture: "capture",
          cellpadding: "cellPadding",
          cellspacing: "cellSpacing",
          challenge: "challenge",
          charset: "charSet",
          checked: "checked",
          children: "children",
          cite: "cite",
          class: "className",
          classid: "classID",
          classname: "className",
          cols: "cols",
          colspan: "colSpan",
          content: "content",
          contenteditable: "contentEditable",
          contextmenu: "contextMenu",
          controls: "controls",
          controlslist: "controlsList",
          coords: "coords",
          crossorigin: "crossOrigin",
          dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
          data: "data",
          datetime: "dateTime",
          default: "default",
          defaultchecked: "defaultChecked",
          defaultvalue: "defaultValue",
          defer: "defer",
          dir: "dir",
          disabled: "disabled",
          disablepictureinpicture: "disablePictureInPicture",
          disableremoteplayback: "disableRemotePlayback",
          download: "download",
          draggable: "draggable",
          enctype: "encType",
          enterkeyhint: "enterKeyHint",
          for: "htmlFor",
          form: "form",
          formmethod: "formMethod",
          formaction: "formAction",
          formenctype: "formEncType",
          formnovalidate: "formNoValidate",
          formtarget: "formTarget",
          frameborder: "frameBorder",
          headers: "headers",
          height: "height",
          hidden: "hidden",
          high: "high",
          href: "href",
          hreflang: "hrefLang",
          htmlfor: "htmlFor",
          httpequiv: "httpEquiv",
          "http-equiv": "httpEquiv",
          icon: "icon",
          id: "id",
          imagesizes: "imageSizes",
          imagesrcset: "imageSrcSet",
          innerhtml: "innerHTML",
          inputmode: "inputMode",
          integrity: "integrity",
          is: "is",
          itemid: "itemID",
          itemprop: "itemProp",
          itemref: "itemRef",
          itemscope: "itemScope",
          itemtype: "itemType",
          keyparams: "keyParams",
          keytype: "keyType",
          kind: "kind",
          label: "label",
          lang: "lang",
          list: "list",
          loop: "loop",
          low: "low",
          manifest: "manifest",
          marginwidth: "marginWidth",
          marginheight: "marginHeight",
          max: "max",
          maxlength: "maxLength",
          media: "media",
          mediagroup: "mediaGroup",
          method: "method",
          min: "min",
          minlength: "minLength",
          multiple: "multiple",
          muted: "muted",
          name: "name",
          nomodule: "noModule",
          nonce: "nonce",
          novalidate: "noValidate",
          open: "open",
          optimum: "optimum",
          pattern: "pattern",
          placeholder: "placeholder",
          playsinline: "playsInline",
          poster: "poster",
          preload: "preload",
          profile: "profile",
          radiogroup: "radioGroup",
          readonly: "readOnly",
          referrerpolicy: "referrerPolicy",
          rel: "rel",
          required: "required",
          reversed: "reversed",
          role: "role",
          rows: "rows",
          rowspan: "rowSpan",
          sandbox: "sandbox",
          scope: "scope",
          scoped: "scoped",
          scrolling: "scrolling",
          seamless: "seamless",
          selected: "selected",
          shape: "shape",
          size: "size",
          sizes: "sizes",
          span: "span",
          spellcheck: "spellCheck",
          src: "src",
          srcdoc: "srcDoc",
          srclang: "srcLang",
          srcset: "srcSet",
          start: "start",
          step: "step",
          style: "style",
          summary: "summary",
          tabindex: "tabIndex",
          target: "target",
          title: "title",
          type: "type",
          usemap: "useMap",
          value: "value",
          width: "width",
          wmode: "wmode",
          wrap: "wrap",
          // SVG
          about: "about",
          accentheight: "accentHeight",
          "accent-height": "accentHeight",
          accumulate: "accumulate",
          additive: "additive",
          alignmentbaseline: "alignmentBaseline",
          "alignment-baseline": "alignmentBaseline",
          allowreorder: "allowReorder",
          alphabetic: "alphabetic",
          amplitude: "amplitude",
          arabicform: "arabicForm",
          "arabic-form": "arabicForm",
          ascent: "ascent",
          attributename: "attributeName",
          attributetype: "attributeType",
          autoreverse: "autoReverse",
          azimuth: "azimuth",
          basefrequency: "baseFrequency",
          baselineshift: "baselineShift",
          "baseline-shift": "baselineShift",
          baseprofile: "baseProfile",
          bbox: "bbox",
          begin: "begin",
          bias: "bias",
          by: "by",
          calcmode: "calcMode",
          capheight: "capHeight",
          "cap-height": "capHeight",
          clip: "clip",
          clippath: "clipPath",
          "clip-path": "clipPath",
          clippathunits: "clipPathUnits",
          cliprule: "clipRule",
          "clip-rule": "clipRule",
          color: "color",
          colorinterpolation: "colorInterpolation",
          "color-interpolation": "colorInterpolation",
          colorinterpolationfilters: "colorInterpolationFilters",
          "color-interpolation-filters": "colorInterpolationFilters",
          colorprofile: "colorProfile",
          "color-profile": "colorProfile",
          colorrendering: "colorRendering",
          "color-rendering": "colorRendering",
          contentscripttype: "contentScriptType",
          contentstyletype: "contentStyleType",
          cursor: "cursor",
          cx: "cx",
          cy: "cy",
          d: "d",
          datatype: "datatype",
          decelerate: "decelerate",
          descent: "descent",
          diffuseconstant: "diffuseConstant",
          direction: "direction",
          display: "display",
          divisor: "divisor",
          dominantbaseline: "dominantBaseline",
          "dominant-baseline": "dominantBaseline",
          dur: "dur",
          dx: "dx",
          dy: "dy",
          edgemode: "edgeMode",
          elevation: "elevation",
          enablebackground: "enableBackground",
          "enable-background": "enableBackground",
          end: "end",
          exponent: "exponent",
          externalresourcesrequired: "externalResourcesRequired",
          fill: "fill",
          fillopacity: "fillOpacity",
          "fill-opacity": "fillOpacity",
          fillrule: "fillRule",
          "fill-rule": "fillRule",
          filter: "filter",
          filterres: "filterRes",
          filterunits: "filterUnits",
          floodopacity: "floodOpacity",
          "flood-opacity": "floodOpacity",
          floodcolor: "floodColor",
          "flood-color": "floodColor",
          focusable: "focusable",
          fontfamily: "fontFamily",
          "font-family": "fontFamily",
          fontsize: "fontSize",
          "font-size": "fontSize",
          fontsizeadjust: "fontSizeAdjust",
          "font-size-adjust": "fontSizeAdjust",
          fontstretch: "fontStretch",
          "font-stretch": "fontStretch",
          fontstyle: "fontStyle",
          "font-style": "fontStyle",
          fontvariant: "fontVariant",
          "font-variant": "fontVariant",
          fontweight: "fontWeight",
          "font-weight": "fontWeight",
          format: "format",
          from: "from",
          fx: "fx",
          fy: "fy",
          g1: "g1",
          g2: "g2",
          glyphname: "glyphName",
          "glyph-name": "glyphName",
          glyphorientationhorizontal: "glyphOrientationHorizontal",
          "glyph-orientation-horizontal": "glyphOrientationHorizontal",
          glyphorientationvertical: "glyphOrientationVertical",
          "glyph-orientation-vertical": "glyphOrientationVertical",
          glyphref: "glyphRef",
          gradienttransform: "gradientTransform",
          gradientunits: "gradientUnits",
          hanging: "hanging",
          horizadvx: "horizAdvX",
          "horiz-adv-x": "horizAdvX",
          horizoriginx: "horizOriginX",
          "horiz-origin-x": "horizOriginX",
          ideographic: "ideographic",
          imagerendering: "imageRendering",
          "image-rendering": "imageRendering",
          in2: "in2",
          in: "in",
          inlist: "inlist",
          intercept: "intercept",
          k1: "k1",
          k2: "k2",
          k3: "k3",
          k4: "k4",
          k: "k",
          kernelmatrix: "kernelMatrix",
          kernelunitlength: "kernelUnitLength",
          kerning: "kerning",
          keypoints: "keyPoints",
          keysplines: "keySplines",
          keytimes: "keyTimes",
          lengthadjust: "lengthAdjust",
          letterspacing: "letterSpacing",
          "letter-spacing": "letterSpacing",
          lightingcolor: "lightingColor",
          "lighting-color": "lightingColor",
          limitingconeangle: "limitingConeAngle",
          local: "local",
          markerend: "markerEnd",
          "marker-end": "markerEnd",
          markerheight: "markerHeight",
          markermid: "markerMid",
          "marker-mid": "markerMid",
          markerstart: "markerStart",
          "marker-start": "markerStart",
          markerunits: "markerUnits",
          markerwidth: "markerWidth",
          mask: "mask",
          maskcontentunits: "maskContentUnits",
          maskunits: "maskUnits",
          mathematical: "mathematical",
          mode: "mode",
          numoctaves: "numOctaves",
          offset: "offset",
          opacity: "opacity",
          operator: "operator",
          order: "order",
          orient: "orient",
          orientation: "orientation",
          origin: "origin",
          overflow: "overflow",
          overlineposition: "overlinePosition",
          "overline-position": "overlinePosition",
          overlinethickness: "overlineThickness",
          "overline-thickness": "overlineThickness",
          paintorder: "paintOrder",
          "paint-order": "paintOrder",
          panose1: "panose1",
          "panose-1": "panose1",
          pathlength: "pathLength",
          patterncontentunits: "patternContentUnits",
          patterntransform: "patternTransform",
          patternunits: "patternUnits",
          pointerevents: "pointerEvents",
          "pointer-events": "pointerEvents",
          points: "points",
          pointsatx: "pointsAtX",
          pointsaty: "pointsAtY",
          pointsatz: "pointsAtZ",
          prefix: "prefix",
          preservealpha: "preserveAlpha",
          preserveaspectratio: "preserveAspectRatio",
          primitiveunits: "primitiveUnits",
          property: "property",
          r: "r",
          radius: "radius",
          refx: "refX",
          refy: "refY",
          renderingintent: "renderingIntent",
          "rendering-intent": "renderingIntent",
          repeatcount: "repeatCount",
          repeatdur: "repeatDur",
          requiredextensions: "requiredExtensions",
          requiredfeatures: "requiredFeatures",
          resource: "resource",
          restart: "restart",
          result: "result",
          results: "results",
          rotate: "rotate",
          rx: "rx",
          ry: "ry",
          scale: "scale",
          security: "security",
          seed: "seed",
          shaperendering: "shapeRendering",
          "shape-rendering": "shapeRendering",
          slope: "slope",
          spacing: "spacing",
          specularconstant: "specularConstant",
          specularexponent: "specularExponent",
          speed: "speed",
          spreadmethod: "spreadMethod",
          startoffset: "startOffset",
          stddeviation: "stdDeviation",
          stemh: "stemh",
          stemv: "stemv",
          stitchtiles: "stitchTiles",
          stopcolor: "stopColor",
          "stop-color": "stopColor",
          stopopacity: "stopOpacity",
          "stop-opacity": "stopOpacity",
          strikethroughposition: "strikethroughPosition",
          "strikethrough-position": "strikethroughPosition",
          strikethroughthickness: "strikethroughThickness",
          "strikethrough-thickness": "strikethroughThickness",
          string: "string",
          stroke: "stroke",
          strokedasharray: "strokeDasharray",
          "stroke-dasharray": "strokeDasharray",
          strokedashoffset: "strokeDashoffset",
          "stroke-dashoffset": "strokeDashoffset",
          strokelinecap: "strokeLinecap",
          "stroke-linecap": "strokeLinecap",
          strokelinejoin: "strokeLinejoin",
          "stroke-linejoin": "strokeLinejoin",
          strokemiterlimit: "strokeMiterlimit",
          "stroke-miterlimit": "strokeMiterlimit",
          strokewidth: "strokeWidth",
          "stroke-width": "strokeWidth",
          strokeopacity: "strokeOpacity",
          "stroke-opacity": "strokeOpacity",
          suppresscontenteditablewarning: "suppressContentEditableWarning",
          suppresshydrationwarning: "suppressHydrationWarning",
          surfacescale: "surfaceScale",
          systemlanguage: "systemLanguage",
          tablevalues: "tableValues",
          targetx: "targetX",
          targety: "targetY",
          textanchor: "textAnchor",
          "text-anchor": "textAnchor",
          textdecoration: "textDecoration",
          "text-decoration": "textDecoration",
          textlength: "textLength",
          textrendering: "textRendering",
          "text-rendering": "textRendering",
          to: "to",
          transform: "transform",
          typeof: "typeof",
          u1: "u1",
          u2: "u2",
          underlineposition: "underlinePosition",
          "underline-position": "underlinePosition",
          underlinethickness: "underlineThickness",
          "underline-thickness": "underlineThickness",
          unicode: "unicode",
          unicodebidi: "unicodeBidi",
          "unicode-bidi": "unicodeBidi",
          unicoderange: "unicodeRange",
          "unicode-range": "unicodeRange",
          unitsperem: "unitsPerEm",
          "units-per-em": "unitsPerEm",
          unselectable: "unselectable",
          valphabetic: "vAlphabetic",
          "v-alphabetic": "vAlphabetic",
          values: "values",
          vectoreffect: "vectorEffect",
          "vector-effect": "vectorEffect",
          version: "version",
          vertadvy: "vertAdvY",
          "vert-adv-y": "vertAdvY",
          vertoriginx: "vertOriginX",
          "vert-origin-x": "vertOriginX",
          vertoriginy: "vertOriginY",
          "vert-origin-y": "vertOriginY",
          vhanging: "vHanging",
          "v-hanging": "vHanging",
          videographic: "vIdeographic",
          "v-ideographic": "vIdeographic",
          viewbox: "viewBox",
          viewtarget: "viewTarget",
          visibility: "visibility",
          vmathematical: "vMathematical",
          "v-mathematical": "vMathematical",
          vocab: "vocab",
          widths: "widths",
          wordspacing: "wordSpacing",
          "word-spacing": "wordSpacing",
          writingmode: "writingMode",
          "writing-mode": "writingMode",
          x1: "x1",
          x2: "x2",
          x: "x",
          xchannelselector: "xChannelSelector",
          xheight: "xHeight",
          "x-height": "xHeight",
          xlinkactuate: "xlinkActuate",
          "xlink:actuate": "xlinkActuate",
          xlinkarcrole: "xlinkArcrole",
          "xlink:arcrole": "xlinkArcrole",
          xlinkhref: "xlinkHref",
          "xlink:href": "xlinkHref",
          xlinkrole: "xlinkRole",
          "xlink:role": "xlinkRole",
          xlinkshow: "xlinkShow",
          "xlink:show": "xlinkShow",
          xlinktitle: "xlinkTitle",
          "xlink:title": "xlinkTitle",
          xlinktype: "xlinkType",
          "xlink:type": "xlinkType",
          xmlbase: "xmlBase",
          "xml:base": "xmlBase",
          xmllang: "xmlLang",
          "xml:lang": "xmlLang",
          xmlns: "xmlns",
          "xml:space": "xmlSpace",
          xmlnsxlink: "xmlnsXlink",
          "xmlns:xlink": "xmlnsXlink",
          xmlspace: "xmlSpace",
          y1: "y1",
          y2: "y2",
          y: "y",
          ychannelselector: "yChannelSelector",
          z: "z",
          zoomandpan: "zoomAndPan"
        };
        var validateProperty$1 = function() {
        };
        {
          var warnedProperties$1 = {};
          var EVENT_NAME_REGEX = /^on./;
          var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
          var rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
          var rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
          validateProperty$1 = function(tagName, name, value, eventRegistry) {
            if (hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
              return true;
            }
            var lowerCasedName = name.toLowerCase();
            if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout") {
              error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React.");
              warnedProperties$1[name] = true;
              return true;
            }
            if (eventRegistry != null) {
              var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
              if (registrationNameDependencies.hasOwnProperty(name)) {
                return true;
              }
              var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
              if (registrationName != null) {
                error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName);
                warnedProperties$1[name] = true;
                return true;
              }
              if (EVENT_NAME_REGEX.test(name)) {
                error("Unknown event handler property `%s`. It will be ignored.", name);
                warnedProperties$1[name] = true;
                return true;
              }
            } else if (EVENT_NAME_REGEX.test(name)) {
              if (INVALID_EVENT_NAME_REGEX.test(name)) {
                error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name);
              }
              warnedProperties$1[name] = true;
              return true;
            }
            if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
              return true;
            }
            if (lowerCasedName === "innerhtml") {
              error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`.");
              warnedProperties$1[name] = true;
              return true;
            }
            if (lowerCasedName === "aria") {
              error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead.");
              warnedProperties$1[name] = true;
              return true;
            }
            if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value !== "string") {
              error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value);
              warnedProperties$1[name] = true;
              return true;
            }
            if (typeof value === "number" && isNaN(value)) {
              error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name);
              warnedProperties$1[name] = true;
              return true;
            }
            var propertyInfo = getPropertyInfo(name);
            var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
            if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
              var standardName = possibleStandardNames[lowerCasedName];
              if (standardName !== name) {
                error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName);
                warnedProperties$1[name] = true;
                return true;
              }
            } else if (!isReserved && name !== lowerCasedName) {
              error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName);
              warnedProperties$1[name] = true;
              return true;
            }
            if (typeof value === "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
              if (value) {
                error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name);
              } else {
                error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
              }
              warnedProperties$1[name] = true;
              return true;
            }
            if (isReserved) {
              return true;
            }
            if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
              warnedProperties$1[name] = true;
              return false;
            }
            if ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
              error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value);
              warnedProperties$1[name] = true;
              return true;
            }
            return true;
          };
        }
        var warnUnknownProperties = function(type, props, eventRegistry) {
          {
            var unknownProps = [];
            for (var key in props) {
              var isValid = validateProperty$1(type, key, props[key], eventRegistry);
              if (!isValid) {
                unknownProps.push(key);
              }
            }
            var unknownPropString = unknownProps.map(function(prop) {
              return "`" + prop + "`";
            }).join(", ");
            if (unknownProps.length === 1) {
              error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
            } else if (unknownProps.length > 1) {
              error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
            }
          }
        };
        function validateProperties$2(type, props, eventRegistry) {
          if (isCustomComponent(type, props)) {
            return;
          }
          warnUnknownProperties(type, props, eventRegistry);
        }
        var warnValidStyle = function() {
        };
        {
          var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
          var msPattern = /^-ms-/;
          var hyphenPattern = /-(.)/g;
          var badStyleValueWithSemicolonPattern = /;\s*$/;
          var warnedStyleNames = {};
          var warnedStyleValues = {};
          var warnedForNaNValue = false;
          var warnedForInfinityValue = false;
          var camelize = function(string) {
            return string.replace(hyphenPattern, function(_, character) {
              return character.toUpperCase();
            });
          };
          var warnHyphenatedStyleName = function(name) {
            if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
              return;
            }
            warnedStyleNames[name] = true;
            error(
              "Unsupported style property %s. Did you mean %s?",
              name,
              // As Andi Smith suggests
              // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
              // is converted to lowercase `ms`.
              camelize(name.replace(msPattern, "ms-"))
            );
          };
          var warnBadVendoredStyleName = function(name) {
            if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
              return;
            }
            warnedStyleNames[name] = true;
            error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1));
          };
          var warnStyleValueWithSemicolon = function(name, value) {
            if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
              return;
            }
            warnedStyleValues[value] = true;
            error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, ""));
          };
          var warnStyleValueIsNaN = function(name, value) {
            if (warnedForNaNValue) {
              return;
            }
            warnedForNaNValue = true;
            error("`NaN` is an invalid value for the `%s` css style property.", name);
          };
          var warnStyleValueIsInfinity = function(name, value) {
            if (warnedForInfinityValue) {
              return;
            }
            warnedForInfinityValue = true;
            error("`Infinity` is an invalid value for the `%s` css style property.", name);
          };
          warnValidStyle = function(name, value) {
            if (name.indexOf("-") > -1) {
              warnHyphenatedStyleName(name);
            } else if (badVendoredStyleNamePattern.test(name)) {
              warnBadVendoredStyleName(name);
            } else if (badStyleValueWithSemicolonPattern.test(value)) {
              warnStyleValueWithSemicolon(name, value);
            }
            if (typeof value === "number") {
              if (isNaN(value)) {
                warnStyleValueIsNaN(name, value);
              } else if (!isFinite(value)) {
                warnStyleValueIsInfinity(name, value);
              }
            }
          };
        }
        var warnValidStyle$1 = warnValidStyle;
        var matchHtmlRegExp = /["'&<>]/;
        function escapeHtml(string) {
          {
            checkHtmlStringCoercion(string);
          }
          var str = "" + string;
          var match = matchHtmlRegExp.exec(str);
          if (!match) {
            return str;
          }
          var escape;
          var html = "";
          var index;
          var lastIndex = 0;
          for (index = match.index; index < str.length; index++) {
            switch (str.charCodeAt(index)) {
              case 34:
                escape = "&quot;";
                break;
              case 38:
                escape = "&amp;";
                break;
              case 39:
                escape = "&#x27;";
                break;
              case 60:
                escape = "&lt;";
                break;
              case 62:
                escape = "&gt;";
                break;
              default:
                continue;
            }
            if (lastIndex !== index) {
              html += str.substring(lastIndex, index);
            }
            lastIndex = index + 1;
            html += escape;
          }
          return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
        }
        function escapeTextForBrowser(text) {
          if (typeof text === "boolean" || typeof text === "number") {
            return "" + text;
          }
          return escapeHtml(text);
        }
        var uppercasePattern = /([A-Z])/g;
        var msPattern$1 = /^ms-/;
        function hyphenateStyleName(name) {
          return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern$1, "-ms-");
        }
        var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
        var didWarn = false;
        function sanitizeURL(url) {
          {
            if (!didWarn && isJavaScriptProtocol.test(url)) {
              didWarn = true;
              error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url));
            }
          }
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        var startInlineScript = stringToPrecomputedChunk("<script>");
        var endInlineScript = stringToPrecomputedChunk("</script>");
        var startScriptSrc = stringToPrecomputedChunk('<script src="');
        var startModuleSrc = stringToPrecomputedChunk('<script type="module" src="');
        var endAsyncScript = stringToPrecomputedChunk('" async=""></script>');
        function escapeBootstrapScriptContent(scriptText) {
          {
            checkHtmlStringCoercion(scriptText);
          }
          return ("" + scriptText).replace(scriptRegex, scriptReplacer);
        }
        var scriptRegex = /(<\/|<)(s)(cript)/gi;
        var scriptReplacer = function(match, prefix2, s, suffix) {
          return "" + prefix2 + (s === "s" ? "\\u0073" : "\\u0053") + suffix;
        };
        function createResponseState(identifierPrefix, nonce, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
          var idPrefix = identifierPrefix === void 0 ? "" : identifierPrefix;
          var inlineScriptWithNonce = nonce === void 0 ? startInlineScript : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser(nonce) + '">');
          var bootstrapChunks = [];
          if (bootstrapScriptContent !== void 0) {
            bootstrapChunks.push(inlineScriptWithNonce, stringToChunk(escapeBootstrapScriptContent(bootstrapScriptContent)), endInlineScript);
          }
          if (bootstrapScripts !== void 0) {
            for (var i = 0; i < bootstrapScripts.length; i++) {
              bootstrapChunks.push(startScriptSrc, stringToChunk(escapeTextForBrowser(bootstrapScripts[i])), endAsyncScript);
            }
          }
          if (bootstrapModules !== void 0) {
            for (var _i = 0; _i < bootstrapModules.length; _i++) {
              bootstrapChunks.push(startModuleSrc, stringToChunk(escapeTextForBrowser(bootstrapModules[_i])), endAsyncScript);
            }
          }
          return {
            bootstrapChunks,
            startInlineScript: inlineScriptWithNonce,
            placeholderPrefix: stringToPrecomputedChunk(idPrefix + "P:"),
            segmentPrefix: stringToPrecomputedChunk(idPrefix + "S:"),
            boundaryPrefix: idPrefix + "B:",
            idPrefix,
            nextSuspenseID: 0,
            sentCompleteSegmentFunction: false,
            sentCompleteBoundaryFunction: false,
            sentClientRenderFunction: false
          };
        }
        var ROOT_HTML_MODE = 0;
        var HTML_MODE = 1;
        var SVG_MODE = 2;
        var MATHML_MODE = 3;
        var HTML_TABLE_MODE = 4;
        var HTML_TABLE_BODY_MODE = 5;
        var HTML_TABLE_ROW_MODE = 6;
        var HTML_COLGROUP_MODE = 7;
        function createFormatContext(insertionMode, selectedValue) {
          return {
            insertionMode,
            selectedValue
          };
        }
        function createRootFormatContext(namespaceURI) {
          var insertionMode = namespaceURI === "http://www.w3.org/2000/svg" ? SVG_MODE : namespaceURI === "http://www.w3.org/1998/Math/MathML" ? MATHML_MODE : ROOT_HTML_MODE;
          return createFormatContext(insertionMode, null);
        }
        function getChildFormatContext(parentContext, type, props) {
          switch (type) {
            case "select":
              return createFormatContext(HTML_MODE, props.value != null ? props.value : props.defaultValue);
            case "svg":
              return createFormatContext(SVG_MODE, null);
            case "math":
              return createFormatContext(MATHML_MODE, null);
            case "foreignObject":
              return createFormatContext(HTML_MODE, null);
            // Table parents are special in that their children can only be created at all if they're
            // wrapped in a table parent. So we need to encode that we're entering this mode.
            case "table":
              return createFormatContext(HTML_TABLE_MODE, null);
            case "thead":
            case "tbody":
            case "tfoot":
              return createFormatContext(HTML_TABLE_BODY_MODE, null);
            case "colgroup":
              return createFormatContext(HTML_COLGROUP_MODE, null);
            case "tr":
              return createFormatContext(HTML_TABLE_ROW_MODE, null);
          }
          if (parentContext.insertionMode >= HTML_TABLE_MODE) {
            return createFormatContext(HTML_MODE, null);
          }
          if (parentContext.insertionMode === ROOT_HTML_MODE) {
            return createFormatContext(HTML_MODE, null);
          }
          return parentContext;
        }
        var UNINITIALIZED_SUSPENSE_BOUNDARY_ID = null;
        function assignSuspenseBoundaryID(responseState) {
          var generatedID = responseState.nextSuspenseID++;
          return stringToPrecomputedChunk(responseState.boundaryPrefix + generatedID.toString(16));
        }
        function makeId(responseState, treeId, localId) {
          var idPrefix = responseState.idPrefix;
          var id = ":" + idPrefix + "R" + treeId;
          if (localId > 0) {
            id += "H" + localId.toString(32);
          }
          return id + ":";
        }
        function encodeHTMLTextNode(text) {
          return escapeTextForBrowser(text);
        }
        var textSeparator = stringToPrecomputedChunk("<!-- -->");
        function pushTextInstance(target, text, responseState, textEmbedded) {
          if (text === "") {
            return textEmbedded;
          }
          if (textEmbedded) {
            target.push(textSeparator);
          }
          target.push(stringToChunk(encodeHTMLTextNode(text)));
          return true;
        }
        function pushSegmentFinale(target, responseState, lastPushedText, textEmbedded) {
          if (lastPushedText && textEmbedded) {
            target.push(textSeparator);
          }
        }
        var styleNameCache = /* @__PURE__ */ new Map();
        function processStyleName(styleName) {
          var chunk = styleNameCache.get(styleName);
          if (chunk !== void 0) {
            return chunk;
          }
          var result = stringToPrecomputedChunk(escapeTextForBrowser(hyphenateStyleName(styleName)));
          styleNameCache.set(styleName, result);
          return result;
        }
        var styleAttributeStart = stringToPrecomputedChunk(' style="');
        var styleAssign = stringToPrecomputedChunk(":");
        var styleSeparator = stringToPrecomputedChunk(";");
        function pushStyle(target, responseState, style) {
          if (typeof style !== "object") {
            throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
          }
          var isFirst = true;
          for (var styleName in style) {
            if (!hasOwnProperty.call(style, styleName)) {
              continue;
            }
            var styleValue = style[styleName];
            if (styleValue == null || typeof styleValue === "boolean" || styleValue === "") {
              continue;
            }
            var nameChunk = void 0;
            var valueChunk = void 0;
            var isCustomProperty = styleName.indexOf("--") === 0;
            if (isCustomProperty) {
              nameChunk = stringToChunk(escapeTextForBrowser(styleName));
              {
                checkCSSPropertyStringCoercion(styleValue, styleName);
              }
              valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
            } else {
              {
                warnValidStyle$1(styleName, styleValue);
              }
              nameChunk = processStyleName(styleName);
              if (typeof styleValue === "number") {
                if (styleValue !== 0 && !hasOwnProperty.call(isUnitlessNumber, styleName)) {
                  valueChunk = stringToChunk(styleValue + "px");
                } else {
                  valueChunk = stringToChunk("" + styleValue);
                }
              } else {
                {
                  checkCSSPropertyStringCoercion(styleValue, styleName);
                }
                valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
              }
            }
            if (isFirst) {
              isFirst = false;
              target.push(styleAttributeStart, nameChunk, styleAssign, valueChunk);
            } else {
              target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
            }
          }
          if (!isFirst) {
            target.push(attributeEnd);
          }
        }
        var attributeSeparator = stringToPrecomputedChunk(" ");
        var attributeAssign = stringToPrecomputedChunk('="');
        var attributeEnd = stringToPrecomputedChunk('"');
        var attributeEmptyString = stringToPrecomputedChunk('=""');
        function pushAttribute(target, responseState, name, value) {
          switch (name) {
            case "style": {
              pushStyle(target, responseState, value);
              return;
            }
            case "defaultValue":
            case "defaultChecked":
            // These shouldn't be set as attributes on generic HTML elements.
            case "innerHTML":
            // Must use dangerouslySetInnerHTML instead.
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
              return;
          }
          if (
            // shouldIgnoreAttribute
            // We have already filtered out null/undefined and reserved words.
            name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N")
          ) {
            return;
          }
          var propertyInfo = getPropertyInfo(name);
          if (propertyInfo !== null) {
            switch (typeof value) {
              case "function":
              // $FlowIssue symbol is perfectly valid here
              case "symbol":
                return;
              case "boolean": {
                if (!propertyInfo.acceptsBooleans) {
                  return;
                }
              }
            }
            var attributeName = propertyInfo.attributeName;
            var attributeNameChunk = stringToChunk(attributeName);
            switch (propertyInfo.type) {
              case BOOLEAN:
                if (value) {
                  target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                }
                return;
              case OVERLOADED_BOOLEAN:
                if (value === true) {
                  target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                } else if (value === false) ;
                else {
                  target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                }
                return;
              case NUMERIC:
                if (!isNaN(value)) {
                  target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                }
                break;
              case POSITIVE_NUMERIC:
                if (!isNaN(value) && value >= 1) {
                  target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                }
                break;
              default:
                if (propertyInfo.sanitizeURL) {
                  {
                    checkAttributeStringCoercion(value, attributeName);
                  }
                  value = "" + value;
                  sanitizeURL(value);
                }
                target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
            }
          } else if (isAttributeNameSafe(name)) {
            switch (typeof value) {
              case "function":
              // $FlowIssue symbol is perfectly valid here
              case "symbol":
                return;
              case "boolean": {
                var prefix2 = name.toLowerCase().slice(0, 5);
                if (prefix2 !== "data-" && prefix2 !== "aria-") {
                  return;
                }
              }
            }
            target.push(attributeSeparator, stringToChunk(name), attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
          }
        }
        var endOfStartTag = stringToPrecomputedChunk(">");
        var endOfStartTagSelfClosing = stringToPrecomputedChunk("/>");
        function pushInnerHTML(target, innerHTML, children) {
          if (innerHTML != null) {
            if (children != null) {
              throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            }
            if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
              throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
            }
            var html = innerHTML.__html;
            if (html !== null && html !== void 0) {
              {
                checkHtmlStringCoercion(html);
              }
              target.push(stringToChunk("" + html));
            }
          }
        }
        var didWarnDefaultInputValue = false;
        var didWarnDefaultChecked = false;
        var didWarnDefaultSelectValue = false;
        var didWarnDefaultTextareaValue = false;
        var didWarnInvalidOptionChildren = false;
        var didWarnInvalidOptionInnerHTML = false;
        var didWarnSelectedSetOnOption = false;
        function checkSelectProp(props, propName) {
          {
            var value = props[propName];
            if (value != null) {
              var array = isArray(value);
              if (props.multiple && !array) {
                error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName);
              } else if (!props.multiple && array) {
                error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
              }
            }
          }
        }
        function pushStartSelect(target, props, responseState) {
          {
            checkControlledValueProps("select", props);
            checkSelectProp(props, "value");
            checkSelectProp(props, "defaultValue");
            if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue) {
              error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components");
              didWarnDefaultSelectValue = true;
            }
          }
          target.push(startChunkForTag("select"));
          var children = null;
          var innerHTML = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML = propValue;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          target.push(endOfStartTag);
          pushInnerHTML(target, innerHTML, children);
          return children;
        }
        function flattenOptionChildren(children) {
          var content = "";
          React9.Children.forEach(children, function(child) {
            if (child == null) {
              return;
            }
            content += child;
            {
              if (!didWarnInvalidOptionChildren && typeof child !== "string" && typeof child !== "number") {
                didWarnInvalidOptionChildren = true;
                error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.");
              }
            }
          });
          return content;
        }
        var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""');
        function pushStartOption(target, props, responseState, formatContext) {
          var selectedValue = formatContext.selectedValue;
          target.push(startChunkForTag("option"));
          var children = null;
          var value = null;
          var selected = null;
          var innerHTML = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "selected":
                  selected = propValue;
                  {
                    if (!didWarnSelectedSetOnOption) {
                      error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.");
                      didWarnSelectedSetOnOption = true;
                    }
                  }
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML = propValue;
                  break;
                // eslint-disable-next-line-no-fallthrough
                case "value":
                  value = propValue;
                // We intentionally fallthrough to also set the attribute on the node.
                // eslint-disable-next-line-no-fallthrough
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          if (selectedValue != null) {
            var stringValue;
            if (value !== null) {
              {
                checkAttributeStringCoercion(value, "value");
              }
              stringValue = "" + value;
            } else {
              {
                if (innerHTML !== null) {
                  if (!didWarnInvalidOptionInnerHTML) {
                    didWarnInvalidOptionInnerHTML = true;
                    error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.");
                  }
                }
              }
              stringValue = flattenOptionChildren(children);
            }
            if (isArray(selectedValue)) {
              for (var i = 0; i < selectedValue.length; i++) {
                {
                  checkAttributeStringCoercion(selectedValue[i], "value");
                }
                var v = "" + selectedValue[i];
                if (v === stringValue) {
                  target.push(selectedMarkerAttribute);
                  break;
                }
              }
            } else {
              {
                checkAttributeStringCoercion(selectedValue, "select.value");
              }
              if ("" + selectedValue === stringValue) {
                target.push(selectedMarkerAttribute);
              }
            }
          } else if (selected) {
            target.push(selectedMarkerAttribute);
          }
          target.push(endOfStartTag);
          pushInnerHTML(target, innerHTML, children);
          return children;
        }
        function pushInput(target, props, responseState) {
          {
            checkControlledValueProps("input", props);
            if (props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked) {
              error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
              didWarnDefaultChecked = true;
            }
            if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue) {
              error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
              didWarnDefaultInputValue = true;
            }
          }
          target.push(startChunkForTag("input"));
          var value = null;
          var defaultValue = null;
          var checked = null;
          var defaultChecked = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                // eslint-disable-next-line-no-fallthrough
                case "defaultChecked":
                  defaultChecked = propValue;
                  break;
                case "defaultValue":
                  defaultValue = propValue;
                  break;
                case "checked":
                  checked = propValue;
                  break;
                case "value":
                  value = propValue;
                  break;
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          if (checked !== null) {
            pushAttribute(target, responseState, "checked", checked);
          } else if (defaultChecked !== null) {
            pushAttribute(target, responseState, "checked", defaultChecked);
          }
          if (value !== null) {
            pushAttribute(target, responseState, "value", value);
          } else if (defaultValue !== null) {
            pushAttribute(target, responseState, "value", defaultValue);
          }
          target.push(endOfStartTagSelfClosing);
          return null;
        }
        function pushStartTextArea(target, props, responseState) {
          {
            checkControlledValueProps("textarea", props);
            if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue) {
              error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components");
              didWarnDefaultTextareaValue = true;
            }
          }
          target.push(startChunkForTag("textarea"));
          var value = null;
          var defaultValue = null;
          var children = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "value":
                  value = propValue;
                  break;
                case "defaultValue":
                  defaultValue = propValue;
                  break;
                case "dangerouslySetInnerHTML":
                  throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
                // eslint-disable-next-line-no-fallthrough
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          if (value === null && defaultValue !== null) {
            value = defaultValue;
          }
          target.push(endOfStartTag);
          if (children != null) {
            {
              error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
            }
            if (value != null) {
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            }
            if (isArray(children)) {
              if (children.length > 1) {
                throw new Error("<textarea> can only have at most one child.");
              }
              {
                checkHtmlStringCoercion(children[0]);
              }
              value = "" + children[0];
            }
            {
              checkHtmlStringCoercion(children);
            }
            value = "" + children;
          }
          if (typeof value === "string" && value[0] === "\n") {
            target.push(leadingNewline);
          }
          if (value !== null) {
            {
              checkAttributeStringCoercion(value, "value");
            }
            target.push(stringToChunk(encodeHTMLTextNode("" + value)));
          }
          return null;
        }
        function pushSelfClosing(target, props, tag, responseState) {
          target.push(startChunkForTag(tag));
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw new Error(tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                // eslint-disable-next-line-no-fallthrough
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          target.push(endOfStartTagSelfClosing);
          return null;
        }
        function pushStartMenuItem(target, props, responseState) {
          target.push(startChunkForTag("menuitem"));
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
                // eslint-disable-next-line-no-fallthrough
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          target.push(endOfStartTag);
          return null;
        }
        function pushStartTitle(target, props, responseState) {
          target.push(startChunkForTag("title"));
          var children = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "dangerouslySetInnerHTML":
                  throw new Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
                // eslint-disable-next-line-no-fallthrough
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          target.push(endOfStartTag);
          {
            var child = Array.isArray(children) && children.length < 2 ? children[0] || null : children;
            if (Array.isArray(children) && children.length > 1) {
              error("A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
            } else if (child != null && child.$$typeof != null) {
              error("A title element received a React element for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
            } else if (child != null && typeof child !== "string" && typeof child !== "number") {
              error("A title element received a value that was not a string or number for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
            }
          }
          return children;
        }
        function pushStartGenericElement(target, props, tag, responseState) {
          target.push(startChunkForTag(tag));
          var children = null;
          var innerHTML = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML = propValue;
                  break;
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          target.push(endOfStartTag);
          pushInnerHTML(target, innerHTML, children);
          if (typeof children === "string") {
            target.push(stringToChunk(encodeHTMLTextNode(children)));
            return null;
          }
          return children;
        }
        function pushStartCustomElement(target, props, tag, responseState) {
          target.push(startChunkForTag(tag));
          var children = null;
          var innerHTML = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML = propValue;
                  break;
                case "style":
                  pushStyle(target, responseState, propValue);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                  break;
                default:
                  if (isAttributeNameSafe(propKey) && typeof propValue !== "function" && typeof propValue !== "symbol") {
                    target.push(attributeSeparator, stringToChunk(propKey), attributeAssign, stringToChunk(escapeTextForBrowser(propValue)), attributeEnd);
                  }
                  break;
              }
            }
          }
          target.push(endOfStartTag);
          pushInnerHTML(target, innerHTML, children);
          return children;
        }
        var leadingNewline = stringToPrecomputedChunk("\n");
        function pushStartPreformattedElement(target, props, tag, responseState) {
          target.push(startChunkForTag(tag));
          var children = null;
          var innerHTML = null;
          for (var propKey in props) {
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              switch (propKey) {
                case "children":
                  children = propValue;
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML = propValue;
                  break;
                default:
                  pushAttribute(target, responseState, propKey, propValue);
                  break;
              }
            }
          }
          target.push(endOfStartTag);
          if (innerHTML != null) {
            if (children != null) {
              throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            }
            if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
              throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
            }
            var html = innerHTML.__html;
            if (html !== null && html !== void 0) {
              if (typeof html === "string" && html.length > 0 && html[0] === "\n") {
                target.push(leadingNewline, stringToChunk(html));
              } else {
                {
                  checkHtmlStringCoercion(html);
                }
                target.push(stringToChunk("" + html));
              }
            }
          }
          if (typeof children === "string" && children[0] === "\n") {
            target.push(leadingNewline);
          }
          return children;
        }
        var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
        var validatedTagCache = /* @__PURE__ */ new Map();
        function startChunkForTag(tag) {
          var tagStartChunk = validatedTagCache.get(tag);
          if (tagStartChunk === void 0) {
            if (!VALID_TAG_REGEX.test(tag)) {
              throw new Error("Invalid tag: " + tag);
            }
            tagStartChunk = stringToPrecomputedChunk("<" + tag);
            validatedTagCache.set(tag, tagStartChunk);
          }
          return tagStartChunk;
        }
        var DOCTYPE = stringToPrecomputedChunk("<!DOCTYPE html>");
        function pushStartInstance(target, type, props, responseState, formatContext) {
          {
            validateProperties(type, props);
            validateProperties$1(type, props);
            validateProperties$2(type, props, null);
            if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
              error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
            }
            if (formatContext.insertionMode !== SVG_MODE && formatContext.insertionMode !== MATHML_MODE) {
              if (type.indexOf("-") === -1 && typeof props.is !== "string" && type.toLowerCase() !== type) {
                error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", type);
              }
            }
          }
          switch (type) {
            // Special tags
            case "select":
              return pushStartSelect(target, props, responseState);
            case "option":
              return pushStartOption(target, props, responseState, formatContext);
            case "textarea":
              return pushStartTextArea(target, props, responseState);
            case "input":
              return pushInput(target, props, responseState);
            case "menuitem":
              return pushStartMenuItem(target, props, responseState);
            case "title":
              return pushStartTitle(target, props, responseState);
            // Newline eating tags
            case "listing":
            case "pre": {
              return pushStartPreformattedElement(target, props, type, responseState);
            }
            // Omitted close tags
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "img":
            case "keygen":
            case "link":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr": {
              return pushSelfClosing(target, props, type, responseState);
            }
            // These are reserved SVG and MathML elements, that are never custom elements.
            // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph": {
              return pushStartGenericElement(target, props, type, responseState);
            }
            case "html": {
              if (formatContext.insertionMode === ROOT_HTML_MODE) {
                target.push(DOCTYPE);
              }
              return pushStartGenericElement(target, props, type, responseState);
            }
            default: {
              if (type.indexOf("-") === -1 && typeof props.is !== "string") {
                return pushStartGenericElement(target, props, type, responseState);
              } else {
                return pushStartCustomElement(target, props, type, responseState);
              }
            }
          }
        }
        var endTag1 = stringToPrecomputedChunk("</");
        var endTag2 = stringToPrecomputedChunk(">");
        function pushEndInstance(target, type, props) {
          switch (type) {
            // Omitted close tags
            // TODO: Instead of repeating this switch we could try to pass a flag from above.
            // That would require returning a tuple. Which might be ok if it gets inlined.
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "img":
            case "input":
            case "keygen":
            case "link":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr": {
              break;
            }
            default: {
              target.push(endTag1, stringToChunk(type), endTag2);
            }
          }
        }
        function writeCompletedRoot(destination, responseState) {
          var bootstrapChunks = responseState.bootstrapChunks;
          var i = 0;
          for (; i < bootstrapChunks.length - 1; i++) {
            writeChunk(destination, bootstrapChunks[i]);
          }
          if (i < bootstrapChunks.length) {
            return writeChunkAndReturn(destination, bootstrapChunks[i]);
          }
          return true;
        }
        var placeholder1 = stringToPrecomputedChunk('<template id="');
        var placeholder2 = stringToPrecomputedChunk('"></template>');
        function writePlaceholder(destination, responseState, id) {
          writeChunk(destination, placeholder1);
          writeChunk(destination, responseState.placeholderPrefix);
          var formattedID = stringToChunk(id.toString(16));
          writeChunk(destination, formattedID);
          return writeChunkAndReturn(destination, placeholder2);
        }
        var startCompletedSuspenseBoundary = stringToPrecomputedChunk("<!--$-->");
        var startPendingSuspenseBoundary1 = stringToPrecomputedChunk('<!--$?--><template id="');
        var startPendingSuspenseBoundary2 = stringToPrecomputedChunk('"></template>');
        var startClientRenderedSuspenseBoundary = stringToPrecomputedChunk("<!--$!-->");
        var endSuspenseBoundary = stringToPrecomputedChunk("<!--/$-->");
        var clientRenderedSuspenseBoundaryError1 = stringToPrecomputedChunk("<template");
        var clientRenderedSuspenseBoundaryErrorAttrInterstitial = stringToPrecomputedChunk('"');
        var clientRenderedSuspenseBoundaryError1A = stringToPrecomputedChunk(' data-dgst="');
        var clientRenderedSuspenseBoundaryError1B = stringToPrecomputedChunk(' data-msg="');
        var clientRenderedSuspenseBoundaryError1C = stringToPrecomputedChunk(' data-stck="');
        var clientRenderedSuspenseBoundaryError2 = stringToPrecomputedChunk("></template>");
        function writeStartCompletedSuspenseBoundary(destination, responseState) {
          return writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
        }
        function writeStartPendingSuspenseBoundary(destination, responseState, id) {
          writeChunk(destination, startPendingSuspenseBoundary1);
          if (id === null) {
            throw new Error("An ID must have been assigned before we can complete the boundary.");
          }
          writeChunk(destination, id);
          return writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
        }
        function writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMesssage, errorComponentStack) {
          var result;
          result = writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary);
          writeChunk(destination, clientRenderedSuspenseBoundaryError1);
          if (errorDigest) {
            writeChunk(destination, clientRenderedSuspenseBoundaryError1A);
            writeChunk(destination, stringToChunk(escapeTextForBrowser(errorDigest)));
            writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
          }
          {
            if (errorMesssage) {
              writeChunk(destination, clientRenderedSuspenseBoundaryError1B);
              writeChunk(destination, stringToChunk(escapeTextForBrowser(errorMesssage)));
              writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
            }
            if (errorComponentStack) {
              writeChunk(destination, clientRenderedSuspenseBoundaryError1C);
              writeChunk(destination, stringToChunk(escapeTextForBrowser(errorComponentStack)));
              writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
            }
          }
          result = writeChunkAndReturn(destination, clientRenderedSuspenseBoundaryError2);
          return result;
        }
        function writeEndCompletedSuspenseBoundary(destination, responseState) {
          return writeChunkAndReturn(destination, endSuspenseBoundary);
        }
        function writeEndPendingSuspenseBoundary(destination, responseState) {
          return writeChunkAndReturn(destination, endSuspenseBoundary);
        }
        function writeEndClientRenderedSuspenseBoundary(destination, responseState) {
          return writeChunkAndReturn(destination, endSuspenseBoundary);
        }
        var startSegmentHTML = stringToPrecomputedChunk('<div hidden id="');
        var startSegmentHTML2 = stringToPrecomputedChunk('">');
        var endSegmentHTML = stringToPrecomputedChunk("</div>");
        var startSegmentSVG = stringToPrecomputedChunk('<svg aria-hidden="true" style="display:none" id="');
        var startSegmentSVG2 = stringToPrecomputedChunk('">');
        var endSegmentSVG = stringToPrecomputedChunk("</svg>");
        var startSegmentMathML = stringToPrecomputedChunk('<math aria-hidden="true" style="display:none" id="');
        var startSegmentMathML2 = stringToPrecomputedChunk('">');
        var endSegmentMathML = stringToPrecomputedChunk("</math>");
        var startSegmentTable = stringToPrecomputedChunk('<table hidden id="');
        var startSegmentTable2 = stringToPrecomputedChunk('">');
        var endSegmentTable = stringToPrecomputedChunk("</table>");
        var startSegmentTableBody = stringToPrecomputedChunk('<table hidden><tbody id="');
        var startSegmentTableBody2 = stringToPrecomputedChunk('">');
        var endSegmentTableBody = stringToPrecomputedChunk("</tbody></table>");
        var startSegmentTableRow = stringToPrecomputedChunk('<table hidden><tr id="');
        var startSegmentTableRow2 = stringToPrecomputedChunk('">');
        var endSegmentTableRow = stringToPrecomputedChunk("</tr></table>");
        var startSegmentColGroup = stringToPrecomputedChunk('<table hidden><colgroup id="');
        var startSegmentColGroup2 = stringToPrecomputedChunk('">');
        var endSegmentColGroup = stringToPrecomputedChunk("</colgroup></table>");
        function writeStartSegment(destination, responseState, formatContext, id) {
          switch (formatContext.insertionMode) {
            case ROOT_HTML_MODE:
            case HTML_MODE: {
              writeChunk(destination, startSegmentHTML);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentHTML2);
            }
            case SVG_MODE: {
              writeChunk(destination, startSegmentSVG);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentSVG2);
            }
            case MATHML_MODE: {
              writeChunk(destination, startSegmentMathML);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentMathML2);
            }
            case HTML_TABLE_MODE: {
              writeChunk(destination, startSegmentTable);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentTable2);
            }
            // TODO: For the rest of these, there will be extra wrapper nodes that never
            // get deleted from the document. We need to delete the table too as part
            // of the injected scripts. They are invisible though so it's not too terrible
            // and it's kind of an edge case to suspend in a table. Totally supported though.
            case HTML_TABLE_BODY_MODE: {
              writeChunk(destination, startSegmentTableBody);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentTableBody2);
            }
            case HTML_TABLE_ROW_MODE: {
              writeChunk(destination, startSegmentTableRow);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentTableRow2);
            }
            case HTML_COLGROUP_MODE: {
              writeChunk(destination, startSegmentColGroup);
              writeChunk(destination, responseState.segmentPrefix);
              writeChunk(destination, stringToChunk(id.toString(16)));
              return writeChunkAndReturn(destination, startSegmentColGroup2);
            }
            default: {
              throw new Error("Unknown insertion mode. This is a bug in React.");
            }
          }
        }
        function writeEndSegment(destination, formatContext) {
          switch (formatContext.insertionMode) {
            case ROOT_HTML_MODE:
            case HTML_MODE: {
              return writeChunkAndReturn(destination, endSegmentHTML);
            }
            case SVG_MODE: {
              return writeChunkAndReturn(destination, endSegmentSVG);
            }
            case MATHML_MODE: {
              return writeChunkAndReturn(destination, endSegmentMathML);
            }
            case HTML_TABLE_MODE: {
              return writeChunkAndReturn(destination, endSegmentTable);
            }
            case HTML_TABLE_BODY_MODE: {
              return writeChunkAndReturn(destination, endSegmentTableBody);
            }
            case HTML_TABLE_ROW_MODE: {
              return writeChunkAndReturn(destination, endSegmentTableRow);
            }
            case HTML_COLGROUP_MODE: {
              return writeChunkAndReturn(destination, endSegmentColGroup);
            }
            default: {
              throw new Error("Unknown insertion mode. This is a bug in React.");
            }
          }
        }
        var completeSegmentFunction = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}";
        var completeBoundaryFunction = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}';
        var clientRenderFunction = 'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())}';
        var completeSegmentScript1Full = stringToPrecomputedChunk(completeSegmentFunction + ';$RS("');
        var completeSegmentScript1Partial = stringToPrecomputedChunk('$RS("');
        var completeSegmentScript2 = stringToPrecomputedChunk('","');
        var completeSegmentScript3 = stringToPrecomputedChunk('")</script>');
        function writeCompletedSegmentInstruction(destination, responseState, contentSegmentID) {
          writeChunk(destination, responseState.startInlineScript);
          if (!responseState.sentCompleteSegmentFunction) {
            responseState.sentCompleteSegmentFunction = true;
            writeChunk(destination, completeSegmentScript1Full);
          } else {
            writeChunk(destination, completeSegmentScript1Partial);
          }
          writeChunk(destination, responseState.segmentPrefix);
          var formattedID = stringToChunk(contentSegmentID.toString(16));
          writeChunk(destination, formattedID);
          writeChunk(destination, completeSegmentScript2);
          writeChunk(destination, responseState.placeholderPrefix);
          writeChunk(destination, formattedID);
          return writeChunkAndReturn(destination, completeSegmentScript3);
        }
        var completeBoundaryScript1Full = stringToPrecomputedChunk(completeBoundaryFunction + ';$RC("');
        var completeBoundaryScript1Partial = stringToPrecomputedChunk('$RC("');
        var completeBoundaryScript2 = stringToPrecomputedChunk('","');
        var completeBoundaryScript3 = stringToPrecomputedChunk('")</script>');
        function writeCompletedBoundaryInstruction(destination, responseState, boundaryID, contentSegmentID) {
          writeChunk(destination, responseState.startInlineScript);
          if (!responseState.sentCompleteBoundaryFunction) {
            responseState.sentCompleteBoundaryFunction = true;
            writeChunk(destination, completeBoundaryScript1Full);
          } else {
            writeChunk(destination, completeBoundaryScript1Partial);
          }
          if (boundaryID === null) {
            throw new Error("An ID must have been assigned before we can complete the boundary.");
          }
          var formattedContentID = stringToChunk(contentSegmentID.toString(16));
          writeChunk(destination, boundaryID);
          writeChunk(destination, completeBoundaryScript2);
          writeChunk(destination, responseState.segmentPrefix);
          writeChunk(destination, formattedContentID);
          return writeChunkAndReturn(destination, completeBoundaryScript3);
        }
        var clientRenderScript1Full = stringToPrecomputedChunk(clientRenderFunction + ';$RX("');
        var clientRenderScript1Partial = stringToPrecomputedChunk('$RX("');
        var clientRenderScript1A = stringToPrecomputedChunk('"');
        var clientRenderScript2 = stringToPrecomputedChunk(")</script>");
        var clientRenderErrorScriptArgInterstitial = stringToPrecomputedChunk(",");
        function writeClientRenderBoundaryInstruction(destination, responseState, boundaryID, errorDigest, errorMessage, errorComponentStack) {
          writeChunk(destination, responseState.startInlineScript);
          if (!responseState.sentClientRenderFunction) {
            responseState.sentClientRenderFunction = true;
            writeChunk(destination, clientRenderScript1Full);
          } else {
            writeChunk(destination, clientRenderScript1Partial);
          }
          if (boundaryID === null) {
            throw new Error("An ID must have been assigned before we can complete the boundary.");
          }
          writeChunk(destination, boundaryID);
          writeChunk(destination, clientRenderScript1A);
          if (errorDigest || errorMessage || errorComponentStack) {
            writeChunk(destination, clientRenderErrorScriptArgInterstitial);
            writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorDigest || "")));
          }
          if (errorMessage || errorComponentStack) {
            writeChunk(destination, clientRenderErrorScriptArgInterstitial);
            writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorMessage || "")));
          }
          if (errorComponentStack) {
            writeChunk(destination, clientRenderErrorScriptArgInterstitial);
            writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorComponentStack)));
          }
          return writeChunkAndReturn(destination, clientRenderScript2);
        }
        var regexForJSStringsInScripts = /[<\u2028\u2029]/g;
        function escapeJSStringsForInstructionScripts(input) {
          var escaped = JSON.stringify(input);
          return escaped.replace(regexForJSStringsInScripts, function(match) {
            switch (match) {
              // santizing breaking out of strings and script tags
              case "<":
                return "\\u003c";
              case "\u2028":
                return "\\u2028";
              case "\u2029":
                return "\\u2029";
              default: {
                throw new Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
              }
            }
          });
        }
        var assign = Object.assign;
        var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.element");
        var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = /* @__PURE__ */ Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
        var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
        var REACT_SCOPE_TYPE = /* @__PURE__ */ Symbol.for("react.scope");
        var REACT_DEBUG_TRACING_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.debug_trace_mode");
        var REACT_LEGACY_HIDDEN_TYPE = /* @__PURE__ */ Symbol.for("react.legacy_hidden");
        var REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = /* @__PURE__ */ Symbol.for("react.default_value");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeClassComponentFrame(ctor, source, ownerFn) {
          {
            return describeNativeComponentFrame(ctor, true);
          }
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var warnedAboutMissingGetChildContext;
        {
          warnedAboutMissingGetChildContext = {};
        }
        var emptyContextObject = {};
        {
          Object.freeze(emptyContextObject);
        }
        function getMaskedContext(type, unmaskedContext) {
          {
            var contextTypes = type.contextTypes;
            if (!contextTypes) {
              return emptyContextObject;
            }
            var context = {};
            for (var key in contextTypes) {
              context[key] = unmaskedContext[key];
            }
            {
              var name = getComponentNameFromType(type) || "Unknown";
              checkPropTypes(contextTypes, context, "context", name);
            }
            return context;
          }
        }
        function processChildContext(instance, type, parentContext, childContextTypes) {
          {
            if (typeof instance.getChildContext !== "function") {
              {
                var componentName = getComponentNameFromType(type) || "Unknown";
                if (!warnedAboutMissingGetChildContext[componentName]) {
                  warnedAboutMissingGetChildContext[componentName] = true;
                  error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName);
                }
              }
              return parentContext;
            }
            var childContext = instance.getChildContext();
            for (var contextKey in childContext) {
              if (!(contextKey in childContextTypes)) {
                throw new Error((getComponentNameFromType(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
              }
            }
            {
              var name = getComponentNameFromType(type) || "Unknown";
              checkPropTypes(childContextTypes, childContext, "child context", name);
            }
            return assign({}, parentContext, childContext);
          }
        }
        var rendererSigil;
        {
          rendererSigil = {};
        }
        var rootContextSnapshot = null;
        var currentActiveSnapshot = null;
        function popNode(prev) {
          {
            prev.context._currentValue = prev.parentValue;
          }
        }
        function pushNode(next) {
          {
            next.context._currentValue = next.value;
          }
        }
        function popToNearestCommonAncestor(prev, next) {
          if (prev === next) ;
          else {
            popNode(prev);
            var parentPrev = prev.parent;
            var parentNext = next.parent;
            if (parentPrev === null) {
              if (parentNext !== null) {
                throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
              }
            } else {
              if (parentNext === null) {
                throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
              }
              popToNearestCommonAncestor(parentPrev, parentNext);
            }
            pushNode(next);
          }
        }
        function popAllPrevious(prev) {
          popNode(prev);
          var parentPrev = prev.parent;
          if (parentPrev !== null) {
            popAllPrevious(parentPrev);
          }
        }
        function pushAllNext(next) {
          var parentNext = next.parent;
          if (parentNext !== null) {
            pushAllNext(parentNext);
          }
          pushNode(next);
        }
        function popPreviousToCommonLevel(prev, next) {
          popNode(prev);
          var parentPrev = prev.parent;
          if (parentPrev === null) {
            throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
          }
          if (parentPrev.depth === next.depth) {
            popToNearestCommonAncestor(parentPrev, next);
          } else {
            popPreviousToCommonLevel(parentPrev, next);
          }
        }
        function popNextToCommonLevel(prev, next) {
          var parentNext = next.parent;
          if (parentNext === null) {
            throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
          }
          if (prev.depth === parentNext.depth) {
            popToNearestCommonAncestor(prev, parentNext);
          } else {
            popNextToCommonLevel(prev, parentNext);
          }
          pushNode(next);
        }
        function switchContext(newSnapshot) {
          var prev = currentActiveSnapshot;
          var next = newSnapshot;
          if (prev !== next) {
            if (prev === null) {
              pushAllNext(next);
            } else if (next === null) {
              popAllPrevious(prev);
            } else if (prev.depth === next.depth) {
              popToNearestCommonAncestor(prev, next);
            } else if (prev.depth > next.depth) {
              popPreviousToCommonLevel(prev, next);
            } else {
              popNextToCommonLevel(prev, next);
            }
            currentActiveSnapshot = next;
          }
        }
        function pushProvider(context, nextValue) {
          var prevValue;
          {
            prevValue = context._currentValue;
            context._currentValue = nextValue;
            {
              if (context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil) {
                error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
              }
              context._currentRenderer = rendererSigil;
            }
          }
          var prevNode = currentActiveSnapshot;
          var newNode = {
            parent: prevNode,
            depth: prevNode === null ? 0 : prevNode.depth + 1,
            context,
            parentValue: prevValue,
            value: nextValue
          };
          currentActiveSnapshot = newNode;
          return newNode;
        }
        function popProvider(context) {
          var prevSnapshot = currentActiveSnapshot;
          if (prevSnapshot === null) {
            throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
          }
          {
            if (prevSnapshot.context !== context) {
              error("The parent context is not the expected context. This is probably a bug in React.");
            }
          }
          {
            var value = prevSnapshot.parentValue;
            if (value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED) {
              prevSnapshot.context._currentValue = prevSnapshot.context._defaultValue;
            } else {
              prevSnapshot.context._currentValue = value;
            }
            {
              if (context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil) {
                error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
              }
              context._currentRenderer = rendererSigil;
            }
          }
          return currentActiveSnapshot = prevSnapshot.parent;
        }
        function getActiveContext() {
          return currentActiveSnapshot;
        }
        function readContext(context) {
          var value = context._currentValue;
          return value;
        }
        function get(key) {
          return key._reactInternals;
        }
        function set(key, value) {
          key._reactInternals = value;
        }
        var didWarnAboutNoopUpdateForComponent = {};
        var didWarnAboutDeprecatedWillMount = {};
        var didWarnAboutUninitializedState;
        var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate;
        var didWarnAboutLegacyLifecyclesAndDerivedState;
        var didWarnAboutUndefinedDerivedState;
        var warnOnUndefinedDerivedState;
        var warnOnInvalidCallback;
        var didWarnAboutDirectlyAssigningPropsToState;
        var didWarnAboutContextTypeAndContextTypes;
        var didWarnAboutInvalidateContextType;
        {
          didWarnAboutUninitializedState = /* @__PURE__ */ new Set();
          didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = /* @__PURE__ */ new Set();
          didWarnAboutLegacyLifecyclesAndDerivedState = /* @__PURE__ */ new Set();
          didWarnAboutDirectlyAssigningPropsToState = /* @__PURE__ */ new Set();
          didWarnAboutUndefinedDerivedState = /* @__PURE__ */ new Set();
          didWarnAboutContextTypeAndContextTypes = /* @__PURE__ */ new Set();
          didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
          var didWarnOnInvalidCallback = /* @__PURE__ */ new Set();
          warnOnInvalidCallback = function(callback, callerName) {
            if (callback === null || typeof callback === "function") {
              return;
            }
            var key = callerName + "_" + callback;
            if (!didWarnOnInvalidCallback.has(key)) {
              didWarnOnInvalidCallback.add(key);
              error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback);
            }
          };
          warnOnUndefinedDerivedState = function(type, partialState) {
            if (partialState === void 0) {
              var componentName = getComponentNameFromType(type) || "Component";
              if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
                didWarnAboutUndefinedDerivedState.add(componentName);
                error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName);
              }
            }
          };
        }
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && getComponentNameFromType(_constructor) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnAboutNoopUpdateForComponent[warningKey]) {
              return;
            }
            error("%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.\n\nPlease check the code for the %s component.", callerName, callerName, componentName);
            didWarnAboutNoopUpdateForComponent[warningKey] = true;
          }
        }
        var classComponentUpdater = {
          isMounted: function(inst) {
            return false;
          },
          enqueueSetState: function(inst, payload, callback) {
            var internals = get(inst);
            if (internals.queue === null) {
              warnNoop(inst, "setState");
            } else {
              internals.queue.push(payload);
              {
                if (callback !== void 0 && callback !== null) {
                  warnOnInvalidCallback(callback, "setState");
                }
              }
            }
          },
          enqueueReplaceState: function(inst, payload, callback) {
            var internals = get(inst);
            internals.replace = true;
            internals.queue = [payload];
            {
              if (callback !== void 0 && callback !== null) {
                warnOnInvalidCallback(callback, "setState");
              }
            }
          },
          enqueueForceUpdate: function(inst, callback) {
            var internals = get(inst);
            if (internals.queue === null) {
              warnNoop(inst, "forceUpdate");
            } else {
              {
                if (callback !== void 0 && callback !== null) {
                  warnOnInvalidCallback(callback, "setState");
                }
              }
            }
          }
        };
        function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
          var partialState = getDerivedStateFromProps(nextProps, prevState);
          {
            warnOnUndefinedDerivedState(ctor, partialState);
          }
          var newState = partialState === null || partialState === void 0 ? prevState : assign({}, prevState, partialState);
          return newState;
        }
        function constructClassInstance(ctor, props, maskedLegacyContext) {
          var context = emptyContextObject;
          var contextType = ctor.contextType;
          {
            if ("contextType" in ctor) {
              var isValid = (
                // Allow null for conditional declaration
                contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0
              );
              if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
                didWarnAboutInvalidateContextType.add(ctor);
                var addendum = "";
                if (contextType === void 0) {
                  addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
                } else if (typeof contextType !== "object") {
                  addendum = " However, it is set to a " + typeof contextType + ".";
                } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                  addendum = " Did you accidentally pass the Context.Provider instead?";
                } else if (contextType._context !== void 0) {
                  addendum = " Did you accidentally pass the Context.Consumer instead?";
                } else {
                  addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.";
                }
                error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(ctor) || "Component", addendum);
              }
            }
          }
          if (typeof contextType === "object" && contextType !== null) {
            context = readContext(contextType);
          } else {
            context = maskedLegacyContext;
          }
          var instance = new ctor(props, context);
          {
            if (typeof ctor.getDerivedStateFromProps === "function" && (instance.state === null || instance.state === void 0)) {
              var componentName = getComponentNameFromType(ctor) || "Component";
              if (!didWarnAboutUninitializedState.has(componentName)) {
                didWarnAboutUninitializedState.add(componentName);
                error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName);
              }
            }
            if (typeof ctor.getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function") {
              var foundWillMountName = null;
              var foundWillReceivePropsName = null;
              var foundWillUpdateName = null;
              if (typeof instance.componentWillMount === "function" && instance.componentWillMount.__suppressDeprecationWarning !== true) {
                foundWillMountName = "componentWillMount";
              } else if (typeof instance.UNSAFE_componentWillMount === "function") {
                foundWillMountName = "UNSAFE_componentWillMount";
              }
              if (typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
                foundWillReceivePropsName = "componentWillReceiveProps";
              } else if (typeof instance.UNSAFE_componentWillReceiveProps === "function") {
                foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
              }
              if (typeof instance.componentWillUpdate === "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
                foundWillUpdateName = "componentWillUpdate";
              } else if (typeof instance.UNSAFE_componentWillUpdate === "function") {
                foundWillUpdateName = "UNSAFE_componentWillUpdate";
              }
              if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
                var _componentName = getComponentNameFromType(ctor) || "Component";
                var newApiName = typeof ctor.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
                if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
                  didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
                  error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles", _componentName, newApiName, foundWillMountName !== null ? "\n  " + foundWillMountName : "", foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "", foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "");
                }
              }
            }
          }
          return instance;
        }
        function checkClassInstance(instance, ctor, newProps) {
          {
            var name = getComponentNameFromType(ctor) || "Component";
            var renderPresent = instance.render;
            if (!renderPresent) {
              if (ctor.prototype && typeof ctor.prototype.render === "function") {
                error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name);
              } else {
                error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name);
              }
            }
            if (instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state) {
              error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name);
            }
            if (instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name);
            }
            if (instance.propTypes) {
              error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name);
            }
            if (instance.contextType) {
              error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name);
            }
            {
              if (instance.contextTypes) {
                error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name);
              }
              if (ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor)) {
                didWarnAboutContextTypeAndContextTypes.add(ctor);
                error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name);
              }
            }
            if (typeof instance.componentShouldUpdate === "function") {
              error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name);
            }
            if (ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== "undefined") {
              error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(ctor) || "A pure component");
            }
            if (typeof instance.componentDidUnmount === "function") {
              error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name);
            }
            if (typeof instance.componentDidReceiveProps === "function") {
              error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name);
            }
            if (typeof instance.componentWillRecieveProps === "function") {
              error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name);
            }
            if (typeof instance.UNSAFE_componentWillRecieveProps === "function") {
              error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
            }
            var hasMutatedProps = instance.props !== newProps;
            if (instance.props !== void 0 && hasMutatedProps) {
              error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name);
            }
            if (instance.defaultProps) {
              error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name);
            }
            if (typeof instance.getSnapshotBeforeUpdate === "function" && typeof instance.componentDidUpdate !== "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)) {
              didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);
              error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(ctor));
            }
            if (typeof instance.getDerivedStateFromProps === "function") {
              error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
            }
            if (typeof instance.getDerivedStateFromError === "function") {
              error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
            }
            if (typeof ctor.getSnapshotBeforeUpdate === "function") {
              error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
            }
            var _state = instance.state;
            if (_state && (typeof _state !== "object" || isArray(_state))) {
              error("%s.state: must be set to an object or null", name);
            }
            if (typeof instance.getChildContext === "function" && typeof ctor.childContextTypes !== "object") {
              error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
            }
          }
        }
        function callComponentWillMount(type, instance) {
          var oldState = instance.state;
          if (typeof instance.componentWillMount === "function") {
            {
              if (instance.componentWillMount.__suppressDeprecationWarning !== true) {
                var componentName = getComponentNameFromType(type) || "Unknown";
                if (!didWarnAboutDeprecatedWillMount[componentName]) {
                  warn(
                    // keep this warning in sync with ReactStrictModeWarning.js
                    "componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s",
                    componentName
                  );
                  didWarnAboutDeprecatedWillMount[componentName] = true;
                }
              }
            }
            instance.componentWillMount();
          }
          if (typeof instance.UNSAFE_componentWillMount === "function") {
            instance.UNSAFE_componentWillMount();
          }
          if (oldState !== instance.state) {
            {
              error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromType(type) || "Component");
            }
            classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
          }
        }
        function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
          if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
            var oldQueue = internalInstance.queue;
            var oldReplace = internalInstance.replace;
            internalInstance.queue = null;
            internalInstance.replace = false;
            if (oldReplace && oldQueue.length === 1) {
              inst.state = oldQueue[0];
            } else {
              var nextState = oldReplace ? oldQueue[0] : inst.state;
              var dontMutate = true;
              for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
                var partial = oldQueue[i];
                var partialState = typeof partial === "function" ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;
                if (partialState != null) {
                  if (dontMutate) {
                    dontMutate = false;
                    nextState = assign({}, nextState, partialState);
                  } else {
                    assign(nextState, partialState);
                  }
                }
              }
              inst.state = nextState;
            }
          } else {
            internalInstance.queue = null;
          }
        }
        function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {
          {
            checkClassInstance(instance, ctor, newProps);
          }
          var initialState = instance.state !== void 0 ? instance.state : null;
          instance.updater = classComponentUpdater;
          instance.props = newProps;
          instance.state = initialState;
          var internalInstance = {
            queue: [],
            replace: false
          };
          set(instance, internalInstance);
          var contextType = ctor.contextType;
          if (typeof contextType === "object" && contextType !== null) {
            instance.context = readContext(contextType);
          } else {
            instance.context = maskedLegacyContext;
          }
          {
            if (instance.state === newProps) {
              var componentName = getComponentNameFromType(ctor) || "Component";
              if (!didWarnAboutDirectlyAssigningPropsToState.has(componentName)) {
                didWarnAboutDirectlyAssigningPropsToState.add(componentName);
                error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName);
              }
            }
          }
          var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
          if (typeof getDerivedStateFromProps === "function") {
            instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps);
          }
          if (typeof ctor.getDerivedStateFromProps !== "function" && typeof instance.getSnapshotBeforeUpdate !== "function" && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
            callComponentWillMount(ctor, instance);
            processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext);
          }
        }
        var emptyTreeContext = {
          id: 1,
          overflow: ""
        };
        function getTreeId(context) {
          var overflow = context.overflow;
          var idWithLeadingBit = context.id;
          var id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
          return id.toString(32) + overflow;
        }
        function pushTreeContext(baseContext, totalChildren, index) {
          var baseIdWithLeadingBit = baseContext.id;
          var baseOverflow = baseContext.overflow;
          var baseLength = getBitLength(baseIdWithLeadingBit) - 1;
          var baseId = baseIdWithLeadingBit & ~(1 << baseLength);
          var slot = index + 1;
          var length = getBitLength(totalChildren) + baseLength;
          if (length > 30) {
            var numberOfOverflowBits = baseLength - baseLength % 5;
            var newOverflowBits = (1 << numberOfOverflowBits) - 1;
            var newOverflow = (baseId & newOverflowBits).toString(32);
            var restOfBaseId = baseId >> numberOfOverflowBits;
            var restOfBaseLength = baseLength - numberOfOverflowBits;
            var restOfLength = getBitLength(totalChildren) + restOfBaseLength;
            var restOfNewBits = slot << restOfBaseLength;
            var id = restOfNewBits | restOfBaseId;
            var overflow = newOverflow + baseOverflow;
            return {
              id: 1 << restOfLength | id,
              overflow
            };
          } else {
            var newBits = slot << baseLength;
            var _id = newBits | baseId;
            var _overflow = baseOverflow;
            return {
              id: 1 << length | _id,
              overflow: _overflow
            };
          }
        }
        function getBitLength(number) {
          return 32 - clz32(number);
        }
        function getLeadingBit(id) {
          return 1 << getBitLength(id) - 1;
        }
        var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
        var log = Math.log;
        var LN2 = Math.LN2;
        function clz32Fallback(x) {
          var asUint = x >>> 0;
          if (asUint === 0) {
            return 32;
          }
          return 31 - (log(asUint) / LN2 | 0) | 0;
        }
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var currentlyRenderingComponent = null;
        var currentlyRenderingTask = null;
        var firstWorkInProgressHook = null;
        var workInProgressHook = null;
        var isReRender = false;
        var didScheduleRenderPhaseUpdate = false;
        var localIdCounter = 0;
        var renderPhaseUpdates = null;
        var numberOfReRenders = 0;
        var RE_RENDER_LIMIT = 25;
        var isInHookUserCodeInDev = false;
        var currentHookNameInDev;
        function resolveCurrentlyRenderingComponent() {
          if (currentlyRenderingComponent === null) {
            throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
          }
          {
            if (isInHookUserCodeInDev) {
              error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
            }
          }
          return currentlyRenderingComponent;
        }
        function areHookInputsEqual(nextDeps, prevDeps) {
          if (prevDeps === null) {
            {
              error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
            }
            return false;
          }
          {
            if (nextDeps.length !== prevDeps.length) {
              error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
            }
          }
          for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
            if (objectIs(nextDeps[i], prevDeps[i])) {
              continue;
            }
            return false;
          }
          return true;
        }
        function createHook() {
          if (numberOfReRenders > 0) {
            throw new Error("Rendered more hooks than during the previous render");
          }
          return {
            memoizedState: null,
            queue: null,
            next: null
          };
        }
        function createWorkInProgressHook() {
          if (workInProgressHook === null) {
            if (firstWorkInProgressHook === null) {
              isReRender = false;
              firstWorkInProgressHook = workInProgressHook = createHook();
            } else {
              isReRender = true;
              workInProgressHook = firstWorkInProgressHook;
            }
          } else {
            if (workInProgressHook.next === null) {
              isReRender = false;
              workInProgressHook = workInProgressHook.next = createHook();
            } else {
              isReRender = true;
              workInProgressHook = workInProgressHook.next;
            }
          }
          return workInProgressHook;
        }
        function prepareToUseHooks(task, componentIdentity) {
          currentlyRenderingComponent = componentIdentity;
          currentlyRenderingTask = task;
          {
            isInHookUserCodeInDev = false;
          }
          localIdCounter = 0;
        }
        function finishHooks(Component, props, children, refOrContext) {
          while (didScheduleRenderPhaseUpdate) {
            didScheduleRenderPhaseUpdate = false;
            localIdCounter = 0;
            numberOfReRenders += 1;
            workInProgressHook = null;
            children = Component(props, refOrContext);
          }
          resetHooksState();
          return children;
        }
        function checkDidRenderIdHook() {
          var didRenderIdHook = localIdCounter !== 0;
          return didRenderIdHook;
        }
        function resetHooksState() {
          {
            isInHookUserCodeInDev = false;
          }
          currentlyRenderingComponent = null;
          currentlyRenderingTask = null;
          didScheduleRenderPhaseUpdate = false;
          firstWorkInProgressHook = null;
          numberOfReRenders = 0;
          renderPhaseUpdates = null;
          workInProgressHook = null;
        }
        function readContext$1(context) {
          {
            if (isInHookUserCodeInDev) {
              error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
            }
          }
          return readContext(context);
        }
        function useContext(context) {
          {
            currentHookNameInDev = "useContext";
          }
          resolveCurrentlyRenderingComponent();
          return readContext(context);
        }
        function basicStateReducer(state, action) {
          return typeof action === "function" ? action(state) : action;
        }
        function useState3(initialState) {
          {
            currentHookNameInDev = "useState";
          }
          return useReducer(
            basicStateReducer,
            // useReducer has a special case to support lazy useState initializers
            initialState
          );
        }
        function useReducer(reducer, initialArg, init) {
          {
            if (reducer !== basicStateReducer) {
              currentHookNameInDev = "useReducer";
            }
          }
          currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
          workInProgressHook = createWorkInProgressHook();
          if (isReRender) {
            var queue = workInProgressHook.queue;
            var dispatch = queue.dispatch;
            if (renderPhaseUpdates !== null) {
              var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
              if (firstRenderPhaseUpdate !== void 0) {
                renderPhaseUpdates.delete(queue);
                var newState = workInProgressHook.memoizedState;
                var update = firstRenderPhaseUpdate;
                do {
                  var action = update.action;
                  {
                    isInHookUserCodeInDev = true;
                  }
                  newState = reducer(newState, action);
                  {
                    isInHookUserCodeInDev = false;
                  }
                  update = update.next;
                } while (update !== null);
                workInProgressHook.memoizedState = newState;
                return [newState, dispatch];
              }
            }
            return [workInProgressHook.memoizedState, dispatch];
          } else {
            {
              isInHookUserCodeInDev = true;
            }
            var initialState;
            if (reducer === basicStateReducer) {
              initialState = typeof initialArg === "function" ? initialArg() : initialArg;
            } else {
              initialState = init !== void 0 ? init(initialArg) : initialArg;
            }
            {
              isInHookUserCodeInDev = false;
            }
            workInProgressHook.memoizedState = initialState;
            var _queue = workInProgressHook.queue = {
              last: null,
              dispatch: null
            };
            var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
            return [workInProgressHook.memoizedState, _dispatch];
          }
        }
        function useMemo3(nextCreate, deps) {
          currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
          workInProgressHook = createWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          if (workInProgressHook !== null) {
            var prevState = workInProgressHook.memoizedState;
            if (prevState !== null) {
              if (nextDeps !== null) {
                var prevDeps = prevState[1];
                if (areHookInputsEqual(nextDeps, prevDeps)) {
                  return prevState[0];
                }
              }
            }
          }
          {
            isInHookUserCodeInDev = true;
          }
          var nextValue = nextCreate();
          {
            isInHookUserCodeInDev = false;
          }
          workInProgressHook.memoizedState = [nextValue, nextDeps];
          return nextValue;
        }
        function useRef3(initialValue) {
          currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
          workInProgressHook = createWorkInProgressHook();
          var previousRef = workInProgressHook.memoizedState;
          if (previousRef === null) {
            var ref = {
              current: initialValue
            };
            {
              Object.seal(ref);
            }
            workInProgressHook.memoizedState = ref;
            return ref;
          } else {
            return previousRef;
          }
        }
        function useLayoutEffect(create, inputs) {
          {
            currentHookNameInDev = "useLayoutEffect";
            error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
          }
        }
        function dispatchAction(componentIdentity, queue, action) {
          if (numberOfReRenders >= RE_RENDER_LIMIT) {
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          }
          if (componentIdentity === currentlyRenderingComponent) {
            didScheduleRenderPhaseUpdate = true;
            var update = {
              action,
              next: null
            };
            if (renderPhaseUpdates === null) {
              renderPhaseUpdates = /* @__PURE__ */ new Map();
            }
            var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
            if (firstRenderPhaseUpdate === void 0) {
              renderPhaseUpdates.set(queue, update);
            } else {
              var lastRenderPhaseUpdate = firstRenderPhaseUpdate;
              while (lastRenderPhaseUpdate.next !== null) {
                lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
              }
              lastRenderPhaseUpdate.next = update;
            }
          }
        }
        function useCallback(callback, deps) {
          return useMemo3(function() {
            return callback;
          }, deps);
        }
        function useMutableSource(source, getSnapshot, subscribe) {
          resolveCurrentlyRenderingComponent();
          return getSnapshot(source._source);
        }
        function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          if (getServerSnapshot === void 0) {
            throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
          }
          return getServerSnapshot();
        }
        function useDeferredValue(value) {
          resolveCurrentlyRenderingComponent();
          return value;
        }
        function unsupportedStartTransition() {
          throw new Error("startTransition cannot be called during server rendering.");
        }
        function useTransition() {
          resolveCurrentlyRenderingComponent();
          return [false, unsupportedStartTransition];
        }
        function useId() {
          var task = currentlyRenderingTask;
          var treeId = getTreeId(task.treeContext);
          var responseState = currentResponseState;
          if (responseState === null) {
            throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
          }
          var localId = localIdCounter++;
          return makeId(responseState, treeId, localId);
        }
        function noop() {
        }
        var Dispatcher = {
          readContext: readContext$1,
          useContext,
          useMemo: useMemo3,
          useReducer,
          useRef: useRef3,
          useState: useState3,
          useInsertionEffect: noop,
          useLayoutEffect,
          useCallback,
          // useImperativeHandle is not run in the server environment
          useImperativeHandle: noop,
          // Effects are not run in the server environment.
          useEffect: noop,
          // Debugging effect
          useDebugValue: noop,
          useDeferredValue,
          useTransition,
          useId,
          // Subscriptions are not setup in a server environment.
          useMutableSource,
          useSyncExternalStore
        };
        var currentResponseState = null;
        function setCurrentResponseState(responseState) {
          currentResponseState = responseState;
        }
        function getStackByComponentStackNode(componentStack) {
          try {
            var info = "";
            var node = componentStack;
            do {
              switch (node.tag) {
                case 0:
                  info += describeBuiltInComponentFrame(node.type, null, null);
                  break;
                case 1:
                  info += describeFunctionComponentFrame(node.type, null, null);
                  break;
                case 2:
                  info += describeClassComponentFrame(node.type, null, null);
                  break;
              }
              node = node.parent;
            } while (node);
            return info;
          } catch (x) {
            return "\nError generating stack: " + x.message + "\n" + x.stack;
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        var PENDING = 0;
        var COMPLETED = 1;
        var FLUSHED = 2;
        var ABORTED = 3;
        var ERRORED = 4;
        var OPEN = 0;
        var CLOSING = 1;
        var CLOSED = 2;
        var DEFAULT_PROGRESSIVE_CHUNK_SIZE = 12800;
        function defaultErrorHandler(error2) {
          console["error"](error2);
          return null;
        }
        function noop$1() {
        }
        function createRequest(children, responseState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError) {
          var pingedTasks = [];
          var abortSet = /* @__PURE__ */ new Set();
          var request = {
            destination: null,
            responseState,
            progressiveChunkSize: progressiveChunkSize === void 0 ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
            status: OPEN,
            fatalError: null,
            nextSegmentId: 0,
            allPendingTasks: 0,
            pendingRootTasks: 0,
            completedRootSegment: null,
            abortableTasks: abortSet,
            pingedTasks,
            clientRenderedBoundaries: [],
            completedBoundaries: [],
            partialBoundaries: [],
            onError: onError === void 0 ? defaultErrorHandler : onError,
            onAllReady: onAllReady === void 0 ? noop$1 : onAllReady,
            onShellReady: onShellReady === void 0 ? noop$1 : onShellReady,
            onShellError: onShellError === void 0 ? noop$1 : onShellError,
            onFatalError: onFatalError === void 0 ? noop$1 : onFatalError
          };
          var rootSegment = createPendingSegment(
            request,
            0,
            null,
            rootFormatContext,
            // Root segments are never embedded in Text on either edge
            false,
            false
          );
          rootSegment.parentFlushed = true;
          var rootTask = createTask(request, children, null, rootSegment, abortSet, emptyContextObject, rootContextSnapshot, emptyTreeContext);
          pingedTasks.push(rootTask);
          return request;
        }
        function pingTask(request, task) {
          var pingedTasks = request.pingedTasks;
          pingedTasks.push(task);
          if (pingedTasks.length === 1) {
            scheduleWork(function() {
              return performWork(request);
            });
          }
        }
        function createSuspenseBoundary(request, fallbackAbortableTasks) {
          return {
            id: UNINITIALIZED_SUSPENSE_BOUNDARY_ID,
            rootSegmentID: -1,
            parentFlushed: false,
            pendingTasks: 0,
            forceClientRender: false,
            completedSegments: [],
            byteSize: 0,
            fallbackAbortableTasks,
            errorDigest: null
          };
        }
        function createTask(request, node, blockedBoundary, blockedSegment, abortSet, legacyContext, context, treeContext) {
          request.allPendingTasks++;
          if (blockedBoundary === null) {
            request.pendingRootTasks++;
          } else {
            blockedBoundary.pendingTasks++;
          }
          var task = {
            node,
            ping: function() {
              return pingTask(request, task);
            },
            blockedBoundary,
            blockedSegment,
            abortSet,
            legacyContext,
            context,
            treeContext
          };
          {
            task.componentStack = null;
          }
          abortSet.add(task);
          return task;
        }
        function createPendingSegment(request, index, boundary, formatContext, lastPushedText, textEmbedded) {
          return {
            status: PENDING,
            id: -1,
            // lazily assigned later
            index,
            parentFlushed: false,
            chunks: [],
            children: [],
            formatContext,
            boundary,
            lastPushedText,
            textEmbedded
          };
        }
        var currentTaskInDEV = null;
        function getCurrentStackInDEV() {
          {
            if (currentTaskInDEV === null || currentTaskInDEV.componentStack === null) {
              return "";
            }
            return getStackByComponentStackNode(currentTaskInDEV.componentStack);
          }
        }
        function pushBuiltInComponentStackInDEV(task, type) {
          {
            task.componentStack = {
              tag: 0,
              parent: task.componentStack,
              type
            };
          }
        }
        function pushFunctionComponentStackInDEV(task, type) {
          {
            task.componentStack = {
              tag: 1,
              parent: task.componentStack,
              type
            };
          }
        }
        function pushClassComponentStackInDEV(task, type) {
          {
            task.componentStack = {
              tag: 2,
              parent: task.componentStack,
              type
            };
          }
        }
        function popComponentStackInDEV(task) {
          {
            if (task.componentStack === null) {
              error("Unexpectedly popped too many stack frames. This is a bug in React.");
            } else {
              task.componentStack = task.componentStack.parent;
            }
          }
        }
        var lastBoundaryErrorComponentStackDev = null;
        function captureBoundaryErrorDetailsDev(boundary, error2) {
          {
            var errorMessage;
            if (typeof error2 === "string") {
              errorMessage = error2;
            } else if (error2 && typeof error2.message === "string") {
              errorMessage = error2.message;
            } else {
              errorMessage = String(error2);
            }
            var errorComponentStack = lastBoundaryErrorComponentStackDev || getCurrentStackInDEV();
            lastBoundaryErrorComponentStackDev = null;
            boundary.errorMessage = errorMessage;
            boundary.errorComponentStack = errorComponentStack;
          }
        }
        function logRecoverableError(request, error2) {
          var errorDigest = request.onError(error2);
          if (errorDigest != null && typeof errorDigest !== "string") {
            throw new Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof errorDigest + '" instead');
          }
          return errorDigest;
        }
        function fatalError(request, error2) {
          var onShellError = request.onShellError;
          onShellError(error2);
          var onFatalError = request.onFatalError;
          onFatalError(error2);
          if (request.destination !== null) {
            request.status = CLOSED;
            closeWithError(request.destination, error2);
          } else {
            request.status = CLOSING;
            request.fatalError = error2;
          }
        }
        function renderSuspenseBoundary(request, task, props) {
          pushBuiltInComponentStackInDEV(task, "Suspense");
          var parentBoundary = task.blockedBoundary;
          var parentSegment = task.blockedSegment;
          var fallback = props.fallback;
          var content = props.children;
          var fallbackAbortSet = /* @__PURE__ */ new Set();
          var newBoundary = createSuspenseBoundary(request, fallbackAbortSet);
          var insertionIndex = parentSegment.chunks.length;
          var boundarySegment = createPendingSegment(
            request,
            insertionIndex,
            newBoundary,
            parentSegment.formatContext,
            // boundaries never require text embedding at their edges because comment nodes bound them
            false,
            false
          );
          parentSegment.children.push(boundarySegment);
          parentSegment.lastPushedText = false;
          var contentRootSegment = createPendingSegment(
            request,
            0,
            null,
            parentSegment.formatContext,
            // boundaries never require text embedding at their edges because comment nodes bound them
            false,
            false
          );
          contentRootSegment.parentFlushed = true;
          task.blockedBoundary = newBoundary;
          task.blockedSegment = contentRootSegment;
          try {
            renderNode(request, task, content);
            pushSegmentFinale(contentRootSegment.chunks, request.responseState, contentRootSegment.lastPushedText, contentRootSegment.textEmbedded);
            contentRootSegment.status = COMPLETED;
            queueCompletedSegment(newBoundary, contentRootSegment);
            if (newBoundary.pendingTasks === 0) {
              popComponentStackInDEV(task);
              return;
            }
          } catch (error2) {
            contentRootSegment.status = ERRORED;
            newBoundary.forceClientRender = true;
            newBoundary.errorDigest = logRecoverableError(request, error2);
            {
              captureBoundaryErrorDetailsDev(newBoundary, error2);
            }
          } finally {
            task.blockedBoundary = parentBoundary;
            task.blockedSegment = parentSegment;
          }
          var suspendedFallbackTask = createTask(request, fallback, parentBoundary, boundarySegment, fallbackAbortSet, task.legacyContext, task.context, task.treeContext);
          {
            suspendedFallbackTask.componentStack = task.componentStack;
          }
          request.pingedTasks.push(suspendedFallbackTask);
          popComponentStackInDEV(task);
        }
        function renderHostElement(request, task, type, props) {
          pushBuiltInComponentStackInDEV(task, type);
          var segment = task.blockedSegment;
          var children = pushStartInstance(segment.chunks, type, props, request.responseState, segment.formatContext);
          segment.lastPushedText = false;
          var prevContext = segment.formatContext;
          segment.formatContext = getChildFormatContext(prevContext, type, props);
          renderNode(request, task, children);
          segment.formatContext = prevContext;
          pushEndInstance(segment.chunks, type);
          segment.lastPushedText = false;
          popComponentStackInDEV(task);
        }
        function shouldConstruct$1(Component) {
          return Component.prototype && Component.prototype.isReactComponent;
        }
        function renderWithHooks(request, task, Component, props, secondArg) {
          var componentIdentity = {};
          prepareToUseHooks(task, componentIdentity);
          var result = Component(props, secondArg);
          return finishHooks(Component, props, result, secondArg);
        }
        function finishClassComponent(request, task, instance, Component, props) {
          var nextChildren = instance.render();
          {
            if (instance.props !== props) {
              if (!didWarnAboutReassigningProps) {
                error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromType(Component) || "a component");
              }
              didWarnAboutReassigningProps = true;
            }
          }
          {
            var childContextTypes = Component.childContextTypes;
            if (childContextTypes !== null && childContextTypes !== void 0) {
              var previousContext = task.legacyContext;
              var mergedContext = processChildContext(instance, Component, previousContext, childContextTypes);
              task.legacyContext = mergedContext;
              renderNodeDestructive(request, task, nextChildren);
              task.legacyContext = previousContext;
              return;
            }
          }
          renderNodeDestructive(request, task, nextChildren);
        }
        function renderClassComponent(request, task, Component, props) {
          pushClassComponentStackInDEV(task, Component);
          var maskedContext = getMaskedContext(Component, task.legacyContext);
          var instance = constructClassInstance(Component, props, maskedContext);
          mountClassInstance(instance, Component, props, maskedContext);
          finishClassComponent(request, task, instance, Component, props);
          popComponentStackInDEV(task);
        }
        var didWarnAboutBadClass = {};
        var didWarnAboutModulePatternComponent = {};
        var didWarnAboutContextTypeOnFunctionComponent = {};
        var didWarnAboutGetDerivedStateOnFunctionComponent = {};
        var didWarnAboutReassigningProps = false;
        var didWarnAboutDefaultPropsOnFunctionComponent = {};
        var didWarnAboutGenerators = false;
        var didWarnAboutMaps = false;
        var hasWarnedAboutUsingContextAsConsumer = false;
        function renderIndeterminateComponent(request, task, Component, props) {
          var legacyContext;
          {
            legacyContext = getMaskedContext(Component, task.legacyContext);
          }
          pushFunctionComponentStackInDEV(task, Component);
          {
            if (Component.prototype && typeof Component.prototype.render === "function") {
              var componentName = getComponentNameFromType(Component) || "Unknown";
              if (!didWarnAboutBadClass[componentName]) {
                error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName);
                didWarnAboutBadClass[componentName] = true;
              }
            }
          }
          var value = renderWithHooks(request, task, Component, props, legacyContext);
          var hasId = checkDidRenderIdHook();
          {
            if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
              var _componentName = getComponentNameFromType(Component) || "Unknown";
              if (!didWarnAboutModulePatternComponent[_componentName]) {
                error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName);
                didWarnAboutModulePatternComponent[_componentName] = true;
              }
            }
          }
          if (
            // Run these checks in production only if the flag is off.
            // Eventually we'll delete this branch altogether.
            typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0
          ) {
            {
              var _componentName2 = getComponentNameFromType(Component) || "Unknown";
              if (!didWarnAboutModulePatternComponent[_componentName2]) {
                error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName2, _componentName2, _componentName2);
                didWarnAboutModulePatternComponent[_componentName2] = true;
              }
            }
            mountClassInstance(value, Component, props, legacyContext);
            finishClassComponent(request, task, value, Component, props);
          } else {
            {
              validateFunctionComponentInDev(Component);
            }
            if (hasId) {
              var prevTreeContext = task.treeContext;
              var totalChildren = 1;
              var index = 0;
              task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
              try {
                renderNodeDestructive(request, task, value);
              } finally {
                task.treeContext = prevTreeContext;
              }
            } else {
              renderNodeDestructive(request, task, value);
            }
          }
          popComponentStackInDEV(task);
        }
        function validateFunctionComponentInDev(Component) {
          {
            if (Component) {
              if (Component.childContextTypes) {
                error("%s(...): childContextTypes cannot be defined on a function component.", Component.displayName || Component.name || "Component");
              }
            }
            if (Component.defaultProps !== void 0) {
              var componentName = getComponentNameFromType(Component) || "Unknown";
              if (!didWarnAboutDefaultPropsOnFunctionComponent[componentName]) {
                error("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", componentName);
                didWarnAboutDefaultPropsOnFunctionComponent[componentName] = true;
              }
            }
            if (typeof Component.getDerivedStateFromProps === "function") {
              var _componentName3 = getComponentNameFromType(Component) || "Unknown";
              if (!didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3]) {
                error("%s: Function components do not support getDerivedStateFromProps.", _componentName3);
                didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = true;
              }
            }
            if (typeof Component.contextType === "object" && Component.contextType !== null) {
              var _componentName4 = getComponentNameFromType(Component) || "Unknown";
              if (!didWarnAboutContextTypeOnFunctionComponent[_componentName4]) {
                error("%s: Function components do not support contextType.", _componentName4);
                didWarnAboutContextTypeOnFunctionComponent[_componentName4] = true;
              }
            }
          }
        }
        function resolveDefaultProps(Component, baseProps) {
          if (Component && Component.defaultProps) {
            var props = assign({}, baseProps);
            var defaultProps = Component.defaultProps;
            for (var propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
            return props;
          }
          return baseProps;
        }
        function renderForwardRef(request, task, type, props, ref) {
          pushFunctionComponentStackInDEV(task, type.render);
          var children = renderWithHooks(request, task, type.render, props, ref);
          var hasId = checkDidRenderIdHook();
          if (hasId) {
            var prevTreeContext = task.treeContext;
            var totalChildren = 1;
            var index = 0;
            task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
            try {
              renderNodeDestructive(request, task, children);
            } finally {
              task.treeContext = prevTreeContext;
            }
          } else {
            renderNodeDestructive(request, task, children);
          }
          popComponentStackInDEV(task);
        }
        function renderMemo(request, task, type, props, ref) {
          var innerType = type.type;
          var resolvedProps = resolveDefaultProps(innerType, props);
          renderElement(request, task, innerType, resolvedProps, ref);
        }
        function renderContextConsumer(request, task, context, props) {
          {
            if (context._context === void 0) {
              if (context !== context.Consumer) {
                if (!hasWarnedAboutUsingContextAsConsumer) {
                  hasWarnedAboutUsingContextAsConsumer = true;
                  error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                }
              }
            } else {
              context = context._context;
            }
          }
          var render = props.children;
          {
            if (typeof render !== "function") {
              error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
            }
          }
          var newValue = readContext(context);
          var newChildren = render(newValue);
          renderNodeDestructive(request, task, newChildren);
        }
        function renderContextProvider(request, task, type, props) {
          var context = type._context;
          var value = props.value;
          var children = props.children;
          var prevSnapshot;
          {
            prevSnapshot = task.context;
          }
          task.context = pushProvider(context, value);
          renderNodeDestructive(request, task, children);
          task.context = popProvider(context);
          {
            if (prevSnapshot !== task.context) {
              error("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
            }
          }
        }
        function renderLazyComponent(request, task, lazyComponent, props, ref) {
          pushBuiltInComponentStackInDEV(task, "Lazy");
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;
          var Component = init(payload);
          var resolvedProps = resolveDefaultProps(Component, props);
          renderElement(request, task, Component, resolvedProps, ref);
          popComponentStackInDEV(task);
        }
        function renderElement(request, task, type, props, ref) {
          if (typeof type === "function") {
            if (shouldConstruct$1(type)) {
              renderClassComponent(request, task, type, props);
              return;
            } else {
              renderIndeterminateComponent(request, task, type, props);
              return;
            }
          }
          if (typeof type === "string") {
            renderHostElement(request, task, type, props);
            return;
          }
          switch (type) {
            // TODO: LegacyHidden acts the same as a fragment. This only works
            // because we currently assume that every instance of LegacyHidden is
            // accompanied by a host component wrapper. In the hidden mode, the host
            // component is given a `hidden` attribute, which ensures that the
            // initial HTML is not visible. To support the use of LegacyHidden as a
            // true fragment, without an extra DOM node, we would have to hide the
            // initial HTML in some other way.
            // TODO: Add REACT_OFFSCREEN_TYPE here too with the same capability.
            case REACT_LEGACY_HIDDEN_TYPE:
            case REACT_DEBUG_TRACING_MODE_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_FRAGMENT_TYPE: {
              renderNodeDestructive(request, task, props.children);
              return;
            }
            case REACT_SUSPENSE_LIST_TYPE: {
              pushBuiltInComponentStackInDEV(task, "SuspenseList");
              renderNodeDestructive(request, task, props.children);
              popComponentStackInDEV(task);
              return;
            }
            case REACT_SCOPE_TYPE: {
              throw new Error("ReactDOMServer does not yet support scope components.");
            }
            // eslint-disable-next-line-no-fallthrough
            case REACT_SUSPENSE_TYPE: {
              {
                renderSuspenseBoundary(request, task, props);
              }
              return;
            }
          }
          if (typeof type === "object" && type !== null) {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE: {
                renderForwardRef(request, task, type, props, ref);
                return;
              }
              case REACT_MEMO_TYPE: {
                renderMemo(request, task, type, props, ref);
                return;
              }
              case REACT_PROVIDER_TYPE: {
                renderContextProvider(request, task, type, props);
                return;
              }
              case REACT_CONTEXT_TYPE: {
                renderContextConsumer(request, task, type, props);
                return;
              }
              case REACT_LAZY_TYPE: {
                renderLazyComponent(request, task, type, props);
                return;
              }
            }
          }
          var info = "";
          {
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (type == null ? type : typeof type) + "." + info));
        }
        function validateIterable(iterable, iteratorFn) {
          {
            if (typeof Symbol === "function" && // $FlowFixMe Flow doesn't know about toStringTag
            iterable[Symbol.toStringTag] === "Generator") {
              if (!didWarnAboutGenerators) {
                error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
              }
              didWarnAboutGenerators = true;
            }
            if (iterable.entries === iteratorFn) {
              if (!didWarnAboutMaps) {
                error("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
              }
              didWarnAboutMaps = true;
            }
          }
        }
        function renderNodeDestructive(request, task, node) {
          {
            try {
              return renderNodeDestructiveImpl(request, task, node);
            } catch (x) {
              if (typeof x === "object" && x !== null && typeof x.then === "function") ;
              else {
                lastBoundaryErrorComponentStackDev = lastBoundaryErrorComponentStackDev !== null ? lastBoundaryErrorComponentStackDev : getCurrentStackInDEV();
              }
              throw x;
            }
          }
        }
        function renderNodeDestructiveImpl(request, task, node) {
          task.node = node;
          if (typeof node === "object" && node !== null) {
            switch (node.$$typeof) {
              case REACT_ELEMENT_TYPE: {
                var element = node;
                var type = element.type;
                var props = element.props;
                var ref = element.ref;
                renderElement(request, task, type, props, ref);
                return;
              }
              case REACT_PORTAL_TYPE:
                throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
              // eslint-disable-next-line-no-fallthrough
              case REACT_LAZY_TYPE: {
                var lazyNode = node;
                var payload = lazyNode._payload;
                var init = lazyNode._init;
                var resolvedNode;
                {
                  try {
                    resolvedNode = init(payload);
                  } catch (x) {
                    if (typeof x === "object" && x !== null && typeof x.then === "function") {
                      pushBuiltInComponentStackInDEV(task, "Lazy");
                    }
                    throw x;
                  }
                }
                renderNodeDestructive(request, task, resolvedNode);
                return;
              }
            }
            if (isArray(node)) {
              renderChildrenArray(request, task, node);
              return;
            }
            var iteratorFn = getIteratorFn(node);
            if (iteratorFn) {
              {
                validateIterable(node, iteratorFn);
              }
              var iterator = iteratorFn.call(node);
              if (iterator) {
                var step = iterator.next();
                if (!step.done) {
                  var children = [];
                  do {
                    children.push(step.value);
                    step = iterator.next();
                  } while (!step.done);
                  renderChildrenArray(request, task, children);
                  return;
                }
                return;
              }
            }
            var childString = Object.prototype.toString.call(node);
            throw new Error("Objects are not valid as a React child (found: " + (childString === "[object Object]" ? "object with keys {" + Object.keys(node).join(", ") + "}" : childString) + "). If you meant to render a collection of children, use an array instead.");
          }
          if (typeof node === "string") {
            var segment = task.blockedSegment;
            segment.lastPushedText = pushTextInstance(task.blockedSegment.chunks, node, request.responseState, segment.lastPushedText);
            return;
          }
          if (typeof node === "number") {
            var _segment = task.blockedSegment;
            _segment.lastPushedText = pushTextInstance(task.blockedSegment.chunks, "" + node, request.responseState, _segment.lastPushedText);
            return;
          }
          {
            if (typeof node === "function") {
              error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
            }
          }
        }
        function renderChildrenArray(request, task, children) {
          var totalChildren = children.length;
          for (var i = 0; i < totalChildren; i++) {
            var prevTreeContext = task.treeContext;
            task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);
            try {
              renderNode(request, task, children[i]);
            } finally {
              task.treeContext = prevTreeContext;
            }
          }
        }
        function spawnNewSuspendedTask(request, task, x) {
          var segment = task.blockedSegment;
          var insertionIndex = segment.chunks.length;
          var newSegment = createPendingSegment(
            request,
            insertionIndex,
            null,
            segment.formatContext,
            // Adopt the parent segment's leading text embed
            segment.lastPushedText,
            // Assume we are text embedded at the trailing edge
            true
          );
          segment.children.push(newSegment);
          segment.lastPushedText = false;
          var newTask = createTask(request, task.node, task.blockedBoundary, newSegment, task.abortSet, task.legacyContext, task.context, task.treeContext);
          {
            if (task.componentStack !== null) {
              newTask.componentStack = task.componentStack.parent;
            }
          }
          var ping = newTask.ping;
          x.then(ping, ping);
        }
        function renderNode(request, task, node) {
          var previousFormatContext = task.blockedSegment.formatContext;
          var previousLegacyContext = task.legacyContext;
          var previousContext = task.context;
          var previousComponentStack = null;
          {
            previousComponentStack = task.componentStack;
          }
          try {
            return renderNodeDestructive(request, task, node);
          } catch (x) {
            resetHooksState();
            if (typeof x === "object" && x !== null && typeof x.then === "function") {
              spawnNewSuspendedTask(request, task, x);
              task.blockedSegment.formatContext = previousFormatContext;
              task.legacyContext = previousLegacyContext;
              task.context = previousContext;
              switchContext(previousContext);
              {
                task.componentStack = previousComponentStack;
              }
              return;
            } else {
              task.blockedSegment.formatContext = previousFormatContext;
              task.legacyContext = previousLegacyContext;
              task.context = previousContext;
              switchContext(previousContext);
              {
                task.componentStack = previousComponentStack;
              }
              throw x;
            }
          }
        }
        function erroredTask(request, boundary, segment, error2) {
          var errorDigest = logRecoverableError(request, error2);
          if (boundary === null) {
            fatalError(request, error2);
          } else {
            boundary.pendingTasks--;
            if (!boundary.forceClientRender) {
              boundary.forceClientRender = true;
              boundary.errorDigest = errorDigest;
              {
                captureBoundaryErrorDetailsDev(boundary, error2);
              }
              if (boundary.parentFlushed) {
                request.clientRenderedBoundaries.push(boundary);
              }
            }
          }
          request.allPendingTasks--;
          if (request.allPendingTasks === 0) {
            var onAllReady = request.onAllReady;
            onAllReady();
          }
        }
        function abortTaskSoft(task) {
          var request = this;
          var boundary = task.blockedBoundary;
          var segment = task.blockedSegment;
          segment.status = ABORTED;
          finishedTask(request, boundary, segment);
        }
        function abortTask(task, request, reason) {
          var boundary = task.blockedBoundary;
          var segment = task.blockedSegment;
          segment.status = ABORTED;
          if (boundary === null) {
            request.allPendingTasks--;
            if (request.status !== CLOSED) {
              request.status = CLOSED;
              if (request.destination !== null) {
                close(request.destination);
              }
            }
          } else {
            boundary.pendingTasks--;
            if (!boundary.forceClientRender) {
              boundary.forceClientRender = true;
              var _error = reason === void 0 ? new Error("The render was aborted by the server without a reason.") : reason;
              boundary.errorDigest = request.onError(_error);
              {
                var errorPrefix = "The server did not finish this Suspense boundary: ";
                if (_error && typeof _error.message === "string") {
                  _error = errorPrefix + _error.message;
                } else {
                  _error = errorPrefix + String(_error);
                }
                var previousTaskInDev = currentTaskInDEV;
                currentTaskInDEV = task;
                try {
                  captureBoundaryErrorDetailsDev(boundary, _error);
                } finally {
                  currentTaskInDEV = previousTaskInDev;
                }
              }
              if (boundary.parentFlushed) {
                request.clientRenderedBoundaries.push(boundary);
              }
            }
            boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
              return abortTask(fallbackTask, request, reason);
            });
            boundary.fallbackAbortableTasks.clear();
            request.allPendingTasks--;
            if (request.allPendingTasks === 0) {
              var onAllReady = request.onAllReady;
              onAllReady();
            }
          }
        }
        function queueCompletedSegment(boundary, segment) {
          if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null) {
            var childSegment = segment.children[0];
            childSegment.id = segment.id;
            childSegment.parentFlushed = true;
            if (childSegment.status === COMPLETED) {
              queueCompletedSegment(boundary, childSegment);
            }
          } else {
            var completedSegments = boundary.completedSegments;
            completedSegments.push(segment);
          }
        }
        function finishedTask(request, boundary, segment) {
          if (boundary === null) {
            if (segment.parentFlushed) {
              if (request.completedRootSegment !== null) {
                throw new Error("There can only be one root segment. This is a bug in React.");
              }
              request.completedRootSegment = segment;
            }
            request.pendingRootTasks--;
            if (request.pendingRootTasks === 0) {
              request.onShellError = noop$1;
              var onShellReady = request.onShellReady;
              onShellReady();
            }
          } else {
            boundary.pendingTasks--;
            if (boundary.forceClientRender) ;
            else if (boundary.pendingTasks === 0) {
              if (segment.parentFlushed) {
                if (segment.status === COMPLETED) {
                  queueCompletedSegment(boundary, segment);
                }
              }
              if (boundary.parentFlushed) {
                request.completedBoundaries.push(boundary);
              }
              boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request);
              boundary.fallbackAbortableTasks.clear();
            } else {
              if (segment.parentFlushed) {
                if (segment.status === COMPLETED) {
                  queueCompletedSegment(boundary, segment);
                  var completedSegments = boundary.completedSegments;
                  if (completedSegments.length === 1) {
                    if (boundary.parentFlushed) {
                      request.partialBoundaries.push(boundary);
                    }
                  }
                }
              }
            }
          }
          request.allPendingTasks--;
          if (request.allPendingTasks === 0) {
            var onAllReady = request.onAllReady;
            onAllReady();
          }
        }
        function retryTask(request, task) {
          var segment = task.blockedSegment;
          if (segment.status !== PENDING) {
            return;
          }
          switchContext(task.context);
          var prevTaskInDEV = null;
          {
            prevTaskInDEV = currentTaskInDEV;
            currentTaskInDEV = task;
          }
          try {
            renderNodeDestructive(request, task, task.node);
            pushSegmentFinale(segment.chunks, request.responseState, segment.lastPushedText, segment.textEmbedded);
            task.abortSet.delete(task);
            segment.status = COMPLETED;
            finishedTask(request, task.blockedBoundary, segment);
          } catch (x) {
            resetHooksState();
            if (typeof x === "object" && x !== null && typeof x.then === "function") {
              var ping = task.ping;
              x.then(ping, ping);
            } else {
              task.abortSet.delete(task);
              segment.status = ERRORED;
              erroredTask(request, task.blockedBoundary, segment, x);
            }
          } finally {
            {
              currentTaskInDEV = prevTaskInDEV;
            }
          }
        }
        function performWork(request) {
          if (request.status === CLOSED) {
            return;
          }
          var prevContext = getActiveContext();
          var prevDispatcher = ReactCurrentDispatcher$1.current;
          ReactCurrentDispatcher$1.current = Dispatcher;
          var prevGetCurrentStackImpl;
          {
            prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
            ReactDebugCurrentFrame$1.getCurrentStack = getCurrentStackInDEV;
          }
          var prevResponseState = currentResponseState;
          setCurrentResponseState(request.responseState);
          try {
            var pingedTasks = request.pingedTasks;
            var i;
            for (i = 0; i < pingedTasks.length; i++) {
              var task = pingedTasks[i];
              retryTask(request, task);
            }
            pingedTasks.splice(0, i);
            if (request.destination !== null) {
              flushCompletedQueues(request, request.destination);
            }
          } catch (error2) {
            logRecoverableError(request, error2);
            fatalError(request, error2);
          } finally {
            setCurrentResponseState(prevResponseState);
            ReactCurrentDispatcher$1.current = prevDispatcher;
            {
              ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
            }
            if (prevDispatcher === Dispatcher) {
              switchContext(prevContext);
            }
          }
        }
        function flushSubtree(request, destination, segment) {
          segment.parentFlushed = true;
          switch (segment.status) {
            case PENDING: {
              var segmentID = segment.id = request.nextSegmentId++;
              segment.lastPushedText = false;
              segment.textEmbedded = false;
              return writePlaceholder(destination, request.responseState, segmentID);
            }
            case COMPLETED: {
              segment.status = FLUSHED;
              var r = true;
              var chunks = segment.chunks;
              var chunkIdx = 0;
              var children = segment.children;
              for (var childIdx = 0; childIdx < children.length; childIdx++) {
                var nextChild = children[childIdx];
                for (; chunkIdx < nextChild.index; chunkIdx++) {
                  writeChunk(destination, chunks[chunkIdx]);
                }
                r = flushSegment(request, destination, nextChild);
              }
              for (; chunkIdx < chunks.length - 1; chunkIdx++) {
                writeChunk(destination, chunks[chunkIdx]);
              }
              if (chunkIdx < chunks.length) {
                r = writeChunkAndReturn(destination, chunks[chunkIdx]);
              }
              return r;
            }
            default: {
              throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
            }
          }
        }
        function flushSegment(request, destination, segment) {
          var boundary = segment.boundary;
          if (boundary === null) {
            return flushSubtree(request, destination, segment);
          }
          boundary.parentFlushed = true;
          if (boundary.forceClientRender) {
            writeStartClientRenderedSuspenseBoundary(destination, request.responseState, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
            flushSubtree(request, destination, segment);
            return writeEndClientRenderedSuspenseBoundary(destination, request.responseState);
          } else if (boundary.pendingTasks > 0) {
            boundary.rootSegmentID = request.nextSegmentId++;
            if (boundary.completedSegments.length > 0) {
              request.partialBoundaries.push(boundary);
            }
            var id = boundary.id = assignSuspenseBoundaryID(request.responseState);
            writeStartPendingSuspenseBoundary(destination, request.responseState, id);
            flushSubtree(request, destination, segment);
            return writeEndPendingSuspenseBoundary(destination, request.responseState);
          } else if (boundary.byteSize > request.progressiveChunkSize) {
            boundary.rootSegmentID = request.nextSegmentId++;
            request.completedBoundaries.push(boundary);
            writeStartPendingSuspenseBoundary(destination, request.responseState, boundary.id);
            flushSubtree(request, destination, segment);
            return writeEndPendingSuspenseBoundary(destination, request.responseState);
          } else {
            writeStartCompletedSuspenseBoundary(destination, request.responseState);
            var completedSegments = boundary.completedSegments;
            if (completedSegments.length !== 1) {
              throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
            }
            var contentSegment = completedSegments[0];
            flushSegment(request, destination, contentSegment);
            return writeEndCompletedSuspenseBoundary(destination, request.responseState);
          }
        }
        function flushClientRenderedBoundary(request, destination, boundary) {
          return writeClientRenderBoundaryInstruction(destination, request.responseState, boundary.id, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
        }
        function flushSegmentContainer(request, destination, segment) {
          writeStartSegment(destination, request.responseState, segment.formatContext, segment.id);
          flushSegment(request, destination, segment);
          return writeEndSegment(destination, segment.formatContext);
        }
        function flushCompletedBoundary(request, destination, boundary) {
          var completedSegments = boundary.completedSegments;
          var i = 0;
          for (; i < completedSegments.length; i++) {
            var segment = completedSegments[i];
            flushPartiallyCompletedSegment(request, destination, boundary, segment);
          }
          completedSegments.length = 0;
          return writeCompletedBoundaryInstruction(destination, request.responseState, boundary.id, boundary.rootSegmentID);
        }
        function flushPartialBoundary(request, destination, boundary) {
          var completedSegments = boundary.completedSegments;
          var i = 0;
          for (; i < completedSegments.length; i++) {
            var segment = completedSegments[i];
            if (!flushPartiallyCompletedSegment(request, destination, boundary, segment)) {
              i++;
              completedSegments.splice(0, i);
              return false;
            }
          }
          completedSegments.splice(0, i);
          return true;
        }
        function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
          if (segment.status === FLUSHED) {
            return true;
          }
          var segmentID = segment.id;
          if (segmentID === -1) {
            var rootSegmentID = segment.id = boundary.rootSegmentID;
            if (rootSegmentID === -1) {
              throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
            }
            return flushSegmentContainer(request, destination, segment);
          } else {
            flushSegmentContainer(request, destination, segment);
            return writeCompletedSegmentInstruction(destination, request.responseState, segmentID);
          }
        }
        function flushCompletedQueues(request, destination) {
          beginWriting();
          try {
            var completedRootSegment = request.completedRootSegment;
            if (completedRootSegment !== null && request.pendingRootTasks === 0) {
              flushSegment(request, destination, completedRootSegment);
              request.completedRootSegment = null;
              writeCompletedRoot(destination, request.responseState);
            }
            var clientRenderedBoundaries = request.clientRenderedBoundaries;
            var i;
            for (i = 0; i < clientRenderedBoundaries.length; i++) {
              var boundary = clientRenderedBoundaries[i];
              if (!flushClientRenderedBoundary(request, destination, boundary)) {
                request.destination = null;
                i++;
                clientRenderedBoundaries.splice(0, i);
                return;
              }
            }
            clientRenderedBoundaries.splice(0, i);
            var completedBoundaries = request.completedBoundaries;
            for (i = 0; i < completedBoundaries.length; i++) {
              var _boundary = completedBoundaries[i];
              if (!flushCompletedBoundary(request, destination, _boundary)) {
                request.destination = null;
                i++;
                completedBoundaries.splice(0, i);
                return;
              }
            }
            completedBoundaries.splice(0, i);
            completeWriting(destination);
            beginWriting(destination);
            var partialBoundaries = request.partialBoundaries;
            for (i = 0; i < partialBoundaries.length; i++) {
              var _boundary2 = partialBoundaries[i];
              if (!flushPartialBoundary(request, destination, _boundary2)) {
                request.destination = null;
                i++;
                partialBoundaries.splice(0, i);
                return;
              }
            }
            partialBoundaries.splice(0, i);
            var largeBoundaries = request.completedBoundaries;
            for (i = 0; i < largeBoundaries.length; i++) {
              var _boundary3 = largeBoundaries[i];
              if (!flushCompletedBoundary(request, destination, _boundary3)) {
                request.destination = null;
                i++;
                largeBoundaries.splice(0, i);
                return;
              }
            }
            largeBoundaries.splice(0, i);
          } finally {
            completeWriting(destination);
            flushBuffered(destination);
            if (request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0) {
              {
                if (request.abortableTasks.size !== 0) {
                  error("There was still abortable task at the root when we closed. This is a bug in React.");
                }
              }
              close(destination);
            }
          }
        }
        function startWork(request) {
          scheduleWork(function() {
            return performWork(request);
          });
        }
        function startFlowing(request, destination) {
          if (request.status === CLOSING) {
            request.status = CLOSED;
            closeWithError(destination, request.fatalError);
            return;
          }
          if (request.status === CLOSED) {
            return;
          }
          if (request.destination !== null) {
            return;
          }
          request.destination = destination;
          try {
            flushCompletedQueues(request, destination);
          } catch (error2) {
            logRecoverableError(request, error2);
            fatalError(request, error2);
          }
        }
        function abort(request, reason) {
          try {
            var abortableTasks = request.abortableTasks;
            abortableTasks.forEach(function(task) {
              return abortTask(task, request, reason);
            });
            abortableTasks.clear();
            if (request.destination !== null) {
              flushCompletedQueues(request, request.destination);
            }
          } catch (error2) {
            logRecoverableError(request, error2);
            fatalError(request, error2);
          }
        }
        function createDrainHandler(destination, request) {
          return function() {
            return startFlowing(request, destination);
          };
        }
        function createAbortHandler(request, reason) {
          return function() {
            return abort(request, reason);
          };
        }
        function createRequestImpl(children, options) {
          return createRequest(children, createResponseState(options ? options.identifierPrefix : void 0, options ? options.nonce : void 0, options ? options.bootstrapScriptContent : void 0, options ? options.bootstrapScripts : void 0, options ? options.bootstrapModules : void 0), createRootFormatContext(options ? options.namespaceURI : void 0), options ? options.progressiveChunkSize : void 0, options ? options.onError : void 0, options ? options.onAllReady : void 0, options ? options.onShellReady : void 0, options ? options.onShellError : void 0, void 0);
        }
        function renderToPipeableStream(children, options) {
          var request = createRequestImpl(children, options);
          var hasStartedFlowing = false;
          startWork(request);
          return {
            pipe: function(destination) {
              if (hasStartedFlowing) {
                throw new Error("React currently only supports piping to one writable stream.");
              }
              hasStartedFlowing = true;
              startFlowing(request, destination);
              destination.on("drain", createDrainHandler(destination, request));
              destination.on("error", createAbortHandler(
                request,
                // eslint-disable-next-line react-internal/prod-error-codes
                new Error("The destination stream errored while writing data.")
              ));
              destination.on("close", createAbortHandler(
                request,
                // eslint-disable-next-line react-internal/prod-error-codes
                new Error("The destination stream closed early.")
              ));
              return destination;
            },
            abort: function(reason) {
              abort(request, reason);
            }
          };
        }
        exports2.renderToPipeableStream = renderToPipeableStream;
        exports2.version = ReactVersion;
      })();
    }
  }
});

// ../node_modules/react-dom/server.node.js
var require_server_node = __commonJS({
  "../node_modules/react-dom/server.node.js"(exports2) {
    "use strict";
    var l;
    var s;
    if (process.env.NODE_ENV === "production") {
      l = require_react_dom_server_legacy_node_production_min();
      s = require_react_dom_server_node_production_min();
    } else {
      l = require_react_dom_server_legacy_node_development();
      s = require_react_dom_server_node_development();
    }
    exports2.version = l.version;
    exports2.renderToString = l.renderToString;
    exports2.renderToStaticMarkup = l.renderToStaticMarkup;
    exports2.renderToNodeStream = l.renderToNodeStream;
    exports2.renderToStaticNodeStream = l.renderToStaticNodeStream;
    exports2.renderToPipeableStream = s.renderToPipeableStream;
  }
});

// scripts/prerender.jsx
var import_node_fs = __toESM(require("node:fs"));
var import_node_path = __toESM(require("node:path"));
var import_node_url = require("node:url");
var import_react8 = __toESM(require_react());
var import_server = __toESM(require_server_node());

// src/pages/ProphetsPage.jsx
var import_react2 = __toESM(require_react());

// src/data/prophets.js
var POINTED = /[֑-ֽֿׁ-ׇׅ]/g;
var RAW = [
  { name: "Adam", he: "\u05D0\u05B8\u05D3\u05B8\u05DD", era: "BCE", y0: -4e3, y1: -4e3, region: "Eden (legendary)", role: "First human in Genesis; paradigmatic figure of creation and fall.", thread: "biblical" },
  { name: "Enoch", he: "\u05D7\u05B2\u05E0\u05D5\u05B9\u05DA\u05B0", era: "BCE", y0: -3400, y1: -3350, region: "Antediluvian (legendary)", role: "Patriarch who 'walked with God'; eponym of the Enochic apocalyptic literature (1 Enoch).", thread: "biblical" },
  { name: "Noah", he: "\u05E0\u05B9\u05D7\u05B7", era: "BCE", y0: -3e3, y1: -2400, region: "Antediluvian (legendary)", role: "Righteous survivor of the Flood; bridge between antediluvian and postdiluvian eras.", thread: "biblical" },
  { name: "Abraham", he: "\u05D0\u05B7\u05D1\u05B0\u05E8\u05B8\u05D4\u05B8\u05DD", era: "BCE", y0: -2e3, y1: -1820, region: "Mesopotamia/Canaan", role: "Patriarch of the covenant; counted as a proto-prophet in biblical and Quranic texts.", thread: "biblical" },
  { name: "Moses", he: "\u05DE\u05B9\u05E9\u05B6\u05C1\u05D4", era: "BCE", y0: -1391, y1: -1271, region: "Egypt/Sinai", role: "Lawgiver and paradigmatic prophet of Sinai; mediator of the Torah.", thread: "biblical" },
  { name: "Elijah", he: "\u05D0\u05B5\u05DC\u05B4\u05D9\u05B8\u05BC\u05D4\u05D5\u05BC", era: "BCE", y0: -860, y1: -850, region: "Northern Kingdom", role: "Northern-kingdom prophet; archetypal wonder-worker and eschatological forerunner.", thread: "biblical" },
  { name: "Elisha", he: "\u05D0\u05B1\u05DC\u05B4\u05D9\u05E9\u05B8\u05C1\u05E2", era: "BCE", y0: -850, y1: -800, region: "Northern Kingdom", role: "Successor to Elijah; wonder-working prophet of the Northern Kingdom cycles.", thread: "biblical" },
  { name: "Joel", he: "\u05D9\u05D5\u05B9\u05D0\u05B5\u05DC", era: "BCE", y0: -800, y1: -750, region: "Judah", role: "Prophet (dating disputed); locust-plague oracles and outpouring-of-Spirit eschatology.", thread: "biblical" },
  { name: "Jonah", he: "\u05D9\u05D5\u05B9\u05E0\u05B8\u05D4", era: "BCE", y0: -786, y1: -746, region: "Northern Kingdom", role: "8th-c. BCE prophet; the Book of Jonah and its mission-to-Nineveh motif.", thread: "biblical" },
  { name: "Amos", he: "\u05E2\u05B8\u05DE\u05D5\u05B9\u05E1", era: "BCE", y0: -765, y1: -750, region: "Tekoa/Judah", role: "Shepherd-prophet of Tekoa; among the earliest literary prophets, social-justice oracles.", thread: "biblical" },
  { name: "Hosea", he: "\u05D4\u05D5\u05B9\u05E9\u05B5\u05C1\u05E2\u05B7", era: "BCE", y0: -755, y1: -715, region: "Northern Kingdom", role: "Northern-kingdom prophet; symbolic marriage and oracles of judgment and restoration.", thread: "biblical" },
  { name: "Isaiah", he: "\u05D9\u05B0\u05E9\u05B7\u05C1\u05E2\u05B0\u05D9\u05B8\u05D4\u05D5\u05BC", era: "BCE", y0: -740, y1: -700, region: "Jerusalem", role: "Jerusalem prophet spanning Uzziah\u2013Hezekiah; messianic and imperial-oracle traditions.", thread: "biblical" },
  { name: "Micah", he: "\u05DE\u05B4\u05D9\u05DB\u05B8\u05D4", era: "BCE", y0: -737, y1: -690, region: "Judah", role: "Judean prophet; oracles against injustice and the Bethlehem messianic-hope tradition.", thread: "biblical" },
  { name: "Nahum", he: "\u05E0\u05B7\u05D7\u05D5\u05BC\u05DD", era: "BCE", y0: -660, y1: -612, region: "Judah", role: "Poet celebrating the fall of Nineveh (612 BCE); anti-Assyrian oracles.", thread: "biblical" },
  { name: "Zephaniah", he: "\u05E6\u05B0\u05E4\u05B7\u05E0\u05B0\u05D9\u05B8\u05D4", era: "BCE", y0: -640, y1: -609, region: "Jerusalem", role: "Josianic prophet; oracles of the Day of YHWH against Jerusalem and the nations.", thread: "biblical" },
  { name: "Jeremiah", he: "\u05D9\u05B4\u05E8\u05B0\u05DE\u05B0\u05D9\u05B8\u05D4\u05D5\u05BC", era: "BCE", y0: -627, y1: -580, region: "Jerusalem/Egypt", role: "Late pre-exilic prophet; Temple and covenant oracles, witness to Jerusalem's fall (587 BCE).", thread: "biblical" },
  { name: "Baruch", he: "\u05D1\u05B8\u05BC\u05E8\u05D5\u05BC\u05DA\u05B0", era: "BCE", y0: -625, y1: -560, region: "Jerusalem/Babylon", role: "Scribe of Jeremiah; attributed the Book of Baruch and the 2 Baruch tradition.", thread: "second-temple" },
  { name: "Habakkuk", he: "\u05D7\u05B2\u05D1\u05B7\u05E7\u05BC\u05D5\u05BC\u05E7", era: "BCE", y0: -620, y1: -600, region: "Judah", role: "Prophet of dialogue with God; Hab 2:4 'the righteous shall live by faith'.", thread: "biblical" },
  { name: "Daniel", he: "\u05D3\u05B8\u05BC\u05E0\u05B4\u05D9\u05B5\u05BC\u05D0\u05DC", era: "BCE", y0: -605, y1: -530, region: "Babylon/Persia", role: "Exilic court figure; apocalyptic visions in the Book of Daniel.", thread: "apocalyptic" },
  { name: "Obadiah", he: "\u05E2\u05B9\u05D1\u05B7\u05D3\u05B0\u05D9\u05B8\u05D4", era: "BCE", y0: -600, y1: -550, region: "Judah/Edom", role: "Shortest prophetic book; oracles against Edom, dating disputed.", thread: "biblical" },
  { name: "Ezekiel", he: "\u05D9\u05B0\u05D7\u05B6\u05D6\u05B0\u05E7\u05B5\u05D0\u05DC", era: "BCE", y0: -593, y1: -560, region: "Babylon", role: "Exilic priest-prophet; merkabah visions and the valley-of-dry-bones restoration.", thread: "biblical" },
  { name: "Haggai", he: "\u05D7\u05B7\u05D2\u05B7\u05BC\u05D9", era: "BCE", y0: -520, y1: -515, region: "Jerusalem", role: "Post-exilic prophet urging temple rebuilding under Zerubbabel (520 BCE).", thread: "biblical" },
  { name: "Zechariah", he: "\u05D6\u05B0\u05DB\u05B7\u05E8\u05B0\u05D9\u05B8\u05D4", era: "BCE", y0: -520, y1: -480, region: "Jerusalem", role: "Post-exilic prophet of apocalyptic visions; temple restoration and two-messiah traditions.", thread: "biblical" },
  { name: "Ezra", he: "\u05E2\u05B6\u05D6\u05B0\u05E8\u05B8\u05D0", era: "BCE", y0: -480, y1: -440, region: "Babylon/Jerusalem", role: "Priest-scribe of the Persian-period return; Torah restoration and canon.", thread: "second-temple" },
  { name: "Malachi", he: "\u05DE\u05B7\u05DC\u05B0\u05D0\u05B8\u05DB\u05B4\u05D9", era: "BCE", y0: -460, y1: -420, region: "Jerusalem", role: "Last of the Twelve Minor Prophets; post-exilic covenant and purity oracles.", thread: "biblical" },
  { name: "John the Baptist", he: "", era: "CE", y0: 27, y1: 30, region: "Judea", role: "Apocalyptic wilderness preacher and forerunner figure in early 1st-c. CE Judea.", thread: "apocalyptic" },
  { name: "Jesus of Nazareth", he: "", era: "CE", y0: 28, y1: 30, region: "Galilee/Judea", role: "Galilean prophet-teacher; central figure of early Christianity, crucified c. 30 CE.", thread: "apocalyptic" },
  { name: "John of Patmos", he: "", era: "CE", y0: 95, y1: 100, region: "Anatolia (exile)", role: "Visionary author of the Book of Revelation, the early Christian apocalyptic text.", thread: "apocalyptic" },
  { name: "Shimon bar Yochai", he: "", era: "CE", y0: 132, y1: 160, region: "Roman Judea", role: "Tannaitic sage; legendary attribution of the Zohar, key merkabah-mysticism figure.", thread: "mystical" },
  { name: "Abraham Abulafia", he: "", era: "CE", y0: 1240, y1: 1291, region: "Spain/Italy", role: "Medieval prophetic Kabbalist; ecstatic practices and messianic self-claims (13th c.).", thread: "mystical" },
  { name: "Sabbatai Tsevi", he: "", era: "CE", y0: 1626, y1: 1676, region: "Smyrna/Ottoman lands", role: "Smyrna-born messianic claimant; center of the 1665\u201366 Sabbatean movement.", thread: "sabbatean-frankist" },
  { name: "Nathan of Gaza", he: "", era: "CE", y0: 1644, y1: 1680, region: "Ottoman Gaza", role: "Sabbatai Tsevi's prophet; theological architect of Sabbatean messianism.", thread: "sabbatean-frankist" },
  { name: "Jacob Frank", he: "", era: "CE", y0: 1726, y1: 1791, region: "Poland/Ottoman", role: "Polish Sabbatean successor; founder of the Frankist movement \u2014 final endpoint of this lineage.", thread: "sabbatean-frankist", endpoint: true }
];
var PROPHETS = RAW.map((p) => ({ ...p, he: (p.he || "").replace(POINTED, "") }));

// src/components/Timeline.jsx
var import_react = __toESM(require_react());
function fmtYear(y) {
  if (y < 0) return Math.abs(y) + " BCE";
  return y + " CE";
}
function Timeline({ items, title, accent = "#7fb0ff" }) {
  if (!items || !items.length) return null;
  const W = 1e3, H = 180, PADX = 40;
  const min = Math.min(...items.map((i) => i.y0));
  const max = Math.max(...items.map((i) => i.y1 == null ? i.y0 : i.y1));
  const span = Math.max(1, max - min);
  const xOf = (y) => PADX + (y - min) / span * (W - 2 * PADX);
  const midY = 70;
  const step = span > 3e3 ? 1e3 : span > 1e3 ? 500 : span > 400 ? 100 : 50;
  const firstTick = Math.ceil(min / step) * step;
  const ticks = [];
  for (let t = firstTick; t <= max; t += step) ticks.push(t);
  const labelIdx = /* @__PURE__ */ new Set([0, items.length - 1]);
  items.forEach((it, i) => {
    if (it.endpoint) labelIdx.add(i);
  });
  for (const i of [Math.floor(items.length * 0.25), Math.floor(items.length * 0.5), Math.floor(items.length * 0.75)]) labelIdx.add(i);
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "timeline-wrap", role: "img", "aria-label": title }, /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", height: "auto", style: { maxWidth: "100%" } }, /* @__PURE__ */ import_react.default.createElement("line", { x1: PADX, y1: midY, x2: W - PADX, y2: midY, stroke: "#33405a", strokeWidth: "2" }), ticks.map((t) => /* @__PURE__ */ import_react.default.createElement("g", { key: t }, /* @__PURE__ */ import_react.default.createElement("line", { x1: xOf(t), y1: midY - 6, x2: xOf(t), y2: midY + 6, stroke: "#3a4762", strokeWidth: "1" }), /* @__PURE__ */ import_react.default.createElement("text", { x: xOf(t), y: midY + 20, textAnchor: "middle", fontSize: "11", fill: "#6a7588" }, fmtYear(t)))), items.map((it, i) => {
    const ym = it.y1 == null ? it.y0 : Math.round((it.y0 + it.y1) / 2);
    const x = xOf(ym);
    const end = !!it.endpoint;
    const r = end ? 8 : 5;
    const fill = end ? "#e8c87a" : it.isRoyal ? "#c792ea" : accent;
    const above = i % 2 === 0;
    const ly = above ? midY - 18 : midY + 34;
    return /* @__PURE__ */ import_react.default.createElement("g", { key: i }, /* @__PURE__ */ import_react.default.createElement("line", { x1: x, y1: midY, x2: x, y2: above ? midY - 12 : midY + 12, stroke: fill, strokeWidth: "1", opacity: "0.5" }), end ? /* @__PURE__ */ import_react.default.createElement("g", null, /* @__PURE__ */ import_react.default.createElement("circle", { cx: x, cy: midY, r: r + 3, fill: "none", stroke: "#e8c87a", strokeWidth: "1.2", opacity: "0.7" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: x, cy: midY, r, fill: "#e8c87a", stroke: "#fff5d0", strokeWidth: "1" })) : /* @__PURE__ */ import_react.default.createElement("circle", { cx: x, cy: midY, r, fill, stroke: "#0e1320", strokeWidth: "1.2" }), labelIdx.has(i) && /* @__PURE__ */ import_react.default.createElement("text", { x, y: ly, textAnchor: "middle", fontSize: "12", fontWeight: end ? 700 : 400, fill: end ? "#e8c87a" : "#9aa6bd" }, it.name), /* @__PURE__ */ import_react.default.createElement("title", null, `${it.name} (${it.years || fmtYear(it.y0)}) \u2014 ${it.role || ""}`));
  })), /* @__PURE__ */ import_react.default.createElement("div", { className: "muted", style: { textAlign: "center", fontSize: ".78rem", marginTop: 2 } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { color: "#e8c87a" } }, "\u25CF"), " endpoint \xB7 ", /* @__PURE__ */ import_react.default.createElement("span", { style: { color: "#c792ea" } }, "\u25CF"), " royal \xB7 ", /* @__PURE__ */ import_react.default.createElement("span", { style: { color: accent } }, "\u25CF"), " mage/prophet \xB7 hover a dot for the figure"));
}

// src/pages/ProphetsPage.jsx
function wiki(name) {
  return "https://en.wikipedia.org/wiki/" + encodeURIComponent(name.replace(/ /g, "_"));
}
function ProphetCard({ p }) {
  const dates = p.y0 === p.y1 ? fmtYear(p.y0) : `${fmtYear(p.y0)} \u2013 ${fmtYear(p.y1)}`;
  const end = !!p.endpoint;
  return /* @__PURE__ */ import_react2.default.createElement("div", { className: "tcard" + (end ? " always" : ""), style: end ? { borderColor: "var(--gold)", boxShadow: "0 0 0 1px var(--gold)" } : null }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "the" }, p.he && /* @__PURE__ */ import_react2.default.createElement("span", { className: "he", style: { fontSize: "1.5rem", marginLeft: 6 } }, p.he), " ", end && /* @__PURE__ */ import_react2.default.createElement("span", { className: "pill", style: { color: "var(--gold)", borderColor: "var(--gold)" } }, "endpoint")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "read" }, /* @__PURE__ */ import_react2.default.createElement("a", { href: wiki(p.name), target: "_blank", rel: "noreferrer", style: { color: "inherit", textDecoration: "none" } }, p.name)), /* @__PURE__ */ import_react2.default.createElement("div", { className: "trans" }, dates, " \xB7 ", p.region), /* @__PURE__ */ import_react2.default.createElement("div", { className: "g" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "pill", style: { fontSize: ".7rem" } }, p.thread)), /* @__PURE__ */ import_react2.default.createElement("div", { className: "simp" }, p.role));
}
function ProphetsPage() {
  const span = `${fmtYear(PROPHETS[0].y0)} \u2013 ${fmtYear(PROPHETS[PROPHETS.length - 1].y1)}`;
  return /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("h1", null, "Prophets \u2014 from Adam to Jacob Frank"), /* @__PURE__ */ import_react2.default.createElement("p", { className: "muted" }, "A chronology of prophetic and revelatory figures, from the first human ", /* @__PURE__ */ import_react2.default.createElement("span", { className: "he" }, "\u05D0\u05D3\u05DD"), " through the biblical prophets, the second-temple and apocalyptic writers, the early-Christian and merkabah-mystical tradition, down to the Sabbatean\u2013Frankist thread whose endpoint is ", /* @__PURE__ */ import_react2.default.createElement("b", { style: { color: "var(--gold)" } }, "Jacob Frank (1726\u20131791)"), ". ", PROPHETS.length, " figures across ", span, ". Each card links to its Wikipedia page."), /* @__PURE__ */ import_react2.default.createElement("div", { className: "panel", style: { padding: 14, marginBottom: 14 } }, /* @__PURE__ */ import_react2.default.createElement(Timeline, { items: PROPHETS, title: "Prophet timeline \u2014 Adam to Jacob Frank", accent: "#7fb0ff" })), /* @__PURE__ */ import_react2.default.createElement("div", { className: "tcards" }, PROPHETS.map((p, i) => /* @__PURE__ */ import_react2.default.createElement(ProphetCard, { key: i, p }))));
}

// src/pages/MagesPage.jsx
var import_react3 = __toESM(require_react());

// src/data/mages.js
var MAGES = [
  { name: "Hermes Trismegistus", years: "legendary", y0: -1500, y1: -1450, region: "Egypt (legendary)", role: "Legendary thrice-greatest sage; fountainhead of the Hermetic stellar-sapiential tradition.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Solomon", years: "-990\u2013-931", y0: -990, y1: -931, region: "Israel/Judah", role: "Legendary wise-king; archetype of the royal sapiential and magical-solomonic tradition.", isIberian: false, isRoyal: true, endpoint: false },
  { name: "Zoroaster", years: "c.-628\u2013-551", y0: -628, y1: -551, region: "Persia (legendary)", role: "Legendary prophet-magus; eponymous founder of the magi as a priestly-sapiential order.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Daniel", years: "-620\u2013-535", y0: -620, y1: -535, region: "Babylon/Persia", role: "Jewish court-magus and dream-interpreter in the Babylonian and Persian royal courts.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Shadrach (Hananiah)", years: "-620\u2013-560", y0: -620, y1: -560, region: "Babylon", role: "Daniel's companion; trained in Chaldean lore at Nebuchadnezzar's court.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Meshach (Mishael)", years: "-620\u2013-560", y0: -620, y1: -560, region: "Babylon", role: "Daniel's companion; initiated in Babylonian court wisdom alongside his fellows.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Abednego (Azariah)", years: "-620\u2013-560", y0: -620, y1: -560, region: "Babylon", role: "Daniel's companion; recipient of Chaldean court-sapiential training with the magi.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "The Magi of Matthew 2", years: "c.-7\u2013-4", y0: -7, y1: -4, region: "Persia/East", role: "Star-following eastern magi; Christian archetype of royal-sage astrologers bearing gifts.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Abraham ibn Ezra", years: "1089\u20131167", y0: 1089, y1: 1167, region: "Iberia (Tudela)", role: "Andalusi-Jewish biblical exegete; integrated astrology, stellar order and Hebrew letters.", isIberian: true, isRoyal: false, endpoint: false },
  { name: "Michael Scot", years: "c.1175\u20131234", y0: 1175, y1: 1234, region: "Scotland/Toledo", role: "Court astrologer-magus to Frederick II and Alfonso X; translator of Arabic stellar lore.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Alfonso X of Castile", years: "1221\u20131284", y0: 1221, y1: 1284, region: "Iberia (Castile)", role: "Royal-sage king; patron of the Alfonsine astronomical-magical corpus and magic books.", isIberian: true, isRoyal: true, endpoint: false },
  { name: "Ramon Llull", years: "1232\u20131316", y0: 1232, y1: 1316, region: "Iberia (Majorca)", role: "Catalan mystic; Ars Magna as a combinatory stellar-letter art of divine names.", isIberian: true, isRoyal: false, endpoint: false },
  { name: "Arnaldus de Villanova", years: "c.1240\u20131311", y0: 1240, y1: 1311, region: "Iberia (Valencia)", role: "Catalan physician-alchemist and royal counselor; apocalyptic-sapiential astrologer.", isIberian: true, isRoyal: false, endpoint: false },
  { name: "Moses de Le\xF3n", years: "c.1240\u20131305", y0: 1240, y1: 1305, region: "Iberia (Castile)", role: "Castilian Kabbalist; redactor of the Zohar, core text of Hebrew stellar-mystical symbolism.", isIberian: true, isRoyal: false, endpoint: false },
  { name: "Roger Bacon", years: "c.1220\u20131292", y0: 1220, y1: 1292, region: "England", role: "Franciscan philosopher of scientia experimentalis and astral-astrological sapientia.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Cecco d'Ascoli", years: "1257\u20131327", y0: 1257, y1: 1327, region: "Italy", role: "Court astrologer-magus; burned for astrological determinism, inheritor of Scot's tradition.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Marsilio Ficino", years: "1433\u20131499", y0: 1433, y1: 1499, region: "Florence", role: "Platonic-astrological theologian; translated the Hermetic Corpus, reviving stellar-magic.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Giovanni Pico della Mirandola", years: "1463\u20131494", y0: 1463, y1: 1494, region: "Italy", role: "Pioneer of Christian Kabbalah; yoked Hebrew letter-mysticism to Christian theology.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Johannes Trithemius", years: "1462\u20131516", y0: 1462, y1: 1516, region: "Germany", role: "Abbot-cryptographer and magus; teacher of Agrippa in the Renaissance-magic lineage.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Heinrich Cornelius Agrippa", years: "1486\u20131535", y0: 1486, y1: 1535, region: "Germany", role: "Author of De occulta philosophia; systematizer of Renaissance stellar-kabbalistic magic.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Paracelsus", years: "1493\u20131541", y0: 1493, y1: 1541, region: "Switzerland", role: "Physician-magus; astral-magic cosmology of signatures linking stars, metals and letters.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Nostradamus", years: "1503\u20131566", y0: 1503, y1: 1566, region: "France", role: "Court astrologer-prophet; consulted by Catherine de M\xE9dicis in the royal-magus mode.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "John Dee", years: "1527\u20131609", y0: 1527, y1: 1609, region: "England", role: "Royal astrologer to Elizabeth I; philosopher of Enochian stellar-angelic letters.", isIberian: false, isRoyal: false, endpoint: false },
  { name: "Felipe II of Spain", years: "1527\u20131598", y0: 1527, y1: 1598, region: "Iberia (Spain)", role: "Habsburg royal-sage king; patron of astrologers and esoterica \u2014 closes the era of kings.", isIberian: true, isRoyal: true, endpoint: true }
];

// src/data/mages-content.js
var MAGES_CONTENT = {
  "Solomon": { wikipediaUrl: "https://en.wikipedia.org/wiki/Solomon", bio: "Solomon (also called Jedidiah) was, per the Hebrew Bible, a king of ancient Israel who succeeded his father David and reigned c. 970\u2013931 BCE over a united Israel and Judah. Born in Jerusalem to David and Bathsheba, he is credited with building the First Temple and a royal palace complex, forging trade alliances with Hiram I of Tyre, and presiding over a period of reported commercial prosperity. He died around age 55 after a 40-year reign, and his son Rehoboam's succession was followed by the schism of the kingdom into Israel (north) and Judah (south).\n\nThe biblical portrait emphasizes Solomon's legendary wisdom: when offered anything by God he asked for wisdom, the Judgement of Solomon is his best-known display of it, and the Queen of Sheba is said to have visited to test his fame. His accumulation of 700 wives and 300 concubines\u2014many foreign\u2014and his wealth, horses, and idolatrous influences are presented as leading to divine displeasure. The historicity of Solomon is hotly debated: most scholars think he probably existed, but the biblical description of his empire's lavishness is widely regarded as an anachronistic exaggeration, with maximalist and minimalist scholars differing on how much can be recovered.\n\nBeyond the canon, a vast pseudepigraphical and occult corpus attached itself to Solomon in Jewish, Islamic, and Western esoteric tradition. Rabbinic literature describes him commanding demons, spirits, and animals by means of a signet ring\u2014the Seal of Solomon\u2014often depicted as a pentagram or hexagram and considered the predecessor of the Star of David. Medieval grimoires and demonological texts (the Testament of Solomon, the Key of Solomon, the Lemegeton) made Solomon the archetypal magician-sovereign who binds and interrogates spirits, a motif that fed Jewish mysticism, Sufi parallels, and Renaissance occultism.", works: [{ "title": "Proverbs (Mishlei)", "note": "Wisdom maxims attributed to Solomon; shaped later Hebrew stellar-letter sapiential tradition." }, { "title": "Ecclesiastes (Kohelet)", "note": "Book on time and vanity; its time-cycles later informed kabbalistic chronosophy." }, { "title": "Song of Songs (Shir ha-Shirim)", "note": "Allegorical poetry; central to kabbalistic mystical reading of divine-human union." }, { "title": "Key of Solomon (Clavicula Salomonis)", "note": "Medieval grimoire: seals, planetary talismans, and spirit-binding rituals." }, { "title": "Lesser Key of Solomon (Lemegeton)", "note": "Renaissance grimoire casting Solomon as demon-binder; lists 72 spirits in the Ars Goetia." }] },
  "Hermes Trismegistus": { wikipediaUrl: "https://en.wikipedia.org/wiki/Hermes_Trismegistus", bio: `Hermes Trismegistus ("Thrice-Greatest Hermes") is a legendary Hellenistic figure arising from the syncretic fusion of the Greek god Hermes and the Egyptian god Thoth, worshiped as one at the Temple of Thoth in Khemenu (Hermopolis) in the Ptolemaic period. The epithet "thrice great" likely derives from an Egyptian temple inscription "Thoth the great, the great, the great," with the earliest datable occurrence in minutes of a 172 BCE Ibis-cult council meeting near Memphis. He is not a historical person but the eponym of a body of Greco-Egyptian religious-philosophical texts.

The Hermetic writings are divided into philosophical hermetica (cosmology and theology) and technical hermetica (practical magic, alchemy, astrology). Their actual authorship is by various unknown Greek authors working roughly in the 2nd\u20133rd century CE, blending Platonism, Stoicism, Jewish, and Persian influences; Isaac Casaubon demonstrated in 1614 that they postdate Christianity, collapsing the Renaissance belief in their extreme antiquity. During the Renaissance Marsilio Ficino translated the Corpus Hermeticum into Latin, and figures such as Lactantius, Augustine, Pico della Mirandola, and Giordano Bruno revered Hermes as a wise pagan prophet who foresaw Christianity within a prisca theologia threading through all religions.

In Islamic hagiography Hermes was identified with the prophet Idris (equated with Enoch), and Abu Ma'shar al-Balkhi described a threefold Hermes as civilizing hero, initiator of Pythagoras, and first teacher of alchemy. Hermes was strongly associated with astrology, and the Hermetic tradition came to encompass alchemy, magic, astrology, and related subjects; later offshoots include Hermetic Qabalah, the Hermetic Order of the Golden Dawn, and Rosicrucianism, making Hermes the foundational eponym of Western esotericism.`, works: [{ "title": "Corpus Hermeticum", "note": "Core Greco-Egyptian religious-philosophical treatises; foundation of Hermetic cosmology and prisca theologia." }, { "title": "Poimandres", "note": "First treatise of the Corpus; divine-revelation cosmogony underpinning Hermetic stellar-letter cosmology." }, { "title": "Emerald Tablet (Tabula Smaragdina)", "note": "Alchemical text bearing the maxim 'as above, so below'\u2014key to Hermetic stellar correspondence." }, { "title": "Asclepius", "note": "Latin dialogue on theology and cosmic worship; influential in Renaissance magic and astrological talismanry." }, { "title": "Centiloquium Hermetis", "note": "Medieval astrological aphorisms attributed to Hermes; shaped Islamic and Latin stellar-letter astrology." }] },
  "Zoroaster": { wikipediaUrl: "https://en.wikipedia.org/wiki/Zoroaster", bio: `Zoroaster (Avestan Zara\u03B8u\u0161tra; Greek Zoroaster; Persian Zartosht), of the Spitama family and son of Pourushaspa, was an ancient Iranian priest-prophet traditionally dated c. 628\u2013551 BCE, though modern scholarship is divided between a "late date" (7th\u20136th century BCE) and an "early date" (c. 1500\u20131000 BCE), the latter increasingly favored on linguistic grounds from the Old Avestan of the Gathas. His birthplace is unknown, with proposed locations including Bactria, Sistan, Chorasmia, and the steppes west of the Volga; classical and medieval sources also placed him in Media or Azerbaijan. Per tradition he trained as a priest from age seven, left his parents at twenty, and at thirty received a revelation in which Vohu Manah (Good Purpose) led him to Ahura Mazda and the radiant Amesha Spentas.

Zoroaster's teaching centers on the cosmic dualism of a\u0161a (truth, order) versus druj (deception), embodied in the opposition of Ahura Mazda (Wise Lord) and Angra Mainyu (Destructive Spirit), with human free will and ethical responsibility\u2014good thoughts, words, and deeds\u2014as the means of aligning with a\u0161a and hastening frashokereti, the ultimate renovation of existence. Around age 42 he gained the patronage of King Vishtaspa and Queen Hutaosa, married three times, fathered six children, and is said to have died at 77, with conflicting traditions of murder by a priest of the old religion or by a Turanian soldier. He is traditionally credited with authoring the Gathas and the Yasna Haptanghaiti, the core Old Avestan hymns of the Avesta.

In classical antiquity Zoroaster was associated with astrology and magic: Pliny the Elder named him the inventor of magic, and Diogenes Laertius linked his name with star-worship (astrothytes, 'star sacrificer'). A large pseudepigraphic Hellenistic corpus\u2014On Nature, the Asteroskopita astrological handbook, On the Virtue of Stones, and the Coptic Zostrianos\u2014circulated under his name from the 3rd century BCE onward, works Roger Beck noted were Hellenistic creations borrowing his authority rather than expressions of Zoroastrian doctrine. His influence extended to Judaism, Christianity, Manichaeism (which counted him among four primary prophets), and the Bah\xE1'\xED Faith, which recognizes him as a Manifestation of God.`, works: [{ "title": "The Gathas", "note": "Old Avestan hymns traditionally authored by Zoroaster; core statement of dualism, a\u0161a, and Amesha Spentas." }, { "title": "Yasna Haptanghaiti", "note": "Seven-chapter Old Avestan liturgical hymn cycle; foundational Zoroastrian worship text." }, { "title": "Asteroskopita (Apotelesmatika)", "note": "Pseudepigraphic astrological handbook under Zoroaster's name; Hellenistic stellar-letter lore." }, { "title": "On the Virtue of Stones (Peri lithon timion)", "note": "Pseudepigraphic lapidary; talismanic stone-lore feeding later occultism." }, { "title": "Zostrianos", "note": "Coptic Gnostic tractate at Nag Hammadi bearing his name; stellar-revelation framing in Gnosticism." }] },
  "Daniel": { wikipediaUrl: "https://en.wikipedia.org/wiki/Daniel_(biblical_figure)", bio: `Daniel (Hebrew \u05D3\u05B8\u05BC\u05E0\u05B4\u05D9\u05B5\u05BC\u05D0\u05DC, "God is my Judge") was, according to tradition, a noble Jewish youth of Jerusalem taken into Babylonian captivity by Nebuchadnezzar II (traditionally c. 620\u2013538 BCE) and given the Babylonian name Belteshazzar. He served the Babylonian and Persian courts with loyalty and ability until the time of the Persian conqueror Cyrus, refusing royal food to avoid defilement alongside his companions Hananiah, Mishael, and Azariah. The court tales (Daniel 1\u20136) credit him with interpreting Nebuchadnezzar's dreams of a four-metal statue and a great felled tree, reading the mysterious writing on the wall at Belshazzar's feast, and surviving the lions' den through angelic deliverance.

The apocalyptic visions (Daniel 7\u201312) describe four beasts from the sea, a ram-and-goat conflict, a final struggle of king of the north versus king of the south, and the vindication of the righteous, all mediated by the angel Gabriel as interpreter. These visions introduced or crystallized several key esoteric numerological schemes: the "70 weeks/sevens" of years (Daniel 9), the "2300 evenings and mornings" (Daniel 8:14), and "a time, times, and half a time" (Daniel 7:25; 12:7), widely read as cryptic references to the persecution under Antiochus IV Epiphanes (r. 175\u2013164 BCE). Daniel is one of the earliest biblical texts to feature a named angelic mediator, making it a hinge of later apocalyptic and esoteric angelology.

Scholarly consensus regards Daniel as a non-historical or only partly historical figure whose book was composed in stages: the court tales in the 3rd or early 2nd century BCE, and the visions added between 167 and 164 BCE as cryptic allusions to Antiochus IV. In Judaism Daniel is not classed among the prophets (prophecy being held to have ended with Haggai, Zechariah, and Malachi) but is placed among the Writings and called the most distinguished member of the Babylonian diaspora; Christianity honors him as a prophet, the New Testament citing the "abomination of desolation" at Matthew 24:15; Islam does not name him in the Qur'an but Shia tradition affirms him as a prophet, and the Bah\xE1'\xED Faith regards him as a minor prophet.`, works: [{ "title": "Book of Daniel (chapters 1\u201312)", "note": "Court tales + apocalyptic visions; source of 70-weeks and 'time, times, half a time' numerology." }, { "title": "Susanna (Daniel 13, Greek)", "note": "Deuterocanonical addition: Daniel saves Susanna by cross-examining two elders." }, { "title": "Bel and the Dragon (Daniel 14, Greek)", "note": "Deuterocanonical: Daniel exposes idol-priests and a sacred serpent; Habakkuk feeds him by miracle." }, { "title": "Prayer of Azariah (Daniel 3, Greek)", "note": "Deuterocanonical expansion of the fiery furnace; Azariah's prayer within the flames." }, { "title": "Song of the Three Holy Children (Daniel 3, Greek)", "note": "Deuterocanonical canticle of the three youths; used in Christian liturgy (Benedicite)." }] },
  "Shadrach (Hananiah)": { wikipediaUrl: "https://en.wikipedia.org/wiki/Shadrach,_Meshach,_and_Abednego", bio: `Shadrach (Hebrew \u05D7\u05B2\u05E0\u05B7\u05E0\u05B0\u05D9\u05B8\u05D4 Hananiah, "Yah is gracious"; Babylonian \u05E9\u05B7\u05C1\u05D3\u05B0\u05E8\u05B7\u05DA Shadrach, likely reflecting "\u0160udur Aku," "Command of Aku [the moon god]") was, per the Book of Daniel, a Jewish youth taken from Jerusalem to Babylon during the reign of Nebuchadnezzar II (r. 605\u2013562 BCE), placing him in the late 7th or early 6th century BCE. Alongside his companions Mishael (Meshach) and Azariah (Abednego), and together with Daniel, he was selected for training in the Chaldean Aramaic language and literature for service at the royal court, where his Hebrew name was replaced with a Babylonian theophoric one substituting the moon-god Aku for Yah (Daniel 1).

Shadrach's principal narrative is the fiery furnace episode (Daniel 3): Nebuchadnezzar erected a golden image on the plain of Dura\u2014its dimensions of 6 by 60 cubits carrying symbolic contrast with the 60-by-60 Second Temple of Ezra\u2013Nehemiah\u2014and commanded all officials to worship it. Hananiah, Mishael, and Azariah refused, telling the king the question was not their willingness but whether God was present and able to save; the furnace was heated seven times hotter than normal, yet the king saw four figures walking unharmed in the flames, "the fourth... like a son of God." Emerging with hair unsinged, cloaks undamaged, and no smell of fire, they were promoted to high office. Daniel is absent from this chapter, which scholars suggest may originally have been an independent tale.

The deuterocanonical Prayer of Azariah and Song of the Three Holy Children, preserved in the Greek Septuagint but absent from the Hebrew/Aramaic Masoretic text, expand the furnace episode with Azariah's penitential prayer and the three youths' canticle of all creation. The Song (Benedicite) entered Christian liturgy as an alternative to the Te Deum in Anglican Morning Prayer and as the Lauds canticle for Sundays and feasts in the Roman rite; the Byzantine and Lutheran churches commemorate the three alongside Daniel on December 17. Claimed tombs of Hananiah and Azariah are venerated in the Mosque of the Prophet Daniel in the Kirkuk Citadel, northern Iraq.`, works: [{ "title": "Daniel 1 (court introduction)", "note": "Hananiah\u2192Shadrach name-change; theonym-substitution stellar-letter pattern (Yah\u2192Aku)." }, { "title": "Daniel 3 (fiery furnace narrative)", "note": "Core account of the trio's refusal and the fourth figure in the flames; martyrdom/rescue typology." }, { "title": "Song of the Three Holy Children (Benedicite)", "note": "Deuterocanonical canticle; cosmic-liturgical 'all creation bless the Lord' hymn." }, { "title": "Prayer of Azariah", "note": "Deuterocanonical penitential prayer within the furnace; paired with the Song in Septuagint Daniel 3." }] },
  "Meshach (Mishael)": { wikipediaUrl: "https://en.wikipedia.org/wiki/Shadrach,_Meshach,_and_Abednego", bio: `Meshach (Hebrew \u05DE\u05B4\u05D9\u05E9\u05B8\u05C1\u05D0\u05B5\u05DC Mishael, "Who is what El is?"; Babylonian \u05DE\u05B5\u05D9\u05E9\u05B7\u05C1\u05DA\u05B0 Meshach, likely "Who is as Aku is?") was, per the Book of Daniel, a Jewish youth taken from Jerusalem to Babylon during the reign of Nebuchadnezzar II (r. 605\u2013562 BCE), placing him in the late 7th or early 6th century BCE. With his companions Hananiah (Shadrach) and Azariah (Abednego), and together with Daniel, he was selected for training in the Chaldean Aramaic language and literature for royal service, where his Hebrew theophoric name\u2014invoking El\u2014was replaced by a Babylonian one invoking the moon-god Aku (Daniel 1). Like the others, he refused the royal food to avoid defilement.

Meshach figures centrally in the fiery furnace episode (Daniel 3): Nebuchadnezzar erected a golden image on the plain of Dura\u2014its 6-by-60-cubit dimensions carrying symbolic contrast with the 60-by-60 Second Temple\u2014and commanded all officials to worship it. Mishael, Hananiah, and Azariah refused, declaring the issue was not their willingness but whether God was able to deliver; cast into a furnace heated seven times beyond normal, they were seen walking unharmed with a fourth figure "like a son of God," and emerged without singed hair, scorched cloaks, or smell of fire. They were then promoted to high office; Daniel's absence from the chapter leads scholars to suggest the story may have circulated independently before incorporation into the book.

The deuterocanonical Prayer of Azariah and Song of the Three Holy Children, preserved in the Greek Septuagint but absent from the Hebrew/Aramaic Masoretic text, expand the furnace episode with a penitential prayer and a cosmic canticle sung by the three youths. The Song (Benedicite) entered Christian liturgy as an alternative to the Te Deum in Anglican Morning Prayer and as the Sunday and feast-day Lauds canticle in the Roman rite; Byzantine and Lutheran calendars commemorate the three with Daniel on December 17. A claimed tomb of Mishael is not firmly identified, though claimed tombs of Hananiah and Azariah are venerated in the Mosque of the Prophet Daniel in the Kirkuk Citadel, northern Iraq.`, works: [{ "title": "Daniel 1 (court introduction)", "note": "Mishael\u2192Meshach name-change; theonym-substitution stellar-letter pattern (El\u2192Aku)." }, { "title": "Daniel 3 (fiery furnace narrative)", "note": "Core account of the trio's refusal and the fourth figure in the flames; martyrdom/rescue typology." }, { "title": "Song of the Three Holy Children (Benedicite)", "note": "Deuterocanonical canticle; cosmic-liturgical 'all creation bless the Lord' hymn." }, { "title": "Prayer of Azariah", "note": "Deuterocanonical penitential prayer within the furnace; paired with the Song in Septuagint Daniel 3." }] },
  "Abednego (Azariah)": { wikipediaUrl: "https://en.wikipedia.org/wiki/Shadrach,_Meshach,_and_Abednego", bio: `Abednego is the Babylonian name given to Azariah (\u05E2\u05B2\u05D6\u05B7\u05E8\u05B0\u05D9\u05B8\u05D4, "Yah has helped"), one of three young Judeans taken into Babylonian royal service in the Book of Daniel. His Babylonian name likely means "slave of the god Nebo/Nabu" (or possibly Nergal), replacing the theonym "Yah" with a Babylonian god's name. Along with Hananiah (Shadrach) and Mishael (Meshach), he was selected for training in Chaldean Aramaic language and literature at the Babylonian court.

The trio's defining narrative is the fiery furnace in Daniel 3: refusing Nebuchadnezzar II's command to worship a golden image on the plain of Dura, they were cast into a furnace heated "seven times hotter than normal" yet emerged unharmed. Nebuchadnezzar saw a fourth figure "like a son of God" in the flames and promoted the three to high office. Abednego's faithfulness under Babylonian idolatry made him an enduring exemplar of Jewish resistance to assimilation.

The stories in Daniel 1\u20136 originate among the Jewish community in Babylon and Mesopotamia during the Persian and early Hellenistic periods (5th\u20133rd centuries BCE). Abednego is honored in Jewish, Christian (deuterocanonical Prayer of Azariah), and Islamic traditions, with feast days varying across rites. Though the Wikipedia article notes no explicit kabbalistic or stellar significance, the Babylonian context and theophoric substitution of Yah for Nabu/Nergal situates him within the Mesopotamian astral-religious milieu that later fed esoteric letter-name traditions.`, works: [{ "title": "Daniel 3 (Fiery Furnace narrative)", "note": "Core account of Abednego's refusal of idolatry and miraculous deliverance; name-substitution motif." }, { "title": "Prayer of Azariah and Song of the Three Holy Children", "note": "Deuterocanonical: gives Azariah a first-person prayer; links Babylonian exile to Hebrew invocation." }, { "title": "Daniel 1 (Induction into Babylon)", "note": "Records Azariah\u2192Abednego renaming; central to theophoric/letter-substitution esoteric readings." }] },
  "The Magi of Matthew 2": { wikipediaUrl: "https://en.wikipedia.org/wiki/Biblical_Magi", bio: `The Magi (singular magus, from Old Persian magu\u0161, rooted in Avestan priestly caste) are "distinguished foreigners" who visit the infant Jesus in Matthew 2, bearing gold, frankincense, and myrrh. The Gospel provides no names, exact number, or social status; the familiar count of three derives from the three gifts, while Syriac Christianity often numbers twelve. Matthew only states they came "from the east," with the Parthian Empire (centered in Persia/Iran) as the likely cultural context.

As Zoroastrian priests, the Magi "paid particular attention to the stars and gained an international reputation for astrology," then regarded as a science; several Bible translations render magoi as "astrologers." Historian Anders Hultg\xE5rd concluded the Matthean narrative was influenced by an Iranian legend of magi and a star predicting a ruler's birth, and Sebastian Brock traced magi legends to converts from Zoroastrianism. The star of Bethlehem has been variously theorized as a 5 BC comet (Colin Humphreys, drawing on Chinese records) or a 7 BC triple conjunction of Jupiter and Saturn in Pisces.

Western traditional names Melchior, Caspar, and Balthazar first appear in the 8th-century Excerpta Latina Barbari. The Magi are commemorated on Epiphany (January 6), and their Zoroastrian-astrological origin made derivatives of "magi" a byword for the occult. Their stellar-following narrative is the New Testament's clearest link between astral observation and sacred revelation, situating them as archetypal reader-of-the-sky figures for later kabbalistic and occult letter-star systems.`, works: [{ "title": "Gospel of Matthew 2", "note": "Primary source: magi follow a star to Bethlehem; sole NT link of astral observation to revelation." }, { "title": "Excerpta Latina Barbari (8th c.)", "note": "Earliest source naming Melchior, Caspar, Balthazar; fixed the three-magus star-magic tradition." }, { "title": "Revelation of the Magi (Syriac)", "note": "Apocryphon casting magi as Seth's descendants receiving a star-revelation; astral-mystical reading." }, { "title": "John of Hildesheim, Historia Trium Regum (14th c.)", "note": "Medieval compendium of magi legends and Helena's relic recovery; standardized Western magi-star lore." }] },
  "Abraham ibn Ezra": { wikipediaUrl: "https://en.wikipedia.org/wiki/Abraham_ibn_Ezra", bio: `Abraham ben Meir Ibn Ezra (c. 1089\u20131167) was born in Tudela, Navarre, and became one of medieval Jewry's most versatile scholars, working across biblical exegesis, Hebrew grammar, poetry, mathematics, astronomy, and astrology. A close friend of Judah Halevi, he spent three decades wandering after 1137, reaching Baghdad, Italy, France, and England. His four children died young; his son Isaac converted to Islam in 1140, a wound that troubled him for years.

His biblical commentaries adhere to the literal sense (peshat), avoiding rabbinic allegory and kabbalistic interpretation, yet exercise rationalist criticism\u2014famously flagging passages implying non-Mosaic authorship of the Torah, later cited by Spinoza. He was among the first to propose dividing Isaiah into at least two parts on chronological grounds. In grammar, works like Sefer Moznayim (1140) and Tzakhoot (1145) systematized Hebrew linguistic science, while Sefer ha-Ekhad and Yesod Mispar treated the peculiarities of numbers and numerals.

Ibn Ezra's astrology is the strongest stellar-letter dimension of his oeuvre: in B\xE9ziers (1147\u201348) he composed a systematic seven-book astrology series (Reshit Hokhma, Sefer ha-Te'amim, Sefer ha-Moladot, Sefer ha-Me'orot, Sefer ha-She'elot, Sefer ha-Mivharim, Sefer ha-Olam), and wrote Mishpetai ha-Mazzelot ("Judgments of the Zodiacal Signs"). His Neoplatonic-flavored philosophy gave astrology a recognized place, and his numerical and zodiacal writings feed directly into the mazzalot/letter-correspondence traditions. A lunar crater, Abenezra, is named after him.`, works: [{ "title": "Mishpetai ha-Mazzelot (Judgments of the Zodiacal Signs)", "note": "First astrology book; zodiacal signs and judgments\u2014core stellar-letter source for mazzalot." }, { "title": "Reshit Hokhma (The Beginning of Wisdom)", "note": "Intro to astrology opening his 7-book B\xE9ziers series; Arabic zodiacal science into Hebrew stellar lore." }, { "title": "Sefer ha-Ekhad / Yesod Mispar", "note": "Peculiarities of numbers 1\u20139; bridges gematria-style numerology with the Indo-Arab numeral system." }, { "title": "Keli ha-Nechoshet (On the Astrolabe)", "note": "Hebrew treatise on the astrolabe; ties stellar observation to calendrical/letter computations." }, { "title": "Pentateuch Commentary (Sefer ha-Yashar)", "note": "Literalist Torah exegesis; numbered-letter observations later supplied gematria-aware readings." }] },
  "Michael Scot": { wikipediaUrl: "https://en.wikipedia.org/wiki/Michael_Scot", bio: `Michael Scot (c. 1175\u2013c. 1232/34) was born in the Scottish border region and trained broadly at Durham, Oxford, and Paris in philosophy, mathematics, astrology, and theology, becoming an ordained priest. He traveled to Bologna, Palermo, and Toledo, where he learned Arabic well enough to translate Aristotle and the commentaries of Averroes into Latin, alongside original works of Avicenna. Scot became "a typical example of the polyglot wandering scholar of the Middle Ages\u2014 a churchman who knew Latin, Greek, Arabic and Hebrew."

Around age 50 he entered the court of Holy Roman Emperor Frederick II in Sicily, serving as science adviser and court astrologer and supervising fresh Arabic-to-Latin translations of Aristotle's Historia animalium, De anima, and De caelo with Averroes's commentaries. Frederick's 1227 letter queried him on "the foundations of the earth, the geography and rulership of the heavens" and the locations of hell, purgatory, and paradise; the chronicler Fra Salimbene records Frederick trying to trick Scot by lowering a church tower. Pope Gregory IX offered him Canterbury, which he declined.

Scot's own writings\u2014Liber introductorius (a divination trilogy), Super auctorem spherae (commentary on Sacrobosco's Sphere), De sole et luna (alchemy treating sun and moon as images of gold and silver), and De chiromantia\u2014made his popular reputation as a magician, fixed by Dante in Inferno XX among sorcerers and astrologers. His Hebrew knowledge alongside Arabic-Latin occult/astrological transmission places him within the medieval esoteric stream where celestial-letter correspondences circulated. Fibonacci's second-edition Liber Abaci (1227) was dedicated to him.`, works: [{ "title": "Liber introductorius (incl. Liber physiognomiae)", "note": "Divination trilogy on astronomy, cosmology, physiognomy; transmits Arabic celestial-mantic science." }, { "title": "Super auctorem spherae", "note": "Commentary on Sacrobosco's Sphere at Frederick II's request; core medieval celestial-sphere treatise." }, { "title": "De sole et luna (On the Sun and Moon)", "note": "Alchemical work: sun and moon as images of gold and silver; fuses astral bodies with metal-letter symbolism." }, { "title": "Translations of Aristotle + Averroes (De caelo, De anima)", "note": "Arabic-to-Latin translations transmitting Islamic celestial philosophy; later medieval star-letter theory." }] },
  "Roger Bacon": { wikipediaUrl: "https://en.wikipedia.org/wiki/Roger_Bacon", bio: `Roger Bacon (c. 1219/20\u2013c. 1292) was born near Ilchester, Somerset, and studied at Oxford, where Robert Grosseteste's legacy influenced him, before teaching at the University of Paris from around 1237, lecturing on grammar, logic, arithmetic, geometry, and the mathematical aspects of astronomy and music. He became a Franciscan friar around 1256\u201357 and thereafter faced statutes restricting friars' publication, which he experienced as enforced scholarly absence. His title Doctor Mirabilis was posthumous.

When his acquaintance Guy de Foulques became Pope Clement IV in 1265, Bacon was commissioned to write on reform of the medieval curriculum and sent, in 1267\u201368, the Opus Majus plus Opus Minus, De Multiplicatione Specierum, and De Speculis Comburentibus\u2014roughly a million words in a year, an effort called one of the most remarkable single efforts of literary productivity. After Clement's death (1268) and the Condemnations of 1277 (which banned deterministic astrology), Bacon was apparently imprisoned or placed under house arrest, possibly linked to his interest in astrological doctrines and contemporary prophecies; the first record of imprisonment dates eighty years after his death.

Bacon's Opus Majus covered mathematics, optics (perspectiva, drawn largely from Alhazen), alchemy, and astronomy-astrology, and proposed a Julian-calendar reform prefiguring the Gregorian system. He cited the Corpus Hermeticum and the Emerald Tablet via his edition of the Secretum Secretorum, considered alchemy the most important science, and held that Sapientia (Divine Wisdom) could be logically explained with tangible evidence. His universal-grammar claim\u2014"Grammar is one and the same in all languages, substantially"\u2014and his stress on Arabic, Greek, Hebrew, and Latin situate him in the multilingual esoteric milieu where celestial influence and letter-science intersect.`, works: [{ "title": "Opus Majus (1267)", "note": "Encyclopedic reform treatise: math, optics, alchemy, astrology; fused celestial science with reform." }, { "title": "De Multiplicatione Specierum", "note": "Theory of propagation of species/powers through media; underpins his optics and astral-influence metaphysics." }, { "title": "Edition of Secretum Secretorum", "note": "Latin edition of Arabic Sirr al-\u02BFasrar; Hermetic/esoteric lore attributed to Aristotle; shaped his astrology." }, { "title": "Grammatica Hebraica", "note": "Hebrew contrastive grammar for Latin readers; places Hebrew letter-science in his esoteric program." }, { "title": "Opus Minus / Opus Tertium", "note": "Summaries/companions to Opus Majus; further expose his calendrical-reform and celestial-influence arguments." }] },
  "Alfonso X of Castile": { wikipediaUrl: "https://en.wikipedia.org/wiki/Alfonso_X_of_Castile", bio: `Alfonso X (1221\u20131284), nicknamed "the Wise" (el Sabio) and "the Astrologer" (el Astr\xF3logo), was born in Toledo, eldest son of Ferdinand III, and succeeded as King of Castile, Le\xF3n, and Galicia in 1252. He opened his reign with military campaigns in the Algarve and alliances with England, then pursued a costly, ultimately failed bid for the German crown (1257\u20131275), debasing coinage and alienating burghers. His final years were consumed by civil war with his son Sancho over the succession; he died defeated at Seville on 4 April 1284.

As a lawmaker he produced the Fuero Real and the Siete Partidas, "one of medieval Europe's most comprehensive law codes," which still underlies law in the American Southwest. In 1273 he created the Mesta, a sheepholders' association that made wool Castile's first major export but later harmed the agrarian economy. He is one of 23 lawmakers depicted in the U.S. Capitol's House chamber.

Alfonso's defining legacy is his court culture: continuing the Toledo School of Translators, he employed Jewish, Christian, and Muslim scholars\u2014 notably the Jewish astronomer Yehuda ben Moshe\u2014to translate Arabic and Hebrew learning into Castilian, establishing the foundations of the Spanish language. His most significant scientific achievement was the Alfonsine tables (based on al-Zarqali's calculations), the most influential astronomical tables of the late Middle Ages. Early in his reign he commissioned translations of astral-magic works (Lapidario, Picatrix, Libro de las formas et las ymagenes) and astrological compendia (Libro de las cruzes, Libro conplido en los iudizios de las estrellas), placing his court at the center of medieval star-magic and talismanic-letter transmission.`, works: [{ "title": "Alfonsine Tables", "note": "Astronomical/astrological tables based on al-Zarqali; most influential late-medieval star tables." }, { "title": "Lapidario", "note": "Magical/astrological properties of stones by Yehuda ben Moshe; star-stone talismanic correspondences." }, { "title": "Picatrix (Castilian translation)", "note": "Arabic astral-magic treatise rendered at Alfonso's court; key conduit for talismanic letter-magic." }, { "title": "Libro conplido en los iudizios de las estrellas", "note": "Arabic astrological compendium on judgments of the stars; foundational to stellar-letter theory." }, { "title": "Siete Partidas", "note": `Comprehensive law code; "one of medieval Europe's most comprehensive," still law in SW US.` }] },
  "Ramon Llull": { wikipediaUrl: "https://en.wikipedia.org/wiki/Ramon_Llull", bio: `Ramon Llull (c. 1232\u20131316) was a Catalan philosopher, mystic, and poet born in Palma de Mallorca in the Kingdom of Majorca, into a wealthy family of Barcelona patricians who had arrived with the conquering armies of James I of Aragon. Before his religious conversion he lived the worldly life of a troubadour, but after a series of five visions of Christ on the Cross in 1263 he sold his possessions on the model of Saint Francis of Assisi and joined the Third Order of Saint Francis, dedicating himself to converting Muslims and writing against the errors of unbelievers. He spent roughly nine years in solitude studying Latin and Arabic, even purchasing a Muslim slave to learn Arabic directly.

Llull's central contribution was his Art (Ars), a universal combinatorial logic designed to prove Christian doctrine to people of all faiths through a set of general principles activated in a combinatorial process illustrated with diagrams and letters. The system evolved through a quaternary phase (1274\u20131290), represented by the Ars demonstrativa with sixteen divine principles, and a ternary phase (1290\u20131308) culminating in the Ars generalis ultima and its abridgment the Ars brevis. He introduced the doctrine of "correlatives," a threefold structure of agent, patient, and act underlying all being, which he used to attempt proofs of the Trinity and Incarnation, and urged the creation of language schools for missionary training, an advocacy that helped prompt the Council of Vienne (1311) to order chairs of Hebrew, Arabic, and Aramaic at several universities.

Although Llull was a Christian theologian rather than a kabbalist, his Art's mechanical, algorithmic character resembles the Arabic zairja device used by medieval Arab astrologers and parallels contemplation of the ninety-nine Names of God in Islam, and the system prefigured computation theory, later influencing Leibniz's De Arte Combinatoria. A substantial body of alchemical treatises, including the Testamentum and Liber de secretis naturae seu de quinta essentia, was falsely attributed to him in the fourteenth century, and occultists such as Agrippa and Giordano Bruno drew on these pseudo-Lullian works. He was beatified by Pope Pius IX in 1847, and modern scholarship continues through the Raimundus-Lullus-Institut in Freiburg.`, works: [{ "title": "Ars generalis ultima (1308)", "note": "Final ternary-phase Art: combinatorial logic of nine divine principles and four figures." }, { "title": "Ars brevis (1308)", "note": "Abridged Art for students; the most circulated Lullian manual of combinatorial letter-principles." }, { "title": "Ars demonstrativa (c. 1283)", "note": "Mature quaternary Art: 12 figures, 16 divine principles (letters B\u2013R); stellar-letter combinatorial system." }, { "title": "Arbor scientiae (1295\u201396)", "note": "Tree of Science: sixteen trees generating encyclopedic knowledge, mapping cosmos to divine principles." }, { "title": "Liber de secretis naturae seu de quinta essentia", "note": "Pseudo-Lullian alchemical treatise on the fifth essence; influenced Agrippa and Bruno." }] },
  "Arnaldus de Villanova": { wikipediaUrl: "https://en.wikipedia.org/wiki/Arnaldus_de_Villanova", bio: "Arnaldus de Villanova (c. 1240\u20131311), also Arnau de Vilanova, was a physician, diplomat, alchemist, and apocalyptic theologian whose exact birthplace is contested among Villeneuve-l\xE8s-Maguelone near Montpellier and several towns named Villanueva in Aragon, Catalonia, and Provence. He studied medicine at Montpellier, completing his training around 1260, and served as personal physician to the King of Aragon from 1281; among his patients were three popes and three kings. He taught at the medical school of Montpellier and later led the medical school in Paris between 1291 and 1299, and was the first physician to use alcohol as an antiseptic.\n\nArnaldus translated numerous medical texts from Arabic, including works by Avicenna and Galen, and was influential behind the papal bull of 1309 requiring medical students to demonstrate knowledge of roughly fifteen Greco-Arabic treatises. He was reputed as an alchemist and astrologer: the door of his Montpellier home bore carved depictions of a roaring lion and a dragon biting its own tail, both recognized alchemical symbols, and several prominent alchemists acknowledged him as an adept. However, many alchemical texts attributed to him\u2014including the Rosarius Philosophorum, Novum Lumen, and Flos Florum\u2014are not authentic, and he is listed in scholarship as pseudo-Arnaldus de Villa Nova.\n\nInfluenced by Joachim of Fiore, Arnaldus prophesied in De adventu Antichristi (1288) that the world would end in 1378 with the coming of the Antichrist, and he wrote extensively on church reform in both Latin and Catalan. His reformist and apocalyptic views repeatedly brought him into conflict with ecclesiastical authorities: he was condemned for heresy by the University of Paris in 1299 and imprisoned, saved only by the intervention of Pope Boniface VIII, whom he had cured of illness. He was imprisoned again around 1304 under Pope Benedict XI, the Sorbonne ordered his philosophical works burned, and after his death the inquisitor of Tarragona condemned him and fifteen of his propositions were censured.", works: [{ "title": "De adventu Antichristi (1288)", "note": "Joachimite apocalyptic prophecy dating the Antichrist to 1378; brought him heresy charges." }, { "title": "De Vinis", "note": "Medicinal uses of wine and remediation of spoiled wine; first alcohol-as-antiseptic use." }, { "title": "Speculum medicinae", "note": "Major authentic medical work reflecting his Montpellier training and Arabic-Galenic synthesis." }, { "title": "Rosarius Philosophorum (attributed)", "note": "Pseudo-Arnaldian alchemical treatise on the rose of the philosophers; not authentic." }, { "title": "Regimen sanitatis ad regem Aragonum", "note": "Health regimen dedicated to the King of Aragon; a staple of medieval preventive medicine." }] },
  "Moses de Le\xF3n": { wikipediaUrl: "https://en.wikipedia.org/wiki/Moses_de_Le%C3%B3n", bio: "Moses de Le\xF3n (c. 1240\u20131305), known in Hebrew as Moshe ben Shem-Tov, was a Spanish rabbi and Kabbalist born around 1240, with his birthplace generally identified as Le\xF3n in the Kingdom of Le\xF3n, though an alternative tradition holds he was born in Guadalajara with his surname deriving from his father, Shem-Tov de Le\xF3n. He spent approximately thirty years in Guadalajara and Vallidolid before relocating to \xC1vila, where he lived for the remainder of his life, and died in 1305 at Ar\xE9valo while returning home. He is the figure most renowned for first publicizing the Zohar, the central text of Jewish mysticism, which he claimed to have transcribed from an ancient manuscript attributed to the 2nd-century sage Shimon bar Yochai.\n\nModern scholars believe the Zohar is substantially his own work, despite his assertion of ancient tannaitic provenance, and this pseudepigraphic practice was apparently not isolated: de Le\xF3n also produced hundreds of pseudepigraphic responsa, commentaries, and Kabbalistic tracts that he falsely attributed to earlier authorities. The Zohar's first edition was printed in Mantua in 1558, over two centuries after his death, and it reshaped Jewish spirituality for centuries. He pioneered the Kabbalistic theory of Biblical interpretation known as Pardes, adapting the medieval Christian fourfold method for Jewish use as an acronym for Peshat (literal), Remez (allegorical), Derash (midrashic), and Sod (esoteric) levels of meaning, a framework that became foundational to subsequent Kabbalistic hermeneutics.\n\nDe Le\xF3n occupies a complex position in Jewish intellectual history, simultaneously a forger and one of the most influential mystical authors ever to write in Hebrew. His Zohar is one of history's most consequential pseudepigrapha, and its doctrines of the sefirot, the divine names, and the cosmic significance of Hebrew letters became the backbone of later Kabbalah, including the stellar-letter correspondences central to works such as the Sefer Raziel tradition.", works: [{ "title": "The Zohar", "note": "Central text of Kabbalah; presented as tannaitic but by de Le\xF3n. Foundation of sefirot and letter mysticism." }, { "title": "Sefer ha-Rimon", "note": "One of his few works openly composed under his own name; a Kabbalistic treatise in Hebrew." }, { "title": "Sefer Mishkan ha-Edut", "note": "Kabbalistic work on the tabernacle of testimony; edited by Avishai Bar Asher (Cherub Press, 2013)." }, { "title": "Pardes (fourfold exegesis)", "note": "Peshat/Remez/Derash/Sod hermeneutic framework; foundation of later Kabbalistic Bible interpretation." }] },
  "Cecco d'Ascoli": { wikipediaUrl: "https://en.wikipedia.org/wiki/Cecco_d%27Ascoli", bio: `Cecco d'Ascoli (1257\u20131327), born Francesco degli Stabili in Folignano near Ascoli, was a medieval Italian physician, astrologer, and poet who devoted himself to mathematics and astrology and secured a professorship in astrology at the University of Bologna in 1322. His byname "Cecco" is a diminutive of Francesco, and "Ascoli" marks his birthplace. He published a commentary on the Sphere of John de Sacrobosco in which he advanced audacious theories concerning the employment and agency of demons, bringing him into conflict with ecclesiastical authorities and resulting in a 1324 sentence of fasts, prayers, and a fine of seventy crowns.

After fleeing to Florence, Cecco joined the household of Carlo di Calabria, but his confrontational nature and what contemporaries called pseudo-science and plain speaking made him many enemies. He had publicly criticized Dante's Commedia and Guido Cavalcanti's Canzone d'amore, and the physician Dino del Garbo pursued him relentlessly, reviving the earlier charge of impiety. Cecco was retried for relapse into heresy and burned at Florence on 26 September 1327, the day after sentencing, at roughly seventy years of age.

His most significant work is the Acerba, an encyclopedic poem in sesta rima (six-line stanzas) that served as a compendium of contemporary natural science, covering celestial influences, animal properties, precious stones, meteorological phenomena, earthquakes, and moral philosophy across four books on astronomy and meteorology, astrology and physiognomy, minerals and animal behavior, and moral and physical problems. The Acerba reflects the medieval worldview in which celestial mechanics, earthly phenomena, and moral philosophy were understood as interconnected domains\u2014the same stellar-influence framework that underpins the occult sciences and the letter-planet correspondences of later Renaissance magic. A lunar crater, Cichus, bears his name, commemorating his contributions to medieval astronomy and astrology.`, works: [{ "title": "Acerba", "note": "Encyclopedic sesta-rima poem on astrology, stones, animals, meteorology; celestial influence lore." }, { "title": "Commentary on the Sphere of Sacrobosco", "note": "Commentary on demons' agency over celestial spheres; triggered his 1324 heresy sentence." }] },
  "Marsilio Ficino": { wikipediaUrl: "https://en.wikipedia.org/wiki/Marsilio_Ficino", bio: `Marsilio Ficino (19 October 1433 \u2013 1 October 1499) was an Italian scholar, Catholic priest, and physician born in Figline Valdarno in the Republic of Florence, where his father Diotifeci d'Agnolo served as a physician under Cosimo de' Medici, who became Ficino's lifelong patron. Cosimo chose Ficino to head his refounded Platonic Academy at Florence, an institution modeled on Plato's ancient Academy, and in 1462 provided him with Greek manuscripts of Plato's works; Ficino undertook the first complete Latin translation of Plato's extant corpus, finishing the draft by 1468\u201369 and publishing it in 1484, making Plato systematically accessible to Western European scholars for the first time. He also translated numerous Neoplatonic authors including Plotinus, Porphyry, and Iamblichus, and his students included Giovanni Pico della Mirandola and Francesco Cattani da Diacceto.

Ficino produced the first Latin translation of the Corpus Hermeticum in 1471, a collection of Hellenistic Greek documents discovered by Leonardo da Pistoia, placing him at the forefront of Renaissance Hermeticism, and his interest in astrology and the integration of cosmic influences with human life is most fully developed in De vita libri tres (1489). His Neoplatonist worldview embraced the concept of the anima mundi, the world's ensoulment, and he articulated the concept of prisca theologia, the idea of an ancient theological wisdom linking pagan sages such as Hermes Trismegistus and Plato to Christian truth. In 1489 he was accused of heresy before Pope Innocent VIII because the third book of De vita contained specific instructions on healthful living in a world of demons and other spirits, but he was ultimately acquitted.

Ficino coined the term "Platonic love," which first appeared in a 1476 letter to Alamanno Donati, and his 1492 Epistulae contained Platonic love letters to his friend Giovanni Cavalcanti, popularizing the concept across Western Europe. In his later commentary on Plotinus's Ennead III, he systematically repudiated key Neoplatonic doctrines\u2014the transmigration of the soul, the soul's eternity, and intermediary creation\u2014reinterpreting them as moral allegories to reconcile Platonism with Christianity. His translations of Plato, the Hermetica, and the Neoplatonists fundamentally reshaped Renaissance intellectual culture and laid groundwork for centuries of European philosophical development, influencing figures such as Paracelsus.`, works: [{ "title": "Theologia Platonica de immortalitate animae (1482)", "note": "Treatise on soul's immortality synthesizing Plato and Christianity; cornerstone of Renaissance Neoplatonism." }, { "title": "De vita libri tres (1489)", "note": "Three books on life with medical-astrological advice and planetary talismans; drew 1489 heresy charges." }, { "title": "Latin translation of the Corpus Hermeticum (1471)", "note": "First Latin Hermetica; launched Renaissance Hermeticism and prisca theologia." }, { "title": "De amore (1484)", "note": "Commentary on Plato's Symposium; develops Platonic love and celestial ascent." }, { "title": "Commentary on Plotinus's Enneads", "note": "Latin Plotinus with commentary; recast Neoplatonic cosmic hierarchies as Christian moral allegory." }] },
  "Johannes Trithemius": { wikipediaUrl: "https://en.wikipedia.org/wiki/Johannes_Trithemius", bio: "Johannes Trithemius, born Johann Heidenberg on 1 February 1462 in Trittenheim on the Moselle River in the Electorate of Trier, was a German Benedictine abbot, historian, cryptographer, and occultist whose byname derives from his native town. His father died in his infancy and his stepfather was hostile to education, forcing him to study Greek, Latin, and Hebrew in secret and with many difficulties; at seventeen he left home for teachers, traveling through Trier, Cologne, the Netherlands, and Heidelberg. In 1482, caught in a snowstorm, he took shelter at the Benedictine abbey of Sponheim and decided to remain, and was elected abbot in 1483 at just twenty-one, transforming the neglected abbey into a center of learning by expanding its library from around fifty items to more than two thousand.\n\nTrithemius is considered a founder of modern cryptography (alongside Leon Battista Alberti) and of steganography, as well as a progenitor of bibliography and literary studies as organized disciplines, and he had considerable influence on the development of early modern and modern occultism. His notable students included Heinrich Cornelius Agrippa and Paracelsus, and his reputation as a necromancer intertwined with the Faust legend: he was the first author to mention the historical Doctor Faustus in a 1507 account, and Martin Luther later wrote of a magician understood to be Trithemius who summoned Alexander the Great and the emperor's deceased wife Mary of Burgundy to entertain Maximilian. Increasing tensions at Sponheim, partly due to his reputation as a magician, led to his resignation in 1506, after which he became abbot of St. James's Abbey (the Schottenkloster) in W\xFCrzburg under Bishop Lorenz von Bibra, remaining there until his death on 13 December 1516.\n\nAs a historian Trithemius produced chronicles of Sponheim and Hirsau Abbey distinguished by Latin mastery and eloquent prose, but he inserted several fictional passages and invented entire sources, most notoriously Hunibald, a supposedly Scythian historian used to establish Trojan origins for the Franks in service of Habsburg dynastic politics. His most famous work, the Steganographia (written c. 1499, published 1606), appears to treat magic and spirit communication over long distances, but its first two volumes were revealed as cryptographic and steganographic content after the 1606 publication of a decryption key, and the third volume was shown in the 1990s to conceal further cryptographic material beneath its magical formulae. The book was placed on the Index Librorum Prohibitorum in 1609 and removed in 1900, and it contains the Ave Maria cipher, where each coded letter is replaced by a short Latin sentence about Jesus.", works: [{ "title": "Steganographia (c. 1499; pub. 1606)", "note": "Apparent spirit-magic treatise that is actually cryptography; Ave Maria cipher. Indexed 1609." }, { "title": "Polygraphia (written 1508; pub. 1518)", "note": "First printed book on cryptography; frames ciphering as a consequent of God-empowered soul ascent." }, { "title": "De septem secundeis (c. 1508)", "note": "World history governed by seven planetary intelligences moving the orbs; astrological occult chronology." }, { "title": "Annales Hirsaugienses (1509\u20131514)", "note": "1,400-page chronicle of France and Germany; among the first humanist histories." }, { "title": "Liber de scriptoribus ecclesiasticis (1494)", "note": "Bibliographical work on ecclesiastical writers; a founding text of bibliography as a discipline." }] },
  "Giovanni Pico della Mirandola": { wikipediaUrl: "https://en.wikipedia.org/wiki/Giovanni_Pico_della_Mirandola", bio: 'Giovanni Pico della Mirandola (1463\u20131494) was an Italian Renaissance nobleman and philosopher, widely regarded as the founder of Christian Kabbalah. Born to the lords of Mirandola, he was a precocious child named a papal protonotary at age ten, and studied canon law at Bologna, philosophy at Ferrara and Padua, and at Paris. At Padua he studied Hebrew and Arabic with the Jewish Averroist Elia del Medigo, who translated kabbalistic manuscripts into Latin for him, and his tutor in Kabbalah, Rabbi Yohanan Alemanno, taught that magic was the final stage of intellectual and spiritual education.\n\nIn December 1486 Pico published his 900 Theses\u2014propositions spanning Platonism, Aristotelianism, Hermeticism, and Kabbalah\u2014and offered to fund a public debate in Rome. Pope Innocent VIII halted the debate, appointed a commission, and condemned all 900 theses, making it the first printed book universally banned by the Church; Pico fled, was imprisoned, and was only cleared in 1493 under Alexander VI. His syncretic program held that different religious traditions describe the same God in different words, and he relied on translations by the convert Flavius Mithridates, who supplied doctored kabbalistic texts.\n\nPico died in 1494 at age 31 under mysterious circumstances alongside his friend Poliziano; a 2007 forensic exhumation indicated arsenic poisoning. In his final years he became a follower of Savonarola, destroyed his poetry, and gave away his fortune. His Oration on the Dignity of Man was later dubbed the "Manifesto of the Renaissance," and his posthumous Disputationes against predictive astrology shaped early modern critiques of judicial astrology.', works: [{ "title": "Oration on the Dignity of Man (1486)", "note": "Manifesto of the Renaissance; introduced the 900 theses, framing human vocation as mystical ascent." }, { "title": "900 Theses / Conclusiones (1486)", "note": "900 propositions blending Platonism, Kabbalah, Hermeticism; first printed book banned by the Church." }, { "title": "Heptaplus (1489)", "note": "Mystical-allegorical reading of Genesis through seven biblical senses; all religions describe the same God." }, { "title": "De Ente et Uno / On Being and the One (1491)", "note": "Attempted reconciliation of Platonic and Aristotelian metaphysics of being and the one." }, { "title": "Disputationes adversus astrologiam divinatricem", "note": "Posthumous treatise against deterministic judicial astrology; defends free will vs stellar determinism." }] },
  "Heinrich Cornelius Agrippa": { wikipediaUrl: "https://en.wikipedia.org/wiki/Heinrich_Cornelius_Agrippa", bio: `Heinrich Cornelius Agrippa von Nettesheim (1486\u20131535) was a German Renaissance polymath, occult philosopher, and soldier whose Three Books of Occult Philosophy became the foundational summa of early modern Western esotericism. Born near Cologne into minor nobility, he matriculated at the University of Cologne at thirteen and earned his magister artium by 1502, where the Albertist faction sparked his interest in the occult; he later studied in Paris and reportedly joined a secret occult society. He served as a mercenary captain under Emperor Maximilian I, who granted him the title of Ritter.

Under the patronage of Margaret of Austria, Agrippa lectured at the University of Dole on Reuchlin's De verbo mirifico and wrote a cabalistic defense of women's superiority, for which he was denounced as a "Judaizing heretic" and forced to leave in 1510. He then studied with the humanist abbot Trithemius at W\xFCrzburg, to whom he dedicated an early draft of De occulta philosophia; Trithemius advised him to keep his occult studies secret. In Italy (1511\u20131518) he encountered kabbalistic and Hermetic ideas descended from Ficino and Pico, and lectured at Pavia on the Pimander of Hermes Trismegistus.

Agrippa's mature system synthesized Kabbalah, Hermeticism, and Neoplatonism, arguing that the natural, celestial, and divine realms interconnect through Neoplatonic participation and that magic is ultimately sourced from God. His apparent recantation in De vanitate is now read as an admission of limits rather than a global retraction. He died in Grenoble in 1535 after being arrested by order of Francis I for disparaging the queen-mother, leaving a large family from three marriages.`, works: [{ "title": "De occulta philosophia libri tres (1531/1533)", "note": "Magnum opus; synthesizes Kabbalah, Hermeticism, Neoplatonism across elemental, celestial, divine realms." }, { "title": "De incertitudine et vanitate scientiarum (1526/1527)", "note": "Skeptical fideist satire on the sciences; influenced Montaigne, Descartes, Goethe." }, { "title": "Declamatio de nobilitate et praecellentia foeminei sexus (1529)", "note": "Cabalistically argued theological and moral superiority of women; early feminist occult tract." }, { "title": "Spurious Fourth Book of Occult Philosophy (1559)", "note": "Ritual magic compilation attributed to Agrippa but not his; circulated widely as an appendix." }] },
  "Paracelsus": { wikipediaUrl: "https://en.wikipedia.org/wiki/Paracelsus", bio: `Paracelsus, born Theophrastus Bombast von Hohenheim (c. 1493\u20131541), was a Swiss-German physician, alchemist, and mystic whose Paracelsianism movement reshaped early modern medicine. Educated by his chemist-physician father in botany, mineralogy, mining, and natural philosophy, and by clerics at St Paul's Abbey, he earned his M.D. from the University of Ferrara in 1515/16. Between 1517 and 1524 he traveled extensively across Europe and the Near East as an army surgeon, gathering folk and alchemical knowledge.

As city physician in Basel (1527) he lectured in German rather than Latin and publicly burned the works of Galen and Avicenna, an iconoclastic gesture that forced him to flee in 1528 and resume an itinerant life. He pioneered the medical use of chemicals and minerals, likely first naming zinc (~1526) and unknowingly observing hydrogen, and he rejected Galenic humoral theory in favor of the tria prima\u2014sulphur (combustibility/soul), mercury (liquidity/spirit), and salt (stability/body)\u2014explaining disease as their imbalance. He articulated the dose-response principle, "Solely the dose determines that a thing is not a poison," earning him the title father of toxicology.

Paracelsus was deeply influenced by Hermetic, Neoplatonic, and Pythagorean philosophies, and treated astrology as central to medical practice, devoting sections of his writings to astrological talismans for curing disease. His Astronomia magna (completed 1537, published 1571) was a treatise on hermeticism, astrology, divination, theology, and demonology that established his reputation as a prophet, and he described four elemental beings\u2014Salamanders, Gnomes, Undines, and Sylphs\u2014linking the macrocosm to the human microcosm. He died in Salzburg in 1541.`, works: [{ "title": "Opus Paramirum (1531)", "note": "First exposition of the tria prima (sulphur, mercury, salt) replacing Galenic humors; Paracelsian medicine." }, { "title": "Astronomia magna / Philosophia sagax (1537; pub. 1571)", "note": "Treatise on Hermeticism, astrology, divination, demonology; cast Paracelsus as a prophet." }, { "title": "Die grosse Wundartznei (1536)", "note": "The Great Surgery Book; restored his reputation with practical wound care and antisepsis principles." }, { "title": "Von der Bergsucht / On the Miners' Sickness (1534)", "note": "First systematic study of occupational disease; linked mineral/planetary influences to miners' ailments." }, { "title": "A Book on Nymphs, Sylphs, Pygmies, and Salamanders (posthumous)", "note": "Four elemental beings tied to classical elements; Hermetic cosmology of stellar-elemental forces." }] },
  "Nostradamus": { wikipediaUrl: "https://en.wikipedia.org/wiki/Nostradamus", bio: `Michel de Nostredame (1503\u20131566), known as Nostradamus, was a French physician, astrologer, and prognosticator whose Les Proph\xE9ties became one of the most widely published and commented prophetic works in European history. Born in Saint-R\xE9my-de-Provence to a family of recent Jewish converts to Catholicism, he studied at the University of Avignon until a plague outbreak closed it, then spent eight years traveling the countryside researching herbal remedies. He entered the University of Montpellier in 1529 to pursue a medical doctorate but was expelled when his prior apothecary work\u2014a manual trade forbidden by statute\u2014was discovered.

After losing his first wife and two children to plague in 1534, he worked as a plague physician in Marseille, Salon-de-Provence, and Aix-en-Provence, and in 1547 settled in Salon and married wealthy widow Anne Ponsarde. From 1550 he shifted from medicine toward the occult, publishing annual almanacs\u2014his most popular works, containing at least 6,338 prophecies\u2014and Latinizing his name to Nostradamus. Catherine de' Medici became his foremost patron, summoning him to Paris and making him Counselor and Physician-in-Ordinary to King Charles IX.

His prophetic method relied on judicial astrology and comparative horoscopy, but scholarship shows he paraphrased collections of ancient end-of-world prophecies, particularly the Mirabilis Liber (1522), supplemented with historical sources like Livy, Suetonius, and Plutarch. He explicitly rejected the label "prophet." Over 200 editions of Les Proph\xE9ties have appeared with over 2,000 commentaries, though academic sources reject any genuine supernatural ability, noting the quatrains are characteristically vague and that associations with world events result from misinterpretations or mistranslations. He died in 1566 after years of gout and edema.`, works: [{ "title": "Les Proph\xE9ties (1555; omnibus 1568)", "note": "942 quatrains in ten Centuries predicting wars, plagues, disasters; most commented prophetic work in history." }, { "title": "Almanacs (1550\u20131566)", "note": "Annual prognostications, his most popular works; 6,338+ prophecies grounded in judicial astrology." }, { "title": "Trait\xE9 des fardemens", "note": "Medical cookbook on plague treatment and cosmetic preparations; bridges physician work with apothecary past." }, { "title": "Orus Apollo (manuscript)", "note": "Purported translation of a Greek work on Egyptian hieroglyphs; ties prophecy to hieroglyphic mysticism." }, { "title": "Paraphrase de C. GALIEN", "note": "Free paraphrase of Galen's Protreptic; shows his medical-humanist grounding before the turn to prophecy." }] },
  "John Dee": { wikipediaUrl: "https://en.wikipedia.org/wiki/John_Dee", bio: `John Dee (1527\u20131608/09) was an English mathematician, astronomer, astrologer, and occult philosopher who served as court astronomer and advisor to Elizabeth I and became the founding figure of Enochian angelic magic. Of Welsh descent, he entered St John's College, Cambridge in 1542, became an original fellow of Trinity College on its 1546 founding, and studied at Leuven under Gerardus Mercator and Gemma Frisius, befriending Abraham Ortelius. He advised on navigation, trained voyagers for North American exploration, and is credited with coining the term "British Empire."

A devout Christian influenced by Hermetic, Platonic, and Pythagorean systems, Dee believed numbers were the basis of all things and that humans could exercise divine power through mathematics; his goal was a unified world religion healing the Catholic-Protestant schism. He served as court astronomer, chose Elizabeth I's coronation date, and was arrested in 1555 for casting horoscopes of Mary I and Princess Elizabeth before being exonerated. He advised on calendar reform in 1583, recommending England accept the Gregorian calendar with eleven days rather than ten.

By the early 1580s, dissatisfied with natural philosophy, Dee turned to supernatural means, meeting scryer Edward Kelley in 1582 and conducting "spiritual conferences" performed with intense Christian piety after purification, prayer, and fasting. Angels allegedly dictated books through Kelley in a special angelic or Enochian language, founding Enochian magic; in 1587 Kelley claimed the angel Uriel ordered them to share wives, after which Dee broke off the conferences and returned to England in 1589. He spent his final years in poverty at Mortlake, dying late 1608 or early 1609 aged 81 with no known grave.`, works: [{ "title": "Monas Hieroglyphica (1564)", "note": "Hermetic-Kabbalistic glyph expressing mystical unity of creation; includes a cryptography treatise." }, { "title": "Mathematical Preface to Euclid's Elements (1570)", "note": "Argued mathematics underpins all arts and sciences; his most widely influential work, in English." }, { "title": "General and Rare Memorials pertayning to the Perfect Arte of Navigation (1577)", "note": "Vision of a maritime empire; frontispiece of Britannia kneeling before Elizabeth I." }, { "title": "De Heptarchia Mystica (1582\u201383)", "note": "Mystical Rule of the Seven Planets; angelic communications tying planetary spirits to stellar governance." }, { "title": "Mysteriorum Libri Quinque / A True & Faithful Relation (pub. 1659)", "note": "Records of angelic conferences with Kelley; foundation of Enochian magic and the angelic-language project." }] },
  "Felipe II of Spain": { wikipediaUrl: "https://en.wikipedia.org/wiki/Philip_II_of_Spain", bio: `Philip II of Spain (1527\u20131598), called "the Prudent," was a Habsburg monarch who ruled the most extensive empire in the world, including Spain, Naples, Sicily, Portugal (from 1580, forming the Iberian Union), the Netherlands, and\u2014jure uxoris with Mary I\u2014England and Ireland (1554\u20131558). Born in Valladolid to Emperor Charles V and Isabella of Portugal, he was tutored by humanists including the future Archbishop Sil\xEDceo and began governing as regent at sixteen, having been made Duke of Milan in 1540. He saw himself as the defender of Catholic Europe against the Ottoman Empire and the Protestant Reformation.

His reign was defined by the decisive naval victory at Lepanto (1571) against the Ottomans, the brutal repression of the Dutch revolt in the Eighty Years' War, the failed Spanish Armadas against England (1588, 1596, 1597), and intervention in the French Wars of Religion through the Catholic League. He ordered the expulsion of Moriscos from Granada after the 1569 revolt, defaulted on loans repeatedly (1557, 1560, 1569, 1575, 1596), and moved his court to Madrid in 1561, making it the permanent capital. The Philippine Islands were named in his honor, and the Spanish Golden Age flourished in literature, music, and the visual arts under his patronage.

Philip died at El Escorial in 1598 and was buried in the palace-monastery he had built. The Wikipedia article provides no documented connection to astrology, the occult, stellar symbolism, or kabbalistic/mystical interests; El Escorial is framed solely as a Catholic palace-monastery-pantheon monument to Spain's role as a centre of the Christian world, and he prohibited biographical accounts of his life, contributing to an enigmatic reputation but with no documented private esoteric practice.`, works: [{ "title": "El Escorial (completed 1584)", "note": "Palace-monastery-pantheon monument to Spain as centre of the Christian world; no documented esoteric program." }, { "title": "Battle of Lepanto (1571)", "note": "Decisive Holy League naval victory over the Ottomans under his half-brother John of Austria." }, { "title": "Move of the court to Madrid (1561)", "note": "Established Madrid as the permanent Spanish capital, centralizing Habsburg imperial governance." }, { "title": "Relaciones geogr\xE1ficas", "note": "Extensive questionnaires to New World towns; systematic geographic and ethnographic governance." }, { "title": "Iberian Union (1580)", "note": "Personal union of Spain and Portugal; created the largest European empire of the era and a global domain." }] }
};

// src/pages/MagesPage.jsx
function wiki2(name) {
  return "https://en.wikipedia.org/wiki/" + encodeURIComponent(name.replace(/ /g, "_"));
}
function MageCard({ m }) {
  const c = MAGES_CONTENT[m.name] || {};
  const dates = m.years || `${fmtYear(m.y0)} \u2013 ${fmtYear(m.y1)}`;
  const end = !!m.endpoint;
  const bio = c.bio || m.role;
  const works = c.works || [];
  const url = c.wikipediaUrl || wiki2(m.name);
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "panel mage-card" + (end ? " endpoint" : ""), style: { padding: 16, marginBottom: 14, borderColor: end ? "var(--gold)" : void 0, boxShadow: end ? "0 0 0 1px var(--gold)" : void 0 } }, /* @__PURE__ */ import_react3.default.createElement("h3", { style: { marginTop: 0, marginBottom: 4 } }, /* @__PURE__ */ import_react3.default.createElement("a", { href: url, target: "_blank", rel: "noreferrer", style: { color: "inherit", textDecoration: "none" } }, m.name), end && /* @__PURE__ */ import_react3.default.createElement("span", { className: "pill", style: { marginLeft: 8, color: "var(--gold)", borderColor: "var(--gold)" } }, "endpoint \xB7 end of the era of kings")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "muted", style: { marginBottom: 8, fontSize: ".82rem" } }, dates, " \xB7 ", m.region, m.isIberian && /* @__PURE__ */ import_react3.default.createElement("span", { className: "pill", style: { fontSize: ".68rem", marginLeft: 6, color: "var(--green)", borderColor: "var(--green)" } }, "Iberian"), m.isRoyal && /* @__PURE__ */ import_react3.default.createElement("span", { className: "pill", style: { fontSize: ".68rem", marginLeft: 6, color: "var(--violet)", borderColor: "var(--violet)" } }, "royal")), bio && bio.split(/\n\n+/).map((para, i) => /* @__PURE__ */ import_react3.default.createElement("p", { key: i, style: { marginBottom: 8, lineHeight: 1.55 } }, para)), works.length > 0 && /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement("table", { style: { marginTop: 6, width: "100%", fontSize: ".86rem" } }, /* @__PURE__ */ import_react3.default.createElement("thead", null, /* @__PURE__ */ import_react3.default.createElement("tr", null, /* @__PURE__ */ import_react3.default.createElement("th", { style: { textAlign: "left", padding: "4px 8px" } }, "Work / contribution"), /* @__PURE__ */ import_react3.default.createElement("th", { style: { textAlign: "left", padding: "4px 8px" } }, "Significance"))), /* @__PURE__ */ import_react3.default.createElement("tbody", null, works.map((w, i) => /* @__PURE__ */ import_react3.default.createElement("tr", { key: i }, /* @__PURE__ */ import_react3.default.createElement("td", { style: { padding: "4px 8px", fontWeight: 600 } }, w.title), /* @__PURE__ */ import_react3.default.createElement("td", { style: { padding: "4px 8px" }, className: "muted" }, w.note)))))), /* @__PURE__ */ import_react3.default.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ import_react3.default.createElement("a", { href: url, target: "_blank", rel: "noreferrer" }, "Read more on Wikipedia \u2192")));
}
function MagesPage() {
  const span = `${fmtYear(MAGES[0].y0)} \u2013 ${fmtYear(MAGES[MAGES.length - 1].y1)}`;
  return /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("h1", null, "Magi \u2014 from Daniel to Felipe II"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "muted" }, "A chronology of ", /* @__PURE__ */ import_react3.default.createElement("b", null, "magi / wise-men / royal-sage occult figures"), ", from the Babylonian court magi (", /* @__PURE__ */ import_react3.default.createElement("b", null, "Daniel, Shadrach, Meshach, Abednego"), ") through the medieval Iberian sages \u2014 ", /* @__PURE__ */ import_react3.default.createElement("b", null, "Ramon Llull, Alfonso X the Wise, Arnaldus de Villanova, Moses de Le\xF3n"), " \u2014 to the Renaissance Christian-kabbalists and royal astrologers, ending with ", /* @__PURE__ */ import_react3.default.createElement("b", { style: { color: "var(--gold)" } }, "Felipe II of Spain (1527\u20131598)"), ", who closes the era of kings. ", MAGES.length, " figures across ", span, ". Each mage's card gives a Wikipedia-grounded bio and a ", /* @__PURE__ */ import_react3.default.createElement("i", null, "ficha"), " of their most important works."), /* @__PURE__ */ import_react3.default.createElement("div", { className: "panel", style: { padding: 14, marginBottom: 14 } }, /* @__PURE__ */ import_react3.default.createElement(Timeline, { items: MAGES, title: "Magi timeline \u2014 Daniel to Felipe II", accent: "#7fb0ff" })), MAGES.map((m, i) => /* @__PURE__ */ import_react3.default.createElement(MageCard, { key: i, m })));
}

// src/pages/AlignmentFicha.jsx
var import_react5 = __toESM(require_react());

// src/ui.jsx
var import_react4 = __toESM(require_react());

// ../data/astronomy-engine.mjs
var C_AUDAY = 173.1446326846693;
var KM_PER_AU = 14959787069098932e-8;
var DEG2RAD = 0.017453292519943295;
var RAD2DEG = 57.29577951308232;
var DAYS_PER_TROPICAL_YEAR = 365.24217;
var J2000 = /* @__PURE__ */ new Date("2000-01-01T12:00:00Z");
var PI2 = 2 * Math.PI;
var ARC = 3600 * (180 / Math.PI);
var ASEC2RAD = 484813681109536e-20;
var ASEC180 = 180 * 60 * 60;
var ASEC360 = 2 * ASEC180;
var AU_PER_PARSEC = ASEC180 / Math.PI;
var SUN_MAG_1AU = -0.17 - 5 * Math.log10(AU_PER_PARSEC);
var SECONDS_PER_DAY = 24 * 3600;
var MILLIS_PER_DAY = SECONDS_PER_DAY * 1e3;
var SUN_RADIUS_KM = 695700;
var SUN_RADIUS_AU = SUN_RADIUS_KM / KM_PER_AU;
var EARTH_FLATTENING = 0.996647180302104;
var EARTH_FLATTENING_SQUARED = EARTH_FLATTENING * EARTH_FLATTENING;
var EARTH_EQUATORIAL_RADIUS_KM = 6378.1366;
var EARTH_EQUATORIAL_RADIUS_AU = EARTH_EQUATORIAL_RADIUS_KM / KM_PER_AU;
var EARTH_POLAR_RADIUS_KM = EARTH_EQUATORIAL_RADIUS_KM * EARTH_FLATTENING;
var EARTH_MEAN_RADIUS_KM = 6371;
var EARTH_ATMOSPHERE_KM = 88;
var EARTH_ECLIPSE_RADIUS_KM = EARTH_MEAN_RADIUS_KM + EARTH_ATMOSPHERE_KM;
var MOON_EQUATORIAL_RADIUS_KM = 1738.1;
var MOON_EQUATORIAL_RADIUS_AU = MOON_EQUATORIAL_RADIUS_KM / KM_PER_AU;
var MOON_POLAR_RADIUS_KM = 1736;
var MOON_POLAR_RADIUS_AU = MOON_POLAR_RADIUS_KM / KM_PER_AU;
var REFRACTION_NEAR_HORIZON = 34 / 60;
var EARTH_MOON_MASS_RATIO = 81.30056;
var SUN_GM = 2959122082855911e-19;
var EARTH_GM = 8887692390113509e-25;
var JUPITER_GM = 2825345909524226e-22;
var SATURN_GM = 8459715185680659e-23;
var URANUS_GM = 1292024916781969e-23;
var NEPTUNE_GM = 1524358900784276e-23;
var MOON_GM = EARTH_GM / EARTH_MOON_MASS_RATIO;
function VerifyBoolean(b) {
  if (b !== true && b !== false) {
    console.trace();
    throw `Value is not boolean: ${b}`;
  }
  return b;
}
function VerifyNumber(x) {
  if (!Number.isFinite(x)) {
    console.trace();
    throw `Value is not a finite number: ${x}`;
  }
  return x;
}
function Frac(x) {
  return x - Math.floor(x);
}
var Body;
(function(Body2) {
  Body2["Sun"] = "Sun";
  Body2["Moon"] = "Moon";
  Body2["Mercury"] = "Mercury";
  Body2["Venus"] = "Venus";
  Body2["Earth"] = "Earth";
  Body2["Mars"] = "Mars";
  Body2["Jupiter"] = "Jupiter";
  Body2["Saturn"] = "Saturn";
  Body2["Uranus"] = "Uranus";
  Body2["Neptune"] = "Neptune";
  Body2["Pluto"] = "Pluto";
  Body2["SSB"] = "SSB";
  Body2["EMB"] = "EMB";
  Body2["Star1"] = "Star1";
  Body2["Star2"] = "Star2";
  Body2["Star3"] = "Star3";
  Body2["Star4"] = "Star4";
  Body2["Star5"] = "Star5";
  Body2["Star6"] = "Star6";
  Body2["Star7"] = "Star7";
  Body2["Star8"] = "Star8";
})(Body || (Body = {}));
var StarList = [
  Body.Star1,
  Body.Star2,
  Body.Star3,
  Body.Star4,
  Body.Star5,
  Body.Star6,
  Body.Star7,
  Body.Star8
];
var StarTable = [
  { ra: 0, dec: 0, dist: 0 },
  { ra: 0, dec: 0, dist: 0 },
  { ra: 0, dec: 0, dist: 0 },
  { ra: 0, dec: 0, dist: 0 },
  { ra: 0, dec: 0, dist: 0 },
  { ra: 0, dec: 0, dist: 0 },
  { ra: 0, dec: 0, dist: 0 },
  { ra: 0, dec: 0, dist: 0 }
];
function GetStar(body) {
  const index = StarList.indexOf(body);
  return index >= 0 ? StarTable[index] : null;
}
function UserDefinedStar(body) {
  const star = GetStar(body);
  return star && star.dist > 0 ? star : null;
}
var PrecessDirection;
(function(PrecessDirection2) {
  PrecessDirection2[PrecessDirection2["From2000"] = 0] = "From2000";
  PrecessDirection2[PrecessDirection2["Into2000"] = 1] = "Into2000";
})(PrecessDirection || (PrecessDirection = {}));
var vsop = {
  Mercury: [
    [
      [
        [4.40250710144, 0, 0],
        [0.40989414977, 1.48302034195, 26087.9031415742],
        [0.050462942, 4.47785489551, 52175.8062831484],
        [0.00855346844, 1.16520322459, 78263.70942472259],
        [0.00165590362, 4.11969163423, 104351.61256629678],
        [34561897e-11, 0.77930768443, 130439.51570787099],
        [7583476e-11, 3.71348404924, 156527.41884944518]
      ],
      [
        [26087.90313685529, 0, 0],
        [0.01131199811, 6.21874197797, 26087.9031415742],
        [0.00292242298, 3.04449355541, 52175.8062831484],
        [75775081e-11, 6.08568821653, 78263.70942472259],
        [19676525e-11, 2.80965111777, 104351.61256629678]
      ]
    ],
    [
      [
        [0.11737528961, 1.98357498767, 26087.9031415742],
        [0.02388076996, 5.03738959686, 52175.8062831484],
        [0.01222839532, 3.14159265359, 0],
        [0.0054325181, 1.79644363964, 78263.70942472259],
        [0.0012977877, 4.83232503958, 104351.61256629678],
        [31866927e-11, 1.58088495658, 130439.51570787099],
        [7963301e-11, 4.60972126127, 156527.41884944518]
      ],
      [
        [0.00274646065, 3.95008450011, 26087.9031415742],
        [99737713e-11, 3.14159265359, 0]
      ]
    ],
    [
      [
        [0.39528271651, 0, 0],
        [0.07834131818, 6.19233722598, 26087.9031415742],
        [0.00795525558, 2.95989690104, 52175.8062831484],
        [0.00121281764, 6.01064153797, 78263.70942472259],
        [21921969e-11, 2.77820093972, 104351.61256629678],
        [4354065e-11, 5.82894543774, 130439.51570787099]
      ],
      [
        [0.0021734774, 4.65617158665, 26087.9031415742],
        [44141826e-11, 1.42385544001, 52175.8062831484]
      ]
    ]
  ],
  Venus: [
    [
      [
        [3.17614666774, 0, 0],
        [0.01353968419, 5.59313319619, 10213.285546211],
        [89891645e-11, 5.30650047764, 20426.571092422],
        [5477194e-11, 4.41630661466, 7860.4193924392],
        [3455741e-11, 2.6996444782, 11790.6290886588],
        [2372061e-11, 2.99377542079, 3930.2096962196],
        [1317168e-11, 5.18668228402, 26.2983197998],
        [1664146e-11, 4.25018630147, 1577.3435424478],
        [1438387e-11, 4.15745084182, 9683.5945811164],
        [1200521e-11, 6.15357116043, 30639.856638633]
      ],
      [
        [10213.28554621638, 0, 0],
        [95617813e-11, 2.4640651111, 10213.285546211],
        [7787201e-11, 0.6247848222, 20426.571092422]
      ]
    ],
    [
      [
        [0.05923638472, 0.26702775812, 10213.285546211],
        [40107978e-11, 1.14737178112, 20426.571092422],
        [32814918e-11, 3.14159265359, 0]
      ],
      [
        [0.00287821243, 1.88964962838, 10213.285546211]
      ]
    ],
    [
      [
        [0.72334820891, 0, 0],
        [0.00489824182, 4.02151831717, 10213.285546211],
        [1658058e-11, 4.90206728031, 20426.571092422],
        [1378043e-11, 1.12846591367, 11790.6290886588],
        [1632096e-11, 2.84548795207, 7860.4193924392],
        [498395e-11, 2.58682193892, 9683.5945811164],
        [221985e-11, 2.01346696541, 19367.1891622328],
        [237454e-11, 2.55136053886, 15720.8387848784]
      ],
      [
        [34551041e-11, 0.89198706276, 10213.285546211]
      ]
    ]
  ],
  Earth: [
    [
      [
        [1.75347045673, 0, 0],
        [0.03341656453, 4.66925680415, 6283.0758499914],
        [34894275e-11, 4.62610242189, 12566.1516999828],
        [3417572e-11, 2.82886579754, 3.523118349],
        [3497056e-11, 2.74411783405, 5753.3848848968],
        [3135899e-11, 3.62767041756, 77713.7714681205],
        [2676218e-11, 4.41808345438, 7860.4193924392],
        [2342691e-11, 6.13516214446, 3930.2096962196],
        [1273165e-11, 2.03709657878, 529.6909650946],
        [1324294e-11, 0.74246341673, 11506.7697697936],
        [901854e-11, 2.04505446477, 26.2983197998],
        [1199167e-11, 1.10962946234, 1577.3435424478],
        [857223e-11, 3.50849152283, 398.1490034082],
        [779786e-11, 1.17882681962, 5223.6939198022],
        [99025e-10, 5.23268072088, 5884.9268465832],
        [753141e-11, 2.53339052847, 5507.5532386674],
        [505267e-11, 4.58292599973, 18849.2275499742],
        [492392e-11, 4.20505711826, 775.522611324],
        [356672e-11, 2.91954114478, 0.0673103028],
        [284125e-11, 1.89869240932, 796.2980068164],
        [242879e-11, 0.34481445893, 5486.777843175],
        [317087e-11, 5.84901948512, 11790.6290886588],
        [271112e-11, 0.31486255375, 10977.078804699],
        [206217e-11, 4.80646631478, 2544.3144198834],
        [205478e-11, 1.86953770281, 5573.1428014331],
        [202318e-11, 2.45767790232, 6069.7767545534],
        [126225e-11, 1.08295459501, 20.7753954924],
        [155516e-11, 0.83306084617, 213.299095438]
      ],
      [
        [6283.0758499914, 0, 0],
        [0.00206058863, 2.67823455808, 6283.0758499914],
        [4303419e-11, 2.63512233481, 12566.1516999828]
      ],
      [
        [8721859e-11, 1.07253635559, 6283.0758499914]
      ]
    ],
    [
      [],
      [
        [0.00227777722, 3.4137662053, 6283.0758499914],
        [3805678e-11, 3.37063423795, 12566.1516999828]
      ]
    ],
    [
      [
        [1.00013988784, 0, 0],
        [0.01670699632, 3.09846350258, 6283.0758499914],
        [13956024e-11, 3.05524609456, 12566.1516999828],
        [308372e-10, 5.19846674381, 77713.7714681205],
        [1628463e-11, 1.17387558054, 5753.3848848968],
        [1575572e-11, 2.84685214877, 7860.4193924392],
        [924799e-11, 5.45292236722, 11506.7697697936],
        [542439e-11, 4.56409151453, 3930.2096962196],
        [47211e-10, 3.66100022149, 5884.9268465832],
        [85831e-11, 1.27079125277, 161000.6857376741],
        [57056e-11, 2.01374292245, 83996.84731811189],
        [55736e-11, 5.2415979917, 71430.69561812909],
        [174844e-11, 3.01193636733, 18849.2275499742],
        [243181e-11, 4.2734953079, 11790.6290886588]
      ],
      [
        [0.00103018607, 1.10748968172, 6283.0758499914],
        [1721238e-11, 1.06442300386, 12566.1516999828]
      ],
      [
        [4359385e-11, 5.78455133808, 6283.0758499914]
      ]
    ]
  ],
  Mars: [
    [
      [
        [6.20347711581, 0, 0],
        [0.18656368093, 5.0503710027, 3340.6124266998],
        [0.01108216816, 5.40099836344, 6681.2248533996],
        [91798406e-11, 5.75478744667, 10021.8372800994],
        [27744987e-11, 5.97049513147, 3.523118349],
        [10610235e-11, 2.93958560338, 2281.2304965106],
        [12315897e-11, 0.84956094002, 2810.9214616052],
        [8926784e-11, 4.15697846427, 0.0172536522],
        [8715691e-11, 6.11005153139, 13362.4497067992],
        [6797556e-11, 0.36462229657, 398.1490034082],
        [7774872e-11, 3.33968761376, 5621.8429232104],
        [3575078e-11, 1.6618650571, 2544.3144198834],
        [4161108e-11, 0.22814971327, 2942.4634232916],
        [3075252e-11, 0.85696614132, 191.4482661116],
        [2628117e-11, 0.64806124465, 3337.0893083508],
        [2937546e-11, 6.07893711402, 0.0673103028],
        [2389414e-11, 5.03896442664, 796.2980068164],
        [2579844e-11, 0.02996736156, 3344.1355450488],
        [1528141e-11, 1.14979301996, 6151.533888305],
        [1798806e-11, 0.65634057445, 529.6909650946],
        [1264357e-11, 3.62275122593, 5092.1519581158],
        [1286228e-11, 3.06796065034, 2146.1654164752],
        [1546404e-11, 2.91579701718, 1751.539531416],
        [1024902e-11, 3.69334099279, 8962.4553499102],
        [891566e-11, 0.18293837498, 16703.062133499],
        [858759e-11, 2.4009381194, 2914.0142358238],
        [832715e-11, 2.46418619474, 3340.5951730476],
        [83272e-10, 4.49495782139, 3340.629680352],
        [712902e-11, 3.66335473479, 1059.3819301892],
        [748723e-11, 3.82248614017, 155.4203994342],
        [723861e-11, 0.67497311481, 3738.761430108],
        [635548e-11, 2.92182225127, 8432.7643848156],
        [655162e-11, 0.48864064125, 3127.3133312618],
        [550474e-11, 3.81001042328, 0.9803210682],
        [55275e-10, 4.47479317037, 1748.016413067],
        [425966e-11, 0.55364317304, 6283.0758499914],
        [415131e-11, 0.49662285038, 213.299095438],
        [472167e-11, 3.62547124025, 1194.4470102246],
        [306551e-11, 0.38052848348, 6684.7479717486],
        [312141e-11, 0.99853944405, 6677.7017350506],
        [293198e-11, 4.22131299634, 20.7753954924],
        [302375e-11, 4.48618007156, 3532.0606928114],
        [274027e-11, 0.54222167059, 3340.545116397],
        [281079e-11, 5.88163521788, 1349.8674096588],
        [231183e-11, 1.28242156993, 3870.3033917944],
        [283602e-11, 5.7688543494, 3149.1641605882],
        [236117e-11, 5.75503217933, 3333.498879699],
        [274033e-11, 0.13372524985, 3340.6797370026],
        [299395e-11, 2.78323740866, 6254.6266625236]
      ],
      [
        [3340.61242700512, 0, 0],
        [0.01457554523, 3.60433733236, 3340.6124266998],
        [0.00168414711, 3.92318567804, 6681.2248533996],
        [20622975e-11, 4.26108844583, 10021.8372800994],
        [3452392e-11, 4.7321039319, 3.523118349],
        [2586332e-11, 4.60670058555, 13362.4497067992],
        [841535e-11, 4.45864030426, 2281.2304965106]
      ],
      [
        [58152577e-11, 2.04961712429, 3340.6124266998],
        [13459579e-11, 2.45738706163, 6681.2248533996]
      ]
    ],
    [
      [
        [0.03197134986, 3.76832042431, 3340.6124266998],
        [0.00298033234, 4.10616996305, 6681.2248533996],
        [0.00289104742, 0, 0],
        [31365539e-11, 4.4465105309, 10021.8372800994],
        [34841e-9, 4.7881254926, 13362.4497067992]
      ],
      [
        [0.00217310991, 6.04472194776, 3340.6124266998],
        [20976948e-11, 3.14159265359, 0],
        [12834709e-11, 1.60810667915, 6681.2248533996]
      ]
    ],
    [
      [
        [1.53033488271, 0, 0],
        [0.1418495316, 3.47971283528, 3340.6124266998],
        [0.00660776362, 3.81783443019, 6681.2248533996],
        [46179117e-11, 4.15595316782, 10021.8372800994],
        [8109733e-11, 5.55958416318, 2810.9214616052],
        [7485318e-11, 1.77239078402, 5621.8429232104],
        [5523191e-11, 1.3643630377, 2281.2304965106],
        [382516e-10, 4.49407183687, 13362.4497067992],
        [2306537e-11, 0.09081579001, 2544.3144198834],
        [1999396e-11, 5.36059617709, 3337.0893083508],
        [2484394e-11, 4.9254563992, 2942.4634232916],
        [1960195e-11, 4.74249437639, 3344.1355450488],
        [1167119e-11, 2.11260868341, 5092.1519581158],
        [1102816e-11, 5.00908403998, 398.1490034082],
        [899066e-11, 4.40791133207, 529.6909650946],
        [992252e-11, 5.83861961952, 6151.533888305],
        [807354e-11, 2.10217065501, 1059.3819301892],
        [797915e-11, 3.44839203899, 796.2980068164],
        [740975e-11, 1.49906336885, 2146.1654164752]
      ],
      [
        [0.01107433345, 2.03250524857, 3340.6124266998],
        [0.00103175887, 2.37071847807, 6681.2248533996],
        [128772e-9, 0, 0],
        [1081588e-10, 2.70888095665, 10021.8372800994]
      ],
      [
        [44242249e-11, 0.47930604954, 3340.6124266998],
        [8138042e-11, 0.86998389204, 6681.2248533996]
      ]
    ]
  ],
  Jupiter: [
    [
      [
        [0.59954691494, 0, 0],
        [0.09695898719, 5.06191793158, 529.6909650946],
        [0.00573610142, 1.44406205629, 7.1135470008],
        [0.00306389205, 5.41734730184, 1059.3819301892],
        [97178296e-11, 4.14264726552, 632.7837393132],
        [72903078e-11, 3.64042916389, 522.5774180938],
        [64263975e-11, 3.41145165351, 103.0927742186],
        [39806064e-11, 2.29376740788, 419.4846438752],
        [38857767e-11, 1.27231755835, 316.3918696566],
        [27964629e-11, 1.7845459182, 536.8045120954],
        [1358973e-10, 5.7748104079, 1589.0728952838],
        [8246349e-11, 3.5822792584, 206.1855484372],
        [8768704e-11, 3.63000308199, 949.1756089698],
        [7368042e-11, 5.0810119427, 735.8765135318],
        [626315e-10, 0.02497628807, 213.299095438],
        [6114062e-11, 4.51319998626, 1162.4747044078],
        [4905396e-11, 1.32084470588, 110.2063212194],
        [5305285e-11, 1.30671216791, 14.2270940016],
        [5305441e-11, 4.18625634012, 1052.2683831884],
        [4647248e-11, 4.69958103684, 3.9321532631],
        [3045023e-11, 4.31676431084, 426.598190876],
        [2609999e-11, 1.56667394063, 846.0828347512],
        [2028191e-11, 1.06376530715, 3.1813937377],
        [1764763e-11, 2.14148655117, 1066.49547719],
        [1722972e-11, 3.88036268267, 1265.5674786264],
        [1920945e-11, 0.97168196472, 639.897286314],
        [1633223e-11, 3.58201833555, 515.463871093],
        [1431999e-11, 4.29685556046, 625.6701923124],
        [973272e-11, 4.09764549134, 95.9792272178]
      ],
      [
        [529.69096508814, 0, 0],
        [0.00489503243, 4.2208293947, 529.6909650946],
        [0.00228917222, 6.02646855621, 7.1135470008],
        [30099479e-11, 4.54540782858, 1059.3819301892],
        [2072092e-10, 5.45943156902, 522.5774180938],
        [12103653e-11, 0.16994816098, 536.8045120954],
        [6067987e-11, 4.42422292017, 103.0927742186],
        [5433968e-11, 3.98480737746, 419.4846438752],
        [4237744e-11, 5.89008707199, 14.2270940016]
      ],
      [
        [47233601e-11, 4.32148536482, 7.1135470008],
        [30649436e-11, 2.929777887, 529.6909650946],
        [14837605e-11, 3.14159265359, 0]
      ]
    ],
    [
      [
        [0.02268615702, 3.55852606721, 529.6909650946],
        [0.00109971634, 3.90809347197, 1059.3819301892],
        [0.00110090358, 0, 0],
        [8101428e-11, 3.60509572885, 522.5774180938],
        [6043996e-11, 4.25883108339, 1589.0728952838],
        [6437782e-11, 0.30627119215, 536.8045120954]
      ],
      [
        [78203446e-11, 1.52377859742, 529.6909650946]
      ]
    ],
    [
      [
        [5.20887429326, 0, 0],
        [0.25209327119, 3.49108639871, 529.6909650946],
        [0.00610599976, 3.84115365948, 1059.3819301892],
        [0.00282029458, 2.57419881293, 632.7837393132],
        [0.00187647346, 2.07590383214, 522.5774180938],
        [86792905e-11, 0.71001145545, 419.4846438752],
        [72062974e-11, 0.21465724607, 536.8045120954],
        [65517248e-11, 5.9799588479, 316.3918696566],
        [29134542e-11, 1.67759379655, 103.0927742186],
        [30135335e-11, 2.16132003734, 949.1756089698],
        [23453271e-11, 3.54023522184, 735.8765135318],
        [22283743e-11, 4.19362594399, 1589.0728952838],
        [23947298e-11, 0.2745803748, 7.1135470008],
        [13032614e-11, 2.96042965363, 1162.4747044078],
        [970336e-10, 1.90669633585, 206.1855484372],
        [12749023e-11, 2.71550286592, 1052.2683831884],
        [7057931e-11, 2.18184839926, 1265.5674786264],
        [6137703e-11, 6.26418240033, 846.0828347512],
        [2616976e-11, 2.00994012876, 1581.959348283]
      ],
      [
        [0.0127180152, 2.64937512894, 529.6909650946],
        [61661816e-11, 3.00076460387, 1059.3819301892],
        [53443713e-11, 3.89717383175, 522.5774180938],
        [31185171e-11, 4.88276958012, 536.8045120954],
        [41390269e-11, 0, 0]
      ]
    ]
  ],
  Saturn: [
    [
      [
        [0.87401354025, 0, 0],
        [0.11107659762, 3.96205090159, 213.299095438],
        [0.01414150957, 4.58581516874, 7.1135470008],
        [0.00398379389, 0.52112032699, 206.1855484372],
        [0.00350769243, 3.30329907896, 426.598190876],
        [0.00206816305, 0.24658372002, 103.0927742186],
        [792713e-9, 3.84007056878, 220.4126424388],
        [23990355e-11, 4.66976924553, 110.2063212194],
        [16573588e-11, 0.43719228296, 419.4846438752],
        [14906995e-11, 5.76903183869, 316.3918696566],
        [1582029e-10, 0.93809155235, 632.7837393132],
        [14609559e-11, 1.56518472, 3.9321532631],
        [13160301e-11, 4.44891291899, 14.2270940016],
        [15053543e-11, 2.71669915667, 639.897286314],
        [13005299e-11, 5.98119023644, 11.0457002639],
        [10725067e-11, 3.12939523827, 202.2533951741],
        [5863206e-11, 0.23656938524, 529.6909650946],
        [5227757e-11, 4.20783365759, 3.1813937377],
        [6126317e-11, 1.76328667907, 277.0349937414],
        [5019687e-11, 3.17787728405, 433.7117378768],
        [459255e-10, 0.61977744975, 199.0720014364],
        [4005867e-11, 2.24479718502, 63.7358983034],
        [2953796e-11, 0.98280366998, 95.9792272178],
        [387367e-10, 3.22283226966, 138.5174968707],
        [2461186e-11, 2.03163875071, 735.8765135318],
        [3269484e-11, 0.77492638211, 949.1756089698],
        [1758145e-11, 3.2658010994, 522.5774180938],
        [1640172e-11, 5.5050445305, 846.0828347512],
        [1391327e-11, 4.02333150505, 323.5054166574],
        [1580648e-11, 4.37265307169, 309.2783226558],
        [1123498e-11, 2.83726798446, 415.5524906121],
        [1017275e-11, 3.71700135395, 227.5261894396],
        [848642e-11, 3.1915017083, 209.3669421749]
      ],
      [
        [213.2990952169, 0, 0],
        [0.01297370862, 1.82834923978, 213.299095438],
        [0.00564345393, 2.88499717272, 7.1135470008],
        [93734369e-11, 1.06311793502, 426.598190876],
        [0.00107674962, 2.27769131009, 206.1855484372],
        [40244455e-11, 2.04108104671, 220.4126424388],
        [19941774e-11, 1.2795439047, 103.0927742186],
        [10511678e-11, 2.7488034213, 14.2270940016],
        [6416106e-11, 0.38238295041, 639.897286314],
        [4848994e-11, 2.43037610229, 419.4846438752],
        [4056892e-11, 2.92133209468, 110.2063212194],
        [3768635e-11, 3.6496533078, 3.9321532631]
      ],
      [
        [0.0011644133, 1.17988132879, 7.1135470008],
        [91841837e-11, 0.0732519584, 213.299095438],
        [36661728e-11, 0, 0],
        [15274496e-11, 4.06493179167, 206.1855484372]
      ]
    ],
    [
      [
        [0.04330678039, 3.60284428399, 213.299095438],
        [0.00240348302, 2.85238489373, 426.598190876],
        [84745939e-11, 0, 0],
        [30863357e-11, 3.48441504555, 220.4126424388],
        [34116062e-11, 0.57297307557, 206.1855484372],
        [1473407e-10, 2.11846596715, 639.897286314],
        [9916667e-11, 5.79003188904, 419.4846438752],
        [6993564e-11, 4.7360468972, 7.1135470008],
        [4807588e-11, 5.43305312061, 316.3918696566]
      ],
      [
        [0.00198927992, 4.93901017903, 213.299095438],
        [36947916e-11, 3.14159265359, 0],
        [17966989e-11, 0.5197943111, 426.598190876]
      ]
    ],
    [
      [
        [9.55758135486, 0, 0],
        [0.52921382865, 2.39226219573, 213.299095438],
        [0.01873679867, 5.2354960466, 206.1855484372],
        [0.01464663929, 1.64763042902, 426.598190876],
        [0.00821891141, 5.93520042303, 316.3918696566],
        [0.00547506923, 5.0153261898, 103.0927742186],
        [0.0037168465, 2.27114821115, 220.4126424388],
        [0.00361778765, 3.13904301847, 7.1135470008],
        [0.00140617506, 5.70406606781, 632.7837393132],
        [0.00108974848, 3.29313390175, 110.2063212194],
        [69006962e-11, 5.94099540992, 419.4846438752],
        [61053367e-11, 0.94037691801, 639.897286314],
        [48913294e-11, 1.55733638681, 202.2533951741],
        [34143772e-11, 0.19519102597, 277.0349937414],
        [32401773e-11, 5.47084567016, 949.1756089698],
        [20936596e-11, 0.46349251129, 735.8765135318],
        [9796004e-11, 5.20477537945, 1265.5674786264],
        [11993338e-11, 5.98050967385, 846.0828347512],
        [208393e-9, 1.52102476129, 433.7117378768],
        [15298404e-11, 3.0594381494, 529.6909650946],
        [6465823e-11, 0.17732249942, 1052.2683831884],
        [11380257e-11, 1.7310542704, 522.5774180938],
        [3419618e-11, 4.94550542171, 1581.959348283]
      ],
      [
        [0.0618298134, 0.2584351148, 213.299095438],
        [0.00506577242, 0.71114625261, 206.1855484372],
        [0.00341394029, 5.79635741658, 426.598190876],
        [0.00188491195, 0.47215589652, 220.4126424388],
        [0.00186261486, 3.14159265359, 0],
        [0.00143891146, 1.40744822888, 7.1135470008]
      ],
      [
        [0.00436902572, 4.78671677509, 213.299095438]
      ]
    ]
  ],
  Uranus: [
    [
      [
        [5.48129294297, 0, 0],
        [0.09260408234, 0.89106421507, 74.7815985673],
        [0.01504247898, 3.6271926092, 1.4844727083],
        [0.00365981674, 1.89962179044, 73.297125859],
        [0.00272328168, 3.35823706307, 149.5631971346],
        [70328461e-11, 5.39254450063, 63.7358983034],
        [68892678e-11, 6.09292483287, 76.2660712756],
        [61998615e-11, 2.26952066061, 2.9689454166],
        [61950719e-11, 2.85098872691, 11.0457002639],
        [2646877e-10, 3.14152083966, 71.8126531507],
        [25710476e-11, 6.11379840493, 454.9093665273],
        [2107885e-10, 4.36059339067, 148.0787244263],
        [17818647e-11, 1.74436930289, 36.6485629295],
        [14613507e-11, 4.73732166022, 3.9321532631],
        [11162509e-11, 5.8268179635, 224.3447957019],
        [1099791e-10, 0.48865004018, 138.5174968707],
        [9527478e-11, 2.95516862826, 35.1640902212],
        [7545601e-11, 5.236265824, 109.9456887885],
        [4220241e-11, 3.23328220918, 70.8494453042],
        [40519e-9, 2.277550173, 151.0476698429],
        [3354596e-11, 1.0654900738, 4.4534181249],
        [2926718e-11, 4.62903718891, 9.5612275556],
        [349034e-10, 5.48306144511, 146.594251718],
        [3144069e-11, 4.75199570434, 77.7505439839],
        [2922333e-11, 5.35235361027, 85.8272988312],
        [2272788e-11, 4.36600400036, 70.3281804424],
        [2051219e-11, 1.51773566586, 0.1118745846],
        [2148602e-11, 0.60745949945, 38.1330356378],
        [1991643e-11, 4.92437588682, 277.0349937414],
        [1376226e-11, 2.04283539351, 65.2203710117],
        [1666902e-11, 3.62744066769, 380.12776796],
        [1284107e-11, 3.11347961505, 202.2533951741],
        [1150429e-11, 0.93343589092, 3.1813937377],
        [1533221e-11, 2.58594681212, 52.6901980395],
        [1281604e-11, 0.54271272721, 222.8603229936],
        [1372139e-11, 4.19641530878, 111.4301614968],
        [1221029e-11, 0.1990065003, 108.4612160802],
        [946181e-11, 1.19253165736, 127.4717966068],
        [1150989e-11, 4.17898916639, 33.6796175129]
      ],
      [
        [74.7815986091, 0, 0],
        [0.00154332863, 5.24158770553, 74.7815985673],
        [24456474e-11, 1.71260334156, 1.4844727083],
        [9258442e-11, 0.4282973235, 11.0457002639],
        [8265977e-11, 1.50218091379, 63.7358983034],
        [915016e-10, 1.41213765216, 149.5631971346]
      ]
    ],
    [
      [
        [0.01346277648, 2.61877810547, 74.7815985673],
        [623414e-9, 5.08111189648, 149.5631971346],
        [61601196e-11, 3.14159265359, 0],
        [9963722e-11, 1.61603805646, 76.2660712756],
        [992616e-10, 0.57630380333, 73.297125859]
      ],
      [
        [34101978e-11, 0.01321929936, 74.7815985673]
      ]
    ],
    [
      [
        [19.21264847206, 0, 0],
        [0.88784984413, 5.60377527014, 74.7815985673],
        [0.03440836062, 0.32836099706, 73.297125859],
        [0.0205565386, 1.7829515933, 149.5631971346],
        [0.0064932241, 4.52247285911, 76.2660712756],
        [0.00602247865, 3.86003823674, 63.7358983034],
        [0.00496404167, 1.40139935333, 454.9093665273],
        [0.00338525369, 1.58002770318, 138.5174968707],
        [0.00243509114, 1.57086606044, 71.8126531507],
        [0.00190522303, 1.99809394714, 1.4844727083],
        [0.00161858838, 2.79137786799, 148.0787244263],
        [0.00143706183, 1.38368544947, 11.0457002639],
        [93192405e-11, 0.17437220467, 36.6485629295],
        [71424548e-11, 4.24509236074, 224.3447957019],
        [89806014e-11, 3.66105364565, 109.9456887885],
        [39009723e-11, 1.66971401684, 70.8494453042],
        [46677296e-11, 1.39976401694, 35.1640902212],
        [39025624e-11, 3.36234773834, 277.0349937414],
        [36755274e-11, 3.88649278513, 146.594251718],
        [30348723e-11, 0.70100838798, 151.0476698429],
        [29156413e-11, 3.180563367, 77.7505439839],
        [22637073e-11, 0.72518687029, 529.6909650946],
        [11959076e-11, 1.7504339214, 984.6003316219],
        [25620756e-11, 5.25656086672, 380.12776796]
      ],
      [
        [0.01479896629, 3.67205697578, 74.7815985673]
      ]
    ]
  ],
  Neptune: [
    [
      [
        [5.31188633046, 0, 0],
        [0.0179847553, 2.9010127389, 38.1330356378],
        [0.01019727652, 0.48580922867, 1.4844727083],
        [0.00124531845, 4.83008090676, 36.6485629295],
        [42064466e-11, 5.41054993053, 2.9689454166],
        [37714584e-11, 6.09221808686, 35.1640902212],
        [33784738e-11, 1.24488874087, 76.2660712756],
        [16482741e-11, 7727998e-11, 491.5579294568],
        [9198584e-11, 4.93747051954, 39.6175083461],
        [899425e-10, 0.27462171806, 175.1660598002]
      ],
      [
        [38.13303563957, 0, 0],
        [16604172e-11, 4.86323329249, 1.4844727083],
        [15744045e-11, 2.27887427527, 38.1330356378]
      ]
    ],
    [
      [
        [0.03088622933, 1.44104372644, 38.1330356378],
        [27780087e-11, 5.91271884599, 76.2660712756],
        [27623609e-11, 0, 0],
        [15355489e-11, 2.52123799551, 36.6485629295],
        [15448133e-11, 3.50877079215, 39.6175083461]
      ]
    ],
    [
      [
        [30.07013205828, 0, 0],
        [0.27062259632, 1.32999459377, 38.1330356378],
        [0.01691764014, 3.25186135653, 36.6485629295],
        [0.00807830553, 5.18592878704, 1.4844727083],
        [0.0053776051, 4.52113935896, 35.1640902212],
        [0.00495725141, 1.5710564165, 491.5579294568],
        [0.00274571975, 1.84552258866, 175.1660598002],
        [1201232e-10, 1.92059384991, 1021.2488945514],
        [0.00121801746, 5.79754470298, 76.2660712756],
        [0.00100896068, 0.3770272493, 73.297125859],
        [0.00135134092, 3.37220609835, 39.6175083461],
        [7571796e-11, 1.07149207335, 388.4651552382]
      ]
    ]
  ]
};
function DeltaT_EspenakMeeus(ut) {
  var u, u2, u3, u4, u5, u6, u7;
  const y = 2e3 + (ut - 14) / DAYS_PER_TROPICAL_YEAR;
  if (y < -500) {
    u = (y - 1820) / 100;
    return -20 + 32 * u * u;
  }
  if (y < 500) {
    u = y / 100;
    u2 = u * u;
    u3 = u * u2;
    u4 = u2 * u2;
    u5 = u2 * u3;
    u6 = u3 * u3;
    return 10583.6 - 1014.41 * u + 33.78311 * u2 - 5.952053 * u3 - 0.1798452 * u4 + 0.022174192 * u5 + 0.0090316521 * u6;
  }
  if (y < 1600) {
    u = (y - 1e3) / 100;
    u2 = u * u;
    u3 = u * u2;
    u4 = u2 * u2;
    u5 = u2 * u3;
    u6 = u3 * u3;
    return 1574.2 - 556.01 * u + 71.23472 * u2 + 0.319781 * u3 - 0.8503463 * u4 - 5050998e-9 * u5 + 0.0083572073 * u6;
  }
  if (y < 1700) {
    u = y - 1600;
    u2 = u * u;
    u3 = u * u2;
    return 120 - 0.9808 * u - 0.01532 * u2 + u3 / 7129;
  }
  if (y < 1800) {
    u = y - 1700;
    u2 = u * u;
    u3 = u * u2;
    u4 = u2 * u2;
    return 8.83 + 0.1603 * u - 59285e-7 * u2 + 13336e-8 * u3 - u4 / 1174e3;
  }
  if (y < 1860) {
    u = y - 1800;
    u2 = u * u;
    u3 = u * u2;
    u4 = u2 * u2;
    u5 = u2 * u3;
    u6 = u3 * u3;
    u7 = u3 * u4;
    return 13.72 - 0.332447 * u + 68612e-7 * u2 + 41116e-7 * u3 - 37436e-8 * u4 + 121272e-10 * u5 - 1699e-10 * u6 + 875e-12 * u7;
  }
  if (y < 1900) {
    u = y - 1860;
    u2 = u * u;
    u3 = u * u2;
    u4 = u2 * u2;
    u5 = u2 * u3;
    return 7.62 + 0.5737 * u - 0.251754 * u2 + 0.01680668 * u3 - 4473624e-10 * u4 + u5 / 233174;
  }
  if (y < 1920) {
    u = y - 1900;
    u2 = u * u;
    u3 = u * u2;
    u4 = u2 * u2;
    return -2.79 + 1.494119 * u - 0.0598939 * u2 + 61966e-7 * u3 - 197e-6 * u4;
  }
  if (y < 1941) {
    u = y - 1920;
    u2 = u * u;
    u3 = u * u2;
    return 21.2 + 0.84493 * u - 0.0761 * u2 + 20936e-7 * u3;
  }
  if (y < 1961) {
    u = y - 1950;
    u2 = u * u;
    u3 = u * u2;
    return 29.07 + 0.407 * u - u2 / 233 + u3 / 2547;
  }
  if (y < 1986) {
    u = y - 1975;
    u2 = u * u;
    u3 = u * u2;
    return 45.45 + 1.067 * u - u2 / 260 - u3 / 718;
  }
  if (y < 2005) {
    u = y - 2e3;
    u2 = u * u;
    u3 = u * u2;
    u4 = u2 * u2;
    u5 = u2 * u3;
    return 63.86 + 0.3345 * u - 0.060374 * u2 + 17275e-7 * u3 + 651814e-9 * u4 + 2373599e-11 * u5;
  }
  if (y < 2050) {
    u = y - 2e3;
    return 62.92 + 0.32217 * u + 5589e-6 * u * u;
  }
  if (y < 2150) {
    u = (y - 1820) / 100;
    return -20 + 32 * u * u - 0.5628 * (2150 - y);
  }
  u = (y - 1820) / 100;
  return -20 + 32 * u * u;
}
var DeltaT = DeltaT_EspenakMeeus;
function TerrestrialTime(ut) {
  return ut + DeltaT(ut) / 86400;
}
var AstroTime = class _AstroTime {
  /**
   * @param {FlexibleDateTime} date
   *      A JavaScript Date object, a numeric UTC value expressed in J2000 days, or another AstroTime object.
   */
  constructor(date) {
    if (date instanceof _AstroTime) {
      this.date = date.date;
      this.ut = date.ut;
      this.tt = date.tt;
      return;
    }
    const MillisPerDay = 1e3 * 3600 * 24;
    if (date instanceof Date && Number.isFinite(date.getTime())) {
      this.date = date;
      this.ut = (date.getTime() - J2000.getTime()) / MillisPerDay;
      this.tt = TerrestrialTime(this.ut);
      return;
    }
    if (Number.isFinite(date)) {
      this.date = new Date(J2000.getTime() + date * MillisPerDay);
      this.ut = date;
      this.tt = TerrestrialTime(this.ut);
      return;
    }
    throw "Argument must be a Date object, an AstroTime object, or a numeric UTC Julian date.";
  }
  /**
   * @brief Creates an `AstroTime` value from a Terrestrial Time (TT) day value.
   *
   * This function can be used in rare cases where a time must be based
   * on Terrestrial Time (TT) rather than Universal Time (UT).
   * Most developers will want to invoke `new AstroTime(ut)` with a universal time
   * instead of this function, because usually time is based on civil time adjusted
   * by leap seconds to match the Earth's rotation, rather than the uniformly
   * flowing TT used to calculate solar system dynamics. In rare cases
   * where the caller already knows TT, this function is provided to create
   * an `AstroTime` value that can be passed to Astronomy Engine functions.
   *
   * @param {number} tt
   *      The number of days since the J2000 epoch as expressed in Terrestrial Time.
   *
   * @returns {AstroTime}
   *      An `AstroTime` object for the specified terrestrial time.
   */
  static FromTerrestrialTime(tt) {
    let time = new _AstroTime(tt);
    for (; ; ) {
      const err = tt - time.tt;
      if (Math.abs(err) < 1e-12)
        return time;
      time = time.AddDays(err);
    }
  }
  /**
   * Formats an `AstroTime` object as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
   * date/time string in UTC, to millisecond resolution.
   * Example: `2018-08-17T17:22:04.050Z`
   * @returns {string}
   */
  toString() {
    return this.date.toISOString();
  }
  /**
   * Returns a new `AstroTime` object adjusted by the floating point number of days.
   * Does NOT modify the original `AstroTime` object.
   *
   * @param {number} days
   *      The floating point number of days by which to adjust the given date and time.
   *      Positive values adjust the date toward the future, and
   *      negative values adjust the date toward the past.
   *
   * @returns {AstroTime}
   */
  AddDays(days) {
    return new _AstroTime(this.ut + days);
  }
};
function MakeTime(date) {
  if (date instanceof AstroTime) {
    return date;
  }
  return new AstroTime(date);
}
function iau2000b(time) {
  function mod(x) {
    return x % ASEC360 * ASEC2RAD;
  }
  const t = time.tt / 36525;
  const elp = mod(128710479305e-5 + t * 1295965810481e-4);
  const f = mod(335779.526232 + t * 17395272628478e-4);
  const d = mod(107226070369e-5 + t * 1602961601209e-3);
  const om = mod(450160.398036 - t * 69628905431e-4);
  let sarg = Math.sin(om);
  let carg = Math.cos(om);
  let dp = (-172064161 - 174666 * t) * sarg + 33386 * carg;
  let de = (92052331 + 9086 * t) * carg + 15377 * sarg;
  let arg = 2 * (f - d + om);
  sarg = Math.sin(arg);
  carg = Math.cos(arg);
  dp += (-13170906 - 1675 * t) * sarg - 13696 * carg;
  de += (5730336 - 3015 * t) * carg - 4587 * sarg;
  arg = 2 * (f + om);
  sarg = Math.sin(arg);
  carg = Math.cos(arg);
  dp += (-2276413 - 234 * t) * sarg + 2796 * carg;
  de += (978459 - 485 * t) * carg + 1374 * sarg;
  arg = 2 * om;
  sarg = Math.sin(arg);
  carg = Math.cos(arg);
  dp += (2074554 + 207 * t) * sarg - 698 * carg;
  de += (-897492 + 470 * t) * carg - 291 * sarg;
  sarg = Math.sin(elp);
  carg = Math.cos(elp);
  dp += (1475877 - 3633 * t) * sarg + 11817 * carg;
  de += (73871 - 184 * t) * carg - 1924 * sarg;
  return {
    dpsi: -135e-6 + dp * 1e-7,
    deps: 388e-6 + de * 1e-7
  };
}
function mean_obliq(time) {
  var t = time.tt / 36525;
  var asec = ((((-434e-10 * t - 576e-9) * t + 20034e-7) * t - 1831e-7) * t - 46.836769) * t + 84381.406;
  return asec / 3600;
}
var cache_e_tilt;
function e_tilt(time) {
  if (!cache_e_tilt || Math.abs(cache_e_tilt.tt - time.tt) > 1e-6) {
    const nut = iau2000b(time);
    const mean_ob = mean_obliq(time);
    const true_ob = mean_ob + nut.deps / 3600;
    cache_e_tilt = {
      tt: time.tt,
      dpsi: nut.dpsi,
      deps: nut.deps,
      ee: nut.dpsi * Math.cos(mean_ob * DEG2RAD) / 15,
      mobl: mean_ob,
      tobl: true_ob
    };
  }
  return cache_e_tilt;
}
function obl_ecl2equ_vec(oblDegrees, pos) {
  const obl = oblDegrees * DEG2RAD;
  const cos_obl = Math.cos(obl);
  const sin_obl = Math.sin(obl);
  return [
    pos[0],
    pos[1] * cos_obl - pos[2] * sin_obl,
    pos[1] * sin_obl + pos[2] * cos_obl
  ];
}
function ecl2equ_vec(time, pos) {
  return obl_ecl2equ_vec(mean_obliq(time), pos);
}
var CalcMoonCount = 0;
function CalcMoon(time) {
  ++CalcMoonCount;
  const T = time.tt / 36525;
  function DeclareArray1(xmin, xmax) {
    const array = [];
    let i;
    for (i = 0; i <= xmax - xmin; ++i) {
      array.push(0);
    }
    return { min: xmin, array };
  }
  function DeclareArray2(xmin, xmax, ymin, ymax) {
    const array = [];
    for (let i = 0; i <= xmax - xmin; ++i) {
      array.push(DeclareArray1(ymin, ymax));
    }
    return { min: xmin, array };
  }
  function ArrayGet2(a, x, y) {
    const m = a.array[x - a.min];
    return m.array[y - m.min];
  }
  function ArraySet2(a, x, y, v) {
    const m = a.array[x - a.min];
    m.array[y - m.min] = v;
  }
  let S, MAX, ARG, FAC, I, J, T2, DGAM, DLAM, N, GAM1C, SINPI, L0, L2, LS, F, D, DL0, DL, DLS, DF, DD, DS;
  let coArray = DeclareArray2(-6, 6, 1, 4);
  let siArray = DeclareArray2(-6, 6, 1, 4);
  function CO(x, y) {
    return ArrayGet2(coArray, x, y);
  }
  function SI(x, y) {
    return ArrayGet2(siArray, x, y);
  }
  function SetCO(x, y, v) {
    return ArraySet2(coArray, x, y, v);
  }
  function SetSI(x, y, v) {
    return ArraySet2(siArray, x, y, v);
  }
  function AddThe(c1, s1, c2, s2, func) {
    func(c1 * c2 - s1 * s2, s1 * c2 + c1 * s2);
  }
  function Sine(phi) {
    return Math.sin(PI2 * phi);
  }
  T2 = T * T;
  DLAM = 0;
  DS = 0;
  GAM1C = 0;
  SINPI = 3422.7;
  var S1 = Sine(0.19833 + 0.05611 * T);
  var S2 = Sine(0.27869 + 0.04508 * T);
  var S3 = Sine(0.16827 - 0.36903 * T);
  var S4 = Sine(0.34734 - 5.37261 * T);
  var S5 = Sine(0.10498 - 5.37899 * T);
  var S6 = Sine(0.42681 - 0.41855 * T);
  var S7 = Sine(0.14943 - 5.37511 * T);
  DL0 = 0.84 * S1 + 0.31 * S2 + 14.27 * S3 + 7.26 * S4 + 0.28 * S5 + 0.24 * S6;
  DL = 2.94 * S1 + 0.31 * S2 + 14.27 * S3 + 9.34 * S4 + 1.12 * S5 + 0.83 * S6;
  DLS = -6.4 * S1 - 1.89 * S6;
  DF = 0.21 * S1 + 0.31 * S2 + 14.27 * S3 - 88.7 * S4 - 15.3 * S5 + 0.24 * S6 - 1.86 * S7;
  DD = DL0 - DLS;
  DGAM = -3332e-9 * Sine(0.59734 - 5.37261 * T) - 539e-9 * Sine(0.35498 - 5.37899 * T) - 64e-9 * Sine(0.39943 - 5.37511 * T);
  L0 = PI2 * Frac(0.60643382 + 1336.85522467 * T - 313e-8 * T2) + DL0 / ARC;
  L2 = PI2 * Frac(0.37489701 + 1325.55240982 * T + 2565e-8 * T2) + DL / ARC;
  LS = PI2 * Frac(0.99312619 + 99.99735956 * T - 44e-8 * T2) + DLS / ARC;
  F = PI2 * Frac(0.25909118 + 1342.2278298 * T - 892e-8 * T2) + DF / ARC;
  D = PI2 * Frac(0.82736186 + 1236.85308708 * T - 397e-8 * T2) + DD / ARC;
  for (I = 1; I <= 4; ++I) {
    switch (I) {
      case 1:
        ARG = L2;
        MAX = 4;
        FAC = 1.000002208;
        break;
      case 2:
        ARG = LS;
        MAX = 3;
        FAC = 0.997504612 - 2495388e-9 * T;
        break;
      case 3:
        ARG = F;
        MAX = 4;
        FAC = 1.000002708 + 139.978 * DGAM;
        break;
      case 4:
        ARG = D;
        MAX = 6;
        FAC = 1;
        break;
      default:
        throw `Internal error: I = ${I}`;
    }
    SetCO(0, I, 1);
    SetCO(1, I, Math.cos(ARG) * FAC);
    SetSI(0, I, 0);
    SetSI(1, I, Math.sin(ARG) * FAC);
    for (J = 2; J <= MAX; ++J) {
      AddThe(CO(J - 1, I), SI(J - 1, I), CO(1, I), SI(1, I), (c, s) => (SetCO(J, I, c), SetSI(J, I, s)));
    }
    for (J = 1; J <= MAX; ++J) {
      SetCO(-J, I, CO(J, I));
      SetSI(-J, I, -SI(J, I));
    }
  }
  function Term(p, q, r, s) {
    var result = { x: 1, y: 0 };
    var I2 = [0, p, q, r, s];
    for (var k = 1; k <= 4; ++k)
      if (I2[k] !== 0)
        AddThe(result.x, result.y, CO(I2[k], k), SI(I2[k], k), (c, s2) => (result.x = c, result.y = s2));
    return result;
  }
  function AddSol(coeffl, coeffs, coeffg, coeffp, p, q, r, s) {
    var result = Term(p, q, r, s);
    DLAM += coeffl * result.y;
    DS += coeffs * result.y;
    GAM1C += coeffg * result.x;
    SINPI += coeffp * result.x;
  }
  AddSol(13.902, 14.06, -1e-3, 0.2607, 0, 0, 0, 4);
  AddSol(0.403, -4.01, 0.394, 23e-4, 0, 0, 0, 3);
  AddSol(2369.912, 2373.36, 0.601, 28.2333, 0, 0, 0, 2);
  AddSol(-125.154, -112.79, -0.725, -0.9781, 0, 0, 0, 1);
  AddSol(1.979, 6.98, -0.445, 0.0433, 1, 0, 0, 4);
  AddSol(191.953, 192.72, 0.029, 3.0861, 1, 0, 0, 2);
  AddSol(-8.466, -13.51, 0.455, -0.1093, 1, 0, 0, 1);
  AddSol(22639.5, 22609.07, 0.079, 186.5398, 1, 0, 0, 0);
  AddSol(18.609, 3.59, -0.094, 0.0118, 1, 0, 0, -1);
  AddSol(-4586.465, -4578.13, -0.077, 34.3117, 1, 0, 0, -2);
  AddSol(3.215, 5.44, 0.192, -0.0386, 1, 0, 0, -3);
  AddSol(-38.428, -38.64, 1e-3, 0.6008, 1, 0, 0, -4);
  AddSol(-0.393, -1.43, -0.092, 86e-4, 1, 0, 0, -6);
  AddSol(-0.289, -1.59, 0.123, -53e-4, 0, 1, 0, 4);
  AddSol(-24.42, -25.1, 0.04, -0.3, 0, 1, 0, 2);
  AddSol(18.023, 17.93, 7e-3, 0.1494, 0, 1, 0, 1);
  AddSol(-668.146, -126.98, -1.302, -0.3997, 0, 1, 0, 0);
  AddSol(0.56, 0.32, -1e-3, -37e-4, 0, 1, 0, -1);
  AddSol(-165.145, -165.06, 0.054, 1.9178, 0, 1, 0, -2);
  AddSol(-1.877, -6.46, -0.416, 0.0339, 0, 1, 0, -4);
  AddSol(0.213, 1.02, -0.074, 54e-4, 2, 0, 0, 4);
  AddSol(14.387, 14.78, -0.017, 0.2833, 2, 0, 0, 2);
  AddSol(-0.586, -1.2, 0.054, -0.01, 2, 0, 0, 1);
  AddSol(769.016, 767.96, 0.107, 10.1657, 2, 0, 0, 0);
  AddSol(1.75, 2.01, -0.018, 0.0155, 2, 0, 0, -1);
  AddSol(-211.656, -152.53, 5.679, -0.3039, 2, 0, 0, -2);
  AddSol(1.225, 0.91, -0.03, -88e-4, 2, 0, 0, -3);
  AddSol(-30.773, -34.07, -0.308, 0.3722, 2, 0, 0, -4);
  AddSol(-0.57, -1.4, -0.074, 0.0109, 2, 0, 0, -6);
  AddSol(-2.921, -11.75, 0.787, -0.0484, 1, 1, 0, 2);
  AddSol(1.267, 1.52, -0.022, 0.0164, 1, 1, 0, 1);
  AddSol(-109.673, -115.18, 0.461, -0.949, 1, 1, 0, 0);
  AddSol(-205.962, -182.36, 2.056, 1.4437, 1, 1, 0, -2);
  AddSol(0.233, 0.36, 0.012, -25e-4, 1, 1, 0, -3);
  AddSol(-4.391, -9.66, -0.471, 0.0673, 1, 1, 0, -4);
  AddSol(0.283, 1.53, -0.111, 6e-3, 1, -1, 0, 4);
  AddSol(14.577, 31.7, -1.54, 0.2302, 1, -1, 0, 2);
  AddSol(147.687, 138.76, 0.679, 1.1528, 1, -1, 0, 0);
  AddSol(-1.089, 0.55, 0.021, 0, 1, -1, 0, -1);
  AddSol(28.475, 23.59, -0.443, -0.2257, 1, -1, 0, -2);
  AddSol(-0.276, -0.38, -6e-3, -36e-4, 1, -1, 0, -3);
  AddSol(0.636, 2.27, 0.146, -0.0102, 1, -1, 0, -4);
  AddSol(-0.189, -1.68, 0.131, -28e-4, 0, 2, 0, 2);
  AddSol(-7.486, -0.66, -0.037, -86e-4, 0, 2, 0, 0);
  AddSol(-8.096, -16.35, -0.74, 0.0918, 0, 2, 0, -2);
  AddSol(-5.741, -0.04, 0, -9e-4, 0, 0, 2, 2);
  AddSol(0.255, 0, 0, 0, 0, 0, 2, 1);
  AddSol(-411.608, -0.2, 0, -0.0124, 0, 0, 2, 0);
  AddSol(0.584, 0.84, 0, 71e-4, 0, 0, 2, -1);
  AddSol(-55.173, -52.14, 0, -0.1052, 0, 0, 2, -2);
  AddSol(0.254, 0.25, 0, -17e-4, 0, 0, 2, -3);
  AddSol(0.025, -1.67, 0, 31e-4, 0, 0, 2, -4);
  AddSol(1.06, 2.96, -0.166, 0.0243, 3, 0, 0, 2);
  AddSol(36.124, 50.64, -1.3, 0.6215, 3, 0, 0, 0);
  AddSol(-13.193, -16.4, 0.258, -0.1187, 3, 0, 0, -2);
  AddSol(-1.187, -0.74, 0.042, 74e-4, 3, 0, 0, -4);
  AddSol(-0.293, -0.31, -2e-3, 46e-4, 3, 0, 0, -6);
  AddSol(-0.29, -1.45, 0.116, -51e-4, 2, 1, 0, 2);
  AddSol(-7.649, -10.56, 0.259, -0.1038, 2, 1, 0, 0);
  AddSol(-8.627, -7.59, 0.078, -0.0192, 2, 1, 0, -2);
  AddSol(-2.74, -2.54, 0.022, 0.0324, 2, 1, 0, -4);
  AddSol(1.181, 3.32, -0.212, 0.0213, 2, -1, 0, 2);
  AddSol(9.703, 11.67, -0.151, 0.1268, 2, -1, 0, 0);
  AddSol(-0.352, -0.37, 1e-3, -28e-4, 2, -1, 0, -1);
  AddSol(-2.494, -1.17, -3e-3, -17e-4, 2, -1, 0, -2);
  AddSol(0.36, 0.2, -0.012, -43e-4, 2, -1, 0, -4);
  AddSol(-1.167, -1.25, 8e-3, -0.0106, 1, 2, 0, 0);
  AddSol(-7.412, -6.12, 0.117, 0.0484, 1, 2, 0, -2);
  AddSol(-0.311, -0.65, -0.032, 44e-4, 1, 2, 0, -4);
  AddSol(0.757, 1.82, -0.105, 0.0112, 1, -2, 0, 2);
  AddSol(2.58, 2.32, 0.027, 0.0196, 1, -2, 0, 0);
  AddSol(2.533, 2.4, -0.014, -0.0212, 1, -2, 0, -2);
  AddSol(-0.344, -0.57, -0.025, 36e-4, 0, 3, 0, -2);
  AddSol(-0.992, -0.02, 0, 0, 1, 0, 2, 2);
  AddSol(-45.099, -0.02, 0, -1e-3, 1, 0, 2, 0);
  AddSol(-0.179, -9.52, 0, -0.0833, 1, 0, 2, -2);
  AddSol(-0.301, -0.33, 0, 14e-4, 1, 0, 2, -4);
  AddSol(-6.382, -3.37, 0, -0.0481, 1, 0, -2, 2);
  AddSol(39.528, 85.13, 0, -0.7136, 1, 0, -2, 0);
  AddSol(9.366, 0.71, 0, -0.0112, 1, 0, -2, -2);
  AddSol(0.202, 0.02, 0, 0, 1, 0, -2, -4);
  AddSol(0.415, 0.1, 0, 13e-4, 0, 1, 2, 0);
  AddSol(-2.152, -2.26, 0, -66e-4, 0, 1, 2, -2);
  AddSol(-1.44, -1.3, 0, 14e-4, 0, 1, -2, 2);
  AddSol(0.384, -0.04, 0, 0, 0, 1, -2, -2);
  AddSol(1.938, 3.6, -0.145, 0.0401, 4, 0, 0, 0);
  AddSol(-0.952, -1.58, 0.052, -0.013, 4, 0, 0, -2);
  AddSol(-0.551, -0.94, 0.032, -97e-4, 3, 1, 0, 0);
  AddSol(-0.482, -0.57, 5e-3, -45e-4, 3, 1, 0, -2);
  AddSol(0.681, 0.96, -0.026, 0.0115, 3, -1, 0, 0);
  AddSol(-0.297, -0.27, 2e-3, -9e-4, 2, 2, 0, -2);
  AddSol(0.254, 0.21, -3e-3, 0, 2, -2, 0, -2);
  AddSol(-0.25, -0.22, 4e-3, 14e-4, 1, 3, 0, -2);
  AddSol(-3.996, 0, 0, 4e-4, 2, 0, 2, 0);
  AddSol(0.557, -0.75, 0, -9e-3, 2, 0, 2, -2);
  AddSol(-0.459, -0.38, 0, -53e-4, 2, 0, -2, 2);
  AddSol(-1.298, 0.74, 0, 4e-4, 2, 0, -2, 0);
  AddSol(0.538, 1.14, 0, -0.0141, 2, 0, -2, -2);
  AddSol(0.263, 0.02, 0, 0, 1, 1, 2, 0);
  AddSol(0.426, 0.07, 0, -6e-4, 1, 1, -2, -2);
  AddSol(-0.304, 0.03, 0, 3e-4, 1, -1, 2, 0);
  AddSol(-0.372, -0.19, 0, -27e-4, 1, -1, -2, 2);
  AddSol(0.418, 0, 0, 0, 0, 0, 4, 0);
  AddSol(-0.33, -0.04, 0, 0, 3, 0, 2, 0);
  function ADDN(coeffn, p, q, r, s) {
    return coeffn * Term(p, q, r, s).y;
  }
  N = 0;
  N += ADDN(-526.069, 0, 0, 1, -2);
  N += ADDN(-3.352, 0, 0, 1, -4);
  N += ADDN(44.297, 1, 0, 1, -2);
  N += ADDN(-6, 1, 0, 1, -4);
  N += ADDN(20.599, -1, 0, 1, 0);
  N += ADDN(-30.598, -1, 0, 1, -2);
  N += ADDN(-24.649, -2, 0, 1, 0);
  N += ADDN(-2, -2, 0, 1, -2);
  N += ADDN(-22.571, 0, 1, 1, -2);
  N += ADDN(10.985, 0, -1, 1, -2);
  DLAM += 0.82 * Sine(0.7736 - 62.5512 * T) + 0.31 * Sine(0.0466 - 125.1025 * T) + 0.35 * Sine(0.5785 - 25.1042 * T) + 0.66 * Sine(0.4591 + 1335.8075 * T) + 0.64 * Sine(0.313 - 91.568 * T) + 1.14 * Sine(0.148 + 1331.2898 * T) + 0.21 * Sine(0.5918 + 1056.5859 * T) + 0.44 * Sine(0.5784 + 1322.8595 * T) + 0.24 * Sine(0.2275 - 5.7374 * T) + 0.28 * Sine(0.2965 + 2.6929 * T) + 0.33 * Sine(0.3132 + 6.3368 * T);
  S = F + DS / ARC;
  let lat_seconds = (1.000002708 + 139.978 * DGAM) * (18518.511 + 1.189 + GAM1C) * Math.sin(S) - 6.24 * Math.sin(3 * S) + N;
  return {
    geo_eclip_lon: PI2 * Frac((L0 + DLAM / ARC) / PI2),
    geo_eclip_lat: Math.PI / (180 * 3600) * lat_seconds,
    distance_au: ARC * EARTH_EQUATORIAL_RADIUS_AU / (0.999953253 * SINPI)
  };
}
function rotate(rot, vec) {
  return [
    rot.rot[0][0] * vec[0] + rot.rot[1][0] * vec[1] + rot.rot[2][0] * vec[2],
    rot.rot[0][1] * vec[0] + rot.rot[1][1] * vec[1] + rot.rot[2][1] * vec[2],
    rot.rot[0][2] * vec[0] + rot.rot[1][2] * vec[1] + rot.rot[2][2] * vec[2]
  ];
}
function precession(pos, time, dir) {
  const r = precession_rot(time, dir);
  return rotate(r, pos);
}
function precession_rot(time, dir) {
  const t = time.tt / 36525;
  let eps0 = 84381.406;
  let psia = ((((-951e-10 * t + 132851e-9) * t - 114045e-8) * t - 1.0790069) * t + 5038.481507) * t;
  let omegaa = ((((3337e-10 * t - 467e-9) * t - 772503e-8) * t + 0.0512623) * t - 0.025754) * t + eps0;
  let chia = ((((-56e-9 * t + 170663e-9) * t - 121197e-8) * t - 2.3814292) * t + 10.556403) * t;
  eps0 *= ASEC2RAD;
  psia *= ASEC2RAD;
  omegaa *= ASEC2RAD;
  chia *= ASEC2RAD;
  const sa = Math.sin(eps0);
  const ca = Math.cos(eps0);
  const sb = Math.sin(-psia);
  const cb = Math.cos(-psia);
  const sc = Math.sin(-omegaa);
  const cc = Math.cos(-omegaa);
  const sd = Math.sin(chia);
  const cd = Math.cos(chia);
  const xx = cd * cb - sb * sd * cc;
  const yx = cd * sb * ca + sd * cc * cb * ca - sa * sd * sc;
  const zx = cd * sb * sa + sd * cc * cb * sa + ca * sd * sc;
  const xy = -sd * cb - sb * cd * cc;
  const yy = -sd * sb * ca + cd * cc * cb * ca - sa * cd * sc;
  const zy = -sd * sb * sa + cd * cc * cb * sa + ca * cd * sc;
  const xz = sb * sc;
  const yz = -sc * cb * ca - sa * cc;
  const zz = -sc * cb * sa + cc * ca;
  if (dir === PrecessDirection.Into2000) {
    return new RotationMatrix([
      [xx, yx, zx],
      [xy, yy, zy],
      [xz, yz, zz]
    ]);
  }
  if (dir === PrecessDirection.From2000) {
    return new RotationMatrix([
      [xx, xy, xz],
      [yx, yy, yz],
      [zx, zy, zz]
    ]);
  }
  throw "Invalid precess direction";
}
function nutation(pos, time, dir) {
  const r = nutation_rot(time, dir);
  return rotate(r, pos);
}
function nutation_rot(time, dir) {
  const tilt = e_tilt(time);
  const oblm = tilt.mobl * DEG2RAD;
  const oblt = tilt.tobl * DEG2RAD;
  const psi = tilt.dpsi * ASEC2RAD;
  const cobm = Math.cos(oblm);
  const sobm = Math.sin(oblm);
  const cobt = Math.cos(oblt);
  const sobt = Math.sin(oblt);
  const cpsi = Math.cos(psi);
  const spsi = Math.sin(psi);
  const xx = cpsi;
  const yx = -spsi * cobm;
  const zx = -spsi * sobm;
  const xy = spsi * cobt;
  const yy = cpsi * cobm * cobt + sobm * sobt;
  const zy = cpsi * sobm * cobt - cobm * sobt;
  const xz = spsi * sobt;
  const yz = cpsi * cobm * sobt - sobm * cobt;
  const zz = cpsi * sobm * sobt + cobm * cobt;
  if (dir === PrecessDirection.From2000) {
    return new RotationMatrix([
      [xx, xy, xz],
      [yx, yy, yz],
      [zx, zy, zz]
    ]);
  }
  if (dir === PrecessDirection.Into2000) {
    return new RotationMatrix([
      [xx, yx, zx],
      [xy, yy, zy],
      [xz, yz, zz]
    ]);
  }
  throw "Invalid precess direction";
}
var Vector = class {
  constructor(x, y, z, t) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.t = t;
  }
  /**
   * Returns the length of the vector in astronomical units (AU).
   * @returns {number}
   */
  Length() {
    return Math.hypot(this.x, this.y, this.z);
  }
};
var StateVector = class {
  constructor(x, y, z, vx, vy, vz, t) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
    this.t = t;
  }
};
var Spherical = class {
  constructor(lat, lon, dist) {
    this.lat = VerifyNumber(lat);
    this.lon = VerifyNumber(lon);
    this.dist = VerifyNumber(dist);
  }
};
var RotationMatrix = class {
  constructor(rot) {
    this.rot = rot;
  }
};
var EclipticCoordinates = class {
  constructor(vec, elat, elon) {
    this.vec = vec;
    this.elat = VerifyNumber(elat);
    this.elon = VerifyNumber(elon);
  }
};
function RotateEquatorialToEcliptic(equ, cos_ob, sin_ob) {
  const ex = equ.x;
  const ey = equ.y * cos_ob + equ.z * sin_ob;
  const ez = -equ.y * sin_ob + equ.z * cos_ob;
  const xyproj = Math.hypot(ex, ey);
  let elon = 0;
  if (xyproj > 0) {
    elon = RAD2DEG * Math.atan2(ey, ex);
    if (elon < 0)
      elon += 360;
  }
  let elat = RAD2DEG * Math.atan2(ez, xyproj);
  let ecl = new Vector(ex, ey, ez, equ.t);
  return new EclipticCoordinates(ecl, elat, elon);
}
function Ecliptic(eqj) {
  const et = e_tilt(eqj.t);
  const eqj_pos = [eqj.x, eqj.y, eqj.z];
  const mean_pos = precession(eqj_pos, eqj.t, PrecessDirection.From2000);
  const [x, y, z] = nutation(mean_pos, eqj.t, PrecessDirection.From2000);
  const eqd = new Vector(x, y, z, eqj.t);
  const tobl = et.tobl * DEG2RAD;
  return RotateEquatorialToEcliptic(eqd, Math.cos(tobl), Math.sin(tobl));
}
function GeoMoon(date) {
  const time = MakeTime(date);
  const moon = CalcMoon(time);
  const dist_cos_lat = moon.distance_au * Math.cos(moon.geo_eclip_lat);
  const gepos = [
    dist_cos_lat * Math.cos(moon.geo_eclip_lon),
    dist_cos_lat * Math.sin(moon.geo_eclip_lon),
    moon.distance_au * Math.sin(moon.geo_eclip_lat)
  ];
  const mpos1 = ecl2equ_vec(time, gepos);
  const mpos2 = precession(mpos1, time, PrecessDirection.Into2000);
  return new Vector(mpos2[0], mpos2[1], mpos2[2], time);
}
function GeoMoonState(date) {
  const time = MakeTime(date);
  const dt = 1e-5;
  const t1 = time.AddDays(-dt);
  const t2 = time.AddDays(+dt);
  const r1 = GeoMoon(t1);
  const r2 = GeoMoon(t2);
  return new StateVector((r1.x + r2.x) / 2, (r1.y + r2.y) / 2, (r1.z + r2.z) / 2, (r2.x - r1.x) / (2 * dt), (r2.y - r1.y) / (2 * dt), (r2.z - r1.z) / (2 * dt), time);
}
function GeoEmbState(date) {
  const time = MakeTime(date);
  const s = GeoMoonState(time);
  const d = 1 + EARTH_MOON_MASS_RATIO;
  return new StateVector(s.x / d, s.y / d, s.z / d, s.vx / d, s.vy / d, s.vz / d, time);
}
function VsopFormula(formula, t, clamp_angle) {
  let tpower = 1;
  let coord = 0;
  for (let series of formula) {
    let sum = 0;
    for (let [ampl, phas, freq] of series)
      sum += ampl * Math.cos(phas + t * freq);
    let incr = tpower * sum;
    if (clamp_angle)
      incr %= PI2;
    coord += incr;
    tpower *= t;
  }
  return coord;
}
function VsopDeriv(formula, t) {
  let tpower = 1;
  let dpower = 0;
  let deriv = 0;
  let s = 0;
  for (let series of formula) {
    let sin_sum = 0;
    let cos_sum = 0;
    for (let [ampl, phas, freq] of series) {
      let angle = phas + t * freq;
      sin_sum += ampl * freq * Math.sin(angle);
      if (s > 0)
        cos_sum += ampl * Math.cos(angle);
    }
    deriv += s * dpower * cos_sum - tpower * sin_sum;
    dpower = tpower;
    tpower *= t;
    ++s;
  }
  return deriv;
}
var DAYS_PER_MILLENNIUM = 365250;
var LON_INDEX = 0;
var LAT_INDEX = 1;
var RAD_INDEX = 2;
function VsopRotate(eclip) {
  return new TerseVector(eclip[0] + 44036e-11 * eclip[1] - 190919e-12 * eclip[2], -479966e-12 * eclip[0] + 0.917482137087 * eclip[1] - 0.397776982902 * eclip[2], 0.397776982902 * eclip[1] + 0.917482137087 * eclip[2]);
}
function VsopSphereToRect(lon, lat, radius) {
  const r_coslat = radius * Math.cos(lat);
  const coslon = Math.cos(lon);
  const sinlon = Math.sin(lon);
  return [
    r_coslat * coslon,
    r_coslat * sinlon,
    radius * Math.sin(lat)
  ];
}
function CalcVsop(model, time) {
  const t = time.tt / DAYS_PER_MILLENNIUM;
  const lon = VsopFormula(model[LON_INDEX], t, true);
  const lat = VsopFormula(model[LAT_INDEX], t, false);
  const rad = VsopFormula(model[RAD_INDEX], t, false);
  const eclip = VsopSphereToRect(lon, lat, rad);
  return VsopRotate(eclip).ToAstroVector(time);
}
function CalcVsopPosVel(model, tt) {
  const t = tt / DAYS_PER_MILLENNIUM;
  const lon = VsopFormula(model[LON_INDEX], t, true);
  const lat = VsopFormula(model[LAT_INDEX], t, false);
  const rad = VsopFormula(model[RAD_INDEX], t, false);
  const dlon_dt = VsopDeriv(model[LON_INDEX], t);
  const dlat_dt = VsopDeriv(model[LAT_INDEX], t);
  const drad_dt = VsopDeriv(model[RAD_INDEX], t);
  const coslon = Math.cos(lon);
  const sinlon = Math.sin(lon);
  const coslat = Math.cos(lat);
  const sinlat = Math.sin(lat);
  const vx = +(drad_dt * coslat * coslon) - rad * sinlat * coslon * dlat_dt - rad * coslat * sinlon * dlon_dt;
  const vy = +(drad_dt * coslat * sinlon) - rad * sinlat * sinlon * dlat_dt + rad * coslat * coslon * dlon_dt;
  const vz = +(drad_dt * sinlat) + rad * coslat * dlat_dt;
  const eclip_pos = VsopSphereToRect(lon, lat, rad);
  const eclip_vel = [
    vx / DAYS_PER_MILLENNIUM,
    vy / DAYS_PER_MILLENNIUM,
    vz / DAYS_PER_MILLENNIUM
  ];
  const equ_pos = VsopRotate(eclip_pos);
  const equ_vel = VsopRotate(eclip_vel);
  return new body_state_t(tt, equ_pos, equ_vel);
}
function AdjustBarycenter(ssb, time, body, pmass) {
  const shift = pmass / (pmass + SUN_GM);
  const planet = CalcVsop(vsop[body], time);
  ssb.x += shift * planet.x;
  ssb.y += shift * planet.y;
  ssb.z += shift * planet.z;
}
function CalcSolarSystemBarycenter(time) {
  const ssb = new Vector(0, 0, 0, time);
  AdjustBarycenter(ssb, time, Body.Jupiter, JUPITER_GM);
  AdjustBarycenter(ssb, time, Body.Saturn, SATURN_GM);
  AdjustBarycenter(ssb, time, Body.Uranus, URANUS_GM);
  AdjustBarycenter(ssb, time, Body.Neptune, NEPTUNE_GM);
  return ssb;
}
var PLUTO_NUM_STATES = 51;
var PLUTO_TIME_STEP = 29200;
var PLUTO_DT = 146;
var PLUTO_NSTEPS = 201;
var PlutoStateTable = [
  [-73e4, [-26.118207232108, -14.376168177825, 3.384402515299], [0.0016339372163656, -0.0027861699588508, -0.0013585880229445]],
  [-700800, [41.974905202127, -0.448502952929, -12.770351505989], [73458569351457e-17, 0.0022785014891658, 48619778602049e-17]],
  [-671600, [14.706930780744, 44.269110540027, 9.353698474772], [-0.00210001479998, 22295915939915e-17, 70143443551414e-17]],
  [-642400, [-29.441003929957, -6.43016153057, 6.858481011305], [84495803960544e-17, -0.0030783914758711, -0.0012106305981192]],
  [-613200, [39.444396946234, -6.557989760571, -13.913760296463], [0.0011480029005873, 0.0022400006880665, 35168075922288e-17]],
  [-584e3, [20.2303809507, 43.266966657189, 7.382966091923], [-0.0019754081700585, 53457141292226e-17, 75929169129793e-17]],
  [-554800, [-30.65832536462, 2.093818874552, 9.880531138071], [61010603013347e-18, -0.0031326500935382, -99346125151067e-17]],
  [-525600, [35.737703251673, -12.587706024764, -14.677847247563], [0.0015802939375649, 0.0021347678412429, 19074436384343e-17]],
  [-496400, [25.466295188546, 41.367478338417, 5.216476873382], [-0.0018054401046468, 8328308359951e-16, 80260156912107e-17]],
  [-467200, [-29.847174904071, 10.636426313081, 12.297904180106], [-63257063052907e-17, -0.0029969577578221, -74476074151596e-17]],
  [-438e3, [30.774692107687, -18.236637015304, -14.945535879896], [0.0020113162005465, 0.0019353827024189, -20937793168297e-19]],
  [-408800, [30.243153324028, 38.656267888503, 2.938501750218], [-0.0016052508674468, 0.0011183495337525, 83333973416824e-17]],
  [-379600, [-27.288984772533, 18.643162147874, 14.023633623329], [-0.0011856388898191, -0.0027170609282181, -49015526126399e-17]],
  [-350400, [24.519605196774, -23.245756064727, -14.626862367368], [0.0024322321483154, 0.0016062008146048, -23369181613312e-17]],
  [-321200, [34.505274805875, 35.125338586954, 0.557361475637], [-0.0013824391637782, 0.0013833397561817, 84823598806262e-17]],
  [-292e3, [-23.275363915119, 25.818514298769, 15.055381588598], [-0.0016062295460975, -0.0023395961498533, -24377362639479e-17]],
  [-262800, [17.050384798092, -27.180376290126, -13.608963321694], [0.0028175521080578, 0.0011358749093955, -49548725258825e-17]],
  [-233600, [38.093671910285, 30.880588383337, -1.843688067413], [-0.0011317697153459, 0.0016128814698472, 84177586176055e-17]],
  [-204400, [-18.197852930878, 31.932869934309, 15.438294826279], [-0.0019117272501813, -0.0019146495909842, -19657304369835e-18]],
  [-175200, [8.528924039997, -29.618422200048, -11.805400994258], [0.0031034370787005, 5139363329243e-16, -77293066202546e-17]],
  [-146e3, [40.94685725864, 25.904973592021, -4.256336240499], [-83652705194051e-17, 0.0018129497136404, 8156422827306e-16]],
  [-116800, [-12.326958895325, 36.881883446292, 15.217158258711], [-0.0021166103705038, -0.001481442003599, 17401209844705e-17]],
  [-87600, [-0.633258375909, -30.018759794709, -9.17193287495], [0.0032016994581737, -25279858672148e-17, -0.0010411088271861]],
  [-58400, [42.936048423883, 20.344685584452, -6.588027007912], [-50525450073192e-17, 0.0019910074335507, 77440196540269e-17]],
  [-29200, [-5.975910552974, 40.61180995846, 14.470131723673], [-0.0022184202156107, -0.0010562361130164, 33652250216211e-17]],
  [0, [-9.875369580774, -27.978926224737, -5.753711824704], [0.0030287533248818, -0.0011276087003636, -0.0012651326732361]],
  [29200, [43.958831986165, 14.214147973292, -8.808306227163], [-14717608981871e-17, 0.0021404187242141, 71486567806614e-17]],
  [58400, [0.67813676352, 43.094461639362, 13.243238780721], [-0.0022358226110718, -63233636090933e-17, 47664798895648e-17]],
  [87600, [-18.282602096834, -23.30503958666, -1.766620508028], [0.0025567245263557, -0.0019902940754171, -0.0013943491701082]],
  [116800, [43.873338744526, 7.700705617215, -10.814273666425], [23174803055677e-17, 0.0022402163127924, 62988756452032e-17]],
  [146e3, [7.392949027906, 44.382678951534, 11.629500214854], [-0.002193281545383, -21751799585364e-17, 59556516201114e-17]],
  [175200, [-24.981690229261, -16.204012851426, 2.466457544298], [0.001819398914958, -0.0026765419531201, -0.0013848283502247]],
  [204400, [42.530187039511, 0.845935508021, -12.554907527683], [65059779150669e-17, 0.0022725657282262, 51133743202822e-17]],
  [233600, [13.999526486822, 44.462363044894, 9.669418486465], [-0.0021079296569252, 17533423831993e-17, 69128485798076e-17]],
  [262800, [-29.184024803031, -7.371243995762, 6.493275957928], [93581363109681e-17, -0.0030610357109184, -0.0012364201089345]],
  [292e3, [39.831980671753, -6.078405766765, -13.909815358656], [0.0011117769689167, 0.0022362097830152, 36230548231153e-17]],
  [321200, [20.294955108476, 43.417190420251, 7.450091985932], [-0.0019742157451535, 53102050468554e-17, 75938408813008e-17]],
  [350400, [-30.66999230216, 2.318743558955, 9.973480913858], [45605107450676e-18, -0.0031308219926928, -99066533301924e-17]],
  [379600, [35.626122155983, -12.897647509224, -14.777586508444], [0.0016015684949743, 0.0021171931182284, 18002516202204e-17]],
  [408800, [26.133186148561, 41.232139187599, 5.00640132622], [-0.0017857704419579, 86046232702817e-17, 80614690298954e-17]],
  [438e3, [-29.57674022923, 11.863535943587, 12.631323039872], [-72292830060955e-17, -0.0029587820140709, -708242964503e-15]],
  [467200, [29.910805787391, -19.159019294, -15.013363865194], [0.0020871080437997, 0.0018848372554514, -38528655083926e-18]],
  [496400, [31.375957451819, 38.050372720763, 2.433138343754], [-0.0015546055556611, 0.0011699815465629, 83565439266001e-17]],
  [525600, [-26.360071336928, 20.662505904952, 14.414696258958], [-0.0013142373118349, -0.0026236647854842, -42542017598193e-17]],
  [554800, [22.599441488648, -24.508879898306, -14.484045731468], [0.0025454108304806, 0.0014917058755191, -30243665086079e-17]],
  [584e3, [35.877864013014, 33.894226366071, -0.224524636277], [-0.0012941245730845, 0.0014560427668319, 84762160640137e-17]],
  [613200, [-21.538149762417, 28.204068269761, 15.321973799534], [-0.001731211740901, -0.0021939631314577, -1631691327518e-16]],
  [642400, [13.971521374415, -28.339941764789, -13.083792871886], [0.0029334630526035, 91860931752944e-17, -59939422488627e-17]],
  [671600, [39.526942044143, 28.93989736011, -2.872799527539], [-0.0010068481658095, 0.001702113288809, 83578230511981e-17]],
  [700800, [-15.576200701394, 34.399412961275, 15.466033737854], [-0.0020098814612884, -0.0017191109825989, 70414782780416e-18]],
  [73e4, [4.24325283709, -30.118201690825, -10.707441231349], [0.0031725847067411, 1609846120227e-16, -90672150593868e-17]]
];
var TerseVector = class _TerseVector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  clone() {
    return new _TerseVector(this.x, this.y, this.z);
  }
  ToAstroVector(t) {
    return new Vector(this.x, this.y, this.z, t);
  }
  static zero() {
    return new _TerseVector(0, 0, 0);
  }
  quadrature() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  add(other) {
    return new _TerseVector(this.x + other.x, this.y + other.y, this.z + other.z);
  }
  sub(other) {
    return new _TerseVector(this.x - other.x, this.y - other.y, this.z - other.z);
  }
  incr(other) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
  }
  decr(other) {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
  }
  mul(scalar) {
    return new _TerseVector(scalar * this.x, scalar * this.y, scalar * this.z);
  }
  div(scalar) {
    return new _TerseVector(this.x / scalar, this.y / scalar, this.z / scalar);
  }
  mean(other) {
    return new _TerseVector((this.x + other.x) / 2, (this.y + other.y) / 2, (this.z + other.z) / 2);
  }
  neg() {
    return new _TerseVector(-this.x, -this.y, -this.z);
  }
};
var body_state_t = class _body_state_t {
  constructor(tt, r, v) {
    this.tt = tt;
    this.r = r;
    this.v = v;
  }
  clone() {
    return new _body_state_t(this.tt, this.r, this.v);
  }
  sub(other) {
    return new _body_state_t(this.tt, this.r.sub(other.r), this.v.sub(other.v));
  }
};
function BodyStateFromTable(entry) {
  let [tt, [rx, ry, rz], [vx, vy, vz]] = entry;
  return new body_state_t(tt, new TerseVector(rx, ry, rz), new TerseVector(vx, vy, vz));
}
function AdjustBarycenterPosVel(ssb, tt, body, planet_gm) {
  const shift = planet_gm / (planet_gm + SUN_GM);
  const planet = CalcVsopPosVel(vsop[body], tt);
  ssb.r.incr(planet.r.mul(shift));
  ssb.v.incr(planet.v.mul(shift));
  return planet;
}
function AccelerationIncrement(small_pos, gm, major_pos) {
  const delta = major_pos.sub(small_pos);
  const r2 = delta.quadrature();
  return delta.mul(gm / (r2 * Math.sqrt(r2)));
}
var major_bodies_t = class {
  constructor(tt) {
    let ssb = new body_state_t(tt, new TerseVector(0, 0, 0), new TerseVector(0, 0, 0));
    this.Jupiter = AdjustBarycenterPosVel(ssb, tt, Body.Jupiter, JUPITER_GM);
    this.Saturn = AdjustBarycenterPosVel(ssb, tt, Body.Saturn, SATURN_GM);
    this.Uranus = AdjustBarycenterPosVel(ssb, tt, Body.Uranus, URANUS_GM);
    this.Neptune = AdjustBarycenterPosVel(ssb, tt, Body.Neptune, NEPTUNE_GM);
    this.Jupiter.r.decr(ssb.r);
    this.Jupiter.v.decr(ssb.v);
    this.Saturn.r.decr(ssb.r);
    this.Saturn.v.decr(ssb.v);
    this.Uranus.r.decr(ssb.r);
    this.Uranus.v.decr(ssb.v);
    this.Neptune.r.decr(ssb.r);
    this.Neptune.v.decr(ssb.v);
    this.Sun = new body_state_t(tt, ssb.r.mul(-1), ssb.v.mul(-1));
  }
  Acceleration(pos) {
    let acc = AccelerationIncrement(pos, SUN_GM, this.Sun.r);
    acc.incr(AccelerationIncrement(pos, JUPITER_GM, this.Jupiter.r));
    acc.incr(AccelerationIncrement(pos, SATURN_GM, this.Saturn.r));
    acc.incr(AccelerationIncrement(pos, URANUS_GM, this.Uranus.r));
    acc.incr(AccelerationIncrement(pos, NEPTUNE_GM, this.Neptune.r));
    return acc;
  }
};
var body_grav_calc_t = class _body_grav_calc_t {
  constructor(tt, r, v, a) {
    this.tt = tt;
    this.r = r;
    this.v = v;
    this.a = a;
  }
  clone() {
    return new _body_grav_calc_t(this.tt, this.r.clone(), this.v.clone(), this.a.clone());
  }
};
var grav_sim_t = class {
  constructor(bary, grav) {
    this.bary = bary;
    this.grav = grav;
  }
};
function UpdatePosition(dt, r, v, a) {
  return new TerseVector(r.x + dt * (v.x + dt * a.x / 2), r.y + dt * (v.y + dt * a.y / 2), r.z + dt * (v.z + dt * a.z / 2));
}
function UpdateVelocity(dt, v, a) {
  return new TerseVector(v.x + dt * a.x, v.y + dt * a.y, v.z + dt * a.z);
}
function GravSim(tt2, calc1) {
  const dt = tt2 - calc1.tt;
  const bary2 = new major_bodies_t(tt2);
  const approx_pos = UpdatePosition(dt, calc1.r, calc1.v, calc1.a);
  const mean_acc = bary2.Acceleration(approx_pos).mean(calc1.a);
  const pos = UpdatePosition(dt, calc1.r, calc1.v, mean_acc);
  const vel = calc1.v.add(mean_acc.mul(dt));
  const acc = bary2.Acceleration(pos);
  const grav = new body_grav_calc_t(tt2, pos, vel, acc);
  return new grav_sim_t(bary2, grav);
}
var pluto_cache = [];
function ClampIndex(frac, nsteps) {
  const index = Math.floor(frac);
  if (index < 0)
    return 0;
  if (index >= nsteps)
    return nsteps - 1;
  return index;
}
function GravFromState(entry) {
  const state = BodyStateFromTable(entry);
  const bary = new major_bodies_t(state.tt);
  const r = state.r.add(bary.Sun.r);
  const v = state.v.add(bary.Sun.v);
  const a = bary.Acceleration(r);
  const grav = new body_grav_calc_t(state.tt, r, v, a);
  return new grav_sim_t(bary, grav);
}
function GetSegment(cache, tt) {
  const t0 = PlutoStateTable[0][0];
  if (tt < t0 || tt > PlutoStateTable[PLUTO_NUM_STATES - 1][0]) {
    return null;
  }
  const seg_index = ClampIndex((tt - t0) / PLUTO_TIME_STEP, PLUTO_NUM_STATES - 1);
  if (!cache[seg_index]) {
    const seg = cache[seg_index] = [];
    seg[0] = GravFromState(PlutoStateTable[seg_index]).grav;
    seg[PLUTO_NSTEPS - 1] = GravFromState(PlutoStateTable[seg_index + 1]).grav;
    let i;
    let step_tt = seg[0].tt;
    for (i = 1; i < PLUTO_NSTEPS - 1; ++i)
      seg[i] = GravSim(step_tt += PLUTO_DT, seg[i - 1]).grav;
    step_tt = seg[PLUTO_NSTEPS - 1].tt;
    var reverse = [];
    reverse[PLUTO_NSTEPS - 1] = seg[PLUTO_NSTEPS - 1];
    for (i = PLUTO_NSTEPS - 2; i > 0; --i)
      reverse[i] = GravSim(step_tt -= PLUTO_DT, reverse[i + 1]).grav;
    for (i = PLUTO_NSTEPS - 2; i > 0; --i) {
      const ramp = i / (PLUTO_NSTEPS - 1);
      seg[i].r = seg[i].r.mul(1 - ramp).add(reverse[i].r.mul(ramp));
      seg[i].v = seg[i].v.mul(1 - ramp).add(reverse[i].v.mul(ramp));
      seg[i].a = seg[i].a.mul(1 - ramp).add(reverse[i].a.mul(ramp));
    }
  }
  return cache[seg_index];
}
function CalcPlutoOneWay(entry, target_tt, dt) {
  let sim = GravFromState(entry);
  const n = Math.ceil((target_tt - sim.grav.tt) / dt);
  for (let i = 0; i < n; ++i)
    sim = GravSim(i + 1 === n ? target_tt : sim.grav.tt + dt, sim.grav);
  return sim;
}
function CalcPluto(time, helio) {
  let r, v, bary;
  const seg = GetSegment(pluto_cache, time.tt);
  if (!seg) {
    let sim;
    if (time.tt < PlutoStateTable[0][0])
      sim = CalcPlutoOneWay(PlutoStateTable[0], time.tt, -PLUTO_DT);
    else
      sim = CalcPlutoOneWay(PlutoStateTable[PLUTO_NUM_STATES - 1], time.tt, +PLUTO_DT);
    r = sim.grav.r;
    v = sim.grav.v;
    bary = sim.bary;
  } else {
    const left = ClampIndex((time.tt - seg[0].tt) / PLUTO_DT, PLUTO_NSTEPS - 1);
    const s1 = seg[left];
    const s2 = seg[left + 1];
    const acc = s1.a.mean(s2.a);
    const ra = UpdatePosition(time.tt - s1.tt, s1.r, s1.v, acc);
    const va = UpdateVelocity(time.tt - s1.tt, s1.v, acc);
    const rb = UpdatePosition(time.tt - s2.tt, s2.r, s2.v, acc);
    const vb = UpdateVelocity(time.tt - s2.tt, s2.v, acc);
    const ramp = (time.tt - s1.tt) / PLUTO_DT;
    r = ra.mul(1 - ramp).add(rb.mul(ramp));
    v = va.mul(1 - ramp).add(vb.mul(ramp));
  }
  if (helio) {
    if (!bary)
      bary = new major_bodies_t(time.tt);
    r = r.sub(bary.Sun.r);
    v = v.sub(bary.Sun.v);
  }
  return new StateVector(r.x, r.y, r.z, v.x, v.y, v.z, time);
}
var Rotation_JUP_EQJ = new RotationMatrix([
  [0.999432765338654, -0.0336771074697641, 0],
  [0.0303959428906285, 0.902057912352809, 0.430543388542295],
  [-0.0144994559663353, -0.430299169409101, 0.902569881273754]
]);
function HelioVector(body, date) {
  var time = MakeTime(date);
  if (body in vsop)
    return CalcVsop(vsop[body], time);
  if (body === Body.Pluto) {
    const p = CalcPluto(time, true);
    return new Vector(p.x, p.y, p.z, time);
  }
  if (body === Body.Sun)
    return new Vector(0, 0, 0, time);
  if (body === Body.Moon) {
    var e = CalcVsop(vsop.Earth, time);
    var m = GeoMoon(time);
    return new Vector(e.x + m.x, e.y + m.y, e.z + m.z, time);
  }
  if (body === Body.EMB) {
    const e2 = CalcVsop(vsop.Earth, time);
    const m2 = GeoMoon(time);
    const denom = 1 + EARTH_MOON_MASS_RATIO;
    return new Vector(e2.x + m2.x / denom, e2.y + m2.y / denom, e2.z + m2.z / denom, time);
  }
  if (body === Body.SSB)
    return CalcSolarSystemBarycenter(time);
  const star = UserDefinedStar(body);
  if (star) {
    const sphere = new Spherical(star.dec, 15 * star.ra, star.dist);
    return VectorFromSphere(sphere, time);
  }
  throw `HelioVector: Unknown body "${body}"`;
}
function CorrectLightTravel(func, time) {
  let ltime = time;
  let dt = 0;
  for (let iter = 0; iter < 10; ++iter) {
    const pos = func(ltime);
    const lt = pos.Length() / C_AUDAY;
    if (lt > 1)
      throw `Object is too distant for light-travel solver.`;
    const ltime2 = time.AddDays(-lt);
    dt = Math.abs(ltime2.tt - ltime.tt);
    if (dt < 1e-9)
      return pos;
    ltime = ltime2;
  }
  throw `Light-travel time solver did not converge: dt = ${dt}`;
}
var BodyPosition = class {
  constructor(observerBody, targetBody, aberration, observerPos) {
    this.observerBody = observerBody;
    this.targetBody = targetBody;
    this.aberration = aberration;
    this.observerPos = observerPos;
  }
  Position(time) {
    if (this.aberration) {
      this.observerPos = HelioVector(this.observerBody, time);
    } else {
    }
    const targetPos = HelioVector(this.targetBody, time);
    return new Vector(targetPos.x - this.observerPos.x, targetPos.y - this.observerPos.y, targetPos.z - this.observerPos.z, time);
  }
};
function BackdatePosition(date, observerBody, targetBody, aberration) {
  VerifyBoolean(aberration);
  const time = MakeTime(date);
  if (UserDefinedStar(targetBody)) {
    const tvec = HelioVector(targetBody, time);
    if (aberration) {
      const ostate = HelioState(observerBody, time);
      const rvec = new Vector(tvec.x - ostate.x, tvec.y - ostate.y, tvec.z - ostate.z, time);
      const s = C_AUDAY / rvec.Length();
      return new Vector(rvec.x + ostate.vx / s, rvec.y + ostate.vy / s, rvec.z + ostate.vz / s, time);
    }
    const ovec = HelioVector(observerBody, time);
    return new Vector(tvec.x - ovec.x, tvec.y - ovec.y, tvec.z - ovec.z, time);
  }
  let observerPos;
  if (aberration) {
    observerPos = new Vector(0, 0, 0, time);
  } else {
    observerPos = HelioVector(observerBody, time);
  }
  const bpos = new BodyPosition(observerBody, targetBody, aberration, observerPos);
  return CorrectLightTravel((t) => bpos.Position(t), time);
}
function GeoVector(body, date, aberration) {
  VerifyBoolean(aberration);
  const time = MakeTime(date);
  switch (body) {
    case Body.Earth:
      return new Vector(0, 0, 0, time);
    case Body.Moon:
      return GeoMoon(time);
    default:
      const vec = BackdatePosition(time, Body.Earth, body, aberration);
      vec.t = time;
      return vec;
  }
}
function ExportState(terse, time) {
  return new StateVector(terse.r.x, terse.r.y, terse.r.z, terse.v.x, terse.v.y, terse.v.z, time);
}
function HelioState(body, date) {
  const time = MakeTime(date);
  switch (body) {
    case Body.Sun:
      return new StateVector(0, 0, 0, 0, 0, 0, time);
    case Body.SSB:
      const bary = new major_bodies_t(time.tt);
      return new StateVector(-bary.Sun.r.x, -bary.Sun.r.y, -bary.Sun.r.z, -bary.Sun.v.x, -bary.Sun.v.y, -bary.Sun.v.z, time);
    case Body.Mercury:
    case Body.Venus:
    case Body.Earth:
    case Body.Mars:
    case Body.Jupiter:
    case Body.Saturn:
    case Body.Uranus:
    case Body.Neptune:
      const planet = CalcVsopPosVel(vsop[body], time.tt);
      return ExportState(planet, time);
    case Body.Pluto:
      return CalcPluto(time, true);
    case Body.Moon:
    case Body.EMB:
      const earth = CalcVsopPosVel(vsop.Earth, time.tt);
      const state = body == Body.Moon ? GeoMoonState(time) : GeoEmbState(time);
      return new StateVector(state.x + earth.r.x, state.y + earth.r.y, state.z + earth.r.z, state.vx + earth.v.x, state.vy + earth.v.y, state.vz + earth.v.z, time);
    default:
      if (UserDefinedStar(body)) {
        const vec = HelioVector(body, time);
        return new StateVector(vec.x, vec.y, vec.z, 0, 0, 0, time);
      }
      throw `HelioState: Unsupported body "${body}"`;
  }
}
var ApsisKind;
(function(ApsisKind2) {
  ApsisKind2[ApsisKind2["Pericenter"] = 0] = "Pericenter";
  ApsisKind2[ApsisKind2["Apocenter"] = 1] = "Apocenter";
})(ApsisKind || (ApsisKind = {}));
function VectorFromSphere(sphere, time) {
  time = MakeTime(time);
  const radlat = sphere.lat * DEG2RAD;
  const radlon = sphere.lon * DEG2RAD;
  const rcoslat = sphere.dist * Math.cos(radlat);
  return new Vector(rcoslat * Math.cos(radlon), rcoslat * Math.sin(radlon), sphere.dist * Math.sin(radlat), time);
}
var EclipseKind;
(function(EclipseKind2) {
  EclipseKind2["Penumbral"] = "penumbral";
  EclipseKind2["Partial"] = "partial";
  EclipseKind2["Annular"] = "annular";
  EclipseKind2["Total"] = "total";
})(EclipseKind || (EclipseKind = {}));
var NodeEventKind;
(function(NodeEventKind2) {
  NodeEventKind2[NodeEventKind2["Invalid"] = 0] = "Invalid";
  NodeEventKind2[NodeEventKind2["Ascending"] = 1] = "Ascending";
  NodeEventKind2[NodeEventKind2["Descending"] = -1] = "Descending";
})(NodeEventKind || (NodeEventKind = {}));

// src/core.jsx
var SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
var SIMPLE = {
  "Aries": ["\u05D4", "Heh", 5],
  "Taurus": ["\u05D5", "Vav", 6],
  "Gemini": ["\u05D6", "Zayin", 7],
  "Cancer": ["\u05D7", "Chet", 8],
  "Leo": ["\u05D8", "Tet", 9],
  "Virgo": ["\u05D9", "Yod", 10],
  "Libra": ["\u05DC", "Lamed", 30],
  "Scorpio": ["\u05E0", "Nun", 50],
  "Sagittarius": ["\u05E1", "Samekh", 60],
  "Capricorn": ["\u05E2", "Ayin", 70],
  "Aquarius": ["\u05E6", "Tzaddi", 90],
  "Pisces": ["\u05E7", "Qoph", 100]
};
var LETTER_TO_SIGN = {};
Object.entries(SIMPLE).forEach(([s, [he]]) => {
  LETTER_TO_SIGN[he] = s;
});
var BODIES = ["Saturn", "Jupiter", "Mars", "Sun", "Venus", "Mercury", "Moon", "Uranus", "Neptune", "Pluto"];
var GLYPH = { Sun: "\u2609", Moon: "\u263D", Mercury: "\u263F", Venus: "\u2640", Mars: "\u2642", Jupiter: "\u2643", Saturn: "\u2644", Uranus: "\u2645", Neptune: "\u2646", Pluto: "\u2647" };
var FIN2REG = { "\u05DF": "\u05E0", "\u05E5": "\u05E6", "\u05DA": "\u05DB", "\u05DD": "\u05DE", "\u05E3": "\u05E4" };
var REG2FIN = { "\u05E0": "\u05DF", "\u05E6": "\u05E5", "\u05DB": "\u05DA", "\u05DE": "\u05DD", "\u05E4": "\u05E3" };
var SIMPLE_LETTERS = new Set(Object.values(SIMPLE).map((x) => x[0]));
var GV = { \u05D0: 1, \u05D1: 2, \u05D2: 3, \u05D3: 4, \u05D4: 5, \u05D5: 6, \u05D6: 7, \u05D7: 8, \u05D8: 9, \u05D9: 10, \u05DB: 20, \u05DC: 30, \u05DE: 40, \u05E0: 50, \u05E1: 60, \u05E2: 70, \u05E4: 80, \u05E6: 90, \u05E7: 100, \u05E8: 200, \u05E9: 300, \u05EA: 400 };
function norm(s) {
  return [...s].map((c) => FIN2REG[c] || c).join("");
}
function displayHe(s) {
  if (!s) return s;
  const last = s[s.length - 1];
  const f = REG2FIN[last];
  return f ? s.slice(0, -1) + f : s;
}
function gematria(s) {
  return [...s].reduce((a, c) => a + (GV[c] || 0), 0);
}
function simpleSet(cons) {
  const s = /* @__PURE__ */ new Set();
  for (const c of norm(cons)) if (SIMPLE_LETTERS.has(c)) s.add(c);
  return s;
}
function formable(cons, occ2) {
  for (const c of simpleSet(cons)) if (!occ2.has(c)) return false;
  return true;
}
function isPalindrome(cons) {
  const n = norm(cons);
  return n.length >= 2 && n === [...n].reverse().join("");
}
var ANGEL_LEXICON = [
  // — Hebrew Bible / Apocrypha —
  ["\u05DE\u05D9\u05DB\u05D0\u05DC", "Michael", "Bible \xB7 Dan 10:13; Jude 9; Rev 12:7"],
  ["\u05D2\u05D1\u05E8\u05D9\u05D0\u05DC", "Gabriel", "Bible \xB7 Dan 8:16; Luke 1:19"],
  ["\u05E8\u05E4\u05D0\u05DC", "Raphael", "Apocrypha \xB7 Tobit 3:17; 1 Enoch"],
  ["\u05D0\u05D5\u05E8\u05D9\u05D0\u05DC", "Uriel", "Apocrypha \xB7 2 Esdras; 1 Enoch"],
  ["\u05E2\u05D6\u05D0\u05D6\u05DC", "Azazel", "Bible \xB7 Lev 16:8; 1 Enoch 10"],
  ["\u05D0\u05E8\u05D9\u05D0\u05DC", "Ariel", "Bible \xB7 Ezra 8:16; Isa 29:1"],
  ["\u05D9\u05E8\u05DE\u05D9\u05D0\u05DC", "Jeremiel", "Apocrypha \xB7 2 Esdras 4:36"],
  // — 1 Enoch: the leaders of the Watchers (chs 6, 8) —
  ["\u05E9\u05DE\u05D7\u05D6\u05D9", "Shemhazai (Semyaza)", "1 Enoch 6:7"],
  ["\u05E8\u05DE\u05D9\u05D0\u05DC", "Ramiel (Remiel)", "1 Enoch"],
  ["\u05E1\u05E8\u05D9\u05D0\u05DC", "Sariel", "1 Enoch 6:7"],
  ["\u05E9\u05E8\u05D9\u05D0\u05DC", "Sariel (variant)", "1 Enoch"],
  ["\u05E8\u05D2\u05D5\u05D0\u05DC", "Raguel", "1 Enoch 20:4"],
  ["\u05D3\u05E0\u05D9\u05D0\u05DC", "Daniel (the watcher)", "1 Enoch 6:7 \u2014 distinct from the prophet"],
  ["\u05DB\u05D5\u05DB\u05D1\u05D9\u05D0\u05DC", "Kokabiel", "1 Enoch 6:7 (angel of the stars)"],
  ["\u05D0\u05E8\u05DE\u05D9\u05D0\u05DC", "Arakiel", "1 Enoch 6:7"],
  ["\u05E9\u05DE\u05E9\u05D9\u05D0\u05DC", "Shamsiel", "1 Enoch 6:7"],
  ["\u05EA\u05DE\u05D9\u05D0\u05DC", "Tamiel", "1 Enoch 6:7"],
  ["\u05D9\u05E7\u05D5\u05DE\u05D9\u05D0\u05DC", "Yekamiel", "1 Enoch 6:7"],
  ["\u05E7\u05D6\u05D1\u05D9\u05D0\u05DC", "Kasbeel", "1 Enoch 8:2"],
  ["\u05E2\u05D6\u05D9\u05D0\u05DC", "Azael", "1 Enoch (variant)"],
  ["\u05E9\u05D7\u05D9\u05D0\u05DC", "Shachiel", "1 Enoch tradition"],
  // — Kabbalah / Merkavah —
  ["\u05DE\u05D8\u05D8\u05E8\u05D5\u05DF", "Metatron", "3 Enoch; Talmud (angel of the presence)"],
  ["\u05E1\u05E0\u05D3\u05DC\u05E4\u05D5\u05DF", "Sandalphon", "3 Enoch; Kabbalah"],
  ["\u05E1\u05DE\u05D0\u05DC", "Samael", "Talmud; Zohar (angel of death / adversary)"],
  ["\u05E8\u05D6\u05D9\u05D0\u05DC", "Raziel", "Sefer Raziel HaMalakh"],
  ["\u05DB\u05E4\u05D6\u05D9\u05D0\u05DC", "Kafziel (Cassiel)", "Kabbalah \xB7 angel of Saturn"],
  ["\u05E6\u05D3\u05E7\u05D9\u05D0\u05DC", "Zadkiel", "Kabbalah \xB7 angel of Jupiter / mercy"],
  ["\u05DB\u05DE\u05D0\u05DC", "Camael", "Kabbalah \xB7 angel of Mars"],
  ["\u05D7\u05DE\u05D0\u05DC", "Chamuel", "Kabbalah \xB7 angel of Mars (variant)"],
  ["\u05D4\u05E0\u05D9\u05D0\u05DC", "Haniel", "Kabbalah \xB7 angel of Venus"],
  ["\u05D9\u05D5\u05E4\u05D9\u05D0\u05DC", "Jophiel", "Kabbalah \xB7 angel of wisdom"],
  ["\u05D6\u05E4\u05E7\u05D9\u05D0\u05DC", "Zaphkiel", "Kabbalah"],
  ["\u05D1\u05E8\u05DB\u05D9\u05D0\u05DC", "Barakiel", "Kabbalah \xB7 angel of lightning"],
  ["\u05D9\u05D4\u05D5\u05D0\u05DC", "Jehoel", "Kabbalah (Metatron\u2019s surrogate)"],
  ["\u05D0\u05E7\u05D8\u05E8\u05D9\u05D0\u05DC", "Akatriel", "Kabbalah"],
  ["\u05E1\u05D1\u05E8\u05D9\u05D0\u05DC", "Sabriel", "Kabbalah"],
  ["\u05E0\u05D5\u05E8\u05D9\u05D0\u05DC", "Nuriel", "Kabbalah (angel of fire / hail)"],
  ["\u05DE\u05DC\u05DB\u05D9\u05D0\u05DC", "Malkiel", "Kabbalah"],
  ["\u05E1\u05D8\u05E8\u05D9\u05D0\u05DC", "Satariel", "Kabbalah (angel of concealment)"],
  // — Islamic / Judeo-Arabic, rendered in Hebrew —
  ["\u05E2\u05D6\u05E8\u05D0\u05DC", "Azrael", "Islamic & Jewish \xB7 angel of death"],
  ["\u05D0\u05E1\u05E8\u05D0\u05E4\u05D9\u05D0\u05DC", "Israfil", "Islamic \xB7 angel of the trumpet"],
  ["\u05D9\u05E9\u05E8\u05E4\u05D9\u05D0\u05DC", "Israfil (Jewish form)", "Jewish lists \xB7 trumpet"]
];
var ANGEL_NAME_MAP = new Map(ANGEL_LEXICON.map(([he, en, src]) => [norm(he), { en, src }]));
function readableWords(occ2, LEX2, angelMap2) {
  const res = [], seen = /* @__PURE__ */ new Set();
  for (const [cons, trans, gloss, pos] of LEX2) {
    if (seen.has(cons)) continue;
    if (formable(cons, occ2)) {
      seen.add(cons);
      const simp = [...simpleSet(cons)].sort().join("");
      const am = angelMap2 ? angelMap2.get(norm(cons)) : null;
      const an = ANGEL_NAME_MAP.get(norm(cons));
      res.push({
        he: cons,
        disp: displayHe(cons),
        translit: trans,
        gloss,
        pos,
        len: cons.length,
        gem: gematria(cons),
        simp,
        pal: isPalindrome(cons),
        m37: gematria(cons) % 37 === 0,
        name: (pos || "").startsWith("n-pr"),
        theo: /אל|יהו|יאל|יה/.test(cons),
        compound: /\s/.test(trans),
        angel: am ? { el: am.el, yh: am.yh } : null,
        angelName: an || null
      });
    }
  }
  for (const [he, en, src] of ANGEL_LEXICON) {
    if (seen.has(he)) continue;
    if (formable(he, occ2)) {
      seen.add(he);
      const simp = [...simpleSet(he)].sort().join("");
      res.push({
        he,
        disp: displayHe(he),
        translit: en,
        gloss: "angel \u2014 " + en,
        pos: "n-pr",
        len: he.length,
        gem: gematria(he),
        simp,
        pal: isPalindrome(he),
        m37: gematria(he) % 37 === 0,
        name: true,
        theo: /אל|יה/.test(he),
        compound: false,
        angel: angelMap2 ? angelMap2.get(norm(he)) : null,
        angelName: { en, src }
      });
    }
  }
  res.sort((a, b) => b.len - a.len || a.gem - b.gem || (a.he < b.he ? -1 : 1));
  return res;
}
function daysInMonth(y, mo) {
  if (mo === 2) return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0) ? 29 : 28;
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mo - 1];
}
function makeDate(y, mo, da, h = 12) {
  const d = new Date(Date.UTC(2e3, mo - 1, da, h, 0, 0));
  d.setUTCFullYear(y);
  return d;
}
function parseDate(str) {
  if (!str) return null;
  const m = /^(-?\d{1,5})-(\d{2})-(\d{2})$/.exec(str);
  if (!m) return null;
  const y = parseInt(m[1], 10), mo = parseInt(m[2], 10), da = parseInt(m[3], 10);
  if (mo < 1 || mo > 12 || da < 1 || da > daysInMonth(y, mo)) return null;
  const d = makeDate(y, mo, da);
  return isNaN(d.getTime()) ? null : d;
}
function fmtDate(d) {
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, "0");
  const da = String(d.getUTCDate()).padStart(2, "0");
  if (y >= 1 && y <= 9999) return String(y).padStart(4, "0") + "-" + mo + "-" + da;
  const sign = y < 0 ? "-" : "";
  return sign + String(Math.abs(y)).padStart(4, "0") + "-" + mo + "-" + da;
}
function skyAtSet(dateStr, bodies) {
  if (!dateStr) return [];
  const d = parseDate(dateStr);
  if (!d) return [];
  return bodies.map((b) => {
    const v = GeoVector(Body[b], d, true);
    const lon = Ecliptic(v).elon;
    let si = Math.floor(lon / 30) % 12;
    if (si < 0) si += 12;
    return { body: b, lon, sign: SIGNS[si], deg: lon - si * 30, boundary: lon - si * 30 < 1 || lon - si * 30 > 29 };
  });
}
function skyAt(dateStr) {
  return skyAtSet(dateStr, BODIES);
}
function occupiedLetters(rows2) {
  const s = /* @__PURE__ */ new Set();
  rows2.forEach((r) => s.add(SIMPLE[r.sign][0]));
  return s;
}
function bySign(rows2) {
  const m = {};
  rows2.forEach((r) => {
    (m[r.sign] = m[r.sign] || []).push(r);
  });
  return m;
}
var GENESIS = [
  ["\u05D1\u05E8\u05D0\u05E9\u05D9\u05EA", "In the beginning"],
  ["\u05D1\u05E8\u05D0", "created"],
  ["\u05D0\u05DC\u05D4\u05D9\u05DD", "God"],
  ["\u05D0\u05EA", "(object marker)"],
  ["\u05D4\u05E9\u05DE\u05D9\u05DD", "the heavens"],
  ["\u05D5\u05D0\u05EA", "and (object marker)"],
  ["\u05D4\u05D0\u05E8\u05E5", "the earth"]
];
var GEN_VALUES = GENESIS.map(([w]) => gematria(norm(w)));
var PREC = 50.29 / 3600;
var AGE = 30 / PREC;
var FULL = 360 / PREC;
var AYANAMSIS = 24.18;
var HALAKIM_DAY = 24 * 1080;
var MOLAD = 29 + 12 / 24 + 793 / HALAKIM_DAY;
var EQUINOX_LON = (360 - AYANAMSIS) % 360;
function ageBoundaries(ayan = AYANAMSIS) {
  const eqLon = (360 - ayan) % 360;
  const out = [];
  for (let i = 0; i < 12; i++) {
    const hi = (i + 1) * 30;
    let dt = (eqLon - hi) / PREC;
    while (dt > FULL / 2) dt -= FULL;
    while (dt < -FULL / 2) dt += FULL;
    const start = 2024 + dt;
    out.push({ sign: SIGNS[i], he: SIMPLE[SIGNS[i]][0], start, end: start + AGE });
  }
  return out;
}
var GREAT_YEAR = 25771;
function eraForYear(y) {
  const ERAS = ageBoundaries();
  let mn = Infinity, mx = -Infinity;
  for (const e of ERAS) {
    if (e.start < mn) mn = e.start;
    if (e.end > mx) mx = e.end;
  }
  let yy = y;
  while (yy < mn) yy += GREAT_YEAR;
  while (yy >= mx) yy -= GREAT_YEAR;
  for (const e of ERAS) {
    if (yy >= Math.round(e.start) && yy < Math.round(e.end)) return e.sign;
  }
  return "?";
}
var LO_SHU = [[4, 9, 2], [3, 5, 7], [8, 1, 6]];
var LO_POS = {};
for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) LO_POS[LO_SHU[i][j]] = [i, j];
var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function displayDate(ds) {
  const d = parseDate(ds);
  if (!d) return ds;
  const y = d.getUTCFullYear(), mo = MON[d.getUTCMonth()], da = d.getUTCDate();
  return `${da} ${mo} ${y < 0 ? Math.abs(y) + " BCE" : y}`;
}

// src/ui.jsx
function SkyMap({ rows: rows2, occ: occ2, hl }) {
  const C = 220, R2 = 196, Rp = 120;
  const pt = (lon, r) => {
    const a = lon * Math.PI / 180;
    return [C + r * Math.sin(a), C - r * Math.cos(a)];
  };
  const MOTHER_LON = [["\u05D0", "Draco", 268], ["\u05DE", "Ursa Minor", 89], ["\u05E9", "Cassiopea", 38]];
  const signCount = {};
  rows2.forEach((r) => {
    signCount[r.sign] = (signCount[r.sign] || 0) + 1;
  });
  const HLS = hl ? new Set(hl) : null;
  const occupied = occ2.size;
  return /* @__PURE__ */ import_react4.default.createElement("svg", { viewBox: "0 0 440 440", width: "100%", height: "auto", style: { maxWidth: "100%" }, role: "img", "aria-label": HLS ? `Sky map: word requires ${[...HLS].join(" ")} (${occupied} signs occupied)` : `Sky map: ${occupied} of 12 signs occupied` }, /* @__PURE__ */ import_react4.default.createElement("circle", { cx: C, cy: C, r: R2, fill: "#0e1320", stroke: "#283145", strokeWidth: "2" }), /* @__PURE__ */ import_react4.default.createElement("circle", { cx: C, cy: C, r: Rp + 22, fill: "none", stroke: "#1c2333", strokeWidth: "1" }), SIGNS.map((s, i) => {
    const [x0, y0] = pt(i * 30, R2), [x1, y1] = pt((i + 1) * 30, R2);
    const on = occ2.has(SIMPLE[s][0]);
    const isHl = HLS && HLS.has(SIMPLE[s][0]);
    const fill = isHl ? "rgba(232,200,122,0.16)" : on ? "rgba(127,176,255,0.10)" : "transparent";
    const stroke = isHl ? "#e8c87a" : on ? "#3a4762" : "#283145";
    return /* @__PURE__ */ import_react4.default.createElement("path", { key: s, d: `M ${C} ${C} L ${x0} ${y0} A ${R2} ${R2} 0 0 0 ${x1} ${y1} Z`, fill, stroke, strokeWidth: isHl ? 1.4 : 0.7 });
  }), SIGNS.map((s, i) => {
    const [lx, ly] = pt(i * 30 + 15, R2 - 20);
    const [nx, ny] = pt(i * 30 + 15, R2 - 3);
    const on = occ2.has(SIMPLE[s][0]), n = signCount[s] || 0;
    const isHl = HLS && HLS.has(SIMPLE[s][0]);
    const letterFill = isHl ? "#e8c87a" : on ? "#cfe0ff" : "#5a647a";
    const nameFill = isHl ? "#e8c87a" : on ? "#8aa0c0" : "#424b5e";
    return /* @__PURE__ */ import_react4.default.createElement("g", { key: s }, /* @__PURE__ */ import_react4.default.createElement("text", { x: lx, y: ly, textAnchor: "middle", dominantBaseline: "middle", fontSize: "21", fontWeight: isHl ? 700 : 400, fill: letterFill }, SIMPLE[s][0]), /* @__PURE__ */ import_react4.default.createElement("text", { x: nx, y: ny, textAnchor: "middle", dominantBaseline: "middle", fontSize: "8.5", fill: nameFill }, s, n > 1 ? " \xB7\xD7" + n : ""));
  }), rows2.map((r) => {
    const [px, py] = pt(r.lon, Rp);
    return /* @__PURE__ */ import_react4.default.createElement("g", { key: r.body }, /* @__PURE__ */ import_react4.default.createElement("circle", { cx: px, cy: py, r: "8.5", fill: "#131826", stroke: "#7fb0ff", strokeWidth: "1.2" }), /* @__PURE__ */ import_react4.default.createElement("text", { x: px, y: py, textAnchor: "middle", dominantBaseline: "middle", fontSize: "12", fill: "#7fb0ff" }, GLYPH[r.body]), r.boundary && /* @__PURE__ */ import_react4.default.createElement("circle", { cx: px, cy: py, r: "11.5", fill: "none", stroke: "#ffcf6a", strokeWidth: "1", strokeDasharray: "2 2", opacity: "0.8" }));
  }), /* @__PURE__ */ import_react4.default.createElement("circle", { cx: C, cy: C, r: "32", fill: "#0e1320", stroke: "#2a3346", strokeWidth: "1", strokeDasharray: "3 3" }), MOTHER_LON.map(([h, con, lon]) => {
    const [lx, ly] = pt(lon, 18);
    const [nx, ny] = pt(lon, 38);
    const [ox, oy] = pt(lon, R2 - 24);
    const [sx, sy] = pt(lon, 44);
    return /* @__PURE__ */ import_react4.default.createElement("g", { key: h }, /* @__PURE__ */ import_react4.default.createElement("line", { x1: sx, y1: sy, x2: ox, y2: oy, stroke: "#33405a", strokeWidth: "0.6", strokeDasharray: "2 3", opacity: "0.55" }), /* @__PURE__ */ import_react4.default.createElement("text", { x: lx, y: ly, textAnchor: "middle", dominantBaseline: "middle", fontSize: "19", fill: "#9aa6bd" }, h), /* @__PURE__ */ import_react4.default.createElement("text", { x: nx, y: ny, textAnchor: "middle", dominantBaseline: "middle", fontSize: "5.6", fill: "#5d6883" }, con));
  }), /* @__PURE__ */ import_react4.default.createElement("text", { x: C, y: C + 34, textAnchor: "middle", fontSize: "6.5", fill: "#525d72" }, "3 mothers \xB7 fixed circumpolar axis"));
}

// src/pages/AlignmentFicha.jsx
function smallestArc(lons) {
  const s = [...lons].sort((a, b) => a - b);
  if (s.length < 2) return 0;
  let maxGap = 0;
  for (let i = 1; i < s.length; i++) maxGap = Math.max(maxGap, s[i] - s[i - 1]);
  maxGap = Math.max(maxGap, s[0] + 360 - s[s.length - 1]);
  return 360 - maxGap;
}
function AlignmentFicha({ date, lex, angelMap: angelMap2, onBack }) {
  const rows2 = (0, import_react5.useMemo)(() => skyAt(date), [date]);
  const occ2 = (0, import_react5.useMemo)(() => occupiedLetters(rows2), [rows2]);
  const occSigns = (0, import_react5.useMemo)(() => new Set(rows2.map((r) => r.sign)), [rows2]);
  const bs = (0, import_react5.useMemo)(() => bySign(rows2), [rows2]);
  const words = (0, import_react5.useMemo)(() => lex ? readableWords(occ2, lex.lexicon, angelMap2) : [], [occ2, lex, angelMap2]);
  const meta = (0, import_react5.useMemo)(() => {
    let best = null;
    for (const [sign, list] of Object.entries(bs)) {
      if (!best || list.length > best.list.length) best = { sign, list };
    }
    const lons = rows2.map((r) => r.lon);
    const year2 = (() => {
      const d = makeDate ? makeDate(date.slice(0, 4) | 0, 1, 1) : null;
      return parseInt(date.slice(0, 4), 10) || 2026;
    })();
    return { maxInSign: best ? best.list.length : 0, sign: best ? best.sign : "\u2014", span: smallestArc(lons), era: eraForYear(year2) };
  }, [rows2, bs, date]);
  const dateWords = words.filter((w) => w.simp).sort((a, b) => (b.name ? 1 : 0) - (a.name ? 1 : 0) || b.len - a.len);
  const top = dateWords.slice(0, 12);
  const year = parseInt(date.slice(0, 4), 10) || 2026;
  return /* @__PURE__ */ import_react5.default.createElement("div", null, onBack && /* @__PURE__ */ import_react5.default.createElement("div", { className: "controls", style: { marginBottom: 14 } }, /* @__PURE__ */ import_react5.default.createElement("button", { onClick: onBack, title: "Back" }, "\u25C0 back to Alignments"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "pill" }, "stellar alignment")), /* @__PURE__ */ import_react5.default.createElement("h1", null, "Stellar alignment \u2014 ", displayDate(date)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "sub", style: { marginBottom: 14 } }, /* @__PURE__ */ import_react5.default.createElement("b", { style: { color: "var(--gold)" } }, meta.maxInSign), " of ", rows2.length, " bodies in ", /* @__PURE__ */ import_react5.default.createElement("b", null, meta.sign), " \xB7 span ", /* @__PURE__ */ import_react5.default.createElement("b", { className: "deg" }, meta.span.toFixed(1), "\xB0"), " \xB7 era ", /* @__PURE__ */ import_react5.default.createElement("b", null, meta.era)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "grid2", style: { alignItems: "start" } }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "panel", style: { padding: 14 } }, /* @__PURE__ */ import_react5.default.createElement(SkyMap, { rows: rows2, occ: occ2 }), /* @__PURE__ */ import_react5.default.createElement("div", { className: "legend" }, occSigns.size, " of 12 zodiac signs occupied on ", displayDate(date), ". Readable simples: ", /* @__PURE__ */ import_react5.default.createElement("b", { style: { color: "var(--gold)" } }, [...occ2].sort().join(" ") || "none"), ".")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "panel", style: { padding: 16 } }, /* @__PURE__ */ import_react5.default.createElement("h3", { style: { marginTop: 0 } }, "Alignment metrics"), /* @__PURE__ */ import_react5.default.createElement("table", null, /* @__PURE__ */ import_react5.default.createElement("tbody", null, /* @__PURE__ */ import_react5.default.createElement("tr", null, /* @__PURE__ */ import_react5.default.createElement("th", null, "Date"), /* @__PURE__ */ import_react5.default.createElement("td", null, displayDate(date))), /* @__PURE__ */ import_react5.default.createElement("tr", null, /* @__PURE__ */ import_react5.default.createElement("th", null, "Bodies"), /* @__PURE__ */ import_react5.default.createElement("td", null, rows2.length, " (", rows2.map((r) => GLYPH[r.body]).join(" "), ")")), /* @__PURE__ */ import_react5.default.createElement("tr", null, /* @__PURE__ */ import_react5.default.createElement("th", null, "Max in one sign"), /* @__PURE__ */ import_react5.default.createElement("td", null, /* @__PURE__ */ import_react5.default.createElement("b", { style: { color: "var(--gold)" } }, meta.maxInSign), " in ", meta.sign)), /* @__PURE__ */ import_react5.default.createElement("tr", null, /* @__PURE__ */ import_react5.default.createElement("th", null, "Span (tightest arc)"), /* @__PURE__ */ import_react5.default.createElement("td", { className: "deg" }, meta.span.toFixed(2), "\xB0")), /* @__PURE__ */ import_react5.default.createElement("tr", null, /* @__PURE__ */ import_react5.default.createElement("th", null, "Precessional era"), /* @__PURE__ */ import_react5.default.createElement("td", null, meta.era)), /* @__PURE__ */ import_react5.default.createElement("tr", null, /* @__PURE__ */ import_react5.default.createElement("th", null, "Occupied signs"), /* @__PURE__ */ import_react5.default.createElement("td", null, occSigns.size, "/12")), /* @__PURE__ */ import_react5.default.createElement("tr", null, /* @__PURE__ */ import_react5.default.createElement("th", null, "Readable simples"), /* @__PURE__ */ import_react5.default.createElement("td", null, /* @__PURE__ */ import_react5.default.createElement("span", { className: "he", style: { fontSize: "1.1rem" } }, [...occ2].sort().join(" ") || "none"))))))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "panel", style: { marginTop: 14, padding: 16 } }, /* @__PURE__ */ import_react5.default.createElement("h3", { style: { marginTop: 0 } }, "Top readable names on ", displayDate(date), " \u2014 ", dateWords.length, " date-specific"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "muted", style: { marginBottom: 8, fontSize: ".82rem" } }, "Names whose zodiac simples are among this alignment's occupied signs (proper names first, then longest). A particular sky configuration recurs over years \u2192 centuries \u2192 millennia; this is the readable layer of that day."), top.length ? /* @__PURE__ */ import_react5.default.createElement("div", { className: "tcards" }, top.map((w, i) => /* @__PURE__ */ import_react5.default.createElement("div", { key: i, className: "tcard" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "the" }, w.disp), /* @__PURE__ */ import_react5.default.createElement("div", { className: "read" }, w.translit), /* @__PURE__ */ import_react5.default.createElement("div", { className: "trans" }, w.gloss), /* @__PURE__ */ import_react5.default.createElement("div", { className: "g" }, w.len, " letters \xB7 gematria ", w.gem, w.name && /* @__PURE__ */ import_react5.default.createElement("span", { style: { color: "var(--blue)" } }, " \xB7 name"), w.angelName && /* @__PURE__ */ import_react5.default.createElement("span", { style: { color: "var(--violet)" } }, " \xB7 angel"))))) : /* @__PURE__ */ import_react5.default.createElement("div", { className: "muted" }, "No date-specific readable names on this day.")));
}

// src/tabs/ReaderTab.jsx
var import_react6 = __toESM(require_react());
function findWord(he, LEX2, angelMap2) {
  if (!LEX2) return null;
  for (const [cons, trans, gloss, pos] of LEX2) {
    if (cons === he) {
      const simp = [...simpleSet(cons)].sort().join("");
      const am = angelMap2 ? angelMap2.get(norm(cons)) : null;
      const an = ANGEL_NAME_MAP.get(norm(cons));
      return {
        he: cons,
        disp: displayHe(cons),
        translit: trans,
        gloss,
        pos,
        len: cons.length,
        gem: gematria(cons),
        simp,
        pal: isPalindrome(cons),
        m37: gematria(cons) % 37 === 0,
        name: (pos || "").startsWith("n-pr"),
        theo: /אל|יהו|יאל|יה/.test(cons),
        compound: /\s/.test(trans),
        angel: am ? { el: am.el, yh: am.yh } : null,
        angelName: an || null
      };
    }
  }
  for (const [ahe, aen, asrc] of ANGEL_LEXICON) {
    if (ahe === he) {
      const simp = [...simpleSet(ahe)].sort().join("");
      return {
        he: ahe,
        disp: displayHe(ahe),
        translit: aen,
        gloss: "angel \u2014 " + aen,
        pos: "n-pr",
        len: ahe.length,
        gem: gematria(ahe),
        simp,
        pal: isPalindrome(ahe),
        m37: gematria(ahe) % 37 === 0,
        name: true,
        theo: /אל|יה/.test(ahe),
        compound: false,
        angel: angelMap2 ? angelMap2.get(norm(ahe)) : null,
        angelName: { en: aen, src: asrc }
      };
    }
  }
  return null;
}
function wikiCleanTitle(s) {
  return (s || "").replace(/\s*\([^)]*\)\s*/g, " ").split(",")[0].trim();
}
function GlossPage({ word, date, rows: rows2, occ: occ2, genData: genData2, onBack }) {
  const w = word;
  const req = w.simp ? [...w.simp] : [];
  const tl = (0, import_react6.useMemo)(() => {
    if (!genData2 || !genData2.dayOccs || !req.length) return null;
    const n = genData2.dayOccs.length;
    const onDays = [];
    for (let i = 0; i < n; i++) {
      let ok = true;
      for (const c of req) {
        if (!genData2.dayOccs[i].has(c)) {
          ok = false;
          break;
        }
      }
      if (ok) onDays.push(i);
    }
    const curDoy = (() => {
      const d = parseDate(date);
      if (!d || d.getUTCFullYear() !== genData2.year) return -1;
      return Math.floor((d.getTime() - Date.UTC(d.getUTCFullYear(), 0, 1, 12)) / 864e5);
    })();
    return { n, onDays, daySet: new Set(onDays), curDoy };
  }, [genData2, date, w]);
  const wikiTitle = w.name || w.angelName ? wikiCleanTitle(w.angelName ? w.angelName.en : w.translit) : null;
  const [wiki3, setWiki] = (0, import_react6.useState)(null);
  (0, import_react6.useEffect)(() => {
    if (!wikiTitle) {
      setWiki(null);
      return;
    }
    let cancelled = false;
    setWiki({ loading: true });
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`).then((r) => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    }).then((j) => {
      if (!cancelled) setWiki({ loading: false, j });
    }).catch((err) => {
      if (!cancelled) setWiki({ loading: false, error: err.message });
    });
    return () => {
      cancelled = true;
    };
  }, [wikiTitle]);
  const occArr = [...occ2].sort();
  const missing = req.filter((c) => !occ2.has(c));
  const readableNow = !req.length ? true : missing.length === 0;
  const probsAll = (() => {
    if (!tl || !req.length) return null;
    const pct = tl.onDays.length / tl.n * 100;
    return pct;
  })();
  return /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "controls", style: { marginBottom: 14 } }, /* @__PURE__ */ import_react6.default.createElement("button", { onClick: onBack, title: "Back to the Reader list" }, "\u25C0 back to Reader"), /* @__PURE__ */ import_react6.default.createElement("span", { className: "pill" }, "single reading"), /* @__PURE__ */ import_react6.default.createElement("span", { className: "muted", style: { fontSize: ".82rem" } }, "sky on ", displayDate(date))), /* @__PURE__ */ import_react6.default.createElement("h1", { style: { margin: "0 0 2px" } }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "he", style: { fontSize: "1.9rem" } }, w.disp), " ", /* @__PURE__ */ import_react6.default.createElement("span", { style: { color: "var(--dim)", fontSize: ".95rem" } }, "\xB7 ", w.translit)), /* @__PURE__ */ import_react6.default.createElement("div", { className: "sub", style: { marginBottom: 14 } }, w.gloss), /* @__PURE__ */ import_react6.default.createElement("div", { className: "grid2", style: { alignItems: "start" } }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "panel", style: { padding: 14 } }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "muted", style: { marginBottom: 8, fontSize: ".8rem" } }, readableNow ? /* @__PURE__ */ import_react6.default.createElement("span", { style: { color: "var(--green)" } }, "\u25CF readable on ", displayDate(date), " \u2014 all required simples occupied") : /* @__PURE__ */ import_react6.default.createElement("span", { style: { color: "var(--red)" } }, "\u25CB not readable on ", displayDate(date), " \u2014 missing: ", /* @__PURE__ */ import_react6.default.createElement("b", { style: { color: "var(--gold)" } }, missing.join(" ")))), /* @__PURE__ */ import_react6.default.createElement(SkyMap, { rows: rows2, occ: occ2, hl: req.length ? new Set(req) : null }), /* @__PURE__ */ import_react6.default.createElement("div", { className: "legend" }, "Gold sectors = the simple (zodiac) letters this word needs. Blue = occupied today but not required by this word.")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "panel", style: { padding: 16 } }, /* @__PURE__ */ import_react6.default.createElement("h3", { style: { marginTop: 0 } }, "Gloss"), /* @__PURE__ */ import_react6.default.createElement("table", null, /* @__PURE__ */ import_react6.default.createElement("tbody", null, /* @__PURE__ */ import_react6.default.createElement("tr", null, /* @__PURE__ */ import_react6.default.createElement("th", null, "Hebrew"), /* @__PURE__ */ import_react6.default.createElement("td", null, /* @__PURE__ */ import_react6.default.createElement("span", { className: "he", style: { fontSize: "1.8rem" } }, w.disp))), /* @__PURE__ */ import_react6.default.createElement("tr", null, /* @__PURE__ */ import_react6.default.createElement("th", null, "Transliteration"), /* @__PURE__ */ import_react6.default.createElement("td", null, /* @__PURE__ */ import_react6.default.createElement("b", null, w.translit))), /* @__PURE__ */ import_react6.default.createElement("tr", null, /* @__PURE__ */ import_react6.default.createElement("th", null, "Gloss"), /* @__PURE__ */ import_react6.default.createElement("td", null, w.gloss)), /* @__PURE__ */ import_react6.default.createElement("tr", null, /* @__PURE__ */ import_react6.default.createElement("th", null, "Part of speech"), /* @__PURE__ */ import_react6.default.createElement("td", null, w.pos || "\u2014")), /* @__PURE__ */ import_react6.default.createElement("tr", null, /* @__PURE__ */ import_react6.default.createElement("th", null, "Length"), /* @__PURE__ */ import_react6.default.createElement("td", null, w.len, " consonants")), /* @__PURE__ */ import_react6.default.createElement("tr", null, /* @__PURE__ */ import_react6.default.createElement("th", null, "Gematria"), /* @__PURE__ */ import_react6.default.createElement("td", null, /* @__PURE__ */ import_react6.default.createElement("b", { style: { color: "var(--gold)" } }, w.gem), w.m37 && /* @__PURE__ */ import_react6.default.createElement("span", { style: { color: "var(--green)" } }, " \xB7 multiple of 37"))), /* @__PURE__ */ import_react6.default.createElement("tr", null, /* @__PURE__ */ import_react6.default.createElement("th", null, "Simple letters"), /* @__PURE__ */ import_react6.default.createElement("td", null, w.simp ? /* @__PURE__ */ import_react6.default.createElement("span", { style: { color: "var(--blue)" } }, [...w.simp].join(" ")) : /* @__PURE__ */ import_react6.default.createElement("span", { style: { color: "var(--violet)" } }, "none (always readable)"))), /* @__PURE__ */ import_react6.default.createElement("tr", null, /* @__PURE__ */ import_react6.default.createElement("th", null, "Badges"), /* @__PURE__ */ import_react6.default.createElement("td", null, w.pal && /* @__PURE__ */ import_react6.default.createElement("span", { className: "pill", style: { color: "var(--gold)", borderColor: "var(--gold)" } }, "palindrome"), w.m37 && /* @__PURE__ */ import_react6.default.createElement("span", { className: "pill ok" }, "\xD737"), w.angelName && /* @__PURE__ */ import_react6.default.createElement("span", { className: "pill", style: { color: "var(--violet)", borderColor: "var(--violet)" } }, "angel name"), w.name && /* @__PURE__ */ import_react6.default.createElement("span", { className: "pill", style: { color: "var(--blue)", borderColor: "var(--blue)" } }, "proper name", w.theo ? " (theophoric)" : ""), w.compound && /* @__PURE__ */ import_react6.default.createElement("span", { className: "pill", style: { color: "var(--warn)", borderColor: "var(--warn)" } }, "compound"), !w.pal && !w.m37 && !w.angelName && !w.name && !w.compound && /* @__PURE__ */ import_react6.default.createElement("span", { className: "muted" }, "\u2014"))), w.angelName && /* @__PURE__ */ import_react6.default.createElement("tr", null, /* @__PURE__ */ import_react6.default.createElement("th", null, "Angel"), /* @__PURE__ */ import_react6.default.createElement("td", { style: { color: "var(--violet)" } }, w.angelName.en, " ", /* @__PURE__ */ import_react6.default.createElement("span", { style: { color: "var(--dim)" } }, "\xB7 ", w.angelName.src))), w.angel && /* @__PURE__ */ import_react6.default.createElement("tr", null, /* @__PURE__ */ import_react6.default.createElement("th", null, "Shem triplet"), /* @__PURE__ */ import_react6.default.createElement("td", null, "+", /* @__PURE__ */ import_react6.default.createElement("span", { className: "he", style: { fontSize: ".95rem" } }, w.angel.el), " \xB7 +", /* @__PURE__ */ import_react6.default.createElement("span", { className: "he", style: { fontSize: ".95rem" } }, w.angel.yh))))))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "panel", style: { marginTop: 14, padding: 16 } }, /* @__PURE__ */ import_react6.default.createElement("h3", { style: { marginTop: 0 } }, "Year legibility \u2014 when ", w.disp, " is readable in ", genData2 ? genData2.year : "the scanned year"), /* @__PURE__ */ import_react6.default.createElement("div", { className: "muted", style: { marginBottom: 10, fontSize: ".82rem" } }, "Each cell = one day of the scanned Predictor year (computed from astronomy-engine, not hardcoded). ", /* @__PURE__ */ import_react6.default.createElement("span", { style: { color: "var(--gold)" } }, "gold"), " = the required simples are all occupied that day (S\u2286O); ", /* @__PURE__ */ import_react6.default.createElement("span", { style: { color: "var(--green)" } }, "green outline"), " = ", displayDate(date), ".", req.length === 0 && " This word has no simple letters, so it is always readable \u2014 every day is gold."), tl ? /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "tl", role: "img", "aria-label": `${w.translit}: ${tl.onDays.length} readable days in ${genData2.year}` }, Array.from({ length: tl.n }, (_, i) => {
    const on = tl.daySet.has(i);
    return /* @__PURE__ */ import_react6.default.createElement("div", { key: i, className: "d" + (on ? " on" : "") + (i === tl.curDoy ? " cur" : ""), title: `${genData2.year}-${String(i + 1).padStart(3, "0")} (day ${i + 1})${on ? " \xB7 readable" : ""}${i === tl.curDoy ? " \xB7 current" : ""}` });
  })), /* @__PURE__ */ import_react6.default.createElement("div", { className: "legend" }, req.length === 0 ? /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, "every day \xB7 ", tl.n, " days") : /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, tl.onDays.length, " of ", tl.n, " days (", probsAll != null ? probsAll.toFixed(probsAll < 1 ? 1 : 0) : "?", "%) \xB7 first ", tl.onDays.length ? displayDate(fmtDate(makeDate(genData2.year, 1, 1 + tl.onDays[0]))) : "\u2014", " \xB7 last ", tl.onDays.length ? displayDate(fmtDate(makeDate(genData2.year, 1, 1 + tl.onDays[tl.onDays.length - 1]))) : "\u2014"))) : /* @__PURE__ */ import_react6.default.createElement("div", { className: "muted" }, "Run the Predictor scan for this year to see the day-by-day timeline.")), wikiTitle && /* @__PURE__ */ import_react6.default.createElement("div", { className: "panel", style: { marginTop: 14, padding: 16 } }, /* @__PURE__ */ import_react6.default.createElement("h3", { style: { marginTop: 0 } }, "Wikipedia \u2014 ", wikiTitle), wiki3 && wiki3.loading && /* @__PURE__ */ import_react6.default.createElement("div", { className: "muted" }, "Looking up ", wikiTitle, " on Wikipedia\u2026"), wiki3 && wiki3.error && /* @__PURE__ */ import_react6.default.createElement("div", { className: "muted", style: { color: "var(--red)" } }, "No Wikipedia article found for \u201C", wikiTitle, "\u201D (", wiki3.error, ")."), wiki3 && wiki3.j && /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, wiki3.j.type === "disambiguation" ? /* @__PURE__ */ import_react6.default.createElement("div", { className: "muted" }, "\u201C", wiki3.j.title, "\u201D is a disambiguation page \u2014 see ", /* @__PURE__ */ import_react6.default.createElement("a", { href: wiki3.j.content_urls?.desktop?.page, target: "_blank", rel: "noreferrer" }, "Wikipedia"), " for the list of meanings.") : /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("div", { style: { display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" } }, wiki3.j.thumbnail && /* @__PURE__ */ import_react6.default.createElement("img", { src: wiki3.j.thumbnail.source, alt: wiki3.j.title, style: { maxWidth: 160, maxHeight: 200, borderRadius: 8, border: "1px solid var(--line)" } }), /* @__PURE__ */ import_react6.default.createElement("div", { style: { flex: "1 1 320px" } }, wiki3.j.description && /* @__PURE__ */ import_react6.default.createElement("div", { className: "muted", style: { marginBottom: 6 } }, wiki3.j.description), /* @__PURE__ */ import_react6.default.createElement("div", null, wiki3.j.extract), /* @__PURE__ */ import_react6.default.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ import_react6.default.createElement("a", { href: wiki3.j.content_urls?.desktop?.page, target: "_blank", rel: "noreferrer" }, "Read more on Wikipedia \u2192")))))), !wiki3 && /* @__PURE__ */ import_react6.default.createElement("div", { className: "muted" }, "Preparing Wikipedia lookup\u2026")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "note", style: { marginTop: 14 } }, "This single-reading page is a shareable deep link: ", /* @__PURE__ */ import_react6.default.createElement("code", null, typeof window !== "undefined" ? window.location.href : ""), ". The sky map, gloss and year timeline are computed live from astronomy-engine planet positions; the Wikipedia panel (shown for proper and angel names) is the free Wikipedia REST summary API."));
}

// src/Footer.jsx
var import_react7 = __toESM(require_react());
var GITHUB = "https://github.com/VABISMO/adam-apocalypse";
var PAPER = "https://adam-apocalypse-paper.onrender.com/";
function Col({ title, children }) {
  return /* @__PURE__ */ import_react7.default.createElement("section", { className: "ft-col" }, /* @__PURE__ */ import_react7.default.createElement("h4", { className: "ft-h" }, title), children);
}
function L({ href, children, ext = false }) {
  return /* @__PURE__ */ import_react7.default.createElement("a", { className: "ft-a", href, ...ext ? { target: "_blank", rel: "noreferrer" } : {} }, children);
}
function Footer() {
  const year = 2026;
  return /* @__PURE__ */ import_react7.default.createElement("footer", { className: "site-footer" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "ft-grid" }, /* @__PURE__ */ import_react7.default.createElement(Col, { title: "The Apocalypse of Adam" }, /* @__PURE__ */ import_react7.default.createElement("p", { className: "ft-blurb" }, "Hebrew letters read in the sky. Real planet positions (astronomy-engine) map the 12 zodiac signs to the 12 simple letters of the Sefer Yetzirah, so every date spells a set of readable names \u2014 the stellar alphabet behind the paper."), /* @__PURE__ */ import_react7.default.createElement(L, { href: PAPER, ext: true }, "The paper \u2014 The Reader of the Sky \u2197"), /* @__PURE__ */ import_react7.default.createElement(L, { href: GITHUB, ext: true }, "Source on GitHub \u2197")), /* @__PURE__ */ import_react7.default.createElement(Col, { title: "Hub pages" }, /* @__PURE__ */ import_react7.default.createElement(L, { href: "/prophets" }, "Prophets timeline \u2014 Adam to Jacob Frank"), /* @__PURE__ */ import_react7.default.createElement(L, { href: "/mages" }, "Magi timeline \u2014 Daniel to Felipe II"), /* @__PURE__ */ import_react7.default.createElement(L, { href: "/alignments" }, "Stellar alignments (171 fiches)"), /* @__PURE__ */ import_react7.default.createElement(L, { href: "/readings" }, "Sky readings (6045 glosses)"), /* @__PURE__ */ import_react7.default.createElement(L, { href: "/" }, "Sky reader app")), /* @__PURE__ */ import_react7.default.createElement(Col, { title: "Data & sources" }, /* @__PURE__ */ import_react7.default.createElement(L, { href: "https://github.com/cosinekitty/astronomy-engine", ext: true }, "astronomy-engine \u2014 ephemerides \u2197"), /* @__PURE__ */ import_react7.default.createElement(L, { href: "https://en.wikipedia.org/wiki/Sefer_Yetirah", ext: true }, "Sefer Yetzirah \u2014 the frame \u2197"), /* @__PURE__ */ import_react7.default.createElement(L, { href: "https://github.com/openscriptures/HebrewLexicon", ext: true }, "Strong Hebrew lexicon \u2197"), /* @__PURE__ */ import_react7.default.createElement(L, { href: "/angels72.json" }, "72 Shem HaMephorash angels (JSON)"), /* @__PURE__ */ import_react7.default.createElement(L, { href: "/alignments.json" }, "Rare alignments dataset (JSON)")), /* @__PURE__ */ import_react7.default.createElement(Col, { title: "For search & AI" }, /* @__PURE__ */ import_react7.default.createElement(L, { href: "/sitemap.xml" }, "Sitemap index"), /* @__PURE__ */ import_react7.default.createElement(L, { href: "/llms.txt" }, "llms.txt \u2014 guide for LLMs"), /* @__PURE__ */ import_react7.default.createElement(L, { href: "/robots.txt" }, "robots.txt"), /* @__PURE__ */ import_react7.default.createElement(L, { href: "/site.webmanifest" }, "Web app manifest"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "ft-note" }, "This page exposes ", /* @__PURE__ */ import_react7.default.createElement("b", null, "WebMCP"), " tools (read_sky, alignment_metrics, word_gloss, search_words, gematria_value, prophet_info, mage_info) for browser AI agents via ", /* @__PURE__ */ import_react7.default.createElement("code", null, "document.modelContext"), "."))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "ft-bottom" }, /* @__PURE__ */ import_react7.default.createElement("span", null, "\xA9 ", year, " V. Nos & Julian S. \xB7 The Apocalypse of Adam"), /* @__PURE__ */ import_react7.default.createElement("span", { className: "ft-sep" }, "\xB7"), /* @__PURE__ */ import_react7.default.createElement("span", null, "Hebrew letters in the stars \xB7 Sefer Yetzirah stellar alphabet")));
}

// scripts/prerender.jsx
var import_meta = {};
var __here = typeof __dirname !== "undefined" ? __dirname : import_node_path.default.dirname((0, import_node_url.fileURLToPath)(import_meta.url));
function findWeb(start) {
  let dir = start;
  for (let i = 0; i < 6; i++) {
    if (import_node_fs.default.existsSync(import_node_path.default.join(dir, "index.html")) && import_node_fs.default.existsSync(import_node_path.default.join(dir, "lexicon.json"))) return dir;
    dir = import_node_path.default.dirname(dir);
  }
  return import_node_path.default.resolve(__here, "..");
}
var WEB = findWeb(__here);
var OUT = WEB;
var SITE = "https://adam-apocalypse.onrender.com";
var REF_DATE = "2026-08-08";
var SIGN_ES2EN = {
  Aries: "Aries",
  Tauro: "Taurus",
  G\u00E9minis: "Gemini",
  C\u00E1ncer: "Cancer",
  Leo: "Leo",
  Virgo: "Virgo",
  Libra: "Libra",
  Escorpio: "Scorpio",
  Sagitario: "Sagittarius",
  Capricornio: "Capricorn",
  Acuario: "Aquarius",
  Piscis: "Pisces"
};
var ERA_ES2EN = { Piscis: "Pisces", Acuario: "Aquarius", Capricornio: "Capricorn", Sagitario: "Sagittarius", Escorpio: "Scorpio", Libra: "Libra", Virgo: "Virgo", Leo: "Leo", C\u00E1ncer: "Cancer", G\u00E9minis: "Gemini", Tauro: "Taurus", Aries: "Aries" };
var signEN = (s) => SIGN_ES2EN[s] || ERA_ES2EN[s] || s;
var lexicon = JSON.parse(import_node_fs.default.readFileSync(import_node_path.default.join(WEB, "lexicon.json"), "utf8"));
var angels = JSON.parse(import_node_fs.default.readFileSync(import_node_path.default.join(WEB, "angels72.json"), "utf8"));
var alignments = JSON.parse(import_node_fs.default.readFileSync(import_node_path.default.join(WEB, "alignments.json"), "utf8"));
var LEX = lexicon.lexicon;
var angelMap = (() => {
  const m = /* @__PURE__ */ new Map();
  angels.triplets.forEach((t, i) => m.set(norm(t), { el: angels.angelsEL[i], yh: angels.angelsYH[i] }));
  return m;
})();
function scanYear(y) {
  const nDays = y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0) ? 366 : 365;
  const dayOccs = [];
  for (let i = 0; i < nDays; i++) {
    const ds = fmtDate(makeDate(y, 1, 1 + i));
    dayOccs.push(occupiedLetters(skyAt(ds)));
  }
  return { year: y, dayOccs };
}
var genData = scanYear(2026);
var rows = skyAt(REF_DATE);
var occ = occupiedLetters(rows);
var indexHtml = import_node_fs.default.readFileSync(import_node_path.default.join(WEB, "index.html"), "utf8");
var CSS = (indexHtml.match(/<style>([\s\S]*?)<\/style>/) || ["", ""])[1];
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function shell({ title, desc, keywords, path: routePath, jsonld, body }) {
  const url = SITE + routePath;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='5' fill='%230b0e14'/%3E%3Cpath d='M12 2 L14.6 8.6 L22 9.3 L16.3 14.1 L18.2 21.3 L12 17.3 L5.8 21.3 L7.7 14.1 L2 9.3 L9.4 8.6 Z' fill='%23e8c87a'/%3E%3C/svg%3E" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#0b0e14" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}" />
<meta name="keywords" content="${esc(keywords)}" />
<meta name="author" content="V. Nos &amp; Julian S." />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="${esc(url)}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${esc(url)}" />
<meta property="og:site_name" content="The Apocalypse of Adam" />
<meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(desc)}" />
<script type="application/ld+json">
${jsonld}
</script>
<style>
${CSS}
</style>
</head>
<body>
<div id="root">${body}</div>
<script type="module" src="/app.bundle.js"></script>
</body>
</html>
`;
}
function writeHtml(relPath, html) {
  const full = import_node_path.default.join(OUT, relPath);
  import_node_fs.default.mkdirSync(import_node_path.default.dirname(full), { recursive: true });
  import_node_fs.default.writeFileSync(full, html);
}
var R = (el) => (0, import_server.renderToStaticMarkup)(el);
var jsonldWebApp = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "The Apocalypse of Adam \u2014 Hebrew Sky Reader",
  description: "Reads Hebrew words written in the sky: real planet positions map the 12 zodiac signs to the 12 simple letters of the Sefer Yetzirah.",
  applicationCategory: "ScienceApplication",
  operatingSystem: "Web",
  url: SITE,
  author: [{ "@type": "Person", name: "V. Nos" }, { "@type": "Person", name: "Julian S." }],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
});
writeHtml("prophets/index.html", shell({
  title: "Prophets timeline \u2014 Adam to Jacob Frank | Apocalypse of Adam",
  desc: "A chronology of prophetic and revelatory figures from Adam through the biblical prophets, the apocalyptic writers, and the Sabbatean\u2013Frankist thread, ending at Jacob Frank (1726\u20131791).",
  keywords: "prophets timeline, Adam to Jacob Frank, biblical prophets, apocalyptic writers, Sabbateanism, Frankism, revelation chronology, merkabah mysticism, Apocalypse of Adam",
  path: "/prophets",
  jsonld: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", name: "Prophets \u2014 Adam to Jacob Frank", url: SITE + "/prophets" }),
  body: R(/* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement(ProphetsPage, null), /* @__PURE__ */ import_react8.default.createElement(Footer, null)))
}));
writeHtml("mages/index.html", shell({
  title: "Magi timeline \u2014 Daniel to Felipe II | Apocalypse of Adam",
  desc: "A chronology of magi and royal-sage occult figures from the Babylonian court magi (Daniel, Shadrach, Meshach, Abednego) through Ramon Llull, Alfonso X and Felipe II, with Wikipedia bios and a ficha of their works.",
  keywords: "magi timeline, Daniel magi, Shadrach Meshach Abednego, Ramon Llull Ars Magna, Alfonso X, Felipe II, Christian Kabbalah, Hermeticism, Renaissance magic, Apocalypse of Adam",
  path: "/mages",
  jsonld: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", name: "Magi \u2014 Daniel to Felipe II", url: SITE + "/mages" }),
  body: R(/* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement(MagesPage, null), /* @__PURE__ */ import_react8.default.createElement(Footer, null)))
}));
function AlignmentsIndex() {
  const rowsA = alignments.scanA;
  return /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("h1", null, "Stellar alignments \u2014 rare century & millennium conjunctions"), /* @__PURE__ */ import_react8.default.createElement("p", { className: "muted" }, "Every rare stellar alignment from a 10-body scan (Sun, Moon, 8 planets): the planets concentrated in a single zodiac sign, with the tightest enclosing arc and the precessional era. ", rowsA.length, " alignments. Each links to its fiche with a sky map, alignment metrics, and the top readable Hebrew names."), /* @__PURE__ */ import_react8.default.createElement("table", { style: { width: "100%", fontSize: ".86rem" } }, /* @__PURE__ */ import_react8.default.createElement("thead", null, /* @__PURE__ */ import_react8.default.createElement("tr", null, ["Date", "Max in one sign", "Sign", "Span (\xB0)", "Era", "Fiche"].map((h, i) => /* @__PURE__ */ import_react8.default.createElement("th", { key: i, style: { textAlign: i === 0 || i === 5 ? "left" : "right", padding: "4px 8px" } }, h)))), /* @__PURE__ */ import_react8.default.createElement("tbody", null, rowsA.map((e, i) => /* @__PURE__ */ import_react8.default.createElement("tr", { key: i }, /* @__PURE__ */ import_react8.default.createElement("td", { style: { padding: "4px 8px" } }, e.date), /* @__PURE__ */ import_react8.default.createElement("td", { style: { padding: "4px 8px", textAlign: "right" } }, e.maxInSign), /* @__PURE__ */ import_react8.default.createElement("td", { style: { padding: "4px 8px" } }, signEN(e.sign)), /* @__PURE__ */ import_react8.default.createElement("td", { style: { padding: "4px 8px", textAlign: "right" }, className: "deg" }, e.span.toFixed(1)), /* @__PURE__ */ import_react8.default.createElement("td", { style: { padding: "4px 8px" } }, signEN(e.era)), /* @__PURE__ */ import_react8.default.createElement("td", { style: { padding: "4px 8px" } }, /* @__PURE__ */ import_react8.default.createElement("a", { href: `/align/${e.date}` }, "view fiche \u2192")))))));
}
writeHtml("alignments/index.html", shell({
  title: "Stellar alignments \u2014 rare century & millennium conjunctions | Apocalypse of Adam",
  desc: "All rare stellar alignments (planets concentrated in one zodiac sign): dates, tightest arc, precessional era, and the readable names of each alignment day.",
  keywords: "stellar alignments, planetary conjunctions, rare astronomy, zodiac concentration, precession, tightest arc, 10-body conjunction, Hebrew sky reading, Apocalypse of Adam",
  path: "/alignments",
  jsonld: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", name: "Stellar alignments", url: SITE + "/alignments", numberOfItems: alignments.scanA.length }),
  body: R(/* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement(AlignmentsIndex, null), /* @__PURE__ */ import_react8.default.createElement(Footer, null)))
}));
function ReadingsIndex() {
  return /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("h1", null, "Sky readings \u2014 Hebrew words readable in the stars"), /* @__PURE__ */ import_react8.default.createElement("p", { className: "muted" }, "Every consonantal Hebrew root in the lexicon (", LEX.length, " entries) has a reading fiche: its Hebrew letters, transliteration, gloss, gematria, the zodiac simple letters it requires, and its year-legibility timeline. Each links to its single-reading page."), /* @__PURE__ */ import_react8.default.createElement("div", { className: "tcards" }, LEX.map((row, i) => {
    const [cons, trans, gloss, pos] = row;
    const enc = encodeURIComponent(cons);
    return /* @__PURE__ */ import_react8.default.createElement("a", { key: i, href: `/reader/${enc}`, className: "tcard", style: { textDecoration: "none", display: "block" } }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "the" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "he", style: { fontSize: "1.3rem" } }, cons)), /* @__PURE__ */ import_react8.default.createElement("div", { className: "read" }, trans), /* @__PURE__ */ import_react8.default.createElement("div", { className: "trans" }, gloss), /* @__PURE__ */ import_react8.default.createElement("div", { className: "g muted", style: { fontSize: ".78rem" } }, pos || "\u2014"));
  })));
}
writeHtml("readings/index.html", shell({
  title: "Sky readings \u2014 Hebrew words readable in the stars | Apocalypse of Adam",
  desc: "Every Hebrew word readable from the zodiac signs occupied by the planets: a glossary of consonantal roots, gematria, and the stellar letters that spell each name.",
  keywords: "Hebrew readings, sky reading glossary, consonantal roots, Hebrew gematria, zodiac simple letters, Sefer Yetzirah, 72 angels, lexicon, Apocalypse of Adam",
  path: "/readings",
  jsonld: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", name: "Sky readings", url: SITE + "/readings", numberOfItems: LEX.length }),
  body: R(/* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement(ReadingsIndex, null), /* @__PURE__ */ import_react8.default.createElement(Footer, null)))
}));
var nAlign = 0;
for (const e of alignments.scanA) {
  const date = e.date;
  const meta = (() => {
    const r = skyAt(date);
    const bs = bySign(r);
    let best = null;
    for (const [sg, list] of Object.entries(bs)) if (!best || list.length > best.list.length) best = { sign: sg, list };
    const lons = r.map((x) => x.lon);
    const s = [...lons].sort((a, b) => a - b);
    let maxGap = 0;
    for (let i = 1; i < s.length; i++) maxGap = Math.max(maxGap, s[i] - s[i - 1]);
    maxGap = Math.max(maxGap, s[0] + 360 - s[s.length - 1]);
    const span = 360 - maxGap;
    const year = parseInt(date.slice(0, 4), 10) || 2026;
    return { maxInSign: best ? best.list.length : 0, nBodies: r.length, sign: best ? best.sign : "\u2014", span, era: eraForYear(year) };
  })();
  const title = `Stellar alignment ${displayDate(date)} \u2014 rare planet conjunction | Apocalypse of Adam`;
  const desc = `The stellar alignment of ${displayDate(date)}: ${meta.maxInSign} of ${meta.nBodies} bodies in ${meta.sign}, tightest arc ${meta.span.toFixed(1)}\xB0, precessional era ${meta.era}, and the top Hebrew names readable in that sky.`;
  const keywords = `stellar alignment ${date}, planet conjunction ${meta.sign}, ${meta.sign} conjunction, tightest arc, precessional era ${meta.era}, Hebrew sky reading, Apocalypse of Adam`;
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Stellar alignment ${displayDate(date)}`,
    startDate: date,
    description: desc,
    url: SITE + `/align/${date}`,
    location: { "@type": "Place", name: `Zodiac sign ${meta.sign}` }
  });
  const body = R(import_react8.default.createElement(AlignmentFicha, { date, lex: lexicon, angelMap, onBack: () => {
  } }));
  writeHtml(`align/${date}/index.html`, shell({ title, desc, keywords, path: `/align/${date}`, jsonld, body }));
  nAlign++;
}
var nGloss = 0;
for (const row of LEX) {
  const he = row[0];
  const w = findWord(he, LEX, angelMap);
  if (!w) continue;
  const trans = w.translit || "";
  const gloss = w.gloss || "";
  const title = `${trans} \xB7 ${gloss} \u2014 Hebrew sky-reading | Apocalypse of Adam`;
  const desc = `${trans} (${w.disp}, \u201C${gloss}\u201D): ${w.len} Hebrew letters, gematria ${w.gem}, the zodiac simple letters it requires, and its year-legibility timeline.`;
  const keywords = `${trans}, ${gloss}, Hebrew ${w.disp}, gematria ${w.gem}, ${w.len} letters, zodiac simple letters, sky reading, Sefer Yetzirah, Apocalypse of Adam`;
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: trans,
    description: gloss,
    url: SITE + `/reader/${encodeURIComponent(he)}`,
    inDefinedTermSet: "Hebrew Sky-Reading Lexicon"
  });
  const body = R(import_react8.default.createElement(GlossPage, { word: w, date: REF_DATE, rows, occ, genData, onBack: () => {
  } }));
  writeHtml(`reader/${he}/index.html`, shell({ title, desc, keywords, path: `/reader/${encodeURIComponent(he)}`, jsonld, body }));
  nGloss++;
}
var today = "2026-08-10";
function urlEntry(loc, changefreq = "monthly", priority = "0.5") {
  return `  <url><loc>${esc(loc)}</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}
var sAlign = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...alignments.scanA.map((e) => urlEntry(`${SITE}/align/${e.date}`, "monthly", "0.7")),
  "</urlset>"
].join("\n");
import_node_fs.default.writeFileSync(import_node_path.default.join(OUT, "sitemap_alignments.xml"), sAlign);
var sRead = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...LEX.map((row) => urlEntry(`${SITE}/reader/${encodeURIComponent(row[0])}`, "monthly", "0.5")),
  "</urlset>"
].join("\n");
import_node_fs.default.writeFileSync(import_node_path.default.join(OUT, "sitemap_readings.xml"), sRead);
var sIndex = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  `  <sitemap><loc>${SITE}/sitemap_alignments.xml</loc><lastmod>${today}</lastmod></sitemap>`,
  `  <sitemap><loc>${SITE}/sitemap_readings.xml</loc><lastmod>${today}</lastmod></sitemap>`,
  "</sitemapindex>"
].join("\n");
import_node_fs.default.writeFileSync(import_node_path.default.join(OUT, "sitemap.xml"), sIndex);
var sHub = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urlEntry(`${SITE}/`, "weekly", "1.0"),
  urlEntry(`${SITE}/prophets`, "monthly", "0.8"),
  urlEntry(`${SITE}/mages`, "monthly", "0.8"),
  urlEntry(`${SITE}/alignments`, "monthly", "0.8"),
  urlEntry(`${SITE}/readings`, "monthly", "0.8"),
  "</urlset>"
].join("\n");
import_node_fs.default.writeFileSync(import_node_path.default.join(OUT, "sitemap_hub.xml"), sHub);
import_node_fs.default.writeFileSync(
  import_node_path.default.join(OUT, "robots.txt"),
  `User-agent: *
Allow: /
Sitemap: ${SITE}/sitemap.xml
Sitemap: ${SITE}/sitemap_alignments.xml
Sitemap: ${SITE}/sitemap_readings.xml
Sitemap: ${SITE}/sitemap_hub.xml
`
);
var llmsTxt = `# The Apocalypse of Adam

> Hebrew letters read in the sky. Real planet positions (astronomy-engine) map the 12 zodiac signs to the 12 simple letters of the Sefer Yetzirah, so every date spells a set of readable Hebrew names. A stellar-alphabet reader and calculator suite (gematria, 72 angels, ELS/Torah codes, Temurah, Ziruph, rare planetary alignments, Psalms-by-date) behind the paper "The Reader of the Sky".

## Pages
- [Sky reader app](${SITE}/) \u2014 interactive calculators (11 tabs: Cycles, Sky Map, Reader, Reading, Time, Gematria, Sigils, Revelations, Psalms, Codes, Methodology)
- [Prophets timeline \u2014 Adam to Jacob Frank](${SITE}/prophets)
- [Magi timeline \u2014 Daniel to Felipe II](${SITE}/mages)
- [Stellar alignments](${SITE}/alignments) \u2014 171 rare-alignment fiches (/align/<date>)
- [Sky readings](${SITE}/readings) \u2014 6045 Hebrew gloss fiches (/reader/<he>)

## Machine-readable
- [llms-full.txt](${SITE}/llms-full.txt) \u2014 full site description + WebMCP tool catalogue
- [sitemap.xml](${SITE}/sitemap.xml) \u2014 index to all URLs (171 alignments + 6045 glosses)
- [robots.txt](${SITE}/robots.txt)
- [site.webmanifest](${SITE}/site.webmanifest)
- JSON datasets: [/alignments.json](${SITE}/alignments.json) \xB7 [/lexicon.json](${SITE}/lexicon.json) \xB7 [/angels72.json](${SITE}/angels72.json)

## Notes
- This site exposes WebMCP tools (document.modelContext) for browser AI agents: read_sky, alignment_metrics, word_gloss, search_words, gematria_value, prophet_info, mage_info. See llms-full.txt for schemas.
- Authors: V. Nos & Julian S. Source: https://github.com/VABISMO/adam-apocalypse
- Paper: https://adam-apocalypse-paper.onrender.com/
`;
import_node_fs.default.writeFileSync(import_node_path.default.join(OUT, "llms.txt"), llmsTxt);
var llmsFull = `# The Apocalypse of Adam \u2014 full site description for LLMs

> Hebrew letters read in the sky: real planet positions (astronomy-engine) map the 12 zodiac signs to the 12 simple letters of the Sefer Yetzirah, so every date spells a set of readable Hebrew names. The reuse rule S\u2286O (a word's required simple letters must be among the signs occupied by the planets) decides what is readable on each date. This is the live computational engine behind the paper "The Reader of the Sky".

## What it does
For any Gregorian date (BCE supported as -YYYY-MM-DD), the app computes the geocentric ecliptic longitudes of the 10 bodies (Sun, Moon, Mercury\u2013Neptune, Pluto), maps each to a zodiac sign, and reads the corresponding Sefer Yetzirah simple letter (Aries\u2192Heh, Taurus\u2192Vav, \u2026 Pisces\u2192Qoph). The set of occupied letters O is the "alphabet" of the sky that day; any Hebrew word whose simple letters are a subset of O is "readable" that day. Rare stellar alignments (most planets concentrated in one sign) are catalogued as rare readings.

## Hub pages
- [Sky reader app](${SITE}/) \u2014 11 tabs: Cycles (Alignments/Saros/Ayanamsa/Lunar-Solar/Week), Sky Map, Reader (glossary + per-word ficha), Reading (Reading Rule / YHVH / Genesis 1:1), Time (Predictor / Ages), Gematria (Hebrew/Greek/Arabic/Indian + Aiq Bekar), Sigils (Sigil Forge / Kameot / 72 Angels), Revelations (9 cultures), Psalms (by date), Codes (ELS / Temurah / Ziruph), Methodology.
- [Prophets](${SITE}/prophets) \u2014 33 prophetic/revelatory figures Adam \u2192 Jacob Frank (biblical, apocalyptic, mystical, Sabbatean-Frankist), with a timeline.
- [Magi](${SITE}/mages) \u2014 24 magi and royal-sage figures (Daniel, Shadrach, Meshach, Abednego \u2192 Ramon Llull \u2192 Alfonso X \u2192 Felipe II), each with a Wikipedia-grounded biography and a ficha of their most important works.
- [Stellar alignments](${SITE}/alignments) \u2014 index of 171 rare century/millennium conjunctions; each fiche at /align/<date> has a sky map, alignment metrics (max-in-sign, tightest arc, era), and the top readable names.
- [Sky readings](${SITE}/readings) \u2014 index of all 6045 consonantal Hebrew roots; each gloss fiche at /reader/<he> has the Hebrew letters, transliteration, gloss, gematria, required simple letters, and a year-legibility timeline.

## WebMCP tools (document.modelContext.registerTool)
Available to browser AI agents when the API is present (Chrome origin trial). All wrap the same pure compute core the UI uses.
1. read_sky \u2014 input {date} \u2192 occupied signs, readable simples, era, Genesis-legible, top readable names.
2. alignment_metrics \u2014 input {date} \u2192 max-in-sign, sign, tightest arc (\xB0), era, occupied signs, bodies-per-sign.
3. word_gloss \u2014 input {hebrew} \u2192 transliteration, gloss, part of speech, gematria, required simple letters, is-name, is-angel.
4. search_words \u2014 input {query, max?} \u2192 lexicon entries matching transliteration/gloss/Hebrew.
5. gematria_value \u2014 input {text, system?: hebrew|greek|arabic|katapayadi} \u2192 numeric value + per-letter breakdown.
6. prophet_info \u2014 input {name?} \u2192 prophet entry (years, region, role, thread) or the full list of 33.
7. mage_info \u2014 input {name?} \u2192 mage biography + works ficha, or the full list of 24.

## JSON datasets
- /alignments.json \u2014 rare-alignment scan (scanA 10-body 1700\u20132200, scanB 7-classical -1000\u20132200).
- /lexicon.json \u2014 6045 consonantal Hebrew roots (Strong, OpenScriptures) with transliteration, gloss, POS.
- /angels72.json \u2014 72 Shem HaMephorash triplets from Exodus 14:19-21 with angel names (EL/YH).

## Sources
- Ephemerides: astronomy-engine (https://github.com/cosinekitty/astronomy-engine)
- Frame: Sefer Yetzirah (https://en.wikipedia.org/wiki/Sefer_Yetirah)
- Lexicon: Strong Hebrew lexicon (https://github.com/openscriptures/HebrewLexicon)
- Paper: https://adam-apocalypse-paper.onrender.com/
- Source: https://github.com/VABISMO/adam-apocalypse
- Authors: V. Nos & Julian S.
`;
import_node_fs.default.writeFileSync(import_node_path.default.join(OUT, "llms-full.txt"), llmsFull);
var ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='5' fill='%230b0e14'/%3E%3Cpath d='M12 2 L14.6 8.6 L22 9.3 L16.3 14.1 L18.2 21.3 L12 17.3 L5.8 21.3 L7.7 14.1 L2 9.3 L9.4 8.6 Z' fill='%23e8c87a'/%3E%3C/svg%3E";
var manifest = {
  name: "The Apocalypse of Adam \u2014 Hebrew Sky Reader",
  short_name: "Apocalypse of Adam",
  description: "Reads Hebrew words written in the sky: real planet positions map the 12 zodiac signs to the 12 simple letters of the Sefer Yetzirah.",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#0b0e14",
  theme_color: "#0b0e14",
  lang: "en",
  categories: ["science", "education", "reference"],
  icons: [
    { src: ICON, sizes: "192x192 512x512", type: "image/svg+xml", purpose: "any" }
  ]
};
import_node_fs.default.writeFileSync(import_node_path.default.join(OUT, "site.webmanifest"), JSON.stringify(manifest, null, 2));
console.log(`prerender done: ${nAlign} alignment fiches, ${nGloss} gloss fiches, 4 hub pages, sitemaps + robots.txt + llms.txt + llms-full.txt + site.webmanifest`);
/**
    @preserve

    Astronomy library for JavaScript (browser and Node.js).
    https://github.com/cosinekitty/astronomy

    MIT License

    Copyright (c) 2019-2023 Don Cross <cosinekitty@gmail.com>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/
/**
 * @fileoverview Astronomy calculation library for browser scripting and Node.js.
 * @author Don Cross <cosinekitty@gmail.com>
 * @license MIT
 */
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server-legacy.node.production.min.js:
  (**
   * @license React
   * react-dom-server-legacy.node.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server.node.production.min.js:
  (**
   * @license React
   * react-dom-server.node.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server-legacy.node.development.js:
  (**
   * @license React
   * react-dom-server-legacy.node.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server.node.development.js:
  (**
   * @license React
   * react-dom-server.node.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
