import { useState } from 'react';
import { componentsReady, PPagination } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const Sample = (): JSX.Element => {
  const [activePage, setActivePage] = useState(1);
  const [eventCounter, setEventCounter] = useState(0);

  return (
    <>
      <PPagination
        totalItemsCount={500}
        itemsPerPage={25}
        activePage={activePage}
        onPageChange={(e) => {
          setActivePage(e.detail.page);
          setEventCounter(eventCounter + 1);
        }}
        data-testid="host"
      />
      <div data-testid="debug">
        {`Current Page: ${activePage};`} {`Event Counter: ${eventCounter};`}
      </div>
    </>
  );
};

describe('PPagination', () => {
  it('should have initialized shadow dom', async () => {
    const { getByTestId } = render(<Sample />);
    await componentsReady();

    expect(getByTestId('host').shadowRoot).not.toBeNull();
  });

  it('should have working events', async () => {
    const { getByTestId } = render(<Sample />);
    await componentsReady();

    const debug = getByTestId('debug');
    const [, btn2, btn3] = Array.from(getByTestId('host').shadowRoot.querySelectorAll('span')).slice(1, -1); // without prev and next;

    expect(debug.innerHTML).toBe('Current Page: 1; Event Counter: 0;');

    userEvent.click(btn2);
    expect(debug.innerHTML).toBe('Current Page: 2; Event Counter: 1;');

    userEvent.click(btn3);
    expect(debug.innerHTML).toBe('Current Page: 3; Event Counter: 2;');
  });
});
