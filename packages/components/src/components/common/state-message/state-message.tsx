import { type FormState } from '../../../utils/form/form-state';
import { type FunctionalComponent, h } from '@stencil/core';
import { getRole, getPrefixedTagNames, type Theme, hasMessage } from '../../../utils';

type StateMessageProps = {
  id?: string;
  state: FormState;
  message: string;
  theme: Theme;
  host: HTMLElement;
};

export const StateMessage: FunctionalComponent<StateMessageProps> = ({ id, state, message, theme, host }) => {
  const PrefixedTagNames = getPrefixedTagNames(host);
  const isErrorState = state === 'error';

  return (
    hasMessage(host, message, state) && (
      <span id={id} class="message" role={getRole(state)}>
        <PrefixedTagNames.pIcon
          name={isErrorState ? 'exclamation' : 'check'}
          color={isErrorState ? 'notification-error' : 'notification-success'}
          theme={theme}
          aria-hidden="true"
        />
        {message || <slot name="message" />}
      </span>
    )
  );
};
