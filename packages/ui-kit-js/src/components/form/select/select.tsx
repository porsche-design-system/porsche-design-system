import { JSX, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';

@Component({
  tag: 'p-select',
  styleUrl: 'select.scss',
  shadow: true
})
export class Select {
  @Prop() public name?: string = '';

  @Prop() public value?: string = '';

  @Prop() public label?: string = '';

  public render(): JSX.Element {
    const selectClasses = cx(prefix('select'));
    const fieldClasses = cx(prefix('select__field'));
    const iconClasses = cx(prefix('select__icon'));

    return (
      <label class={selectClasses}>
        <select class={fieldClasses} name={this.name}>
          <option selected disabled>{this.label}</option>
          <option>{this.value} 1</option>
          <option>{this.value} 2</option>
          <option>{this.value} 3</option>
        </select>
        <p-icon class={iconClasses} source='double-arrow-down-thin'/>
      </label>
    );
  }
}
