import { JSX, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';

@Component({
  tag: 'p-checkbox',
  styleUrl: 'checkbox.scss',
  shadow: true
})
export class Checkbox {
  @Prop() public name?: string = '';

  @Prop() public value?: string = '';

  @Prop() public disabled?: boolean = false;

  @Prop() public checked?: boolean = false;

  @Prop() public error?: boolean = false;

  public render(): JSX.Element {
    const checkboxClasses = cx(prefix('checkbox'));
    const fieldClasses = cx(prefix('checkbox__field'));
    const iconClasses = cx(prefix('checkbox__icon'), this.error && prefix('checkbox__icon--error'));
    const labelClasses = cx(prefix('checkbox__label'), this.error && prefix('checkbox__label--error'));

    return (
      <label class={checkboxClasses}>
        <input
          class={fieldClasses}
          type='checkbox'
          name={this.name}
          value={this.value}
          disabled={this.disabled}
          checked={this.checked}
        />
        <span class={iconClasses}>
          <p-icon source='check' />
        </span>
        <p-text class={labelClasses} tag='span' color='inherit'>
          <slot />
        </p-text>
      </label>
    );
  }
}
