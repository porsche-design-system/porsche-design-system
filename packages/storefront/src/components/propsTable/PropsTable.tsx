import React from "react"
import { prefix } from "../../prefix"
import "./propsTable.scss"

export interface PropsTableProps {
  jsdoc: any
}

export const PropsTable: React.FunctionComponent<PropsTableProps> = (props) => {
  if (!props || !props.jsdoc) {
    return null
  }

  const { jsdoc } = props

  return (
    <div className={prefix("props")}>
      {jsdoc.description && <div className={prefix("props__component-description")}>{jsdoc.description}</div>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Default</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {jsdoc.props &&
            Object.keys(jsdoc.props).map((key: any) => {
              const prop = jsdoc.props[key]
              return (
                <tr key={key}>
                  <td>
                    <code>{prop.name}</code>
                  </td>
                  <td>{prop.defaultValue && <code>{prop.defaultValue.value}</code>}</td>
                  <td>{prop.type && prop.type.name}</td>
                  <td className={prefix("props__prop-description")}>{prop.description}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
