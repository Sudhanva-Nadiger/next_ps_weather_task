import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import WeatherForm from '@/components/WeatherForm';

import { render } from "@testing-library/react";

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
    const { container } = render(<WeatherForm />);
    expect(container).toMatchSnapshot();
  });
})