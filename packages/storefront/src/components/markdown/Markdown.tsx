import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import style from "./markdown.module.scss"

export interface MarkdownProps {
  path: string
}

export const Markdown: React.FunctionComponent<MarkdownProps> = (props) => {
  const [markdown, setMarkdown] = useState(null)

  useEffect(() => {
    getMarkdownText(props.path, setMarkdown)
  }, [])

  return (
    markdown && (
      <div className={style.markdown}>
        <div>
          <ReactMarkdown source={markdown} />
        </div>
      </div>
    )
  )
}

async function getMarkdownText(path: string, setter: any) {
  const response = await fetch(path)
  const result = await response.text()

  setter(result)
}
