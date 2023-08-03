import { CM_KEY, getComponentsManagerData } from './data-handler';
import { loadComponentLibrary, LoadComponentLibraryOptions, setRegisterComponentsCallback } from './library-handler';

let scriptTags: Node[];
const script = 'http://localhost/some-lib-vendors.es2015.js';
const defaultOptions: LoadComponentLibraryOptions = {
  script,
  prefix: '',
  version: 'global',
};

beforeEach(() => {
  scriptTags = [];

  jest.spyOn(document.body, 'appendChild').mockImplementation((addedScript) => {
    scriptTags.push(addedScript);
    return addedScript;
  });
});

afterEach(() => {
  (document as any)[CM_KEY] = undefined;
});

it('should load the script for the library loaded via loadComponentLibrary', async () => {
  loadComponentLibrary(defaultOptions);
  expect(document.body.appendChild).toBeCalledTimes(1);
  expect((scriptTags[0] as HTMLScriptElement).src).toBe(script);
});

xit('should ignore version if prefix is not set', async () => {
  loadComponentLibrary({ ...defaultOptions, version: '1.0.0' });
  expect(document.body.appendChild).toBeCalledTimes(1);

  loadComponentLibrary({ ...defaultOptions, version: '2.0.0' });
  expect(document.body.appendChild).toBeCalledTimes(1);

  loadComponentLibrary(defaultOptions);
  expect(document.body.appendChild).toBeCalledTimes(1);
});

it('should load the library for each version once if version and prefix is used', async () => {
  loadComponentLibrary({ ...defaultOptions, version: '1.0.0' });
  expect(document.body.appendChild).toBeCalledTimes(1);
  expect(getComponentsManagerData()).toMatchInlineSnapshot(`
    {
      "1.0.0": {
        "isInjected": true,
        "isReady": [Function],
        "prefixes": [
          "",
        ],
        "readyResolve": [Function],
        "registerCustomElements": null,
      },
    }
  `);

  loadComponentLibrary({ ...defaultOptions, version: '2.0.0', prefix: 'some-prefix' });
  expect(document.body.appendChild).toBeCalledTimes(2);
  expect(getComponentsManagerData()).toMatchInlineSnapshot(`
    {
      "1.0.0": {
        "isInjected": true,
        "isReady": [Function],
        "prefixes": [
          "",
        ],
        "readyResolve": [Function],
        "registerCustomElements": null,
      },
      "2.0.0": {
        "isInjected": true,
        "isReady": [Function],
        "prefixes": [
          "some-prefix",
        ],
        "readyResolve": [Function],
        "registerCustomElements": null,
      },
    }
  `);

  loadComponentLibrary({ ...defaultOptions, version: '1.0.0', prefix: 'my-prefix' });
  expect(document.body.appendChild).toBeCalledTimes(2);
  expect(getComponentsManagerData()).toMatchInlineSnapshot(`
    {
      "1.0.0": {
        "isInjected": true,
        "isReady": [Function],
        "prefixes": [
          "",
          "my-prefix",
        ],
        "readyResolve": [Function],
        "registerCustomElements": null,
      },
      "2.0.0": {
        "isInjected": true,
        "isReady": [Function],
        "prefixes": [
          "some-prefix",
        ],
        "readyResolve": [Function],
        "registerCustomElements": null,
      },
    }
  `);

  loadComponentLibrary({ ...defaultOptions, version: '2.0.0', prefix: 'another-prefix' });
  expect(document.body.appendChild).toBeCalledTimes(2);
  expect(getComponentsManagerData()).toMatchInlineSnapshot(`
    {
      "1.0.0": {
        "isInjected": true,
        "isReady": [Function],
        "prefixes": [
          "",
          "my-prefix",
        ],
        "readyResolve": [Function],
        "registerCustomElements": null,
      },
      "2.0.0": {
        "isInjected": true,
        "isReady": [Function],
        "prefixes": [
          "some-prefix",
          "another-prefix",
        ],
        "readyResolve": [Function],
        "registerCustomElements": null,
      },
    }
  `);
});

it('should call the "RegisterCustomElementsCallback" once for the library and version when ever a prefix is loaded', async () => {
  const registerComponentsSpy1 = jest.fn();
  const registerComponentsSpy2 = jest.fn();
  setRegisterComponentsCallback(registerComponentsSpy1, '1.0.0');
  setRegisterComponentsCallback(registerComponentsSpy2, '2.0.0');

  loadComponentLibrary({ ...defaultOptions, version: '1.0.0' });
  expect(registerComponentsSpy1).toBeCalledTimes(1);
  expect(registerComponentsSpy1).toBeCalledWith('');
  expect(registerComponentsSpy2).not.toBeCalled();

  loadComponentLibrary({ ...defaultOptions, version: '1.0.0' });
  expect(registerComponentsSpy1).toBeCalledTimes(1);
  expect(registerComponentsSpy1).toBeCalledWith('');
  expect(registerComponentsSpy2).not.toBeCalled();

  loadComponentLibrary({ ...defaultOptions, version: '1.0.0', prefix: 'some-prefix' });
  expect(registerComponentsSpy1).toBeCalledTimes(2);
  expect(registerComponentsSpy1).toBeCalledWith('some-prefix');
  expect(registerComponentsSpy2).not.toBeCalled();

  loadComponentLibrary({ ...defaultOptions, version: '2.0.0', prefix: 'another-prefix' });
  expect(registerComponentsSpy1).toBeCalledTimes(2);
  expect(registerComponentsSpy1).toBeCalledWith('some-prefix');
  expect(registerComponentsSpy2).toBeCalledTimes(1);
  expect(registerComponentsSpy2).toBeCalledWith('another-prefix');
});

it('should call the "RegisterCustomElementsCallback" also if it was not yet registered as soon as it\'s registered for library prefixes that have been loaded before', async () => {
  const registerComponentsSpy1 = jest.fn();
  loadComponentLibrary({ ...defaultOptions, version: '1.0.0' });
  expect(registerComponentsSpy1).not.toBeCalled();

  loadComponentLibrary({ ...defaultOptions, version: '1.0.0', prefix: 'some-prefix' });
  expect(registerComponentsSpy1).not.toBeCalled();

  setRegisterComponentsCallback(registerComponentsSpy1, '1.0.0');
  expect(registerComponentsSpy1).toBeCalledTimes(2);
  expect(registerComponentsSpy1).toBeCalledWith('');
  expect(registerComponentsSpy1).toBeCalledWith('some-prefix');

  loadComponentLibrary({ ...defaultOptions, version: '1.0.0', prefix: 'other-prefix' });
  expect(registerComponentsSpy1).toBeCalledTimes(3);
  expect(registerComponentsSpy1).toBeCalledWith('other-prefix');
});

it('should throw if prefix is already used by different version', () => {
  loadComponentLibrary({ ...defaultOptions, version: '1.0.0' });
  expect(getComponentsManagerData()).toMatchInlineSnapshot(`
    {
      "1.0.0": {
        "isInjected": true,
        "isReady": [Function],
        "prefixes": [
          "",
        ],
        "readyResolve": [Function],
        "registerCustomElements": null,
      },
    }
  `);

  expect(() => loadComponentLibrary({ ...defaultOptions, version: '1.1.0' })).toThrowErrorMatchingInlineSnapshot(`
    "[Porsche Design System v1.1.0] prefix '' is already registered with version '1.0.0' of the Porsche Design System. Please use a different one.
    Take a look at document.porscheDesignSystem for more details."
  `);
  expect(getComponentsManagerData()).toMatchInlineSnapshot(`
    {
      "1.0.0": {
        "isInjected": true,
        "isReady": [Function],
        "prefixes": [
          "",
        ],
        "readyResolve": [Function],
        "registerCustomElements": null,
      },
      "1.1.0": {
        "isInjected": false,
        "isReady": [Function],
        "prefixes": [],
        "readyResolve": [Function],
        "registerCustomElements": null,
      },
    }
  `);

  loadComponentLibrary({ ...defaultOptions, version: '1.1.0', prefix: 'prefixed' });
  expect(getComponentsManagerData()).toMatchInlineSnapshot(`
    {
      "1.0.0": {
        "isInjected": true,
        "isReady": [Function],
        "prefixes": [
          "",
        ],
        "readyResolve": [Function],
        "registerCustomElements": null,
      },
      "1.1.0": {
        "isInjected": true,
        "isReady": [Function],
        "prefixes": [
          "prefixed",
        ],
        "readyResolve": [Function],
        "registerCustomElements": null,
      },
    }
  `);
});
