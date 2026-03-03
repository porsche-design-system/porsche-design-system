import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StorefrontColorSchemeProvider } from '@/components/providers/StorefrontColorSchemeProvider';
import { useStorefrontColorScheme } from '@/hooks/useStorefrontColorScheme';

vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
});

vi.mock('@/hooks/usePreferredColorScheme', () => ({
  usePreferredColorScheme: vi.fn(),
}));

const TestComponent = () => {
  const { storefrontColorScheme, setStorefrontColorScheme } = useStorefrontColorScheme();

  return (
    <>
      <div data-testid="color-scheme">{storefrontColorScheme}</div>
      <button type="button" onClick={() => setStorefrontColorScheme('scheme-light')}>
        Set Light
      </button>
      <button type="button" onClick={() => setStorefrontColorScheme('scheme-dark')}>
        Set Dark
      </button>
      <button type="button" onClick={() => setStorefrontColorScheme('scheme-light-dark')}>
        Set Light Dark
      </button>
    </>
  );
};

describe('StorefrontColorSchemeProvider', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    document.documentElement.className = ''; // reset classes
  });

  it('should provide default colorScheme if no localStorage is set', () => {
    (localStorage.getItem as any).mockReturnValue(null);

    render(
      <StorefrontColorSchemeProvider>
        <TestComponent />
      </StorefrontColorSchemeProvider>
    );

    expect(screen.getByTestId('color-scheme')).toHaveTextContent('scheme-light-dark');
  });

  it('should initialize from localStorage if available', () => {
    (localStorage.getItem as any).mockReturnValue('scheme-dark');

    render(
      <StorefrontColorSchemeProvider>
        <TestComponent />
      </StorefrontColorSchemeProvider>
    );

    expect(screen.getByTestId('color-scheme')).toHaveTextContent('scheme-dark');
  });

  it('should update colorScheme, call localStorage.setItem, and update body class', async () => {
    render(
      <StorefrontColorSchemeProvider>
        <TestComponent />
      </StorefrontColorSchemeProvider>
    );

    screen.getByText('Set Dark').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('storefrontColorScheme', 'scheme-dark');

    await waitFor(() => {
      expect(screen.getByTestId('color-scheme')).toHaveTextContent('scheme-dark');
      expect(document.documentElement.classList.contains('scheme-dark')).toBe(true);
      expect(document.documentElement.classList.contains('scheme-light')).toBe(false);
      expect(document.documentElement.classList.contains('scheme-light-dark')).toBe(false);
    });
  });

  it('should update colorScheme, call localStorage.setItem, and update body class when changing colorScheme back and forth', async () => {
    render(
      <StorefrontColorSchemeProvider>
        <TestComponent />
      </StorefrontColorSchemeProvider>
    );

    screen.getByText('Set Light').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('storefrontColorScheme', 'scheme-light');

    await waitFor(() => {
      expect(screen.getByTestId('color-scheme')).toHaveTextContent('scheme-light');
      expect(document.documentElement.classList.contains('scheme-dark')).toBe(false);
      expect(document.documentElement.classList.contains('scheme-light')).toBe(true);
      expect(document.documentElement.classList.contains('scheme-light-dark')).toBe(false);
    });

    screen.getByText('Set Light Dark').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('storefrontColorScheme', 'scheme-light-dark');

    await waitFor(() => {
      expect(screen.getByTestId('color-scheme')).toHaveTextContent('scheme-light-dark');
      expect(document.documentElement.classList.contains('scheme-dark')).toBe(false);
      expect(document.documentElement.classList.contains('scheme-light')).toBe(false);
      expect(document.documentElement.classList.contains('scheme-light-dark')).toBe(true);
    });
  });
});
