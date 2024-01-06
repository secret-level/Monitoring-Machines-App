const express = require('express');
const router = express.Router();

const { getUserSettings } = require('../controllers/userSettings.js');

router.route('/')
  .get(getUserSettings);

module.exports = router;