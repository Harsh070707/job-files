'use strict';

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var sensorDataSchema = new mongoose.Schema({
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

sensorDataSchema.plugin(timestamps);
sensorDataSchema.index({ loc: '2dsphere' });

var sensorDataModel = mongoose.model('sensorData', sensorDataSchema);

module.exports = sensorDataModel;