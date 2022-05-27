import { componentsReady, PSegmentedControl, PSegmentedControlItem } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return (
    <PSegmentedControl data-testid="host">
      <PSegmentedControlItem data-testid="child">Some text</PSegmentedControlItem>
    </PSegmentedControl>
  );
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
  expect(getByTestId('child').shadowRoot).not.toBeNull();
});
