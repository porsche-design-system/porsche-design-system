import React from "react"
import {Markdown} from "../../../components/markdown/Markdown"

export const Contribution: React.FunctionComponent = () => {
  return <Markdown path={require('./contribution.md')}/>
}
