const express = require('express');
const router = express.Router();

const { postLogin } = require('../controllers/login.js');

router.route('/')
  .post(postLogin);

module.exports = router;