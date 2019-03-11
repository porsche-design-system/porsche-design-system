import React from "react"
import {Markdown} from "../../components/markdown/Markdown"

export const LibraryTemplate: React.FunctionComponent = () => {
  return <Markdown path={require('./library-template.md')}/>
}
