import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { buildIconUrl, DEFAULT_ICON_NAME, getSvgContent } from './icon-utils';
import { getShadowRootHTMLElement, isBrowser, isDark, prefix } from '../../../utils';
import type { Theme, IconName, TextColor } from '../../../types';

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
  private lazyIconResolve: () => void;

  public componentWillLoad(): Promise<void> {
    return this.initIntersectionObserver();
  }

  public componentWillUpdate(): Promise<void> {
    return this.initIntersectionObserver();
  }

  public disconnectedCallback(): void {
    this.intersectionObserver?.disconnect();
  }

  public render(): JSX.Element {
    const iconClasses = {
      [prefix('icon')]: true,
      [prefix(`icon--size-${this.size}`)]: true,
      [prefix(`icon--color-${this.color}`)]: true,
      [prefix('icon--theme-dark')]: isDark(this.theme) && this.color !== 'inherit',
    };

    return (
      <Host>
        <i class={iconClasses} innerHTML={this.svgContent} />
      </Host>
    );
  }

  private initIntersectionObserver(): Promise<void> {
    if (this.lazy && isBrowser()) {
      // create a promise that is resolved after the lazy icon is loaded
      const lazyIconPromise = new Promise<void>((resolve) => {
        this.lazyIconResolve = resolve;
      });
      // load icon once it reaches the viewport
      if (!this.intersectionObserver) {
        this.intersectionObserver = new IntersectionObserver(
          (entries, observer) => {
            if (entries[0].isIntersecting) {
              // is in viewport
              observer.unobserve(this.host);
              this.loadIcon().then(() => {
                // icon is loaded, complete stencil lifecycle
                this.lazyIconResolve();
              });
            } else {
              // is not in viewport, resolve promise immediately
              this.lazyIconResolve();
            }
          },
          { rootMargin: '50px' }
        );
      }
      this.intersectionObserver.observe(this.host);
      return lazyIconPromise;
    } else {
      return this.loadIcon();
    }
  }

  private loadIcon = (): Promise<void> => {
    if (this.svgContent) {
      // reset old icon if there is any
      const el = getShadowRootHTMLElement(this.host, 'i');
      if (el) {
        // manipulating the DOM directly, to prevent unnecessary stencil lifecycles
        el.innerHTML = '';
      }
    }

    const url = buildIconUrl(this.source ?? this.name);

    return getSvgContent(url).then((iconContent) => {
      // check if response matches current icon source
      if (url === buildIconUrl(this.source ?? this.name)) {
        this.svgContent = iconContent;
      }
    });
  };
}
