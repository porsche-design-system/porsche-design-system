import React from "react"
import {Markdown as MD} from "../../../components/markdown/Markdown"

export const Markdown: React.FunctionComponent = () => {
  return <MD path={require('./markdown.md')}/>
}
