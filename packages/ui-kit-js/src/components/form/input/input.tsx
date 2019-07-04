import { JSX, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';

@Component({
  tag: 'p-input',
  styleUrl: 'input.scss',
  shadow: true
})
export class Input {
  @Prop() public name?: string = '';

  @Prop() public value?: string = '';

  @Prop() public label?: string = '';

  @Prop() public type?: 'text' | 'password' | 'date' | 'time' | 'number' | string = 'text';

  @Prop() public icon?: string = '';

  @Prop() public disabled?: boolean = false;

  @Prop() public error?: boolean = false;

  public render(): JSX.Element {
    const inputClasses = cx(prefix('input'));
    const fieldClasses = cx(prefix('input__field'), this.error && prefix('input__field--error'));
    const iconClasses = cx(prefix('input__icon'));
    const labelClasses = cx(prefix('input__label'));

    return (
      <label class={inputClasses}>
        {this.icon && <p-icon class={iconClasses} source={this.icon} />}
        <input
          class={fieldClasses}
          type={this.type}
          name={this.name}
          value={this.value}
          placeholder={this.label}
          disabled={this.disabled}
        />
        <p-text class={labelClasses} type='12' color='inherit' tag='span'>
          {this.label}
        </p-text>
      </label>
    );
  }
}
