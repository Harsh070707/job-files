'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sensorDataSchema = new _mongoose2.default.Schema({
  sensorId: String,

  userId: String,

  location: {
    type: {
      type: String,
      enum: 'Point',
      default: 'Point'
    },
    coordinates: {
      type: [Number]
      // default: [0, 0]
    }
  }
}, {
  collection: 'sensorData'
});

sensorDataSchema.plugin(_mongooseTimestamp2.default);
sensorDataSchema.index({ loc: '2dsphere' });

var sensorDataModel = _mongoose2.default.model('sensorData', sensorDataSchema);

exports.default = sensorDataModel;