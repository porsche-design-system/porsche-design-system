/// <reference types="@figma/code-connect/figma-types-no-require" />
// url=https://www.figma.com/design/bEXOI0BAd6pXjvIG1mpWIN/Porsche-Web-Design-System--Renato-Code-Connect--Copy-?node-id=58810-26795
// source=https://designsystem.porsche.com/v4/components/pagination/api
// component=p-pagination
// Auto generated - do not edit by hand.
import figma from 'figma';

const instance = figma.selectedInstance;

const activePage = instance.getString('activePage');
const totalItemsCount = instance.getString('totalItemsCount');
const itemsPerPage = instance.getString('itemsPerPage');
const showLastPage = instance.getEnum('showLastPage', { false: false, true: true });

export default {
  example: figma.code`<p-pagination${activePage ? ` active-page="${activePage}"` : ''}${totalItemsCount ? ` total-items-count="${totalItemsCount}"` : ''}${itemsPerPage ? ` items-per-page="${itemsPerPage}"` : ''}${showLastPage ? ' show-last-page="true"' : ''}></p-pagination>`,
  imports: ['<!-- Docs: https://designsystem.porsche.com/v4/components/pagination/api -->'],
  id: 'p-pagination',
  metadata: { nestable: true },
};
