import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Axios from 'axios';
import LyricsSearch from './LyricsSearch';

// Mock Axios
vi.mock('axios');

describe('LyricsSearch component', () => {
  const mockUrl = 'http://example.com/api';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render the component correctly', () => {
    render(<LyricsSearch url={mockUrl} />);

    expect(screen.getByText(/Lyrics Search/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Artist Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Song Name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  test('should show error when API call fails', async () => {
    const errorMessage = 'Request failed with status code 404';
    Axios.get.mockRejectedValueOnce(new Error(errorMessage));

    render(<LyricsSearch url={mockUrl} />);

    fireEvent.change(screen.getByPlaceholderText(/Artist Name/i), {
      target: { value: 'Artist' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Song Name/i), {
      target: { value: 'Song' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /Search/i }));

    await waitFor(() => {
      expect(Axios.get).toHaveBeenCalledTimes(1);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('should display lyrics when API call succeeds', async () => {
    const mockLyrics = 'Sample lyrics';
    Axios.get.mockResolvedValueOnce({ data: { lyrics: mockLyrics } });

    render(<LyricsSearch url={mockUrl} />);

    fireEvent.change(screen.getByPlaceholderText(/Artist Name/i), {
      target: { value: 'Artist' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Song Name/i), {
      target: { value: 'Song' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /Search/i }));

    await waitFor(() => {
      expect(Axios.get).toHaveBeenCalledTimes(1);
      expect(screen.getByText(mockLyrics)).toBeInTheDocument();
    });
  });

  test('shoulf do not call API if artist or song is empty', async () => {
    render(<LyricsSearch url={mockUrl} />);

    fireEvent.change(screen.getByPlaceholderText(/Artist Name/i), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Song Name/i), {
      target: { value: 'Song' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /Search/i }));

    await waitFor(() => {
      expect(Axios.get).not.toHaveBeenCalled();
    });
  });
});
