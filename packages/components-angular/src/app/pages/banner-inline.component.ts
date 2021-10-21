import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-banner-inline',
  template: `
    <div class="playground light" title="should show banner-inline neutral on light background">
      <p-banner-inline
        [heading]="'Some banner-inline heading'"
        [description]="'Some banner-inline description.'"
      ></p-banner-inline>
    </div>

    <div class="playground dark" title="should show banner-inline neutral on dark background">
      <p-banner-inline
        [heading]="'Some banner-inline heading'"
        [description]="'Some banner-inline description.'"
        [theme]="'dark'"
      ></p-banner-inline>
    </div>

    <div class="playground light" title="should show banner-inline warning on light background">
      <p-banner-inline
        [heading]="'Some warning banner-inline heading'"
        [description]="'Some banner-inline description.'"
        [state]="'warning'"
      ></p-banner-inline>
    </div>

    <div class="playground dark" title="should show banner-inline warning on dark background">
      <p-banner-inline
        [heading]="'Some warning banner-inline heading'"
        [description]="'Some banner-inline description.'"
        [state]="'warning'"
        [theme]="'dark'"
      ></p-banner-inline>
    </div>

    <div class="playground light" title="should show banner-inline success on light background">
      <p-banner-inline
        [heading]="'Some success banner-inline heading'"
        [description]="'Some banner-inline description.'"
        [state]="'success'"
      ></p-banner-inline>
    </div>

    <div class="playground dark" title="should show banner-inline success on dark background">
      <p-banner-inline
        [heading]="'Some success banner-inline heading'"
        [description]="'Some banner-inline description.'"
        [state]="'success'"
        [theme]="'dark'"
      ></p-banner-inline>
    </div>

    <div class="playground light" title="should show banner-inline error on light background">
      <p-banner-inline
        [heading]="'Some error banner-inline heading'"
        [description]="'Some banner-inline description.'"
        [state]="'error'"
      ></p-banner-inline>
    </div>

    <div class="playground dark" title="should show banner-inline error on dark background">
      <p-banner-inline
        [heading]="'Some error banner-inline heading'"
        [description]="'Some banner-inline description.'"
        [state]="'error'"
        [theme]="'dark'"
      ></p-banner-inline>
    </div>

    <div class="playground light" title="should show banner-inline with slotted content on light background">
      <p-banner-inline>
        <span slot="heading">Some slotted banner-inline heading</span>
        Some slotted banner-inline description. And some <a href="https://www.porsche.com/">LINK</a> element.
      </p-banner-inline>
    </div>

    <div class="playground dark" title="should show banner-inline with slotted content on dark background">
      <p-banner-inline [theme]="'dark'">
        <span slot="heading">Some slotted banner-inline heading</span>
        Some slotted banner-inline description. And some <a href="https://www.porsche.com/">LINK</a> element.
      </p-banner-inline>
    </div>

    <div class="playground light" title="should show banner-inline with action button">
      <p-banner-inline
        [heading]="'Some action button banner-inline heading'"
        [description]="'Some banner-inline description.'"
        action-label="Some action"
        action-icon="arrow-double-right"
      ></p-banner-inline>
    </div>

    <div class="playground light" title="should show banner-inline in persistent mode">
      <p-banner-inline
        [heading]="'Some persistent banner-inline heading'"
        [description]="'Some banner-inline description.'"
        [persistent]="true"
      ></p-banner-inline>
    </div>

    <div class="playground light" title="should show banner-inline in persistent mode with action button">
      <p-banner-inline
        [heading]="'Some persistent banner-inline heading'"
        [description]="'Some banner-inline description.'"
        [persistent]="true"
        [action-label]="'Some action'"
      ></p-banner-inline>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerInlineComponent {}
