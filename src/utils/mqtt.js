// // const mqtt = require('mqtt');
// // const sensorDataModel = require('../app/models/sensorData.model');
// // const options = {
// //   clientId: 'dharmesh',
// //   Username: 'cedalo',
// //   Password: '0dfTYEF90nAd9kNK8IEr',
// // };
// // const client = mqtt.connect('mqtt://test.mosquitto.org', options);

// // client.on('connect', () => {
// //   console.log('Connection established successfully!');
// //   client.subscribe('sensor/1');
// // });

// // // client.on('close', () => {
// // //     console.log("connection closed");
// // // })

// // client.on('error', (error) => {
// //   console.log('error :-', error);
// // });

// // client.on('message', (topic, data) => {
// //   try {
// //     console.log('topic :', topic);
// //     console.log('data', JSON.parse(data));
// //     const topicData = JSON.parse(data);
// //     sensorDataModel.updateOne(
// //       { userId: topicData.user },
// //       {
// //         sensorId: topic,
// //         location: {
// //           coordinates: [topicData.long, topicData.lati],
// //         },
// //         userId: topicData.user,
// //       },
// //       { upsert: true },
// //       (err) => {
// //         if (err) {
// //           console.log('Error: ', err);
// //         } else {
// //           console.log('Data inserted or updated successfully!');
// //         }
// //       }
// //     );
// //   } catch (err) {
// //     console.log('error ::', err);
// //   }
// // });

// const mqtt = require('mqtt');

// // const options = {
// //   host: 'e7b542b57fdc42a1bc7824cb068164f2.s2.eu.hivemq.cloud',
// //   port: 8883,
// //   protocol: 'mqtts',
// //   username: 'harsh.bansal110@gmail.com',
// //   password: 'spqJnmmbSUTPB4!',
// // };

// // const client = mqtt.connect(options);
// const client = mqtt.connect('mqtt://broker.hivemq.com');

// // const options = {
// //   clientId: 'dharmesh',
// //   Username: 'cedalo',
// //   Password: '0dfTYEF90nAd9kNK8IEr',
// // };
// // const client = mqtt.connect('mqtt://test.mosquitto.org', options);

// client.on('connect', () => {
//   setInterval(() => {
//     let msg = 'message from publisher';
//     console.log(msg);
//     let msgs = 'hey';
//     client.publish('assetsasa', msgs);
//   }, 5000);
// });

// // client.on('connect', () => {
// //   client.subscribe('asset');
// //   console.log('received publisher successfully');
// // });

// // client.on('message', (topic, data) => {
// //   console.log(123);
// //   console.log(data.toString());
// // });
