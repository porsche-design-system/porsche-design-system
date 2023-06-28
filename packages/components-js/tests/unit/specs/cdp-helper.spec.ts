import type Protocol from 'devtools-protocol';
import type { GetMarkup, GetThemedMarkup } from '../../vrt/puppeteer/helpers';
import {
  findBackendNodeIds,
  generateGUID,
  getBodyMarkup,
  getThemedBodyMarkup,
  resolveSelector,
} from '../../vrt/puppeteer/helpers';

type Node = Pick<Protocol.DOM.Node, 'localName' | 'backendNodeId' | 'attributes'>;
type NodeWithChildren = Node & { children?: NodeWithChildren[] };
type TestCase = {
  node: NodeWithChildren;
  selector: string;
  expect?: number[];
};

describe('cdp-helper', () => {
  describe('findBackendNodeIds()', () => {
    const testCases: TestCase[] = [
      { node: { localName: 'test', backendNodeId: 1 }, selector: 'test', expect: [1] },
      {
        node: { localName: 'test1', backendNodeId: 1, children: [{ localName: 'test', backendNodeId: 2 }] },
        selector: 'test',
        expect: [2],
      },
      {
        node: {
          localName: 'test1',
          backendNodeId: 1,
          children: [{ localName: 'test2', backendNodeId: 2, children: [{ localName: 'test', backendNodeId: 3 }] }],
        },
        selector: 'test',
        expect: [3],
      },
      {
        node: {
          localName: 'test1',
          backendNodeId: 1,
        },
        selector: 'test',
        expect: [],
      },
      {
        node: {
          localName: 'test1',
          backendNodeId: 1,
          children: [{ localName: 'test2', backendNodeId: 2, children: [{ localName: 'test3', backendNodeId: 3 }] }],
        },
        selector: 'test',
        expect: [],
      },
      {
        node: {
          localName: 'test1',
          attributes: ['test', 'node', 'attribute'],
          backendNodeId: 1,
          children: [{ localName: 'test2', backendNodeId: 2, children: [{ localName: 'test3', backendNodeId: 3 }] }],
        },
        selector: 'test',
        expect: [1],
      },
      {
        node: {
          localName: 'test1',
          attributes: ['node', 'attribute'],
          backendNodeId: 1,
          children: [
            {
              localName: 'test2',
              attributes: ['test', 'attribute'],
              backendNodeId: 2,
              children: [{ localName: 'test3', attributes: ['test'], backendNodeId: 3 }],
            },
          ],
        },
        selector: 'test',
        expect: [2],
      },
    ];

    testCases.forEach((test) => {
      it(`should for ${JSON.stringify(test.node)} and selector "${test.selector}" return "${test.expect}"`, () => {
        expect(findBackendNodeIds(test.node as Protocol.DOM.Node, test.selector)).toEqual(test.expect);
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

      const result = `<div class="playground light hover">
  <div>SomeDiv</div><div>SomeDiv</div>
</div>
<div class="playground light focus">
  <div>SomeDiv</div><div>SomeDiv</div>
</div>
<div class="playground light focus-hover">
  <div>SomeDiv</div><div>SomeDiv</div>
</div>`;

      expect(getBodyMarkup(getElementsMarkup)).toBe(result);
    });
  });

  describe('getThemedBodyMarkup()', () => {
    it('should put elements in default themed playground divs', () => {
      const getThemedElementsMarkup: GetThemedMarkup = (theme) =>
        `<p-button theme="${theme}">Some Button</p-button><p-button theme="${theme}">Some Button</p-button>`;

      expect(getThemedBodyMarkup(getThemedElementsMarkup)).toMatchSnapshot();
    });

    it('should put elements in individual themed playground divs', () => {
      const getThemedElementsMarkup: GetThemedMarkup = (theme) =>
        `<p-button theme="${theme}">Some Button</p-button><p-button theme="${theme}">Some Button</p-button>`;

      expect(getThemedBodyMarkup(getThemedElementsMarkup)).toMatchSnapshot();
    });
  });

  describe('resolveSelector()', () => {
    it('should split string to object with hostElementSelector and shadowRootNodeName', () => {
      expect(resolveSelector('.hover > p-button-pure >>> button')).toEqual({
        hostElementSelector: '.hover > p-button-pure',
        shadowRootNodeName: 'button',
      });
    });

    it('should support classes in shadow root and split string to object with hostElementSelector and shadowRootNodeName', () => {
      expect(resolveSelector('.focus p-scroller >>> .scroll-wrapper')).toEqual({
        hostElementSelector: '.focus p-scroller',
        shadowRootNodeName: 'scroll-wrapper',
      });
    });

    it('should split string to object with hostElementSelector and undefined shadowRootNodeName', () => {
      expect(resolveSelector('.hover > p-checkbox-wrapper input[type="checkbox"]')).toEqual({
        hostElementSelector: '.hover > p-checkbox-wrapper input[type="checkbox"]',
        shadowRootNodeName: undefined,
      });
    });
  });
});
