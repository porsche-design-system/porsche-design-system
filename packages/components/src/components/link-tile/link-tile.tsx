import { Component, Element, h, Prop } from '@stencil/core';
import { attachComponentCss, getPrefixedTagNames } from '../../utils';
import { getComponentCss } from './link-tile-styles';
import type { LinkTarget } from '../../utils/link-button/link-target';
import type { SelectedAriaAttributes } from '../../types';
import type { LinkAriaAttributes } from '../link/link-utils';
import type { AspectRatio, TileLinkAlign, TileLinkWeight } from './link-tile-utils';

@Component({
  tag: 'p-link-tile',
  shadow: { delegatesFocus: true },
})
export class LinkTile {
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
      !!this.size,
      this.weight,
      this.align,
      this.compact,
      this.gradient
    );
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const anchor: JSX.Element =
      this.href === undefined ? (
        <slot name="link" />
      ) : (
        <a class="anchor" href={this.href} target={this.target} download={this.download} rel={this.rel}>
          {this.label}
        </a>
      );

    return (
      <div class="root">
        <div class="image">
          <slot name="image" />
        </div>
        {/* What Aria attribute for gradient as it is only a graphic container? */}
        <div class="content">
          <p>{this.description}</p>
          {this.compact ? (
            <PrefixedTagNames.pLinkPure class="link" hideLabel="true" icon="arrow-right" theme="dark">
              {anchor}
            </PrefixedTagNames.pLinkPure>
          ) : (
            <PrefixedTagNames.pLink class="link" variant="tertiary" theme="dark">
              {anchor}
            </PrefixedTagNames.pLink>
          )}
        </div>
      </div>
    );
  }
}
