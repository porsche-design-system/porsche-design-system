import React from "react"
import { prefix } from "../../prefix"
import "./sidebar.scss"
import { Stories } from "../../stories"
import { Link, Redirect } from "react-router-dom"

export interface SidebarLinkProps {
  to: string
  title: string
}

export const SidebarLink: React.FunctionComponent<SidebarLinkProps> = (props) => {
  return (
    <Link to={props.to}>
      <div className={prefix("sidebar__item")}>{props.title}</div>
    </Link>
  )
}

export interface SidebarCategory {
  title: string
}

export const SidebarCategory: React.FunctionComponent<SidebarCategory> = (props) => {
  return (
    <div className={prefix("sidebar__category")}>
      <div className={prefix("sidebar__category__title")}>{props.title}</div>
      {props.children}
    </div>
  )
}

export const Sidebar: React.FunctionComponent = (props) => {
  const categories = Object.keys(Stories)

  return (
    <aside className={prefix("sidebar")}>
      {props.children}
      <hr className={prefix("sidebar__hr")} />
      {categories.map((category) => {
        const stories = Object.keys((Stories as any)[category])
        if (!stories) {
          return <Redirect to="/introduction" />
        }
        return (
          <SidebarCategory key={category} title={category}>
            {stories.map((story) => {
              return <SidebarLink key={story} to={`/${category.toLowerCase()}/${story.toLowerCase()}`} title={story} />
            })}
          </SidebarCategory>
        )
      })}
    </aside>
  )
}
