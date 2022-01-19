import { componentsReady, PFlex, PFlexItem } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return (
    <PFlex data-testid="host">
      <PFlexItem data-testid="child1" />
      <PFlexItem data-testid="child2" />
    </PFlex>
  );
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
  expect(getByTestId('child1').shadowRoot).not.toBeNull();
  expect(getByTestId('child2').shadowRoot).not.toBeNull();
});
