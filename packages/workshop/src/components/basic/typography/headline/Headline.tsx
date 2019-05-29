import * as React from "react";
import cx from "classnames";
import { getElementType, prefix } from "../../../../lib";
import { ClassNameProp, ComponentProp } from "../../../../lib/props";

export interface HeadlineProps extends ClassNameProp, ComponentProp {
  /**
   * The style of the text.
   * @default copy
   */
  type?: "large-title" | "headline-1" | "headline-2" | "headline-3" | "headline-4" | "headline-5";

  /** Headline level/hierarchy */
  level?: "1" | "2" | "3" | "4" | "5" | "6";

  /** The text alignment of the component. */
  align?: "left" | "center" | "right";

  /**
   * Basic text color variations
   * @default black
   */
  color?: "black" | "light";

  /**
   * Adds an ellipsis to a single line of text if it overflows.
   */
  ellipsis?: boolean;

  /**
   * Sets the text as display: inline.
   */
  inline?: boolean;

  /**
   * Wraps the text, even when it has to break a word.
   */
  wrap?: boolean;

  /**
   * Inverts the color for use on darker backgrounds.
   */
  theme?: "light" | "dark";
}

const defaultProps: Partial<HeadlineProps> = {
  color: "black"
};

/**
 * Use this component any time you want to display plain text anywhere.
 */
export const Headline: React.FunctionComponent<HeadlineProps> = (props) => {
  const { as, className, children, ellipsis, align, color, inline, type, level, wrap, theme, ...rest } = props;

  const ElementType: any = getElementType("h" + level || as, "h2");

  const classes = cx(
    { [prefix(`headline--${type}`)]: type },
    { [prefix(`headline--align-${align}`)]: align },
    { [prefix(`headline--color-${color}`)]: color },
    { [prefix("headline--inline")]: inline },
    { [prefix("headline--ellipsis")]: ellipsis },
    { [prefix("headline--wrap")]: wrap },
    { [prefix("headline--theme-dark")]: theme === "dark" },
    className
  );

  return (
    <ElementType className={classes} {...rest}>
      {children}
    </ElementType>
  );
};

Headline.defaultProps = defaultProps;
