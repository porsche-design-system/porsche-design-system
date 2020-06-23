import {
  PButton as Button,
  PButtonPure as ButtonPure,
  PGrid as Grid,
  PGridItem as GridItem,
  PHeadline as Headline,
  PDivider as Divider,
} from '@porsche-design-system/components-react';
import React from 'react';

export function Action() {
  return (
    <div>
      <Headline variant={'headline-2'}>Action</Headline>
      <Divider/>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>&lt;p-button&gt;</Headline>
        </GridItem>
        <GridItem size={5}>
          <div className="playground light spacing-inline">
            <Button variant={'primary'}>Some label</Button>
            <Button variant={'primary'} disabled={true}>Some label</Button>
            <Button variant={'primary'} loading={true}>Some label</Button>
          </div>
          <div className="playground light spacing-inline">
            <Button>Some label</Button>
            <Button disabled={true}>Some label</Button>
            <Button loading={true}>Some label</Button>
          </div>
          <div className="playground light spacing-inline">
            <Button variant={'tertiary'}>Some label</Button>
            <Button variant={'tertiary'} disabled={true}>Some label</Button>
            <Button variant={'tertiary'} loading={true}>Some label</Button>
          </div>
          <div className="playground light spacing-inline">
            <Button icon={'phone'}>Some label</Button>
          </div>
          <div className="playground light spacing-inline">
            <Button style={{width: '240px'}}>Lorem ipsum dolor sit amet, consetetur sadipscing</Button>
          </div>
          <Divider/>
          <div className="playground light spacing-inline">
            <Button variant={'primary'} hideLabel={true}>Some label</Button>
            <Button variant={'primary'} hideLabel={true} disabled={true}>Some label</Button>
            <Button variant={'primary'} hideLabel={true} loading={true}>Some label</Button>
          </div>
          <div className="playground light spacing-inline">
            <Button hideLabel={true}>Some label</Button>
            <Button disabled={true} hideLabel={true}>Some label</Button>
            <Button loading={true} hideLabel={true}>Some label</Button>
          </div>
          <div className="playground light spacing-inline">
            <Button variant={'tertiary'} hideLabel={true}>Some label</Button>
            <Button variant={'tertiary'} hideLabel={true} disabled={true}>Some label</Button>
            <Button variant={'tertiary'} hideLabel={true} loading={true}>Some label</Button>
          </div>
          <div className="playground light spacing-inline">
            <Button icon={'phone'} hideLabel={true}>Some label</Button>
          </div>
          <Divider/>
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-inline">
            <Button variant={'primary'} theme={'dark'}>Some label</Button>
            <Button variant={'primary'} theme={'dark'} disabled={true}>Some label</Button>
            <Button variant={'primary'} theme={'dark'} loading={true}>Some label</Button>
          </div>
          <div className="playground dark spacing-inline">
            <Button theme={'dark'}>Some label</Button>
            <Button theme={'dark'} disabled={true}>Some label</Button>
            <Button theme={'dark'} loading={true}>Some label</Button>
          </div>
          <div className="playground dark spacing-inline">
            <Button theme={'dark'} variant={'tertiary'}>Some label</Button>
            <Button theme={'dark'} variant={'tertiary'} disabled={true}>Some label</Button>
            <Button theme={'dark'} variant={'tertiary'} loading={true}>Some label</Button>
          </div>
          <div className="playground dark spacing-inline">
            <Button theme={'dark'} icon={'phone'}>Some label</Button>
          </div>
          <div className="playground dark spacing-inline">
            <Button theme={'dark'} style={{width: '240px'}}>Lorem ipsum dolor sit amet, consetetur sadipscing</Button>
          </div>
          <Divider/>
          <div className="playground dark spacing-inline">
            <Button variant={'primary'} hideLabel={true} theme={'dark'}>Some label</Button>
            <Button variant={'primary'} hideLabel={true} theme={'dark'} disabled={true}>Some label</Button>
            <Button variant={'primary'} hideLabel={true} theme={'dark'} loading={true}>Some label</Button>
          </div>
          <div className="playground dark spacing-inline">
            <Button theme={'dark'} hideLabel={true}>Some label</Button>
            <Button theme={'dark'} hideLabel={true} disabled={true}>Some label</Button>
            <Button theme={'dark'} hideLabel={true} loading={true}>Some label</Button>
          </div>
          <div className="playground dark spacing-inline">
            <Button theme={'dark'} hideLabel={true} variant={'tertiary'}>Some label</Button>
            <Button theme={'dark'} hideLabel={true} variant={'tertiary'} disabled={true}>Some label</Button>
            <Button theme={'dark'} hideLabel={true} variant={'tertiary'} loading={true}>Some label</Button>
          </div>
          <div className="playground dark spacing-inline">
            <Button theme={'dark'} hideLabel={true} icon={'phone'}>Some label</Button>
          </div>
          <Divider/>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>&lt;p-button-pure&gt;</Headline>
        </GridItem>
        <GridItem size={5}>
          <div className="playground light spacing-inline">
            <ButtonPure>Some label</ButtonPure>
            <ButtonPure disabled={true}>Some label</ButtonPure>
            <ButtonPure loading={true}>Some label</ButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <ButtonPure hideLabel={true}>Some label</ButtonPure>
            <ButtonPure hideLabel={true} disabled={true}>Some label</ButtonPure>
            <ButtonPure hideLabel={true} loading={true}>Some label</ButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <ButtonPure size={'medium'}>Medium</ButtonPure>
            <ButtonPure size={'inherit'} style={{fontSize: '48px'}}>Inherit</ButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <ButtonPure weight={'thin'}>Thin</ButtonPure>
            <ButtonPure weight={'regular'}>Regular</ButtonPure>
            <ButtonPure weight={'semibold'}>Semibold</ButtonPure>
            <ButtonPure weight={'bold'}>Bold</ButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <ButtonPure icon={'delete'}>Some button with a custom icon</ButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <ButtonPure style={{width: '240px'}}>Lorem ipsum dolor sit amet, consetetur sadipscing</ButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <ButtonPure weight={'semibold'} size={'medium'}>
              Some Label
              <p slot="subline">Some Subline</p>
            </ButtonPure>
            <ButtonPure weight={'semibold'} size={'medium'} disabled={true}>
              Some Label
              <p slot="subline">Some Subline</p>
            </ButtonPure>
          </div>
          <Divider/>
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-inline">
            <ButtonPure theme={'dark'}>Some label</ButtonPure>
            <ButtonPure disabled={true} theme={'dark'}>Some label</ButtonPure>
            <ButtonPure loading={true} theme={'dark'}>Some label</ButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <ButtonPure hideLabel={true} theme={'dark'}>Some label</ButtonPure>
            <ButtonPure hideLabel={true} disabled={true} theme={'dark'}>Some label</ButtonPure>
            <ButtonPure hideLabel={true} loading={true} theme={'dark'}>Some label</ButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <ButtonPure size={'medium'} theme={'dark'}>Medium</ButtonPure>
            <ButtonPure size={'inherit'} theme={'dark'} style={{fontSize: '48px'}}>Inherit</ButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <ButtonPure weight={'thin'} theme={'dark'}>Thin</ButtonPure>
            <ButtonPure weight={'regular'} theme={'dark'}>Regular</ButtonPure>
            <ButtonPure weight={'semibold'} theme={'dark'}>Semibold</ButtonPure>
            <ButtonPure weight={'bold'} theme={'dark'}>Bold</ButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <ButtonPure icon={'delete'} theme={'dark'}>Some button with a custom icon</ButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <ButtonPure theme={'dark'} style={{width: '240px'}}>Lorem ipsum dolor sit amet, consetetur
              sadipscing</ButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <ButtonPure theme={'dark'} weight={'semibold'} size={'medium'}>
              Some Label
              <p slot="subline">Some Subline</p>
            </ButtonPure>
            <ButtonPure theme={'dark'} weight={'semibold'} size={'medium'} disabled={true}>
              Some Label
              <p slot="subline">Some Subline</p>
            </ButtonPure>
          </div>
          <Divider/>
        </GridItem>
      </Grid>
    </div>
  );
}
