import { StorefrontConfig } from './src/models';

export const config: StorefrontConfig = {
  About: {
    Introduction: [
      // @ts-ignore
      () => import(`@/pages/about/introduction.md`)
    ]
  },
  'Start Designing': {
    Introduction: [
      // @ts-ignore
      () => import(`@/pages/start-designing/introduction.md`)
    ],
    'Design Workflow': [
      // @ts-ignore
      () => import(`@/pages/start-designing/design-workflow.md`)
    ],
    'Sketch Plugins': [
      // @ts-ignore
      () => import(`@/pages/start-designing/sketch-plugins.md`)
    ]
  },
  'Start Coding': {
    Introduction: [
      // @ts-ignore
      () => import(`@/pages/start-coding/introduction.md`)
    ],
    Angular: [
      // @ts-ignore
      () => import(`@/pages/start-coding/angular.md`)
    ],
    React: [
      // @ts-ignore
      () => import(`@/pages/start-coding/react.md`)
    ],
    'Next Js': [
      // @ts-ignore
      () => import(`@/pages/start-coding/next-js.md`)
    ],
    Gatsby: [
      // @ts-ignore
      () => import(`@/pages/start-coding/gatsby.md`)
    ]
  },
  News: {
    Changelog: {
      'Sketch Libraries': [
        // @ts-ignore
        () => import(`@/../../../sketch/web/CHANGELOG.md`),
        // @ts-ignore
        () => import(`@/../../../sketch/basic/CHANGELOG.md`)
      ],
      Components: [
        // @ts-ignore
        () => import(`@/../../components/CHANGELOG.md`)
      ],
      Utilities: [
        // @ts-ignore
        () => import(`@/../../utilities/projects/utilities/CHANGELOG.md`)
      ],
      Assets: [
        // @ts-ignore
        () => import(`@/../../assets/CHANGELOG.md`)
      ]
    },
    Versioning: [
      // @ts-ignore
      () => import(`@/pages/news/versioning.md`)
    ],
    Roadmap: [
      // @ts-ignore
      () => import(`@/pages/news/roadmap.md`)
    ]
  },
  Help: {
    Support: [
      // @ts-ignore
      () => import(`@/pages/help/support.md`)
    ],
    Faq: [
      // @ts-ignore
      () => import(`@/pages/help/faq.md`)
    ],
    Troubleshooting: [
      // @ts-ignore
      () => import(`@/pages/help/troubleshooting.md`)
    ],
    'Browser Compatibility': [
      // @ts-ignore
      () => import(`@/pages/basics/browser-compatibility.md`)
    ]
  },
  Accessibility: {
    Introduction: [
      // @ts-ignore
      () => import(`@/pages/accessibility/introduction.md`)
    ],
    Compliance: [
      // @ts-ignore
      () => import(`@/pages/accessibility/compliance.md`)
    ],
    Guidelines: [
      // @ts-ignore
      () => import(`@/pages/accessibility/guidelines.md`)
    ]
  },
  Patterns: {
    Buttons: {
      Guidelines: [
        // @ts-ignore
        () => import(`@/pages/patterns/buttons/guidelines.md`)
      ],
      Resources: [
        // @ts-ignore
        () => import(`@/pages/patterns/buttons/resources.md`)
      ]
    },
    Forms: {
      Guidelines: [
        // @ts-ignore
        () => import(`@/pages/patterns/forms/guidelines.md`)
      ],
      Resources: [
        // @ts-ignore
        () => import(`@/pages/patterns/forms/resources.md`)
      ]
    }
  },
  Assets: {
    Introduction: [
      // @ts-ignore
      () => import(`@/pages/assets/introduction.md`)
    ],
    Icons: [
      // @ts-ignore
      () => import(`@/pages/assets/icons.md`)
    ],
    Metaicons: [
      // @ts-ignore
      () => import(`@/pages/assets/metaicons.md`)
    ],
    Marque: [
      // @ts-ignore
      () => import(`@/pages/assets/marque.md`)
    ],
    Fonts: [
      // @ts-ignore
      () => import(`@/pages/assets/fonts.md`)
    ]
  },
  Utilities: {
    Introduction: [
      // @ts-ignore
      () => import(`@/pages/utilities/introduction.md`)
    ],
    Scss: {
      Variables: [
        // @ts-ignore
        () => import(`@/pages/utilities/scss/variables.md`)
      ],
      Functions: [
        // @ts-ignore
        () => import(`@/pages/utilities/scss/functions.md`)
      ],
      Helper: [
        // @ts-ignore
        () => import(`@/pages/utilities/scss/helper.md`)
      ]
    },
    Js: {
      Variables: [
        // @ts-ignore
        () => import(`@/pages/utilities/js/variables.md`)
      ],
      Functions: [
        // @ts-ignore
        () => import(`@/pages/utilities/js/functions.md`)
      ],
      Helper: [
        // @ts-ignore
        () => import(`@/pages/utilities/js/helper.md`)
      ]
    }
  },
  Helpers: {
    'Blur On Focus': [
      // @ts-ignore
      () => import(`@/pages/general/blur-on-focus.md`)
    ],
    'Components Ready': [
      // @ts-ignore
      () => import(`@/pages/general/components-ready.md`)
    ],
    'Flash Of Unstyled Content': [
      // @ts-ignore
      () => import(`@/pages/general/flash-of-unstyled-content.md`)
    ],
    'Slotted Content': [
      // @ts-ignore
      () => import(`@/pages/general/slotted-content.md`)
    ],
    Testing: [
      // @ts-ignore
      () => import(`@/pages/general/testing.md`)
    ]
  },
  Components: {
    Color: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/basic/color/color.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/basic/color/color.code.md`)
      ]
    },
    Marque: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/basic/marque/marque.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/basic/marque/marque.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/basic/marque/marque.props.md`)
      ]
    },
    Typography: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/basic/typography/typography.design.md`)
      ],
      Headline: [
        // @ts-ignore
        () => import(`@/../../components/src/components/basic/typography/headline/headline.code.md`)
      ],
      Text: [
        // @ts-ignore
        () => import(`@/../../components/src/components/basic/typography/text/text.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/basic/typography/headline/headline.props.md`),
        // @ts-ignore
        () => import(`@/../../components/src/components/basic/typography/text/text.props.md`)
      ]
    },
    Button: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/action/button/button.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/action/button/button.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/action/button/button.props.md`)
      ]
    },
    'Button Pure': {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/action/button-pure/button-pure.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/action/button-pure/button-pure.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/action/button-pure/button-pure.props.md`)
      ]
    },
    Checkbox: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/checkbox-wrapper/checkbox-wrapper.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/checkbox-wrapper/checkbox-wrapper.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/checkbox-wrapper/checkbox-wrapper.props.md`)
      ]
    },
    Fieldset: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/fieldset-wrapper/fieldset-wrapper.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/fieldset-wrapper/fieldset-wrapper.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/fieldset-wrapper/fieldset-wrapper.props.md`)
      ]
    },
    'Radio Button': {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/radio-button-wrapper/radio-button-wrapper.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/radio-button-wrapper/radio-button-wrapper.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/radio-button-wrapper/radio-button-wrapper.props.md`)
      ]
    },
    Select: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/select-wrapper/select-wrapper.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/select-wrapper/select-wrapper.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/select-wrapper/select-wrapper.props.md`)
      ]
    },
    Textarea: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/textarea-wrapper/textarea-wrapper.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/textarea-wrapper/textarea-wrapper.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/textarea-wrapper/textarea-wrapper.props.md`)
      ]
    },
    'Text Field': {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/text-field-wrapper/text-field-wrapper.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/text-field-wrapper/text-field-wrapper.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/form/text-field-wrapper/text-field-wrapper.props.md`)
      ]
    },
    'Text List': {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/content/text-list/text-list.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/content/text-list/text-list.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/content/text-list/text-list/text-list.props.md`)
      ]
    },
    Spinner: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/feedback/spinner/spinner.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/feedback/spinner/spinner.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/feedback/spinner/spinner.props.md`)
      ]
    },
    Icon: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/icon/icon/icon.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/icon/icon/icon.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/icon/icon/icon.props.md`)
      ]
    },
    'Content Wrapper': {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/content-wrapper/content-wrapper.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/content-wrapper/content-wrapper.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/content-wrapper/content-wrapper.props.md`)
      ]
    },
    Divider: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/divider/divider.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/divider/divider.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/divider/divider.props.md`)
      ]
    },
    Flex: {
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/flex/flex.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/flex/flex/flex.props.md`),
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/flex/flex-item/flex-item.props.md`)
      ]
    },
    Grid: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/grid/grid.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/grid/grid.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/grid/grid/grid.props.md`),
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/grid/grid-item/grid-item.props.md`)
      ]
    },
    Spacing: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/spacing/spacing.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/layout/spacing/spacing.code.md`)
      ]
    },
    Link: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/navigation/link/link.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/navigation/link/link.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/navigation/link/link.props.md`)
      ]
    },
    'Link Pure': {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/navigation/link-pure/link-pure.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/navigation/link-pure/link-pure.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/navigation/link-pure/link-pure.props.md`)
      ]
    },
    'Link Social': {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/navigation/link-social/link-social.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/navigation/link-social/link-social.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/navigation/link-social/link-social.props.md`)
      ]
    },
    Pagination: {
      Design: [
        // @ts-ignore
        () => import(`@/../../components/src/components/navigation/pagination/pagination.design.md`)
      ],
      Code: [
        // @ts-ignore
        () => import(`@/../../components/src/components/navigation/pagination/pagination.code.md`)
      ],
      Props: [
        // @ts-ignore
        () => import(`@/../../components/src/components/navigation/pagination/pagination.props.md`)
      ]
    },
    'Tabs': {
      'Design': [
        // @ts-ignore
        () => import(`@/../../components-js/src/components/navigation/tabs/tabs.design.md`)
      ],
      'Code': [
        // @ts-ignore
        () => import(`@/../../components-js/src/components/navigation/tabs/tabs.code.md`)
      ],
      'Props': [
        // @ts-ignore
        () => import(`@/../../components-js/src/components/navigation/tabs/tabs.props.md`)
      ]
    }
  }
};
