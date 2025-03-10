import { Fragment, type FunctionalComponent, h } from '@stencil/core';
import { hasDescription, hasLabel, isParentFieldsetRequired } from '../../../utils';
import { Required } from '../required/required';
import { descriptionId, labelId } from './label-utils';

type LabelProps = {
  htmlFor: string;
  isRequired?: boolean;
  host: HTMLElement;
  label: string;
  description?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
};

export const Label: FunctionalComponent<LabelProps> = ({
  host,
  label,
  description,
  htmlFor,
  isRequired,
  isLoading,
  isDisabled,
}) => {
  return (
    <Fragment>
      <label class="label" id={labelId} aria-disabled={isLoading || isDisabled ? 'true' : null} htmlFor={htmlFor}>
        {hasLabel(host, label) && (
          <Fragment>
            {label || <slot name="label" />}
            {isRequired && !isParentFieldsetRequired(host) && <Required />}
          </Fragment>
        )}
      </label>
      {hasDescription(host, description) && (
        <span class="label" id={descriptionId} aria-disabled={isLoading || isDisabled ? 'true' : null}>
          {description || <slot name="description" />}
        </span>
      )}
    </Fragment>
  );
};
