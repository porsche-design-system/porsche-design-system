import React from "react"
import {Markdown} from "../../../components/markdown/Markdown"

export const CICD: React.FunctionComponent = () => {
  return <Markdown path={require('./ci-cd.md')}/>
}
