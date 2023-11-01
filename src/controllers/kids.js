const path = require('path')

const kidsForm = (req, res) => {
    const filePath = path.join(__dirname, '../../public/kids.html');
    res.sendFile(filePath);
}

module.exports = { kidsForm }
