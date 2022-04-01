import { componentsReady, PTagStatus } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return <PTagStatus data-testid="host">Some label</PTagStatus>;
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
});
