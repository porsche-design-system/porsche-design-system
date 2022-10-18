import {
  createPaginationModel,
  getTotalPages,
  getCurrentActivePage,
  createRange,
  PaginationModelItem,
  itemTypes,
} from './pagination-utils';

const paginationModelItemToSymbolPart = (item: PaginationModelItem) => {
  switch (item.type) {
    case itemTypes.PREVIOUS_PAGE_LINK:
      return '<';
    case itemTypes.NEXT_PAGE_LINK:
      return '>';
    case itemTypes.ELLIPSIS:
      return item.key === -1 ? '<...' : '...>';
  }
};

const formatPaginationModelToASCII = (paginationModel: PaginationModelItem[]) => {
  const arr = paginationModel.map((item) => {
    const symbolPart = paginationModelItemToSymbolPart(item);
    return [item.isActive ? '*' : '', item.value, symbolPart ? `(${symbolPart})` : ''].join('');
  });
  return arr;
};

describe('createRange', () => {
  it('should return a range from min to max', () => {
    expect(createRange(0, 1)).toEqual([0, 1]);
    expect(createRange(1, 1)).toEqual([1]);
    expect(createRange(-1, 0)).toEqual([-1, 0]);
    expect(createRange(5, 10)).toEqual([5, 6, 7, 8, 9, 10]);
  });
});

describe('createPaginationModel', () => {
  it("should throw an exception if options aren't passed", () => {
    // @ts-ignore
    expect(() => createPaginationModel()).toThrowError('createPaginationModel(): options object should be a passed');
  });

  describe('when there is 1 page', () => {
    it('should return correct model for 1 of 1', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 1, pageTotal: 1, pageRange: 1 }))
      ).toEqual(['1(<)', '*1', '1(>)']);
    });
  });

  describe('when there are 10 pages', () => {
    it('should return correct model for 1 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 1, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['1(<)', '*1', '2', '3', '4', '5', '6(...>)', '10', '*2(>)']);
    });
  });

  describe('when there are 10 pages', () => {
    it('should return correct model for 2 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 2, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*1(<)', '1', '*2', '3', '4', '5', '6(...>)', '10', '*3(>)']);
    });
  });

  describe('when there are 10 pages', () => {
    it('should return correct model for 3 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 3, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*2(<)', '1', '2', '*3', '4', '5', '6(...>)', '10', '*4(>)']);
    });
  });

  describe('when there are 10 pages', () => {
    it('should return correct model for 4 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 4, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*3(<)', '1', '2', '3', '*4', '5', '6(...>)', '10', '*5(>)']);
    });
  });

  describe('when there are 10 pages', () => {
    it('should return correct model for 5 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 5, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*4(<)', '1', '3(<...)', '4', '*5', '6', '7(...>)', '10', '*6(>)']);
    });
  });

  describe('when there are 10 pages', () => {
    it('should return correct model for 6 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 6, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*5(<)', '1', '4(<...)', '5', '*6', '7', '8(...>)', '10', '*7(>)']);
    });
  });

  describe('when there are 10 pages', () => {
    it('should return correct model for 7 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 7, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*6(<)', '1', '5(<...)', '6', '*7', '8', '9', '10', '*8(>)']);
    });
  });

  describe('when there are 10 pages', () => {
    it('should return correct model for 8 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 8, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*7(<)', '1', '5(<...)', '6', '7', '*8', '9', '10', '*9(>)']);
    });
  });

  describe('when there are 10 pages', () => {
    it('should return correct model for 9 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 9, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*8(<)', '1', '5(<...)', '6', '7', '8', '*9', '10', '*10(>)']);
    });
  });

  describe('when there are 10 pages', () => {
    it('should return correct model for 10 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 10, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*9(<)', '1', '5(<...)', '6', '7', '8', '9', '*10', '10(>)']);
    });
  });
});

describe('getTotalPages', () => {
  it('should throw an exception if just one value is passed', () => {
    // @ts-ignore
    expect(() => getTotalPages(5)).toThrowError(
      'getTotalPages(): totalItemsCount and itemsPerPage props must be provided'
    );
  });

  it("should throw an exception if value isn't passed", () => {
    // @ts-ignore
    expect(() => getTotalPages()).toThrowError(
      'getTotalPages(): totalItemsCount and itemsPerPage props must be provided'
    );
  });

  it('should return the amount of pages', () => {
    expect(getTotalPages(100, 10)).toBe(10);
  });

  it('should return the ceil amount of pages', () => {
    expect(getTotalPages(91, 10)).toBe(10);
  });

  it('should return the minimum of one page if total amount of items is < 1', () => {
    expect(getTotalPages(0, 10)).toBe(1);
  });

  it('should return the minimum of one page if total amount of items per page is < 1', () => {
    expect(getTotalPages(10, 0)).toBe(10);
  });
});

describe('getCurrentActivePage', () => {
  it("should throw an exception if value isn't passed", () => {
    // @ts-ignore
    expect(() => getCurrentActivePage(5)).toThrowError(
      'getCurrentActivePage(): activePage and totalPages props must be provided'
    );
  });

  it("should throw an exception if value isn't passed", () => {
    // @ts-ignore
    expect(() => getCurrentActivePage()).toThrowError(
      'getCurrentActivePage(): activePage and totalPages props must be provided'
    );
  });

  it('should return the minimum of one page', () => {
    expect(getCurrentActivePage(0, 10)).toBe(1);
  });

  it('should not be higher than total pages', () => {
    expect(getCurrentActivePage(15, 10)).toBe(10);
  });
});
