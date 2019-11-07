// @ts-ignore
import {DesignSystemConfig} from '@/interface';

export const config: DesignSystemConfig = {
  pages: {
    'Getting Started': {
      About: [
        // @ts-ignore
        () => import(`@/pages/web/about.md`),
      ],
      'Start Designing': [
        // @ts-ignore
        () => import(`@/pages/web/start-designing.md`),
      ],
      'Design Workflow': [
        // @ts-ignore
        () => import(`@/pages/web/design-workflow.md`),
      ],
      'Sketch Plugins': [
        // @ts-ignore
        () => import(`@/pages/web/sketch-plugins.md`),
      ],
      'Start Coding': [
        // @ts-ignore
        () => import(`@/pages/web/start-coding.md`),
      ],
    },
    News: {
      Updates: [
        // @ts-ignore
        () => import(`@/pages/web/updates.md`),
      ],
      Versioning: [
        // @ts-ignore
        () => import(`@/pages/web/versioning.md`),
      ],
      Roadmap: [
        // @ts-ignore
        () => import(`@/pages/web/roadmap.md`),
      ],
    },
    Help: {
      Support: [
        // @ts-ignore
        () => import(`@/pages/web/support.md`),
      ],
      Faq: [
        // @ts-ignore
        () => import(`@/pages/web/faq.md`),
      ],
    },
    Basics: {
      'Browser Compatibility': [
        // @ts-ignore
        () => import(`@/pages/web/browser-compatibility.md`),
      ],
      'Quality Criteria': [
        // @ts-ignore
        () => import(`@/pages/web/quality-criteria.md`),
      ],
      'Accessibility Criteria': [
        // @ts-ignore
        () => import(`@/pages/web/accessibility.md`),
      ],
    },
    'Scss Utils': {
      Introduction: [
        // @ts-ignore
        () => import(`@/pages/web/introduction.md`),
      ],
      Variables: [
        // @ts-ignore
        () => import(`@/pages/web/variables.md`),
      ],
      Mixins: [
        // @ts-ignore
        () => import(`@/pages/web/mixins.md`),
      ],
      Functions: [
        // @ts-ignore
        () => import(`@/pages/web/functions.md`),
      ],
    },
  },
  stories: {
    Basic: {
      Color: {
        Design: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/basic/color/color.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/basic/color/color.code.md`),
        ],
      },
      Typography: {
        Design: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/basic/typography/typography.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/basic/typography/typography.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/basic/typography/headline/headline.props.md`),
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/basic/typography/text/text.props.md`),
        ]
      },
      Marque: {
        Design: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/basic/marque/marque.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/basic/marque/marque.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/basic/marque/marque.props.md`),
        ],
      }
    },
    Action: {
      'Button Regular': {
        Design: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/action/button-regular/button-regular.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/action/button-regular/button-regular.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/action/button-regular/button-regular.props.md`),
        ],
      },
      'Button Icon': {
        Design: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/action/button-icon/button-icon.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/action/button-icon/button-icon.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/action/button-icon/button-icon.props.md`),
        ],
      },
    },
    Content: {
      'Text List': {
        Design: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/content/text-list/text-list.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/content/text-list/text-list.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/content/text-list/text-list/text-list.props.md`),
        ],
      },
    },
    Feedback: {
      Spinner: {
        Design: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/feedback/spinner/spinner.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/feedback/spinner/spinner.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/feedback/spinner/spinner.props.md`),
        ],
      },
    },
    Icon: {
      Icon: {
        Design: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/icon/icon/icon.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/icon/icon/icon.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/icon/icon/icon.props.md`),
        ],
      }
    },
    Layout: {
      Flex: {
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/layout/flex/flex.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/layout/flex/flex/flex.props.md`),
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/layout/flex/flex-item/flex-item.props.md`)
        ]
      },
      Grid: {
        Design: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/layout/grid/grid.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/layout/grid/grid.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/layout/grid/grid/grid.props.md`),
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/layout/grid/grid-item/grid-item.props.md`),
        ],
      },
      Spacing: {
        Design: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/layout/spacing/spacing.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/layout/spacing/spacing.code.md`),
        ],
      },
    },
    Navigation: {
      Pagination: {
        Design: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/navigation/pagination/pagination.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/navigation/pagination/pagination.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/navigation/pagination/pagination.props.md`),
        ],
      },
      'Link Icon': {
        Design: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/action/link-icon/link-icon.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/action/link-icon/link-icon.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/action/link-icon/link-icon.props.md`),
        ],
      },
      'Text Link': {
        Design: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/action/text-link/text-link.design.md`),
        ],
        Code: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/action/text-link/text-link.code.md`),
        ],
        Props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/action/text-link/text-link.props.md`),
        ],
      },
    },
  }
};
