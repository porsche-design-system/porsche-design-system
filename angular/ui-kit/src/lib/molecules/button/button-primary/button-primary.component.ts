import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pui-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: [
    '../../.././../../node_modules/@porsche/ui-kit-core/src/modules/icon/icon.scss',
    '../../.././../../node_modules/@porsche/ui-kit-core/src/modules/loader/loader-base.scss',
    '../../.././../../node_modules/@porsche/ui-kit-core/src/modules/button/button-primary.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiButtonPrimaryComponent{
  @Input() link = false;
  @Input() error = false;
  @Input() black = false;
  @Input() red = false;
  @Input() acidGreen = false;
  @Input() stretch = false;
  @Input() buttonGroup = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon = 'arrow-right-hair';
  @Input() label = '';
  @Input() styleModifier = '';
}

