import React from "react";
import {Markdown} from "../../../components/markdown/Markdown";

export const BrowserCompatibility: React.FunctionComponent = () => {
  return <Markdown path={require('./browser-compatibility.md')}/>;
};
