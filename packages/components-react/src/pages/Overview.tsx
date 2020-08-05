import React from 'react';
import {
  PButton as Button,
  PButtonPure as ButtonPure,
  PHeadline as Headline,
  PText as Text,
  PDivider as Divider,
  PIcon as Icon,
  PCheckboxWrapper as CheckboxWrapper,
  PRadioButtonWrapper as RadioButtonWrapper,
  PSelectWrapper as SelectWrapper,
  PTextFieldWrapper as TextFieldWrapper,
  PTextareaWrapper as TextareaWrapper,
  PFieldsetWrapper as FieldsetWrapper,
  PContentWrapper as ContentWrapper,
  PGrid as Grid,
  PGridItem as GridItem,
  PFlex as Flex,
  PFlexItem as FlexItem,
  PTextList as TextList,
  PTextListItem as TextListItem,
  PSpinner as Spinner,
  PMarque as Marque,
  PPagination as Pagination,
  PLink as Link,
  PLinkPure as LinkPure,
  PLinkSocial as LinkSocial
} from '@porsche-design-system/components-react';
import { getPrefixedComponents } from '@porsche-design-system/components-react/prefixed-components';

const {
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
  PTextList: PrefixedTextList,
  PTextListItem: PrefixedTextListItem,
  PSpinner: PrefixedSpinner,
  PMarque: PrefixedMarque,
  PPagination: PrefixedPagination,
  PLink: PrefixedLink,
  PLinkPure: PrefixedLinkPure,
  PLinkSocial: PrefixedLinkSocial
} = getPrefixedComponents('my-prefix');

export const OverviewPage = (): JSX.Element => {
  const style = `
    p-flex-item p,
    my-prefix-p-flex-item p {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 4px 2vw;
      box-sizing: border-box;
      text-align: center;
      color: #fff;
    }

    p-flex-item:nth-child(1n) p,
    my-prefix-p-flex-item:nth-child(1n) p {
      background-color: skyblue;
    }

    p-flex-item:nth-child(2n) p,
    my-prefix-p-flex-item:nth-child(2n) p {
      background-color: deepskyblue;
    }
  `;

  return (
    <div>
      <style children={style} />

      <Grid>
        <GridItem size="6">
          <Headline>Default Components</Headline>

          <div className="playground light" title="should render prefixed default button">
            <Button>Some label</Button>
          </div>

          <div className="playground light" title="should render prefixed default button-pure">
            <ButtonPure>Some label</ButtonPure>
          </div>

          <div className="playground light" title="should render prefixed default checkbox-wrapper">
            <CheckboxWrapper label="Some label">
              <input type="checkbox" />
            </CheckboxWrapper>
          </div>

          <div className="playground light" title="should render prefixed default radio-button-wrapper">
            <RadioButtonWrapper label="Some label">
              <input type="radio" />
            </RadioButtonWrapper>
          </div>

          <div className="playground light" title="should render prefixed default select-wrapper">
            <SelectWrapper label="Some label">
              <select>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </SelectWrapper>
          </div>

          <div className="playground light" title="should render prefixed default text-field-wrapper">
            <TextFieldWrapper label="Some label">
              <input type="text" />
            </TextFieldWrapper>
          </div>

          <div className="playground light" title="should render prefixed default textarea-wrapper">
            <TextareaWrapper label="Some label">
              <textarea></textarea>
            </TextareaWrapper>
          </div>

          <div className="playground light" title="should render prefixed default fieldset-wrapper">
            <FieldsetWrapper label="Some label"></FieldsetWrapper>
          </div>

          <div className="playground light" title="should render prefixed default content-wrapper">
            <ContentWrapper>
              <p>Some content</p>
            </ContentWrapper>
          </div>

          <div className="playground light" title="should render prefixed default divider">
            <Divider />
          </div>

          <div className="playground light" title="should render prefixed default headline">
            <Headline>The quick brown fox jumps over the lazy dog</Headline>
          </div>

          <div className="playground light" title="should render prefixed default text">
            <Text>The quick brown fox jumps over the lazy dog</Text>
          </div>

          <div className="playground light" title="should render prefixed default text-list">
            <TextList>
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
            </TextList>
          </div>

          <div className="playground light" title="should render prefixed default icon">
            <Icon />
          </div>

          <div className="playground light" title="should render prefixed default link">
            <Link href="https://www.porsche.com">Some label</Link>
          </div>

          <div className="playground light" title="should render prefixed default link-pure">
            <LinkPure href="https://www.porsche.com">Some label</LinkPure>
          </div>

          <div className="playground light" title="should render prefixed default link-social">
            <LinkSocial href="https://www.porsche.com" icon="logo-facebook">
              Some label
            </LinkSocial>
          </div>

          <div className="playground light" title="should render prefixed default marque">
            <Marque />
          </div>

          <div className="playground light" title="should render prefixed default pagination">
            <Pagination total-items-count="500" items-per-page="25" active-page="1" />
          </div>

          <div className="playground light" title="should render prefixed default spinner">
            <Spinner />
          </div>

          <div className="playground light" title="should render prefixed default flex">
            <Flex>
              <FlexItem>
                <p>1</p>
              </FlexItem>
              <FlexItem>
                <p>2</p>
              </FlexItem>
            </Flex>
          </div>

          <div className="playground light" title="should render prefixed default grid">
            <Grid>
              <GridItem size="6"></GridItem>
              <GridItem size="6"></GridItem>
            </Grid>
          </div>
        </GridItem>

        <GridItem size="6">
          <PrefixedHeadline>Prefixed Components</PrefixedHeadline>

          <div className="playground light" title="should render prefixed default button">
            <PrefixedButton>Some label</PrefixedButton>
          </div>

          <div className="playground light" title="should render prefixed default button-pure">
            <PrefixedButtonPure>Some label</PrefixedButtonPure>
          </div>

          <div className="playground light" title="should render prefixed default checkbox-wrapper">
            <PrefixedCheckboxWrapper label="Some label">
              <input type="checkbox" />
            </PrefixedCheckboxWrapper>
          </div>

          <div className="playground light" title="should render prefixed default radio-button-wrapper">
            <PrefixedRadioButtonWrapper label="Some label">
              <input type="radio" />
            </PrefixedRadioButtonWrapper>
          </div>

          <div className="playground light" title="should render prefixed default select-wrapper">
            <PrefixedSelectWrapper label="Some label">
              <select>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </PrefixedSelectWrapper>
          </div>

          <div className="playground light" title="should render prefixed default text-field-wrapper">
            <PrefixedTextFieldWrapper label="Some label">
              <input type="text" />
            </PrefixedTextFieldWrapper>
          </div>

          <div className="playground light" title="should render prefixed default textarea-wrapper">
            <PrefixedTextareaWrapper label="Some label">
              <textarea></textarea>
            </PrefixedTextareaWrapper>
          </div>

          <div className="playground light" title="should render prefixed default fieldset-wrapper">
            <PrefixedFieldsetWrapper label="Some label"></PrefixedFieldsetWrapper>
          </div>

          <div className="playground light" title="should render prefixed default content-wrapper">
            <PrefixedContentWrapper>
              <p>Some content</p>
            </PrefixedContentWrapper>
          </div>

          <div className="playground light" title="should render prefixed default divider">
            <PrefixedDivider />
          </div>

          <div className="playground light" title="should render prefixed default headline">
            <PrefixedHeadline>The quick brown fox jumps over the lazy dog</PrefixedHeadline>
          </div>

          <div className="playground light" title="should render prefixed default text">
            <PrefixedText>The quick brown fox jumps over the lazy dog</PrefixedText>
          </div>

          <div className="playground light" title="should render prefixed default text-list">
            <PrefixedTextList>
              <PrefixedTextListItem>The quick brown fox jumps over the lazy dog</PrefixedTextListItem>
            </PrefixedTextList>
          </div>

          <div className="playground light" title="should render prefixed default icon">
            <PrefixedIcon />
          </div>

          <div className="playground light" title="should render prefixed default link">
            <PrefixedLink href="https://www.porsche.com">Some label</PrefixedLink>
          </div>

          <div className="playground light" title="should render prefixed default link-pure">
            <PrefixedLinkPure href="https://www.porsche.com">Some label</PrefixedLinkPure>
          </div>

          <div className="playground light" title="should render prefixed default link-social">
            <PrefixedLinkSocial href="https://www.porsche.com" icon="logo-facebook">
              Some label
            </PrefixedLinkSocial>
          </div>

          <div className="playground light" title="should render prefixed default marque">
            <PrefixedMarque />
          </div>

          <div className="playground light" title="should render prefixed default pagination">
            <PrefixedPagination total-items-count="500" items-per-page="25" active-page="1" />
          </div>

          <div className="playground light" title="should render prefixed default spinner">
            <PrefixedSpinner />
          </div>

          <div className="playground light" title="should render prefixed default flex">
            <PrefixedFlex>
              <PrefixedFlexItem>
                <p>1</p>
              </PrefixedFlexItem>
              <PrefixedFlexItem>
                <p>2</p>
              </PrefixedFlexItem>
            </PrefixedFlex>
          </div>

          <div className="playground light" title="should render prefixed default grid">
            <PrefixedGrid>
              <PrefixedGridItem size="6"></PrefixedGridItem>
              <PrefixedGridItem size="6"></PrefixedGridItem>
            </PrefixedGrid>
          </div>
        </GridItem>
      </Grid>
    </div>
  );
};
