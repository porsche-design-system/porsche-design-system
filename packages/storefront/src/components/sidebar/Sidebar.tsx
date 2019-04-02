import React from "react"
import style from "./sidebar.module.scss"
import { Stories } from "../../stories"
import { Redirect, NavLink } from "react-router-dom"
import { Divider } from "@porsche/ui-kit-react"
import { Text, Icon } from "@porscheui/porsche-ui-kit"
import { Header } from "../header/Header"

export interface SidebarProps {
  featureV1?: string
}
export interface SidebarLinkProps {
  to: string | object
  title: string
}

export const SidebarLink: React.FunctionComponent<SidebarLinkProps> = (props) => {
  return (
    <NavLink className={style["nav-link"]} to={props.to} activeClassName={style.current}>
      <Icon className={style["nav-icon"]} name="icon_arrow-right-hair.min.svg" />
      <Text as="span">{props.title}</Text>
    </NavLink>
  )
}

export interface SidebarCategory {
  title: string
}

export const SidebarCategory: React.FunctionComponent<SidebarCategory> = (props) => {
  return (
    <div className={style.category}>
      <Text type="copy-bold" as="h3" className={style.title}>
        {props.title}
      </Text>
      {props.children}
    </div>
  )
}

export const Sidebar: React.FunctionComponent<SidebarProps> = (props) => {
  const categories = Object.keys(Stories)

  return (
    <div className={style.sidebar}>
      <Header />
      <Divider spacing="small" />
      <div className={style.category}>
        <Text type="copy-bold">General</Text>
        <nav>
          <ul>
            <li className={style["nav-item"]}>
              <SidebarLink to={{ pathname: "/general/home", search: props.featureV1 }} title="Home" />
            </li>
            <li className={style["nav-item"]}>
              <SidebarLink to={{ pathname: "/general/updates", search: props.featureV1 }} title="Updates" />
              <ul>
                <li className={style["nav-item"]}>
                  <SidebarLink to={{ pathname: "/general/roadmap", search: props.featureV1 }} title="Roadmap" />
                </li>
                <li className={style["nav-item"]}>
                  <SidebarLink to={{ pathname: "/general/versioning", search: props.featureV1 }} title="Versioning" />
                </li>
              </ul>
            </li>
            <li className={style["nav-item"]}>
              <SidebarLink to={{ pathname: "/general/support", search: props.featureV1 }} title="Support" />
              <ul>
                <li className={style["nav-item"]}>
                  <SidebarLink to={{ pathname: "/general/faq", search: props.featureV1 }} title="FAQ" />
                </li>
              </ul>
            </li>
            <li className={style["nav-item"]}>
              <SidebarLink to={{ pathname: "/general/license", search: props.featureV1 }} title="License" />
            </li>
          </ul>
        </nav>
      </div>
      <div className={style.category}>
        <Text type="copy-bold">Guidelines</Text>
        <nav>
          <ul>
            <li className={style["nav-item"]}>
              <SidebarLink
                to={{ pathname: "/guidelines/accessibility", search: props.featureV1 }}
                title="Accessibility"
              />
            </li>
          </ul>
        </nav>
      </div>
      <div className={style.category}>
        <Text type="copy-bold">Designing</Text>
        <nav>
          <ul>
            <li className={style["nav-item"]}>
              <SidebarLink to={{ pathname: "/design/introduction", search: props.featureV1 }} title="Introduction" />
            </li>
            <li className={style["nav-item"]}>
              <SidebarLink to={{ pathname: "/design/culture", search: props.featureV1 }} title="Design Culture" />
            </li>
            <li className={style["nav-item"]}>
              <SidebarLink
                to={{ pathname: "/design/sketch-plugins", search: props.featureV1 }}
                title="Sketch Plugins"
              />
            </li>
            <li className={style["nav-item"]}>
              <SidebarLink to={{ pathname: "/design/contribution", search: props.featureV1 }} title="Contribution" />
            </li>
          </ul>
        </nav>
      </div>
      <div className={style.category}>
        <Text type="copy-bold">Code</Text>
        <nav>
          <ul>
            <li className={style["nav-item"]}>
              <SidebarLink to={{ pathname: "/code/introduction", search: props.featureV1 }} title="Introduction" />
            </li>
            <li className={style["nav-item"]}>
              <SidebarLink
                to={{ pathname: "/code/installation", search: props.featureV1 }}
                title="Installation latest"
              />
            </li>
            <li className={style["nav-item"]}>
              <SidebarLink
                to={{ pathname: "/code/installation-0x", search: props.featureV1 }}
                title="Installation 0.x (deprecated)"
              />
            </li>
            <li className={style["nav-item"]}>
              <SidebarLink
                to={{ pathname: "/code/definition-of-done", search: props.featureV1 }}
                title="Definition Of Done"
              />
            </li>
            <li className={style["nav-item"]}>
              <SidebarLink to={{ pathname: "/code/ci-cd", search: props.featureV1 }} title="CI/CD" />
            </li>
            <li className={style["nav-item"]}>
              <SidebarLink
                to={{ pathname: "/code/browser-compatibility", search: props.featureV1 }}
                title="Browser Compatibility"
              />
            </li>
            <li className={style["nav-item"]}>
              <SidebarLink to={{ pathname: "/code/contribution", search: props.featureV1 }} title="Contribution" />
            </li>
          </ul>
        </nav>
      </div>
      {props.featureV1 && (
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
                        <li className={style["nav-item"]} key={story}>
                          <SidebarLink
                            to={{
                              pathname: `/${category.toLowerCase()}/${story.toLowerCase()}`,
                              search: `${props.featureV1}`
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
