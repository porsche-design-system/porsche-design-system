import { componentsReady } from '@porsche-design-system/components-js';
import { getByRoleShadowed } from '@porsche-design-system/components-js/testing';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';

const getMarkup = (): string => {
  return `<p-popover>Some Popover Content</p-popover>`;
};

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup();
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should be opened on click and closed on second click', async () => {
  document.body.innerHTML = getMarkup();
  await componentsReady();

  const el = document.body.firstElementChild;
  const button = getByRoleShadowed('button');

  await userEvent.click(button);
  await waitFor(() => expect(el.shadowRoot.querySelector('.popover')).not.toBeNull());

  await userEvent.click(button);
  await waitFor(() => expect(el.shadowRoot.querySelector('.popover')).toBeNull());
});
