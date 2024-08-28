const express = require('express')
const router = express.Router()

const { getDailySigns, storeWeeklyHoroscopeData, createVideos, createSingleRandomVideo } = require("../controllers/horoscope") 
router.route("/get-daily-signs").get(getDailySigns)
router.route("/create-videos").post(createVideos)
router.route("/create-single-video").get(createSingleRandomVideo)
router.route("/get-weekly-data").get(storeWeeklyHoroscopeData)

module.exports = router