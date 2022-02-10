import 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import { highlight, languages } from 'prismjs';
import type { Framework } from '@/models';

export const getHighlightedLanguage = (framework: Framework): string => {
  switch (framework) {
    case 'react':
    case 'shared':
      return 'language-jsx';

    default:
      return 'markup';
  }
};

export const getHighlightedCode = (markup: string, framework: Framework): string => {
  switch (framework) {
    case 'react':
    case 'shared':
      return highlight(markup, languages.jsx, 'language-jsx');
    default:
      return highlight(markup, languages.markup, 'markup');
  }
};
