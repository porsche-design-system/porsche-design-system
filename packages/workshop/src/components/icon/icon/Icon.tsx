import * as React from "react";
import cx from "classnames";
import { prefix } from "../../../lib";
import { ClassNameProp, ComponentProp } from "../../../lib/props";
import SVG from "react-inlinesvg";

export interface IconProps extends ClassNameProp, ComponentProp {
  /**
   * The icon reference name. It is equal to the icon filename.
   */
  name: string;

  /**
   * The path to the folder where icon components are located. By default it set to Porsche UI CDN.
   */
  path?: string;

  /**
   * Larger sizes than default 24x24px of the icon.
   */
  size?: "small" | "medium" | "large";

  /**
   * The html tag of the icon wrapper.
   * @default <i>
   */
  tag?: any;
}

const defaultProps: Partial<IconProps> = {
  path: "http://video.porsche.com/0.0.3/icon/",
  tag: "i"
};

/**
 * Use this component any time you want to display svg icons.
 */
export const Icon: React.FunctionComponent<IconProps> = (props) => {
  const { className, path, name, size, tag, ...rest } = props;

  if (!name) {
    return null;
  }

  const classes = cx(prefix("icon"), prefix(`icon--${size}`), className);

  return (
    <SVG cacheGetRequests className={classes} src={`${path}${name}`} wrapper={React.createFactory(tag)} {...rest} />
  );
};

Icon.defaultProps = defaultProps;
