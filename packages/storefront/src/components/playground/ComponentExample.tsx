'use client';

import type { CodeSample, Framework } from '@porsche-design-system/shared';
import { openInStackblitz } from '@porsche-design-system/stackblitz';
import { useMemo } from 'react';
import { Playground } from '@/components/playground/Playground';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';
import { createStackblitzMarkupFromSample } from '@/lib/stackblitz/createStackblitzMarkupFromSample';
import type { BackgroundColor } from '@/models/backgroundColor';
import { getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { splitVanillaJsCode } from '@/utils/splitVanillaJsCode';

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
        'vanilla-js': getVanillaJsCode(
          { markup, eventHandlers: script },
          { isFullConfig: false, theme: storefrontTheme }
        ),
      };
    }
    return codeSample.frameworkMarkup;
  }, [codeSample, storefrontTheme]);

  const onOpenInStackblitz = () => {
    const markup = createStackblitzMarkupFromSample(codeSample.frameworkMarkup, storefrontFramework, storefrontTheme);
    openInStackblitz(storefrontFramework as Framework, markup, storefrontTheme);
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
