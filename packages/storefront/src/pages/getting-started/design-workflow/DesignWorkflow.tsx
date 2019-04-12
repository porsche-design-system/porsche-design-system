import React from "react"
import {Markdown} from "../../../components/markdown/Markdown"

export const DesignWorkflow: React.FunctionComponent = () => {
  return <Markdown path={require('./design-workflow.md')}/>
}
