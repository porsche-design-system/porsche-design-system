import { importMDX } from "mdx.macro"

export interface Story {
  design?: any
  code: any
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
      code: importMDX("../../workshop/src/components/layout/flex/Flex.mdx"),
      props: ["Flex"]
    }
  }
}
