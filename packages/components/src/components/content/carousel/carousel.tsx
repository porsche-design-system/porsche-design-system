import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getCurrentMatchingBreakpointValue,
  getPrefixedTagNames,
  observeBreakpointChange,
  observeChildren,
  parseJSON,
  parseJSONAttribute,
  THEMES,
  unobserveBreakpointChange,
  unobserveChildren,
  validateProps,
} from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import { getComponentCss } from './carousel-styles';
import { Splide } from '@splidejs/splide';
import type { CarouselChangeEvent, CarouselInternationalization } from './carousel-utils';
import {
  getAmountOfPages,
  getSlides,
  getSplideBreakpoints,
  renderPagination,
  slideNext,
  slidePrev,
  updatePagination,
  updatePrevNextButtonAria,
  warnIfHeadingIsMissing,
} from './carousel-utils';
import { ButtonPure } from '../../action/button-pure/button-pure';
import { gridGap } from '@porsche-design-system/utilities-v2';

const propTypes: PropTypes<typeof Carousel> = {
  heading: AllowedTypes.string,
  wrapHeading: AllowedTypes.boolean,
  slidesPerPage: AllowedTypes.breakpoint('number'),
  slidesPerMove: AllowedTypes.breakpoint('number'),
  disablePagination: AllowedTypes.breakpoint('boolean'),
  internationalization: AllowedTypes.shape<Required<CarouselInternationalization>>({
    prev: AllowedTypes.string,
    next: AllowedTypes.string,
    first: AllowedTypes.string,
    last: AllowedTypes.string,
    slideLabel: AllowedTypes.string,
    slide: AllowedTypes.string,
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

  /** Whether the heading should receive a padding to the sides to be aligned on the grid when used full width and not within content-wrapper. */
  @Prop() public wrapHeading?: boolean;

  /** Sets the amount of slides visible at the same time. */
  @Prop({ mutable: true }) public slidesPerPage?: BreakpointCustomizable<number> = 1;

  // TODO: remove?
  /** Sets the amount of slides that move on a single prev/next click. */
  @Prop({ mutable: true }) public slidesPerMove?: BreakpointCustomizable<number> = 1;

  /** If true, the carousel will not show pagination bullets at the bottom. */
  @Prop({ mutable: true }) public disablePagination?: BreakpointCustomizable<boolean> = false;

  /** Override the default wordings that are used for aria-labels on the next/prev buttons and pagination. */
  @Prop() public internationalization?: CarouselInternationalization = {};

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when carousel's content slides. */
  @Event({ bubbles: false }) public carouselChange: EventEmitter<CarouselChangeEvent>;

  @State() private amountOfPages: number;

  private splide: Splide;
  private container: HTMLElement;
  private btnPrev: ButtonPure;
  private btnNext: ButtonPure;
  private pagination: HTMLElement;
  private slides: HTMLElement[];

  public connectedCallback(): void {
    observeChildren(this.host, this.updateSlidesAndPagination);
    this.observeBreakpointChanges();
  }

  public componentWillLoad(): void {
    this.slidesPerPage = parseJSON(this.slidesPerPage) as any; // TODO: what about changes?
    this.slidesPerMove = parseJSON(this.slidesPerMove) as any; // TODO: what about changes?

    this.updateSlidesAndPagination();
    this.observeBreakpointChanges();
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
      gap: gridGap,
      // https://splidejs.com/guides/i18n/#default-texts
      i18n: parseJSONAttribute(this.internationalization),
    });

    this.splide.on('mounted', () => {
      updatePrevNextButtonAria(this.btnPrev, this.btnNext, this.splide);
      renderPagination(this.pagination, this.amountOfPages, 0); // initial pagination
    });

    this.splide.on('move', (activeIndex, previousIndex): void => {
      updatePrevNextButtonAria(this.btnPrev, this.btnNext, this.splide);
      updatePagination(this.pagination, activeIndex);
      this.carouselChange.emit({ activeIndex, previousIndex });
    });

    this.splide.mount();
    // TODO: update pagination and arias on slide addition/removal
    // TODO: focus/keyboard handling
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    warnIfHeadingIsMissing(this.host, this.heading);
    this.disablePagination = parseJSON(this.disablePagination) as any;

    attachComponentCss(this.host, getComponentCss, this.wrapHeading, this.disablePagination, this.theme);
  }

  public componentDidUpdate(): void {
    this.splide.refresh();
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
    unobserveBreakpointChange(this.host);
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
          {this.heading ? <h2>{this.heading}</h2> : <slot name="heading" />}

          <PrefixedTagNames.pButtonPure
            {...btnProps}
            icon="arrow-head-left"
            ref={(ref) => (this.btnPrev = ref)}
            onClick={() => slidePrev(this.splide, this.amountOfPages)}
          />
          <PrefixedTagNames.pButtonPure
            {...btnProps}
            icon="arrow-head-right"
            ref={(ref) => (this.btnNext = ref)}
            onClick={() => slideNext(this.splide, this.amountOfPages)}
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

        {this.disablePagination !== true && <div class="pagination" ref={(ref) => (this.pagination = ref)} />}
      </Host>
    );
  }

  private observeBreakpointChanges = (): void => {
    if (typeof this.slidesPerPage === 'object') {
      observeBreakpointChange(this.host, this.updateAmountOfPages);
    }
  };

  private updateSlidesAndPagination = (): void => {
    this.slides = getSlides(this.host);
    this.updateAmountOfPages();
  };

  private updateAmountOfPages = (): void => {
    this.amountOfPages = getAmountOfPages(this.slides.length, getCurrentMatchingBreakpointValue(this.slidesPerPage));
    renderPagination(this.pagination, this.amountOfPages, this.splide?.index || 0);
  };
}
