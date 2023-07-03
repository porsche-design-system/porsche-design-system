/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tag',
  styles: [
    `
      .playground {
        margin-bottom: -0.5rem;
      }
    
      p-tag {
        margin-bottom: 0.5rem;
      }
    
      p-tag:not(:last-child) {
        margin-right: 0.5rem;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should show default tag on light background">
      <p-tag>Default</p-tag>
    </div>

    <div class="playground light" title="should show different background colors on light background">
      <p-tag [color]="'background-default'">Color background-default</p-tag>
      <p-tag [color]="'background-base'">Color background-base</p-tag>
      <p-tag [color]="'background-surface'">Color background-surface</p-tag>
      <p-tag [color]="'neutral-contrast-high'">Color neutral-contrast-high</p-tag>
      <p-tag [color]="'primary'">Color primary</p-tag>
      <p-tag [color]="'notification-neutral'">Color notification-neutral</p-tag>
      <p-tag [color]="'notification-info-soft'">Color notification-info-soft</p-tag>
      <p-tag [color]="'notification-success-soft'">Color notification-success-soft</p-tag>
      <p-tag [color]="'notification-error-soft'">Color notification-error-soft</p-tag>
      <p-tag [color]="'notification-warning-soft'">Color notification-warning-soft</p-tag>
    </div>

    <div class="playground light surface" title="should show different background colors on light surface background">
      <p-tag [color]="'background-default'">Color background-default</p-tag>
      <p-tag [color]="'background-base'">Color background-base</p-tag>
      <p-tag [color]="'background-surface'">Color background-surface</p-tag>
      <p-tag [color]="'neutral-contrast-high'">Color neutral-contrast-high</p-tag>
      <p-tag [color]="'primary'">Color primary</p-tag>
      <p-tag [color]="'notification-neutral'">Color notification-neutral</p-tag>
      <p-tag [color]="'notification-info-soft'">Color notification-info-soft</p-tag>
      <p-tag [color]="'notification-success-soft'">Color notification-success-soft</p-tag>
      <p-tag [color]="'notification-error-soft'">Color notification-error-soft</p-tag>
      <p-tag [color]="'notification-warning-soft'">Color notification-warning-soft</p-tag>
    </div>

    <div class="playground dark" title="should show different background colors on dark background">
      <p-tag [theme]="'dark'" [color]="'background-default'">Color background-default</p-tag>
      <p-tag [theme]="'dark'" [color]="'background-base'">Color background-base</p-tag>
      <p-tag [theme]="'dark'" [color]="'background-surface'">Color background-surface</p-tag>
      <p-tag [theme]="'dark'" [color]="'neutral-contrast-high'">Color neutral-contrast-high</p-tag>
      <p-tag [theme]="'dark'" [color]="'primary'">Color primary</p-tag>
      <p-tag [theme]="'dark'" [color]="'notification-neutral'">Color notification-neutral</p-tag>
      <p-tag [theme]="'dark'" [color]="'notification-info-soft'">Color notification-info-soft</p-tag>
      <p-tag [theme]="'dark'" [color]="'notification-success-soft'">Color notification-success-soft</p-tag>
      <p-tag [theme]="'dark'" [color]="'notification-error-soft'">Color notification-error-soft</p-tag>
      <p-tag [theme]="'dark'" [color]="'notification-warning-soft'">Color notification-warning-soft</p-tag>
    </div>

    <div class="playground dark surface" title="should show different background colors on dark surface background">
      <p-tag [theme]="'dark'" [color]="'background-default'">Color background-default</p-tag>
      <p-tag [theme]="'dark'" [color]="'background-base'">Color background-base</p-tag>
      <p-tag [theme]="'dark'" [color]="'background-surface'">Color background-surface</p-tag>
      <p-tag [theme]="'dark'" [color]="'neutral-contrast-high'">Color neutral-contrast-high</p-tag>
      <p-tag [theme]="'dark'" [color]="'primary'">Color primary</p-tag>
      <p-tag [theme]="'dark'" [color]="'notification-neutral'">Color notification-neutral</p-tag>
      <p-tag [theme]="'dark'" [color]="'notification-info-soft'">Color notification-info-soft</p-tag>
      <p-tag [theme]="'dark'" [color]="'notification-success-soft'">Color notification-success-soft</p-tag>
      <p-tag [theme]="'dark'" [color]="'notification-error-soft'">Color notification-error-soft</p-tag>
      <p-tag [theme]="'dark'" [color]="'notification-warning-soft'">Color notification-warning-soft</p-tag>
    </div>

    <div class="playground light" title="should show different background colors and icons on light background">
      <p-tag [icon]="'car'" [color]="'background-default'">Color background-default</p-tag>
      <p-tag [icon]="'car'" [color]="'background-base'">Color background-base</p-tag>
      <p-tag [icon]="'car'" [color]="'background-surface'">Color background-surface</p-tag>
      <p-tag [icon]="'car'" [color]="'neutral-contrast-high'">Color neutral-contrast-high</p-tag>
      <p-tag [icon]="'car'" [color]="'primary'">Color primary</p-tag>
      <p-tag [icon]="'car'" [color]="'notification-neutral'">Color notification-neutral</p-tag>
      <p-tag [icon]="'car'" [color]="'notification-info-soft'">Color notification-info-soft</p-tag>
      <p-tag [icon]="'car'" [color]="'notification-success-soft'">Color notification-success-soft</p-tag>
      <p-tag [icon]="'car'" [color]="'notification-error-soft'">Color notification-error-soft</p-tag>
      <p-tag [icon]="'car'" [color]="'notification-warning-soft'">Color notification-warning-soft</p-tag>
      <p-tag [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-surface'"> Color background-surface</p-tag>
    </div>

    <div class="playground dark" title="should show different background colors and icons on dark background">
      <p-tag [theme]="'dark'" [icon]="'car'" [color]="'background-default'">Color background-default</p-tag>
      <p-tag [theme]="'dark'" [icon]="'car'" [color]="'background-base'">Color background-base</p-tag>
      <p-tag [theme]="'dark'" [icon]="'car'" [color]="'background-surface'">Color background-surface</p-tag>
      <p-tag [theme]="'dark'" [icon]="'car'" [color]="'neutral-contrast-high'">Color neutral-contrast-high</p-tag>
      <p-tag [theme]="'dark'" [icon]="'car'" [color]="'primary'">Color primary</p-tag>
      <p-tag [theme]="'dark'" [icon]="'car'" [color]="'notification-neutral'">Color notification-neutral</p-tag>
      <p-tag [theme]="'dark'" [icon]="'car'" [color]="'notification-info-soft'">Color notification-info-soft</p-tag>
      <p-tag [theme]="'dark'" [icon]="'car'" [color]="'notification-success-soft'">Color notification-success-soft</p-tag>
      <p-tag [theme]="'dark'" [icon]="'car'" [color]="'notification-error-soft'">Color notification-error-soft</p-tag>
      <p-tag [theme]="'dark'" [icon]="'car'" [color]="'notification-warning-soft'">Color notification-warning-soft</p-tag>
      <p-tag [theme]="'dark'" [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-surface'">
        Color background-surface</p-tag
      >
    </div>

    <div class="playground light" title="should show different background colors with link on light background">
      <p-tag [color]="'background-base'"><a [href]="'#'">Color background-base link</a></p-tag>
      <p-tag [color]="'background-surface'"><a [href]="'#'">Color background-surface link</a></p-tag>
      <p-tag [icon]="'car'" [color]="'background-base'"><a [href]="'#'">Color background-base link</a></p-tag>
      <p-tag [icon]="'highway'" [color]="'background-surface'"><a [href]="'#'">Color background-surface link</a></p-tag>
      <p-tag [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-base'">
        <a [href]="'#'">Color background-base link</a>
      </p-tag>
    </div>

    <div class="playground dark" title="should show different background colors with link on dark background">
      <p-tag [theme]="'dark'" [color]="'background-base'"><a [href]="'#'">Color background-base link</a></p-tag>
      <p-tag [theme]="'dark'" [color]="'background-surface'"><a [href]="'#'">Color background-surface link</a></p-tag>
      <p-tag [theme]="'dark'" [icon]="'car'" [color]="'background-base'"><a [href]="'#'">Color background-base link</a></p-tag>
      <p-tag [theme]="'dark'" [icon]="'highway'" [color]="'background-surface'">
        <a [href]="'#'">Color background-surface link</a>
      </p-tag>
      <p-tag [theme]="'dark'" [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-base'">
        <a [href]="'#'">Color background-base link</a>
      </p-tag>
    </div>

    <div class="playground light" title="should show different background colors with button on light background">
      <p-tag [color]="'background-base'"><button>Color background-base button</button></p-tag>
      <p-tag [color]="'background-surface'"><button>Color background-surface button</button></p-tag>
      <p-tag [icon]="'car'" [color]="'background-base'"><button>Color background-base button</button></p-tag>
      <p-tag [icon]="'highway'" [color]="'background-surface'">
        <button>Color background-surface button</button>
      </p-tag>
      <p-tag [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-base'">
        <button>Color background-base button</button>
      </p-tag>
    </div>

    <div class="playground dark" title="should show different background colors with button on dark background">
      <p-tag [theme]="'dark'" [color]="'background-base'"><button>Color background-base button</button></p-tag>
      <p-tag [theme]="'dark'" [color]="'background-surface'"><button>Color background-surface button</button></p-tag>
      <p-tag [theme]="'dark'" [icon]="'car'" [color]="'background-base'"><button>Color background-base button</button></p-tag>
      <p-tag [theme]="'dark'" [icon]="'highway'" [color]="'background-surface'">
        <button>Color background-surface button</button>
      </p-tag>
      <p-tag [theme]="'dark'" [iconSource]="'./assets/icon-custom-kaixin.svg'" [color]="'background-base'">
        <button>Color background-base button</button>
      </p-tag>
    </div>

    <div class="playground light" title="should not render line break">
      <p-tag>
        Default <br />
        with line break
      </p-tag>
    </div>

    <div class="playground light" title="should not break into multiline although not enough space is given">
      <div style="width: 100px; overflow: auto; border: 1px solid deeppink">
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
      <div style="width: 100px; overflow: auto; border: 1px solid deeppink">
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
