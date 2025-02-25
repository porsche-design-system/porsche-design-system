'use client';

import { ConfiguratorControls } from '@/components/playground/ConfiguratorControls';
import { Playground } from '@/components/playground/Playground';
import type { FrameworkMarkup } from '@/models/framework';
import type { SlotStories, Story, StoryState } from '@/models/story';
import { generateAngularMarkup } from '@/utils/generator/generateAngularMarkup';
import { generateReactMarkup } from '@/utils/generator/generateReactMarkup';
import { generateVanillaJsMarkup } from '@/utils/generator/generateVanillaJsMarkup';
import { generateVueMarkup } from '@/utils/generator/generateVueMarkup';
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
  const [exampleMarkup, setExampleMarkup] = useState<FrameworkMarkup>({});

  // TODO: regenerate onUpdateProps/Slots/Variables instead of useEffect
  // biome-ignore lint/correctness/useExhaustiveDependencies: only thing that will change is the state
  useEffect(() => {
    const generatedStory = story.generator(exampleState);
    setExampleElement(createElements(generatedStory, setExampleState));
    setExampleMarkup({
      'vanilla-js': generateVanillaJsMarkup(generatedStory),
      react: generateReactMarkup(generatedStory, story.state ?? {}),
      angular: generateAngularMarkup(generatedStory, story.state ?? {}),
      vue: generateVueMarkup(generatedStory, story.state ?? {}),
    });
  }, [exampleState]);

  return (
    <>
      <Playground frameworkMarkup={exampleMarkup}>{exampleElement}</Playground>
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
