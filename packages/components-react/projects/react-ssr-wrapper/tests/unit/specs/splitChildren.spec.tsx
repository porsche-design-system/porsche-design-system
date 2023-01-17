import type { ReactNode } from 'react';
import { splitChildren } from '../../../src/splitChildren';
import { createPortal } from 'react-dom';
import { ReactElement } from 'react';

const jsxDivWithSlot = (
  <div slot="heading">
    <h1>Some Heading</h1>
  </div>
);
const jsxInput = <input type="checkbox" name="some-name" />;
const reactPortal = createPortal(jsxInput, document.body);
const jsxFragment = (
  <>
    <button>Some text</button>
  </>
);

describe('splitChildren()', () => {
  it.each<
    [
      ReactNode | undefined,
      {
        children: Exclude<ReactNode, null | undefined>[];
        namedSlotChildren: ReactElement[];
        otherChildren: Exclude<ReactNode, null | undefined>[];
      }
    ]
  >([
    [
      [jsxDivWithSlot, jsxInput, reactPortal, jsxFragment, 'Some text', '', true, false, 1, 0, null, undefined],
      {
        children: [jsxDivWithSlot, jsxInput, reactPortal, jsxFragment, 'Some text', '', true, false, 1, 0],
        namedSlotChildren: [jsxDivWithSlot],
        otherChildren: [jsxInput, reactPortal, jsxFragment, 'Some text', '', true, false, 1, 0],
      },
    ],
    [
      jsxDivWithSlot,
      {
        children: [jsxDivWithSlot],
        namedSlotChildren: [jsxDivWithSlot],
        otherChildren: [],
      },
    ],
    [
      jsxInput,
      {
        children: [jsxInput],
        namedSlotChildren: [],
        otherChildren: [jsxInput],
      },
    ],
    [
      reactPortal,
      {
        children: [reactPortal],
        namedSlotChildren: [],
        otherChildren: [reactPortal],
      },
    ],
    [
      jsxFragment,
      {
        children: [jsxFragment],
        namedSlotChildren: [],
        otherChildren: [jsxFragment],
      },
    ],
    [
      'Some text',
      {
        children: ['Some text'],
        namedSlotChildren: [],
        otherChildren: ['Some text'],
      },
    ],
    [
      true,
      {
        children: [true],
        namedSlotChildren: [],
        otherChildren: [true],
      },
    ],
    [
      1,
      {
        children: [1],
        namedSlotChildren: [],
        otherChildren: [1],
      },
    ],
  ])('should for case %# return correct children, namedSlotChildren and otherChildren', (el, result) => {
    expect(splitChildren(el)).toEqual(result);
  });
});
