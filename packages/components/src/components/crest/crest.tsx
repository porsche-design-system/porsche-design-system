import { Component, type ComponentShouldUpdateChanges, Element, Host, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  hasAnyPropValueChanged,
  LINK_ARIA_ATTRIBUTES,
  parseAndGetAriaAttributes,
  validateProps,
} from '../../utils';
import { getComponentCss } from './crest-styles';
import {
  buildCrestImgSrc,
  buildCrestSrcSet,
  type CrestAriaAttribute,
  type CrestTarget,
  crestSize,
} from './crest-utils';

const propTypes: PropTypes<typeof Crest> = {
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  aria: AllowedTypes.aria<CrestAriaAttribute>(LINK_ARIA_ATTRIBUTES),
};

const { width, height } = crestSize;

@Component({
  tag: 'p-crest',
  encapsulation: { type: 'shadow', delegatesFocus: true, clonable: true },
})
export class Crest {
  @Element() public host!: HTMLElement;

  /** When set, renders the crest as an anchor element navigating to this URL when clicked. */
  @Prop() public href?: string;

  /** Specifies where to open the linked URL (e.g. `_self`, `_blank`). Only applies when `href` is set. */
  @Prop() public target?: CrestTarget = '_self';

  /** Sets ARIA attributes on the anchor element to improve accessibility when the crest is used as a link. */
  @Prop() public aria?: SelectedAriaAttributes<CrestAriaAttribute>;

  public componentShouldUpdate(changes: ComponentShouldUpdateChanges): boolean {
    return hasAnyPropValueChanged(changes);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss);

    const picture = (
      <picture>
        <source key="webp" srcSet={buildCrestSrcSet('webp')} type="image/webp" />
        <source key="png" srcSet={buildCrestSrcSet('png')} type="image/png" />
        <img src={buildCrestImgSrc()} width={width} height={height} alt="Porsche" />
      </picture>
    );

    return (
      <Host>
        {this.href === undefined ? (
          picture
        ) : (
          <a href={this.href} target={this.target} {...parseAndGetAriaAttributes(this.aria)}>
            {picture}
          </a>
        )}
      </Host>
    );
  }
}
