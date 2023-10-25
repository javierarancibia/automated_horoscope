require("dotenv").config()
const videoshow = require('videoshow')
const videoOptions = require('../../utils/videoOptions')
const imageOverlay = require("../../utils/imageOverlay")
const storeIGVideos = require("../../utils/storeIGVideos")
const path = require('path')



// Kids Storytellers
const kidsForm = async (req, res) => {
    const filePath = path.join(__dirname, '../../public/kids.html')
    res.sendFile(filePath);
}



const createTale = async (req, res) => {
    res.send("create tale")
    // try {
    //     const createVideo = async (index) => {
    //         if (index >= signsDayData.length) {
    //           console.log('All videos created');
    //           storeIGVideos()
    //           return;
    //         }
    //         const images = splittedString.map((string, i) => ({ path: `./images/${signData.sign}/cover2.jpg`, caption: string}))

    //         videoshow(images, videoOptions)
    //         .audio(`./audio/${index}.mp3`)
    //         .save(`./images/${signData.sign}/${signData.sign}.mp4`)
    //         .on('start', function (command) {
    //             console.log('ffmpeg process started:', command)
    //         })
    //         .on('error', function (err, stdout, stderr) {
    //             console.error('Error:', err)
    //             console.error('ffmpeg stderr:', stderr)
    //         })
    //         .on('end', function (output) {
    //             console.error('Video created in:', output)
    //             console.log(output)
    //             imageOverlay(signData.sign, signData.dayData.day)
    //             createVideo(index + 1);
    //         })
    //     }
    //     createVideo(0)
    //     res.json({ response: signsDayData })
    // } catch (error) {
    //     console.log(error);        
    // }
}

module.exports = { kidsForm, createTale }
