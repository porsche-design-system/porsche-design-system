import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StorefrontThemeProvider } from '@/components/providers/StorefrontThemeProvider';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';

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
  const { storefrontTheme, setStorefrontTheme } = useStorefrontTheme();

  return (
    <>
      <div data-testid="theme">{storefrontTheme}</div>
      <button type="button" onClick={() => setStorefrontTheme('scheme-light')}>
        Set Light
      </button>
      <button type="button" onClick={() => setStorefrontTheme('scheme-dark')}>
        Set Dark
      </button>
      <button type="button" onClick={() => setStorefrontTheme('scheme-light-dark')}>
        Set Light Dark
      </button>
    </>
  );
};

describe('StorefrontThemeProvider', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    document.documentElement.className = ''; // reset classes
  });

  it('should provide default theme if no localStorage is set', () => {
    (localStorage.getItem as any).mockReturnValue(null);

    render(
      <StorefrontThemeProvider>
        <TestComponent />
      </StorefrontThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('scheme-light-dark');
  });

  it('should initialize from localStorage if available', () => {
    (localStorage.getItem as any).mockReturnValue('scheme-dark');

    render(
      <StorefrontThemeProvider>
        <TestComponent />
      </StorefrontThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('scheme-dark');
  });

  it('should update theme, call localStorage.setItem, and update body class', async () => {
    render(
      <StorefrontThemeProvider>
        <TestComponent />
      </StorefrontThemeProvider>
    );

    screen.getByText('Set Dark').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('storefrontTheme', 'scheme-dark');

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('scheme-dark');
      expect(document.documentElement.classList.contains('scheme-dark')).toBe(true);
      expect(document.documentElement.classList.contains('scheme-light')).toBe(false);
      expect(document.documentElement.classList.contains('scheme-light-dark')).toBe(false);
    });
  });

  it('should update theme, call localStorage.setItem, and update body class when changing theme back and forth', async () => {
    render(
      <StorefrontThemeProvider>
        <TestComponent />
      </StorefrontThemeProvider>
    );

    screen.getByText('Set Light').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('storefrontTheme', 'scheme-light');

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('scheme-light');
      expect(document.documentElement.classList.contains('scheme-dark')).toBe(false);
      expect(document.documentElement.classList.contains('scheme-light')).toBe(true);
      expect(document.documentElement.classList.contains('scheme-light-dark')).toBe(false);
    });

    screen.getByText('Set Light Dark').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('storefrontTheme', 'scheme-light-dark');

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('scheme-light-dark');
      expect(document.documentElement.classList.contains('scheme-dark')).toBe(false);
      expect(document.documentElement.classList.contains('scheme-light')).toBe(false);
      expect(document.documentElement.classList.contains('scheme-light-dark')).toBe(true);
    });
  });
});
