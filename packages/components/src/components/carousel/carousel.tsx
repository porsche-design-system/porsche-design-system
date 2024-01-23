import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes, Theme, ValidatorFunction } from '../../types';
import type { ButtonPure } from '../button-pure/button-pure';
import type {
  CarouselAlignHeader,
  CarouselAlignHeaderDeprecated,
  CarouselAriaAttribute,
  CarouselHeadingSize,
  CarouselInternationalization,
  CarouselUpdateEventDetail,
  CarouselWidth,
} from './carousel-utils';
import {
  CAROUSEL_ALIGN_HEADERS,
  CAROUSEL_ARIA_ATTRIBUTES,
  CAROUSEL_WIDTHS,
  getAmountOfPages,
  getSlidesAndAddAttributes,
  getSplideBreakpoints,
  isInfinitePagination,
  renderPagination,
  slideNext,
  slidePrev,
  updatePagination,
  updatePrevNextButtons,
} from './carousel-utils';
import { Component, Element, Event, type EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { Splide } from '@splidejs/splide';
import {
  AllowedTypes,
  attachComponentCss,
  getCurrentMatchingBreakpointValue,
  getPrefixedTagNames,
  hasDescription,
  hasHeading,
  hasNamedSlot,
  hasPropValueChanged,
  observeBreakpointChange,
  observeChildren,
  parseAndGetAriaAttributes,
  parseJSON,
  parseJSONAttribute,
  THEMES,
  unobserveBreakpointChange,
  unobserveChildren,
  validateProps,
  warnIfDeprecatedPropIsUsed,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { carouselTransitionDuration, getComponentCss } from './carousel-styles';
import { gridGap, motionEasingBase } from '@porsche-design-system/utilities-v2';

const propTypes: PropTypes<typeof Carousel> = {
  heading: AllowedTypes.string,
  headingSize: AllowedTypes.oneOf<CarouselHeadingSize>(['x-large', 'xx-large']),
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
  aria: AllowedTypes.aria<CarouselAriaAttribute>(CAROUSEL_ARIA_ATTRIBUTES),
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

  /** Defines the heading size used in the carousel. */
  @Prop() public headingSize?: CarouselHeadingSize = 'x-large';

  /** Defines the description used in the carousel. */
  @Prop() public description?: string;

  /** Alignment of heading and description */
  @Prop() public alignHeader?: CarouselAlignHeader = 'start';

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
  @Prop({ mutable: true }) public slidesPerPage?: BreakpointCustomizable<number> | 'auto' = 1; // eslint-disable-line @typescript-eslint/no-redundant-type-constituents

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `pagination` instead.
   * If true, the carousel will not show pagination bullets at the bottom. */
  @Prop({ mutable: true }) public disablePagination?: BreakpointCustomizable<boolean>;

  /** If false, the carousel will not show pagination bullets at the bottom. */
  @Prop({ mutable: true }) public pagination?: BreakpointCustomizable<boolean> = true;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<CarouselAriaAttribute>;

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
  @Event({ bubbles: false }) public carouselChange: EventEmitter<CarouselUpdateEventDetail>;

  /** Emitted when carousel's content slides. */
  @Event({ bubbles: false }) public update: EventEmitter<CarouselUpdateEventDetail>;

  @State() private amountOfPages: number;

  private splide: Splide;
  private container: HTMLElement;
  private btnPrev: ButtonPure;
  private btnNext: ButtonPure;
  private paginationEl: HTMLElement;
  private slides: HTMLElement[] = [];

  private get hasNavigation(): boolean {
    return this.slidesPerPage === 'auto' || this.amountOfPages > 1;
  }

  @Watch('activeSlideIndex')
  public activeSlideHandler(newValue: number): void {
    this.splide.go(newValue); // change event is emitted via splide.on('move')
  }

  public connectedCallback(): void {
    observeChildren(this.host, this.updateSlidesAndPagination);
    this.observeBreakpointChange();

    if (this.splide) {
      this.observeSlides(); // on reconnect, adjust aria attributes on slides
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
      easing: motionEasingBase,
      pagination: false,
      rewind: this.rewind,
      rewindByDrag: true, // only works when rewind: true
      drag: this.hasNavigation,
      perMove: 1,
      mediaQuery: 'min',
      speed: parseFloat(carouselTransitionDuration) * 1000,
      gap: gridGap,
      // TODO: this uses matchMedia internally, since we also use it, there is some redundancy
      breakpoints: getSplideBreakpoints(this.slidesPerPage as Exclude<BreakpointCustomizable<number> | 'auto', string>), // eslint-disable-line @typescript-eslint/no-redundant-type-constituents
      // https://splidejs.com/guides/i18n/#default-texts
      i18n: parseJSONAttribute(this.intl || {}), // can only be applied initially atm
    });

    this.registerSplideHandlers(this.splide);
  }

  public componentDidUpdate(): void {
    this.splide.options = { drag: this.hasNavigation };
    this.splide.refresh(); // needs to happen after render to detect new and removed slides
    if (this.hasNavigation) {
      renderPagination(this.paginationEl, this.amountOfPages, this.splide?.index || 0, this.splide); // update pagination in case the carousel was not draggable before
      updatePrevNextButtons(this.btnPrev, this.btnNext, this.splide); // go to last/first slide aria might be wrong
    }
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
    unobserveChildren(this.container); // adjust tabindex and aria attributes on slides
    unobserveBreakpointChange(this.host);
    this.splide.destroy();
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const alignHeaderDeprecationMap: Record<
      CarouselAlignHeaderDeprecated,
      Exclude<CarouselAlignHeader, CarouselAlignHeaderDeprecated>
    > = {
      left: 'start',
    };
    warnIfDeprecatedPropValueIsUsed<typeof Carousel, CarouselAlignHeaderDeprecated, CarouselAlignHeader>(
      this,
      'alignHeader',
      alignHeaderDeprecationMap
    );
    warnIfDeprecatedPropIsUsed<typeof Carousel>(this, 'wrapContent');
    warnIfDeprecatedPropIsUsed<typeof Carousel>(this, 'disablePagination', 'Please use pagination prop instead.');
    const hasHeadingPropOrSlot = hasHeading(this.host, this.heading);
    const hasDescriptionPropOrSlot = hasDescription(this.host, this.description);
    const hasControlsSlot = hasNamedSlot(this.host, 'controls');
    this.disablePagination = parseJSON(this.disablePagination) as any; // parsing the value just once per lifecycle
    this.pagination = parseJSON(this.pagination) as any; // parsing the value just once per lifecycle
    attachComponentCss(
      this.host,
      getComponentCss,
      hasHeadingPropOrSlot,
      hasDescriptionPropOrSlot,
      hasControlsSlot,
      this.headingSize,
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
      (alignHeaderDeprecationMap[this.alignHeader] || this.alignHeader) as Exclude<
        CarouselAlignHeader,
        CarouselAlignHeaderDeprecated
      >,
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

    const headingId = 'heading';

    return (
      <Host>
        <div class="header">
          {hasHeadingPropOrSlot && (this.heading ? <h2 id={headingId}>{this.heading}</h2> : <slot name="heading" />)}
          {hasDescriptionPropOrSlot && (this.description ? <p>{this.description}</p> : <slot name="description" />)}
          {hasControlsSlot && <slot name="controls" />}
          <div class="nav">
            {this.skipLinkTarget && (
              <PrefixedTagNames.pLinkPure
                href={this.skipLinkTarget}
                theme={this.theme}
                icon="arrow-last"
                class="btn skip-link"
                alignLabel="start"
                hideLabel={true}
                aria-describedby={this.heading ? headingId : null}
              >
                {/* TODO: make it i18n configurable */}
                Skip carousel entries
              </PrefixedTagNames.pLinkPure>
            )}
            {/* Do not render both buttons conditional in an array, this will cause Next.js SSR to throw Warning: Each child in a list should have a unique "key" prop. */}
            {this.hasNavigation && (
              <PrefixedTagNames.pButtonPure
                {...btnProps}
                icon="arrow-left"
                ref={(ref) => (this.btnPrev = ref)}
                onClick={() => slidePrev(this.splide, this.amountOfPages)}
              />
            )}
            {this.hasNavigation && (
              <PrefixedTagNames.pButtonPure
                {...btnProps}
                icon="arrow-right"
                ref={(ref) => (this.btnNext = ref)}
                onClick={() => slideNext(this.splide, this.amountOfPages)}
                onKeyDown={this.onNextKeyDown}
              />
            )}
          </div>
        </div>

        <div
          id="splide"
          class="splide"
          {...parseAndGetAriaAttributes({
            'aria-label': this.heading,
            ...parseAndGetAriaAttributes(this.aria),
          })}
          ref={(ref) => (this.container = ref)}
          onMouseDown={(e) => e.preventDefault()} // enables native click events on slotted interactive elements
          onFocusin={this.onSplideFocusIn}
        >
          <div class="splide__track">
            <div class="splide__list">
              {this.slides.map((_, i) => (
                <div key={i} class="splide__slide">
                  <slot name={`slide-${i}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {(this.disablePagination ? this.disablePagination !== true : this.pagination) && this.hasNavigation && (
          <div class="pagination-container" aria-hidden="true">
            <div class="pagination" ref={(ref) => (this.paginationEl = ref)}></div>
          </div>
        )}
      </Host>
    );
  }

  private registerSplideHandlers(splide: Splide): void {
    splide.on('mounted', () => {
      if (this.splide.options.drag) {
        updatePrevNextButtons(this.btnPrev, this.btnNext, splide);
        renderPagination(this.paginationEl, this.amountOfPages, this.activeSlideIndex, this.splide); // initial pagination
      }
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
    this.slides = getSlidesAndAddAttributes(this.host);
    this.updateAmountOfPages();
  };

  private updateAmountOfPages = (): void => {
    this.amountOfPages = getAmountOfPages(
      this.slides.length,
      // round to sanitize floating numbers
      this.slidesPerPage === 'auto' ? 1 : Math.round(getCurrentMatchingBreakpointValue(this.slidesPerPage))
    );
    renderPagination(this.paginationEl, this.amountOfPages, this.splide?.index || 0, this.splide);
  };

  private onNextKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Tab' && !e.shiftKey) {
      const activeSlide = this.slides.at(this.splide.index);
      activeSlide.focus();
      e.preventDefault();
    }
  };

  private onSplideFocusIn = (e: FocusEvent & { target: HTMLElement }): void => {
    const { target } = e;
    const { index: splideIndex } = this.splide;
    const slideIndexOfFocusedElement = this.slides.findIndex((slide) => slide.contains(target)); // focussed element is slot or within slide, e.g. link or button
    const slideIsVisible =
      this.splide.Components.Elements.slides[slideIndexOfFocusedElement].classList.contains('is-visible');

    if (splideIndex !== slideIndexOfFocusedElement) {
      if (slideIndexOfFocusedElement > splideIndex && !slideIsVisible) {
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
        }),
      ['aria-hidden']
    );
  }
}
