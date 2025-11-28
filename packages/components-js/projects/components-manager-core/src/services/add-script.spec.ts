import { beforeEach, expect, it, vi } from 'vitest';
import { addScript } from './add-script';

const url = 'http://localhost/some-url.js';
let scriptTags: HTMLScriptElement[];
let spy: any;

const dispatchOnload = (index: number) => {
  const scriptTag = scriptTags[index];
  if (scriptTag.onload) {
    scriptTag.onload(new Event('onload'));
  }
};

beforeEach(() => {
  scriptTags = [];
  spy = vi.spyOn(document.body, 'appendChild').mockImplementation((addedScript: any) => {
    scriptTags.push(addedScript as HTMLScriptElement);
    return addedScript;
  });
});

it('should add a script tag with the provided script source to the body', () => {
  addScript(url);
  expect(document.body.appendChild).toHaveBeenCalledTimes(1);
  const [scriptTag] = scriptTags;
  expect(scriptTag.src).toBe(url);
  dispatchOnload(0);
  expect(spy).toHaveBeenCalledTimes(1);
});

it('should add script', () => {
  addScript(url);
  expect(document.body.appendChild).toHaveBeenCalledTimes(1);
  dispatchOnload(0);
});

it('should add crossorigin attribute to scripts', () => {
  addScript(url);
  const [scriptTag] = scriptTags;
  expect(scriptTag.getAttribute('crossorigin')).toBe('');
  dispatchOnload(0);
});
