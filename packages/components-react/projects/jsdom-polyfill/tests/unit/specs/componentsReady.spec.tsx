import { useState } from 'react';
import { componentsReady, PButton } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getByRoleShadowed } from '@porsche-design-system/components-react/testing';

const Sample = (): JSX.Element => {
  const [active, setActive] = useState(false);

  return (
    <>
      <PButton onClick={() => setActive(true)}>Button 1</PButton>
      {active && <PButton>Button 2</PButton>}
    </>
  );
};

it('should return 0 when nothing is rendered', async () => {
  expect(await componentsReady()).toBe(0);
});

it('should return 1 after component is rendered initially', async () => {
  const { container } = render(<Sample />);
  expect(container.innerHTML).toEqual('<p-button>Button 1</p-button>');
  await componentsReady();

  expect(container.innerHTML).toEqual('<p-button class="hydrated">Button 1</p-button>');
  expect(await componentsReady()).toBe(1);
});

it('should return 2 after button is clicked', async () => {
  render(<Sample />);
  expect(await componentsReady()).toBe(1);

  const button = getByRoleShadowed('button');
  await userEvent.click(button);

  expect(await componentsReady()).toBe(2);
});
