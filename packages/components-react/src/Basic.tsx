import {PGrid, PGridItem, PHeadline, PMarque, PText} from '@porsche-design-system/components-react';
import React from "react";

export function Basic(){
  return(
    <div >
      <PHeadline variant={'headline-2'} tag={'h2'}>Basic</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size={2}>
          <PHeadline variant={'headline-4'} tag={'h4'}>&lt;p-marque&gt;</PHeadline>
        </PGridItem>
        <PGridItem size={10}>
          <div className="playground light spacing-block">
            <PMarque/>
            <PMarque trademark={false}/>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem size={2}>
          <PHeadline variant={'headline-4'} tag={'h4'}>&lt;p-headline&gt;</PHeadline>
        </PGridItem>
        <PGridItem size={10}>
          <div className="playground light spacing-block">
            <PHeadline variant={'large-title'}>The quick brown fox jumps over the lazy dog</PHeadline>
            <PHeadline variant={'headline-1'}>The quick brown fox jumps over the lazy dog</PHeadline>
            <PHeadline variant={'headline-2'}>The quick brown fox jumps over the lazy dog</PHeadline>
            <PHeadline variant={'headline-3'}>The quick brown fox jumps over the lazy dog</PHeadline>
            <PHeadline variant={'headline-4'}>The quick brown fox jumps over the lazy dog</PHeadline>
          </div>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem size={5} offset={2}>
          <div className="playground light spacing-block">
            <PHeadline variant={'headline-3'} color={'default'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PHeadline>
            <PHeadline variant={'headline-3'} color={'inherit'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PHeadline>
          </div>
          <hr/>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground dark spacing-block">
            <PHeadline theme={'dark'} variant={'headline-3'} color={'default'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PHeadline>
            <PHeadline theme={'dark'} variant={'headline-3'} color={'inherit'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PHeadline>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem size={2}>
          <PHeadline variant={'headline-4'} tag={'h4'}>&lt;p-text&gt;</PHeadline>
        </PGridItem>
        <PGridItem size={10}>
          <div className="playground light spacing-block">
            <PText>The quick brown fox jumps over the lazy dog</PText>
            <PText size={'x-small'}>The quick brown fox jumps over the lazy dog</PText>
          </div>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem offset={2} size={5}>
          <div className="playground light spacing-block">
            <PText color={'default'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText color={'brand'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText color={'neutral-contrast-high'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText color={'neutral-contrast-medium'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText color={'neutral-contrast-low'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText color={'notification-success'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText color={'notification-warning'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText color={'notification-error'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText color={'inherit'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
          </div>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground dark spacing-block">
            <PText theme={'dark'} color={'default'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText theme={'dark'} color={'brand'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText theme={'dark'} color={'neutral-contrast-high'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText theme={'dark'} color={'neutral-contrast-medium'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText theme={'dark'} color={'neutral-contrast-low'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText theme={'dark'} color={'notification-success'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText theme={'dark'} color={'notification-warning'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText theme={'dark'} color={'notification-error'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
            <PText theme={'dark'} color={'inherit'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</PText>
          </div>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem size={10} offset={2}>
          <div className="playground light spacing-block">
            <PText ellipsis={true}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum.
            </PText>
          </div>
          <div className="playground light spacing-block">
            <PText>Lorem ipsum dolor sit amet <a href="https://designsystem.porsche.com">linked text</a> et, <b>bold text</b> &amp; <strong>strong text</strong></PText>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
    </div>
  );
}
