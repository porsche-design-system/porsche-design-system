import { useState } from 'react';
import { AccordionChangeEvent, componentsReady, PAccordion } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getByRoleShadowed } from '@porsche-design-system/components-react/testing';

const Sample = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [eventCounter, setEventCounter] = useState(0);

  return (
    <>
      <PAccordion
        data-testid="host"
        onAccordionChange={({ detail: { open } }: CustomEvent<AccordionChangeEvent>) => {
          setEventCounter(eventCounter + 1);
          setOpen(open);
        }}
      >
        <span slot="heading">Some Slotted Heading</span>
        <p>Some Text</p>
      </PAccordion>
      <div data-testid="debug">
        {`Status: ${open};`} {`Event Counter: ${eventCounter};`}
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

  expect(debug.innerHTML).toBe('Status: false; Event Counter: 0;');

  userEvent.click(button);
  expect(debug.innerHTML).toBe('Status: true; Event Counter: 1;');
});
