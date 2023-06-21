import { render, screen } from '@testing-library/react';
import {
  componentsReady,
  PButton,
  PLink,
  PorscheDesignSystemProvider,
  PSegmentedControl,
  PSegmentedControlItem,
} from '@porsche-design-system/components-react/ssr';
import '@porsche-design-system/components-react/jsdom-polyfill';

describe('SSR components', () => {
  let consoleErrors = [];

  beforeAll(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      consoleErrors.push(args);
      originalConsoleError(...args);
    };
  });

  afterEach(() => {
    consoleErrors = [];
  });

  it('should have working SSR PLink component', async () => {
    render(
      <PorscheDesignSystemProvider>
        <PLink href={'/'} data-testid={'p-link'}>
          Button
        </PLink>
      </PorscheDesignSystemProvider>
    );

    // Check for <template> tags
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelectorAll('template')).toHaveLength(0);

    const componentsReadyCount = await componentsReady();
    expect(componentsReadyCount).toBe(1);

    const component = screen.getByTestId('p-link');

    // Check if shadowRoot is populated
    const shadowRoot = component.shadowRoot;
    expect(shadowRoot.innerHTML.trim()).not.toBe('');

    // Check for console errors
    expect(consoleErrors).toEqual([]);
  });

  it('should have working SSR PButton component', async () => {
    render(
      <PorscheDesignSystemProvider>
        <PButton data-testid={'p-button'}>Button</PButton>
      </PorscheDesignSystemProvider>
    );

    // Check for <template> tags
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelectorAll('template')).toHaveLength(0);

    const componentsReadyCount = await componentsReady();
    expect(componentsReadyCount).toBe(1);

    const component = screen.getByTestId('p-button');

    // Check if shadowRoot is populated
    const shadowRoot = component.shadowRoot;
    expect(shadowRoot.innerHTML.trim()).not.toBe('');

    // Check for console errors
    expect(consoleErrors).toEqual([]);
  });

  it('should have working SSR PSegmentedControl component', async () => {
    render(
      <PorscheDesignSystemProvider>
        <PSegmentedControl data-testid={'p-segmented-control'} value={2} onUpdate={(e) => console.log(e)}>
          <PSegmentedControlItem value={1}>Option 1</PSegmentedControlItem>
          <PSegmentedControlItem value={2}>Option 2</PSegmentedControlItem>
          <PSegmentedControlItem value={3}>Option 3</PSegmentedControlItem>
          <PSegmentedControlItem value={4}>Option 4</PSegmentedControlItem>
          <PSegmentedControlItem value={5}>Option 5</PSegmentedControlItem>
        </PSegmentedControl>
      </PorscheDesignSystemProvider>
    );

    // Check for <template> tags
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelectorAll('template')).toHaveLength(0);

    const componentsReadyCount = await componentsReady();
    expect(componentsReadyCount).toBe(6);

    const component = screen.getByTestId('p-segmented-control');

    // Check if shadowRoot is populated
    const shadowRoot = component.shadowRoot;
    expect(shadowRoot.innerHTML.trim()).not.toBe('');

    // Change selected option
    await screen.getByText('Option 3').click();
    expect(component).toHaveValue(3);

    // Check for console errors
    expect(consoleErrors).toEqual([]);
  });
});
