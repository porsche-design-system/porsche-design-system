import { componentsReady, PGrid, PGridItem } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return (
    <PGrid data-testid="host">
      <PGridItem size={6} data-testid="child1" />
      <PGridItem size={6} data-testid="child2" />
    </PGrid>
  );
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
  expect(getByTestId('child1').shadowRoot).not.toBeNull();
  expect(getByTestId('child2').shadowRoot).not.toBeNull();
});
