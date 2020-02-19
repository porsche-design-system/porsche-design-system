import {PButton, PButtonPure, PGrid, PGridItem, PHeadline} from '@porsche-design-system/components-react';
import React from "react";

export function Action(){
  return(
    <div>
      <PHeadline variant={'headline-2'}>Action</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size={2}>
          <PHeadline variant={'headline-4'} tag={'h4'}>&lt;p-button&gt;</PHeadline>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground light spacing-inline">
            <PButton variant={'primary'}>Some label</PButton>
            <PButton variant={'primary'} disabled={true}>Some label</PButton>
            <PButton variant={'primary'} loading={true}>Some label</PButton>
          </div>
          <div className="playground light spacing-inline">
            <PButton>Some label</PButton>
            <PButton disabled={true}>Some label</PButton>
            <PButton loading={true}>Some label</PButton>
          </div>
          <div className="playground light spacing-inline">
            <PButton variant={'tertiary'}>Some label</PButton>
            <PButton variant={'tertiary'} disabled={true}>Some label</PButton>
            <PButton variant={'tertiary'} loading={true}>Some label</PButton>
          </div>
          <div className="playground light spacing-inline">
            <PButton icon={'phone'}>Some label</PButton>
          </div>
          <div className="playground light spacing-inline">
            <PButton style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
          </div>
          <hr/>
          <div className="playground light spacing-inline">
            <PButton variant={'primary'} hideLabel={true}>Some label</PButton>
            <PButton variant={'primary'} hideLabel={true} disabled={true}>Some label</PButton>
            <PButton variant={'primary'} hideLabel={true} loading={true}>Some label</PButton>
          </div>
          <div className="playground light spacing-inline">
            <PButton hideLabel={true}>Some label</PButton>
            <PButton disabled={true} hideLabel={true}>Some label</PButton>
            <PButton loading={true} hideLabel={true}>Some label</PButton>
          </div>
          <div className="playground light spacing-inline">
            <PButton variant={'tertiary'} hideLabel={true}>Some label</PButton>
            <PButton variant={'tertiary'} hideLabel={true} disabled={true}>Some label</PButton>
            <PButton variant={'tertiary'} hideLabel={true} loading={true}>Some label</PButton>
          </div>
          <div className="playground light spacing-inline">
            <PButton icon={'phone'} hideLabel={true}>Some label</PButton>
          </div>
          <hr/>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground dark spacing-inline">
            <PButton variant={'primary'} theme={'dark'}>Some label</PButton>
            <PButton variant={'primary'} theme={'dark'} disabled={true}>Some label</PButton>
            <PButton variant={'primary'} theme={'dark'} loading={true}>Some label</PButton>
          </div>
          <div className="playground dark spacing-inline">
            <PButton theme={'dark'}>Some label</PButton>
            <PButton theme={'dark'} disabled={true}>Some label</PButton>
            <PButton theme={'dark'} loading={true}>Some label</PButton>
          </div>
          <div className="playground dark spacing-inline">
            <PButton theme={'dark'} variant={'tertiary'}>Some label</PButton>
            <PButton theme={'dark'} variant={'tertiary'} disabled={true}>Some label</PButton>
            <PButton theme={'dark'} variant={'tertiary'} loading={true}>Some label</PButton>
          </div>
          <div className="playground dark spacing-inline">
            <PButton theme={'dark'} icon={'phone'}>Some label</PButton>
          </div>
          <div className="playground dark spacing-inline">
            <PButton theme={'dark'} style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
          </div>
          <hr/>
          <div className="playground dark spacing-inline">
            <PButton variant={'primary'} hideLabel={true} theme={'dark'}>Some label</PButton>
            <PButton variant={'primary'} hideLabel={true} theme={'dark'} disabled={true}>Some label</PButton>
            <PButton variant={'primary'} hideLabel={true} theme={'dark'} loading={true}>Some label</PButton>
          </div>
          <div className="playground dark spacing-inline">
            <PButton theme={'dark'} hideLabel={true}>Some label</PButton>
            <PButton theme={'dark'} hideLabel={true} disabled={true}>Some label</PButton>
            <PButton theme={'dark'} hideLabel={true} loading={true}>Some label</PButton>
          </div>
          <div className="playground dark spacing-inline">
            <PButton theme={'dark'} hideLabel={true} variant={'tertiary'}>Some label</PButton>
            <PButton theme={'dark'} hideLabel={true} variant={'tertiary'} disabled={true}>Some label</PButton>
            <PButton theme={'dark'} hideLabel={true} variant={'tertiary'} loading={true}>Some label</PButton>
          </div>
          <div className="playground dark spacing-inline">
            <PButton theme={'dark'} hideLabel={true} icon={'phone'}>Some label</PButton>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem size={2}>
          <PHeadline variant={'headline-4'} tag={'h4'}>&lt;p-button-pure&gt;</PHeadline>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground light spacing-inline">
            <PButtonPure>Some label</PButtonPure>
            <PButtonPure disabled={true}>Some label</PButtonPure>
            <PButtonPure loading={true}>Some label</PButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <PButtonPure hideLabel={true}>Some label</PButtonPure>
            <PButtonPure hideLabel={true} disabled={true}>Some label</PButtonPure>
            <PButtonPure hideLabel={true} loading={true}>Some label</PButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <PButtonPure size={'medium'}>Medium</PButtonPure>
            <PButtonPure size={'inherit'} style={{ fontSize: '48px' }}>Inherit</PButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <PButtonPure weight={'thin'}>Thin</PButtonPure>
            <PButtonPure weight={'regular'}>Regular</PButtonPure>
            <PButtonPure weight={'bold'}>Bold</PButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <PButtonPure icon={'delete'}>Some button with a custom icon</PButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <PButtonPure style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PButtonPure>
          </div>
          <hr/>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground dark spacing-inline">
            <PButtonPure theme={'dark'}>Some label</PButtonPure>
            <PButtonPure disabled={true} theme={'dark'}>Some label</PButtonPure>
            <PButtonPure loading={true} theme={'dark'}>Some label</PButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <PButtonPure hideLabel={true} theme={'dark'}>Some label</PButtonPure>
            <PButtonPure hideLabel={true} disabled={true} theme={'dark'}>Some label</PButtonPure>
            <PButtonPure hideLabel={true} loading={true} theme={'dark'}>Some label</PButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <PButtonPure size={'medium'} theme={'dark'}>Medium</PButtonPure>
            <PButtonPure size={'inherit'} theme={'dark'} style={{ fontSize: '48px' }}>Inherit</PButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <PButtonPure weight={'thin'} theme={'dark'}>Thin</PButtonPure>
            <PButtonPure weight={'regular'} theme={'dark'}>Regular</PButtonPure>
            <PButtonPure weight={'bold'} theme={'dark'}>Bold</PButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <PButtonPure icon={'delete'} theme={'dark'}>Some button with a custom icon</PButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <PButtonPure theme={'dark'} style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PButtonPure>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
    </div>

  );
}
