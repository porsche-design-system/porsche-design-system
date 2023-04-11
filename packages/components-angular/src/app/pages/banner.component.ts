/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-banner',
  styles: [
    `
      .playground {
        padding: 0;
        transform: translate3d(0, 0, 0);
        margin: 16px 0;
        height: 20rem;
      }
    `,
  ],
  template: `
    <div class="visualize-grid">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div
      class="playground light"
      title="should show banner with heading and description on light background"
      style="background: transparent"
    >
      <p-banner [open]="true" [heading]="'Heading'" [description]="'Description'"></p-banner>
    </div>

    <div class="playground light" title="should show banner with slotted heading and description on light background">
      <p-banner [open]="true">
        <span slot="heading">Slotted heading</span>
        <span slot="description">
          <span>
            Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-banner>
    </div>

    <div class="playground light" title="should show banner on light background">
      <p-banner [open]="true">
        <span slot="title">Slotted title</span>
        <span slot="description">
          <span>
            Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-banner>
    </div>

    <div class="playground light" title="should show banner with state neutral on light background">
      <p-banner [open]="true" [state]="'neutral'">
        <span slot="title">Slotted Title (state=neutral)</span>
        <span slot="description">
          <span>
            Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-banner>
    </div>

    <div class="playground dark" title="should show banner on dark background">
      <p-banner [open]="true" [theme]="'dark'">
        <span slot="title">Slotted Title</span>
        <span slot="description">
          <span>
            Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-banner>
    </div>

    <div class="playground dark" title="should show banner with state neutral on dark background">
      <p-banner [open]="true" [state]="'neutral'" [theme]="'dark'">
        <span slot="title">Slotted Title (state=neutral)</span>
        <span slot="description">
          <span>
            Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-banner>
    </div>

    <div class="playground light" title="should show banner warning on light background">
      <p-banner [open]="true" [state]="'warning'">
        <span slot="title">Slotted Title (state=warning)</span>
        <span slot="description">
          <span>
            Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-banner>
    </div>

    <div class="playground dark" title="should show banner warning on dark background">
      <p-banner [open]="true" [state]="'warning'" [theme]="'dark'">
        <span slot="title">Slotted Title (state=warning)</span>
        <span slot="description">
          <span>
            Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-banner>
    </div>

    <div class="playground light" title="should show banner error on light background">
      <p-banner [open]="true" [state]="'error'">
        <span slot="title">Slotted Title (state=error)</span>
        <span slot="description">
          <span>
            Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-banner>
    </div>

    <div class="playground dark" title="should show banner error on dark background">
      <p-banner [open]="true" [state]="'error'" [theme]="'dark'">
        <span slot="title">Slotted Title (state=error)</span>
        <span slot="description">
          <span>
            Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-banner>
    </div>

    <div class="playground light" title="should show banner in persistent mode">
      <p-banner [open]="true" [persistent]="true">
        <span slot="title">Slotted Title (persistent=true)</span>
        <span slot="description">Slotted description</span>
      </p-banner>
    </div>

    <div class="playground light" title="should show banner without dismiss button">
      <p-banner [open]="true" [dismissButton]="false">
        <span slot="title">Slotted Title (dismissButton=false)</span>
        <span slot="description">Slotted description</span>
      </p-banner>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {}
