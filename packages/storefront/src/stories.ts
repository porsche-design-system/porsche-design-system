import { importMDX } from "mdx.macro"

export interface Story {
  examples: any
  design?: any
  props: string[]
}
export interface Stories {
  [category: string]: {
    [story: string]: Story
  }
}
export const Stories: Stories = {
  Base: {
    Text: {
      examples: importMDX("../../workshop/src/components/basic/text/text.code.mdx"),
      design: importMDX("../../workshop/src/components/basic/text/text.design.mdx"),
      props: ["Text"]
    }
  },
  Layout: {
    Flex: {
      examples: importMDX("../../workshop/src/components/layout/flex/flex.code.mdx"),
      design: importMDX("../../workshop/src/components/layout/flex/flex.design.mdx"),
      props: ["Flex", "FlexItem"]
    }
  }
}
