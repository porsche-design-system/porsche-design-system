import { useState } from 'react';
import { componentsReady, PBanner } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getByRoleShadowed } from '@porsche-design-system/components-react/testing';

const Sample = (): JSX.Element => {
  const [eventCounter, setEventCounter] = useState(0);
  const [status, setStatus] = useState('visible');

  return (
    <>
      <PBanner
        data-testid="host"
        onDismiss={(e) => {
          setEventCounter(eventCounter + 1);
          setStatus('hidden');
        }}
      >
        <span slot="title">Some banner title</span>
        <span slot="description">Some banner description.</span>
      </PBanner>
      <div data-testid="debug">
        {`Status: ${status};`} {`Event Counter: ${eventCounter};`}
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
  const button = getByRoleShadowed('button');

  expect(debug.innerHTML).toBe('Status: visible; Event Counter: 0;');

  userEvent.click(button);
  expect(debug.innerHTML).toBe('Status: hidden; Event Counter: 1;');
});
