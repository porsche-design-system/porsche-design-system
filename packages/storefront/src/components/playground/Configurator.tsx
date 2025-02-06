// @ts-nocheck

'use client';

import { ConfiguratorControls, type ConfiguratorTagNames } from '@/components/playground/ConfiguratorControls';
import { Playground } from '@/components/playground/Playground';
import { type SlotStories, type Story, componentSlotStories } from '@/components/playground/componentStory';
import type { FrameworkMarkup } from '@/models/framework';
import { generateAngularMarkup } from '@/utils/generator/generateAngularMarkup';
import { generateReactMarkup } from '@/utils/generator/generateReactMarkup';
import { generateVanillaJsMarkup } from '@/utils/generator/generateVanillaJsMarkup';
import { generateVueMarkup } from '@/utils/generator/generateVueMarkup';
import { createElements } from '@/utils/generator/generator';
import React, { type ReactNode, useEffect, useState } from 'react';

// const config = {
//   state: (setState = () => {}) => ({
//     properties: {
//       open: false,
//       aria: { 'aria-label': 'Some Heading' },
//     },
//     events: {
//       openFlyout: () => {
//         setState((prevState) => ({
//           ...prevState,
//           properties: { ...prevState?.properties, open: true },
//         }));
//       },
//       closeFlyout: () =>
//         setState((prevState) => ({
//           ...prevState,
//           properties: { ...prevState?.properties, open: false },
//         })),
//     },
//     slots: {
//       header: componentSlotStories['p-flyout']?.header.basic,
//       default: componentSlotStories['p-flyout']?.default.basic,
//       footer: componentSlotStories['p-flyout']?.footer.basic,
//       'sub-footer': componentSlotStories['p-flyout']?.['sub-footer'].basic,
//     },
//   }),
//   generator: ({ properties, events, slots } = {}) => [
//     {
//       tag: 'p-button',
//       properties: {
//         type: 'button',
//         aria: { 'aria-haspopup': 'dialog' },
//         onClick: events.openFlyout,
//       },
//       children: ['Open Flyout'],
//     },
//     {
//       tag: 'p-flyout',
//       properties: {
//         ...properties,
//         onDismiss: events.closeFlyout,
//       },
//       children: [
//         ...(slots?.header?.generator() ?? []),
//         ...(slots?.default?.generator() ?? []),
//         ...(slots?.footer?.generator() ?? []),
//         ...(slots?.['sub-footer']?.generator() ?? []),
//       ],
//     },
//   ],
// };
/**
 * eventName
 * value directly or detailKey of event (e.detail.value)
 * propToChange
 *
 * onUpdate: (e) => {
 *   eventName: 'update',
 *   value: e.detail.value,
 *   propToChange: open,
 * }
 *
 * controlled: {
 *   open: {
 *     initialValue: false;
 *     changeEvent: 'update',
 *     eventPayload?: 'value',
 *     value?: null,
 *   }
 * }
 *
 * React functionality setState on Event
 * Vanilla JS functionality document.querySelector on Event
 * Generate markup vanilla, react
 */

// Option 1
// const accordionConfig = {
//   state: (setState: () => {}) => ({
//     properties: { heading: 'Some Heading' },
//     events: {
//       onUpdate: (e) => {
//         setState((prevState) => ({
//           ...prevState,
//           properties: { ...prevState?.properties, open: e.detail.open },
//         }));
//       },
//     },
//   }),
//   generator: ({ properties, events } = {}) => [
//     {
//       tag: 'p-accordion',
//       properties: { ...properties, onUpdate: events.onUpdate },
//       children: [
//         {
//           tag: 'p-text',
//           children: [
//             'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore agna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
//           ],
//         },
//       ],
//     },
//   ],
// };
//
// export const ConfiguratorTest = () => {
//   const [exampleState, setExampleState] = useState();
//   const [exampleElement, setExampleElement] = useState<ReactNode>(
//     createElements(accordionConfig.generator(accordionConfig.state()))
//   );
//   const [exampleMarkup, setExampleMarkup] = useState<FrameworkMarkup>({});
//
//   useEffect(() => {
//     // Initially pass the setter to the config so the state can be updated by event callbacks
//     setExampleState(accordionConfig.state(setExampleState));
//   }, []);
//
//   useEffect(() => {
//     if (exampleState) {
//       const generatedConfig = accordionConfig.generator(exampleState);
//       setExampleElement(createElements(generatedConfig));
//       setExampleMarkup({
//         'vanilla-js': generateVanillaJsMarkup(generatedConfig),
//         react: generateReactMarkup(generatedConfig),
//         angular: generateAngularMarkup(generatedConfig),
//         vue: generateVueMarkup(generatedConfig),
//       });
//     }
//   }, [exampleState]);
//
//   return <Playground frameworkMarkup={exampleMarkup}>{exampleElement}</Playground>;
// };

// const config = {
//   state: {
//     properties: {
//       activeTabIndex: 0,
//     },
//   },
//   generator: ({ properties }, updateState) => [
//     {
//       tag: 'p-tabs-bar',
//       properties: {
//         ...properties,
//         onUpdate: (e) => updateState('p-link-tile-product', 'activeTabIndex', e.detail.activeTabIndex),
//       },
//       children: [
//         ...['Tab One', 'Tab Two', 'Tab Three'].map((tab) => ({
//           tag: 'button',
//           properties: {
//             type: 'button',
//           },
//           children: [tab],
//         })),
//       ],
//     },
//   ],
// };

type ConfiguratorTestProps = {
  tagName: ConfiguratorTagNames;
  story: Story;
  slotStories?: SlotStories;
};

export const Configurator = ({ tagName, story, slotStories }: ConfiguratorTestProps) => {
  const [exampleState, setExampleState] = useState(story.state ?? {});
  const [exampleElement, setExampleElement] = useState<ReactNode>(createElements(story.generator(story.state)));
  const [exampleMarkup, setExampleMarkup] = useState<FrameworkMarkup>({});

  const updateState = (_: string, property: string, value: any) => {
    setExampleState((prev) => ({ ...prev, properties: { ...prev.properties, [property]: value } }));
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: only has to run once on mount to pass the setter function to react to event updates
  useEffect(() => {
    setExampleElement(createElements(story.generator(story.state, updateState)));
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: only thing that will change is the state
  useEffect(() => {
    const generatedStory = story.generator(exampleState, updateState);
    setExampleElement(createElements(generatedStory));
    setExampleMarkup({
      'vanilla-js': generateVanillaJsMarkup(generatedStory),
      react: generateReactMarkup(generatedStory),
      angular: generateAngularMarkup(generatedStory),
      vue: generateVueMarkup(generatedStory),
    });
  }, [exampleState]);

  return (
    <>
      <Playground frameworkMarkup={exampleMarkup}>{exampleElement}</Playground>
      <ConfiguratorControls
        tagName={tagName}
        defaultStoryState={story.state}
        storyState={exampleState}
        setStoryState={setExampleState}
        slotStories={slotStories}
      />
    </>
  );
};
