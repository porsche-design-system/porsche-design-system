import type { StorefrontConfig } from '@/models';

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
    // @ts-ignore
    'Design Workflow': [() => import('@/pages/start-designing/design-workflow.md')],
    // @ts-ignore
    'Sketch Plugins': [() => import('@/pages/start-designing/sketch-plugins.md')],
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
      // @ts-ignore
      Testing: [() => import('@/pages/start-coding/next-js/testing.md')],
    },
    Gatsby: {
      // @ts-ignore
      'Getting Started': [() => import('@/pages/start-coding/gatsby/getting-started.md')],
      // @ts-ignore
      Testing: [() => import('@/pages/start-coding/gatsby/testing.md')],
    },
  },
  News: {
    Changelog: {
      // @ts-ignore
      Components: [() => import('@/../../components/CHANGELOG.md')],
      'Sketch Libraries': [
        // @ts-ignore
        () => import('@/../../../sketch/web/CHANGELOG.md'),
        // @ts-ignore
        () => import('@/../../../sketch/basic/CHANGELOG.md'),
      ],
      // @ts-ignore
      Utilities: [() => import('@/../../utilities-deprecated/projects/utilities/CHANGELOG.md')],
      // @ts-ignore
      Assets: [() => import('@/../../assets/CHANGELOG.md')],
      'Browser Notification': [
        // @ts-ignore
        () => import('@/../../../node_modules/@porsche-design-system/browser-notification/CHANGELOG.md'),
      ],
    },
    // @ts-ignore
    Versioning: [() => import('@/pages/news/versioning.md')],
    // @ts-ignore
    Roadmap: [() => import('@/pages/news/roadmap.md')],
  },
  Components: {
    Accordion: {
      // @ts-ignore
      Examples: [() => import(`@/../../components/src/components/content/accordion/accordion.examples.md`)],
      // @ts-ignore
      Usage: [() => import(`@/../../components/src/components/content/accordion/accordion.usage.md`)],
      // @ts-ignore
      Props: [() => import(`@/../../components/src/components/content/accordion/accordion.props.md`)],
    },
    // @ts-ignore
    Banner: [() => import('@/../../components/src/components/feedback/banner/banner.redirect.md')],
    Button: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/action/button/button.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/action/button/button.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/action/button/button.props.md')],
    },
    'Button Group': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/layout/button-group/button-group.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/layout/button-group/button-group.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/layout/button-group/button-group.props.md')],
    },
    'Button Pure': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/action/button-pure/button-pure.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/action/button-pure/button-pure.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/action/button-pure/button-pure.props.md')],
    },
    Checkbox: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/form/checkbox-wrapper/checkbox-wrapper.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/form/checkbox-wrapper/checkbox-wrapper.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/form/checkbox-wrapper/checkbox-wrapper.props.md')],
    },
    Color: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/basic/color/color.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/basic/color/color.usage.md')],
    },
    'Content Wrapper': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/layout/content-wrapper/content-wrapper.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/layout/content-wrapper/content-wrapper.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/layout/content-wrapper/content-wrapper.props.md')],
    },
    Divider: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/layout/divider/divider.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/layout/divider/divider.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/layout/divider/divider.props.md')],
    },
    Fieldset: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/form/fieldset-wrapper/fieldset-wrapper.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/form/fieldset-wrapper/fieldset-wrapper.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/form/fieldset-wrapper/fieldset-wrapper.props.md')],
    },
    Flex: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/layout/flex/flex.examples.md')],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/flex/flex/flex.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/layout/flex/flex-item/flex-item.props.md'),
      ],
    },
    Grid: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/layout/grid/grid.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/layout/grid/grid.usage.md')],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/grid/grid/grid.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/layout/grid/grid-item/grid-item.props.md'),
      ],
    },
    Icon: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/icon/icon/icon.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/icon/icon/icon.usage.md')],
      // @ts-ignore
      Guideline: [() => import('@/../../components/src/components/icon/icon/icon.guideline.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/icon/icon/icon.props.md')],
    },
    Link: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/navigation/link/link.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/navigation/link/link.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/navigation/link/link.props.md')],
    },
    'Link Pure': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/navigation/link-pure/link-pure.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/navigation/link-pure/link-pure.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/navigation/link-pure/link-pure.props.md')],
    },
    'Link Social': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/navigation/link-social/link-social.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/navigation/link-social/link-social.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/navigation/link-social/link-social.props.md')],
    },
    Marque: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/basic/marque/marque.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/basic/marque/marque.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/basic/marque/marque.props.md')],
    },
    Modal: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/content/modal/modal.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/content/modal/modal.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/content/modal/modal.props.md')],
    },
    Notifications: {
      // @ts-ignore
      Introduction: [() => import('@/../../components/src/components/feedback/notifications.usage.md')],
      'Inline Notification': [
        // @ts-ignore
        () => import('@/../../components/src/components/feedback/inline-notification/inline-notification.examples.md'),
      ],
      // @ts-ignore
      Toast: [() => import('@/../../components/src/components/feedback/toast/toast/toast.examples.md')],
      // @ts-ignore
      Banner: [() => import('@/../../components/src/components/feedback/banner/banner.examples.md')],
      // @ts-ignore
      'Decision Tree': [() => import('@/../../components/src/components/feedback/decision-tree.md')],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/feedback/inline-notification/inline-notification.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/feedback/toast/toast/toast.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/feedback/banner/banner.props.md'),
      ],
    },
    Pagination: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/navigation/pagination/pagination.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/navigation/pagination/pagination.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/navigation/pagination/pagination.props.md')],
    },
    Popover: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/feedback/popover/popover.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/feedback/popover/popover.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/feedback/popover/popover.props.md')],
    },
    'Radio Button': {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/radio-button-wrapper/radio-button-wrapper.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/radio-button-wrapper/radio-button-wrapper.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/radio-button-wrapper/radio-button-wrapper.props.md'),
      ],
    },
    Select: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/select-wrapper/select-wrapper/select-wrapper.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/select-wrapper/select-wrapper/select-wrapper.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/select-wrapper/select-wrapper/select-wrapper.props.md'),
      ],
    },
    Spacing: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/layout/spacing/spacing.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/layout/spacing/spacing.usage.md')],
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
      Examples: [() => import('@/../../components/src/components/feedback/spinner/spinner.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/feedback/spinner/spinner.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/feedback/spinner/spinner.props.md')],
    },
    Switch: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/action/switch/switch.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/action/switch/switch.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/action/switch/switch.props.md')],
    },
    Table: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/content/table/table.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/content/table/table.usage.md')],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/table/table/table.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/content/table/table-head-cell/table-head-cell.props.md'),
      ],
    },
    Tabs: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/content/tabs/tabs.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/content/tabs/tabs.usage.md')],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/tabs/tabs/tabs.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/content/tabs/tabs-item/tabs-item.props.md'),
      ],
    },
    'Tabs Bar': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/navigation/tabs-bar/tabs-bar.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/navigation/tabs-bar/tabs-bar.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/navigation/tabs-bar/tabs-bar.props.md')],
    },
    Tags: {
      // @ts-ignore
      Introduction: [() => import('@/../../components/src/components/action/tag/tag.introduction.md')],
      // @ts-ignore
      Tag: [() => import('@/../../components/src/components/action/tag/tag.examples.md')],
      'Tag Dismissible': [
        // @ts-ignore
        () => import('@/../../components/src/components/action/tag-dismissible/tag-dismissible.examples.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/action/tag/tag.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/action/tag-dismissible/tag-dismissible.props.md'),
      ],
    },
    'Text Field': {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/text-field-wrapper/text-field-wrapper.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/text-field-wrapper/text-field-wrapper.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/text-field-wrapper/text-field-wrapper.props.md'),
      ],
    },
    'Text List': {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/content/text-list/text-list.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/content/text-list/text-list.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/content/text-list/text-list/text-list.props.md')],
    },
    Textarea: {
      // @ts-ignore
      Examples: [() => import('@/../../components/src/components/form/textarea-wrapper/textarea-wrapper.examples.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/form/textarea-wrapper/textarea-wrapper.usage.md')],
      // @ts-ignore
      Props: [() => import('@/../../components/src/components/form/textarea-wrapper/textarea-wrapper.props.md')],
    },
    Typography: {
      // @ts-ignore
      Text: [() => import('@/../../components/src/components/basic/typography/text/text.code.md')],
      // @ts-ignore
      Headline: [() => import('@/../../components/src/components/basic/typography/headline/headline.code.md')],
      // @ts-ignore
      Usage: [() => import('@/../../components/src/components/basic/typography/typography.usage.md')],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/basic/typography/headline/headline.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/basic/typography/text/text.props.md'),
      ],
    },
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
  Utilities: {
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
  Partials: {
    // @ts-ignore
    Introduction: [() => import('@/pages/partials/introduction.md')],
    // @ts-ignore
    'Loader Script': [() => import('@/pages/partials/loader-script.md')],
    // @ts-ignore
    'Component Chunk Links': [() => import('@/pages/partials/component-chunk-links.md')],
    // @ts-ignore
    'Initial Styles': [() => import('@/pages/partials/initial-styles.md')],
    // @ts-ignore
    'Font Face Stylesheet': [() => import('@/pages/partials/font-face-stylesheet.md')],
    // @ts-ignore
    'Font Links': [() => import('@/pages/partials/font-links.md')],
    // @ts-ignore
    'Icon Links': [() => import('@/pages/partials/icon-links.md')],
    // @ts-ignore
    'Meta Tags And Icon Links': [() => import('@/pages/partials/meta-tags-and-icon-links.md')],
  },
  'Browser Notifications': {
    // @ts-ignore
    Introduction: [() => import('@/pages/browser-notifications/introduction.md')],
    // @ts-ignore
    'Browser Support Notification': [() => import('@/pages/browser-notifications/browser-support-notification.md')],
    // @ts-ignore
    'Cookie Notification': [() => import('@/pages/browser-notifications/cookie-notification.md')],
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
