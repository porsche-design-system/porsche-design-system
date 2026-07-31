import { describe, expect, it, vi } from 'vitest';
import * as supportsNativePopoverUtils from '../../../utils/supportsNativePopover';
import { ToastItem } from './toast-item';

const initComponent = (): ToastItem => {
  const component = new ToastItem();
  component.host = document.createElement('p-toast-item');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('root node validation', () => {
  it('should throw when not rendered inside p-toast', () => {
    const component = initComponent();

    expect(() => component.connectedCallback()).toThrow();
  });

  it('should not throw when rendered inside the shadow DOM of p-toast', () => {
    const component = initComponent();
    const toast = document.createElement('p-toast');
    toast.attachShadow({ mode: 'open' });
    toast.shadowRoot?.appendChild(component.host);

    expect(() => component.connectedCallback()).not.toThrow();
  });
});

describe('native popover', () => {
  it('should show the popover after render when the native Popover API is supported', () => {
    const component = initComponent();
    component.host.showPopover = vi.fn();
    vi.spyOn(supportsNativePopoverUtils, 'getHasNativePopoverSupport').mockReturnValue(true);

    component.componentDidRender();

    expect(component.host.showPopover).toHaveBeenCalledTimes(1);
  });

  it('should not show the popover when the native Popover API is unsupported', () => {
    const component = initComponent();
    component.host.showPopover = vi.fn();
    vi.spyOn(supportsNativePopoverUtils, 'getHasNativePopoverSupport').mockReturnValue(false);

    component.componentDidRender();

    expect(component.host.showPopover).not.toHaveBeenCalled();
  });
});
