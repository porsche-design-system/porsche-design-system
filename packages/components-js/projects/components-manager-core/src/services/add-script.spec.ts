import { addScript } from './add-script';
import * as browserHelper from './browser-helper';

describe('addScript', () => {
  const url = 'http://localhost/some-url.js';
  let scriptTags: HTMLScriptElement[];
  let spy: jest.SpyInstance<Node, [Node]>;

  const dispatchOnload = (index: number) => {
    const scriptTag = scriptTags[index];
    if (scriptTag.onload) {
      scriptTag.onload(new Event('onload'));
    }
  };

  const mockSupportsEs2015ModulesOnce = (noModule: boolean) => {
    jest
      .spyOn(browserHelper, 'getHTMLScriptElement')
      .mockReturnValueOnce({ prototype: { ...(noModule && { noModule }) } } as any);
  };

  beforeEach(() => {
    scriptTags = [];
    spy = jest.spyOn(document.body, 'appendChild').mockImplementation((addedScript) => {
      scriptTags.push(addedScript as HTMLScriptElement);
      return addedScript;
    });
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('should add a script tag with the provided script source to the body', () => {
    mockSupportsEs2015ModulesOnce(true);
    addScript(url);
    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    const [scriptTag] = scriptTags;
    expect(scriptTag.src).toBe(url);
    dispatchOnload(0);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should add script if the browser does support module syntax', () => {
    mockSupportsEs2015ModulesOnce(true);
    addScript(url);
    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    dispatchOnload(0);
  });

  it("should not add script if the browser doesn't support module syntax", () => {
    mockSupportsEs2015ModulesOnce(false);
    addScript(url);
    expect(document.body.appendChild).not.toBeCalled();
  });

  it('should add crossorigin attribute to scripts', () => {
    mockSupportsEs2015ModulesOnce(true);
    addScript(url);
    const [scriptTag] = scriptTags;
    expect(scriptTag.getAttribute('crossorigin')).toBe('');
    dispatchOnload(0);
  });
});
