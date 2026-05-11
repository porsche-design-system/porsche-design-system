import { afterEach, expect, it } from 'vitest';
import type { ComponentsManagerData } from './components-manager';
import { CM_KEY, getComponentsManagerData } from './data-handler';

afterEach(() => {
  delete document[CM_KEY];
});

it("should return the web components manager data if it's available in document", () => {
  const data = {} as ComponentsManagerData;
  document[CM_KEY] = data;
  expect(getComponentsManagerData()).toBe(data);
});

it('should return web components manager data with default values in document and return it if not already available', () => {
  const data = {} as ComponentsManagerData;
  expect(getComponentsManagerData()).toEqual(data);
});
