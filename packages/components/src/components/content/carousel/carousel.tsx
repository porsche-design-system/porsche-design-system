import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, THEMES_EXTENDED_ELECTRIC, validateProps } from '../../../utils';
import type { BreakpointCustomizable, PropTypes, ThemeExtendedElectric } from '../../../types';
import { getComponentCss } from './carousel-styles';
import { A11y, Navigation, Pagination, Swiper } from 'swiper';

const propTypes: PropTypes<typeof Carousel> = {
  disablePagination: AllowedTypes.breakpoint('boolean'),
  theme: AllowedTypes.oneOf<ThemeExtendedElectric>(THEMES_EXTENDED_ELECTRIC),
};

@Component({
  tag: 'p-carousel',
  shadow: true,
})
export class Carousel {
  @Element() public host!: HTMLElement;

  @Prop() public disablePagination?: BreakpointCustomizable<boolean> = false;

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: ThemeExtendedElectric = 'light';

  /** Emitted when carousel's position changes. */
  @Event({ bubbles: false }) public carouselChange: EventEmitter<void>;

  private swiperPagination: HTMLElement;
  private swiperNextBtn: HTMLElement;
  private swiperPrevBtn: HTMLElement;

  public componentDidLoad(): void {
    this.host.shadowRoot
      .querySelector('slot')
      .assignedElements()
      .forEach((el) => el.classList.add('swiper-slide'));

    new Swiper(this.host, {
      slidesPerView: 2,
      // slidesPerGroup: 2,
      spaceBetween: 10,
      // cssMode: true,
      modules: [A11y, Navigation, Pagination],
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
        <div class="swiper-wrapper">
          <slot />
        </div>

        <div class="swiper-button-prev" ref={(ref) => (this.swiperPrevBtn = ref)}></div>
        <div class="swiper-button-next" ref={(ref) => (this.swiperNextBtn = ref)}></div>

        <div class="swiper-pagination" ref={(ref) => (this.swiperPagination = ref)}></div>
      </Host>
    );
  }

  // private onButtonClick = (): void => {
  //   this.carouselChange.emit();
  // };
}
