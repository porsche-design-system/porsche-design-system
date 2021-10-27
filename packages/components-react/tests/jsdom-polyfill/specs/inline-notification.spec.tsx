import { useState } from 'react';
import { componentsReady, PInlineNotification } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const Sample = (): JSX.Element => {
  const [closeEventCounter, setCloseEventCounter] = useState(0);
  const [actionEventCounter, setActionEventCounter] = useState(0);

  return (
    <>
      <PInlineNotification
        data-testid="host"
        heading="Some banner title"
        actionLabel="Retry"
        onAction={() => setActionEventCounter((prev) => prev + 1)}
        onDismiss={() => setCloseEventCounter((prev) => prev + 1)}
      >
        Some banner description.
      </PInlineNotification>
      <div data-testid="debug">
        {`Action Event Counter: ${actionEventCounter}; Close Event Counter: ${closeEventCounter};`}
      </div>
    </>
  );
};

describe('PInlineNotification', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = render(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });

  it('should have working events', async () => {
    const { getByTestId } = render(<Sample />);
    await componentsReady();

    const debug = getByTestId('debug');
    const actionButton = getByTestId('host').shadowRoot.querySelector('p-button-pure.action');
    const closeButton = getByTestId('host').shadowRoot.querySelector('p-button-pure.close');

    expect(debug.innerHTML).toBe('Action Event Counter: 0; Close Event Counter: 0;');

    userEvent.click(actionButton);
    expect(debug.innerHTML).toBe('Action Event Counter: 1; Close Event Counter: 0;');

    userEvent.click(closeButton);
    expect(debug.innerHTML).toBe('Action Event Counter: 1; Close Event Counter: 1;');
  });
});
