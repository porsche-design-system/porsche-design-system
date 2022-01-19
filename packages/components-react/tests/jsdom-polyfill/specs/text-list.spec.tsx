import { componentsReady, PTextList, PTextListItem } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return (
    <PTextList data-testid="host-list">
      <PTextListItem data-testid="host-list-item">Some text</PTextListItem>
    </PTextList>
  );
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host-list').shadowRoot).not.toBeNull();
  expect(getByTestId('host-list-item').shadowRoot).not.toBeNull();
});
