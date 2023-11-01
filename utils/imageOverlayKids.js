const Jimp = require('jimp') ;

async function imageOverlay(imageFile, title, accountType) {
    // Reading image
    const image = await Jimp.read(`./uploads/${accountType}/${imageFile}`);
    // Defining the text font
    const fontTitle = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    image.print(fontTitle, 100, 750, title);
    // Writing image after processing
    await image.writeAsync(`./uploads/${accountType}/cover.jpg`);
    console.log("Image is processed succesfully");
}

module.exports = imageOverlay
