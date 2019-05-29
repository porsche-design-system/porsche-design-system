import * as React from "react";
import cx from "classnames";
import { getElementType, prefix } from "../../../lib";
import { ClassNameProp, ComponentProp } from "../../../lib/props";

export interface LoaderProps extends ClassNameProp, ComponentProp {
  /**
   * Inverts the color for use on darker backgrounds.
   */
  theme?: "light" | "dark";

  /**
   * A loader can have different sizes
   */
  size?: "x-small" | "small" | "medium" | "large" | "x-large";
}

/**
 * A loader component to show loading states inside single component or across entire modules / pages.
 * @see Button
 */
export const Loader: React.FunctionComponent<LoaderProps> = (props) => {
  const { as, className, children, theme, size, ...rest } = props;

  const ElementType: any = getElementType(as, "span");

  const classes = cx(
    prefix("loader"),
    { [prefix(`loader--${size}`)]: size },
    { [prefix("loader--theme-dark")]: theme === "dark" },
    className
  );

  return (
    <ElementType className={classes} {...rest} aria-busy="true">
      <svg className={prefix("loader__image")} viewBox="0 0 50 50" role="img">
        <circle className={prefix("loader__bg")} cx="50%" cy="50%" r="20" />
        <circle className={prefix("loader__fg")} cx="50%" cy="50%" r="20" />
      </svg>
    </ElementType>
  );
};
