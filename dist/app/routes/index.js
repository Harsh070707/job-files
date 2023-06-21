'use strict';

// import { Router } from 'express';
var _require = require('express'),
    Router = _require.Router;

var router = Router();

// const router = Router();
var sensorController = require('../controllers/sensorData.controller');

// router.use('/material-types', materialTypesRoutes);

router.get('/sensorData', sensorController.getData);
router.post('/receivedLocation', sensorController.postData);
router.get('/receivedIndividualLocation', sensorController.getIndividualData);

module.exports = router;