import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, THEMES, validateProps } from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import { getComponentCss } from './carousel-glide-styles';
import Glide from '@glidejs/glide';
import { ButtonPure } from '../../action/button-pure/button-pure';

const propTypes: PropTypes<typeof CarouselGlide> = {
  disablePagination: AllowedTypes.breakpoint('boolean'),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-carousel-glide',
  shadow: true,
})
export class CarouselGlide {
  @Element() public host!: HTMLElement;

  @Prop() public disablePagination?: BreakpointCustomizable<boolean> = false;

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when carousel's position changes. */
  @Event({ bubbles: false }) public carouselChange: EventEmitter<void>;

  private glide: Glide.Properties & Glide.Static;
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
    // @ts-ignore
    this.glide = new Glide(this.swiperContainer, {
      arrows: false,
      pagination: false,
      drag: false,
      perPage: this.slidesPerView,
      perMove: this.slidesPerGroup,
      gap: 16,
    });

    this.glide.on('mount.before', (): void => {
      const { index } = this.glide;
      this.btnPrev.disabled = index === 0;
      this.btnNext.disabled = index === this.slides.length - 1;

      this.pagination.children[index].classList.add('bullet--active');
    });

    this.glide.on('move', (): void => {
      const { index } = this.glide;
      this.btnPrev.disabled = index === 0;
      this.btnNext.disabled = index === this.slides.length - 1;

      const { children } = this.pagination;
      this.pagination.querySelector('.bullet--active').classList.remove('bullet--active');
      children[index].classList.add('bullet--active');
    });

    this.glide.mount();
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.disablePagination, this.theme);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class="glide" ref={(ref) => (this.swiperContainer = ref)}>
          <div class="glide__track" data-glide-el="track">
            <div class="glide__slides">
              {this.slides.map((_, i) => (
                <div class="glide__slide">
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
            onClick={() => this.glide.go('<')}
          >
            Previous slide
          </PrefixedTagNames.pButtonPure>
          <PrefixedTagNames.pButtonPure
            class="btn btn--next"
            icon="arrow-head-right"
            hide-label="true"
            ref={(ref) => (this.btnNext = ref)}
            onClick={() => this.glide.go('>')}
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
