import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  validateProps,
} from '../../utils';
import { getComponentCss } from './tag-dismissible-styles';
import { TAG_DISMISSIBLE_ARIA_ATTRIBUTES, type TagDismissibleAriaAttribute } from './tag-dismissible-utils';

const propTypes: PropTypes<typeof TagDismissible> = {
  label: AllowedTypes.string,
  compact: AllowedTypes.boolean,
  aria: AllowedTypes.aria<TagDismissibleAriaAttribute>(TAG_DISMISSIBLE_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "", "description": "Default slot for the tag content." }
 */
@Component({
  tag: 'p-tag-dismissible',
  shadow: { delegatesFocus: true },
})
export class TagDismissible {
  @Element() public host!: HTMLElement;

  /** Sets the visible label text displayed inside the tag alongside the dismiss button. */
  @Prop() public label?: string;

  /** Sets ARIA attributes on the dismiss button element, for example use `aria-label` to provide a descriptive close action for screen readers. */
  @Prop() public aria?: SelectedAriaAttributes<TagDismissibleAriaAttribute>;

  /** Reduces the tag's padding and height for use in dense layouts where vertical space is limited. */
  @Prop() public compact?: boolean = false;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, !!this.label, this.compact);

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <button type="button" {...parseAndGetAriaAttributes(this.aria)}>
        <span class="sr-only">Remove:</span>
        <span>
          {this.label && <span class="label">{this.label}</span>}
          <slot />
        </span>
        <span class="icon">
          <PrefixedTagNames.pIcon name="close" aria-hidden="true" />
        </span>
      </button>
    );
  }
}
