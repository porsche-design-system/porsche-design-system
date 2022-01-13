import { JSX, Component, Prop, h, Element } from '@stencil/core';
import { attachComponentCss, hasLabel, hasMessage } from '../../../utils';
import type { FormState } from '../../../types';
import type { FieldsetWrapperLabelSize } from './fieldset-wrapper-utils';
import { getComponentCss } from './fieldset-wrapper-styles';
import { StateMessage } from '../../common/state-message/state-message';
import { Required } from '../../common/required/required';

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

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.state, this.labelSize, this.hasLabel);
  }

  public render(): JSX.Element {
    return (
      <fieldset aria-describedby={this.hasMessage ? 'message' : null}>
        {this.hasLabel && (
          <legend>
            {this.label || <slot name="label" />}
            {this.required && <Required />}
          </legend>
        )}
        <slot />
        {this.hasMessage && <StateMessage id="message" state={this.state} message={this.message} host={this.host} />}
      </fieldset>
    );
  }

  private get hasLabel(): boolean {
    return hasLabel(this.host, this.label);
  }

  private get hasMessage(): boolean {
    return hasMessage(this.host, this.message, this.state);
  }
}
