import React, { CSSProperties } from 'react';
import { color, font, headline, layout, spacing, text, title } from '@porsche-design-system/utilities';
import styled from 'styled-components';

const objectToFlatArray = (object: Object): string[] =>
  Object.values(object)
    .map((x) => (typeof x === 'object' ? Object.values(x) : x))
    .flat();

const Square = styled.div(({ background }: { background?: CSSProperties['background'] }) => ({
  display: 'inline-block',
  background: background ?? 'grey',
  height: 50,
  width: 50,
  textAlign: 'center',
  lineHeight: '50px',
  fontSize: 10
}));

const styledHeadlines = Object.values(headline).map((x) => styled.div(x));
const styledTitles = Object.entries(title).map(([name, styles]) => ({ name, Component: styled.div(styles) }));
const Text = styled.div(text);

export const JsVariables = (): JSX.Element => {
  const { darkTheme, ...other } = color;
  const colorArray = objectToFlatArray(other);
  const colorDarkArray = objectToFlatArray(darkTheme);

  const renderSquares = (colors: string[]) => (
    <div>
      {colors.map((x, idx) => (
        <Square key={idx} background={x} children={x} />
      ))}
    </div>
  );

  const renderSpacingOrLayout = (obj: typeof spacing | typeof layout) => (
    <div className="dark">
      {Object.entries(obj).map(([key, val]) => (
        <Square key={key} style={{ marginLeft: val }} children={key} />
      ))}
    </div>
  );

  return (
    <>
      <div className="playground">
        <h2>Default Colors</h2>
        {renderSquares(colorArray)}
      </div>

      <div className="playground">
        <h2>Dark Theme Colors</h2>
        {renderSquares(colorDarkArray)}
      </div>

      <div className="playground">
        <h2>Font Weights</h2>
        {Object.entries(font.weight).map(([key, val]) => (
          <Text key={key} style={{ fontWeight: val }} children={`Font ${key}`} />
        ))}
      </div>

      <div className="playground">
        <h2>Font Sizes</h2>
        {Object.entries(font.size).map(([key, val]) => (
          <Text key={key} style={{ fontSize: val }} children={`Font ${key}`} />
        ))}
      </div>

      <div className="playground">
        <h2>Titles</h2>
        {styledTitles.map(({ name, Component }) => (
          <Component key={name} children={`Title ${name}`} />
        ))}
      </div>

      <div className="playground">
        <h2>Headlines</h2>
        {styledHeadlines.map((Comp, idx) => (
          <Comp key={idx} children={`Headline${idx + 1}`} />
        ))}
      </div>

      <div className="playground">
        <h2>Text</h2>
        <Text>Some Text</Text>
      </div>

      <div className="playground">
        <h2>Spacing</h2>
        {renderSpacingOrLayout(spacing)}
      </div>

      <div className="playground">
        <h2>Layout</h2>
        {renderSpacingOrLayout(layout)}
      </div>
    </>
  );
};
