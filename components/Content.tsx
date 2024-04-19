import Image from 'next/image';
import { Droplets, Gauge, Thermometer, Wind } from 'lucide-react';
import { Detail } from '@/types';
import { generatePredictions } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

const Content = ({ weatherData, title }: { weatherData: Detail[], title: 'Today' | 'Tomorrow' | 'Day After Tomorrow' }) => {
    const date = new Date(weatherData[0].dt * 1000)

    return (
        <div className='w-full h-full space-y-2 p-2'>
            <h1 className='text-center text-2xl font-bold'>{title} ({date.toLocaleDateString('en-us')})</h1>

            <div className='grid grid-cols-1 gap-4 h-full'>
                {weatherData.map((item, index) => {
                    const date = new Date(item.dt * 1000);
                    const afterThreeHours = new Date(date.getTime() + 3 * 60 * 60 * 1000)
                    const predictions = generatePredictions(item)

                    return (
                        <div key={index} className='flex flex-col bg-secondary rounded-md p-4 gap-2'>
                            <div className='flex gap-1 font-bold text-muted-foreground'>
                                <p>{date.toLocaleTimeString('en-us')}</p>
                                -
                                <p>{afterThreeHours.toLocaleTimeString('en-us')}</p>
                            </div>

                            <div className='flex flex-col gap-2 sm:gap-1 sm:flex-row sm:max-h-52'>
                                <div className='flex flex-col min-w-[300px] sm:max-w-[300px] gap-1 items-center border rounded p-2'>
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

                                <div className='flex flex-col gap-1 min-w-[300px] sm:max-w-[300px] items-center border rounded px-3 py-2 justify-around'>
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

                                <ScrollArea className='flex flex-col w-full gap-2 border rounded px-3 py-2'>
                                    <div className='flex flex-col space-y-1'>
                                        <h2 className='font-semibold'>Message</h2>
                                        <hr className='w-full border border-gray-300' />
                                    </div>
                                    <ul className='flex flex-col gap-2 list-disc ml-4 mt-2'>
                                        {predictions.map((message, index) => (
                                            <li key={index} className='font-normal text-lg'>
                                                {message}
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Content;