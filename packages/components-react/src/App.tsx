import React from 'react';
import {
  PGrid,
  PGridItem,
  PFlex,
  PFlexItem,
  PMarque,
  PHeadline,
  PText,
  PButton,
  PButtonPure,
  PSpinner,
  PIcon,
  PPagination,
  PLink,
  PLinkPure,
  PTextareaWrapper
} from '@porsche-design-system/components-react';

const App: React.FC = () => {
  return (
    <div id="app">
      <PText>
        <b id="human-readable-browser-name"></b>
        <br/>
        <span id="system-log"></span>
      </PText>
      <hr/>
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
      <PHeadline variant={'headline-2'}>Form</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size={2}>
          <PHeadline variant={'headline-4'} tag={'h4'}>&lt;p-textarea-wrapper&gt;</PHeadline>
        </PGridItem>
        <PGridItem size={10}>
          <div className="playground light spacing-block">
            <PTextareaWrapper label={'Some label'}><textarea name="some-name"></textarea></PTextareaWrapper>
            <PTextareaWrapper label={'Some label'}><textarea name="some-name" placeholder="Some placeholder text"></textarea></PTextareaWrapper>
            <PTextareaWrapper label={'Some label'} hideLabel={true}><textarea name="some-name"></textarea></PTextareaWrapper>
            <PTextareaWrapper label={'Some label'}><textarea name="some-name" disabled={true}></textarea></PTextareaWrapper>
            <PTextareaWrapper label={'Some label'}><textarea name="some-name" readOnly={true}>Some value</textarea></PTextareaWrapper>
            <PTextareaWrapper label={'Some label'} state={'error'} message={'error message'}><textarea name="some-name"></textarea></PTextareaWrapper>
            <PTextareaWrapper label={'Some label'} state={'success'} message={'success message'}><textarea name="some-name"></textarea></PTextareaWrapper>
            <PTextareaWrapper state={'error'}><span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span><textarea name="some-name">Some value</textarea><span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span></PTextareaWrapper>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
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
};

export default App;
