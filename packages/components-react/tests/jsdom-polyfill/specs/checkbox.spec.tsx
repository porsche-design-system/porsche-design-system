import React from 'react';
import { componentsReady, PCheckboxWrapper } from '@porsche-design-system/components-react';
import { renderWithProvider } from '../helpers';

const Sample = (): JSX.Element => {
  return (
    <>
      <PCheckboxWrapper label="Some label" data-testid="host">
        <input type="checkbox" />
      </PCheckboxWrapper>
    </>
  );
};

describe('PCheckboxWrapper', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = renderWithProvider(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
