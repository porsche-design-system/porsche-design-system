import {
  PButton,
  PInputText,
  type PInputTextInputEvent,
  PMultiSelect,
  type PMultiSelectChangeEvent,
  PMultiSelectOption,
  type PMultiSelectProps,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const MultiSelectExampleDynamicPage = () => {
  const [selectedValues, setSelectedValues] = useState<PMultiSelectProps['value']>([]);
  const [inputValue, setInputValue] = useState('');
  const [optionCount, setOptionCount] = useState(3);

  const onChangeInput = (e: PInputTextInputEvent) => {
    setInputValue((e.detail.target as HTMLInputElement).value);
  };

  const onSetValue = () => {
    setSelectedValues(inputValue.split(','));
  };

  const onResetValue = () => {
    setSelectedValues([]);
    setInputValue('');
  };

  const onChange = (e: PMultiSelectChangeEvent) => {
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
    <div className="flex flex-col gap-fluid-sm">
      <PInputText name="input-value" label="Value:" placeholder="e.g. 1,2" value={inputValue} onInput={onChangeInput} />
      <div className="flex gap-fluid-sm">
        <PButton type="button" onClick={onSetValue} compact={true}>
          Set Value
        </PButton>
        <PButton type="button" onClick={onResetValue} compact={true}>
          Reset value
        </PButton>
      </div>
      <PMultiSelect name="options" label="Some Label" value={selectedValues} onChange={onChange}>
        {[...Array(optionCount).keys()].map((idx) => (
          <PMultiSelectOption key={idx} value={`${idx + 1}`}>
            Option {idx + 1}
          </PMultiSelectOption>
        ))}
      </PMultiSelect>
      <div className="flex gap-fluid-sm">
        <PButton type="button" onClick={onAddOption} compact={true}>
          Add option
        </PButton>
        <PButton type="button" onClick={onRemoveOption} compact={true}>
          Remove last option
        </PButton>
      </div>
    </div>
  );
};
