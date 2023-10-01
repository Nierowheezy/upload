# Getting Started with File upload with multer in Node js

This Demo was uploading image and video file using multer middleware.

## Project Setup

In the project directory, you can run:

### `npm init`

### `npm install`

### `npm start`

Runs the app in the development mode.

## available endpoints

- POST /api/v1/upload - Upload a video
- GET /api/v1/getallvideos - Get all videos
- GET /api/v1/getvideo - Get a video
- POST /api/v1/startrecording - Start recording a video
- POST /api/v1/sendRecording - Send recording in chunks
- GET /api/v1/stream/video_1695992150444 Stream a video bits by bit

## Calling the video upload API

- Open Postman and create POST request for image upload
- URL will be [localhost:3000/upload](http://localhost:3000/upload)
- select Body in menus then select form-data
- Change key name as a video and select video file `(file will be only mp4|mpeg-4)`
- Send the request

- Live URL will be [https://upload-video-3pkk.onrender.com/api/v1/upload](https://upload-video-3pkk.onrender.com/api/v1/upload)

> The save video endpoint is a post request you only need to send back your video as formdata

> send a post request to [https://upload-video-3pkk.onrender.com/api/v1/upload](https://upload-video-3pkk.onrender.com/api/v1/upload)
> the video saves for you automatically

> To view the video, send a get request to this end point [https://upload-video-3pkk.onrender.com/uploads/videos/videoname.mp4](https://upload-video-3pkk.onrender.com/uploads/videos/videoname.mp4)

> To check how to works view documentation on postman, import the collection into postman [https://documenter.getpostman.com/view/6423394/2s9YJaXiiC#6300a85c-eb6f-48fc-bf76-9dee6e5ef121](https://documenter.getpostman.com/view/6423394/2s9YJaXiiC#6300a85c-eb6f-48fc-bf76-9dee6e5ef121)
