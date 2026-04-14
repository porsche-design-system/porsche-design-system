import { AI_TAG_ICON_PATH, AI_TAG_TRANSLATIONS, type AiTagLocale, getAiTagTranslation } from './ai-tag-utils';

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

  it('should have short, long, generated and modified for each locale', () => {
    for (const entry of Object.values(AI_TAG_TRANSLATIONS)) {
      expect(entry).toHaveProperty('short');
      expect(entry).toHaveProperty('long');
      expect(entry).toHaveProperty('generated');
      expect(entry).toHaveProperty('modified');
      expect(entry.short.length).toBeGreaterThan(0);
      expect(entry.long.length).toBeGreaterThan(0);
    }
  });

  it.each<[AiTagLocale, string]>([
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
  ])('should return correct abbreviation text for locale: %s → %s', (locale, expected) => {
    expect(AI_TAG_TRANSLATIONS[locale].short).toBe(expected);
  });

  it.each<[AiTagLocale, string]>([
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
    expect(AI_TAG_TRANSLATIONS[locale].long).toBe(expected);
  });
});

describe('getAiTagTranslation()', () => {
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
  ])('should return correct short text for locale: %s → %s', (locale, expected) => {
    expect(getAiTagTranslation(locale).short).toBe(expected);
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
  ])('should return correct long text for locale: %s → %s', (locale, expected) => {
    expect(getAiTagTranslation(locale).long).toBe(expected);
  });

  it('should return generated and modified for each locale', () => {
    for (const locale of Object.keys(AI_TAG_TRANSLATIONS)) {
      const entry = getAiTagTranslation(locale);
      expect(entry.generated).toBeDefined();
      expect(entry.modified).toBeDefined();
    }
  });

  it('should fall back to en_US for unknown locale', () => {
    const entry = getAiTagTranslation('xx_XX');
    expect(entry.short).toBe('AI');
    expect(entry.long).toBe('Artificial Intelligence');
  });

  it('should fall back to en_US for empty locale', () => {
    const entry = getAiTagTranslation('');
    expect(entry.short).toBe('AI');
    expect(entry.long).toBe('Artificial Intelligence');
  });
});
