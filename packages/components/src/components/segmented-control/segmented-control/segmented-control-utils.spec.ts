import {
  getClickedSegmentedControlItem,
  getItemMaxWidth,
  getKeydownedSegmentedControlItem,
  SegmentedControlBackgroundColor,
  syncItemsProps,
  tempDiv,
  tempIcon,
  tempLabel,
} from './segmented-control-utils';
import type { Theme } from '../../../types';
import type { SegmentedControlItemInternalHTMLProps } from '../segmented-control-item/segmented-control-item-utils';
import { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';
import * as stencilCore from '@stencil/core';

describe('getItemMaxWidth()', () => {
  const host = document.createElement('p-segmented-control');
  host.attachShadow({ mode: 'open' });

  beforeEach(() => {
    host.innerHTML = '';
    tempDiv.innerHTML = '';
  });

  it('should return width of widest element', () => {
    const child1 = document.createElement('span');
    child1.innerHTML = 'Child 1';
    const child2 = document.createElement('span');
    child2.innerHTML = 'Child 2 is longer';
    const child3 = document.createElement('span');
    child3.innerHTML = 'Child 3 yes';

    host.append(child1, child2, child3);

    let calls = 0;
    // mocked getComputedStyle() since it isn't working in jsdom
    jest.spyOn(window, 'getComputedStyle').mockImplementation(() => {
      const cssStyleDeclaration = new CSSStyleDeclaration();
      // let's take the amount of characters to have some variation
      cssStyleDeclaration.width = `${[child1, child2, child3][calls++].innerHTML.length}px`;
      return cssStyleDeclaration;
    });

    expect(getItemMaxWidth(host)).toBe(17);
  });

  it('should append temporary div', () => {
    const spy = jest.spyOn(host.shadowRoot, 'append');
    jest.spyOn(tempDiv, 'remove').mockImplementationOnce(() => {});
    expect(Array.from(host.shadowRoot.children)).not.toContain(tempDiv);

    getItemMaxWidth(host);

    expect(spy).toBeCalledWith(tempDiv);
    expect(Array.from(host.shadowRoot.children)).toContain(tempDiv);
  });

  it('should remove temporary div', () => {
    const spy = jest.spyOn(tempDiv, 'remove');
    getItemMaxWidth(host);

    expect(spy).toBeCalledWith();
    expect(Array.from(host.shadowRoot.children)).not.toContain(tempDiv);
  });

  it('should use temporary icon element if icon is set', () => {
    const spy = jest.spyOn(tempDiv, 'prepend');

    const child: HTMLElement & SegmentedControlItem = document.createElement('div') as any;
    child.icon = 'truck';
    host.append(child);
    expect(Array.from(tempDiv.children)).not.toContain(tempIcon);

    getItemMaxWidth(host);

    expect(spy).toBeCalledWith(tempIcon);
    expect(Array.from(tempDiv.children)).toContain(tempIcon);
  });

  it('should use temporary icon element if iconSource is set', () => {
    const spy = jest.spyOn(tempDiv, 'prepend');

    const child: HTMLElement & SegmentedControlItem = document.createElement('div') as any;
    child.iconSource = 'truck.svg';
    host.append(child);
    expect(Array.from(tempDiv.children)).not.toContain(tempIcon);

    getItemMaxWidth(host);

    expect(spy).toBeCalledWith(tempIcon);
    expect(Array.from(tempDiv.children)).toContain(tempIcon);
  });

  it('should use temporary label if label is set', () => {
    const spy = jest.spyOn(tempDiv, 'prepend');

    const child: HTMLElement & SegmentedControlItem = document.createElement('div') as any;
    child.label = 'Some label';
    host.append(child);
    expect(Array.from(tempDiv.children)).not.toContain(tempLabel);

    getItemMaxWidth(host);

    expect(spy).toBeCalledWith(tempLabel);
    expect(Array.from(tempDiv.children)).toContain(tempLabel);
  });

  describe('styles of temporary elements', () => {
    it('should have correct style for tempDiv', () => {
      expect(tempDiv.style).toMatchSnapshot();
    });

    it('should have correct style for tempLabel', () => {
      expect(tempLabel.style).toMatchSnapshot();
    });

    it('should have correct style for tempIcon', () => {
      expect(tempIcon.style).toMatchSnapshot();
    });
  });
});

describe('syncItemsProps()', () => {
  const host = document.createElement('p-segmented-control');
  const child1: HTMLElement & SegmentedControlItem & SegmentedControlItemInternalHTMLProps = document.createElement(
    'div'
  ) as any;
  const child2: HTMLElement & SegmentedControlItem & SegmentedControlItemInternalHTMLProps = document.createElement(
    'div'
  ) as any;
  host.append(child1, child2);

  const value = 'a';
  const backgroundColor: SegmentedControlBackgroundColor = 'background-surface';
  const theme: Theme = 'light';

  it('should set selected, backgroundColor and theme property on every item', () => {
    child1.value = 'a';
    child2.value = 'b';

    expect(child1.selected).toBeUndefined();
    expect(child1.backgroundColor).toBeUndefined();
    expect(child1.theme).toBeUndefined();

    expect(child2.selected).toBeUndefined();
    expect(child2.backgroundColor).toBeUndefined();
    expect(child2.theme).toBeUndefined();

    syncItemsProps(host, value, backgroundColor, theme);

    expect(child1.selected).toBe(true);
    expect(child1.backgroundColor).toBe(backgroundColor);
    expect(child1.theme).toBe(theme);

    expect(child2.selected).toBe(false);
    expect(child2.backgroundColor).toBe(backgroundColor);
    expect(child2.theme).toBe(theme);
  });

  it('should call forceUpdate() on every item', () => {
    const spy = jest.spyOn(stencilCore, 'forceUpdate');

    syncItemsProps(host, value, backgroundColor, theme);

    expect(spy).toBeCalledTimes(2);
    expect(spy.mock.calls[0][0]).toEqual(child1); // toHaveBeenNthCalledWith doesn't work
    expect(spy.mock.calls[1][0]).toEqual(child2);
  });
});

describe('getClickedSegmentedControlItem()', () => {
  const host = document.createElement('p-segmented-control');
  const prefixedHost = document.createElement('some-prefix-p-segmented-control');
  const div = document.createElement('div');
  const span = document.createElement('span');
  const slot = document.createElement('slot');
  const p = document.createElement('p');

  it('should return undefined if no p-segmented-control-item is found', () => {
    expect(getClickedSegmentedControlItem(host, [host])).toBeUndefined();
    expect(getClickedSegmentedControlItem(host, [div, span, slot, p])).toBeUndefined();
  });

  it('should return p-segmented-control-item if it is found', () => {
    const segmentedControlItem = document.createElement('p-segmented-control-item');
    expect(getClickedSegmentedControlItem(host, [div, span, segmentedControlItem, slot, p])).toBe(segmentedControlItem);
  });

  it('should return prefixed p-segmented-control-item if it is found', () => {
    const prefixedSegmentedControlItem = document.createElement('some-prefix-p-segmented-control-item');
    expect(getClickedSegmentedControlItem(prefixedHost, [div, span, prefixedSegmentedControlItem, slot, p])).toBe(
      prefixedSegmentedControlItem
    );
  });
});

describe('getKeydownedSegmentedControlItem()', () => {
  const createKeydownEvent = (key: string): KeyboardEvent => new KeyboardEvent('keydown', { key });

  const createSegmentedControlItem = (opts: {
    value: string;
    // isDisabled?: boolean;
  }): HTMLElement & SegmentedControlItem => {
    const item = document.createElement('p-segmented-control-item') as unknown as HTMLElement & SegmentedControlItem;
    item.id = opts.value;
    item.value = opts.value;
    // item.disabled = opts.isDisabled;
    return item;
  };

  const children = ['a', 'b', 'c'].map((value) => createSegmentedControlItem({ value }));
  const [child1, child2, child3] = children;
  const host = document.createElement('div');
  host.append(...children);
  const childrenCollection = host.children;

  const singleChildHost = document.createElement('div');
  singleChildHost.append(child1.cloneNode());
  const singleChildCollection = singleChildHost.children;

  beforeEach(() => {
    child2.disabled = undefined;
  });

  it('should return undefined for random keys', () => {
    ['a', 'A', 'Enter', 'Escape', 'ArrowUp', 'Up', 'ArrowDown', 'Down', 'Shift', ' '].forEach((key) => {
      const result = getKeydownedSegmentedControlItem(createKeydownEvent(key), 'a', childrenCollection);
      expect(result).toBeUndefined();
    });
  });

  it('should return element on ArrowLeft, Left, ArrowRight and Right key', () => {
    ['ArrowLeft', 'Left', 'ArrowRight', 'Right'].forEach((key) => {
      const result = getKeydownedSegmentedControlItem(createKeydownEvent(key), 'a', childrenCollection);
      expect(children).toContain(result);
    });
  });

  describe('on ArrowLeft keydown', () => {
    const event = createKeydownEvent('ArrowLeft');

    it('should return item before selected item', () => {
      const result = getKeydownedSegmentedControlItem(event, 'b', childrenCollection);
      expect(result).toEqual(child1);
    });

    it('should return item before selected item and skip disabled item', () => {
      child2.disabled = true;
      const result = getKeydownedSegmentedControlItem(event, 'c', childrenCollection);
      expect(result).toEqual(child1);
    });

    it('should return last item if selected item is first', () => {
      const result = getKeydownedSegmentedControlItem(event, 'a', childrenCollection);
      expect(result).toEqual(child3);
    });

    it('should return same item for single item', () => {
      const result1 = getKeydownedSegmentedControlItem(event, 'a', singleChildCollection);
      expect(result1).toEqual(child1);
      const result2 = getKeydownedSegmentedControlItem(event, 'a', singleChildCollection);
      expect(result2).toEqual(child1);
    });
  });

  describe('on ArrowRight keydown', () => {
    const event = createKeydownEvent('ArrowRight');

    it('should return item after selected item', () => {
      const result = getKeydownedSegmentedControlItem(event, 'b', childrenCollection);
      expect(result).toEqual(child3);
    });

    it('should return item after selected item and skip disabled item', () => {
      child2.disabled = true;
      const result = getKeydownedSegmentedControlItem(event, 'a', childrenCollection);
      expect(result).toEqual(child3);
    });

    it('should return first item if selected item is last', () => {
      const result = getKeydownedSegmentedControlItem(event, 'c', childrenCollection);
      expect(result).toEqual(child1);
    });

    it('should return same item for single item', () => {
      const result1 = getKeydownedSegmentedControlItem(event, 'a', singleChildCollection);
      expect(result1).toEqual(child1);
      const result2 = getKeydownedSegmentedControlItem(event, 'a', singleChildCollection);
      expect(result2).toEqual(child1);
    });
  });
});
