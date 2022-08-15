import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, THEMES, validateProps } from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import { getComponentCss } from './carousel-styles';
import { Splide } from '@splidejs/splide';
import type { CarouselChangeEvent, CarouselI18n } from './carousel-utils';
import {
  getSplideBreakpoints,
  slideNext,
  slidePrev,
  updatePagination,
  updatePrevNextButtonAria,
} from './carousel-utils';
import { ButtonPure } from '../../action/button-pure/button-pure';

const propTypes: PropTypes<typeof Carousel> = {
  heading: AllowedTypes.string,
  slidesPerPage: AllowedTypes.breakpoint('number'),
  slidesPerMove: AllowedTypes.breakpoint('number'),
  disablePagination: AllowedTypes.breakpoint('boolean'),
  i18n: AllowedTypes.shape<CarouselI18n>({
    prev: AllowedTypes.string,
    next: AllowedTypes.string,
    first: AllowedTypes.string,
    last: AllowedTypes.string,
    slideLabel: AllowedTypes.string,
  }),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-carousel',
  shadow: true,
})
export class Carousel {
  @Element() public host!: HTMLElement;

  /** Defines the heading used in carousel. */
  @Prop() public heading?: string;

  /** Sets the amount of slides visible at the same time. */
  @Prop() public slidesPerPage?: BreakpointCustomizable<number> = 1;

  /** Sets the amount of slides that move on a single prev/next click. */
  @Prop() public slidesPerMove?: BreakpointCustomizable<number> = 1;

  /** If true, the carousel will not show pagination bullets at the bottom. */
  @Prop() public disablePagination?: BreakpointCustomizable<boolean> = false;

  // @Prop() public startSlide?:number = 1;

  /** Override the default wordings that are used for aria-labels on the next/prev buttons and pagination. */
  @Prop() public i18n?: CarouselI18n = {};

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when carousel's content slides. */
  @Event({ bubbles: false }) public carouselChange: EventEmitter<CarouselChangeEvent>;

  private splide: Splide;
  private container: HTMLElement;
  private btnPrev: ButtonPure;
  private btnNext: ButtonPure;
  private pagination: HTMLElement;
  private slides: HTMLElement[];

  public componentWillLoad(): void {
    this.slides = Array.from(this.host.children) as HTMLElement[];
    this.slides.forEach((el, i) => el.setAttribute('slot', `slide-${i}`));
  }

  public componentDidLoad(): void {
    this.splide = new Splide(this.container, {
      start: 0,
      arrows: false,
      pagination: false,
      dragMinThreshold: {
        mouse: 1000, // should be enough to disable mouse dragging
        touch: 10,
      },
      mediaQuery: 'min',
      breakpoints: getSplideBreakpoints(this.slidesPerPage, this.slidesPerMove),
      gap: 16,
      i18n: this.i18n,
    });

    this.splide.on('mounted move', () => {
      updatePrevNextButtonAria(this.btnPrev, this.btnNext, this.splide);
      updatePagination(this.pagination, this.splide.options.start);
    });

    this.splide.on('move', (newIndex, prevIndex): void => {
      updatePrevNextButtonAria(this.btnPrev, this.btnNext, this.splide);
      updatePagination(this.pagination, newIndex, prevIndex);
    });

    this.splide.mount();
    // TODO: update on slide addition/removal or prop change?
    // TODO: focus/keyboard handling?
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.disablePagination, this.theme);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const btnProps = {
      class: 'btn',
      type: 'button',
      hideLabel: true,
      // aria: {
      //   'aria-controls': 'splide-track', // TODO: cross shadow dom? use native button tag instead of p-button-pure?
      // },
    };

    return (
      <Host>
        <div class="header">
          {this.heading && <h2>{this.heading}</h2>}

          <PrefixedTagNames.pButtonPure
            {...btnProps}
            icon="arrow-head-left"
            ref={(ref) => (this.btnPrev = ref)}
            onClick={() => slidePrev(this.splide)}
          />
          <PrefixedTagNames.pButtonPure
            {...btnProps}
            icon="arrow-head-right"
            ref={(ref) => (this.btnNext = ref)}
            onClick={() => slideNext(this.splide)}
          />
        </div>

        <div id="splide" class="splide" ref={(ref) => (this.container = ref)}>
          <div class="splide__track">
            <div class="splide__list">
              {this.slides.map((_, i) => (
                <div class="splide__slide">
                  <slot name={`slide-${i}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div class="pagination" ref={(ref) => (this.pagination = ref)}>
          {this.slides.map(() => (
            <span class="bullet" />
          ))}
        </div>
      </Host>
    );
  }
}
