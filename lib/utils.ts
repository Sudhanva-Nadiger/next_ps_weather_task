import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { BASE_URL, LIMIT, ONE_DAY } from "./constants"
import { Detail } from "@/types"
import { createSwaggerSpec } from 'next-swagger-doc'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWeatherUrl(city: string) {
  return `${BASE_URL}?q=${city}&appid=${process.env.WEATHER_API_KEY}&cnt=${LIMIT}&units=metric`
}

export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}${path}`
  return `http://localhost:${
    process.env.PORT ?? 3000
  }${path}`
}

export function getDifferenceBetweenDates(date1: Date, date2: Date) {
  date1.setHours(0, 0, 0, 0)
  date2.setHours(0, 0, 0, 0)
  return Math.ceil(
    Math.abs(date1.getTime() - date2.getTime()) / ONE_DAY
  )
}

export const generatePredictions = (data: Detail) => {
  const messages: string[] = []

  if(data.main.temp > 40) {
    messages.push('It is very hot outside. Carry umbrella and apply sunscream if you are stepping out 🌞.')
  }

  if(data.wind.speed > 10) {
    messages.push('It is windy outside. Watch out! 💨.')
  }
  
  const weatherId = data.weather[0].id

  if(weatherId >= 200 && weatherId <= 232) {
    messages.push('Don’t step out! A Storm is brewing! 🌪️.')
  }

  if(weatherId >= 300 && weatherId <= 321) {
    messages.push('Drizzle is expected. Carry umbrella ☔️.')
  }

  if(weatherId >= 500 && weatherId <= 531) {
    messages.push('It may rain. Carry Rain coat or unbrella before you go out ☔️.')
  }

  if(weatherId >= 600 && weatherId <= 622) {
    messages.push('Carry warm clothes. It\'s snowing outside ❄️.')
  }

  if(weatherId >= 701 && weatherId <= 781) {
    messages.push('It is foggy outside. Carry mask and Drive carefully 🌫️.')
  }

  if(weatherId === 800) {
    messages.push('Clear sky. Enjoy the day. ✌')
  }

  if(weatherId >= 801 && weatherId <= 804) {
    messages.push('It is cloudy outside ☁️.')
  }

  return messages
}


export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api', 
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'API Doc',
        version: '1.0',
      },
      security: [],
    },
  })
  return spec
}