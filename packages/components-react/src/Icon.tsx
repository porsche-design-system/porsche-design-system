import {PGrid, PGridItem, PHeadline, PIcon} from '@porsche-design-system/components-react';
import React from "react";
import {SystemLog} from "./SystemLog";

export function Icon(){
  return(
    <div>
      <SystemLog/>
      <PHeadline variant={'headline-2'}>Icon</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size={2}>
          <PHeadline variant={'headline-4'} tag={'h4'}>&lt;p-icon&gt;</PHeadline>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground light spacing-inline">
            <PIcon name={'filter'} color={'neutral-contrast-high'} aria-label="Filter icon"/>
            <PIcon name={'filter'} size={'medium'} color={'neutral-contrast-medium'} aria-label="Filter icon"/>
            <PIcon name={'filter'} size={'large'} color={'neutral-contrast-low'} aria-label="Filter icon"/>
            <PIcon name={'filter'} size={'large'} color={'brand'} aria-label="Filter icon"/>
            <PIcon name={'filter'} size={'large'} color={'inherit'} aria-label="Filter icon" style={{color: 'deeppink'}}/>
            <PIcon name={'delete'} size={'large'} aria-label="Delete icon"/>
          </div>
          <hr/>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground dark spacing-inline">
            <PIcon name={'filter'} theme={'dark'} color={'neutral-contrast-high'} aria-label="Filter icon"/>
            <PIcon name={'filter'} theme={'dark'} size={'medium'} color={'neutral-contrast-medium'} aria-label="Filter icon"/>
            <PIcon name={'filter'} theme={'dark'} size={'large'} color={'neutral-contrast-low'} aria-label="Filter icon"/>
            <PIcon name={'filter'} theme={'dark'} size={'large'} color={'brand'} aria-label="Filter icon"/>
            <PIcon name={'filter'} theme={'dark'} size={'large'} color={'inherit'} aria-label="Filter icon" style={{color: 'deeppink'}}/>
            <PIcon name={'delete'} theme={'dark'} size={'large'} aria-label="Delete icon"/>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
    </div>
  );
}
