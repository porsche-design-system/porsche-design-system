import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { buildIconUrl, DEFAULT_ICON_NAME, getSvgContent } from './iconUtlis';
import { isBrowser, prefix } from '../../../utils';
import { Theme, IconName, TextColor } from '../../../types';

@Component({
  tag: 'p-icon',
  styleUrl: 'icon.scss',
  shadow: true,
})
export class Icon {
  @Element() public host!: HTMLElement;

  /** Specifies which icon to use. */
  @Prop() public name?: IconName = DEFAULT_ICON_NAME;

  /** Specifies a whole icon path which can be used for custom icons. */
  @Prop() public source?: string;

  /** @internal Specifies which icon variant to use. */
  @Prop() public variant?: 'outline' | 'filled' = 'outline';

  /** Basic color variations depending on theme property. */
  @Prop() public color?: TextColor = 'default';

  /** The size of the icon. */
  @Prop() public size?: 'small' | 'medium' | 'large' | 'inherit' = 'small';

  /** If enabled, ion-icon will be loaded lazily when it's visible in the viewport. Default, `false`. */
  @Prop() public lazy?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  @State() private svgContent?: string;

  private intersectionObserver?: IntersectionObserver;

  @Watch('source')
  @Watch('name')
  watcherCallback() {
    this.initIntersectionObserver();
  }

  public componentWillLoad(): void {
    this.initIntersectionObserver();
  }

  public componentShouldUpdate(_newValue, _oldValue, propOrStateName: string): boolean {
    // we don't care about a changes of the 'name' prop since this doesn't affect a rerender
    // and the new svg is loaded in the background
    return propOrStateName !== 'name';
  }

  public disconnectedCallback(): void {
    this.intersectionObserver?.disconnect();
  }

  public render(): JSX.Element {
    const iconClasses = {
      [prefix('icon')]: true,
      [prefix(`icon--size-${this.size}`)]: true,
      [prefix(`icon--color-${this.color}`)]: true,
      [prefix(`icon--theme-dark`)]: this.theme === 'dark' && this.color !== 'inherit',
    };

    return (
      <Host>
        <i class={iconClasses} innerHTML={this.svgContent} />
      </Host>
    );
  }

  private initIntersectionObserver(): void {
    if (this.lazy && isBrowser()) {
      // load icon once it reaches the viewport
      if (!this.intersectionObserver) {
        this.intersectionObserver = new IntersectionObserver(
          (entries, observer) => {
            if (entries[0].isIntersecting) {
              observer.unobserve(this.host);
              this.loadIcon();
            }
          },
          { rootMargin: '50px' }
        );
      }

      this.intersectionObserver.observe(this.host);
    } else {
      this.loadIcon();
    }
  }

  private loadIcon = () => {
    this.svgContent = undefined; // reset svg content while new icon is loaded
    const url = buildIconUrl(this.source ?? this.name);
    getSvgContent(url).then((iconContent) => {
      // check if response matches current icon source
      if (url === buildIconUrl(this.source ?? this.name)) {
        this.svgContent = iconContent;
      }
    });
  };
}
