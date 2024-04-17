import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { BASE_URL, LIMIT } from "./constants"

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