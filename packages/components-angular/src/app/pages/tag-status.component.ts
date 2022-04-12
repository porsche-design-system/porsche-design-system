/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tag-status',
  styles: [
    `
      .playground {
        margin-bottom: -0.5rem;
      }
    
      p-tag-status {
        margin-bottom: 0.5rem;
      }
    
      p-tag-status:not(:last-child) {
        margin-right: 0.5rem;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should show different background colors on light background">
      <p-tag-status>Default</p-tag-status>
      <p-tag-status [color]="'background-default'">Color background-default</p-tag-status>
      <p-tag-status [color]="'background-surface'">Color background-surface</p-tag-status>
      <p-tag-status [color]="'neutral-contrast-high'">Color neutral-contrast-high</p-tag-status>
      <p-tag-status [color]="'notification-neutral'">Color notification-neutral</p-tag-status>
      <p-tag-status [color]="'notification-success'">Color notification-success</p-tag-status>
      <p-tag-status [color]="'notification-error'">Color notification-error</p-tag-status>
      <p-tag-status [color]="'notification-warning'">Color notification-warning</p-tag-status>
    </div>

    <div class="playground light surface" title="should show different background colors on light surface background">
      <p-tag-status>Default</p-tag-status>
      <p-tag-status [color]="'background-default'">Color background-default</p-tag-status>
      <p-tag-status [color]="'background-surface'">Color background-surface</p-tag-status>
      <p-tag-status [color]="'neutral-contrast-high'">Color neutral-contrast-high</p-tag-status>
      <p-tag-status [color]="'notification-neutral'">Color notification-neutral</p-tag-status>
      <p-tag-status [color]="'notification-success'">Color notification-success</p-tag-status>
      <p-tag-status [color]="'notification-error'">Color notification-error</p-tag-status>
      <p-tag-status [color]="'notification-warning'">Color notification-warning</p-tag-status>
    </div>

    <div class="playground dark" title="should show different background colors on dark background">
      <p-tag-status [theme]="'dark'">Default</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'background-default'">Color background-default</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'background-surface'">Color background-surface</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'neutral-contrast-high'">Color neutral-contrast-high</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'notification-neutral'">Color notification-neutral</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'notification-success'">Color notification-success</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'notification-error'">Color notification-error</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'notification-warning'">Color notification-warning</p-tag-status>
    </div>

    <div class="playground dark surface" title="should show different background colors on dark surface background">
      <p-tag-status [theme]="'dark'">Default</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'background-default'">Color background-default</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'background-surface'">Color background-surface</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'neutral-contrast-high'">Color neutral-contrast-high</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'notification-neutral'">Color notification-neutral</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'notification-success'">Color notification-success</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'notification-error'">Color notification-error</p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'notification-warning'">Color notification-warning</p-tag-status>
    </div>

    <div class="playground light" title="should show different background colors and icons on light background">
      <p-tag-status [icon]="'car'" [color]="'background-default'">Color background-default</p-tag-status>
      <p-tag-status [icon]="'highway'" [color]="'background-surface'">Color background-surface</p-tag-status>
      <p-tag-status [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-surface'">
        Color background-surface
      </p-tag-status>
    </div>

    <div class="playground dark" title="should show different background colors and icons on dark background">
      <p-tag-status [theme]="'dark'" [icon]="'car'" [color]="'background-default'">Color background-default</p-tag-status>
      <p-tag-status [theme]="'dark'" [icon]="'highway'" [color]="'background-surface'">Color background-surface</p-tag-status>
      <p-tag-status [theme]="'dark'" [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-surface'">
        Color background-surface
      </p-tag-status>
    </div>

    <div class="playground light" title="should show different background colors with link on light background">
      <p-tag-status [color]="'background-default'"><a [href]="'#'">Color background-default link</a></p-tag-status>
      <p-tag-status [color]="'background-surface'"><a [href]="'#'">Color background-surface link</a></p-tag-status>
      <p-tag-status [icon]="'car'" [color]="'background-default'"><a [href]="'#'">Color background-default link</a></p-tag-status>
      <p-tag-status [icon]="'highway'" [color]="'background-surface'"><a [href]="'#'">Color background-surface link</a></p-tag-status>
      <p-tag-status [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-default'">
        <a [href]="'#'">Color background-default link</a>
      </p-tag-status>
    </div>

    <div class="playground dark" title="should show different background colors with link on dark background">
      <p-tag-status [theme]="'dark'" [color]="'background-default'"><a [href]="'#'">Color background-default link</a></p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'background-surface'"><a [href]="'#'">Color background-surface link</a></p-tag-status>
      <p-tag-status [theme]="'dark'" [icon]="'car'" [color]="'background-default'"
        ><a [href]="'#'">Color background-default link</a></p-tag-status
      >
      <p-tag-status [theme]="'dark'" [icon]="'highway'" [color]="'background-surface'">
        <a [href]="'#'">Color background-surface link</a>
      </p-tag-status>
      <p-tag-status [theme]="'dark'" [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-default'">
        <a [href]="'#'">Color background-default link</a>
      </p-tag-status>
    </div>

    <div class="playground light" title="should show different background colors with button on light background">
      <p-tag-status [color]="'background-default'"><button>Color background-default button</button></p-tag-status>
      <p-tag-status [color]="'background-surface'"><button>Color background-surface button</button></p-tag-status>
      <p-tag-status [icon]="'car'" [color]="'background-default'"><button>Color background-default button</button></p-tag-status>
      <p-tag-status [icon]="'highway'" [color]="'background-surface'">
        <button>Color background-surface button</button>
      </p-tag-status>
      <p-tag-status [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-default'">
        <button>Color background-default button</button>
      </p-tag-status>
    </div>

    <div class="playground dark" title="should show different background colors with button on dark background">
      <p-tag-status [theme]="'dark'" [color]="'background-default'"><button>Color background-default button</button></p-tag-status>
      <p-tag-status [theme]="'dark'" [color]="'background-surface'"><button>Color background-surface button</button></p-tag-status>
      <p-tag-status [theme]="'dark'" [icon]="'car'" [color]="'background-default'"
        ><button>Color background-default button</button></p-tag-status
      >
      <p-tag-status [theme]="'dark'" [icon]="'highway'" [color]="'background-surface'">
        <button>Color background-surface button</button>
      </p-tag-status>
      <p-tag-status [theme]="'dark'" [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-default'">
        <button>Color background-default button</button>
      </p-tag-status>
    </div>

    <div class="playground light" title="should apply custom styles for dedicated slotted content on light background">
      <p-tag-status> Some <b>bold</b>, <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text </p-tag-status>
      <p-tag-status>
        Default <br />
        with line break
      </p-tag-status>
    </div>

    <div class="playground light" title="should show different multiline tags on light background">
      <div style="width: 100px; overflow: auto">
        <p-tag-status [color]="'neutral-contrast-high'">Text that is very long</p-tag-status>
        <p-tag-status [color]="'neutral-contrast-high'" [icon]="'car'">Text with icon that is very long</p-tag-status>
        <p-tag-status [color]="'notification-success'" [icon]="'car'">
          <a [href]="'#'">Link with icon that is very long</a>
        </p-tag-status>
        <p-tag-status [color]="'notification-success'" [icon]="'car'">
          <button>Button with icon that is very long</button>
        </p-tag-status>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagStatusComponent {}
