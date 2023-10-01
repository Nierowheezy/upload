const router = require('express').Router();
const uploadController = require('../controllers/upload');

const storage = require('../lib/multer');

router.post('/upload', storage.single('video'), uploadController.uploadVideo);
router.post('/startrecording', uploadController.startRecording);
router.post('/sendrecording', uploadController.sendRecording);
router.get('/getallvideos', uploadController.getAllVideos);
router.get('/getvideo/:id', uploadController.getVideo);

module.exports = router;
