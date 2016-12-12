'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _util = require('./util');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var xxx = function xxx(key) {
  return function (value) {
    return key + '=' + (value && !(0, _util.isToken)(value) ? (0, _util.quote)(value) : value);
  };
};

var build = function build(params) {
  return params.reduce(function (prev, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        values = _ref2[1];

    var transform = xxx(key);
    if (!(0, _util.isToken)(key)) {
      throw new TypeError();
    }
    if (Array.isArray(values)) {
      return [].concat(_toConsumableArray(prev), _toConsumableArray(values.map(transform)));
    }
    return [].concat(_toConsumableArray(prev), [transform(values)]);
  }, []);
};

var challenge = function challenge(params, options) {
  if (Array.isArray(params)) {
    return build(params);
  } else if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
    return challenge(Object.keys(params).map(function (key) {
      return [key, params[key]];
    }), options);
  }
  throw new TypeError();
};

exports.default = function (scheme, token, params) {
  var obj = typeof scheme === 'string' ? { scheme: scheme, token: token, params: params } : scheme;

  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    throw new TypeError();
  } else if (!(0, _util.isScheme)(obj.scheme)) {
    throw new TypeError('Invalid scheme.');
  }

  return [obj.scheme].concat(_toConsumableArray(typeof obj.token !== 'undefined' ? [obj.token] : []), _toConsumableArray(typeof obj.params !== 'undefined' ? challenge(obj.params) : [])).join(' ');
};
//# sourceMappingURL=format.js.map