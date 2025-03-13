'use client';

import { Playground } from '@/components/playground/Playground';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';
import { createStackblitzMarkupFromSample } from '@/lib/stackblitz/createStackblitzMarkupFromSample';
import { openInStackblitz } from '@/lib/stackblitz/openInStackblitz';
import type { CodeSample, Framework } from '@porsche-design-system/shared';

type ComponentSampleProps = {
  codeSample: CodeSample;
};

export const ComponentExample = ({ codeSample }: ComponentSampleProps) => {
  const { storefrontTheme } = useStorefrontTheme();
  const { storefrontFramework } = useStorefrontFramework();
  const Component = codeSample.component;

  const onOpenInStackblitz = async () => {
    const markup = createStackblitzMarkupFromSample(codeSample.frameworkMarkup, storefrontFramework, storefrontTheme);
    await openInStackblitz(markup, storefrontFramework as Framework, storefrontTheme);
  };

  return (
    <Playground frameworkMarkup={codeSample.frameworkMarkup} onOpenInStackblitz={() => onOpenInStackblitz()}>
      <Component />
    </Playground>
  );
};
