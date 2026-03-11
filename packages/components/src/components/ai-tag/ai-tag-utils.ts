// SVG path data extracted from packages/assets/projects/icons/dist/icons/ai-spark-filled.svg (optimized)
export const AI_TAG_ICON_PATH =
  '<path d="M10.85 6.39c.54 2.84.8 4.26 1.65 5.1s2.27 1.12 5.11 1.66c.52.18.52.52 0 .7-2.82.53-4.24.8-5.09 1.63-.86.85-1.13 2.27-1.67 5.13-.18.52-.52.52-.7 0-.54-2.84-.8-4.26-1.65-5.1s-2.27-1.12-5.11-1.66c-.52-.18-.52-.52 0-.7 2.84-.54 4.26-.8 5.1-1.65s1.12-2.27 1.66-5.11c.18-.52.52-.52.7 0m6.81-3.2c.25 1.32.38 1.98.77 2.38s1.06.52 2.39.77c.24.08.24.24 0 .32-1.3.25-1.97.38-2.36.75-.41.4-.54 1.06-.8 2.4-.08.25-.24.25-.32 0-.24-1.25-.37-1.91-.72-2.31-.39-.45-1.05-.57-2.44-.84-.24-.08-.24-.24 0-.32 1.33-.25 1.99-.38 2.38-.77s.53-1.06.78-2.39c.08-.24.24-.24.32 0"/>';

export const AI_TAG_TEXT_VARIANTS = ['abbreviation', 'long-form'] as const;
export type AiTagTextVariant = (typeof AI_TAG_TEXT_VARIANTS)[number];

// ISO locale code to AI text mapping (abbreviation + spelled-out word)
export const AI_TAG_TRANSLATIONS = {
  de_DE: { abbreviation: 'KI', 'long-form': 'Künstliche Intelligenz' },
  en_US: { abbreviation: 'AI', 'long-form': 'Artificial Intelligence' },
  en_GB: { abbreviation: 'AI', 'long-form': 'Artificial Intelligence' },
  da_DK: { abbreviation: 'KI', 'long-form': 'Kunstig intelligens' },
  fi_FI: { abbreviation: 'AI', 'long-form': 'Tekoäly' },
  fr_FR: { abbreviation: 'IA', 'long-form': 'Intelligence artificielle' },
  el_GR: { abbreviation: 'ΤΝ', 'long-form': 'Τεχνητή νοημοσύνη' },
  it_IT: { abbreviation: 'IA', 'long-form': 'Intelligenza artificiale' },
  hr_HR: { abbreviation: 'UI', 'long-form': 'Umjetna inteligencija' },
  nl_NL: { abbreviation: 'AI', 'long-form': 'Kunstmatige intelligentie' },
  nb_NO: { abbreviation: 'KI', 'long-form': 'Kunstig intelligens' },
  pl_PL: { abbreviation: 'SI', 'long-form': 'Sztuczna inteligencja' },
  pt_PT: { abbreviation: 'IA', 'long-form': 'Inteligência artificial' },
  ro_RO: { abbreviation: 'IA', 'long-form': 'Inteligență artificială' },
  sv_SE: { abbreviation: 'AI', 'long-form': 'Artificiell intelligens' },
  sk_SK: { abbreviation: 'UI', 'long-form': 'Umelá inteligencia' },
  sl_SI: { abbreviation: 'UI', 'long-form': 'Umetna inteligenca' },
  es_ES: { abbreviation: 'IA', 'long-form': 'Inteligencia artificial' },
  cs_CZ: { abbreviation: 'UI', 'long-form': 'Umělá inteligence' },
  hu_HU: { abbreviation: 'MI', 'long-form': 'Mesterséges intelligencia' },
  mt_MT: { abbreviation: 'AI', 'long-form': 'Artificial Intelligence' },
  bg_BG: { abbreviation: 'ИИ', 'long-form': 'Изкуствен интелект' },
  en_CY: { abbreviation: 'AI', 'long-form': 'Artificial Intelligence' },
  et_EE: { abbreviation: 'TI', 'long-form': 'Tehisintellekt' },
  lv_LV: { abbreviation: 'MI', 'long-form': 'Mākslīgais intelekts' },
  lt_LT: { abbreviation: 'DI', 'long-form': 'Dirbtinis intelektas' },
} satisfies Record<string, { abbreviation: string; 'long-form': string }>;

export type AiTagLocale = keyof typeof AI_TAG_TRANSLATIONS;

export const getAiTagText = (locale: string, textVariant: AiTagTextVariant = 'abbreviation'): string => {
  const entry = AI_TAG_TRANSLATIONS[locale as AiTagLocale] ?? AI_TAG_TRANSLATIONS['en_US'];
  return entry[textVariant];
};
