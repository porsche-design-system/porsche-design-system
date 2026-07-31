import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './pagination';

const initComponent = (): { component: Pagination; emitSpy: ReturnType<typeof vi.fn> } => {
  const component = new Pagination();
  component.host = document.createElement('p-pagination');
  component.host.attachShadow({ mode: 'open' });
  const emitSpy = vi.fn();
  component.update = { emit: emitSpy } as any;
  return { component, emitSpy };
};

describe('page click', () => {
  it('should emit update with new and previous page and set activePage', () => {
    const { component, emitSpy } = initComponent();
    component.activePage = 2;

    component['onClick'](5);

    expect(emitSpy).toHaveBeenCalledWith({ page: 5, previousPage: 2 });
    expect(component.activePage).toBe(5);
  });

  it('should not emit update when the clicked page is already active', () => {
    const { component, emitSpy } = initComponent();
    component.activePage = 3;

    component['onClick'](3);

    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.activePage).toBe(3);
  });
});

describe('keyboard activation', () => {
  it.each([' ', 'Enter', 'Spacebar'])('should activate the page and prevent default on "%s" key', (key) => {
    const { component, emitSpy } = initComponent();
    component.activePage = 1;
    const event = new KeyboardEvent('keydown', { key, cancelable: true });

    component['onKeyDown'](event, 4);

    expect(event.defaultPrevented).toBe(true);
    expect(emitSpy).toHaveBeenCalledWith({ page: 4, previousPage: 1 });
    expect(component.activePage).toBe(4);
  });

  it.each(['Tab', 'ArrowRight', 'Escape', 'a'])('should do nothing on "%s" key', (key) => {
    const { component, emitSpy } = initComponent();
    component.activePage = 1;
    const event = new KeyboardEvent('keydown', { key, cancelable: true });

    component['onKeyDown'](event, 4);

    expect(event.defaultPrevented).toBe(false);
    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.activePage).toBe(1);
  });
});
