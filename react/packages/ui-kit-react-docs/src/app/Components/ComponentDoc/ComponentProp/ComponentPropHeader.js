import React from "react"
import { Table } from "semantic-ui-react"

import { neverUpdate } from "src/app/HOC"

const ComponentPropHeader = () => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Default</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )
}

export default neverUpdate(ComponentPropHeader)
