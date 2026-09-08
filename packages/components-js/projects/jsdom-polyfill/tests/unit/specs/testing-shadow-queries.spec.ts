import {
  findAllByShadowAltText,
  findAllByShadowDisplayValue,
  findAllByShadowLabelText,
  findAllByShadowPlaceholderText,
  findAllByShadowRole,
  findAllByShadowTestId,
  findAllByShadowText,
  findAllByShadowTitle,
  findByShadowAltText,
  findByShadowDisplayValue,
  findByShadowLabelText,
  findByShadowPlaceholderText,
  findByShadowRole,
  findByShadowTestId,
  findByShadowText,
  findByShadowTitle,
  getAllByShadowAltText,
  getAllByShadowDisplayValue,
  getAllByShadowLabelText,
  getAllByShadowPlaceholderText,
  getAllByShadowRole,
  getAllByShadowTestId,
  getAllByShadowText,
  getAllByShadowTitle,
  getByShadowAltText,
  getByShadowDisplayValue,
  getByShadowLabelText,
  getByShadowPlaceholderText,
  getByShadowRole,
  getByShadowTestId,
  getByShadowText,
  getByShadowTitle,
  queryAllByShadowAltText,
  queryAllByShadowDisplayValue,
  queryAllByShadowLabelText,
  queryAllByShadowPlaceholderText,
  queryAllByShadowRole,
  queryAllByShadowTestId,
  queryAllByShadowText,
  queryAllByShadowTitle,
  queryByShadowAltText,
  queryByShadowDisplayValue,
  queryByShadowLabelText,
  queryByShadowPlaceholderText,
  queryByShadowRole,
  queryByShadowTestId,
  queryByShadowText,
  queryByShadowTitle,
  screen,
  within,
} from '@porsche-design-system/components-js/testing';
import { describe, expect, it } from 'vitest';

// The fake component below hides exactly one target for each of the eight ways these queries search (role, label
// text, placeholder, text, display value, alt text, title, test id). Because there is exactly one of each, putting N
// copies of the component on the page makes every single query find exactly N things. So `renderFixtures(1)` sets up
// the one-match case for all 48 queries at once and `renderFixtures(2)` sets up the two-match case. The no-match case
// just searches for a word the component does not contain. That is why this one small snippet replaces the 24 hand
// written HTML fixtures we would otherwise need.

const FIXTURE_TAG = 'shadow-query-fixture';

class ShadowQueryFixture extends HTMLElement {
  connectedCallback(): void {
    if (this.shadowRoot) {
      return;
    }
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <button>Role Target</button>
      <label for="field">Label Target</label>
      <input id="field" placeholder="Placeholder Target" value="Display Target" />
      <span>Text Target</span>
      <img alt="Alt Target" />
      <div title="Title Target"></div>
      <div data-testid="TestId Target"></div>`;
  }
}

customElements.define(FIXTURE_TAG, ShadowQueryFixture);

const renderFixtures = (count: number): void => {
  document.body.innerHTML = `<${FIXTURE_TAG}></${FIXTURE_TAG}>`.repeat(count);
};

// A findBy* that cannot match waits the default 1000ms before rejecting. 24 blocks below assert a rejection, so
// the default would add roughly half a minute of pure waiting to this file.
const SHORT_WAIT = { timeout: 50 };

describe('queryAllByShadowRole()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = queryAllByShadowRole(document.body, 'button');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('BUTTON');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(queryAllByShadowRole(document.body, 'button')).toHaveLength(2);
  });

  it('should return an empty array when nothing matches', () => {
    renderFixtures(1);

    expect(queryAllByShadowRole(document.body, 'checkbox')).toEqual([]);
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryAllByShadowRole('button')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryAllByShadowRole('button')).toHaveLength(1);
  });
});

describe('queryByShadowRole()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(queryByShadowRole(document.body, 'button')?.tagName).toBe('BUTTON');
  });

  it('should return null when nothing matches', () => {
    renderFixtures(1);

    expect(queryByShadowRole(document.body, 'checkbox')).toBeNull();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => queryByShadowRole(document.body, 'button')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryByShadowRole('button')?.tagName).toBe('BUTTON');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryByShadowRole('button')?.tagName).toBe('BUTTON');
  });
});

describe('getAllByShadowRole()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = getAllByShadowRole(document.body, 'button');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('BUTTON');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(getAllByShadowRole(document.body, 'button')).toHaveLength(2);
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getAllByShadowRole(document.body, 'checkbox')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getAllByShadowRole('button')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getAllByShadowRole('button')).toHaveLength(1);
  });
});

describe('getByShadowRole()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(getByShadowRole(document.body, 'button').tagName).toBe('BUTTON');
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getByShadowRole(document.body, 'checkbox')).toThrow();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => getByShadowRole(document.body, 'button')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getByShadowRole('button').tagName).toBe('BUTTON');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getByShadowRole('button').tagName).toBe('BUTTON');
  });
});

describe('findAllByShadowRole()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findAllByShadowRole(document.body, 'button');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('BUTTON');
  });

  it('should resolve with both matching elements', async () => {
    renderFixtures(2);

    await expect(findAllByShadowRole(document.body, 'button')).resolves.toHaveLength(2);
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findAllByShadowRole(document.body, 'checkbox', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    await expect(screen.findAllByShadowRole('button')).resolves.toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findAllByShadowRole('button');
    expect(result).toHaveLength(1);
  });
});

describe('findByShadowRole()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findByShadowRole(document.body, 'button');
    expect(result.tagName).toBe('BUTTON');
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findByShadowRole(document.body, 'checkbox', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should reject when two elements match', async () => {
    renderFixtures(2);

    const query = findByShadowRole(document.body, 'button', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    const result = await screen.findByShadowRole('button');
    expect(result.tagName).toBe('BUTTON');
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findByShadowRole('button');
    expect(result.tagName).toBe('BUTTON');
  });
});

describe('queryAllByShadowLabelText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = queryAllByShadowLabelText(document.body, 'Label Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('INPUT');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(queryAllByShadowLabelText(document.body, 'Label Target')).toHaveLength(2);
  });

  it('should return an empty array when nothing matches', () => {
    renderFixtures(1);

    expect(queryAllByShadowLabelText(document.body, 'Absent Target')).toEqual([]);
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryAllByShadowLabelText('Label Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryAllByShadowLabelText('Label Target')).toHaveLength(1);
  });
});

describe('queryByShadowLabelText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(queryByShadowLabelText(document.body, 'Label Target')?.tagName).toBe('INPUT');
  });

  it('should return null when nothing matches', () => {
    renderFixtures(1);

    expect(queryByShadowLabelText(document.body, 'Absent Target')).toBeNull();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => queryByShadowLabelText(document.body, 'Label Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryByShadowLabelText('Label Target')?.tagName).toBe('INPUT');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryByShadowLabelText('Label Target')?.tagName).toBe('INPUT');
  });
});

describe('getAllByShadowLabelText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = getAllByShadowLabelText(document.body, 'Label Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('INPUT');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(getAllByShadowLabelText(document.body, 'Label Target')).toHaveLength(2);
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getAllByShadowLabelText(document.body, 'Absent Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getAllByShadowLabelText('Label Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getAllByShadowLabelText('Label Target')).toHaveLength(1);
  });
});

describe('getByShadowLabelText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(getByShadowLabelText(document.body, 'Label Target').tagName).toBe('INPUT');
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getByShadowLabelText(document.body, 'Absent Target')).toThrow();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => getByShadowLabelText(document.body, 'Label Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getByShadowLabelText('Label Target').tagName).toBe('INPUT');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getByShadowLabelText('Label Target').tagName).toBe('INPUT');
  });
});

describe('findAllByShadowLabelText()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findAllByShadowLabelText(document.body, 'Label Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('INPUT');
  });

  it('should resolve with both matching elements', async () => {
    renderFixtures(2);

    await expect(findAllByShadowLabelText(document.body, 'Label Target')).resolves.toHaveLength(2);
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findAllByShadowLabelText(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    await expect(screen.findAllByShadowLabelText('Label Target')).resolves.toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findAllByShadowLabelText('Label Target');
    expect(result).toHaveLength(1);
  });
});

describe('findByShadowLabelText()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findByShadowLabelText(document.body, 'Label Target');
    expect(result.tagName).toBe('INPUT');
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findByShadowLabelText(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should reject when two elements match', async () => {
    renderFixtures(2);

    const query = findByShadowLabelText(document.body, 'Label Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    const result = await screen.findByShadowLabelText('Label Target');
    expect(result.tagName).toBe('INPUT');
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findByShadowLabelText('Label Target');
    expect(result.tagName).toBe('INPUT');
  });
});

describe('queryAllByShadowPlaceholderText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = queryAllByShadowPlaceholderText(document.body, 'Placeholder Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('INPUT');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(queryAllByShadowPlaceholderText(document.body, 'Placeholder Target')).toHaveLength(2);
  });

  it('should return an empty array when nothing matches', () => {
    renderFixtures(1);

    expect(queryAllByShadowPlaceholderText(document.body, 'Absent Target')).toEqual([]);
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryAllByShadowPlaceholderText('Placeholder Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryAllByShadowPlaceholderText('Placeholder Target')).toHaveLength(1);
  });
});

describe('queryByShadowPlaceholderText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(queryByShadowPlaceholderText(document.body, 'Placeholder Target')?.tagName).toBe('INPUT');
  });

  it('should return null when nothing matches', () => {
    renderFixtures(1);

    expect(queryByShadowPlaceholderText(document.body, 'Absent Target')).toBeNull();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => queryByShadowPlaceholderText(document.body, 'Placeholder Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryByShadowPlaceholderText('Placeholder Target')?.tagName).toBe('INPUT');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryByShadowPlaceholderText('Placeholder Target')?.tagName).toBe('INPUT');
  });
});

describe('getAllByShadowPlaceholderText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = getAllByShadowPlaceholderText(document.body, 'Placeholder Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('INPUT');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(getAllByShadowPlaceholderText(document.body, 'Placeholder Target')).toHaveLength(2);
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getAllByShadowPlaceholderText(document.body, 'Absent Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getAllByShadowPlaceholderText('Placeholder Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getAllByShadowPlaceholderText('Placeholder Target')).toHaveLength(1);
  });
});

describe('getByShadowPlaceholderText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(getByShadowPlaceholderText(document.body, 'Placeholder Target').tagName).toBe('INPUT');
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getByShadowPlaceholderText(document.body, 'Absent Target')).toThrow();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => getByShadowPlaceholderText(document.body, 'Placeholder Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getByShadowPlaceholderText('Placeholder Target').tagName).toBe('INPUT');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getByShadowPlaceholderText('Placeholder Target').tagName).toBe('INPUT');
  });
});

describe('findAllByShadowPlaceholderText()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findAllByShadowPlaceholderText(document.body, 'Placeholder Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('INPUT');
  });

  it('should resolve with both matching elements', async () => {
    renderFixtures(2);

    await expect(findAllByShadowPlaceholderText(document.body, 'Placeholder Target')).resolves.toHaveLength(2);
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findAllByShadowPlaceholderText(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    await expect(screen.findAllByShadowPlaceholderText('Placeholder Target')).resolves.toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findAllByShadowPlaceholderText('Placeholder Target');
    expect(result).toHaveLength(1);
  });
});

describe('findByShadowPlaceholderText()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findByShadowPlaceholderText(document.body, 'Placeholder Target');
    expect(result.tagName).toBe('INPUT');
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findByShadowPlaceholderText(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should reject when two elements match', async () => {
    renderFixtures(2);

    const query = findByShadowPlaceholderText(document.body, 'Placeholder Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    const result = await screen.findByShadowPlaceholderText('Placeholder Target');
    expect(result.tagName).toBe('INPUT');
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findByShadowPlaceholderText('Placeholder Target');
    expect(result.tagName).toBe('INPUT');
  });
});

describe('queryAllByShadowText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = queryAllByShadowText(document.body, 'Text Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('SPAN');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(queryAllByShadowText(document.body, 'Text Target')).toHaveLength(2);
  });

  it('should return an empty array when nothing matches', () => {
    renderFixtures(1);

    expect(queryAllByShadowText(document.body, 'Absent Target')).toEqual([]);
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryAllByShadowText('Text Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryAllByShadowText('Text Target')).toHaveLength(1);
  });
});

describe('queryByShadowText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(queryByShadowText(document.body, 'Text Target')?.tagName).toBe('SPAN');
  });

  it('should return null when nothing matches', () => {
    renderFixtures(1);

    expect(queryByShadowText(document.body, 'Absent Target')).toBeNull();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => queryByShadowText(document.body, 'Text Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryByShadowText('Text Target')?.tagName).toBe('SPAN');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryByShadowText('Text Target')?.tagName).toBe('SPAN');
  });
});

describe('getAllByShadowText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = getAllByShadowText(document.body, 'Text Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('SPAN');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(getAllByShadowText(document.body, 'Text Target')).toHaveLength(2);
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getAllByShadowText(document.body, 'Absent Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getAllByShadowText('Text Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getAllByShadowText('Text Target')).toHaveLength(1);
  });
});

describe('getByShadowText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(getByShadowText(document.body, 'Text Target').tagName).toBe('SPAN');
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getByShadowText(document.body, 'Absent Target')).toThrow();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => getByShadowText(document.body, 'Text Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getByShadowText('Text Target').tagName).toBe('SPAN');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getByShadowText('Text Target').tagName).toBe('SPAN');
  });
});

describe('findAllByShadowText()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findAllByShadowText(document.body, 'Text Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('SPAN');
  });

  it('should resolve with both matching elements', async () => {
    renderFixtures(2);

    await expect(findAllByShadowText(document.body, 'Text Target')).resolves.toHaveLength(2);
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findAllByShadowText(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    await expect(screen.findAllByShadowText('Text Target')).resolves.toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findAllByShadowText('Text Target');
    expect(result).toHaveLength(1);
  });
});

describe('findByShadowText()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findByShadowText(document.body, 'Text Target');
    expect(result.tagName).toBe('SPAN');
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findByShadowText(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should reject when two elements match', async () => {
    renderFixtures(2);

    const query = findByShadowText(document.body, 'Text Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    const result = await screen.findByShadowText('Text Target');
    expect(result.tagName).toBe('SPAN');
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findByShadowText('Text Target');
    expect(result.tagName).toBe('SPAN');
  });
});

describe('queryAllByShadowDisplayValue()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = queryAllByShadowDisplayValue(document.body, 'Display Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('INPUT');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(queryAllByShadowDisplayValue(document.body, 'Display Target')).toHaveLength(2);
  });

  it('should return an empty array when nothing matches', () => {
    renderFixtures(1);

    expect(queryAllByShadowDisplayValue(document.body, 'Absent Target')).toEqual([]);
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryAllByShadowDisplayValue('Display Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryAllByShadowDisplayValue('Display Target')).toHaveLength(1);
  });
});

describe('queryByShadowDisplayValue()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(queryByShadowDisplayValue(document.body, 'Display Target')?.tagName).toBe('INPUT');
  });

  it('should return null when nothing matches', () => {
    renderFixtures(1);

    expect(queryByShadowDisplayValue(document.body, 'Absent Target')).toBeNull();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => queryByShadowDisplayValue(document.body, 'Display Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryByShadowDisplayValue('Display Target')?.tagName).toBe('INPUT');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryByShadowDisplayValue('Display Target')?.tagName).toBe('INPUT');
  });
});

describe('getAllByShadowDisplayValue()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = getAllByShadowDisplayValue(document.body, 'Display Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('INPUT');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(getAllByShadowDisplayValue(document.body, 'Display Target')).toHaveLength(2);
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getAllByShadowDisplayValue(document.body, 'Absent Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getAllByShadowDisplayValue('Display Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getAllByShadowDisplayValue('Display Target')).toHaveLength(1);
  });
});

describe('getByShadowDisplayValue()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(getByShadowDisplayValue(document.body, 'Display Target').tagName).toBe('INPUT');
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getByShadowDisplayValue(document.body, 'Absent Target')).toThrow();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => getByShadowDisplayValue(document.body, 'Display Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getByShadowDisplayValue('Display Target').tagName).toBe('INPUT');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getByShadowDisplayValue('Display Target').tagName).toBe('INPUT');
  });
});

describe('findAllByShadowDisplayValue()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findAllByShadowDisplayValue(document.body, 'Display Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('INPUT');
  });

  it('should resolve with both matching elements', async () => {
    renderFixtures(2);

    await expect(findAllByShadowDisplayValue(document.body, 'Display Target')).resolves.toHaveLength(2);
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findAllByShadowDisplayValue(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    await expect(screen.findAllByShadowDisplayValue('Display Target')).resolves.toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findAllByShadowDisplayValue('Display Target');
    expect(result).toHaveLength(1);
  });
});

describe('findByShadowDisplayValue()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findByShadowDisplayValue(document.body, 'Display Target');
    expect(result.tagName).toBe('INPUT');
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findByShadowDisplayValue(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should reject when two elements match', async () => {
    renderFixtures(2);

    const query = findByShadowDisplayValue(document.body, 'Display Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    const result = await screen.findByShadowDisplayValue('Display Target');
    expect(result.tagName).toBe('INPUT');
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findByShadowDisplayValue('Display Target');
    expect(result.tagName).toBe('INPUT');
  });
});

describe('queryAllByShadowAltText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = queryAllByShadowAltText(document.body, 'Alt Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('IMG');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(queryAllByShadowAltText(document.body, 'Alt Target')).toHaveLength(2);
  });

  it('should return an empty array when nothing matches', () => {
    renderFixtures(1);

    expect(queryAllByShadowAltText(document.body, 'Absent Target')).toEqual([]);
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryAllByShadowAltText('Alt Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryAllByShadowAltText('Alt Target')).toHaveLength(1);
  });
});

describe('queryByShadowAltText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(queryByShadowAltText(document.body, 'Alt Target')?.tagName).toBe('IMG');
  });

  it('should return null when nothing matches', () => {
    renderFixtures(1);

    expect(queryByShadowAltText(document.body, 'Absent Target')).toBeNull();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => queryByShadowAltText(document.body, 'Alt Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryByShadowAltText('Alt Target')?.tagName).toBe('IMG');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryByShadowAltText('Alt Target')?.tagName).toBe('IMG');
  });
});

describe('getAllByShadowAltText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = getAllByShadowAltText(document.body, 'Alt Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('IMG');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(getAllByShadowAltText(document.body, 'Alt Target')).toHaveLength(2);
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getAllByShadowAltText(document.body, 'Absent Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getAllByShadowAltText('Alt Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getAllByShadowAltText('Alt Target')).toHaveLength(1);
  });
});

describe('getByShadowAltText()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(getByShadowAltText(document.body, 'Alt Target').tagName).toBe('IMG');
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getByShadowAltText(document.body, 'Absent Target')).toThrow();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => getByShadowAltText(document.body, 'Alt Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getByShadowAltText('Alt Target').tagName).toBe('IMG');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getByShadowAltText('Alt Target').tagName).toBe('IMG');
  });
});

describe('findAllByShadowAltText()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findAllByShadowAltText(document.body, 'Alt Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('IMG');
  });

  it('should resolve with both matching elements', async () => {
    renderFixtures(2);

    await expect(findAllByShadowAltText(document.body, 'Alt Target')).resolves.toHaveLength(2);
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findAllByShadowAltText(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    await expect(screen.findAllByShadowAltText('Alt Target')).resolves.toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findAllByShadowAltText('Alt Target');
    expect(result).toHaveLength(1);
  });
});

describe('findByShadowAltText()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findByShadowAltText(document.body, 'Alt Target');
    expect(result.tagName).toBe('IMG');
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findByShadowAltText(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should reject when two elements match', async () => {
    renderFixtures(2);

    const query = findByShadowAltText(document.body, 'Alt Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    const result = await screen.findByShadowAltText('Alt Target');
    expect(result.tagName).toBe('IMG');
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findByShadowAltText('Alt Target');
    expect(result.tagName).toBe('IMG');
  });
});

describe('queryAllByShadowTitle()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = queryAllByShadowTitle(document.body, 'Title Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('DIV');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(queryAllByShadowTitle(document.body, 'Title Target')).toHaveLength(2);
  });

  it('should return an empty array when nothing matches', () => {
    renderFixtures(1);

    expect(queryAllByShadowTitle(document.body, 'Absent Target')).toEqual([]);
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryAllByShadowTitle('Title Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryAllByShadowTitle('Title Target')).toHaveLength(1);
  });
});

describe('queryByShadowTitle()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(queryByShadowTitle(document.body, 'Title Target')?.tagName).toBe('DIV');
  });

  it('should return null when nothing matches', () => {
    renderFixtures(1);

    expect(queryByShadowTitle(document.body, 'Absent Target')).toBeNull();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => queryByShadowTitle(document.body, 'Title Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryByShadowTitle('Title Target')?.tagName).toBe('DIV');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryByShadowTitle('Title Target')?.tagName).toBe('DIV');
  });
});

describe('getAllByShadowTitle()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = getAllByShadowTitle(document.body, 'Title Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('DIV');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(getAllByShadowTitle(document.body, 'Title Target')).toHaveLength(2);
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getAllByShadowTitle(document.body, 'Absent Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getAllByShadowTitle('Title Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getAllByShadowTitle('Title Target')).toHaveLength(1);
  });
});

describe('getByShadowTitle()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(getByShadowTitle(document.body, 'Title Target').tagName).toBe('DIV');
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getByShadowTitle(document.body, 'Absent Target')).toThrow();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => getByShadowTitle(document.body, 'Title Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getByShadowTitle('Title Target').tagName).toBe('DIV');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getByShadowTitle('Title Target').tagName).toBe('DIV');
  });
});

describe('findAllByShadowTitle()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findAllByShadowTitle(document.body, 'Title Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('DIV');
  });

  it('should resolve with both matching elements', async () => {
    renderFixtures(2);

    await expect(findAllByShadowTitle(document.body, 'Title Target')).resolves.toHaveLength(2);
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findAllByShadowTitle(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    await expect(screen.findAllByShadowTitle('Title Target')).resolves.toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findAllByShadowTitle('Title Target');
    expect(result).toHaveLength(1);
  });
});

describe('findByShadowTitle()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findByShadowTitle(document.body, 'Title Target');
    expect(result.tagName).toBe('DIV');
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findByShadowTitle(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should reject when two elements match', async () => {
    renderFixtures(2);

    const query = findByShadowTitle(document.body, 'Title Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    const result = await screen.findByShadowTitle('Title Target');
    expect(result.tagName).toBe('DIV');
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findByShadowTitle('Title Target');
    expect(result.tagName).toBe('DIV');
  });
});

describe('queryAllByShadowTestId()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = queryAllByShadowTestId(document.body, 'TestId Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('DIV');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(queryAllByShadowTestId(document.body, 'TestId Target')).toHaveLength(2);
  });

  it('should return an empty array when nothing matches', () => {
    renderFixtures(1);

    expect(queryAllByShadowTestId(document.body, 'Absent Target')).toEqual([]);
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryAllByShadowTestId('TestId Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryAllByShadowTestId('TestId Target')).toHaveLength(1);
  });
});

describe('queryByShadowTestId()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(queryByShadowTestId(document.body, 'TestId Target')?.tagName).toBe('DIV');
  });

  it('should return null when nothing matches', () => {
    renderFixtures(1);

    expect(queryByShadowTestId(document.body, 'Absent Target')).toBeNull();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => queryByShadowTestId(document.body, 'TestId Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.queryByShadowTestId('TestId Target')?.tagName).toBe('DIV');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).queryByShadowTestId('TestId Target')?.tagName).toBe('DIV');
  });
});

describe('getAllByShadowTestId()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    const result = getAllByShadowTestId(document.body, 'TestId Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('DIV');
  });

  it('should return both matching elements', () => {
    renderFixtures(2);

    expect(getAllByShadowTestId(document.body, 'TestId Target')).toHaveLength(2);
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getAllByShadowTestId(document.body, 'Absent Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getAllByShadowTestId('TestId Target')).toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getAllByShadowTestId('TestId Target')).toHaveLength(1);
  });
});

describe('getByShadowTestId()', () => {
  it('should return the matching element from inside the shadow root', () => {
    renderFixtures(1);

    expect(getByShadowTestId(document.body, 'TestId Target').tagName).toBe('DIV');
  });

  it('should throw when nothing matches', () => {
    renderFixtures(1);

    expect(() => getByShadowTestId(document.body, 'Absent Target')).toThrow();
  });

  it('should throw when two elements match', () => {
    renderFixtures(2);

    expect(() => getByShadowTestId(document.body, 'TestId Target')).toThrow();
  });

  it('should be exposed on screen bound to the document', () => {
    renderFixtures(1);

    expect(screen.getByShadowTestId('TestId Target').tagName).toBe('DIV');
  });

  it('should be exposed on within bound to the given container', () => {
    renderFixtures(1);

    expect(within(document.body).getByShadowTestId('TestId Target').tagName).toBe('DIV');
  });
});

describe('findAllByShadowTestId()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findAllByShadowTestId(document.body, 'TestId Target');
    expect(result).toHaveLength(1);
    expect(result[0].tagName).toBe('DIV');
  });

  it('should resolve with both matching elements', async () => {
    renderFixtures(2);

    await expect(findAllByShadowTestId(document.body, 'TestId Target')).resolves.toHaveLength(2);
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findAllByShadowTestId(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    await expect(screen.findAllByShadowTestId('TestId Target')).resolves.toHaveLength(1);
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findAllByShadowTestId('TestId Target');
    expect(result).toHaveLength(1);
  });
});

describe('findByShadowTestId()', () => {
  it('should resolve with the matching element from inside the shadow root', async () => {
    renderFixtures(1);

    const result = await findByShadowTestId(document.body, 'TestId Target');
    expect(result.tagName).toBe('DIV');
  });

  it('should reject when nothing matches', async () => {
    renderFixtures(1);

    const query = findByShadowTestId(document.body, 'Absent Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should reject when two elements match', async () => {
    renderFixtures(2);

    const query = findByShadowTestId(document.body, 'TestId Target', undefined, SHORT_WAIT);
    await expect(query).rejects.toThrow();
  });

  it('should be exposed on screen bound to the document', async () => {
    renderFixtures(1);

    const result = await screen.findByShadowTestId('TestId Target');
    expect(result.tagName).toBe('DIV');
  });

  it('should be exposed on within bound to the given container', async () => {
    renderFixtures(1);

    const result = await within(document.body).findByShadowTestId('TestId Target');
    expect(result.tagName).toBe('DIV');
  });
});
