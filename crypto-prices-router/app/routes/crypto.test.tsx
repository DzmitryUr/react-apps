import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Crypto from './crypto';
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';

vi.mock('axios'); // Mocking axios

describe('Crypto Component', () => {
  const mockAxios = new AxiosMockAdapter(axios);

  // Setup a successful response
  beforeEach(() => {
    mockAxios.onGet('https://api.coincap.io/v2/assets/bitcoin').reply(200, {
      data: {
        name: 'Bitcoin',
        priceUsd: '50000',
        supply: '18000000',
        marketCapUsd: '900000000000',
      },
    });
  });

  it('does not render without loaderData', () => {
    render(<Crypto loaderData={{ loaderData: null }} />);
    expect(screen.queryByText(/Info about/i)).toBeNull();
  });

  // More tests can be added here for different scenarios
});
