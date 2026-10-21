'use client';

import { PButton } from '@porsche-design-system/components-react/ssr';
import type { FrameworkMarkup } from '@porsche-design-system/shared';
import type { PropsWithChildren } from 'react';
import { FrameworkCodePreview } from '../framework/FrameworkCodePreview';

export type BackgroundColor = 'base' | 'surface';

type PlaygroundProps = {
  frameworkMarkup: FrameworkMarkup;
  onOpenInStackblitz: () => void;
  disableOpenInStackblitz?: boolean;
  backgroundColor?: BackgroundColor;
  fixedBackgroundColor?: string;
  showCodeBlock?: boolean;
  previewMaxWidth?: string;
};

/** A live demo above its code, shared by `Configurator`, `ComponentStory` and `ComponentExample`. */
export const Playground = ({
  frameworkMarkup,
  onOpenInStackblitz,
  disableOpenInStackblitz = false,
  backgroundColor = 'base',
  fixedBackgroundColor,
  showCodeBlock = true,
  previewMaxWidth,
  children,
}: PropsWithChildren<PlaygroundProps>) => (
  <div className="playground my-fluid-md border-thin border-contrast-lower rounded-3xl">
    <div
      className={`demo p-static-lg border-b-thin border-contrast-lower bg-${backgroundColor} rounded-t-3xl`}
      style={{
        ...(fixedBackgroundColor && { backgroundColor: fixedBackgroundColor }),
        // limits the preview width while the demo area itself keeps spanning the full width
        ...(previewMaxWidth && {
          display: 'grid',
          gridTemplateColumns: `minmax(0, ${previewMaxWidth})`,
          justifyContent: 'center',
        }),
      }}
    >
      {children}
    </div>
    {showCodeBlock && (
      <FrameworkCodePreview
        frameworkMarkup={frameworkMarkup}
        actions={
          !disableOpenInStackblitz && (
            <PButton
              className="w-fit"
              type="button"
              iconSource="assets/icon-stackblitz.svg"
              variant="secondary"
              compact={true}
              onClick={onOpenInStackblitz}
              aria={{ 'aria-description': 'Opens in a new tab' }}
            >
              Open in StackBlitz
            </PButton>
          )
        }
      />
    )}
  </div>
);
