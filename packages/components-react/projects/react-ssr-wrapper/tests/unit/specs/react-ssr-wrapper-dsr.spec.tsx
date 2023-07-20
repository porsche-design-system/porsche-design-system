import { render, screen } from '@testing-library/react';
import '@porsche-design-system/components-react/jsdom-polyfill';
import {
  componentsReady,
  PButton,
  PLink,
  PorscheDesignSystemProvider,
  PSegmentedControl,
  PSegmentedControlItem,
} from '@porsche-design-system/components-react/ssr';

describe('SSR components', () => {
  it('should have working SSR PLink component', async () => {
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation();

    render(
      <PorscheDesignSystemProvider>
        <PLink href={'/'}>Link</PLink>
      </PorscheDesignSystemProvider>
    );

    // Check for <template> tags
    expect(document.querySelectorAll('template')).toHaveLength(0);

    const componentsReadyCount = await componentsReady();
    expect(componentsReadyCount).toBe(1);

    // Check if shadowRoot is populated
    const shadowRoot = document.querySelector('p-link').shadowRoot;
    expect(shadowRoot.innerHTML.trim()).not.toBe('');

    // Check for console errors
    expect(consoleErrorSpy).not.toBeCalled();
  });

  it('should have working SSR PButton component', async () => {
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation();

    render(
      <PorscheDesignSystemProvider>
        <PButton>Button</PButton>
      </PorscheDesignSystemProvider>
    );

    // Check for <template> tags
    expect(document.querySelectorAll('template')).toHaveLength(0);

    const componentsReadyCount = await componentsReady();
    expect(componentsReadyCount).toBe(1);

    // Check if shadowRoot is populated
    const shadowRoot = document.querySelector('p-button').shadowRoot;
    expect(shadowRoot.innerHTML.trim()).not.toBe('');

    // Check for console errors
    expect(consoleErrorSpy).not.toBeCalled();
  });

  it('should have working SSR PSegmentedControl component', async () => {
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation();

    render(
      <PorscheDesignSystemProvider>
        <PSegmentedControl value={2}>
          <PSegmentedControlItem value={1}>Option 1</PSegmentedControlItem>
          <PSegmentedControlItem value={2}>Option 2</PSegmentedControlItem>
          <PSegmentedControlItem value={3}>Option 3</PSegmentedControlItem>
          <PSegmentedControlItem value={4}>Option 4</PSegmentedControlItem>
          <PSegmentedControlItem value={5}>Option 5</PSegmentedControlItem>
        </PSegmentedControl>
      </PorscheDesignSystemProvider>
    );

    // Check for <template> tags
    expect(document.querySelectorAll('template')).toHaveLength(0);

    const componentsReadyCount = await componentsReady();
    expect(componentsReadyCount).toBe(6);

    const component = document.querySelector('p-segmented-control');

    // Check if shadowRoot is populated
    const shadowRoot = component.shadowRoot;
    expect(shadowRoot.innerHTML.trim()).not.toBe('');

    // Change selected option
    await screen.getByText('Option 3').click();
    expect(component).toHaveValue(3);

    // Check for console errors
    expect(consoleErrorSpy).not.toBeCalled();
  });
});
