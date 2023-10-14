const Jimp = require('jimp') ;

async function imageOverlay(sign, day) {
    // Reading image
    const image = await Jimp.read('./test2.jpg');
    // Defining the text font
    const fontTitle = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    const fontSubtitle = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    image.print(fontTitle, 100, 750, sign.toUpperCase());
    image.print(fontSubtitle, 100, 900, day);
    // Writing image after processing
    await image.writeAsync(`./${sign}.jpg`);
    console.log("Image is processed succesfully");
}

module.exports = imageOverlay
