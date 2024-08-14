require("dotenv").config()
const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');
const util = require('util');
const readFile = fs.readFile;
const promisify = util.promisify;
const readFileAsync = promisify(readFile);

const uploadInstagramSingleVideo = async (uploadPath, accountType, instagramUser, instagramPassword) => {
    console.log("upload path in fnc", uploadPath)
    try {
        // Log in to Instagram
        const ig = new IgApiClient();
        ig.state.generateDevice(instagramUser);
        await ig.account.login(instagramUser, instagramPassword);

        const postEachVideo = await ig.publish.video({ 
            video: await readFileAsync(uploadPath), 
            coverImage: await readFileAsync(`./uploads/${accountType}/cover.jpg`),
            caption: `Today's story #instareels #history #history_telling #storytellers`, 
        });
        console.log(postEachVideo)
    } catch (error) {
        console.log(error)   
    }
}

module.exports = uploadInstagramSingleVideo
// uploadInstagramSingleVideo("./uploads/history/video.mp4", "history", process.env.IG_HISTORYTELLERS_USERNAME, process.env.IG_HISTORYTELLERS_PASSWORD)
