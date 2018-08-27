import {
  Component,
  ViewEncapsulation,
  Input,
  Renderer2,
  ElementRef
} from '@angular/core';

@Component({
  selector: `pui-page-header`,
  templateUrl: 'page-header.component.html',
  styleUrls: [
    '../../../../node_modules/@porsche/ui-kit-core/src/modules/page-header/page-header.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiPageHeaderComponent {
  @Input()
  title = '';
  @Input()
  description: string;
  @Input()
  styleModifier = '';
}
