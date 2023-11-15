import { Fragment, type FunctionalComponent, h } from '@stencil/core';
import {
  getClosestHTMLElement,
  hasDescription,
  hasLabel,
  isParentFieldsetRequired,
  isRequiredAndParentNotRequired,
} from '../../../utils';
import { Required } from '../required/required';

export const htmlLabelId = 'label';
export const htmlDescriptionId = 'description';

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type LabelProps = {
  host: HTMLElement;
  label: string;
  description?: string;
  htmlFor?: string; // should be used when form element is within shadow dom (modern)
  isRequired?: boolean; // should be used when form element is within shadow dom (modern)
  isLoading?: boolean;
  formElement?: FormElement; // should be used when form element is slotted within light dom (legacy)
};

export const Label: FunctionalComponent<LabelProps> = ({
  host,
  label,
  description,
  htmlFor,
  isRequired,
  isLoading,
  formElement,
}) => {
  return (
    <Fragment>
      <label
        class="label"
        id={htmlLabelId}
        aria-disabled={isLoading ? 'true' : null}
        {...(htmlFor
          ? { htmlFor }
          : {
              onClick: (event: MouseEvent & { target: HTMLElement }) =>
                onLabelClick(event, formElement, isLoading, host),
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
        <span class="label" id={htmlDescriptionId}>
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
  host?: HTMLElement
): void => {
  // we don't want to click/focus the form element, if a link is clicked or when host is in loading state
  if (isLoading || getClosestHTMLElement(event.target, 'a') !== null) {
    return;
  }

  if (formElement.type === 'checkbox' || formElement.type === 'radio') {
    // checkbox-wrapper, radio-button-wrapper
    formElement.click();
  } else if (formElement.tagName === 'SELECT') {
    // select-wrapper
    // TODO: should be refactored in select-wrapper, so that "for" attribute becomes possible to use
    const el: HTMLElement = host.shadowRoot.children[0].querySelector('.dropdown')?.shadowRoot.children[0] as any; // input or button of p-select-wrapper-dropdown
    if (el) {
      el.click();
    } else {
      formElement.focus(); // it's not possible to open the native option list of a select by JS
    }
  } else if (formElement.tagName === 'INPUT' || formElement.tagName === 'TEXTAREA') {
    // text-field-wrapper, textarea-wrapper
    formElement.focus();
  }
};
