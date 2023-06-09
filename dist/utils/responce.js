"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function () {
    function Response() {
        _classCallCheck(this, Response);
    }

    _createClass(Response, null, [{
        key: "sendResponse",
        value: function sendResponse(code, message, data, error) {
            var response = {};
            response.code = code;
            response.message = message;
            response.data = data;
            response.error = error;
            return response;
        }
    }]);

    return Response;
}();

module.exports = Response;