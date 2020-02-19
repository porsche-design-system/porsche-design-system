import {PText} from '@porsche-design-system/components-react';
import React from "react";

export function SystemLog(){
return (
  <div>
    <PText>
      <b id="human-readable-browser-name"></b>
      <br/>
      <span id="system-log"></span>
    </PText>
    <hr/>
  </div>
);
}
