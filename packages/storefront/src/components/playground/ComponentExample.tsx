'use client';

import { Playground } from '@/components/playground/Playground';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';
import { createStackblitzMarkupFromSample } from '@/lib/stackblitz/createStackblitzMarkupFromSample';
import { openInStackblitz } from '@/lib/stackblitz/openInStackblitz';
import { getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { splitVanillaJsCode } from '@/utils/splitVanillaJsCode';
import type { CodeSample, Framework } from '@porsche-design-system/shared';
import { useMemo } from 'react';

type ComponentSampleProps = {
  codeSample: CodeSample;
  disableDemo?: boolean;
};

export const ComponentExample = ({ codeSample, disableDemo = false }: ComponentSampleProps) => {
  const { storefrontTheme } = useStorefrontTheme();
  const { storefrontFramework } = useStorefrontFramework();

  const Component = codeSample.component;

  // Vanilla Js Markup needs to be wrapped in containing html code
  const frameworkMarkup = useMemo(() => {
    const { markup, script } = splitVanillaJsCode(codeSample.frameworkMarkup['vanilla-js'] ?? '');
    return {
      ...codeSample.frameworkMarkup,
      'vanilla-js': getVanillaJsCode({ markup, eventHandlers: script }),
    };
  }, [codeSample]);

  const onOpenInStackblitz = async () => {
    const markup = createStackblitzMarkupFromSample(codeSample.frameworkMarkup, storefrontFramework, storefrontTheme);
    await openInStackblitz(markup, storefrontFramework as Framework, storefrontTheme);
  };

  return (
    <Playground frameworkMarkup={frameworkMarkup} onOpenInStackblitz={() => onOpenInStackblitz()}>
      {!disableDemo && <Component />}
    </Playground>
  );
};
