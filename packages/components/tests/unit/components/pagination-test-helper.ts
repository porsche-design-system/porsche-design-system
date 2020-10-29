import { PaginationModelItem, itemTypes } from '../../../src/components/navigation/pagination/pagination-helper';

function paginationModelItemToSymbolPart(item: PaginationModelItem) {
  switch (item.type) {
    case itemTypes.PREVIOUS_PAGE_LINK:
      return '<';
    case itemTypes.NEXT_PAGE_LINK:
      return '>';
    case itemTypes.ELLIPSIS:
      return item.key === -1 ? '<...' : '...>';
  }
}

export const formatPaginationModelToASCII = (paginationModel: PaginationModelItem[]) => {
  const arr = paginationModel.map((item) => {
    const symbolPart = paginationModelItemToSymbolPart(item);
    return [item.isActive ? '*' : '', item.value, symbolPart ? `(${symbolPart})` : ''].join('');
  });
  return arr;
};
