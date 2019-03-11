import React from "react"
import {Markdown} from "../../components/markdown/Markdown"

export const DesignIntroduction: React.FunctionComponent = () => {
  return <Markdown path={require('./design-introduction.md')}/>
}
