import { DirectionSelect } from '@/components/common/DirectionSelect';
import type { ElementConfig } from '@/components/playground/Configurator';
import { isDefaultValue } from '@/components/playground/configuratorUtils';
import type { ComponentMeta, PropMeta } from '@porsche-design-system/component-meta';
import {
  PAccordion,
  PDivider,
  PPopover,
  PSelect,
  PSelectOption,
  PSwitch,
  PTag,
  PTextFieldWrapper,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';
import type { TagName } from '@porsche-design-system/shared';
import { capitalCase } from 'change-case';
import type React from 'react';

type ConfigurePropsProps = {
  tagName: TagName;
  componentProps: ComponentMeta['propsMeta'];
  configuredProps: ElementConfig['properties'];
  onUpdateProps: (propName: keyof ElementConfig['properties'], selectedValue: string, onBlur?: boolean) => void;
  onReset: () => void;
};

/*
 * Different cases to deal with:
 * - propMeta.allowedValues === 'string'
 * - propMeta.allowedValues === 'boolean'
 * - Array.isArray(propMeta.allowedValues)
 *   - array can contain string | number | null
 *   - special case for p-carousel type number | 'auto'
 */

export const ConfigureProps = ({
  tagName,
  componentProps,
  configuredProps,
  onUpdateProps,
  onReset,
}: ConfigurePropsProps) => {
  const amountOfConfiguredProps = Object.keys(configuredProps ?? {}).length;

  const handleDirectionUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(e);
  };

  const filteredComponentProps = Object.entries(componentProps ?? {}).filter(
    ([_, value]) => !value.isAria && value.type !== 'string[]' && !value.isDeprecated
  );

  const getSanitizedArrayValue = (value: string | number | null) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return `${value}`;
    if (value === null) return undefined;
  };

  const getCurrentValue = (propName: keyof ElementConfig['properties'], propMeta: PropMeta): string | undefined => {
    const value = configuredProps?.[propName] ?? (propMeta.defaultValue === null ? undefined : propMeta.defaultValue);

    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'number') {
      return `${value}`;
    }

    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
  };

  const renderInput = (propName: keyof ElementConfig['properties'], propMeta: PropMeta) => {
    if (propMeta.allowedValues === 'boolean') {
      return (
        <PSwitch
          key={propName}
          checked={getCurrentValue(propName, propMeta) === 'true'}
          onUpdate={(e) => onUpdateProps(propName, e.detail.checked ? 'true' : 'false')}
        >
          {capitalCase(propName)}
          <PPopover className="ms-static-xs" onClick={(e) => e.preventDefault()}>
            {propMeta.description}
          </PPopover>
        </PSwitch>
      );
    }

    if (
      (Array.isArray(propMeta.allowedValues) && propMeta.allowedValues.includes('string')) ||
      propMeta.allowedValues === 'string'
    ) {
      return (
        <PTextFieldWrapper key={propName}>
          <input
            type="text"
            value={getCurrentValue(propName, propMeta) ?? ''}
            required={propMeta.isRequired}
            onInput={(e) => onUpdateProps(propName, e.currentTarget.value)}
            onBlur={(e) => onUpdateProps(propName, (e.currentTarget as HTMLInputElement).value, true)}
          />
          <span slot="label">
            {capitalCase(propName)}
            <PPopover className="ms-static-xs" onClick={(e) => e.preventDefault()}>
              {propMeta.description}
            </PPopover>
          </span>
        </PTextFieldWrapper>
      );
    }

    if (propMeta.allowedValues === 'number') {
      return (
        <PTextFieldWrapper key={propName}>
          <input
            type="number"
            value={getCurrentValue(propName, propMeta) ?? ''}
            required={propMeta.isRequired}
            onInput={(e) => onUpdateProps(propName, e.currentTarget.value)}
          />
          <span slot="label">
            {capitalCase(propName)}
            <PPopover className="ms-static-xs" onClick={(e) => e.preventDefault()}>
              {propMeta.description}
            </PPopover>
          </span>
        </PTextFieldWrapper>
      );
    }

    if (Array.isArray(propMeta.allowedValues)) {
      return (
        <PSelect
          key={propName}
          name={propName}
          value={getCurrentValue(propName, propMeta)}
          required={propMeta.isRequired}
          onUpdate={(e) => onUpdateProps(propName, e.detail.value)}
          onBlur={(e) => onUpdateProps(propName, (e.currentTarget as HTMLSelectElement).value, true)}
        >
          <span slot="label">
            {capitalCase(propName)}
            <PPopover className="ms-static-xs" onClick={(e) => e.preventDefault()}>
              {propMeta.description}
            </PPopover>
          </span>
          {renderOptions(propName, propMeta)}
        </PSelect>
      );
    }
  };

  const renderOptions = (propName: string, propMeta: PropMeta) => {
    if (propMeta.allowedValues === 'boolean') {
      return ['true', 'false'].map((option) => (
        <PSelectOption key={option} value={option}>
          {option}
          {isDefaultValue(propMeta.defaultValue, option) ? ' (default)' : ''}
        </PSelectOption>
      ));
    }

    if (Array.isArray(propMeta.allowedValues)) {
      let options: any[] = [];

      // TODO: Improve special case for p-carousel type number | 'auto'?
      if (tagName === 'p-carousel' && propName === 'slidesPerPage') {
        options = [1, 2, 3, 4, 'auto'];
      } else {
        options = propMeta.allowedValues.filter((prop) => !propMeta?.deprecatedValues?.includes(prop));
      }

      return options.map((option) => {
        const sanitizedOption = getSanitizedArrayValue(option);
        return (
          <PSelectOption key={option === undefined ? 'default' : option} value={sanitizedOption}>
            {sanitizedOption}
            {isDefaultValue(propMeta.defaultValue, sanitizedOption) ? ' (default)' : ''}
          </PSelectOption>
        );
      });
    }
  };

  return (
    <>
      <PAccordion headingTag="h3" open={true}>
        <span slot="heading" className="flex gap-xs">
          Properties{' '}
          {amountOfConfiguredProps > 0 && (
            <>
              <PTag compact={true}>{amountOfConfiguredProps}</PTag>
              <PTag compact={true}>
                <button type="button" onClick={() => onReset()}>
                  Reset
                </button>
              </PTag>
            </>
          )}
        </span>
        <div className="flex flex-col gap-sm">
          {filteredComponentProps.map(([propName, propMeta]) =>
            renderInput(propName as keyof ElementConfig['properties'], propMeta)
          )}
        </div>
      </PAccordion>
      <PAccordion heading="Slots" headingTag="h3" open={false} />
      <PAccordion heading="CSS Variables" headingTag="h3" open={false} />
      <PAccordion heading="Direction" headingTag="h3" open={true}>
        <DirectionSelect
          dir="ltr"
          onUpdate={(e) => handleDirectionUpdate(e)}
          label="Changes the direction of HTML elements, mostly used on <body> tag to support languages which are read from right to left like e.g. Arabic."
        />
      </PAccordion>
    </>
  );
};
