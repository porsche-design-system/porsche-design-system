import { importMDX } from "mdx.macro";

export interface Story {
  examples: any;
  design?: any;
  vrt?: any;
  props: string[];
}
export interface Stories {
  [category: string]: {
    [story: string]: Story
  };
}
export const Stories: Stories = {
  Base: {
    Text: {
      examples: importMDX("../../workshop/src/components/basic/text/text.code.mdx"),
      design: importMDX("../../workshop/src/components/basic/text/text.design.mdx"),
      vrt: importMDX("../../workshop/src/components/basic/text/text.vrt.mdx"),
      props: ["Text"]
    }
  },
  Action: {
    ButtonRegular: {
      examples: importMDX("../../workshop/src/components/action/button-regular/button-regular.code.mdx"),
      props: ["ButtonRegular"]
    }
  },
  Feedback: {
    Loader: {
      examples: importMDX("../../workshop/src/components/feedback/loader/loader.code.mdx"),
      design: importMDX("../../workshop/src/components/feedback/loader/loader.design.mdx"),
      props: ["Loader"]
    }
  },
  Icon: {
    Icon: {
      examples: importMDX("../../workshop/src/components/icon/icon/icon.code.mdx"),
      design: importMDX("../../workshop/src/components/icon/icon/icon.design.mdx"),
      props: ["Icon"]
    }
  },
  Layout: {
    Flex: {
      examples: importMDX("../../workshop/src/components/layout/flex/flex.code.mdx"),
      vrt: importMDX("../../workshop/src/components/layout/flex/flex.vrt.mdx"),
      props: ["Flex", "FlexItem"]
    },
    Grid: {
      examples: importMDX("../../workshop/src/components/layout/grid/grid.code.mdx"),
      design: importMDX("../../workshop/src/components/layout/grid/grid.design.mdx"),
      vrt: importMDX("../../workshop/src/components/layout/grid/grid.vrt.mdx"),
      props: ["Grid", "GridChild"]
    },
    Spacing: {
      examples: importMDX("../../workshop/src/components/layout/spacing/spacing.code.mdx"),
      design: importMDX("../../workshop/src/components/layout/spacing/spacing.design.mdx"),
      vrt: importMDX("../../workshop/src/components/layout/spacing/spacing.vrt.mdx"),
      props: ["Spacing"]
    }
  }
};
