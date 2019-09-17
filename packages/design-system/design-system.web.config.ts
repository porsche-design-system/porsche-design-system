// @ts-ignore
import {Pages, Stories} from '@/interface';

export interface DesignSystemWebConfig {
  pages: Pages;
  stories: Stories;
}

export const config: DesignSystemWebConfig = {
  pages: {
    'Getting Started': {
      // @ts-ignore
      About: () => import(`@/pages/web/about.md`),
      // @ts-ignore
      'Start Designing': () => import(`@/pages/web/start-designing.md`),
      // @ts-ignore
      'Design Workflow': () => import(`@/pages/web/design-workflow.md`),
      // @ts-ignore
      'Sketch Plugins': () => import(`@/pages/web/sketch-plugins.md`),
      // @ts-ignore
      'Start Coding': () => import(`@/pages/web/start-coding.md`)
    },
    News: {
      // @ts-ignore
      Updates: () => import(`@/pages/web/updates.md`),
      // @ts-ignore
      Versioning: () => import(`@/pages/web/versioning.md`),
      // @ts-ignore
      Roadmap: () => import(`@/pages/web/roadmap.md`)
    },
    Help: {
      // @ts-ignore
      Support: () => import(`@/pages/web/support.md`),
      // @ts-ignore
      Faq: () => import(`@/pages/web/faq.md`)
    },
    Basics: {
      // @ts-ignore
      'Browser Compatibility': () => import(`@/pages/web/browser-compatibility.md`),
      // @ts-ignore
      'Quality Criteria': () => import(`@/pages/web/quality-criteria.md`),
      // @ts-ignore
      'Accessibility Criteria': () => import(`@/pages/web/accessibility.md`)
    },
    'Scss Utils': {
      // @ts-ignore
      Introduction: () => import(`@/pages/web/introduction.md`),
      // @ts-ignore
      Variables: () => import(`@/pages/web/variables.md`),
      // @ts-ignore
      Mixins: () => import(`@/pages/web/mixins.md`),
      // @ts-ignore
      Functions: () => import(`@/pages/web/functions.md`),
    },
  },
  stories: {
    Basic: {
      Color: {
        // @ts-ignore
        design: () => import(`@/../../ui-kit-js/src/components/basic/color/color.design.md`),
        // @ts-ignore
        code: () => import(`@/../../ui-kit-js/src/components/basic/color/color.code.md`)
      },
      Typography: {
        // @ts-ignore
        design: () => import(`@/../../ui-kit-js/src/components/basic/typography/typography.design.md`),
        // @ts-ignore
        code: () => import(`@/../../ui-kit-js/src/components/basic/typography/typography.code.md`),
        props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/basic/typography/headline/headline.props.md`),
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/basic/typography/text/text.props.md`)
        ]
      },
      Marque: {
        // @ts-ignore
        design: () => import(`@/../../ui-kit-js/src/components/basic/marque/marque.design.md`),
        // @ts-ignore
        code: () => import(`@/../../ui-kit-js/src/components/basic/marque/marque.code.md`),
        // @ts-ignore
        props: () => import(`@/../../ui-kit-js/src/components/basic/marque/marque.props.md`)
      }
    },
    Action: {
      'Button Regular': {
        // @ts-ignore
        design: () => import(`@/../../ui-kit-js/src/components/action/button-regular/button-regular.design.md`),
        // @ts-ignore
        code: () => import(`@/../../ui-kit-js/src/components/action/button-regular/button-regular.code.md`),
        // @ts-ignore
        props: () => import(`@/../../ui-kit-js/src/components/action/button-regular/button-regular.props.md`)
      },
      'Button Icon': {
        // @ts-ignore
        design: () => import(`@/../../ui-kit-js/src/components/action/button-icon/button-icon.design.md`),
        // @ts-ignore
        code: () => import(`@/../../ui-kit-js/src/components/action/button-icon/button-icon.code.md`),
        // @ts-ignore
        props: () => import(`@/../../ui-kit-js/src/components/action/button-icon/button-icon.props.md`)
      },
      'Text Link': {
        // @ts-ignore
        design: () => import(`@/../../ui-kit-js/src/components/action/text-link/text-link.design.md`),
        // @ts-ignore
        code: () => import(`@/../../ui-kit-js/src/components/action/text-link/text-link.code.md`),
        // @ts-ignore
        props: () => import(`@/../../ui-kit-js/src/components/action/text-link/text-link.props.md`)
      }
    },
    Content: {
      'Text List': {
        // @ts-ignore
        design: () => import(`@/../../ui-kit-js/src/components/content/text-list/text-list.design.md`),
        // @ts-ignore
        code: () => import(`@/../../ui-kit-js/src/components/content/text-list/text-list.code.md`),
        // @ts-ignore
        props: () => import(`@/../../ui-kit-js/src/components/content/text-list/text-list/text-list.props.md`)
      }
    },
    Forms: {
      'Text Field': {
        // @ts-ignore
        design: () => import(`@/../../ui-kit-js/src/components/form/text-field/text-field.design.md`)
      }
    },
    Feedback: {
      Spinner: {
        // @ts-ignore
        design: () => import(`@/../../ui-kit-js/src/components/feedback/spinner/spinner.design.md`),
        // @ts-ignore
        code: () => import(`@/../../ui-kit-js/src/components/feedback/spinner/spinner.code.md`),
        // @ts-ignore
        props: () => import(`@/../../ui-kit-js/src/components/feedback/spinner/spinner.props.md`)
      }
    },
    Icon: {
      Icon: {
        // @ts-ignore
        design: () => import(`@/../../ui-kit-js/src/components/icon/icon/icon.design.md`),
        // @ts-ignore
        code: () => import(`@/../../ui-kit-js/src/components/icon/icon/icon.code.md`),
        // @ts-ignore
        props: () => import(`@/../../ui-kit-js/src/components/icon/icon/icon.props.md`)
      }
    },
    Layout: {
      Flex: {
        // @ts-ignore
        code: () => import(`@/../../ui-kit-js/src/components/layout/flex/flex.code.md`),
        props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/layout/flex/flex/flex.props.md`),
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/layout/flex/flex-item/flex-item.props.md`)
        ]
      },
      Grid: {
        // @ts-ignore
        design: () => import(`@/../../ui-kit-js/src/components/layout/grid/grid.design.md`),
        // @ts-ignore
        code: () => import(`@/../../ui-kit-js/src/components/layout/grid/grid.code.md`),
        props: [
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/layout/grid/grid/grid.props.md`),
          // @ts-ignore
          () => import(`@/../../ui-kit-js/src/components/layout/grid/grid-child/grid-child.props.md`)
        ]
      },
      Spacing: {
        // @ts-ignore
        design: () => import(`@/../../ui-kit-js/src/components/layout/spacing/spacing.design.md`),
        // @ts-ignore
        code: () => import(`@/../../ui-kit-js/src/components/layout/spacing/spacing.code.md`)
      }
    },
    Navigation: {
      Pagination: {
        // @ts-ignore
        design: () => import(`@/../../ui-kit-js/src/components/navigation/pagination/pagination.design.md`),
        // @ts-ignore
        code: () => import(`@/../../ui-kit-js/src/components/navigation/pagination/pagination.code.md`),
        // @ts-ignore
        props: () => import(`@/../../ui-kit-js/src/components/navigation/pagination/pagination.props.md`)
      }
    }
  }
};
