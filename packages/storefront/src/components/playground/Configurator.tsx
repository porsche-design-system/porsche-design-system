'use client';

import { ConfiguratorControls } from '@/components/playground/ConfiguratorControls';
import { Playground } from '@/components/playground/Playground';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';
import { openInStackblitz } from '@/lib/stackblitz/openInStackblitz';
import type { Framework, FrameworkMarkup } from '@/models/framework';
import type { SlotStories, Story, StoryState } from '@/models/story';
import { applyPropertyRecursively } from '@/utils/generator/applyPropertyRecursively';
import { generateAngularMarkup, getAngularCode } from '@/utils/generator/generateAngularMarkup';
import { generateReactMarkup, getReactCode } from '@/utils/generator/generateReactMarkup';
import { generateVanillaJsMarkup, getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { generateVueMarkup, getVueCode } from '@/utils/generator/generateVueMarkup';
import { type ConfiguratorTagNames, type HTMLTagOrComponent, createElements } from '@/utils/generator/generator';
import { PButton } from '@porsche-design-system/components-react/ssr';
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
  const { storefrontTheme } = useStorefrontTheme();
  const { storefrontFramework } = useStorefrontFramework();
  const [exampleState, setExampleState] = useState<StoryState<HTMLTagOrComponent>>(story.state ?? {});
  const [exampleElement, setExampleElement] = useState<ReactNode>(
    createElements(story.generator(story.state), setExampleState)
  );
  const [exampleMarkup, setExampleMarkup] = useState<FrameworkMarkup>({});

  // biome-ignore lint/correctness/useExhaustiveDependencies: only thing that will change is the state
  useEffect(() => {
    const generatedStory = story.generator(exampleState);
    setExampleElement(createElements(generatedStory, setExampleState));
    setExampleMarkup({
      'vanilla-js': getVanillaJsCode(generateVanillaJsMarkup(generatedStory)),
      react: getReactCode(generateReactMarkup(generatedStory, story.state ?? {})),
      angular: getAngularCode(generateAngularMarkup(generatedStory, story.state ?? {})),
      vue: getVueCode(generateVueMarkup(generatedStory, story.state ?? {})),
    });
  }, [exampleState]);

  const onOpenInStackblitz = async () => {
    // Since vanilla-js doesn't have a provider we need to apply the global theme to the elements
    const generatedStory =
      storefrontFramework === 'vanilla-js' && storefrontTheme !== 'light'
        ? applyPropertyRecursively(story.generator(exampleState), 'theme', storefrontTheme)
        : story.generator(exampleState);

    const frameworkMap: Record<Exclude<Framework, 'next'>, string> = {
      'vanilla-js': getVanillaJsCode(generateVanillaJsMarkup(generatedStory), {
        isFullConfig: true,
        theme: storefrontTheme,
      }),
      react: getReactCode(generateReactMarkup(generatedStory, exampleState)),
      angular: getAngularCode(generateAngularMarkup(generatedStory, exampleState)),
      vue: getVueCode(generateVueMarkup(generatedStory, exampleState)),
    };

    await openInStackblitz(
      frameworkMap[storefrontFramework as Exclude<Framework, 'next'>],
      storefrontFramework as Exclude<Framework, 'next'>,
      storefrontTheme
    );
  };

  return (
    <>
      <Playground frameworkMarkup={exampleMarkup}>{exampleElement}</Playground>
      <PButton className="mt-md" type="button" icon-source="stackBlitzIcon" onClick={() => onOpenInStackblitz()}>
        Open in Stackblitz
      </PButton>
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
