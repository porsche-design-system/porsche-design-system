import { StorefrontThemeProvider } from '@/components/providers/StorefrontThemeProvider';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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
      <button type="button" onClick={() => setStorefrontTheme('light')}>
        Set Light
      </button>
      <button type="button" onClick={() => setStorefrontTheme('dark')}>
        Set Dark
      </button>
      <button type="button" onClick={() => setStorefrontTheme('auto')}>
        Set Auto
      </button>
    </>
  );
};

describe('StorefrontThemeProvider', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    document.body.className = ''; // reset classes
  });

  it('should provide default theme if no localStorage is set', () => {
    (localStorage.getItem as any).mockReturnValue(null);

    render(
      <StorefrontThemeProvider>
        <TestComponent />
      </StorefrontThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('auto');
  });

  it('should initialize from localStorage if available', () => {
    (localStorage.getItem as any).mockReturnValue('dark');

    render(
      <StorefrontThemeProvider>
        <TestComponent />
      </StorefrontThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('should update theme, call localStorage.setItem, and update body class', async () => {
    render(
      <StorefrontThemeProvider>
        <TestComponent />
      </StorefrontThemeProvider>
    );

    screen.getByText('Set Dark').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('storefrontTheme', 'dark');

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(document.body.classList.contains('dark')).toBe(true);
      expect(document.body.classList.contains('light')).toBe(false);
      expect(document.body.classList.contains('auto')).toBe(false);
    });
  });

  it('should update theme, call localStorage.setItem, and update body class when changing theme back and forth', async () => {
    render(
      <StorefrontThemeProvider>
        <TestComponent />
      </StorefrontThemeProvider>
    );

    screen.getByText('Set Light').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('storefrontTheme', 'light');

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(document.body.classList.contains('dark')).toBe(false);
      expect(document.body.classList.contains('light')).toBe(true);
      expect(document.body.classList.contains('auto')).toBe(false);
    });

    screen.getByText('Set Auto').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('storefrontTheme', 'auto');

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('auto');
      expect(document.body.classList.contains('dark')).toBe(false);
      expect(document.body.classList.contains('light')).toBe(false);
      // auto is not applied as class since it's the default
      expect(document.body.classList.contains('auto')).toBe(false);
    });
  });
});
