import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';
import fetch from 'jest-fetch-mock';
import createGifResponse from '../utils/utils';

const gifResponse1 = createGifResponse();

describe('Test App', () => {
  beforeAll(() => {
    fetch.mockResponse(gifResponse1);
  });

  afterAll(() => {
    fetch.resetMocks();
  });

  test('renders App component structure', async () => {
    let container: any;
    await act(async () => {
      render(<App />, container);
    });
    const GiphyElement = screen.getByTestId(/GiphyLayoutContainer/i);
    const MasonryLayoutElement = screen.getByTestId(/MasonryLayoutContainer/i);

    expect(GiphyElement).toBeInTheDocument();
    expect(MasonryLayoutElement).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(5);
  });
});
