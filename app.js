const express = require('express');
const path = require('path');

//Route files
const upload = require('./routes/upload');
const test = require('./routes/test');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/***
 * whatever path is set to public wont be added to the url
 * here is a url sample to access the files for example
 * http://localhost:3000/uploads/images/image_1695903869857.jpg
 * because i set public as my static folder and i have uploads inside of public folder
 * so i wont need to add public in the url /public/uploads/images
 */
app.use(express.static(path.resolve(__dirname, 'public')));
// app.use('/uploads/videos', express.static('/uploads/videos'));

//initialize routes
app.use('/api/v1', upload);
app.use('/api/v1', test);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
