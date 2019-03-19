import React from "react"
import { prefix } from "../../prefix"
import "./propsTable.scss"
import { Text } from "@porscheui/porsche-ui-kit"

export interface PropsTableProps {
  jsdoc: any
  title: string
}

export const PropsTable: React.FunctionComponent<PropsTableProps> = (props) => {
  if (!props || !props.jsdoc) {
    return null
  }

  const { jsdoc } = props

  return (
    <div className={prefix("props")}>
      <div className={prefix("markdown")}>
        <div>
          <h1>{props.title}</h1>
          <p>{jsdoc.description}</p>
          <table>
            <thead className={prefix("table")}>
              <tr>
                <th className={prefix("cell-name")}>Name</th>
                <th className={prefix("cell-default")}>Default</th>
                <th className={prefix("cell-type")}>Type</th>
                <th className={prefix("cell-desc")}>Description</th>
              </tr>
            </thead>
            <tbody>
              {jsdoc.props &&
                Object.keys(jsdoc.props).map((key: any) => {
                  const prop = jsdoc.props[key]
                  return (
                    <tr key={key}>
                      <td className={prefix("cell-name")}>
                        <code>{prop.name}</code>
                      </td>
                      <td className={prefix("cell-default")}>
                        {prop.defaultValue && <code>{prop.defaultValue.value}</code>}
                      </td>
                      <td className={prefix("cell-type")}>{prop.type && prop.type.name}</td>
                      <td className={prefix("cell-desc")}>{prop.description}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
