import React from "react"
import {Markdown} from "../../components/markdown/Markdown"

export const ContributeDesign: React.FunctionComponent = () => {
  return <Markdown path={require('./contribute-design.md')}/>
}
