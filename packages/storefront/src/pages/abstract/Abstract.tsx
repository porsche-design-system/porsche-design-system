import React from "react"
import {Markdown} from "../../components/markdown/Markdown"

export const Abstract: React.FunctionComponent = () => {
  return <Markdown path={require('./abstract.md')}/>
}
