import { JSX, Component, Prop, h, Event, EventEmitter, Element } from '@stencil/core';
import cx from 'classnames';
import { prefix, hasShadowDom } from '../../../utils';
import { IconName } from '../../icon/icon/icon-name';

@Component({
  tag: 'p-button-icon',
  styleUrl: 'button-icon.scss',
  shadow: true
})
export class ButtonIcon {
  @Element() public element!: HTMLElement;

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

  /** Emitted when the button is clicked. */
  @Event() public pClick!: EventEmitter<void>;

  /** Emitted when the button has focus. */
  @Event() public pFocus!: EventEmitter<void>;

  /** Emitted when the button loses focus. */
  @Event() public pBlur!: EventEmitter<void>;

  public render(): JSX.Element {
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
        onClick={(e) => this.onClick(e)}
        onFocus={(e) => this.onFocus(e)}
        onBlur={(e) => this.onBlur(e)}
      >
        {this.loading ? (
          <p-spinner class={spinnerClasses} size='x-small' theme={this.useInvertedLoader()} />
        ) : (
          <p-icon class={iconClasses} size='medium' icon={this.icon} source={this.iconSource} />
        )}
      </TagType>
    );
  }

  private onClick(event: any): void {
    this.pClick.emit(event);

    if (!this.href && this.type === 'submit' && hasShadowDom(this.element)) {
      // Why? That's why: https://www.hjorthhansen.dev/shadow-dom-and-forms/
      const form = this.element.closest('form');
      if (form) {
        event.preventDefault();

        const fakeButton = document.createElement('button');
        fakeButton.type = this.type;
        fakeButton.style.display = 'none';
        form.appendChild(fakeButton);
        fakeButton.click();
        fakeButton.remove();
      }
    }
  }

  private onFocus(event: any): void {
    this.pFocus.emit(event);
  }

  private onBlur(event: any): void {
    this.pBlur.emit(event);
  }

  private useInvertedLoader(): 'light' | 'dark' {
    return (this.variant !== 'ghost' && this.variant !== 'transparent') || this.theme === 'dark' ? 'dark' : 'light';
  }
}
