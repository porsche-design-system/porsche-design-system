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
  }, [props.path])

  const protocols = ['http', 'https', 'mailto', 'tel', 'sketch']
  const uriTransformer = (uri: string) => {
    const url = (uri || '').trim()
    const first = url.charAt(0)

    if (first === '#' || first === '/') {
      return url
    }

    const colon = url.indexOf(':')
    if (colon === -1) {
      return url
    }

    const length = protocols.length
    let index = -1

    while (++index < length) {
      const protocol = protocols[index]

      if (colon === protocol.length && url.slice(0, protocol.length).toLowerCase() === protocol) {
        return url
      }
    }

    index = url.indexOf('?')
    if (index !== -1 && colon > index) {
      return url
    }

    index = url.indexOf('#')
    if (index !== -1 && colon > index) {
      return url
    }

    return '#'
  }

  return (
    markdown && (
      <div className={style.markdown}>
        <div>
          <ReactMarkdown source={markdown} transformLinkUri={uriTransformer} />
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
