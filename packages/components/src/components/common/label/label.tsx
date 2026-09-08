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
   * If true, clicks on the label use `htmlFor` only and do not bubble to the host.
   * Clicks on the `label-after` slot are also stopped so they do not trigger host handlers (e.g. radio selection).
   */
  stopClickPropagation?: boolean;
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
  const handleLabelClick = (e: MouseEvent) => {
    if (stopClickPropagation) {
      e.stopPropagation();
    }
  };

  const handleLabelAfterClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const TagType = tag || 'label';

  return (
    <Fragment>
      {hasLabel(host, label) && (
        <div class="label-wrapper">
          <TagType
            class="label"
            id={labelId}
            aria-disabled={isLoading || isDisabled ? 'true' : null}
            htmlFor={htmlFor}
            onClick={handleLabelClick}
          >
            <Fragment>
              {label || <slot name="label" />}
              {isRequired && !isParentFieldsetRequired(host) && <Required />}
            </Fragment>
          </TagType>
          {stopClickPropagation ? (
            // biome-ignore lint/a11y/noStaticElementInteractions: stop propagation only; links/buttons in label-after keep default behavior
            <span class="label-after" onClick={handleLabelAfterClick}>
              <slot name="label-after" />
            </span>
          ) : (
            <slot name="label-after" />
          )}
        </div>
      )}
      {hasDescription(host, description) && (
        <span class="label" id={descriptionId} aria-disabled={isLoading || isDisabled ? 'true' : null}>
          {description || <slot name="description" />}
        </span>
      )}
    </Fragment>
  );
};
