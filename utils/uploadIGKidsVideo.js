require("dotenv").config()
const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');
const util = require('util');
const readFile = fs.readFile;
const promisify = util.promisify;
const readFileAsync = promisify(readFile);

const uploadIGKidsVideo = async uploadPath => {
    console.log("upload path in fnc", uploadPath)
    try {
        // Log in to Instagram
        const ig = new IgApiClient();
        ig.state.generateDevice(process.env.IG_USERNAME);
        const logged = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

        const postEachVideo = await ig.publish.video({ 
            video: await readFileAsync(uploadPath), 
            coverImage: await readFileAsync('./uploads/cover.jpg'),
            caption: `Today's story #instareels #reelvideo #kids #storytellers`, 
        });
        console.log(postEachVideo)
    } catch (error) {
        console.log(error)   
    }
}

module.exports = uploadIGKidsVideo
// uploadIGKidsVideo("./uploads/video.mp4")
