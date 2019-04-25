import React from "react";
import {Markdown} from "../../../components/markdown/Markdown";

export const Accessibility: React.FunctionComponent = () => {
  return <Markdown path={require('./accessibility.md')}/>;
};
