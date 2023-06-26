const sensorDataModel = require('../models/sensorData.model');

const mqtt = require('mqtt');

// Create a dictionary to store the interval IDs for each user
const intervals = {};

module.exports.getData = async (req, res) => {
  try {
    const { userId } = req.body;
    if (userId) {
      const data = await sensorDataModel.findOne({ userId: userId });
      // console.log("data ::", data)
      res
        .status(status_codes.OK)
        .send(
          Response.sendResponse(
            status_codes.OK,
            'Sensor data get successfully',
            data,
            []
          )
        );
    } else {
      const data = await sensorDataModel.find({});
      // console.log("data ::", data)
      res
        .status(status_codes.OK)
        .send(
          Response.sendResponse(
            status_codes.OK,
            'Sensor data get successfully',
            data,
            []
          )
        );
    }
  } catch (err) {
    console.log('Error :-', err);
    res
      .status(status_codes.INTERNAL_SERVER_ERROR)
      .send(
        Response.sendResponse(
          status_codes.INTERNAL_SERVER_ERROR,
          'Internal server error ',
          [],
          err
        )
      );
  }
};

module.exports.postData = async (req, res) => {
  try {
    const { userId, userName, mobile, latitude, longitude } = req.body;

    const data = await sensorDataModel.updateOne(
      { userId: userId },
      {
        $set: {
          sensorId: 'sensor/1',
          location: {
            coordinates: [longitude, latitude],
          },
          userName: userName,
          mobile: mobile,
          currentDate: new Date(),
        },
      },
      { upsert: true },
      (err) => {
        if (err) {
          console.log('Error: ', err);
          res
            .status(status_codes.INTERNAL_SERVER_ERROR)
            .send(
              Response.sendResponse(
                status_codes.INTERNAL_SERVER_ERROR,
                'Internal server error',
                [],
                err
              )
            );
        } else {
          console.log('Data inserted or updated successfully!');
          res
            .status(status_codes.OK)
            .send(
              Response.sendResponse(
                status_codes.OK,
                'Data inserted or updated successfully!',
                []
              )
            );
        }
      }
    );
  } catch (err) {
    console.log('Error :-', err);
    res
      .status(status_codes.INTERNAL_SERVER_ERROR)
      .send(
        Response.sendResponse(
          status_codes.INTERNAL_SERVER_ERROR,
          'Internal server error ',
          [],
          err
        )
      );
  }
};

module.exports.getIndividualData = async (req, res) => {
  const { userId } = req.body;

  // const options = {
  //   host: 'e7b542b57fdc42a1bc7824cb068164f2.s2.eu.hivemq.cloud',
  //   port: 8883,
  //   protocol: 'mqtts',
  //   username: 'harsh.bansal110@gmail.com',
  //   password: 'spqJnmmbSUTPB4!',
  // };

  // const options = {
  //   clientId: 'dharmesh',
  //   Username: 'cedalo',
  //   Password: '0dfTYEF90nAd9kNK8IEr',
  // };

  // const client = mqtt.connect('mqtt://test.mosquitto.org', options);
  const client = mqtt.connect('mqtt://broker.hivemq.com');

  client.on('connect', () => {
    console.log('Connection established successfully of MQTT!');
    intervals[userId] = setInterval(async function () {
      const data = await sensorDataModel.findOne({ userId: userId });

      const obj = JSON.stringify({
        sensorId: 1,
        userId: data.userId,
        location: data.location,
        address: data.mobile,
        userName: data.userName,
        currentDate: data.currentDate,
      });

      console.log('obj ::::', obj);
      client.publish('sensor/3', obj);
      console.log('Message Sent');
    }, 7000);
  });

  client.on('error', (error) => {
    console.error('MQTT connection error:', error);
    process.exit(1);
  });

  // Send success response
  res
    .status(200)
    .json({ message: 'MQTT updates started successfully for the user' });
};

// API endpoint to stop MQTT updates for a user
module.exports.stopIndividualData = async (req, res) => {
  const { userId } = req.body;

  // Check if an interval is running for the user
  if (!intervals[userId]) {
    return res
      .status(400)
      .json({ message: 'No MQTT updates running for this user' });
  }

  // Clear the interval for the user and close the MQTT client
  clearInterval(intervals[userId]);
  delete intervals[userId];

  res
    .status(200)
    .json({ message: 'MQTT updates stopped successfully for the user' });
};
