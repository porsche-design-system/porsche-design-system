import React from "react"
import {Markdown} from "../../../components/markdown/Markdown"

export const Home: React.FunctionComponent = () => {
  return <Markdown path={require('./home.md')}/>
}
