import React from "react"
import {Markdown} from "../../components/markdown/Markdown"

export const ContributeCode: React.FunctionComponent = () => {
  return <Markdown path={require('./contribute-code.md')}/>
}
