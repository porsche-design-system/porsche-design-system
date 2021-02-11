import * as functions from '../../../src/utils/dom';
import { CheckboxWrapper } from '../../../src/components/form/checkbox-wrapper/checkbox-wrapper';
import { SelectWrapper } from '../../../src/components/form/select-wrapper/select-wrapper';
import { RadioButtonWrapper } from '../../../src/components/form/radio-button-wrapper/radio-button-wrapper';
import { TextFieldWrapper } from '../../../src/components/form/text-field-wrapper/text-field-wrapper';
import { TextareaWrapper } from '../../../src/components/form/textarea-wrapper/textarea-wrapper';

describe('should call function', () => {
  describe('getHTMLElementAndThrowIfUndefined in', () => {
    const spyOn = () => jest.spyOn(functions, 'getHTMLElementAndThrowIfUndefined');

    it('checkbox-wrapper', () => {
      const checkBoxSpy = spyOn();
      const checkbox = new CheckboxWrapper();
      try {
        checkbox.connectedCallback();
      } catch (e) {}

      expect(checkBoxSpy).toBeCalled();
    });

    it('radio-button-wrapper', () => {
      const radioButtonSpy = spyOn();
      const radioButton = new RadioButtonWrapper();
      try {
        radioButton.connectedCallback();
      } catch (e) {}

      expect(radioButtonSpy).toBeCalled();
    });

    it('select-wrapper', () => {
      const selectWrapperSpy = spyOn();
      const select = new SelectWrapper();
      try {
        select.connectedCallback();
      } catch (e) {}

      expect(selectWrapperSpy).toBeCalled();
    });

    it('text-field-wrapper', () => {
      const textFieldSpy = spyOn();
      const textField = new TextFieldWrapper();
      try {
        textField.connectedCallback();
      } catch (e) {}

      expect(textFieldSpy).toBeCalled();
    });

    it('textarea-wrapper', () => {
      const textareaSpy = spyOn();
      const textarea = new TextareaWrapper();
      try {
        textarea.connectedCallback();
      } catch (e) {}

      expect(textareaSpy).toBeCalled();
    });
  });
});
