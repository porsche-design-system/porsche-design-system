import { Component, Element, h, JSX, Prop } from '@stencil/core';
import {
  attachComponentCss,
  getPrefixedTagNames,
  parseAndGetAriaAttributes,
  throwIfValueIsInvalid,
} from '../../../utils';
import { getComponentCss } from './tag-dismissible-styles';
import { TAG_DISMISSIBLE_ARIA_ATTRIBUTES, TAG_DISMISSIBLE_COLORS } from './tag-dismissible-utils';
import type { TagDismissibleColor, TagDismissibleAriaAttribute } from './tag-dismissible-utils';
import type { SelectedAriaAttributes } from '../../../types';

@Component({
  tag: 'p-tag-dismissible',
  shadow: { delegatesFocus: true },
})
export class TagDismissible {
  @Element() public host!: HTMLElement;

  /** Background color variations */
  @Prop() public color?: TagDismissibleColor = 'background-surface';

  /** The label text. */
  @Prop() public label?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<TagDismissibleAriaAttribute>;

  public componentWillRender(): void {
    throwIfValueIsInvalid(this.color, TAG_DISMISSIBLE_COLORS, 'color');
    attachComponentCss(this.host, getComponentCss, this.color, !!this.label);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <button
        type="button"
        aria-live="polite"
        {...parseAndGetAriaAttributes(this.aria, TAG_DISMISSIBLE_ARIA_ATTRIBUTES)}
      >
        <span class="sr-only">Remove:</span>
        {this.label && <span class="label">{this.label}</span>}
        <slot />
        <PrefixedTagNames.pIcon class="icon" name="close" color="inherit" aria-hidden="true" />
      </button>
    );
  }
}
