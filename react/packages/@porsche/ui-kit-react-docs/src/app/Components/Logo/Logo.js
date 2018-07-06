import { Image } from "semantic-ui-react"
import React from "react"
import image from "../../logo.png"

const Logo = (props) => {
    return <Image {...props} src={image} />
}

Logo.propTypes = Image.propTypes

export default Logo
