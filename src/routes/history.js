const express = require('express')
const router = express.Router()

const { historyForm } = require("../controllers/history") 

router.route("/form").get(historyForm)

module.exports = router