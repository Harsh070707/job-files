'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var sensorDataModel = require('../models/sensorData.model');

var mqtt = require('mqtt');

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
            res.status(status_codes.OK).send(Response.sendResponse(status_codes.OK, 'Sensor data get successfully', data, []));
            _context.next = 13;
            break;

          case 9:
            _context.next = 11;
            return sensorDataModel.find({});

          case 11:
            _data = _context.sent;

            // console.log("data ::", data)
            res.status(status_codes.OK).send(Response.sendResponse(status_codes.OK, 'Sensor data get successfully', _data, []));

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

module.exports.postData = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, userId, userName, mobile, latitude, longitude, data;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, userId = _req$body.userId, userName = _req$body.userName, mobile = _req$body.mobile, latitude = _req$body.latitude, longitude = _req$body.longitude;
            _context2.next = 4;
            return sensorDataModel.updateOne({ userId: userId }, {
              $set: {
                sensorId: 'sensor/1',
                location: {
                  coordinates: [longitude, latitude]
                },
                userName: userName,
                mobile: mobile,
                currentDate: new Date()
              }
            }, { upsert: true }, function (err) {
              if (err) {
                console.log('Error: ', err);
                res.status(status_codes.INTERNAL_SERVER_ERROR).send(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, 'Internal server error', [], err));
              } else {
                console.log('Data inserted or updated successfully!');
                res.status(status_codes.OK).send(Response.sendResponse(status_codes.OK, 'Data inserted or updated successfully!', []));
              }
            });

          case 4:
            data = _context2.sent;
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            console.log('Error :-', _context2.t0);
            res.status(status_codes.INTERNAL_SERVER_ERROR).send(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, 'Internal server error ', [], _context2.t0));

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports.getIndividualData = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var userId, options, client;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = req.body.userId;

            // const options = {
            //   host: 'e7b542b57fdc42a1bc7824cb068164f2.s2.eu.hivemq.cloud',
            //   port: 8883,
            //   protocol: 'mqtts',
            //   username: 'harsh.bansal110@gmail.com',
            //   password: 'spqJnmmbSUTPB4!',
            // };

            options = {
              clientId: 'dharmesh',
              Username: 'cedalo',
              Password: '0dfTYEF90nAd9kNK8IEr'
            };
            client = mqtt.connect('mqtt://test.mosquitto.org', options);

            // client.on('connect', () => {
            //   console.log('Connection established successfully!');
            //   client.subscribe('sensor/1');
            // });

            // // client.on('close', () => {
            // //     console.log("connection closed");
            // // })

            // client.on('error', (error) => {
            //   console.log('error :-', error);
            // });

            // const client = mqtt.connect(options);

            client.on('connect', function () {
              console.log('Connection established successfully of MQTT!');
              setInterval(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var data, obj;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return sensorDataModel.findOne({ userId: userId });

                      case 2:
                        data = _context3.sent;
                        obj = JSON.stringify({
                          sensorId: 1,
                          userId: data.userId,
                          location: data.location,
                          address: data.mobile,
                          userName: data.userName,
                          currentDate: data.currentDate
                        });


                        client.publish('sensor/1', obj);
                        console.log(JSON.stringify(obj));

                      case 6:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              })), 7000);
            });

            client.on('error', function (error) {
              console.error('MQTT connection error:', error);
              process.exit(1);
            });

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();