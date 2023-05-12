'use strict';

var _mqtt = require('mqtt');

var _mqtt2 = _interopRequireDefault(_mqtt);

var _sensorData = require('../app/models/sensorData.model');

var _sensorData2 = _interopRequireDefault(_sensorData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  // clientId: 'dharmesh',
  // Username: 'cedalo',
  // Password: '0dfTYEF90nAd9kNK8IEr'
};
var client = _mqtt2.default.connect('mqtt://test.mosquitto.org', options);

client.on('connect', function () {
  console.log('Connection established successfully!');
  client.subscribe('sensor/1');
});

// client.on('close', () => {
//     console.log("connection closed");
// })

client.on('error', function (error) {
  console.log('error :-', error);
});

client.on('message', function (topic, data) {
  try {
    console.log('topic :', topic);
    console.log('data', JSON.parse(data));
    var topicData = JSON.parse(data);
    _sensorData2.default.updateOne({ userId: topicData.user }, {
      sensorId: topic,
      location: {
        coordinates: [topicData.long, topicData.lati]
      },
      userId: topicData.user
    }, { upsert: true }, function (err) {
      if (err) {
        console.log('Error: ', err);
      } else {
        console.log('Data inserted or updated successfully!');
      }
    });
  } catch (err) {
    console.log('error ::', err);
  }
});