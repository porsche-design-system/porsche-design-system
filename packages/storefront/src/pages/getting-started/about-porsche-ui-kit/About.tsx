import React from "react";
import {Markdown} from "../../../components/markdown/Markdown";

export const About: React.FunctionComponent = () => {
  return <Markdown path={require('./about.md')}/>;
};