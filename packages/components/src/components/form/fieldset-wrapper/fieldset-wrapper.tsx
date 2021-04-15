import { JSX, Component, Prop, h, Element } from '@stencil/core';
import { getPrefixedTagNames, isLabelVisible, isMessageVisible } from '../../../utils';
import type { FormState, TextSize } from '../../../types';

@Component({
  tag: 'p-fieldset-wrapper',
  styleUrl: 'fieldset-wrapper.scss',
  shadow: true,
})
export class FieldsetWrapper {
  @Element() public host!: HTMLElement;
  /** The label text. */
  @Prop() public label?: string = '';
  /** The size of the label text. */
  @Prop() public labelSize?: Extract<TextSize, 'small' | 'medium'> = 'medium';
  /** Marks the Fieldset as required. */
  @Prop() public required?: boolean = false;
  /** The validation state. */
  @Prop() public state?: FormState = 'none';
  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  public render(): JSX.Element {
    const fieldsetClasses = {
      ['fieldset-wrapper']: true,
      [`fieldset-wrapper--${this.state}`]: this.state !== 'none',
    };
    const labelClasses = {
      ['label']: true,
      ['label--required']: this.required,
      ['label--size-small']: this.labelSize === 'small',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <fieldset class={fieldsetClasses}>
        {isLabelVisible(this.host, this.label) && (
          <legend class={labelClasses}>{this.label || <slot name="label" />}</legend>
        )}
        <slot />
        {isMessageVisible(this.host, this.message, this.state) && (
          <PrefixedTagNames.pText class="message" color="inherit" role={this.state === 'error' ? 'alert' : null}>
            {this.message || <slot name="message" />}
          </PrefixedTagNames.pText>
        )}
      </fieldset>
    );
  }
}
