import { Component, ViewEncapsulation, Input } from '@angular/core';
import { PuiBaseComponent } from '../../../shared';

@Component({
  selector: `pui-loader-base`,
  exportAs: 'puiLoaderBase',
  templateUrl: 'loader-base.component.html',
  styleUrls: [
    '../../../../../node_modules/@porsche/ui-kit-core/src/modules/loader/loader-base.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiLoaderBaseComponent extends PuiBaseComponent {
  @Input() loaderDark = false;
}
