import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { VersionSelect } from '@/components/common/VersionSelect';
import type { PDSVersionGroup } from '@/models/pdsVersion';

const mocks = vi.hoisted(() => ({ isDev: false }));

vi.mock('@/utils/isDev', () => ({
  get isDevEnvironment() {
    return mocks.isDev;
  },
}));

const origin = 'https://designsystem.porsche.com';
const pdsVersion: PDSVersionGroup = { all: ['4.7.0', '4.6.0', '2', '1'], current: '4.6.0', latest: '4.7.0' };

const renderVersionSelect = (version: Partial<PDSVersionGroup> = {}) =>
  render(
    <PorscheDesignSystemProvider>
      <VersionSelect pdsVersion={{ ...pdsVersion, ...version }} />
    </PorscheDesignSystemProvider>
  );

const getSelect = () => document.querySelector('p-select') as HTMLElement & Record<string, unknown>;

const selectVersion = (value: string) => fireEvent(getSelect(), new CustomEvent('change', { detail: { value } }));

describe('VersionSelect', () => {
  beforeEach(() => {
    mocks.isDev = false;
    // `window.location` cannot be redefined in jsdom, so it is stubbed as a whole to capture the navigation target
    vi.stubGlobal('location', { origin, href: `${origin}/v4.6.0/` });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should render one option per version', () => {
    renderVersionSelect();

    expect([...document.querySelectorAll('p-select-option')].map(({ textContent }) => textContent)).toEqual([
      'v4.7.0',
      'v4.6.0',
      'v2',
      'v1',
    ]);
  });

  it('should select the running version and keep its label as accessible name', () => {
    renderVersionSelect();

    expect(getSelect().value).toBe('4.6.0');
    expect(getSelect().label).toBe('Switch version');
  });

  it.each<[version: string, path: string]>([
    ['4.7.0', '/v4'],
    ['4.5.0', '/v4.5.0'],
    ['2', '/v2'],
  ])('should navigate to the deployment of %j at %j', (version, path) => {
    renderVersionSelect();

    selectVersion(version);

    expect(window.location.href).toBe(`${origin}${path}`);
  });

  it('should offer a button that navigates to the latest release when an earlier release is running', () => {
    renderVersionSelect();

    fireEvent.click(screen.getByText('Use Latest Release'));

    expect(window.location.href).toBe(`${origin}/v4`);
  });

  it('should not offer the latest release button when the latest release is running', () => {
    renderVersionSelect({ current: '4.7.0' });

    expect(screen.queryByText('Use Latest Release')).not.toBeInTheDocument();
  });

  it('should not offer the latest release button while the latest release is unknown', () => {
    renderVersionSelect({ latest: undefined });

    expect(screen.queryByText('Use Latest Release')).not.toBeInTheDocument();
  });

  it('should navigate to the exact version while the latest release is unknown', () => {
    renderVersionSelect({ latest: undefined });

    selectVersion('4.7.0');

    expect(window.location.href).toBe(`${origin}/v4.7.0`);
  });

  it('should not offer the latest release button in the development environment', () => {
    mocks.isDev = true;

    renderVersionSelect();

    expect(screen.queryByText('Use Latest Release')).not.toBeInTheDocument();
  });
});
