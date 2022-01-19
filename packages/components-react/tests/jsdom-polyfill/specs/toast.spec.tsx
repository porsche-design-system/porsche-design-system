import { componentsReady, PToast, useToastManager } from '@porsche-design-system/components-react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

const Sample = (): JSX.Element => {
  const { addMessage } = useToastManager();
  const [eventCounter, setEventCounter] = useState(0);

  return (
    <>
      <PToast data-testid="host" />
      <button
        onClick={() => {
          addMessage({ text: 'Some message' });
          setEventCounter((prev) => prev + 1);
        }}
      >
        Queue Toast
      </button>
      <div data-testid="debug">{`Event Counter: ${eventCounter};`}</div>
    </>
  );
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
});

it('should have working useToastManager hook', async () => {
  const { getByTestId, getByRole } = render(<Sample />);
  await componentsReady();

  const debug = getByTestId('debug');
  expect(debug.innerHTML).toBe('Event Counter: 0;');

  const button = getByRole('button');
  userEvent.click(button);
  await waitFor(() => expect(debug.innerHTML).toBe('Event Counter: 1;'));
  await waitFor(() => expect(getByTestId('host').shadowRoot.querySelector('p-toast-item').shadowRoot).not.toBeNull());
});
