import { JSX, Host, Component, Prop, h, Element } from '@stencil/core';
import cx from 'classnames';
import {
  prefix
} from '../../../utils';

@Component({
  tag: 'p-fieldset-wrapper',
  styleUrl: 'fieldset-wrapper.scss',
  shadow: true
})
export class FieldsetWrapper {

  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  public render(): JSX.Element {

    const fieldsetClasses = cx(prefix('fieldset-wrapper'));
    const labelClasses = cx(prefix('fieldset-wrapper__label'));

    return (
      <Host>
        <fieldset class={fieldsetClasses}>
          <legend class={labelClasses}>
            {this.label}
          </legend>
          <slot/>
        </fieldset>
      </Host>
    );
  }
}
