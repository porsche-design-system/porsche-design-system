import React from "react"
import { Link } from "react-router-dom"
import { prefix } from "../../lib/prefix"
import "./header.scss"
import { Logo } from "@porsche/ui-kit-react"
import { Text, Spacing } from "@porscheui/porsche-ui-kit"
import packageJson from "@porscheui/porsche-ui-kit/package.json"

export const Header: React.FunctionComponent = () => {
  return (
    <header className={prefix("header")}>
      <Link className={prefix("logo")} to={"/general/home"}>
        <Logo as="span" className={prefix("logo-item")} />
      </Link>
      <Spacing marginTop={18}>
        <Text type="3-bold" align="center" as="h1">
          Porsche UI Kit
        </Text>
        <Text type="small-regular" align="center" as="p">
          Current Release: v{packageJson.version}
        </Text>
      </Spacing>
    </header>
  )
}
