import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, hasPropValueChanged, validateProps } from '../../utils';
import { getComponentCss } from './heading-styles';
import {
  getHeadingTagType,
  HEADING_ALIGNS,
  HEADING_COLORS,
  HEADING_SIZES,
  HEADING_TAGS,
  HEADING_WEIGHTS,
  type HeadingAlign,
  type HeadingColor,
  type HeadingSize,
  type HeadingTag,
  type HeadingWeight,
} from './heading-utils';

const propTypes: PropTypes<typeof Heading> = {
  tag: AllowedTypes.oneOf<HeadingTag>([undefined, ...HEADING_TAGS]),
  size: AllowedTypes.breakpoint<HeadingSize>(HEADING_SIZES),
  weight: AllowedTypes.oneOf<HeadingWeight>(HEADING_WEIGHTS),
  align: AllowedTypes.oneOf<HeadingAlign>(HEADING_ALIGNS),
  color: AllowedTypes.oneOf<HeadingColor>(HEADING_COLORS),
  ellipsis: AllowedTypes.boolean,
};

/**
 * @slot {"name": "", "description": "Default slot to render the heading." }
 */
@Component({
  tag: 'p-heading',
  shadow: true,
})
export class Heading {
  @Element() public host!: HTMLElement;

  /** Sets a heading tag, so it fits correctly within the outline of the page. */
  @Prop() public tag?: HeadingTag;

  /** Size of the component. Also defines the size for specific breakpoints, like {base: "md", l: "2xl"}. You always need to provide a base value when doing this. */
  @Prop() public size?: BreakpointCustomizable<HeadingSize> = '2xl';

  /** The weight of the heading. */
  @Prop() public weight?: HeadingWeight = 'normal';

  /** Text alignment of the component. */
  @Prop() public align?: HeadingAlign = 'start';

  /** Basic text color variations. */
  @Prop() public color?: HeadingColor = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.weight, this.align, this.color, this.ellipsis);

    const TagType = getHeadingTagType(this.host, this.size, this.tag);

    return (
      <TagType class="root">
        <slot />
      </TagType>
    );
  }
}
