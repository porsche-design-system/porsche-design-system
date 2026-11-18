'use client';

import {
  PButton,
  PSegmentedControl,
  PSegmentedControlItem,
  type SegmentedControlChangeEventDetail,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-react/ssr';
import { type ColorScheme, FRAMEWORKS, type Framework, frameworkNameMap } from '@porsche-design-system/shared';
import { getFrameworkProject, openInStackblitz } from '@porsche-design-system/stackblitz';
import { wrapCode } from '@porsche-design-system/story-generator';
import React, { useState } from 'react';
import { ThemeSelect } from '@/components/common/ThemeSelect';

export const OpenBugTemplateInStackBlitz = () => {
  const [selectedFramework, setSelectedFramework] = useState<Framework>('vanilla-js');
  const [selectedTheme, setSelectedTheme] = useState<ColorScheme>('scheme-light');

  const onFrameworkChange = (e: CustomEvent<SegmentedControlChangeEventDetail>) => {
    setSelectedFramework(e.detail.value as Framework);
  };

  const onUpdateTheme = (e: CustomEvent<SelectChangeEventDetail>) => {
    setSelectedTheme(e.detail.value as ColorScheme);
  };

  const onOpenInStackblitz = () => {
    const markup =
      selectedFramework === 'vanilla-js'
        ? `<p-text theme="${selectedTheme}">Place your reproduction code here</p-text>`
        : '<p-text>Place your reproduction code here</p-text>';
    const code = wrapCode(selectedFramework, { markup }, { colorScheme: selectedTheme, output: 'project' });
    openInStackblitz(getFrameworkProject(selectedFramework, code, selectedTheme));
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
        iconSource="assets/icon-stackblitz.svg"
        onClick={() => onOpenInStackblitz()}
        aria={{ 'aria-description': 'Opens in a new tab' }}
      >
        Open template in StackBlitz
      </PButton>
    </div>
  );
};
