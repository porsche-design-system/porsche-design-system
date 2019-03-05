import React from "react"
import { prefix } from "../../prefix"
import "./sidebar.scss"
import { Stories } from "../../stories"
import { Redirect } from "react-router-dom"
import { Link } from "@porsche/ui-kit-react"
import { Text } from "@porscheui/porsche-ui-kit"

export interface SidebarLinkProps {
  to: string
  title: string
}

export const SidebarLink: React.FunctionComponent<SidebarLinkProps> = (props) => {
  return (
    <Link className={prefix("sidebar__nav-link")} href={props.to}>
      {props.title}
    </Link>
  )
}

export interface SidebarCategory {
  title: string
}

export const SidebarCategory: React.FunctionComponent<SidebarCategory> = (props) => {
  return (
    <div className={prefix("sidebar__category")}>
      <Text type="4-bold" as="h2" className={prefix("sidebar__category__title")}>
        {props.title}
      </Text>
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
            <nav>
              <ul>
                {stories.map((story) => {
                  return (
                    <li className={prefix("sidebar__nav-item")} key={story}>
                      <SidebarLink to={`/${category.toLowerCase()}/${story.toLowerCase()}`} title={story} />
                    </li>
                  )
                })}
              </ul>
            </nav>
          </SidebarCategory>
        )
      })}
    </aside>
  )
}
