import { getComponentsManagerData, CM_KEY } from './data-handler';
import type { ComponentsManagerData } from './components-manager';

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
