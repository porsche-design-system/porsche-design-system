import {
  type MultiSelectUpdateEventDetail,
  PButton,
  PMultiSelect,
  PMultiSelectOption,
  type PMultiSelectProps,
  PTextFieldWrapper,
} from '@porsche-design-system/components-react';
import { type ChangeEvent, useState } from 'react';

export const MultiSelectExampleDynamicPage = (): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<PMultiSelectProps['value']>([]);
  const [inputValue, setInputValue] = useState('');
  const [optionCount, setOptionCount] = useState(3);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSetValue = () => {
    setSelectedValues(inputValue.split(','));
  };

  const onResetValue = () => {
    setSelectedValues([]);
    setInputValue('');
  };

  const onUpdate = (e: CustomEvent<MultiSelectUpdateEventDetail>) => {
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
      <PTextFieldWrapper label="Value:">
        <input name="input-value" type="text" value={inputValue} onChange={onChangeInput} placeholder="e.g. 1,2" />
      </PTextFieldWrapper>
      <PButton type="button" onClick={onSetValue} compact={true}>
        Set Value
      </PButton>
      <PButton type="button" onClick={onResetValue} compact={true}>
        Reset value
      </PButton>

      <PMultiSelect name="options" label="Some Label" value={selectedValues} onUpdate={onUpdate}>
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
