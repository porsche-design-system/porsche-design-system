'use client';

import { PButton } from '@porsche-design-system/components-react/ssr';
import type { FrameworkMarkup } from '@porsche-design-system/shared';
import React, { type PropsWithChildren } from 'react';
import { CodeBlock } from '@/components/playground/CodeBlock';
import type { BackgroundColor } from '@/models/backgroundColor';

type PlaygroundProps = {
  frameworkMarkup: FrameworkMarkup;
  onOpenInStackblitz: () => void;
  disableOpenInStackblitz?: boolean;
  backgroundColor?: BackgroundColor;
  fixedBackgroundColor?: string;
  showCodeBlock?: boolean;
};

export const Playground = ({
  frameworkMarkup,
  onOpenInStackblitz,
  disableOpenInStackblitz = false,
  backgroundColor = 'base',
  fixedBackgroundColor,
  showCodeBlock = true,
  children,
}: PropsWithChildren<PlaygroundProps>) => {
  return (
    <div className="playground mt-fluid-md border-thin border-contrast-lower rounded-4xl">
      <div
        className={`demo p-static-lg border-b-thin border-contrast-lower bg-${backgroundColor} rounded-t-4xl`}
        style={{ ...(fixedBackgroundColor && { backgroundColor: fixedBackgroundColor }) }}
      >
        {children}
      </div>
      {showCodeBlock && (
        <CodeBlock frameworkMarkup={frameworkMarkup}>
          {!disableOpenInStackblitz && (
            <PButton
              className="w-fit"
              type="button"
              iconSource="assets/icon-stackblitz.svg"
              variant="secondary"
              compact={true}
              onClick={onOpenInStackblitz}
            >
              Open in Stackblitz
            </PButton>
          )}
        </CodeBlock>
      )}
    </div>
  );
};
