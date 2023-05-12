'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var sensorDataModel = require('../models/sensorData.model');
module.exports.getData = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var userId, data, _data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userId = req.body.userId;

            if (!userId) {
              _context.next = 9;
              break;
            }

            _context.next = 5;
            return sensorDataModel.findOne({ userId: userId });

          case 5:
            data = _context.sent;

            // console.log("data ::", data)
            res.status(status_codes.OK).send(Response.sendResponse(status_codes.OK, 'Sensor data get sucessfully', data, []));
            _context.next = 13;
            break;

          case 9:
            _context.next = 11;
            return sensorDataModel.find({});

          case 11:
            _data = _context.sent;

            // console.log("data ::", data)
            res.status(status_codes.OK).send(Response.sendResponse(status_codes.OK, 'Sensor data get sucessfully', _data, []));

          case 13:
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);

            console.log('Error :-', _context.t0);
            res.status(status_codes.INTERNAL_SERVER_ERROR).send(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, 'Internal server error ', [], _context.t0));

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();