import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StorefrontDirectionProvider } from '@/components/providers/StorefrontDirectionProvider';
import { useDirection } from '@/hooks/useDirection';

vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
});

const TestComponent = () => {
  const { storefrontDirection, setStorefrontDirection } = useDirection();

  return (
    <>
      <div data-testid="direction">{storefrontDirection}</div>
      <button type="button" onClick={() => setStorefrontDirection('rtl')}>
        Set RTL
      </button>
    </>
  );
};

describe('StorefrontDirectionProvider', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    document.documentElement.dir = ''; // reset dir
  });

  it('should provide default direction if no localStorage is set', () => {
    (localStorage.getItem as any).mockReturnValue(null);

    render(
      <StorefrontDirectionProvider>
        <TestComponent />
      </StorefrontDirectionProvider>
    );

    expect(screen.getByTestId('direction')).toHaveTextContent('ltr');
  });

  it('should initialize from localStorage if available', () => {
    (localStorage.getItem as any).mockReturnValue('rtl');

    render(
      <StorefrontDirectionProvider>
        <TestComponent />
      </StorefrontDirectionProvider>
    );

    expect(screen.getByTestId('direction')).toHaveTextContent('rtl');
  });

  it('should update direction, call localStorage.setItem, and update document direction', async () => {
    render(
      <StorefrontDirectionProvider>
        <TestComponent />
      </StorefrontDirectionProvider>
    );

    screen.getByText('Set RTL').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('storefrontDirection', 'rtl');

    await waitFor(() => {
      expect(screen.getByTestId('direction')).toHaveTextContent('rtl');
      expect(document.documentElement.dir).toBe('rtl');
    });
  });
});
