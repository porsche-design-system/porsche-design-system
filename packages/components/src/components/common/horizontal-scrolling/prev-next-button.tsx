import { h } from '@stencil/core';
import type { FunctionalComponent } from '@stencil/core';
import type { ThemeExtendedElectric } from '../../../types';
import type { Direction } from './horizontal-scrolling-utils';
import { getPrefixedTagNames } from '../../../utils';

type PrevNextButtonProps = {
  host: HTMLElement;
  direction: Direction;
  isHidden: boolean;
  scrollOnPrevNextClick: () => void;
  theme: ThemeExtendedElectric;
};

export const PrevNextButton: FunctionalComponent<PrevNextButtonProps> = ({
  host,
  direction,
  isHidden,
  scrollOnPrevNextClick,
  theme,
}) => {
  const actionClasses = {
    ['action']: true,
    [`action--${direction}`]: true,
    ['action--hidden']: isHidden,
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
        icon={direction === 'next' ? 'arrow-head-right' : 'arrow-head-left'}
        onClick={scrollOnPrevNextClick}
        theme={theme}
        aria-hidden="true"
      >
        {direction}
      </PrefixedTagNames.pButtonPure>
    </div>
  );
};
