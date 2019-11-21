import { JSX, Component, Prop, State, h, Element, Listen } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';
import { IconName } from '../../icon/icon/icon-name';
import { improveFocusHandlingForCustomElement, preventNativeTabIndex } from '../../../utils/focusHandling';
import {Theme} from '../../../types';

@Component({
  tag: 'p-link',
  styleUrl: 'link.scss',
  shadow: true
})
export class Link {
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

  /** A visually hidden label text to improve accessibility which describes the function behind the link. */
  @Prop() public allyLabel?: string = undefined;

  /** The style variant of the link. */
  @Prop() public variant?: 'primary' | 'secondary' | 'tertiary' = 'secondary';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'arrow-right-hair';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string = undefined;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string = undefined;

  /** Adapts the link color when used on dark background. */
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

    const TagType = this.href === undefined ? 'span' : 'a';

    const linkClasses = cx(
      prefix('link'),
      this.variant !== 'secondary' && prefix(`link--${this.variant}`),
      this.theme !== 'light' && prefix('link--theme-dark')
    );
    const iconClasses = prefix('link__icon');
    const labelClasses = prefix('link__label');

    return (
      <TagType
        class={linkClasses}
        aria-label={this.allyLabel}
        tabindex={this.tabbable ? 0 : -1}
        href={this.href}
      >
        {this.isSlotDefined ? (
          <p-text tag='span' color='inherit' class={labelClasses}>
            <slot/>
          </p-text>
        ) : null}
        <p-icon class={iconClasses} size='inherit' name={this.icon} source={this.iconSource} />
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
      event.preventDefault();
      this.element.click();
    }
  }

}
