const express = require('express');
const router = express.Router();

const { getMachines } = require('../controllers/machines.js');

router.route('/')
  .get(getMachines);

module.exports = router;