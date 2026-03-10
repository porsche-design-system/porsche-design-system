import { AI_TAG_ICONS, AI_TAG_ICON_PATHS, AI_TAG_TRANSLATIONS, getAiTagText } from './ai-tag-utils';

describe('AI_TAG_ICONS', () => {
  it('should contain 10 icons', () => {
    expect(AI_TAG_ICONS).toHaveLength(10);
  });
});

describe('AI_TAG_ICON_PATHS', () => {
  it('should have a path entry for each icon', () => {
    for (const icon of AI_TAG_ICONS) {
      expect(AI_TAG_ICON_PATHS[icon]).toBeDefined();
      expect(AI_TAG_ICON_PATHS[icon]).toContain('<path');
    }
  });
});

describe('AI_TAG_TRANSLATIONS', () => {
  it('should contain translations for all supported locales', () => {
    expect(Object.keys(AI_TAG_TRANSLATIONS).length).toBeGreaterThanOrEqual(26);
  });

  it('should have abbreviation and longdesc text for each locale', () => {
    for (const entry of Object.values(AI_TAG_TRANSLATIONS)) {
      expect(entry).toHaveProperty('abbreviation');
      expect(entry).toHaveProperty('longdesc');
      expect(entry.abbreviation.length).toBeGreaterThan(0);
      expect(entry.longdesc.length).toBeGreaterThan(0);
    }
  });

  it.each<[string, string]>([
    ['de_DE', 'KI'],
    ['en_US', 'AI'],
    ['en_GB', 'AI'],
    ['da_DK', 'KI'],
    ['fi_FI', 'AI'],
    ['fr_FR', 'IA'],
    ['el_GR', 'ΤΝ'],
    ['it_IT', 'IA'],
    ['hr_HR', 'UI'],
    ['nl_NL', 'AI'],
    ['nb_NO', 'KI'],
    ['pl_PL', 'SI'],
    ['pt_PT', 'IA'],
    ['ro_RO', 'IA'],
    ['sv_SE', 'AI'],
    ['sk_SK', 'UI'],
    ['sl_SI', 'UI'],
    ['es_ES', 'IA'],
    ['cs_CZ', 'UI'],
    ['hu_HU', 'MI'],
    ['mt_MT', 'AI'],
    ['bg_BG', 'ИИ'],
    ['en_CY', 'AI'],
    ['et_EE', 'TI'],
    ['lv_LV', 'MI'],
    ['lt_LT', 'DI'],
  ])('should return correct abbreviation for locale: %s → %s', (locale, expected) => {
    expect(AI_TAG_TRANSLATIONS[locale].abbreviation).toBe(expected);
  });

  it.each<[string, string]>([
    ['de_DE', 'Künstliche Intelligenz'],
    ['en_US', 'Artificial Intelligence'],
    ['en_GB', 'Artificial Intelligence'],
    ['da_DK', 'Kunstig intelligens'],
    ['fi_FI', 'Tekoäly'],
    ['fr_FR', 'Intelligence artificielle'],
    ['el_GR', 'Τεχνητή νοημοσύνη'],
    ['it_IT', 'Intelligenza artificiale'],
    ['hr_HR', 'Umjetna inteligencija'],
    ['nl_NL', 'Kunstmatige intelligentie'],
    ['nb_NO', 'Kunstig intelligens'],
    ['pl_PL', 'Sztuczna inteligencja'],
    ['pt_PT', 'Inteligência artificial'],
    ['ro_RO', 'Inteligență artificială'],
    ['sv_SE', 'Artificiell intelligens'],
    ['sk_SK', 'Umelá inteligencia'],
    ['sl_SI', 'Umetna inteligenca'],
    ['es_ES', 'Inteligencia artificial'],
    ['cs_CZ', 'Umělá inteligence'],
    ['hu_HU', 'Mesterséges intelligencia'],
    ['mt_MT', 'Artificial Intelligence'],
    ['bg_BG', 'Изкуствен интелект'],
    ['en_CY', 'Artificial Intelligence'],
    ['et_EE', 'Tehisintellekt'],
    ['lv_LV', 'Mākslīgais intelekts'],
    ['lt_LT', 'Dirbtinis intelektas'],
  ])('should return correct longdesc text for locale: %s → %s', (locale, expected) => {
    expect(AI_TAG_TRANSLATIONS[locale].longdesc).toBe(expected);
  });
});

describe('getAiTagText()', () => {
  it('should return abbreviation by default', () => {
    expect(getAiTagText('de_DE')).toBe('KI');
    expect(getAiTagText('fr_FR')).toBe('IA');
    expect(getAiTagText('en_US')).toBe('AI');
  });

  it('should return abbreviation when variant is "abbreviation"', () => {
    expect(getAiTagText('de_DE', 'abbreviation')).toBe('KI');
  });

  it('should return longdesc text when variant is "longdesc"', () => {
    expect(getAiTagText('de_DE', 'longdesc')).toBe('Künstliche Intelligenz');
    expect(getAiTagText('en_US', 'longdesc')).toBe('Artificial Intelligence');
    expect(getAiTagText('fr_FR', 'longdesc')).toBe('Intelligence artificielle');
  });

  it('should return default "AI" for unknown locale', () => {
    expect(getAiTagText('xx_XX')).toBe('AI');
    expect(getAiTagText('')).toBe('AI');
  });

  it('should return default longdesc text for unknown locale', () => {
    expect(getAiTagText('xx_XX', 'longdesc')).toBe('Artificial Intelligence');
  });
});
