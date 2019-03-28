import React from "react"
import { Link } from "react-router-dom"
import style from "./header.module.scss"
import { Logo } from "@porsche/ui-kit-react"
import { Text, Spacing } from "@porscheui/porsche-ui-kit"
import packageJson from "@porscheui/porsche-ui-kit/package.json"

export const Header: React.FunctionComponent = () => {
  return (
    <header>
      <Link className={style.logo} to={"/general/home"}>
        <Logo as="span" className={style.item} />
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
