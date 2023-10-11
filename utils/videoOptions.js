
const videoOptions = {
    fps: 25,
    loop: 6, // seconds
    transition: true,
    transitionDuration: 1, // seconds
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x?',
    audioBitrate: '128k',
    audioChannels: 2,
    format: 'mp4',
    pixelFormat: 'yuv420p',
    subtitleStyle: {
        Fontname: 'Verdana',
        Fontsize: '26',
        PrimaryColour: '11861244',
        SecondaryColour: '11861244',
        TertiaryColour: '11861244',
        BackColour: '-2147483640',
        Bold: '2',
        Italic: '0',
        BorderStyle: '2',
        Outline: '2',
        Shadow: '3',
        Alignment: '10', // left, middle, right
        MarginL: '40',
        MarginR: '60',
        MarginV: '60'
    }
}

module.exports = videoOptions
