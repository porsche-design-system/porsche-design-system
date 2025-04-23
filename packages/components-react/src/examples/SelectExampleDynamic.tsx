import {
  PButton,
  PSelect,
  PSelectOption,
  type PSelectProps,
  PTextFieldWrapper,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react';
import { type ChangeEvent, useState } from 'react';

export const SelectExampleDynamicPage = (): JSX.Element => {
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

  const onUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
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
      <PTextFieldWrapper label="Value:">
        <input name="input-value" type="text" value={inputValue} onChange={onChangeInput} placeholder="e.g. 1,2" />
      </PTextFieldWrapper>
      <PButton type="button" onClick={onSetValue} compact={true}>
        Set Value
      </PButton>
      <PButton type="button" onClick={onResetValue} compact={true}>
        Reset value
      </PButton>

      <PSelect name="options" label="Some Label" value={selectedValue} onUpdate={onUpdate}>
        {[...Array(optionCount).keys()].map((idx) => (
          <PSelectOption key={idx} value={`${idx + 1}`}>
            Option {idx + 1}
          </PSelectOption>
        ))}
      </PSelect>

      <PButton type="button" onClick={onAddOption} compact={true}>
        Add option
      </PButton>
      <PButton type="button" onClick={onRemoveOption} compact={true}>
        Remove last option
      </PButton>
    </>
  );
};
