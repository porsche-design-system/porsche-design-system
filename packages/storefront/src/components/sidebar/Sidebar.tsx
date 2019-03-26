import React from "react"
import { prefix } from "../../lib/prefix"
import "./sidebar.scss"
import { Stories } from "../../stories"
import { Redirect, NavLink } from "react-router-dom"
import { Divider } from "@porsche/ui-kit-react"
import { Text, Icon } from "@porscheui/porsche-ui-kit"
import { Header } from "../header/Header"

export interface SidebarProps {
  featureState?: string
}
export interface SidebarLinkProps {
  to: string | object
  title: string
}

export const SidebarLink: React.FunctionComponent<SidebarLinkProps> = (props) => {
  return (
    <NavLink className={prefix("nav-link")} to={props.to} activeClassName={prefix("nav-link--current")}>
      <Icon className={prefix("nav-link-icon")} name="icon_arrow-right-hair.min.svg" />
      <Text as="span">{props.title}</Text>
    </NavLink>
  )
}

export interface SidebarCategory {
  title: string
}

export const SidebarCategory: React.FunctionComponent<SidebarCategory> = (props) => {
  return (
    <div className={prefix("category")}>
      <Text type="copy-bold" as="h3" className={prefix("category__title")}>
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
      <Header />
      <Divider spacing="small" />
      <div className={prefix("category")}>
        <Text type="copy-bold">General</Text>
        <nav>
          <ul>
            <li className={prefix("nav-item")}>
              <SidebarLink to={{ pathname: "/general/home", search: props.featureState }} title="Home" />
            </li>
            <li className={prefix("nav-item")}>
              <SidebarLink to={{ pathname: "/general/updates", search: props.featureState }} title="Updates" />
              <ul>
                <li className={prefix("nav-item")}>
                  <SidebarLink to={{ pathname: "/general/roadmap", search: props.featureState }} title="Roadmap" />
                </li>
                <li className={prefix("nav-item")}>
                  <SidebarLink
                    to={{ pathname: "/general/versioning", search: props.featureState }}
                    title="Versioning"
                  />
                </li>
              </ul>
            </li>
            <li className={prefix("nav-item")}>
              <SidebarLink to={{ pathname: "/general/support", search: props.featureState }} title="Support" />
              <ul>
                <li className={prefix("nav-item")}>
                  <SidebarLink to={{ pathname: "/general/faq", search: props.featureState }} title="FAQ" />
                </li>
              </ul>
            </li>
            <li className={prefix("nav-item")}>
              <SidebarLink to={{ pathname: "/general/license", search: props.featureState }} title="License" />
            </li>
          </ul>
        </nav>
      </div>
      <div className={prefix("category")}>
        <Text type="copy-bold">Guidelines</Text>
        <nav>
          <ul>
            <li className={prefix("nav-item")}>
              <SidebarLink
                to={{ pathname: "/guidelines/accessibility", search: props.featureState }}
                title="Accessibility"
              />
            </li>
          </ul>
        </nav>
      </div>
      <div className={prefix("category")}>
        <Text type="copy-bold">Designing</Text>
        <nav>
          <ul>
            <li className={prefix("nav-item")}>
              <SidebarLink to={{ pathname: "/design/introduction", search: props.featureState }} title="Introduction" />
            </li>
            <li className={prefix("nav-item")}>
              <SidebarLink
                to={{ pathname: "/design/sketch-plugins", search: props.featureState }}
                title="Sketch Plugins"
              />
            </li>
            <li className={prefix("nav-item")}>
              <SidebarLink
                to={{ pathname: "/design/library-template", search: props.featureState }}
                title="Library Template"
              />
            </li>
            <li className={prefix("nav-item")}>
              <SidebarLink to={{ pathname: "/design/abstract", search: props.featureState }} title="Abstract" />
            </li>
            <li className={prefix("nav-item")}>
              <SidebarLink to={{ pathname: "/design/contribution", search: props.featureState }} title="Contribution" />
            </li>
          </ul>
        </nav>
      </div>
      <div className={prefix("category")}>
        <Text type="copy-bold">Code</Text>
        <nav>
          <ul>
            <li className={prefix("nav-item")}>
              <SidebarLink to={{ pathname: "/code/introduction", search: props.featureState }} title="Introduction" />
            </li>
            <li className={prefix("nav-item")}>
              <SidebarLink
                to={{ pathname: "/code/definition-of-done", search: props.featureState }}
                title="Definition Of Done"
              />
            </li>
            <li className={prefix("nav-item")}>
              <SidebarLink to={{ pathname: "/code/ci-cd", search: props.featureState }} title="CI/CD" />
            </li>
            <li className={prefix("nav-item")}>
              <SidebarLink
                to={{ pathname: "/code/browser-compatibility", search: props.featureState }}
                title="Browser Compatibility"
              />
            </li>
            <li className={prefix("nav-item")}>
              <SidebarLink to={{ pathname: "/code/contribution", search: props.featureState }} title="Contribution" />
            </li>
          </ul>
        </nav>
      </div>
      {props.featureState && (
        <React.Fragment>
          <Divider spacing="small" />
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
                        <li className={prefix("nav-item")} key={story}>
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
