import { JSX, Component, Prop, h, Element } from '@stencil/core';
import { getPrefixedTagNames, isLabelVisible, isMessageVisible, setRole } from '../../../utils';
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
    const rootClasses = {
      ['root']: true,
      [`root--${this.state}`]: this.state !== 'none',
      ['root--required']: this.required,
      ['root--label-size-small']: this.labelSize === 'small',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <fieldset class={rootClasses}>
        {isLabelVisible(this.host, this.label) && <legend>{this.label || <slot name="label" />}</legend>}
        <slot />
        {isMessageVisible(this.host, this.message, this.state) && (
          <PrefixedTagNames.pText class="message" color="inherit" role={setRole(this.state)}>
            {this.message || <slot name="message" />}
          </PrefixedTagNames.pText>
        )}
      </fieldset>
    );
  }
}
