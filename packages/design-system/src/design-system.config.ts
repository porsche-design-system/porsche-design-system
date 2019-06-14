export interface Pages {
  [category: string]: {
    [page: string]: string;
  };
}

export interface Components {
  [category: string]: {
    [component: string]: {
      design?: string;
      code?: string;
      props?: string | string[];
      vrt?: string;
    };
  };
}

export const pages: Pages = {
  'Getting Started': {
    'About': '@/pages/about.md',
    'Design Workflow': '@/pages/design-workflow.md',
    'Sketch Plugins': '@/pages/sketch-plugins.md',
    'Start Coding': '@/pages/start-coding.md',
  },
  'News': {
    Updates: '@/pages/updates.md',
    Versioning: '@/pages/versioning.md',
    Roadmap: '@/pages/roadmap.md',
  },
  'Help': {
    Support: '@/pages/support.md',
    FAQ: '@/pages/faq.md',
  },
  'Basics': {
    'Browser Compatibility': '@/pages/browser-compatibility.md',
    'Quality Criteria': '@/pages/quality-criteria.md',
    'Accessibility Criteria': '@/pages/accessibility.md',
  },
};

export const components: Components = {
  Basic: {
    Color: {
      design: '../../ui-kit-js/src/components/basic/color/color.design.md',
      code: '../../ui-kit-js/src/components/basic/color/color.code.md',
      vrt: '../../ui-kit-js/src/components/basic/color/color.vrt.md',
    },
    Typography: {
      design: '../../ui-kit-js/src/components/basic/typography/typography.design.md',
      code: '../../ui-kit-js/src/components/basic/typography/typography.code.md',
      vrt: '../../ui-kit-js/src/components/basic/typography/typography.vrt.md',
      props: [
        '../../ui-kit-js/src/components/basic/typography/headline/headline.prop.md',
        '../../ui-kit-js/src/components/basic/typography/text/text.prop.md',
      ],
    },
  },
  Action: {
    'Button Regular': {
      design: '../../ui-kit-js/src/components/action/button-regular/button-regular.design.md',
      code: '../../ui-kit-js/src/components/action/button-regular/button-regular.code.md',
      vrt: '../../ui-kit-js/src/components/action/button-regular/button-regular.vrt.md',
      props: '../../ui-kit-js/src/components/action/button-regular/button-regular.prop.md',
    },
    'Button Icon': {
      design: '../../ui-kit-js/src/components/action/button-icon/button-icon.design.md',
      code: '../../ui-kit-js/src/components/action/button-icon/button-icon.code.md',
      vrt: '../../ui-kit-js/src/components/action/button-icon/button-icon.vrt.md',
      props: '../../ui-kit-js/src/components/action/button-icon/button-icon.prop.md',
    },
    'Text Link': {
      design: '../../ui-kit-js/src/components/action/text-link/text-link.design.md',
      code: '../../ui-kit-js/src/components/action/text-link/text-link.code.md',
      vrt: '../../ui-kit-js/src/components/action/text-link/text-link.vrt.md',
      props: '../../ui-kit-js/src/components/action/text-link/text-link.prop.md',
    },
  },
  Form: {
    Input: {
      design: '../../ui-kit-js/src/components/form/input/input.design.md',
      code: '../../ui-kit-js/src/components/form/input/input.code.md',
      props: '../../ui-kit-js/src/components/form/input/input.prop.md',
    },
    Textarea: {
      design: '../../ui-kit-js/src/components/form/textarea/textarea.design.md',
      code: '../../ui-kit-js/src/components/form/textarea/textarea.code.md',
      props: '../../ui-kit-js/src/components/form/textarea/textarea.prop.md',
    },
    Select: {
      design: '../../ui-kit-js/src/components/form/select/select.design.md',
      code: '../../ui-kit-js/src/components/form/select/select.code.md',
      props: '../../ui-kit-js/src/components/form/select/select.prop.md',
    },
    Checkbox: {
      design: '../../ui-kit-js/src/components/form/checkbox/checkbox.design.md',
      code: '../../ui-kit-js/src/components/form/checkbox/checkbox.code.md',
      props: '../../ui-kit-js/src/components/form/checkbox/checkbox.prop.md',
    },
    Radio: {
      design: '../../ui-kit-js/src/components/form/radio/radio.design.md',
      code: '../../ui-kit-js/src/components/form/radio/radio.code.md',
      props: '../../ui-kit-js/src/components/form/radio/radio.prop.md',
    },
    Switch: {
      design: '../../ui-kit-js/src/components/form/switch/switch.design.md',
      code: '../../ui-kit-js/src/components/form/switch/switch.code.md',
      props: '../../ui-kit-js/src/components/form/switch/switch.prop.md',
    },
  },
  Feedback: {
    Loader: {
      design: '../../ui-kit-js/src/components/feedback/loader/loader.design.md',
      code: '../../ui-kit-js/src/components/feedback/loader/loader.code.md',
      vrt: '../../ui-kit-js/src/components/feedback/loader/loader.vrt.md',
      props: '../../ui-kit-js/src/components/feedback/loader/loader.prop.md',
    },
  },
  Icon: {
    Icon: {
      design: '../../ui-kit-js/src/components/icon/icon/icon.design.md',
      code: '../../ui-kit-js/src/components/icon/icon/icon.code.md',
      vrt: '../../ui-kit-js/src/components/icon/icon/icon.vrt.md',
      props: '../../ui-kit-js/src/components/icon/icon/icon.prop.md',
    },
  },
  Layout: {
    Flex: {
      code: '../../ui-kit-js/src/components/layout/flex/flex.code.md',
      vrt: '../../ui-kit-js/src/components/layout/flex/flex.vrt.md',
      props: [
        '../../ui-kit-js/src/components/layout/flex/flex/flex.prop.md',
        '../../ui-kit-js/src/components/layout/flex/flex-item/flex-item.prop.md',
      ],
    },
    Grid: {
      design: '../../ui-kit-js/src/components/layout/grid/grid.design.md',
      code: '../../ui-kit-js/src/components/layout/grid/grid.code.md',
      vrt: '../../ui-kit-js/src/components/layout/grid/grid.vrt.md',
      props: [
        '../../ui-kit-js/src/components/layout/grid/grid/grid.prop.md',
        '../../ui-kit-js/src/components/layout/grid/grid-child/grid-child.prop.md',
      ],
    },
  },
};
