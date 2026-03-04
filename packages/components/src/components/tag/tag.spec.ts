import { vi } from 'vitest';
import * as getDirectChildHTMLElementUtils from '../../utils/dom/getDirectChildHTMLElement';
import * as attachComponentCssModule from '../../utils/jss';
import * as warnIfDeprecatedPropValueIsUsed from '../../utils/log/warnIfDeprecatedPropValueIsUsed';
import { Tag } from './tag';
import { type TagVariant, VARIANT_TO_COLOR_MAP } from './tag-utils';

describe('render', () => {
  it('should call getDirectChildHTMLElement() with correct parameters', () => {
    const spy = vi.spyOn(getDirectChildHTMLElementUtils, 'getDirectChildHTMLElement');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(component.host, 'a,button');
  });

  it('should call warnIfDeprecatedPropValueIsUsed() with correct parameters', () => {
    const spy = vi.spyOn(warnIfDeprecatedPropValueIsUsed, 'warnIfDeprecatedPropValueIsUsed');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(component, 'color', {
      'background-default': 'background-base',
      'neutral-contrast-high': 'primary',
      'notification-neutral': 'notification-info-soft',
      'notification-warning': 'notification-warning-soft',
      'notification-success': 'notification-success-soft',
      'notification-error': 'notification-error-soft',
    });
  });

  it.each<TagVariant>(['primary', 'secondary', 'info', 'warning', 'success', 'error'])(
    'should pass resolved color for variant: %s to attachComponentCss',
    (variant) => {
      const spy = vi.spyOn(attachComponentCssModule, 'attachComponentCss');
      const component = new Tag();
      component.host = document.createElement('p-tag');
      component.host.attachShadow({ mode: 'open' });
      component.variant = variant;

      component.render();

      const expectedColor = VARIANT_TO_COLOR_MAP[variant];
      expect(spy).toHaveBeenCalledWith(
        component.host,
        expect.any(Function),
        expectedColor,
        false,
        false,
        false,
        'light'
      );
    }
  );

  it('should use variant over color when both are set', () => {
    const spy = vi.spyOn(attachComponentCssModule, 'attachComponentCss');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.host.attachShadow({ mode: 'open' });
    component.color = 'primary';
    component.variant = 'error';

    component.render();

    expect(spy).toHaveBeenCalledWith(
      component.host,
      expect.any(Function),
      'notification-error-soft',
      false,
      false,
      false,
      'light'
    );
  });

  it('should fall back to color prop when variant is not set', () => {
    const spy = vi.spyOn(attachComponentCssModule, 'attachComponentCss');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(
      component.host,
      expect.any(Function),
      'background-surface',
      false,
      false,
      false,
      'light'
    );
  });
});
