import Protocol from 'devtools-protocol';
import { findBackendNodeId } from '../../e2e/helpers/cdp-helper';

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
});
