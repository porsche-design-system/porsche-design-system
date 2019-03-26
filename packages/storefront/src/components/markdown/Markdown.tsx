import React, { useEffect, useState } from "react"
import { prefix } from "../../lib/prefix"
import ReactMarkdown from "react-markdown"

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
      <div className={prefix("markdown")}>
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
