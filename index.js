const express = require('express')
const videoshow = require('videoshow')
const connectDB = require('./src/db/connect')
require("dotenv").config()
const videoOptions = require('./utils/videoOptions')
const stringSplitter = require('./utils/stringSplitter')
const Horoscope = require('./src/models/Horoscope')
const app = express()
const port = 5000
const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');
const util = require('util');
const readFile = fs.readFile;
const promisify = util.promisify;
const readFileAsync = promisify(readFile);

app.get('/videos', async (req, res) => {
    try {
        // 1.- Call day horoscope to private API to get all daily horoscopes 
        connectDB(process.env.MONGO_URI)
        const todayHoroscope = await Horoscope.findOne({}, {}, { sort: { timestamp: -1 } });

        // Get day of the week in string
        const date = new Date();
        const today = date.toLocaleString("en-US", { weekday: "long" });
        const signsDayData = todayHoroscope.signsData.map(sign => ({ sign: sign.sign, dayData: sign.weekData.find(x => x.day === today)  }))

        const createVideo = async (index) => {
            if (index >= signsDayData.length) {
              console.log('All videos created');
              return;
            }
            const signData = signsDayData[index]
            const splittedString = stringSplitter(signData.dayData.content, 70)
            const images = splittedString.map((string, i) => ({ path: `./images/${signData.sign}/${i + 1}.jpeg`, caption: string}))

            videoshow(images, videoOptions)
            .audio('./audio/1.mp3')
            .save(`${signData.sign}.mp4`)
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
                createVideo(index + 1);
            })
        }
        createVideo(0)
        res.json({ response: signsDayData })
    } catch (error) {
        console.log(error);        
    }
})

process.env.IG_USERNAME, process.env.IG_PASSWORD

app.get('/ig', async (req, res) => {
    try {
        const ig = new IgApiClient();
        ig.state.generateDevice(process.env.IG_USERNAME);
        const logged = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
        
        const postVideo = await ig.publish.video({ 
            video: await readFileAsync("./aquarius.mp4"), 
            coverImage: await readFileAsync("./test1.jpg"),
            caption: 'Really nice photo from the internet!', 
        });
        console.log(postVideo)
    } catch (error) {
        console.log(error)   
    }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})