import { PPopover, componentsReady } from '@porsche-design-system/components-react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getByRoleShadowed } from '@porsche-design-system/components-react/testing';

const Sample = (): JSX.Element => {
  return <PPopover data-testid="host">Some Popover Content</PPopover>;
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
});

it('should be opened on click and closed on second click', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  const button = getByRoleShadowed('button');

  userEvent.click(button);
  await waitFor(() => expect(getByTestId('host').shadowRoot.querySelector('.popover')).not.toBeNull());

  userEvent.click(button);
  await waitFor(() => expect(getByTestId('host').shadowRoot.querySelector('.popover')).toBeNull());
});
