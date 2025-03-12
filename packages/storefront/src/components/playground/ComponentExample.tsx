'use client';

import { Playground } from '@/components/playground/Playground';
import type { Story } from '@/models/story';
import { generateAngularMarkup, getAngularCode } from '@/utils/generator/generateAngularMarkup';
import { generateReactMarkup, getReactCode } from '@/utils/generator/generateReactMarkup';
import { generateVanillaJsMarkup, getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { generateVueMarkup, getVueCode } from '@/utils/generator/generateVueMarkup';
import { type HTMLTagOrComponent, createElements } from '@/utils/generator/generator';
import React, { type ReactNode, useEffect, useMemo, useState } from 'react';

type ComponentExampleProps = {
  story: Story<HTMLTagOrComponent>;
};

export const ComponentExample = ({ story }: ComponentExampleProps) => {
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

  return (
    <>
      <Playground frameworkMarkup={exampleMarkup} onOpenInStackblitz={() => {}}>
        {exampleElement}
      </Playground>
    </>
  );
};
