const express = require('express')
const app = express()
const port = 5000

const horoscope = require("./src/routes/horoscope")
const kids = require("./src/routes/kids")

// Routes
app.use("/api/v1/horoscope", horoscope)
app.use("/kids", kids)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})