'use client';

import {
  PButton,
  PSegmentedControl,
  PSegmentedControlItem,
  type SegmentedControlChangeEventDetail,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-react/ssr';
import type { Framework } from '@porsche-design-system/shared';
import { openInStackblitz } from '@porsche-design-system/stackblitz';
import React, { useState } from 'react';
import { ThemeSelect } from '@/components/common/ThemeSelect';
import { frameworkNameMap } from '@/models/framework';
import type { StorefrontColorScheme } from '@/models/theme';
import { getAngularCode } from '@/utils/generator/generateAngularMarkup';
import { getReactCode } from '@/utils/generator/generateReactMarkup';
import { getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { getVueCode } from '@/utils/generator/generateVueMarkup';

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
    const markup = '<p-text>Place your reproduction code here</p-text>';
    const frameworkMarkup: Record<Framework, string> = {
      'vanilla-js': getVanillaJsCode(
        {
          markup: `<p-text theme="${selectedTheme}">Place your reproduction code here</p-text>`,
        },
        {
          isFullConfig: true,
          theme: selectedTheme,
        }
      ),
      react: getReactCode({ markup }),
      angular: getAngularCode({ markup }),
      vue: getVueCode({ markup }),
    };
    openInStackblitz(selectedFramework, frameworkMarkup[selectedFramework], selectedTheme);
  };

  return (
    <div className="flex flex-col gap-fluid-sm">
      <PSegmentedControl value={selectedFramework} onChange={onFrameworkChange} aria-label="Choose your Framework:">
        {Object.entries(frameworkNameMap)
          .filter(([framework]) => framework !== 'next')
          .map(([framework, name]) => (
            <PSegmentedControlItem key={framework} value={framework}>
              {name}
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
      >
        Open template in StackBlitz
      </PButton>
    </div>
  );
};
