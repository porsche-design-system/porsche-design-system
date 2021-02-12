import { useState } from 'react';
import { componentsReady, PPagination } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const Sample = (): JSX.Element => {
  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventCounter, setEventCounter] = useState(0);

  return (
    <>
      <PPagination
        totalItemsCount={500}
        itemsPerPage={25}
        activePage={activePage}
        onPageChange={(e) => {
          setCurrentPage(e.detail.page);
          setEventCounter(eventCounter + 1);
        }}
        data-testid="host"
      />
      <button type="button" data-testid="button1" onClick={() => setActivePage(4)} />
      <button type="button" data-testid="button2" onClick={() => setActivePage(7)} />
      <div data-testid="debug">
        {`Current Page: ${currentPage};`} {`Event Counter: ${eventCounter};`}
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
    const button1 = getByTestId('button1');
    const button2 = getByTestId('button2');

    expect(debug.innerHTML).toBe('Current Page: 1; Event Counter: 0;');

    userEvent.click(button1);
    expect(debug.innerHTML).toBe('Current Page: 4; Event Counter: 1;');

    userEvent.click(button2);
    expect(debug.innerHTML).toBe('Current Page: 7; Event Counter: 2;');
  });
});
