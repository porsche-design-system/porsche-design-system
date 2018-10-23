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

const ComponentDoc = ({ componentGroup, name, description, path, seeItems }) => {
    return (
        <DocumentTitle title={`${name} | Porsche UI React`}>
            <div>
                <Grid padded columns="1">
                    <Grid.Column>
                        <ComponentDocHeader componentName={name} description={description} />
                        {seeItems && seeItems.length > 0 && <ComponentDocSee items={seeItems} />}
                        <ComponentDocLinks componentName={name} path={path} />
                        <ComponentProps componentGroup={componentGroup} componentName={name} />
                    </Grid.Column>
                </Grid>

                <ComponentExamples componentName={name} />
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
    name: PropTypes.string.isRequired,
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
