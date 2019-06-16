interface DesignSystemConfig {
  pages: Pages;
  stories: Stories;
}

interface Pages {
  [category: string]: string[];
}

interface Stories {
  [category: string]: {
    [story: string]: {
      design?: string;
      code?: string;
      props?: string | string[];
      vrt?: string;
    };
  };
}

export const config: DesignSystemConfig = {
  pages: {
    'Getting Started': ['About', 'Design Workflow', 'Sketch Plugins', 'Start Coding'],
    'News': ['Updates', 'Versioning', 'Roadmap'],
    'Help': ['Support', 'FAQ'],
    'Basics': ['Browser Compatibility', 'Quality Criteria', 'Accessibility Criteria'],
  },
  stories: {
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
          '../../ui-kit-js/src/components/basic/typography/headline/headline.props.md',
          '../../ui-kit-js/src/components/basic/typography/text/text.props.md',
        ],
      },
    },
    Action: {
      'Button Regular': {
        design: '../../ui-kit-js/src/components/action/button-regular/button-regular.design.md',
        code: '../../ui-kit-js/src/components/action/button-regular/button-regular.code.md',
        vrt: '../../ui-kit-js/src/components/action/button-regular/button-regular.vrt.md',
        props: '../../ui-kit-js/src/components/action/button-regular/button-regular.props.md',
      },
      'Button Icon': {
        design: '../../ui-kit-js/src/components/action/button-icon/button-icon.design.md',
        code: '../../ui-kit-js/src/components/action/button-icon/button-icon.code.md',
        vrt: '../../ui-kit-js/src/components/action/button-icon/button-icon.vrt.md',
        props: '../../ui-kit-js/src/components/action/button-icon/button-icon.props.md',
      },
      'Text Link': {
        design: '../../ui-kit-js/src/components/action/text-link/text-link.design.md',
        code: '../../ui-kit-js/src/components/action/text-link/text-link.code.md',
        vrt: '../../ui-kit-js/src/components/action/text-link/text-link.vrt.md',
        props: '../../ui-kit-js/src/components/action/text-link/text-link.props.md',
      },
    },
    Form: {
      Input: {
        design: '../../ui-kit-js/src/components/form/input/input.design.md',
        code: '../../ui-kit-js/src/components/form/input/input.code.md',
        props: '../../ui-kit-js/src/components/form/input/input.props.md',
      },
      Textarea: {
        design: '../../ui-kit-js/src/components/form/textarea/textarea.design.md',
        code: '../../ui-kit-js/src/components/form/textarea/textarea.code.md',
        props: '../../ui-kit-js/src/components/form/textarea/textarea.props.md',
      },
      Select: {
        design: '../../ui-kit-js/src/components/form/select/select.design.md',
        code: '../../ui-kit-js/src/components/form/select/select.code.md',
        props: '../../ui-kit-js/src/components/form/select/select.props.md',
      },
      Checkbox: {
        design: '../../ui-kit-js/src/components/form/checkbox/checkbox.design.md',
        code: '../../ui-kit-js/src/components/form/checkbox/checkbox.code.md',
        props: '../../ui-kit-js/src/components/form/checkbox/checkbox.props.md',
      },
      Radio: {
        design: '../../ui-kit-js/src/components/form/radio/radio.design.md',
        code: '../../ui-kit-js/src/components/form/radio/radio.code.md',
        props: '../../ui-kit-js/src/components/form/radio/radio.props.md',
      },
      Switch: {
        design: '../../ui-kit-js/src/components/form/switch/switch.design.md',
        code: '../../ui-kit-js/src/components/form/switch/switch.code.md',
        props: '../../ui-kit-js/src/components/form/switch/switch.props.md',
      },
    },
    Feedback: {
      Loader: {
        design: '../../ui-kit-js/src/components/feedback/loader/loader.design.md',
        code: '../../ui-kit-js/src/components/feedback/loader/loader.code.md',
        vrt: '../../ui-kit-js/src/components/feedback/loader/loader.vrt.md',
        props: '../../ui-kit-js/src/components/feedback/loader/loader.props.md',
      },
    },
    Icon: {
      Icon: {
        design: '../../ui-kit-js/src/components/icon/icon/icon.design.md',
        code: '../../ui-kit-js/src/components/icon/icon/icon.code.md',
        vrt: '../../ui-kit-js/src/components/icon/icon/icon.vrt.md',
        props: '../../ui-kit-js/src/components/icon/icon/icon.props.md',
      },
    },
    Layout: {
      Flex: {
        code: '../../ui-kit-js/src/components/layout/flex/flex.code.md',
        vrt: '../../ui-kit-js/src/components/layout/flex/flex.vrt.md',
        props: [
          '../../ui-kit-js/src/components/layout/flex/flex/flex.props.md',
          '../../ui-kit-js/src/components/layout/flex/flex-item/flex-item.props.md',
        ],
      },
      Grid: {
        design: '../../ui-kit-js/src/components/layout/grid/grid.design.md',
        code: '../../ui-kit-js/src/components/layout/grid/grid.code.md',
        vrt: '../../ui-kit-js/src/components/layout/grid/grid.vrt.md',
        props: [
          '../../ui-kit-js/src/components/layout/grid/grid/grid.props.md',
          '../../ui-kit-js/src/components/layout/grid/grid-child/grid-child.props.md',
        ],
      },
    },
  },
};
