import { getComponentManagerData, CM_KEY } from './data-handler';
import { ComponentManagerData } from './web-components-manager';

describe('dataHandler', () => {
  afterEach(() => {
    (document as any)[CM_KEY] = undefined;
  });

  it("should return the web components manager data if it's available in document", () => {
    const data = {} as ComponentManagerData;
    (document as any)[CM_KEY] = data;
    expect(getComponentManagerData()).toBe(data);
  });

  it('should return web components manager data with default values in document and return it, if not already available', () => {
    const data = {} as ComponentManagerData;
    expect(getComponentManagerData()).toEqual(data);
  });
});
