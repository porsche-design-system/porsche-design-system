'use client';

import { ConfiguratorControls } from '@/components/playground/ConfiguratorControls';
import { Playground } from '@/components/playground/Playground';
import { StackblitzButton } from '@/components/playground/StackblitzButton';
import type { FrameworkConfiguratorMarkup, FrameworkMarkup } from '@/models/framework';
import type { SlotStories, Story, StoryState } from '@/models/story';
import { generateAngularMarkup, getAngularCode } from '@/utils/generator/generateAngularMarkup';
import { generateReactMarkup, getReactCode } from '@/utils/generator/generateReactMarkup';
import { generateVanillaJsMarkup, getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { generateVueMarkup, getVueCode } from '@/utils/generator/generateVueMarkup';
import { type ConfiguratorTagNames, type HTMLTagOrComponent, createElements } from '@/utils/generator/generator';
import React, { type ReactNode, useEffect, useState } from 'react';

type ConfiguratorTestProps<T extends HTMLTagOrComponent> = {
  tagName: T;
  story: Story<HTMLTagOrComponent>;
  slotStories?: SlotStories<T>;
};

export const Configurator = <T extends HTMLTagOrComponent>({
  tagName,
  story,
  slotStories,
}: ConfiguratorTestProps<T>) => {
  const [exampleState, setExampleState] = useState<StoryState<HTMLTagOrComponent>>(story.state ?? {});
  const [exampleElement, setExampleElement] = useState<ReactNode>(
    createElements(story.generator(story.state), setExampleState)
  );
  const [exampleConfiguratorMarkup, setExampleConfiguratorMarkup] = useState<FrameworkConfiguratorMarkup>({
    'vanilla-js': { markup: '', states: '', eventHandlers: '' },
    react: { markup: '', states: '', eventHandlers: '' },
    angular: { markup: '', states: '', eventHandlers: '' },
    vue: { markup: '', states: '', eventHandlers: '' },
  });
  const [exampleMarkup, setExampleMarkup] = useState<FrameworkMarkup>({});

  // biome-ignore lint/correctness/useExhaustiveDependencies: only thing that will change is the state
  useEffect(() => {
    const generatedStory = story.generator(exampleState);
    setExampleElement(createElements(generatedStory, setExampleState));
    const generatedMarkup = {
      'vanilla-js': generateVanillaJsMarkup(generatedStory),
      react: generateReactMarkup(generatedStory, story.state ?? {}),
      angular: generateAngularMarkup(generatedStory, story.state ?? {}),
      vue: generateVueMarkup(generatedStory, story.state ?? {}),
    };
    setExampleConfiguratorMarkup(generatedMarkup);
    setExampleMarkup({
      'vanilla-js': getVanillaJsCode(generatedMarkup['vanilla-js']),
      react: getReactCode(generatedMarkup.react),
      angular: getAngularCode(generatedMarkup.angular),
      vue: getVueCode(generatedMarkup.vue),
    });
  }, [exampleState]);

  return (
    <>
      <Playground frameworkMarkup={exampleMarkup}>{exampleElement}</Playground>
      <StackblitzButton frameworkConfiguratorMarkup={exampleConfiguratorMarkup} />
      <ConfiguratorControls
        tagName={tagName as ConfiguratorTagNames}
        defaultStoryState={story.state ?? {}}
        storyState={exampleState as StoryState<ConfiguratorTagNames>}
        setStoryState={setExampleState}
        slotStories={slotStories as SlotStories<ConfiguratorTagNames>}
      />
    </>
  );
};
