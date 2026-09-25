/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=58810-26795
// source=https://designsystem.porsche.com/v4/components/pagination/api
// component=PPagination
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const totalItemsCount = instance.getString('totalItemsCount');
const itemsPerPage = instance.getString('itemsPerPage');
const activePage = instance.getString('activePage');
const showLastPage = instance.getEnum('showLastPage', { false: false, true: true });

export default {
  example: figma.code`<PPagination${/^-?\d+(\.\d+)?$/.test(totalItemsCount) ? ` :totalItemsCount="${totalItemsCount}"` : ''}${/^-?\d+(\.\d+)?$/.test(itemsPerPage) ? ` :itemsPerPage="${itemsPerPage}"` : ''}${/^-?\d+(\.\d+)?$/.test(activePage) ? ` :activePage="${activePage}"` : ''}${showLastPage ? ' :showLastPage="true"' : ''}></PPagination>`,
  imports: [
    '// Docs: https://designsystem.porsche.com/v4/components/pagination/api',
    "import { PPagination } from '@porsche-design-system/components-vue';",
  ],
  id: 'p-pagination',
  metadata: { nestable: true },
};
