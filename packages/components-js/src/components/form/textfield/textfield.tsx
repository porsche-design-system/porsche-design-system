import { JSX, Host, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';
import { IconName } from '../../icon/icon/icon-name';

@Component({
  tag: 'p-textfield',
  styleUrl: 'textfield.scss',
  shadow: false
})
export class Textfield {

  @Prop() public label?: string = undefined;

  /** The icon shown. */
  @Prop() public icon?: IconName = undefined;

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string = undefined;

  @Prop() public error?: boolean = false;

  public render(): JSX.Element {
    const textfieldClasses = cx(prefix('textfield'));
    const formElementWrapperClasses = cx(prefix('textfield__form-element-wrapper'));
    const iconClasses = cx(prefix('textfield__icon'));
    const labelClasses = cx(prefix('textfield__label'));

    return (
      <Host>
        <label class={textfieldClasses}>
          <p-text class={labelClasses} size='small' color='inherit' tag='span'>
            {this.label}
          </p-text>
          <span class={formElementWrapperClasses}>
            {this.icon && <p-icon
              class={iconClasses}
              color='inherit'
              size='inherit'
              name={this.icon}
              source={this.iconSource}
            />}
            <slot />
          </span>
        </label>
      </Host>
    );
  }

}
