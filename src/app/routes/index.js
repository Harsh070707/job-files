// import { Router } from 'express';
const { Router } = require('express');
const router = Router();

// const router = Router();
const sensorController = require('../controllers/sensorData.controller');

// router.use('/material-types', materialTypesRoutes);

router.get('/sensorData', sensorController.getData);
router.post('/receivedLocation', sensorController.postData);
router.post('/receivedIndividualLocation', sensorController.getIndividualData);
router.post('/stopIndividualData', sensorController.stopIndividualData);

module.exports = router;
