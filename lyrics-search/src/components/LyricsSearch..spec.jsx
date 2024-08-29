import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, vi } from 'vitest';

import LyricsSearch from './LyricsSearch';

describe('LyricsSearch component', () => {
  const mockUrl = 'http://example.com';

  beforeEach(() => vi.clearAllMocks());

  test('should render the component correctly', () => {
    render(<LyricsSearch url={mockUrl} />);

    expect(screen.getByText(/Lyrics Search/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Artist Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Song Name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });
});
