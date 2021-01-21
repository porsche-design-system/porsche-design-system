import React from 'react';
import { componentsReady, PText } from '@porsche-design-system/components-react';
import { renderWithProvider } from '../helpers';

const Sample = (): JSX.Element => {
  return (
    <>
      <PText data-testid="host">Some text</PText>
    </>
  );
};

describe('PText', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = renderWithProvider(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
