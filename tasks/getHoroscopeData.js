const connectDB = require("../src/db/connect")
const Horoscope = require("../src/models/Horoscope")
const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require("dotenv").config()

const fetchHoroscopeWeekData = async () => {
    const signs = ["aquarius", "aries", "cancer", "capricorn", "gemini", "leo", "libra", "pisces", "sagittarius", "scorpio", "taurus", "virgo"]
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    
    function fetchDataWithDelay(sign, day, delay) {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const url = "https://www.astrology.com/horoscope/daily/" + sign + ".html#" + day;
                const response = await got(url);
                const dom = new JSDOM(response.body);
                const contentDiv = dom.window.document.querySelector("#content");
                const content = contentDiv.querySelector("span").textContent;
                resolve({ content: content, day: day });
            }, delay);
        });
    }
      
    const weekHoroscope = Promise.all(
        signs.map(async (sign, signIndex) => {
            const mappedArray = await Promise.all(
                weekdays.map(async (day, dayIndex) => {
                const delay = (signIndex * 3 + dayIndex) * 1000; // Calculate the delay based on the sign and day index
                return fetchDataWithDelay(sign, day, delay);
                })
            );
            return { sign, weekData: mappedArray };
        })
    );

    weekHoroscope.then(res => {
        const date = new Date()
        storeDataDB({ week: date, signData: res })
    })

}

// Store data in DB function
const storeDataDB = async data => {
    Horoscope.create(data) // Method to store object in MONGODB
    await connectDB(process.env.MONGO_URI)
} 

fetchHoroscopeWeekData()
// module.exports = fetchHoroscopeWeekData
