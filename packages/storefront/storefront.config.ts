import type { StorefrontConfig } from './src/models';

export const ALGOLIA_APP_ID = '1NH68HJ92C';
export const ALGOLIA_SEARCH_ONLY_KEY = '690605ee1f61d0e13c571484ecb74125';

const componentsBasePath = '@/../../components/src/components';

export const config: StorefrontConfig = {
  News: {
    'Migration Guide': {
      'Porsche Design System': [() => import('@/pages/news/migration-guide.md')],
      Utilities: [() => import('@/pages/news/migration-guide-utilities.md')],
    },
    Changelog: [() => import('@/../../components/CHANGELOG.md')],
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
      Examples: [() => import(`${componentsBasePath}/accordion/accordion.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/accordion/accordion.usage.md`)],
      Props: [() => import(`${componentsBasePath}/accordion/accordion.props.md`)],
    },
    Banner: {
      Examples: [() => import(`${componentsBasePath}/banner/banner.examples.md`)],
      Props: [() => import(`${componentsBasePath}/banner/banner.props.md`)],
    },
    Button: {
      Examples: [() => import(`${componentsBasePath}/button/button.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/button/button.usage.md`)],
      Props: [() => import(`${componentsBasePath}/button/button.props.md`)],
    },
    'Button Group': {
      Examples: [() => import(`${componentsBasePath}/button-group/button-group.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/button-group/button-group.usage.md`)],
      Props: [() => import(`${componentsBasePath}/button-group/button-group.props.md`)],
    },
    'Button Pure': {
      Examples: [() => import(`${componentsBasePath}/button-pure/button-pure.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/button-pure/button-pure.usage.md`)],
      Props: [() => import(`${componentsBasePath}/button-pure/button-pure.props.md`)],
    },
    'Button Tile': {
      Examples: [() => import(`${componentsBasePath}/button-tile/button-tile.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/button-tile/button-tile.usage.md`)],
      Props: [() => import(`${componentsBasePath}/button-tile/button-tile.props.md`)],
    },
    Carousel: {
      Examples: [() => import(`${componentsBasePath}/carousel/carousel.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/carousel/carousel.usage.md`)],
      Props: [() => import(`${componentsBasePath}/carousel/carousel.props.md`)],
    },
    'Checkbox Wrapper': {
      Examples: [() => import(`${componentsBasePath}/checkbox-wrapper/checkbox-wrapper.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/checkbox-wrapper/checkbox-wrapper.usage.md`)],
      Props: [() => import(`${componentsBasePath}/checkbox-wrapper/checkbox-wrapper.props.md`)],
    },
    'Content Wrapper': {
      Examples: [() => import(`${componentsBasePath}/content-wrapper/content-wrapper.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/content-wrapper/content-wrapper.usage.md`)],
      Props: [() => import(`${componentsBasePath}/content-wrapper/content-wrapper.props.md`)],
    },
    Crest: {
      Examples: [() => import(`${componentsBasePath}/crest/crest.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/crest/crest.usage.md`)],
      Props: [() => import(`${componentsBasePath}/crest/crest.props.md`)],
    },
    Display: {
      Examples: [() => import(`${componentsBasePath}/display/display.example.md`)],
      Props: [() => import(`${componentsBasePath}/display/display.props.md`)],
    },
    Divider: {
      Examples: [() => import(`${componentsBasePath}/divider/divider.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/divider/divider.usage.md`)],
      Props: [() => import(`${componentsBasePath}/divider/divider.props.md`)],
    },
    Fieldset: {
      Examples: [() => import(`${componentsBasePath}/fieldset/fieldset.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/fieldset/fieldset.usage.md`)],
      Props: [() => import(`${componentsBasePath}/fieldset/fieldset.props.md`)],
    },
    'Fieldset Wrapper': {
      Examples: [() => import(`${componentsBasePath}/fieldset-wrapper/fieldset-wrapper.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/fieldset-wrapper/fieldset-wrapper.usage.md`)],
      Props: [() => import(`${componentsBasePath}/fieldset-wrapper/fieldset-wrapper.props.md`)],
    },
    Flex: {
      Examples: [() => import(`${componentsBasePath}/flex/flex.examples.md`)],
      Props: [
        () => import(`${componentsBasePath}/flex/flex/flex.props.md`),
        () => import(`${componentsBasePath}/flex/flex-item/flex-item.props.md`),
      ],
    },
    Flyout: {
      Examples: [() => import(`${componentsBasePath}/flyout/flyout.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/flyout/flyout.usage.md`)],
      Props: [() => import(`${componentsBasePath}/flyout/flyout.props.md`)],
    },
    Grid: {
      Examples: [() => import(`${componentsBasePath}/grid/grid.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/grid/grid.usage.md`)],
      Props: [
        () => import(`${componentsBasePath}/grid/grid/grid.props.md`),
        () => import(`${componentsBasePath}/grid/grid-item/grid-item.props.md`),
      ],
    },
    Heading: {
      Examples: [() => import(`${componentsBasePath}/heading/heading.example.md`)],
      Props: [() => import(`${componentsBasePath}/heading/heading.props.md`)],
    },
    Headline: {
      Examples: [() => import(`${componentsBasePath}/headline/headline.example.md`)],
      Props: [() => import(`${componentsBasePath}/headline/headline.props.md`)],
    },
    Icon: {
      Examples: [() => import(`${componentsBasePath}/icon/icon.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/icon/icon.usage.md`)],
      Guideline: [() => import(`${componentsBasePath}/icon/icon.guideline.md`)],
      Props: [() => import(`${componentsBasePath}/icon/icon.props.md`)],
    },
    'Inline Notification': {
      Examples: [() => import(`${componentsBasePath}/inline-notification/inline-notification.examples.md`)],
      Props: [() => import(`${componentsBasePath}/inline-notification/inline-notification.props.md`)],
    },
    Link: {
      Examples: [() => import(`${componentsBasePath}/link/link.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/link/link.usage.md`)],
      Props: [() => import(`${componentsBasePath}/link/link.props.md`)],
    },
    'Link Pure': {
      Examples: [() => import(`${componentsBasePath}/link-pure/link-pure.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/link-pure/link-pure.usage.md`)],
      Props: [() => import(`${componentsBasePath}/link-pure/link-pure.props.md`)],
    },
    'Link Social': {
      Examples: [() => import(`${componentsBasePath}/link-social/link-social.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/link-social/link-social.usage.md`)],
      Props: [() => import(`${componentsBasePath}/link-social/link-social.props.md`)],
    },
    'Link Tile': {
      Examples: [() => import(`${componentsBasePath}/link-tile/link-tile.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/link-tile/link-tile.usage.md`)],
      Props: [() => import(`${componentsBasePath}/link-tile/link-tile.props.md`)],
    },
    'Link Tile Model Signature': {
      Examples: [() => import(`${componentsBasePath}/link-tile-model-signature/link-tile-model-signature.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/link-tile-model-signature/link-tile-model-signature.usage.md`)],
      Props: [() => import(`${componentsBasePath}/link-tile-model-signature/link-tile-model-signature.props.md`)],
    },
    Marque: {
      Examples: [() => import(`${componentsBasePath}/marque/marque.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/marque/marque.usage.md`)],
      Props: [() => import(`${componentsBasePath}/marque/marque.props.md`)],
    },
    Modal: {
      Examples: [() => import(`${componentsBasePath}/modal/modal.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/modal/modal.usage.md`)],
      Props: [() => import(`${componentsBasePath}/modal/modal.props.md`)],
    },
    'Model Signature': {
      Examples: [() => import(`${componentsBasePath}/model-signature/model-signature.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/model-signature/model-signature.usage.md`)],
      Props: [() => import(`${componentsBasePath}/model-signature/model-signature.props.md`)],
    },
    'Multi Select': {
      Examples: [() => import(`${componentsBasePath}/multi-select/multi-select/multi-select.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/multi-select/multi-select/multi-select.usage.md`)],
      Props: [
        () => import(`${componentsBasePath}/multi-select/multi-select/multi-select.props.md`),
        () => import(`${componentsBasePath}/multi-select/multi-select-option/multi-select-option.props.md`),
      ],
    },
    Pagination: {
      Examples: [() => import(`${componentsBasePath}/pagination/pagination.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/pagination/pagination.usage.md`)],
      Props: [() => import(`${componentsBasePath}/pagination/pagination.props.md`)],
    },
    'Pin Code': {
      Examples: [() => import(`${componentsBasePath}/pin-code/pin-code.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/pin-code/pin-code.usage.md`)],
      Props: [() => import(`${componentsBasePath}/pin-code/pin-code.props.md`)],
    },
    Popover: {
      Examples: [() => import(`${componentsBasePath}/popover/popover.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/popover/popover.usage.md`)],
      Props: [() => import(`${componentsBasePath}/popover/popover.props.md`)],
    },
    'Radio Button Wrapper': {
      Examples: [() => import(`${componentsBasePath}/radio-button-wrapper/radio-button-wrapper.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/radio-button-wrapper/radio-button-wrapper.usage.md`)],
      Props: [() => import(`${componentsBasePath}/radio-button-wrapper/radio-button-wrapper.props.md`)],
    },
    Scroller: {
      Examples: [() => import(`${componentsBasePath}/scroller/scroller.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/scroller/scroller.usage.md`)],
      Props: [() => import(`${componentsBasePath}/scroller/scroller.props.md`)],
    },
    'Segmented Control': {
      Examples: [() => import(`${componentsBasePath}/segmented-control/segmented-control.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/segmented-control/segmented-control.usage.md`)],
      Props: [
        () => import(`${componentsBasePath}/segmented-control/segmented-control/segmented-control.props.md`),
        () => import(`${componentsBasePath}/segmented-control/segmented-control-item/segmented-control-item.props.md`),
      ],
    },
    'Select Wrapper': {
      Examples: [() => import(`${componentsBasePath}/select-wrapper/select-wrapper/select-wrapper.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/select-wrapper/select-wrapper/select-wrapper.usage.md`)],
      Props: [() => import(`${componentsBasePath}/select-wrapper/select-wrapper/select-wrapper.props.md`)],
    },
    Spinner: {
      Examples: [() => import(`${componentsBasePath}/spinner/spinner.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/spinner/spinner.usage.md`)],
      Props: [() => import(`${componentsBasePath}/spinner/spinner.props.md`)],
    },
    'Stepper Horizontal': {
      // prettier-ignore
      Examples: [() => import(`${componentsBasePath}/stepper-horizontal/stepper-horizontal/stepper-horizontal.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/stepper-horizontal/stepper-horizontal/stepper-horizontal.usage.md`)],
      // prettier-ignore
      Props: [
        () => import(`${componentsBasePath}/stepper-horizontal/stepper-horizontal/stepper-horizontal.props.md`),
        () => import(`${componentsBasePath}/stepper-horizontal/stepper-horizontal-item/stepper-horizontal-item.props.md`),
      ],
    },
    Switch: {
      Examples: [() => import(`${componentsBasePath}/switch/switch.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/switch/switch.usage.md`)],
      Props: [() => import(`${componentsBasePath}/switch/switch.props.md`)],
    },
    Table: {
      Examples: [() => import(`${componentsBasePath}/table/table.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/table/table.usage.md`)],
      Props: [
        () => import(`${componentsBasePath}/table/table/table.props.md`),
        () => import(`${componentsBasePath}/table/table-head-cell/table-head-cell.props.md`),
        () => import(`${componentsBasePath}/table/table-cell/table-cell.props.md`),
      ],
    },
    Tabs: {
      Examples: [() => import(`${componentsBasePath}/tabs/tabs.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/tabs/tabs.usage.md`)],
      Props: [
        () => import(`${componentsBasePath}/tabs/tabs/tabs.props.md`),
        () => import(`${componentsBasePath}/tabs/tabs-item/tabs-item.props.md`),
      ],
    },
    'Tabs Bar': {
      Examples: [() => import(`${componentsBasePath}/tabs-bar/tabs-bar.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/tabs-bar/tabs-bar.usage.md`)],
      Props: [() => import(`${componentsBasePath}/tabs-bar/tabs-bar.props.md`)],
    },
    Tag: {
      Examples: [() => import(`${componentsBasePath}/tag/tag.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/tag/tag.usage.md`)],
      Props: [() => import(`${componentsBasePath}/tag/tag.props.md`)],
    },
    'Tag Dismissible': {
      Examples: [() => import(`${componentsBasePath}/tag-dismissible/tag-dismissible.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/tag-dismissible/tag-dismissible.usage.md`)],
      Props: [() => import(`${componentsBasePath}/tag-dismissible/tag-dismissible.props.md`)],
    },
    Text: {
      Examples: [() => import(`${componentsBasePath}/text/text.example.md`)],
      Props: [() => import(`${componentsBasePath}/text/text.props.md`)],
    },
    'Text Field Wrapper': {
      Examples: [() => import(`${componentsBasePath}/text-field-wrapper/text-field-wrapper.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/text-field-wrapper/text-field-wrapper.usage.md`)],
      Props: [() => import(`${componentsBasePath}/text-field-wrapper/text-field-wrapper.props.md`)],
    },
    'Text List': {
      Examples: [() => import(`${componentsBasePath}/text-list/text-list.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/text-list/text-list.usage.md`)],
      Props: [() => import(`${componentsBasePath}/text-list/text-list/text-list.props.md`)],
    },
    'Textarea Wrapper': {
      Examples: [() => import(`${componentsBasePath}/textarea-wrapper/textarea-wrapper.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/textarea-wrapper/textarea-wrapper.usage.md`)],
      Props: [() => import(`${componentsBasePath}/textarea-wrapper/textarea-wrapper.props.md`)],
    },
    Toast: {
      Examples: [() => import(`${componentsBasePath}/toast/toast.examples.md`)],
      Props: [() => import(`${componentsBasePath}/toast/toast/toast.props.md`)],
    },
    Wordmark: {
      Examples: [() => import(`${componentsBasePath}/wordmark/wordmark.examples.md`)],
      Usage: [() => import(`${componentsBasePath}/wordmark/wordmark.usage.md`)],
      Props: [() => import(`${componentsBasePath}/wordmark/wordmark.props.md`)],
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
  'Must Know': {
    Accessibility: {
      Introduction: [() => import('@/pages/must-know/accessibility/introduction.md')],
      Statement: [() => import('@/pages/must-know/accessibility/statement.md')],
    },
    Security: {
      Vulnerabilities: [() => import('@/pages/must-know/security/vulnerabilities.md')],
      'Content Security Policy': [() => import('@/pages/must-know/security/content-security-policy.md')],
    },
    Performance: {
      Cdn: [() => import('@/pages/must-know/performance/cdn.md')],
      'Loading Behaviour': [() => import('@/pages/must-know/performance/loading-behaviour.md')],
    },
    'Browser Compatibility': [() => import('@/pages/must-know/browser-compatibility.md')],
    Versioning: [() => import('@/pages/must-know/versioning.md')],
    'Definition Of Done': [() => import('@/pages/must-know/definition-of-done.md')],
  },
  Help: {
    Support: [() => import('@/pages/help/support.md')],
    Faq: [() => import('@/pages/help/faq.md')],
    Troubleshooting: [() => import('@/pages/help/troubleshooting.md')],
    'Bug Report': [() => import('@/pages/help/bug-report.md')],
  },
};
