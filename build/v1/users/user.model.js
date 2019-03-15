"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _db = _interopRequireDefault(require("../helpers/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User(_ref) {
    var firstName = _ref.firstName,
        lastName = _ref.lastName,
        email = _ref.email,
        hash = _ref.hash,
        mobileNumber = _ref.mobileNumber;

    _classCallCheck(this, User);

    this.id = _uuid.default.v4();
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.hash = hash;
    this.mobileNumber = mobileNumber;
    this.createdAt = new Date();
    this.contacts = [];
    this.messages = [];
  }

  _createClass(User, [{
    key: "save",
    value: function save() {
      return _db.default.users.push(this);
    }
  }], [{
    key: "getUser",
    value: function getUser(_ref2) {
      var email = _ref2.email;
      var index = 0;
      var found = false;
      var foundUser;

      while (index < _db.default.users.length && !found) {
        var user = _db.default.users[index];

        if (user.email === email) {
          found = true;
          foundUser = user;
        }

        index += 1;
      }

      return foundUser;
    }
  }, {
    key: "getUserById",
    value: function getUserById(id) {
      var index = 0;
      var found = false;
      var foundUser;

      while (index < _db.default.users.length && !found) {
        var user = _db.default.users[index];

        if (user.id === id) {
          found = true;
          foundUser = user;
        }

        index += 1;
      }

      return foundUser;
    }
  }]);

  return User;
}();

exports.default = User;