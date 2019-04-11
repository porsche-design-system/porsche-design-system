import React from "react"
import {Markdown} from "../../../components/markdown/Markdown"

export const Communication: React.FunctionComponent = () => {
  return <Markdown path={require('./communication.md')}/>
}
