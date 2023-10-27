import { Fragment, type FunctionalComponent, h } from '@stencil/core';
import { hasDescription, hasLabel, isRequiredAndParentNotRequired } from '../../../utils';
import { Required } from '../required/required';

type LabelProps = {
  label: string;
  description?: string;
  isLoading?: boolean;
  formElement: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  host: HTMLElement;
};

export const Label: FunctionalComponent<LabelProps> = ({ label, description, isLoading, formElement, host }) => {
  const isCheckboxOrRadioButton = formElement?.type === 'checkbox' || formElement?.type === 'radio';

  return (
    <Fragment>
      <label
        class="label"
        aria-disabled={isLoading ? 'true' : null}
        onClick={() => !isLoading && (isCheckboxOrRadioButton ? formElement.click() : formElement.focus())}
      >
        {hasLabel(host, label) && (
          <Fragment>
            {label || <slot name="label" />}
            {isRequiredAndParentNotRequired(host, formElement) && <Required />}
          </Fragment>
        )}
      </label>
      {hasDescription(host, description) && (
        <span
          class="label"
          onClick={() => !isLoading && (isCheckboxOrRadioButton ? formElement.click() : formElement.focus())}
        >
          {description || <slot name="description" />}
        </span>
      )}
    </Fragment>
  );
};
