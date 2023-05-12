'use strict';

var _express = require('express');

var _sensorData = require('../controllers/sensorData.controller');

var _sensorData2 = _interopRequireDefault(_sensorData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();


// router.use('/material-types', materialTypesRoutes);

router.get('/sensorData', _sensorData2.default.get);

module.exports = router;