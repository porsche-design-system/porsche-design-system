import { Build, Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { getSvgContent } from './icon-request';
import cx from 'classnames';
import { prefix } from '../../../utils';
import { Theme, IconName } from '../../../types';
import { cdn, svg } from '@porsche-design-system/icons';

@Component({
  tag: 'p-icon',
  styleUrl: 'icon.scss',
  shadow: true
})
export class Icon {
  @Element() public el!: HTMLElement;

  /**
   * Specifies which icon to use.
   */
  @Prop() public name?: IconName = 'arrow-head-right';

  /**
   * Specifies a whole icon path which can be used for custom icons.
   */
  @Prop() public source?: string;

  /**
   * @internal
   * Specifies which icon variant to use.
   */
  @Prop() public variant?: 'outline' | 'filled' = 'outline';

  /** Basic color variations depending on theme property. */
  @Prop() public color?: 'brand' | 'default' | 'neutral-contrast-high' | 'neutral-contrast-medium' | 'neutral-contrast-low' | 'notification-success' | 'notification-warning' | 'notification-error' | 'inherit' = 'default';

  /**
   * The size of the icon.
   */
  @Prop() public size?: 'small' | 'medium' | 'large' | 'inherit' = 'small';

  /**
   * If enabled, ion-icon will be loaded lazily when it's visible in the viewport.
   * Default, `false`.
   */
  @Prop() public lazy?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  private io?: IntersectionObserver;

  @State() private svgContent?: string;
  @State() private isVisible = false;

  public connectedCallback(): void {
    // purposely do not return the promise here because loading
    // the svg file should not hold up loading the app
    // only load the svg if it's visible
    this.waitUntilVisible(this.el, '50px', () => {
      this.isVisible = true;
      this.loadIcon();
    });
  }

  public disconnectedCallback(): void {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  @Watch('source')
  @Watch('name')
  public loadIcon(): void {
    if (Build.isBrowser && this.isVisible) {
      // TODO: unset old icon when name prop is changed otherwise wrong icon will still be shown
      const url = this.getSource();
      getSvgContent(url).then((iconContent) => {
        if (url === this.getSource()) {
          this.svgContent = iconContent;
        }
      });
    }
  }

  public getSource(): string {
    if (this.name && !this.source) {
      return `${cdn}/${svg[this.name]}`;
    }
    if (this.source) {
      return this.source;
    }
    console.warn('Please provide either an name property or a source property!');
    return '';
  }

  public render(): JSX.Element {
    const iconClasses = cx(
      prefix('icon'),
      prefix(`icon--size-${this.size}`),
      prefix(`icon--color-${this.color}`),
      this.color !== 'inherit' && prefix(`icon--theme-${this.theme}`)
    );

    return (
      <Host role='img'>{(
        (Build.isBrowser && this.svgContent)
          ? <i class={iconClasses} innerHTML={this.svgContent}/>
          : <i class={iconClasses}/>
      )}
      </Host>
    );
  }

  private waitUntilVisible(el: HTMLElement, rootMargin: string, cb: () => void): void {
    if (Build.isBrowser && this.lazy && typeof window !== 'undefined' && (window as any).IntersectionObserver) {
      const io = this.io = new (window as any).IntersectionObserver((data: IntersectionObserverEntry[]) => {
        if (data[0].isIntersecting) {
          io.disconnect();
          this.io = undefined;
          cb();
        }
      }, {rootMargin});

      io.observe(el);

    } else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      cb();
    }
  }
}
