import React from 'react';
import { componentsReady, PFieldsetWrapper } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return (
    <>
      <PFieldsetWrapper data-testid="host" />
    </>
  );
};

describe('PFieldsetWrapper', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = render(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
