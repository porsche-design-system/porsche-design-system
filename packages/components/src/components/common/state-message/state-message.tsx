import type { FormState } from '../../../utils/form/form-state';
import { type FunctionalComponent, h } from '@stencil/core';
import { getPrefixedTagNames, type Theme, hasMessage } from '../../../utils';

type StateMessageProps = {
  state: FormState;
  message: string;
  theme: Theme;
  host: HTMLElement;
};

export const messageId = 'message';

export const StateMessage: FunctionalComponent<StateMessageProps> = ({ state, message, theme, host }) => {
  const PrefixedTagNames = getPrefixedTagNames(host);
  const isErrorState = state === 'error';

  return (
    <span id={messageId} class="message" role={isErrorState || state === 'none' ? 'alert' : 'status'}>
      {hasMessage(host, message, state) && [
        <PrefixedTagNames.pIcon
          name={isErrorState ? 'exclamation' : 'check'}
          color={isErrorState ? 'notification-error' : 'notification-success'}
          theme={theme}
          aria-hidden="true"
        />,
        message || <slot name="message" />,
      ]}
    </span>
  );
};
