import React, { CSSProperties } from 'react';
import { color, headline, layout, spacing, text } from '@porsche-design-system/utilities';
import styled from 'styled-components';

const objectToArray = (object: Object): string[] =>
  Object.values(object)
    .map((x) => (typeof x === 'object' ? Object.values(x) : x))
    .flat();

const Square = styled.div(({ background }: { background: CSSProperties['background'] }) => ({
  display: 'inline-block',
  background,
  height: 50,
  width: 50,
  textAlign: 'center',
  lineHeight: '50px',
  fontSize: 10
}));

const styledHeadlines = Object.values(headline).map((x) => styled.div(x));

export const JsVariables = (): JSX.Element => {
  const { darkTheme, ...other } = color;
  const colorArray = objectToArray(other);
  const colorDarkArray = objectToArray(darkTheme);

  const renderSquares = (array: string[]) => (
    <div>
      {array.map((x, idx) => (
        <Square key={idx} background={x} children={x} />
      ))}
    </div>
  );

  return (
    <>
      <h2>Default Colors</h2>
      {renderSquares(colorArray)}

      <h2>Dark Theme Colors</h2>
      {renderSquares(colorDarkArray)}

      <h2>Headlines</h2>
      {styledHeadlines.map((Comp, idx) => (
        <Comp key={idx} children={`Headline${idx + 1}`} />
      ))}
    </>
  );
};
