import React from "react";
import {Markdown} from "../../../components/markdown/Markdown";

export const License: React.FunctionComponent = () => {
  return <Markdown path={require('./license.md')}/>;
};
