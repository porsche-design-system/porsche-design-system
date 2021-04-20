import { Component, Element, h, JSX, Prop } from '@stencil/core';
import {
  getPrefixedTagNames,
  getTagName,
  improveFocusHandlingForCustomElement,
  insertSlottedStyles,
  isDark,
  mapBreakpointPropToPrefixedClasses,
} from '../../../utils';
import type { BreakpointCustomizable, LinkTarget, Theme } from '../../../types';

@Component({
  tag: 'p-link-social',
  styleUrl: 'link-social.scss',
  shadow: true,
})
export class LinkSocial {
  @Element() public host!: HTMLElement;

  /** The icon shown. */
  @Prop() public icon?:
    | 'logo-facebook'
    | 'logo-google'
    | 'logo-instagram'
    | 'logo-linkedin'
    | 'logo-pinterest'
    | 'logo-twitter'
    | 'logo-wechat'
    | 'logo-whatsapp'
    | 'logo-xing'
    | 'logo-youtube'
    | 'logo-baidu'
    | 'logo-delicious'
    | 'logo-digg'
    | 'logo-foursquare'
    | 'logo-gmail'
    | 'logo-hatena'
    | 'logo-kaixin'
    | 'logo-qq-share'
    | 'logo-qq'
    | 'logo-skyrock'
    | 'logo-sohu'
    | 'logo-tecent'
    | 'logo-telegram'
    | 'logo-tumblr'
    | 'logo-viber'
    | 'logo-vk'
    | 'logo-weibo'
    | 'logo-yahoo'
    | 'logo-youku' = undefined;

  /** A custom URL path to a custom social icon. */
  @Prop() public iconSource?: string = undefined;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string = undefined;

  /** Adapts the icon color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string = undefined;

  /** Show or hide label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  public connectedCallback(): void {
    this.addSlottedStyles();
    improveFocusHandlingForCustomElement(this.host);
  }

  public render(): JSX.Element {
    const TagType = this.href === undefined ? 'span' : 'a';

    const linkClasses = {
      ['link']: true,
      [`link--${this.icon}`]: true, // can produce link--undefined on purpose
      ['link--theme-dark']: isDark(this.theme),
      ...mapBreakpointPropToPrefixedClasses('link-', this.hideLabel, ['without-label', 'with-label'], true),
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <TagType
        class={linkClasses}
        {...(TagType === 'a' && {
          href: this.href,
          target: this.target,
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
    );
  }

  private addSlottedStyles(): void {
    const tagName = getTagName(this.host);
    const style = `
    /* this hack is only needed for Safari which does not support pseudo elements in slotted context (https://bugs.webkit.org/show_bug.cgi?id=178237) :-( */
    ${tagName} a::before {
      content: "" !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      display: block !important;
      outline: transparent solid 1px !important;
      outline-offset: 2px !important;
    }

    ${tagName} a:focus::before {
      outline-color: #000 !important;
    }

    ${tagName}[theme="dark"] a:focus::before {
      outline-color: #fff !important;
    }

    ${tagName} a:focus:not(:focus-visible)::before,
    ${tagName}[theme="dark"] a:focus:not(:focus-visible)::before {
      outline-color: transparent !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
