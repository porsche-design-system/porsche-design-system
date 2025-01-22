import type { PropMeta } from '@porsche-design-system/component-meta';
import { PSelect, PSelectOption } from '@porsche-design-system/components-react/ssr';
import { PTextFieldWrapper } from '@porsche-design-system/react-ssr-wrapper/src/lib/components';

export type ComponentProps = {
  [propName: string]: ComponentProp;
};

type ComponentProp = PropMeta & {
  selectedValue?: any; // Value which will be applied to the rendered component markup
};

type ConfigurePropsProps = {
  componentProps: ComponentProps;
};

export const ConfigureProps = ({ componentProps }: ConfigurePropsProps) => {
  const onUpdateProps = (propName: string, selectedValue: string) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(propName, selectedValue);
  };
  const filteredComponentProps = Object.entries(componentProps).filter(
    ([key, value]) => !value.isAria && key !== 'theme' && value.type !== 'string[]'
  );

  const renderInput = (propName: string, propMeta: ComponentProp) => {
    if (propMeta.allowedValues === 'boolean' || Array.isArray(propMeta.allowedValues)) {
      return (
        <PSelect
          key={propName}
          name={propName}
          value={propMeta.selectedValue}
          required={propMeta.isRequired}
          onUpdate={(e) => onUpdateProps(propName, e.detail.value)}
        >
          {renderOptions(propMeta)}
        </PSelect>
      );
    }

    if (propMeta.allowedValues === 'string') {
      return (
        <PTextFieldWrapper>
          <input
            type="text"
            value={propMeta.selectedValue || ''}
            required={propMeta.isRequired}
            onInput={(e) => onUpdateProps(propName, e.currentTarget.value)}
          />
        </PTextFieldWrapper>
      );
    }
  };

  const renderOptions = (propMeta: ComponentProp) => {
    if (propMeta.allowedValues === 'boolean') {
      return ['true', 'false'].map((option) => (
        <PSelectOption key={option} value={option}>
          {option}
          {propMeta.defaultValue === option ? ' (default)' : ''}
        </PSelectOption>
      ));
    }

    if (Array.isArray(propMeta.allowedValues)) {
      return propMeta.allowedValues.map((option) => (
        <PSelectOption key={option} value={option}>
          {option}
          {propMeta.defaultValue === option ? ' (default)' : ''}
        </PSelectOption>
      ));
    }
  };

  return (
    <>
      {filteredComponentProps.map(([propName, propMeta]) => (
        <>{renderInput(propName, propMeta)}</>
      ))}
    </>
  );
};
