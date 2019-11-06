import { JSX, Component, Prop, h, Element, Listen } from '@stencil/core';
import {Theme} from '../../../types';
import cx from 'classnames';
import { prefix } from '../../../utils';
import { improveFocusHandlingForCustomElement, preventNativeTabIndex } from '../../../utils/focusHandling';

@Component({
  tag: 'p-link-icon',
  styleUrl: 'link-icon.scss',
  shadow: true
})
export class LinkIcon {
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

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string = '';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: 'self' | 'blank' | 'parent' | 'top' = 'self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string = undefined;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string = undefined;

  /** The style variant of the link. */
  @Prop() public variant?: 'ghost' | 'default' = 'default';

  /** The icon shown. */
  @Prop() public icon?: string = 'plus';

  /** Adapts the link color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  public componentDidLoad() {
    improveFocusHandlingForCustomElement(this.element);
  }

  public render(): JSX.Element {
    preventNativeTabIndex(this);

    const linkClasses = cx(
      prefix('link-icon'),
      this.variant !== 'default' && prefix(`link-icon--${this.variant}`),
      this.theme !== 'light' && prefix('link-icon--theme-dark')
    );
    const iconClasses = prefix('link-icon__icon');

    return (
      <a
        class={linkClasses}
        href={this.href}
        target={`_${this.target}`}
        download={this.download}
        rel={this.rel}
        tabindex={this.tabbable ? 0 : -1}
      >
        <p-icon class={iconClasses} size='medium' source={this.icon} />
      </a>
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
      this.element.click();
    }
  }
}
