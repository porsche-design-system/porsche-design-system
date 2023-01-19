import { addScript } from './add-script';

const url = 'http://localhost/some-url.js';
let scriptTags: HTMLScriptElement[];
let spy: jest.SpyInstance<Node, [Node]>;

const dispatchOnload = (index: number) => {
  const scriptTag = scriptTags[index];
  if (scriptTag.onload) {
    scriptTag.onload(new Event('onload'));
  }
};

beforeEach(() => {
  scriptTags = [];
  spy = jest.spyOn(document.body, 'appendChild').mockImplementation((addedScript) => {
    scriptTags.push(addedScript as HTMLScriptElement);
    return addedScript;
  });
});

it('should add a script tag with the provided script source to the body', () => {
  addScript(url);
  expect(document.body.appendChild).toBeCalledTimes(1);
  const [scriptTag] = scriptTags;
  expect(scriptTag.src).toBe(url);
  dispatchOnload(0);
  expect(spy).toBeCalledTimes(1);
});

it('should add script', () => {
  addScript(url);
  expect(document.body.appendChild).toBeCalledTimes(1);
  dispatchOnload(0);
});

it('should add crossorigin attribute to scripts', () => {
  addScript(url);
  const [scriptTag] = scriptTags;
  expect(scriptTag.getAttribute('crossorigin')).toBe('');
  dispatchOnload(0);
});
