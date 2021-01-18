import { Host, Component, Element, h, JSX, Prop } from '@stencil/core';
import {
  calcLineHeightForElement,
  getHTMLElement,
  getPrefixedTagNames,
  improveFocusHandlingForCustomElement,
  insertSlottedStyles,
  isDark,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener,
} from '../../../utils';
import type { BreakpointCustomizable, IconName, LinkTarget, TextSize, TextWeight, Theme } from '../../../types';

@Component({
  tag: 'p-link-pure',
  styleUrl: 'link-pure.scss',
  shadow: true,
})
export class LinkPure {
  @Element() public host!: HTMLElement;

  /** Size of the link. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'small';

  /** The weight of the text (only has effect with visible label). */
  @Prop() public weight?: TextWeight = 'regular';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'arrow-head-right';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string = undefined;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string = undefined;

  /** Display link in active state. */
  @Prop() public active?: boolean = false;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string = undefined;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string = undefined;

  private linkTag: HTMLElement;
  private iconTag: HTMLElement;

  public componentWillLoad(): void {
    this.addSlottedStyles();
  }

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.host);
    transitionListener(this.linkTag, 'font-size', () => {
      const size = calcLineHeightForElement(this.linkTag);
      this.iconTag.style.width = `${size}em`;
      this.iconTag.style.height = `${size}em`;
    });
  }

  public render(): JSX.Element {
    const TagType = this.href === undefined ? 'span' : 'a';

    const linkPureClasses = {
      [prefix('link-pure')]: true,
      [prefix('link-pure--theme-dark')]: isDark(this.theme),
      [prefix('link-pure--active')]: this.active,
      ...mapBreakpointPropToPrefixedClasses('link-pure--size', this.size),
    };

    const iconClasses = prefix('link-pure__icon');

    const labelClasses = {
      [prefix('link-pure__label')]: true,
      ...mapBreakpointPropToPrefixedClasses('link-pure__label-', this.hideLabel, ['hidden', 'visible']),
    };
    const sublineClasses = {
      [prefix('link-pure__subline')]: true,
      ...mapBreakpointPropToPrefixedClasses('link-pure__subline-', this.hideLabel, ['hidden', 'visible']),
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-icon', 'p-text']);

    return (
      <Host>
        <TagType
          class={linkPureClasses}
          {...(TagType === 'a' && {
            href: this.href,
            target: this.target,
            download: this.download,
            rel: this.rel,
          })}
          ref={(el) => (this.linkTag = el as HTMLElement)}
        >
          <PrefixedTagNames.pIcon
            class={iconClasses}
            color="inherit"
            size="inherit"
            name={this.icon}
            source={this.iconSource}
            ref={(el) => (this.iconTag = el as HTMLElement)}
            aria-hidden="true"
          />
          <PrefixedTagNames.pText class={labelClasses} tag="span" color="inherit" size="inherit" weight={this.weight}>
            <slot />
          </PrefixedTagNames.pText>
        </TagType>
        {this.hasSubline && (
          <PrefixedTagNames.pText class={sublineClasses} color="inherit" size="inherit" tag="div">
            <slot name="subline" />
          </PrefixedTagNames.pText>
        )}
      </Host>
    );
  }

  private hasSubline(): boolean {
    return !!getHTMLElement(this.host, '[slot="subline"]');
  }

  private addSlottedStyles(): void {
    const tagName = this.host.tagName.toLowerCase();
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
      outline-offset: 1px !important;
    }

    ${tagName} a:focus::before {
      outline-color: currentColor !important;
    }

    ${tagName} a:focus:not(:focus-visible)::before {
      outline-color: transparent !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
