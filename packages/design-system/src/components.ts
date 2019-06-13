export interface Story {
  design?: any;
  code?: any;
  docs?: any[];
  props?: string[];
  vrt?: any;
}
export interface Stories {
  [category: string]: {
    [story: string]: Story;
  };
}
export const Stories: Stories = {
  Basic: {
    Color: {
      design: '../../ui-kit-js/src/components/basic/color/color.design.mdx',
      code: '../../ui-kit-js/src/components/basic/color/color.code.mdx',
      vrt: '../../ui-kit-js/src/components/basic/color/color.vrt.mdx',
    },
    Typography: {
      design: '../../ui-kit-js/src/components/basic/typography/typography.design.mdx',
      code: '../../ui-kit-js/src/components/basic/typography/typography.code.mdx',
      vrt: '../../ui-kit-js/src/components/basic/typography/typography.vrt.mdx',
      docs: [
        '../../ui-kit-js/src/components/basic/typography/headline/headline.prop.mdx',
        '../../ui-kit-js/src/components/basic/typography/text/text.prop.mdx',
      ],
    },
  },
  Action: {
    'Button Regular': {
      design: '../../ui-kit-js/src/components/action/button-regular/button-regular.design.mdx',
      code: '../../ui-kit-js/src/components/action/button-regular/button-regular.code.mdx',
      vrt: '../../ui-kit-js/src/components/action/button-regular/button-regular.vrt.mdx',
      docs: ['../../ui-kit-js/src/components/action/button-regular/button-regular.prop.mdx'],
    },
    'Button Icon': {
      design: '../../ui-kit-js/src/components/action/button-icon/button-icon.design.mdx',
      code: '../../ui-kit-js/src/components/action/button-icon/button-icon.code.mdx',
      vrt: '../../ui-kit-js/src/components/action/button-icon/button-icon.vrt.mdx',
      docs: ['../../ui-kit-js/src/components/action/button-icon/button-icon.prop.mdx'],
    },
    'Text Link': {
      design: '../../ui-kit-js/src/components/action/text-link/text-link.design.mdx',
      code: '../../ui-kit-js/src/components/action/text-link/text-link.code.mdx',
      vrt: '../../ui-kit-js/src/components/action/text-link/text-link.vrt.mdx',
      docs: ['../../ui-kit-js/src/components/action/text-link/text-link.prop.mdx'],
    },
  },
  Form: {
    Input: {
      design: '../../ui-kit-js/src/components/form/input/input.design.mdx',
      code: '../../ui-kit-js/src/components/form/input/input.code.mdx',
      docs: ['../../ui-kit-js/src/components/form/input/input.prop.mdx'],
    },
    Textarea: {
      design: '../../ui-kit-js/src/components/form/textarea/textarea.design.mdx',
      code: '../../ui-kit-js/src/components/form/textarea/textarea.code.mdx',
      docs: ['../../ui-kit-js/src/components/form/textarea/textarea.prop.mdx'],
    },
    Select: {
      design: '../../ui-kit-js/src/components/form/select/select.design.mdx',
      code: '../../ui-kit-js/src/components/form/select/select.code.mdx',
      docs: ['../../ui-kit-js/src/components/form/select/select.prop.mdx'],
    },
    Checkbox: {
      design: '../../ui-kit-js/src/components/form/checkbox/checkbox.design.mdx',
      code: '../../ui-kit-js/src/components/form/checkbox/checkbox.code.mdx',
      docs: ['../../ui-kit-js/src/components/form/checkbox/checkbox.prop.mdx'],
    },
    Radio: {
      design: '../../ui-kit-js/src/components/form/radio/radio.design.mdx',
      code: '../../ui-kit-js/src/components/form/radio/radio.code.mdx',
      docs: ['../../ui-kit-js/src/components/form/radio/radio.prop.mdx'],
    },
    Switch: {
      design: '../../ui-kit-js/src/components/form/switch/switch.design.mdx',
      code: '../../ui-kit-js/src/components/form/switch/switch.code.mdx',
      docs: ['../../ui-kit-js/src/components/form/switch/switch.prop.mdx'],
    },
  },
  Feedback: {
    Loader: {
      design: '../../ui-kit-js/src/components/feedback/loader/loader.design.mdx',
      code: '../../ui-kit-js/src/components/feedback/loader/loader.code.mdx',
      vrt: '../../ui-kit-js/src/components/feedback/loader/loader.vrt.mdx',
      docs: ['../../ui-kit-js/src/components/feedback/loader/loader.prop.mdx'],
    },
  },
  Icon: {
    Icon: {
      design: '../../ui-kit-js/src/components/icon/icon/icon.design.mdx',
      code: '../../ui-kit-js/src/components/icon/icon/icon.code.mdx',
      vrt: '../../ui-kit-js/src/components/icon/icon/icon.vrt.mdx',
      docs: ['../../ui-kit-js/src/components/icon/icon/icon.prop.mdx'],
    },
  },
  Layout: {
    Flex: {
      code: '../../ui-kit-js/src/components/layout/flex/flex.code.mdx',
      vrt: '../../ui-kit-js/src/components/layout/flex/flex.vrt.mdx',
      docs: [
        '../../ui-kit-js/src/components/layout/flex/flex/flex.prop.mdx',
        '../../ui-kit-js/src/components/layout/flex/flex-item/flex-item.prop.mdx',
      ],
    },
    Grid: {
      design: '../../ui-kit-js/src/components/layout/grid/grid.design.mdx',
      code: '../../ui-kit-js/src/components/layout/grid/grid.code.mdx',
      vrt: '../../ui-kit-js/src/components/layout/grid/grid.vrt.mdx',
      docs: [
        '../../ui-kit-js/src/components/layout/grid/grid/grid.prop.mdx',
        '../../ui-kit-js/src/components/layout/grid/grid-child/grid-child.prop.mdx',
      ],
    },
    Spacing: {
      design: '../../workshop/src/components/layout/spacing/spacing.design.mdx',
      code: '../../workshop/src/components/layout/spacing/spacing.code.mdx',
      vrt: '../../workshop/src/components/layout/spacing/spacing.vrt.mdx',
      props: ['Spacing'],
    },
  },
};
