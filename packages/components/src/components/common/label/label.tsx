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
  /**
   * If true, clicking the label will not bubble to the host element,
   * preventing duplicate handling on host click listeners.
   */
  stopClickPropagation?: boolean;
};

export const Label: FunctionalComponent<LabelProps> = ({
  host,
  label,
  description,
  htmlFor,
  isRequired,
  isLoading,
  isDisabled,
  stopClickPropagation,
}) => {
  const handleClick = (e: MouseEvent) => {
    if (stopClickPropagation) {
      e.stopPropagation();
    }
  };

  return (
    <Fragment>
      <label
        class="label"
        id={labelId}
        aria-disabled={isLoading || isDisabled ? 'true' : null}
        htmlFor={htmlFor}
        onClick={handleClick}
      >
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
