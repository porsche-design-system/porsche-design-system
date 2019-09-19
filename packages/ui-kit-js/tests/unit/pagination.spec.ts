// import { newSpecPage } from '@stencil/core/testing';
import { Pagination } from '../../src/components/navigation/pagination/pagination';
import * as PaginationHelper from '../../src/components/navigation/pagination/pagination-helper';

// Cast getPaginationModel to general Function to not have TypeScript errors
// when passing parameters with incorrect data type
const getTotalPages = PaginationHelper.getTotalPages as Function;
const createPaginationModel = PaginationHelper.createPaginationModel as Function;

describe('Component <p-pagination>', () => {

  describe('exceptions for createPaginationModel', () => {
    it('createPaginationModel should throw an exception if options aren\'t passed', () => {
      expect(() => createPaginationModel())
        .toThrowError('createPaginationModel(): options object should be a passed');
    });
  });

  describe('exceptions for getTotalPages', () => {
    it('getTotalPages should throw an exception if value isn\'t passed', () => {
      expect(() => getTotalPages(5))
        .toThrowError('getTotalPages(): totalItemsCount and itemsPerPage props must be provided');
    });

    it('getTotalPages should throw an exception if value isn\'t passed', () => {
      expect(() => getTotalPages(5))
        .toThrowError('getTotalPages(): totalItemsCount and itemsPerPage props must be provided');
    });

    it('getTotalPages should throw an exception if value isn\'t passed', () => {
      expect(() => getTotalPages())
        .toThrowError('getTotalPages(): totalItemsCount and itemsPerPage props must be provided');
    });

    it('getTotalPages should throw an exception if value isn\'t passed', () => {
      expect(() => getTotalPages())
        .toThrowError('getTotalPages(): totalItemsCount and itemsPerPage props must be provided');
    });

    it('getTotalPages should throw an exception if totalItemsCount value is negative', () => {
      expect(() => getTotalPages(-1, 5))
        .toThrowError('getTotalPages(): totalItemsCount shouldn\'t be a negative number');
    });

    it('getTotalPages should throw an exception if itemsPerPage value is negative', () => {
      expect(() => getTotalPages(5, -1))
        .toThrowError('getTotalPages(): itemsPerPage shouldn\'t be a negative number');
    });
  });


});
