import {Component, OnInit, Input} from '@angular/core';
import {PuiComponentComponent} from "../../../shared";

@Component({
  selector: 'pui-notification-error-inline',
  templateUrl: './notification-error-inline.component.html',
  styleUrls: ['../../../../../node_modules/@porsche/ui-kit-core/src/modules/notification/notification-error-inline.scss']
})
export class PuiNotificationErrorInlineComponent extends PuiComponentComponent {
  @Input() message: string;
}
