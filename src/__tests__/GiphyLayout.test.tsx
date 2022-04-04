import React from 'react';
import { prettyDOM, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import fetch from 'jest-fetch-mock';
import createGifResponse from '../utils/utils';
import GiphyLayout, { GiphyLayoutProps } from '../components/GiphyLayout';

const gifResponse1 = createGifResponse('dogs', '300', '300');
const gifResponse2 = createGifResponse('cats', '400', '400');

describe('Test GiphyLayout', () => {
  beforeAll(() => {
    fetch.mockResponses([gifResponse1, { status: 200 }], [gifResponse2, { status: 200 }]);
  });

  afterAll(() => {
    fetch.resetMocks();
  });

  test('renders multiple gifs', async () => {
    let container: any;
    const props: GiphyLayoutProps = {
      words: ['cats', 'dogs'],
      sizes: {
        columns: 2,
        gutter: 25,
      },
    };
    await act(async () => {
      render(<GiphyLayout {...props} />, container);
    });

    const loader = screen.getByTestId('puff-loading');
    expect(loader).toBeInTheDocument();
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    const dogsGifElement = await screen.findByAltText('dogs GIF');
    const catsGifElement = await screen.findByAltText('cats GIF');

    const loader2 = screen.queryByTestId('puff-loading');

    expect(loader2).toBeNull();
    expect(catsGifElement).toBeInTheDocument();
    expect(dogsGifElement).toBeInTheDocument();
    expect(dogsGifElement).toHaveProperty('height', 300);
    expect(dogsGifElement).toHaveProperty('width', 300);
    expect(catsGifElement).toHaveProperty('height', 400);
    expect(catsGifElement).toHaveProperty('width', 400);
  });
});
