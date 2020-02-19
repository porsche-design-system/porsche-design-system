import {PFlex, PFlexItem, PGrid, PGridItem, PHeadline} from '@porsche-design-system/components-react';
import React from "react";

export function Layout(){
  return(
    <div>
      <PHeadline variant={'headline-2'}>Layout</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size={2}>
          <PHeadline variant={'headline-4'} tag={'h4'}>
            &lt;p-grid&gt;<br/>
            &lt;p-grid-item&gt;
          </PHeadline>
        </PGridItem>
        <PGridItem size={10}>
          <div className="playground light spacing-block">
            <PGrid>
              <PGridItem size={12}/>
            </PGrid>
            <PGrid>
              <PGridItem size={1}/>
              <PGridItem size={11}/>
            </PGrid>
            <PGrid>
              <PGridItem size={2}/>
              <PGridItem size={10}/>
            </PGrid>
            <PGrid>
              <PGridItem size={3}/>
              <PGridItem size={9}/>
            </PGrid>
            <PGrid>
              <PGridItem size={4}/>
              <PGridItem size={8}/>
            </PGrid>
            <PGrid>
              <PGridItem size={5}/>
              <PGridItem size={7}/>
            </PGrid>
            <PGrid>
              <PGridItem size={6}/>
              <PGridItem size={6}/>
            </PGrid>
            <PGrid>
              <PGridItem size={7}/>
              <PGridItem size={5}/>
            </PGrid>
            <PGrid>
              <PGridItem size={8}/>
              <PGridItem size={4}/>
            </PGrid>
            <PGrid>
              <PGridItem size={9}/>
              <PGridItem size={3}/>
            </PGrid>
            <PGrid>
              <PGridItem size={10}/>
              <PGridItem size={2}/>
            </PGrid>
            <PGrid>
              <PGridItem size={11}/>
              <PGridItem size={1}/>
            </PGrid>
          </div>
          <div className="playground light spacing-block">
            <PGrid>
              <PGridItem offset={1} size={11}/>
            </PGrid>
            <PGrid>
              <PGridItem offset={2} size={10}/>
            </PGrid>
            <PGrid>
              <PGridItem offset={3} size={9}/>
            </PGrid>
            <PGrid>
              <PGridItem offset={4} size={8}/>
            </PGrid>
            <PGrid>
              <PGridItem offset={5} size={7}/>
            </PGrid>
            <PGrid>
              <PGridItem offset={6} size={6}/>
            </PGrid>
            <PGrid>
              <PGridItem offset={7} size={5}/>
            </PGrid>
            <PGrid>
              <PGridItem offset={8} size={4}/>
            </PGrid>
            <PGrid>
              <PGridItem offset={9} size={3}/>
            </PGrid>
            <PGrid>
              <PGridItem offset={10} size={2}/>
            </PGrid>
            <PGrid>
              <PGridItem offset={11} size={1}/>
            </PGrid>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem size={2}>
          <PHeadline variant={'headline-4'} tag={'h4'}>
            &lt;p-flex&gt;<br/>
            &lt;p-flex-item&gt;
          </PHeadline>
        </PGridItem>
        <PGridItem size={10}>
          <div className="playground light spacing-block">
            <PFlex>
              <PFlexItem width={'full'}/>
            </PFlex>
            <PFlex>
              <PFlexItem offset={'one-quarter'} width={'three-quarters'}/>
            </PFlex>
            <PFlex>
              <PFlexItem offset={'one-third'} width={'two-thirds'}/>
            </PFlex>
            <PFlex>
              <PFlexItem offset={'half'} width={'half'}/>
            </PFlex>
            <PFlex>
              <PFlexItem offset={'two-thirds'} width={'one-third'}/>
            </PFlex>
            <PFlex>
              <PFlexItem offset={'three-quarters'} width={'one-quarter'}/>
            </PFlex>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
    </div>
  );
}
