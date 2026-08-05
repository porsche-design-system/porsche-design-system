import {
  AI_TAG_ICON_PATH,
  AI_TAG_LOCALES_ACCEPTED,
  AI_TAG_LOCALES_ACCEPTED_DEPRECATED,
  AI_TAG_TRANSLATIONS,
  AI_TAG_VARIANTS,
  type AiTagTranslationLanguage,
  getAiTagLanguage,
  getAiTagTranslation,
  MARKET_LOCALES,
  normalizeAiTagLocale,
  resolveAiTagTranslationLanguage,
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
  it('should use bare language keys (no POSIX region suffixes)', () => {
    const keys = Object.keys(AI_TAG_TRANSLATIONS);
    expect(keys.length).toBe(33);
    expect(keys).toContain('en');
    expect(keys).not.toContain('en_US');
    expect(keys.every((key) => !key.includes('_') && !key.includes('-'))).toBe(true);
  });

  it('should have short, long, generated and modified for each language', () => {
    for (const entry of Object.values(AI_TAG_TRANSLATIONS)) {
      expect(entry).toHaveProperty('short');
      expect(entry).toHaveProperty('long');
      expect(entry).toHaveProperty('generated');
      expect(entry).toHaveProperty('modified');
      expect(entry.short.length).toBeGreaterThan(0);
      expect(entry.long.length).toBeGreaterThan(0);
    }
  });

  it.each<[AiTagTranslationLanguage, string]>([
    ['bg', 'ИИ'],
    ['bs', 'AI'],
    ['cs', 'AI'],
    ['da', 'KI'],
    ['de', 'KI'],
    ['el', 'ΤΝ'],
    ['en', 'AI'],
    ['es', 'IA'],
    ['et', 'TI'],
    ['fi', 'AI'],
    ['fr', 'IA'],
    ['he', 'AI'],
    ['hr', 'UI'],
    ['hu', 'MI'],
    ['is', 'AI'],
    ['it', 'IA'],
    ['lt', 'DI'],
    ['lv', 'MI'],
    ['me', 'AI'],
    ['mk', 'ВИ'],
    ['mt', 'AI'],
    ['no', 'KI'],
    ['nl', 'AI'],
    ['pl', 'SI'],
    ['pt', 'IA'],
    ['ro', 'IA'],
    ['ru', 'ИИ'],
    ['sk', 'AI'],
    ['sl', 'UI'],
    ['sr', 'AI'],
    ['sv', 'AI'],
    ['tr', 'AI'],
    ['uk', 'ШІ'],
  ])('should return correct short text for language: %s → %s', (language, expected) => {
    expect(AI_TAG_TRANSLATIONS[language].short).toBe(expected);
  });
});

describe('MARKET_LOCALES / AI_TAG_LOCALES_ACCEPTED', () => {
  it('should include every MarketLocale and its POSIX twin', () => {
    expect(MARKET_LOCALES).toHaveLength(176);
    expect(AI_TAG_LOCALES_ACCEPTED).toHaveLength(351); // 176 BCP47 + 175 POSIX (en stays single)
    for (const locale of MARKET_LOCALES) {
      expect(AI_TAG_LOCALES_ACCEPTED).toContain(locale);
      expect(AI_TAG_LOCALES_ACCEPTED).toContain(locale.replace(/-/g, '_'));
    }
  });

  it('should mark POSIX underscore forms as deprecated', () => {
    expect(AI_TAG_LOCALES_ACCEPTED_DEPRECATED).toHaveLength(175);
    expect(AI_TAG_LOCALES_ACCEPTED_DEPRECATED.every((locale) => locale.includes('_'))).toBe(true);
    expect(AI_TAG_LOCALES_ACCEPTED_DEPRECATED).toContain('en_US');
    expect(AI_TAG_LOCALES_ACCEPTED_DEPRECATED).toContain('de_DE');
    expect(AI_TAG_LOCALES_ACCEPTED_DEPRECATED).not.toContain('en');
    expect(AI_TAG_LOCALES_ACCEPTED_DEPRECATED).not.toContain('en-US');
  });

  it('should include language-only en and retained prior locales', () => {
    expect(MARKET_LOCALES).toContain('en');
    expect(MARKET_LOCALES).toContain('bg-BG');
    expect(MARKET_LOCALES).toContain('nb-NO');
    expect(MARKET_LOCALES).toContain('no-NO');
    expect(MARKET_LOCALES).toContain('ro-MD');
    expect(MARKET_LOCALES).toContain('ro-RO');
    expect(MARKET_LOCALES).toContain('ru-RU');
    expect(MARKET_LOCALES).toContain('sr-ME');
    expect(MARKET_LOCALES).toContain('me-ME');
    expect(MARKET_LOCALES).toContain('en-AE');
    expect(MARKET_LOCALES).toContain('en-AE-x-abu-dhabi');
    expect(MARKET_LOCALES).toContain('en-AE-x-abudhabi');
    expect(MARKET_LOCALES).toContain('zh-HK');
    expect(MARKET_LOCALES).toContain('ka-GE');
    expect(MARKET_LOCALES).toContain('az-AZ');
    expect(AI_TAG_LOCALES_ACCEPTED).toContain('en');
    expect(AI_TAG_LOCALES_ACCEPTED).toContain('bg_BG');
  });

  it('should not allowlist bare de as language-only', () => {
    expect(AI_TAG_LOCALES_ACCEPTED).not.toContain('de');
  });
});

describe('normalizeAiTagLocale()', () => {
  it.each([
    ['en_US', 'en_US'],
    ['en-US', 'en_US'],
    ['de-DE', 'de_DE'],
    ['en-AE-x-abu-dhabi', 'en_AE_x_abu_dhabi'],
    ['en-AE-x-abudhabi', 'en_AE_x_abudhabi'],
  ])('should normalize %s to %s', (input, expected) => {
    expect(normalizeAiTagLocale(input)).toBe(expected);
  });
});

describe('getAiTagLanguage()', () => {
  it.each([
    ['de-AT', 'de'],
    ['de_DE', 'de'],
    ['en', 'en'],
    ['en-AE-x-dubai', 'en'],
    ['no-NO', 'no'],
    ['nb_NO', 'no'],
    ['nb-NO', 'no'],
    ['me-ME', 'me'],
    ['sr-ME', 'sr'],
  ])('should extract language from %s → %s', (input, expected) => {
    expect(getAiTagLanguage(input)).toBe(expected);
  });
});

describe('resolveAiTagTranslationLanguage()', () => {
  it.each([
    ['de-AT', 'de'],
    ['en', 'en'],
    ['cs-SK', 'cs'],
    ['me-ME', 'me'],
    ['sr-ME', 'sr'],
    ['ja-JP', 'en'],
    ['ar-SA', 'en'],
    ['az-AZ', 'en'],
    ['ka-GE', 'en'],
    ['zh-CN', 'en'],
    ['zh-HK', 'en'],
    ['hy-AM', 'en'],
    ['xx-XX', 'en'],
    ['', 'en'],
  ])('should resolve %s → %s', (input, expected) => {
    expect(resolveAiTagTranslationLanguage(input)).toBe(expected);
  });
});

describe('getAiTagTranslation()', () => {
  it.each([
    ['de', 'KI', 'künstliche Intelligenz'],
    ['de-DE', 'KI', 'künstliche Intelligenz'],
    ['de_DE', 'KI', 'künstliche Intelligenz'],
    ['de-AT', 'KI', 'künstliche Intelligenz'],
    ['fr-CA', 'IA', 'intelligence artificielle'],
    ['es-MX', 'IA', 'inteligencia artificial'],
    ['en', 'AI', 'artificial intelligence'],
    ['en-US', 'AI', 'artificial intelligence'],
    ['en-AE', 'AI', 'artificial intelligence'],
    ['en-AE-x-abu-dhabi', 'AI', 'artificial intelligence'],
    ['en-AE-x-abudhabi', 'AI', 'artificial intelligence'],
    ['no-NO', 'KI', 'kunstig intelligens'],
    ['nb-NO', 'KI', 'kunstig intelligens'],
    ['nb_NO', 'KI', 'kunstig intelligens'],
    ['pt-BR', 'IA', 'inteligência artificial'],
    ['ro-RO', 'IA', 'inteligență artificială'],
    ['ro-MD', 'IA', 'inteligență artificială'],
    ['ru-KZ', 'ИИ', 'искусственный интеллект'],
    ['ru-RU', 'ИИ', 'искусственный интеллект'],
    ['sr-ME', 'AI', 'veštačka inteligencija'],
    ['me-ME', 'AI', 'veštačka inteligencija'],
    ['cs-SK', 'AI', 'umělá inteligence'],
    ['is-IS', 'AI', 'gervigreind'],
    ['mt-MT', 'AI', 'artificial intelligence'],
  ])('should resolve %s by language', (locale, expectedShort, expectedLong) => {
    const entry = getAiTagTranslation(locale);
    expect(entry.short).toBe(expectedShort);
    expect(entry.long).toBe(expectedLong);
  });

  it.each([
    'ja-JP',
    'ar-SA',
    'az-AZ',
    'ka-GE',
    'zh-CN',
    'zh-HK',
    'hy-AM',
    'ko-KR',
    'en-XA',
    'xx_XX',
    'xx-XX',
    '',
  ])('should fall back to English for untranslated locale %s', (locale) => {
    expect(getAiTagTranslation(locale)).toStrictEqual(AI_TAG_TRANSLATIONS.en);
  });

  it('should return generated and modified for each language', () => {
    for (const language of Object.keys(AI_TAG_TRANSLATIONS)) {
      const entry = getAiTagTranslation(language);
      expect(entry.generated.length).toBeGreaterThan(0);
      expect(entry.modified.length).toBeGreaterThan(0);
    }
  });

  it('should use full localized phrases for en', () => {
    const en = getAiTagTranslation('en');
    expect(en.generated).toBe('AI-generated');
    expect(en.modified).toBe('AI-modified');
  });

  it('should use full localized phrases for bg', () => {
    const bg = getAiTagTranslation('bg');
    expect(bg.generated).toBe('генериран от изкуствен интелект');
    expect(bg.modified).toBe('модифициран от изкуствен интелект');
  });

  it('should resolve bare de at runtime even when not allowlisted', () => {
    expect(getAiTagTranslation('de').short).toBe('KI');
    expect(AI_TAG_LOCALES_ACCEPTED).not.toContain('de');
  });
});
