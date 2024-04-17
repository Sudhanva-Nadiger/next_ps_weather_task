import { getWeatherUrl } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"


export async function GET(request: NextRequest) {
   const city = request.nextUrl.searchParams.get('city')

    if(!city) {
        return NextResponse.json({
            message: 'City name is required.'
        }, {
            status: 400
        })
    }

    const url = getWeatherUrl(city)
    const respose = await fetch(url);
    const data = await respose.json();

    return NextResponse.json(data)
}