'use client';

import { Playground } from '@/components/playground/Playground';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';
import { createStackblitzMarkupFromSample } from '@/lib/stackblitz/createStackblitzMarkupFromSample';
import { openInStackblitz } from '@/lib/stackblitz/openInStackblitz';
import type { BackgroundColor } from '@/models/backgroundColor';
import { getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { splitVanillaJsCode } from '@/utils/splitVanillaJsCode';
import type { CodeSample, Framework } from '@porsche-design-system/shared';
import { useMemo } from 'react';

type ComponentSampleProps = {
  codeSample: CodeSample;
  disableDemo?: boolean;
  disableOpenInStackblitz?: boolean;
  backgroundColor?: BackgroundColor;
  fixedBackgroundColor?: string;
};

export const ComponentExample = ({
  codeSample,
  disableDemo = false,
  disableOpenInStackblitz = false,
  backgroundColor,
  fixedBackgroundColor,
}: ComponentSampleProps) => {
  const { storefrontTheme } = useStorefrontTheme();
  const { storefrontFramework } = useStorefrontFramework();

  const Component = codeSample.component;

  // Vanilla Js Markup needs to be wrapped in containing html code
  const frameworkMarkup = useMemo(() => {
    if (codeSample.frameworkMarkup['vanilla-js']) {
      const { markup, script } = splitVanillaJsCode(codeSample.frameworkMarkup['vanilla-js']);
      return {
        ...codeSample.frameworkMarkup,
        'vanilla-js': getVanillaJsCode({ markup, eventHandlers: script }),
      };
    }
    return codeSample.frameworkMarkup;
  }, [codeSample]);

  const onOpenInStackblitz = async () => {
    const markup = createStackblitzMarkupFromSample(codeSample.frameworkMarkup, storefrontFramework, storefrontTheme);
    await openInStackblitz(markup, storefrontFramework as Framework, storefrontTheme);
  };

  return (
    <Playground
      frameworkMarkup={frameworkMarkup}
      onOpenInStackblitz={() => !disableOpenInStackblitz && onOpenInStackblitz()}
      disableOpenInStackblitz={disableOpenInStackblitz}
      backgroundColor={backgroundColor}
      fixedBackgroundColor={fixedBackgroundColor}
    >
      {!disableDemo && <Component />}
    </Playground>
  );
};
