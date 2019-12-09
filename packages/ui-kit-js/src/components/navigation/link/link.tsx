import { JSX, Component, Prop, h, Element, Listen } from '@stencil/core';
import cx from 'classnames';
import { BreakpointCustomizable, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import { IconName } from '../../icon/icon/icon-name';
import { improveFocusHandlingForCustomElement, preventNativeTabIndex } from '../../../utils/focusHandling';
import { Theme, LinkTarget } from '../../../types';

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

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string = undefined;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string = undefined;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  public componentDidLoad() {
    improveFocusHandlingForCustomElement(this.element);
  }

  public render(): JSX.Element {
    preventNativeTabIndex(this);

    const TagType = this.href === undefined ? 'span' : 'a';

    const linkClasses = cx(
      prefix('link'),
      prefix(`link--${this.variant}`),
      mapBreakpointPropToPrefixedClasses('link-', this.hideLabel, ['without-label', 'with-label']),
      prefix(`link--theme-${this.theme}`)
    );
    const iconClasses = prefix('link__icon');
    const labelClasses = prefix('link__label');

    return (
      <TagType
        class={linkClasses}
        href={this.href}
        {...(TagType === 'a' ? { href: this.href, target: `${this.target}`, download: this.download, rel: this.rel } : null)}
        {...(TagType === 'a' && this.tabbable ? { tabindex: 0 } : { tabindex: -1 })}
      >
        <p-icon
          class={iconClasses}
          size='inherit'
          name={this.icon}
          source={this.iconSource}
        />
        <p-text tag='span' color='inherit' class={labelClasses}>
          <slot/>
        </p-text>
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
