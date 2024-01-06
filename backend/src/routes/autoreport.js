const express = require('express');
const router = express.Router();

const { getAutoreport } = require('../controllers/autoreport.js');

router.route('/')
  .get(getAutoreport);

module.exports = router;