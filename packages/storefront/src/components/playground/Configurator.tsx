// @ts-nocheck

'use client';

import { ConfiguratorControls, type ConfiguratorTagNames } from '@/components/playground/ConfiguratorControls';
import { Playground } from '@/components/playground/Playground';
import type { FrameworkMarkup } from '@/models/framework';
import type { SlotStories, Story } from '@/models/story';
import { generateAngularMarkup } from '@/utils/generator/generateAngularMarkup';
import { generateReactMarkup } from '@/utils/generator/generateReactMarkup';
import { generateVanillaJsMarkup } from '@/utils/generator/generateVanillaJsMarkup';
import { generateVueMarkup } from '@/utils/generator/generateVueMarkup';
import { createElements } from '@/utils/generator/generator';
import React, { type ReactNode, useEffect, useState } from 'react';

type ConfiguratorTestProps = {
  tagName: ConfiguratorTagNames;
  story: Story;
  slotStories?: SlotStories;
};

export const Configurator = ({ tagName, story, slotStories }: ConfiguratorTestProps) => {
  const [exampleState, setExampleState] = useState(story.state ?? {});
  const [exampleElement, setExampleElement] = useState<ReactNode>(
    createElements(story.generator(story.state), setExampleState)
  );
  const [exampleMarkup, setExampleMarkup] = useState<FrameworkMarkup>({});

  // biome-ignore lint/correctness/useExhaustiveDependencies: only thing that will change is the state
  useEffect(() => {
    const generatedStory = story.generator(exampleState);
    setExampleElement(createElements(generatedStory, setExampleState));
    setExampleMarkup({
      'vanilla-js': generateVanillaJsMarkup(generatedStory),
      react: generateReactMarkup(generatedStory, story.state ?? {}),
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
