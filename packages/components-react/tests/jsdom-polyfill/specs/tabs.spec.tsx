import React, { useState } from 'react';
import { PTabs, PTabsItem } from '@porsche-design-system/components-react';
import { componentsReady } from '@porsche-design-system/components-js';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const Sample = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);
  const [eventCounter, setEventCounter] = useState(0);

  return (
    <>
      <PTabs
        activeTabIndex={activeTab}
        onTabChange={(e) => {
          setCurrentTab(e.detail.activeTabIndex);
          setEventCounter(eventCounter + 1);
        }}
        data-testid="host"
      >
        <PTabsItem label="Some label">Content 1</PTabsItem>
        <PTabsItem label="Some label">Content 2</PTabsItem>
        <PTabsItem label="Some label">Content 3</PTabsItem>
      </PTabs>
      <button type="button" data-testid="button1" onClick={() => setActiveTab(2)} />
      <button type="button" data-testid="button2" onClick={() => setActiveTab(1)} />
      <div data-testid="debug">
        {`Current Tab: ${currentTab};`} {`Event Counter: ${eventCounter};`}
      </div>
    </>
  );
};

describe('PTabs', () => {
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

    expect(debug.innerHTML).toBe('Current Tab: 0; Event Counter: 0;');

    userEvent.click(button1);
    expect(debug.innerHTML).toBe('Current Tab: 2; Event Counter: 1;');

    userEvent.click(button2);
    expect(debug.innerHTML).toBe('Current Tab: 1; Event Counter: 2;');
  });
});
