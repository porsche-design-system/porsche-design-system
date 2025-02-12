import { isDefaultValue } from '@/components/playground/configuratorUtils';
import type { ConfiguratorTagNames, ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';
import { getFlags } from '@/utils/getFlags';
import type { ComponentMeta, PropMeta } from '@porsche-design-system/component-meta';
import {
  PPopover,
  PSelect,
  PSelectOption,
  PSwitch,
  PTag,
  PTextFieldWrapper,
} from '@porsche-design-system/components-react/ssr';
import type { TagName } from '@porsche-design-system/shared';
import { capitalCase } from 'change-case';
import type React from 'react';

type ConfigurePropsProps<T extends ConfiguratorTagNames> = {
  tagName: TagName;
  componentProps: ComponentMeta['propsMeta'];
  configuredProps: ElementConfig<T>['properties'];
  defaultProps: ElementConfig<HTMLTagOrComponent>['properties'];
  onUpdateProps: (propName: keyof ElementConfig<T>['properties'], selectedValue: string | boolean | undefined) => void;
  onResetAllProps: () => void;
};

export const ConfigureProps = <T extends ConfiguratorTagNames>({
  tagName,
  componentProps,
  configuredProps,
  defaultProps,
  onUpdateProps,
  onResetAllProps,
}: ConfigurePropsProps<T>) => {
  const amountOfConfiguredProps = Object.keys(configuredProps ?? {})
    .filter((key) => key !== 'style')
    .filter(
      // @ts-ignore
      (key) => !Object.keys(defaultProps ?? {}).includes(key) || configuredProps?.[key] !== defaultProps?.[key]
    ).length;

  const filteredComponentProps = Object.entries(componentProps ?? {}).filter(
    ([_, value]) => !value.isAria && value.type !== 'string[]' && !value.isDeprecated
  );

  const getSanitizedArrayValue = (value: string | number | null) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return `${value}`;
    if (value === null) return undefined;
  };

  const getCurrentValue = (propName: keyof ElementConfig<T>['properties'], propMeta: PropMeta): string | undefined => {
    if (propName === 'theme') {
      return configuredProps?.[propName];
    }

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

  const renderInput = (propName: keyof ElementConfig<T>['properties'], propMeta: PropMeta) => {
    if (propMeta.allowedValues === 'boolean') {
      return (
        <div key={propName} className="flex gap-static-xs">
          <PSwitch
            checked={getCurrentValue(propName, propMeta) === 'true'}
            compact={true}
            onUpdate={(e) => onUpdateProps(propName, e.detail.checked)}
          >
            <span className="inline-flex gap-static-xs">
              {capitalCase(propName)}
              <PPopover onClick={(e) => e.preventDefault()}>{propMeta.description}</PPopover>
            </span>
          </PSwitch>
          {getFlags(propMeta)}
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
        <PTextFieldWrapper key={propName} style={{ '--p-internal-text-field-scaling': 0.5 } as React.CSSProperties}>
          <input
            type="text"
            name={propName}
            value={getCurrentValue(propName, propMeta) ?? ''}
            required={propMeta.isRequired}
            // disabled={propMeta.hasAlternativeSlot ? configuredSlots.default propMeta.hasAlternativeSlot.tag : false}
            onInput={(e) => onUpdateProps(propName, e.currentTarget.value)}
          />
          <span slot="label" className="inline-flex gap-static-xs">
            {capitalCase(propName)}
            <PPopover onClick={(e) => e.preventDefault()}>{propMeta.description}</PPopover>
            {getFlags(propMeta)}
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
        <PTextFieldWrapper key={propName} style={{ '--p-internal-text-field-scaling': 0.5 } as React.CSSProperties}>
          <input
            type="number"
            value={getCurrentValue(propName, propMeta) ?? ''}
            required={propMeta.isRequired}
            onInput={(e) => onUpdateProps(propName, e.currentTarget.value)}
          />
          <span slot="label" className="inline-flex gap-static-xs">
            {capitalCase(propName)}
            <PPopover onClick={(e) => e.preventDefault()}>{propMeta.description}</PPopover>
            {getFlags(propMeta)}
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
          compact={true}
          required={propMeta.isRequired}
          onUpdate={(e) => onUpdateProps(propName, e.detail.value)}
        >
          <span slot="label" className="inline-flex gap-static-xs">
            {capitalCase(propName)}
            <PPopover onClick={(e) => e.preventDefault()}>{propMeta.description}</PPopover>
            {getFlags(propMeta)}
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
          {isDefaultValue(propMeta, option) ? ' (default)' : ''}
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
      else if (propMeta.allowedValues.includes('string' as never)) {
        options = propMeta.allowedValues.filter((prop) => prop !== 'string');
      } else if (propName === 'theme') {
        options = [undefined, ...propMeta.allowedValues];
      } else {
        options = propMeta.allowedValues.filter((prop) => !propMeta?.deprecatedValues?.includes(prop));
      }

      return options.map((option) => {
        const sanitizedOption = propName === 'theme' ? option : getSanitizedArrayValue(option);
        return (
          <PSelectOption key={option === undefined ? 'default' : option} value={sanitizedOption}>
            {sanitizedOption}
            {isDefaultValue(propMeta, sanitizedOption) ? ' (default)' : ''}
          </PSelectOption>
        );
      });
    }
  };

  return (
    <>
      <span slot="heading" className="flex gap-xs">
        Properties{' '}
        {amountOfConfiguredProps > 0 && (
          <>
            <PTag compact={true}>{amountOfConfiguredProps}</PTag>
            <PTag compact={true} onClick={(e) => e.preventDefault()}>
              <button
                type="button"
                onClick={() => {
                  onResetAllProps();
                }}
              >
                Reset all
              </button>
            </PTag>
          </>
        )}
      </span>
      <div className="flex flex-col gap-sm">
        {filteredComponentProps.map(([propName, propMeta]) =>
          renderInput(propName as keyof ElementConfig<T>['properties'], propMeta)
        )}
      </div>
    </>
  );
};

type ResetButtonProps<T extends ConfiguratorTagNames> = {
  propName: keyof ElementConfig<T>['properties'];
  configuredProps: ElementConfig<T>['properties'];
  defaultProps: ElementConfig<HTMLTagOrComponent>['properties'];
  onReset: (propName: keyof ElementConfig<T>['properties']) => void;
};

const ResetButton = <T extends ConfiguratorTagNames>({
  propName,
  configuredProps,
  defaultProps,
  onReset,
}: ResetButtonProps<T>) => {
  return (
    <>
      {configuredProps?.[propName] !== defaultProps?.[propName] && (
        <PTag compact={true}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onReset(propName);
            }}
          >
            Reset
          </button>
        </PTag>
      )}
    </>
  );
};
