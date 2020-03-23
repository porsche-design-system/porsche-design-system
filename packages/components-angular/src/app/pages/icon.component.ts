import { Component } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `
    <p-headline [variant]="'headline-2'">Icon</p-headline>
    <p-divider></p-divider>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-icon&gt;</p-headline>
      </p-grid-item>
      <p-grid-item [size]="5">
        <div class="playground light spacing-inline">
          <p-icon [name]="'filter'" [color]="'neutral-contrast-high'" aria-label="Filter icon"></p-icon>
          <p-icon [name]="'filter'" [size]="'medium'" [color]="'neutral-contrast-medium'"
                  aria-label="Filter icon"></p-icon>
          <p-icon [name]="'filter'" [size]="'large'" [color]="'neutral-contrast-low'"
                  aria-label="Filter icon"></p-icon>
          <p-icon [name]="'filter'" [size]="'large'" [color]="'brand'" aria-label="Filter icon"></p-icon>
          <p-icon [name]="'filter'" [size]="'large'" [color]="'inherit'" aria-label="Filter icon"
                  style="color: deeppink;"></p-icon>
          <p-icon [name]="'delete'" [size]="'large'" aria-label="Delete icon"></p-icon>
        </div>
        <p-divider></p-divider>
      </p-grid-item>
      <p-grid-item [size]="5">
        <div class="playground dark spacing-inline">
          <p-icon [name]="'filter'" [theme]="'dark'" [color]="'neutral-contrast-high'"
                  aria-label="Filter icon"></p-icon>
          <p-icon [name]="'filter'" [theme]="'dark'" [size]="'medium'" [color]="'neutral-contrast-medium'"
                  aria-label="Filter icon"></p-icon>
          <p-icon [name]="'filter'" [theme]="'dark'" [size]="'large'" [color]="'neutral-contrast-low'"
                  aria-label="Filter icon"></p-icon>
          <p-icon [name]="'filter'" [theme]="'dark'" [size]="'large'" [color]="'brand'"
                  aria-label="Filter icon"></p-icon>
          <p-icon [name]="'filter'" [theme]="'dark'" [size]="'large'" [color]="'inherit'" aria-label="Filter icon"
                  style="color: deeppink;"></p-icon>
          <p-icon [name]="'delete'" [theme]="'dark'" [size]="'large'" aria-label="Delete icon"></p-icon>
        </div>
        <p-divider></p-divider>
      </p-grid-item>
    </p-grid>
  `
})
export class IconComponent {

}
