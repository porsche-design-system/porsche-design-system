import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { PuiIcon } from '../../../atoms';

@Component({
  selector: 'pui-input',
  templateUrl: './input.component.html',
  styleUrls: [
    '../../../../../node_modules/@porsche/ui-kit-core/src/modules/icon/icon.scss',
    '../../../../../node_modules/@porsche/ui-kit-core/src/modules/form/input.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiInputComponent {
  @Input() styleModifier = '';
  @Input() icon: PuiIcon;
  @Input() error = false;
  @Input() value = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() type = 'text';
  @Input() name = '';
  @Input() label = '';
  @Input() disabled = false;

  constructor() {}

  onValueChanged(value) {
    this.valueChange.emit(value);
  }
}
