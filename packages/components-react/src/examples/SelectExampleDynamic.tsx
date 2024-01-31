import { type ChangeEvent, useState } from 'react';
import {
  type SelectUpdateEventDetail,
  PSelect,
  PSelectOption,
  type PSelectProps,
} from '@porsche-design-system/components-react';

export const SelectDynamicExamplePage = (): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<PSelectProps['value']>('1');
  const [inputValue, setInputValue] = useState('');
  const [optionCount, setOptionCount] = useState(3);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSetValue = () => {
    setSelectedValue(inputValue);
  };

  const onResetValue = () => {
    setSelectedValue('1');
    setInputValue('');
  };

  const handleUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
    setSelectedValue(e.detail.value);
    setInputValue(e.detail.value);
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

      <PSelect name="options" label="Some Label" value={selectedValue} onUpdate={handleUpdate}>
        {[...Array(optionCount).keys()].map((idx) => (
          <PSelectOption key={idx} value={`${idx + 1}`}>
            Option {idx + 1}
          </PSelectOption>
        ))}
      </PSelect>

      <button type="button" onClick={onAddOption}>
        Add option
      </button>
      <button type="button" onClick={onRemoveOption}>
        Remove last option
      </button>
    </>
  );
};
