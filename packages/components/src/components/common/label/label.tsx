import { Fragment, type FunctionalComponent, h } from '@stencil/core';
import { hasDescription, hasLabel, isParentFieldsetRequired } from '../../../utils';
import { Required } from '../required/required';
import { descriptionId, type LabelTag, labelId } from './label-utils';

type LabelProps = {
  htmlFor?: string;
  tag?: LabelTag;
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

// fixes issue where clicking a button inside a label causes double events
const composedPathIncludesButton = (event: MouseEvent): boolean => {
  return event.composedPath().some((node): node is HTMLButtonElement => node instanceof HTMLButtonElement);
};

export const Label: FunctionalComponent<LabelProps> = ({
  host,
  label,
  tag,
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
    if (composedPathIncludesButton(e)) {
     e.preventDefault();
    }
  };

  const TagType = tag || 'label';

  return (
    <Fragment>
      {hasLabel(host, label) && (
        <TagType
          class="label"
          id={labelId}
          aria-disabled={isLoading || isDisabled ? 'true' : null}
          htmlFor={htmlFor}
          onClick={handleClick}
        >
          <Fragment>
            {label || <slot name="label" />}
            {isRequired && !isParentFieldsetRequired(host) && <Required />}
          </Fragment>
        </TagType>
      )}
      {hasDescription(host, description) && (
        <span class="label" id={descriptionId} aria-disabled={isLoading || isDisabled ? 'true' : null}>
          {description || <slot name="description" />}
        </span>
      )}
    </Fragment>
  );
};
