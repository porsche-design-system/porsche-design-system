import React from "react"
import { Markdown } from "../../../components/markdown/Markdown"

export const Installation: React.FunctionComponent = () => {
  return <Markdown path={require("./installation.md")} />
}
