import React from "react"
import {Markdown} from "../../../components/markdown/Markdown"

export const Culture: React.FunctionComponent = () => {
  return <Markdown path={require('./culture.md')}/>
}
