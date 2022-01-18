import { componentsReady, PCheckboxWrapper } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return (
    <PCheckboxWrapper label="Some label" data-testid="host">
      <input type="checkbox" />
    </PCheckboxWrapper>
  );
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
});
