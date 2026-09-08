import { expect, type Page, test } from '@playwright/test';
import {
  addEventListener,
  getConsoleErrorsAmount,
  getEventSummary,
  getFormDataValue,
  getHTMLAttributes,
  initConsoleObserver,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

/**
 * Shared native form-association sync tests for all "same-shape" PDS input/textarea components.
 *
 * These tests assert behavior of the underlying ElementInternals form-association
 * (FormData participation, validity, `disabled`/`readOnly` semantics) which is
 * identical across all single-value text-like form-associated components.
 *
 * Component-specific tests (labels, slots, implicit submit on enter, type-specific
 * keyboard behavior, etc.) live in each component's own `*.e2e.ts` spec.
 */

type Config = {
  tag: string;
  /** A value that is valid for the underlying native input type so HTML validation passes. */
  value: string;
};

const configs: Config[] = [
  { tag: 'p-input-text', value: 'sample' },
  { tag: 'p-input-email', value: 'test@example.com' },
  { tag: 'p-input-number', value: '10' },
  { tag: 'p-input-password', value: 'secret' },
  { tag: 'p-input-tel', value: '123456' },
  { tag: 'p-input-url', value: 'https://example.com' },
  { tag: 'p-input-search', value: 'search' },
  { tag: 'p-input-date', value: '2024-01-15' },
  { tag: 'p-input-time', value: '12:30' },
  { tag: 'p-input-month', value: '2024-01' },
  { tag: 'p-input-week', value: '2024-W03' },
  { tag: 'p-textarea', value: 'sample text' },
];

const getForm = (page: Page) => page.locator('form');
const getSubmitButton = (page: Page) => page.locator('button[type="submit"]');

const initFormComponent = (page: Page, tag: string, props: Record<string, unknown>): Promise<void> => {
  const markup = `<form onsubmit="return false;">
    <${tag} ${getHTMLAttributes(props)}></${tag}>
    <button type="submit">Submit</button>
  </form>`;
  return setContentWithDesignSystem(page, markup);
};

for (const { tag, value } of configs) {
  test.describe(tag, () => {
    test('should submit form after dynamically setting `disabled` to true on an initially required, empty input', async ({
      page,
    }) => {
      initConsoleObserver(page);
      const name = 'name';
      await initFormComponent(page, tag, { name, value: '', required: true });
      const form = getForm(page);
      const host = page.locator(tag);

      await addEventListener(form, 'submit');

      await setProperty(host, 'disabled', true);
      await waitForStencilLifecycle(page);

      await getSubmitButton(page).click();
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
      expect(getConsoleErrorsAmount(), 'console errors').toBe(0);
    });

    test('should submit form when `disabled` is toggled to true and `required` to false in the same tick', async ({
      page,
    }) => {
      // Regression test: previously, componentDidRender skipped setValidity when disabled,
      // leaving stale `valueMissing` on the ElementInternals and producing
      // "An invalid form control with name='…' is not focusable." on submit.
      initConsoleObserver(page);
      const name = 'name';
      await initFormComponent(page, tag, { name, value: '', required: true });
      const form = getForm(page);
      const host = page.locator(tag);

      await addEventListener(form, 'submit');

      // Mirror the React wrapper's behavior: both props change in the same tick before the next render.
      await host.evaluate((el: HTMLElement & { disabled: boolean; required: boolean }) => {
        el.disabled = true;
        el.required = false;
      });
      await waitForStencilLifecycle(page);

      await getSubmitButton(page).click();
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
      expect(getConsoleErrorsAmount(), 'console errors').toBe(0);
    });

    test('should submit form after dynamically setting `readOnly` to true on an initially required, empty input', async ({
      page,
    }) => {
      initConsoleObserver(page);
      const name = 'name';
      await initFormComponent(page, tag, { name, value: '', required: true });
      const form = getForm(page);
      const host = page.locator(tag);

      await addEventListener(form, 'submit');

      await setProperty(host, 'readOnly', true);
      await waitForStencilLifecycle(page);

      await getSubmitButton(page).click();
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
      expect(getConsoleErrorsAmount(), 'console errors').toBe(0);
    });

    test('should omit value from FormData when input is disabled (matching native behavior)', async ({ page }) => {
      const name = 'name';
      await initFormComponent(page, tag, { name, value, disabled: true });
      const form = getForm(page);

      await addEventListener(form, 'submit');
      await getSubmitButton(page).click();

      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
      expect(await getFormDataValue(form, name)).toBeNull();
    });

    test('should omit value from FormData after dynamically setting `disabled` to true (matching native behavior)', async ({
      page,
    }) => {
      const name = 'name';
      await initFormComponent(page, tag, { name, value });
      const form = getForm(page);
      const host = page.locator(tag);

      await addEventListener(form, 'submit');

      await setProperty(host, 'disabled', true);
      await waitForStencilLifecycle(page);

      await getSubmitButton(page).click();
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
      expect(await getFormDataValue(form, name)).toBeNull();
    });

    test('should include value in FormData when input is readOnly (matching native behavior)', async ({ page }) => {
      const name = 'name';
      await initFormComponent(page, tag, { name, value, readOnly: true });
      const form = getForm(page);

      await addEventListener(form, 'submit');
      await getSubmitButton(page).click();

      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
      expect(await getFormDataValue(form, name)).toBe(value);
    });
  });
}

