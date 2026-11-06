import { expect, it, vi } from 'vitest';

it('requestSubmit', () => {
  const form = document.createElement('form');
  document.body.append(form);
  form.requestSubmit();
});

it('requestSubmit stubbed', () => {
  const form = document.createElement('form');
  document.body.append(form);
  const requestSubmitSpy = vi.spyOn(form, 'requestSubmit').mockImplementation(() => {});
  form.requestSubmit();
  expect(requestSubmitSpy).toHaveBeenCalled();
});
