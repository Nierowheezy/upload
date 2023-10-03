const multer = require('multer');
const path = require('path');

// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (
//       ext !== '.mp4' &&
//       ext !== '.mkv' &&
//       ext !== '.jpeg' &&
//       ext !== '.jpg' &&
//       ext !== '.png'
//     ) {
//       cb(new Error('File type is not supported'), false);
//       return;
//     }
//     cb(null, true);
//   },
// });

// ---------------------------------------------------------------------------- //

// Video Upload
const videoStorage = multer.diskStorage({
  destination: './public/uploads/videos', // Destination to store video
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports = multer({
  storage: videoStorage,
  limits: {
    fileSize: 500000000, // 50000000 Bytes = 500 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|MPEG-4)$/)) {
      // upload only mp4 and mkv format
      return cb(
        new Error(
          'File type is not supported Please upload a Video with mp4 or MPEG-4'
        )
      );
    }
    cb(undefined, true);
  },
});
