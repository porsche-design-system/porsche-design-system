import * as textareaUtils from './textarea-utils';
import * as setAttributesUtils from '../../utils/dom/setAttributes';
import * as setAttributeUtils from '../../utils/dom/setAttribute';
import { AutoFillType, initNativeTextarea, syncNativeTextarea, TextareaWrapType } from './textarea-utils';

describe('initNativeTextarea', () => {
  it('should return native textarea with added attributes and add native textarea to host', () => {
    const spy = jest.spyOn(setAttributesUtils, 'setAttributes');
    const syncNativeTextareaSpy = jest.spyOn(textareaUtils, 'syncNativeTextarea');

    const host = document.createElement('p-textarea');
    const name = 'options';
    const disabled = true;
    const required = false;
    const placeholder = 'placeholder';
    const maxLength = 10;
    const minLength = 3;
    const readOnly = false;
    const autoFocus = false;
    const spellCheck = false;
    const autoComplete: AutoFillType = 'off';
    const wrap: TextareaWrapType = 'off';
    const value = 'dummy';
    const dirName = 'comment-direction';

    const nativeTextarea = initNativeTextarea(
      host,
      name,
      disabled,
      required,
      placeholder,
      maxLength,
      minLength,
      readOnly,
      autoFocus,
      spellCheck,
      autoComplete,
      wrap,
      value,
      dirName
    );

    expect(nativeTextarea instanceof HTMLTextAreaElement).toBe(true);
    expect(spy).toHaveBeenCalledWith(nativeTextarea, {
      'aria-hidden': 'true',
      tabindex: '-1',
      slot: 'internal-textarea',
    });
    expect(syncNativeTextareaSpy).toHaveBeenCalledWith(
      nativeTextarea,
      name,
      disabled,
      required,
      placeholder,
      maxLength,
      minLength,
      readOnly,
      autoFocus,
      spellCheck,
      autoComplete,
      wrap,
      value,
      dirName
    );
    expect(host.firstChild).toBe(nativeTextarea);
  });
});

describe('syncNativeTextarea', () => {
  it('should synchronize attributes of native textarea element', () => {
    const setAttributeSpy = jest.spyOn(setAttributeUtils, 'setAttribute');

    const nativeTextarea = document.createElement('textarea');
    const toggleAttributeSpy = jest.spyOn(nativeTextarea, 'toggleAttribute');
    const name = 'testSelect';
    const disabled = true;
    const required = false;
    const placeholder = 'placeholder';
    const maxLength = 10;
    const minLength = 3;
    const readOnly = false;
    const autoFocus = false;
    const spellCheck = false;
    const autoComplete: AutoFillType = 'off';
    const wrap: TextareaWrapType = 'off';
    const value = 'dummy';
    const dirName = 'comment-direction';

    syncNativeTextarea(
      nativeTextarea,
      name,
      disabled,
      required,
      placeholder,
      maxLength,
      minLength,
      readOnly,
      autoFocus,
      spellCheck,
      autoComplete,
      wrap,
      value,
      dirName
    );

    expect(setAttributeSpy).toHaveBeenCalledWith(nativeTextarea, 'name', name);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('disabled', true);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('required', false);
    expect(setAttributeSpy).toHaveBeenCalledWith(nativeTextarea, 'placeholder', 'placeholder');
    expect(setAttributeSpy).toHaveBeenCalledWith(nativeTextarea, 'maxlength', '10');
    expect(setAttributeSpy).toHaveBeenCalledWith(nativeTextarea, 'minlength', '3');
    expect(toggleAttributeSpy).toHaveBeenCalledWith('readonly', false);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('autofocus', false);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('spellcheck', false);
    expect(setAttributeSpy).toHaveBeenCalledWith(nativeTextarea, 'autocomplete', 'off');
    expect(setAttributeSpy).toHaveBeenCalledWith(nativeTextarea, 'wrap', 'off');
    expect(setAttributeSpy).toHaveBeenCalledWith(nativeTextarea, 'dirname', 'comment-direction');
    expect(nativeTextarea.value).toBe('dummy');
  });

  it('should remove boolean attributes when not disabled and not required', () => {
    const setAttributeSpy = jest.spyOn(setAttributeUtils, 'setAttribute');
    const nativeTextarea = document.createElement('textarea');
    const toggleAttributeSpy = jest.spyOn(nativeTextarea, 'toggleAttribute');
    const name = 'testSelect';
    const disabled = false;
    const required = false;
    const placeholder = 'placeholder';
    const maxLength = 10;
    const minLength = 3;
    const readOnly = false;
    const autoFocus = false;
    const spellCheck = false;
    const autoComplete: AutoFillType = 'off';
    const wrap: TextareaWrapType = 'off';
    const value = 'dummy';
    const dirName = 'comment-direction';

    syncNativeTextarea(
      nativeTextarea,
      name,
      disabled,
      required,
      placeholder,
      maxLength,
      minLength,
      readOnly,
      autoFocus,
      spellCheck,
      autoComplete,
      wrap,
      value,
      dirName
    );

    expect(setAttributeSpy).toHaveBeenCalledWith(nativeTextarea, 'name', name);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('disabled', false);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('required', false);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('readonly', false);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('autofocus', false);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('spellcheck', false);
  });

  it('should add boolean attributes when required and disabled', () => {
    const setAttributeSpy = jest.spyOn(setAttributeUtils, 'setAttribute');
    const nativeTextarea = document.createElement('textarea');
    const toggleAttributeSpy = jest.spyOn(nativeTextarea, 'toggleAttribute');
    const name = 'testSelect';
    const disabled = true;
    const required = true;
    const placeholder = 'placeholder';
    const maxLength = 10;
    const minLength = 3;
    const readOnly = true;
    const autoFocus = true;
    const spellCheck = true;
    const autoComplete: AutoFillType = 'off';
    const wrap: TextareaWrapType = 'off';
    const value = 'dummy';
    const dirName = 'comment-direction';

    syncNativeTextarea(
      nativeTextarea,
      name,
      disabled,
      required,
      placeholder,
      maxLength,
      minLength,
      readOnly,
      autoFocus,
      spellCheck,
      autoComplete,
      wrap,
      value,
      dirName
    );

    expect(setAttributeSpy).toHaveBeenCalledWith(nativeTextarea, 'name', name);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('disabled', true);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('required', true);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('readonly', true);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('autofocus', true);
    expect(toggleAttributeSpy).toHaveBeenCalledWith('spellcheck', true);
  });
});
