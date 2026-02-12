import * as stencilCore from '@stencil/core';
import { vi } from 'vitest';
import type { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';
import type { SegmentedControlItemInternalHTMLProps } from '../segmented-control-item/segmented-control-item-utils';
import { getItemWidths, syncSegmentedControlItemsProps, tempDiv, tempIcon, tempLabel } from './segmented-control-utils';

describe('getItemWidths()', () => {
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
    vi.spyOn(window, 'getComputedStyle').mockImplementation(() => {
      const cssStyleDeclaration = new CSSStyleDeclaration();
      // let's take the number of characters to have some variation
      cssStyleDeclaration.width = `${[child1, child2, child3][calls++].innerHTML.length}px`;
      return cssStyleDeclaration;
    });

    expect(getItemWidths(host, false).maxWidth).toBe(17);
  });

  it('should append temporary div', () => {
    const spy = vi.spyOn(host.shadowRoot, 'append');
    vi.spyOn(tempDiv, 'remove').mockImplementationOnce(() => {});
    expect(Array.from(host.shadowRoot.children)).not.toContain(tempDiv);

    getItemWidths(host, false);

    expect(spy).toHaveBeenCalledWith(tempDiv);
    expect(Array.from(host.shadowRoot.children)).toContain(tempDiv);
  });

  it('should remove temporary div', () => {
    const spy = vi.spyOn(tempDiv, 'remove');
    getItemWidths(host, false);

    expect(spy).toHaveBeenCalledWith();
    expect(Array.from(host.shadowRoot.children)).not.toContain(tempDiv);
  });

  it('should use temporary icon element if icon is set', () => {
    const spy = vi.spyOn(tempDiv, 'prepend');

    const child: HTMLElement & SegmentedControlItem = document.createElement('div') as any;
    child.icon = 'truck';
    host.append(child);
    expect(Array.from(tempDiv.children)).not.toContain(tempIcon);

    getItemWidths(host, false);

    expect(spy).toHaveBeenCalledWith(tempIcon);
    expect(Array.from(tempDiv.children)).toContain(tempIcon);
  });

  it('should use temporary icon element if iconSource is set', () => {
    const spy = vi.spyOn(tempDiv, 'prepend');

    const child: HTMLElement & SegmentedControlItem = document.createElement('div') as any;
    child.iconSource = 'truck.svg';
    host.append(child);
    expect(Array.from(tempDiv.children)).not.toContain(tempIcon);

    getItemWidths(host, false);

    expect(spy).toHaveBeenCalledWith(tempIcon);
    expect(Array.from(tempDiv.children)).toContain(tempIcon);
  });

  it('should use temporary label if label is set', () => {
    const spy = vi.spyOn(tempDiv, 'prepend');

    const child: HTMLElement & SegmentedControlItem = document.createElement('div') as any;
    child.label = 'Some label';
    host.append(child);
    expect(Array.from(tempDiv.children)).not.toContain(tempLabel);

    getItemWidths(host, false);

    expect(spy).toHaveBeenCalledWith(tempLabel);
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

describe('syncSegmentedControlItemsProps()', () => {
  const host = document.createElement('p-segmented-control');
  const child1: HTMLElement & SegmentedControlItem & SegmentedControlItemInternalHTMLProps = document.createElement(
    'div'
  ) as any;
  const child2: HTMLElement & SegmentedControlItem & SegmentedControlItemInternalHTMLProps = document.createElement(
    'div'
  ) as any;
  host.append(child1, child2);

  const value = 'a';
  const disabled = true;
  const state = 'none';
  const message = 'Some message';
  const compact = true;

  it('should set selected property on every item', () => {
    child1.value = 'a';
    child2.value = 'b';

    expect(child1.selected).toBeUndefined();
    expect(child1.state).toBeUndefined();
    expect(child1.message).toBeUndefined();

    expect(child2.selected).toBeUndefined();
    expect(child2.state).toBeUndefined();
    expect(child2.message).toBeUndefined();

    syncSegmentedControlItemsProps(host, value, disabled, state, message, compact);

    expect(child1.selected).toBe(true);
    expect(child1.state).toBe('none');
    expect(child1.message).toBe('Some message');

    expect(child2.selected).toBe(false);
    expect(child2.state).toBe('none');
    expect(child2.message).toBe('Some message');
  });

  it('should call forceUpdate() on every item', () => {
    const spy = vi.spyOn(stencilCore, 'forceUpdate');

    syncSegmentedControlItemsProps(host, value, disabled, state, message, compact);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toEqual(child1); // toHaveBeenNthCalledWith doesn't work
    expect(spy.mock.calls[1][0]).toEqual(child2);
  });
});
