'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invalidHeaderError = require('./invalid-header-error');

var _invalidHeaderError2 = _interopRequireDefault(_invalidHeaderError);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// lol dis
var body = /((?:[a-zA-Z0-9._~+\/-]+=*(?:\s+|$))|[^\u0000-\u001F\u007F()<>@,;:\\"/?={}\[\]\u0020\u0009]+)(?:=([^\\"=\s,]+|"(?:[^"\\]|\\.)*"))?/g; // eslint-disable-line

var normalize = function normalize(prev, _cur) {
  // Fixup quoted strings and tokens with spaces around them
  var cur = _cur.charAt(0) === '"' ? (0, _util.unquote)(_cur) : _cur.trim();

  // Marshal
  if (Array.isArray(prev)) {
    return prev.concat(cur);
  } else if (prev) {
    return [prev, cur];
  }
  return cur;
};

var parseProperties = function parseProperties(scheme, string) {
  var res = null;
  var token = null;
  var params = {};

  while ((res = body.exec(string)) !== null) {
    if (res[2]) {
      params[res[1]] = normalize(params[res[1]], res[2]);
    } else {
      token = normalize(token, res[1]);
    }
  }

  return { scheme: scheme, params: params, token: token };
};

exports.default = function (str) {
  if (typeof str !== 'string') {
    throw new _invalidHeaderError2.default('Header value must be a string.');
  }

  var start = str.indexOf(' ');
  var scheme = str.substr(0, start);

  if (!(0, _util.isScheme)(scheme)) {
    throw new _invalidHeaderError2.default('Invalid scheme ' + scheme);
  }

  return parseProperties(scheme, str.substr(start));
};
//# sourceMappingURL=parse.js.map