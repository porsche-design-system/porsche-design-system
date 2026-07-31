import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StorefrontFrameworkProvider } from '@/components/providers/StorefrontFrameworkProvider';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';

vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
});

const TestComponent = () => {
  const { storefrontFramework, framework, setStorefrontFramework } = useStorefrontFramework();

  return (
    <>
      <div data-testid="framework">{storefrontFramework}</div>
      <div data-testid="resolvedFramework">{framework}</div>
      <button type="button" onClick={() => setStorefrontFramework('react')}>
        Set React
      </button>
      <button type="button" onClick={() => setStorefrontFramework('next')}>
        Set Next
      </button>
    </>
  );
};

describe('StorefrontFrameworkProvider', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should provide default framework if no localStorage is set', () => {
    (localStorage.getItem as any).mockReturnValue(null);

    render(
      <StorefrontFrameworkProvider>
        <TestComponent />
      </StorefrontFrameworkProvider>
    );

    expect(screen.getByTestId('framework')).toHaveTextContent('vanilla-js');
  });

  it('should initialize from localStorage if available', () => {
    (localStorage.getItem as any).mockReturnValue('angular');

    render(
      <StorefrontFrameworkProvider>
        <TestComponent />
      </StorefrontFrameworkProvider>
    );

    expect(screen.getByTestId('framework')).toHaveTextContent('angular');
  });

  it('should update framework and call localStorage.setItem', async () => {
    render(
      <StorefrontFrameworkProvider>
        <TestComponent />
      </StorefrontFrameworkProvider>
    );

    screen.getByText('Set React').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('storefrontFramework', 'react');
    await waitFor(() => expect(screen.getByTestId('framework')).toHaveTextContent('react'));
  });

  it('should keep next as selection and resolve it to react', async () => {
    render(
      <StorefrontFrameworkProvider>
        <TestComponent />
      </StorefrontFrameworkProvider>
    );

    screen.getByText('Set Next').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('storefrontFramework', 'next');
    await waitFor(() => expect(screen.getByTestId('framework')).toHaveTextContent('next'));
    expect(screen.getByTestId('resolvedFramework')).toHaveTextContent('react');
  });
});
