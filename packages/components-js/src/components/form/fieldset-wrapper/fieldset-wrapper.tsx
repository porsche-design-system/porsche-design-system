import { JSX, Component, Prop, h} from '@stencil/core';
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

  /** The label text. */
  @Prop() public label?: string = '';

  public render(): JSX.Element {

    const fieldsetClasses = cx(prefix('fieldset-wrapper'));
    const labelClasses = cx(prefix('fieldset-wrapper__label'));

    return (
      <fieldset class={fieldsetClasses}>
        {this.label &&
        <legend class={labelClasses}>
          {this.label}
        </legend>
        }
        <slot/>
      </fieldset>
    );
  }
}
