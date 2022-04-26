import { h } from '@stencil/core';
import type { FunctionalComponent } from '@stencil/core';
import { PrevNextButton } from './prev-next-button';
import { scrollOnPrevNextClick } from './horizontal-scrolling-utils';
import type { ThemeExtendedElectric } from '../../../types';

type HorizontalScrollWrapperProps = {
  host: HTMLElement;
  isNextHidden: boolean;
  isPrevHidden: boolean;
  withBar: boolean;
  slottedElements: HTMLElement[];
  scrollAreaElement: HTMLElement;
  theme: ThemeExtendedElectric;
};

//TODO: role="tablist" ? maybe generic?
//TODO: better name for root class?
export const HorizontalScrollWrapper: FunctionalComponent<HorizontalScrollWrapperProps> = ({
  host,
  isNextHidden,
  isPrevHidden,
  withBar,
  slottedElements,
  scrollAreaElement,
  theme,
}) => {
  return (
    <div class="root">
      <div class="scroll-area" role="tablist">
        <div class="scroll-wrapper">
          <slot />
          {withBar && <span class="bar" />}
          <div class="trigger" />
          <div class="trigger" />
        </div>
      </div>
      <PrevNextButton
        host={host}
        direction="prev"
        isNextHidden={isNextHidden}
        isPrevHidden={isPrevHidden}
        scrollOnPrevNextClick={() => scrollOnPrevNextClick(slottedElements, scrollAreaElement, 'prev')}
        theme={theme}
      />
      <PrevNextButton
        host={host}
        direction="next"
        isNextHidden={isNextHidden}
        isPrevHidden={isPrevHidden}
        scrollOnPrevNextClick={() => scrollOnPrevNextClick(slottedElements, scrollAreaElement, 'next')}
        theme={theme}
      />
    </div>
  );
};
