'use client';

import { CodeBlock } from '@/components/playground/CodeBlock';
import type { FrameworkMarkup } from '@/models/framework';
import type { PropsWithChildren } from 'react';

type PlaygroundProps = {
  frameworkMarkup: FrameworkMarkup;
};

export const Playground = ({ frameworkMarkup, children }: PropsWithChildren<PlaygroundProps>) => {
  return (
    <div className="playground mt-lg flex flex-col gap-lg">
      <div className="demo">{children}</div>
      <CodeBlock frameworkMarkup={frameworkMarkup} />
    </div>
  );
};
