import {
  type InputSearchInputEventDetail,
  PInputSearch,
  type PInputSearchProps,
  PText,
} from '@porsche-design-system/components-react';
import { useState } from 'react';

export const InputSearchControlledExamplePage = (): JSX.Element => {
  const [value, setValue] = useState<PInputSearchProps['value']>('');

  const onInput = (e: CustomEvent<InputSearchInputEventDetail>) => {
    setValue((e.detail.target as HTMLInputElement).value);
  };

  return (
    <>
      <PInputSearch
        name="some-name"
        label="Some Label"
        value={value}
        onInput={(e) => onInput(e as CustomEvent<InputSearchInputEventDetail>)}
      />
      <PText>Value: {value}</PText>
    </>
  );
};
