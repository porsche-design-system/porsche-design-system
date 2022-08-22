import { JSX, Component, Prop, h, Element, Watch } from '@stencil/core';
import type {
  GridDirection,
  GridDirectionType,
  GridGutter,
  GridGutterType,
  GridWrap,
  GridWrapType,
} from './grid-utils';
import { getComponentCss } from './grid-styles';
import { AllowedTypes, attachComponentCss, updateChildren, validateProps } from '../../../../utils';
import type { PropTypes } from '../../../../types';
import { GRID_DIRECTIONS, GRID_GUTTERS, GRID_WRAPS } from './grid-utils';

const propTypes: PropTypes<typeof Grid> = {
  direction: AllowedTypes.breakpoint<GridDirectionType>(GRID_DIRECTIONS),
  wrap: AllowedTypes.breakpoint<GridWrapType>(GRID_WRAPS),
  gutter: AllowedTypes.breakpoint<GridGutterType>(GRID_GUTTERS),
};

@Component({
  tag: 'p-grid',
  shadow: true,
})
export class Grid {
  @Element() public host!: HTMLElement;

  /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. Also defines the direction for specific breakpoints, like {base: "column", l: "row"}. You always need to provide a base value when doing this. */
  @Prop() public direction?: GridDirection = 'row';

  /** Handles wrapping behaviour of elements. */
  @Prop() public wrap?: GridWrap = 'wrap';

  /** Defines the gutter size for specific breakpoints. You always need to provide a base value when doing this. */
  @Prop() public gutter?: GridGutter = { base: 16, s: 24, m: 36 };

  @Watch('gutter')
  public handleGutterChange(): void {
    updateChildren(this.host);
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.direction, this.wrap, this.gutter);
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
