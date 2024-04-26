import { getWeatherUrl } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"
 
/**
 * @swagger
 * /api/weather:
 *   get:
 *     description: Get weather details of a city
 *     parameters:
 *       - name: city
 *         description: City name
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success! returns weather details of a city
 *       400:
 *         description: Bad Request
 */
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