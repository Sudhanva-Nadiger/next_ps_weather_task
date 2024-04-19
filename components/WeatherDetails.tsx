import { Detail, Weather } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { absoluteUrl, getDifferenceBetweenDates } from '@/lib/utils';
import { Globe2 } from 'lucide-react';
import Content from './Content';


// Revalidate data every 3 hours
export const revalidate = 3600 * 3;

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

    const weatherData: Array<Array<Detail>> = []

    data.list.forEach((item) => {
        const date = new Date(item.dt * 1000)

        const diff = getDifferenceBetweenDates(today, date)

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
                        <Content weatherData={weatherData[0]} title='Today' />
                    </TabsContent>
                    <TabsContent value='tomorrow' className='w-full'>
                        <Content weatherData={weatherData[1]} title='Tomorrow' />
                    </TabsContent>
                    <TabsContent value='dayAfterTomorrow' className='w-full'>
                        <Content weatherData={weatherData[2]} title='Day After Tomorrow' />
                    </TabsContent>
                </div>
            </Tabs>
        </>

    )
}

export default WeatherDetails