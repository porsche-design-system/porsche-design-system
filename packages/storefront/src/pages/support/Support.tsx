import React from "react"
import {Markdown} from "../../components/markdown/Markdown"

export const Support: React.FunctionComponent = () => {
  return <Markdown path={require('./support.md')}/>
}
