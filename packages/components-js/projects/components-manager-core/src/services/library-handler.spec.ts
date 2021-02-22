import * as browserHelper from './browser-helper';
import { WCM_KEY } from './data-handler';
import { loadComponentLibrary, LoadComponentLibraryOptions, setRegisterComponentsCallback } from './library-handler';

describe('libraryHandler', function () {
  let scriptTags: Node[];

  const script = 'http://localhost/some-lib-vendors.es2015.js';

  const defaultOptions: LoadComponentLibraryOptions = {
    script,
    prefix: '',
    version: 'global',
  };

  beforeEach(() => {
    scriptTags = [];

    spyOn(document.body, 'appendChild').and.callFake((addedScript) => {
      scriptTags.push(addedScript);
      return addedScript;
    });

    spyOn(browserHelper, 'getHTMLScriptElement').and.callFake(() => ({ prototype: { noModule: true } } as any));
  });

  afterEach(() => {
    (document as any)[WCM_KEY] = undefined;
  });

  it('should load the script for the library loaded via loadComponentLibrary', async () => {
    loadComponentLibrary(defaultOptions);
    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    expect((scriptTags[0] as HTMLScriptElement).src).toBe(script);
  });

  xit('should ignore version if prefix is not set', async () => {
    loadComponentLibrary({ ...defaultOptions, version: '1.0.0' });

    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    loadComponentLibrary({ ...defaultOptions, version: '2.0.0' });

    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    loadComponentLibrary(defaultOptions);

    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
  });

  it('should load the library for each version once if version and prefix is used', async () => {
    loadComponentLibrary({ ...defaultOptions, version: '1.0.0' });

    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    loadComponentLibrary({ ...defaultOptions, version: '2.0.0' });

    expect(document.body.appendChild).toHaveBeenCalledTimes(2);
    loadComponentLibrary({ ...defaultOptions, version: '1.0.0', prefix: 'my-prefix' });

    expect(document.body.appendChild).toHaveBeenCalledTimes(2);
    loadComponentLibrary({ ...defaultOptions, version: '2.0.0', prefix: 'another-prefix' });

    expect(document.body.appendChild).toHaveBeenCalledTimes(2);
  });

  it('should call the "RegisterCustomElementsCallback" once for the library and version when ever a prefix is loaded', async () => {
    const registerComponentsSpy1 = jasmine.createSpy('register components 1.0.0');
    const registerComponentsSpy2 = jasmine.createSpy('register components 2.0.0');
    setRegisterComponentsCallback(registerComponentsSpy1, '1.0.0');
    setRegisterComponentsCallback(registerComponentsSpy2, '2.0.0');

    loadComponentLibrary({ ...defaultOptions, version: '1.0.0' });

    expect(registerComponentsSpy1).toHaveBeenCalledTimes(1);
    expect(registerComponentsSpy1).toHaveBeenCalledWith('');
    expect(registerComponentsSpy2).not.toHaveBeenCalled();

    loadComponentLibrary({ ...defaultOptions, version: '1.0.0' });

    expect(registerComponentsSpy1).toHaveBeenCalledTimes(1);
    expect(registerComponentsSpy1).toHaveBeenCalledWith('');
    expect(registerComponentsSpy2).not.toHaveBeenCalled();

    loadComponentLibrary({ ...defaultOptions, version: '1.0.0', prefix: 'some-prefix' });

    expect(registerComponentsSpy1).toHaveBeenCalledTimes(2);
    expect(registerComponentsSpy1).toHaveBeenCalledWith('some-prefix');
    expect(registerComponentsSpy2).not.toHaveBeenCalled();

    loadComponentLibrary({ ...defaultOptions, version: '2.0.0' });

    expect(registerComponentsSpy1).toHaveBeenCalledTimes(2);
    expect(registerComponentsSpy1).toHaveBeenCalledWith('some-prefix');
    expect(registerComponentsSpy2).toHaveBeenCalledTimes(1);
    expect(registerComponentsSpy2).toHaveBeenCalledWith('');
  });

  it('should call the "RegisterCustomElementsCallback" also if it was not yet registered as soon as it\'s registered for library prefixes that have been loaded before', async () => {
    const registerComponentsSpy1 = jasmine.createSpy('register components 1.0.0');

    loadComponentLibrary({ ...defaultOptions, version: '1.0.0' });

    expect(registerComponentsSpy1).not.toHaveBeenCalled();

    loadComponentLibrary({ ...defaultOptions, version: '1.0.0', prefix: 'some-prefix' });

    expect(registerComponentsSpy1).not.toHaveBeenCalled();

    setRegisterComponentsCallback(registerComponentsSpy1, '1.0.0');
    expect(registerComponentsSpy1).toHaveBeenCalledTimes(2);
    expect(registerComponentsSpy1).toHaveBeenCalledWith('');
    expect(registerComponentsSpy1).toHaveBeenCalledWith('some-prefix');

    loadComponentLibrary({ ...defaultOptions, version: '1.0.0', prefix: 'other-prefix' });

    expect(registerComponentsSpy1).toHaveBeenCalledTimes(3);
    expect(registerComponentsSpy1).toHaveBeenCalledWith('other-prefix');
  });
});
