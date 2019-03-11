import React from "react"
import {Markdown} from "../../components/markdown/Markdown"

export const Introduction: React.FunctionComponent = () => {
  return <Markdown path={require('./introduction.md')}/>
}
