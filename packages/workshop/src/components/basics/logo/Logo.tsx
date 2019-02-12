import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { base64logo } from "../../../lib/base64logo"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface LogoProps extends ClassNameProp, ComponentProp {}

const _Logo: React.StatelessComponent<LogoProps> = (props) => {
  const { as, className, children, ...rest } = props

  const ElementType: any = getElementType(as, "div")

  return (
    <ElementType className={cx(prefix("logo"), className)} {...rest}>
      <img className={prefix("logo__image")} src={base64logo} alt="Porsche®" />
    </ElementType>
  )
}

/**
 * The famous and loved Porsche Logo, currently available in like one size.
 * @see Header
 */
export const Logo = _Logo as React.StatelessComponent<LogoProps>
