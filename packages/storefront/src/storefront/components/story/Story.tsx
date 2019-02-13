import React, { Suspense, lazy } from "react"
import cx from "classnames"
import { prefix } from "@porscheui/porsche-ui-kit"
import "./story.scss"
import { RouteComponentProps, Redirect } from "react-router"

import { Stories } from "../../../stories"

export interface StoryUrlParams {
  category: string
  story: string
}

export const Story: React.FunctionComponent<RouteComponentProps<StoryUrlParams>> = (props) => {
  const categoryName = props.match.params.category
  const storyName = props.match.params.story

  const category =
    (Stories as any)[decodeParam(categoryName)] || (Stories as any)[toTitleCase(decodeParam(categoryName))]

  if (!category) {
    return <Redirect to="/introduction" />
  }

  const storyFactory = category[decodeParam(storyName)] || category[toTitleCase(decodeParam(storyName))]

  if (!storyFactory) {
    return <Redirect to="/introduction" />
  }

  const Content = lazy(() => storyFactory)

  return (
    <div className={cx(prefix("story"))}>
      <Suspense fallback={<div>Loading...</div>}>
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
