import { JSX, Element, Component, Host, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { BreakpointCustomizable, mapBreakpointPropToClasses, prefix } from '../../../../utils';

@Component({
  tag: 'p-flex',
  styleUrl: 'flex.scss'
})
export class Flex {
  @Element() public host: HTMLDivElement;
  /**
   * Defines the flex containers content flow if 2 or more containers are siblings of each other.
   */
  @Prop() public flow?: BreakpointCustomizable<'block' | 'inline'> & string = 'block';

  /**
   * If set, overflowing elements will wrap to a new line.
   */
  @Prop() public wrap?: BreakpointCustomizable<'nowrap' | 'wrap' | 'reverse'> & string = 'nowrap';

  /**
   * Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right.
   */
  @Prop() public direction?: BreakpointCustomizable<'row' | 'row-reverse' | 'column' | 'column-reverse'> & string = 'row';

  /**
   * Defines how the flex items are aligned along the main axis.
   */
  @Prop() public justifyContent?: BreakpointCustomizable<
    'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  > &
    string = 'start';

  /**
   * Defines how the flex items are aligned along the cross axis.
   */
  @Prop() public alignItems?: BreakpointCustomizable<'stretch' | 'start' | 'end' | 'center' | 'baseline'> & string = 'stretch';

  /**
   * This aligns a flex container's individual lines when there is extra space in the cross-axis, similar to how "justifyContent" aligns individual items along the main axis.
   * Corresponds to the "alignContent" css property.
   */
  @Prop() public alignContent?: BreakpointCustomizable<
    'stretch' | 'start' | 'end' | 'center' | 'space-between' | 'space-around'
  > &
    string = 'stretch';

  /**
   * Defines the gap between contained children.
   */
  @Prop() public gap?:
    | '0'
    | '4'
    | '8'
    | '16'
    | '24'
    | '32'
    | '40'
    | '48'
    | '56'
    | '64'
    | '72'
    | '80'
    | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'
    | 'g' = '0';

  public render(): JSX.Element {
    const isJsonString = (str: string) => {
      try {
        JSON.parse(str);
        return true;
      } catch (error) {
        return false;
      }
    };

    const parseProp = (prop: string) => {
      return prop && isJsonString(prop) === true ? JSON.parse(prop) : prop;
    };

    const flexClasses = cx(
      prefix('flex'),
      this.flow !== 'block' && mapBreakpointPropToClasses('flex-', parseProp(this.flow)),
      this.wrap !== 'nowrap' && mapBreakpointPropToClasses('flex--wrap', parseProp(this.wrap)),
      this.direction !== 'row' && mapBreakpointPropToClasses('flex--direction', parseProp(this.direction)),
      this.justifyContent !== 'start' &&
        mapBreakpointPropToClasses('flex--justify-content', parseProp(this.justifyContent)),
      this.alignItems !== 'stretch' && mapBreakpointPropToClasses('flex--align-items', parseProp(this.alignItems)),
      this.alignContent !== 'stretch' &&
        mapBreakpointPropToClasses('flex--align-content', parseProp(this.alignContent)),
      this.gap !== '0' && prefix(`spacing-m-nl--${this.gap}`),
      this.gap !== '0' && prefix(`spacing-m-nr--${this.gap}`)
    );

    const spacingFlexItemLeftClass = this.gap !== '0' && prefix(`spacing-pl--${this.gap}`);
    const spacingFlexItemRightClass = this.gap !== '0' && prefix(`spacing-pr--${this.gap}`);

    return (
      <Host class={flexClasses}>
        {this.gap !== '0' &&
          Array.from(this.host.children).map((child) =>
            child.classList.add(spacingFlexItemLeftClass, spacingFlexItemRightClass)
          )}
      </Host>
    );
  }
}
