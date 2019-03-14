"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _user = _interopRequireDefault(require("../users/user.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv.default.config();

function isRevoked(_x, _x2, _x3) {
  return _isRevoked.apply(this, arguments);
}

function _isRevoked() {
  _isRevoked = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, payload, done) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user.default.getUserById(payload.sub);

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", done(null, true));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _isRevoked.apply(this, arguments);
}

function auth() {
  var secret = process.env.JWT_KEY;
  return (0, _expressJwt.default)({
    secret: secret,
    isRevoked: isRevoked
  }).unless({
    path: [// public routes that don't require authentication
    '/api/v1/users/login', '/api/v1/users/signup']
  });
}

var _default = auth;
exports.default = _default;