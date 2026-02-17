import {
  type InputTextInputEventDetail,
  type MultiSelectChangeEventDetail,
  PButton,
  PInputText,
  PMultiSelect,
  PMultiSelectOption,
  type PMultiSelectProps,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const MultiSelectExampleDynamicPage = (): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<PMultiSelectProps['value']>([]);
  const [inputValue, setInputValue] = useState('');
  const [optionCount, setOptionCount] = useState(3);

  const onChangeInput = (e: CustomEvent<InputTextInputEventDetail>) => {
    setInputValue((e.detail.target as HTMLInputElement).value);
  };

  const onSetValue = () => {
    setSelectedValues(inputValue.split(','));
  };

  const onResetValue = () => {
    setSelectedValues([]);
    setInputValue('');
  };

  const onChange = (e: CustomEvent<MultiSelectChangeEventDetail>) => {
    setSelectedValues(e.detail.value);
    setInputValue(e.detail.value.join(','));
  };

  const onAddOption = () => {
    setOptionCount((prev) => prev + 1);
  };

  const onRemoveOption = () => {
    if (optionCount > 0) {
      setOptionCount((prev) => prev - 1);
    }
  };

  return (
    <>
      <PInputText
        name="input-value"
        label="Value:"
        placeholder="e.g. 1,2"
        value={inputValue}
        onInput={(e) => onChangeInput(e as CustomEvent<InputTextInputEventDetail>)}
      />
      <PButton type="button" onClick={onSetValue} compact={true}>
        Set Value
      </PButton>
      <PButton type="button" onClick={onResetValue} compact={true}>
        Reset value
      </PButton>

      <PMultiSelect name="options" label="Some Label" value={selectedValues} onChange={onChange}>
        {[...Array(optionCount).keys()].map((idx) => (
          <PMultiSelectOption key={idx} value={`${idx + 1}`}>
            Option {idx + 1}
          </PMultiSelectOption>
        ))}
      </PMultiSelect>

      <PButton type="button" onClick={onAddOption} compact={true}>
        Add option
      </PButton>
      <PButton type="button" onClick={onRemoveOption} compact={true}>
        Remove last option
      </PButton>
    </>
  );
};
