import type { ReactNode } from 'react';
import { splitChildren } from '../../../src/splitChildren';
import { createPortal } from 'react-dom';
import { ReactElement } from 'react';

const jsxElWithSlot = (
  <div slot="heading">
    <h1>Some Heading</h1>
  </div>
);
const jsxEl = <input type="checkbox" name="some-name" />;
const reactPortalEl = createPortal(jsxEl, document.body);
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
      [jsxElWithSlot, jsxEl, reactPortalEl, jsxFragment, 'Some text', '', true, false, 1, 0, null, undefined],
      {
        children: [jsxElWithSlot, jsxEl, reactPortalEl, jsxFragment, 'Some text', '', true, false, 1, 0],
        namedSlotChildren: [jsxElWithSlot],
        otherChildren: [jsxEl, reactPortalEl, jsxFragment, 'Some text', '', true, false, 1, 0],
      },
    ],
    [
      jsxElWithSlot,
      {
        children: [jsxElWithSlot],
        namedSlotChildren: [jsxElWithSlot],
        otherChildren: [],
      },
    ],
    [
      jsxEl,
      {
        children: [jsxEl],
        namedSlotChildren: [],
        otherChildren: [jsxEl],
      },
    ],
    [
      reactPortalEl,
      {
        children: [reactPortalEl],
        namedSlotChildren: [],
        otherChildren: [reactPortalEl],
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
