import React from "react"
import { Link } from "react-router-dom"
import { prefix } from "../../prefix"
import "./footer.scss"
import { Divider } from "@porsche/ui-kit-react"
import { Text } from "@porscheui/porsche-ui-kit"

export const Footer: React.FunctionComponent = () => {
  return (
    <footer className={prefix("footer")}>
      <Divider spacing="small" />
      <Text type="small-regular" align="center">
        © 2019 Dr. Ing. h.c. F. Porsche AG.
        <br />
        <Link to="https://www.porsche.com/international/legal-notice/">Legal notice</Link> /{" "}
        <Link to="https://www.porsche.com/international/legal-notice/">Imprint</Link> /{" "}
        <Link to="/general/license">License</Link>.
      </Text>
    </footer>
  )
}
