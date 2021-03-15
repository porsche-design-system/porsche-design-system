import { JSX, Component, Prop, h, Host, Element } from '@stencil/core';
import { getClosestHTMLElement, getPrefixedTagNames, isDark, prefix } from '../../../../utils';
import type { Theme } from '../../../../types';

@Component({
  tag: 'p-text-list',
  styleUrl: 'text-list.scss',
  shadow: true,
})
export class TextList {
  @Element() public host!: HTMLElement;

  /** The type of the text list. */
  @Prop({ reflect: true }) public listType?: 'unordered' | 'ordered' = 'unordered';

  /** The list style type of an ordered list. */
  @Prop({ reflect: true }) public orderType?: 'numbered' | 'alphabetically' = 'numbered';

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    const TagType = this.listType === 'unordered' ? 'ul' : 'ol';
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const isNestedList = !!getClosestHTMLElement(this.host, PrefixedTagNames.pTextListItem);

    const textListClasses = {
      [prefix('text-list')]: true,
      [prefix(`text-list--${this.listType}`)]: true,
      [prefix('text-list--theme-dark')]: isDark(this.theme),
      [prefix('text-list--nested')]: isNestedList,
    };

    return (
      <Host nested={isNestedList}>
        <TagType role="list" class={textListClasses}>
          <slot />
        </TagType>
      </Host>
    );
  }
}
