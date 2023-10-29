const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser') 
const multer  = require('multer')
const path = require('path');
const storeKidsVideos = require("./utils/storeKidsVideos")

// Middleware for each query
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Storage function with Multer for PDF storage in Root Upload Folder
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      return cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + path.extname(file.originalname))
  }
})
const upload = multer({storage})

// Handle file upload
app.post('/kids/create-tale', upload.fields([{ name: 'sceneImage1' }, { name: 'sceneImage2' }, { name: 'sceneImage3' }, { name: 'sceneImage4' }, { name: 'sceneImage5' }]), async (req, res) => {
  const textData = [ req.body.scene1, req.body.scene2, req.body.scene3, req.body.scene4, req.body.scene5 ];
  const imageFiles = [ req.files.sceneImage1, req.files.sceneImage2, req.files.sceneImage3, req.files.sceneImage4, req.files.sceneImage5 ];
  try {
    const storeKidsVideosResponse = await storeKidsVideos(textData, imageFiles, req.body.title)
    storeKidsVideosResponse && res.send(storeKidsVideosResponse);
  } catch (error) {
    console.log(error)
  }
});

const horoscope = require("./src/routes/horoscope")
const kids = require("./src/routes/kids")

// Routes
app.use("/api/v1/horoscope", horoscope)
app.use("/kids", kids)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})