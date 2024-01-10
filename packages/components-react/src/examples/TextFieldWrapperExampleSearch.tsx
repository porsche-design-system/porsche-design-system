import { type ChangeEvent, useCallback, useState } from 'react';
import { PText, PTextFieldWrapper } from '@porsche-design-system/components-react';

export const TextFieldWrapperExampleSearchPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');

  const onAction = useCallback(() => {
    setIsLoading(true);

    // simulate async request
    setTimeout(() => {
      setValue('Stuttgart, Baden-Württemberg');
      setIsLoading(false);
    }, 3000);
  }, []);

  const onInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (isLoading) {
        setIsLoading(false);
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <>
      <PTextFieldWrapper
        label="Search location"
        hideLabel
        actionIcon="locate"
        actionLoading={isLoading}
        onAction={onAction}
      >
        <input type="search" value={value} placeholder={isLoading ? 'Locating...' : ''} onInput={onInput} />
      </PTextFieldWrapper>
      <PText children={'Value: ' + value} />
    </>
  );
};
