import React from 'react';

import { getPrefixedComponents } from '@porsche-design-system/components-react/prefixed-components';
const {
  PButton: Button,
  PButtonPure: ButtonPure,
  PHeadline: Headline,
  PText: Text,
  PDivider: Divider,
  PIcon: Icon,
  PCheckboxWrapper: CheckboxWrapper,
  PRadioButtonWrapper: RadioButtonWrapper,
  PSelectWrapper: SelectWrapper,
  PTextFieldWrapper: TextFieldWrapper,
  PTextareaWrapper: TextareaWrapper,
  PFieldsetWrapper: FieldsetWrapper,
  PContentWrapper: ContentWrapper,
  PGrid: Grid,
  PGridItem: GridItem,
  PFlex: Flex,
  PFlexItem: FlexItem,
  PTextList: TextList,
  PTextListItem: TextListItem,
  PSpinner: Spinner,
  PMarque: Marque,
  PPagination: Pagination,
  PLink: Link,
  PLinkPure: LinkPure,
  PLinkSocial: LinkSocial
} = getPrefixedComponents('my-prefix');

export const OverviewPrefixedPage = (): JSX.Element => {
  return (
    <div>
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
        <LinkSocial href="https://www.porsche.com">Some label</LinkSocial>
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
    </div>
  );
};
