import { expect, it } from 'vitest';
import { stylesheetsSkill } from '../../../skill/skill';

it('should expose correct stylesheets package skill', () => {
  const { getContent, ...metadata } = stylesheetsSkill;
  expect({ ...metadata, content: getContent() }).toMatchSnapshot();
});
