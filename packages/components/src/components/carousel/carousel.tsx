import type { BreakpointCustomizable, PropTypes, Theme, ValidatorFunction } from '../../types';
import type { ButtonPure } from '../button-pure/button-pure';
import type {
  CarouselAlignHeader,
  CarouselUpdateEvent,
  CarouselInternationalization,
  CarouselWidth,
} from './carousel-utils';
import {
  CAROUSEL_ALIGN_HEADERS,
  CAROUSEL_WIDTHS,
  getAmountOfPages,
  getSlidesAndAddNamedSlots,
  getSplideBreakpoints,
  isInfinitePagination,
  renderPagination,
  slideNext,
  slidePrev,
  updatePagination,
  updatePrevNextButtons,
  warnIfHeadingIsMissing,
} from './carousel-utils';
import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { Splide } from '@splidejs/splide';
import {
  AllowedTypes,
  attachComponentCss,
  getCurrentMatchingBreakpointValue,
  getPrefixedTagNames,
  getSlotTextContent,
  hasDescription,
  hasPropValueChanged,
  observeBreakpointChange,
  observeChildren,
  parseJSON,
  parseJSONAttribute,
  THEMES,
  unobserveBreakpointChange,
  unobserveChildren,
  validateProps,
  warnIfDeprecatedPropIsUsed,
} from '../../utils';
import { carouselTransitionDuration, getComponentCss } from './carousel-styles';
import { gridGap } from '@porsche-design-system/utilities-v2';

const propTypes: PropTypes<typeof Carousel> = {
  heading: AllowedTypes.string,
  description: AllowedTypes.string,
  alignHeader: AllowedTypes.oneOf<CarouselAlignHeader>(CAROUSEL_ALIGN_HEADERS),
  rewind: AllowedTypes.boolean,
  wrapContent: AllowedTypes.boolean,
  width: AllowedTypes.oneOf<CarouselWidth>(CAROUSEL_WIDTHS),
  slidesPerPage: AllowedTypes.oneOf<ValidatorFunction>([
    AllowedTypes.breakpoint('number'),
    AllowedTypes.oneOf(['auto']),
  ]),
  disablePagination: AllowedTypes.breakpoint('boolean'),
  pagination: AllowedTypes.breakpoint('boolean'),
  intl: AllowedTypes.shape<Required<CarouselInternationalization>>({
    prev: AllowedTypes.string,
    next: AllowedTypes.string,
    first: AllowedTypes.string,
    last: AllowedTypes.string,
    slideLabel: AllowedTypes.string,
    slide: AllowedTypes.string,
  }),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  activeSlideIndex: AllowedTypes.number,
  skipLinkTarget: AllowedTypes.string,
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

  /** Alignment of heading and description */
  @Prop() public alignHeader?: CarouselAlignHeader = 'left';

  /** Whether the slides should rewind from last to first slide and vice versa. */
  @Prop() public rewind?: boolean = true;

  /**
   * Has no effect anymore
   * @deprecated since v3.0.0, will be removed with next major release
   */
  @Prop() public wrapContent?: boolean;

  /** Defines the outer spacings between the carousel and the left and right screen sides. */
  @Prop() public width?: CarouselWidth = 'basic';

  /** Sets the amount of slides visible at the same time. Can be set to `auto` if you want to define different widths per slide via CSS. */
  @Prop({ mutable: true }) public slidesPerPage?: BreakpointCustomizable<number> | 'auto' = 1;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `pagination` instead.
   * If true, the carousel will not show pagination bullets at the bottom. */
  @Prop({ mutable: true }) public disablePagination?: BreakpointCustomizable<boolean>;

  /** If false, the carousel will not show pagination bullets at the bottom. */
  @Prop({ mutable: true }) public pagination?: BreakpointCustomizable<boolean> = true;

  /** Override the default wordings that are used for aria-labels on the next/prev buttons and pagination. */
  @Prop() public intl?: CarouselInternationalization;

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Defines which slide to be active (zero-based numbering). */
  @Prop() public activeSlideIndex?: number = 0;

  /** Defines target of skip link (to skip carousel entries). */
  @Prop() public skipLinkTarget?: string;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead.
   * Emitted when carousel's content slides. */
  @Event({ bubbles: false }) public carouselChange: EventEmitter<CarouselUpdateEvent>;

  /** Emitted when carousel's content slides. */
  @Event({ bubbles: false }) public update: EventEmitter<CarouselUpdateEvent>;

  @State() private amountOfPages: number;

  private splide: Splide;
  private container: HTMLElement;
  private btnPrev: ButtonPure;
  private btnNext: ButtonPure;
  private paginationEl: HTMLElement;
  private slides: HTMLElement[] = [];

  @Watch('activeSlideIndex')
  public activeSlideHandler(newValue: number): void {
    this.splide.go(newValue); // change event is emitted via splide.on('move')
  }

  public connectedCallback(): void {
    observeChildren(this.host, this.updateSlidesAndPagination);
    this.observeBreakpointChange();

    if (this.splide) {
      this.observeSlides(); // on reconnect, adjust tabindex and aria attributes on slides
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

  public componentShouldUpdate(
    newVal: unknown,
    oldVal: unknown,
    propName: keyof InstanceType<typeof Carousel>
  ): boolean {
    return propName !== 'activeSlideIndex' && hasPropValueChanged(newVal, oldVal); // we need to prevent splide reinitialization via splide.refresh() when activeSlideIndex is changed from outside
  }

  public componentDidLoad(): void {
    this.observeSlides(); // initial, adjust tabindex and aria attributes on slides
    this.splide = new Splide(this.container, {
      start: this.activeSlideIndex,
      autoWidth: this.slidesPerPage === 'auto', // https://splidejs.com/guides/auto-width/#auto-width
      arrows: false,
      pagination: false,
      rewind: this.rewind,
      rewindByDrag: true, // only works when rewind: true
      perMove: 1,
      mediaQuery: 'min',
      speed: carouselTransitionDuration,
      gap: gridGap,
      // TODO: this uses matchMedia internally, since we also use it, there is some redundancy
      breakpoints: getSplideBreakpoints(this.slidesPerPage as Exclude<BreakpointCustomizable<number> | 'auto', string>),
      // https://splidejs.com/guides/i18n/#default-texts
      i18n: parseJSONAttribute(this.intl || {}), // can only be applied initially atm
    });

    this.registerSplideHandlers(this.splide);
  }

  public componentDidUpdate(): void {
    // TODO: using a slotchange listener might be a better approach https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event
    this.splide.refresh(); // needs to happen after render to detect new and removed slides
    updatePrevNextButtons(this.btnPrev, this.btnNext, this.splide); // go to last/first slide aria might be wrong
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
    unobserveChildren(this.container); // adjust tabindex and aria attributes on slides
    unobserveBreakpointChange(this.host);
    this.splide.destroy();
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof Carousel>(this, 'wrapContent');
    warnIfDeprecatedPropIsUsed<typeof Carousel>(this, 'disablePagination', 'Please use pagination prop instead.');
    warnIfHeadingIsMissing(this.host, this.heading);
    this.disablePagination = parseJSON(this.disablePagination) as any; // parsing the value just once per lifecycle
    this.pagination = parseJSON(this.pagination) as any; // parsing the value just once per lifecycle
    attachComponentCss(
      this.host,
      getComponentCss,
      this.width,
      // flip boolean values of disablePagination since it is the inverse of pagination
      this.disablePagination
        ? typeof this.disablePagination === 'object'
          ? (Object.fromEntries(
              Object.entries(this.disablePagination).map(([key, value]) => [key, !value])
            ) as BreakpointCustomizable<boolean>)
          : !this.disablePagination
        : this.pagination,
      isInfinitePagination(this.amountOfPages),
      this.alignHeader,
      this.theme
    );

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
          {this.heading ? <h2 id="heading">{this.heading}</h2> : <slot name="heading" />}
          {hasDescription(this.host, this.description) &&
            ((this.description && <p>{this.description}</p>) || <slot name="description" />)}

          {/* NOTE: might come back in later version */}
          {/* <slot name="post-heading" /> */}

          <div class="nav">
            {this.skipLinkTarget && (
              <PrefixedTagNames.pLinkPure
                href={this.skipLinkTarget}
                theme={this.theme}
                icon="arrow-last"
                class="btn skip-link"
                alignLabel="left"
                hideLabel={true}
                aria-describedby={this.heading ? 'heading' : null}
              >
                {/* TODO: make it i18n configurable */}
                Skip carousel entries
              </PrefixedTagNames.pLinkPure>
            )}
            <PrefixedTagNames.pButtonPure
              {...btnProps}
              icon="arrow-left"
              ref={(ref) => (this.btnPrev = ref)}
              onClick={() => slidePrev(this.splide, this.amountOfPages)}
            />
            <PrefixedTagNames.pButtonPure
              {...btnProps}
              icon="arrow-right"
              ref={(ref) => (this.btnNext = ref)}
              onClick={() => slideNext(this.splide, this.amountOfPages)}
              onKeyDown={this.onNextKeyDown}
            />
          </div>
        </div>

        <div
          id="splide"
          class="splide"
          aria-label={this.heading || getSlotTextContent(this.host, 'heading')}
          ref={(ref) => (this.container = ref)}
          onFocusin={this.onSplideFocusIn}
        >
          <div class="splide__track">
            <div class="splide__list">
              {this.slides.map((_, i) => (
                <div key={i} class="splide__slide" tabIndex={0}>
                  <slot name={`slide-${i}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {(this.disablePagination ? this.disablePagination !== true : this.pagination) && (
          <div class="pagination-container">
            <div class="pagination" ref={(ref) => (this.paginationEl = ref)}></div>
          </div>
        )}
      </Host>
    );
  }

  private registerSplideHandlers(splide: Splide): void {
    splide.on('mounted', () => {
      updatePrevNextButtons(this.btnPrev, this.btnNext, splide);
      renderPagination(this.paginationEl, this.amountOfPages, this.activeSlideIndex); // initial pagination
    });

    splide.on('move', (activeIndex, previousIndex): void => {
      updatePrevNextButtons(this.btnPrev, this.btnNext, splide);
      updatePagination(this.paginationEl, this.amountOfPages, activeIndex);
      this.update.emit({ activeIndex, previousIndex });
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
      this.slidesPerPage === 'auto' ? 1 : Math.round(getCurrentMatchingBreakpointValue(this.slidesPerPage))
    );
    renderPagination(this.paginationEl, this.amountOfPages, this.splide?.index || 0);
  };

  private onNextKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Tab' && !e.shiftKey) {
      const activeSlide = this.splide.Components.Elements.slides.at(this.splide.index);
      activeSlide.focus();
      e.preventDefault();
    }
  };

  private onSplideFocusIn = (e: FocusEvent & { target: HTMLElement }): void => {
    const { target } = e;
    const {
      index: splideIndex,
      Components: { Elements },
    } = this.splide;

    const slideIndexOfFocusedElement = Elements.slides.includes(target)
      ? Elements.slides.indexOf(target) // focussed element is the slide itself
      : this.slides.findIndex((slide) => slide.contains(target)); // focussed element is within slide, e.g. link or button

    if (splideIndex !== slideIndexOfFocusedElement) {
      if (slideIndexOfFocusedElement < this.amountOfPages && slideIndexOfFocusedElement > splideIndex) {
        slideNext(this.splide, this.amountOfPages);
      } else if (slideIndexOfFocusedElement < splideIndex) {
        slidePrev(this.splide, this.amountOfPages);
      }
    }
  };

  private observeSlides(): void {
    // splide sets attributes everytime it slides or slides are added, which we need to adjust after wards
    observeChildren(
      this.container,
      () =>
        this.splide.Components.Elements.slides.forEach((el) => {
          el.removeAttribute('aria-hidden');
          if (el.tabIndex !== 0) {
            el.tabIndex = 0;
          }
        }),
      ['tabindex', 'aria-hidden']
    );
  }
}
