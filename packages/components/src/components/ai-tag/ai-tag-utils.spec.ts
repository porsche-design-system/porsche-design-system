import {
  AI_TAG_ICON_PATH,
  AI_TAG_LOCALES,
  AI_TAG_LOCALES_ACCEPTED,
  AI_TAG_TRANSLATIONS,
  AI_TAG_VARIANTS,
  type AiTagLocale,
  type AiTagLocaleCanonical,
  getAiTagTranslation,
  normalizeAiTagLocale,
} from './ai-tag-utils';

describe('AI_TAG_VARIANTS', () => {
  it('should list supported variant prop values', () => {
    expect(AI_TAG_VARIANTS).toStrictEqual(['abbreviation', 'generated', 'modified']);
  });
});

describe('AI_TAG_ICON_PATH', () => {
  it('should contain a valid SVG path', () => {
    expect(AI_TAG_ICON_PATH).toBeDefined();
    expect(AI_TAG_ICON_PATH).toContain('<path');
  });
});

describe('AI_TAG_TRANSLATIONS', () => {
  it('should contain translations for all supported locales', () => {
    expect(Object.keys(AI_TAG_TRANSLATIONS).length).toBe(35);
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

  it.each<[AiTagLocaleCanonical, string]>([
    ['bg_BG', 'ИИ'],
    ['bs_BA', 'AI'],
    ['cs_CZ', 'AI'],
    ['da_DK', 'KI'],
    ['de_DE', 'KI'],
    ['el_GR', 'ΤΝ'],
    ['en_CY', 'AI'],
    ['en_GB', 'AI'],
    ['en_US', 'AI'],
    ['es_ES', 'IA'],
    ['et_EE', 'TI'],
    ['fi_FI', 'AI'],
    ['fr_FR', 'IA'],
    ['he_IL', 'AI'],
    ['hr_HR', 'UI'],
    ['hu_HU', 'MI'],
    ['is_IS', 'AI'],
    ['it_IT', 'IA'],
    ['lt_LT', 'DI'],
    ['lv_LV', 'MI'],
    ['me_ME', 'AI'],
    ['mk_MK', 'ВИ'],
    ['mt_MT', 'AI'],
    ['nb_NO', 'KI'],
    ['nl_NL', 'AI'],
    ['pl_PL', 'SI'],
    ['pt_PT', 'IA'],
    ['ro_RO', 'IA'],
    ['ru_RU', 'ИИ'],
    ['sk_SK', 'AI'],
    ['sl_SI', 'UI'],
    ['sr_RS', 'AI'],
    ['sv_SE', 'AI'],
    ['tr_TR', 'AI'],
    ['uk_UA', 'ШІ'],
  ])('should return correct short text for locale: %s → %s', (locale, expected) => {
    expect(AI_TAG_TRANSLATIONS[locale].short).toBe(expected);
  });

  it.each<[AiTagLocaleCanonical, string]>([
    ['bg_BG', 'изкуствен интелект'],
    ['bs_BA', 'vještačka inteligencija'],
    ['cs_CZ', 'umělá inteligence'],
    ['da_DK', 'kunstig intelligens'],
    ['de_DE', 'künstliche Intelligenz'],
    ['el_GR', 'τεχνητή νοημοσύνη'],
    ['en_CY', 'artificial intelligence'],
    ['en_GB', 'artificial intelligence'],
    ['en_US', 'artificial intelligence'],
    ['es_ES', 'inteligencia artificial'],
    ['et_EE', 'tehisintellekt'],
    ['fi_FI', 'tekoäly'],
    ['fr_FR', 'intelligence artificielle'],
    ['he_IL', 'בינה מלאכותית'],
    ['hr_HR', 'umjetna inteligencija'],
    ['hu_HU', 'mesterséges intelligencia'],
    ['is_IS', 'gervigreind'],
    ['it_IT', 'intelligenza artificiale'],
    ['lt_LT', 'dirbtinis intelektas'],
    ['lv_LV', 'mākslīgais intelekts'],
    ['me_ME', 'veštačka inteligencija'],
    ['mk_MK', 'вештачка интелигенција'],
    ['mt_MT', 'artificial intelligence'],
    ['nb_NO', 'kunstig intelligens'],
    ['nl_NL', 'kunstmatige intelligentie'],
    ['pl_PL', 'sztuczna inteligencja'],
    ['pt_PT', 'inteligência artificial'],
    ['ro_RO', 'inteligență artificială'],
    ['ru_RU', 'искусственный интеллект'],
    ['sk_SK', 'umelá inteligencia'],
    ['sl_SI', 'umetna inteligenca'],
    ['sr_RS', 'veštačka inteligencija'],
    ['sv_SE', 'artificiell intelligens'],
    ['tr_TR', 'yapay zeka'],
    ['uk_UA', 'штучний інтелект'],
  ])('should return correct long text for locale: %s → %s', (locale, expected) => {
    expect(AI_TAG_TRANSLATIONS[locale].long).toBe(expected);
  });
});

describe('AI_TAG_LOCALES_ACCEPTED', () => {
  it('should include both POSIX and BCP47 forms for every canonical locale', () => {
    expect(AI_TAG_LOCALES.length).toBe(35);
    expect(AI_TAG_LOCALES_ACCEPTED.length).toBe(70);
    for (const locale of AI_TAG_LOCALES) {
      expect(AI_TAG_LOCALES_ACCEPTED).toContain(locale);
      expect(AI_TAG_LOCALES_ACCEPTED).toContain(locale.replace(/_/g, '-'));
    }
  });
});

describe('normalizeAiTagLocale()', () => {
  it.each([
    ['en_US', 'en_US'],
    ['en-US', 'en_US'],
    ['de-DE', 'de_DE'],
    ['zh-Hans-CN', 'zh_Hans_CN'],
  ])('should normalize %s to %s', (input, expected) => {
    expect(normalizeAiTagLocale(input)).toBe(expected);
  });
});

describe('getAiTagTranslation()', () => {
  it.each<[AiTagLocale, string]>([
    ['bg_BG', 'ИИ'],
    ['bs_BA', 'AI'],
    ['cs_CZ', 'AI'],
    ['da_DK', 'KI'],
    ['de_DE', 'KI'],
    ['el_GR', 'ΤΝ'],
    ['en_CY', 'AI'],
    ['en_GB', 'AI'],
    ['en_US', 'AI'],
    ['es_ES', 'IA'],
    ['et_EE', 'TI'],
    ['fi_FI', 'AI'],
    ['fr_FR', 'IA'],
    ['he_IL', 'AI'],
    ['hr_HR', 'UI'],
    ['hu_HU', 'MI'],
    ['is_IS', 'AI'],
    ['it_IT', 'IA'],
    ['lt_LT', 'DI'],
    ['lv_LV', 'MI'],
    ['me_ME', 'AI'],
    ['mk_MK', 'ВИ'],
    ['mt_MT', 'AI'],
    ['nb_NO', 'KI'],
    ['nl_NL', 'AI'],
    ['pl_PL', 'SI'],
    ['pt_PT', 'IA'],
    ['ro_RO', 'IA'],
    ['ru_RU', 'ИИ'],
    ['sk_SK', 'AI'],
    ['sl_SI', 'UI'],
    ['sr_RS', 'AI'],
    ['sv_SE', 'AI'],
    ['tr_TR', 'AI'],
    ['uk_UA', 'ШІ'],
  ])('should return correct short text for locale: %s → %s', (locale, expected) => {
    expect(getAiTagTranslation(locale).short).toBe(expected);
  });

  it.each<[AiTagLocale, string]>([
    ['bg_BG', 'изкуствен интелект'],
    ['bs_BA', 'vještačka inteligencija'],
    ['cs_CZ', 'umělá inteligence'],
    ['da_DK', 'kunstig intelligens'],
    ['de_DE', 'künstliche Intelligenz'],
    ['el_GR', 'τεχνητή νοημοσύνη'],
    ['en_CY', 'artificial intelligence'],
    ['en_GB', 'artificial intelligence'],
    ['en_US', 'artificial intelligence'],
    ['es_ES', 'inteligencia artificial'],
    ['et_EE', 'tehisintellekt'],
    ['fi_FI', 'tekoäly'],
    ['fr_FR', 'intelligence artificielle'],
    ['he_IL', 'בינה מלאכותית'],
    ['hr_HR', 'umjetna inteligencija'],
    ['hu_HU', 'mesterséges intelligencia'],
    ['is_IS', 'gervigreind'],
    ['it_IT', 'intelligenza artificiale'],
    ['lt_LT', 'dirbtinis intelektas'],
    ['lv_LV', 'mākslīgais intelekts'],
    ['me_ME', 'veštačka inteligencija'],
    ['mk_MK', 'вештачка интелигенција'],
    ['mt_MT', 'artificial intelligence'],
    ['nb_NO', 'kunstig intelligens'],
    ['nl_NL', 'kunstmatige intelligentie'],
    ['pl_PL', 'sztuczna inteligencja'],
    ['pt_PT', 'inteligência artificial'],
    ['ro_RO', 'inteligență artificială'],
    ['ru_RU', 'искусственный интеллект'],
    ['sk_SK', 'umelá inteligencia'],
    ['sl_SI', 'umetna inteligenca'],
    ['sr_RS', 'veštačka inteligencija'],
    ['sv_SE', 'artificiell intelligens'],
    ['tr_TR', 'yapay zeka'],
    ['uk_UA', 'штучний інтелект'],
  ])('should return correct long text for locale: %s → %s', (locale, expected) => {
    expect(getAiTagTranslation(locale).long).toBe(expected);
  });

  it.each<[AiTagLocale, string]>([
    ['de-DE', 'KI'],
    ['en-US', 'AI'],
    ['fr-FR', 'IA'],
    ['uk-UA', 'ШІ'],
  ])('should resolve BCP47 locale %s like POSIX', (locale, expectedShort) => {
    expect(getAiTagTranslation(locale).short).toBe(expectedShort);
    expect(getAiTagTranslation(locale)).toStrictEqual(getAiTagTranslation(normalizeAiTagLocale(locale)));
  });

  it('should return generated and modified (full label strings) for each locale', () => {
    for (const locale of Object.keys(AI_TAG_TRANSLATIONS)) {
      const entry = getAiTagTranslation(locale);
      expect(entry.generated).toBeDefined();
      expect(entry.modified).toBeDefined();
      expect(entry.generated.length).toBeGreaterThan(0);
      expect(entry.modified.length).toBeGreaterThan(0);
    }
  });

  it('should use full localized phrases for en_US (not short + composition)', () => {
    const en = getAiTagTranslation('en_US');
    expect(en.generated).toBe('AI-generated');
    expect(en.modified).toBe('AI-modified');
  });

  it('should use full localized phrases for bg_BG (not acronym-only composition)', () => {
    const bg = getAiTagTranslation('bg_BG');
    expect(bg.generated).toBe('генериран от изкуствен интелект');
    expect(bg.modified).toBe('модифициран от изкуствен интелект');
  });

  it('should fall back to en_US for unknown locale', () => {
    const entry = getAiTagTranslation('xx_XX');
    expect(entry.short).toBe('AI');
    expect(entry.long).toBe('artificial intelligence');
    expect(entry.generated).toBe('AI-generated');
    expect(entry.modified).toBe('AI-modified');
  });

  it('should fall back to en_US for unknown BCP47 locale', () => {
    const entry = getAiTagTranslation('xx-XX');
    expect(entry).toStrictEqual(AI_TAG_TRANSLATIONS.en_US);
  });

  it('should fall back to en_US for empty locale', () => {
    const entry = getAiTagTranslation('');
    expect(entry.short).toBe('AI');
    expect(entry.long).toBe('artificial intelligence');
  });
});
