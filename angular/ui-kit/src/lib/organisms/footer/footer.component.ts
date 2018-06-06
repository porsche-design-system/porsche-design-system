import { Component, Input, OnInit } from '@angular/core';

import { FooterMenu, FooterMenuItem } from './footer.interfaces';

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
  protected currentYear = new Date().getFullYear();

  @Input() showFooterLinkChina: boolean;
  @Input() menu: FooterMenu;
  @Input() metaMenu: FooterMenuItem[];
  @Input() copyrightInfo = `© ${this.currentYear} Porsche Connect GmbH`;

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
