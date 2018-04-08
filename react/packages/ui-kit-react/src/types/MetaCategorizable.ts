export interface MetaCategorizable {
  _meta: ComponentMeta
}

export interface ComponentMeta {
  name: string
  parent?: string
  type: string
}
