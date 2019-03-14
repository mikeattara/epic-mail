"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  login: function login(req, res) {
    if (req.body.email === '' && req.body.password === '') {
      return res.status(400).send({
        message: 'All fields are required'
      });
    }

    var user = _User.default.login(req.body);

    return res.status(201).send(user);
  },

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} reflections array
   */
  signup: function signup(req, res) {
    var user = _User.default.signup(req.body);

    return res.status(201).send(user);
  }
};
var _default = User;
exports.default = _default;