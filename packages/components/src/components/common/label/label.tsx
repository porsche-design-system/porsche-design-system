import { Fragment, type FunctionalComponent, h } from '@stencil/core';
import {
  getClosestHTMLElement,
  hasDescription,
  hasLabel,
  isParentFieldsetRequired,
  isRequiredAndParentNotRequired,
} from '../../../utils';
import { Required } from '../required/required';

export const labelId = 'label';
export const descriptionId = 'description';

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type LabelProps = {
  host: HTMLElement;
  label: string;
  description?: string;
  htmlFor?: string; // should be used when form element is within shadow dom (modern)
  isRequired?: boolean; // should be used when form element is within shadow dom (modern)
  isLoading?: boolean;
  isDisabled?: boolean;
  formElement?: FormElement; // should be used when form element is slotted within light dom (legacy)
};

export const Label: FunctionalComponent<LabelProps> = ({
  host,
  label,
  description,
  htmlFor,
  isRequired,
  isLoading,
  isDisabled,
  formElement,
}) => {
  return (
    <Fragment>
      <label
        class="label"
        id={labelId}
        aria-disabled={isLoading || isDisabled ? 'true' : null}
        {...(htmlFor
          ? { htmlFor }
          : {
              onClick: (event: MouseEvent & { target: HTMLElement }) =>
                onLabelClick(event, formElement, isLoading, isDisabled, host),
            })}
      >
        {/* TODO: we could try to use css :empty selector instead of DOM query checks, which might make things easier in SSR context? */}
        {hasLabel(host, label) && (
          <Fragment>
            {label || <slot name="label" />}
            {((isRequired && !isParentFieldsetRequired(host)) ||
              (formElement && isRequiredAndParentNotRequired(host, formElement))) && <Required />}
          </Fragment>
        )}
      </label>
      {/* TODO: we could try to use css :empty selector instead of DOM query checks, which might make things easier in SSR context? */}
      {hasDescription(host, description) && (
        <span class="label" id={descriptionId} aria-disabled={isLoading || isDisabled ? 'true' : null}>
          {description || <slot name="description" />}
        </span>
      )}
    </Fragment>
  );
};

const onLabelClick = (
  event: MouseEvent & { target: HTMLElement },
  formElement: FormElement,
  isLoading: boolean,
  isDisabled: boolean,
  host?: HTMLElement
): void => {
  // we don't want to click/focus the form element, if a link is clicked or when host/form-field is in loading or disabled state
  if (isLoading || isDisabled || getClosestHTMLElement(event.target, 'a') !== null) {
    return;
  }

  if (formElement.tagName === 'INPUT' && (formElement.type === 'checkbox' || formElement.type === 'radio')) {
    // checkbox-wrapper, radio-button-wrapper
    formElement.click();
    // TODO: maybe we should call `formElement.focus();` too, to be in sync with the behaviour of other form fields.
    //  On the other hand, it would show a focus outline, maybe this then needs to be handled with :focus-visible and :focus fallback instead.
  } else if (formElement.tagName === 'SELECT') {
    // select-wrapper
    // TODO: should be refactored in select-wrapper, so that "for" attribute becomes possible to use
    const el: HTMLElement = host.shadowRoot.children[0].querySelector('.dropdown')?.shadowRoot.children[0] as any; // input or button of p-select-wrapper-dropdown
    if (el) {
      el.click();
      el.focus();
    } else {
      formElement.focus(); // it's not possible to open the native option list of a select by JS
    }
  } else if (formElement.tagName === 'INPUT' || formElement.tagName === 'TEXTAREA') {
    // text-field-wrapper, textarea-wrapper
    formElement.focus();
  }
};
