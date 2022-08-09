import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, THEMES, validateProps } from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import { getComponentCss } from './carousel-splide-styles';
import { Splide } from '@splidejs/splide';
import { ButtonPure } from '../../action/button-pure/button-pure';

const propTypes: PropTypes<typeof CarouselSplide> = {
  disablePagination: AllowedTypes.breakpoint('boolean'),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-carousel-splide',
  shadow: true,
})
export class CarouselSplide {
  @Element() public host!: HTMLElement;

  @Prop() public disablePagination?: BreakpointCustomizable<boolean> = false;

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when carousel's position changes. */
  @Event({ bubbles: false }) public carouselChange: EventEmitter<void>;

  private splide: Splide;
  private swiperContainer: HTMLElement;
  private btnPrev: ButtonPure;
  private btnNext: ButtonPure;
  private pagination: HTMLElement;
  private slides: HTMLElement[];
  private slidesPerView = 1; // 1
  private slidesPerGroup = 1; // 1

  public componentWillLoad(): void {
    this.slides = Array.from(this.host.children) as HTMLElement[];
    this.slides.forEach((el, i) => el.setAttribute('slot', `slide-${i}`));
  }

  public componentDidLoad(): void {
    this.splide = new Splide(this.swiperContainer, {
      arrows: false,
      pagination: false,
      drag: false,
      perPage: this.slidesPerView,
      perMove: this.slidesPerGroup,
      gap: 16,
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
        <div class="splide" ref={(ref) => (this.swiperContainer = ref)}>
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

  // private onButtonClick = (): void => {
  //   this.carouselChange.emit();
  // };
}
