import { JSX, Component, Prop, h, Element, Event, EventEmitter } from '@stencil/core';
import { prefix, getPrefixedTagNames, insertSlottedStyles } from '../../../utils';

@Component({
  tag: 'p-banner',
  styleUrl: 'banner.scss',
  shadow: true
})
export class Banner {
  @Element() public host!: HTMLElement;

  /** State of the banner. */
  @Prop() public state?: 'error' | 'warning' | 'neutral' = 'neutral';

  /** Position of the banner. */
  @Prop() public position?: 'inline' | 'overlay' = 'overlay';

  /** Defines if the banner can be closed/removed by the user. */
  @Prop() public persistent?: boolean = false;

  /** Adapts the banner color depending on the theme. */
  @Prop() public theme?: 'light' | 'dark' = 'light';

  /** Emitted when the close button is clicked. */
  @Event() public closeOnClick?: EventEmitter;

  public componentWillLoad(): void {
    this.addSlottedStyles();
  }

  public render(): JSX.Element {
    const bannerClasses = {
      [prefix('banner')]: true,
      [prefix(`banner--${this.state}`)]: true,
      [prefix(`banner--${this.position}`)]: true,
      [prefix(`banner--theme-${this.theme}`)]: true
    };

    const contentClasses = prefix('banner__content');
    const iconClasses = prefix('banner__icon');
    const titleClasses = prefix('banner__title');
    const descriptionClasses = prefix('banner__description');
    const buttonClasses = prefix('banner__button');

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-headline', 'p-text', 'p-icon', 'p-button-pure']);

    return (
      <div class={bannerClasses} role="alert">
        {this.state !== 'neutral' && (
          <PrefixedTagNames.pIcon name={this.state === 'error' ? 'exclamation' : 'warning'} class={iconClasses}/>
        )}
        <div class={contentClasses}>
          {this.isTitleDefined && (
            <PrefixedTagNames.pHeadline variant="headline-5" class={titleClasses}><slot name="title"/></PrefixedTagNames.pHeadline>
          )}
          {this.isDescriptionDefined && (
            <PrefixedTagNames.pText class={descriptionClasses}><slot name="description"/></PrefixedTagNames.pText>
          )}
          {!this.persistent && (
            <PrefixedTagNames.pButtonPure icon="close" hideLabel={true} class={buttonClasses} onClick={(e: MouseEvent) => this.handleClick(e)}>Close notification</PrefixedTagNames.pButtonPure>
          )}
        </div>
      </div>
    );
  }

  private handleClick (e: MouseEvent): void {
    this.closeOnClick.emit(e);
  }

  private get isTitleDefined(): boolean {
    return !!this.host.querySelector('[slot="title"]');
  }

  private get isDescriptionDefined(): boolean {
    return !!this.host.querySelector('[slot="description"]');
  }

  private addSlottedStyles(): void {
    const tagName = this.host.tagName.toLowerCase();
    const style = `${tagName} a {
      outline: none transparent;
      color: inherit;
      text-decoration: underline;
      -webkit-transition: outline-color .24s ease, color .24s ease;
      transition: outline-color .24s ease, color .24s ease;
    }

    ${tagName} a:hover {
      color: #d5001c;
    }

    ${tagName} a:focus {
      outline: 2px solid #00d5b9;
      outline-offset: 1px;
    }
    `;

    insertSlottedStyles(this.host, style);
  }
}
