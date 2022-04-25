import { h } from '@stencil/core';
import type { FunctionalComponent } from '@stencil/core';
import type { ThemeExtendedElectric } from '../../../types';
import type { Direction } from './horizontal-scrolling-utils';
import { getPrefixedTagNames } from '../../../utils';

type PrevNextButtonProps = {
  host: HTMLElement;
  direction: Direction;
  isNextHidden: boolean;
  isPrevHidden: boolean;
  scrollOnPrevNextClick: (direction: Direction) => void;
  theme: ThemeExtendedElectric;
};

export const PrevNextButton: FunctionalComponent<PrevNextButtonProps> = ({
  host,
  direction,
  isNextHidden,
  isPrevHidden,
  scrollOnPrevNextClick,
  theme,
}) => {
  const isDirectionNext = direction === 'next';
  const actionClasses = {
    ['action']: true,
    [`action--${direction}`]: true,
    ['action--hidden']: isDirectionNext ? isNextHidden : isPrevHidden,
  };
  const PrefixedTagNames = getPrefixedTagNames(host);

  return (
    <div class={actionClasses}>
      <span class="gradient" />
      <PrefixedTagNames.pButtonPure
        type="button"
        tabbable={false}
        hide-label="true"
        size="inherit"
        icon={isDirectionNext ? 'arrow-head-right' : 'arrow-head-left'}
        onClick={() => scrollOnPrevNextClick(direction)}
        theme={theme}
        aria-hidden="true"
      >
        {direction}
      </PrefixedTagNames.pButtonPure>
    </div>
  );
};
