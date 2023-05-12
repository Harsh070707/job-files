"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptNodejs = require("bcrypt-nodejs");

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthUtil = function () {
    function AuthUtil() {
        _classCallCheck(this, AuthUtil);
    }

    _createClass(AuthUtil, null, [{
        key: "encryptPassword",
        value: function encryptPassword(password) {
            var salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _bcryptNodejs2.default.genSaltSync(10);

            return _bcryptNodejs2.default.hashSync(password, salt);
        }
    }, {
        key: "comparePassword",
        value: function comparePassword(password, hash) {
            return _bcryptNodejs2.default.compareSync(password, hash);
        }
    }, {
        key: "signJWT",
        value: function signJWT(payload) {
            console.log("payload :-----", payload);
            var opts = {
                expiresIn: "7d"
                // expiresIn: "30000"
            };

            return _jsonwebtoken2.default.sign(payload, config.JWTSecret, opts);
        }
    }]);

    return AuthUtil;
}();

exports.default = AuthUtil;