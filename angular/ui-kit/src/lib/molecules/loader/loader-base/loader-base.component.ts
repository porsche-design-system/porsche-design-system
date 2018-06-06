import { Component, ViewEncapsulation, Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: `pui-loader-base`,
  exportAs: 'puiLoaderBase',
  templateUrl: 'loader-base.component.html',
  styleUrls: [
    '../../../../../node_modules/@porsche/ui-kit-core/src/modules/loader/loader-base.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiLoaderBaseComponent {
  @Input() loaderDark = false;
  @Input() styleModifier = '';
}
