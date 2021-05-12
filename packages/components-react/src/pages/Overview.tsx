import {
  PBanner,
  PButton,
  PButtonGroup,
  PButtonPure,
  PHeadline,
  PText,
  PDivider,
  PIcon,
  PCheckboxWrapper,
  PRadioButtonWrapper,
  PSelectWrapper,
  PTextFieldWrapper,
  PTextareaWrapper,
  PFieldsetWrapper,
  PContentWrapper,
  PGrid,
  PGridItem,
  PFlex,
  PFlexItem,
  PTabs,
  PTabsItem,
  PTabsBar,
  PTextList,
  PTextListItem,
  PSpinner,
  PMarque,
  PPagination,
  PLink,
  PLinkPure,
  PLinkSocial,
  PorscheDesignSystemProvider,
  componentsReady,
} from '@porsche-design-system/components-react';
import { useEffect, useState } from 'react';

export const OverviewPage = (): JSX.Element => {
  // solve race-condition between non-prefixed and prefixed banner focus
  const [allReady, setAllReady] = useState(false);

  useEffect(() => {
    componentsReady().then(() => {
      setAllReady(true);
    });
  }, []);

  const prefix = 'my-prefix';
  const style = `
    p-flex-item > p,
    ${prefix}-p-flex-item > p,
    p-grid-item > p,
    ${prefix}-p-grid-item > p,
    p-content-wrapper > p,
    ${prefix}-p-content-wrapper > p {
      margin: 0;
      padding: 4px 2vw;
      text-align: center;
      color: white;
      background-color: lightskyblue;
    }

    p-flex-item:nth-child(1n) > p,
    ${prefix}-p-flex-item:nth-child(1n) > p,
    p-grid-item:nth-child(1n) > p,
    ${prefix}-p-grid-item:nth-child(1n) > p {
      background-color: skyblue;
    }

    p-flex-item:nth-child(2n) > p,
    ${prefix}-p-flex-item:nth-child(2n) > p,
    p-grid-item:nth-child(2n) > p,
    ${prefix}-p-grid-item:nth-child(2n) > p {
      background-color: deepskyblue;
    }

    p-banner,
    ${prefix}-p-banner {
      --p-banner-position-type: static;
    }
  `;

  return (
    <div>
      <style children={style} />

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <div className="playground light" title="should render default headline">
            <PHeadline>Default Components</PHeadline>
          </div>

          <div className="playground light" title="should render headline for variant large">
            <PHeadline variant={{ base: 'large', l: 'x-large' }}>Default Components</PHeadline>
          </div>

          <div className="playground light" title="should render default banner">
            <PBanner>
              <span slot="title">Some banner title</span>
              <span slot="description">Some banner description.</span>
            </PBanner>
          </div>

          <div className="playground light" title="should render default divider">
            <PDivider />
          </div>

          <div className="playground light" title="should render default button">
            <PButton>Some label</PButton>
          </div>

          <div className="playground light" title="should render default button-group">
            <PButtonGroup>
              <PButton>Some label</PButton>
              <PButton>Some label</PButton>
            </PButtonGroup>
          </div>

          <div className="playground light" title="should render default button-pure">
            <PButtonPure>Some label</PButtonPure>
          </div>

          <div className="playground light" title="should render default checkbox-wrapper">
            <PCheckboxWrapper label="Some label">
              <input type="checkbox" />
            </PCheckboxWrapper>
          </div>

          <div className="playground light" title="should render default radio-button-wrapper">
            <PRadioButtonWrapper label="Some label">
              <input type="radio" />
            </PRadioButtonWrapper>
          </div>

          <div className="playground light" title="should render default select-wrapper">
            <PSelectWrapper label="Some label">
              <select>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </PSelectWrapper>
          </div>

          <div className="playground light" title="should render default text-field-wrapper">
            <PTextFieldWrapper label="Some label">
              <input type="text" />
            </PTextFieldWrapper>
          </div>

          <div className="playground light" title="should render default textarea-wrapper">
            <PTextareaWrapper label="Some label">
              <textarea />
            </PTextareaWrapper>
          </div>

          <div className="playground light" title="should render default fieldset-wrapper">
            <PFieldsetWrapper label="Some label"></PFieldsetWrapper>
          </div>

          <div className="playground light" title="should render default content-wrapper">
            <PContentWrapper>
              <p>Some content</p>
            </PContentWrapper>
          </div>

          <div className="playground light" title="should render default text">
            <PText>The quick brown fox jumps over the lazy dog</PText>
          </div>

          <div className="playground light" title="should render default text-list">
            <PTextList>
              <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
            </PTextList>
          </div>

          <div className="playground light" title="should render default icon">
            <PIcon />
          </div>

          <div className="playground light" title="should render default link">
            <PLink href="https://www.porsche.com">Some label</PLink>
          </div>

          <div className="playground light" title="should render default link-pure">
            <PLinkPure href="https://www.porsche.com">Some label</PLinkPure>
          </div>

          <div className="playground light" title="should render default link-social">
            <PLinkSocial href="https://www.porsche.com" icon="logo-facebook">
              Some label
            </PLinkSocial>
          </div>

          <div className="playground light" title="should render default marque">
            <PMarque />
          </div>

          <div className="playground light" title="should render default pagination">
            <PPagination totalItemsCount={500} itemsPerPage={25} activePage={1} />
          </div>

          <div className="playground light" title="should render default tabs">
            <PTabs>
              <PTabsItem label="Tab1">Content 1</PTabsItem>
              <PTabsItem label="Tab2">Content 2</PTabsItem>
              <PTabsItem label="Tab3">Content 3</PTabsItem>
            </PTabs>
          </div>

          <div className="playground light" title="should render default tabs-bar">
            <PTabsBar activeTabIndex={0}>
              <button>Tab1</button>
              <button>Tab2</button>
              <button>Tab3</button>
            </PTabsBar>
          </div>

          <div className="playground light" title="should render default spinner">
            <PSpinner />
          </div>

          <div className="playground light" title="should render default flex">
            <PFlex>
              <PFlexItem>
                <p>1</p>
              </PFlexItem>
              <PFlexItem>
                <p>2</p>
              </PFlexItem>
            </PFlex>
          </div>

          <div className="playground light" title="should render default grid">
            <PGrid>
              <PGridItem size={6}>
                <p>1</p>
              </PGridItem>
              <PGridItem size={6}>
                <p>2</p>
              </PGridItem>
            </PGrid>
          </div>
        </div>

        <PorscheDesignSystemProvider prefix={prefix}>
          <div style={{ flex: 1 }}>
            <div className="playground light" title="should render default headline with custom prefix">
              <PHeadline>Prefixed Components</PHeadline>
            </div>

            <div className="playground light" title="should render headline for variant large with custom prefix">
              <PHeadline variant={{ base: 'large', l: 'x-large' }}>Prefixed Components</PHeadline>
            </div>

            <div className="playground light" title="should render default banner with custom prefix">
              {allReady && (
                <PBanner>
                  <span slot="title">Some banner title</span>
                  <span slot="description">Some banner description.</span>
                </PBanner>
              )}
            </div>

            <div className="playground light" title="should render default divider with custom prefix">
              <PDivider />
            </div>

            <div className="playground light" title="should render default button with custom prefix">
              <PButton>Some label</PButton>
            </div>

            <div className="playground light" title="should render default button-group with custom prefix">
              <PButtonGroup>
                <PButton>Some label</PButton>
                <PButton>Some label</PButton>
              </PButtonGroup>
            </div>

            <div className="playground light" title="should render default button-pure with custom prefix">
              <PButtonPure>Some label</PButtonPure>
            </div>

            <div className="playground light" title="should render default checkbox-wrapper with custom prefix">
              <PCheckboxWrapper label="Some label">
                <input type="checkbox" />
              </PCheckboxWrapper>
            </div>

            <div className="playground light" title="should render default radio-button-wrapper with custom prefix">
              <PRadioButtonWrapper label="Some label">
                <input type="radio" />
              </PRadioButtonWrapper>
            </div>

            <div className="playground light" title="should render default select-wrapper with custom prefix">
              <PSelectWrapper label="Some label">
                <select>
                  <option value="a">Option A</option>
                  <option value="b">Option B</option>
                  <option value="c">Option C</option>
                </select>
              </PSelectWrapper>
            </div>

            <div className="playground light" title="should render default text-field-wrapper with custom prefix">
              <PTextFieldWrapper label="Some label">
                <input type="text" />
              </PTextFieldWrapper>
            </div>

            <div className="playground light" title="should render default textarea-wrapper with custom prefix">
              <PTextareaWrapper label="Some label">
                <textarea />
              </PTextareaWrapper>
            </div>

            <div className="playground light" title="should render default fieldset-wrapper with custom prefix">
              <PFieldsetWrapper label="Some label"></PFieldsetWrapper>
            </div>

            <div className="playground light" title="should render default content-wrapper with custom prefix">
              <PContentWrapper>
                <p>Some content</p>
              </PContentWrapper>
            </div>

            <div className="playground light" title="should render default text with custom prefix">
              <PText>The quick brown fox jumps over the lazy dog</PText>
            </div>

            <div className="playground light" title="should render default text-list with custom prefix">
              <PTextList>
                <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
              </PTextList>
            </div>

            <div className="playground light" title="should render default icon with custom prefix">
              <PIcon />
            </div>

            <div className="playground light" title="should render default link with custom prefix">
              <PLink href="https://www.porsche.com">Some label</PLink>
            </div>

            <div className="playground light" title="should render default link-pure with custom prefix">
              <PLinkPure href="https://www.porsche.com">Some label</PLinkPure>
            </div>

            <div className="playground light" title="should render default link-social with custom prefix">
              <PLinkSocial href="https://www.porsche.com" icon="logo-facebook">
                Some label
              </PLinkSocial>
            </div>

            <div className="playground light" title="should render default marque with custom prefix">
              <PMarque />
            </div>

            <div className="playground light" title="should render default pagination with custom prefix">
              <PPagination totalItemsCount={500} itemsPerPage={25} activePage={1} />
            </div>

            <div className="playground light" title="should render default tabs with custom prefix">
              <PTabs>
                <PTabsItem label="Tab1">Content 1</PTabsItem>
                <PTabsItem label="Tab2">Content 2</PTabsItem>
                <PTabsItem label="Tab3">Content 3</PTabsItem>
              </PTabs>
            </div>

            <div className="playground light" title="should render default tabs-bar with custom prefix">
              <PTabsBar activeTabIndex={0}>
                <button>Tab1</button>
                <button>Tab2</button>
                <button>Tab3</button>
              </PTabsBar>
            </div>

            <div className="playground light" title="should render default spinner with custom prefix">
              <PSpinner />
            </div>

            <div className="playground light" title="should render default flex with custom prefix">
              <PFlex>
                <PFlexItem>
                  <p>1</p>
                </PFlexItem>
                <PFlexItem>
                  <p>2</p>
                </PFlexItem>
              </PFlex>
            </div>

            <div className="playground light" title="should render default grid with custom prefix">
              <PGrid>
                <PGridItem size={6}>
                  <p>1</p>
                </PGridItem>
                <PGridItem size={6}>
                  <p>2</p>
                </PGridItem>
              </PGrid>
            </div>
          </div>
        </PorscheDesignSystemProvider>
      </div>
    </div>
  );
};
