import { describe, expect, it } from 'vitest';
import {
  getDocsPages,
  getHtmlElements,
  getImportSources,
  getMdxFiles,
  getSkippedNotificationHeadings,
  getUnusedImports,
  toRelativePath,
} from '../helpers/mdxDocs';

/** Pages that demonstrate how the Storefront renders Markdown and code, not documentation. */
const isDemoPage = (file: string) => toRelativePath(file).startsWith('src/app/(main)/-/');

const mdxFiles = getMdxFiles().filter((file) => !isDemoPage(file));

/** Where the React components come from; style values such as `@porsche-design-system/components-react/emotion` are fine. */
const PDS_COMPONENT_ENTRY_POINTS = [
  '@porsche-design-system/components-react',
  '@porsche-design-system/components-react/ssr',
];

/**
 * The HTML MDX may write as JSX: what Markdown can't express inside JSX or a table cell. Everything else has a Markdown
 * syntax or an MDX component; a raw `<a>` would also skip the base path that Markdown links get.
 */
const ALLOWED_HTML_ELEMENTS = ['br', 'code', 'span'];

describe('MDX pages', () => {
  it('import nothing they don’t use', () => {
    expect(
      mdxFiles.flatMap((file) => getUnusedImports(file).map((name) => `${toRelativePath(file)}: ${name}`))
    ).toEqual([]);
  });

  it('use MDX components instead of the PDS components', () => {
    expect(
      mdxFiles.flatMap((file) =>
        getImportSources(file)
          .filter((source) => PDS_COMPONENT_ENTRY_POINTS.includes(source))
          .map((source) => `${toRelativePath(file)}: ${source}`)
      ),
      'Use or add a component in src/components/mdx that says what it is for, e.g. DependencyList.'
    ).toEqual([]);
  });

  it('write Markdown instead of HTML where Markdown can express it', () => {
    expect(
      mdxFiles
        .flatMap(getHtmlElements)
        .filter(({ element }) => !ALLOWED_HTML_ELEMENTS.includes(element))
        .map(({ file, line, element }) => `${file}:${line}: <${element}>`)
    ).toEqual([]);
  });

  it('have a table of contents once they have two sections', () => {
    expect(
      getDocsPages()
        .filter(
          ({ file, anchors, tableOfContents }) => !isDemoPage(file) && anchors.length >= 2 && !tableOfContents.length
        )
        .map(({ file }) => file)
    ).toEqual([]);
  });

  it('give notifications a heading that doesn’t skip a level', () => {
    expect(
      mdxFiles.flatMap(getSkippedNotificationHeadings).map(({ file, line, heading }) => `${file}:${line}: ${heading}`)
    ).toEqual([]);
  });
});
