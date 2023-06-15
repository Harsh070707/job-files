const sensorDataModel = require('../models/sensorData.model');

const mqtt = require('mqtt');

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

  const options = {
    clientId: 'dharmesh',
    Username: 'cedalo',
    Password: '0dfTYEF90nAd9kNK8IEr',
  };

  const client = mqtt.connect('mqtt://test.mosquitto.org', options);

  // const client = mqtt.connect(options);

  client.on('connect', () => {
    console.log('Connection established successfully of MQTT!');
    setInterval(async function () {
      const data = await sensorDataModel.findOne({ userId: userId });

      client.publish('sensor/1', JSON.stringify(data));
      // console.log(JSON.stringify(data));
    }, 7000);
  });

  client.on('error', (error) => {
    console.error('MQTT connection error:', error);
    process.exit(1);
  });
};
