# Theme

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesTheme />
</Playground>

## Usage

### Do:

- Always choose the Light Theme as the first choice for designing Porsche applications. Stick to the limited color set
  provided.
- Use accessibility-safe colors, i.e., neutral contrast high and neutral contrast medium, to guarantee optimal contrast.
- Play with darker/lighter grey shades to make an element stand out from the background or to set emphasis on it.
- Mix color themes within the application on rarely. Ensure a sufficient contrast ratio.

### Don't:

- Don't use neutral contrast low for displaying crucial information.
- Don't mix colors of different themes (e.g. primary-light with base-dark).
- Avoid adding new colors to the color palette.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

### JS

When using `JSS`, `styled-components` etc. JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

When using `vanilla-extract` JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles/vanilla-extract';`.

- `theme`
- `themeDark`
- `themeDarkPrimary`
- `themeDarkBackgroundBase`
- `themeDarkBackgroundSurface`
- `themeDarkBackgroundShading`
- `themeDarkBackgroundFrosted`
- `themeDarkContrastLow`
- `themeDarkContrastMedium`
- `themeDarkContrastHigh`
- `themeDarkNotificationSuccess`
- `themeDarkNotificationSuccessSoft`
- `themeDarkNotificationWarning`
- `themeDarkNotificationWarningSoft`
- `themeDarkNotificationError`
- `themeDarkNotificationErrorSoft`
- `themeDarkNotificationInfo`
- `themeDarkNotificationInfoSoft`
- `themeDarkStateHover`
- `themeDarkStateActive`
- `themeDarkStateFocus`
- `themeDarkStateDisabled`
- `themeLight`
- `themeLightPrimary`
- `themeLightBackgroundBase`
- `themeLightBackgroundSurface`
- `themeLightBackgroundShading`
- `themeLightBackgroundFrosted`
- `themeLightContrastLow`
- `themeLightContrastMedium`
- `themeLightContrastHigh`
- `themeLightNotificationSuccess`
- `themeLightNotificationSuccessSoft`
- `themeLightNotificationWarning`
- `themeLightNotificationWarningSoft`
- `themeLightNotificationError`
- `themeLightNotificationErrorSoft`
- `themeLightNotificationInfo`
- `themeLightNotificationInfoSoft`
- `themeLightStateHover`
- `themeLightStateActive`
- `themeLightStateFocus`
- `themeLightStateDisabled`

---

### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-{js|angular|react|vue}/styles' as *;`

- `$pds-theme-light-primary`
- `$pds-theme-light-background-base`
- `$pds-theme-light-background-surface`
- `$pds-theme-light-background-shading`
- `$pds-theme-light-background-frosted`
- `$pds-theme-light-contrast-low`
- `$pds-theme-light-contrast-medium`
- `$pds-theme-light-contrast-high`
- `$pds-theme-light-notification-success`
- `$pds-theme-light-notification-success-soft`
- `$pds-theme-light-notification-warning`
- `$pds-theme-light-notification-warning-soft`
- `$pds-theme-light-notification-error`
- `$pds-theme-light-notification-error-soft`
- `$pds-theme-light-notification-info`
- `$pds-theme-light-notification-info-soft`
- `$pds-theme-light-state-hover`
- `$pds-theme-light-state-active`
- `$pds-theme-light-state-focus`
- `$pds-theme-light-state-disabled`
- `$pds-theme-dark-primary`
- `$pds-theme-dark-background-base`
- `$pds-theme-dark-background-surface`
- `$pds-theme-dark-background-shading`
- `$pds-theme-dark-background-frosted`
- `$pds-theme-dark-contrast-low`
- `$pds-theme-dark-contrast-medium`
- `$pds-theme-dark-contrast-high`
- `$pds-theme-dark-notification-success`
- `$pds-theme-dark-notification-success-soft`
- `$pds-theme-dark-notification-warning`
- `$pds-theme-dark-notification-warning-soft`
- `$pds-theme-dark-notification-error`
- `$pds-theme-dark-notification-error-soft`
- `$pds-theme-dark-notification-info`
- `$pds-theme-dark-notification-info-soft`
- `$pds-theme-dark-state-hover`
- `$pds-theme-dark-state-active`
- `$pds-theme-dark-state-focus`
- `$pds-theme-dark-state-disabled`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesThemeCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesTheme from '@/pages/patterns/styles/example-theme.vue';

@Component({
  components: {
    ExampleStylesTheme
  },
})
export default class Code extends Vue {
  codeExample = getStylesThemeCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.codeExample);
  }
}
</script>
