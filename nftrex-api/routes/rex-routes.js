const express = require('express');
const rexControllers = require('../controllers/rex-controllers');

const router = express.Router();

router.get('/account/:accountId', rexControllers.getRexByAccount);

module.exports = router;