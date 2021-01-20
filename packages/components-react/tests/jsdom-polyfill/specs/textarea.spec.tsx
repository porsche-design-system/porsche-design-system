import React from 'react';
import { componentsReady, PTextareaWrapper } from '@porsche-design-system/components-react';
import { renderWithProvider } from '../helpers';

const Sample = (): JSX.Element => {
  return (
    <>
      <PTextareaWrapper label="Some label" data-testid="host">
        <textarea />
      </PTextareaWrapper>
    </>
  );
};

describe('PTextareaWrapper', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = renderWithProvider(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
