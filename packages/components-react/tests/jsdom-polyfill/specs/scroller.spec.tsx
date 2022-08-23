import { componentsReady, PScroller } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return (
    <PScroller data-testid="host">
      <button>Some Button</button>
      <button>Some Button</button>
      <button>Some Button</button>
      <button>Some Button</button>
    </PScroller>
  );
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
});
