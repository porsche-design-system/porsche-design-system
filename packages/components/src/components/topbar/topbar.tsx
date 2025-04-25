import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  LINK_ARIA_ATTRIBUTES,
  THEMES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './topbar-styles';
import type { TopbarAriaAttribute } from './topbar-utils';

const propTypes: PropTypes<typeof Topbar> = {
  href: AllowedTypes.string,
  gradient: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  aria: AllowedTypes.aria<TopbarAriaAttribute>(LINK_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "start", "description": "Renders an area on the **start** side (dir=ltr: left, dir=rtl: right)." }
 * @slot {"name": "end", "description": "Renders an area on the **end** side (dir=ltr: right, dir=rtl: left)." }
 * @slot {"name": "top", "description": "Renders an area above the topbar." }
 * @slot {"name": "bottom", "description": "Renders an area underneath the topbar." }
 */
@Component({
  tag: 'p-topbar',
  shadow: true,
})
export class Topbar {
  @Element() public host!: HTMLElement;

  /** When providing an url then the crest/wordmark will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Shows a gradient, useful when the component is used on top of an image or video. When gradient is enabled, then the component will be forced to be rendered with dark theme. */
  @Prop() public gradient?: boolean = false;

  /** Adapts the coloring depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<TopbarAriaAttribute>;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.gradient);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <header>
        <slot name="top" />
        <slot name="start" />
        <PrefixedTagNames.pCrest class="crest" href={this.href} aria={this.aria} />
        <PrefixedTagNames.pWordmark
          class="wordmark"
          href={this.href}
          aria={this.aria}
          theme={this.gradient ? 'dark' : this.theme}
        />
        <slot name="end" />
        <slot name="bottom" />
      </header>
    );
  }
}
