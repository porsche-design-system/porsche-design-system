import { componentsReady, PButtonGroup } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return <PButtonGroup data-testid="host" />;
};

describe('PButtonGroup', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = render(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
