import {
  PaginationModelItem,
  itemTypes,
  PaginationItemType
} from '../../../src/components/navigation/pagination/pagination-helper';

interface SymbolToTypeMap {
  [symbol: string]: PaginationItemType;
}

const EXPECTED_PAGE_REG_EXP = /^(\*)?(\d+)(?:\((.+)\))?$/;

const symbolToTypeMap: SymbolToTypeMap = {
  '<...': itemTypes.ELLIPSIS,
  '...>': itemTypes.ELLIPSIS,
  '<': itemTypes.PREVIOUS_PAGE_LINK,
  '>': itemTypes.NEXT_PAGE_LINK,
};

interface SymbolToKeyMap {
  [symbol: string]: number;
}

const symbolToKeyMap: SymbolToKeyMap = {
  '<...': -1,
  '...>': -2,
  '<': -3,
  '>': -4
};

function parseExpectedPage(expectedPage: string): PaginationModelItem {
  const matches = expectedPage.match(EXPECTED_PAGE_REG_EXP);

  if (!matches) {
    throw new Error(`Can't parse expected page "${expectedPage}"`);
  }

  const [, isActivePart, valuePart, symbolPart] = matches;

  const isActive = !!isActivePart;
  const type = symbolToTypeMap[symbolPart] || 'PAGE';
  const value = +valuePart;
  const key = symbolToKeyMap[symbolPart] || value;

  return {key, type, value, isActive};
}

function paginationModelItemToSymbolPart(item: PaginationModelItem) {
  switch (item.type) {
    case itemTypes.PREVIOUS_PAGE_LINK:
      return '<';
    case itemTypes.NEXT_PAGE_LINK:
      return '>';
    case itemTypes.ELLIPSIS:
      return (item.key === -1 ? '<...' : '...>');
  }
}

export const formatPaginationModelToASCII = (paginationModel: PaginationModelItem[]) => {
  const arr = [];
  paginationModel.map(item => {
    const symbolPart = paginationModelItemToSymbolPart(item);
    arr.push([
      item.isActive ? '*' : '',
      item.value,
      symbolPart ? `(${symbolPart})` : ''
    ].join(''));
  });
  return arr;
};
