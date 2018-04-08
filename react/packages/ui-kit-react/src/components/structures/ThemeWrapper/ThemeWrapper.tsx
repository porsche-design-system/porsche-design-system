import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType } from "../../../lib"

export interface ThemeWrapperProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    /**
     * The type of the wrapper.
     * @default light
     */
    theme?: "light" | "dark" | "transparent"
}

const defaultProps: Partial<ThemeWrapperProps> = {
    theme: "light"
}

const _meta: ComponentMeta = {
  name: "ThemeWrapper",
  type: META.TYPES.STRUCTURE
}

const _ThemeWrapper: React.StatelessComponent<ThemeWrapperProps> & Partial<MetaCategorizable> = (props) => {
  const {
    as,
    className,
    customAttributes,
    theme,
    children,
    ...rest
  } = props

  const ElementType = getElementType(as, "div")

  const classes = cx(
    "pui-theme-wrapper",
    {["pui-theme-wrapper--light"]: props.theme === "light",
     ["pui-theme-wrapper--dark"]: props.theme === "dark",
     ["pui-theme-wrapper--transparent"]: props.theme === "transparent"},
    className
  )

  return (
    <ElementType
      className={classes}
      {...customAttributes}
      {...rest}
    >
      {children}
    </ElementType>
  )
}

_ThemeWrapper.defaultProps = defaultProps

_ThemeWrapper._meta = _meta

/**
 * This component is a direct child of "AreaWrapper" component and adds basic background themings to visually define larger content sections.
 * Direct children of this component may only exist of "ContentWrapper" components.
 */
export const ThemeWrapper = _ThemeWrapper as React.StatelessComponent<ThemeWrapperProps>
