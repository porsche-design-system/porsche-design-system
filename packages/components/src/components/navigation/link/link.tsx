import { Component, Element, h, JSX, Prop } from '@stencil/core';
import {
  getPrefixedTagNames,
  improveFocusHandlingForCustomElement,
  insertSlottedStyles,
  isDark,
  mapBreakpointPropToPrefixedClasses,
  prefix,
} from '../../../utils';
import type { BreakpointCustomizable, IconName, LinkTarget, LinkVariant, Theme } from '../../../types';

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

  public connectedCallback(): void {
    this.addSlottedStyles();
    improveFocusHandlingForCustomElement(this.host);
  }

  public render(): JSX.Element {
    const TagType = this.href === undefined ? 'span' : 'a';

    const linkClasses = {
      [prefix('link')]: true,
      [prefix(`link--${this.variant}`)]: true,
      [prefix('link--theme-dark')]: isDark(this.theme),
      ...mapBreakpointPropToPrefixedClasses('link-', this.hideLabel, ['without-label', 'with-label']),
    };
    const iconClasses = prefix('link__icon');
    const labelClasses = prefix('link__label');

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-icon', 'p-text']);

    return (
      <TagType
        class={linkClasses}
        {...(TagType === 'a' && {
          href: this.href,
          target: `${this.target}`,
          download: this.download,
          rel: this.rel,
        })}
      >
        <PrefixedTagNames.pIcon
          class={iconClasses}
          size="inherit"
          name={this.icon}
          source={this.iconSource}
          color="inherit"
          aria-hidden="true"
        />
        <PrefixedTagNames.pText tag="span" color="inherit" class={labelClasses}>
          <slot />
        </PrefixedTagNames.pText>
      </TagType>
    );
  }

  private addSlottedStyles(): void {
    const tagName = this.host.tagName.toLowerCase();
    const style = `
    /* this hack is only needed for Safari which does not support pseudo elements in slotted context (https://bugs.webkit.org/show_bug.cgi?id=178237) :-( */
    ${tagName} a::before {
      content: "" !important;
      position: absolute !important;
      top: -1px !important;
      left: -1px !important;
      right: -1px !important;
      bottom: -1px !important;
      display: block !important;
      outline: transparent solid 1px !important;
      outline-offset: 2px !important;
    }

    ${tagName} a:focus::before {
      outline-color: #323639 !important;
    }

    ${tagName}[theme="dark"] a:focus::before {
      outline-color: #fff !important;
    }

    ${tagName}[variant="primary"] a:focus::before,
    ${tagName}[theme="dark"][variant="primary"] a:focus::before {
      outline-color: #d5001c !important;
    }

    ${tagName} a:focus:not(:focus-visible)::before,
    ${tagName}[theme="dark"] a:focus:not(:focus-visible)::before,
    ${tagName}[variant="primary"] a:focus:not(:focus-visible)::before,
    ${tagName}[theme="dark"][variant="primary"] a:focus:not(:focus-visible)::before {
      outline-color: transparent !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
