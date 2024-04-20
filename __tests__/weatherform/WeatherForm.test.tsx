import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import WeatherForm from "@/components/WeatherForm";
import { render, screen } from "@testing-library/react";

jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    usePathname: () => ({
      pathname: '',
    }),
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => { }
    })
  }
})

describe("Weather Form", () => {

  it("Should render weather form currectly", async () => {
    render(<WeatherForm />);
    const input = await screen.findByPlaceholderText('City name...');
    expect(input).toBeInTheDocument();
    const searchButton = await screen.findByText('Search');
    expect(searchButton).toBeInTheDocument();
  });
})