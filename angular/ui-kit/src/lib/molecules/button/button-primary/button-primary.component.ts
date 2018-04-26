import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pui-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['../../.././../../node_modules/@porsche/ui-kit-core/src/modules/button/button-primary.scss']
})
export class PuiButtonPrimaryComponent implements OnInit{
  @Input() link = false;
  @Input() error = false;
  @Input() black = false;
  @Input() red = false;
  @Input() acidGreen = false;
  @Input() stretch = false;
  @Input() buttonGroup = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon = '';
  @Input() label = '';

  ngOnInit() {
    this.icon = this.icon ? 'icon--' + this.icon : 'icon--arrow-right-hair'
  }
}
