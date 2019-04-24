import React from "react";
import {Markdown} from "../../../components/markdown/Markdown";

export const Updates: React.FunctionComponent = () => {
  return <Markdown path={require('./updates.md')}/>;
};
