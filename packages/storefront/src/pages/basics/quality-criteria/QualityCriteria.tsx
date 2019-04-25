import React from "react";
import {Markdown} from "../../../components/markdown/Markdown";

export const QualityCriteria: React.FunctionComponent = () => {
  return <Markdown path={require('./quality-criteria.md')}/>;
};
