import { JSX, Component, Prop, h, Element } from '@stencil/core';
import { getPrefixedTagNames, isMessageVisible } from '../../../utils';
import { FormState } from '../../../types';

@Component({
  tag: 'p-fieldset-wrapper',
  styleUrl: 'fieldset-wrapper.scss',
  shadow: true,
})
export class FieldsetWrapper {
  @Element() public host!: HTMLElement;
  /** The label text. */
  @Prop() public label?: string = '';
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
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <fieldset class={fieldsetClasses}>
        {this.label && <legend class={labelClasses}>{this.label}</legend>}
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
