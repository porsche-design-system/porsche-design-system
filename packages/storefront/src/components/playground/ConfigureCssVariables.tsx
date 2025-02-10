import type { ConfiguratorTagNames, ElementConfig } from '@/utils/generator/generator';
import { getFlags } from '@/utils/getFlags';
import type { ComponentMeta } from '@porsche-design-system/component-meta';
import { PPopover, PTag, PTextFieldWrapper } from '@porsche-design-system/components-react/ssr';
import type { TagName } from '@porsche-design-system/shared';
import React from 'react';

type ConfigureCssVariablesProps<T extends ConfiguratorTagNames> = {
  tagName: TagName;
  componentCssVariables: ComponentMeta['cssVariablesMeta'];
  configuredCssVariables: ElementConfig<T>['properties'];
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  defaultCssVariables: ElementConfig<T>['properties'] | {};
  onUpdateCssVariables: (cssVariableName: string, selectedValue: string | undefined) => void;
  onResetAllCssVariables: () => void;
};

export const ConfigureCssVariables = <T extends ConfiguratorTagNames>({
  componentCssVariables,
  configuredCssVariables,
  defaultCssVariables,
  onUpdateCssVariables,
}: ConfigureCssVariablesProps<T>) => {
  const styleObject = Object.entries(configuredCssVariables ?? {}).find(([key]) => key === 'style')?.[1];
  const cssVariables = Object.fromEntries(
    Object.entries(styleObject ?? {}).filter(([key, _]) => key.startsWith('--p'))
  ) as { [x: string]: string };
  const amountOfConfiguredCssVariables = 0;

  return (
    <>
      <span slot="heading" className="flex gap-xs">
        CSS Variables
        {amountOfConfiguredCssVariables > 0 && (
          <>
            <PTag compact={true}>{amountOfConfiguredCssVariables}</PTag>
            <PTag compact={true}>
              <button type="button" onClick={() => {}}>
                Reset all
              </button>
            </PTag>
          </>
        )}
      </span>
      <div className="flex flex-col gap-sm">
        {Object.entries(componentCssVariables ?? {}).map(([cssVariableName, cssVariableMeta]) => (
          <PTextFieldWrapper key={cssVariableName}>
            <input
              type="text"
              value={cssVariables[cssVariableName] ?? ''}
              onInput={(e) => onUpdateCssVariables(cssVariableName, e.currentTarget.value)}
            />
            <span slot="label" className="inline-flex gap-static-xs">
              {cssVariableName}
              <PPopover onClick={(e) => e.preventDefault()}>{cssVariableMeta.description}</PPopover>
              {getFlags(cssVariableMeta)}
              {/* TODO: Fix typing */}
              {cssVariables[cssVariableName] !== (defaultCssVariables as any)?.[cssVariableName] && (
                <PTag compact={true}>
                  <button type="button" onClick={() => onUpdateCssVariables(cssVariableName, undefined)}>
                    Reset
                  </button>
                </PTag>
              )}
            </span>
          </PTextFieldWrapper>
        ))}
      </div>
    </>
  );
};
