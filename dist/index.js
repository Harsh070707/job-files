'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _environment = require('../environment');

var _environment2 = _interopRequireDefault(_environment);

var _mongoose = require('./config/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _error = require('./middlewares/error');

var _error2 = _interopRequireDefault(_error);

var _routes = require('./app/routes/');

var _routes2 = _interopRequireDefault(_routes);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mqtt = require('./utils/mqtt');

var _mqtt2 = _interopRequireDefault(_mqtt);

var _sensorData = require('./app/models/sensorData.model');

var _sensorData2 = _interopRequireDefault(_sensorData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require('./config/user.passport')(passport);
// import 'babel-polyfill';
var cors = require('cors');
// getting application environment

// import cors from 'cors';
var env = process.env.NODE_ENV;
// getting application config based on environment
var envConfig = _environment2.default[env];

// setting port value
var PORT = envConfig.port || 3000;
/**
 * Express instance
 * @public
 */
var app = (0, _express2.default)();

// Custom middleware to redirect HTTP to HTTPS
// app.use((req, res, next) => {
//   // Check if the request is over HTTPS
//   if (!req.secure) {
//     // Redirect to the equivalent HTTPS URL
//     return res.redirect(`https://${req.headers.host}${req.url}`);
//   }
//   next();
// });

app.use(function (req, res, next) {
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
_mongoose2.default.connect(envConfig, env);

// request logging. dev: console | production: file
app.use((0, _morgan2.default)(envConfig.logs));

app.use(_bodyParser2.default.json({
  limit: '50mb'
}));

app.use(_bodyParser2.default.urlencoded({
  limit: '50mb',
  extended: true
}));

// app.use(bodyParser.multipart());
app.use(_express2.default.static(_path2.default.join(__dirname, '/public')));

// CORS configuration
// app.use(cors({ 'origin': '*' }));

app.get('/check123', function (req, res) {
  // console.log("in request ",req)
  res.status(status_codes.OK).send(Response.sendResponse(status_codes.OK, 'Server is good now !!!!!!', [], []));
});

// mount api routes
app.use('/', _routes2.default);
// if error is not an instanceOf APIError, convert it.
app.use(_error2.default.converter);
// app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJson));
// catch 404 and forward to error handler
app.use(_error2.default.notFound);

// error handler, send stacktrace only during development
app.use(_error2.default.handler);
//
// app.use(passport.initialize());

app.listen(PORT, function () {
  console.log('server listen on port:-', PORT);
});

//app.listen(PORT);
module.exports = app;