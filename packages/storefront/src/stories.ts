import { importMDX } from "mdx.macro"

export interface Story {
  design?: any
  code: any
  jsdoc: string[]
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
      code: importMDX("../../workshop/src/components/layout/flex/Flex.mdx"),
      jsdoc: ["Flex", "FlexItem"]
    }
  }
}
