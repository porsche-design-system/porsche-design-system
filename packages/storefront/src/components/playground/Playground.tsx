'use client';

import { CodeBlock } from '@/components/playground/CodeBlock';
import { PButton } from '@porsche-design-system/components-react/ssr';
import type { FrameworkMarkup } from '@porsche-design-system/shared';
import React, { type PropsWithChildren } from 'react';

type PlaygroundProps = {
  frameworkMarkup: FrameworkMarkup;
  onOpenInStackblitz: () => void;
};

export const Playground = ({ frameworkMarkup, onOpenInStackblitz, children }: PropsWithChildren<PlaygroundProps>) => {
  return (
    <div className="playground mt-md  border-thin border-contrast-low rounded-lg">
      <div className="demo p-static-lg border-b-thin border-contrast-low">{children}</div>
      <CodeBlock frameworkMarkup={frameworkMarkup}>
        <PButton
          type="button"
          icon-source="assets/icon-stackblitz.svg"
          variant="ghost"
          compact={true}
          onClick={onOpenInStackblitz}
        >
          Open in Stackblitz
        </PButton>
      </CodeBlock>
    </div>
  );
};
