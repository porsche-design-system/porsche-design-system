import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes, SelectedAriaRole } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  hasLabel,
  hasMessage,
  hasPropValueChanged,
  validateProps,
} from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { Required } from '../common/required/required';
import { messageId, StateMessage } from '../common/state-message/state-message';
import { getComponentCss } from './fieldset-styles';
import {
  FIELDSET_ARIA_ATTRIBUTES,
  FIELDSET_LABEL_SIZES,
  type FieldsetAriaAttribute,
  type FieldsetLabelSize,
  type FieldsetState,
  getFieldsetAriaAttributes,
} from './fieldset-utils';

const propTypes: PropTypes<typeof Fieldset> = {
  label: AllowedTypes.string,
  labelSize: AllowedTypes.oneOf<FieldsetLabelSize>(FIELDSET_LABEL_SIZES),
  required: AllowedTypes.boolean,
  state: AllowedTypes.oneOf<FormState>(FORM_STATES),
  message: AllowedTypes.string,
  // AllowedTypes do not match exactly the @Prop type because the 'aria' function does not allow for key-value pairs.
  aria: AllowedTypes.aria<FieldsetAriaAttribute>(FIELDSET_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 */
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

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaRole<'radiogroup'>;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.state, this.labelSize, hasLabel(this.host, this.label));

    const hasMessageValue = hasMessage(this.host, this.message, this.state);

    return (
      <fieldset
        aria-describedby={hasMessageValue ? messageId : null}
        {...getFieldsetAriaAttributes(this.required, this.state === 'error', this.aria)}
      >
        {hasLabel(this.host, this.label) && (
          <legend>
            {this.label || <slot name="label" />}
            {this.required && <Required />}
          </legend>
        )}
        <slot />
        <StateMessage state={this.state} message={this.message} host={this.host} />
      </fieldset>
    );
  }
}
