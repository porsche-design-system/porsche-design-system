import { componentsReady, PSwitch } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { getByRoleShadowed } from '@porsche-design-system/components-react/testing';

const Sample = (): JSX.Element => {
  const [checked, setChecked] = useState(false);
  const [eventCounter, setEventCounter] = useState(0);

  return (
    <>
      <PSwitch
        checked={checked}
        onSwitchChange={(e) => {
          setChecked(e.detail.checked);
          setEventCounter(eventCounter + 1);
        }}
        data-testid="host"
      />
      <div data-testid="debug">
        {`Checked: ${checked}`}; {`Event Counter: ${eventCounter};`}
      </div>
    </>
  );
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
});

it('should have working events', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  const debug = getByTestId('debug');
  const button = getByRoleShadowed('switch');

  expect(debug.innerHTML).toBe('Checked: false; Event Counter: 0;');

  userEvent.click(button);
  expect(debug.innerHTML).toBe('Checked: true; Event Counter: 1;');
});
