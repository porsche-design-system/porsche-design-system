import { Build, Component, Host, Element, Prop, State, Watch, h } from '@stencil/core';
import { getName } from './icon-helper';
import { getSvgContent, iconContent } from './icon-request';
import cx from 'classnames';
import { prefix } from '../../../utils';
import { TextColor } from '../../../types';
import { IconName } from './icon-name';

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
  @Prop() public name: IconName;

  /**
   * Specifies a whole icon path which can be used for custom icons.
   */
  @Prop() public source?: string;

  /**
   * @internal
   * Specifies which icon variant to use.
   */
  @Prop() public variant?: 'outline' | 'filled' = 'outline';

  /**
   * Specifies the label to use for accessibility. Defaults to the icon name.
   */
  @Prop({ mutable: true, reflectToAttr: true }) public ariaLabel?: string;

  /** Basic color variations. */
  @Prop() public color?: TextColor = 'inherit';

  /**
   * The size of the icon.
   */
  @Prop() public size?: 'small' | 'medium' | 'large' | 'inherit' = 'small';

  /**
   * If enabled, ion-icon will be loaded lazily when it's visible in the viewport.
   * Default, `false`.
   */
  @Prop() public lazy?: boolean = false;

  private io?: IntersectionObserver;

  @State() private svgContent?: string;
  @State() private isVisible = false;

  public connectedCallback() {
    // purposely do not return the promise here because loading
    // the svg file should not hold up loading the app
    // only load the svg if it's visible
    this.waitUntilVisible(this.el, '50px', () => {
      this.isVisible = true;
      this.loadIcon();
    });
  }

  public disconnectedCallback() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  @Watch('source')
  @Watch('name')
  public loadIcon() {
    if (Build.isBrowser && this.isVisible) {
      const url = this.getSource();
      if (iconContent.has(url)) {
        // sync if it's already loaded
        this.svgContent = iconContent.get(url);
      } else {
        // async if it hasn't been loaded
        getSvgContent(url).then(() => this.svgContent = iconContent.get(url));
      }
    }

    if (!this.ariaLabel) {
      const name = this.source ? getName(this.getSource()) : this.name;
      // user did not provide a label
      // come up with the label based on the icon name
      if (name) {
        this.ariaLabel = name.replace(/-/g, ' ');
      }
    }
  }

  public getSource(): string {
    if (this.name && !this.source) {
      return `https://cdn.ui.porsche.com/porsche-icons/icons/${this.variant}/${this.name}.svg`;
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
      this.color !== 'inherit' && prefix(`icon--color-${this.color}`),
      this.size && prefix(`icon--${this.size}`)
    );

    return (
      <Host role='img' >{(
        (Build.isBrowser && this.svgContent)
          ? <i class={iconClasses} innerHTML={this.svgContent}/>
          : <i class={iconClasses}/>
      )}
      </Host>
    );
  }

  private waitUntilVisible(el: HTMLElement, rootMargin: string, cb: () => void) {
    if (Build.isBrowser && this.lazy && typeof window !== 'undefined' && (window as any).IntersectionObserver) {
      const io = this.io = new (window as any).IntersectionObserver((data: IntersectionObserverEntry[]) => {
        if (data[0].isIntersecting) {
          io.disconnect();
          this.io = undefined;
          cb();
        }
      }, { rootMargin });

      io.observe(el);

    } else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      cb();
    }
  }
}
