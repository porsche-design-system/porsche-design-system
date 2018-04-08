import React from "react"
import { Table } from "@porsche/ui-kit-react"

const sizes = [2, 4, 2, 4]

const headerCells = [
    {
        key: "1",
        element: "Header 1"
    },
    {
        key: "2",
        element: "Header 2",
        sorted: "ascending"
    },
    {
        key: "3",
        element: "Header 3"
    },
    {
        key: "4",
        element: "Header 4"
    }
]

const rows = [
    {
        cells: [
            "Row 1.1",
            "Row 1.2",
            "Row 1.3",
            "Row 1.4"
        ]
    },
    {
        cells: [
            "Row 2.1",
            "Row 2.2",
            "Row 2.3",
            "Row 2.4"
        ]
    }
]

const menuItems = [
    {
        id: "edit",
        icon: "edit",
        label: "Edit",
        onClick: menuItemClicked
    },
    {
        id: "delete",
        icon: "bin",
        label: "Delete",
        onClick: menuItemClicked
    }
]

const menuItemClicked = (e, data) => {
    // eslint-disable-next-line no-console
    console.log(data.key)
}

const TableExampleBasicsFull = () => {
    return (
        <Table>
            <Table.Header>
                {headerCells.map((cell, index) => {
                    return (
                        <Table.HeaderCell
                            key={cell.key}
                            sorted={cell.sorted}
                            grow={sizes[index]}
                        >
                            {cell.element}
                        </Table.HeaderCell>
                    )
                })}
            </Table.Header>
            <Table.Body>
                {rows.map((row, rindex) => {
                    return (
                        <Table.Row
                            contextMenuItems={menuItems}
                            key={rindex}
                        >
                            {row.cells.map((cell, cindex) => {
                                return (
                                    <Table.Cell key={cell} grow={sizes[cindex]}>
                                        {cell}
                                    </Table.Cell>
                                )
                            })}
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    )
}

export default TableExampleBasicsFull
