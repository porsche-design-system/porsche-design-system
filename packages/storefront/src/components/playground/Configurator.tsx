'use client';

import type { Framework, FrameworkMarkup } from '@porsche-design-system/shared';
import { openInStackblitz } from '@porsche-design-system/stackblitz';
import React, { type ReactNode, useEffect, useState } from 'react';
import { ConfiguratorControls } from '@/components/playground/ConfiguratorControls';
import { Playground } from '@/components/playground/Playground';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';
import { createStackblitzMarkupFromStory } from '@/lib/stackblitz/createStackblitzMarkupFromStory';
import type { SlotStories, Story, StoryState } from '@/models/story';
import { createFrameworkMarkup } from '@/utils/generator/createFrameworkMarkup';
import { type ConfiguratorTagNames, createElements, type HTMLTagOrComponent } from '@/utils/generator/generator';

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
  const { storefrontTheme } = useStorefrontTheme();
  const { storefrontFramework } = useStorefrontFramework();
  const [exampleState, setExampleState] = useState<StoryState<HTMLTagOrComponent>>(story.state ?? {});
  const [exampleElement, setExampleElement] = useState<ReactNode>(
    createElements(story.generator(story.state), setExampleState)
  );
  const [exampleMarkup, setExampleMarkup] = useState<FrameworkMarkup>(
    createFrameworkMarkup(story.generator(story.state), story.state, storefrontTheme)
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: only thing that will change is the state
  useEffect(() => {
    const generatedStory = story.generator(exampleState);
    setExampleElement(createElements(generatedStory, setExampleState));
    setExampleMarkup(createFrameworkMarkup(generatedStory, exampleState, storefrontTheme));
  }, [exampleState, storefrontTheme]);

  const onOpenInStackblitz = () => {
    const markup = createStackblitzMarkupFromStory(story, exampleState, storefrontFramework, storefrontTheme);
    openInStackblitz(storefrontFramework as Framework, markup, storefrontTheme);
  };

  return (
    <>
      <Playground frameworkMarkup={exampleMarkup} onOpenInStackblitz={() => onOpenInStackblitz()}>
        {exampleElement}
      </Playground>
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
