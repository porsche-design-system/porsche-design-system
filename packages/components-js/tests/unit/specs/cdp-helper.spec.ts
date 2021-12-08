import Protocol from 'devtools-protocol';
import {
  findBackendNodeIds,
  generateGUID,
  getBodyMarkup,
  GetMarkup,
  getThemedBodyMarkup,
  GetThemedMarkup,
  resolveSelector,
} from '../../vrt/helpers/cdp-helper';

type Node = Pick<Protocol.DOM.Node, 'localName' | 'backendNodeId'>;
type NodeWithChildren = Node & { children?: NodeWithChildren[] };
type TestCase = {
  node: NodeWithChildren;
  selector: string;
  expect: number[];
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
        expect: undefined,
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

      const result = `
  <div class="playground light hovered">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>
  <div class="playground light focused">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>
  <div class="playground light focused-hovered">
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

      expect(
        getThemedBodyMarkup(getThemedElementsMarkup, { theme: ['light', 'dark', 'light-electric'] })
      ).toMatchSnapshot();
    });
  });

  describe('resolveSelector()', () => {
    it('should split string to object with hostElementSelector and shadowRootNodeName', () => {
      expect(resolveSelector('.hovered > p-button-pure >>> button')).toEqual({
        hostElementSelector: '.hovered > p-button-pure',
        shadowRootNodeName: 'button',
      });
    });

    it('should split string to object with hostElementSelector and undefined shadowRootNodeName', () => {
      expect(resolveSelector('.hovered > p-checkbox-wrapper input[type="checkbox"]')).toEqual({
        hostElementSelector: '.hovered > p-checkbox-wrapper input[type="checkbox"]',
        shadowRootNodeName: undefined,
      });
    });

    it('should throw error if shadowRootNodeName is not an "Element.localName"', () => {
      expect(() => resolveSelector('.hovered > p-checkbox-wrapper >>> .tabs-bar')).toThrowErrorMatchingInlineSnapshot(
        '"\\">>> .tabs-bar\\" selector has to be an \\"Element.localName\\" in shadow-root"'
      );
    });
  });
});
