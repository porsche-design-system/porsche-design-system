import React, { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { Stories, Story as StoryType } from "../../stories";
import { PropsTable } from "../propsTable/PropsTable";
import jsdoc from "../../jsdoc.json";
import { Tab } from "@porsche/ui-kit-react";
import { Spacing } from "@porscheui/ui-kit-react";
import style from "../markdown/markdown.module.scss";

export interface StoryParams {
  featureV1?: string;
}

export interface StoryUrlParams {
  category: string;
  story: string;
}

export const Story: React.FunctionComponent<RouteComponentProps<StoryUrlParams> & StoryParams> = (props) => {
  const [selectedTab, setSelectedTab] = useState();

  const categoryName = props.match.params.category;
  const storyName = props.match.params.story;

  const category =
    (Stories as any)[decodeParam(categoryName)] || (Stories as any)[toTitleCase(decodeParam(categoryName))];

  const story: StoryType = category[decodeParam(storyName)] || category[toTitleCase(decodeParam(storyName))];

  const Code = story.code && lazy(() => story.code);
  const Design = story.design && lazy(() => story.design);
  const Props = story.props;
  const Docs = story.docs;

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const setActiveTab = useCallback(() => {
    story.design ? setSelectedTab("design") : setSelectedTab("code");
  }, [story.design]);

  const panes = [];

  if (Design) {
    panes.push({
      menuItem: "Design",
      key: "design",
      active: selectedTab === "design",
      onClick: () => handleTabClick("design")
    });
  }

  if (Code) {
    panes.push({
      menuItem: "Code",
      key: "code",
      active: selectedTab === "code",
      onClick: () => handleTabClick("code")
    });
  }

  if (Props || Docs) {
    panes.push({
      menuItem: "Props",
      key: "props",
      active: selectedTab === "props",
      onClick: () => handleTabClick("props")
    });
  }

  useEffect(() => {
    setActiveTab();
  }, [setActiveTab]);

  if (!category) {
    return <Redirect to="/general/home" />;
  }

  if (!story) {
    return <Redirect to="/general/home" />;
  }

  return (
    <React.Fragment>
      <Spacing paddingBottom={64}>
        <Tab panes={panes} alignment="left" />
      </Spacing>
      {panes.map((item) => {
        if (item.key === "code" && item.active) {
          return (
            <Suspense key={item.key} fallback={null}>
              <div className={style.markdown}>
                <Code />
              </div>
            </Suspense>
          );
        } else if (item.key === "design" && item.active) {
          return (
            <Suspense key={item.key} fallback={null}>
              <div className={style.markdown}>
                <Design />
              </div>
            </Suspense>
          );
        } else if (item.key === "props" && Props && item.active) {
          return Props.map((component) => {
            return (
              <PropsTable
                key={component}
                jsdoc={(jsdoc as any)[component]}
                title={(jsdoc as any)[component].displayName}
              />
            );
          });
        } else if (item.key === "props" && Docs && item.active) {
          return (
            <Suspense key={item.key} fallback={null}>
              <div className={style.markdown}>
                {Docs.map((markdown, index) => {
                  const Doc = lazy(() => markdown);
                  return <Doc key={index} />;
                })}
              </div>
            </Suspense>
          );
        } else {
          return null;
        }
      })}
    </React.Fragment>
  );
};

function decodeParam(param: string) {
  return param.replace("-", " ");
}

function toTitleCase(text: string) {
  return text
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}
