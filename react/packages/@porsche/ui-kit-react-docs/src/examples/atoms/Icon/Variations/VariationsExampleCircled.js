import React from "react"
import { Icon } from "@porsche/ui-kit-react"

const style = { marginRight: "8px" }

const VariationsExampleCircled = () => {
    return (
        <React.Fragment>
            <Icon circled name="magnify_glass" size="small" style={style} />
            <Icon circled name="magnify_glass" size="regular" style={style} />
            <Icon circled name="magnify_glass" size="medium" style={style} />
            <Icon circled name="magnify_glass" size="large" style={style} />
            <Icon circled name="magnify_glass" size="huge" style={style} />
        </React.Fragment>
    )
}

export default VariationsExampleCircled
