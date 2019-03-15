"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({
      error: err.message
    });
  }

  if (err.name === 'ValidationError') {
    // mongoose validation error
    return res.status(400).json({
      error: err.message
    });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({
      error: 'Invalid Token'
    });
  } // default to 500 server error


  return res.status(500).json({
    error: err.message
  });
}

var _default = errorHandler;
exports.default = _default;