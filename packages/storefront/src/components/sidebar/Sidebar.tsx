import React from "react"
import { prefix } from "../../prefix"
import "./sidebar.scss"
import { Stories } from "../../stories"
import { Redirect, Link, NavLink } from "react-router-dom"
import { Logo } from "@porsche/ui-kit-react"
import { Spacing, Text, Icon } from "@porscheui/porsche-ui-kit"
import packageJson from "@porscheui/porsche-ui-kit/package.json"

export interface SidebarProps {
  featureState?: string
}
export interface SidebarLinkProps {
  to: string | object
  title: string
}

export const SidebarLink: React.FunctionComponent<SidebarLinkProps> = (props) => {
  return (
    <NavLink
      className={prefix("sidebar__nav-link")}
      to={props.to}
      activeClassName={prefix("sidebar__nav-link--current")}
    >
      <Icon className={prefix("sidebar__nav-link-icon")} name="icon_arrow-right-hair.min.svg" size="x-small" />
      <Text as="span">{props.title}</Text>
    </NavLink>
  )
}

export interface SidebarCategory {
  title: string
}

export const SidebarCategory: React.FunctionComponent<SidebarCategory> = (props) => {
  return (
    <div className={prefix("sidebar__category")}>
      <Text type="copy-bold" as="h3" className={prefix("sidebar__category__title")}>
        {props.title}
      </Text>
      {props.children}
    </div>
  )
}

export const Sidebar: React.FunctionComponent<SidebarProps> = (props) => {
  const categories = Object.keys(Stories)

  return (
    <div className={prefix("sidebar")}>
      <header>
        <Link className={prefix("sidebar__logo")} to={"/general/home"}>
          <Logo as="span" className={prefix("sidebar__logo-item")} />
        </Link>
        <Spacing marginTop={18}>
          <Text type="3-bold" align="center" as="h1">
            Porsche UI Kit
          </Text>
          <Text type="small-regular" align="center" as="p">
            Current Release: v{packageJson.version}
          </Text>
        </Spacing>
      </header>
      <hr className={prefix("sidebar__hr")} />
      {props.children}
      {props.featureState && (
        <React.Fragment>
          <hr className={prefix("sidebar__hr")} />
          <Text type="4-bold" as="h2">
            Components
          </Text>
          {categories.map((category) => {
            const stories = Object.keys((Stories as any)[category])
            if (!stories) {
              return <Redirect to="/general/home" />
            }
            return (
              <SidebarCategory key={category} title={category}>
                <nav>
                  <ul>
                    {stories.map((story) => {
                      return (
                        <li className={prefix("sidebar__nav-item")} key={story}>
                          <SidebarLink
                            to={{
                              pathname: `/${category.toLowerCase()}/${story.toLowerCase()}`,
                              search: `${props.featureState}`
                            }}
                            title={story}
                          />
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </SidebarCategory>
            )
          })}
        </React.Fragment>
      )}
    </div>
  )
}
