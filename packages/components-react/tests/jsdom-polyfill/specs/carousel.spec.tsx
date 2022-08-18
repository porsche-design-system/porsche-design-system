import { useState } from 'react';
import { componentsReady, PCarousel } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getByRoleShadowed } from '@porsche-design-system/components-react/testing';

const Sample = (): JSX.Element => {
  const [eventCounter, setEventCounter] = useState(0);

  return (
    <>
      <PCarousel data-testid="host" onCarouselChange={() => setEventCounter((prev) => prev + 1)}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </PCarousel>
      <div data-testid="debug">Event Counter: {eventCounter}</div>
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

  expect(debug.innerHTML).toBe('Event Counter: 0');

  await userEvent.click(button);
  expect(debug.innerHTML).toBe('Event Counter: 1');
});
