const mongoose = require("mongoose")

const WeekDataArraySchema = mongoose.Schema(
    {
        day: String,
        content: String
    }
)

const SignDataArraySchema = mongoose.Schema(
    {
        sign: String,
        weekData: [ WeekDataArraySchema ]
    }
)


const HoroscopeSchema = new mongoose.Schema({
    week: Date,
    signData: [ SignDataArraySchema ]
})

module.exports = mongoose.model("Horoscope", HoroscopeSchema)