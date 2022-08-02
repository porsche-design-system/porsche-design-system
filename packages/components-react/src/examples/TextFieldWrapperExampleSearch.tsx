import { PTextFieldWrapper } from '@porsche-design-system/components-react';
import { useCallback, useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

export const TextFieldWrapperExampleSearchPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (isLoading) {
      // simulate async request
      setTimeout(() => {
        setIsLoading(false);
        setValue('Stuttgart, Baden-Württemberg');
      }, 5000);
    }
  }, [isLoading]);

  const onAction = useCallback(() => {
    setIsLoading(true);
  }, []);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (isLoading) {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <PTextFieldWrapper actionIcon="locate" actionLoading={isLoading} onAction={onAction}>
        <input type="search" value={value} placeholder={isLoading ? 'Searching...' : ''} onChange={onChange} />
      </PTextFieldWrapper>
      <input type="search" value={value} placeholder={isLoading ? 'Searching...' : ''} onChange={onChange} />
    </>
  );
};
