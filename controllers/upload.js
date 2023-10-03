const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

const Upload = require('../models/UploadVideo');
const Session = require('../models/Session');

/***
 * @desc Upload a video
 * @route 4
 * @access public
 *
 */

exports.uploadVideo = async (req, res) => {
  try {
    res.send(req.file);

    var upload = new Upload({
      name: req.file.originalname,
      url: `${process.env.base_url && process.env.base_url}uploads/videos/${
        req.file.filename
      }`,
      fieldname: req.file.fieldname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      destination: req.file.destination,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });

    //save to db

    await upload.save();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

/***
 * @desc Get all videos
 * @route GET /api/v1/getallvideos
 * @access public
 *
 */

exports.getAllVideos = async (req, res) => {
  const data = await Upload.find({});
  if (!data) {
    res.status(404).json({ msg: 'no videos found' });
  }
  res.status(200).json(data);
};

/***
 * @desc Get a video
 * @route GET /api/v1/getvideo/id
 * @access public
 *
 */

exports.getVideo = async (req, res) => {
  if (!req.params.id) {
    res.send('please send an id to find video');
  }
  const data = await Upload.findById(req.params.id);
  res.status(200).json(data);
};

/***
 * @desc record a video
 * @route POST /api/v1/startrecording
 * @access public
 *
 */

exports.startRecording = async (req, res) => {
  //get the video format
  const { mimetype } = req.body;

  if (!mimetype) {
    return res.status(400).json({
      message: 'please send me a mimetype and encoding',
    });
  }

  const session = new Session({
    // encoding,
    mimetype,
  });

  //save to db

  const dbData = await session.save();

  const data = {
    id: dbData._id,
    video: [],
    // encoding: encoding,
    mimetype: mimetype,
  };

  const jsonOutput = JSON.stringify(data, null, 3);
  // write file operations
  await fs.writeFile(
    `inputvideofiles/video_${dbData._id}.json`,
    jsonOutput,
    'utf8'
  );

  // //fetch the file created and send the user the id

  // const obj = await fs.readFile('video.json', 'utf8');
  // const parsedData = JSON.parse(obj);

  // send user temp session video id
  res.json({
    sessionId: dbData._id,
  });
};

// exports.startRecording = async (req, res) => {
//   //get the video format
//   const { videoFormat } = req.body;
//   const data = {
//     id: 1,
//     video: [],
//     format: videoFormat,
//   };

//   const jsonOutput = JSON.stringify(data, null, 3);
//   // write file operations
//   await fs.writeFile('video.json', jsonOutput, 'utf8');

//   //fetch the file created and send the user the id

//   const obj = await fs.readFile('video.json', 'utf8');
//   const parsedData = JSON.parse(obj);

//   res.json({
//     id: parsedData.id,
//   });
// };

/***
 * @desc send a chunks of video
 * @route POST /api/v1/sendrecording
 * @access public
 *
 */

exports.sendRecording = async (req, res) => {
  //get the video format
  const { id, val } = req.body;

  //check if id matches session id

  const sessionId = await Session.findOne({ _id: id });

  if (id !== sessionId.id) {
    return res.json({ msg: 'invalid id' });
  }

  const obj = await fs.readFile(
    `inputvideofiles/video_${sessionId.id}.json`,
    'utf8'
  );

  const parsedData = JSON.parse(obj);

  const valueToPush = parsedData.video;

  //push incoming chunks into the array
  const arrValues = [...valueToPush, val[0].trim()];

  const data = {
    id: parsedData.id,
    video: arrValues,
    mimetype: parsedData.mimetype,
  };

  //write back the file

  const jsonOutput = JSON.stringify(data, null, 3);

  // // write file operations
  await fs.writeFile(
    `inputvideofiles/video_${sessionId.id}.json`,
    jsonOutput,
    'utf8'
  );

  res.json({
    sessionId: sessionId.id,
    message: 'file appended successfuly',
  });
};

/***
 * @desc stop recording of video
 * @route POST /api/v1/stoprecording
 * @access public
 *
 */
exports.stopRecording = async (req, res) => {
  //get the video format
  const { completed, id } = req.body;

  //check if id matches session id

  const sessionId = await Session.findOne({ _id: id });

  if (id !== sessionId.id) {
    return res.json({ msg: 'invalid id' });
  }

  if (!completed) {
    return res.json({ msg: 'please complete video' });
  }

  // read final file and generate video file for it
  // save the video file to folder
  // save details of video into db
  const obj = await fs.readFile(
    `inputvideofiles/video_${sessionId.id}.json`,
    'utf8'
  );

  res.json({
    sessionId: sessionId.id,
    message: 'video file created successfuly',
  });
};
