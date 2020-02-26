import React from 'react';
import {
  Grid,
  GridItem,
  Flex,
  FlexItem,
  Marque,
  Headline,
  Text,
  Button,
  ButtonPure,
  Spinner,
  Icon,
  Pagination,
  Link,
  LinkPure
} from '@porsche-design-system/components-react';

const App: React.FC = () => {
  return (
    <div id="app">
      <Text>
        <b id="human-readable-browser-name"></b>
        <br/>
        <span id="system-log"></span>
      </Text>
      <hr/>
      <Headline variant={'headline-2'} tag={'h2'}>Basic</Headline>
      <hr/>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>&lt;p-marque&gt;</Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <Marque/>
            <Marque trademark={false}/>
          </div>
          <hr/>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>&lt;p-headline&gt;</Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <Headline variant={'large-title'}>The quick brown fox jumps over the lazy dog</Headline>
            <Headline variant={'headline-1'}>The quick brown fox jumps over the lazy dog</Headline>
            <Headline variant={'headline-2'}>The quick brown fox jumps over the lazy dog</Headline>
            <Headline variant={'headline-3'}>The quick brown fox jumps over the lazy dog</Headline>
            <Headline variant={'headline-4'}>The quick brown fox jumps over the lazy dog</Headline>
          </div>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={5} offset={2}>
          <div className="playground light spacing-block">
            <Headline variant={'headline-3'} color={'default'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Headline>
            <Headline variant={'headline-3'} color={'inherit'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Headline>
          </div>
          <hr/>
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-block">
            <Headline theme={'dark'} variant={'headline-3'} color={'default'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Headline>
            <Headline theme={'dark'} variant={'headline-3'} color={'inherit'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Headline>
          </div>
          <hr/>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>&lt;p-text&gt;</Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <Text>The quick brown fox jumps over the lazy dog</Text>
            <Text size={'x-small'}>The quick brown fox jumps over the lazy dog</Text>
          </div>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem offset={2} size={5}>
          <div className="playground light spacing-block">
            <Text color={'default'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text color={'brand'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text color={'neutral-contrast-high'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text color={'neutral-contrast-medium'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text color={'neutral-contrast-low'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text color={'notification-success'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text color={'notification-warning'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text color={'notification-error'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text color={'inherit'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
          </div>
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-block">
            <Text theme={'dark'} color={'default'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text theme={'dark'} color={'brand'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text theme={'dark'} color={'neutral-contrast-high'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text theme={'dark'} color={'neutral-contrast-medium'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text theme={'dark'} color={'neutral-contrast-low'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text theme={'dark'} color={'notification-success'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text theme={'dark'} color={'notification-warning'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text theme={'dark'} color={'notification-error'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
            <Text theme={'dark'} color={'inherit'} style={{color: 'deeppink'}}>The quick brown fox jumps over the lazy dog</Text>
          </div>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={10} offset={2}>
          <div className="playground light spacing-block">
            <Text ellipsis={true}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum.
            </Text>
          </div>
          <div className="playground light spacing-block">
            <Text>Lorem ipsum dolor sit amet <a href="https://designsystem.porsche.com">linked text</a> et, <b>bold text</b> &amp; <strong>strong text</strong></Text>
          </div>
          <hr/>
        </GridItem>
      </Grid>
      <Headline variant={'headline-2'}>Action</Headline>
      <hr/>
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
            <Button style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</Button>
          </div>
          <hr/>
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
          <hr/>
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
            <Button theme={'dark'} style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</Button>
          </div>
          <hr/>
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
          <hr/>
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
            <ButtonPure size={'inherit'} style={{ fontSize: '48px' }}>Inherit</ButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <ButtonPure weight={'thin'}>Thin</ButtonPure>
            <ButtonPure weight={'regular'}>Regular</ButtonPure>
            <ButtonPure weight={'bold'}>Bold</ButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <ButtonPure icon={'delete'}>Some button with a custom icon</ButtonPure>
          </div>
          <div className="playground light spacing-inline">
            <ButtonPure style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</ButtonPure>
          </div>
          <hr/>
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
            <ButtonPure size={'inherit'} theme={'dark'} style={{ fontSize: '48px' }}>Inherit</ButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <ButtonPure weight={'thin'} theme={'dark'}>Thin</ButtonPure>
            <ButtonPure weight={'regular'} theme={'dark'}>Regular</ButtonPure>
            <ButtonPure weight={'bold'} theme={'dark'}>Bold</ButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <ButtonPure icon={'delete'} theme={'dark'}>Some button with a custom icon</ButtonPure>
          </div>
          <div className="playground dark spacing-inline">
            <ButtonPure theme={'dark'} style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</ButtonPure>
          </div>
          <hr/>
        </GridItem>
      </Grid>
      <Headline variant={'headline-2'}>Feedback</Headline>
      <hr/>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>&lt;p-spinner&gt;</Headline>
        </GridItem>
        <GridItem size={5}>
          <div className="playground light spacing-inline">
            <Spinner size={'small'}/>
            <Spinner size={'medium'}/>
            <Spinner size={'large'}/>
            <Spinner size={'inherit'} style={{width: '24px'}}/>
          </div>
          <hr/>
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-inline">
            <Spinner theme={'dark'} size={'small'}/>
            <Spinner theme={'dark'} size={'medium'}/>
            <Spinner theme={'dark'} size={'large'}/>
            <Spinner theme={'dark'} size={'inherit'} style={{width: '24px'}}/>
          </div>
          <hr/>
        </GridItem>
      </Grid>
      <Headline variant={'headline-2'}>Icon</Headline>
      <hr/>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>&lt;p-icon&gt;</Headline>
        </GridItem>
        <GridItem size={5}>
          <div className="playground light spacing-inline">
            <Icon name={'filter'} color={'neutral-contrast-high'} aria-label="Filter icon"/>
            <Icon name={'filter'} size={'medium'} color={'neutral-contrast-medium'} aria-label="Filter icon"/>
            <Icon name={'filter'} size={'large'} color={'neutral-contrast-low'} aria-label="Filter icon"/>
            <Icon name={'filter'} size={'large'} color={'brand'} aria-label="Filter icon"/>
            <Icon name={'filter'} size={'large'} color={'inherit'} aria-label="Filter icon" style={{color: 'deeppink'}}/>
            <Icon name={'delete'} size={'large'} aria-label="Delete icon"/>
          </div>
          <hr/>
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-inline">
            <Icon name={'filter'} theme={'dark'} color={'neutral-contrast-high'} aria-label="Filter icon"/>
            <Icon name={'filter'} theme={'dark'} size={'medium'} color={'neutral-contrast-medium'} aria-label="Filter icon"/>
            <Icon name={'filter'} theme={'dark'} size={'large'} color={'neutral-contrast-low'} aria-label="Filter icon"/>
            <Icon name={'filter'} theme={'dark'} size={'large'} color={'brand'} aria-label="Filter icon"/>
            <Icon name={'filter'} theme={'dark'} size={'large'} color={'inherit'} aria-label="Filter icon" style={{color: 'deeppink'}}/>
            <Icon name={'delete'} theme={'dark'} size={'large'} aria-label="Delete icon"/>
          </div>
          <hr/>
        </GridItem>
      </Grid>
      <Headline variant={'headline-2'}>Layout</Headline>
      <hr/>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>
            &lt;p-grid&gt;<br/>
            &lt;p-grid-item&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <Grid>
              <GridItem size={12}/>
            </Grid>
            <Grid>
              <GridItem size={1}/>
              <GridItem size={11}/>
            </Grid>
            <Grid>
              <GridItem size={2}/>
              <GridItem size={10}/>
            </Grid>
            <Grid>
              <GridItem size={3}/>
              <GridItem size={9}/>
            </Grid>
            <Grid>
              <GridItem size={4}/>
              <GridItem size={8}/>
            </Grid>
            <Grid>
              <GridItem size={5}/>
              <GridItem size={7}/>
            </Grid>
            <Grid>
              <GridItem size={6}/>
              <GridItem size={6}/>
            </Grid>
            <Grid>
              <GridItem size={7}/>
              <GridItem size={5}/>
            </Grid>
            <Grid>
              <GridItem size={8}/>
              <GridItem size={4}/>
            </Grid>
            <Grid>
              <GridItem size={9}/>
              <GridItem size={3}/>
            </Grid>
            <Grid>
              <GridItem size={10}/>
              <GridItem size={2}/>
            </Grid>
            <Grid>
              <GridItem size={11}/>
              <GridItem size={1}/>
            </Grid>
          </div>
          <div className="playground light spacing-block">
            <Grid>
              <GridItem offset={1} size={11}/>
            </Grid>
            <Grid>
              <GridItem offset={2} size={10}/>
            </Grid>
            <Grid>
              <GridItem offset={3} size={9}/>
            </Grid>
            <Grid>
              <GridItem offset={4} size={8}/>
            </Grid>
            <Grid>
              <GridItem offset={5} size={7}/>
            </Grid>
            <Grid>
              <GridItem offset={6} size={6}/>
            </Grid>
            <Grid>
              <GridItem offset={7} size={5}/>
            </Grid>
            <Grid>
              <GridItem offset={8} size={4}/>
            </Grid>
            <Grid>
              <GridItem offset={9} size={3}/>
            </Grid>
            <Grid>
              <GridItem offset={10} size={2}/>
            </Grid>
            <Grid>
              <GridItem offset={11} size={1}/>
            </Grid>
          </div>
          <hr/>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>
            &lt;p-flex&gt;<br/>
            &lt;p-flex-item&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <Flex>
              <FlexItem width={'full'}/>
            </Flex>
            <Flex>
              <FlexItem offset={'one-quarter'} width={'three-quarters'}/>
            </Flex>
            <Flex>
              <FlexItem offset={'one-third'} width={'two-thirds'}/>
            </Flex>
            <Flex>
              <FlexItem offset={'half'} width={'half'}/>
            </Flex>
            <Flex>
              <FlexItem offset={'two-thirds'} width={'one-third'}/>
            </Flex>
            <Flex>
              <FlexItem offset={'three-quarters'} width={'one-quarter'}/>
            </Flex>
          </div>
          <hr/>
        </GridItem>
      </Grid>
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
};

export default App;
