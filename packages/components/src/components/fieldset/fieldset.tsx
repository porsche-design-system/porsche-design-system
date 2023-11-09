import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  hasLabel,
  hasMessage,
  THEMES,
  validateProps,
} from '../../utils';
import type { PropTypes, Theme } from '../../types';
import type { FieldsetLabelSize, FieldsetState } from './fieldset-utils';
import { FIELDSET_LABEL_SIZES } from './fieldset-utils';
import { getComponentCss } from './fieldset-styles';
import { htmlMessageId, StateMessage } from '../common/state-message/state-message';
import { Required } from '../common/required/required';
import type { FormState } from '../../utils/form/form-state';

const propTypes: PropTypes<typeof Fieldset> = {
  label: AllowedTypes.string,
  labelSize: AllowedTypes.oneOf<FieldsetLabelSize>(FIELDSET_LABEL_SIZES),
  required: AllowedTypes.boolean,
  state: AllowedTypes.oneOf<FormState>(FORM_STATES),
  message: AllowedTypes.string,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-fieldset',
  shadow: true,
})
export class Fieldset {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The size of the label text. */
  @Prop() public labelSize?: FieldsetLabelSize = 'medium';

  /** Marks the Fieldset as required. */
  @Prop() public required?: boolean = false;

  /** The validation state. */
  @Prop() public state?: FieldsetState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Adapts color depending on theme. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.state,
      this.labelSize,
      hasLabel(this.host, this.label),
      this.theme
    );

    const hasMessageValue = hasMessage(this.host, this.message, this.state);

    return (
      <fieldset aria-describedby={hasMessageValue ? htmlMessageId : null}>
        {hasLabel(this.host, this.label) && (
          <legend>
            {this.label || <slot name="label" />}
            {this.required && <Required />}
          </legend>
        )}
        <slot />
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
      </fieldset>
    );
  }
}
