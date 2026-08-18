import {
  AI_TAG_ICON_PATH,
  AI_TAG_LOCALES,
  AI_TAG_LOCALES_DEPRECATED,
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
    expect(keys.length).toBe(39);
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
    ['ar', 'AI'],
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
    ['ja', 'AI'],
    ['ko', 'AI'],
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
    ['zhCN', 'AI'],
    ['zhHK', 'AI'],
    ['zhTW', 'AI'],
  ])('should return correct short text for language: %s → %s', (language, expected) => {
    expect(AI_TAG_TRANSLATIONS[language].short).toBe(expected);
  });
});

describe('MARKET_LOCALES / AI_TAG_LOCALES', () => {
  it('should include every MarketLocale and its POSIX twin', () => {
    expect(MARKET_LOCALES).toHaveLength(176);
    expect(AI_TAG_LOCALES).toHaveLength(351); // 176 BCP47 + 175 POSIX (en stays single)
    for (const locale of MARKET_LOCALES) {
      expect(AI_TAG_LOCALES).toContain(locale);
      expect(AI_TAG_LOCALES).toContain(locale.replace(/-/g, '_'));
    }
  });

  it('should mark POSIX underscore forms as deprecated', () => {
    expect(AI_TAG_LOCALES_DEPRECATED).toHaveLength(175);
    expect(AI_TAG_LOCALES_DEPRECATED.every((locale) => locale.includes('_'))).toBe(true);
    expect(AI_TAG_LOCALES_DEPRECATED).toContain('en_US');
    expect(AI_TAG_LOCALES_DEPRECATED).toContain('de_DE');
    expect(AI_TAG_LOCALES_DEPRECATED).not.toContain('en');
    expect(AI_TAG_LOCALES_DEPRECATED).not.toContain('en-US');
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
    expect(AI_TAG_LOCALES).toContain('en');
    expect(AI_TAG_LOCALES).toContain('bg_BG');
  });

  it('should not allowlist bare de as language-only', () => {
    expect(AI_TAG_LOCALES).not.toContain('de');
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
    ['zh-CN', 'zhCN'],
    ['zh-HK', 'zhHK'],
    ['zh-TW', 'zhTW'],
    ['zh_CN', 'zhCN'],
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
    ['ja-JP', 'ja'],
    ['ar-SA', 'ar'],
    ['ko-KR', 'ko'],
    ['az-AZ', 'en'],
    ['ka-GE', 'en'],
    ['zh-CN', 'zhCN'],
    ['zh-HK', 'zhHK'],
    ['zh-TW', 'zhTW'],
    ['zh_CN', 'zhCN'],
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
    ['sr-RS', 'AI', 'veštačka inteligencija'],
    ['me-ME', 'AI', 'veštačka inteligencija'],
    ['cs-SK', 'AI', 'umělá inteligence'],
    ['is-IS', 'AI', 'gervigreind'],
    ['mt-MT', 'AI', 'artificial intelligence'],
    ['ar-SA', 'AI', 'الذكاء الاصطناعي'],
    ['ja-JP', 'AI', '人工知能'],
    ['ko-KR', 'AI', '인공지능'],
    ['tr-TR', 'AI', 'yapay zeka'],
    ['zh-CN', 'AI', '人工智能'],
    ['zh-HK', 'AI', '人工智能'],
    ['zh-TW', 'AI', '人工智慧'],
  ])('should resolve %s by language', (locale, expectedShort, expectedLong) => {
    const entry = getAiTagTranslation(locale);
    expect(entry.short).toBe(expectedShort);
    expect(entry.long).toBe(expectedLong);
  });

  it.each(['az-AZ', 'ka-GE', 'hy-AM', 'en-XA', 'xx_XX', 'xx-XX', ''])(
    'should fall back to English for untranslated locale %s',
    (locale) => {
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

  it('should use the Slovak generated phrase from the legal sheet', () => {
    expect(getAiTagTranslation('sk-SK').generated).toBe('Vytvorené AI');
  });

  it('should map Chinese market locales to distinct translation keys', () => {
    expect(getAiTagTranslation('zh-CN')).toMatchObject({
      long: '人工智能',
      generated: 'AI生成',
      modified: 'AI润色',
    });
    expect(getAiTagTranslation('zh-HK')).toMatchObject({
      long: '人工智能',
      generated: '由 AI 生成的',
      modified: '經 AI 修改的',
    });
    expect(getAiTagTranslation('zh-TW')).toMatchObject({
      long: '人工智慧',
      generated: 'AI生成',
      modified: 'AI修改',
    });
    expect(getAiTagTranslation('zh_CN')).toBe(AI_TAG_TRANSLATIONS.zhCN);
    expect(getAiTagTranslation('zh_HK')).toBe(AI_TAG_TRANSLATIONS.zhHK);
    expect(getAiTagTranslation('zh_TW')).toBe(AI_TAG_TRANSLATIONS.zhTW);
  });

  it('should resolve bare de at runtime even when not allowlisted', () => {
    expect(getAiTagTranslation('de').short).toBe('KI');
    expect(AI_TAG_LOCALES).not.toContain('de');
  });
});
