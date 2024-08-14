const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser') 
const multer  = require('multer')
const path = require('path');
const storeSingleVideo = require("./utils/storeSingleVideo")
const cors = require('cors');
const fs = require('fs');
require("dotenv").config()

// Middleware for each query
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Use CORS middleware
app.use(cors());

// Storage function with Multer for PDF storage in Root Upload Folder
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // if (file.originalname.includes("historyImage")){
      return cb(null, "./uploads/history")
    // } 
    // if (file.fieldname.includes("historyImage")){
    //   return cb(null, "./uploads/history")
    // } 
    // if (file.fieldname.includes("kidsImage")) {
    //   return cb(null, "./uploads/kids")
    // }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage})

// Serve the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle the file upload
app.post('/upload/history', upload.single('image'), (req, res) => {
  if (req.file) {
      const filePath = `/uploads/history/${req.file.filename}`; // Generate the file URL or path
      res.status(200).json({ message: 'File uploaded successfully', fileUrl: filePath });
  } else {
      res.status(400).send('File upload failed');
  }
});

// Handle Kids file upload
app.post('/kids/create-tale', upload.fields([{ name: 'kidsImage1' }, { name: 'kidsImage2' }, { name: 'kidsImage3' }, { name: 'kidsImage4' }, { name: 'kidsImage5' }]), async (req, res) => {
  const textData = [ req.body.scene1, req.body.scene2, req.body.scene3, req.body.scene4, req.body.scene5 ];
  const imageFiles = [ req.files.kidsImage1, req.files.kidsImage2, req.files.kidsImage3, req.files.kidsImage4, req.files.kidsImage5 ];
  try {
    const storeSingleVideoResponse = await storeSingleVideo(textData, imageFiles, req.body.title, "kids", process.env.IG_KIDSTELLERS_USERNAME, process.env.IG_KIDSTELLERS_PASSWORD)
    storeSingleVideoResponse && res.send(storeSingleVideoResponse);
  } catch (error) {
    console.log(error)
  }
});

// Handle History file upload
app.post('/history/create-tale', upload.fields([{ name: 'historyImage1' }, { name: 'historyImage2' }, { name: 'historyImage3' }, { name: 'historyImage4' }, { name: 'historyImage5' }]), async (req, res) => {
   const textData = [ req.body.historyScene1, req.body.historyScene2, req.body.historyScene3, req.body.historyScene4, req.body.historyScene5 ];
  // const imageFiles = [ req.files.historyImage1, req.files.historyImage2, req.files.historyImage3, req.files.historyImage4, req.files.historyImage5 ];
  try {
    console.log(req.body)
    const imageFiles = fs.readdirSync('./uploads/history').filter(image => image.includes('jpeg'))
    const storeSingleVideoResponse = await storeSingleVideo(textData, imageFiles, req.body.title, "history", process.env.IG_HISTORYTELLERS_USERNAME, process.env.IG_HISTORYTELLERS_PASSWORD)
    storeSingleVideoResponse && res.send(storeSingleVideoResponse);
  } catch (error) {
    console.log(error)
  }
});

const horoscope = require("./src/routes/horoscope")
const kids = require("./src/routes/kids")
const history = require("./src/routes/history")

// Routes
app.use("/api/v1/horoscope", horoscope)
app.use("/kids", kids)
app.use("/history", history)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})