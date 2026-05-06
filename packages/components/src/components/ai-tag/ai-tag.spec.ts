import { vi } from 'vitest';
import * as attachComponentCssModule from '../../utils/jss';
import { AiTag } from './ai-tag';

describe('render', () => {
  it('should call attachComponentCss() with correct parameters', () => {
    const spy = vi.spyOn(attachComponentCssModule, 'attachComponentCss');
    const component = new AiTag();
    component.host = document.createElement('p-ai-tag');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(component.host, expect.any(Function));
  });

  it('should call attachComponentCss() with correct parameters for dark theme', () => {
    const spy = vi.spyOn(attachComponentCssModule, 'attachComponentCss');
    const component = new AiTag();
    component.host = document.createElement('p-ai-tag');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(component.host, expect.any(Function));
  });
});
