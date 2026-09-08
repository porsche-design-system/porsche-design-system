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

  /** When set, the component renders as an anchor navigating to this URL. Otherwise, provide a slotted anchor element. */
  @Prop() public href?: string;

  /** Visually marks the link as the currently active navigation item, e.g. the current page. */
  @Prop() public active?: boolean = false;

  /** Specifies where to open the linked URL (e.g. `_self`, `_blank`). Only applies when `href` is set. */
  @Prop() public target?: DrilldownLinkTarget = '_self';

  /** Sets the native `download` attribute to trigger a file download. Only applies when `href` is set. */
  @Prop() public download?: string;

  /** Sets the `rel` attribute on the link element (e.g. `noopener`). Only applies when `href` is set. */
  @Prop() public rel?: string;

  /** Sets ARIA attributes on the link for improved accessibility. Only applies when `href` is set. */
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
