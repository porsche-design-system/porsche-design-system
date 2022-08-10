import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, THEMES, validateProps } from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import { getComponentCss } from './carousel-splide-styles';
import { Splide } from '@splidejs/splide';
import { ButtonPure } from '../../action/button-pure/button-pure';
import type { CarouselChangeEvent, CarouselI18n } from './carousel-utils';
import { getSplideBreakpoints } from './carousel-utils';

const propTypes: PropTypes<typeof CarouselSplide> = {
  heading: AllowedTypes.string,
  slidesPerPage: AllowedTypes.breakpoint('number'),
  slidesPerMove: AllowedTypes.breakpoint('number'),
  disablePagination: AllowedTypes.breakpoint('boolean'),
  i18n: AllowedTypes.shape<CarouselI18n>({
    prev: AllowedTypes.string,
    next: AllowedTypes.string,
    first: AllowedTypes.string,
    last: AllowedTypes.string,
    slideX: AllowedTypes.string,
    pageX: AllowedTypes.string,
    play: AllowedTypes.string,
    pause: AllowedTypes.string,
    carousel: AllowedTypes.string,
    slide: AllowedTypes.string,
    select: AllowedTypes.string,
    slideLabel: AllowedTypes.string,
  }),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-carousel-splide',
  shadow: true,
})
export class CarouselSplide {
  @Element() public host!: HTMLElement;

  /** Defines the heading used in carousel. */
  @Prop() public heading?: string;

  /** Sets the amount of slides visible at the same time. */
  @Prop() public slidesPerPage?: BreakpointCustomizable<number> = 1;

  /** Sets the amount of slides that move on a single prev/next click. */
  @Prop() public slidesPerMove?: BreakpointCustomizable<number> = 1;

  /** If true, the carousel will not show pagination bullets at the bottom. */
  @Prop() public disablePagination?: BreakpointCustomizable<boolean> = false;

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
      arrows: false,
      pagination: false,
      dragMinThreshold: {
        mouse: 1000, // should be disabled
        touch: 10,
      },
      mediaQuery: 'min',
      breakpoints: getSplideBreakpoints(this.slidesPerPage, this.slidesPerMove),
      gap: 16,
      i18n: this.i18n,
    });

    this.splide.on('mounted', () => {
      const { start = 0 } = this.splide.options;
      this.btnPrev.disabled = start === 0;
      this.btnNext.disabled = start === this.slides.length - 1;

      this.pagination.children[start].classList.add('bullet--active');
    });

    this.splide.on('move', (newIndex, prevIndex): void => {
      this.btnPrev.disabled = newIndex === 0;
      this.btnNext.disabled = newIndex === this.slides.length - 1;

      const { children } = this.pagination;
      children[prevIndex].classList.remove('bullet--active');
      children[newIndex].classList.add('bullet--active');
      this.carouselChange.emit({ activeIndex: newIndex, previousIndex: prevIndex });
    });

    this.splide.mount();
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.disablePagination, this.theme);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class="splide" ref={(ref) => (this.container = ref)}>
          <div class="splide__track">
            <div class="splide__list">
              {this.slides.map((_, i) => (
                <div class="splide__slide">
                  <slot name={`slide-${i}`} />
                </div>
              ))}
            </div>
          </div>

          <PrefixedTagNames.pButtonPure
            class="btn btn--prev"
            icon="arrow-head-left"
            hide-label="true"
            ref={(ref) => (this.btnPrev = ref)}
            onClick={() => this.splide.go('<')}
          >
            Previous slide
          </PrefixedTagNames.pButtonPure>
          <PrefixedTagNames.pButtonPure
            class="btn btn--next"
            icon="arrow-head-right"
            hide-label="true"
            ref={(ref) => (this.btnNext = ref)}
            onClick={() => this.splide.go('>')}
          >
            Next slide
          </PrefixedTagNames.pButtonPure>

          <div class="pagination" ref={(ref) => (this.pagination = ref)}>
            {this.slides.map(() => (
              <span class="bullet"></span>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
