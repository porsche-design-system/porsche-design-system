import React, { Suspense, lazy, useState } from "react"
import { RouteComponentProps, Redirect } from "react-router"
import { prefix } from "../../prefix"
import "./story.scss"
import { Stories, Story as StoryType } from "../../stories"
import { PropsTable } from "../propsTable/PropsTable"
import jsdoc from "../../jsdoc.json"
import { Tab } from "@porsche/ui-kit-react"
import { Spacing } from "@porscheui/porsche-ui-kit"

export interface StoryParams {
  featureState?: string
}
export interface StoryUrlParams {
  category: string
  story: string
}

export const Story: React.FunctionComponent<RouteComponentProps<StoryUrlParams> & StoryParams> = (props) => {
  const categoryName = props.match.params.category
  const storyName = props.match.params.story

  if (!props.featureState) {
    return <Redirect to="/general/home" />
  }

  const category =
    (Stories as any)[decodeParam(categoryName)] || (Stories as any)[toTitleCase(decodeParam(categoryName))]

  if (!category) {
    return <Redirect to="/general/home" />
  }

  const story: StoryType = category[decodeParam(storyName)] || category[toTitleCase(decodeParam(storyName))]

  if (!story) {
    return <Redirect to="/general/home" />
  }

  const Code = lazy(() => story.examples)
  const Design = story.design && lazy(() => story.design)
  const Props = story.props

  const [selectedTab, setSelectedTab] = useState("examples")

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab)
  }

  const panes = []

  if (Code) {
    panes.push({
      menuItem: "Examples",
      key: "examples",
      active: selectedTab === "examples",
      onClick: () => handleTabClick("examples")
    })
  }

  if (Design) {
    panes.push({
      menuItem: "Design",
      key: "design",
      active: selectedTab === "design",
      onClick: () => handleTabClick("design")
    })
  }

  if (Props) {
    panes.push({
      menuItem: "Props",
      key: "props",
      active: selectedTab === "props",
      onClick: () => handleTabClick("props")
    })
  }

  return (
    <main className={prefix("story")}>
      <Spacing paddingBottom={60}>
        <Tab panes={panes} alignment="left" />
      </Spacing>
      {panes.map((item) => {
        if (item.key === "examples" && item.active) {
          return (
            <Suspense key={item.key} fallback={null}>
              <div className={prefix("markdown")}>
                <Code />
              </div>
            </Suspense>
          )
        } else if (item.key === "design" && item.active) {
          return (
            <Suspense key={item.key} fallback={null}>
              <div className={prefix("markdown")}>
                <Design />
              </div>
            </Suspense>
          )
        } else if (item.key === "props" && item.active) {
          return story.props.map((component, index) => {
            return (
              <div key={component} className={prefix("story__props")}>
                <h1>{(jsdoc as any)[component].displayName}</h1>
                <PropsTable jsdoc={(jsdoc as any)[component]} />
              </div>
            )
          })
        } else {
          return null
        }
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
