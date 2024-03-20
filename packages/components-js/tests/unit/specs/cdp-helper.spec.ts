import type Protocol from 'devtools-protocol';
import { findBackendNodeIds, resolveSelector } from '../../vrt/helpers';

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
      // {
      //   node: {
      //     localName: 'test1',
      //     attributes: ['test', 'node', 'attribute'],
      //     backendNodeId: 1,
      //     children: [{ localName: 'test2', backendNodeId: 2, children: [{ localName: 'test3', backendNodeId: 3 }] }],
      //   },
      //   selector: 'test',
      //   expect: [1],
      // },
      // {
      //   node: {
      //     localName: 'test1',
      //     attributes: ['node', 'attribute'],
      //     backendNodeId: 1,
      //     children: [
      //       {
      //         localName: 'test2',
      //         attributes: ['test', 'attribute'],
      //         backendNodeId: 2,
      //         children: [{ localName: 'test3', attributes: ['test'], backendNodeId: 3 }],
      //       },
      //     ],
      //   },
      //   selector: 'test',
      //   expect: [2],
      // },
    ];

    testCases.forEach((test) => {
      it(`should for ${JSON.stringify(test.node)} and selector "${test.selector}" return "${test.expect}"`, () => {
        expect(findBackendNodeIds(test.node as Protocol.DOM.Node, test.selector)).toEqual(test.expect);
      });
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
        shadowRootNodeName: '.scroll-wrapper',
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
