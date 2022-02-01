/* Auto Generated File */
// @ts-nocheck
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconName } from '@porsche-design-system/components-angular';
import { ICON_NAMES } from '@porsche-design-system/assets';

@Component({
  selector: 'page-icon',
  styles: [
    `
      .playground.overview p-icon {
        color: deeppink;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='100%25' height='100%25' focusable='false'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%2300d5b9%7D%3C/style%3E%3C/defs%3E%3Cpath id='_safezone' d='M23 1v22H1V1h22m.1-.1H.9v22.2h22.2V.9z' class='cls-1' data-name='❌ safezone'/%3E%3Cpath id='basic_shape_square' d='M18 6v12H6V6h12m.1-.1H5.9v12.2h12.2V5.9z' class='cls-1' data-name='basic shape – square'/%3E%3Cpath id='basic_shape_complex' d='M21 3v18H3V3h18m.1-.1H2.9v18.2h18.2V2.9z' class='cls-1' data-name='basic shape – complex'/%3E%3Cpath id='basic_shape_wide' d='M20 7v10H4V7h16m.1-.1H3.9v10.2h16.2V6.9z' class='cls-1' data-name='basic shape – wide'/%3E%3Cpath id='basic_shape_high' d='M17 4v16H7V4h10m.1-.1H6.9v16.2h10.2V3.9z' class='cls-1' data-name='basic shape – high'/%3E%3Cpath id='basic_shape_wide_narrow' d='M22 8v8H2V8h20m.1-.1H1.9v8.2h20.2V7.9z' class='cls-1' data-name='basic shape – wide &amp; narrow'/%3E%3Cpath id='basic_shape_high_narrow' d='M17 2v20H7V2h10m.1-.1H6.9v20.2h10.2V1.9z' class='cls-1' data-name='basic shape – high &amp; narrow'/%3E%3C/svg%3E");
        background-size: cover;
        width: 48px;
        height: 48px;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render with default settings">
      <p-icon aria-label="Icon"></p-icon>
    </div>

    <div class="playground light" title="should render in different sizes">
      <p-icon [size]="'small'" aria-label="Icon"></p-icon>
      <p-icon [size]="'medium'" aria-label="Icon"></p-icon>
      <p-icon [size]="'large'" aria-label="Icon"></p-icon>
      <p-icon [size]="'inherit'" aria-label="Icon" style="width: 60px; height: 60px"></p-icon>
    </div>

    <div class="playground light" title="should render with predefined colors on light theme">
      <p-icon [theme]="'light'" [color]="'brand'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'light'" [color]="'default'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'light'" [color]="'neutral-contrast-high'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'light'" [color]="'neutral-contrast-medium'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'light'" [color]="'neutral-contrast-low'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'light'" [color]="'notification-success'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'light'" [color]="'notification-warning'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'light'" [color]="'notification-error'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'light'" [color]="'notification-neutral'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'light'" [color]="'inherit'" aria-label="Icon" style="color: deeppink"></p-icon>
    </div>

    <div class="playground dark" title="should render with predefined colors on dark theme">
      <p-icon [theme]="'dark'" [color]="'brand'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'dark'" [color]="'default'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'dark'" [color]="'neutral-contrast-high'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'dark'" [color]="'neutral-contrast-medium'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'dark'" [color]="'neutral-contrast-low'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'dark'" [color]="'notification-success'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'dark'" [color]="'notification-warning'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'dark'" [color]="'notification-error'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'dark'" [color]="'notification-neutral'" aria-label="Icon" style="color: deeppink"></p-icon>
      <p-icon [theme]="'dark'" [color]="'inherit'" aria-label="Icon" style="color: deeppink"></p-icon>
    </div>

    <div class="playground light" title="should render with custom icon">
      <p-icon [source]="'./assets/icon-custom-kaixin.svg'" aria-label="Icon for social media platform Kaixin"></p-icon>
    </div>

    <div class="playground light overview" title="should render all available icons and apply coloring programmatically">
      <p-icon
        *ngFor="let icon of icons"
        [name]="icon"
        [size]="'inherit'"
        [color]="'inherit'"
        [attr.aria-label]="icon + ' icon'"
      ></p-icon>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  public icons = ICON_NAMES as IconName[];
}
