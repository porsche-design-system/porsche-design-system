import { Fragment, type FunctionalComponent, h } from '@stencil/core';
import { getClosestHTMLElement, hasDescription, hasLabel, isRequiredAndParentNotRequired } from '../../../utils';
import { Required } from '../required/required';

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type LabelProps = {
  label: string;
  description?: string;
  isLoading?: boolean;
  formElement: FormElement;
  host: HTMLElement;
};

const onLabelClick = (event: MouseEvent, formElement: FormElement, isLoading: boolean): void => {
  if (
    !isLoading &&
    (formElement?.type === 'checkbox' || formElement?.type === 'radio') &&
    // we don't want to click on the input, if a link is clicked
    getClosestHTMLElement(event.target as HTMLElement, 'a') === null
  ) {
    formElement.click();
  } else {
    formElement.focus();
  }
};

export const Label: FunctionalComponent<LabelProps> = ({ label, description, isLoading, formElement, host }) => {
  const labelProps = {
    class: 'label',
    onClick: (event: MouseEvent) => onLabelClick(event, formElement, isLoading),
    'aria-disabled': isLoading ? 'true' : null,
  };

  return (
    <Fragment>
      <label {...labelProps}>
        {hasLabel(host, label) && (
          <Fragment>
            {label || <slot name="label" />}
            {isRequiredAndParentNotRequired(host, formElement) && <Required />}
          </Fragment>
        )}
      </label>
      {hasDescription(host, description) && <span {...labelProps}>{description || <slot name="description" />}</span>}
    </Fragment>
  );
};
