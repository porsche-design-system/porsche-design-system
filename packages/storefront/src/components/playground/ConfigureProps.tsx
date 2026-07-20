import type { ComponentMeta, PropMeta } from '@porsche-design-system/component-meta';
import type { InputNumberInputEventDetail, InputSearchInputEventDetail } from '@porsche-design-system/components-react';
import {
  PHeading,
  PInputNumber,
  PInputText,
  PPopover,
  PSelect,
  PSelectOption,
  PSwitch,
  PTag,
} from '@porsche-design-system/components-react/ssr';
import { FLAGS_ISO_3166, type FlagName } from '@porsche-design-system/flags';
import type { TagName } from '@porsche-design-system/shared';
import { capitalCase } from 'change-case';
import type React from 'react';
import { isDefaultValue } from '@/components/playground/configuratorUtils';
import type { ConfiguratorTagNames, ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';
import { getFlags } from '@/utils/getFlags';

type ConfigurePropsProps<T extends ConfiguratorTagNames> = {
  tagName: TagName;
  componentProps: ComponentMeta['propsMeta'];
  configuredProps: ElementConfig<T>['properties'];
  defaultProps: ElementConfig<HTMLTagOrComponent>['properties'];
  disabledProps?: string[];
  onUpdateProps: (
    propName: keyof ElementConfig<T>['properties'],
    selectedValue: string | boolean | number | undefined
  ) => void;
  onResetAllProps: () => void;
};

export const ConfigureProps = <T extends ConfiguratorTagNames>({
  tagName,
  componentProps,
  configuredProps,
  defaultProps,
  disabledProps,
  onUpdateProps,
  onResetAllProps,
}: ConfigurePropsProps<T>) => {
  const amountOfConfiguredProps = Object.keys(configuredProps ?? {})
    .filter((key) => key !== 'style')
    .filter(
      // @ts-expect-error
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
    // Prop is locked for the active story (e.g. `open` in a popover's uncontrolled setup).
    const isDisabled = disabledProps?.includes(propName as string) ?? false;
    // Components whose value prop accepts `string | null` (e.g. p-input-url) or
    // `string | number | null` (e.g. p-input-text) are emitted by generateComponentMeta as
    // `allowedValues: ['string', 'null']` or `['string', 'number', 'null']`. For configurator UX
    // we want to treat these exactly like a plain string prop and render a text input, not a
    // select. Use a strict check so unrelated patterns such as p-segmented-control's
    // `['string', 'number']` keep their existing array-branch handling.
    const isNullableStringAllowedValues =
      Array.isArray(propMeta.allowedValues) &&
      propMeta.allowedValues.includes('string' as never) &&
      propMeta.allowedValues.includes('null' as never) &&
      propMeta.allowedValues.every((value) => value === 'string' || value === 'number' || value === 'null');

    const allowedValues = isNullableStringAllowedValues ? 'string' : propMeta.allowedValues;

    if (allowedValues === 'boolean') {
      return (
        <div key={propName} className="flex gap-static-xs">
          <span className="inline-flex gap-static-xs align-top">
            <PSwitch
              checked={getCurrentValue(propName, propMeta) === 'true'}
              compact={true}
              disabled={isDisabled}
              onUpdate={(e) => onUpdateProps(propName, e.detail.checked)}
            >
              {capitalCase(propName)}
            </PSwitch>
            <PPopover onClick={(e) => e.preventDefault()}>{propMeta.description}</PPopover>
            {getFlags(propMeta)}
          </span>
        </div>
      );
    }

    if (allowedValues === 'string') {
      return (
        <PInputText
          name={propName}
          key={propName}
          compact={true}
          disabled={isDisabled}
          value={getCurrentValue(propName, propMeta) ?? ''}
          required={propMeta.isRequired}
          // disabled={propMeta.hasAlternativeSlot ? configuredSlots.default propMeta.hasAlternativeSlot.tag : false}
          onInput={(e) => {
            onUpdateProps(
              propName,
              ((e as CustomEvent<InputSearchInputEventDetail>).detail.target as HTMLInputElement).value
            );
          }}
        >
          <span slot="label">
            <span id={`${propName}-id`}>{capitalCase(propName)}</span>
          </span>
          <span slot="label-after" className="inline-flex gap-static-xs align-top">
            <PPopover onClick={(e) => e.preventDefault()}>{propMeta.description}</PPopover>
            {getFlags(propMeta)}
          </span>
        </PInputText>
      );
    }

    if (allowedValues === 'number') {
      return (
        <PInputNumber
          key={propName}
          name={propName}
          disabled={isDisabled}
          value={getCurrentValue(propName, propMeta) ?? ''}
          required={propMeta.isRequired}
          onInput={(e) => {
            const value = ((e as CustomEvent<InputNumberInputEventDetail>).detail.target as HTMLInputElement).value;
            onUpdateProps(propName, value === '' ? undefined : Number(value));
          }}
          compact={true}
          controls={true}
        >
          <span slot="label">
            <span>{capitalCase(propName)}</span>
          </span>
          <span slot="label-after" className="inline-flex gap-static-xs align-top">
            <PPopover onClick={(e) => e.preventDefault()}>{propMeta.description}</PPopover>
            {getFlags(propMeta)}
          </span>
        </PInputNumber>
      );
    }

    if (Array.isArray(allowedValues)) {
      return (
        <PSelect
          key={propName}
          name={propName}
          disabled={isDisabled}
          filter={allowedValues.filter((prop) => !propMeta?.deprecatedValues?.includes(prop)).length > 10}
          value={getCurrentValue(propName, propMeta)}
          compact={true}
          required={propMeta.isRequired}
          onChange={(e) => onUpdateProps(propName, e.detail.value as string | number | undefined)}
        >
          <span slot="label">{capitalCase(propName)}</span>
          <span slot="label-after" className="inline-flex gap-static-xs align-top">
            <PPopover onClick={(e) => e.preventDefault()}>{propMeta.description}</PPopover>
            {getFlags(propMeta)}
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
      let options: { label: any; value: any }[] = [];

      // TODO: Improve componentMeta to include the typing in a better way to handle cases for p-carousel slidesPerPage number | 'auto', p-pin-code type 'number' | 'password', p-segmented-control value ['string | 'number']?
      if (tagName === 'p-carousel' && propName === 'slidesPerPage') {
        options = [1, 2, 3, 4, 'auto'].map((option) => {
          return {
            value: option,
            label: option,
          };
        });
      } else if (tagName === 'p-segmented-control' && propName === 'value') {
        options = [1, 2, 3, 4, 5].map((option) => {
          return {
            value: option,
            label: option,
          };
        });
      } else if (tagName === 'p-flag' && propName === 'name') {
        options = propMeta.allowedValues.map((option) => {
          return {
            value: option,
            label: `${option} – ${FLAGS_ISO_3166[option as FlagName]}`,
          };
        });
      }
      // E.g. p-link target "allowedValues": ["_self", "_blank", "_parent", "_top", "string"]
      else if (propMeta.allowedValues.includes('string' as never)) {
        options = propMeta.allowedValues
          .filter((prop) => prop !== 'string')
          .map((option) => {
            return {
              value: option,
              label: option,
            };
          });
      } else {
        options = propMeta.allowedValues
          .filter((prop) => !propMeta?.deprecatedValues?.includes(prop))
          .map((option) => {
            return {
              value: option,
              label: option,
            };
          });
      }

      return options.map((option) => {
        const sanitizedOptionValue = getSanitizedArrayValue(option.value);
        const sanitizedOptionLabel = getSanitizedArrayValue(option.label);
        return (
          <PSelectOption key={option.value === undefined ? 'default' : option.value} value={sanitizedOptionValue}>
            {sanitizedOptionLabel}
            {isDefaultValue(propMeta, sanitizedOptionValue) ? ' (default)' : ''}
          </PSelectOption>
        );
      });
    }
  };

  return (
    <>
      <PHeading slot="summary" tag="h2" size="small" weight="semibold">
        Properties
      </PHeading>
      {amountOfConfiguredProps > 0 && (
        <>
          <PTag slot="summary-after" variant="secondary" compact={true}>
            {amountOfConfiguredProps}
          </PTag>
          <PTag slot="summary-after" variant="secondary" compact={true} onClick={(e) => e.preventDefault()}>
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
      <div className="flex flex-col gap-fluid-sm">
        {filteredComponentProps.map(([propName, propMeta]) =>
          renderInput(propName as keyof ElementConfig<T>['properties'], propMeta)
        )}
      </div>
    </>
  );
};
