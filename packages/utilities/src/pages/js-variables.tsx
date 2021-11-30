import { CSSProperties } from 'react';
import { color, font, headline, layout, spacing, text, title } from '@porsche-design-system/utilities';
import type { Theme } from '@porsche-design-system/utilities';
import styled from 'styled-components';

const objectToFlatArray = (object: Object): string[] =>
  Object.values(object)
    .map((x) => (typeof x === 'object' ? Object.values(x) : x))
    .flat();

const Square = styled.div(({ background }: { background?: CSSProperties['background'] }) => ({
  display: 'inline-block',
  background: background ?? 'grey',
  height: 50,
  minWidth: 50,
  textAlign: 'center',
  lineHeight: '50px',
  fontSize: 10,
  whiteSpace: 'nowrap',
}));

const styledHeadlines = Object.values(headline).map((x) => styled.div(x));
const styledTitles = Object.entries(title).map(([name, styles]) => ({ name, Component: styled.div(styles) }));
const Text = styled.div(text.small);

export const JsVariables = (): JSX.Element => {
  const { darkTheme, lightElectricTheme, ...other } = color;
  const colorArray = objectToFlatArray(other);
  const colorDarkArray = objectToFlatArray(darkTheme);
  const colorLightElectricArray = objectToFlatArray(lightElectricTheme);

  const renderSquares = (colors: string[], theme: Theme = 'light') => (
    <div>
      {colors.map((x, idx) => {
        const style =
          x === 'currentColor'
            ? {
                color: theme === 'dark' ? 'white' : 'black',
                outline: `${x} solid 1px`,
                outlineOffset: '-5px',
              }
            : null;
        const background = x === 'currentColor' ? null : x;

        return <Square key={idx} background={background} children={x} style={style} />;
      })}
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
        {renderSquares(colorDarkArray, 'dark')}
      </div>

      <div className="playground">
        <h2>Light-Electric Theme Colors</h2>
        {renderSquares(colorLightElectricArray, 'light-electric')}
      </div>

      <div className="playground">
        <h2>Font Weights</h2>
        {Object.entries(font.weight).map(([key, val]) => (
          <Text key={key} style={{ fontWeight: val, lineHeight: 1.5 }} children={`Font ${key}`} />
        ))}
      </div>

      <div className="playground">
        <h2>Font Sizes</h2>
        {Object.entries(font.size).map(([key, val]) => (
          <Text key={key} style={val} children={`Font ${key}`} />
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
