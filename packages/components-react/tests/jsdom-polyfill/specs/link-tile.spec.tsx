import { componentsReady, PLinkTile } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return (
    <PLinkTile data-testid="host" label="Some label" description="Some description" aspectRatio="4:3" href="#">
      <img src="" />
    </PLinkTile>
  );
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
});
