import React from "react"
import {Markdown} from "../../components/markdown/Markdown"

export const CICDPipeline: React.FunctionComponent = () => {
  return <Markdown path={require('./ci-cd-pipeline.md')}/>
}
