'use client';

import type { Framework } from '@porsche-design-system/shared';
import { getFrameworkProject, openInStackblitz } from '@porsche-design-system/stackblitz';
import { wrapCode } from '@porsche-design-system/story-generator';
import { type ReactNode, useMemo } from 'react';
import { useStorefrontColorScheme } from '@/hooks/useStorefrontColorScheme';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { createStackblitzMarkupFromSample } from '@/lib/stackblitz/createStackblitzMarkupFromSample';
import { splitVanillaJsCode } from '@/utils/splitVanillaJsCode';
import type { BackgroundColor } from './Playground';
import { Playground } from './Playground';

export type ComponentExamplePlaygroundProps = {
  /** The code of every framework, as the catalogue holds it. */
  code: Record<Framework, string>;
  disableOpenInStackblitz?: boolean;
  backgroundColor?: BackgroundColor;
  fixedBackgroundColor?: string;
  /** The live preview, rendered by the server component `Example` or `Configurator`. */
  children?: ReactNode;
};

export const ComponentExamplePlayground = ({
  code,
  disableOpenInStackblitz = false,
  backgroundColor,
  fixedBackgroundColor,
  children,
}: ComponentExamplePlaygroundProps) => {
  const { storefrontColorScheme } = useStorefrontColorScheme();
  const { framework } = useStorefrontFramework();

  // Vanilla Js Markup needs to be wrapped in containing html code
  const frameworkMarkup = useMemo(() => {
    if (code['vanilla-js']) {
      const { markup, script, scriptAttributes } = splitVanillaJsCode(code['vanilla-js']);
      return {
        ...code,
        'vanilla-js': wrapCode(
          'vanilla-js',
          { markup, script, scriptAttributes },
          { colorScheme: storefrontColorScheme }
        ),
      };
    }
    return code;
  }, [code, storefrontColorScheme]);

  const onOpenInStackblitz = () => {
    const markup = createStackblitzMarkupFromSample(code, framework, storefrontColorScheme);
    openInStackblitz(getFrameworkProject(framework, markup, storefrontColorScheme));
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
