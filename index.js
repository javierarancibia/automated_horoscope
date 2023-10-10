const express = require('express')
const videoshow = require('videoshow')
const axios = require('axios')
const videoOptions = require('./utils/videoOptions')
const stringSplitter = require('./utils/stringSplitter')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    const SIGNS = [ 'aries', 'scorpio']
    // 1.- Call day horoscope to private API to get all daily horoscopes 

    SIGNS.forEach(sign => {
        const images = [
            {
                path: `./images/${sign}/1.jpeg`,
                caption: `Image One is sign ${sign} ble ble ble`
            },
            {
                path: `./images/${sign}/2.jpeg`,
                caption: `Image One is sign ${sign} bla bla bla`
            },
        ]

        videoshow(images, videoOptions)
        .audio('./audio/1.mp3')
        .save(`${sign}.mp4`)
        .on('start', function (command) {
            console.log('ffmpeg process started:', command)
        })
        .on('error', function (err, stdout, stderr) {
            console.error('Error:', err)
            console.error('ffmpeg stderr:', stderr)
        })
        .on('end', function (output) {
            console.error('Video created in:', output)
            console.log(output)
        })
    });
    res.json({ response: "Videos created succesfully!" })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})