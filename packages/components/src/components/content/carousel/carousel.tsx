import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, THEMES, validateProps } from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import { getComponentCss } from './carousel-styles';
import { A11y, Swiper } from 'swiper';
import { ButtonPure } from '../../action/button-pure/button-pure';

const propTypes: PropTypes<typeof Carousel> = {
  disablePagination: AllowedTypes.breakpoint('boolean'),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-carousel',
  shadow: true,
})
export class Carousel {
  @Element() public host!: HTMLElement;

  @Prop() public disablePagination?: BreakpointCustomizable<boolean> = false;

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when carousel's position changes. */
  @Event({ bubbles: false }) public carouselChange: EventEmitter<void>;

  private swiper: Swiper;
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
    const handleEvent = ({ activeIndex, previousIndex = 0, isBeginning, isEnd }: Swiper): void => {
      this.btnPrev.disabled = isBeginning;
      this.btnNext.disabled = isEnd;

      const { children } = this.pagination;
      children[previousIndex].classList.remove('bullet--active');
      children[activeIndex].classList.add('bullet--active');
    };

    this.swiper = new Swiper(this.swiperContainer, {
      slidesPerView: this.slidesPerView,
      slidesPerGroup: this.slidesPerGroup,
      spaceBetween: 16,
      // cssMode: true,
      modules: [A11y],
      a11y: {
        id: 'swiper', // for stable dom snapshots
      },
      on: {
        init: handleEvent,
        slideChange: handleEvent,
      },
    });
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.disablePagination, this.theme);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class="swiper" ref={(ref) => (this.swiperContainer = ref)}>
          <div class="swiper-wrapper">
            {this.slides.map((_, i) => (
              <div class="swiper-slide">
                <slot name={`slide-${i}`} />
              </div>
            ))}
          </div>

          <PrefixedTagNames.pButtonPure
            class="btn btn--prev"
            icon="arrow-head-left"
            hide-label="true"
            ref={(ref) => (this.btnPrev = ref)}
            onClick={() => this.swiper.slidePrev()}
          >
            Previous slide
          </PrefixedTagNames.pButtonPure>
          <PrefixedTagNames.pButtonPure
            class="btn btn--next"
            icon="arrow-head-right"
            hide-label="true"
            ref={(ref) => (this.btnNext = ref)}
            onClick={() => this.swiper.slideNext()}
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
