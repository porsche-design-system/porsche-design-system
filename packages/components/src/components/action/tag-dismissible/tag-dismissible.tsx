import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { attachComponentCss, getPrefixedTagNames } from '../../../utils';
import type { TagDismissibleColor } from './tag-dismissible-utils';
import { getComponentCss } from './tag-dismissible-styles';

@Component({
  tag: 'p-tag-dismissible',
  shadow: true,
})
export class TagStatus {
  @Element() public host!: HTMLElement;

  /** Background color variations depending on theme property. */
  @Prop() public color?: TagDismissibleColor = 'background-surface';

  /** The label text. */
  @Prop() public label?: string = '';

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.color, !!this.label);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <button type="button" aria-live="polite">
        <div>
          {this.label && <p class="label">{this.label}</p>}
          <slot />
        </div>
        <PrefixedTagNames.pIcon class="icon" name="close" color="inherit" aria-hidden="true" />
      </button>
    );
  }
}
