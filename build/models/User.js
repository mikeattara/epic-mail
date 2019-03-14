"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  /**
   * class constructor
   * @param {object} data
   */
  function User() {
    _classCallCheck(this, User);

    this.users = [];
  }
  /**
   * @param {object} user object
   * @returns {object} user object
   */


  _createClass(User, [{
    key: "signup",
    value: function signup(data) {
      var newUser = {
        id: _uuid.default.v4(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        createdDate: _moment.default.now()
      };
      this.users.push(newUser);
      return {
        status: 201,
        data: [{
          token: newUser.id
        }]
      };
    }
    /**
     *
     * @param {object} user object
     * @returns {boolean} true/false
     */

  }, {
    key: "login",
    value: function login(data) {
      var valid = this.users.find(function (user) {
        return user.email === data.email && user.password === data.password;
      });

      if (valid) {
        var user = this.users.filter(function (u) {
          return u.email === data.email;
        })[0];
        return {
          status: 200,
          data: [{
            token: user.id
          }]
        };
      }

      return {
        status: 404,
        error: 'Invalid user'
      };
    }
  }]);

  return User;
}();

var _default = new User();

exports.default = _default;