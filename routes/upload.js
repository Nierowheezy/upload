const router = require('express').Router();
const uploadController = require('../controllers/upload');

const storage = require('../lib/multer');

router.post('/upload', storage.single('video'), uploadController.uploadVideo);

module.exports = router;
