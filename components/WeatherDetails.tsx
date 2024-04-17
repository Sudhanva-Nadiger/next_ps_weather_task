import { Detail, Weather } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Image from 'next/image';
import { Droplets, Gauge, Globe2, Thermometer, Wind } from 'lucide-react';
import { absoluteUrl } from '@/lib/utils';

const ONE_DAY = 24 * 60 * 60 * 1000;


const Content = ({ weatherData }: { weatherData: Detail[] }) => {
    return (
        <div className='w-full h-full space-y-2 p-2'>
            <h1 className='text-center text-2xl font-bold'>Today</h1>

            <div className='grid grid-cols-1 gap-4 h-full'>
                {weatherData.map((item, index) => {
                    const date = new Date(item.dt * 1000);
                    const afterThreeHours = new Date(date.getTime() + 3 * 60 * 60 * 1000)

                    return (
                        <div key={index} className='flex flex-col bg-secondary rounded-md p-4 gap-2'>
                            <div className='flex gap-1 font-bold text-muted-foreground'>
                                <p>{date.toLocaleTimeString('en-us')}</p>
                                -
                                <p>{afterThreeHours.toLocaleTimeString('en-us')}</p>
                            </div>

                            <div className='flex'>
                                <div className='flex flex-col min-w-[300px] max-w-[300px] gap-1 items-center border rounded p-2'>
                                    <Image
                                        width={50}
                                        height={50}
                                        alt='image'
                                        src={`/icons/${item.weather[0].icon}.png`}
                                        className='w-[100px] aspect-square rounded-md'
                                    />
                                    <h2 className='text-3xl font-extrabold'>{item.main.temp} &deg;C</h2>
                                    <div className='flex flex-col items-center gap-2 text-sm'>
                                        <h3 className='font-bold'>{item.weather[0].main}</h3>
                                        <p>{item.weather[0].description}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 min-w-[300px] max-w-[300px] items-center mx-2 border rounded px-3 py-2 justify-around'>
                                    <h3 className='text-md font-[600] text-start w-full'>Details:</h3>

                                    <div className='flex justify-between w-full'>
                                        <p>
                                            <Thermometer className='w-4 h-4 mr-2 inline-block' />
                                            Feels Like
                                        </p>
                                        <p className='font-medium'>{item.main.feels_like} &deg;C</p>
                                    </div>

                                    <div className='flex justify-between w-full'>
                                        <p>
                                            <Gauge className='w-4 h-4 mr-2 inline-block' />
                                            Pressure
                                        </p>
                                        <p className='font-medium'>{item.main.pressure} hPa</p>
                                    </div>

                                    <div className='flex justify-between w-full'>
                                        <p>
                                            <Wind className='w-4 h-4 mr-2 inline-block' />
                                            Wind
                                        </p>
                                        <p className='font-medium'>{item.wind.speed} m/s</p>
                                    </div>

                                    <div className='flex justify-between w-full'>
                                        <p>
                                            <Droplets className='w-4 h-4 mr-2 inline-block' />
                                            Humidity
                                        </p>
                                        <p className='font-medium'>{item.main.humidity} %</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const WeatherDetails = async ({
    q
}: {
    q: string | null
}) => {
    if (!q || q === '') {
        return (
            <div className='flex flex-col items-center justify-center h-full'>
                <Globe2 className='w-16 h-16 text-muted-foreground' />
                <h1 className='text-3xl text-muted-foreground'>
                    Enter city name to get weather details.
                </h1>
            </div>
        )
    }

    const response = await fetch(absoluteUrl(`/api/weather?city=${q}`))
    const data = await response.json() as Weather

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const weatherData: Array<Array<Detail>> = []

    data.list.forEach((item) => {
        const date = new Date(item.dt * 1000)
        date.setHours(0, 0, 0, 0)

        const diff = Math.ceil(Math.abs(today.getTime() - date.getTime()) / ONE_DAY)

        weatherData[diff] ? weatherData[diff].push(item) : weatherData[diff] = [item]
    });

    return (
        <>
            <Tabs defaultValue="today" className='flex items-center flex-col'>
                <TabsList className='flex sm:flex-row flex-col justify-center gap-4 h-fit w-fit p-2 mt-6'>
                    <TabsTrigger className='shadow border w-[250px]' value="today">Today</TabsTrigger>
                    <TabsTrigger className='shadow border w-[250px]' value="tomorrow">Tomorrow</TabsTrigger>
                    <TabsTrigger className='shadow border w-[250px]' value="dayAfterTomorrow">Day After Tomorrow</TabsTrigger>
                </TabsList>
                <div className='w-full'>
                    <TabsContent value='today' className='w-full'>
                        <Content weatherData={weatherData[0]} />
                    </TabsContent>
                    <TabsContent value='tomorrow' className='w-full'>
                        <Content weatherData={weatherData[1]} />
                    </TabsContent>
                    <TabsContent value='dayAfterTomorrow' className='w-full'>
                        <Content weatherData={weatherData[2]} />
                    </TabsContent>
                </div>
            </Tabs>

        </>

    )
}

export default WeatherDetails