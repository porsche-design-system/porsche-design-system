import { StorefrontConfig } from './src/models';

export const config: StorefrontConfig = {
  About: {
    Introduction: [
      // @ts-ignore
      () => import('@/pages/about/introduction.md'),
    ],
  },
  'Start Designing': {
    Introduction: [
      // @ts-ignore
      () => import('@/pages/start-designing/introduction.md'),
    ],
    'Design Workflow': [
      // @ts-ignore
      () => import('@/pages/start-designing/design-workflow.md'),
    ],
    'Sketch Plugins': [
      // @ts-ignore
      () => import('@/pages/start-designing/sketch-plugins.md'),
    ],
  },
  'Start Coding': {
    Introduction: [
      // @ts-ignore
      () => import('@/pages/start-coding/introduction.md'),
    ],
    Angular: [
      // @ts-ignore
      () => import('@/pages/start-coding/angular.md'),
    ],
    React: [
      // @ts-ignore
      () => import('@/pages/start-coding/react.md'),
    ],
    'Vanilla Js': [
      // @ts-ignore
      () => import('@/pages/start-coding/vanilla-js.md'),
    ],
    'Next Js': [
      // @ts-ignore
      () => import('@/pages/start-coding/next-js.md'),
    ],
    Gatsby: [
      // @ts-ignore
      () => import('@/pages/start-coding/gatsby.md'),
    ],
  },
  News: {
    Changelog: {
      Components: [
        // @ts-ignore
        () => import('@/../../components/CHANGELOG.md'),
      ],
      'Sketch Libraries': [
        // @ts-ignore
        () => import('@/../../../sketch/web/CHANGELOG.md'),
        // @ts-ignore
        () => import('@/../../../sketch/basic/CHANGELOG.md'),
      ],
      Utilities: [
        // @ts-ignore
        () => import('@/../../utilities/projects/utilities/CHANGELOG.md'),
      ],
      Assets: [
        // @ts-ignore
        () => import('@/../../assets/CHANGELOG.md'),
      ],
    },
    Versioning: [
      // @ts-ignore
      () => import('@/pages/news/versioning.md'),
    ],
    Roadmap: [
      // @ts-ignore
      () => import('@/pages/news/roadmap.md'),
    ],
  },
  Components: {
    Accordion: {
      Examples: [
        // @ts-ignore
        () => import(`@/../../components/src/components/content/accordion/accordion.examples.md`),
      ],
      Usage: [
        // @ts-ignore
        () => import(`@/../../components/src/components/content/accordion/accordion.usage.md`),
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/content/accordion/accordion.props.md`),
      ],
    },
    Banner: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/feedback/banner/banner.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/feedback/banner/banner.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/feedback/banner/banner.props.md'),
      ],
    },
    'Banner Inline': {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/feedback/banner/banner-inline.examples.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/feedback/banner/banner-inline.props.md'),
      ],
    },
    Button: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/action/button/button.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/action/button/button.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/action/button/button.props.md'),
      ],
    },
    'Button Group': {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/button-group/button-group.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/button-group/button-group.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/button-group/button-group.props.md'),
      ],
    },
    'Button Pure': {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/action/button-pure/button-pure.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/action/button-pure/button-pure.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/action/button-pure/button-pure.props.md'),
      ],
    },
    Checkbox: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/checkbox-wrapper/checkbox-wrapper.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/checkbox-wrapper/checkbox-wrapper.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/checkbox-wrapper/checkbox-wrapper.props.md'),
      ],
    },
    Color: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/basic/color/color.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/basic/color/color.usage.md'),
      ],
    },
    'Content Wrapper': {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/content-wrapper/content-wrapper.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/content-wrapper/content-wrapper.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/content-wrapper/content-wrapper.props.md'),
      ],
    },
    Divider: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/divider/divider.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/divider/divider.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/divider/divider.props.md'),
      ],
    },
    Fieldset: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/fieldset-wrapper/fieldset-wrapper.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/fieldset-wrapper/fieldset-wrapper.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/fieldset-wrapper/fieldset-wrapper.props.md'),
      ],
    },
    Flex: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/flex/flex.examples.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/flex/flex/flex.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/layout/flex/flex-item/flex-item.props.md'),
      ],
    },
    Grid: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/grid/grid.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/grid/grid.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/grid/grid/grid.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/layout/grid/grid-item/grid-item.props.md'),
      ],
    },
    Icon: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/icon/icon/icon.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/icon/icon/icon.usage.md'),
      ],
      Guideline: [
        // @ts-ignore
        () => import('@/../../components/src/components/icon/icon/icon.guideline.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/icon/icon/icon.props.md'),
      ],
    },
    Link: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/link/link.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/link/link.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/link/link.props.md'),
      ],
    },
    'Link Pure': {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/link-pure/link-pure.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/link-pure/link-pure.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/link-pure/link-pure.props.md'),
      ],
    },
    'Link Social': {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/link-social/link-social.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/link-social/link-social.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/link-social/link-social.props.md'),
      ],
    },
    Marque: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/basic/marque/marque.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/basic/marque/marque.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/basic/marque/marque.props.md'),
      ],
    },
    Modal: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/modal/modal.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/modal/modal.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/modal/modal.props.md'),
      ],
    },
    Pagination: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/pagination/pagination.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/pagination/pagination.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/pagination/pagination.props.md'),
      ],
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
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/spacing/spacing.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/layout/spacing/spacing.usage.md'),
      ],
    },
    Spinner: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/feedback/spinner/spinner.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/feedback/spinner/spinner.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/feedback/spinner/spinner.props.md'),
      ],
    },
    Switch: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/action/switch/switch.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/action/switch/switch.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/action/switch/switch.props.md'),
      ],
    },
    Table: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/table/table.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/table/table.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/table/table/table.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/content/table/table-head-cell/table-head-cell.props.md'),
      ],
    },
    Tabs: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/tabs/tabs.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/tabs/tabs.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/tabs/tabs/tabs.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/content/tabs/tabs-item/tabs-item.props.md'),
      ],
    },
    'Tabs Bar': {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/tabs-bar/tabs-bar.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/tabs-bar/tabs-bar.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/navigation/tabs-bar/tabs-bar.props.md'),
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
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/text-list/text-list.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/text-list/text-list.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/content/text-list/text-list/text-list.props.md'),
      ],
    },
    Textarea: {
      Examples: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/textarea-wrapper/textarea-wrapper.examples.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/textarea-wrapper/textarea-wrapper.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/form/textarea-wrapper/textarea-wrapper.props.md'),
      ],
    },
    Typography: {
      Text: [
        // @ts-ignore
        () => import('@/../../components/src/components/basic/typography/text/text.code.md'),
      ],
      Headline: [
        // @ts-ignore
        () => import('@/../../components/src/components/basic/typography/headline/headline.code.md'),
      ],
      Usage: [
        // @ts-ignore
        () => import('@/../../components/src/components/basic/typography/typography.usage.md'),
      ],
      Props: [
        // @ts-ignore
        () => import('@/../../components/src/components/basic/typography/headline/headline.props.md'),
        // @ts-ignore
        () => import('@/../../components/src/components/basic/typography/text/text.props.md'),
      ],
    },
  },
  Help: {
    Support: [
      // @ts-ignore
      () => import('@/pages/help/support.md'),
    ],
    Faq: [
      // @ts-ignore
      () => import('@/pages/help/faq.md'),
    ],
    Troubleshooting: [
      // @ts-ignore
      () => import('@/pages/help/troubleshooting.md'),
    ],
    'Browser Compatibility': [
      // @ts-ignore
      () => import('@/pages/basics/browser-compatibility.md'),
    ],
  },
  Accessibility: {
    Introduction: [
      // @ts-ignore
      () => import('@/pages/accessibility/introduction.md'),
    ],
    Compliance: [
      // @ts-ignore
      () => import('@/pages/accessibility/compliance.md'),
    ],
    Workflow: [
      // @ts-ignore
      () => import('@/pages/accessibility/workflow.md'),
    ],
    'Accessibility Statement': [
      // @ts-ignore
      () => import('@/pages/accessibility/statement.md'),
    ],
  },
  Patterns: {
    Forms: {
      Guidelines: [
        // @ts-ignore
        () => import('@/pages/patterns/forms/guidelines.md'),
      ],
      Resources: [
        // @ts-ignore
        () => import('@/pages/patterns/forms/resources.md'),
      ],
      Legal: [
        // @ts-ignore
        () => import('@/pages/patterns/forms/legal.md'),
      ],
    },
  },
  Assets: {
    Introduction: [
      // @ts-ignore
      () => import('@/pages/assets/introduction.md'),
    ],
    Icons: [
      // @ts-ignore
      () => import('@/pages/assets/icons.md'),
    ],
    'Meta Icons': [
      // @ts-ignore
      () => import('@/pages/assets/meta-icons.md'),
    ],
    Marque: [
      // @ts-ignore
      () => import('@/pages/assets/marque.md'),
    ],
    Fonts: [
      // @ts-ignore
      () => import('@/pages/assets/fonts.md'),
    ],
  },
  Utilities: {
    Introduction: [
      // @ts-ignore
      () => import('@/pages/utilities/introduction.md'),
    ],
    Scss: {
      Variables: [
        // @ts-ignore
        () => import('@/pages/utilities/scss/variables.md'),
      ],
      Functions: [
        // @ts-ignore
        () => import('@/pages/utilities/scss/functions.md'),
      ],
      Helper: [
        // @ts-ignore
        () => import('@/pages/utilities/scss/helper.md'),
      ],
    },
    Js: {
      Variables: [
        // @ts-ignore
        () => import('@/pages/utilities/js/variables.md'),
      ],
      Functions: [
        // @ts-ignore
        () => import('@/pages/utilities/js/functions.md'),
      ],
      Helper: [
        // @ts-ignore
        () => import('@/pages/utilities/js/helper.md'),
      ],
    },
  },
  Partials: {
    'Loader Script': [
      // @ts-ignore
      () => import('@/pages/partials/loader-script.md'),
    ],
    'Component Chunk Links': [
      // @ts-ignore
      () => import('@/pages/partials/component-chunk-links.md'),
    ],
    'Initial Styles': [
      // @ts-ignore
      () => import('@/pages/partials/initial-styles.md'),
    ],
    'Font Face Stylesheet': [
      // @ts-ignore
      () => import('@/pages/partials/font-face-stylesheet.md'),
    ],
    'Font Links': [
      // @ts-ignore
      () => import('@/pages/partials/font-links.md'),
    ],
    'Icon Links': [
      // @ts-ignore
      () => import('@/pages/partials/icon-links.md'),
    ],
    'Meta Tags And Icon Links': [
      // @ts-ignore
      () => import('@/pages/partials/meta-tags-and-icon-links.md'),
    ],
  },
  Performance: {
    Cdn: [
      // @ts-ignore
      () => import('@/pages/performance/cdn.md'),
    ],
    'Loading Behaviour': [
      // @ts-ignore
      () => import('@/pages/performance/loading-behaviour.md'),
    ],
  },
  Security: {
    Cve: [
      // @ts-ignore
      () => import('@/pages/security/cve.md'),
    ],
  },
  Helpers: {
    'Components Ready': [
      // @ts-ignore
      () => import('@/pages/general/components-ready.md'),
    ],
    'Slotted Content': [
      // @ts-ignore
      () => import('@/pages/general/slotted-content.md'),
    ],
    Testing: [
      // @ts-ignore
      () => import('@/pages/general/testing.md'),
    ],
  },
};
