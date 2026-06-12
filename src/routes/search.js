const express = require('express');
const router = express.Router();
const searchController = require('../controller/search');

router.get('/', searchController.index);

module.exports = router;
