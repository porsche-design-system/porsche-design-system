import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  LINK_ARIA_ATTRIBUTES,
  parseAndGetAriaAttributes,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './drilldown-link-styles';
import type { DrilldownLinkAriaAttribute, DrilldownLinkTarget } from './drilldown-link-utils';

const propTypes: PropTypes<typeof DrilldownLink> = {
  href: AllowedTypes.string,
  active: AllowedTypes.boolean,
  target: AllowedTypes.string,
  download: AllowedTypes.string,
  rel: AllowedTypes.string,
  aria: AllowedTypes.aria<DrilldownLinkAriaAttribute>(LINK_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "", "description": "Default slot to render the link label." }
 *
 * @experimental
 */
@Component({
  tag: 'p-drilldown-link',
  shadow: { delegatesFocus: true },
})
export class DrilldownLink {
  @Element() public host!: HTMLElement;

  /** When `href` is provided, the component renders as an `<a>` element. Otherwise, provide a slotted anchor element. */
  @Prop() public href?: string;

  /** Displays the link in its active state. */
  @Prop() public active?: boolean = false;

  /** Target attribute where the link should be opened (only has effect when `href` is defined and no slotted anchor is used). */
  @Prop() public target?: DrilldownLinkTarget = '_self';

  /** Sets the native `download` attribute when the target URL points to a downloadable file (only has effect when `href` is defined and no slotted anchor is used). */
  @Prop() public download?: string;

  /** Sets the `rel` attribute on the link (only has effect when `href` is defined and no slotted anchor is used). */
  @Prop() public rel?: string;

  /** Add ARIA attributes (only has effect when `href` is defined and no slotted anchor is used). */
  @Prop() public aria?: SelectedAriaAttributes<DrilldownLinkAriaAttribute>;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-drilldown', 'p-drilldown-item']);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    const hasSlottedAnchor = this.href === undefined;

    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, hasSlottedAnchor, this.active);

    return (
      <Host>
        {hasSlottedAnchor ? (
          <slot />
        ) : (
          <a
            href={this.href}
            target={this.target}
            download={this.download}
            rel={this.rel}
            aria-current={this.active ? 'true' : 'false'}
            {...parseAndGetAriaAttributes(this.aria)}
          >
            <slot />
          </a>
        )}
      </Host>
    );
  }
}
