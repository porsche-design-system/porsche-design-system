import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StorefrontTextZoomProvider } from '@/components/providers/StorefrontTextZoomProvider';
import { useTextZoom } from '@/hooks/useTextZoom';

vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
});

const TestComponent = () => {
  const { storefrontTextZoom, setStorefrontTextZoom } = useTextZoom();

  return (
    <>
      <div data-testid="text-zoom">{storefrontTextZoom}</div>
      <button type="button" onClick={() => setStorefrontTextZoom('150%')}>
        Set 150%
      </button>
    </>
  );
};

describe('StorefrontTextZoomProvider', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    document.documentElement.style.fontSize = ''; // reset zoom
  });

  it('should provide default text zoom if no localStorage is set', () => {
    (localStorage.getItem as any).mockReturnValue(null);

    render(
      <StorefrontTextZoomProvider>
        <TestComponent />
      </StorefrontTextZoomProvider>
    );

    expect(screen.getByTestId('text-zoom')).toHaveTextContent('100%');
  });

  it('should initialize from localStorage if available', () => {
    (localStorage.getItem as any).mockReturnValue('150%');

    render(
      <StorefrontTextZoomProvider>
        <TestComponent />
      </StorefrontTextZoomProvider>
    );

    expect(screen.getByTestId('text-zoom')).toHaveTextContent('150%');
  });

  it('should update text zoom, call localStorage.setItem, and update document fontSize', async () => {
    render(
      <StorefrontTextZoomProvider>
        <TestComponent />
      </StorefrontTextZoomProvider>
    );

    screen.getByText('Set 150%').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('storefrontTextZoom', '150%');

    await waitFor(() => {
      expect(screen.getByTestId('text-zoom')).toHaveTextContent('150%');
      expect(document.documentElement.style.fontSize).toBe('150%');
    });
  });
});
