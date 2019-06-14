import { importMDX } from "mdx.macro";

export interface Story {
  design?: any;
  code?: any;
  docs?: any[];
  props?: string[];
  vrt?: any;
}
export interface Stories {
  [category: string]: {
    [story: string]: Story
  };
}
export const Stories: Stories = {
  Basic: {
    Color: {
      design: importMDX("../../ui-kit-js/src/components/basic/color/color.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/basic/color/color.code.mdx"),
      vrt: importMDX("../../ui-kit-js/src/components/basic/color/color.vrt.mdx")
    },
    Typography: {
      design: importMDX("../../ui-kit-js/src/components/basic/typography/typography.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/basic/typography/typography.code.mdx"),
      vrt: importMDX("../../ui-kit-js/src/components/basic/typography/typography.vrt.mdx"),
      docs: [
        importMDX("../../ui-kit-js/src/components/basic/typography/headline/headline.prop.mdx"),
        importMDX("../../ui-kit-js/src/components/basic/typography/text/text.prop.mdx")
      ]
    }
  },
  Action: {
    "Button Regular": {
      design: importMDX("../../ui-kit-js/src/components/action/button-regular/button-regular.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/action/button-regular/button-regular.code.mdx"),
      vrt: importMDX("../../ui-kit-js/src/components/action/button-regular/button-regular.vrt.mdx"),
      docs: [importMDX("../../ui-kit-js/src/components/action/button-regular/button-regular.prop.mdx")]
    },
    "Button Icon": {
      design: importMDX("../../ui-kit-js/src/components/action/button-icon/button-icon.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/action/button-icon/button-icon.code.mdx"),
      vrt: importMDX("../../ui-kit-js/src/components/action/button-icon/button-icon.vrt.mdx"),
      docs: [importMDX("../../ui-kit-js/src/components/action/button-icon/button-icon.prop.mdx")]
    },
    "Text Link": {
      design: importMDX("../../ui-kit-js/src/components/action/text-link/text-link.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/action/text-link/text-link.code.mdx"),
      vrt: importMDX("../../ui-kit-js/src/components/action/text-link/text-link.vrt.mdx"),
      docs: [importMDX("../../ui-kit-js/src/components/action/text-link/text-link.prop.mdx")]
    }
  },
  Form: {
    Input: {
      design: importMDX("../../ui-kit-js/src/components/form/input/input.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/form/input/input.code.mdx"),
      docs: [importMDX("../../ui-kit-js/src/components/form/input/input.prop.mdx")]
    },
    Textarea: {
      design: importMDX("../../ui-kit-js/src/components/form/textarea/textarea.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/form/textarea/textarea.code.mdx"),
      docs: [importMDX("../../ui-kit-js/src/components/form/textarea/textarea.prop.mdx")]
    },
    Select: {
      design: importMDX("../../ui-kit-js/src/components/form/select/select.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/form/select/select.code.mdx"),
      docs: [importMDX("../../ui-kit-js/src/components/form/select/select.prop.mdx")]
    },
    Checkbox: {
      design: importMDX("../../ui-kit-js/src/components/form/checkbox/checkbox.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/form/checkbox/checkbox.code.mdx"),
      docs: [importMDX("../../ui-kit-js/src/components/form/checkbox/checkbox.prop.mdx")]
    },
    Radio: {
      design: importMDX("../../ui-kit-js/src/components/form/radio/radio.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/form/radio/radio.code.mdx"),
      docs: [importMDX("../../ui-kit-js/src/components/form/radio/radio.prop.mdx")]
    },
    Switch: {
      design: importMDX("../../ui-kit-js/src/components/form/switch/switch.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/form/switch/switch.code.mdx"),
      docs: [importMDX("../../ui-kit-js/src/components/form/switch/switch.prop.mdx")]
    }
  },
  Feedback: {
    Loader: {
      design: importMDX("../../ui-kit-js/src/components/feedback/loader/loader.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/feedback/loader/loader.code.mdx"),
      vrt: importMDX("../../ui-kit-js/src/components/feedback/loader/loader.vrt.mdx"),
      docs: [importMDX("../../ui-kit-js/src/components/feedback/loader/loader.prop.mdx")]
    }
  },
  Icon: {
    Icon: {
      design: importMDX("../../ui-kit-js/src/components/icon/icon/icon.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/icon/icon/icon.code.mdx"),
      vrt: importMDX("../../ui-kit-js/src/components/icon/icon/icon.vrt.mdx"),
      docs: [importMDX("../../ui-kit-js/src/components/icon/icon/icon.prop.mdx")]
    }
  },
  Layout: {
    Flex: {
      code: importMDX("../../ui-kit-js/src/components/layout/flex/flex.code.mdx"),
      vrt: importMDX("../../ui-kit-js/src/components/layout/flex/flex.vrt.mdx"),
      docs: [
        importMDX("../../ui-kit-js/src/components/layout/flex/flex/flex.prop.mdx"),
        importMDX("../../ui-kit-js/src/components/layout/flex/flex-item/flex-item.prop.mdx")
      ]
    },
    Grid: {
      design: importMDX("../../ui-kit-js/src/components/layout/grid/grid.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/layout/grid/grid.code.mdx"),
      vrt: importMDX("../../ui-kit-js/src/components/layout/grid/grid.vrt.mdx"),
      docs: [
        importMDX("../../ui-kit-js/src/components/layout/grid/grid/grid.prop.mdx"),
        importMDX("../../ui-kit-js/src/components/layout/grid/grid-child/grid-child.prop.mdx")
      ]
    },
    Spacing: {
      design: importMDX("../../ui-kit-js/src/components/layout/spacing/spacing.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/layout/spacing/spacing.code.mdx"),
      vrt: importMDX("../../ui-kit-js/src/components/layout/spacing/spacing.vrt.mdx")
    }
  }
};
