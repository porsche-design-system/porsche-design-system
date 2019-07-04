import { JSX, Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils/prefix';
import { Components } from '../../../index';

@Component({
  tag: 'p-text-link',
  styleUrl: 'text-link.scss',
  shadow: true
})
export class TextLink {
  /** Target url to where the component should link to. */
  @Prop({ reflect: true }) public href: string = '#';

  /** Target attribute where the link should be opened. */
  @Prop({ reflect: true }) public target?: 'self' | 'blank' | 'parent' | 'top' = 'self';

  /** Special download attribute to open native Browser download dialog if target url points to a downloadable file. */
  @Prop({ reflect: true }) public download?: boolean = false;

  /** The style of the text. */
  @Prop() public type?: Components.PText['type'] = 'copy';

  /** The icon shown next to the label. */
  @Prop() public icon?: string = 'arrow-right-hair';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: 'light' | 'dark' = 'light';

  /** Set a custom HTML tag depending of the usage of the component. */
  @Prop() public tag?:
    | 'span'
    | 'a' = 'a';

  /** Emitted when the link is clicked. */
  @Event() public pClick!: EventEmitter<void>;

  public render(): JSX.Element {
    const TagType: any = this.tag;

    const textLinkClasses = cx(prefix('text-link'), this.theme === 'dark' && prefix('text-link--theme-dark'));
    const iconClasses = cx(this.type && prefix(`text-link__icon--${this.type}`));

    return (
      <TagType
        {...(TagType === 'a'
          ? { href: this.href, target: `_${this.target}`, download: this.download }
          : null)}
        onClick={(e) => this.onClick(e)}
        class={textLinkClasses}
      >
        <p-icon source={this.icon} size='inherit' color='inherit' class={iconClasses} />
        <p-text type={this.type} color='inherit' tag='span'>
          <slot />
        </p-text>
      </TagType>
    );
  }

  private onClick(event): void {
    this.pClick.emit(event);
  }
}
