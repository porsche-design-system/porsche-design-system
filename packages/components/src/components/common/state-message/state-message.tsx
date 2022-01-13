import { FunctionalComponent, h } from '@stencil/core';
import { getRole, getPrefixedTagNames } from '../../../utils';
import type { FormState } from '../../../types';

type StateMessageProps = {
  id?: string;
  state: FormState;
  message: string;
  host: HTMLElement;
};

export const StateMessage: FunctionalComponent<StateMessageProps> = ({ id, state, message, host }) => {
  const PrefixedTagNames = getPrefixedTagNames(host);
  return (
    <PrefixedTagNames.pText id={id} class="message" tag="span" color="inherit" role={getRole(state)}>
      <PrefixedTagNames.pIcon
        class="message__icon"
        name={state === 'error' ? 'exclamation' : 'check'}
        color="inherit"
        aria-hidden="true"
      />
      {message || <slot name="message" />}
    </PrefixedTagNames.pText>
  );
};
