import React, { Suspense, lazy, useState } from "react"
import { prefix } from "../../prefix"
import "./story.scss"
import { RouteComponentProps, Redirect } from "react-router"
import { Stories, Story as StoryType } from "../../stories"
import { PropsTable } from "../propsTable/PropsTable"
import jsdoc from "../../jsdoc.json"
import { Tab, Spacing } from "@porsche/ui-kit-react"

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

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab)
  }

  const panes = [
    {
      menuItem: "Examples",
      key: "Tab1",
      active: selectedTab === "examples",
      onClick: () => handleTabClick("examples")
    },
    { menuItem: "Design", key: "Tab2", active: selectedTab === "design", onClick: () => handleTabClick("design") },
    { menuItem: "Props", key: "Tab3", active: selectedTab === "props", onClick: () => handleTabClick("props") }
  ]

  return (
    <main className={prefix("story")}>
      <Spacing paddingBottom={60}>
        <Tab panes={panes} alignment="left" />
      </Spacing>
      {panes[0].active && (
        <Suspense fallback={null}>
          <div className={prefix("markdown")}>
            <Code />
          </div>
        </Suspense>
      )}
      {panes[1].active && (
        <Suspense fallback={null}>
          <div className={prefix("markdown")}>
            <Design />
          </div>
        </Suspense>
      )}
      {panes[2].active &&
        story.props.map((component, index) => {
          return (
            <div key={component} className={prefix("story__props")}>
              <h1>{(jsdoc as any)[component].displayName}</h1>
              <PropsTable jsdoc={(jsdoc as any)[component]} />
            </div>
          )
        })}
    </main>
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
