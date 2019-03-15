"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = _interopRequireDefault(require("./user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv.default.config();

function authenticate(_x) {
  return _authenticate.apply(this, arguments);
}

function _authenticate() {
  _authenticate = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var email, password, user, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = _ref.email, password = _ref.password;
            _context.next = 3;
            return _user.default.getUser({
              email: email
            });

          case 3:
            user = _context.sent;

            if (!(user && _bcrypt.default.compareSync(password, user.hash))) {
              _context.next = 7;
              break;
            }

            token = _jsonwebtoken.default.sign({
              email: email
            }, process.env.JWT_KEY, {
              expiresIn: '12h'
            });
            return _context.abrupt("return", {
              token: token
            });

          case 7:
            return _context.abrupt("return", user);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _authenticate.apply(this, arguments);
}

function create(_x2) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(userParam) {
    var newUser, user, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user.default.getUser({
              email: userParam.email
            });

          case 2:
            if (!_context2.sent) {
              _context2.next = 4;
              break;
            }

            throw new Error("email \"".concat(userParam.email, "\" is already taken"));

          case 4:
            newUser = _objectSpread({}, userParam);
            newUser.hash = _bcrypt.default.hashSync(userParam.password, 10);
            user = new _user.default(newUser); // save user

            _context2.next = 9;
            return user.save();

          case 9:
            token = _jsonwebtoken.default.sign({
              email: userParam.email
            }, process.env.JWT_KEY, {
              expiresIn: '12h'
            });
            return _context2.abrupt("return", {
              token: token
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _create.apply(this, arguments);
}

function update(_x3, _x4) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(id, userParam) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user.default.getUserById(id);

          case 2:
            user = _context3.sent;

            if (user) {
              _context3.next = 5;
              break;
            }

            throw new Error('User not found');

          case 5:
            _context3.t0 = user.email !== userParam.email;

            if (!_context3.t0) {
              _context3.next = 10;
              break;
            }

            _context3.next = 9;
            return _user.default.getUser({
              email: userParam.email
            });

          case 9:
            _context3.t0 = _context3.sent;

          case 10:
            if (!_context3.t0) {
              _context3.next = 12;
              break;
            }

            throw new Error("Email \"".concat(userParam.email, "\" is already taken"));

          case 12:
            // hash password if it was entered
            if (userParam.password) {
              // eslint-disable-next-line no-param-reassign
              userParam.hash = _bcrypt.default.hashSync(userParam.password, 10);
            }

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _update.apply(this, arguments);
}

function getUserById(_x5) {
  return _getUserById.apply(this, arguments);
}

function _getUserById() {
  _getUserById = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(id) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _user.default.getUserById(id);

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getUserById.apply(this, arguments);
}

var _default = {
  create: create,
  update: update,
  authenticate: authenticate,
  getUserById: getUserById
};
exports.default = _default;