import { describe, expect, it } from 'vitest';
import { LinkTile } from './link-tile';

const initComponent = (): LinkTile => {
  const component = new LinkTile();
  component.host = document.createElement('p-link-tile');
  component.host.attachShadow({ mode: 'open' });
  return component;
};

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
