import { FunctionalComponent, h } from '@stencil/core';
import { getRole, getPrefixedTagNames } from '../../utils';
import { FormState } from '../../types';

type StateMessageProps = {
  state: FormState;
  message: string;
  host: HTMLElement;
};

export const StateMessage: FunctionalComponent<StateMessageProps> = ({ state, message, host }) => {
  const PrefixedTagNames = getPrefixedTagNames(host);
  return (
    <PrefixedTagNames.pText class="message" tag="span" color="inherit" role={getRole(state)}>
      <PrefixedTagNames.pIcon
        class="icon"
        name={state === 'error' ? 'exclamation' : 'check'}
        color="inherit"
        aria-hidden="true"
      />
      {message || <slot name="message" />}
    </PrefixedTagNames.pText>
  );
};
