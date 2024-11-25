import { render, screen } from '@testing-library/react';
import '@porsche-design-system/components-react/jsdom-polyfill';
import {
  PButton,
  PLink,
  PSegmentedControl,
  PSegmentedControlItem,
  PSelect,
  PSelectOption,
  PorscheDesignSystemProvider,
  componentsReady,
} from '@porsche-design-system/components-react/ssr';
import { getByRoleShadowed } from '@porsche-design-system/components-react/testing';
import { vi } from 'vitest';

it('should have working SSR PLink component', async () => {
  const consoleErrorSpy = vi.spyOn(global.console, 'error').mockImplementation(() => {});

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
  expect(consoleErrorSpy).not.toHaveBeenCalled();
});

it('should have working SSR PButton component', async () => {
  const consoleErrorSpy = vi.spyOn(global.console, 'error').mockImplementation(() => {});

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

  const btn = getByRoleShadowed('button');

  btn.click();

  // Check for console errors
  expect(consoleErrorSpy).not.toHaveBeenCalled();
});

it.only('should have working SSR PSegmentedControl component', async () => {
  const consoleErrorSpy = vi.spyOn(global.console, 'error').mockImplementation(() => {});

  render(
    <PorscheDesignSystemProvider>
      <PSegmentedControl value={2}>
        <PSegmentedControlItem value={1}>Option 1</PSegmentedControlItem>
        <PSegmentedControlItem value={2}>Option 2</PSegmentedControlItem>
        <PSegmentedControlItem value={3}>Option 3</PSegmentedControlItem>
      </PSegmentedControl>
    </PorscheDesignSystemProvider>
  );

  // Check for <template> tags
  expect(document.querySelectorAll('template')).toHaveLength(0);

  const componentsReadyCount = await componentsReady();
  expect(componentsReadyCount).toBe(4); // 1 control + 3 items

  const segmentedControl: Element & { value: number } = document.querySelector('p-segmented-control');
  const option3 = screen.getByText('Option 3');

  // Check if shadowRoot is populated
  const shadowRoot = segmentedControl.shadowRoot;
  expect(shadowRoot.innerHTML.trim()).not.toBe('');

  // Simulate click
  await option3.click();
  // option3.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

  // Validate that the value has changed
  expect(segmentedControl.value).toBe(3);

  // Check for console errors
  expect(consoleErrorSpy).not.toHaveBeenCalled();
});

it('should have working SSR PSelect component', async () => {
  const consoleErrorSpy = vi.spyOn(global.console, 'error').mockImplementation(() => {});

  render(
    <PorscheDesignSystemProvider>
      <PSelect value="2" name="some-select">
        <PSelectOption value="1">Option 1</PSelectOption>
        <PSelectOption value="2">Option 2</PSelectOption>
        <PSelectOption value="3">Option 3</PSelectOption>
      </PSelect>
    </PorscheDesignSystemProvider>
  );

  // Check for <template> tags
  expect(document.querySelectorAll('template')).toHaveLength(0);

  const componentsReadyCount = await componentsReady();
  expect(componentsReadyCount).toBe(4); // 1 control + 3 items

  const select: Element & { value: string } = document.querySelector('p-select');

  const option3 = screen.getByText('Option 3');

  // Check if shadowRoot is populated
  const shadowRoot = select.shadowRoot;
  expect(shadowRoot.innerHTML.trim()).not.toBe('');

  // Simulate click
  option3.click();

  // Validate that the value has changed
  expect(select.value).toBe('3');

  // Check for console errors
  expect(consoleErrorSpy).not.toHaveBeenCalled();
});
