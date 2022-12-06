const express =  require('express');
const router = express.Router();
const deviceController = require('../controller/device.controller');


router.post('/', deviceController.updateData);
router.get('/', deviceController.getDevice);

module.exports = router;