import { JSX, Component, Prop, State, h, Element, Listen } from '@stencil/core';
import cx from 'classnames';
import { prefix, hasShadowDom } from '../../../utils';
import { IconName } from '../../icon/icon/icon-name';
import { improveFocusHandlingForCustomElement, preventNativeTabIndex } from '../../../utils/focusHandling';
import {ButtonType, Theme} from '../../../types';

@Component({
  tag: 'p-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {
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

  /** A visually hidden label text to improve accessibility which describes the function behind the button. */
  @Prop() public allyLabel?: string = undefined;

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** The style variant of the button. */
  @Prop() public variant?: 'primary' | 'secondary' | 'tertiary' = 'secondary';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'plus';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string = undefined;

  /** Adapts the button color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Show or hide label */
  @Prop() public hideLabel?: boolean = false;

  @State() public isSlotDefined?: boolean;

  private slots: NodeListOf<ChildNode>;

  public componentWillLoad() {
    this.slots  = this.element.childNodes;
    // this.slots.length !== 0 ? this.isSlotDefined = true : this.isSlotDefined = false;
    this.slots.length === 0 || this.hideLabel && this.slots.length !== 0 ? this.isSlotDefined = false : this.isSlotDefined = true;
  }

  public componentDidLoad() {
    improveFocusHandlingForCustomElement(this.element);
    // console.log(this.element);
    // console.log('123', this.element.shadowRoot.querySelectorAll('slot'));
  }

  public componentWillUpdate() {
    this.slots.length === 0 || this.hideLabel && this.slots.length !== 0 ? this.isSlotDefined = false : this.isSlotDefined = true;
  }

  public render(): JSX.Element {
    preventNativeTabIndex(this);

    const buttonClasses = cx(
      prefix('button'),
      this.variant !== 'secondary' && prefix(`button--${this.variant}`),
      this.theme !== 'light' && prefix('button--theme-dark')
    );
    const iconClasses = prefix('button__icon');
    const spinnerClasses = prefix('button__spinner');
    const labelClasses = prefix('button__label');

    return (
      <button
        class={buttonClasses}
        type={this.type}
        disabled={this.disabled || this.loading}
        aria-label={this.allyLabel}
        tabindex={this.tabbable ? 0 : -1}
      >
        {this.isSlotDefined ? (
          <p-text tag='span' color='inherit' class={labelClasses}>
            <slot/>
          </p-text>
        ) : null}
        {this.loading ? (
          <p-spinner class={spinnerClasses} size='x-small' theme={this.useInvertedLoader()} />
        ) : (
          <p-icon class={iconClasses} size='inherit' name={this.icon} source={this.iconSource} />
        )}
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

  private useInvertedLoader(): Theme {
    return this.variant !== 'tertiary' || this.theme === 'dark' ? 'dark' : 'light';
  }

}
