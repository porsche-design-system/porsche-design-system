import { JSX, Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';
import {TextVariant, TextColor} from '../../../types';
import { IconName } from '../../icon/icon/icon-name';

@Component({
  tag: 'p-text-link',
  styleUrl: 'text-link.scss',
  shadow: true
})
export class TextLink {
  /** Target url to where the component should link to. */
  @Prop() public href?: string = '#';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: 'self' | 'blank' | 'parent' | 'top' = 'self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string = undefined;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string = undefined;

  /** The style of the text. */
  @Prop() public variant?: TextVariant = 'copy';

  /** The icon shown next to the label. */
  @Prop() public icon?: IconName = 'icon_arrow-right-hair';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string = undefined;

  /** Basic text color variations. */
  @Prop() public color?: TextColor = 'porsche-black';

  /** Set a custom HTML tag depending of the usage of the component. */
  @Prop() public tag?: 'span' | 'a' = 'a';

  /** Emitted when the link is clicked. */
  @Event() public pClick!: EventEmitter<void>;

  public render(): JSX.Element {
    const TagType: any = this.tag;

    const textLinkClasses = cx(
      prefix('text-link'),
      prefix(`text-link--color-${this.color}`)
    );

    const iconClasses = cx(
      prefix('text-link__icon'),
      prefix(`text-link__icon--${this.variant}`)
    );

    const textClasses = cx(
      prefix('text-link__text')
    );

    return (
      <TagType
        {...(TagType === 'a' ? { href: this.href, target: `_${this.target}`, download: this.download, rel: this.rel } : null)}
        onClick={(e) => this.onClick(e)}
        class={textLinkClasses}
      >
        <p-icon class={iconClasses} name={this.icon} source={this.iconSource} color='inherit' size='inherit' />
        <p-text class={textClasses} tag='span' color='inherit' variant={this.variant}>
          <slot />
        </p-text>
      </TagType>
    );
  }

  private onClick(event): void {
    this.pClick.emit(event);
  }
}
