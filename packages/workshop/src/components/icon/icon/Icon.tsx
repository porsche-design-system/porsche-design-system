import * as React from "react";
import cx from "classnames";
import { prefix } from "../../../lib";
import { ClassNameProp, ComponentProp } from "../../../lib/props";
import SVG from "react-inlinesvg";

export interface IconProps extends ClassNameProp, ComponentProp {
  /**
   * The icon reference name that should be used.
   */
  name: string;

  /**
   * The path to the folder where icon components are located
   */
  path?: string;

  /**
   * The size of the icon.
   * @default regular
   */
  size?: "x-small" | "small" | "medium" | "large" | "x-large";

  /**
   * The style of the color.
   * @default black
   */
  color?:
    | "black"
    | "grey-darker"
    | "grey-dark"
    | "grey"
    | "grey-light"
    | "grey-lighter"
    | "white"
    | "red-1"
    | "red-2"
    | "blue-1"
    | "blue-2"
    | "status-green"
    | "status-yellow"
    | "status-orange"
    | "status-red";
}

const defaultProps: Partial<IconProps> = {
  color: "black",
  path: "https://ui.porsche.com/cdn/0.0.1/icon/"
};

/**
 * Use this component any time you want to display svg icons.
 */
export const Icon: React.FunctionComponent<IconProps> = (props) => {
  const { className, path, name, size, color, ...rest } = props;

  if (!name) {
    return null;
  }

  const classes = cx(prefix("icon"), prefix(`icon--${size}`), className);

  return (
    <SVG cacheGetRequests className={classes} src={`${path}${name}`} wrapper={React.createFactory("i")} {...rest} />
  );
};

Icon.defaultProps = defaultProps;
