import React from 'react';
import { componentsReady, PRadioButtonWrapper } from '@porsche-design-system/components-react';
import { renderWithProvider } from '../helpers';

const Sample = (): JSX.Element => {
  return (
    <>
      <PRadioButtonWrapper label="Some label" data-testid="host">
        <input type="radio" />
      </PRadioButtonWrapper>
    </>
  );
};

describe('PRadioButtonWrapper', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = renderWithProvider(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
