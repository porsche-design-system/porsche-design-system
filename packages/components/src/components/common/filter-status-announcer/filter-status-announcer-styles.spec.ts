import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getCss } from '../../../utils';
import { getFunctionalComponentFilterStatusAnnouncerStyles } from './filter-status-announcer-styles';

describe('getFunctionalComponentFilterStatusAnnouncerStyles()', () => {
  it('should return correct css', () => {
    validateCssAndMatchSnapshot(getCss(getFunctionalComponentFilterStatusAnnouncerStyles()));
  });
});
