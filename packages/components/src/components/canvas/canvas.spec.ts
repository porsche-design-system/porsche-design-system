import { describe, expect, it, vi } from 'vitest';
import { Canvas } from './canvas';

const initComponent = (): Canvas => {
  const component = new Canvas();
  component.host = document.createElement('p-canvas');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('sidebar start toggle', () => {
  it.each([
    [false, true],
    [true, false],
  ])('should emit sidebarStartUpdate toggling open=%s to %s', (sidebarStartOpen, expected) => {
    const component = initComponent();
    component.sidebarStartOpen = sidebarStartOpen;
    const emitSpy = vi.fn();
    component.sidebarStartUpdate = { emit: emitSpy } as any;

    component['toggleSidebarStart']();

    expect(emitSpy).toHaveBeenCalledWith({ open: expected });
  });
});

describe('sidebar end dismiss', () => {
  it('should emit sidebarEndDismiss without payload', () => {
    const component = initComponent();
    const emitSpy = vi.fn();
    component.sidebarEndDismiss = { emit: emitSpy } as any;

    component['onDismissSidebarEnd']();

    expect(emitSpy).toHaveBeenCalledWith();
  });
});
