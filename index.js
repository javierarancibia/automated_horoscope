const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser') 

// Middleware for each query
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const horoscope = require("./src/routes/horoscope")
const kids = require("./src/routes/kids")

// Routes
app.use("/api/v1/horoscope", horoscope)
app.use("/kids", kids)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})