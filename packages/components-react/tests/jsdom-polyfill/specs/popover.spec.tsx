import { PPopover, componentsReady } from '../../../projects/components-wrapper/src';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return <PPopover data-testid="host">Some Popover Content</PPopover>;
};

describe('PPopover', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = render(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });
});
