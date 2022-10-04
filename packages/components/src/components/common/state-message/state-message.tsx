import { FunctionalComponent, h } from '@stencil/core';
import { getRole, getPrefixedTagNames } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';

type StateMessageProps = {
  id?: string;
  state: FormState;
  message: string;
  host: HTMLElement;
};

export const StateMessage: FunctionalComponent<StateMessageProps> = ({ id, state, message, host }) => {
  const PrefixedTagNames = getPrefixedTagNames(host);
  return (
    <span id={id} class="message" role={getRole(state)}>
      <PrefixedTagNames.pIcon
        class="message__icon"
        name={state === 'error' ? 'exclamation' : 'check'}
        color="inherit"
        aria-hidden="true"
      />
      {message || <slot name="message" />}
    </span>
  );
};
