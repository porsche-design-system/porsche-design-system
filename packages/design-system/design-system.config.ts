interface DesignSystemConfig {
  pages: Pages;
  stories: Stories;
}
interface Pages {
  [area: string]: {
    [category: string]: {
      [page: string]: any | any[];
    };
  };
}

interface Stories {
  [area: string]: {
    [category: string]: {
      [story: string]: {
        design?: any | any[];
        code?: any | any[];
        props?: any | any[];
        vrt?: any | any[];
      };
    };
  };
}

const empty = '';

export const config: DesignSystemConfig = {
  pages: {
    web: {
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
      }
    },
    app: {
      'Getting Started': {
        About: () => import(`@/pages/app/${empty}about.md`)
      }
    }
  },
  stories: {
    web: {
      Basic: {
        Color: {
          design: () => import(`@/../../ui-kit-js/src/components/basic/color/${empty}color.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/basic/color/${empty}color.code.md`),
          vrt: () => import(`@/../../ui-kit-js/src/components/basic/color/${empty}color.vrt.md`)
        },
        Typography: {
          design: () => import(`@/../../ui-kit-js/src/components/basic/typography/${empty}typography.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/basic/typography/${empty}typography.code.md`),
          vrt: () => import(`@/../../ui-kit-js/src/components/basic/typography/${empty}typography.vrt.md`),
          props: [
            () => import(`@/../../ui-kit-js/src/components/basic/typography/headline/${empty}headline.props.md`),
            () => import(`@/../../ui-kit-js/src/components/basic/typography/text/${empty}text.props.md`)
          ]
        }
      },
      Action: {
        'Button Regular': {
          design: () =>
            import(`@/../../ui-kit-js/src/components/action/button-regular/${empty}button-regular.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/action/button-regular/${empty}button-regular.code.md`),
          vrt: () => import(`@/../../ui-kit-js/src/components/action/button-regular/${empty}button-regular.vrt.md`),
          props: () => import(`@/../../ui-kit-js/src/components/action/button-regular/${empty}button-regular.props.md`)
        },
        'Button Icon': {
          design: () => import(`@/../../ui-kit-js/src/components/action/button-icon/${empty}button-icon.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/action/button-icon/${empty}button-icon.code.md`),
          vrt: () => import(`@/../../ui-kit-js/src/components/action/button-icon/${empty}button-icon.vrt.md`),
          props: () => import(`@/../../ui-kit-js/src/components/action/button-icon/${empty}button-icon.props.md`)
        },
        'Text Link': {
          design: () => import(`@/../../ui-kit-js/src/components/action/text-link/${empty}text-link.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/action/text-link/${empty}text-link.code.md`),
          vrt: () => import(`@/../../ui-kit-js/src/components/action/text-link/${empty}text-link.vrt.md`),
          props: () => import(`@/../../ui-kit-js/src/components/action/text-link/${empty}text-link.props.md`)
        }
      },
      Content: {
        'Text List': {
          design: () => import(`@/../../ui-kit-js/src/components/content/text-list/${empty}text-list.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/content/text-list/${empty}text-list.code.md`),
          vrt: () => import(`@/../../ui-kit-js/src/components/content/text-list/${empty}text-list.vrt.md`),
          props: () => import(`@/../../ui-kit-js/src/components/content/text-list/text-list/${empty}text-list.props.md`)
        }
      },
      Form: {
        Input: {
          design: () => import(`@/../../ui-kit-js/src/components/form/input/${empty}input.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/form/input/${empty}input.code.md`),
          props: () => import(`@/../../ui-kit-js/src/components/form/input/${empty}input.props.md`)
        },
        Textarea: {
          design: () => import(`@/../../ui-kit-js/src/components/form/textarea/${empty}textarea.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/form/textarea/${empty}textarea.code.md`),
          props: () => import(`@/../../ui-kit-js/src/components/form/textarea/${empty}textarea.props.md`)
        },
        Select: {
          design: () => import(`@/../../ui-kit-js/src/components/form/select/${empty}select.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/form/select/${empty}select.code.md`),
          props: () => import(`@/../../ui-kit-js/src/components/form/select/${empty}select.props.md`)
        },
        Checkbox: {
          design: () => import(`@/../../ui-kit-js/src/components/form/checkbox/${empty}checkbox.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/form/checkbox/${empty}checkbox.code.md`),
          props: () => import(`@/../../ui-kit-js/src/components/form/checkbox/${empty}checkbox.props.md`)
        },
        Radio: {
          design: () => import(`@/../../ui-kit-js/src/components/form/radio/${empty}radio.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/form/radio/${empty}radio.code.md`),
          props: () => import(`@/../../ui-kit-js/src/components/form/radio/${empty}radio.props.md`)
        },
        Switch: {
          design: () => import(`@/../../ui-kit-js/src/components/form/switch/${empty}switch.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/form/switch/${empty}switch.code.md`),
          props: () => import(`@/../../ui-kit-js/src/components/form/switch/${empty}switch.props.md`)
        }
      },
      Feedback: {
        Spinner: {
          design: () => import(`@/../../ui-kit-js/src/components/feedback/spinner/${empty}spinner.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/feedback/spinner/${empty}spinner.code.md`),
          vrt: () => import(`@/../../ui-kit-js/src/components/feedback/spinner/${empty}spinner.vrt.md`),
          props: () => import(`@/../../ui-kit-js/src/components/feedback/spinner/${empty}spinner.props.md`)
        }
      },
      Icon: {
        Icon: {
          design: () => import(`@/../../ui-kit-js/src/components/icon/icon/${empty}icon.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/icon/icon/${empty}icon.code.md`),
          vrt: () => import(`@/../../ui-kit-js/src/components/icon/icon/${empty}icon.vrt.md`),
          props: () => import(`@/../../ui-kit-js/src/components/icon/icon/${empty}icon.props.md`)
        }
      },
      Layout: {
        Flex: {
          code: () => import(`@/../../ui-kit-js/src/components/layout/flex/${empty}flex.code.md`),
          vrt: () => import(`@/../../ui-kit-js/src/components/layout/flex/${empty}flex.vrt.md`),
          props: [
            () => import(`@/../../ui-kit-js/src/components/layout/flex/flex/${empty}flex.props.md`),
            () => import(`@/../../ui-kit-js/src/components/layout/flex/flex-item/${empty}flex-item.props.md`)
          ]
        },
        Grid: {
          design: () => import(`@/../../ui-kit-js/src/components/layout/grid/${empty}grid.design.md`),
          code: () => import(`@/../../ui-kit-js/src/components/layout/grid/${empty}grid.code.md`),
          vrt: () => import(`@/../../ui-kit-js/src/components/layout/grid/${empty}grid.vrt.md`),
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
  }
};
