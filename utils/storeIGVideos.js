const connectDB = require('../src/db/connect')
require("dotenv").config()
const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');
const util = require('util');
const readFile = fs.readFile;
const promisify = util.promisify;
const readFileAsync = promisify(readFile);
const Horoscope = require('../src/models/Horoscope')
const emailSender = require('./emailSender')

const storeIGVideos = async (req, res) => {
    try {
        // Log in to Instagram
        const ig = new IgApiClient();
        ig.state.generateDevice(process.env.IG_USERNAME);
        const logged = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

        // Get day of the week in string
        connectDB(process.env.MONGO_URI)
        const todayHoroscope = await Horoscope.findOne({}, {}, { sort: { timestamp: -1 } });
        const date = new Date();
        const today = date.toLocaleString("en-US", { weekday: "long" });
        const signsDayData = todayHoroscope.signsData.map(sign => ({ sign: sign.sign, dayData: sign.weekData.find(x => x.day === "Wednesday")  }))

        const postVideo = async (index) => {
            if (index >= signsDayData.length) {
              console.log('All videos have been posted');
              emailSender('All videos have been posted')
              return;
            }
            const signData = signsDayData[index]
            const postEachVideo = await ig.publish.video({ 
                video: await readFileAsync(`./${signData.sign}.mp4`), 
                coverImage: await readFileAsync(`./${signData.sign}.jpg`),
                caption: `Today Horoscope for ${signData.sign} #instareels #reelvideo #horoscope #storyteller #reelsinstagram #motivations #digitalart #instaart #ai #instadaily #2023`, 
            });
            console.log(postEachVideo)
            setTimeout(() => {
                postVideo(index + 1);
            }, [20000])
        }
        postVideo(0)

    } catch (error) {
        console.log(error)   
        emailSender('Hubo un error al guardar videos en Instagram')
    }
}

module.exports = storeIGVideos
