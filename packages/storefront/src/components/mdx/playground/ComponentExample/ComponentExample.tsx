'use client';

import type { CodeSample, Framework } from '@porsche-design-system/shared';
import { openInStackblitz } from '@porsche-design-system/stackblitz';
import { wrapCode } from '@porsche-design-system/story-generator';
import { useMemo } from 'react';
import { useStorefrontColorScheme } from '@/hooks/useStorefrontColorScheme';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { createStackblitzMarkupFromSample } from '@/lib/stackblitz/createStackblitzMarkupFromSample';
import { splitVanillaJsCode } from '@/utils/splitVanillaJsCode';
import type { BackgroundColor } from '../Playground';
import { Playground } from '../Playground';

type ComponentSampleProps = {
  codeSample: CodeSample;
  disableDemo?: boolean;
  disableOpenInStackblitz?: boolean;
  backgroundColor?: BackgroundColor;
  fixedBackgroundColor?: string;
  previewMaxWidth?: string;
};

export const ComponentExample = ({
  codeSample,
  disableDemo = false,
  disableOpenInStackblitz = false,
  backgroundColor,
  fixedBackgroundColor,
  previewMaxWidth,
}: ComponentSampleProps) => {
  const { storefrontColorScheme } = useStorefrontColorScheme();
  const { framework } = useStorefrontFramework();

  const Component = codeSample.component;

  // Vanilla Js Markup needs to be wrapped in containing html code
  const frameworkMarkup = useMemo(() => {
    if (codeSample.frameworkMarkup['vanilla-js']) {
      const { markup, script, scriptAttributes } = splitVanillaJsCode(codeSample.frameworkMarkup['vanilla-js']);
      return {
        ...codeSample.frameworkMarkup,
        'vanilla-js': wrapCode(
          'vanilla-js',
          { markup, script, scriptAttributes },
          { colorScheme: storefrontColorScheme }
        ),
      };
    }
    return codeSample.frameworkMarkup;
  }, [codeSample, storefrontColorScheme]);

  const onOpenInStackblitz = () => {
    const markup = createStackblitzMarkupFromSample(codeSample.frameworkMarkup, framework, storefrontColorScheme);
    openInStackblitz(framework, markup, storefrontColorScheme);
  };

  return (
    <Playground
      frameworkMarkup={frameworkMarkup}
      onOpenInStackblitz={() => !disableOpenInStackblitz && onOpenInStackblitz()}
      disableOpenInStackblitz={disableOpenInStackblitz}
      backgroundColor={backgroundColor}
      fixedBackgroundColor={fixedBackgroundColor}
      previewMaxWidth={previewMaxWidth}
    >
      {!disableDemo && <Component />}
    </Playground>
  );
};
