const express = require('express')
const router = express.Router()

const { kidsForm, createTale } = require("../controllers/kids") 

router.route("/form").get(kidsForm)
router.route("/create-tale").post(createTale)

module.exports = router