const express = require('express');
const streamController = require('../controllers/stream');
// import { checkApiKey } from "../middleware/checkApiKey.js";

const router = express.Router();

router.get('/stream/:id', streamController.streamVideo);

module.exports = router;
