import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, THEMES, validateProps } from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import { getComponentCss } from './carousel-styles';
import { Splide } from '@splidejs/splide';
import type { CarouselChangeEvent, CarouselI18n } from './carousel-utils';
import { getSplideBreakpoints } from './carousel-utils';

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

  // @Prop() public currentSlide?:number = 1;

  /** Override the default wordings that are used for aria-labels on the next/prev buttons and pagination. */
  @Prop() public i18n?: CarouselI18n = {};

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when carousel's content slides. */
  @Event({ bubbles: false }) public carouselChange: EventEmitter<CarouselChangeEvent>;

  private splide: Splide;
  private container: HTMLElement;
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
        mouse: 1000, // shoulw be enough to disable mouse dragging
        touch: 10,
      },
      mediaQuery: 'min',
      breakpoints: getSplideBreakpoints(this.slidesPerPage, this.slidesPerMove),
      gap: 16,
      i18n: this.i18n,
    });

    this.splide.on('mounted', () => {
      // TODO: calculation of amount of bullets
      this.pagination.children[this.splide.options.start].classList.add('bullet--active');
    });

    this.splide.on('move', (newIndex, prevIndex): void => {
      const { children } = this.pagination;
      children[prevIndex].classList.remove('bullet--active');
      children[newIndex].classList.add('bullet--active');
      this.carouselChange.emit({ activeIndex: newIndex, previousIndex: prevIndex });
    });

    this.splide.mount();
    // TODO: update on slide addition/removal or prop change?
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.disablePagination, this.theme);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const btnProps = { class: 'btn', hideLabel: true };

    return (
      <Host>
        <div class="header">
          {this.heading && <h2>{this.heading}</h2>}

          <PrefixedTagNames.pButtonPure {...btnProps} icon="arrow-head-left" onClick={this.onPrevClick}>
            Previous slide
          </PrefixedTagNames.pButtonPure>
          <PrefixedTagNames.pButtonPure {...btnProps} icon="arrow-head-right" onClick={this.onNextClick}>
            Next slide
          </PrefixedTagNames.pButtonPure>
        </div>

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
        </div>

        <div class="pagination" ref={(ref) => (this.pagination = ref)}>
          {this.slides.map(() => (
            <span class="bullet" />
          ))}
        </div>
      </Host>
    );
  }

  private onPrevClick = (): void => {
    this.splide.go(this.splide.index === 0 ? this.slides.length - 1 : '<');
  };

  private onNextClick = (): void => {
    this.splide.go(this.splide.index === this.slides.length - 1 ? 0 : '>');
  };
}
