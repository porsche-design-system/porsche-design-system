import { Component, Element, Event, EventEmitter, h, JSX, Prop, State } from '@stencil/core';
import type { Theme } from '../../../../types';
import { attachComponentCss, getPrefixedTagNames, getScrollerElements } from '../../../../utils';
import { getComponentCss } from './stepper-horizontal-styles';
import { StepChangeEvent } from './stepper-horizontal-utils';
import { getScrollActivePosition } from '../../tabs-bar/tabs-bar-utils';
import { ScrollToPosition } from '../../../common/scroller/scroller-utils';

@Component({
  tag: 'p-stepper-horizontal',
  shadow: true,
})
export class StepperHorizontal {
  @Element() public host!: HTMLElement;

  /** Adapts the tag color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when active step is changed. */
  @Event({ bubbles: false }) public stepChange: EventEmitter<StepChangeEvent>;

  @State() public stepperHorizontalItems: HTMLPStepperHorizontalItemElement[] = [];
  @State() private scroll: ScrollToPosition;

  private scrollAreaElement: HTMLElement;
  private prevGradientElement: HTMLElement;
  private scrollerElement: HTMLElement;

  public connectedCallback(): void {
    this.defineStepperHorizontalItemElements();
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();

    this.addEventListeners();
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <PrefixedTagNames.pScroller
        theme={this.theme}
        ref={(el) => (this.scrollerElement = el)}
        scrollToPosition={this.scroll}
      >
        <div class="item-wrapper">
          <slot />
        </div>
      </PrefixedTagNames.pScroller>
    );
  }

  private addEventListeners = (): void => {
    this.scrollAreaElement.addEventListener('click', (e) => {
      // TODO: handle issue by clicking in between buttons
      const target = e.target as HTMLPStepperHorizontalItemElement;
      const prevStepIndex = this.stepperHorizontalItems.findIndex((e) => e.state === 'current' && !e.disabled);
      const activeStepIndex = this.stepperHorizontalItems.indexOf(target);
      const state = target.state;

      const direction = activeStepIndex > prevStepIndex ? 'next' : 'prev';
      const scrollActivePosition = getScrollActivePosition(
        this.stepperHorizontalItems,
        direction,
        activeStepIndex,
        this.scrollAreaElement.offsetWidth,
        this.prevGradientElement.offsetWidth
      );

      this.scroll = { scrollPosition: scrollActivePosition, isSmooth: true };

      this.stepChange.emit({ activeStepIndex, state, prevStepIndex });
    });
  };

  private defineHTMLElements = (): void => {
    const { scrollAreaElement, prevGradientElement } = getScrollerElements(this.scrollerElement);
    this.scrollAreaElement = scrollAreaElement;
    this.prevGradientElement = prevGradientElement;
  };

  private defineStepperHorizontalItemElements = (): void => {
    this.stepperHorizontalItems = Array.from(this.host.children) as HTMLPStepperHorizontalItemElement[];
  };
}
