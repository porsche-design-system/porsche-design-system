import React from "react";
import style from "./sidebar.module.scss";
import { Stories } from "../../stories";
import { Redirect, NavLink } from "react-router-dom";
import { Divider } from "@porsche/ui-kit-react";
import { Headline, Text, Icon } from "@porscheui/ui-kit-react";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import SidebarLinks from "./sidebar.json";

export interface SidebarProps {
  featureV1?: string;
}
export interface SidebarLinkProps {
  to: string | object;
  title: string;
}

export const SidebarLink: React.FunctionComponent<SidebarLinkProps> = (props) => {
  return (
    <NavLink className={style["nav-link"]} to={props.to} activeClassName={style.current}>
      <Icon className={style["nav-icon"]} name="icon_arrow-right-hair.min.svg" />
      <Text as="span">{props.title}</Text>
    </NavLink>
  );
};

export interface SidebarCategory {
  title: string;
}

export const SidebarCategory: React.FunctionComponent<SidebarCategory> = (props) => {
  return (
    <div className={style.category}>
      <Headline type="headline-5" level="3" className={style.title}>
        {props.title}
      </Headline>
      {props.children}
    </div>
  );
};

export const Sidebar: React.FunctionComponent<SidebarProps> = (props) => {
  const categories = Object.keys(Stories);

  return (
    <div className={style.sidebar}>
      <div className={style.container}>
        <Header />
        <Divider spacing="small" />

        {SidebarLinks &&
          SidebarLinks.categories.map((item: any) => {
            return (
              <div key={item.category} className={style.category}>
                <Headline type="headline-5" level="4">
                  {item.category}
                </Headline>
                <nav>
                  <ul>
                    {item.links &&
                      item.links.map((itemLink: any) => {
                        return (
                          <React.Fragment key={itemLink.title}>
                            {!itemLink.featureV1 || (itemLink.featureV1 && props.featureV1) ? (
                              <li className={style["nav-item"]}>
                                <SidebarLink
                                  to={{ pathname: itemLink.path, search: props.featureV1 }}
                                  title={itemLink.title}
                                />
                                {itemLink.sublinks && (
                                  <ul>
                                    {itemLink.sublinks.map((itemSubLink: any) => {
                                      return (
                                        <React.Fragment key={itemSubLink.title}>
                                          {!itemSubLink.featureV1 || (itemSubLink.featureV1 && props.featureV1) ? (
                                            <li className={style["nav-item"]}>
                                              <SidebarLink
                                                to={{ pathname: itemSubLink.path, search: props.featureV1 }}
                                                title={itemSubLink.title}
                                              />
                                            </li>
                                          ) : null}
                                        </React.Fragment>
                                      );
                                    })}
                                  </ul>
                                )}
                              </li>
                            ) : null}
                          </React.Fragment>
                        );
                      })}
                  </ul>
                </nav>
              </div>
            );
          })}

        {props.featureV1 && (
          <React.Fragment>
            <Divider spacing="small" />
            <Headline type="headline-4" level="2">
              Components
            </Headline>
            {categories.map((category) => {
              const stories = Object.keys((Stories as any)[category]);
              if (!stories) {
                return <Redirect to="/general/home" />;
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
                        );
                      })}
                    </ul>
                  </nav>
                </SidebarCategory>
              );
            })}
          </React.Fragment>
        )}
        <Footer />
      </div>
    </div>
  );
};
