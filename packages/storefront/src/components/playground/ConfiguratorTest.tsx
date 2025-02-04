// @ts-nocheck

'use client';

import { componentSlotStories } from '@/components/playground/componentStory';
import { createElements } from '@/utils/generator/generator';
import { type ReactNode, useEffect, useState } from 'react';

const config = {
  state: (setState = () => {}) => ({
    properties: {
      open: false,
      aria: { 'aria-label': 'Some Heading' },
    },
    events: {
      openFlyout: () => {
        setState((prevState) => ({
          ...prevState,
          properties: { ...prevState?.properties, open: true },
        }));
      },
      closeFlyout: () =>
        setState((prevState) => ({
          ...prevState,
          properties: { ...prevState?.properties, open: false },
        })),
    },
    slots: {
      header: componentSlotStories['p-flyout']?.header.basic,
      default: componentSlotStories['p-flyout']?.default.basic,
      footer: componentSlotStories['p-flyout']?.footer.basic,
      'sub-footer': componentSlotStories['p-flyout']?.['sub-footer'].basic,
    },
  }),
  generator: ({ properties, events, slots } = {}) => [
    {
      tag: 'p-button',
      properties: {
        type: 'button',
        aria: { 'aria-haspopup': 'dialog' },
        onClick: events.openFlyout,
      },
      children: ['Open Flyout'],
    },
    {
      tag: 'p-flyout',
      properties: {
        ...properties,
        onDismiss: events.closeFlyout,
      },
      children: [
        ...(slots?.header?.generator() ?? []),
        ...(slots?.default?.generator() ?? []),
        ...(slots?.footer?.generator() ?? []),
        ...(slots?.['sub-footer']?.generator() ?? []),
      ],
    },
  ],
};

const accordionConfig = {
  state: (setState: () => {}) => ({
    properties: { heading: 'Some Heading' },
    events: {
      onUpdate: (e) => {
        setState((prevState) => ({
          ...prevState,
          properties: { ...prevState?.properties, open: e.detail.open },
        }));
      },
    },
  }),
  generator: ({ properties, events } = {}) => [
    {
      tag: 'p-accordion',
      properties: { ...properties, onUpdate: events.onUpdate },
      children: [
        {
          tag: 'p-text',
          children: [
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore agna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
          ],
        },
      ],
    },
  ],
};

export const ConfiguratorTest = () => {
  const [exampleState, setExampleState] = useState();
  const [exampleElement, setExampleElement] = useState<ReactNode>(
    createElements(accordionConfig.generator(accordionConfig.state()))
  );

  useEffect(() => {
    // Initially pass the setter to the config so the state can be updated
    setExampleState(accordionConfig.state(setExampleState));
  }, []);

  useEffect(() => {
    if (exampleState) {
      const generatedConfig = accordionConfig.generator(exampleState);
      setExampleElement(createElements(generatedConfig));
    }
  }, [exampleState]);

  return <>{exampleElement}</>;
};
