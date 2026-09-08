import { describe, expect, it, vi } from 'vitest';
import { ButtonTile } from './button-tile';

const initComponent = (): ButtonTile => {
  const component = new ButtonTile();
  component.host = document.createElement('p-button-tile');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

describe('click interception', () => {
  it.each([
    { disabled: true, loading: false, stopped: true },
    { disabled: false, loading: true, stopped: true },
    { disabled: true, loading: true, stopped: true },
    { disabled: false, loading: false, stopped: false },
  ])('should set stopped=$stopped when disabled=$disabled and loading=$loading', ({ disabled, loading, stopped }) => {
    const component = initComponent();
    component.disabled = disabled;
    component.loading = loading;
    const event = new MouseEvent('click');
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

    component.onClick(event);

    if (stopped) {
      expect(stopPropagationSpy).toHaveBeenCalled();
    } else {
      expect(stopPropagationSpy).not.toHaveBeenCalled();
    }
  });
});

describe('footer slot detection', () => {
  it('should set hasFooterSlot to true when a footer-slotted child exists', () => {
    const component = initComponent();
    const footer = document.createElement('div');
    footer.setAttribute('slot', 'footer');
    component.host.appendChild(footer);

    component.componentWillLoad();

    expect(component['hasFooterSlot']).toBe(true);
  });

  it('should set hasFooterSlot to false when no footer-slotted child exists', () => {
    const component = initComponent();
    // seeding the opposite value so that the assertion proves the method actively recomputes it
    component['hasFooterSlot'] = true;

    component.componentWillLoad();

    expect(component['hasFooterSlot']).toBe(false);
  });
});
