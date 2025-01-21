'use client';

import { DirectionSelect } from '@/components/common/DirectionSelect';
import { ThemeSelect } from '@/components/common/ThemeSelect';
import { CodeBlock } from '@/components/playground/CodeBlock';
import type { SelectUpdateEventDetail } from '@porsche-design-system/components-react/ssr';
import { getFlyoutCodeSamples } from '@porsche-design-system/shared';

export const Playground = () => {
  const defaultExample = getFlyoutCodeSamples('default');
  const formExample = getFlyoutCodeSamples('example-form');

  const handleThemeUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
    console.log(e);
  };

  const handleDirectionUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
    console.log(e);
  };

  return (
    <div>
      <ThemeSelect theme="light" onUpdate={(e) => handleThemeUpdate(e)} hideLabel={true} />
      <DirectionSelect dir="ltr" onUpdate={(e) => handleDirectionUpdate(e)} hideLabel={true} />
      <CodeBlock frameworkMarkup={defaultExample} />
    </div>
  );
};
