// import {
//     Router
// } from 'express';

const { Router } = require('express');

const router = Router();
const sensorController = require('../controllers/sensorData.controller');

// router.use('/material-types', materialTypesRoutes);

router.get('/sensorData', () => sensorController.get);

module.exports = router;
