import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  hasLabel,
  hasMessage,
  THEMES,
  validateProps,
  warnIfDeprecatedComponentIsUsed,
} from '../../utils';
import type { PropTypes, Theme } from '../../types';
import type { FieldsetWrapperLabelSize } from './fieldset-wrapper-utils';
import { FIELDSET_LABEL_SIZES } from './../fieldset/fieldset-utils';
import { getComponentCss } from './fieldset-wrapper-styles';
import { StateMessage } from '../common/state-message/state-message';
import { Required } from '../common/required/required';
import type { FieldsetWrapperState } from './fieldset-wrapper-utils';

const propTypes: PropTypes<typeof FieldsetWrapper> = {
  label: AllowedTypes.string,
  labelSize: AllowedTypes.oneOf<FieldsetWrapperLabelSize>(FIELDSET_LABEL_SIZES),
  required: AllowedTypes.boolean,
  state: AllowedTypes.oneOf<FieldsetWrapperState>(FORM_STATES),
  message: AllowedTypes.string,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/** @deprecated since v3.0.0, will be removed with next major release. Please use "p-fieldset" instead. */
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
  @Prop() public state?: FieldsetWrapperState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Adapts color depending on theme. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedComponentIsUsed(this.host, 'Please use new p-fieldset component instead.');
    attachComponentCss(
      this.host,
      getComponentCss,
      this.state,
      this.labelSize,
      hasLabel(this.host, this.label),
      this.theme
    );

    const messageId = 'message';
    const hasMessageValue = hasMessage(this.host, this.message, this.state);

    return (
      <fieldset aria-describedby={hasMessageValue ? messageId : null}>
        {hasLabel(this.host, this.label) && (
          <legend>
            {this.label || <slot name="label" />}
            {this.required && <Required />}
          </legend>
        )}
        <slot />
        {hasMessageValue && (
          <StateMessage id={messageId} state={this.state} message={this.message} theme="light" host={this.host} />
        )}
      </fieldset>
    );
  }
}
