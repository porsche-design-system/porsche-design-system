/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tag',
  styles: [
    `
      .playground > div {
        width: 100px;
        overflow: auto;
        border: 1px solid deeppink;
      }
    `,
  ],
  template: `
    <div class="playground light auto-layout" title="should show default tag">
      <p-tag>Default</p-tag>
    </div>

    <div class="playground light auto-layout" title="should show different background colors">
      <p-tag [color]="'background-default'">background-default</p-tag>
      <p-tag [color]="'background-base'">background-base</p-tag>
      <p-tag [color]="'background-surface'">background-surface</p-tag>
      <p-tag [color]="'neutral-contrast-high'">neutral-contrast-high</p-tag>
      <p-tag [color]="'primary'">primary</p-tag>
      <p-tag [color]="'notification-neutral'">notification-neutral</p-tag>
      <p-tag [color]="'notification-info-soft'">notification-info-soft</p-tag>
      <p-tag [color]="'notification-success-soft'">notification-success-soft</p-tag>
      <p-tag [color]="'notification-error-soft'">notification-error-soft</p-tag>
      <p-tag [color]="'notification-warning-soft'">notification-warning-soft</p-tag>
    </div>

    <div class="playground light auto-layout surface" title="should show different background colors on surface background">
      <p-tag [color]="'background-default'">background-default</p-tag>
      <p-tag [color]="'background-base'">background-base</p-tag>
      <p-tag [color]="'background-surface'">background-surface</p-tag>
      <p-tag [color]="'neutral-contrast-high'">neutral-contrast-high</p-tag>
      <p-tag [color]="'primary'">primary</p-tag>
      <p-tag [color]="'notification-neutral'">notification-neutral</p-tag>
      <p-tag [color]="'notification-info-soft'">notification-info-soft</p-tag>
      <p-tag [color]="'notification-success-soft'">notification-success-soft</p-tag>
      <p-tag [color]="'notification-error-soft'">notification-error-soft</p-tag>
      <p-tag [color]="'notification-warning-soft'">notification-warning-soft</p-tag>
    </div>

    <div class="playground light auto-layout" title="should show different background colors and icons">
      <p-tag [icon]="'car'" [color]="'background-default'">background-default</p-tag>
      <p-tag [icon]="'car'" [color]="'background-base'">background-base</p-tag>
      <p-tag [icon]="'car'" [color]="'background-surface'">background-surface</p-tag>
      <p-tag [icon]="'car'" [color]="'neutral-contrast-high'">neutral-contrast-high</p-tag>
      <p-tag [icon]="'car'" [color]="'primary'">primary</p-tag>
      <p-tag [icon]="'car'" [color]="'notification-neutral'">notification-neutral</p-tag>
      <p-tag [icon]="'car'" [color]="'notification-info-soft'">notification-info-soft</p-tag>
      <p-tag [icon]="'car'" [color]="'notification-success-soft'">notification-success-soft</p-tag>
      <p-tag [icon]="'car'" [color]="'notification-error-soft'">notification-error-soft</p-tag>
      <p-tag [icon]="'car'" [color]="'notification-warning-soft'">notification-warning-soft</p-tag>
      <p-tag [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-surface'"> background-surface</p-tag>
    </div>

    <div class="playground light auto-layout" title="should show different background colors with link">
      <p-tag [color]="'background-base'"><a [href]="'#'">background-base link</a></p-tag>
      <p-tag [color]="'background-surface'"><a [href]="'#'">background-surface link</a></p-tag>
      <p-tag [icon]="'car'" [color]="'background-base'"><a [href]="'#'">background-base link</a></p-tag>
      <p-tag [icon]="'highway'" [color]="'background-surface'"><a [href]="'#'">background-surface link</a></p-tag>
      <p-tag [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-base'">
        <a [href]="'#'">background-base link</a>
      </p-tag>
    </div>

    <div class="playground light auto-layout" title="should show different background colors with button">
      <p-tag [color]="'background-base'"><button>background-base button</button></p-tag>
      <p-tag [color]="'background-surface'"><button>background-surface button</button></p-tag>
      <p-tag [icon]="'car'" [color]="'background-base'"><button>background-base button</button></p-tag>
      <p-tag [icon]="'highway'" [color]="'background-surface'">
        <button>background-surface button</button>
      </p-tag>
      <p-tag [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-base'">
        <button>background-base button</button>
      </p-tag>
    </div>

    <div class="playground light auto-layout" title="should not render line break">
      <p-tag>
        Default <br />
        with line break
      </p-tag>
    </div>

    <div class="playground light" title="should not break into multiline although not enough space is given">
      <div>
        <p-tag [color]="'primary'">Text that is very long</p-tag>
        <p-tag [color]="'primary'" [icon]="'car'">Text with icon that is very long</p-tag>
        <p-tag [color]="'notification-success-soft'" [icon]="'car'">
          <a [href]="'#'">Link with icon that is very long</a>
        </p-tag>
        <p-tag [color]="'notification-success-soft'" [icon]="'car'">
          <button>Button with icon that is very long</button>
        </p-tag>
      </div>
    </div>

    <div class="playground light" title="should break into multiline if not enough space is given">
      <div>
        <p-tag [color]="'primary'" style="white-space: normal">Text that is very long</p-tag>
        <p-tag [color]="'primary'" [icon]="'car'" style="white-space: normal">Text with icon that is very long</p-tag>
        <p-tag [color]="'notification-success-soft'" [icon]="'car'" style="white-space: normal">
          <a [href]="'#'">Link with icon that is very long</a>
        </p-tag>
        <p-tag [color]="'notification-success-soft'" [icon]="'car'" style="white-space: normal">
          <button>Button with icon that is very long</button>
        </p-tag>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {}
