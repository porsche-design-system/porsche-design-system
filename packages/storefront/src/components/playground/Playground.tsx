'use client';

import { DirectionSelect } from '@/components/common/DirectionSelect';
import { ThemeSelect } from '@/components/common/ThemeSelect';
import { CodeBlock } from '@/components/playground/CodeBlock';
import type { FrameworkMarkup } from '@/models/framework';
import type { SelectUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import type { PropsWithChildren } from 'react';

type PlaygroundProps = {
  frameworkMarkup: FrameworkMarkup;
};

export const Playground = ({ frameworkMarkup, children }: PropsWithChildren<PlaygroundProps>) => {
  const handleThemeUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(e);
  };

  const handleDirectionUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(e);
  };

  return (
    <div className="flex flex-col gap-static-sm">
      <div className="flex flex-col gap-xs xs:flex-row">
        <ThemeSelect theme="light" onUpdate={(e) => handleThemeUpdate(e)} hideLabel={true} />
        <DirectionSelect dir="ltr" onUpdate={(e) => handleDirectionUpdate(e)} hideLabel={true} />
      </div>
      <div className="">
        {children}
        <CodeBlock frameworkMarkup={frameworkMarkup} />
      </div>
    </div>
  );
};
