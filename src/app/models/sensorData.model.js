const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const sensorDataSchema = new mongoose.Schema(
  {
    sensorId: String,

    userId: String,

    location: {
      type: {
        type: String,
        enum: 'Point',
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        // default: [0, 0]
      },
    },
  },
  {
    collection: 'sensorData',
  }
);

sensorDataSchema.plugin(timestamps);
sensorDataSchema.index({ loc: '2dsphere' });

const sensorDataModel = mongoose.model('sensorData', sensorDataSchema);

export default sensorDataModel;
