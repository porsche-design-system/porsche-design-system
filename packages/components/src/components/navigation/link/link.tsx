import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import {
  getPrefixedTagNames,
  improveFocusHandlingForCustomElement,
  isDark,
  mapBreakpointPropToClasses,
  getThemeDarkAttribute,
} from '../../../utils';
import type { BreakpointCustomizable, IconName, LinkTarget, LinkVariant, Theme } from '../../../types';
import { addComponentCss, addSlottedCss } from './link-styles';

@Component({
  tag: 'p-link',
  styleUrl: 'link.scss',
  shadow: true,
})
export class Link {
  @Element() public host!: HTMLElement;

  /** The style variant of the link. */
  @Prop() public variant?: LinkVariant = 'secondary';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'arrow-head-right';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Adapts the link color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  public connectedCallback(): void {
    addComponentCss(this.host, this.variant, this.theme);
    addSlottedCss(this.host);
    improveFocusHandlingForCustomElement(this.host);
  }

  public render(): JSX.Element {
    const TagType = this.href === undefined ? 'span' : 'a';

    const rootClasses = {
      ['root']: true,
      [`root--${this.variant}`]: this.variant !== 'secondary',
      ['root--theme-dark']: isDark(this.theme),
      ...mapBreakpointPropToClasses('root-', this.hideLabel, ['without-label', 'with-label']),
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host {...getThemeDarkAttribute(this.theme)}>
        <TagType
          class={rootClasses}
          {...(TagType === 'a' && {
            href: this.href,
            target: `${this.target}`,
            download: this.download,
            rel: this.rel,
          })}
        >
          <PrefixedTagNames.pIcon
            class="icon"
            size="inherit"
            name={this.icon}
            source={this.iconSource}
            color="inherit"
            aria-hidden="true"
          />
          <PrefixedTagNames.pText tag="span" color="inherit" class="label">
            <slot />
          </PrefixedTagNames.pText>
        </TagType>
      </Host>
    );
  }
}
