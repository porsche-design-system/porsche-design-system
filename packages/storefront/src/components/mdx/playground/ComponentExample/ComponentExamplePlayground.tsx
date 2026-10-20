'use client';

import type { FrameworkExample, FrameworkExampleId } from '@porsche-design-system/examples-framework';
import { openInStackblitz } from '@porsche-design-system/stackblitz';
import { wrapCode } from '@porsche-design-system/story-generator';
import { type ReactNode, useMemo } from 'react';
import { useStorefrontColorScheme } from '@/hooks/useStorefrontColorScheme';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { createStackblitzMarkupFromSample } from '@/lib/stackblitz/createStackblitzMarkupFromSample';
import { splitVanillaJsCode } from '@/utils/splitVanillaJsCode';
import type { BackgroundColor } from '../Playground';
import { Playground } from '../Playground';

export type ComponentExamplePlaygroundProps = {
  codeSample: FrameworkExample<FrameworkExampleId>;
  disableOpenInStackblitz?: boolean;
  backgroundColor?: BackgroundColor;
  fixedBackgroundColor?: string;
  /** The live preview, rendered by the server component `ComponentExample`. */
  children?: ReactNode;
};

export const ComponentExamplePlayground = ({
  codeSample,
  disableOpenInStackblitz = false,
  backgroundColor,
  fixedBackgroundColor,
  children,
}: ComponentExamplePlaygroundProps) => {
  const { storefrontColorScheme } = useStorefrontColorScheme();
  const { framework } = useStorefrontFramework();

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
    >
      {children}
    </Playground>
  );
};
