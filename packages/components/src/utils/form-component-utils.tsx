import { h, JSX } from '@stencil/core';
import { getPrefixedTagNames } from './get-prefixed-tag-name';
import type { FormState } from '../types';
import { isParentFieldsetWrapperRequired, isRequired } from './dom';

export const getMessage = (host: HTMLElement, message: string, state: FormState): JSX.Element => {
  const PrefixedTagNames = getPrefixedTagNames(host);

  return (
    <PrefixedTagNames.pText class="message" color="inherit" role={state === 'error' ? 'alert' : null}>
      {message || <slot name="message" />}
    </PrefixedTagNames.pText>
  );
};

export const getLabel = (
  host: HTMLElement,
  input: HTMLInputElement | HTMLTextAreaElement,
  label: string,
  className: string | { [p: string]: boolean },
  labelClick: (event: MouseEvent) => void
): JSX.Element => {
  const PrefixedTagNames = getPrefixedTagNames(host);

  return (
    <PrefixedTagNames.pText class={className} tag="span" color="inherit" onClick={labelClick}>
      {label || <slot name="label" />}
      {!isParentFieldsetWrapperRequired(host) && isRequired(input) && <span class="required" />}
    </PrefixedTagNames.pText>
  );
};

export const getDescripton = (
  host: HTMLElement,
  description: string,
  className: string | { [p: string]: boolean }
): JSX.Element => {
  const PrefixedTagNames = getPrefixedTagNames(host);

  return (
    <PrefixedTagNames.pText class={className} tag="span" color="inherit" size="x-small">
      {description || <slot name="description" />}
    </PrefixedTagNames.pText>
  );
};
