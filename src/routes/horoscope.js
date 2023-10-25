const express = require('express')
const router = express.Router()

const { getDailySigns, createVideos } = require("../controllers/horoscope") 
router.route("/get-daily-signs").get(getDailySigns)
router.route("/create-videos").post(createVideos)

module.exports = router