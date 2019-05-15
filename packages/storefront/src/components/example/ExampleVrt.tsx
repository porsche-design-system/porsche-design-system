import React from "react";
import cx from "classnames";
import { ClassNameProp } from "../../lib/props";
import styles from "./exampleVrt.module.scss";
import "./example.global.scss";
import "./exampleVrt.global.scss";

export interface ExampleVrtProps extends ClassNameProp {
  theme: "default" | "inverted";
}

const defaultProps: Partial<ExampleVrtProps> = {
  theme: "default"
};

function renderNode(children: React.ReactNode, theme: string) {
  return typeof children === "function" ? children(theme) : children;
}

export const ExampleVrt: React.FunctionComponent<ExampleVrtProps> = (props) => {
  const { className, theme } = props;

  const renderClasses = cx(
    styles.vrt,
    { [styles.light]: theme === "default" },
    { [styles.dark]: theme === "inverted" },
    className
  );

  return (
    <React.Fragment>
      <div className={renderClasses}>{renderNode(props.children, props.theme)}</div>
    </React.Fragment>
  );
};

ExampleVrt.defaultProps = defaultProps;
