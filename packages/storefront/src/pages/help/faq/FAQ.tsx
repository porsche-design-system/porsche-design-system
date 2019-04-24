import React from "react";
import {Markdown} from "../../../components/markdown/Markdown";

export const FAQ: React.FunctionComponent = () => {
  return <Markdown path={require('./faq.md')}/>;
};
