import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, THEMES, validateProps } from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import { getComponentCss } from './carousel-styles';
import { A11y, Navigation, Pagination, Swiper } from 'swiper';

const propTypes: PropTypes<typeof CarouselAlt> = {
  disablePagination: AllowedTypes.breakpoint('boolean'),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-carousel-alt',
  shadow: true,
})
export class CarouselAlt {
  @Element() public host!: HTMLElement;

  @Prop() public disablePagination?: BreakpointCustomizable<boolean> = false;

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when carousel's position changes. */
  @Event({ bubbles: false }) public carouselChange: EventEmitter<void>;

  private swiperContainer: HTMLElement;
  private swiperPagination: HTMLElement;
  private swiperNextBtn: HTMLElement;
  private swiperPrevBtn: HTMLElement;
  private slides: HTMLElement[];

  public componentWillLoad(): void {
    this.slides = Array.from(this.host.children) as HTMLElement[];
    this.slides.forEach((el, i) => el.setAttribute('slot', 'slide-' + i));
  }

  public componentDidLoad(): void {
    new Swiper(this.swiperContainer, {
      slidesPerView: 1,
      // slidesPerGroup: 3,
      spaceBetween: 10,
      // cssMode: true,
      modules: [A11y, Navigation, Pagination],
      a11y: {
        id: 'swiper', // for stable dom snapshots
      },
      navigation: {
        nextEl: this.swiperNextBtn,
        prevEl: this.swiperPrevBtn,
      },
      pagination: {
        el: this.swiperPagination,
        clickable: true,
      },
    });
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.disablePagination, this.theme);
  }

  public render(): JSX.Element {
    // const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class="swiper" ref={(ref) => (this.swiperContainer = ref)}>
          <div class="swiper-wrapper">
            {this.slides.map((_, i) => (
              <div class="swiper-slide">
                <slot name={'slide-' + i} />
              </div>
            ))}
          </div>

          <div class="swiper-button-prev" ref={(ref) => (this.swiperPrevBtn = ref)}></div>
          <div class="swiper-button-next" ref={(ref) => (this.swiperNextBtn = ref)}></div>

          <div class="swiper-pagination" ref={(ref) => (this.swiperPagination = ref)}></div>
        </div>
      </Host>
    );
  }

  // private onButtonClick = (): void => {
  //   this.carouselChange.emit();
  // };
}
