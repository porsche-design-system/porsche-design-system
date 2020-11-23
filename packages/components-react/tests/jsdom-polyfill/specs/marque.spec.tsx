import React from 'react';
import {
  componentsReady, PMarque
} from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return (
    <>
      <PMarque data-testid="host" />
    </>
  );
};

describe('PMarque', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = render(<Sample />);

    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
