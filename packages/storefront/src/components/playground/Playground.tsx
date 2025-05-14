'use client';

import { CodeBlock } from '@/components/playground/CodeBlock';
import type { BackgroundColor } from '@/models/backgroundColor';
import { PButton } from '@porsche-design-system/components-react/ssr';
import type { FrameworkMarkup } from '@porsche-design-system/shared';
import React, { type PropsWithChildren } from 'react';

type PlaygroundProps = {
  frameworkMarkup: FrameworkMarkup;
  onOpenInStackblitz: () => void;
  disableOpenInStackblitz?: boolean;
  backgroundColor?: BackgroundColor;
  fixedBackgroundColor?: string;
};

export const Playground = ({
  frameworkMarkup,
  onOpenInStackblitz,
  disableOpenInStackblitz = false,
  backgroundColor = 'base',
  fixedBackgroundColor,
  children,
}: PropsWithChildren<PlaygroundProps>) => {
  return (
    <div className="playground mt-fluid-md border-thin border-contrast-low rounded-lg">
      <div
        className={`demo p-static-lg border-b-thin border-contrast-low bg-${backgroundColor} rounded-t-lg`}
        style={{ ...(fixedBackgroundColor && { backgroundColor: fixedBackgroundColor }) }}
      >
        {children}
      </div>
      <CodeBlock frameworkMarkup={frameworkMarkup}>
        {!disableOpenInStackblitz && (
          <PButton
            className="w-fit"
            type="button"
            iconSource="assets/icon-stackblitz.svg"
            variant="ghost"
            compact={true}
            onClick={onOpenInStackblitz}
          >
            Open in Stackblitz
          </PButton>
        )}
      </CodeBlock>
    </div>
  );
};
