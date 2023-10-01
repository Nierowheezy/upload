const fs = require('fs');
/***
 * @desc Upload a video
 * @route POST api/v1/stream/video_1695992150444
 * @access public
 *
 */
// /api/v1/stream
exports.streamVideo = (req, res) => {
  const range = req.headers.range;
  if (!range) {
    return res.status(400).json({
      error: true,
      statusCode: 401,
      message: 'Range is not present',
    });
  }

  const { id } = req.params;
  const videoPath = `public/uploads/videos/${id}.mp4`;
  const videoSize = fs.statSync(videoPath).size;
  // const chunkSize = 1 * 1e6;
  const chunkSize = 10 ** 6;

  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + chunkSize, videoSize - 1);
  const contentLength = end - start + 1;

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  };
  res.writeHead(206, headers);

  const stream = fs.createReadStream(videoPath, { start, end });
  stream.pipe(res);
};
