import React from 'react';
import { componentsReady, PTextList, PTextListItem } from '@porsche-design-system/components-react';
import { renderWithProvider } from '../helpers';

const Sample = (): JSX.Element => {
  return (
    <>
      <PTextList data-testid="host-list">
        <PTextListItem data-testid="host-list-item">Some text</PTextListItem>
      </PTextList>
    </>
  );
};

describe('PTextList', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = renderWithProvider(<Sample />);
    await componentsReady();

    expect(getByTestId('host-list').shadowRoot).not.toBeNull();
    expect(getByTestId('host-list-item').shadowRoot).not.toBeNull();
  });
});
