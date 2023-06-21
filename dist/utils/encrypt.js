'use strict';

var _crypto = require('crypto');
var CryptoJS = require('crypto-js');

module.exports.encryptStringWithRsaPublicKey = function (toEncrypt, PublicKey) {
  console.log('PublicKey :-', PublicKey);
  var buffer = Buffer.from(toEncrypt);
  var encrypted = _crypto.publicEncrypt(PublicKey, buffer);
  return encrypted.toString('base64');
};

module.exports.decryptStringWithRsaPrivateKey = function (toDecrypt, PrivateKey) {
  var buffer = Buffer.from(toDecrypt, 'base64');
  var decrypted = _crypto.privateDecrypt(PrivateKey, buffer);
  return decrypted.toString('utf8');
};

module.exports.hash = function (password) {
  return CryptoJS.SHA512(password).toString().toUpperCase();
};