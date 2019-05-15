import { importMDX } from "mdx.macro";

export interface Story {
  design: any;
  code: any;
  props: string[];
  vrt?: any;
}
export interface Stories {
  [category: string]: {
    [story: string]: Story
  };
}
export const Stories: Stories = {
  Base: {
    Text: {
      design: importMDX("../../workshop/src/components/basic/text/text.design.mdx"),
      code: importMDX("../../workshop/src/components/basic/text/text.code.mdx"),
      vrt: importMDX("../../workshop/src/components/basic/text/text.vrt.mdx"),
      props: ["Text"]
    }
  },
  Action: {
    Buttonregular: {
      design: importMDX("../../workshop/src/components/action/button-regular/button-regular.design.mdx"),
      code: importMDX("../../workshop/src/components/action/button-regular/button-regular.code.mdx"),
      props: ["ButtonRegular"]
    }
  },
  Feedback: {
    Loader: {
      design: importMDX("../../workshop/src/components/feedback/loader/loader.design.mdx"),
      code: importMDX("../../workshop/src/components/feedback/loader/loader.code.mdx"),
      vrt: importMDX("../../workshop/src/components/feedback/loader/loader.vrt.mdx"),
      props: ["Loader"]
    }
  },
  Icon: {
    Icon: {
      design: importMDX("../../workshop/src/components/icon/icon/icon.design.mdx"),
      code: importMDX("../../workshop/src/components/icon/icon/icon.code.mdx"),
      props: ["Icon"]
    }
  },
  Layout: {
    Flex: {
      design: importMDX("../../workshop/src/components/layout/flex/flex.design.mdx"),
      code: importMDX("../../workshop/src/components/layout/flex/flex.code.mdx"),
      vrt: importMDX("../../workshop/src/components/layout/flex/flex.vrt.mdx"),
      props: ["Flex", "FlexItem"]
    },
    Grid: {
      design: importMDX("../../workshop/src/components/layout/grid/grid.design.mdx"),
      code: importMDX("../../workshop/src/components/layout/grid/grid.code.mdx"),
      vrt: importMDX("../../workshop/src/components/layout/grid/grid.vrt.mdx"),
      props: ["Grid", "GridChild"]
    },
    Spacing: {
      design: importMDX("../../workshop/src/components/layout/spacing/spacing.design.mdx"),
      code: importMDX("../../workshop/src/components/layout/spacing/spacing.code.mdx"),
      vrt: importMDX("../../workshop/src/components/layout/spacing/spacing.vrt.mdx"),
      props: ["Spacing"]
    }
  }
};
