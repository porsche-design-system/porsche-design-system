import { PText, PTextFieldWrapper } from '@porsche-design-system/components-react';
import { useCallback, useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

export const TextFieldWrapperExampleSearchPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (isLoading) {
      // simulate async request
      setTimeout(() => {
        setValue('Stuttgart, Baden-Württemberg');
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  const onAction = useCallback(() => {
    setIsLoading(true);
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
      <PTextFieldWrapper actionIcon="locate" actionLoading={isLoading} onAction={onAction}>
        <input type="search" value={value} placeholder={isLoading ? 'Locating...' : ''} onInput={onInput} />
      </PTextFieldWrapper>
      <PText children={'Value: ' + value} />
    </>
  );
};
