import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import {PuiIcon} from "../../../atoms/icon";

@Component({
  selector: `pui-button-ghost`,
  exportAs: 'puiButtonGhost',
  templateUrl: 'button-ghost.component.html',
  styleUrls: [
    '../../.././../../node_modules/@porsche/ui-kit-core/src/modules/icon/icon.scss',
    '../../.././../../node_modules/@porsche/ui-kit-core/src/modules/loader/loader-base.scss',
    '../../.././../../node_modules/@porsche/ui-kit-core/src/modules/button/button-ghost.scss',
    './button-ghost.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiButtonGhostComponent {
  @Input() stretch = false;
  @Input() error = false;
  @Input() inverted = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() link = false;
  @Input() icon = 'arrow-right-hair';
  @Input() label = '';
  @Input() styleModifier = '';
  Icon: PuiIcon = PuiIcon.ARROW_RIGHT_HAIR
}
