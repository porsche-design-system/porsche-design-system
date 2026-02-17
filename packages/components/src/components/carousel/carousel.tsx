import { gridGap, motionEasingBase } from '@porsche-design-system/emotion';
import { Splide } from '@splidejs/splide';
import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Prop, State, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes, ValidatorFunction } from '../../types';
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
  unobserveBreakpointChange,
  unobserveChildren,
  validateProps,
} from '../../utils';
import type { BreakpointValues } from '../../utils/breakpoint-customizable';
import { carouselTransitionDuration, getComponentCss } from './carousel-styles';
import {
  CAROUSEL_ALIGN_CONTROLS,
  CAROUSEL_ALIGN_HEADERS,
  CAROUSEL_ARIA_ATTRIBUTES,
  CAROUSEL_SLIDES_PER_PAGE,
  CAROUSEL_WIDTHS,
  type CarouselAlignControls,
  type CarouselAlignHeader,
  type CarouselAriaAttribute,
  type CarouselHeadingSize,
  type CarouselInternationalization,
  type CarouselSlidesPerPage,
  type CarouselUpdateEventDetail,
  type CarouselWidth,
  getAmountOfPages,
  getLangDirection,
  getSlidesAndAddAttributes,
  getSplideBreakpoints,
  isInfinitePagination,
  renderPagination,
  slideNext,
  slidePrev,
  updatePagination,
  updatePrevNextButtons,
} from './carousel-utils';

const propTypes: PropTypes<typeof Carousel> = {
  heading: AllowedTypes.string,
  headingSize: AllowedTypes.oneOf<CarouselHeadingSize>(['x-large', 'xx-large']),
  description: AllowedTypes.string,
  alignHeader: AllowedTypes.oneOf<CarouselAlignHeader>(CAROUSEL_ALIGN_HEADERS),
  rewind: AllowedTypes.boolean,
  width: AllowedTypes.oneOf<CarouselWidth>(CAROUSEL_WIDTHS),
  slidesPerPage: AllowedTypes.oneOf<ValidatorFunction>([
    AllowedTypes.breakpoint<CarouselSlidesPerPage>(CAROUSEL_SLIDES_PER_PAGE),
  ]),
  gradient: AllowedTypes.boolean,
  focusOnCenterSlide: AllowedTypes.boolean,
  trimSpace: AllowedTypes.boolean,
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
  activeSlideIndex: AllowedTypes.number,
  skipLinkTarget: AllowedTypes.string,
  alignControls: AllowedTypes.oneOf<CarouselAlignControls>(CAROUSEL_ALIGN_CONTROLS),
};

/**
 * @slot {"name": "heading", "description": "Renders a heading above the carousel." }
 * @slot {"name": "description", "description": "Shows a footer section, flowing under the content area when scrollable." }
 * @slot {"name": "controls", "description": "Shows a sidebar area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "", "description": "Default slot for the carousel slides." }
 *
 * @controlled { "props": ["activeSlideIndex"], "event": "update", "isInternallyMutated": true }
 */
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

  /** Alignment of slotted controls */
  @Prop() public alignControls?: CarouselAlignControls = 'auto';

  /** Whether the slides should rewind from last to first slide and vice versa. */
  @Prop() public rewind?: boolean = false;

  /** Defines the outer spacings between the carousel and the left and right screen sides. */
  @Prop() public width?: CarouselWidth = 'basic';

  /** Sets the amount of slides visible at the same time. Can be set to `auto` if you want to define different widths per slide via CSS. */
  @Prop() public slidesPerPage?: BreakpointCustomizable<CarouselSlidesPerPage> = 1;

  /** If false, the carousel will not show pagination bullets at the bottom. */
  @Prop() public pagination?: BreakpointCustomizable<boolean> = false;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<CarouselAriaAttribute>;

  /** Override the default wordings that are used for aria-labels on the next/prev buttons and pagination. */
  @Prop() public intl?: CarouselInternationalization;

  /** Defines which slide to be active (zero-based numbering). */
  @Prop() public activeSlideIndex?: number = 0;

  /** Defines target of skip link (to skip carousel entries). */
  @Prop() public skipLinkTarget?: string;

  /**
   * Indicates whether focus should be set on the center slide.
   * If true, the carousel loops by individual slide; otherwise, it loops by page.
   */
  @Prop() public focusOnCenterSlide?: boolean = false;

  /** Fades the slides out. */
  @Prop() public gradient?: boolean = false;

  /** Determines whether to trim spaces before/after the carousel if `focusOnCenterSlide` option is true. */
  @Prop() public trimSpace?: boolean = false;

  /** Emitted when carousel's content slides. */
  @Event({ bubbles: false }) public update: EventEmitter<CarouselUpdateEventDetail>;

  @State() private amountOfPages: number;

  private splide: Splide;
  private container: HTMLElement;
  private btnPrev: HTMLPButtonPureElement;
  private btnNext: HTMLPButtonPureElement;
  private paginationEl: HTMLElement;
  private slides: HTMLElement[] = [];

  private get parsedSlidesPerPage(): BreakpointValues<CarouselSlidesPerPage> | number | 'auto' {
    return parseJSON(this.slidesPerPage) as BreakpointValues<CarouselSlidesPerPage> | number | 'auto';
  }

  private get parsedPagination(): BreakpointValues<boolean> | boolean {
    return parseJSON(this.pagination) as BreakpointValues<boolean> | boolean;
  }

  private get splideSlides(): HTMLElement[] {
    return this.splide.Components.Elements.slides;
  }

  private get hasNavigation(): boolean {
    return this.parsedSlidesPerPage === 'auto' || this.amountOfPages > 1;
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
    this.observeSlides(); // initial, adjust aria attributes on slides
    this.splide = new Splide(this.container, {
      start: this.activeSlideIndex,
      arrows: false,
      easing: motionEasingBase,
      focus: this.focusOnCenterSlide ? 'center' : undefined,
      trimSpace: this.trimSpace,
      pagination: false,
      rewind: this.rewind,
      rewindByDrag: true, // only works when rewind: true
      drag: this.hasNavigation,
      perMove: 1,
      mediaQuery: 'min',
      speed: Number.parseFloat(carouselTransitionDuration) * 1000,
      gap: gridGap,
      // TODO: this uses matchMedia internally, since we also use it, there is some redundancy
      breakpoints: getSplideBreakpoints(
        this.parsedSlidesPerPage as Exclude<BreakpointCustomizable<CarouselSlidesPerPage> | 'auto', string>
      ), // eslint-disable-line @typescript-eslint/no-redundant-type-constituents
      // https://splidejs.com/guides/i18n/#default-texts
      i18n: parseJSONAttribute(this.intl || {}), // can only be applied initially atm
      direction: getLangDirection(this.host),
    });

    this.registerSplideHandlers(this.splide);
  }

  public componentDidUpdate(): void {
    this.splide.options = { drag: this.hasNavigation };
    this.splide.refresh(); // needs to happen after render to detect new and removed slides
    if (this.hasNavigation) {
      renderPagination(this.paginationEl, this.getPageCount(), this.splide?.index || 0, this.splide); // update pagination in case the carousel was not draggable before
      updatePrevNextButtons(this.btnPrev, this.btnNext, this.splide); // go to last/first slide aria might be wrong
    }
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
    unobserveChildren(this.container); // adjust aria attributes on slides
    unobserveBreakpointChange(this.host);
    this.splide.destroy();
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const hasHeadingPropOrSlot = hasHeading(this.host, this.heading);
    const hasDescriptionPropOrSlot = hasDescription(this.host, this.description);
    const hasControlsSlot = hasNamedSlot(this.host, 'controls');
    attachComponentCss(
      this.host,
      getComponentCss,
      this.gradient,
      hasHeadingPropOrSlot,
      hasDescriptionPropOrSlot,
      hasControlsSlot,
      this.headingSize,
      this.width,
      this.parsedPagination,
      isInfinitePagination(this.focusOnCenterSlide ? this.slides.length : this.amountOfPages),
      this.alignHeader,
      this.hasNavigation,
      this.alignControls
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const btnProps = {
      class: 'btn',
      type: 'button',
      hideLabel: true,
      // 'aria-controls': 'splide-track', // TODO: cross shadow dom? use native button tag instead of p-button-pure?
    };

    const headingId = 'heading';

    return (
      <Host>
        <div class="header">
          {hasHeadingPropOrSlot &&
            (this.heading ? (
              <h2 class="heading" id={headingId}>
                {this.heading}
              </h2>
            ) : (
              <div class="heading" id={headingId}>
                <slot name="heading" />
              </div>
            ))}
          {hasDescriptionPropOrSlot && (this.description ? <p>{this.description}</p> : <slot name="description" />)}
          {hasControlsSlot && <slot name="controls" />}
          <div class="nav">
            {this.skipLinkTarget && (
              <PrefixedTagNames.pLinkPure
                href={this.skipLinkTarget}
                icon="arrow-last"
                class="btn skip-link"
                alignLabel="start"
                hideLabel={true}
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
                ref={(ref: HTMLPButtonPureElement) => (this.btnPrev = ref)}
                onClick={() => slidePrev(this.splide, this.amountOfPages, this.focusOnCenterSlide)}
              />
            )}
            {this.hasNavigation && (
              <PrefixedTagNames.pButtonPure
                {...btnProps}
                icon="arrow-right"
                ref={(ref: HTMLPButtonPureElement) => (this.btnNext = ref)}
                onClick={() => slideNext(this.splide, this.amountOfPages, this.focusOnCenterSlide)}
                onKeyDown={this.onNextKeyDown}
              />
            )}
          </div>
        </div>
        {/* biome-ignore lint/a11y/noStaticElementInteractions: ok */}
        <div
          id="splide"
          class="splide"
          {...parseAndGetAriaAttributes({
            'aria-labelledby': hasHeadingPropOrSlot && !this.aria ? headingId : undefined,
            ...parseAndGetAriaAttributes(this.aria),
          })}
          ref={(ref) => (this.container = ref)}
          onMouseDown={(e) => e.preventDefault()} // enables native click events on slotted interactive elements
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

        {this.parsedPagination && this.hasNavigation && (
          <div class="pagination-container" aria-hidden="true">
            <div class="pagination" ref={(ref) => (this.paginationEl = ref)} />
          </div>
        )}
      </Host>
    );
  }

  private registerSplideHandlers(splide: Splide): void {
    splide.on('mounted', () => {
      if (this.splide.options.drag) {
        updatePrevNextButtons(this.btnPrev, this.btnNext, splide);
        renderPagination(this.paginationEl, this.getPageCount(), this.activeSlideIndex, this.splide); // initial pagination
      }
    });

    splide.on('move', (activeIndex, previousIndex): void => {
      updatePrevNextButtons(this.btnPrev, this.btnNext, splide);
      updatePagination(this.paginationEl, this.getPageCount(), activeIndex);
      this.update.emit({ activeIndex, previousIndex });
    });

    splide.mount();
  }

  private observeBreakpointChange(): void {
    if (typeof this.parsedSlidesPerPage === 'object') {
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
      getCurrentMatchingBreakpointValue(this.parsedSlidesPerPage) === 'auto'
        ? 1
        : Math.round(getCurrentMatchingBreakpointValue(this.parsedSlidesPerPage as number))
    );
    renderPagination(this.paginationEl, this.getPageCount(), this.splide?.index || 0, this.splide);

    // splideJS needs to be refreshed to apply new 'autoWidth' option which is not supported by splideJS breakpoint feature
    if (this.splide) {
      getCurrentMatchingBreakpointValue(this.parsedSlidesPerPage) === 'auto'
        ? (this.splide.options = { autoWidth: true })
        : false;
      this.splide.refresh();
    }
  };

  private onNextKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Tab' && !e.shiftKey) {
      const activeSlide = this.splideSlides.at(this.splide.index);
      activeSlide.focus();
      e.preventDefault();
    }
  };

  private getPageCount = (): number => (this.focusOnCenterSlide ? this.slides.length : this.amountOfPages);

  private onSplideFocusIn = (e: FocusEvent & { target: HTMLElement }): void => {
    const { target } = e;
    const { index: splideIndex } = this.splide;
    const slideIndexOfFocusedElement = this.splideSlides.findIndex(
      (slide) => slide.querySelector('slot').assignedElements()[0].contains(target) || slide.contains(target)
    ); // focussed element is slot or within slide, e.g. link or button

    const slideIsVisible = this.splideSlides[slideIndexOfFocusedElement].classList.contains('is-visible');

    if (splideIndex !== slideIndexOfFocusedElement) {
      if (slideIndexOfFocusedElement > splideIndex && (!slideIsVisible || this.focusOnCenterSlide)) {
        slideNext(this.splide, this.amountOfPages, this.focusOnCenterSlide);
      } else if (slideIndexOfFocusedElement < splideIndex) {
        slidePrev(this.splide, this.amountOfPages, this.focusOnCenterSlide);
      }
    }
  };

  private observeSlides(): void {
    // splide sets attributes everytime it slides or slides are added, which we need to adjust after wards
    observeChildren(this.container, () => {
      for (const el of this.splideSlides) {
        el.removeAttribute('aria-hidden');
        el.setAttribute('tabindex', '0');
      }
    }, ['aria-hidden']);
  }
}
