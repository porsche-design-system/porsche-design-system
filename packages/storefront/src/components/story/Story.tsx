import React, { Suspense, lazy, useState } from "react"
import { prefix } from "../../prefix"
import "./story.scss"
import { RouteComponentProps, Redirect } from "react-router"

import { Stories, Story as StoryType } from "../../stories"
import { PropsTable } from "../propsTable/PropsTable"
import jsdoc from "../../jsdoc.json"

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

  const story: StoryType = category[decodeParam(storyName)] || category[toTitleCase(decodeParam(storyName))]

  if (!story) {
    return <Redirect to="/introduction" />
  }

  const Code = lazy(() => story.examples)
  const Design = story.design && lazy(() => story.design)

  const [selectedTab, setSelectedTab] = useState("examples")

  const handleTabClick = (tab: "examples" | "design" | "props") => {
    setSelectedTab(tab)
  }

  return (
    <div className={prefix("story")}>
      <div className={prefix("story__tabs")}>
        <button onClick={() => handleTabClick("examples")} className={prefix("story__tabs__button")}>
          Examples
        </button>
        {Design && (
          <button onClick={() => handleTabClick("design")} className={prefix("story__tabs__button")}>
            Design
          </button>
        )}
        <button onClick={() => handleTabClick("props")} className={prefix("story__tabs__button")}>
          Props
        </button>
      </div>
      {selectedTab === "examples" && (
        <Suspense fallback={<div />}>
          <Code />
        </Suspense>
      )}
      {selectedTab === "design" && (
        <Suspense fallback={<div />}>
          <Design />
        </Suspense>
      )}
      {selectedTab === "props" &&
        story.props.map((component, index) => {
          return (
            <div key={component} className={prefix("story__props")}>
              <h1>{(jsdoc as any)[component].displayName}</h1>
              <PropsTable jsdoc={(jsdoc as any)[component]} />
            </div>
          )
        })}
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
