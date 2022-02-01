/* Auto Generated File */
// @ts-nocheck
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-banner',
  styles: [
    `
      .playground p-banner {
        --p-banner-position-type: static;
      }
      .content-wrapper {
        padding: 300px 0;
      }
    `,
  ],
  template: `
    <div title="should show banner neutral position fixed">
      <p-banner>
        <span slot="title">Some notification position fixed (1)</span>
        <span slot="description">
          Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
        </span>
      </p-banner>
    </div>

    <div class="content-wrapper">
      <div class="playground light" title="should show banner neutral on light background">
        <p-banner>
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground dark" title="should show banner neutral on dark background">
        <p-banner [theme]="'dark'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner warning on light background">
        <p-banner [state]="'warning'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground dark" title="should show banner warning on dark background">
        <p-banner [state]="'warning'" [theme]="'dark'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner error on light background">
        <p-banner [state]="'error'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground dark" title="should show banner error on dark background">
        <p-banner [state]="'error'" [theme]="'dark'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner in persistent mode">
        <p-banner [persistent]="true">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner in extended width">
        <p-banner [width]="'extended'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div *ngIf="allReady" class="playground light" title="should show banner in fluid width">
        <p-banner [width]="'fluid'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent implements OnInit {
  public allReady: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    componentsReady().then(() => {
      this.allReady = true;
      this.cdr.markForCheck();
    });
  }
}
