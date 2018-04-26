import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';

@Component({
  selector: `pui-button-ghost`,
  exportAs: 'puiButtonGhost',
  templateUrl: 'button-ghost.component.html',
  styleUrls: [
    '../../../../../node_modules/@porsche/ui-kit-core/src/modules/button/button-ghost.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiButtonGhostComponent implements OnInit {
  @Input() stretch = false;
  @Input() error = false;
  @Input() inverted = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() link = false;
  @Input() icon = '';
  @Input() label = '';

  ngOnInit() {
    this.icon = this.icon ? 'icon--' + this.icon : 'icon--arrow-right-hair'
  }
}
