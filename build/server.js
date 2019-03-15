'use strict';

var _express = _interopRequireDefault(require('express'));

var _User = _interopRequireDefault(require('./controllers/User'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express.default)();
app.use(_express.default.json());
app.post('/api/v1/user/signup', _User.default.signup);
app.post('/api/v1/user/login', _User.default.login);
app.listen();
