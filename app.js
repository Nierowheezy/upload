const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

//Route files
const upload = require('./routes/upload');
const test = require('./routes/test');
const stream = require('./routes/stream');
require('colors');

//load env variables
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

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
app.use('/api/v1', test);
app.use('/api/v1', upload);
app.use('/api/v1', stream);

const server = app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error : ${err.message}`.red);
  //close server and exit process
  server.close(() => process.exit(1));
});
