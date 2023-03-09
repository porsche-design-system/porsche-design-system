# Theme

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample">
  <ExampleDesignTokensTheme />
</Playground>

## Usage

tbd.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `theme`
- `themeDark`
- `themeDarkPrimary`
- `themeDarkBackgroundBase`
- `themeDarkBackgroundSurface`
- `themeDarkBackgroundShading`
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

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-js/styles/scss' as *;`

<p-inline-notification heading="Important note" state="warning" persistent="true">
 At the moment, importing SCSS styles is only possible from `@porsche-design-system/components-js` npm package.
</p-inline-notification>

- `$pds-theme-light-primary`
- `$pds-theme-light-background-base`
- `$pds-theme-light-background-surface`
- `$pds-theme-light-background-shading`
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
import { getDesignTokensThemeCodeSamples } from '@porsche-design-system/shared';
import ExampleDesignTokensTheme from '@/pages/patterns/design-tokens/example-theme.vue';

@Component({
  components: {
    ExampleDesignTokensTheme
  },
})
export default class Code extends Vue {
  codeExample = getDesignTokensThemeCodeSamples();
}
</script>
