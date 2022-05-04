import { componentsReady, PScroller } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return (
    <PScroller data-testid="host">
      <button type="button">Tab One</button>
      <button type="button">Tab Two</button>
      <button type="button">Tab Three</button>
      <button type="button">Tab Four</button>
      <button type="button">Tab Five</button>
      <button type="button">Tab Six</button>
      <button type="button">Tab Seven</button>
    </PScroller>
  );
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
});
