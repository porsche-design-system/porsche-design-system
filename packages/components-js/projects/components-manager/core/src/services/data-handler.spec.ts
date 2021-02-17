import { getWebComponentManagerData, WCM_KEY } from './data-handler';
import { WebComponentManagerData } from './web-components-manager';

describe('dataHandler', () => {
  afterEach(() => {
    (document as any)[WCM_KEY] = undefined;
  });

  it("should return the web components manager data if it's available in document", () => {
    const data = {} as WebComponentManagerData;
    (document as any)[WCM_KEY] = data;
    expect(getWebComponentManagerData()).toBe(data);
  });

  it('should return web components manager data with default values in document and return it, if not already available', () => {
    const data = {} as WebComponentManagerData;
    expect(getWebComponentManagerData()).toEqual(data);
  });
});
