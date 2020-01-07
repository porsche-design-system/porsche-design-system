import {encodeUrl, decodeUrl} from '@/services/utils';

describe('encodeUrl', () => {
  it('should transform to lower case and replace empty spaces', () => {
    expect(encodeUrl('something')).toBe('something');
    expect(encodeUrl('Some Url Param')).toBe('some-url-param');
    expect(encodeUrl('sOme URL-paraM')).toBe('some-url-param');
  });
});

describe('decodeUrl', () => {
  it('should transform to lower case, replace dashes with whitespace and uppercase first char after whitespace', () => {
    expect(decodeUrl('Something')).toBe('Something');
    expect(decodeUrl('some-url-param')).toBe('Some Url Param');
    expect(decodeUrl('sOme URL-paraM')).toBe('Some Url Param');
  });
});
