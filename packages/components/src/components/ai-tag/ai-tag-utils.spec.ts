import { AI_TAG_ICON_PATH, AI_TAG_TRANSLATIONS, getAiTagText } from './ai-tag-utils';

describe('AI_TAG_ICON_PATH', () => {
  it('should contain a valid SVG path', () => {
    expect(AI_TAG_ICON_PATH).toBeDefined();
    expect(AI_TAG_ICON_PATH).toContain('<path');
  });
});

describe('AI_TAG_TRANSLATIONS', () => {
  it('should contain translations for all supported locales', () => {
    expect(Object.keys(AI_TAG_TRANSLATIONS).length).toBeGreaterThanOrEqual(26);
  });

  it('should have abbreviation and long-form text for each locale', () => {
    for (const entry of Object.values(AI_TAG_TRANSLATIONS)) {
      expect(entry).toHaveProperty('abbreviation');
      expect(entry).toHaveProperty('long-form');
      expect(entry.abbreviation.length).toBeGreaterThan(0);
      expect(entry['long-form'].length).toBeGreaterThan(0);
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
  ])('should return correct long-form text for locale: %s → %s', (locale, expected) => {
    expect(AI_TAG_TRANSLATIONS[locale]['long-form']).toBe(expected);
  });
});

describe('getAiTagText()', () => {
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
  ])('should return abbreviation by default for locale: %s → %s', (locale, expected) => {
    expect(getAiTagText(locale)).toBe(expected);
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
  ])('should return abbreviation for locale: %s → %s', (locale, expected) => {
    expect(getAiTagText(locale, 'abbreviation')).toBe(expected);
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
  ])('should return long-form for locale: %s → %s', (locale, expected) => {
    expect(getAiTagText(locale, 'long-form')).toBe(expected);
  });

  it('should return default "AI" for unknown locale', () => {
    expect(getAiTagText('xx_XX')).toBe('AI');
    expect(getAiTagText('')).toBe('AI');
  });

  it('should return default long-form text for unknown locale', () => {
    expect(getAiTagText('xx_XX', 'long-form')).toBe('Artificial Intelligence');
  });
});
