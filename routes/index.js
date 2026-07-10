const express = require('express');
const router = express.Router();

router.use(require('./auth.routes'));
router.use(require('./db_stuff'));

module.exports = router;
