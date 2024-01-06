const express = require('express');
const router = express.Router();

const { getLogout } = require('../controllers/logout.js');

router.route('/')
  .get(getLogout);

module.exports = router;