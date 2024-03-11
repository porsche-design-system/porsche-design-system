import { type ChangeEvent, useState } from 'react';
import {
  type MultiSelectUpdateEventDetail,
  PMultiSelect,
  PMultiSelectOption,
  type PMultiSelectProps,
} from '@porsche-design-system/components-react';

export const MultiSelectDynamicExamplePage = (): JSX.Element => {
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
      <label>
        Value:{' '}
        <input name="input-value" type="text" value={inputValue} onChange={onChangeInput} placeholder="e.g. 1,2" />
      </label>
      <button type="button" onClick={onSetValue}>
        Set Value
      </button>
      <button type="button" onClick={onResetValue}>
        Reset value
      </button>

      <PMultiSelect name="options" label="Some Label" value={selectedValues} onUpdate={onUpdate}>
        {[...Array(optionCount).keys()].map((idx) => (
          <PMultiSelectOption key={idx} value={`${idx + 1}`}>
            Option {idx + 1}
          </PMultiSelectOption>
        ))}
      </PMultiSelect>

      <button type="button" onClick={onAddOption}>
        Add option
      </button>
      <button type="button" onClick={onRemoveOption}>
        Remove last option
      </button>
    </>
  );
};
