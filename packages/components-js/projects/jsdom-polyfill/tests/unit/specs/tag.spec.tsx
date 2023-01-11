import { componentsReady, PTag } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return <PTag data-testid="host">Some label</PTag>;
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
});
