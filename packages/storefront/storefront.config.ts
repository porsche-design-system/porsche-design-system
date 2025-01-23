// @ts-nocheck
import type { StorefrontConfig } from './src/models';

export const ALGOLIA_APP_ID = '1NH68HJ92C';
export const ALGOLIA_SEARCH_ONLY_KEY = '690605ee1f61d0e13c571484ecb74125';

export const config: StorefrontConfig = {
  News: {
    'Migration Guide': {
      'Porsche Design System': [() => import('@/pages/news/migration-guide.md')],
      Utilities: [() => import('@/pages/news/migration-guide-utilities.md')],
    },
    Changelog: [() => import('@/pages/changelog.md')],
    Roadmap: [() => import('@/pages/news/roadmap.md')],
  },
  Designing: {
    Introduction: [() => import('@/pages/designing/introduction.md')],
  },
  Developing: {
    Introduction: [() => import('@/pages/developing/introduction.md')],
    'Vanilla Js': {
      'Getting Started': [() => import('@/pages/developing/vanilla-js/getting-started.md')],
      Advanced: [() => import('@/pages/developing/vanilla-js/advanced.md')],
    },
    Angular: {
      'Getting Started': [() => import('@/pages/developing/angular/getting-started.md')],
      Testing: [() => import('@/pages/developing/angular/testing.md')],
      Advanced: [() => import('@/pages/developing/angular/advanced.md')],
    },
    React: {
      'Getting Started': [() => import('@/pages/developing/react/getting-started.md')],
      Testing: [() => import('@/pages/developing/react/testing.md')],
      Advanced: [() => import('@/pages/developing/react/advanced.md')],
    },
    'Next Js': {
      'Getting Started': [() => import('@/pages/developing/next-js/getting-started.md')],
      'Ssr Support': [
        () => import('@/pages/developing/next-js/ssr-support.md'),
        () => import('@/pages/developing/shared/ssr-support-table.md'),
      ],
      Testing: [() => import('@/pages/developing/next-js/testing.md')],
    },
    Remix: {
      'Getting Started': [() => import('@/pages/developing/remix/getting-started.md')],
      'Ssr Support': [
        () => import('@/pages/developing/remix/ssr-support.md'),
        () => import('@/pages/developing/shared/ssr-support-table.md'),
      ],
    },
    Vue: {
      'Getting Started': [() => import('@/pages/developing/vue/getting-started.md')],
      Advanced: [() => import('@/pages/developing/vue/advanced.md')],
    },
    'Components Ready': [() => import('@/pages/developing/components-ready.md')],
  },
  Components: {
    Introduction: [() => import('@/pages/components/introduction.md')],
    Accordion: {
      Examples: [() => import('@/../../components/src/components/accordion/accordion.examples.md')],
      Usage: [() => import('@/../../components/src/components/accordion/accordion.usage.md')],
      Props: [() => import('@/../../components/src/components/accordion/accordion.props.md')],
    },
    Banner: {
      Examples: [() => import('@/../../components/src/components/banner/banner.examples.md')],
      Props: [() => import('@/../../components/src/components/banner/banner.props.md')],
    },
    Button: {
      Examples: [() => import('@/../../components/src/components/button/button.examples.md')],
      Usage: [() => import('@/../../components/src/components/button/button.usage.md')],
      Props: [() => import('@/../../components/src/components/button/button.props.md')],
    },
    'Button Group': {
      Examples: [() => import('@/../../components/src/components/button-group/button-group.examples.md')],
      Usage: [() => import('@/../../components/src/components/button-group/button-group.usage.md')],
      Props: [() => import('@/../../components/src/components/button-group/button-group.props.md')],
    },
    'Button Pure': {
      Examples: [() => import('@/../../components/src/components/button-pure/button-pure.examples.md')],
      Usage: [() => import('@/../../components/src/components/button-pure/button-pure.usage.md')],
      Props: [() => import('@/../../components/src/components/button-pure/button-pure.props.md')],
    },
    'Button Tile': {
      Examples: [() => import('@/../../components/src/components/button-tile/button-tile.examples.md')],
      Usage: [() => import('@/../../components/src/components/button-tile/button-tile.usage.md')],
      Props: [() => import('@/../../components/src/components/button-tile/button-tile.props.md')],
    },
    Canvas: {
      Examples: [() => import('@/../../components/src/components/canvas/canvas.examples.md')],
      Props: [() => import('@/../../components/src/components/canvas/canvas.props.md')],
    },
    Carousel: {
      Examples: [() => import('@/../../components/src/components/carousel/carousel.examples.md')],
      Usage: [() => import('@/../../components/src/components/carousel/carousel.usage.md')],
      Props: [() => import('@/../../components/src/components/carousel/carousel.props.md')],
    },
    Checkbox: {
      Examples: [() => import('@/../../components/src/components/checkbox/checkbox.examples.md')],
      Usage: [() => import('@/../../components/src/components/checkbox/checkbox.usage.md')],
      Props: [() => import('@/../../components/src/components/checkbox/checkbox.props.md')],
    },
    'Checkbox Wrapper': {
      Examples: [() => import('@/../../components/src/components/checkbox-wrapper/checkbox-wrapper.examples.md')],
      Usage: [() => import('@/../../components/src/components/checkbox-wrapper/checkbox-wrapper.usage.md')],
      Props: [() => import('@/../../components/src/components/checkbox-wrapper/checkbox-wrapper.props.md')],
    },
    'Content Wrapper': {
      Examples: [() => import('@/../../components/src/components/content-wrapper/content-wrapper.examples.md')],
      Usage: [() => import('@/../../components/src/components/content-wrapper/content-wrapper.usage.md')],
      Props: [() => import('@/../../components/src/components/content-wrapper/content-wrapper.props.md')],
    },
    Crest: {
      Examples: [() => import('@/../../components/src/components/crest/crest.examples.md')],
      Usage: [() => import('@/../../components/src/components/crest/crest.usage.md')],
      Props: [() => import('@/../../components/src/components/crest/crest.props.md')],
    },
    Display: {
      Examples: [() => import('@/../../components/src/components/display/display.example.md')],
      Props: [() => import('@/../../components/src/components/display/display.props.md')],
    },
    Divider: {
      Examples: [() => import('@/../../components/src/components/divider/divider.examples.md')],
      Usage: [() => import('@/../../components/src/components/divider/divider.usage.md')],
      Props: [() => import('@/../../components/src/components/divider/divider.props.md')],
    },
    Fieldset: {
      Examples: [() => import('@/../../components/src/components/fieldset/fieldset.examples.md')],
      Usage: [() => import('@/../../components/src/components/fieldset/fieldset.usage.md')],
      Props: [() => import('@/../../components/src/components/fieldset/fieldset.props.md')],
    },
    'Fieldset Wrapper': {
      Examples: [() => import('@/../../components/src/components/fieldset-wrapper/fieldset-wrapper.examples.md')],
      Usage: [() => import('@/../../components/src/components/fieldset-wrapper/fieldset-wrapper.usage.md')],
      Props: [() => import('@/../../components/src/components/fieldset-wrapper/fieldset-wrapper.props.md')],
    },
    Flex: {
      Examples: [() => import('@/../../components/src/components/flex/flex.examples.md')],
      Props: [
        () => import('@/../../components/src/components/flex/flex/flex.props.md'),
        () => import('@/../../components/src/components/flex/flex-item/flex-item.props.md'),
      ],
    },
    Flyout: {
      Examples: [() => import('@/../../components/src/components/flyout/flyout.examples.md')],
      Usage: [() => import('@/../../components/src/components/flyout/flyout.usage.md')],
      Props: [() => import('@/../../components/src/components/flyout/flyout.props.md')],
    },
    'Flyout Multilevel': {
      Examples: [() => import('@/../../components/src/components/flyout-multilevel/flyout-multilevel.examples.md')],
      Usage: [() => import('@/../../components/src/components/flyout-multilevel/flyout-multilevel.usage.md')],
      Props: [
        // biome-ignore format: should not be formatted, otherwise storefront unit test might not work
        () => import('@/../../components/src/components/flyout-multilevel/flyout-multilevel/flyout-multilevel.props.md'),
        // biome-ignore format: should not be formatted, otherwise storefront unit test might not work
        () => import('@/../../components/src/components/flyout-multilevel/flyout-multilevel-item/flyout-multilevel-item.props.md'),
      ],
    },
    Grid: {
      Examples: [() => import('@/../../components/src/components/grid/grid.examples.md')],
      Usage: [() => import('@/../../components/src/components/grid/grid.usage.md')],
      Props: [
        () => import('@/../../components/src/components/grid/grid/grid.props.md'),
        () => import('@/../../components/src/components/grid/grid-item/grid-item.props.md'),
      ],
    },
    Heading: {
      Examples: [() => import('@/../../components/src/components/heading/heading.example.md')],
      Props: [() => import('@/../../components/src/components/heading/heading.props.md')],
    },
    Headline: {
      Examples: [() => import('@/../../components/src/components/headline/headline.example.md')],
      Props: [() => import('@/../../components/src/components/headline/headline.props.md')],
    },
    Icon: {
      Examples: [() => import('@/../../components/src/components/icon/icon.examples.md')],
      Usage: [() => import('@/../../components/src/components/icon/icon.usage.md')],
      Guideline: [() => import('@/../../components/src/components/icon/icon.guideline.md')],
      Props: [() => import('@/../../components/src/components/icon/icon.props.md')],
    },
    'Inline Notification': {
      Examples: [() => import('@/../../components/src/components/inline-notification/inline-notification.examples.md')],
      Props: [() => import('@/../../components/src/components/inline-notification/inline-notification.props.md')],
    },
    Link: {
      Examples: [() => import('@/../../components/src/components/link/link.examples.md')],
      Usage: [() => import('@/../../components/src/components/link/link.usage.md')],
      Props: [() => import('@/../../components/src/components/link/link.props.md')],
    },
    'Link Pure': {
      Examples: [() => import('@/../../components/src/components/link-pure/link-pure.examples.md')],
      Usage: [() => import('@/../../components/src/components/link-pure/link-pure.usage.md')],
      Props: [() => import('@/../../components/src/components/link-pure/link-pure.props.md')],
    },
    'Link Social': {
      Examples: [() => import('@/../../components/src/components/link-social/link-social.examples.md')],
      Usage: [() => import('@/../../components/src/components/link-social/link-social.usage.md')],
      Props: [() => import('@/../../components/src/components/link-social/link-social.props.md')],
    },
    'Link Tile': {
      Examples: [() => import('@/../../components/src/components/link-tile/link-tile.examples.md')],
      Usage: [() => import('@/../../components/src/components/link-tile/link-tile.usage.md')],
      Props: [() => import('@/../../components/src/components/link-tile/link-tile.props.md')],
    },
    'Link Tile Model Signature': {
      Examples: [
        // biome-ignore format: should not be formatted, otherwise storefront unit test might not work
        () => import('@/../../components/src/components/link-tile-model-signature/link-tile-model-signature.examples.md'),
      ],
      Usage: [
        () => import('@/../../components/src/components/link-tile-model-signature/link-tile-model-signature.usage.md'),
      ],
      Props: [
        () => import('@/../../components/src/components/link-tile-model-signature/link-tile-model-signature.props.md'),
      ],
    },
    'Link Tile Product': {
      Examples: [() => import('@/../../components/src/components/link-tile-product/link-tile-product.examples.md')],
      Usage: [() => import('@/../../components/src/components/link-tile-product/link-tile-product.usage.md')],
      Props: [() => import('@/../../components/src/components/link-tile-product/link-tile-product.props.md')],
    },
    Marque: {
      Examples: [() => import('@/../../components/src/components/marque/marque.examples.md')],
      Usage: [() => import('@/../../components/src/components/marque/marque.usage.md')],
      Props: [() => import('@/../../components/src/components/marque/marque.props.md')],
    },
    Modal: {
      Examples: [() => import('@/../../components/src/components/modal/modal.examples.md')],
      Usage: [() => import('@/../../components/src/components/modal/modal.usage.md')],
      Props: [() => import('@/../../components/src/components/modal/modal.props.md')],
    },
    'Model Signature': {
      Examples: [() => import('@/../../components/src/components/model-signature/model-signature.examples.md')],
      Usage: [() => import('@/../../components/src/components/model-signature/model-signature.usage.md')],
      Props: [() => import('@/../../components/src/components/model-signature/model-signature.props.md')],
    },
    'Multi Select': {
      Examples: [() => import('@/../../components/src/components/multi-select/multi-select/multi-select.examples.md')],
      Usage: [() => import('@/../../components/src/components/multi-select/multi-select/multi-select.usage.md')],
      Props: [
        () => import('@/../../components/src/components/multi-select/multi-select/multi-select.props.md'),
        () => import('@/../../components/src/components/multi-select/multi-select-option/multi-select-option.props.md'),
      ],
    },
    Pagination: {
      Examples: [() => import('@/../../components/src/components/pagination/pagination.examples.md')],
      Usage: [() => import('@/../../components/src/components/pagination/pagination.usage.md')],
      Props: [() => import('@/../../components/src/components/pagination/pagination.props.md')],
    },
    'Pin Code': {
      Examples: [() => import('@/../../components/src/components/pin-code/pin-code.examples.md')],
      Usage: [() => import('@/../../components/src/components/pin-code/pin-code.usage.md')],
      Props: [() => import('@/../../components/src/components/pin-code/pin-code.props.md')],
    },
    Popover: {
      Examples: [() => import('@/../../components/src/components/popover/popover.examples.md')],
      Usage: [() => import('@/../../components/src/components/popover/popover.usage.md')],
      Props: [() => import('@/../../components/src/components/popover/popover.props.md')],
    },
    'Radio Button Wrapper': {
      Examples: [
        () => import('@/../../components/src/components/radio-button-wrapper/radio-button-wrapper.examples.md'),
      ],
      Usage: [() => import('@/../../components/src/components/radio-button-wrapper/radio-button-wrapper.usage.md')],
      Props: [() => import('@/../../components/src/components/radio-button-wrapper/radio-button-wrapper.props.md')],
    },
    Scroller: {
      Examples: [() => import('@/../../components/src/components/scroller/scroller.examples.md')],
      Usage: [() => import('@/../../components/src/components/scroller/scroller.usage.md')],
      Props: [() => import('@/../../components/src/components/scroller/scroller.props.md')],
    },
    'Segmented Control': {
      Examples: [() => import('@/../../components/src/components/segmented-control/segmented-control.examples.md')],
      Usage: [() => import('@/../../components/src/components/segmented-control/segmented-control.usage.md')],
      Props: [
        // biome-ignore format: should not be formatted, otherwise storefront unit test might not work
        () => import('@/../../components/src/components/segmented-control/segmented-control/segmented-control.props.md'),
        // biome-ignore format: should not be formatted, otherwise storefront unit test might not work
        () => import('@/../../components/src/components/segmented-control/segmented-control-item/segmented-control-item.props.md'),
      ],
    },
    Select: {
      Examples: [() => import('@/../../components/src/components/select/select/select.examples.md')],
      Usage: [() => import('@/../../components/src/components/select/select/select.usage.md')],
      Props: [
        () => import('@/../../components/src/components/select/select/select.props.md'),
        () => import('@/../../components/src/components/select/select-option/select-option.props.md'),
      ],
    },
    'Select Wrapper': {
      Examples: [
        () => import('@/../../components/src/components/select-wrapper/select-wrapper/select-wrapper.examples.md'),
      ],
      Usage: [() => import('@/../../components/src/components/select-wrapper/select-wrapper/select-wrapper.usage.md')],
      Props: [() => import('@/../../components/src/components/select-wrapper/select-wrapper/select-wrapper.props.md')],
    },
    Sheet: {
      Examples: [() => import('@/../../components/src/components/sheet/sheet.examples.md')],
      Usage: [() => import('@/../../components/src/components/sheet/sheet.usage.md')],
      Props: [() => import('@/../../components/src/components/sheet/sheet.props.md')],
    },
    Spinner: {
      Examples: [() => import('@/../../components/src/components/spinner/spinner.examples.md')],
      Usage: [() => import('@/../../components/src/components/spinner/spinner.usage.md')],
      Props: [() => import('@/../../components/src/components/spinner/spinner.props.md')],
    },
    'Stepper Horizontal': {
      Examples: [
        // biome-ignore format: should not be formatted, otherwise storefront unit test might not work
        () => import('@/../../components/src/components/stepper-horizontal/stepper-horizontal/stepper-horizontal.examples.md'),
      ],
      Usage: [
        // biome-ignore format: should not be formatted, otherwise storefront unit test might not work
        () => import('@/../../components/src/components/stepper-horizontal/stepper-horizontal/stepper-horizontal.usage.md'),
      ],
      Props: [
        // biome-ignore format: should not be formatted, otherwise storefront unit test might not work
        () => import('@/../../components/src/components/stepper-horizontal/stepper-horizontal/stepper-horizontal.props.md'),
        // biome-ignore format: should not be formatted, otherwise storefront unit test might not work
        () => import('@/../../components/src/components/stepper-horizontal/stepper-horizontal-item/stepper-horizontal-item.props.md'),
      ],
    },
    Switch: {
      Examples: [() => import('@/../../components/src/components/switch/switch.examples.md')],
      Usage: [() => import('@/../../components/src/components/switch/switch.usage.md')],
      Props: [() => import('@/../../components/src/components/switch/switch.props.md')],
    },
    Table: {
      Examples: [() => import('@/../../components/src/components/table/table.examples.md')],
      Usage: [() => import('@/../../components/src/components/table/table.usage.md')],
      Props: [
        () => import('@/../../components/src/components/table/table/table.props.md'),
        () => import('@/../../components/src/components/table/table-head-cell/table-head-cell.props.md'),
        () => import('@/../../components/src/components/table/table-cell/table-cell.props.md'),
      ],
    },
    Tabs: {
      Examples: [() => import('@/../../components/src/components/tabs/tabs.examples.md')],
      Usage: [() => import('@/../../components/src/components/tabs/tabs.usage.md')],
      Props: [
        () => import('@/../../components/src/components/tabs/tabs/tabs.props.md'),
        () => import('@/../../components/src/components/tabs/tabs-item/tabs-item.props.md'),
      ],
    },
    'Tabs Bar': {
      Examples: [() => import('@/../../components/src/components/tabs-bar/tabs-bar.examples.md')],
      Usage: [() => import('@/../../components/src/components/tabs-bar/tabs-bar.usage.md')],
      Props: [() => import('@/../../components/src/components/tabs-bar/tabs-bar.props.md')],
    },
    Tag: {
      Examples: [() => import('@/../../components/src/components/tag/tag.examples.md')],
      Usage: [() => import('@/../../components/src/components/tag/tag.usage.md')],
      Props: [() => import('@/../../components/src/components/tag/tag.props.md')],
    },
    'Tag Dismissible': {
      Examples: [() => import('@/../../components/src/components/tag-dismissible/tag-dismissible.examples.md')],
      Usage: [() => import('@/../../components/src/components/tag-dismissible/tag-dismissible.usage.md')],
      Props: [() => import('@/../../components/src/components/tag-dismissible/tag-dismissible.props.md')],
    },
    Text: {
      Examples: [() => import('@/../../components/src/components/text/text.example.md')],
      Props: [() => import('@/../../components/src/components/text/text.props.md')],
    },
    'Text Field Wrapper': {
      Examples: [() => import('@/../../components/src/components/text-field-wrapper/text-field-wrapper.examples.md')],
      Usage: [() => import('@/../../components/src/components/text-field-wrapper/text-field-wrapper.usage.md')],
      Props: [() => import('@/../../components/src/components/text-field-wrapper/text-field-wrapper.props.md')],
    },
    'Text List': {
      Examples: [() => import('@/../../components/src/components/text-list/text-list.examples.md')],
      Usage: [() => import('@/../../components/src/components/text-list/text-list.usage.md')],
      Props: [() => import('@/../../components/src/components/text-list/text-list/text-list.props.md')],
    },
    Textarea: {
      Examples: [() => import('@/../../components/src/components/textarea/textarea.examples.md')],
      Usage: [() => import('@/../../components/src/components/textarea/textarea.usage.md')],
      Props: [() => import('@/../../components/src/components/textarea/textarea.props.md')],
    },
    'Textarea Wrapper': {
      Examples: [() => import('@/../../components/src/components/textarea-wrapper/textarea-wrapper.examples.md')],
      Usage: [() => import('@/../../components/src/components/textarea-wrapper/textarea-wrapper.usage.md')],
      Props: [() => import('@/../../components/src/components/textarea-wrapper/textarea-wrapper.props.md')],
    },
    Toast: {
      Examples: [() => import('@/../../components/src/components/toast/toast.examples.md')],
      Props: [() => import('@/../../components/src/components/toast/toast/toast.props.md')],
    },
    Wordmark: {
      Examples: [() => import('@/../../components/src/components/wordmark/wordmark.examples.md')],
      Usage: [() => import('@/../../components/src/components/wordmark/wordmark.usage.md')],
      Props: [() => import('@/../../components/src/components/wordmark/wordmark.props.md')],
    },
  },
  Styles: {
    Introduction: [() => import('@/pages/styles/introduction.md')],
    Border: [() => import('@/pages/styles/border.md')],
    'Drop Shadow': [() => import('@/pages/styles/drop-shadow.md')],
    Focus: [() => import('@/pages/styles/focus.md')],
    'Frosted Glass': [() => import('@/pages/styles/frosted-glass.md')],
    Gradient: [() => import('@/pages/styles/gradient.md')],
    Grid: [() => import('@/pages/styles/grid.md')],
    Hover: [() => import('@/pages/styles/hover.md')],
    'Media Query': [() => import('@/pages/styles/media-query.md')],
    Motion: [() => import('@/pages/styles/motion.md')],
    Skeleton: [() => import('@/pages/styles/skeleton.md')],
    Spacing: [() => import('@/pages/styles/spacing.md')],
    Theme: [() => import('@/pages/styles/theme.md')],
    Typography: [() => import('@/pages/styles/typography.md')],
  },
  Partials: {
    Introduction: [() => import('@/pages/partials/introduction.md')],
    'Browser Support Fallback Script': [() => import('@/pages/partials/browser-support-fallback-script.md')],
    'Component Chunk Links': [() => import('@/pages/partials/component-chunk-links.md')],
    'Cookies Fallback Script': [() => import('@/pages/partials/cookies-fallback-script.md')],
    'Dsr Ponyfill': [() => import('@/pages/partials/dsr-ponyfill.md')],
    'Font Face Stylesheet': [() => import('@/pages/partials/font-face-stylesheet.md')],
    'Font Face Styles': [() => import('@/pages/partials/font-face-styles.md')],
    'Font Links': [() => import('@/pages/partials/font-links.md')],
    'Icon Links': [() => import('@/pages/partials/icon-links.md')],
    'Initial Styles': [() => import('@/pages/partials/initial-styles.md')],
    'Loader Script': [() => import('@/pages/partials/loader-script.md')],
    'Meta Tags And Icon Links': [() => import('@/pages/partials/meta-tags-and-icon-links.md')],
  },
  Patterns: {
    Forms: {
      Guidelines: [() => import('@/pages/patterns/forms/guidelines.md')],
      Resources: [() => import('@/pages/patterns/forms/resources.md')],
      Legal: [() => import('@/pages/patterns/forms/legal.md')],
    },
    Notifications: {
      Introduction: [() => import('@/pages/patterns/notifications/notifications.usage.md')],
      'Decision Tree': [() => import('@/pages/patterns/notifications/decision-tree.md')],
    },
  },
  'Ag Grid': {
    Theme: [() => import('@/pages/ag-grid/theme.md')],
  },
  'Must Know': {
    Initialization: {
      Introduction: [() => import('@/pages/must-know/initialization/introduction.md')],
      'Vanilla Js': [() => import('@/pages/must-know/initialization/vanilla-js.md')],
      Angular: [() => import('@/pages/must-know/initialization/angular.md')],
      React: [() => import('@/pages/must-know/initialization/react.md')],
      Vue: [() => import('@/pages/must-know/initialization/vue.md')],
      'Next Js': [() => import('@/pages/must-know/initialization/next-js.md')],
      Remix: [() => import('@/pages/must-know/initialization/remix.md')],
    },
    Performance: {
      Cdn: [() => import('@/pages/must-know/performance/cdn.md')],
      'Loading Behaviour': [() => import('@/pages/must-know/performance/loading-behaviour.md')],
    },
    Accessibility: {
      Introduction: [() => import('@/pages/must-know/accessibility/introduction.md')],
      Statement: [() => import('@/pages/must-know/accessibility/statement.md')],
    },
    Security: {
      Vulnerabilities: [() => import('@/pages/must-know/security/vulnerabilities.md')],
      'Content Security Policy': [() => import('@/pages/must-know/security/content-security-policy.md')],
    },
    'Browser Compatibility': [() => import('@/pages/must-know/browser-compatibility.md')],
    Versioning: [() => import('@/pages/must-know/versioning.md')],
    'Definition Of Done': [() => import('@/pages/must-know/definition-of-done.md')],
  },
  Help: {
    Support: [() => import('@/pages/help/support.md')],
    Faq: [() => import('@/pages/help/faq.md')],
    'Feature Request': [() => import('@/pages/help/feature-request.md')],
    'Bug Report': [() => import('@/pages/help/bug-report.md')],
    Contribution: [() => import('@/pages/help/contribution.md')],
  },
};
