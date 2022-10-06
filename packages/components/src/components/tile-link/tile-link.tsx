import { Component, Element, h, Prop } from '@stencil/core';
import { ThemeExtendedElectric } from '../../utils/theme';
import { LinkTarget } from '../../utils/link-button/link-target';
import { SelectedAriaAttributes } from '../../types';
import { LinkAriaAttributes } from '../link/link-utils';

@Component({
  tag: 'p-tile-link',
  shadow: { delegatesFocus: true },
})
export class TileLink {
  @Element() public host!: HTMLElement;

  /** Size of the description. Only to be used if custom size 'inherit' is needed. */
  @Prop() public size?: 'inherit';

  /** Label of the <a />. */
  @Prop() public label?: string;

  /** Description text. */
  @Prop() public description?: string;

  /** Alignment of link and description. */
  @Prop() public align?: 'top' | 'bottom' = 'bottom';

  /** Show gradient. */
  @Prop() public gradient?: boolean = true;

  /** Displays the tile-link as compact version with description and link icon only. */
  @Prop() public compact?: boolean = false;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Adapts the link color when used on dark background. */
  @Prop() public theme?: ThemeExtendedElectric = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkAriaAttributes>;

  public render(): JSX.Element {
    return <button>Hello World</button>;
  }
}
