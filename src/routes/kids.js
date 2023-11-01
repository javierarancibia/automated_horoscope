const express = require('express')
const router = express.Router()

const { kidsForm } = require("../controllers/kids") 

router.route("/form").get(kidsForm)

module.exports = router