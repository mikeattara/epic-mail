"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../users/user.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // user routes


router.post('/login', _user.default.authenticate);
router.post('/signup', _user.default.register);
router.get('/:id', _user.default.getById);
router.put('/:id', _user.default.update);
var _default = router;
exports.default = _default;