// SVG path data extracted from packages/assets/projects/icons/dist/icons/ai-spark-filled.svg (optimized)
export const AI_TAG_ICON_PATH =
  '<path d="M10.85 6.39c.54 2.84.8 4.26 1.65 5.1s2.27 1.12 5.11 1.66c.52.18.52.52 0 .7-2.82.53-4.24.8-5.09 1.63-.86.85-1.13 2.27-1.67 5.13-.18.52-.52.52-.7 0-.54-2.84-.8-4.26-1.65-5.1s-2.27-1.12-5.11-1.66c-.52-.18-.52-.52 0-.7 2.84-.54 4.26-.8 5.1-1.65s1.12-2.27 1.66-5.11c.18-.52.52-.52.7 0m6.81-3.2c.25 1.32.38 1.98.77 2.38s1.06.52 2.39.77c.24.08.24.24 0 .32-1.3.25-1.97.38-2.36.75-.41.4-.54 1.06-.8 2.4-.08.25-.24.25-.32 0-.24-1.25-.37-1.91-.72-2.31-.39-.45-1.05-.57-2.44-.84-.24-.08-.24-.24 0-.32 1.33-.25 1.99-.38 2.38-.77s.53-1.06.78-2.39c.08-.24.24-.24.32 0"/>';

export const AI_TAG_TEXT_VARIANTS = ['abbreviation', 'ai-generated', 'ai-modified'] as const;
export type AiTagTextVariant = (typeof AI_TAG_TEXT_VARIANTS)[number];

type AiTagTranslationEntry = {
  abbreviation: { text: string; 'long-form': string };
  'ai-generated': string;
  'ai-modified': string;
};

// ISO locale code to AI text mapping
export const AI_TAG_TRANSLATIONS = {
  de_DE: { abbreviation: { text: 'KI', 'long-form': 'Künstliche Intelligenz' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  en_US: { abbreviation: { text: 'AI', 'long-form': 'Artificial Intelligence' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  en_GB: { abbreviation: { text: 'AI', 'long-form': 'Artificial Intelligence' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  da_DK: { abbreviation: { text: 'KI', 'long-form': 'Kunstig intelligens' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  fi_FI: { abbreviation: { text: 'AI', 'long-form': 'Tekoäly' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  fr_FR: { abbreviation: { text: 'IA', 'long-form': 'Intelligence artificielle' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  el_GR: { abbreviation: { text: 'ΤΝ', 'long-form': 'Τεχνητή νοημοσύνη' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  it_IT: { abbreviation: { text: 'IA', 'long-form': 'Intelligenza artificiale' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  hr_HR: { abbreviation: { text: 'UI', 'long-form': 'Umjetna inteligencija' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  nl_NL: { abbreviation: { text: 'AI', 'long-form': 'Kunstmatige intelligentie' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  nb_NO: { abbreviation: { text: 'KI', 'long-form': 'Kunstig intelligens' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  pl_PL: { abbreviation: { text: 'SI', 'long-form': 'Sztuczna inteligencja' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  pt_PT: { abbreviation: { text: 'IA', 'long-form': 'Inteligência artificial' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  ro_RO: { abbreviation: { text: 'IA', 'long-form': 'Inteligență artificială' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  sv_SE: { abbreviation: { text: 'AI', 'long-form': 'Artificiell intelligens' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  sk_SK: { abbreviation: { text: 'UI', 'long-form': 'Umelá inteligencia' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  sl_SI: { abbreviation: { text: 'UI', 'long-form': 'Umetna inteligenca' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  es_ES: { abbreviation: { text: 'IA', 'long-form': 'Inteligencia artificial' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  cs_CZ: { abbreviation: { text: 'UI', 'long-form': 'Umělá inteligence' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  hu_HU: { abbreviation: { text: 'MI', 'long-form': 'Mesterséges intelligencia' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  mt_MT: { abbreviation: { text: 'AI', 'long-form': 'Artificial Intelligence' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  bg_BG: { abbreviation: { text: 'ИИ', 'long-form': 'Изкуствен интелект' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  en_CY: { abbreviation: { text: 'AI', 'long-form': 'Artificial Intelligence' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  et_EE: { abbreviation: { text: 'TI', 'long-form': 'Tehisintellekt' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  lv_LV: { abbreviation: { text: 'MI', 'long-form': 'Mākslīgais intelekts' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
  lt_LT: { abbreviation: { text: 'DI', 'long-form': 'Dirbtinis intelektas' }, 'ai-generated': 'TODO', 'ai-modified': 'TODO' },
} satisfies Record<string, AiTagTranslationEntry>;

export type AiTagLocale = keyof typeof AI_TAG_TRANSLATIONS;

export const getAiTagText = (locale: string, textVariant: AiTagTextVariant = 'ai-generated'): string => {
  const entry = AI_TAG_TRANSLATIONS[locale as AiTagLocale] ?? AI_TAG_TRANSLATIONS['en_US'];
  if (textVariant === 'abbreviation') {
    return entry.abbreviation.text;
  }
  return entry[textVariant];
};

export const getAiTagLongForm = (locale: string): string => {
  const entry = AI_TAG_TRANSLATIONS[locale as AiTagLocale] ?? AI_TAG_TRANSLATIONS['en_US'];
  return entry.abbreviation['long-form'];
};
