import { describe, expect, it, vi } from 'vitest';
import { Accordion } from './accordion';

const initComponent = (): Accordion => {
  const component = new Accordion();
  component.host = document.createElement('p-accordion');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('summary click', () => {
  it.each([
    [false, true],
    [true, false],
    [undefined, true],
  ])('should emit update toggling open=%s to %s', (open, expected) => {
    const component = initComponent();
    component.open = open;
    const emitSpy = vi.fn();
    component.update = { emit: emitSpy } as any;
    const event = new Event('click', { cancelable: true });

    component['onSummaryClick'](event);

    expect(emitSpy).toHaveBeenCalledWith({ open: expected });
    expect(event.defaultPrevented).toBe(true);
  });

  it('should stop propagation of the click event', () => {
    const component = initComponent();
    component.open = false;
    component.update = { emit: vi.fn() } as any;
    const event = new Event('click', { cancelable: true });
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

    component['onSummaryClick'](event);

    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});
