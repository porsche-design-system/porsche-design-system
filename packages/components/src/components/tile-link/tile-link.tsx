import { Component, Element, h, Prop } from '@stencil/core';
import { attachComponentCss, getPrefixedTagNames } from '../../utils';
import { getComponentCss } from './tile-link-styles';
import type { ThemeExtendedElectric } from '../../utils/theme';
import type { LinkTarget } from '../../utils/link-button/link-target';
import type { SelectedAriaAttributes } from '../../types';
import type { LinkAriaAttributes } from '../link/link-utils';
import type { AspectRatio, TileLinkAlign, TileLinkWeight } from './tile-link-utils';

@Component({
  tag: 'p-tile-link',
  shadow: { delegatesFocus: true },
})
export class TileLink {
  @Element() public host!: HTMLElement;

  /** Font size of the description. Only to be used if custom size 'inherit' is needed. */
  @Prop() public size?: 'inherit';

  /** Font weight of the description. Only to be used if custom size 'inherit' is needed. */
  @Prop() public weight?: TileLinkWeight = 'regular';

  /** Font weight of the description. Only to be used if custom size 'inherit' is needed. */
  @Prop() public aspectRatio?: AspectRatio = '4:3';

  /** Label of the <a />. */
  @Prop() public label: string;

  /** Description text. */
  @Prop() public description: string;

  /** Alignment of link and description. */
  @Prop() public align?: TileLinkAlign = 'bottom';

  /** Show gradient. */
  @Prop() public gradient?: boolean = true;

  /** Displays the tile-link as compact version with description and link icon only. */
  @Prop() public compact?: boolean = false;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Adapts the link color when used on dark background. */
  @Prop() public theme?: ThemeExtendedElectric = 'dark';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkAriaAttributes>;

  public componentWillRender(): void {
    // TODO add validate Props
    attachComponentCss(
      this.host,
      getComponentCss,
      this.aspectRatio,
      this.theme,
      !!this.size,
      this.weight,
      this.align,
      this.gradient,
      this.compact
    );
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class="aspect-ratio-container">
        <div class="aspect-ratio-box">
          <div class="root">
            <slot />
            <div class="content">
              <p>{this.description}</p>
              {this.compact ? (
                <PrefixedTagNames.pLinkPure theme={this.theme} hideLabel="true" icon="arrow-right">
                  <a class="link" href={this.href}>
                    {this.label}
                  </a>
                </PrefixedTagNames.pLinkPure>
              ) : (
                <PrefixedTagNames.pLink variant="tertiary" theme={this.theme}>
                  <a class="link" href={this.href}>
                    {this.label}
                  </a>
                </PrefixedTagNames.pLink>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
