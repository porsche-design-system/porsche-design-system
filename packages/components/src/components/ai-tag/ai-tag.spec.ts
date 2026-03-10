import { vi } from 'vitest';
import * as attachComponentCssModule from '../../utils/jss';
import { AiTag } from './ai-tag';
import { AI_TAG_ICONS, type AiTagIcon } from './ai-tag-utils';

describe('render', () => {
  it('should call attachComponentCss() with correct parameters', () => {
    const spy = vi.spyOn(attachComponentCssModule, 'attachComponentCss');
    const component = new AiTag();
    component.host = document.createElement('p-ai-tag');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(component.host, expect.any(Function), 'ai-spark', 'light');
  });

  it('should call attachComponentCss() with correct parameters for dark theme', () => {
    const spy = vi.spyOn(attachComponentCssModule, 'attachComponentCss');
    const component = new AiTag();
    component.host = document.createElement('p-ai-tag');
    component.host.attachShadow({ mode: 'open' });
    component.theme = 'dark';

    component.render();

    expect(spy).toHaveBeenCalledWith(component.host, expect.any(Function), 'ai-spark', 'dark');
  });

  it.each<AiTagIcon>(AI_TAG_ICONS.slice() as AiTagIcon[])(
    'should call attachComponentCss() with correct icon: %s',
    (icon) => {
      const spy = vi.spyOn(attachComponentCssModule, 'attachComponentCss');
      const component = new AiTag();
      component.host = document.createElement('p-ai-tag');
      component.host.attachShadow({ mode: 'open' });
      component.icon = icon;

      component.render();

      expect(spy).toHaveBeenCalledWith(component.host, expect.any(Function), icon, 'light');
    }
  );
});
