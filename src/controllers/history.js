require("dotenv").config()
const path = require('path')

const historyForm = (req, res) => {
    const filePath = path.join(__dirname, '../../public/history.html');
    res.sendFile(filePath);
}

module.exports = { historyForm }
