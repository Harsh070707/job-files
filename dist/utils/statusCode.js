"use strict";

module.exports = function () {
  return {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOTFOUND: 404,
    UNAUTHORISED: 401,
    INTERNAL_SERVER_ERROR: 500,
    ALREADY_EXIST: 409
  };
}();