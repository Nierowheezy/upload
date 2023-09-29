/***
 * @desc Upload a video
 * @route POST /api/v1/upload
 * @access public
 *
 */

exports.uploadVideo = async (req, res) => {
  res.send(req.file);
  (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  };
};
