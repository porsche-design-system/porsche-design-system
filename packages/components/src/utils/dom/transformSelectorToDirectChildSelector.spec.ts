import { transformSelectorToDirectChildSelector } from './transformSelectorToDirectChildSelector';

it('should prefix simple selector with :scope >', () => {
  expect(transformSelectorToDirectChildSelector('button')).toBe(':scope>button');
  expect(transformSelectorToDirectChildSelector('.root')).toBe(':scope>.root');
});

it('should prefix each comma separated selector with :scope >', () => {
  expect(transformSelectorToDirectChildSelector('a,button')).toBe(':scope>a,:scope>button');
});
