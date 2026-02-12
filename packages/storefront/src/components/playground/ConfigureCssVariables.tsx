import type { ComponentMeta } from '@porsche-design-system/component-meta';
import type { InputTextInputEventDetail } from '@porsche-design-system/components-react';
import { PInputText, PPopover, PTag } from '@porsche-design-system/components-react/ssr';
import type { TagName } from '@porsche-design-system/shared';
import React from 'react';
import type { ConfiguratorTagNames, ElementConfig } from '@/utils/generator/generator';
import { getFlags } from '@/utils/getFlags';

type ConfigureCssVariablesProps<T extends ConfiguratorTagNames> = {
  tagName: TagName;
  componentCssVariables: ComponentMeta['cssVariablesMeta'];
  configuredCssVariables: ElementConfig<T>['properties'];
  // biome-ignore lint/complexity/noBannedTypes: ok
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
      <span slot="heading" className="flex gap-fluid-xs">
        CSS Variables
        {amountOfConfiguredCssVariables > 0 && (
          <>
            <PTag variant="secondary" compact={true}>
              {amountOfConfiguredCssVariables}
            </PTag>
            <PTag variant="secondary" compact={true}>
              {/*// TODO: Implement */}
              <button type="button">Reset all</button>
            </PTag>
          </>
        )}
      </span>
      <div className="flex flex-col gap-fluid-sm">
        {Object.entries(componentCssVariables ?? {})
          .filter(([cssVariableName]) => !cssVariableName.startsWith('--ref'))
          .map(([cssVariableName, cssVariableMeta]) => (
            <PInputText
              key={cssVariableName}
              name="configure-css-variables-input"
              compact={true}
              value={cssVariables[cssVariableName] ?? ''}
              onInput={(e) =>
                onUpdateCssVariables(
                  cssVariableName,
                  ((e as CustomEvent<InputTextInputEventDetail>).detail.target as HTMLInputElement).value
                )
              }
            >
              <span slot="label">{cssVariableName}</span>
              <span slot="label-after" className="inline-flex gap-static-xs ms-static-xs">
                <PPopover onClick={(e) => e.preventDefault()}>{cssVariableMeta.description}</PPopover>
                {getFlags(cssVariableMeta)}
                {/* TODO: Fix typing */}
                {cssVariables[cssVariableName] !== (defaultCssVariables as any)?.[cssVariableName] && (
                  <PTag variant="secondary" compact={true}>
                    <button type="button" onClick={() => onUpdateCssVariables(cssVariableName, undefined)}>
                      Reset
                    </button>
                  </PTag>
                )}
              </span>
            </PInputText>
          ))}
      </div>
    </>
  );
};
