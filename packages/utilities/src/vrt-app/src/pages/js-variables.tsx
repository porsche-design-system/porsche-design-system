import React from 'react';
import { color, headline, layout, spacing, text } from '@porsche-design-system/utilities';

const objectToArray = (object: Object): string[] =>
  Object.values(object)
    .map((x) => (typeof x === 'object' ? Object.values(x) : x))
    .flat();

export const JsVariables = (): JSX.Element => {
  const { darkTheme, ...other } = color;
  const colorArray = objectToArray(other);
  const colorDarkArray = objectToArray(darkTheme);

  const renderSquares = (array: string[]) =>
    array.map((x, index) => (
      <div
        key={index}
        style={{
          background: x,
          height: 50,
          width: 50,
          display: 'inline-block',
          textAlign: 'center',
          lineHeight: '50px',
          fontSize: 10
        }}
      >
        {x}
      </div>
    ));

  const headlineStyles = Object.values(headline);

  return (
    <>
      <h2>Colors</h2>
      {renderSquares(colorArray)}
      <h2>darkTheme Colors</h2>
      {renderSquares(colorDarkArray)}
      <h2>Headlines</h2>
      {headlineStyles.map((x, index) => (
        <div key={index} className={`h${index + 1}`}>
          <style>{`.h${index + 1}{'${x}'}`}</style>
          Headline{index + 1}{' '}
        </div>
      ))}
    </>
  );
};
