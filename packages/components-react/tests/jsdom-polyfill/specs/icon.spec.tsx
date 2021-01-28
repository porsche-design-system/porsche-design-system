import React from 'react';
import { componentsReady, PIcon } from '@porsche-design-system/components-react';
import { renderWithProvider } from '../helpers';

const Sample = (): JSX.Element => {
  return (
    <>
      <PIcon data-testid="host" />
    </>
  );
};

describe('PIcon', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = renderWithProvider(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
