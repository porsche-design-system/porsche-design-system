import { JSX, Component, Prop, h, Element } from '@stencil/core';
import cx from 'classnames';
import { BreakpointCustomizable, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import { improveFocusHandlingForCustomElement } from '../../../utils/focusHandling';
import { improveButtonHandlingForCustomElement } from '../../../utils/buttonHandling';
import { ButtonType, IconName, Theme } from '../../../types';

@Component({
  tag: 'p-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {
  @Element() public element!: HTMLElement;

  /** To remove the element from tab order. */
  @Prop() public tabbable?: boolean = true;

  /** Specifies the type of the button. */
  @Prop() public type?: ButtonType = 'button';

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop({ reflect: true }) public disabled?: boolean = false;

  /** Disables the button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** The style variant of the button. */
  @Prop() public variant?: 'primary' | 'secondary' | 'tertiary' = 'secondary';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'arrow-head-right';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string = undefined;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.element);
    improveButtonHandlingForCustomElement(this.element, () => this.type, () => this.isDisabled());
  }

  public render(): JSX.Element {
    const buttonClasses = cx(
      prefix('button'),
      prefix(`button--${this.variant}`),
      mapBreakpointPropToPrefixedClasses('button-', this.hideLabel, ['without-label', 'with-label']),
      prefix(`button--theme-${this.theme}`)
    );
    const iconClasses = prefix('button__icon');
    const labelClasses = prefix('button__label');

    return (
      <button
        class={buttonClasses}
        type={this.type}
        disabled={this.isDisabled()}
        tabindex={this.tabbable ? 0 : -1}
        aria-busy={this.loading && 'true'}
      >
        {this.loading ? (
          <p-spinner
            class={iconClasses}
            size='inherit'
            theme={this.variant === 'tertiary' && this.theme === 'light' ? 'light' : 'dark'}
          />
        ) : (
          <p-icon
            class={iconClasses}
            size='inherit'
            name={this.icon}
            source={this.iconSource}
            color='inherit'
            aria-hidden='true'
          />
        )}
        <p-text class={labelClasses} tag='span' color='inherit'>
          <slot/>
        </p-text>
      </button>
    );
  }

  private isDisabled(): boolean {
    return this.disabled || this.loading;
  }
}
