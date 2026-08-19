import {
  createDOMElementFilter,
  debug,
  deepQuerySelector,
  deepQuerySelectorAll,
  getAllElementsAndShadowRoots,
  getElementError,
  logRoles,
  logShadowDOM,
  prettyShadowDOM,
} from '@porsche-design-system/components-js/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';

// The nine exports covered here are the non-query half of the `./testing` surface. Unlike the 48 queries they share
// no contract with each other, so each gets its own block. The fixture nests a second shadow root inside the first,
// which is what makes the `depth` option observable.

const INNER_TAG = 'shadow-helper-inner';
const OUTER_TAG = 'shadow-helper-outer';

class ShadowHelperInner extends HTMLElement {
  connectedCallback(): void {
    if (this.shadowRoot) {
      return;
    }
    this.attachShadow({ mode: 'open' }).innerHTML = '<span class="inner">Inner Target</span>';
  }
}

class ShadowHelperOuter extends HTMLElement {
  connectedCallback(): void {
    if (this.shadowRoot) {
      return;
    }
    this.attachShadow({ mode: 'open' }).innerHTML =
      `<button class="outer-button">Outer Button</button><span class="outer">Outer Target</span>` +
      `<${INNER_TAG}></${INNER_TAG}>`;
  }
}

customElements.define(INNER_TAG, ShadowHelperInner);
customElements.define(OUTER_TAG, ShadowHelperOuter);

const renderFixture = (): void => {
  document.body.innerHTML = `<${OUTER_TAG}></${OUTER_TAG}>`;
};

const spyOnConsoleLog = () => vi.spyOn(console, 'log').mockImplementation(() => undefined);

afterEach(() => {
  vi.restoreAllMocks();
});

describe('deepQuerySelectorAll()', () => {
  it('should return matching elements from every nested shadow root', () => {
    renderFixture();

    expect(deepQuerySelectorAll(document.body, 'span').map((el) => el.className)).toEqual(['outer', 'inner']);
  });

  it('should stop at the first shadow root when depth is 1', () => {
    renderFixture();

    expect(deepQuerySelectorAll(document.body, 'span', { depth: 1 }).map((el) => el.className)).toEqual(['outer']);
  });

  it('should return an empty array when nothing matches', () => {
    renderFixture();

    expect(deepQuerySelectorAll(document.body, '.absent')).toEqual([]);
  });

  it('should find what a plain querySelectorAll on the same container cannot', () => {
    renderFixture();

    expect(document.body.querySelectorAll('span')).toHaveLength(0);
    expect(deepQuerySelectorAll(document.body, 'span')).toHaveLength(2);
  });
});

describe('deepQuerySelector()', () => {
  it('should return the first matching element across shadow roots', () => {
    renderFixture();

    expect(deepQuerySelector(document.body, 'span')?.className).toBe('outer');
  });

  it('should return null when nothing matches', () => {
    renderFixture();

    expect(deepQuerySelector(document.body, '.absent')).toBeNull();
  });

  it('should stop at the first shadow root when depth is 1', () => {
    renderFixture();

    expect(deepQuerySelector(document.body, '.inner', { depth: 1 })).toBeNull();
    expect(deepQuerySelector(document.body, '.inner')?.className).toBe('inner');
  });
});

describe('getAllElementsAndShadowRoots()', () => {
  it('should include the container itself', () => {
    renderFixture();

    expect(getAllElementsAndShadowRoots(document.body)).toContain(document.body);
  });

  it('should include every shadow root in the tree', () => {
    renderFixture();

    const shadowRoots = getAllElementsAndShadowRoots(document.body).filter((node) => node instanceof ShadowRoot);
    expect(shadowRoots).toHaveLength(2);
  });

  it('should include elements living inside a nested shadow root', () => {
    renderFixture();

    const inner = document.querySelector(OUTER_TAG)?.shadowRoot?.querySelector(INNER_TAG);
    expect(getAllElementsAndShadowRoots(document.body)).toContain(inner?.shadowRoot?.querySelector('.inner'));
  });
});

describe('prettyShadowDOM()', () => {
  it('should return markup that includes the shadow roots and their content', () => {
    renderFixture();

    const output = prettyShadowDOM(document.body) as string;
    expect(output).toContain('<ShadowRoot>');
    expect(output).toContain('Outer Target');
    expect(output).toContain('Inner Target');
  });
});

describe('logShadowDOM()', () => {
  it('should log the shadow markup once', () => {
    renderFixture();
    const spy = spyOnConsoleLog();

    logShadowDOM(document.body);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(String(spy.mock.calls[0][0])).toContain('Inner Target');
  });
});

describe('debug()', () => {
  it('should log the shadow markup for a single element', () => {
    renderFixture();
    const spy = spyOnConsoleLog();

    debug(document.body);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(String(spy.mock.calls[0][0])).toContain('Inner Target');
  });

  it('should log once per element when given an array', () => {
    renderFixture();
    const spy = spyOnConsoleLog();

    debug([document.body, document.body]);

    expect(spy).toHaveBeenCalledTimes(2);
  });
});

describe('logRoles()', () => {
  it('should log the roles it found inside the shadow root', () => {
    renderFixture();
    const spy = spyOnConsoleLog();

    logRoles(document.body);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(String(spy.mock.calls[0][0])).toContain('button:');
    expect(String(spy.mock.calls[0][0])).toContain('Outer Button');
  });
});

describe('createDOMElementFilter()', () => {
  it('should return a pretty-format plugin', () => {
    const plugin = createDOMElementFilter(() => true);

    expect(typeof plugin.test).toBe('function');
    expect(typeof plugin.serialize).toBe('function');
  });

  it('should accept DOM nodes and reject anything else', () => {
    renderFixture();

    const plugin = createDOMElementFilter(() => true);
    expect(plugin.test(document.body)).toBeTruthy();
    expect(plugin.test({ not: 'a node' })).toBeFalsy();
  });
});

describe('getElementError()', () => {
  it('should return an error carrying the given message', () => {
    renderFixture();

    expect(getElementError('Some message', document.body).message).toContain('Some message');
  });

  it('should name the error so it is distinguishable from a plain DOM testing library error', () => {
    renderFixture();

    expect(getElementError('Some message', document.body).name).toBe('ShadowDOMTestingLibraryElementError');
  });

  it('should append the prettified shadow DOM so a failure shows what was actually searched', () => {
    renderFixture();

    const { message } = getElementError('Some message', document.body);
    expect(message).toContain('Ignored nodes: comments,');
    expect(message).toContain('<ShadowRoot>');
    expect(message).toContain('Inner Target');
  });
});
