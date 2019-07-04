import { JSX, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';

@Component({
  tag: 'p-switch',
  styleUrl: 'switch.scss',
  shadow: true
})
export class Switch {

  @Prop() public name?: string = '';

  @Prop() public value?: string = '';

  @Prop() public disabled?: boolean = false;

  @Prop() public checked?: boolean = false;

  public render(): JSX.Element {
    const switchClasses = cx(prefix('switch'));
    const checkboxClasses = cx(prefix('switch__checkbox'));
    const sliderClasses = cx(prefix('switch__slider'));
    const iconInactiveClasses = cx(prefix('switch__icon'), prefix('switch__icon--inactive'));
    const iconActiveClasses = cx(prefix('switch__icon'), prefix('switch__icon--active'));

    return (
      <label class={switchClasses}>
        <input
          class={checkboxClasses}
          name={this.name}
          value={this.value}
          type='checkbox'
          disabled={this.disabled}
          checked={this.checked}
        />
        <span class={sliderClasses}>
          <p-icon class={iconInactiveClasses} source='minus' />
          <p-icon class={iconActiveClasses} source='check' />
        </span>
      </label>
    );
  }
}
