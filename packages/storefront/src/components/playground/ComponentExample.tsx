'use client';

import { Playground } from '@/components/playground/Playground';
import type { CodeSample } from '@porsche-design-system/shared';

type ComponentSampleProps = {
  codeSample: CodeSample;
};

export const ComponentExample = ({ codeSample }: ComponentSampleProps) => {
  const Component = codeSample.component;
  return (
    <Playground frameworkMarkup={codeSample.frameworkMarkup} onOpenInStackblitz={() => {}}>
      <Component />
    </Playground>
  );
};
