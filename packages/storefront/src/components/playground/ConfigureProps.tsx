import type { ElementConfig } from '@/components/playground/Configurator';
import { isDefaultValue } from '@/components/playground/configuratorUtils';
import type { ComponentMeta, PropMeta } from '@porsche-design-system/component-meta';
import { PSelect, PSelectOption, PTextFieldWrapper } from '@porsche-design-system/components-react/ssr';

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
  const filteredComponentProps = Object.entries(componentProps ?? {}).filter(
    ([key, value]) => !value.isAria && key !== 'theme' && value.type !== 'string[]' && !value.isDeprecated
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

    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
  };

  const renderInput = (propName: string, propMeta: PropMeta) => {
    if (propMeta.allowedValues === 'boolean' || Array.isArray(propMeta.allowedValues)) {
      return (
        <PSelect
          key={propName}
          name={propName}
          value={getCurrentValue(propName, propMeta)}
          label={propName}
          description={propMeta.description}
          required={propMeta.isRequired}
          onUpdate={(e) => onUpdateProps(propName, e.detail.value)}
        >
          {renderOptions(propName, propMeta)}
        </PSelect>
      );
    }

    if (propMeta.allowedValues === 'string') {
      return (
        <PTextFieldWrapper key={propName} label={propName} description={propMeta.description}>
          <input
            type="text"
            value={getCurrentValue(propName, propMeta) ?? ''}
            required={propMeta.isRequired}
            onInput={(e) => onUpdateProps(propName, e.currentTarget.value)}
          />
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
            {isDefaultValue(propMeta.defaultValue, option) ? ' (default)' : ''}
          </PSelectOption>
        );
      });
    }
  };

  return <>{filteredComponentProps.map(([propName, propMeta]) => renderInput(propName, propMeta))}</>;
};
