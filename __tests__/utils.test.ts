import { absoluteUrl, getDifferenceBetweenDates, getWeatherUrl } from "@/lib/utils";

describe("Utils Absolute URL", () => {
    it("Should return correct absolute url in client side", () => {
        expect(absoluteUrl('/path')).toBe('/path');
    })

    it("Should return correct absolute url in production", () => {
        const { window } = global
        //@ts-ignore
        delete global.window
        process.env.VERCEL_URL = 'vercel.com'
        expect(absoluteUrl('/path')).toBe('https://vercel.com/path');
        global.window = window
    })

    it("Should return correct absolute url in server", () => {
        const { window } = global
        //@ts-ignore
        delete global.window
        delete process.env.VERCEL_URL
        process.env.PORT = '3000'
        expect(absoluteUrl('/path')).toBe('http://localhost:3000/path');
        global.window = window
    })
})

describe("Utils get weather url", () => {
    it("Should return correct weather url", () => {
        const key = '123'
        const city = 'london'
        process.env.WEATHER_API_KEY = key
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&cnt=31&units=metric`
        expect(getWeatherUrl(city)).toBe(url);
    })
})

describe("Utils get difference between dates", () => {
    it("Should return correct difference between dates", () => {
        const date1 = new Date('2021-01-01')
        const date2 = new Date('2021-01-02')
        expect(getDifferenceBetweenDates(date1, date2)).toBe(1);
    })
})