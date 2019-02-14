import React, { Suspense, lazy } from "react"
import { prefix } from "@porscheui/porsche-ui-kit"
import "./storyRenderer.scss"
import { RouteComponentProps, Redirect } from "react-router"

import { Stories, Story } from "../../stories"
import jsdoc from "../../jsdoc.json"

export interface StoryRendererUrlParams {
  category: string
  story: string
}

export const StoryRenderer: React.FunctionComponent<RouteComponentProps<StoryRendererUrlParams>> = (props) => {
  const categoryName = props.match.params.category
  const storyName = props.match.params.story

  const category =
    (Stories as any)[decodeParam(categoryName)] || (Stories as any)[toTitleCase(decodeParam(categoryName))]

  if (!category) {
    return <Redirect to="/introduction" />
  }

  const story: Story = category[decodeParam(storyName)] || category[toTitleCase(decodeParam(storyName))]

  if (!story) {
    return <Redirect to="/introduction" />
  }

  const Content = lazy(() => story.code)

  return (
    <div className={prefix("story")}>
      {JSON.stringify((jsdoc as any)[story.jsdoc[0]], null, 2)}
      <Suspense fallback={<div />}>
        <Content />
      </Suspense>
    </div>
  )
}

function decodeParam(param: string) {
  return param.replace("-", " ")
}

function toTitleCase(text: string) {
  return text
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ")
}
