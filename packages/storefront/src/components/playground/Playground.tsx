'use client';

import { PButton } from '@porsche-design-system/components-react/ssr';
import type { Framework, FrameworkMarkup } from '@porsche-design-system/shared';
import type { PropsWithChildren } from 'react';
import { CodeBlock, type CodeLanguage } from '@/components/common/CodeBlock';
import { FrameworkTabs } from '@/components/common/FrameworkTabs';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import type { BackgroundColor } from '@/models/backgroundColor';

type PlaygroundProps = {
  frameworkMarkup: FrameworkMarkup;
  onOpenInStackblitz: () => void;
  disableOpenInStackblitz?: boolean;
  backgroundColor?: BackgroundColor;
  fixedBackgroundColor?: string;
  showCodeBlock?: boolean;
};

const frameworkLanguageMap = {
  'vanilla-js': 'javascript',
  angular: 'typescript',
  react: 'typescript',
  vue: 'typescript',
} as const satisfies Record<Framework, CodeLanguage>;

export const Playground = ({
  frameworkMarkup,
  onOpenInStackblitz,
  disableOpenInStackblitz = false,
  backgroundColor = 'base',
  fixedBackgroundColor,
  showCodeBlock = true,
  children,
}: PropsWithChildren<PlaygroundProps>) => {
  const { framework } = useStorefrontFramework();

  return (
    <div className="playground my-fluid-md border-thin border-contrast-lower rounded-3xl">
      <div
        className={`demo p-static-lg border-b-thin border-contrast-lower bg-${backgroundColor} rounded-t-3xl`}
        style={{ ...(fixedBackgroundColor && { backgroundColor: fixedBackgroundColor }) }}
      >
        {children}
      </div>
      {showCodeBlock && (
        <>
          <div className="m-static-md flex gap-fluid-sm justify-between flex-col md:flex-row">
            <FrameworkTabs label="Select the JavaScript framework for code preview" />
            {!disableOpenInStackblitz && (
              <PButton
                className="w-fit"
                type="button"
                iconSource="assets/icon-stackblitz.svg"
                variant="secondary"
                compact={true}
                onClick={onOpenInStackblitz}
                aria={{ 'aria-description': 'Opens in a new tab' }}
              >
                Open in Stackblitz
              </PButton>
            )}
          </div>
          <CodeBlock className="markup" language={frameworkLanguageMap[framework]}>
            {frameworkMarkup[framework] ?? ''}
          </CodeBlock>
        </>
      )}
    </div>
  );
};
