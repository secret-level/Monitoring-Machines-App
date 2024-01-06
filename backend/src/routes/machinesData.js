const express = require('express');
const router = express.Router();

const { postMachinesData } = require('../controllers/machinesData.js');

router.route('/')
  .post(postMachinesData);

module.exports = router;