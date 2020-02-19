import {PGrid, PGridItem, PHeadline, PLink, PLinkPure, PPagination} from '@porsche-design-system/components-react';
import React from "react";
import {SystemLog} from "./SystemLog";

export function Navigation(){
  return(
    <div>
      <SystemLog/>
      <PHeadline variant={'headline-2'}>Navigation</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size={2}>
          <PHeadline variant={'headline-4'} tag={'h4'}>&lt;p-link&gt;</PHeadline>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground light spacing-inline">
            <PLink variant={'primary'} href={'https://designsystem.porsche.com'}>Some label</PLink>
          </div>
          <div className="playground light spacing-inline">
            <PLink href={'https://designsystem.porsche.com'}>Some label</PLink>
          </div>
          <div className="playground light spacing-inline">
            <PLink variant={'tertiary'} href={'https://designsystem.porsche.com'}>Some label</PLink>
          </div>
          <div className="playground light spacing-inline">
            <PLink icon={'phone'} href={'https://designsystem.porsche.com'}>Some label</PLink>
          </div>
          <div className="playground light spacing-inline">
            <PLink href={'https://designsystem.porsche.com'} style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PLink>
          </div>
          <hr/>
          <div className="playground light spacing-inline">
            <PLink variant={'primary'} href={'https://designsystem.porsche.com'} hideLabel={true}>Some label</PLink>
          </div>
          <div className="playground light spacing-inline">
            <PLink href={'https://designsystem.porsche.com'} hideLabel={true}>Some label</PLink>
          </div>
          <div className="playground light spacing-inline">
            <PLink variant={'tertiary'} href={'https://designsystem.porsche.com'} hideLabel={true}>Some label</PLink>
          </div>
          <div className="playground light spacing-inline">
            <PLink icon={'phone'} href={'https://designsystem.porsche.com'} hideLabel={true}>Some label</PLink>
          </div>
          <hr/>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground dark spacing-inline">
            <PLink variant={'primary'} href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</PLink>
          </div>
          <div className="playground dark spacing-inline">
            <PLink href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</PLink>
          </div>
          <div className="playground dark spacing-inline">
            <PLink variant={'tertiary'} href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</PLink>
          </div>
          <div className="playground dark spacing-inline">
            <PLink icon={'phone'} href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</PLink>
          </div>
          <div className="playground dark spacing-inline">
            <PLink href={'https://designsystem.porsche.com'} theme={'dark'} style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PLink>
          </div>
          <hr/>
          <div className="playground dark spacing-inline">
            <PLink variant={'primary'} href={'https://designsystem.porsche.com'} hideLabel={true} theme={'dark'}>Some label</PLink>
          </div>
          <div className="playground dark spacing-inline">
            <PLink href={'https://designsystem.porsche.com'} hideLabel={true} theme={'dark'}>Some label</PLink>
          </div>
          <div className="playground dark spacing-inline">
            <PLink variant={'tertiary'} href={'https://designsystem.porsche.com'} hideLabel={true} theme={'dark'}>Some label
            </PLink>
          </div>
          <div className="playground dark spacing-inline">
            <PLink icon={'phone'} href={'https://designsystem.porsche.com'} hideLabel={true} theme={'dark'}>Some label</PLink>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem size={2}>
          <PHeadline variant={'headline-4'} tag={'h4'}>&lt;p-link-pure&gt;</PHeadline>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground light spacing-inline">
            <PLinkPure href={'https://designsystem.porsche.com'}>Some label</PLinkPure>
          </div>
          <div className="playground light spacing-inline">
            <PLinkPure hideLabel={true} href={'https://designsystem.porsche.com'}>Some label</PLinkPure>
          </div>
          <div className="playground light spacing-inline">
            <PLinkPure size={'medium'} href={'https://designsystem.porsche.com'}>Medium</PLinkPure>
            <PLinkPure size={'inherit'} href={'https://designsystem.porsche.com'} style={{ fontSize: '48px' }}>Inherit</PLinkPure>
          </div>
          <div className="playground light spacing-inline">
            <PLinkPure weight={'thin'} href={'https://designsystem.porsche.com'}>Thin</PLinkPure>
            <PLinkPure weight={'regular'} href={'https://designsystem.porsche.com'}>Regular</PLinkPure>
            <PLinkPure weight={'bold'} href={'https://designsystem.porsche.com'}>Bold</PLinkPure>
          </div>
          <div className="playground light spacing-inline">
            <PLinkPure active={true} href={'https://designsystem.porsche.com'}>Some label</PLinkPure>
          </div>
          <div className="playground light spacing-inline">
            <PLinkPure icon={'phone'} href={'https://designsystem.porsche.com'}>Some link with a custom icon</PLinkPure>
          </div>
          <div className="playground light spacing-inline">
            <PLinkPure href={'https://designsystem.porsche.com'} style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PLinkPure>
          </div>
          <hr/>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground dark spacing-inline">
            <PLinkPure href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</PLinkPure>
          </div>
          <div className="playground dark spacing-inline">
            <PLinkPure hideLabel={true} href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</PLinkPure>
          </div>
          <div className="playground dark spacing-inline">
            <PLinkPure size={'medium'} href={'https://designsystem.porsche.com'} theme={'dark'}>Medium</PLinkPure>
            <PLinkPure size={'inherit'} href={'https://designsystem.porsche.com'} theme={'dark'} style={{ fontSize: '48px' }}>Inherit</PLinkPure>
          </div>
          <div className="playground dark spacing-inline">
            <PLinkPure weight={'thin'} href={'https://designsystem.porsche.com'} theme={'dark'}>Thin</PLinkPure>
            <PLinkPure weight={'regular'} href={'https://designsystem.porsche.com'} theme={'dark'}>Regular</PLinkPure>
            <PLinkPure weight={'bold'} href={'https://designsystem.porsche.com'} theme={'dark'}>Bold</PLinkPure>
          </div>
          <div className="playground dark spacing-inline">
            <PLinkPure active={true} href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</PLinkPure>
          </div>
          <div className="playground dark spacing-inline">
            <PLinkPure icon={'phone'} href={'https://designsystem.porsche.com'} theme={'dark'}>Some link with a custom icon</PLinkPure>
          </div>
          <div className="playground dark spacing-inline">
            <PLinkPure href={'https://designsystem.porsche.com'} theme={'dark'} style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PLinkPure>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem size={2}>
          <PHeadline variant={'headline-4'} tag={'h4'}>&lt;p-pagination&gt;</PHeadline>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground light spacing-block">
            <PPagination totalItemsCount={500} itemsPerPage={25} activePage={1}/>
          </div>
          <hr/>
        </PGridItem>
        <PGridItem size={5}>
          <div className="playground dark spacing-block">
            <PPagination theme={'dark'} totalItemsCount={500} itemsPerPage={25} activePage={1}/>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
    </div>
  );
}
