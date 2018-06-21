import ComponentDocHeader from "./ComponentDocHeader"
import ComponentDocLinks from "./ComponentDocLinks"
import ComponentDocSee from "./ComponentDocSee"
import ComponentExamples from "./ComponentExamples"
import ComponentProps from "./ComponentProps"
import DocumentTitle from "react-document-title"
import { Grid } from "semantic-ui-react"
import PropTypes from "prop-types"
import React from "react"
import { withDocInfo } from "src/app/HOC"

const ComponentDoc = ({ componentGroup, componentName, description, path, seeItems }) => {
    const cleanPath = path.split("node_modules/@porsche/ui-kit-react").pop() || path

    return (
        <DocumentTitle title={`${componentName} | Porsche UI React`}>
            <div>
                <Grid padded columns="1">
                    <Grid.Column>
                        <ComponentDocHeader componentName={componentName} description={description} />
                        {seeItems && seeItems.length > 0 && <ComponentDocSee items={seeItems} />}
                        <ComponentDocLinks componentName={componentName} path={cleanPath} />
                        <ComponentProps componentGroup={componentGroup} componentName={componentName} />
                    </Grid.Column>
                </Grid>

                <ComponentExamples componentName={componentName} />
            </div>
        </DocumentTitle>
    )
}

ComponentDoc.propTypes = {
    componentGroup: PropTypes.objectOf(
        PropTypes.shape({
            description: PropTypes.arrayOf(PropTypes.string),
            props: PropTypes.array
        })
    ),
    componentName: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(PropTypes.string),
    path: PropTypes.string.isRequired,
    seeItems: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.string
        })
    ).isRequired
}

export default withDocInfo(ComponentDoc)
