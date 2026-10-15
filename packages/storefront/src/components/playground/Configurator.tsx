'use client';

import { openInStackblitz } from '@porsche-design-system/stackblitz';
import {
  type ConfiguratorTagNames,
  getStoryMarkup,
  type HTMLTagOrComponent,
  type SlotStories,
  type Story,
  type StoryState,
} from '@porsche-design-system/story-generator';
import { StoryPreview } from '@porsche-design-system/story-generator/react';
import React, { useEffect, useMemo, useState } from 'react';
import { ConfiguratorControls } from '@/components/playground/ConfiguratorControls';
import type { ConfiguratorMode } from '@/components/playground/ConfigureBehavior';
import { Playground } from '@/components/playground/Playground';
import { useStorefrontColorScheme } from '@/hooks/useStorefrontColorScheme';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';

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
  const exampleMarkup = useMemo(
    () => getStoryMarkup(activeStory, { state: exampleState, colorScheme: storefrontColorScheme }),
    [activeStory, exampleState, storefrontColorScheme]
  );

  // Reset the configured state to the active story's defaults whenever the mode changes.
  useEffect(() => {
    setExampleState(activeStory.state ?? {});
  }, [mode]);

  const onOpenInStackblitz = () => {
    const markup = getStoryMarkup(activeStory, {
      state: exampleState,
      colorScheme: storefrontColorScheme,
      output: 'project',
    });
    openInStackblitz(framework, markup[framework], storefrontColorScheme);
  };

  return (
    <>
      <Playground frameworkMarkup={exampleMarkup} onOpenInStackblitz={() => onOpenInStackblitz()}>
        <StoryPreview story={activeStory} state={exampleState} onStateChange={setExampleState} />
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
