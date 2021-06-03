import Protocol from 'devtools-protocol';
import {
  findBackendNodeId,
  generateGUID,
  getBodyMarkup,
  GetMarkup,
  getThemedBodyMarkup,
  GetThemedMarkup,
  resolveSelector,
} from '../../e2e/helpers/cdp-helper';

type Node = Pick<Protocol.DOM.Node, 'localName' | 'backendNodeId'>;
type NodeWithChildren = Node & { children?: NodeWithChildren[] };
type TestCase = {
  node: NodeWithChildren;
  selector: string;
  expect: number;
};

describe('cdp-helper', () => {
  describe('findBackendNodeId()', () => {
    const testCases: TestCase[] = [
      { node: { localName: 'test', backendNodeId: 1 }, selector: 'test', expect: 1 },
      {
        node: { localName: 'test1', backendNodeId: 1, children: [{ localName: 'test', backendNodeId: 2 }] },
        selector: 'test',
        expect: 2,
      },
      {
        node: {
          localName: 'test1',
          backendNodeId: 1,
          children: [{ localName: 'test2', backendNodeId: 2, children: [{ localName: 'test', backendNodeId: 3 }] }],
        },
        selector: 'test',
        expect: 3,
      },
      {
        node: {
          localName: 'test1',
          backendNodeId: 1,
        },
        selector: 'test',
        expect: undefined,
      },
      {
        node: {
          localName: 'test1',
          backendNodeId: 1,
          children: [{ localName: 'test2', backendNodeId: 2, children: [{ localName: 'test3', backendNodeId: 3 }] }],
        },
        selector: 'test',
        expect: undefined,
      },
    ];

    testCases.forEach((test) => {
      it(`should for ${JSON.stringify(test.node)} and selector "${test.selector}" return "${test.expect}"`, () => {
        expect(findBackendNodeId(test.node as Protocol.DOM.Node, test.selector)).toBe(test.expect);
      });
    });
  });

  describe('generateGUID()', () => {
    it('should generate different GUIDs', () => {
      const id1 = generateGUID();
      const id2 = generateGUID();
      const id3 = generateGUID();
      expect(id1).not.toEqual(id2);
      expect(id1).not.toEqual(id3);
      expect(id2).not.toEqual(id3);
    });
  });

  describe('getBody()', () => {
    it('should put elements in playground divs', () => {
      const getElementsMarkup: GetMarkup = () => '<div>SomeDiv</div><div>SomeDiv</div>';

      const result = `
  <p-headline variant="headline-1">Hovered</p-headline>
  <div class="playground light hovered">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>
  <p-headline variant="headline-1">Focused</p-headline>
  <div class="playground light focused">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>
  <p-headline variant="headline-1">Focused+Hovered</p-headline>
  <div class="playground light focused-hovered">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>`;

      expect(getBodyMarkup(getElementsMarkup)).toBe(result);
    });
  });

  describe('getThemedBody()', () => {
    it('should put elements in themed playground divs', () => {
      const getThemedElementsMarkup: GetThemedMarkup = (theme) =>
        `<div theme="${theme}">SomeDiv</div><div theme="${theme}">SomeDiv</div>`;

      const result = `
  <p-headline variant="headline-1">Hovered</p-headline>
  <div class="playground light hovered">
    <div theme="light">SomeDiv</div><div theme="light">SomeDiv</div>
  </div>
  <div class="playground dark hovered">
    <div theme="dark">SomeDiv</div><div theme="dark">SomeDiv</div>
  </div>
  <p-headline variant="headline-1">Focused</p-headline>
  <div class="playground light focused">
    <div theme="light">SomeDiv</div><div theme="light">SomeDiv</div>
  </div>
  <div class="playground dark focused">
    <div theme="dark">SomeDiv</div><div theme="dark">SomeDiv</div>
  </div>
  <p-headline variant="headline-1">Focused+Hovered</p-headline>
  <div class="playground light focused-hovered">
    <div theme="light">SomeDiv</div><div theme="light">SomeDiv</div>
  </div>
  <div class="playground dark focused-hovered">
    <div theme="dark">SomeDiv</div><div theme="dark">SomeDiv</div>
  </div>`;

      expect(getThemedBodyMarkup(getThemedElementsMarkup)).toBe(result);
    });
  });

  describe('resolveSelector()', () => {
    it('should split string to object with hostElementSelector and shadowRootNodeName', () => {
      expect(resolveSelector('.hydrated p-tabs >>> p-tabs-bar')).toEqual({
        hostElementSelector: '.hydrated p-tabs',
        shadowRootNodeName: 'p-tabs-bar',
      });
    });

    it('should split string to object with hostElementSelector and undefined shadowRootNodeName', () => {
      expect(resolveSelector('#tab-item-0 button')).toEqual({
        hostElementSelector: '#tab-item-0 button',
        shadowRootNodeName: undefined,
      });
    });

    it('should throw error if shadowRootNodeName is not an "Element.localName"', () => {
      let error;
      try {
        resolveSelector('.hydrated p-tabs >>> .tabs-bar');
      } catch (e) {
        error = e.message;
      }
      expect(error).toEqual('">>> .tabs-bar" selector has to be an "Element.localName" in shadow-root');
    });
  });
});
