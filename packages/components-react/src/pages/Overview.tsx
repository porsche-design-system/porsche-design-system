import {
  PBanner,
  PButton,
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
} from '@porsche-design-system/components-react';
import { getPrefixedComponents } from '@porsche-design-system/components-react/prefixed-components';

const {
  PBanner: PrefixedBanner,
  PButton: PrefixedButton,
  PButtonPure: PrefixedButtonPure,
  PHeadline: PrefixedHeadline,
  PText: PrefixedText,
  PDivider: PrefixedDivider,
  PIcon: PrefixedIcon,
  PCheckboxWrapper: PrefixedCheckboxWrapper,
  PRadioButtonWrapper: PrefixedRadioButtonWrapper,
  PSelectWrapper: PrefixedSelectWrapper,
  PTextFieldWrapper: PrefixedTextFieldWrapper,
  PTextareaWrapper: PrefixedTextareaWrapper,
  PFieldsetWrapper: PrefixedFieldsetWrapper,
  PContentWrapper: PrefixedContentWrapper,
  PGrid: PrefixedGrid,
  PGridItem: PrefixedGridItem,
  PFlex: PrefixedFlex,
  PFlexItem: PrefixedFlexItem,
  PTabs: PrefixedTabs,
  PTabsItem: PrefixedTabsItem,
  PTabsBar: PrefixedTabsBar,
  PTextList: PrefixedTextList,
  PTextListItem: PrefixedTextListItem,
  PSpinner: PrefixedSpinner,
  PMarque: PrefixedMarque,
  PPagination: PrefixedPagination,
  PLink: PrefixedLink,
  PLinkPure: PrefixedLinkPure,
  PLinkSocial: PrefixedLinkSocial,
} = getPrefixedComponents({ prefix: 'my-prefix' });

export const OverviewPage = (): JSX.Element => {
  const style = `
    p-flex-item > p,
    my-prefix-p-flex-item > p,
    p-grid-item > p,
    my-prefix-p-grid-item > p,
    p-content-wrapper > p,
    my-prefix-p-content-wrapper > p {
      margin: 0;
      padding: 4px 2vw;
      text-align: center;
      color: white;
      background-color: lightskyblue;
    }

    p-flex-item:nth-child(1n) > p,
    my-prefix-p-flex-item:nth-child(1n) > p,
    p-grid-item:nth-child(1n) > p,
    my-prefix-p-grid-item:nth-child(1n) > p {
      background-color: skyblue;
    }

    p-flex-item:nth-child(2n) > p,
    my-prefix-p-flex-item:nth-child(2n) > p,
    p-grid-item:nth-child(2n) > p,
    my-prefix-p-grid-item:nth-child(2n) > p {
      background-color: deepskyblue;
    }

    p-banner,
    my-prefix-p-banner {
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
            <PPagination total-items-count="500" items-per-page="25" active-page="1" />
          </div>

          <div className="playground light" title="should render default tabs">
            <PTabs>
              <PTabsItem label="Tab1">Content 1</PTabsItem>
              <PTabsItem label="Tab2">Content 2</PTabsItem>
              <PTabsItem label="Tab3">Content 3</PTabsItem>
            </PTabs>
          </div>

          <div className="playground light" title="should render default tabs-bar">
            <PTabsBar>
              <a href="#x">Tab1</a>
              <a href="#x">Tab2</a>
              <a href="#x">Tab3</a>
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

        <div style={{ flex: 1 }}>
          <div className="playground light" title="should render default headline with custom prefix">
            <PrefixedHeadline>Prefixed Components</PrefixedHeadline>
          </div>

          <div className="playground light" title="should render headline for variant large with custom prefix">
            <PrefixedHeadline variant={{ base: 'large', l: 'x-large' }}>Prefixed Components</PrefixedHeadline>
          </div>

          <div className="playground light" title="should render default banner with custom prefix">
            <PrefixedBanner>
              <span slot="title">Some banner title</span>
              <span slot="description">Some banner description.</span>
            </PrefixedBanner>
          </div>

          <div className="playground light" title="should render default divider with custom prefix">
            <PrefixedDivider />
          </div>

          <div className="playground light" title="should render default button with custom prefix">
            <PrefixedButton>Some label</PrefixedButton>
          </div>

          <div className="playground light" title="should render default button-pure with custom prefix">
            <PrefixedButtonPure>Some label</PrefixedButtonPure>
          </div>

          <div className="playground light" title="should render default checkbox-wrapper with custom prefix">
            <PrefixedCheckboxWrapper label="Some label">
              <input type="checkbox" />
            </PrefixedCheckboxWrapper>
          </div>

          <div className="playground light" title="should render default radio-button-wrapper with custom prefix">
            <PrefixedRadioButtonWrapper label="Some label">
              <input type="radio" />
            </PrefixedRadioButtonWrapper>
          </div>

          <div className="playground light" title="should render default select-wrapper with custom prefix">
            <PrefixedSelectWrapper label="Some label">
              <select>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </PrefixedSelectWrapper>
          </div>

          <div className="playground light" title="should render default text-field-wrapper with custom prefix">
            <PrefixedTextFieldWrapper label="Some label">
              <input type="text" />
            </PrefixedTextFieldWrapper>
          </div>

          <div className="playground light" title="should render default textarea-wrapper with custom prefix">
            <PrefixedTextareaWrapper label="Some label">
              <textarea />
            </PrefixedTextareaWrapper>
          </div>

          <div className="playground light" title="should render default fieldset-wrapper with custom prefix">
            <PrefixedFieldsetWrapper label="Some label"></PrefixedFieldsetWrapper>
          </div>

          <div className="playground light" title="should render default content-wrapper with custom prefix">
            <PrefixedContentWrapper>
              <p>Some content</p>
            </PrefixedContentWrapper>
          </div>

          <div className="playground light" title="should render default text with custom prefix">
            <PrefixedText>The quick brown fox jumps over the lazy dog</PrefixedText>
          </div>

          <div className="playground light" title="should render default text-list with custom prefix">
            <PrefixedTextList>
              <PrefixedTextListItem>The quick brown fox jumps over the lazy dog</PrefixedTextListItem>
            </PrefixedTextList>
          </div>

          <div className="playground light" title="should render default icon with custom prefix">
            <PrefixedIcon />
          </div>

          <div className="playground light" title="should render default link with custom prefix">
            <PrefixedLink href="https://www.porsche.com">Some label</PrefixedLink>
          </div>

          <div className="playground light" title="should render default link-pure with custom prefix">
            <PrefixedLinkPure href="https://www.porsche.com">Some label</PrefixedLinkPure>
          </div>

          <div className="playground light" title="should render default link-social with custom prefix">
            <PrefixedLinkSocial href="https://www.porsche.com" icon="logo-facebook">
              Some label
            </PrefixedLinkSocial>
          </div>

          <div className="playground light" title="should render default marque with custom prefix">
            <PrefixedMarque />
          </div>

          <div className="playground light" title="should render default pagination with custom prefix">
            <PrefixedPagination total-items-count="500" items-per-page="25" active-page="1" />
          </div>

          <div className="playground light" title="should render default tabs with custom prefix">
            <PrefixedTabs>
              <PrefixedTabsItem label="Tab1">Content 1</PrefixedTabsItem>
              <PrefixedTabsItem label="Tab2">Content 2</PrefixedTabsItem>
              <PrefixedTabsItem label="Tab3">Content 3</PrefixedTabsItem>
            </PrefixedTabs>
          </div>

          <div className="playground light" title="should render default tabs-bar with custom prefix">
            <PrefixedTabsBar>
              <a href="#x">Tab1</a>
              <a href="#x">Tab2</a>
              <a href="#x">Tab3</a>
            </PrefixedTabsBar>
          </div>

          <div className="playground light" title="should render default spinner with custom prefix">
            <PrefixedSpinner />
          </div>

          <div className="playground light" title="should render default flex with custom prefix">
            <PrefixedFlex>
              <PrefixedFlexItem>
                <p>1</p>
              </PrefixedFlexItem>
              <PrefixedFlexItem>
                <p>2</p>
              </PrefixedFlexItem>
            </PrefixedFlex>
          </div>

          <div className="playground light" title="should render default grid with custom prefix">
            <PrefixedGrid>
              <PrefixedGridItem size={6}>
                <p>1</p>
              </PrefixedGridItem>
              <PrefixedGridItem size={6}>
                <p>2</p>
              </PrefixedGridItem>
            </PrefixedGrid>
          </div>
        </div>
      </div>
    </div>
  );
};
