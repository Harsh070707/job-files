"use strict";

var _cryptoJs = require("crypto-js");

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crypto = require('crypto');


module.exports.encryptStringWithRsaPublicKey = function (toEncrypt, PublicKey) {
    console.log("PublicKey :-", PublicKey);
    var buffer = Buffer.from(toEncrypt);
    var encrypted = _crypto.publicEncrypt(PublicKey, buffer);
    return encrypted.toString("base64");
};

module.exports.decryptStringWithRsaPrivateKey = function (toDecrypt, PrivateKey) {
    var buffer = Buffer.from(toDecrypt, "base64");
    var decrypted = _crypto.privateDecrypt(PrivateKey, buffer);
    return decrypted.toString("utf8");
};

module.exports.hash = function (password) {
    return _cryptoJs2.default.SHA512(password).toString().toUpperCase();
};