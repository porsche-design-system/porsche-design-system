import React from "react";
import {Markdown} from "../../../components/markdown/Markdown";

export const SketchPlugins: React.FunctionComponent = () => {
  return <Markdown path={require('./sketch-plugins.md')}/>;
};
