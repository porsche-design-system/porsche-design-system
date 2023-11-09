import { type FormState } from '../../../utils/form/form-state';
import { type FunctionalComponent, h } from '@stencil/core';
import { getRole, getPrefixedTagNames, type Theme, hasMessage } from '../../../utils';

type StateMessageProps = {
  state: FormState;
  message: string;
  theme: Theme;
  host: HTMLElement;
};

export const htmlMessageId = 'message';

export const StateMessage: FunctionalComponent<StateMessageProps> = ({ state, message, theme, host }) => {
  const PrefixedTagNames = getPrefixedTagNames(host);
  const isErrorState = state === 'error';

  return (
    hasMessage(host, message, state) && (
      <span id={htmlMessageId} class="message" role={getRole(state)}>
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
