'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bcrypt = require('bcrypt-nodejs');

var jsonwebtoken = require('jsonwebtoken');

var AuthUtil = function () {
  function AuthUtil() {
    _classCallCheck(this, AuthUtil);
  }

  _createClass(AuthUtil, null, [{
    key: 'encryptPassword',
    value: function encryptPassword(password) {
      var salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : bcrypt.genSaltSync(10);

      return bcrypt.hashSync(password, salt);
    }
  }, {
    key: 'comparePassword',
    value: function comparePassword(password, hash) {
      return bcrypt.compareSync(password, hash);
    }
  }, {
    key: 'signJWT',
    value: function signJWT(payload) {
      console.log('payload :-----', payload);
      var opts = {
        expiresIn: '7d'
        // expiresIn: "30000"
      };

      return jsonwebtoken.sign(payload, config.JWTSecret, opts);
    }
  }]);

  return AuthUtil;
}();

exports.default = AuthUtil;