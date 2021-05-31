import Protocol from 'devtools-protocol';
import { findBackendNodeId, generateGUID, getBody, getThemedBody } from '../../e2e/helpers/cdp-helper';

type Node = Pick<Protocol.DOM.Node, 'localName' | 'backendNodeId'>;
type NodeWithChildren = Node & { children?: NodeWithChildren[] };
type TestCase = {
  node: NodeWithChildren;
  selector: string;
  expect: number;
};

describe('cdp-helper', () => {
  const getElements = (): string => '<div>SomeDiv</div><div>SomeDiv</div>';

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
      const result = `
  <div class="playground light hovered">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>
  <div class="playground light focused">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>
  <div class="playground focused-hovered">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>`;

      expect(getBody(getElements)).toBe(result);
    });
  });

  describe('getThemedBody()', () => {
    it('should put elements in themed playground divs', () => {
      const result = `
  <div class="playground light hovered">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>
  <div class="playground dark hovered">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>
  <div class="playground light focused">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>
  <div class="playground dark focused">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>
  <div class="playground light focused-hovered">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>
  <div class="playground dark focused-hovered">
    <div>SomeDiv</div><div>SomeDiv</div>
  </div>`;

      expect(getThemedBody(getElements)).toBe(result);
    });
  });
});
