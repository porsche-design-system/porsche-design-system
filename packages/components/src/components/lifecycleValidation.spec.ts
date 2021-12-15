import { getComponentMeta, TAG_NAMES } from '@porsche-design-system/shared';
import type { TagName } from '@porsche-design-system/shared';
import * as domUtils from '../utils/dom';
import { SelectWrapper } from './form/select-wrapper/select-wrapper/select-wrapper';
import { TextareaWrapper } from './form/textarea-wrapper/textarea-wrapper';
import { RadioButtonWrapper } from './form/radio-button-wrapper/radio-button-wrapper';
import { CheckboxWrapper } from './form/checkbox-wrapper/checkbox-wrapper';
import { TextFieldWrapper } from './form/text-field-wrapper/text-field-wrapper';

const tagNameToClassMap: { [key in TagName]?: new () => { componentWillLoad: () => void } } = {
  'p-select-wrapper': SelectWrapper,
  'p-textarea-wrapper': TextareaWrapper,
  'p-radio-button-wrapper': RadioButtonWrapper,
  'p-checkbox-wrapper': CheckboxWrapper,
  'p-text-field-wrapper': TextFieldWrapper,
};

it('should match length of tagNames with required child with object key count from tagNameToClassMap', () => {
  expect(TAG_NAMES.filter((tagName) => getComponentMeta(tagName).requiredChild).length).toBe(
    Object.keys(tagNameToClassMap).length
  );
});

it.each<TagName>(TAG_NAMES.filter((tagName) => getComponentMeta(tagName).requiredChild))(
  'should call getHTMLElementAndThrowIfUndefined via componentWillLoad() for %s',
  (tagName) => {
    const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
    const component = new tagNameToClassMap[tagName]();

    try {
      component.componentWillLoad();
    } catch (e) {}

    expect(spy).toBeCalled();
  }
);
