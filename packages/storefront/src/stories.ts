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
    }
  },
  Form: {
    Checkbox: {
      design: importMDX("../../ui-kit-js/src/components/form/checkbox/checkbox.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/form/checkbox/checkbox.code.mdx"),
      docs: [importMDX("../../ui-kit-js/src/components/form/checkbox/checkbox.prop.mdx")]
    },
    Toggle: {
      design: importMDX("../../ui-kit-js/src/components/form/toggle/toggle.design.mdx"),
      code: importMDX("../../ui-kit-js/src/components/form/toggle/toggle.code.mdx"),
      docs: [importMDX("../../ui-kit-js/src/components/form/toggle/toggle.prop.mdx")]
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
      code: importMDX("../../workshop/src/components/layout/flex/flex.code.mdx"),
      vrt: importMDX("../../workshop/src/components/layout/flex/flex.vrt.mdx"),
      props: ["Flex", "FlexItem"]
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
      design: importMDX("../../workshop/src/components/layout/spacing/spacing.design.mdx"),
      code: importMDX("../../workshop/src/components/layout/spacing/spacing.code.mdx"),
      vrt: importMDX("../../workshop/src/components/layout/spacing/spacing.vrt.mdx"),
      props: ["Spacing"]
    }
  }
};
