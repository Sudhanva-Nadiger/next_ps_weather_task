import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import WeatherDetails from "@/components/WeatherDetails";
import { render, screen, waitFor } from "@testing-library/react";

const MOCK_DATA = {
    cod: '200',
    list: [
        {
            // todays date in unix timestamp
            dt: Math.floor(Date.now() / 1000),
            main: {
                temp: 20,
                feels_like: 20,
                pressure: 20,
                humidity: 20
            },
            weather: [
                {
                    icon: 'icon',
                    main: 'main',
                    description: 'description'
                }
            ],
            wind: {
                speed: 20
            }
        }
    ]
}

describe("Weather detail", () => {

    it("Should render weather detail currectly", async () => {
        const jsx = await WeatherDetails({});
        render(jsx);
        
        const emptyState = await screen.findByText('Enter city name to get weather details.');
        expect(emptyState).toBeInTheDocument();
    });

    it("Should show the returned message if city name is incorrect", async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve({cod: '400', message: 'message'}),
              }) as any;
        });
        
        const jsx = await WeatherDetails({q: 'q'});
        render(jsx);
        
        const emptyState = await screen.findByText('message');
        expect(emptyState).toBeInTheDocument();
    });

    it("Should show tabs", async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve({cod: '200', list: []}),
              }) as any;
        });
        
        const jsx = await WeatherDetails({q: 'q'});
        render(jsx);
        
        const today = await screen.findByText('Today');
        expect(today).toBeInTheDocument();

        const tomorrow = await screen.findByText('Tomorrow');
        expect(tomorrow).toBeInTheDocument();

        const dayAfterTomorrow = await screen.findByText('Day After Tomorrow');
        expect(dayAfterTomorrow).toBeInTheDocument();

        const nodata = await screen.findByText('No data available.');
        expect(nodata).toBeInTheDocument();
    });

    it("Should show the details", async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve(MOCK_DATA),
              }) as any;
        });
        
        const jsx = await WeatherDetails({q: 'q'});
        render(jsx);
        
        const today = await screen.findByText('Today');
        expect(today).toBeInTheDocument();

        const tomorrow = await screen.findByText('Tomorrow');
        expect(tomorrow).toBeInTheDocument();

        const dayAfterTomorrow = await screen.findByText('Day After Tomorrow');
        expect(dayAfterTomorrow).toBeInTheDocument();

        const main = await screen.findByText('main');
        expect(main).toBeInTheDocument();
        const description = await screen.findByText('description');
        expect(description).toBeInTheDocument();
        const feelsLike = await screen.findByText('Feels Like');
        expect(feelsLike).toBeInTheDocument();
        const pressure = await screen.findByText('Pressure');
        expect(pressure).toBeInTheDocument();
        const humidity = await screen.findByText('Humidity');
        expect(humidity).toBeInTheDocument();
        const wind = await screen.findByText('Wind');
        expect(wind).toBeInTheDocument();
        const message = await screen.findByText('Message');
        expect(message).toBeInTheDocument();

        const messages = await screen.findByText('It is windy outside. Watch out! 💨.');
        expect(messages).toBeInTheDocument();

        await tomorrow.click();
        waitFor(() => {
            const nodata = screen.getByText('No data available.');
            expect(nodata).toBeInTheDocument();
        })

        await dayAfterTomorrow.click();
        waitFor(() => {
            const nodata = screen.getByText('No data available.');
            expect(nodata).toBeInTheDocument();
        })
    });
})