import { StorefrontConfig } from '@/interface';

export const config: StorefrontConfig = {
  pages: {
    'About': {
      'Introduction': [
        // @ts-ignore
        () => import(`@/pages/about/introduction.md`)
      ]
    },
    'Start Designing': {
      'Introduction': [
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
      'Introduction': [
        // @ts-ignore
        () => import(`@/pages/start-coding/introduction.md`)
      ],
      'Angular': [
        // @ts-ignore
        () => import(`@/pages/start-coding/angular.md`)
      ],
      'React': [
        // @ts-ignore
        () => import(`@/pages/start-coding/react.md`)
      ],
      'Nextjs':[
        // @ts-ignore
        () => import(`@/pages/start-coding/nextjs.md`)
      ],
      'Gatsby': [
        // @ts-ignore
        () => import(`@/pages/start-coding/gatsby.md`)
      ],
    },
    News: {
      Updates: [
        // @ts-ignore
        () => import(`@/pages/news/updates.md`)
      ],
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
      ]
    },
    Basics: {
      'Browser Compatibility': [
        // @ts-ignore
        () => import(`@/pages/basics/browser-compatibility.md`)
      ],
      'Quality Criteria': [
        // @ts-ignore
        () => import(`@/pages/basics/quality-criteria.md`)
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
    'Scss Utils': {
      Introduction: [
        // @ts-ignore
        () => import(`@/pages/scss-utils/introduction.md`)
      ],
      Variables: [
        // @ts-ignore
        () => import(`@/pages/scss-utils/variables.md`)
      ],
      Mixins: [
        // @ts-ignore
        () => import(`@/pages/scss-utils/mixins.md`)
      ],
      Functions: [
        // @ts-ignore
        () => import(`@/pages/scss-utils/functions.md`)
      ]
    }
  },
  stories: {
    General: {
      'Blur On Focus': [
        // @ts-ignore
        () => import(`@/pages/general/blur-on-focus.md`)
      ],
      'Components Ready': [
        // @ts-ignore
        () => import(`@/pages/general/components-ready.md`)
      ],
      'Slotted Content': [
        // @ts-ignore
        () => import(`@/pages/general/slotted-content.md`)
      ],
      'Testing': [
        // @ts-ignore
        () => import(`@/pages/general/testing.md`)
      ]
    },
    Basic: {
      Color: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/basic/color/color.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/basic/color/color.code.md`)
        ]
      },
      Marque: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/basic/marque/marque.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/basic/marque/marque.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/basic/marque/marque.props.md`)
        ]
      },
      Typography: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/basic/typography/typography.design.md`)
        ],
        'Code Headline': [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/basic/typography/headline/headline.code.md`)
        ],
        'Code Text': [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/basic/typography/text/text.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/basic/typography/headline/headline.props.md`),
          // @ts-ignore
          () => import(`@/../../components-js/src/components/basic/typography/text/text.props.md`)
        ]
      }
    },
    Action: {
      Button: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/action/button/button.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/action/button/button.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/action/button/button.props.md`)
        ]
      },
      'Button Pure': {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/action/button-pure/button-pure.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/action/button-pure/button-pure.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/action/button-pure/button-pure.props.md`)
        ]
      }
    },
    Form: {
      Checkbox: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/checkbox-wrapper/checkbox-wrapper.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/checkbox-wrapper/checkbox-wrapper.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/checkbox-wrapper/checkbox-wrapper.props.md`)
        ]
      },
      'Radio Button': {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/radio-button-wrapper/radio-button-wrapper.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/radio-button-wrapper/radio-button-wrapper.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/radio-button-wrapper/radio-button-wrapper.props.md`)
        ]
      },
      Select: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/select-wrapper/select-wrapper.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/select-wrapper/select-wrapper.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/select-wrapper/select-wrapper.props.md`)
        ]
      },
      Textarea: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/textarea-wrapper/textarea-wrapper.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/textarea-wrapper/textarea-wrapper.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/textarea-wrapper/textarea-wrapper.props.md`)
        ]
      },
      'Text Field': {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/text-field-wrapper/text-field-wrapper.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/text-field-wrapper/text-field-wrapper.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/form/text-field-wrapper/text-field-wrapper.props.md`)
        ]
      }
    },
    Feedback: {
      Spinner: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/feedback/spinner/spinner.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/feedback/spinner/spinner.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/feedback/spinner/spinner.props.md`)
        ]
      }
    },
    Icon: {
      Icon: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/icon/icon/icon.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/icon/icon/icon.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/icon/icon/icon.props.md`)
        ]
      }
    },
    Layout: {
      'Content Wrapper': {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/content-wrapper/content-wrapper.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/content-wrapper/content-wrapper.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/content-wrapper/content-wrapper.props.md`),
        ]
      },
      Divider: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/divider/divider.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/divider/divider.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/divider/divider.props.md`),
        ]
      },
      Flex: {
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/flex/flex.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/flex/flex/flex.props.md`),
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/flex/flex-item/flex-item.props.md`)
        ]
      },
      Grid: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/grid/grid.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/grid/grid.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/grid/grid/grid.props.md`),
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/grid/grid-item/grid-item.props.md`)
        ]
      },
      Spacing: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/spacing/spacing.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/layout/spacing/spacing.code.md`)
        ]
      }
    },
    Navigation: {
      Link: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/navigation/link/link.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/navigation/link/link.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/navigation/link/link.props.md`)
        ]
      },
      'Link Pure': {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/navigation/link-pure/link-pure.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/navigation/link-pure/link-pure.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/navigation/link-pure/link-pure.props.md`),
        ],
      },
      'Link Social': {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/navigation/link-social/link-social.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/navigation/link-social/link-social.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/navigation/link-social/link-social.props.md`),
        ],
      },
      Pagination: {
        Design: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/navigation/pagination/pagination.design.md`)
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/navigation/pagination/pagination.code.md`)
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../components-js/src/components/navigation/pagination/pagination.props.md`)
        ]
      }
    }
  }
};
