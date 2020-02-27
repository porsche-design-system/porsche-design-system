import {Grid, GridItem, Headline, Link, LinkPure, Pagination} from '@porsche-design-system/components-react';
import React from 'react';

export function Navigation(){
  return(
    <div>
      <Headline variant={'headline-2'}>Navigation</Headline>
      <hr/>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>&lt;p-link&gt;</Headline>
        </GridItem>
        <GridItem size={5}>
          <div className="playground light spacing-inline">
            <Link variant={'primary'} href={'https://designsystem.porsche.com'}>Some label</Link>
          </div>
          <div className="playground light spacing-inline">
            <Link href={'https://designsystem.porsche.com'}>Some label</Link>
          </div>
          <div className="playground light spacing-inline">
            <Link variant={'tertiary'} href={'https://designsystem.porsche.com'}>Some label</Link>
          </div>
          <div className="playground light spacing-inline">
            <Link icon={'phone'} href={'https://designsystem.porsche.com'}>Some label</Link>
          </div>
          <div className="playground light spacing-inline">
            <Link href={'https://designsystem.porsche.com'} style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</Link>
          </div>
          <hr/>
          <div className="playground light spacing-inline">
            <Link variant={'primary'} href={'https://designsystem.porsche.com'} hideLabel={true}>Some label</Link>
          </div>
          <div className="playground light spacing-inline">
            <Link href={'https://designsystem.porsche.com'} hideLabel={true}>Some label</Link>
          </div>
          <div className="playground light spacing-inline">
            <Link variant={'tertiary'} href={'https://designsystem.porsche.com'} hideLabel={true}>Some label</Link>
          </div>
          <div className="playground light spacing-inline">
            <Link icon={'phone'} href={'https://designsystem.porsche.com'} hideLabel={true}>Some label</Link>
          </div>
          <hr/>
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-inline">
            <Link variant={'primary'} href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</Link>
          </div>
          <div className="playground dark spacing-inline">
            <Link href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</Link>
          </div>
          <div className="playground dark spacing-inline">
            <Link variant={'tertiary'} href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</Link>
          </div>
          <div className="playground dark spacing-inline">
            <Link icon={'phone'} href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</Link>
          </div>
          <div className="playground dark spacing-inline">
            <Link href={'https://designsystem.porsche.com'} theme={'dark'} style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</Link>
          </div>
          <hr/>
          <div className="playground dark spacing-inline">
            <Link variant={'primary'} href={'https://designsystem.porsche.com'} hideLabel={true} theme={'dark'}>Some label</Link>
          </div>
          <div className="playground dark spacing-inline">
            <Link href={'https://designsystem.porsche.com'} hideLabel={true} theme={'dark'}>Some label</Link>
          </div>
          <div className="playground dark spacing-inline">
            <Link variant={'tertiary'} href={'https://designsystem.porsche.com'} hideLabel={true} theme={'dark'}>Some label
            </Link>
          </div>
          <div className="playground dark spacing-inline">
            <Link icon={'phone'} href={'https://designsystem.porsche.com'} hideLabel={true} theme={'dark'}>Some label</Link>
          </div>
          <hr/>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>&lt;p-link-pure&gt;</Headline>
        </GridItem>
        <GridItem size={5}>
          <div className="playground light spacing-inline">
            <LinkPure href={'https://designsystem.porsche.com'}>Some label</LinkPure>
          </div>
          <div className="playground light spacing-inline">
            <LinkPure hideLabel={true} href={'https://designsystem.porsche.com'}>Some label</LinkPure>
          </div>
          <div className="playground light spacing-inline">
            <LinkPure size={'medium'} href={'https://designsystem.porsche.com'}>Medium</LinkPure>
            <LinkPure size={'inherit'} href={'https://designsystem.porsche.com'} style={{ fontSize: '48px' }}>Inherit</LinkPure>
          </div>
          <div className="playground light spacing-inline">
            <LinkPure weight={'thin'} href={'https://designsystem.porsche.com'}>Thin</LinkPure>
            <LinkPure weight={'regular'} href={'https://designsystem.porsche.com'}>Regular</LinkPure>
            <LinkPure weight={'bold'} href={'https://designsystem.porsche.com'}>Bold</LinkPure>
          </div>
          <div className="playground light spacing-inline">
            <LinkPure active={true} href={'https://designsystem.porsche.com'}>Some label</LinkPure>
          </div>
          <div className="playground light spacing-inline">
            <LinkPure icon={'phone'} href={'https://designsystem.porsche.com'}>Some link with a custom icon</LinkPure>
          </div>
          <div className="playground light spacing-inline">
            <LinkPure href={'https://designsystem.porsche.com'} style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</LinkPure>
          </div>
          <hr/>
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-inline">
            <LinkPure href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</LinkPure>
          </div>
          <div className="playground dark spacing-inline">
            <LinkPure hideLabel={true} href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</LinkPure>
          </div>
          <div className="playground dark spacing-inline">
            <LinkPure size={'medium'} href={'https://designsystem.porsche.com'} theme={'dark'}>Medium</LinkPure>
            <LinkPure size={'inherit'} href={'https://designsystem.porsche.com'} theme={'dark'} style={{ fontSize: '48px' }}>Inherit</LinkPure>
          </div>
          <div className="playground dark spacing-inline">
            <LinkPure weight={'thin'} href={'https://designsystem.porsche.com'} theme={'dark'}>Thin</LinkPure>
            <LinkPure weight={'regular'} href={'https://designsystem.porsche.com'} theme={'dark'}>Regular</LinkPure>
            <LinkPure weight={'bold'} href={'https://designsystem.porsche.com'} theme={'dark'}>Bold</LinkPure>
          </div>
          <div className="playground dark spacing-inline">
            <LinkPure active={true} href={'https://designsystem.porsche.com'} theme={'dark'}>Some label</LinkPure>
          </div>
          <div className="playground dark spacing-inline">
            <LinkPure icon={'phone'} href={'https://designsystem.porsche.com'} theme={'dark'}>Some link with a custom icon</LinkPure>
          </div>
          <div className="playground dark spacing-inline">
            <LinkPure href={'https://designsystem.porsche.com'} theme={'dark'} style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</LinkPure>
          </div>
          <hr/>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>&lt;p-pagination&gt;</Headline>
        </GridItem>
        <GridItem size={5}>
          <div className="playground light spacing-block">
            <Pagination totalItemsCount={500} itemsPerPage={25} activePage={1}/>
          </div>
          <hr/>
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-block">
            <Pagination theme={'dark'} totalItemsCount={500} itemsPerPage={25} activePage={1}/>
          </div>
          <hr/>
        </GridItem>
      </Grid>
    </div>
  );
}
