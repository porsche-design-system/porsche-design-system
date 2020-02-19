import {PGrid, PGridItem, PHeadline, PSpinner} from '@porsche-design-system/components-react';
import React from "react";

export function Feedback(){
  return(
    <div>
      <PHeadline variant={'headline-2'}>Feedback</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size={2}>
          <PHeadline variant={'headline-4'} tag={'h4'}>&lt;p-spinner&gt;</PHeadline>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground light spacing-inline">
            <PSpinner size={'small'}/>
            <PSpinner size={'medium'}/>
            <PSpinner size={'large'}/>
            <PSpinner size={'inherit'} style={{width: '24px'}}/>
          </div>
          <hr/>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground dark spacing-inline">
            <PSpinner theme={'dark'} size={'small'}/>
            <PSpinner theme={'dark'} size={'medium'}/>
            <PSpinner theme={'dark'} size={'large'}/>
            <PSpinner theme={'dark'} size={'inherit'} style={{width: '24px'}}/>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
    </div>
  );
}
