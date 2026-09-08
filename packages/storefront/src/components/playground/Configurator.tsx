'use client';

import type { Framework, FrameworkMarkup } from '@porsche-design-system/shared';
import { openInStackblitz } from '@porsche-design-system/stackblitz';
import React, { type ReactNode, useEffect, useState } from 'react';
import { ConfiguratorControls } from '@/components/playground/ConfiguratorControls';
import type { ConfiguratorMode } from '@/components/playground/ConfigureBehavior';
import { Playground } from '@/components/playground/Playground';
import { useStorefrontColorScheme } from '@/hooks/useStorefrontColorScheme';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { createStackblitzMarkupFromStory } from '@/lib/stackblitz/createStackblitzMarkupFromStory';
import type { SlotStories, Story, StoryState } from '@/models/story';
import { createFrameworkMarkup } from '@/utils/generator/createFrameworkMarkup';
import { type ConfiguratorTagNames, createElements, type HTMLTagOrComponent } from '@/utils/generator/generator';

type ConfiguratorTestProps<T extends HTMLTagOrComponent> = {
  tagName: T;
  story: Story<HTMLTagOrComponent>;
  slotStories?: SlotStories<T>;
  /**
   * Optional controlled-mode variant. When provided, a "Behavior" card is rendered in the sidebar that
   * lets the user switch between the uncontrolled (`story`) and controlled (`controlledStory`) setups.
   * Used by dual-mode components such as `p-popover`.
   */
  controlledStory?: Story<HTMLTagOrComponent>;
  controlledSlotStories?: SlotStories<T>;
};

export const Configurator = <T extends HTMLTagOrComponent>({
  tagName,
  story,
  slotStories,
  controlledStory,
  controlledSlotStories,
}: ConfiguratorTestProps<T>) => {
  const { storefrontColorScheme } = useStorefrontColorScheme();
  const { framework } = useStorefrontFramework();

  const [mode, setMode] = useState<ConfiguratorMode>('uncontrolled');
  const activeStory = mode === 'controlled' && controlledStory ? controlledStory : story;
  const activeSlotStories = mode === 'controlled' && controlledStory ? controlledSlotStories : slotStories;

  const [exampleState, setExampleState] = useState<StoryState<HTMLTagOrComponent>>(activeStory.state ?? {});
  const [exampleElement, setExampleElement] = useState<ReactNode>(
    createElements(activeStory.generator(activeStory.state), setExampleState)
  );
  const [exampleMarkup, setExampleMarkup] = useState<FrameworkMarkup>(
    createFrameworkMarkup(activeStory.generator(activeStory.state), activeStory.state, storefrontColorScheme)
  );

  // Reset the configured state to the active story's defaults whenever the mode changes.
  useEffect(() => {
    setExampleState(activeStory.state ?? {});
  }, [mode]);

  useEffect(() => {
    const generatedStory = activeStory.generator(exampleState);
    setExampleElement(createElements(generatedStory, setExampleState));
    setExampleMarkup(createFrameworkMarkup(generatedStory, exampleState, storefrontColorScheme));
  }, [exampleState, storefrontColorScheme, activeStory]);

  const onOpenInStackblitz = () => {
    const markup = createStackblitzMarkupFromStory(activeStory, exampleState, framework, storefrontColorScheme);
    openInStackblitz(framework, markup, storefrontColorScheme);
  };

  return (
    <>
      <Playground frameworkMarkup={exampleMarkup} onOpenInStackblitz={() => onOpenInStackblitz()}>
        {exampleElement}
      </Playground>
      <ConfiguratorControls
        tagName={tagName as ConfiguratorTagNames}
        defaultStoryState={activeStory.state ?? {}}
        storyState={exampleState as StoryState<ConfiguratorTagNames>}
        setStoryState={setExampleState}
        slotStories={activeSlotStories as SlotStories<ConfiguratorTagNames>}
        requiredSlots={activeStory.requiredSlots}
        disabledProps={activeStory.disabledProps}
        mode={mode}
        onUpdateMode={setMode}
        hasControlledStory={!!controlledStory}
      />
    </>
  );
};
