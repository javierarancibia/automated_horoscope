const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser') 
const multer  = require('multer')
const path = require('path');
const storeSingleVideo = require("./utils/storeSingleVideo")

// Middleware for each query
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Storage function with Multer for PDF storage in Root Upload Folder
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.fieldname.includes("historyImage")){
      return cb(null, "./uploads/history")
    } else {
      return cb(null, "./uploads/kids")
    }
    
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + path.extname(file.originalname))
  }
})
const upload = multer({storage})

// Handle Kids file upload
app.post('/kids/create-tale', upload.fields([{ name: 'sceneImage1' }, { name: 'sceneImage2' }, { name: 'sceneImage3' }, { name: 'sceneImage4' }, { name: 'sceneImage5' }]), async (req, res) => {
  const textData = [ req.body.scene1, req.body.scene2, req.body.scene3, req.body.scene4, req.body.scene5 ];
  const imageFiles = [ req.files.sceneImage1, req.files.sceneImage2, req.files.sceneImage3, req.files.sceneImage4, req.files.sceneImage5 ];
  try {
    const storeSingleVideoResponse = await storeSingleVideo(textData, imageFiles, req.body.title, "kids")
    storeSingleVideoResponse && res.send(storeSingleVideoResponse);
  } catch (error) {
    console.log(error)
  }
});

// Handle History file upload
app.post('/history/create-tale', upload.fields([{ name: 'historyImage1' }, { name: 'historyImage2' }, { name: 'historyImage3' }, { name: 'historyImage4' }, { name: 'historyImage5' }]), async (req, res) => {
  const textData = [ req.body.historyScene1, req.body.historyScene2, req.body.historyScene3, req.body.historyScene4, req.body.historyScene5 ];
  const imageFiles = [ req.files.historyImage1, req.files.historyImage2, req.files.historyImage3, req.files.historyImage4, req.files.historyImage5 ];
  console.log(textData, imageFiles)
  try {
    const storeSingleVideoResponse = await storeSingleVideo(textData, imageFiles, req.body.title, "history")
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