import { componentsReady, PLinkSocial } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return (
    <PLinkSocial href="#" icon="logo-facebook" data-testid="host">
      Facebook
    </PLinkSocial>
  );
};

describe('PLinkSocial', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = render(<Sample />);

    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
