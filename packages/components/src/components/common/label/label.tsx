import { Fragment, type FunctionalComponent, h } from '@stencil/core';
import { getClosestHTMLElement, hasDescription, hasLabel, isRequiredAndParentNotRequired } from '../../../utils';
import { Required } from '../required/required';

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type LabelProps = {
  host: HTMLElement;
  label: string;
  description?: string;
  isRequired?: boolean;
  isLoading?: boolean;
  formElement?: FormElement;
  hasCustomSelectDropdown?: boolean;
  htmlFor?: string;
};

const onLabelClick = (
  event: MouseEvent,
  formElement: FormElement,
  isLoading: boolean,
  hasCustomSelectDropdown?: boolean,
  host?: HTMLElement
): void => {
  if (
    !isLoading &&
    (formElement?.type === 'checkbox' || formElement?.type === 'radio') &&
    // we don't want to click on the input, if a link is clicked
    getClosestHTMLElement(event.target as HTMLElement, 'a') === null
  ) {
    formElement.click();
  } else {
    (hasCustomSelectDropdown
      ? (host?.shadowRoot.children[0].querySelector('.dropdown').shadowRoot.children[0] as HTMLElement)
      : formElement
    ).focus();
  }
};

export const htmlLabelId = 'label';
export const htmlDescriptionId = 'description';

export const Label: FunctionalComponent<LabelProps> = ({
  label,
  description,
  isRequired,
  isLoading,
  formElement,
  host,
  hasCustomSelectDropdown,
  htmlFor,
}) => {
  const labelProps = {
    class: 'label',
    'aria-disabled': isLoading ? 'true' : null,
    ...(htmlFor
      ? {
          htmlFor,
        }
      : {
          onClick: (event: MouseEvent) => onLabelClick(event, formElement, isLoading, hasCustomSelectDropdown, host),
        }),
  };

  return (
    <Fragment>
      <label id={htmlLabelId} {...labelProps}>
        {hasLabel(host, label) && (
          <Fragment>
            {label || <slot name="label" />}
            {isRequired && <Required />}
            {/* TODO: conditional rendering of required component needs to be re-evaluated */}
            {/* {!isParentFieldsetRequired(this.host) && this.required && <Required />} // for pin code */}
            {isRequiredAndParentNotRequired(host, formElement) && <Required />}
          </Fragment>
        )}
      </label>
      {hasDescription(host, description) && (
        <span id={htmlDescriptionId} {...labelProps}>
          {description || <slot name="description" />}
        </span>
      )}
    </Fragment>
  );
};
