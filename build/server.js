"use strict";

var _express = _interopRequireWildcard(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _rootpath = _interopRequireDefault(require("rootpath"));

var _jwt = _interopRequireDefault(require("./v1/helpers/jwt"));

var _errorHandler = _interopRequireDefault(require("./v1/helpers/error-handler"));

var _user = _interopRequireDefault(require("./v1/routes/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

_dotenv.default.config();

(0, _rootpath.default)();
var app = (0, _express.default)();
app.use((0, _express.urlencoded)({
  extended: false
}));
app.use((0, _express.json)());
app.use((0, _cors.default)()); // use JWT auth to secure the api

app.use((0, _jwt.default)()); // api routes

app.use('/api/v1/users', _user.default); // global error handler

app.use(_errorHandler.default); // start server

var port = process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 3001;
app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log("Server listening on port ".concat(port));
});