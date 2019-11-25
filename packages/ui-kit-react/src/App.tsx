import React from 'react';
import {
  PGrid,
  PGridItem,
  PFlex,
  PFlexItem,
  PMarque,
  PHeadline,
  PText,
  PButtonRegular,
  PButtonIcon,
  PTextLink,
  PTextList,
  PTextListItem,
  PSpinner,
  PIcon,
  PPagination
} from '@porsche-ui/ui-kit-react';

const App: React.FC = () => {
  return (
    <div id="app">
      <PText>
        <b id="human-readable-browser-name"></b>
        <br/>
        <span id="system-log"></span>
      </PText>
      <hr/>
      <PHeadline variant="headline-2" tag="h2">Basic</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size="2">
          <PHeadline variant="headline-4" tag="h4">&lt;p-marque&gt;</PHeadline>
        </PGridItem>
        <PGridItem size="10">
          <div className="playground light spacing-block">
            <PMarque />
            <PMarque trademark={false} />
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem size="2">
          <PHeadline variant="headline-4" tag="h4">&lt;p-headline&gt;</PHeadline>
        </PGridItem>
        <PGridItem size="10">
          <div className="playground light spacing-block">
            <PHeadline variant="large-title" tag="h1">The quick brown fox jumps over the lazy dog</PHeadline>
            <PHeadline variant="headline-1" tag="h1">The quick brown fox jumps over the lazy dog</PHeadline>
            <PHeadline variant="headline-2" tag="h2">The quick brown fox jumps over the lazy dog</PHeadline>
            <PHeadline variant="headline-3" tag="h3">The quick brown fox jumps over the lazy dog</PHeadline>
            <PHeadline variant="headline-4" tag="h4">The quick brown fox jumps over the lazy dog</PHeadline>
            <PHeadline variant="headline-5" tag="h5">The quick brown fox jumps over the lazy dog</PHeadline>
            <PHeadline variant="headline-6" tag="h6">The quick brown fox jumps over the lazy dog</PHeadline>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem size="2">
          <PHeadline variant="headline-4" tag="h4">&lt;p-text&gt;</PHeadline>
        </PGridItem>
        <PGridItem size="10">
          <div className="playground light spacing-block">
            <PText>The quick brown fox jumps over the lazy dog</PText>
            <PText size="x-small">The quick brown fox jumps over the lazy dog</PText>
          </div>
          <div className="playground light spacing-block">
            <PText color="porsche-black">Porsche Black</PText>
            <PText color="porsche-light" style={{background: 'black', display: 'block'}}>Porsche Light</PText>
            <PText color="inherit" style={{color: 'deeppink'}}>Inherited custom color</PText>
          </div>
          <div className="playground light spacing-block">
            <PText ellipsis={true}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum.
            </PText>
          </div>
          <div className="playground light spacing-block">
            <PText>Lorem ipsum dolor sit amet <a href="https://ui.porsche.com">linked text</a> et, <b>bold text</b> &amp; <strong>strong
              text</strong></PText>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PHeadline variant="headline-2">Action</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size="2">
          <PHeadline variant="headline-4" tag="h4">&lt;p-button-regular&gt;</PHeadline>
        </PGridItem>
        <PGridItem size="5">
          <div className="playground light spacing-inline">
            <PButtonRegular variant="highlight">Some label</PButtonRegular>
            <PButtonRegular variant="highlight" disabled={true}>Some label</PButtonRegular>
            <PButtonRegular variant="highlight" loading={true}>Some label</PButtonRegular>
          </div>
          <div className="playground light spacing-inline">
            <PButtonRegular>Some label</PButtonRegular>
            <PButtonRegular disabled={true}>Some label</PButtonRegular>
            <PButtonRegular loading={true}>Some label</PButtonRegular>
          </div>
          <div className="playground light spacing-inline">
            <PButtonRegular variant="ghost">Some label</PButtonRegular>
            <PButtonRegular variant="ghost" disabled={true}>Some label</PButtonRegular>
            <PButtonRegular variant="ghost" loading={true}>Some label</PButtonRegular>
          </div>
          <div className="playground light spacing-inline">
            <PButtonRegular icon="phone">Some label</PButtonRegular>
          </div>
          <div className="playground light spacing-inline">
            <PButtonRegular small={true}>Some label</PButtonRegular>
            <PButtonRegular small={true} variant="ghost">Some label</PButtonRegular>
            <PButtonRegular small={true} variant="highlight">Some label</PButtonRegular>
          </div>
          <hr/>
        </PGridItem>
        <PGridItem size="5">
          <div className="playground dark spacing-inline">
            <PButtonRegular theme="dark" variant="highlight">Some label</PButtonRegular>
            <PButtonRegular theme="dark" variant="highlight" disabled={true}>Some label</PButtonRegular>
            <PButtonRegular theme="dark" variant="highlight" loading={true}>Some label</PButtonRegular>
          </div>
          <div className="playground dark spacing-inline">
            <PButtonRegular theme="dark">Some label</PButtonRegular>
            <PButtonRegular theme="dark" disabled={true}>Some label</PButtonRegular>
            <PButtonRegular theme="dark" loading={true}>Some label</PButtonRegular>
          </div>
          <div className="playground dark spacing-inline">
            <PButtonRegular theme="dark" variant="ghost">Some label</PButtonRegular>
            <PButtonRegular theme="dark" variant="ghost" disabled={true}>Some label</PButtonRegular>
            <PButtonRegular theme="dark" variant="ghost" loading={true}>Some label</PButtonRegular>
          </div>
          <div className="playground dark spacing-inline">
            <PButtonRegular theme="dark" icon="phone">Some label</PButtonRegular>
          </div>
          <div className="playground dark spacing-inline">
            <PButtonRegular theme="dark" small={true}>Some label</PButtonRegular>
            <PButtonRegular theme="dark" small={true} variant="ghost">Some label</PButtonRegular>
            <PButtonRegular theme="dark" small={true} variant="highlight">Some label</PButtonRegular>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem size="2">
          <PHeadline variant="headline-4" tag="h4">&lt;p-button-icon&gt;</PHeadline>
        </PGridItem>
        <PGridItem size="5">
          <div className="playground light spacing-inline">
            <PButtonIcon/>
            <PButtonIcon disabled={true}/>
            <PButtonIcon loading={true}/>
          </div>
          <div className="playground light spacing-inline">
            <PButtonIcon variant="ghost"/>
            <PButtonIcon variant="ghost" disabled={true}/>
            <PButtonIcon variant="ghost" loading={true}/>
          </div>
          <div className="playground light spacing-inline">
            <PButtonIcon variant="transparent"/>
            <PButtonIcon variant="transparent" disabled={true}/>
            <PButtonIcon variant="transparent" loading={true}/>
          </div>
          <div className="playground light spacing-inline">
            <PButtonIcon icon="phone"/>
          </div>
          <hr/>
        </PGridItem>
        <PGridItem size="5">
          <div className="playground dark spacing-inline">
            <PButtonIcon theme="dark"/>
            <PButtonIcon theme="dark" disabled={true}/>
            <PButtonIcon theme="dark" loading={true}/>
          </div>
          <div className="playground dark spacing-inline">
            <PButtonIcon theme="dark" variant="ghost"/>
            <PButtonIcon theme="dark" variant="ghost" disabled={true}/>
            <PButtonIcon theme="dark" variant="ghost" loading={true}/>
          </div>
          <div className="playground dark spacing-inline">
            <PButtonIcon theme="dark" variant="transparent"/>
            <PButtonIcon theme="dark" variant="transparent" disabled={true}/>
            <PButtonIcon theme="dark" variant="transparent" loading={true}/>
          </div>
          <div className="playground dark spacing-inline">
            <PButtonIcon theme="dark" icon="phone"/>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem size="2">
          <PHeadline variant="headline-4" tag="h4">&lt;p-text-link&gt;</PHeadline>
        </PGridItem>
        <PGridItem size="10">
          <div className="playground light spacing-inline">
            <PTextLink href="https://ui.porsche.com">Some link with default icon</PTextLink>
          </div>
          <div className="playground light spacing-inline">
            <PTextLink href="https://ui.porsche.com" color="porsche-black">Porsche Black</PTextLink>
            <PTextLink href="https://ui.porsche.com" color="porsche-light" style={{background: 'black'}}>Porsche
              Light
            </PTextLink>
            <PTextLink href="https://ui.porsche.com" color="inherit" style={{color: 'deeppink'}}>Inherited custom
              color
            </PTextLink>
          </div>
          <div className="playground light spacing-inline">
            <PTextLink href="https://ui.porsche.com" icon="delete">Some link with a custom icon</PTextLink>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PHeadline variant="headline-2">Content</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size="2">
          <PHeadline variant="headline-4" tag="h4">
            &lt;p-text-list&gt;<br/>
            &lt;p-text-list-item&gt;
          </PHeadline>
        </PGridItem>
        <PGridItem size="5">
          <div className="playground light spacing-block">
            <PTextList>
              <PTextListItem>First level - Lorem ipsum dolor sit amet</PTextListItem>
              <PTextListItem>
                Lorem ipsum dolor sit amet <a href="https://ui.porsche.com">linked text</a> et, <b>bold text</b> &amp; <strong>strong
                text</strong>
                <PTextList>
                  <PTextListItem>Second level - Lorem ipsum dolor sit amet</PTextListItem>
                  <PTextListItem>Lorem ipsum</PTextListItem>
                </PTextList>
              </PTextListItem>
              <PTextListItem>First level - Lorem ipsum dolor sit amet</PTextListItem>
            </PTextList>
          </div>
          <div className="playground light spacing-block">
            <PTextList listType="ordered">
              <PTextListItem>First level - Lorem ipsum dolor sit amet</PTextListItem>
              <PTextListItem>
                Lorem ipsum dolor sit amet <a href="https://ui.porsche.com">linked text</a> et, <b>bold text</b> &amp; <strong>strong
                text</strong>
                <PTextList listType="ordered">
                  <PTextListItem>Second level - Lorem ipsum dolor sit amet</PTextListItem>
                  <PTextListItem>Lorem ipsum</PTextListItem>
                </PTextList>
              </PTextListItem>
              <PTextListItem>First level - Lorem ipsum dolor sit amet</PTextListItem>
            </PTextList>
          </div>
          <hr/>
        </PGridItem>
        <PGridItem size="5">
          <div className="playground dark spacing-block">
            <PTextList color="porsche-light">
              <PTextListItem>First level - Lorem ipsum dolor sit amet</PTextListItem>
              <PTextListItem>
                Lorem ipsum dolor sit amet <a href="https://ui.porsche.com">linked text</a> et, <b>bold text</b> &amp; <strong>strong
                text</strong>
                <PTextList>
                  <PTextListItem>Second level - Lorem ipsum dolor sit amet</PTextListItem>
                  <PTextListItem>Lorem ipsum</PTextListItem>
                </PTextList>
              </PTextListItem>
              <PTextListItem>First level - Lorem ipsum dolor sit amet</PTextListItem>
            </PTextList>
          </div>
          <div className="playground dark spacing-block">
            <PTextList listType="ordered" color="inherit" style={{color: 'deeppink'}}>
              <PTextListItem>First level - Lorem ipsum dolor sit amet</PTextListItem>
              <PTextListItem>
                Lorem ipsum dolor sit amet <a href="https://ui.porsche.com">linked text</a> et, <b>bold text</b> &amp; <strong>strong
                text</strong>
                <PTextList>
                  <PTextListItem>Second level - Lorem ipsum dolor sit amet</PTextListItem>
                  <PTextListItem>Lorem ipsum</PTextListItem>
                </PTextList>
              </PTextListItem>
              <PTextListItem>First level - Lorem ipsum dolor sit amet</PTextListItem>
            </PTextList>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PHeadline variant="headline-2">Feedback</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size="2">
          <PHeadline variant="headline-4" tag="h4">&lt;p-spinner&gt;</PHeadline>
        </PGridItem>
        <PGridItem size="5">
          <div className="playground light spacing-inline">
            <PSpinner size="x-small" allyLabel="Loading"/>
            <PSpinner size="small" allyLabel="Loading"/>
            <PSpinner size="medium" allyLabel="Loading"/>
            <PSpinner size="large" allyLabel="Loading"/>
          </div>
          <hr/>
        </PGridItem>
        <PGridItem size="5">
          <div className="playground dark spacing-inline">
            <PSpinner theme="dark" size="x-small" allyLabel="Loading"/>
            <PSpinner theme="dark" size="small" allyLabel="Loading"/>
            <PSpinner theme="dark" size="medium" allyLabel="Loading"/>
            <PSpinner theme="dark" size="large" allyLabel="Loading"/>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PHeadline variant="headline-2">Icon</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size="2">
          <PHeadline variant="headline-4" tag="h4">&lt;p-icon&gt;</PHeadline>
        </PGridItem>
        <PGridItem size="10">
          <div className="playground light spacing-inline">
            <PIcon name="car-next" aria-label="Car icon"/>
            <PIcon name="car-next" size="medium" aria-label="Car icon"/>
            <PIcon name="car-next" size="large" aria-label="Car icon"/>
            <PIcon name="car-next" size="large" color="porsche-red" aria-label="Car icon"/>
            <PIcon name="car-next" size="large" color="inherit" aria-label="Car icon" style={{color: 'deeppink'}}/>
            <PIcon name="kaixin" size="large" aria-label="Kaixin icon"/>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PHeadline variant="headline-2">Layout</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size="2">
          <PHeadline variant="headline-4" tag="h4">
            &lt;p-grid&gt;<br/>
            &lt;p-grid-item&gt;
          </PHeadline>
        </PGridItem>
        <PGridItem size="10">
          <div className="playground light spacing-block">
            <PGrid>
              <PGridItem size="12"/>
            </PGrid>
            <PGrid>
              <PGridItem size="1"/>
              <PGridItem size="11"/>
            </PGrid>
            <PGrid>
              <PGridItem size="2"/>
              <PGridItem size="10"/>
            </PGrid>
            <PGrid>
              <PGridItem size="3"/>
              <PGridItem size="9"/>
            </PGrid>
            <PGrid>
              <PGridItem size="4"/>
              <PGridItem size="8"/>
            </PGrid>
            <PGrid>
              <PGridItem size="5"/>
              <PGridItem size="7"/>
            </PGrid>
            <PGrid>
              <PGridItem size="6"/>
              <PGridItem size="6"/>
            </PGrid>
            <PGrid>
              <PGridItem size="7"/>
              <PGridItem size="5"/>
            </PGrid>
            <PGrid>
              <PGridItem size="8"/>
              <PGridItem size="4"/>
            </PGrid>
            <PGrid>
              <PGridItem size="9"/>
              <PGridItem size="3"/>
            </PGrid>
            <PGrid>
              <PGridItem size="10"/>
              <PGridItem size="2"/>
            </PGrid>
            <PGrid>
              <PGridItem size="11"/>
              <PGridItem size="1"/>
            </PGrid>
          </div>
          <div className="playground light spacing-block">
            <PGrid>
              <PGridItem offset="1" size="11"/>
            </PGrid>
            <PGrid>
              <PGridItem offset="2" size="10"/>
            </PGrid>
            <PGrid>
              <PGridItem offset="3" size="9"/>
            </PGrid>
            <PGrid>
              <PGridItem offset="4" size="8"/>
            </PGrid>
            <PGrid>
              <PGridItem offset="5" size="7"/>
            </PGrid>
            <PGrid>
              <PGridItem offset="6" size="6"/>
            </PGrid>
            <PGrid>
              <PGridItem offset="7" size="5"/>
            </PGrid>
            <PGrid>
              <PGridItem offset="8" size="4"/>
            </PGrid>
            <PGrid>
              <PGridItem offset="9" size="3"/>
            </PGrid>
            <PGrid>
              <PGridItem offset="10" size="2"/>
            </PGrid>
            <PGrid>
              <PGridItem offset="11" size="1"/>
            </PGrid>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PGrid>
        <PGridItem size="2">
          <PHeadline variant="headline-4" tag="h4">
            &lt;p-flex&gt;<br/>
            &lt;p-flex-item&gt;
          </PHeadline>
        </PGridItem>
        <PGridItem size="10">
          <div className="playground light spacing-block">
            <PFlex>
              <PFlexItem width="one-quarter"/>
              <PFlexItem width="one-quarter"/>
              <PFlexItem width="one-quarter"/>
              <PFlexItem width="one-quarter"/>
            </PFlex>
            <PFlex>
              <PFlexItem width="one-third"/>
              <PFlexItem width="one-third"/>
              <PFlexItem width="one-third"/>
            </PFlex>
            <PFlex>
              <PFlexItem width="half"/>
              <PFlexItem width="half"/>
            </PFlex>
            <PFlex>
              <PFlexItem width="two-thirds"/>
              <PFlexItem width="one-third"/>
            </PFlex>
            <PFlex>
              <PFlexItem width="three-quarters"/>
              <PFlexItem width="one-quarter"/>
            </PFlex>
            <PFlex>
              <PFlexItem width="full"/>
            </PFlex>
          </div>
          <div className="playground light spacing-block">
            <PFlex>
              <PFlexItem offset="one-quarter" width="three-quarters"/>
            </PFlex>
            <PFlex>
              <PFlexItem offset="one-third" width="two-thirds"/>
            </PFlex>
            <PFlex>
              <PFlexItem offset="half" width="half"/>
            </PFlex>
            <PFlex>
              <PFlexItem offset="two-thirds" width="one-third"/>
            </PFlex>
            <PFlex>
              <PFlexItem offset="three-quarters" width="one-quarter"/>
            </PFlex>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
      <PHeadline variant="headline-2">Navigation</PHeadline>
      <hr/>
      <PGrid>
        <PGridItem size="2">
          <PHeadline variant="headline-4" tag="h4">&lt;p-pagination&gt;</PHeadline>
        </PGridItem>
        <PGridItem size="5">
          <div className="playground light spacing-block">
            <PPagination totalItemsCount={500} itemsPerPage={25} activePage={1}/>
          </div>
          <hr/>
        </PGridItem>
        <PGridItem size="5">
          <div className="playground dark spacing-block">
            <PPagination theme="dark" totalItemsCount={500} itemsPerPage={25} activePage={1}/>
          </div>
          <hr/>
        </PGridItem>
      </PGrid>
    </div>
  );
};

export default App;
