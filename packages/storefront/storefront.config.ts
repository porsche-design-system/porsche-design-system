import type { StorefrontConfig } from './src/models';

export const ALGOLIA_APP_ID = '1NH68HJ92C';
export const ALGOLIA_SEARCH_ONLY_KEY = '690605ee1f61d0e13c571484ecb74125';

export const config: StorefrontConfig = {
  About: {
    // @ts-ignore
    Introduction: [() => import('@/pages/about/introduction.md')],
  },
  'Start Designing': {
    // @ts-ignore
    Introduction: [() => import('@/pages/start-designing/introduction.md')],
  },
  'Start Coding': {
    // @ts-ignore
    Introduction: [() => import('@/pages/start-coding/introduction.md')],
    Angular: {
      // @ts-ignore
      'Getting Started': [() => import('@/pages/start-coding/angular/getting-started.md')],
      // @ts-ignore
      Advanced: [() => import('@/pages/start-coding/angular/advanced.md')],
    },
    React: {
      // @ts-ignore
      'Getting Started': [() => import('@/pages/start-coding/react/getting-started.md')],
      // @ts-ignore
      Testing: [() => import('@/pages/start-coding/react/testing.md')],
      // @ts-ignore
      Advanced: [() => import('@/pages/start-coding/react/advanced.md')],
    },
    'Vanilla Js': {
      // @ts-ignore
      'Getting Started': [() => import('@/pages/start-coding/vanilla-js/getting-started.md')],
      // @ts-ignore
      Advanced: [() => import('@/pages/start-coding/vanilla-js/advanced.md')],
    },
    'Next Js': {
      // @ts-ignore
      'Getting Started': [() => import('@/pages/start-coding/next-js/getting-started.md')],
      'Ssr Support': [
        // @ts-ignore
        () => import('@/pages/start-coding/next-js/ssr-support.md'),
        // @ts-ignore
        () => import('@/pages/start-coding/ssr-support-table.md'),
      ],
      // @ts-ignore
      Testing: [() => import('@/pages/start-coding/next-js/testing.md')],
    },
    Remix: {
      // @ts-ignore
      'Getting Started': [() => import('@/pages/start-coding/remix/getting-started.md')],
      'Ssr Support': [
        // @ts-ignore
        () => import('@/pages/start-coding/remix/ssr-support.md'),
        // @ts-ignore
        () => import('@/pages/start-coding/ssr-support-table.md'),
      ],
    },
    Vue: {
      // @ts-ignore
      'Getting Started': [() => import('@/pages/start-coding/vue/getting-started.md')],
      // @ts-ignore
      Advanced: [() => import('@/pages/start-coding/vue/advanced.md')],
    },
  },
  News: {
    'Migration Guide': {
      // @ts-ignore
      'Porsche Design System': [() => import('@/pages/news/migration-guide.md')],
      // @ts-ignore
      Utilities: [() => import('@/pages/news/migration-guide-utilities.md')],
    },
    Changelog: {
      // @ts-ignore
      Components: [() => import('@/../../components/CHANGELOG.md')],
      // @ts-ignore
      Utilities: [() => import('@/../../utilities-deprecated/projects/utilities/CHANGELOG.md')],
      // @ts-ignore
      Assets: [() => import('@/../../assets/CHANGELOG.md')],
    },
    // @ts-ignore
    Versioning: [() => import('@/pages/news/versioning.md')],
    // @ts-ignore
    Roadmap: [() => import('@/pages/news/roadmap.md')],
  },
  Styles: {
    // @ts-ignore
    Introduction: [() => import('@/pages/styles/introduction.md')],
    // @ts-ignore
    Border: [() => import('@/pages/styles/border.md')],
    // @ts-ignore
    'Drop Shadow': [() => import('@/pages/styles/drop-shadow.md')],
    // @ts-ignore
    Focus: [() => import('@/pages/styles/focus.md')],
    // @ts-ignore
    'Frosted Glass': [() => import('@/pages/styles/frosted-glass.md')],
    // @ts-ignore
    Gradient: [() => import('@/pages/styles/gradient.md')],
    // @ts-ignore
    Grid: [() => import('@/pages/styles/grid.md')],
    // @ts-ignore
    Hover: [() => import('@/pages/styles/hover.md')],
    // @ts-ignore
    'Media Query': [() => import('@/pages/styles/media-query.md')],
    // @ts-ignore
    Spacing: [() => import('@/pages/styles/spacing.md')],
    // @ts-ignore
    Theme: [() => import('@/pages/styles/theme.md')],
    // @ts-ignore
    Typography: [() => import('@/pages/styles/typography.md')],
  },
  Components: {
    Accordion: {
      // @ts-ignore
      Examples: [() => import(`@/../../components/src/components/accordion/accordion.examples.md`)],
      // @ts-ignore
      Usage: [() => import(`@/../../components/src/components/accordion/accordion.usage.md`)],
      // @ts-ignore
      Props: [() => import(`@/../../components/src/components/accordion/accordion.props.md`)],
    },
    // @ts-ignore
    Banner: [() => import('@/../../components/src/components/banner/banner.redirect.md')],
    Button: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/button/button.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/button/button.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/button/button.props.md')],
    },
    'Button Group': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/button-group/button-group.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/button-group/button-group.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/button-group/button-group.props.md')],
    },
    'Button Pure': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/button-pure/button-pure.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/button-pure/button-pure.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/button-pure/button-pure.props.md')],
    },
    'Button Tile': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/button-tile/button-tile.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/button-tile/button-tile.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/button-tile/button-tile.props.md')],
    },
    Carousel: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/carousel/carousel.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/carousel/carousel.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/carousel/carousel.props.md')],
    },
    Checkbox: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/checkbox-wrapper/checkbox-wrapper.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/checkbox-wrapper/checkbox-wrapper.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/checkbox-wrapper/checkbox-wrapper.props.md')],
    },
    'Content Wrapper': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/content-wrapper/content-wrapper.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/content-wrapper/content-wrapper.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/content-wrapper/content-wrapper.props.md')],
    },
    Crest: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/crest/crest.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/crest/crest.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/crest/crest.props.md')],
    },
    Divider: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/divider/divider.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/divider/divider.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/divider/divider.props.md')],
    },
    Fieldset: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/fieldset/fieldset.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/fieldset/fieldset.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/fieldset/fieldset.props.md')],
    },
    'Fieldset Wrapper': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/fieldset-wrapper/fieldset-wrapper.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/fieldset-wrapper/fieldset-wrapper.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/fieldset-wrapper/fieldset-wrapper.props.md')],
    },
    Flex: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/flex/flex.examples.md')],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/flex/flex/flex.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/flex/flex-item/flex-item.props.md'),
      ],
    },
    Grid: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/grid/grid.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/grid/grid.usage.md')],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/grid/grid/grid.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/grid/grid-item/grid-item.props.md'),
      ],
    },
    Icon: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/icon/icon.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/icon/icon.usage.md')],
      // @ts-ignore
      Guideline: [() => import('@/../../components/src/components/icon/icon.guideline.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/icon/icon.props.md')],
    },
    Link: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/link/link.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/link/link.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/link/link.props.md')],
    },
    'Link Pure': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/link-pure/link-pure.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/link-pure/link-pure.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/link-pure/link-pure.props.md')],
    },
    'Link Social': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/link-social/link-social.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/link-social/link-social.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/link-social/link-social.props.md')],
    },
    'Link Tile': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/link-tile/link-tile.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/link-tile/link-tile.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/link-tile/link-tile.props.md')],
    },
    'Link Tile Model Signature': {
      Examples: [
        () =>
          // @ts-ignore
          import('@/../../components/src/components/link-tile-model-signature/link-tile-model-signature.examples.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/link-tile-model-signature/link-tile-model-signature.props.md'),
      ],
    },
    Marque: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/marque/marque.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/marque/marque.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/marque/marque.props.md')],
    },
    Modal: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/modal/modal.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/modal/modal.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/modal/modal.props.md')],
    },
    'Model Signature': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/model-signature/model-signature.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/model-signature/model-signature.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/model-signature/model-signature.props.md')],
    },
    Notifications: {
      // @ts-ignore
      Introduction: [() => import('@/pages/components/notifications/notifications.usage.md')],
      'Inline Notification': [
        // @ts-ignore
        () => import('@/../../components/src/components/inline-notification/inline-notification.examples.md'),
      ],
      // @ts-ignore
      Toast: [() => import('@/../../components/src/components/toast/toast.examples.md')],
      // @ts-ignore
      Banner: [() => import('@/../../components/src/components/banner/banner.examples.md')],
      // @ts-ignore
      'Decision Tree': [() => import('@/pages/components/notifications/decision-tree.md')],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/inline-notification/inline-notification.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/toast/toast/toast.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/banner/banner.props.md'),
      ],
    },
    Pagination: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/pagination/pagination.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/pagination/pagination.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/pagination/pagination.props.md')],
    },
    Popover: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/popover/popover.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/popover/popover.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/popover/popover.props.md')],
    },
    'Radio Button': {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/radio-button-wrapper/radio-button-wrapper.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/radio-button-wrapper/radio-button-wrapper.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/radio-button-wrapper/radio-button-wrapper.props.md'),
      ],
    },
    Scroller: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/scroller/scroller.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/scroller/scroller.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/scroller/scroller.props.md')],
    },
    Select: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/select-wrapper/select-wrapper/select-wrapper.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/select-wrapper/select-wrapper/select-wrapper.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/select-wrapper/select-wrapper/select-wrapper.props.md'),
      ],
    },
    'Segmented Control': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/segmented-control/segmented-control.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/segmented-control/segmented-control.usage.md')],
      Props: [
        () =>
          // @ts-ignore
          import('@/../../components/src/components/segmented-control/segmented-control/segmented-control.props.md'),
        () =>
          import(
            // @ts-ignore
            '@/../../components/src/components/segmented-control/segmented-control-item/segmented-control-item.props.md'
          ),
      ],
    },
    Spinner: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/spinner/spinner.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/spinner/spinner.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/spinner/spinner.props.md')],
    },
    'Stepper Horizontal': {
      // @ts-ignore
      // prettier-ignore
      Examples: [() => import('@/../../components/src/components/stepper-horizontal/stepper-horizontal/stepper-horizontal.examples.md'),],
      // @ts-ignore
      // prettier-ignore
      Usage: [() => import('@/../../components/src/components/stepper-horizontal/stepper-horizontal/stepper-horizontal.usage.md'),],
      // @ts-ignore
      // prettier-ignore
      Props: [() => import('@/../../components/src/components/stepper-horizontal/stepper-horizontal/stepper-horizontal.props.md'), () => import('@/../../components/src/components/stepper-horizontal/stepper-horizontal-item/stepper-horizontal-item.props.md'),
      ],
    },
    Switch: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/switch/switch.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/switch/switch.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/switch/switch.props.md')],
    },
    Table: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/table/table.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/table/table.usage.md')],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/table/table/table.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/table/table-head-cell/table-head-cell.props.md'),
      ],
    },
    Tabs: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/tabs/tabs.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/tabs/tabs.usage.md')],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/tabs/tabs/tabs.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/tabs/tabs-item/tabs-item.props.md'),
      ],
    },
    'Tabs Bar': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/tabs-bar/tabs-bar.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/tabs-bar/tabs-bar.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/tabs-bar/tabs-bar.props.md')],
    },
    Tags: {
      // @ts-ignore
      Introduction: [() => import('@/../../components/src/components/tag/tag.introduction.md')],
      // @ts-ignore
      Tag: [() => import('@/../../components/src/components/tag/tag.examples.md')],
      'Tag Dismissible': [
        // @ts-ignore
        () => import('@/../../components/src/components/tag-dismissible/tag-dismissible.examples.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/tag/tag.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/tag-dismissible/tag-dismissible.props.md'),
      ],
    },
    'Text Field': {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/text-field-wrapper/text-field-wrapper.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/text-field-wrapper/text-field-wrapper.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/text-field-wrapper/text-field-wrapper.props.md'),
      ],
    },
    'Text List': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/text-list/text-list.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/text-list/text-list.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/text-list/text-list/text-list.props.md')],
    },
    Textarea: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/textarea-wrapper/textarea-wrapper.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/textarea-wrapper/textarea-wrapper.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/textarea-wrapper/textarea-wrapper.props.md')],
    },
    Typography: {
      // @ts-ignore
      Text: [() => import('@/../../components/src/components/text/text.example.md')],
      // @ts-ignore
      Heading: [() => import('@/../../components/src/components/heading/heading.example.md')],
      // @ts-ignore
      Headline: [() => import('@/../../components/src/components/headline/headline.example.md')],
      // @ts-ignore
      Display: [() => import('@/../../components/src/components/display/display.example.md')],
      // @ts-ignore
      Usage: [() => import('@/pages/components/typography/typography.usage.md')],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/display/display.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/heading/heading.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/headline/headline.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/text/text.props.md'),
      ],
    },
    Wordmark: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/wordmark/wordmark.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/wordmark/wordmark.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/wordmark/wordmark.props.md')],
    },
  },
  Partials: {
    // @ts-ignore
    Introduction: [() => import('@/pages/partials/introduction.md')],
    // @ts-ignore
    'Browser Support Fallback Script': [() => import('@/pages/partials/browser-support-fallback-script.md')],
    // @ts-ignore
    'Component Chunk Links': [() => import('@/pages/partials/component-chunk-links.md')],
    // @ts-ignore
    'Cookies Fallback Script': [() => import('@/pages/partials/cookies-fallback-script.md')],
    // @ts-ignore
    'Dsr Ponyfill': [() => import('@/pages/partials/dsr-ponyfill.md')],
    // @ts-ignore
    'Font Face Stylesheet': [() => import('@/pages/partials/font-face-stylesheet.md')],
    // @ts-ignore
    'Font Links': [() => import('@/pages/partials/font-links.md')],
    // @ts-ignore
    'Icon Links': [() => import('@/pages/partials/icon-links.md')],
    // @ts-ignore
    'Initial Styles': [() => import('@/pages/partials/initial-styles.md')],
    // @ts-ignore
    'Loader Script': [() => import('@/pages/partials/loader-script.md')],
    // @ts-ignore
    'Meta Tags And Icon Links': [() => import('@/pages/partials/meta-tags-and-icon-links.md')],
  },
  Help: {
    // @ts-ignore
    Support: [() => import('@/pages/help/support.md')],
    // @ts-ignore
    Faq: [() => import('@/pages/help/faq.md')],
    // @ts-ignore
    Troubleshooting: [() => import('@/pages/help/troubleshooting.md')],
    // @ts-ignore
    'Browser Compatibility': [() => import('@/pages/basics/browser-compatibility.md')],
    // @ts-ignore
    'Bug Report': [() => import('@/pages/help/bug-report.md')],
  },
  Accessibility: {
    // @ts-ignore
    Introduction: [() => import('@/pages/accessibility/introduction.md')],
    // @ts-ignore
    'Accessibility Statement': [() => import('@/pages/accessibility/statement.md')],
  },
  Patterns: {
    Forms: {
      // @ts-ignore
      Guidelines: [() => import('@/pages/patterns/forms/guidelines.md')],
      // @ts-ignore
      Resources: [() => import('@/pages/patterns/forms/resources.md')],
      // @ts-ignore
      Legal: [() => import('@/pages/patterns/forms/legal.md')],
    },
  },
  Assets: {
    // @ts-ignore
    Introduction: [() => import('@/pages/assets/introduction.md')],
    // @ts-ignore
    Icons: [() => import('@/pages/assets/icons.md')],
    // @ts-ignore
    'Meta Icons': [() => import('@/pages/assets/meta-icons.md')],
    // @ts-ignore
    Marque: [() => import('@/pages/assets/marque.md')],
    // @ts-ignore
    Fonts: [() => import('@/pages/assets/fonts.md')],
  },
  'Utilities Deprecated': {
    // @ts-ignore
    Introduction: [() => import('@/pages/utilities/introduction.md')],
    Scss: {
      // @ts-ignore
      Variables: [() => import('@/pages/utilities/scss/variables.md')],
      // @ts-ignore
      Functions: [() => import('@/pages/utilities/scss/functions.md')],
      // @ts-ignore
      Helper: [() => import('@/pages/utilities/scss/helper.md')],
    },
    Js: {
      // @ts-ignore
      Variables: [() => import('@/pages/utilities/js/variables.md')],
      // @ts-ignore
      Functions: [() => import('@/pages/utilities/js/functions.md')],
      // @ts-ignore
      Helper: [() => import('@/pages/utilities/js/helper.md')],
    },
  },
  Performance: {
    // @ts-ignore
    Cdn: [() => import('@/pages/performance/cdn.md')],
    // @ts-ignore
    'Loading Behaviour': [() => import('@/pages/performance/loading-behaviour.md')],
  },
  Security: {
    // @ts-ignore
    Cve: [() => import('@/pages/security/cve.md')],
  },
  Helpers: {
    // @ts-ignore
    'Components Ready': [() => import('@/pages/general/components-ready.md')],
    // @ts-ignore
    Testing: [() => import('@/pages/general/testing.md')],
  },
};
