'use client';

import { CodeBlock } from '@/components/playground/CodeBlock';
import type { BackgroundColor } from '@/models/backgroundColor';
import { PButton } from '@porsche-design-system/components-react/ssr';
import type { FrameworkMarkup } from '@porsche-design-system/shared';
import React, { type PropsWithChildren } from 'react';

type PlaygroundProps = {
  frameworkMarkup: FrameworkMarkup;
  onOpenInStackblitz: () => void;
  backgroundColor?: BackgroundColor;
};

export const Playground = ({
  frameworkMarkup,
  onOpenInStackblitz,
  backgroundColor = 'background-base',
  children,
}: PropsWithChildren<PlaygroundProps>) => {
  return (
    <div className="playground mt-md border-thin border-contrast-low rounded-lg">
      <div className={`demo p-static-lg border-b-thin border-contrast-low bg-${backgroundColor}`}>{children}</div>
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
