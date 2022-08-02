import { JSX, Component, Prop, h, Element } from '@stencil/core';
import { AllowedTypes, attachComponentCss, hasLabel, hasMessage, validateProps } from '../../../utils';
import type { PropTypes } from '../../../types';
import type { FieldsetWrapperLabelSize } from './fieldset-wrapper-utils';
import { getComponentCss } from './fieldset-wrapper-styles';
import { StateMessage } from '../../common/state-message/state-message';
import { Required } from '../../common/required/required';
import { FORM_STATES } from '../form-state';
import type { FormState } from '../form-state';
import { FIELDSET_WRAPPER_LABEL_SIZES } from './fieldset-wrapper-utils';

const propTypes: PropTypes<typeof FieldsetWrapper> = {
  label: AllowedTypes.string,
  labelSize: AllowedTypes.oneOf<FieldsetWrapperLabelSize>(FIELDSET_WRAPPER_LABEL_SIZES),
  required: AllowedTypes.boolean,
  state: AllowedTypes.oneOf<FormState>(FORM_STATES),
  message: AllowedTypes.string,
};

@Component({
  tag: 'p-fieldset-wrapper',
  shadow: true,
})
export class FieldsetWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The size of the label text. */
  @Prop() public labelSize?: FieldsetWrapperLabelSize = 'medium';

  /** Marks the Fieldset as required. */
  @Prop() public required?: boolean = false;

  /** The validation state. */
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  private get hasLabel(): boolean {
    return hasLabel(this.host, this.label);
  }

  private get hasMessage(): boolean {
    return hasMessage(this.host, this.message, this.state);
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.state, this.labelSize, this.hasLabel);
  }

  public render(): JSX.Element {
    const messageId = 'message';

    return (
      <fieldset aria-describedby={this.hasMessage ? messageId : null}>
        {this.hasLabel && (
          <legend>
            {this.label || <slot name="label" />}
            {this.required && <Required />}
          </legend>
        )}
        <slot />
        {this.hasMessage && <StateMessage id={messageId} state={this.state} message={this.message} host={this.host} />}
      </fieldset>
    );
  }
}
