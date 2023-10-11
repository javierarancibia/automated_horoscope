const express = require('express')
const videoshow = require('videoshow')
const connectDB = require('./src/db/connect')
require("dotenv").config()
const videoOptions = require('./utils/videoOptions')
const stringSplitter = require('./utils/stringSplitter')
const Horoscope = require('./src/models/Horoscope')
const app = express()
const port = 5000

app.get('/', async (req, res) => {
    try {
        // 1.- Call day horoscope to private API to get all daily horoscopes 
        connectDB(process.env.MONGO_URI)
        const todayHoroscope = await Horoscope.findOne({}, {}, { sort: { timestamp: -1 } });

        // Get day of the week in string
        const date = new Date();
        const today = date.toLocaleString("en-US", { weekday: "long" });
        const signsDayData = todayHoroscope.signsData.map(sign => ({ sign: sign.sign, dayData: sign.weekData.find(x => x.day === today)  }))

        signsDayData.forEach(sign => {
            const splittedString = stringSplitter(sign.dayData.content, 70)
            const images = splittedString.map((string, i) => ({ path: `./images/${sign.sign}/${i + 1}.jpeg`, caption: string}))

            videoshow(images, videoOptions)
            .audio('./audio/1.mp3')
            .save(`${sign.sign}.mp4`)
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
        res.json({ response: signsDayData })
    } catch (error) {
        console.log(error);        
    }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})