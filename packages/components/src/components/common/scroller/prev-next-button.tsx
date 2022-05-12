import { h } from '@stencil/core';
import type { FunctionalComponent } from '@stencil/core';
import type { ThemeExtendedElectric } from '../../../types';
import type { Direction } from './scroller-utils';
import { getPrefixedTagNames } from '../../../utils';

type PrevNextButtonProps = {
  host: HTMLElement;
  direction: Direction;
  isHidden: boolean;
  onPrevNextClick: (direction: Direction) => void;
  theme: ThemeExtendedElectric;
};

export const PrevNextButton: FunctionalComponent<PrevNextButtonProps> = ({
  host,
  direction,
  isHidden,
  onPrevNextClick,
  theme,
}) => {
  const actionClasses = {
    ['action']: true,
    [`action--${direction}`]: true,
    ['action--hidden']: isHidden,
  };
  const PrefixedTagNames = getPrefixedTagNames(host);
  // TODO: tabbable has to be customizable
  return (
    <div class={actionClasses}>
      <span class="gradient" />
      <PrefixedTagNames.pButtonPure
        class="button"
        type="button"
        tabbable={false}
        hide-label="true"
        size="inherit"
        icon={direction === 'next' ? 'arrow-head-right' : 'arrow-head-left'}
        onClick={onPrevNextClick}
        theme={theme}
        aria-hidden="true"
      >
        {direction}
      </PrefixedTagNames.pButtonPure>
    </div>
  );
};
