import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { FrameworkTabs } from '@/components/common/FrameworkTabs';
import { StorefrontFrameworkProvider } from '@/components/providers/StorefrontFrameworkProvider';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';

const SelectedFramework = () => {
  const { storefrontFramework, framework } = useStorefrontFramework();

  return <div data-testid="selection">{`${storefrontFramework}|${framework}`}</div>;
};

const selectTab = (activeTabIndex: number) =>
  fireEvent(
    // biome-ignore lint/style/noNonNullAssertion: the tab bar is rendered by the component under test
    document.querySelector('p-tabs-bar')!,
    new CustomEvent('update', { detail: { activeTabIndex } })
  );

const renderTabs = (next?: boolean) =>
  render(
    <PorscheDesignSystemProvider>
      <StorefrontFrameworkProvider>
        <FrameworkTabs next={next} label="Select the framework" />
        <SelectedFramework />
      </StorefrontFrameworkProvider>
    </PorscheDesignSystemProvider>
  );

describe('FrameworkTabs', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('offers the supported frameworks and adds Next on demand', () => {
    const { unmount } = renderTabs();

    expect(screen.getAllByRole('button').map(({ textContent }) => textContent)).toEqual([
      'Vanilla JS',
      'Angular',
      'React',
      'Vue',
    ]);

    unmount();
    renderTabs(true);

    expect(screen.getAllByRole('button').map(({ textContent }) => textContent)).toEqual([
      'Vanilla JS',
      'Angular',
      'React',
      'Vue',
      'Next',
    ]);
  });

  it('keeps Next as selection and resolves it to React', () => {
    renderTabs(true);
    selectTab(4);

    expect(screen.getByTestId('selection')).toHaveTextContent('next|react');
  });

  it('falls back to the resolved framework where Next is not offered', () => {
    localStorage.setItem('storefrontFramework', 'next');
    renderTabs();

    expect(document.querySelector<HTMLElement & { activeTabIndex: number }>('p-tabs-bar')?.activeTabIndex).toBe(2);
  });
});
