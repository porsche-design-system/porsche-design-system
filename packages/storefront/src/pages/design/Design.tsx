import React from "react"
import {Markdown} from "../../components/markdown/Markdown"

export const Design: React.FunctionComponent = () => {
  return <Markdown path={require('./design.md')}/>
}
