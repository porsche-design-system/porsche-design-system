import { Image } from "semantic-ui-react"
import React from "react"

const Logo = (props) => {
    return <Image {...props} src="logo.png" />
}

Logo.propTypes = Image.propTypes

export default Logo
