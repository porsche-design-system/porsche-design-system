import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FooterMenuTree } from './footer.interfaces';
import { PuiNotificationErrorInlineComponent } from '../notification/notification-error-inline/notification-error-inline.component';

@Component({
  selector: `pui-footer`,
  exportAs: 'puiFooter',
  templateUrl: './footer.component.html',
  styleUrls: [
    '../../../../node_modules/@porsche/ui-kit-core/src/base/grid/row.scss',
    '../../../../node_modules/@porsche/ui-kit-core/src/base/grid/column.scss',
    '../../../../node_modules/@porsche/ui-kit-core/src/modules/icon/icon.scss',
    '../../../../node_modules/@porsche/ui-kit-core/src/modules/navigation/navigation-footer.scss',
    '../../../../node_modules/@porsche/ui-kit-core/src/modules/footer/footer.scss'
  ]
})
export class PuiFooterComponent implements OnInit {
  @Input() showNavigation: boolean;
  @Input() showFooterLinkChina: boolean;
  @Input() menuTree: FooterMenuTree;
  @Input() metaMenuTree: FooterMenuTree;
  @Input() copyrightYear: string | number = new Date().getFullYear();

  activeSection?: Object;

  constructor() {}
  ngOnInit() {}

  public isActiveSection(section: Object): boolean {
    return this.activeSection === section;
  }

  public toggleActiveSection(section: Object): void {
    if (this.isActiveSection(section)) {
      this.activeSection = undefined;
      return;
    }

    this.activeSection = section;
  }
}
