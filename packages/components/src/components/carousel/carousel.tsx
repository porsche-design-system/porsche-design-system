import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getCurrentMatchingBreakpointValue,
  getPrefixedTagNames,
  getSlotTextContent,
  observeBreakpointChange,
  observeChildren,
  parseJSON,
  parseJSONAttribute,
  THEMES,
  unobserveBreakpointChange,
  unobserveChildren,
  validateProps,
} from '../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import { getComponentCss } from './carousel-styles';
import { Splide } from '@splidejs/splide';
import type { CarouselChangeEvent, CarouselInternationalization } from './carousel-utils';
import {
  getAmountOfPages,
  getSlidesAndAddNamedSlots,
  getSplideBreakpoints,
  renderPagination,
  slideNext,
  slidePrev,
  updatePagination,
  updatePrevNextButtonAria,
  updateSlidesInert,
  warnIfHeadingIsMissing,
} from './carousel-utils';
import { ButtonPure } from '../button-pure/button-pure';
import { spacing } from '@porsche-design-system/utilities-v2';

const propTypes: PropTypes<typeof Carousel> = {
  heading: AllowedTypes.string,
  description: AllowedTypes.string,
  wrapContent: AllowedTypes.boolean,
  slidesPerPage: AllowedTypes.breakpoint('number'),
  disablePagination: AllowedTypes.breakpoint('boolean'),
  intl: AllowedTypes.shape<Required<CarouselInternationalization>>({
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

  /** Defines the heading used in the carousel. */
  @Prop() public heading?: string;

  /** Defines the description used in the carousel. */
  @Prop() public description?: string;

  /** Whether the content should receive a padding to the sides to be aligned on the grid when used full width and not within content-wrapper. */
  @Prop() public wrapContent?: boolean;

  /** Sets the amount of slides visible at the same time. */
  @Prop({ mutable: true }) public slidesPerPage?: BreakpointCustomizable<number> = 1;

  /** If true, the carousel will not show pagination bullets at the bottom. */
  @Prop({ mutable: true }) public disablePagination?: BreakpointCustomizable<boolean> = false;

  /** Override the default wordings that are used for aria-labels on the next/prev buttons and pagination. */
  @Prop() public intl?: CarouselInternationalization = {};

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
    this.observeBreakpointChange();

    if (this.splide) {
      // on reconnect we can reuse the splide instance
      this.updateSlidesAndPagination();
      this.registerSplideHandlers(this.splide);
    }
  }

  public componentWillLoad(): void {
    this.slidesPerPage = parseJSON(this.slidesPerPage) as any; // dynamic change is not supported right now

    this.updateSlidesAndPagination();
    this.observeBreakpointChange();
  }

  public componentDidLoad(): void {
    this.splide = new Splide(this.container, {
      arrows: false,
      pagination: false,
      perMove: 1,
      mediaQuery: 'min',
      padding: {
        right: '7%', // together with wrapContent this is overridden via css
      },
      // TODO: this uses matchMedia internally, since we also use it, there is some redundancy
      breakpoints: getSplideBreakpoints(this.slidesPerPage as Exclude<BreakpointCustomizable<number>, string>, {
        base: spacing.small,
        s: spacing.medium,
        l: spacing.large,
      }),
      // https://splidejs.com/guides/i18n/#default-texts
      i18n: parseJSONAttribute(this.intl),
    });

    this.registerSplideHandlers(this.splide);
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    warnIfHeadingIsMissing(this.host, this.heading);
    this.disablePagination = parseJSON(this.disablePagination) as any; // parsing the value just once per lifecycle

    attachComponentCss(this.host, getComponentCss, this.wrapContent, this.disablePagination, this.theme);
  }

  public componentDidUpdate(): void {
    this.splide.refresh(); // needs to happen after render to detect new and removed slides
    updatePrevNextButtonAria(this.btnPrev, this.btnNext, this.splide); // go to last/first slide aria might be wrong
    updateSlidesInert(this.splide);
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
    unobserveBreakpointChange(this.host);
    this.splide.destroy();
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const btnProps = {
      class: 'btn',
      type: 'button',
      hideLabel: true,
      theme: this.theme,
      // 'aria-controls': 'splide-track', // TODO: cross shadow dom? use native button tag instead of p-button-pure?
    };

    return (
      <Host>
        <div class="header">
          {this.heading ? <h2>{this.heading}</h2> : <slot name="heading" />}
          {this.description && <p>{this.description}</p>}

          {/* NOTE: might come back in later version */}
          {/* <slot name="post-heading" /> */}

          <div class="nav">
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
        </div>

        <div
          id="splide"
          class="splide"
          aria-label={this.heading || getSlotTextContent(this.host, 'heading')}
          ref={(ref) => (this.container = ref)}
        >
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

  private registerSplideHandlers(splide: Splide): void {
    splide.on('mounted', () => {
      updatePrevNextButtonAria(this.btnPrev, this.btnNext, splide);
      updateSlidesInert(splide);
      renderPagination(this.pagination, this.amountOfPages, 0); // initial pagination
    });

    splide.on('move', (activeIndex, previousIndex): void => {
      updatePrevNextButtonAria(this.btnPrev, this.btnNext, splide);
      updateSlidesInert(splide);
      updatePagination(this.pagination, activeIndex);
      this.carouselChange.emit({ activeIndex, previousIndex });
    });

    splide.mount();
  }

  private observeBreakpointChange(): void {
    if (typeof this.slidesPerPage === 'object') {
      observeBreakpointChange(this.host, this.updateAmountOfPages);
    }
  }

  private updateSlidesAndPagination = (): void => {
    this.slides = getSlidesAndAddNamedSlots(this.host);
    this.updateAmountOfPages();
  };

  private updateAmountOfPages = (): void => {
    this.amountOfPages = getAmountOfPages(
      this.slides.length,
      // round to sanitize floating numbers
      Math.round(getCurrentMatchingBreakpointValue(this.slidesPerPage))
    );
    renderPagination(this.pagination, this.amountOfPages, this.splide?.index || 0);
    updateSlidesInert(this.splide);
  };
}
