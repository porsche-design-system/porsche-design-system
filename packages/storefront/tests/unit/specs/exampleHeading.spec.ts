import { getExampleHeading, readExampleProps } from '@/utils/exampleHeading';

const expression = (value: string) => ({ type: 'mdxJsxAttributeValueExpression', value });
const attribute = (name: string, value: unknown) => ({ type: 'mdxJsxAttribute', name, value });

describe('getExampleHeading()', () => {
  it('is the title of the example at level 2', () => {
    expect(getExampleHeading({}, 'Form')).toEqual({ level: 2, text: 'Form' });
  });

  it('is its heading where the page names it apart from its title', () => {
    expect(getExampleHeading({ heading: 'Inline' }, 'Feedback: Inline')).toEqual({ level: 2, text: 'Inline' });
  });

  it('takes its level', () => {
    expect(getExampleHeading({ level: 3 }, 'Size Responsive')).toEqual({ level: 3, text: 'Size Responsive' });
  });

  it('is none where the page names it with its own heading', () => {
    expect(getExampleHeading({ heading: false }, 'Landing Page')).toBeUndefined();
  });
});

describe('readExampleProps()', () => {
  it('reads the example and its heading props as MDX writes them', () => {
    expect(readExampleProps([attribute('example', expression('form'))])).toEqual({ example: 'form' });
    expect(readExampleProps([attribute('example', expression('inline')), attribute('heading', 'Inline')])).toEqual({
      example: 'inline',
      heading: 'Inline',
    });
    expect(
      readExampleProps([attribute('example', expression('page')), attribute('heading', expression('false'))])
    ).toEqual({ example: 'page', heading: false });
    expect(readExampleProps([attribute('example', expression('size')), attribute('level', expression(' 3 '))])).toEqual(
      { example: 'size', level: 3 }
    );
  });

  it('fails for a heading or level it cannot read', () => {
    expect(() => readExampleProps([attribute('heading', expression('title'))])).toThrow('heading');
    expect(() => readExampleProps([attribute('level', expression('4'))])).toThrow('level');
  });
});
