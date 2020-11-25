import React from 'react';
import { PTextareaWrapper } from '@porsche-design-system/components-react';
import { componentsReady } from '@porsche-design-system/components-js';
import { render } from '@testing-library/react';

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
    const { getByTestId } = render(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
