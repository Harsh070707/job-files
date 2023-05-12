'use strict';

var httpStatus = require('http-status');
var APIError = require('../utils/APIError');
var environment = require('../../environment');
var env = process.env.NODE_ENV;

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
var handler = function handler(err, req, res, next) {
  var response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack
  };

  if (env !== 'development') {
    delete response.stack;
  }
  res.status(err.status);
  res.json(response);
  res.end();
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = function (err, req, res, next) {
  var convertedError = new APIError({
    message: err.message || 'Something went wrong',
    status: err.status,
    stack: err.stack,
    errors: err.errors || []
  });

  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = function (req, res, next) {
  var err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND
  });
  return handler(err, req, res);
};