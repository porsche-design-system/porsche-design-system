import React from 'react';
import { componentsReady, PLinkSocial } from '@porsche-design-system/components-react';
import { renderWithProvider } from '../helpers';

const Sample = (): JSX.Element => {
  return (
    <>
      <PLinkSocial href="#" icon="logo-facebook" data-testid="host">
        Facebook
      </PLinkSocial>
    </>
  );
};

describe('PLinkSocial', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = renderWithProvider(<Sample />);

    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
