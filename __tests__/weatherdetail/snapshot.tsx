import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';

import WeatherDetails from "@/components/WeatherDetails";
import { render } from "@testing-library/react";

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

describe('Should match snapshot', () => {
    it('when no query is given', async () => {
        const jsx = await WeatherDetails({});
        const { container } = render(jsx);

        expect(container).toMatchSnapshot();
    })

    it("Should show the returned message if city name is incorrect", async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve({cod: '400', message: 'message'}),
              }) as any;
        });
        
        const jsx = await WeatherDetails({q: 'q'});
        const { container } = render(jsx);
        
        expect(container).toMatchSnapshot();
        
    });

    it("Should show tabs", async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve({cod: '200', list: []}),
              }) as any;
        });

        global.fetch = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve({cod: '200', list: []}),
              }) as any;
        });
        
        const jsx = await WeatherDetails({q: 'q'});
        const { container } = render(jsx);

        expect(container).toMatchSnapshot();
    });

    it("Should show the details", async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve(MOCK_DATA),
              }) as any;
        });
        
        const jsx = await WeatherDetails({q: 'q'});
        const { container } = render(jsx);

        expect(container).toMatchSnapshot();
    });
})