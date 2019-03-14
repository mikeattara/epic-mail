"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("./user.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authenticate(req, res, next) {
  _user.default.authenticate(req.body).then(function (user) {
    return user ? res.status(202).send(user) : res.status(400).json({
      error: 'Username or password is incorrect'
    });
  }).catch(function (err) {
    return next(err);
  });
}

function register(req, res, next) {
  _user.default.create(req.body).then(function (data) {
    return res.status(201).send(data);
  }).catch(function (err) {
    return next(err);
  });
}

function getById(req, res, next) {
  _user.default.getUserById(req.params.id).then(function (user) {
    return user ? res.json(user) : res.sendStatus(404);
  }).catch(function (err) {
    return next(err);
  });
}

function update(req, res, next) {
  _user.default.update(req.params.id, req.body).then(function () {
    return res.json({});
  }).catch(function (err) {
    return next(err);
  });
}

var _default = {
  update: update,
  getById: getById,
  register: register,
  authenticate: authenticate
};
exports.default = _default;