import { useState } from 'react';
import { componentsReady, PModal } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const Sample = (): JSX.Element => {
  const [eventCounter, setEventCounter] = useState(0);
  const [status, setStatus] = useState('visible');

  return (
    <>
      <PModal
        open={true}
        data-testid="host"
        onClose={() => {
          setEventCounter(eventCounter + 1);
          setStatus('hidden');
        }}
      />
      <div data-testid="debug">
        {`Status: ${status};`} {`Event Counter: ${eventCounter};`}
      </div>
    </>
  );
};

describe('PModal', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = render(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });

  it('should have working events', async () => {
    const { getByTestId } = render(<Sample />);
    await componentsReady();

    const debug = getByTestId('debug');
    const dismiss = getByTestId('host').shadowRoot.querySelector('p-button-pure');

    expect(debug.innerHTML).toBe('Status: visible; Event Counter: 0;');

    userEvent.click(dismiss);

    expect(debug.innerHTML).toBe('Status: hidden; Event Counter: 1;');
  });
});
