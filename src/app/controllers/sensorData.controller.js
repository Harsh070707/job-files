const sensorDataModel = require('../models/sensorData.model');
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
            'Sensor data get sucessfully',
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
            'Sensor data get sucessfully',
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
        sensorId: 'sensor/1',
        location: {
          coordinates: [longitude, latitude],
        },
        userId: userId,
        userName: userName,
        mobile: mobile,
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
