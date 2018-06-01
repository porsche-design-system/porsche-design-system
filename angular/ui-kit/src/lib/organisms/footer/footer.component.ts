import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FooterMenuTree } from './footer.interfaces';

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
export class FooterUiComponent implements OnInit {
  @Input() showNavigation: boolean;
  @Input() showFooterLinkChina: boolean;
  @Input() showLanguageChooser: boolean;
  @Input() menuTree: FooterMenuTree;
  @Input() copyrightYear: string | number = new Date().getFullYear();
  @Input() language: string;
  @Input() languages: { value: string; name: string }[];
  @Output() languageChange: EventEmitter<string> = new EventEmitter();

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

  public onLanguageChange(language: string) {
    this.languageChange.emit(language);
  }

  // TODO: link interpolation for VIN still missing (will be done with migration of linkdata service).
  // What is the equivalent to `$interpolate` in Angular?
  //
  // Generic question:
  // Should this be even implemented here or as part of the link data service?  VIN interpolation
  // is not specific to the footer but more specific to the link data service.
}
