const express = require('express')
const videoshow = require('videoshow')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    const images = [
        {
            path: './images/test1.png',
            caption: 'Image One'
        },
        {
            path: './images/test2.png',
            caption: 'Image One'
        },
    ]

    const videoOptions = {
        fps: 25,
        loop: 5, // seconds
        transition: true,
        transitionDuration: 1, // seconds
        videoBitrate: 1024,
        videoCodec: 'libx264',
        size: '640x?',
        audioBitrate: '128k',
        audioChannels: 2,
        format: 'mp4',
        pixelFormat: 'yuv420p'
    }

    videoshow(images, videoOptions)
    .audio('./audio/1.mp3')
    .save('scorpio.mp4')
    .on('start', function (command) {
        console.log('ffmpeg process started:', command)
    })
    .on('error', function (err, stdout, stderr) {
        console.error('Error:', err)
        console.error('ffmpeg stderr:', stderr)
    })
    .on('end', function (output) {
        console.error('Video created in:', output)
        res.json({ res: output })
    })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})