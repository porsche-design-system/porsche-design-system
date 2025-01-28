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
import React, { Fragment } from 'react';

type ConfigurePropsProps = {
  tagName: TagName;
  componentProps: ComponentMeta['propsMeta'];
  configuredProps: ElementConfig['properties'];
  defaultProps: ElementConfig['properties'];
  onUpdateProps: (
    propName: keyof ElementConfig['properties'],
    selectedValue: string | undefined,
    inputType?: 'text-field' | 'checkbox' | 'select',
    onBlur?: boolean
  ) => void;
  // onResetProp: (propName: keyof ElementConfig['properties']) => void;
  onResetAllProps: () => void;
};

export const ConfigureProps = ({
  tagName,
  componentProps,
  configuredProps,
  defaultProps,
  onUpdateProps,
  // onResetProp,
  onResetAllProps,
}: ConfigurePropsProps) => {
  const amountOfConfiguredProps = Object.keys(configuredProps ?? {}).filter(
    // @ts-ignore
    (key) => !Object.keys(defaultProps ?? {}).includes(key) || configuredProps?.[key] !== defaultProps?.[key]
  ).length;

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
        <div key={propName} className="flex gap-xs">
          <PSwitch
            checked={getCurrentValue(propName, propMeta) === 'true'}
            onUpdate={(e) => onUpdateProps(propName, e.detail.checked ? 'true' : 'false')}
          >
            {capitalCase(propName)}
            <PPopover className="ms-static-xs" onClick={(e) => e.preventDefault()}>
              {propMeta.description}
            </PPopover>
          </PSwitch>
          <ResetButton
            propName={propName}
            configuredProps={configuredProps}
            defaultProps={defaultProps}
            onReset={() => onUpdateProps(propName, defaultProps?.[propName])}
          />
        </div>
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
          <span slot="label" className="inline-flex gap-xs">
            {capitalCase(propName)}
            <PPopover onClick={(e) => e.preventDefault()}>{propMeta.description}</PPopover>
            <ResetButton
              propName={propName}
              configuredProps={configuredProps}
              defaultProps={defaultProps}
              onReset={() => onUpdateProps(propName, defaultProps?.[propName])}
            />
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
          <span slot="label" className="inline-flex gap-xs">
            {capitalCase(propName)}
            <PPopover className="ms-static-xs" onClick={(e) => e.preventDefault()}>
              {propMeta.description}
            </PPopover>
            <ResetButton
              propName={propName}
              configuredProps={configuredProps}
              defaultProps={defaultProps}
              onReset={() => onUpdateProps(propName, defaultProps?.[propName])}
            />
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
        >
          <span slot="label" className="inline-flex gap-xs">
            {capitalCase(propName)}
            <PPopover className="ms-static-xs" onClick={(e) => e.preventDefault()}>
              {propMeta.description}
            </PPopover>
            <ResetButton
              propName={propName}
              configuredProps={configuredProps}
              defaultProps={defaultProps}
              onReset={() => onUpdateProps(propName, defaultProps?.[propName])}
            />
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

      // TODO: Improve componentMeta to include the typing in a better way to handle cases for p-carousel slidesPerPage number | 'auto', p-pin-code type 'number' | 'password', p-segmented-control value ['string | 'number']?
      if (tagName === 'p-carousel' && propName === 'slidesPerPage') {
        options = [1, 2, 3, 4, 'auto'];
      } else if (tagName === 'p-link-social' && propName === 'icon') {
        options = propMeta.allowedValues.map((prop) => (prop === '' ? undefined : prop));
      } else if (tagName === 'p-segmented-control' && propName === 'value') {
        options = [1, 2, 3, 4, 5];
      }
      // E.g. p-link target "allowedValues": ["_self", "_blank", "_parent", "_top", "string"]
      else if (propMeta.allowedValues.includes('string')) {
        options = propMeta.allowedValues.filter((prop) => prop !== 'string');
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
                <button type="button" onClick={() => onResetAllProps()}>
                  Reset all
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

type ResetButtonProps = {
  propName: keyof ElementConfig['properties'];
  configuredProps: ElementConfig['properties'];
  defaultProps: ElementConfig['properties'];
  onReset: (propName: keyof ElementConfig['properties']) => void;
};

const ResetButton = ({ propName, configuredProps, defaultProps, onReset }: ResetButtonProps) => {
  return (
    <>
      {configuredProps?.[propName] !== defaultProps?.[propName] && (
        <PTag compact={true}>
          <button type="button" onClick={() => onReset(propName)}>
            Reset
          </button>
        </PTag>
      )}
    </>
  );
};
