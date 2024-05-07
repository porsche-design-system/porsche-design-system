import { TagName } from '@porsche-design-system/shared';
import { addImportantToEachRule, getFocusJssStyle } from '../common-styles';
import { Styles } from 'jss';

export const tagNamesWithSiblingTabindexArray: TagName[] = ['p-tabs-bar'];

export const getSiblingTabindexStyles = (tagName: TagName): Styles => ({
  '@global': {
    [`${tagName}`]: {
      '& ~ [tabindex="0"][role="tabpanel"]': addImportantToEachRule({
        // light and dark theme are using the same color atm.
        ...getFocusJssStyle('light'),
        borderRadius: '1px', // needs to be overwritten due to scaled border-radius if offset is set
      }),
    },
  },
});
