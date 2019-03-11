import React from "react"
import {Markdown} from "../../components/markdown/Markdown"

export const SampleMarkdown: React.FunctionComponent = () => {
  return <Markdown path={require('./sample-markdown.md')}/>
}
