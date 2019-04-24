import React from "react";
import style from "./propsTable.module.scss";
import styleMd from "../markdown/markdown.module.scss";

export interface PropsTableProps {
  jsdoc: any;
  title?: string;
}

export const PropsTable: React.FunctionComponent<PropsTableProps> = (props) => {
  if (!props || !props.jsdoc) {
    return null;
  }

  const { jsdoc } = props;

  return (
    <div className={style.props}>
      <div className={styleMd.markdown}>
        <div>
          <h1>{props.title}</h1>
          <p>{jsdoc.description}</p>
          <table>
            <thead className={style.table}>
              <tr>
                <th className={style.name}>Name</th>
                <th className={style.default}>Default</th>
                <th className={style.type}>Type</th>
                <th className={style.desc}>Description</th>
              </tr>
            </thead>
            <tbody>
              {jsdoc.props &&
                Object.keys(jsdoc.props).map((key: any) => {
                  const prop = jsdoc.props[key];
                  return (
                    <tr key={key}>
                      <td className={style.name}>
                        <code>{prop.name}</code>
                      </td>
                      <td className={style.default}>{prop.defaultValue && <code>{prop.defaultValue.value}</code>}</td>
                      <td className={style.type}>{prop.type && prop.type.name}</td>
                      <td className={style.desc}>{prop.description}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
