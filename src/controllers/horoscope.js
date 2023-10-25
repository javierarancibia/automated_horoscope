const connectDB = require("../db/connect")
require("dotenv").config()
const videoshow = require('videoshow')
const videoOptions = require('../../utils/videoOptions')
const stringSplitter = require('../../utils/stringSplitter')
const Horoscope = require('../models/Horoscope')
const imageOverlay = require("../../utils/imageOverlay")
const storeIGVideos = require("../../utils/storeIGVideos")


const getDailySigns = async (req, res) => { 
    connectDB(process.env.MONGO_URI)
    const todayHoroscope = await Horoscope.findOne({}, {}, { sort: { timestamp: -1 } });
    res.send("hello")
}

const createVideos = async (req, res) => {
    try {
        // 1.- Call day horoscope to private API to get all daily horoscopes 
        connectDB(process.env.MONGO_URI)
        const todayHoroscope = await Horoscope.findOne({}, {}, { sort: { timestamp: -1 } });

        // Get day of the week in string
        const date = new Date();
        const today = date.toLocaleString("en-US", { weekday: "long" });
        const signsDayData = todayHoroscope.signsData.map(sign => ({ sign: sign.sign, dayData: sign.weekData.find(x => x.day === "Wednesday")  }))

        const createVideo = async (index) => {
            if (index >= signsDayData.length) {
              console.log('All videos created');
              storeIGVideos()
              return;
            }
            const signData = signsDayData[index]
            const splittedString = stringSplitter(signData.dayData.content, 160)
            // const images = splittedString.map((string, i) => ({ path: `./images/${signData.sign}/${i + 1}.jpeg`, caption: string}))
            const images = splittedString.map((string, i) => ({ path: `./images/${signData.sign}/cover2.jpg`, caption: string}))

            videoshow(images, videoOptions)
            .audio(`./audio/${index}.mp3`)
            .save(`./images/${signData.sign}/${signData.sign}.mp4`)
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
                imageOverlay(signData.sign, signData.dayData.day)
                createVideo(index + 1);
            })
        }
        createVideo(0)
        res.json({ response: signsDayData })
    } catch (error) {
        console.log(error);        
    }
}

module.exports = { getDailySigns, createVideos }
