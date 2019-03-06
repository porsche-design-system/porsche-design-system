import React from "react"
import { prefix } from "../../prefix"
import "./propsTable.scss"
import { Text } from "@porscheui/porsche-ui-kit"

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
      {jsdoc.description && <Text className={prefix("props__component-description")}>{jsdoc.description}</Text>}
      <table>
        <thead>
          <tr>
            <th className={prefix("props__table-name")}>Name</th>
            <th className={prefix("props__table-default")}>Default</th>
            <th className={prefix("props__table-type")}>Type</th>
            <th className={prefix("props__table-desc")}>Description</th>
          </tr>
        </thead>
        <tbody>
          {jsdoc.props &&
            Object.keys(jsdoc.props).map((key: any) => {
              const prop = jsdoc.props[key]
              return (
                <tr key={key}>
                  <td className={prefix("props__table-name")}>
                    <code>{prop.name}</code>
                  </td>
                  <td className={prefix("props__table-default")}>
                    {prop.defaultValue && <code>{prop.defaultValue.value}</code>}
                  </td>
                  <td className={prefix("props__table-type")}>{prop.type && prop.type.name}</td>
                  <td className={prefix("props__table-desc")}>{prop.description}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
