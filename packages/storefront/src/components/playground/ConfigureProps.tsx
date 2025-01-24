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
import { capitalCase } from 'change-case';
import type React from 'react';

type ConfigurePropsProps = {
  componentProps: ComponentMeta['propsMeta'];
  configuredProps: ElementConfig['attributes'];
  onUpdateProps: (propName: string, selectedValue: string) => void;
};

/*
 * Different cases to deal with:
 * - propMeta.allowedValues === 'string'
 * - propMeta.allowedValues === 'boolean'
 * - Array.isArray(propMeta.allowedValues)
 *   - array can contain string | number | null
 *   - special case for p-carousel type number | 'auto'
 */

export const ConfigureProps = ({ componentProps, configuredProps, onUpdateProps }: ConfigurePropsProps) => {
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

  const getCurrentValue = (propName: string, propMeta: PropMeta): string | undefined => {
    const value = configuredProps?.[propName] ?? propMeta.defaultValue;

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

  const renderInput = (propName: string, propMeta: PropMeta) => {
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

    if (Array.isArray(propMeta.allowedValues)) {
      return (
        <PSelect
          key={propName}
          name={propName}
          value={getCurrentValue(propName, propMeta)}
          required={propMeta.isRequired}
          onUpdate={(e) => onUpdateProps(propName, e.detail.value)}
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

    if (propMeta.allowedValues === 'string') {
      return (
        <PTextFieldWrapper key={propName}>
          <input
            type="text"
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
      // TODO: Improve special case for p-carousel type number | 'auto'?
      const options =
        propName === 'slidesPerPage'
          ? [1, 2, 3, 4, 'auto']
          : propMeta.allowedValues.filter((prop) => !propMeta?.deprecatedValues?.includes(prop));

      return options.map((option) => {
        const sanitizedOption = getSanitizedArrayValue(option);
        return (
          <PSelectOption key={option} value={sanitizedOption}>
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
        <span slot="heading">
          Properties <PTag compact={true}>3</PTag>{' '}
          <PTag compact={true}>
            <button type="button">Reset</button>
          </PTag>
        </span>
        <div className="flex flex-col gap-sm">
          {filteredComponentProps.map(([propName, propMeta]) => renderInput(propName, propMeta))}
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
