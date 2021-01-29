import React from 'react';
import { componentsReady, PTextFieldWrapper } from '@porsche-design-system/components-react';
import { renderWithProvider } from '../helpers';

const Sample = (): JSX.Element => {
  return (
    <>
      <PTextFieldWrapper label="Some label" data-testid="host">
        <input type="text" />
      </PTextFieldWrapper>
    </>
  );
};

describe('PTextFieldWrapper', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = renderWithProvider(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
