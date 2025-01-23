import type { ElementConfig } from '@/components/playground/Configurator';
import { isDefaultValue } from '@/components/playground/configuratorUtils';
import type { ComponentMeta, PropMeta } from '@porsche-design-system/component-meta';
import { PSelect, PSelectOption, PTextFieldWrapper } from '@porsche-design-system/components-react/ssr';

type ConfigurePropsProps = {
  componentProps: ComponentMeta['propsMeta'];
  configuredProps: ElementConfig['attributes'];
  onUpdateProps: (propName: string, selectedValue: string) => void;
};

export const ConfigureProps = ({ componentProps, configuredProps, onUpdateProps }: ConfigurePropsProps) => {
  const filteredComponentProps = Object.entries(componentProps ?? {}).filter(
    ([key, value]) => !value.isAria && key !== 'theme' && value.type !== 'string[]'
  );

  const getCurrentValue = (propName: string, propMeta: PropMeta): string | undefined => {
    const value = configuredProps?.[propName] || propMeta.defaultValue;

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
          {renderOptions(propMeta)}
        </PSelect>
      );
    }

    if (propMeta.allowedValues === 'string') {
      return (
        <PTextFieldWrapper key={propName} label={propName} description={propMeta.description}>
          <input
            type="text"
            value={getCurrentValue(propName, propMeta)}
            required={propMeta.isRequired}
            onInput={(e) => onUpdateProps(propName, e.currentTarget.value)}
          />
        </PTextFieldWrapper>
      );
    }
  };

  const renderOptions = (propMeta: PropMeta) => {
    if (propMeta.allowedValues === 'boolean') {
      return ['true', 'false'].map((option) => (
        <PSelectOption key={option} value={option}>
          {option}
          {isDefaultValue(propMeta.defaultValue, option) ? ' (default)' : ''}
        </PSelectOption>
      ));
    }

    if (Array.isArray(propMeta.allowedValues)) {
      return propMeta.allowedValues.map((option) => (
        <PSelectOption key={option} value={option}>
          {option}
          {isDefaultValue(propMeta.defaultValue, option) ? ' (default)' : ''}
        </PSelectOption>
      ));
    }
  };

  return <>{filteredComponentProps.map(([propName, propMeta]) => renderInput(propName, propMeta))}</>;
};
