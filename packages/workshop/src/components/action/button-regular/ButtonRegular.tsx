import * as React from "react";
import cx from "classnames";
import { getElementType, prefix } from "../../../lib";
import { Icon, IconProps, Loader, ButtonGroup } from "../../../index";
import { ClassNameProp, ComponentProp } from "../../../lib/props";

export interface ButtonRegular extends React.FunctionComponent<ButtonRegularProps> {
  Group: typeof ButtonGroup;
}

export interface ButtonRegularProps extends ClassNameProp, ComponentProp {
  /** Disables the button. No onClick will be triggered. */
  disabled?: boolean;

  /** Button on dark background */
  inverted?: boolean;

  /**
   * The icon of the button.
   * @default arrow_right_hair
   */
  icon?: IconProps["name"];

  /** Disable the button and show a loading indicator. No onClick will be triggered. */
  loading?: boolean;

  /**
   * Called after a user's click.
   * @param {React.MouseEvent<HTMLButtonElement>} event React's original event.
   * @param {ButtonProps} data All props of the component.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonRegularProps) => void;

  /** A button can stretch to fill the full available width. */
  stretch?: boolean;

  /** A button can be displayed with a smaller size */
  small?: boolean;

  /**
   * The display type of the button.
   */
  type?: "ghost" | "highlight";

  /**
   * Specifies the HTML Type of the button. If undefined, nothing is set.
   * @default button
   */
  role?: "button" | "submit" | "reset" | undefined;
}

const defaultProps: Partial<ButtonRegularProps> = {
  icon: "icon_arrow-right-hair.min.svg",
  role: "button"
};

/**
 * The default Porsche button.
 * @see Icon
 */
export const ButtonRegular: React.FunctionComponent<ButtonRegularProps> & Partial<ButtonRegular> = (props) => {
  const {
    as,
    role,
    className,
    children,
    disabled,
    inverted,
    icon,
    loading,
    onClick,
    stretch,
    small,
    type,
    ...rest
  } = props;

  const ElementType: any = getElementType(as, "button");

  let buttonClasses;
  let iconClasses;
  let loaderClasses;
  let labelClasses;

  buttonClasses = cx(
    prefix("button-regular"),
    { [prefix("button-regular--ghost")]: type === "ghost" },
    { [prefix("button-regular--highlight")]: type === "highlight" },
    { [prefix("button-regular--stretch")]: stretch },
    { [prefix("button-regular--theme-inverted")]: inverted },
    { [prefix("button-regular--loading")]: loading },
    { [prefix("button-regular--small")]: small },
    className
  );

  iconClasses = cx(prefix("button-regular__icon"));
  loaderClasses = cx(prefix("button-regular__icon-loader"));
  labelClasses = cx(prefix("button-regular__label"));

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) {
      return;
    }

    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    onClick(e, props);
  };

  const loaderNotInverted = () => {
    return ruleTypeGhost() ? false : true;
  };
  const ruleTypeGhost = () => {
    return type === "ghost" && !inverted ? true : false;
  };

  return (
    <ElementType
      {...ElementType === "button" && { type: role }}
      {...(ElementType === "button" ? { disabled: disabled || loading } : { "aria-disabled": disabled || loading })}
      onClick={handleClick}
      className={buttonClasses}
      {...rest}
    >
      {loading ? (
        <Loader size="x-small" className={loaderClasses} inverted={loaderNotInverted()} />
      ) : (
        <Icon size="x-small" name={icon as IconProps["name"]} className={iconClasses} />
      )}
      <span className={labelClasses}>{children}</span>
    </ElementType>
  );
};

ButtonRegular.defaultProps = defaultProps;
ButtonRegular.Group = ButtonGroup;
