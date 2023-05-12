'use strict';

var mongoose = require('mongoose');

// set mongoose Promise to Bluebird
mongoose.Promise = global.Promise;

// Exit application on error
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = function (envConfig, env) {
  // print mongoose logs in dev env
  if (env === 'development') {
    mongoose.set('debug', true);
  }
  mongoose.connect('mongodb+srv://root:root@cluster0.htlgenf.mongodb.net/blog?retryWrites=true&w=majority', {
    useNewUrlParser: true
    // useUnifiedTopology: true,
    // useCreateIndex: true
  }).then(function () {
    return console.log('Database connected!');
  });
  return mongoose.connection;
};