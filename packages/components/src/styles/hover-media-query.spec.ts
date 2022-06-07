import { hoverMediaQuery, hoverMediaQueryExp } from './hover-media-query';
import type { TagName } from '@porsche-design-system/shared';
import { TAG_NAMES_CONSTRUCTOR_MAP, tagNamesWithJss } from '../components/lifecycleValidation.spec';
//
// jest.mock('../../../utils/dom');
// jest.mock('../../../utils/slotted-styles');
// jest.mock('./hover-media-query');

describe('hoverValidator()', () => {
  // it('should match the snapshot', () => {
  //   expect(hoverMediaQuery({ '&:hover, &:focus': { color: 'd5001c', background: 'currentColor' } })).toMatchSnapshot();
  // });

  it.each<TagName>(tagNamesWithJss)('should wrap "@media (hover: hover)" around all hover-styles for %s', (tagName) => {
    const component = new TAG_NAMES_CONSTRUCTOR_MAP[tagName]();
    component.host = document.createElement(tagName);
    component.host.attachShadow({ mode: 'open' });

    // const styleSpy = jest.spyOn(component.host.innerHTML, 'getComponentCss');

    try {
      component.connectedCallback();
    } catch (e) {}

    try {
      component.componentWillRender();
    } catch (e) {}

    const getInnerHtml = component.host.innerHTML;
    const regExp = new RegExp('{([^}]*)}', 'g');

    const allHoverStyles = [...getInnerHtml.matchAll(regExp)];
    allHoverStyles.forEach((style) => {
      if (style[0].includes(':hover')) {
        expect(getInnerHtml.substring(style.index - hoverMediaQueryExp.length - 1, style.index - 1)).toMatch(
          hoverMediaQueryExp
        );
      }
    });
  });
});
