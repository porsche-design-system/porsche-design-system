'use client';

import { Playground } from '@/components/playground/Playground';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';
import { createStackblitzMarkupFromStory } from '@/lib/stackblitz/createStackblitzMarkupFromStory';
import { openInStackblitz } from '@/lib/stackblitz/openInStackblitz';
import type { BackgroundColor } from '@/models/backgroundColor';
import type { Story } from '@/models/story';
import { generateAngularMarkup, getAngularCode } from '@/utils/generator/generateAngularMarkup';
import { generateReactMarkup, getReactCode } from '@/utils/generator/generateReactMarkup';
import { generateVanillaJsMarkup, getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { generateVueMarkup, getVueCode } from '@/utils/generator/generateVueMarkup';
import { type HTMLTagOrComponent, createElements } from '@/utils/generator/generator';
import type { Framework } from '@porsche-design-system/shared';
import React, { type ReactNode, useEffect, useMemo, useState } from 'react';

type ComponentExampleProps = {
  story: Story<HTMLTagOrComponent>;
  backgroundColor?: BackgroundColor;
};

export const ComponentStory = ({ story, backgroundColor }: ComponentExampleProps) => {
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
    return {
      'vanilla-js': getVanillaJsCode(generateVanillaJsMarkup(generatedStory)),
      react: getReactCode(generateReactMarkup(generatedStory, state)),
      angular: getAngularCode(generateAngularMarkup(generatedStory, state)),
      vue: getVueCode(generateVueMarkup(generatedStory, state)),
    };
  }, [story]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: only thing that will change is the state
  useEffect(() => {
    const generatedStory = story.generator(exampleState);
    setExampleElement(createElements(generatedStory, setExampleState));
  }, [exampleState]);

  const onOpenInStackblitz = async () => {
    const markup = createStackblitzMarkupFromStory(story, exampleState, storefrontFramework, storefrontTheme);
    await openInStackblitz(markup, storefrontFramework as Framework, storefrontTheme);
  };

  return (
    <>
      <Playground
        frameworkMarkup={exampleMarkup}
        backgroundColor={backgroundColor}
        onOpenInStackblitz={onOpenInStackblitz}
      >
        {exampleElement}
      </Playground>
    </>
  );
};
