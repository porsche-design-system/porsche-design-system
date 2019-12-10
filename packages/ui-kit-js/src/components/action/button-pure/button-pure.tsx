import { JSX, Component, Prop, h, Element, Listen } from '@stencil/core';
import cx from 'classnames';
import { BreakpointCustomizable, mapBreakpointPropToPrefixedClasses, prefix, hasShadowDom } from '../../../utils';
import {ButtonType, TextSize, TextWeight, Theme} from '../../../types';
import { improveFocusHandlingForCustomElement, preventNativeTabIndex } from '../../../utils/focusHandling';
import { IconName } from '../../icon/icon/icon-name';

@Component({
  tag: 'p-button-pure',
  styleUrl: 'button-pure.scss',
  shadow: true
})
export class ButtonPure {
  @Element() public element!: HTMLElement;

  /**
   * Check native tabindex to ensure that it doesn't get set on the host element
   * @internal
   */
  @Prop({
    mutable: true,
    attribute: 'tabindex'
  })
  public nativeTabindex?: number = -1;

  /** To remove the element from tab order. */
  @Prop() public tabbable?: boolean = true;

  /** Specifies the type of the button. */
  @Prop() public type?: ButtonType = 'button';

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** Size of the button. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'small';

  /** The weight of the text (only has effect with visible label). */
  @Prop() public weight?: TextWeight = 'regular';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'arrow-right-hair';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string = undefined;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  public componentDidLoad() {
    improveFocusHandlingForCustomElement(this.element);
  }

  public render(): JSX.Element {
    preventNativeTabIndex(this);

    const buttonPureClasses = cx(
      prefix('button-pure'),
      mapBreakpointPropToPrefixedClasses('button-pure-', this.hideLabel, ['without-label', 'with-label']),
      mapBreakpointPropToPrefixedClasses('button-pure--size', this.size),
      prefix(`button-pure--theme-${this.theme}`)
    );

    const iconClasses = cx(
      prefix('button-pure__icon')
    );

    const labelClasses = cx(
      prefix('button-pure__label')
    );

    return (
      <button
        class={buttonPureClasses}
        type={this.type}
        disabled={this.disabled || this.loading}
        tabindex={this.tabbable ? 0 : -1}
      >
        {this.loading ? (
          <p-spinner
            class={iconClasses}
            size='inherit'
            theme={this.theme}
          />
        ) : (
          <p-icon
            class={iconClasses}
            color='inherit'
            size='inherit'
            name={this.icon}
            source={this.iconSource}
          />
        )}
        <p-text
          class={labelClasses}
          tag='span'
          color='inherit'
          size='inherit'
          weight={this.weight}
        >
          <slot/>
        </p-text>
      </button>
    );
  }

  /**
   * IE11 workaround to fix the event target
   * of click events (which normally shadow dom
   * takes care of)
   */
  @Listen('click', { capture: true })
  public fixEventTarget(event: MouseEvent): void {
    if (event.target !== this.element) {
      event.stopPropagation();
      event.preventDefault();
      this.element.click();
    }
  }

  @Listen('click')
  public onClick(event: MouseEvent): void {
    if (this.type === 'submit' && hasShadowDom(this.element)) {
      // Why? That's why: https://www.hjorthhansen.dev/shadow-dom-and-forms/
      const form = this.element.closest('form');
      if (form) {
        /**
         * we've to wait if someone calls preventDefault on the event
         * then we shouldn't submit the form
         */
        window.setTimeout(() => {
          if(!event.defaultPrevented) {
            const fakeButton = document.createElement('button');
            fakeButton.type = this.type;
            fakeButton.style.display = 'none';
            form.appendChild(fakeButton);
            fakeButton.addEventListener('click', (fakeButtonEvent) => {
              fakeButtonEvent.stopPropagation();
            });
            fakeButton.click();
            fakeButton.remove();
          }
        }, 1);
      }
    }
  }
}
