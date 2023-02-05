import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-design-tokens-theme-example',
  styleUrls: ['./design-tokens-theme-example.component.scss'],
  template: `
    <div>
      <div class="wrapper wrapper--light">
        <h3 class="heading heading--light">Theme Light</h3>
        <div class="theme-light-primary tile"></div>
        <div class="theme-light-background-base tile"></div>
        <div class="theme-light-background-surface tile"></div>
        <div class="theme-light-background-shading tile"></div>
        <div class="theme-light-contrast-low tile"></div>
        <div class="theme-light-contrast-medium tile"></div>
        <div class="theme-light-contrast-high tile"></div>
        <div class="theme-light-notification-success tile"></div>
        <div class="theme-light-notification-success-soft tile"></div>
        <div class="theme-light-notification-warning tile"></div>
        <div class="theme-light-notification-warning-soft tile"></div>
        <div class="theme-light-notification-error tile"></div>
        <div class="theme-light-notification-error-soft tile"></div>
        <div class="theme-light-notification-info tile"></div>
        <div class="theme-light-notification-info-soft tile"></div>
        <div class="theme-light-state-hover tile"></div>
        <div class="theme-light-state-active tile"></div>
        <div class="theme-light-state-focus tile"></div>
        <div class="theme-light-state-disabled tile"></div>
      </div>
      <div class="wrapper wrapper--dark">
        <h3 class="heading heading--dark">Theme Dark</h3>
        <div class="theme-dark-primary tile"></div>
        <div class="theme-dark-background-base tile"></div>
        <div class="theme-dark-background-surface tile"></div>
        <div class="theme-dark-background-shading tile"></div>
        <div class="theme-dark-contrast-low tile"></div>
        <div class="theme-dark-contrast-medium tile"></div>
        <div class="theme-dark-contrast-high tile"></div>
        <div class="theme-dark-notification-success tile"></div>
        <div class="theme-dark-notification-success-soft tile"></div>
        <div class="theme-dark-notification-warning tile"></div>
        <div class="theme-dark-notification-warning-soft tile"></div>
        <div class="theme-dark-notification-error tile"></div>
        <div class="theme-dark-notification-error-soft tile"></div>
        <div class="theme-dark-notification-info tile"></div>
        <div class="theme-dark-notification-info-soft tile"></div>
        <div class="theme-dark-state-hover tile"></div>
        <div class="theme-dark-state-active tile"></div>
        <div class="theme-dark-state-focus tile"></div>
        <div class="theme-dark-state-disabled tile"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokensThemeExampleComponent {}
