// import 'babel-polyfill';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const cors= require( 'cors');
const environment = require('../environment');
const mongoose = require('./config/mongoose');
const error = require('./middlewares/error');
const routes = require('./app/routes/');
const path = require('path');
// require('./config/user.passport')(passport));
const mqtt = require('./utils/mqtt');
const sensorDataModel = require('./app/models/sensorData.model');

const cors = require('cors');
// getting application environment
const env = process.env.NODE_ENV;
// getting application config based on environment
const envConfig = environment[env];

// setting port value
const PORT = envConfig.port || 3000;
/**
 * Express instance
 * @public
 */
const app = express();

// Custom middleware to redirect HTTP to HTTPS
// app.use((req, res, next) => {
//   // Check if the request is over HTTPS
//   if (!req.secure) {
//     // Redirect to the equivalent HTTPS URL
//     return res.redirect(`https://${req.headers.host}${req.url}`);
//   }
//   next();
// });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors());
// app.options('*', cors());

if (!global.status_codes) global.status_codes = require('./utils/statusCode');

if (!global.custom_message) global.custom_message = require('./config/message');

if (!global.Response) global.Response = require('./utils/responce');

if (!global.config) global.config = require('./config/config');

// open mongoose connection
mongoose.connect(envConfig, env);

// request logging. dev: console | production: file
app.use(morgan(envConfig.logs));

app.use(
  bodyParser.json({
    limit: '50mb',
  })
);

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  })
);

// app.use(bodyParser.multipart());
app.use(express.static(path.join(__dirname, '/public')));

// CORS configuration
// app.use(cors({ 'origin': '*' }));

app.get('/check123', (req, res) => {
  // console.log("in request ",req)
  res
    .status(status_codes.OK)
    .send(
      Response.sendResponse(
        status_codes.OK,
        'Server is good now !!!!!!',
        [],
        []
      )
    );
});

// mount api routes
app.use('/', routes);
// if error is not an instanceOf APIError, convert it.
app.use(error.converter);
// app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJson));
// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);
//
// app.use(passport.initialize());

app.listen(PORT, () => {
  console.log('server listen on port:-', PORT);
});

//app.listen(PORT);
module.exports = app;
