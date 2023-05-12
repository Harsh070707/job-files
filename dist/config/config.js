'use strict';

var environment = require('../../environment');
var envConfig = environment[process.env.NODE_ENV];

module.exports = {
  JWTSecret: 'livetracke',
  JWTExpireTime: '1 days',
  resetPasswordTokenExpireTime: Date.now() + 3600000,
  emailVerifyTokenExpireTime: Date.now() + 3600000
};