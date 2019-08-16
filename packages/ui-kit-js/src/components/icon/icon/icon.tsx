import { JSX, Component, Host, Element, Prop, State, Watch, h } from '@stencil/core';
import { getName, isUrl, isValid } from './icon-helper';
import cx from 'classnames';
import { prefix } from '../../../utils/prefix';
import {Color} from "../../basic/color/color";

@Component({
  tag: 'p-icon',
  styleUrl: 'icon.scss',
  shadow: true
})
export class Icon {
  @Element() public el!: HTMLElement;

  @Prop({ context: 'isServer' }) public isServer!: boolean;
  @Prop({ context: 'document' }) public doc!: Document;
  @Prop({ context: 'window' }) public win: any;

  /**
   * Specifies which icon to use.
   */
  @Prop() public source: string;

  /**
   * Specifies the label to use for accessibility. Defaults to the icon name.
   */
  @Prop({ mutable: true, reflectToAttr: true }) public ariaLabel?: string;

  /** Basic color variations. */
  @Prop() public color?: Color | 'inherit' = 'inherit';

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

  public componentWillLoad() {
    // purposely do not return the promise here because loading
    // the svg file should not hold up loading the app
    // only load the svg if it's visible
    this.waitUntilVisible(this.el, '50px', () => {
      this.isVisible = true;
      this.loadIcon();
    });
  }

  public componentDidUnload() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  @Watch('source')
  public loadIcon() {
    if (!this.isServer && this.isVisible) {
      const url = this.getSource();
      if (url) {
        getSvgContent(this.doc, url, 'p-icon-svg').then((svgContent) => (this.svgContent = svgContent));
      } else {
        console.error('icon was not resolved');
      }
    }

    if (!this.ariaLabel) {
      const name = getName(this.getSource());
      // user did not provide a label
      // come up with the label based on the icon name
      if (name) {
        this.ariaLabel = name.replace(/\-/g, ' ');
      }
    }
  }

  public getSource() {
    if (this.source && !isUrl(this.source)) {
      return `https://cdn.ui.porsche.com/porsche-ui-kit/icon/v1/icon_${this.source}.min.svg`;
    } else {
      return this.source;
    }
  }

  public render(): JSX.Element {
    const iconClasses = cx(
      prefix('icon'),
      this.color !== 'inherit' && prefix(`icon--color-${this.color}`),
      this.size && prefix(`icon--${this.size}`)
    );

    if (!this.isServer && this.svgContent) {
      // we've already loaded up this svg at one point
      // and the svg content we've loaded and assigned checks out
      // render this svg!!
      return (
        <Host role='img'>
          <i class={iconClasses} innerHTML={this.svgContent} />
        </Host>
      );
    }

    // actively requesting the svg
    // or it's an SSR render
    // so let's just render an empty div for now
    return (
      <Host role='img'>
        <i class={iconClasses} />
      </Host>
    );
  }

  private waitUntilVisible(el: HTMLElement, rootMargin: string, cb: () => void) {
    if (this.lazy && this.win && this.win.IntersectionObserver) {
      const io = (this.io = new this.win.IntersectionObserver(
        (data: IntersectionObserverEntry[]) => {
          if (data[0].isIntersecting) {
            io.disconnect();
            this.io = undefined;
            cb();
          }
        },
        { rootMargin }
      ));

      io.observe(el);
    } else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      cb();
    }
  }
}

const requests = new Map<string, Promise<string>>();

function getSvgContent(doc: Document, url: string, scopedId: string | undefined) {
  // see if we already have a request for this url
  let req = requests.get(url);

  if (!req) {
    // we don't already have a request
    req = fetch(url, { cache: 'force-cache' })
      .then((rsp) => {
        if (isStatusValid(rsp.status)) {
          return rsp.text();
        }
        return Promise.resolve(null);
      })
      .then((svgContent) => validateContent(doc, svgContent, scopedId));

    // cache for the same requests
    requests.set(url, req);
  }

  return req;
}

function isStatusValid(status: number) {
  return status <= 299;
}

function validateContent(document: Document, svgContent: string | null, scopeId: string | undefined) {
  if (svgContent) {
    const frag = document.createDocumentFragment();
    const div = document.createElement('div');
    div.innerHTML = svgContent;
    frag.appendChild(div);

    // setup this way to ensure it works on our buddy IE
    for (let i = div.childNodes.length - 1; i >= 0; i--) {
      if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
        div.removeChild(div.childNodes[i]);
      }
    }

    // must only have 1 root element
    const svgElm = div.firstElementChild;
    if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
      if (scopeId) {
        svgElm.setAttribute('class', scopeId);
        svgElm.setAttribute('focusable', 'false');
      }
      // root element must be an svg
      // lets double check we've got valid elements
      // do not allow scripts
      if (isValid(svgElm as any)) {
        return div.innerHTML;
      }
    }
  }
  return '';
}
