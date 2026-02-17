'use client';

import type { Framework } from '@porsche-design-system/shared';
import { openInStackblitz } from '@porsche-design-system/stackblitz';
import React, { type ReactNode, useEffect, useMemo, useState } from 'react';
import { Playground } from '@/components/playground/Playground';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';
import { createStackblitzMarkupFromStory } from '@/lib/stackblitz/createStackblitzMarkupFromStory';
import type { BackgroundColor } from '@/models/backgroundColor';
import type { Story } from '@/models/story';
import { createFrameworkMarkup } from '@/utils/generator/createFrameworkMarkup';
import { createElements, type HTMLTagOrComponent } from '@/utils/generator/generator';

type ComponentExampleProps = {
  story: Story<HTMLTagOrComponent>;
  backgroundColor?: BackgroundColor;
  showCodeBlock?: boolean;
};

export const ComponentStory = ({ story, backgroundColor, showCodeBlock = true }: ComponentExampleProps) => {
  const { storefrontTheme } = useStorefrontTheme();
  const { storefrontFramework } = useStorefrontFramework();
  // State needs to be updated for controlled components
  const [exampleState, setExampleState] = useState(story.state ?? {});
  const [exampleElement, setExampleElement] = useState<ReactNode>(
    createElements(story.generator(story.state), setExampleState)
  );

  // Markup won't change so it can be generated once
  const exampleMarkup = useMemo(() => {
    const state = story.state ?? {};
    const generatedStory = story.generator(state);
    return createFrameworkMarkup(generatedStory, state, storefrontTheme);
  }, [story, storefrontTheme]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: only thing that will change is the state
  useEffect(() => {
    const generatedStory = story.generator(exampleState);
    setExampleElement(createElements(generatedStory, setExampleState));
  }, [exampleState]);

  const onOpenInStackblitz = () => {
    const markup = createStackblitzMarkupFromStory(story, exampleState, storefrontFramework, storefrontTheme);
    openInStackblitz(storefrontFramework as Framework, markup, storefrontTheme);
  };

  return (
    <Playground
      frameworkMarkup={exampleMarkup}
      backgroundColor={backgroundColor}
      onOpenInStackblitz={onOpenInStackblitz}
      showCodeBlock={showCodeBlock}
    >
      {exampleElement}
    </Playground>
  );
};
