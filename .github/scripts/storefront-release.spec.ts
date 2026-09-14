import { describe, expect, it } from 'vitest';
import { canPromoteMajor, isReleaseCommit, isStableVersion, parseReleaseTags } from './storefront-release';

const sha = 'a'.repeat(40);
const otherSha = 'b'.repeat(40);

describe('stable release source', () => {
  it.each(['4.7.0-rc.0', '5.0.0-beta.1', '4.7.0+build', 'v4.7.0', '04.7.0', 'invalid'])('rejects %s', (version) => {
    expect(isStableVersion(version)).toBe(false);
    expect(isReleaseCommit(version, sha, '4.6.0', new Map())).toBe(false);
    expect(canPromoteMajor(version, sha, new Map())).toBe(false);
  });

  it('recognizes a stable release version bump before its tag exists', () => {
    expect(isReleaseCommit('4.7.0', sha, '4.7.0-rc.0', new Map())).toBe(true);
  });

  it('recognizes the exact tagged commit on a retry', () => {
    expect(isReleaseCommit('4.7.0', sha, '4.7.0', new Map([['4.7.0', sha]]))).toBe(true);
  });

  it('rejects ordinary commits and merges retaining an already released version', () => {
    expect(isReleaseCommit('4.7.0', otherSha, '4.7.0', new Map([['4.7.0', sha]]))).toBe(false);
    expect(isReleaseCommit('4.7.0', otherSha, '4.6.0', new Map([['4.7.0', sha]]))).toBe(false);
    expect(isReleaseCommit('4.7.0', otherSha, '4.7.0', new Map())).toBe(false);
  });
});

describe('major promotion', () => {
  it('requires a release tag pointing at the build commit', () => {
    expect(canPromoteMajor('4.7.0', sha, new Map())).toBe(false);
    expect(canPromoteMajor('4.7.0', otherSha, new Map([['4.7.0', sha]]))).toBe(false);
    expect(canPromoteMajor('4.7.0', sha, new Map([['4.7.0', sha]]))).toBe(true);
  });

  it('does not roll back a major, including on retries after a partial deployment', () => {
    const tags = new Map([
      ['4.7.0', sha],
      ['4.10.0', otherSha],
    ]);
    expect(canPromoteMajor('4.7.0', sha, tags)).toBe(false);
    expect(canPromoteMajor('4.10.0', otherSha, tags)).toBe(true);
  });

  it('allows maintenance releases without changing a newer major', () => {
    const tags = new Map([
      ['4.7.1', sha],
      ['5.0.0', otherSha],
    ]);
    expect(canPromoteMajor('4.7.1', sha, tags)).toBe(true);
  });

  it('supports two-digit majors', () => {
    expect(canPromoteMajor('10.0.0', sha, new Map([['10.0.0', sha]]))).toBe(true);
  });
});

describe('release tags', () => {
  it('resolves lightweight and annotated tags and ignores prereleases', () => {
    expect(
      parseReleaseTags(
        `${sha}\trefs/tags/v4.6.0\n${sha}\trefs/tags/v4.7.0\n${otherSha}\trefs/tags/v4.7.0^{}\n${sha}\trefs/tags/v5.0.0-rc.0\n`
      )
    ).toEqual(
      new Map([
        ['4.6.0', sha],
        ['4.7.0', otherSha],
      ])
    );
  });

  it('handles repositories without matching tags', () => {
    expect(parseReleaseTags('')).toEqual(new Map());
  });
});
