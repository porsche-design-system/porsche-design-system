import React from "react"
import {Markdown} from "../../components/markdown/Markdown"

export const Roadmap: React.FunctionComponent = () => {
  return <Markdown path={require('./roadmap.md')}/>
}
