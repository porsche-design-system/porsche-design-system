import { Fragment, type FunctionalComponent, h } from '@stencil/core';
import { hasDescription, hasLabel, isRequiredAndParentNotRequired } from '../../../utils';
import { Required } from '../required/required';

type LabelProps = {
  label: string;
  description: string;
  input: HTMLInputElement;
  host: HTMLElement;
};

export const Label: FunctionalComponent<LabelProps> = ({ label, description, input, host }) => {
  return (
    <Fragment>
      <label class="label" onClick={() => input.focus()}>
        {hasLabel(host, label) && (
          <Fragment>
            {label || <slot name="label" />}
            {isRequiredAndParentNotRequired(host, input) && <Required />}
          </Fragment>
        )}
      </label>
      {hasDescription(host, description) && (
        <span class="label" onClick={() => input.focus()}>
          {description || <slot name="description" />}
        </span>
      )}
    </Fragment>
  );
};
