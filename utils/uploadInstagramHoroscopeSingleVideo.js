require("dotenv").config()
const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');
const util = require('util');
const readFile = fs.readFile;
const promisify = util.promisify;
const readFileAsync = promisify(readFile);

const uploadInstagramHoroscopeSingleVideo = async (uploadPath, sign, instagramUser, instagramPassword, content) => {
    try {
        // Log in to Instagram
        const ig = new IgApiClient();
        ig.state.generateDevice(instagramUser);
        await ig.account.login(instagramUser, instagramPassword);

        const postedVideo = await ig.publish.video({ 
            video: await readFileAsync(uploadPath), 
            coverImage: await readFileAsync(`./images/${sign}/${sign}.jpg`),
            caption: `Today's sign is ${sign}: ${content} #horoscope #daily_horoscope ${sign}`,
        });
        console.log(postedVideo)
    } catch (error) {
        console.log(error)
    }
}

module.exports = uploadInstagramHoroscopeSingleVideo
// uploadInstagramHoroscopeSingleVideo("./uploads/history/video.mp4", "history", process.env.IG_HISTORYTELLERS_USERNAME, process.env.IG_HISTORYTELLERS_PASSWORD)
