// SVG path data extracted from packages/assets/projects/icons/dist/icons/ai-spark-filled.svg (optimized)
export const AI_TAG_ICON_PATH =
  '<path d="M10.85 6.39c.54 2.84.8 4.26 1.65 5.1s2.27 1.12 5.11 1.66c.52.18.52.52 0 .7-2.82.53-4.24.8-5.09 1.63-.86.85-1.13 2.27-1.67 5.13-.18.52-.52.52-.7 0-.54-2.84-.8-4.26-1.65-5.1s-2.27-1.12-5.11-1.66c-.52-.18-.52-.52 0-.7 2.84-.54 4.26-.8 5.1-1.65s1.12-2.27 1.66-5.11c.18-.52.52-.52.7 0m6.81-3.2c.25 1.32.38 1.98.77 2.38s1.06.52 2.39.77c.24.08.24.24 0 .32-1.3.25-1.97.38-2.36.75-.41.4-.54 1.06-.8 2.4-.08.25-.24.25-.32 0-.24-1.25-.37-1.91-.72-2.31-.39-.45-1.05-.57-2.44-.84-.24-.08-.24-.24 0-.32 1.33-.25 1.99-.38 2.38-.77s.53-1.06.78-2.39c.08-.24.24-.24.32 0"/>';

export const AI_TAG_TEXT_VARIANTS = ['abbreviation', 'ai-generated', 'ai-modified'] as const;
export type AiTagTextVariant = (typeof AI_TAG_TEXT_VARIANTS)[number];

type AiTagTranslationEntry = {
  short: string;
  long: string;
  generated: string;
  modified: string;
};

// ISO locale code to AI text mapping
export const AI_TAG_TRANSLATIONS = {
  de_DE: { short: 'KI', long: 'Künstliche Intelligenz', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  en_US: { short: 'AI', long: 'Artificial Intelligence', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  en_GB: { short: 'AI', long: 'Artificial Intelligence', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  da_DK: { short: 'KI', long: 'Kunstig intelligens', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  fi_FI: { short: 'AI', long: 'Tekoäly', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  fr_FR: { short: 'IA', long: 'Intelligence artificielle', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  el_GR: { short: 'ΤΝ', long: 'Τεχνητή νοημοσύνη', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  it_IT: { short: 'IA', long: 'Intelligenza artificiale', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  hr_HR: { short: 'UI', long: 'Umjetna inteligencija', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  nl_NL: { short: 'AI', long: 'Kunstmatige intelligentie', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  nb_NO: { short: 'KI', long: 'Kunstig intelligens', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  pl_PL: { short: 'SI', long: 'Sztuczna inteligencja', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  pt_PT: { short: 'IA', long: 'Inteligência artificial', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  ro_RO: { short: 'IA', long: 'Inteligență artificială', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  sv_SE: { short: 'AI', long: 'Artificiell intelligens', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  sk_SK: { short: 'UI', long: 'Umelá inteligencia', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  sl_SI: { short: 'UI', long: 'Umetna inteligenca', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  es_ES: { short: 'IA', long: 'Inteligencia artificial', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  cs_CZ: { short: 'UI', long: 'Umělá inteligence', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  hu_HU: { short: 'MI', long: 'Mesterséges intelligencia', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  mt_MT: { short: 'AI', long: 'Artificial Intelligence', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  bg_BG: { short: 'ИИ', long: 'Изкуствен интелект', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  en_CY: { short: 'AI', long: 'Artificial Intelligence', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  et_EE: { short: 'TI', long: 'Tehisintellekt', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  lv_LV: { short: 'MI', long: 'Mākslīgais intelekts', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
  lt_LT: { short: 'DI', long: 'Dirbtinis intelektas', generated: 'PLACEHOLDER', modified: 'PLACEHOLDER' },
} satisfies Record<string, AiTagTranslationEntry>;

export type AiTagLocale = keyof typeof AI_TAG_TRANSLATIONS;

export const getAiTagTranslation = (locale: string): AiTagTranslationEntry => {
  return AI_TAG_TRANSLATIONS[locale as AiTagLocale] ?? AI_TAG_TRANSLATIONS['en_US'];
};
