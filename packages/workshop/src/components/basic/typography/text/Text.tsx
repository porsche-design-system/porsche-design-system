import * as React from "react";
import cx from "classnames";
import { getElementType, prefix } from "../../../../lib";
import { ClassNameProp, ComponentProp } from "../../../../lib/props";

export interface TextProps extends ClassNameProp, ComponentProp {
  /**
   * The style of the text.
   * @default copy
   */
  type?:
    | "copy"
    | "small"
    | "12"
    | "16"
    | "20"
    | "24"
    | "28"
    | "30"
    | "32"
    | "36"
    | "42"
    | "44"
    | "48"
    | "52"
    | "60"
    | "60-thin"
    | "62"
    | "62-thin"
    | "72"
    | "72-thin"
    | "84"
    | "84-thin";

  /** The text alignment of the component. */
  align?: "left" | "center" | "right";

  /**
   * Basic text color variations
   * @default black
   */
  color?: "black" | "white";

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

const defaultProps: Partial<TextProps> = {
  type: "copy",
  color: "black"
};

/**
 * Use this component any time you want to display plain text anywhere.
 */
export const Text: React.FunctionComponent<TextProps> = (props) => {
  const { as, className, children, ellipsis, align, inline, type, color, wrap, theme, ...rest } = props;

  const ElementType: any = getElementType(as, "p");

  const classes = cx(
    { [prefix(`text--${type}`)]: type },
    { [prefix(`text--align-${align}`)]: align },
    { [prefix(`text--color-${color}`)]: color },
    { [prefix("text--inline")]: inline },
    { [prefix("text--ellipsis")]: ellipsis },
    { [prefix("text--wrap")]: wrap },
    { [prefix("text--theme-dark")]: theme === "dark" },
    className
  );

  return (
    <ElementType className={classes} {...rest}>
      {children}
    </ElementType>
  );
};

Text.defaultProps = defaultProps;
