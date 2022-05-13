const { sendPalmas } = require('./email.controller');
const router = require('express').Router();

router.post('/', sendPalmas);

module.exports = router;