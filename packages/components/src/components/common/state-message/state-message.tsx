import { type FunctionalComponent, h } from '@stencil/core';
import { getPrefixedTagNames, hasMessage } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';

type StateMessageProps = {
  state: FormState;
  message: string;
  host: HTMLElement;
};

export const messageId = 'message';

export const StateMessage: FunctionalComponent<StateMessageProps> = ({ state, message, host }) => {
  const PrefixedTagNames = getPrefixedTagNames(host);
  const isErrorState = state === 'error';

  return (
    // needs to be rendered always to have correct behaviour for screen readers
    <span id={messageId} class="message" role={state === 'success' ? 'status' : 'alert'}>
      {hasMessage(host, message, state) && [
        <PrefixedTagNames.pIcon
          name={isErrorState ? 'exclamation' : 'check'}
          color={isErrorState ? 'error' : 'success'}
          aria-hidden="true"
        />,
        message || <slot name="message" />,
      ]}
    </span>
  );
};
