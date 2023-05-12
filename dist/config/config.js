'use strict';

var _environment = require('../../environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var envConfig = _environment2.default[process.env.NODE_ENV];

module.exports = {
    JWTSecret: 'livetracke',
    JWTExpireTime: "1 days",
    resetPasswordTokenExpireTime: Date.now() + 3600000,
    emailVerifyTokenExpireTime: Date.now() + 3600000
};