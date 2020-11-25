import React from 'react';
import { PTextFieldWrapper } from '@porsche-design-system/components-react';
import { componentsReady } from '@porsche-design-system/components-js';
import { render } from '@testing-library/react';

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
    const { getByTestId } = render(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
