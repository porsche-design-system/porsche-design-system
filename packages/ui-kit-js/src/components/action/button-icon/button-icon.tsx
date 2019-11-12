import { JSX, Component, Prop, h, Element, Listen } from '@stencil/core';
import cx from 'classnames';
import { prefix, hasShadowDom } from '../../../utils';
import { IconName } from '../../icon/icon/icon-name';
import { improveFocusHandlingForCustomElement, preventNativeTabIndex } from '../../../utils/focusHandling';

@Component({
  tag: 'p-button-icon',
  styleUrl: 'button-icon.scss',
  shadow: true
})
export class ButtonIcon {
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

  /** To remove the element from tab order */
  @Prop() public tabbable?: boolean = true;

  /** Specifies the type of the button when no href prop is defined. */
  @Prop() public type?: 'button' | 'submit' | 'reset' = 'button';

  /** When providing an url then the component will be rendered as `<a>` instead of `<button>` tag. */
  @Prop() public href?: string = undefined;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: 'self' | 'blank' | 'parent' | 'top' = 'self';

  /** A visually hidden label text to improve accessibility which describes the function behind the button. */
  @Prop() public label?: string = undefined;

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** The style variant of the button. */
  @Prop() public variant?: 'ghost' | 'transparent' | 'default' = 'default';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'plus';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string = undefined;

  /** Adapts the button color when used on dark background. */
  @Prop() public theme?: 'light' | 'dark' = 'light';

  public componentDidLoad() {
    improveFocusHandlingForCustomElement(this.element);
  }

  public render(): JSX.Element {
    preventNativeTabIndex(this);
    const TagType = this.href === undefined ? 'button' : 'a';

    const buttonClasses = cx(
      prefix('button-icon'),
      this.variant !== 'default' && prefix(`button-icon--${this.variant}`),
      this.loading && prefix('button-icon--loading'),
      this.theme === 'dark' && prefix('button-icon--theme-dark')
    );
    const iconClasses = prefix('button-icon__icon');
    const spinnerClasses = prefix('button-icon__spinner');

    return (
      <TagType
        class={buttonClasses}
        {...(TagType === 'button'
          ? { type: this.type, disabled: this.disabled || this.loading, 'aria-label': this.label }
          : { href: this.href, target: `_${this.target}`, 'aria-disabled': String(this.disabled || this.loading) })}
        tabindex={this.tabbable ? 0 : -1}
      >
        {this.loading ? (
          <p-spinner class={spinnerClasses} size='x-small' theme={this.useInvertedLoader()} />
        ) : (
          <p-icon class={iconClasses} size='medium' name={this.icon} source={this.iconSource} />
        )}
      </TagType>
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
      if (!this.href) {
        /**
         * we don't want to submit the form twice,
         * but links should still work
         */
        event.preventDefault();
      }
      this.element.click();
    }
  }

  @Listen('click')
  public onClick(event: MouseEvent): void {
    if (!this.href && this.type === 'submit' && hasShadowDom(this.element)) {
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

  private useInvertedLoader(): 'light' | 'dark' {
    return (this.variant !== 'ghost' && this.variant !== 'transparent') || this.theme === 'dark' ? 'dark' : 'light';
  }
}
