import React from 'react';
import { PGrid, PGridChild, PFlex, PSpacing, PFlexItem, PHeadline, PText, PButtonRegular, PButtonIcon, PTextLink, PTextList, PTextListItem, PSpinner, PIcon, PPagination } from '@porscheui/ui-kit-react';
import '@porscheui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.css';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="11" offset="1">
          <PHeadline variant="headline-2">Action Elements</PHeadline>
        </PGridChild>
      </PGrid>
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="3" offset="1">
          <PHeadline variant="headline-4">Button Regular</PHeadline>
        </PGridChild>
        <PGridChild size="8">
          <PFlex gap={16} direction={{ base: "column", l: "row" }}>
            <PFlexItem>
              <PButtonRegular onPClick={(e) => console.log(e)}>Button click!</PButtonRegular>
            </PFlexItem>
            <PFlexItem>
              <PButtonRegular variant="ghost" onPClick={(e) => console.log(e)}>Button click!</PButtonRegular>
            </PFlexItem>
            <PFlexItem>
              <PButtonRegular variant="highlight" onPClick={(e) => console.log(e)}>Button click!</PButtonRegular>
            </PFlexItem>
          </PFlex>
        </PGridChild>
      </PGrid>
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="3" offset="1">
          <PHeadline variant="headline-4">Button Icon</PHeadline>
        </PGridChild>
        <PGridChild size="8">
          <PFlex gap={16}>
            <PFlexItem>
              <PButtonIcon onPClick={(e) => console.log(e)}/>
            </PFlexItem>
            <PFlexItem>
              <PButtonIcon variant="ghost" onPClick={(e) => console.log(e)}/>
            </PFlexItem>
            <PFlexItem>
              <PButtonIcon variant="transparent" onPClick={(e) => console.log(e)}/>
            </PFlexItem>
          </PFlex>
        </PGridChild>
      </PGrid>
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="3" offset="1">
          <PHeadline variant="headline-4">Text Link</PHeadline>
        </PGridChild>
        <PGridChild size="8">
          <PFlex gap={16}>
            <PFlexItem>
              <PTextLink onPClick={(e) => console.log(e)}>Text Link</PTextLink>
            </PFlexItem>
            <PFlexItem>
            <PTextLink icon="arrow-left-hair" onPClick={(e) => console.log(e)}>Text Link</PTextLink>
            </PFlexItem>
          </PFlex>
        </PGridChild>
      </PGrid>
      <hr className="p-spacing-mt-32 p-spacing-mb-0" />
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="11" offset="1">
          <PHeadline variant="headline-2">Typography</PHeadline>
        </PGridChild>
      </PGrid>
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="3" offset="1">
          <PHeadline variant="headline-4">Headline</PHeadline>
        </PGridChild>
        <PGridChild size="8">
          <PFlex gap={16}>
            <PFlexItem>
              <PHeadline variant="headline-1">Headline 1</PHeadline>
            </PFlexItem>
          </PFlex>
        </PGridChild>
      </PGrid>
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="3" offset="1">
          <PHeadline variant="headline-4">Text</PHeadline>
        </PGridChild>
        <PGridChild size="8">
          <PFlex gap={16}>
            <PFlexItem>
              <PText variant="copy">Copy Text</PText>
            </PFlexItem>
          </PFlex>
        </PGridChild>
      </PGrid>
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="3" offset="1">
          <PHeadline variant="headline-4">Text sizes</PHeadline>
        </PGridChild>
        <PGridChild size="8">
          <PFlex gap={16}>
            <PFlexItem>
              <PText variant="32">Text size 32</PText>
            </PFlexItem>
          </PFlex>
        </PGridChild>
      </PGrid>
      <hr className="p-spacing-mt-32 p-spacing-mb-0" />
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="11" offset="1">
          <PHeadline variant="headline-2">Content Elements</PHeadline>
        </PGridChild>
      </PGrid>
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="3" offset="1">
          <PHeadline variant="headline-4">Text List (unordered)</PHeadline>
        </PGridChild>
        <PGridChild size="8">
          <PFlex gap={16}>
            <PFlexItem>
              <PTextList>
                <PTextListItem>1st Textlist item</PTextListItem>
                <PTextListItem>2nd Textlist item</PTextListItem>
                <PTextListItem>3rd Textlist item</PTextListItem>
              </PTextList>
            </PFlexItem>
          </PFlex>
        </PGridChild>
      </PGrid>
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="3" offset="1">
          <PHeadline variant="headline-4">Text List (ordered)</PHeadline>
        </PGridChild>
        <PGridChild size="8">
          <PFlex gap={16}>
            <PFlexItem>
              <PTextList listType="ordered">
                <PTextListItem>1st Textlist item</PTextListItem>
                <PTextListItem>2nd Textlist item</PTextListItem>
                <PTextListItem>3rd Textlist item</PTextListItem>
              </PTextList>
            </PFlexItem>
          </PFlex>
        </PGridChild>
      </PGrid>
      <hr className="p-spacing-mt-32 p-spacing-mb-0" />
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="11" offset="1">
          <PHeadline variant="headline-2">Feedback</PHeadline>
        </PGridChild>
      </PGrid>
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="3" offset="1">
          <PHeadline variant="headline-4">Spinner</PHeadline>
        </PGridChild>
        <PGridChild size="8">
          <PFlex gap={16}>
            <PFlexItem>
              <PSpinner size="medium" />
            </PFlexItem>
          </PFlex>
        </PGridChild>
      </PGrid>
      <hr className="p-spacing-mt-32 p-spacing-mb-0" />
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="11" offset="1">
          <PHeadline variant="headline-2">Icon</PHeadline>
        </PGridChild>
      </PGrid>
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="3" offset="1">
          <PHeadline variant="headline-4">Icon</PHeadline>
        </PGridChild>
        <PGridChild size="8">
          <PFlex gap={16}>
            <PFlexItem>
              <PIcon source="kaixin" size="large" />
            </PFlexItem>
          </PFlex>
        </PGridChild>
      </PGrid>
      <hr className="p-spacing-mt-32 p-spacing-mb-0" />
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="11" offset="1">
          <PHeadline variant="headline-2">Navigation</PHeadline>
        </PGridChild>
      </PGrid>
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="3" offset="1">
          <PHeadline variant="headline-4">Pagination</PHeadline>
        </PGridChild>
        <PGridChild size="8">
          <PFlex gap={16}>
            <PFlexItem>
              <PPagination itemsPerPage={20} totalItemsCount={500} onPClick={(e) => console.log(e)} />
            </PFlexItem>
          </PFlex>
        </PGridChild>
      </PGrid>
      <hr className="p-spacing-mt-32 p-spacing-mb-0" />
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="11" offset="1">
          <PHeadline variant="headline-2">Custom Components</PHeadline>
        </PGridChild>
      </PGrid>
      <PGrid class="p-spacing-mt-32">
        <PGridChild size="3" offset="1">
          <PHeadline variant="headline-4">Spacing</PHeadline>
        </PGridChild>
        <PGridChild size="8">
          <PFlex gap={16}>
            <PFlexItem>
              <PSpacing marginTop={24}>
                <PHeadline variant="headline-4">Margin top deferred to children</PHeadline>
              </PSpacing>
              <PSpacing marginTop={24}>
                <PHeadline variant="headline-4">Margin top wrapped with div</PHeadline>
              </PSpacing>
            </PFlexItem>
          </PFlex>
        </PGridChild>
      </PGrid>
    </div>
  );
}

export default App;
