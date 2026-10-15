'use client';

import {
  PButton,
  PSegmentedControl,
  PSegmentedControlItem,
  type SegmentedControlChangeEventDetail,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-react/ssr';
import { FRAMEWORKS, type Framework, frameworkNameMap } from '@porsche-design-system/shared';
import { openInStackblitz } from '@porsche-design-system/stackblitz';
import { wrapCode } from '@porsche-design-system/story-generator';
import React, { useState } from 'react';
import { ThemeSelect } from '@/components/common/ThemeSelect';
import type { StorefrontColorScheme } from '@/models/colorScheme';

export const OpenBugTemplateInStackBlitz = () => {
  const [selectedFramework, setSelectedFramework] = useState<Framework>('vanilla-js');
  const [selectedTheme, setSelectedTheme] = useState<StorefrontColorScheme>('scheme-light');

  const onFrameworkChange = (e: CustomEvent<SegmentedControlChangeEventDetail>) => {
    setSelectedFramework(e.detail.value as Framework);
  };

  const onUpdateTheme = (e: CustomEvent<SelectChangeEventDetail>) => {
    setSelectedTheme(e.detail.value as StorefrontColorScheme);
  };

  const onOpenInStackblitz = () => {
    const markup =
      selectedFramework === 'vanilla-js'
        ? `<p-text theme="${selectedTheme}">Place your reproduction code here</p-text>`
        : '<p-text>Place your reproduction code here</p-text>';
    const code = wrapCode(selectedFramework, { markup }, { colorScheme: selectedTheme, output: 'project' });
    openInStackblitz(selectedFramework, code, selectedTheme);
  };

  return (
    <div className="flex flex-col gap-fluid-sm">
      <PSegmentedControl value={selectedFramework} onChange={onFrameworkChange} aria-label="Choose your Framework:">
        {FRAMEWORKS.map((framework) => (
          <PSegmentedControlItem key={framework} value={framework}>
            {frameworkNameMap[framework]}
          </PSegmentedControlItem>
        ))}
      </PSegmentedControl>
      <div className="flex gap-fluid-xs">
        <ThemeSelect className="w-[13rem]" value={selectedTheme} onThemeChange={onUpdateTheme} />
      </div>
      <PButton
        className="w-fit mt-fluid-sm"
        type="button"
        icon-source="stackBlitzIcon"
        onClick={() => onOpenInStackblitz()}
        aria={{ 'aria-description': 'Opens in new tab' }}
      >
        Open template in StackBlitz
      </PButton>
    </div>
  );
};
