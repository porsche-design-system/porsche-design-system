import React, { Suspense, lazy } from "react"
import { RouteComponentProps, Redirect } from "react-router"
import { Stories, Story as StoryType } from "./stories"

export interface StoryTestParams {
  category: string
  story: string
  vrt: string
}

export const Vrt: React.FunctionComponent<RouteComponentProps<StoryTestParams>> = (props) => {
  const categoryName = props.match.params.category
  const storyName = props.match.params.story
  const storyTest = props.match.params.vrt

  const category =
    (Stories as any)[decodeParam(categoryName)] || (Stories as any)[toTitleCase(decodeParam(categoryName))]

  if (!category) {
    return <Redirect to="/general/home" />
  }

  const story: StoryType = category[decodeParam(storyName)] || category[toTitleCase(decodeParam(storyName))]

  if (!story) {
    return <Redirect to="/general/home" />
  }

  // const test: StoryType = category[storyTest] || category[toTitleCase(decodeParam(storyTest))]

  // if (!test) {
  //   return <Redirect to="/genvrt" />
  // }

  const Code = lazy(() => story.vrt)

  return (
    <Suspense fallback={null}>
      <Code />
    </Suspense>
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
