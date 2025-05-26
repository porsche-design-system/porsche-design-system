'use client';

import { ThemeSelect } from '@/components/common/ThemeSelect';
import { frameworkNameMap } from '@/models/framework';
import type { StorefrontTheme } from '@/models/theme';
import { getAngularCode } from '@/utils/generator/generateAngularMarkup';
import { getReactCode } from '@/utils/generator/generateReactMarkup';
import { getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { getVueCode } from '@/utils/generator/generateVueMarkup';
import {
  PButton,
  PSegmentedControl,
  PSegmentedControlItem,
  type SegmentedControlUpdateEventDetail,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';
import type { Framework } from '@porsche-design-system/shared';
import { openInStackblitz } from '@porsche-design-system/stackblitz';
import React, { useState } from 'react';

export const OpenBugTemplateInStackBlitz = () => {
  const [selectedFramework, setSelectedFramework] = useState<Framework>('vanilla-js');
  const [selectedTheme, setSelectedTheme] = useState<StorefrontTheme>('light');

  const onUpdateFramework = (e: CustomEvent<SegmentedControlUpdateEventDetail>) => {
    setSelectedFramework(e.detail.value as Framework);
  };

  const onUpdateTheme = (e: CustomEvent<SelectUpdateEventDetail>) => {
    setSelectedTheme(e.detail.value as StorefrontTheme);
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
      <PSegmentedControl value={selectedFramework} onUpdate={onUpdateFramework} aria-label="Choose your Framework:">
        {Object.entries(frameworkNameMap)
          .filter(([framework]) => framework !== 'next')
          .map(([framework, name]) => (
            <PSegmentedControlItem key={framework} value={framework}>
              {name}
            </PSegmentedControlItem>
          ))}
      </PSegmentedControl>
      <div className="flex gap-fluid-xs">
        <ThemeSelect className="w-[13rem]" value={selectedTheme} onUpdate={onUpdateTheme} />
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
