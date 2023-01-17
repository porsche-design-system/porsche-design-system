import type { ReactElement, ReactNode } from 'react';
import { splitChildren } from '../../../src/splitChildren';
import { createPortal } from 'react-dom';

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
  it.each<[Parameters<typeof splitChildren>, ReturnType<typeof splitChildren>]>([
    [
      [[jsxDivWithSlot, jsxInput, reactPortal, jsxFragment, 'Some text', '', true, false, 1, 0, null, undefined]],
      {
        children: [jsxDivWithSlot, jsxInput, reactPortal, jsxFragment, 'Some text', '', true, false, 1, 0],
        namedSlotChildren: [jsxDivWithSlot],
        otherChildren: [jsxInput, reactPortal, jsxFragment, 'Some text', '', true, false, 1, 0],
      },
    ],
    [
      [
        <>
          {jsxDivWithSlot}
          {jsxInput}
          {reactPortal}
          {'Some text'}
          {''}
          {true}
          {false}
          {1}
          {0}
          {null}
          {undefined}
        </>,
      ],
      {
        children: [jsxDivWithSlot, jsxInput, reactPortal, 'Some text', '', true, false, 1, 0],
        namedSlotChildren: [jsxDivWithSlot],
        otherChildren: [jsxInput, reactPortal, 'Some text', '', true, false, 1, 0],
      },
    ],
    [
      [jsxDivWithSlot],
      {
        children: [jsxDivWithSlot],
        namedSlotChildren: [jsxDivWithSlot],
        otherChildren: [],
      },
    ],
    [
      [jsxInput],
      {
        children: [jsxInput],
        namedSlotChildren: [],
        otherChildren: [jsxInput],
      },
    ],
    [
      [reactPortal],
      {
        children: [reactPortal],
        namedSlotChildren: [],
        otherChildren: [reactPortal],
      },
    ],
    [
      [jsxFragment],
      {
        children: [jsxFragment.props.children],
        namedSlotChildren: [],
        otherChildren: [jsxFragment.props.children],
      },
    ],
    [
      ['Some text'],
      {
        children: ['Some text'],
        namedSlotChildren: [],
        otherChildren: ['Some text'],
      },
    ],
    [
      [true],
      {
        children: [true],
        namedSlotChildren: [],
        otherChildren: [true],
      },
    ],
    [
      [1],
      {
        children: [1],
        namedSlotChildren: [],
        otherChildren: [1],
      },
    ],
  ])('should for case %# return correct children, namedSlotChildren and otherChildren', (args, result) => {
    expect(splitChildren(...args)).toEqual(result);
  });
});
