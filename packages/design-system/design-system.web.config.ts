// @ts-ignore
import {Pages, Stories} from '@/interface';

export interface DesignSystemWebConfig {
  pages: Pages;
  stories: Stories;
}

const empty = '';

export const config: DesignSystemWebConfig = {
  pages: {
    'Getting Started': {
      About: () => import(`@/pages/web/${empty}about.md`),
      'Start Designing': () => import(`@/pages/web/${empty}start-designing.md`),
      'Design Workflow': () => import(`@/pages/web/${empty}design-workflow.md`),
      'Sketch Plugins': () => import(`@/pages/web/${empty}sketch-plugins.md`),
      'Start Coding': () => import(`@/pages/web/${empty}start-coding.md`)
    },
    News: {
      Updates: () => import(`@/pages/web/${empty}updates.md`),
      Versioning: () => import(`@/pages/web/${empty}versioning.md`),
      Roadmap: () => import(`@/pages/web/${empty}roadmap.md`)
    },
    Help: {
      Support: () => import(`@/pages/web/${empty}support.md`),
      Faq: () => import(`@/pages/web/${empty}faq.md`)
    },
    Basics: {
      'Browser Compatibility': () => import(`@/pages/web/${empty}browser-compatibility.md`),
      'Quality Criteria': () => import(`@/pages/web/${empty}quality-criteria.md`),
      'Accessibility Criteria': () => import(`@/pages/web/${empty}accessibility.md`)
    },
    'Scss Utils': {
      Introduction: () => import(`@/pages/web/${empty}introduction.md`),
      Variables: () => import(`@/pages/web/${empty}variables.md`),
      Mixins: () => import(`@/pages/web/${empty}mixins.md`),
      Functions: () => import(`@/pages/web/${empty}functions.md`),
    },
  },
  stories: {
    Basic: {
      Color: {
        design: () => import(`@/../../ui-kit-js/src/components/basic/color/${empty}color.design.md`),
        code: () => import(`@/../../ui-kit-js/src/components/basic/color/${empty}color.code.md`)
      },
      Typography: {
        design: () => import(`@/../../ui-kit-js/src/components/basic/typography/${empty}typography.design.md`),
        code: () => import(`@/../../ui-kit-js/src/components/basic/typography/${empty}typography.code.md`),
        props: [
          () => import(`@/../../ui-kit-js/src/components/basic/typography/headline/${empty}headline.props.md`),
          () => import(`@/../../ui-kit-js/src/components/basic/typography/text/${empty}text.props.md`)
        ]
      }
    },
    Action: {
      'Button Regular': {
        design: () => import(`@/../../ui-kit-js/src/components/action/button-regular/${empty}button-regular.design.md`),
        code: () => import(`@/../../ui-kit-js/src/components/action/button-regular/${empty}button-regular.code.md`),
        props: () => import(`@/../../ui-kit-js/src/components/action/button-regular/${empty}button-regular.props.md`)
      },
      'Button Icon': {
        design: () => import(`@/../../ui-kit-js/src/components/action/button-icon/${empty}button-icon.design.md`),
        code: () => import(`@/../../ui-kit-js/src/components/action/button-icon/${empty}button-icon.code.md`),
        props: () => import(`@/../../ui-kit-js/src/components/action/button-icon/${empty}button-icon.props.md`)
      },
      'Text Link': {
        design: () => import(`@/../../ui-kit-js/src/components/action/text-link/${empty}text-link.design.md`),
        code: () => import(`@/../../ui-kit-js/src/components/action/text-link/${empty}text-link.code.md`),
        props: () => import(`@/../../ui-kit-js/src/components/action/text-link/${empty}text-link.props.md`)
      }
    },
    Content: {
      'Text List': {
        design: () => import(`@/../../ui-kit-js/src/components/content/text-list/${empty}text-list.design.md`),
        code: () => import(`@/../../ui-kit-js/src/components/content/text-list/${empty}text-list.code.md`),
        props: () => import(`@/../../ui-kit-js/src/components/content/text-list/text-list/${empty}text-list.props.md`)
      }
    },
    Feedback: {
      Spinner: {
        design: () => import(`@/../../ui-kit-js/src/components/feedback/spinner/${empty}spinner.design.md`),
        code: () => import(`@/../../ui-kit-js/src/components/feedback/spinner/${empty}spinner.code.md`),
        props: () => import(`@/../../ui-kit-js/src/components/feedback/spinner/${empty}spinner.props.md`)
      }
    },
    Icon: {
      Icon: {
        design: () => import(`@/../../ui-kit-js/src/components/icon/icon/${empty}icon.design.md`),
        code: () => import(`@/../../ui-kit-js/src/components/icon/icon/${empty}icon.code.md`),
        props: () => import(`@/../../ui-kit-js/src/components/icon/icon/${empty}icon.props.md`)
      }
    },
    Layout: {
      Flex: {
        code: () => import(`@/../../ui-kit-js/src/components/layout/flex/${empty}flex.code.md`),
        props: [
          () => import(`@/../../ui-kit-js/src/components/layout/flex/flex/${empty}flex.props.md`),
          () => import(`@/../../ui-kit-js/src/components/layout/flex/flex-item/${empty}flex-item.props.md`)
        ]
      },
      Grid: {
        design: () => import(`@/../../ui-kit-js/src/components/layout/grid/${empty}grid.design.md`),
        code: () => import(`@/../../ui-kit-js/src/components/layout/grid/${empty}grid.code.md`),
        props: [
          () => import(`@/../../ui-kit-js/src/components/layout/grid/grid/${empty}grid.props.md`),
          () => import(`@/../../ui-kit-js/src/components/layout/grid/grid-child/${empty}grid-child.props.md`)
        ]
      },
      Spacing: {
        design: () => import(`@/../../ui-kit-js/src/components/layout/spacing/${empty}spacing.design.md`),
        code: () => import(`@/../../ui-kit-js/src/components/layout/spacing/${empty}spacing.code.md`)
      }
    },
    Navigation: {
      Pagination: {
        design: () => import(`@/../../ui-kit-js/src/components/navigation/pagination/${empty}pagination.design.md`),
        code: () => import(`@/../../ui-kit-js/src/components/navigation/pagination/${empty}pagination.code.md`),
        props: () => import(`@/../../ui-kit-js/src/components/navigation/pagination/${empty}pagination.props.md`)
      }
    }
  }
};
