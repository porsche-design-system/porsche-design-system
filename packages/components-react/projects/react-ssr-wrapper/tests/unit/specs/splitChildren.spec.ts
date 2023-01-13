import type { ReactElement } from 'react';
import { splitChildren } from '../../../src/splitChildren';

const textEl = 'Some text' as unknown as ReactElement;

const reactEl = {
  type: 'br',
  key: null,
  ref: null,
  props: {},
  _owner: null,
  _store: {},
};

const reactElWithSlot = {
  type: 'span',
  key: null,
  ref: null,
  props: {
    slot: 'heading',
    style: [Object],
    children: 'Some heading',
  },
  _owner: null,
  _store: {},
};

describe('splitChildren()', () => {
  it.each<[ReactElement | ReactElement[] | undefined, ReactElement[]]>([
    [textEl, [textEl]],
    [reactEl, [reactEl]],
    [
      [reactElWithSlot, reactEl],
      [reactElWithSlot, reactEl],
    ],
    [[reactEl, undefined, null], [reactEl]],
    [undefined, []],
  ])('should return correct children', (el, result) => {
    const { children } = splitChildren(el);

    expect(children).toEqual(result);
  });

  it('should return correct otherChildren', () => {
    const { otherChildren } = splitChildren([reactElWithSlot, reactEl, textEl]);

    expect(otherChildren).toEqual([reactEl, textEl]);
  });

  it('should return correct namedSlotChildren', () => {
    const { namedSlotChildren } = splitChildren([reactElWithSlot, reactEl, textEl]);

    expect(namedSlotChildren).toEqual([reactElWithSlot]);
  });
});
