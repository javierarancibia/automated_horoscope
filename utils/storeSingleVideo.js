require("dotenv").config()
const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');
const util = require('util');
const readFile = fs.readFile;
const promisify = util.promisify;
const readFileAsync = promisify(readFile);
const videoshow = require('videoshow')
const videoOptions = require("./videoOptions")
const imageOverlayKids = require("./imageOverlayKids")
const uploadIGKidsVideo = require("./uploadIGKidsVideo")

const storeSingleVideo = async (textData, imageFiles, title, accountType, instagramUser, instagramPassword) => {
    const sortedData = imageFiles.map((x, i) => ({ image: x[0].filename, script: textData[i] }))
    console.log(sortedData)

    try {
        const images = sortedData.map(element => ({ path: `./uploads/${accountType}/${element.image}`, caption: element.script}))
        videoshow(images, videoOptions)
            .audio(`./audio/${Math.floor(Math.random() * 13)}.mp3`)
            .save(`./uploads/${accountType}/video.mp4`)
            .on('start', function (command) {
                console.log('ffmpeg process started:', command)
            })
            .on('error', function (err, stdout, stderr) {
                console.error('Error:', err)
                console.error('ffmpeg stderr:', stderr)
            })
            .on('end', function (output) {
                imageOverlayKids(sortedData[0].image, title, accountType)
                uploadIGKidsVideo(output, accountType, instagramUser, instagramPassword)
            })
    } catch (error) {
        console.log(error)   
    }
}

module.exports = storeSingleVideo
