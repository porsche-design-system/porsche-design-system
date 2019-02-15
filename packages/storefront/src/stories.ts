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
  Base: {},
  Layout: {
    Flex: {
      examples: importMDX("../../workshop/src/components/layout/flex/Flex.mdx"),
      design: importMDX("../../workshop/src/components/layout/flex/Flex.design.mdx"),
      props: ["Flex", "FlexItem"]
    }
  }
}
