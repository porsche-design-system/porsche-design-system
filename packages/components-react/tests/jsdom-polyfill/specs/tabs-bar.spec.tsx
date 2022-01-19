import { useState } from 'react';
import { componentsReady, PTabsBar } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const Sample = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);
  const [eventCounter, setEventCounter] = useState(0);

  return (
    <>
      <PTabsBar
        activeTabIndex={activeTab}
        onTabChange={(e) => {
          setActiveTab(e.detail.activeTabIndex);
          setEventCounter(eventCounter + 1);
        }}
        data-testid="host"
      >
        <button data-testid="button1">Some label</button>
        <button data-testid="button2">Some label</button>
        <button data-testid="button3">Some label</button>
      </PTabsBar>
      <div data-testid="debug">
        {`Active Tab: ${activeTab + 1}`}; {`Event Counter: ${eventCounter};`}
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
  const button1 = getByTestId('button1');
  const button2 = getByTestId('button2');
  const button3 = getByTestId('button3');

  expect(debug.innerHTML).toBe('Active Tab: 1; Event Counter: 0;');

  userEvent.click(button2);
  expect(debug.innerHTML).toBe('Active Tab: 2; Event Counter: 1;');

  userEvent.click(button3);
  expect(debug.innerHTML).toBe('Active Tab: 3; Event Counter: 2;');

  userEvent.click(button1);
  expect(debug.innerHTML).toBe('Active Tab: 1; Event Counter: 3;');
});
