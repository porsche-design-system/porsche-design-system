import {
  type InputTextInputEventDetail,
  PButton,
  PInputText,
  PSelect,
  PSelectOption,
  type PSelectProps,
  SelectChangeEventDetail,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const SelectExampleDynamicPage = (): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<PSelectProps['value']>('1');
  const [inputValue, setInputValue] = useState('');
  const [optionCount, setOptionCount] = useState(3);

  const onChangeInput = (e: CustomEvent<InputTextInputEventDetail>) => {
    setInputValue((e.detail.target as HTMLInputElement).value);
  };

  const onSetValue = () => {
    setSelectedValue(inputValue);
  };

  const onResetValue = () => {
    setSelectedValue('1');
    setInputValue('');
  };

  const onChange = (e: CustomEvent<SelectChangeEventDetail>) => {
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

      <PSelect name="options" label="Some Label" value={selectedValue} onChange={onChange}>
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
