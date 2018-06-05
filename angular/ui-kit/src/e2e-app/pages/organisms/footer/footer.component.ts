import { Component, OnInit } from '@angular/core';
import { FooterMenuTree } from '../../../../lib/organisms/footer/footer.interfaces';
import { FooterMenuItem } from '../../../../lib/organisms/footer/footer.interfaces';

@Component({
  selector: 'pui-e2e-organisms-footer',
  templateUrl: './footer.component.html'
})
export class PuiE2eOrganismsFooterComponent implements OnInit{
  menuTree: FooterMenuTree;

  ngOnInit(): void {
    const footerMenuItem: FooterMenuItem = {title: "someTitle", url: "https://www.sampleUrl.com"};
    const footerMenuItem2: FooterMenuItem = {title: "someTitle2", url: "https://www.sampleUrl2.com"};
    const otherFooterMenuItem: FooterMenuItem = {title: "someOtherTitle", url: "https://www.otherSampleUrl.com"};
    const otherFooterMenuItem2: FooterMenuItem = {title: "someOtherTitle2", url: "https://www.otherSampleUrl2.com"};
    this.menuTree = [{title: 'My Porsche', items: [footerMenuItem, footerMenuItem2]},
      {title: 'Porsche on Web', items: [otherFooterMenuItem, otherFooterMenuItem2]},
      {title: 'Blah', items: [otherFooterMenuItem, otherFooterMenuItem2]}];
  }

}
