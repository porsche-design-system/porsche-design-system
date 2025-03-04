'use client';

import { ThemeSelect } from '@/components/common/ThemeSelect';
import { openInStackblitz } from '@/lib/stackblitz/openInStackblitz';
import { type Framework, frameworkNameMap } from '@/models/framework';
import type { StorefrontTheme } from '@/models/theme';
import { getAngularCode } from '@/utils/generator/generateAngularMarkup';
import { getReactCode } from '@/utils/generator/generateReactMarkup';
import { getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { getVueCode } from '@/utils/generator/generateVueMarkup';
import {
  PButton,
  PSegmentedControl,
  PSegmentedControlItem,
  PSelect,
  PSelectOption,
  type SegmentedControlUpdateEventDetail,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';
import React, { useState } from 'react';

type OpenBugTemplateInStackBlitzProps = {
  pdsVersions: string[];
};

export const OpenBugTemplateInStackBlitz = ({ pdsVersions }: OpenBugTemplateInStackBlitzProps) => {
  const [selectedPdsVersion, setSelectedPdsVersion] = useState<string>(pdsVersions[0]);
  const [selectedFramework, setSelectedFramework] = useState<Exclude<Framework, 'next'>>('vanilla-js');
  const [selectedTheme, setSelectedTheme] = useState<StorefrontTheme>('light');

  const onUpdateFramework = (e: CustomEvent<SegmentedControlUpdateEventDetail>) => {
    setSelectedFramework(e.detail.value as Exclude<Framework, 'next'>);
  };

  const onUpdatePdsVersion = (e: CustomEvent<SelectUpdateEventDetail>) => {
    setSelectedPdsVersion(e.detail.value);
  };

  const onUpdateTheme = (e: CustomEvent<SelectUpdateEventDetail>) => {
    setSelectedTheme(e.detail.value as StorefrontTheme);
  };

  const onOpenInStackblitz = async () => {
    const markup = '<p-text>Place your reproduction code here</p-text>';
    const frameworkMarkup: Record<Exclude<Framework, 'next'>, string> = {
      'vanilla-js': getVanillaJsCode(
        {
          markup: `<p-text theme="${selectedTheme}">Place your reproduction code here</p-text>`,
        },
        {
          isFullConfig: true,
          theme: selectedTheme,
          pdsVersion: selectedPdsVersion,
        }
      ),
      react: getReactCode({ markup }),
      angular: getAngularCode({ markup }),
      vue: getVueCode({ markup }),
    };
    await openInStackblitz(frameworkMarkup[selectedFramework], selectedFramework, selectedTheme, selectedPdsVersion);
  };

  return (
    <div className="flex flex-col gap-sm">
      <PSegmentedControl value={selectedFramework} onUpdate={onUpdateFramework} aria-label="Choose your Framework:">
        {Object.entries(frameworkNameMap)
          .filter(([framework]) => framework !== 'next')
          .map(([framework, name]) => (
            <PSegmentedControlItem key={framework} value={framework}>
              {name}
            </PSegmentedControlItem>
          ))}
      </PSegmentedControl>
      <div className="flex gap-xs">
        <PSelect
          className="w-[13rem]"
          name="pds-versions"
          label="Version"
          value={selectedPdsVersion}
          onUpdate={onUpdatePdsVersion}
        >
          {pdsVersions.map((pdsVersion, index) => (
            <PSelectOption key={index} value={pdsVersion}>
              {pdsVersion}
            </PSelectOption>
          ))}
        </PSelect>
        <ThemeSelect className="w-[13rem]" value={selectedTheme} onUpdate={onUpdateTheme} />
      </div>
      <PButton className="w-fit mt-sm" type="button" icon-source="stackBlitzIcon" onClick={() => onOpenInStackblitz()}>
        Open template in StackBlitz
      </PButton>
    </div>
  );
};
