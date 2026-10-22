'use client';

import { getFrameworkProject, openInStackblitz } from '@porsche-design-system/stackblitz';
import { getStoryMarkup, type HTMLTagOrComponent, type Story } from '@porsche-design-system/story-generator';
import { StoryPreview } from '@porsche-design-system/story-generator/react';
import React, { useMemo, useState } from 'react';
import { useStorefrontColorScheme } from '@/hooks/useStorefrontColorScheme';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import type { BackgroundColor } from '../Playground';
import { Playground } from '../Playground';

type ComponentExampleProps = {
  story: Story<HTMLTagOrComponent>;
  backgroundColor?: BackgroundColor;
  showCodeBlock?: boolean;
};

export const ComponentStory = ({ story, backgroundColor, showCodeBlock = true }: ComponentExampleProps) => {
  const { storefrontColorScheme } = useStorefrontColorScheme();
  const { framework } = useStorefrontFramework();
  // State needs to be updated for controlled components
  const [exampleState, setExampleState] = useState(story.state ?? {});

  // The code shows the story's initial state, so it doesn't follow the preview's state
  const exampleMarkup = useMemo(
    () => getStoryMarkup(story, { colorScheme: storefrontColorScheme }),
    [story, storefrontColorScheme]
  );

  const onOpenInStackblitz = () => {
    const markup = getStoryMarkup(story, {
      state: exampleState,
      colorScheme: storefrontColorScheme,
      output: 'project',
    });
    openInStackblitz(getFrameworkProject(framework, markup[framework], storefrontColorScheme));
  };

  return (
    <Playground
      frameworkMarkup={exampleMarkup}
      backgroundColor={backgroundColor}
      onOpenInStackblitz={onOpenInStackblitz}
      showCodeBlock={showCodeBlock}
    >
      <StoryPreview story={story} state={exampleState} onStateChange={setExampleState} />
    </Playground>
  );
};
